package com.timeless.app.auth

import android.content.Context
import androidx.security.crypto.EncryptedSharedPreferences
import androidx.security.crypto.MasterKey
import com.timeless.app.core.config.AppConfig
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import kotlinx.coroutines.withContext
import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.URL

/**
 * Manages authentication tokens with secure storage and automatic refresh
 */
class TokenManager(private val context: Context) {

    private val prefs by lazy {
        EncryptedSharedPreferences.create(
            context,
            PREFS_NAME,
            MasterKey.Builder(context)
                .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
                .build(),
            EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
            EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
        )
    }

    private val refreshMutex = Mutex()
    private var cachedTokens: AuthTokens? = null

    // MARK: - Public API

    /**
     * Get a valid access token, refreshing if necessary
     */
    suspend fun getAccessToken(): String? {
        val tokens = getTokens() ?: return null

        // Check if token is expired or about to expire
        if (isTokenExpired(tokens)) {
            return refreshTokens(tokens.refreshToken)?.accessToken
        }

        return tokens.accessToken
    }

    /**
     * Save tokens after successful authentication
     */
    fun saveTokens(tokens: AuthTokens) {
        prefs.edit()
            .putString(KEY_ACCESS_TOKEN, tokens.accessToken)
            .putString(KEY_ID_TOKEN, tokens.idToken)
            .putString(KEY_REFRESH_TOKEN, tokens.refreshToken)
            .putLong(KEY_EXPIRES_AT, tokens.expiresAt)
            .apply()
        cachedTokens = tokens
    }

    /**
     * Get current tokens from cache or storage
     */
    fun getTokens(): AuthTokens? {
        cachedTokens?.let { return it }

        val accessToken = prefs.getString(KEY_ACCESS_TOKEN, null) ?: return null

        val tokens = AuthTokens(
            accessToken = accessToken,
            idToken = prefs.getString(KEY_ID_TOKEN, "") ?: "",
            refreshToken = prefs.getString(KEY_REFRESH_TOKEN, "") ?: "",
            expiresAt = prefs.getLong(KEY_EXPIRES_AT, 0)
        )
        cachedTokens = tokens
        return tokens
    }

    /**
     * Clear all tokens (sign out)
     */
    fun clearTokens() {
        prefs.edit().clear().apply()
        cachedTokens = null
    }

    /**
     * Check if user has valid tokens
     */
    fun hasValidTokens(): Boolean {
        val tokens = getTokens() ?: return false
        return !isTokenExpired(tokens)
    }

    // MARK: - Token Refresh

    private fun isTokenExpired(tokens: AuthTokens): Boolean {
        val now = System.currentTimeMillis()
        return tokens.expiresAt - AppConfig.TOKEN_REFRESH_BUFFER_MS <= now
    }

    /**
     * Refresh tokens using the refresh token
     * Uses mutex to prevent multiple simultaneous refreshes
     */
    private suspend fun refreshTokens(refreshToken: String): AuthTokens? {
        return refreshMutex.withLock {
            // Double-check if another coroutine already refreshed
            cachedTokens?.let { cached ->
                if (!isTokenExpired(cached)) {
                    return@withLock cached
                }
            }

            performTokenRefresh(refreshToken)
        }
    }

    private suspend fun performTokenRefresh(refreshToken: String): AuthTokens? {
        return withContext(Dispatchers.IO) {
            try {
                val url = URL("https://${AppConfig.cognitoDomain}/oauth2/token")
                val connection = url.openConnection() as HttpURLConnection
                connection.requestMethod = "POST"
                connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded")
                connection.connectTimeout = (AppConfig.NETWORK_TIMEOUT_SECONDS * 1000).toInt()
                connection.readTimeout = (AppConfig.NETWORK_TIMEOUT_SECONDS * 1000).toInt()
                connection.doOutput = true

                val body = "grant_type=refresh_token" +
                        "&client_id=${AppConfig.cognitoClientId}" +
                        "&refresh_token=$refreshToken"

                connection.outputStream.use { it.write(body.toByteArray()) }

                if (connection.responseCode == 200) {
                    val responseText = connection.inputStream.bufferedReader().readText()
                    val json = JSONObject(responseText)

                    val tokens = AuthTokens(
                        accessToken = json.getString("access_token"),
                        idToken = json.getString("id_token"),
                        refreshToken = json.optString("refresh_token", refreshToken),
                        expiresAt = System.currentTimeMillis() + json.getLong("expires_in") * 1000
                    )

                    saveTokens(tokens)
                    tokens
                } else {
                    null
                }
            } catch (e: Exception) {
                null
            }
        }
    }

    companion object {
        private const val PREFS_NAME = "timeless_auth"
        private const val KEY_ACCESS_TOKEN = "access_token"
        private const val KEY_ID_TOKEN = "id_token"
        private const val KEY_REFRESH_TOKEN = "refresh_token"
        private const val KEY_EXPIRES_AT = "expires_at"

        @Volatile
        private var instance: TokenManager? = null

        fun getInstance(context: Context): TokenManager {
            return instance ?: synchronized(this) {
                instance ?: TokenManager(context.applicationContext).also { instance = it }
            }
        }
    }
}

/**
 * Authentication tokens data class
 */
data class AuthTokens(
    val accessToken: String,
    val idToken: String,
    val refreshToken: String,
    val expiresAt: Long
) {
    val isExpired: Boolean
        get() = System.currentTimeMillis() >= expiresAt - AppConfig.TOKEN_REFRESH_BUFFER_MS
}
