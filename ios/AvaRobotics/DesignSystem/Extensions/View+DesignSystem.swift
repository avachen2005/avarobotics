import SwiftUI

extension View {
    func typography(_ token: TypographyToken) -> some View {
        modifier(TypographyModifier(token: token))
    }

    func tokenShadow(_ token: ShadowToken) -> some View {
        modifier(ShadowModifier(token: token))
    }
}
