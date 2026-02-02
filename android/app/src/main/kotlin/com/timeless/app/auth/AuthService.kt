package com.timeless.app.auth

import android.content.Context
import android.net.Uri
import androidx.security.crypto.EncryptedSharedPreferences
import androidx.security.crypto.MasterKey
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import net.openid.appauth.*
import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.URL
import kotlin.coroutines.resume
import kotlin.coroutines.resumeWithException
import kotlin.coroutines.suspendCoroutine

/**
 * Authentication service using AppAuth for OAuth
 * Uses EncryptedSharedPreferences for secure token storage
 */
object AuthService {

    private const val PREFS_NAME = "timeless_auth"
    private const val KEY_ACCESS_TOKEN = "access_token"
    private const val KEY_ID_TOKEN = "id_token"
    private const val KEY_REFRESH_TOKEN = "refresh_token"
    private const val KEY_EXPIRES_AT = "expires_at"

    private var authState: AuthState? = null

    /**
     * Cognito configuration
     * Update these values from your Terraform output
     */
    object CognitoConfig {
        const val REGION = "ap-northeast-1"
        const val USER_POOL_ID = "ap-northeast-1_xxx"
        const val CLIENT_ID = "xxxxxxxxxxxxxxxxxx"
        const val DOMAIN = "your-domain.auth.ap-northeast-1.amazoncognito.com"
        const val CALLBACK_URL = "timeless://callback"
        const val SIGNOUT_URL = "timeless://signout"

        val authorizationEndpoint: Uri
            get() = Uri.parse("https://$DOMAIN/oauth2/authorize")

        val tokenEndpoint: Uri
            get() = Uri.parse("https://$DOMAIN/oauth2/token")

        val endSessionEndpoint: Uri
            get() = Uri.parse("https://$DOMAIN/logout")
    }

    /**
     * Build the authorization request for Google sign-in
     */
    fun buildAuthRequest(): AuthorizationRequest {
        val serviceConfig = AuthorizationServiceConfiguration(
            CognitoConfig.authorizationEndpoint,
            CognitoConfig.tokenEndpoint,
            null,
            CognitoConfig.endSessionEndpoint
        )

        return AuthorizationRequest.Builder(
            serviceConfig,
            CognitoConfig.CLIENT_ID,
            ResponseTypeValues.CODE,
            Uri.parse(CognitoConfig.CALLBACK_URL)
        )
            .setScopes("openid", "email", "profile")
            .setAdditionalParameters(mapOf("identity_provider" to "Google"))
            .build()
    }

    /**
     * Handle the authorization response and exchange code for tokens
     */
    suspend fun handleAuthResponse(
        context: Context,
        response: AuthorizationResponse?,
        exception: AuthorizationException?
    ): AuthTokens {
        if (exception != null) {
            throw exception
        }

        if (response == null) {
            throw IllegalStateException("No authorization response")
        }

        return withContext(Dispatchers.IO) {
            exchangeCodeForTokens(context, response)
        }
    }

    private suspend fun exchangeCodeForTokens(
        context: Context,
        authResponse: AuthorizationResponse
    ): AuthTokens = suspendCoroutine { continuation ->
        val authService = AuthorizationService(context)

        authService.performTokenRequest(authResponse.createTokenExchangeRequest()) { response, ex ->
            authService.dispose()

            if (ex != null) {
                continuation.resumeWithException(ex)
                return@performTokenRequest
            }

            if (response == null) {
                continuation.resumeWithException(IllegalStateException("No token response"))
                return@performTokenRequest
            }

            val tokens = AuthTokens(
                accessToken = response.accessToken ?: "",
                idToken = response.idToken ?: "",
                refreshToken = response.refreshToken ?: "",
                expiresAt = response.accessTokenExpirationTime ?: 0L
            )

            // Save tokens securely
            saveTokens(context, tokens)

            continuation.resume(tokens)
        }
    }

    /**
     * Get the current access token, refreshing if necessary
     */
    suspend fun getAccessToken(context: Context): String? {
        val tokens = getTokens(context) ?: return null

        // Check if token is expired (with 5-minute buffer)
        val now = System.currentTimeMillis()
        val bufferMs = 5 * 60 * 1000L

        if (tokens.expiresAt - bufferMs <= now) {
            // Token expired or about to expire, refresh it
            return refreshTokens(context, tokens.refreshToken)?.accessToken
        }

        return tokens.accessToken
    }

    /**
     * Refresh the access token using the refresh token
     */
    private suspend fun refreshTokens(context: Context, refreshToken: String): AuthTokens? {
        return withContext(Dispatchers.IO) {
            try {
                val url = URL(CognitoConfig.tokenEndpoint.toString())
                val connection = url.openConnection() as HttpURLConnection
                connection.requestMethod = "POST"
                connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded")
                connection.doOutput = true

                val body = "grant_type=refresh_token" +
                        "&client_id=${CognitoConfig.CLIENT_ID}" +
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

                    saveTokens(context, tokens)
                    tokens
                } else {
                    null
                }
            } catch (e: Exception) {
                null
            }
        }
    }

    /**
     * Sign out and clear tokens
     */
    fun signOut(context: Context) {
        clearTokens(context)
        authState = null
    }

    /**
     * Placeholder for Google sign-in
     * Actual implementation requires Activity context for AppAuth
     */
    suspend fun signInWithGoogle() {
        // This is a placeholder - actual implementation requires
        // launching the authorization intent from an Activity
        throw NotImplementedError("Call buildAuthRequest() and launch from Activity")
    }

    // Token storage using EncryptedSharedPreferences

    private fun getEncryptedPrefs(context: Context) =
        EncryptedSharedPreferences.create(
            context,
            PREFS_NAME,
            MasterKey.Builder(context)
                .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
                .build(),
            EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
            EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
        )

    private fun saveTokens(context: Context, tokens: AuthTokens) {
        getEncryptedPrefs(context).edit()
            .putString(KEY_ACCESS_TOKEN, tokens.accessToken)
            .putString(KEY_ID_TOKEN, tokens.idToken)
            .putString(KEY_REFRESH_TOKEN, tokens.refreshToken)
            .putLong(KEY_EXPIRES_AT, tokens.expiresAt)
            .apply()
    }

    fun getTokens(context: Context): AuthTokens? {
        val prefs = getEncryptedPrefs(context)
        val accessToken = prefs.getString(KEY_ACCESS_TOKEN, null) ?: return null

        return AuthTokens(
            accessToken = accessToken,
            idToken = prefs.getString(KEY_ID_TOKEN, "") ?: "",
            refreshToken = prefs.getString(KEY_REFRESH_TOKEN, "") ?: "",
            expiresAt = prefs.getLong(KEY_EXPIRES_AT, 0)
        )
    }

    private fun clearTokens(context: Context) {
        getEncryptedPrefs(context).edit().clear().apply()
    }
}

data class AuthTokens(
    val accessToken: String,
    val idToken: String,
    val refreshToken: String,
    val expiresAt: Long
)
