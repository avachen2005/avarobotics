import Foundation

/// AWS Cognito configuration
/// Update these values from your Terraform output or AWS Console
struct AWSConfig {
    /// AWS region where Cognito is deployed
    static let region = "ap-northeast-1"

    /// Cognito User Pool ID
    static let userPoolId = "ap-northeast-1_xxx"

    /// Cognito App Client ID
    static let clientId = "xxxxxxxxxxxxxxxxxx"

    /// Cognito Hosted UI domain
    static let domain = "your-domain.auth.ap-northeast-1.amazoncognito.com"

    /// OAuth callback URL scheme (must match Info.plist)
    static let callbackURLScheme = "yogaapp"

    /// OAuth callback URL
    static var callbackURL: String {
        "\(callbackURLScheme)://callback"
    }

    /// OAuth sign-out callback URL
    static var signOutURL: String {
        "\(callbackURLScheme)://signout"
    }
}
