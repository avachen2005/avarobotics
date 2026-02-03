import SwiftUI

/// Timeless Design System Colors
/// Tech Neon (科技霓虹風格)
extension Color {
    // MARK: - Primary (科技紫)
    static let primary50 = Color(hex: "#f5f3ff")
    static let primary100 = Color(hex: "#ede9fe")
    static let primary200 = Color(hex: "#ddd6fe")
    static let primary300 = Color(hex: "#c4b5fd")
    static let primary400 = Color(hex: "#a78bfa")
    static let primary500 = Color(hex: "#8b5cf6") // ⭐ Main
    static let primary600 = Color(hex: "#7c3aed")
    static let primary700 = Color(hex: "#6d28d9")
    static let primary800 = Color(hex: "#5b21b6")
    static let primary900 = Color(hex: "#4c1d95")

    // MARK: - Accent (霓虹粉紫)
    static let accent50 = Color(hex: "#fdf4ff")
    static let accent100 = Color(hex: "#fae8ff")
    static let accent200 = Color(hex: "#f5d0fe")
    static let accent300 = Color(hex: "#f0abfc")
    static let accent400 = Color(hex: "#e879f9") // ⭐ Main
    static let accent500 = Color(hex: "#d946ef")
    static let accent600 = Color(hex: "#c026d3")
    static let accent700 = Color(hex: "#a21caf")

    // MARK: - Secondary (科技青)
    static let secondary50 = Color(hex: "#ecfeff")
    static let secondary100 = Color(hex: "#cffafe")
    static let secondary200 = Color(hex: "#a5f3fc")
    static let secondary300 = Color(hex: "#67e8f9")
    static let secondary400 = Color(hex: "#22d3ee") // ⭐ Main
    static let secondary500 = Color(hex: "#06b6d4")
    static let secondary600 = Color(hex: "#0891b2")

    // MARK: - Background
    static let backgroundDark = Color(hex: "#0a0a0f")
    static let backgroundCard = Color(hex: "#12121a")
    static let backgroundElevated = Color(hex: "#1a1a24")

    // MARK: - Surface
    static let surface = Color(hex: "#18181b")
    static let surfaceHover = Color(hex: "#27272a")
    static let surfaceBorder = Color(hex: "#3f3f46")

    // MARK: - Text
    static let textPrimary = Color(hex: "#fafafa")
    static let textSecondary = Color(hex: "#a1a1aa")
    static let textMuted = Color(hex: "#71717a")
}

// MARK: - Hex Color Extension
extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (1, 1, 1, 0)
        }
        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue: Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}
