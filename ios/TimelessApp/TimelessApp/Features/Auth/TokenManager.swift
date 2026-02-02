import Foundation

/// Manages authentication tokens with secure storage and automatic refresh
actor TokenManager {
    static let shared = TokenManager()

    private let keychain = KeychainService.shared
    private let config = CognitoConfig.shared

    /// Current tokens, if available
    private var cachedTokens: AuthTokens?

    /// Lock to prevent multiple simultaneous refresh operations
    private var isRefreshing = false

    /// Callbacks waiting for refresh to complete
    private var refreshCallbacks: [(Result<AuthTokens, Error>) -> Void] = []

    private init() {}

    // MARK: - Public API

    /// Get a valid access token, refreshing if necessary
    func getAccessToken() async throws -> String {
        // Try to get cached tokens
        let tokens = try await getTokens()

        guard let tokens = tokens else {
            throw TokenError.notAuthenticated
        }

        // Check if token is expired or about to expire
        if tokens.isAccessTokenExpired {
            let refreshedTokens = try await refreshTokens(tokens.refreshToken)
            return refreshedTokens.accessToken
        }

        return tokens.accessToken
    }

    /// Save tokens after successful authentication
    func saveTokens(_ tokens: AuthTokens) async throws {
        try await keychain.saveTokens(tokens)
        cachedTokens = tokens
    }

    /// Get current tokens from cache or Keychain
    func getTokens() async throws -> AuthTokens? {
        if let cached = cachedTokens {
            return cached
        }

        let tokens = try await keychain.getTokens()
        cachedTokens = tokens
        return tokens
    }

    /// Clear all tokens (sign out)
    func clearTokens() async throws {
        try await keychain.deleteTokens()
        cachedTokens = nil
    }

    /// Check if user has valid tokens
    func hasValidTokens() async -> Bool {
        do {
            let tokens = try await getTokens()
            return tokens != nil && !(tokens?.isAccessTokenExpired ?? true)
        } catch {
            return false
        }
    }

    // MARK: - Token Refresh

    /// Refresh tokens using the refresh token
    private func refreshTokens(_ refreshToken: String) async throws -> AuthTokens {
        // If already refreshing, wait for the result
        if isRefreshing {
            return try await withCheckedThrowingContinuation { continuation in
                refreshCallbacks.append { result in
                    continuation.resume(with: result)
                }
            }
        }

        isRefreshing = true
        defer {
            isRefreshing = false
            refreshCallbacks.removeAll()
        }

        do {
            let tokens = try await performTokenRefresh(refreshToken)
            try await saveTokens(tokens)

            // Notify waiting callbacks
            for callback in refreshCallbacks {
                callback(.success(tokens))
            }

            return tokens
        } catch {
            // Notify waiting callbacks of failure
            for callback in refreshCallbacks {
                callback(.failure(error))
            }
            throw error
        }
    }

    /// Perform the actual token refresh HTTP request
    private func performTokenRefresh(_ refreshToken: String) async throws -> AuthTokens {
        let url = URL(string: "https://\(config.domain)/oauth2/token")!

        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/x-www-form-urlencoded", forHTTPHeaderField: "Content-Type")

        let body = [
            "grant_type": "refresh_token",
            "client_id": config.clientId,
            "refresh_token": refreshToken
        ]
        request.httpBody = body
            .map { "\($0.key)=\($0.value)" }
            .joined(separator: "&")
            .data(using: .utf8)

        let (data, response) = try await URLSession.shared.data(for: request)

        guard let httpResponse = response as? HTTPURLResponse else {
            throw TokenError.invalidResponse
        }

        guard httpResponse.statusCode == 200 else {
            throw TokenError.refreshFailed(httpResponse.statusCode)
        }

        let tokenResponse = try JSONDecoder().decode(TokenResponse.self, from: data)

        return AuthTokens(
            accessToken: tokenResponse.access_token,
            idToken: tokenResponse.id_token,
            refreshToken: tokenResponse.refresh_token ?? refreshToken,
            expiresAt: Date().addingTimeInterval(TimeInterval(tokenResponse.expires_in))
        )
    }
}

// MARK: - Supporting Types

enum TokenError: LocalizedError {
    case notAuthenticated
    case invalidResponse
    case refreshFailed(Int)
    case expired

    var errorDescription: String? {
        switch self {
        case .notAuthenticated:
            return "Not authenticated"
        case .invalidResponse:
            return "Invalid response from server"
        case .refreshFailed(let code):
            return "Token refresh failed with status \(code)"
        case .expired:
            return "Session expired, please sign in again"
        }
    }
}

private struct TokenResponse: Codable {
    let access_token: String
    let id_token: String
    let refresh_token: String?
    let expires_in: Int
    let token_type: String
}
