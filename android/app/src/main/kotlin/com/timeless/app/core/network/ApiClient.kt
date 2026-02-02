package com.timeless.app.core.network

import android.content.Context
import com.timeless.app.auth.TokenManager
import com.timeless.app.core.config.AppConfig
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import kotlinx.serialization.json.Json
import org.json.JSONObject
import java.io.BufferedReader
import java.io.OutputStreamWriter
import java.net.HttpURLConnection
import java.net.URL

/**
 * HTTP client for API requests with automatic authentication
 */
class ApiClient(context: Context) {

    private val tokenManager = TokenManager.getInstance(context)
    private val json = Json {
        ignoreUnknownKeys = true
        isLenient = true
    }

    // MARK: - Public API

    /**
     * Perform a GET request
     */
    suspend fun <T> get(
        path: String,
        authenticated: Boolean = true,
        deserializer: (String) -> T
    ): Result<T> {
        return request("GET", path, null, authenticated, deserializer)
    }

    /**
     * Perform a POST request with body
     */
    suspend fun <T> post(
        path: String,
        body: String? = null,
        authenticated: Boolean = true,
        deserializer: (String) -> T
    ): Result<T> {
        return request("POST", path, body, authenticated, deserializer)
    }

    /**
     * Perform a PUT request with body
     */
    suspend fun <T> put(
        path: String,
        body: String? = null,
        authenticated: Boolean = true,
        deserializer: (String) -> T
    ): Result<T> {
        return request("PUT", path, body, authenticated, deserializer)
    }

    /**
     * Perform a DELETE request
     */
    suspend fun <T> delete(
        path: String,
        authenticated: Boolean = true,
        deserializer: (String) -> T
    ): Result<T> {
        return request("DELETE", path, null, authenticated, deserializer)
    }

    // MARK: - Request Execution

    private suspend fun <T> request(
        method: String,
        path: String,
        body: String?,
        authenticated: Boolean,
        deserializer: (String) -> T
    ): Result<T> = withContext(Dispatchers.IO) {
        try {
            val url = URL("${AppConfig.apiUrl}$path")
            val connection = url.openConnection() as HttpURLConnection

            connection.requestMethod = method
            connection.setRequestProperty("Accept", "application/json")
            connection.setRequestProperty("Content-Type", "application/json")
            connection.connectTimeout = (AppConfig.NETWORK_TIMEOUT_SECONDS * 1000).toInt()
            connection.readTimeout = (AppConfig.NETWORK_TIMEOUT_SECONDS * 1000).toInt()

            // Add Authorization header if authenticated
            if (authenticated) {
                val token = tokenManager.getAccessToken()
                if (token != null) {
                    connection.setRequestProperty("Authorization", "Bearer $token")
                } else {
                    return@withContext Result.failure(ApiError.Unauthorized("Not authenticated"))
                }
            }

            // Write body if present
            if (body != null) {
                connection.doOutput = true
                OutputStreamWriter(connection.outputStream).use { writer ->
                    writer.write(body)
                }
            }

            // Read response
            val responseCode = connection.responseCode
            val responseBody = try {
                connection.inputStream.bufferedReader().use(BufferedReader::readText)
            } catch (e: Exception) {
                connection.errorStream?.bufferedReader()?.use(BufferedReader::readText) ?: ""
            }

            // Handle response
            when {
                responseCode in 200..299 -> {
                    Result.success(deserializer(responseBody))
                }
                responseCode == 401 -> {
                    val error = parseErrorResponse(responseBody)
                    Result.failure(ApiError.Unauthorized(error?.message ?: "Authentication required"))
                }
                responseCode == 403 -> {
                    val error = parseErrorResponse(responseBody)
                    Result.failure(ApiError.Forbidden(error?.message ?: "Access denied"))
                }
                responseCode == 404 -> {
                    val error = parseErrorResponse(responseBody)
                    Result.failure(ApiError.NotFound(error?.message ?: "Resource not found"))
                }
                else -> {
                    val error = parseErrorResponse(responseBody)
                    Result.failure(ApiError.ServerError(responseCode, error?.message ?: "Server error"))
                }
            }
        } catch (e: Exception) {
            Result.failure(ApiError.NetworkError(e.message ?: "Network error"))
        }
    }

    private fun parseErrorResponse(body: String): ErrorDetail? {
        return try {
            val json = JSONObject(body)
            val error = json.optJSONObject("error")
            if (error != null) {
                ErrorDetail(
                    code = error.optString("code", "UNKNOWN"),
                    message = error.optString("message", "Unknown error")
                )
            } else {
                null
            }
        } catch (e: Exception) {
            null
        }
    }

    companion object {
        @Volatile
        private var instance: ApiClient? = null

        fun getInstance(context: Context): ApiClient {
            return instance ?: synchronized(this) {
                instance ?: ApiClient(context.applicationContext).also { instance = it }
            }
        }
    }
}

/**
 * API error types
 */
sealed class ApiError(override val message: String) : Exception(message) {
    data class Unauthorized(override val message: String) : ApiError(message)
    data class Forbidden(override val message: String) : ApiError(message)
    data class NotFound(override val message: String) : ApiError(message)
    data class ServerError(val code: Int, override val message: String) : ApiError(message)
    data class NetworkError(override val message: String) : ApiError(message)
    data class DecodingError(override val message: String) : ApiError(message)

    val isUnauthorized: Boolean
        get() = this is Unauthorized
}

/**
 * API error response detail
 */
private data class ErrorDetail(
    val code: String,
    val message: String
)
