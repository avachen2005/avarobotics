// Package middleware contains HTTP middleware for the API
package middleware

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/avarobotics/api/internal/model"
	"github.com/avarobotics/api/internal/service"
	"github.com/golang-jwt/jwt/v5"
)

// contextKey is a custom type for context keys to avoid collisions
type contextKey string

// UserContextKey is the context key for the authenticated user
const UserContextKey contextKey = "user"

// AuthMiddleware provides JWT authentication
type AuthMiddleware struct {
	jwksService *service.JWKSService
}

// NewAuthMiddleware creates a new auth middleware
func NewAuthMiddleware(jwksService *service.JWKSService) *AuthMiddleware {
	return &AuthMiddleware{
		jwksService: jwksService,
	}
}

// Authenticate returns a middleware that validates JWT tokens
func (m *AuthMiddleware) Authenticate(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Extract token from Authorization header
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			m.sendUnauthorized(w, "Missing authorization header")
			return
		}

		// Check Bearer scheme
		parts := strings.SplitN(authHeader, " ", 2)
		if len(parts) != 2 || strings.ToLower(parts[0]) != "bearer" {
			m.sendUnauthorized(w, "Invalid authorization header format")
			return
		}

		tokenString := parts[1]

		// Parse and validate token
		token, err := m.parseToken(tokenString)
		if err != nil {
			log.Printf("AUTH FAILURE: %v", err) // T013: Log auth failures
			m.sendUnauthorized(w, "Invalid or expired token")
			return
		}

		// Extract user from claims
		user, err := m.extractUser(token)
		if err != nil {
			log.Printf("AUTH FAILURE: failed to extract user claims: %v", err)
			m.sendUnauthorized(w, "Invalid token claims")
			return
		}

		// Add user to context
		ctx := context.WithValue(r.Context(), UserContextKey, user)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

// parseToken parses and validates a JWT token
func (m *AuthMiddleware) parseToken(tokenString string) (*jwt.Token, error) {
	// Parse the token with key function
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Verify signing method is RS256
		if _, ok := token.Method.(*jwt.SigningMethodRSA); !ok {
			return nil, jwt.ErrSignatureInvalid
		}

		// Get key ID from header
		kid, ok := token.Header["kid"].(string)
		if !ok {
			return nil, jwt.ErrSignatureInvalid
		}

		// Fetch public key from JWKS
		return m.jwksService.GetPublicKey(kid)
	})

	if err != nil {
		return nil, err
	}

	// Validate standard claims
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		return nil, jwt.ErrTokenInvalidClaims
	}

	// Validate issuer
	issuer, _ := claims["iss"].(string)
	if issuer != m.jwksService.GetIssuer() {
		return nil, jwt.ErrTokenInvalidIssuer
	}

	// Validate token_use is "access"
	tokenUse, _ := claims["token_use"].(string)
	if tokenUse != "access" {
		return nil, jwt.ErrTokenInvalidClaims
	}

	// Validate client_id (audience for Cognito)
	clientID, _ := claims["client_id"].(string)
	if clientID != m.jwksService.GetClientID() {
		return nil, jwt.ErrTokenInvalidAudience
	}

	// Validate expiration
	exp, ok := claims["exp"].(float64)
	if !ok || time.Now().Unix() > int64(exp) {
		return nil, jwt.ErrTokenExpired
	}

	return token, nil
}

// extractUser extracts user information from token claims
func (m *AuthMiddleware) extractUser(token *jwt.Token) (*model.User, error) {
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return nil, jwt.ErrTokenInvalidClaims
	}

	user := &model.User{
		Sub: getStringClaim(claims, "sub"),
	}

	// Email might be in different claim names
	user.Email = getStringClaim(claims, "email")
	if user.Email == "" {
		user.Email = getStringClaim(claims, "cognito:username")
	}

	// Name and picture from identity provider
	user.Name = getStringClaim(claims, "name")
	user.Picture = getStringClaim(claims, "picture")

	if user.Sub == "" {
		return nil, jwt.ErrTokenInvalidClaims
	}

	return user, nil
}

// sendUnauthorized sends a 401 Unauthorized response
func (m *AuthMiddleware) sendUnauthorized(w http.ResponseWriter, message string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusUnauthorized)
	json.NewEncoder(w).Encode(model.NewErrorResponse(
		model.ErrCodeUnauthorized,
		message,
	))
}

// getStringClaim safely extracts a string claim from the claims map
func getStringClaim(claims jwt.MapClaims, key string) string {
	if val, ok := claims[key].(string); ok {
		return val
	}
	return ""
}

// GetUserFromContext extracts the user from the request context
func GetUserFromContext(ctx context.Context) (*model.User, bool) {
	user, ok := ctx.Value(UserContextKey).(*model.User)
	return user, ok
}
