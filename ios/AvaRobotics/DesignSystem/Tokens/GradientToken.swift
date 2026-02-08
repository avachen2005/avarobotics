import SwiftUI

enum GradientToken {
    static let primary = LinearGradient(
        colors: primaryStops,
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )

    static let accent = LinearGradient(
        colors: accentStops,
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )

    static let secondary = LinearGradient(
        colors: secondaryStops,
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )

    static let neon = LinearGradient(
        colors: neonStops,
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )

    static let tech = LinearGradient(
        colors: techStops,
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )

    static let background = LinearGradient(
        colors: backgroundStops,
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )

    // Exposed for testability
    static let primaryStops: [Color] = [
        ColorToken.Primary.p500,
        ColorToken.Primary.p700,
        ColorToken.Primary.p800
    ]

    static let accentStops: [Color] = [
        ColorToken.Accent.a400,
        ColorToken.Accent.a500,
        ColorToken.Accent.a600
    ]

    static let secondaryStops: [Color] = [
        ColorToken.Secondary.s400,
        ColorToken.Secondary.s500,
        ColorToken.Secondary.s600
    ]

    static let neonStops: [Color] = [
        ColorToken.Primary.p500,
        ColorToken.Accent.a500,
        ColorToken.Secondary.s400
    ]

    static let techStops: [Color] = [
        ColorToken.Primary.p700,
        ColorToken.Accent.a700,
        ColorToken.Secondary.s600
    ]

    static let backgroundStops: [Color] = [
        ColorToken.Primary.p50,
        ColorToken.Accent.a50,
        ColorToken.Secondary.s50
    ]
}
