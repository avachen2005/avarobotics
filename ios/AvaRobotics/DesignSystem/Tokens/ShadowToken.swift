import SwiftUI

enum ShadowToken: CaseIterable {
    case sm
    case md
    case lg
    case xl
    case xxl
    case glowPurple
    case glowPink
    case glowCyan

    var radius: CGFloat {
        switch self {
        case .sm: return 2
        case .md: return 6
        case .lg: return 15
        case .xl: return 25
        case .xxl: return 50
        case .glowPurple, .glowPink, .glowCyan: return 30
        }
    }

    var x: CGFloat {
        switch self {
        case .sm, .md, .lg, .xl, .xxl: return 0
        case .glowPurple, .glowPink, .glowCyan: return 0
        }
    }

    var y: CGFloat {
        switch self {
        case .sm: return 1
        case .md: return 4
        case .lg: return 10
        case .xl: return 20
        case .xxl: return 25
        case .glowPurple, .glowPink, .glowCyan: return 0
        }
    }

    var color: Color {
        switch self {
        case .sm: return Color.black.opacity(OpacityToken.opacity5)
        case .md: return Color.black.opacity(OpacityToken.opacity10)
        case .lg: return Color.black.opacity(OpacityToken.opacity10)
        case .xl: return Color.black.opacity(OpacityToken.opacity10)
        case .xxl: return Color.black.opacity(0.25)
        case .glowPurple: return Color(hex: "#8b5cf6").opacity(OpacityToken.opacity50)
        case .glowPink: return Color(hex: "#d946ef").opacity(OpacityToken.opacity50)
        case .glowCyan: return Color(hex: "#22d3ee").opacity(OpacityToken.opacity50)
        }
    }
}

struct ShadowModifier: ViewModifier {
    let token: ShadowToken

    func body(content: Content) -> some View {
        content
            .shadow(color: token.color, radius: token.radius, x: token.x, y: token.y)
    }
}
