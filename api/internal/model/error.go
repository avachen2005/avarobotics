// Package model contains data models for the API
package model

// ErrorResponse represents an error response from the API
type ErrorResponse struct {
	Error ErrorDetail `json:"error"`
}

// ErrorDetail contains the error code and message
type ErrorDetail struct {
	// Code is a machine-readable error code
	Code string `json:"code"`
	// Message is a human-readable error message
	Message string `json:"message"`
}

// Common error codes
const (
	ErrCodeUnauthorized   = "UNAUTHORIZED"
	ErrCodeForbidden      = "FORBIDDEN"
	ErrCodeBadRequest     = "BAD_REQUEST"
	ErrCodeNotFound       = "NOT_FOUND"
	ErrCodeInternalError  = "INTERNAL_ERROR"
)

// NewErrorResponse creates a new ErrorResponse
func NewErrorResponse(code, message string) ErrorResponse {
	return ErrorResponse{
		Error: ErrorDetail{
			Code:    code,
			Message: message,
		},
	}
}
