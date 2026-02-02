import Foundation

/// Represents the current authentication state of the user
enum AuthState: Equatable {
    /// User is not authenticated (no tokens)
    case anonymous

    /// User is authenticated with valid tokens
    case authenticated(User)

    /// Token refresh is in progress
    case refreshing

    /// Tokens have expired and refresh failed
    case expired

    /// Authentication error occurred
    case error(String)

    // MARK: - Convenience Properties

    /// Whether the user is currently authenticated
    var isAuthenticated: Bool {
        if case .authenticated = self {
            return true
        }
        return false
    }

    /// Whether authentication is in a loading/transitional state
    var isLoading: Bool {
        if case .refreshing = self {
            return true
        }
        return false
    }

    /// The authenticated user, if available
    var user: User? {
        if case .authenticated(let user) = self {
            return user
        }
        return nil
    }

    /// Error message, if in error state
    var errorMessage: String? {
        if case .error(let message) = self {
            return message
        }
        return nil
    }

    // MARK: - Equatable

    static func == (lhs: AuthState, rhs: AuthState) -> Bool {
        switch (lhs, rhs) {
        case (.anonymous, .anonymous):
            return true
        case (.authenticated(let lUser), .authenticated(let rUser)):
            return lUser.sub == rUser.sub
        case (.refreshing, .refreshing):
            return true
        case (.expired, .expired):
            return true
        case (.error(let lMsg), .error(let rMsg)):
            return lMsg == rMsg
        default:
            return false
        }
    }
}

/// User model representing the authenticated user
struct User: Codable, Equatable {
    /// Unique user identifier from Cognito
    let sub: String

    /// User's email address
    let email: String

    /// Display name from identity provider
    let name: String?

    /// Profile picture URL from identity provider
    let picture: String?
}
