package com.timeless.app.auth

import com.timeless.app.data.model.User

/**
 * Represents the current authentication state of the user
 */
sealed class AuthState {
    /**
     * User is not authenticated (no tokens)
     */
    data object Anonymous : AuthState()

    /**
     * User is authenticated with valid tokens
     */
    data class Authenticated(val user: User) : AuthState()

    /**
     * Token refresh is in progress
     */
    data object Refreshing : AuthState()

    /**
     * Tokens have expired and refresh failed
     */
    data object Expired : AuthState()

    /**
     * Authentication error occurred
     */
    data class Error(val message: String) : AuthState()

    // MARK: - Convenience Properties

    /**
     * Whether the user is currently authenticated
     */
    val isAuthenticated: Boolean
        get() = this is Authenticated

    /**
     * Whether authentication is in a loading/transitional state
     */
    val isLoading: Boolean
        get() = this is Refreshing

    /**
     * The authenticated user, if available
     */
    val user: User?
        get() = (this as? Authenticated)?.user

    /**
     * Error message, if in error state
     */
    val errorMessage: String?
        get() = (this as? Error)?.message
}
