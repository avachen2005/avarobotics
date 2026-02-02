import Foundation

/// HTTP client for API requests with automatic authentication
actor APIClient {
    static let shared = APIClient()

    private let tokenManager = TokenManager.shared
    private let session: URLSession
    private let baseURL: String
    private let decoder: JSONDecoder

    private init() {
        let config = URLSessionConfiguration.default
        config.timeoutIntervalForRequest = AppConfig.networkTimeout
        config.timeoutIntervalForResource = AppConfig.networkTimeout * 2

        self.session = URLSession(configuration: config)
        self.baseURL = AppConfig.apiURL
        self.decoder = JSONDecoder()
        self.decoder.keyDecodingStrategy = .convertFromSnakeCase
    }

    // MARK: - Public API

    /// Perform a GET request
    func get<T: Decodable>(_ path: String, authenticated: Bool = true) async throws -> T {
        let request = try await buildRequest(path: path, method: "GET", authenticated: authenticated)
        return try await perform(request)
    }

    /// Perform a POST request with body
    func post<T: Decodable, B: Encodable>(_ path: String, body: B, authenticated: Bool = true) async throws -> T {
        var request = try await buildRequest(path: path, method: "POST", authenticated: authenticated)
        request.httpBody = try JSONEncoder().encode(body)
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        return try await perform(request)
    }

    /// Perform a POST request without body
    func post<T: Decodable>(_ path: String, authenticated: Bool = true) async throws -> T {
        let request = try await buildRequest(path: path, method: "POST", authenticated: authenticated)
        return try await perform(request)
    }

    /// Perform a PUT request
    func put<T: Decodable, B: Encodable>(_ path: String, body: B, authenticated: Bool = true) async throws -> T {
        var request = try await buildRequest(path: path, method: "PUT", authenticated: authenticated)
        request.httpBody = try JSONEncoder().encode(body)
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        return try await perform(request)
    }

    /// Perform a DELETE request
    func delete<T: Decodable>(_ path: String, authenticated: Bool = true) async throws -> T {
        let request = try await buildRequest(path: path, method: "DELETE", authenticated: authenticated)
        return try await perform(request)
    }

    /// Perform a DELETE request without response body
    func delete(_ path: String, authenticated: Bool = true) async throws {
        let request = try await buildRequest(path: path, method: "DELETE", authenticated: authenticated)
        let _: EmptyResponse = try await perform(request)
    }

    // MARK: - Request Building

    private func buildRequest(path: String, method: String, authenticated: Bool) async throws -> URLRequest {
        guard let url = URL(string: "\(baseURL)\(path)") else {
            throw APIError.invalidURL
        }

        var request = URLRequest(url: url)
        request.httpMethod = method
        request.setValue("application/json", forHTTPHeaderField: "Accept")

        // Add Authorization header if authenticated
        if authenticated {
            let token = try await tokenManager.getAccessToken()
            request.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
        }

        return request
    }

    // MARK: - Request Execution

    private func perform<T: Decodable>(_ request: URLRequest) async throws -> T {
        let (data, response) = try await session.data(for: request)

        guard let httpResponse = response as? HTTPURLResponse else {
            throw APIError.invalidResponse
        }

        // Handle error responses
        if httpResponse.statusCode >= 400 {
            throw try handleErrorResponse(data: data, statusCode: httpResponse.statusCode)
        }

        // Handle empty response
        if T.self == EmptyResponse.self {
            return EmptyResponse() as! T
        }

        // Decode response
        do {
            return try decoder.decode(T.self, from: data)
        } catch {
            throw APIError.decodingFailed(error)
        }
    }

    private func handleErrorResponse(data: Data, statusCode: Int) throws -> APIError {
        // Try to decode error response
        if let errorResponse = try? decoder.decode(APIErrorResponse.self, from: data) {
            switch statusCode {
            case 401:
                return .unauthorized(errorResponse.error.message)
            case 403:
                return .forbidden(errorResponse.error.message)
            case 404:
                return .notFound(errorResponse.error.message)
            default:
                return .serverError(statusCode, errorResponse.error.message)
            }
        }

        // Fallback error
        switch statusCode {
        case 401:
            return .unauthorized("Authentication required")
        case 403:
            return .forbidden("Access denied")
        case 404:
            return .notFound("Resource not found")
        default:
            return .serverError(statusCode, "Server error")
        }
    }
}

// MARK: - Supporting Types

enum APIError: LocalizedError {
    case invalidURL
    case invalidResponse
    case unauthorized(String)
    case forbidden(String)
    case notFound(String)
    case serverError(Int, String)
    case decodingFailed(Error)
    case networkError(Error)

    var errorDescription: String? {
        switch self {
        case .invalidURL:
            return "Invalid URL"
        case .invalidResponse:
            return "Invalid response from server"
        case .unauthorized(let message):
            return message
        case .forbidden(let message):
            return message
        case .notFound(let message):
            return message
        case .serverError(let code, let message):
            return "Server error (\(code)): \(message)"
        case .decodingFailed(let error):
            return "Failed to decode response: \(error.localizedDescription)"
        case .networkError(let error):
            return "Network error: \(error.localizedDescription)"
        }
    }

    var isUnauthorized: Bool {
        if case .unauthorized = self {
            return true
        }
        return false
    }
}

/// API error response format
private struct APIErrorResponse: Decodable {
    let error: APIErrorDetail
}

private struct APIErrorDetail: Decodable {
    let code: String
    let message: String
}

/// Empty response for requests that don't return data
struct EmptyResponse: Decodable {}
