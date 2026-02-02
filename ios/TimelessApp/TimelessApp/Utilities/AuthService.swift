import AuthenticationServices
import Foundation

/// Authentication service using native OAuth
/// Uses ASWebAuthenticationSession for Cognito Hosted UI
actor AuthService {
    static let shared = AuthService()

    private let config = CognitoConfig.shared
    private let keychain = KeychainService.shared

    private init() {}

    // MARK: - Google Sign In via Cognito Hosted UI

    @MainActor
    func signInWithGoogle() async throws {
        let authURL = buildAuthURL(identityProvider: "Google")
        let callbackScheme = config.callbackURLScheme

        let url = try await withCheckedThrowingContinuation { (continuation: CheckedContinuation<URL, Error>) in
            let session = ASWebAuthenticationSession(
                url: authURL,
                callbackURLScheme: callbackScheme
            ) { callbackURL, error in
                if let error = error {
                    continuation.resume(throwing: error)
                } else if let callbackURL = callbackURL {
                    continuation.resume(returning: callbackURL)
                } else {
                    continuation.resume(throwing: AuthError.unknownError)
                }
            }

            session.presentationContextProvider = ASWebAuthenticationPresentationContextProvider.shared
            session.prefersEphemeralWebBrowserSession = false

            if !session.start() {
                continuation.resume(throwing: AuthError.failedToStartSession)
            }
        }

        // Exchange authorization code for tokens
        let tokens = try await exchangeCodeForTokens(callbackURL: url)
        try await keychain.saveTokens(tokens)
    }

    // MARK: - Apple Sign In

    @MainActor
    func signInWithApple() async throws {
        // Apple Sign In implementation
        // Uses ASAuthorizationController
        throw AuthError.notImplemented
    }

    // MARK: - Token Management

    func getAccessToken() async throws -> String {
        guard let tokens = try await keychain.getTokens() else {
            throw AuthError.notAuthenticated
        }

        // Check if access token is expired
        if tokens.isAccessTokenExpired {
            let newTokens = try await refreshTokens(refreshToken: tokens.refreshToken)
            try await keychain.saveTokens(newTokens)
            return newTokens.accessToken
        }

        return tokens.accessToken
    }

    func signOut() async throws {
        try await keychain.deleteTokens()
    }

    // MARK: - Private Methods

    private func buildAuthURL(identityProvider: String) -> URL {
        var components = URLComponents()
        components.scheme = "https"
        components.host = config.domain
        components.path = "/oauth2/authorize"
        components.queryItems = [
            URLQueryItem(name: "client_id", value: config.clientId),
            URLQueryItem(name: "response_type", value: "code"),
            URLQueryItem(name: "scope", value: "openid email profile"),
            URLQueryItem(name: "redirect_uri", value: config.callbackURL),
            URLQueryItem(name: "identity_provider", value: identityProvider)
        ]
        return components.url!
    }

    private func exchangeCodeForTokens(callbackURL: URL) async throws -> AuthTokens {
        // Parse authorization code from callback URL
        guard let components = URLComponents(url: callbackURL, resolvingAgainstBaseURL: false),
              let code = components.queryItems?.first(where: { $0.name == "code" })?.value else {
            throw AuthError.invalidCallback
        }

        // Exchange code for tokens
        var request = URLRequest(url: URL(string: "https://\(config.domain)/oauth2/token")!)
        request.httpMethod = "POST"
        request.setValue("application/x-www-form-urlencoded", forHTTPHeaderField: "Content-Type")

        let body = [
            "grant_type": "authorization_code",
            "client_id": config.clientId,
            "code": code,
            "redirect_uri": config.callbackURL
        ]
        request.httpBody = body.map { "\($0.key)=\($0.value)" }.joined(separator: "&").data(using: .utf8)

        let (data, response) = try await URLSession.shared.data(for: request)

        guard let httpResponse = response as? HTTPURLResponse,
              httpResponse.statusCode == 200 else {
            throw AuthError.tokenExchangeFailed
        }

        let tokenResponse = try JSONDecoder().decode(TokenResponse.self, from: data)
        return AuthTokens(
            accessToken: tokenResponse.access_token,
            idToken: tokenResponse.id_token,
            refreshToken: tokenResponse.refresh_token,
            expiresAt: Date().addingTimeInterval(TimeInterval(tokenResponse.expires_in))
        )
    }

    private func refreshTokens(refreshToken: String) async throws -> AuthTokens {
        var request = URLRequest(url: URL(string: "https://\(config.domain)/oauth2/token")!)
        request.httpMethod = "POST"
        request.setValue("application/x-www-form-urlencoded", forHTTPHeaderField: "Content-Type")

        let body = [
            "grant_type": "refresh_token",
            "client_id": config.clientId,
            "refresh_token": refreshToken
        ]
        request.httpBody = body.map { "\($0.key)=\($0.value)" }.joined(separator: "&").data(using: .utf8)

        let (data, response) = try await URLSession.shared.data(for: request)

        guard let httpResponse = response as? HTTPURLResponse,
              httpResponse.statusCode == 200 else {
            throw AuthError.tokenRefreshFailed
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

struct TokenResponse: Codable {
    let access_token: String
    let id_token: String
    let refresh_token: String?
    let expires_in: Int
    let token_type: String
}

struct AuthTokens: Codable {
    let accessToken: String
    let idToken: String
    let refreshToken: String
    let expiresAt: Date

    var isAccessTokenExpired: Bool {
        Date() >= expiresAt.addingTimeInterval(-300) // 5 min buffer
    }
}

enum AuthError: LocalizedError {
    case failedToStartSession
    case invalidCallback
    case tokenExchangeFailed
    case tokenRefreshFailed
    case notAuthenticated
    case notImplemented
    case unknownError

    var errorDescription: String? {
        switch self {
        case .failedToStartSession: return "Failed to start authentication session"
        case .invalidCallback: return "Invalid authentication callback"
        case .tokenExchangeFailed: return "Failed to exchange authorization code"
        case .tokenRefreshFailed: return "Failed to refresh tokens"
        case .notAuthenticated: return "Not authenticated"
        case .notImplemented: return "Not implemented"
        case .unknownError: return "Unknown error occurred"
        }
    }
}

// MARK: - Presentation Context Provider

class ASWebAuthenticationPresentationContextProvider: NSObject, ASWebAuthenticationPresentationContextProviding {
    static let shared = ASWebAuthenticationPresentationContextProvider()

    func presentationAnchor(for session: ASWebAuthenticationSession) -> ASPresentationAnchor {
        guard let scene = UIApplication.shared.connectedScenes.first as? UIWindowScene,
              let window = scene.windows.first else {
            return ASPresentationAnchor()
        }
        return window
    }
}
