// Package main is the entry point for the API server
package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/avarobotics/api/internal/handler"
	"github.com/avarobotics/api/internal/middleware"
	"github.com/avarobotics/api/internal/service"
)

func main() {
	// Get configuration from environment variables
	port := getEnv("PORT", "8080")
	cognitoRegion := getEnv("COGNITO_REGION", "ap-northeast-1")
	cognitoUserPoolID := getEnv("COGNITO_USER_POOL_ID", "")
	cognitoClientID := getEnv("COGNITO_CLIENT_ID", "")

	// Validate required configuration
	if cognitoUserPoolID == "" || cognitoClientID == "" {
		log.Println("WARNING: COGNITO_USER_POOL_ID or COGNITO_CLIENT_ID not set. Auth will fail.")
	}

	// Create JWKS service
	jwksService := service.NewJWKSService(service.CognitoConfig{
		Region:     cognitoRegion,
		UserPoolID: cognitoUserPoolID,
		ClientID:   cognitoClientID,
	})

	// Create auth middleware
	authMiddleware := middleware.NewAuthMiddleware(jwksService)

	// Create HTTP server mux
	mux := http.NewServeMux()

	// Public routes (no auth required)
	mux.HandleFunc("GET /health", handler.HealthHandler)

	// Protected routes (auth required)
	// Using Go 1.22 pattern matching with middleware wrapper
	mux.Handle("GET /api/v1/me", authMiddleware.Authenticate(http.HandlerFunc(handler.MeHandler)))

	// Create server
	server := &http.Server{
		Addr:         ":" + port,
		Handler:      mux,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	// Start server in goroutine
	go func() {
		log.Printf("Server starting on port %s", port)
		log.Printf("Cognito Region: %s, User Pool: %s", cognitoRegion, cognitoUserPoolID)
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Failed to start server: %v", err)
		}
	}()

	// Wait for interrupt signal for graceful shutdown
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Println("Server shutting down...")

	// Create context with timeout for shutdown
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	// Attempt graceful shutdown
	if err := server.Shutdown(ctx); err != nil {
		log.Fatalf("Server forced to shutdown: %v", err)
	}

	log.Println("Server exited")
}

// getEnv returns the environment variable value or a default
func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}
