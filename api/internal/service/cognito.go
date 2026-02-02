// Package service contains business logic services
package service

import (
	"crypto/rsa"
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"math/big"
	"net/http"
	"sync"
	"time"
)

// CognitoConfig holds the configuration for Cognito integration
type CognitoConfig struct {
	Region     string
	UserPoolID string
	ClientID   string
}

// JWKSService handles JWKS fetching and caching
type JWKSService struct {
	config     CognitoConfig
	keys       map[string]*rsa.PublicKey
	expiry     time.Time
	mu         sync.RWMutex
	httpClient *http.Client
	cacheTTL   time.Duration
}

// JWKS represents the JSON Web Key Set response from Cognito
type JWKS struct {
	Keys []JWK `json:"keys"`
}

// JWK represents a single JSON Web Key
type JWK struct {
	Kid string `json:"kid"` // Key ID
	Kty string `json:"kty"` // Key Type (RSA)
	Alg string `json:"alg"` // Algorithm (RS256)
	Use string `json:"use"` // Key Use (sig)
	N   string `json:"n"`   // RSA modulus
	E   string `json:"e"`   // RSA exponent
}

// NewJWKSService creates a new JWKS service with caching
func NewJWKSService(config CognitoConfig) *JWKSService {
	return &JWKSService{
		config:     config,
		keys:       make(map[string]*rsa.PublicKey),
		httpClient: &http.Client{Timeout: 10 * time.Second},
		cacheTTL:   1 * time.Hour, // Cache TTL as per spec
	}
}

// GetPublicKey returns the public key for the given key ID
func (s *JWKSService) GetPublicKey(kid string) (*rsa.PublicKey, error) {
	s.mu.RLock()
	// Check if cache is valid
	if time.Now().Before(s.expiry) {
		if key, ok := s.keys[kid]; ok {
			s.mu.RUnlock()
			return key, nil
		}
	}
	s.mu.RUnlock()

	// Cache miss or expired, refresh keys
	if err := s.refreshKeys(); err != nil {
		return nil, fmt.Errorf("failed to refresh JWKS: %w", err)
	}

	s.mu.RLock()
	defer s.mu.RUnlock()

	key, ok := s.keys[kid]
	if !ok {
		return nil, errors.New("key not found in JWKS")
	}

	return key, nil
}

// refreshKeys fetches the JWKS from Cognito and updates the cache
func (s *JWKSService) refreshKeys() error {
	s.mu.Lock()
	defer s.mu.Unlock()

	// Double-check in case another goroutine just refreshed
	if time.Now().Before(s.expiry) {
		return nil
	}

	url := s.getJWKSURL()
	resp, err := s.httpClient.Get(url)
	if err != nil {
		return fmt.Errorf("failed to fetch JWKS: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("JWKS endpoint returned status %d", resp.StatusCode)
	}

	var jwks JWKS
	if err := json.NewDecoder(resp.Body).Decode(&jwks); err != nil {
		return fmt.Errorf("failed to decode JWKS: %w", err)
	}

	// Parse keys
	newKeys := make(map[string]*rsa.PublicKey)
	for _, jwk := range jwks.Keys {
		if jwk.Kty != "RSA" || jwk.Use != "sig" {
			continue
		}

		key, err := parseRSAPublicKey(jwk)
		if err != nil {
			continue // Skip invalid keys
		}

		newKeys[jwk.Kid] = key
	}

	if len(newKeys) == 0 {
		return errors.New("no valid RSA keys found in JWKS")
	}

	s.keys = newKeys
	s.expiry = time.Now().Add(s.cacheTTL)

	return nil
}

// getJWKSURL returns the JWKS endpoint URL for the configured User Pool
func (s *JWKSService) getJWKSURL() string {
	return fmt.Sprintf(
		"https://cognito-idp.%s.amazonaws.com/%s/.well-known/jwks.json",
		s.config.Region,
		s.config.UserPoolID,
	)
}

// parseRSAPublicKey parses a JWK into an RSA public key
func parseRSAPublicKey(jwk JWK) (*rsa.PublicKey, error) {
	// Decode modulus (N)
	nBytes, err := base64.RawURLEncoding.DecodeString(jwk.N)
	if err != nil {
		return nil, fmt.Errorf("failed to decode modulus: %w", err)
	}

	// Decode exponent (E)
	eBytes, err := base64.RawURLEncoding.DecodeString(jwk.E)
	if err != nil {
		return nil, fmt.Errorf("failed to decode exponent: %w", err)
	}

	// Convert exponent bytes to int
	var e int
	for _, b := range eBytes {
		e = e<<8 + int(b)
	}

	return &rsa.PublicKey{
		N: new(big.Int).SetBytes(nBytes),
		E: e,
	}, nil
}

// GetClientID returns the configured client ID for token validation
func (s *JWKSService) GetClientID() string {
	return s.config.ClientID
}

// GetIssuer returns the expected token issuer URL
func (s *JWKSService) GetIssuer() string {
	return fmt.Sprintf(
		"https://cognito-idp.%s.amazonaws.com/%s",
		s.config.Region,
		s.config.UserPoolID,
	)
}
