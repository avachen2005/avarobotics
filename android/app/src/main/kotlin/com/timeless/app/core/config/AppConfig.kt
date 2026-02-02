package com.timeless.app.core.config

import android.content.Context
import com.timeless.app.BuildConfig
import com.timeless.app.R

/**
 * Application configuration
 * Reads values from resources for environment-specific settings
 */
object AppConfig {

    private lateinit var appContext: Context

    fun init(context: Context) {
        appContext = context.applicationContext
    }

    // MARK: - API Configuration

    /**
     * Base URL for the API server
     * Uses 10.0.2.2 for Android emulator (localhost from host machine)
     */
    val apiBaseUrl: String
        get() = if (BuildConfig.DEBUG) {
            appContext.getString(R.string.api_base_url_debug)
        } else {
            appContext.getString(R.string.api_base_url_release)
        }

    /**
     * API version prefix
     */
    val apiVersion: String
        get() = appContext.getString(R.string.api_version)

    /**
     * Full API base URL with version
     */
    val apiUrl: String
        get() = "$apiBaseUrl/api/$apiVersion"

    // MARK: - Cognito Configuration

    val cognitoRegion: String
        get() = appContext.getString(R.string.cognito_region)

    val cognitoUserPoolId: String
        get() = appContext.getString(R.string.cognito_user_pool_id)

    val cognitoClientId: String
        get() = appContext.getString(R.string.cognito_client_id)

    val cognitoDomain: String
        get() = appContext.getString(R.string.cognito_domain)

    val cognitoCallbackUrl: String
        get() = appContext.getString(R.string.cognito_callback_url)

    val cognitoSignOutUrl: String
        get() = appContext.getString(R.string.cognito_signout_url)

    // MARK: - Timeouts

    /**
     * Default network request timeout in seconds
     */
    const val NETWORK_TIMEOUT_SECONDS = 30L

    /**
     * Token refresh buffer time in milliseconds (refresh before expiry)
     */
    const val TOKEN_REFRESH_BUFFER_MS = 5 * 60 * 1000L // 5 minutes
}
