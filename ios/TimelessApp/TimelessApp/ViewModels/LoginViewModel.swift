import SwiftUI
import AuthenticationServices

/// ViewModel for login flow
@MainActor
class LoginViewModel: ObservableObject {
    @Published var isLoading = false
    @Published var showError = false
    @Published var errorMessage = ""

    private let authService = AuthService.shared

    func signInWithGoogle() {
        Task {
            isLoading = true
            defer { isLoading = false }

            do {
                try await authService.signInWithGoogle()
            } catch {
                errorMessage = error.localizedDescription
                showError = true
            }
        }
    }

    func signInWithApple() {
        Task {
            isLoading = true
            defer { isLoading = false }

            do {
                try await authService.signInWithApple()
            } catch {
                errorMessage = error.localizedDescription
                showError = true
            }
        }
    }
}
