import SwiftUI

/// Primary button with gradient background
struct PrimaryButton: View {
    let title: String
    let icon: String?
    let action: () -> Void

    init(
        _ title: String,
        icon: String? = nil,
        action: @escaping () -> Void
    ) {
        self.title = title
        self.icon = icon
        self.action = action
    }

    var body: some View {
        Button(action: action) {
            HStack(spacing: Spacing.xs) {
                if let icon = icon {
                    Image(systemName: icon)
                        .font(.titleMedium)
                }
                Text(title)
                    .font(.titleMedium)
            }
            .foregroundColor(.textPrimary)
            .frame(maxWidth: .infinity)
            .padding(.vertical, Spacing.md)
            .background(LinearGradient.button)
            .cornerRadius(CornerRadius.lg)
        }
        .buttonStyle(.plain)
    }
}

/// Secondary outline button
struct SecondaryButton: View {
    let title: String
    let icon: String?
    let action: () -> Void

    init(
        _ title: String,
        icon: String? = nil,
        action: @escaping () -> Void
    ) {
        self.title = title
        self.icon = icon
        self.action = action
    }

    var body: some View {
        Button(action: action) {
            HStack(spacing: Spacing.xs) {
                if let icon = icon {
                    Image(systemName: icon)
                        .font(.titleMedium)
                }
                Text(title)
                    .font(.titleMedium)
            }
            .foregroundColor(.primary500)
            .frame(maxWidth: .infinity)
            .padding(.vertical, Spacing.md)
            .background(Color.clear)
            .overlay(
                RoundedRectangle(cornerRadius: CornerRadius.lg)
                    .stroke(Color.primary500, lineWidth: 1.5)
            )
        }
        .buttonStyle(.plain)
    }
}

#Preview {
    VStack(spacing: Spacing.md) {
        PrimaryButton("Sign in with Google", icon: "person.fill") {}
        SecondaryButton("Continue with Email", icon: "envelope.fill") {}
    }
    .padding()
    .background(Color.backgroundDark)
}
