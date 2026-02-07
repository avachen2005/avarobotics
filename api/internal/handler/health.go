// Package handler contains HTTP handlers for the API
package handler

import "net/http"

// HealthHandler handles GET /health requests
// Returns HTTP 200 with {} when the service is healthy
func HealthHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("{}"))
}
