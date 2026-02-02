// Package model contains data models for the API
package model

// User represents a user extracted from JWT claims
type User struct {
	// Sub is the unique user identifier from Cognito
	Sub string `json:"sub"`
	// Email is the user's email address
	Email string `json:"email"`
	// Name is the display name from the identity provider
	Name string `json:"name,omitempty"`
	// Picture is the profile picture URL from the identity provider
	Picture string `json:"picture,omitempty"`
}
