import Foundation

/// Cognito configuration
/// Update these values from your Terraform output or AWS Console
struct CognitoConfig {
    static let shared = CognitoConfig()

    /// AWS region where Cognito is deployed
    let region = "ap-northeast-1"

    /// Cognito User Pool ID
    let userPoolId = "ap-northeast-1_xxx"

    /// Cognito App Client ID
    let clientId = "xxxxxxxxxxxxxxxxxx"

    /// Cognito Hosted UI domain (without https://)
    let domain = "your-domain.auth.ap-northeast-1.amazoncognito.com"

    /// OAuth callback URL scheme (must match Info.plist)
    let callbackURLScheme = "timeless"

    /// OAuth callback URL
    var callbackURL: String {
        "\(callbackURLScheme)://callback"
    }

    /// OAuth sign-out callback URL
    var signOutURL: String {
        "\(callbackURLScheme)://signout"
    }

    private init() {}
}
