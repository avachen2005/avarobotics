import SwiftUI

struct BrandedTextFieldStyle: TextFieldStyle {
    @FocusState private var isFocused: Bool
    var isError: Bool = false

    func _body(configuration: TextField<Self._Label>) -> some View {
        configuration
            .typography(.input)
            .padding(.vertical, 12)
            .padding(.horizontal, SpacingToken.md)
            .background(
                RoundedRectangle(cornerRadius: ShapeToken.CornerRadius.lg)
                    .strokeBorder(borderColor, lineWidth: ShapeToken.BorderWidth.regular)
            )
            .focused($isFocused)
    }

    private var borderColor: Color {
        if isError {
            return ColorToken.Status.error
        } else if isFocused {
            return ColorToken.Primary.p500
        } else {
            return ColorToken.Neutral.n200
        }
    }
}

extension TextFieldStyle where Self == BrandedTextFieldStyle {
    static var branded: BrandedTextFieldStyle { BrandedTextFieldStyle() }
}
