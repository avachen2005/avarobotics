import Foundation

enum ShapeToken {
    enum CornerRadius {
        static let none: CGFloat = 0
        static let sm: CGFloat = 6
        static let md: CGFloat = 8
        static let lg: CGFloat = 12
        static let xl: CGFloat = 16
        static let xxl: CGFloat = 24
        static let xxxl: CGFloat = 28
        static let full: CGFloat = 9999
    }

    enum BorderWidth {
        static let thin: CGFloat = 1
        static let regular: CGFloat = 2
    }
}
