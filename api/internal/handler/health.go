// Package handler contains HTTP handlers for the API
package handler

import (
	"encoding/json"
	"net/http"
)

// HealthResponse represents the response from the health check endpoint
type HealthResponse struct {
	Status string `json:"status"`
}

// HealthHandler handles GET /health requests
// Returns HTTP 200 with {"status": "ok"} when the service is healthy
func HealthHandler(w http.ResponseWriter, r *http.Request) {
	// Set content type to application/json
	w.Header().Set("Content-Type", "application/json")

	// Create response
	response := HealthResponse{
		Status: "ok",
	}

	// Write response
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}
