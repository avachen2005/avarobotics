import SwiftUI

/// Login screen - Step 1 of onboarding flow
struct LoginView: View {
    @StateObject private var viewModel = LoginViewModel()

    var body: some View {
        ZStack {
            // Background
            Color.backgroundDark
                .ignoresSafeArea()

            VStack(spacing: Spacing.xl) {
                Spacer()

                // Logo and title
                VStack(spacing: Spacing.md) {
                    Image(systemName: "infinity")
                        .font(.system(size: 64))
                        .foregroundStyle(LinearGradient.neonGlow)

                    Text("Timeless")
                        .font(.displaySmall)
                        .foregroundColor(.textPrimary)

                    Text("Strive on your timeless journey")
                        .font(.bodyLarge)
                        .foregroundColor(.textSecondary)
                }

                Spacer()

                // Login buttons
                VStack(spacing: Spacing.md) {
                    // Google Sign In
                    Button(action: { viewModel.signInWithGoogle() }) {
                        HStack(spacing: Spacing.sm) {
                            Image(systemName: "g.circle.fill")
                                .font(.title2)
                            Text("Sign in with Google")
                                .font(.titleMedium)
                        }
                        .foregroundColor(.textPrimary)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, Spacing.md)
                        .background(Color.surface)
                        .cornerRadius(CornerRadius.lg)
                        .overlay(
                            RoundedRectangle(cornerRadius: CornerRadius.lg)
                                .stroke(Color.surfaceBorder, lineWidth: 1)
                        )
                    }
                    .buttonStyle(.plain)

                    // Apple Sign In (optional)
                    Button(action: { viewModel.signInWithApple() }) {
                        HStack(spacing: Spacing.sm) {
                            Image(systemName: "apple.logo")
                                .font(.title2)
                            Text("Sign in with Apple")
                                .font(.titleMedium)
                        }
                        .foregroundColor(.textPrimary)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, Spacing.md)
                        .background(Color.surface)
                        .cornerRadius(CornerRadius.lg)
                        .overlay(
                            RoundedRectangle(cornerRadius: CornerRadius.lg)
                                .stroke(Color.surfaceBorder, lineWidth: 1)
                        )
                    }
                    .buttonStyle(.plain)
                }

                // Terms
                Text("By continuing, you agree to our Terms and Privacy Policy")
                    .font(.bodySmall)
                    .foregroundColor(.textMuted)
                    .multilineTextAlignment(.center)
                    .padding(.top, Spacing.md)
            }
            .padding(.horizontal, Spacing.lg)
            .padding(.bottom, Spacing.xxl)
        }
        .alert("Error", isPresented: $viewModel.showError) {
            Button("OK", role: .cancel) {}
        } message: {
            Text(viewModel.errorMessage)
        }
    }
}

#Preview {
    LoginView()
}
