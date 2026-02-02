package com.timeless.app.data.model

import kotlinx.serialization.Serializable

/**
 * User model representing the authenticated user
 */
@Serializable
data class User(
    /**
     * Unique user identifier from Cognito
     */
    val sub: String,

    /**
     * User's email address
     */
    val email: String,

    /**
     * Display name from identity provider
     */
    val name: String? = null,

    /**
     * Profile picture URL from identity provider
     */
    val picture: String? = null
)
