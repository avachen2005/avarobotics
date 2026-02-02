// Package handler contains HTTP handlers for the API
package handler

import (
	"encoding/json"
	"net/http"

	"github.com/avarobotics/api/internal/middleware"
	"github.com/avarobotics/api/internal/model"
)

// MeHandler handles GET /api/v1/me requests
// Returns the authenticated user's profile information
func MeHandler(w http.ResponseWriter, r *http.Request) {
	// Get user from context (set by auth middleware)
	user, ok := middleware.GetUserFromContext(r.Context())
	if !ok {
		// This shouldn't happen if middleware is properly configured
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(model.NewErrorResponse(
			model.ErrCodeUnauthorized,
			"User not found in context",
		))
		return
	}

	// Return user profile
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(user)
}
