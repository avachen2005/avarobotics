import SwiftUI

enum ColorToken {
    enum Primary {
        static let p50 = Color(hex: "#f5f3ff")
        static let p100 = Color(hex: "#ede9fe")
        static let p200 = Color(hex: "#ddd6fe")
        static let p300 = Color(hex: "#c4b5fd")
        static let p400 = Color(hex: "#a78bfa")
        static let p500 = Color(hex: "#8b5cf6")
        static let p600 = Color(hex: "#7c3aed")
        static let p700 = Color(hex: "#6d28d9")
        static let p800 = Color(hex: "#5b21b6")
        static let p900 = Color(hex: "#4c1d95")
    }

    enum Accent {
        static let a50 = Color(hex: "#fdf4ff")
        static let a100 = Color(hex: "#fae8ff")
        static let a200 = Color(hex: "#f5d0fe")
        static let a300 = Color(hex: "#f0abfc")
        static let a400 = Color(hex: "#e879f9")
        static let a500 = Color(hex: "#d946ef")
        static let a600 = Color(hex: "#c026d3")
        static let a700 = Color(hex: "#a21caf")
    }

    enum Secondary {
        static let s50 = Color(hex: "#ecfeff")
        static let s100 = Color(hex: "#cffafe")
        static let s200 = Color(hex: "#a5f3fc")
        static let s300 = Color(hex: "#67e8f9")
        static let s400 = Color(hex: "#22d3ee")
        static let s500 = Color(hex: "#06b6d4")
        static let s600 = Color(hex: "#0891b2")
    }

    enum Neutral {
        static let n50 = Color(hex: "#f8fafc")
        static let n100 = Color(hex: "#f1f5f9")
        static let n200 = Color(hex: "#e2e8f0")
        static let n300 = Color(hex: "#cbd5e1")
        static let n400 = Color(hex: "#94a3b8")
        static let n500 = Color(hex: "#64748b")
        static let n600 = Color(hex: "#475569")
        static let n700 = Color(hex: "#334155")
        static let n800 = Color(hex: "#1e293b")
        static let n900 = Color(hex: "#0f172a")
    }

    enum Semantic {
        static let white = Color(hex: "#ffffff")
        static let black = Color(hex: "#000000")
    }

    enum Status {
        static let success = Color(hex: "#22c55e")
        static let warning = Color(hex: "#f59e0b")
        static let error = Color(hex: "#ef4444")
        static let info = Color(hex: "#3b82f6")
    }
}
