import Foundation

/// Application configuration
/// Contains all environment-specific settings
enum AppConfig {
    // MARK: - API Configuration

    /// Base URL for the API server
    static var apiBaseURL: String {
        #if DEBUG
        return "http://localhost:8080"
        #else
        return "https://api.timeless.app"
        #endif
    }

    /// API version prefix
    static let apiVersion = "v1"

    /// Full API base URL with version
    static var apiURL: String {
        "\(apiBaseURL)/api/\(apiVersion)"
    }

    // MARK: - Cognito Configuration

    /// AWS Cognito configuration (delegates to CognitoConfig)
    static var cognito: CognitoConfig {
        .shared
    }

    // MARK: - Timeouts

    /// Default network request timeout in seconds
    static let networkTimeout: TimeInterval = 30

    /// Token refresh buffer time in seconds (refresh before expiry)
    static let tokenRefreshBuffer: TimeInterval = 300 // 5 minutes
}
