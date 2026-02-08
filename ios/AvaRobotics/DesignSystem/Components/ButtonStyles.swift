import SwiftUI

struct BrandPrimaryButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .typography(.buttonMedium)
            .foregroundStyle(ColorToken.Semantic.white)
            .padding(.horizontal, SpacingToken.lg)
            .padding(.vertical, SpacingToken.md)
            .background(GradientToken.primary)
            .clipShape(Capsule())
            .tokenShadow(.md)
            .opacity(configuration.isPressed ? 0.8 : 1.0)
    }
}

struct BrandSecondaryButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .typography(.buttonMedium)
            .foregroundStyle(ColorToken.Semantic.white)
            .padding(.horizontal, SpacingToken.lg)
            .padding(.vertical, SpacingToken.md)
            .background(GradientToken.accent)
            .clipShape(Capsule())
            .tokenShadow(.md)
            .opacity(configuration.isPressed ? 0.8 : 1.0)
    }
}

struct BrandOutlineButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .typography(.buttonMedium)
            .foregroundStyle(ColorToken.Primary.p500)
            .padding(.horizontal, SpacingToken.lg)
            .padding(.vertical, SpacingToken.md)
            .background(
                Capsule()
                    .strokeBorder(ColorToken.Primary.p500, lineWidth: ShapeToken.BorderWidth.regular)
            )
            .opacity(configuration.isPressed ? 0.6 : 1.0)
    }
}

extension ButtonStyle where Self == BrandPrimaryButtonStyle {
    static var brandPrimary: BrandPrimaryButtonStyle { BrandPrimaryButtonStyle() }
}

extension ButtonStyle where Self == BrandSecondaryButtonStyle {
    static var brandSecondary: BrandSecondaryButtonStyle { BrandSecondaryButtonStyle() }
}

extension ButtonStyle where Self == BrandOutlineButtonStyle {
    static var brandOutline: BrandOutlineButtonStyle { BrandOutlineButtonStyle() }
}
