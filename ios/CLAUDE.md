# iOS App

## Conventions
- Swift 5.9+
- SwiftUI for UI
- MVVM architecture
- Target iOS 15+

## Project Structure
```
ios/
├── AvaRobotics/
│   ├── App/                  # App entry point, configuration
│   ├── Views/                # SwiftUI views
│   │   ├── Screens/          # Full screen views
│   │   └── Components/       # Reusable view components
│   ├── ViewModels/           # ObservableObject ViewModels
│   ├── Models/               # Data models (Codable structs)
│   ├── Services/             # Network, persistence services
│   ├── Repositories/         # Data access layer
│   └── Utilities/            # Extensions, helpers
├── AvaRoboticsTests/
└── AvaRoboticsUITests/
```

## Architecture
- **Views**: SwiftUI views, stateless when possible
- **ViewModels**: `@Observable` or `ObservableObject` with `@Published` properties
- **Services**: Protocol-based for testability
- **Repositories**: Abstract data sources (API, CoreData, UserDefaults)

## SwiftUI Guidelines
- Use `@State` for local view state
- Use `@Binding` for two-way child communication
- Use `@Environment` for dependency injection
- Prefer small, composable views
- Use `async/await` for asynchronous operations

## Naming Conventions
- Views: `<Name>View` (e.g., `ProfileView`)
- ViewModels: `<Name>ViewModel` (e.g., `ProfileViewModel`)
- Use named closure parameters for readability

## Code Style
- Follow Swift API Design Guidelines
- Use `swift-format` for consistent formatting
- Prefer value types (structs) over reference types (classes)
- Use `Result` type or `async throws` for error handling

## Testing
- Unit tests for ViewModels and Services (XCTest)
- Use protocols and dependency injection for mocking
- UI tests with XCUITest for critical flows

## Dependencies
- Use Swift Package Manager (SPM) for dependencies
- Minimize external dependencies
