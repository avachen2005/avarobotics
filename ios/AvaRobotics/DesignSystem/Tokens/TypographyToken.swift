import SwiftUI

enum TypographyToken: CaseIterable {
    case display1
    case display2
    case heading1
    case heading2
    case heading3
    case bodyLarge
    case bodyRegular
    case bodyMedium
    case bodySemibold
    case bodySmall
    case bodySmallMedium
    case caption
    case captionMedium
    case buttonLarge
    case buttonMedium
    case buttonSmall
    case label
    case input

    var size: CGFloat {
        switch self {
        case .display1: return 36
        case .display2: return 30
        case .heading1: return 24
        case .heading2: return 20
        case .heading3: return 18
        case .bodyLarge: return 18
        case .bodyRegular: return 16
        case .bodyMedium: return 16
        case .bodySemibold: return 16
        case .bodySmall: return 14
        case .bodySmallMedium: return 14
        case .caption: return 12
        case .captionMedium: return 12
        case .buttonLarge: return 18
        case .buttonMedium: return 16
        case .buttonSmall: return 14
        case .label: return 14
        case .input: return 16
        }
    }

    var weight: Font.Weight {
        switch self {
        case .display1: return .bold
        case .display2: return .bold
        case .heading1: return .semibold
        case .heading2: return .semibold
        case .heading3: return .semibold
        case .bodyLarge: return .regular
        case .bodyRegular: return .regular
        case .bodyMedium: return .medium
        case .bodySemibold: return .semibold
        case .bodySmall: return .regular
        case .bodySmallMedium: return .medium
        case .caption: return .regular
        case .captionMedium: return .medium
        case .buttonLarge: return .semibold
        case .buttonMedium: return .medium
        case .buttonSmall: return .medium
        case .label: return .medium
        case .input: return .regular
        }
    }

    var lineSpacing: CGFloat {
        switch self {
        case .display1: return 4
        case .display2: return 4
        case .heading1: return 2
        case .heading2: return 2
        case .heading3: return 2
        case .bodyLarge: return 4
        case .bodyRegular: return 4
        case .bodyMedium: return 4
        case .bodySemibold: return 4
        case .bodySmall: return 3
        case .bodySmallMedium: return 3
        case .caption: return 2
        case .captionMedium: return 2
        case .buttonLarge: return 0
        case .buttonMedium: return 0
        case .buttonSmall: return 0
        case .label: return 0
        case .input: return 0
        }
    }

    var tracking: CGFloat {
        switch self {
        case .display1: return -0.5
        case .display2: return -0.5
        case .heading1: return 0
        case .heading2: return 0
        case .heading3: return 0
        case .bodyLarge: return 0
        case .bodyRegular: return 0
        case .bodyMedium: return 0
        case .bodySemibold: return 0
        case .bodySmall: return 0
        case .bodySmallMedium: return 0
        case .caption: return 0
        case .captionMedium: return 0
        case .buttonLarge: return 0.5
        case .buttonMedium: return 0.5
        case .buttonSmall: return 0.5
        case .label: return 0.5
        case .input: return 0
        }
    }

    var relativeTo: Font.TextStyle {
        switch self {
        case .display1: return .largeTitle
        case .display2: return .title
        case .heading1: return .title2
        case .heading2: return .title3
        case .heading3: return .headline
        case .bodyLarge: return .body
        case .bodyRegular: return .body
        case .bodyMedium: return .body
        case .bodySemibold: return .body
        case .bodySmall: return .callout
        case .bodySmallMedium: return .callout
        case .caption: return .caption
        case .captionMedium: return .caption
        case .buttonLarge: return .headline
        case .buttonMedium: return .body
        case .buttonSmall: return .callout
        case .label: return .callout
        case .input: return .body
        }
    }

    var font: Font {
        .system(size: size, weight: weight, design: .default)
    }
}

struct TypographyModifier: ViewModifier {
    let token: TypographyToken

    @ScaledMetric private var scaledSize: CGFloat

    init(token: TypographyToken) {
        self.token = token
        _scaledSize = ScaledMetric(wrappedValue: token.size, relativeTo: token.relativeTo)
    }

    func body(content: Content) -> some View {
        content
            .font(.system(size: scaledSize, weight: token.weight, design: .default))
            .lineSpacing(token.lineSpacing)
            .tracking(token.tracking)
    }
}
