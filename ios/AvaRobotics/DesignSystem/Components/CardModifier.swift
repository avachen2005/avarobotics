import SwiftUI

enum CardPadding {
    case small
    case medium
    case large

    var value: CGFloat {
        switch self {
        case .small: return SpacingToken.md
        case .medium: return SpacingToken.lg
        case .large: return SpacingToken.xl
        }
    }
}

struct CardModifier: ViewModifier {
    let padding: CardPadding

    func body(content: Content) -> some View {
        content
            .padding(padding.value)
            .background(ColorToken.Semantic.white)
            .clipShape(RoundedRectangle(cornerRadius: ShapeToken.CornerRadius.xxl))
            .tokenShadow(.lg)
    }
}

extension View {
    func cardStyle(padding: CardPadding = .medium) -> some View {
        modifier(CardModifier(padding: padding))
    }
}
