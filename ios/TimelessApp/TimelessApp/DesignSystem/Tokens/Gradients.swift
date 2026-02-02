import SwiftUI

/// Timeless Design System Gradients
extension LinearGradient {
    /// Primary gradient - 科技紫漸層
    static let primary = LinearGradient(
        colors: [.primary500, .accent400],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )

    /// Neon glow gradient
    static let neonGlow = LinearGradient(
        colors: [.primary400, .accent400, .secondary400],
        startPoint: .leading,
        endPoint: .trailing
    )

    /// Card background gradient
    static let cardBackground = LinearGradient(
        colors: [.backgroundCard, .backgroundElevated],
        startPoint: .top,
        endPoint: .bottom
    )

    /// Button gradient
    static let button = LinearGradient(
        colors: [.primary500, .primary600],
        startPoint: .top,
        endPoint: .bottom
    )
}
