# Android App

## Conventions
- Kotlin 1.9+
- Jetpack Compose for UI
- MVVM architecture with Clean Architecture principles
- Target API 28+ (Android 9.0+)

## Project Structure
```
android/
├── app/
│   └── src/main/java/com/avarobotics/
│       ├── ui/               # Compose UI components
│       │   ├── screens/      # Screen composables
│       │   ├── components/   # Reusable composables
│       │   └── theme/        # Material theme
│       ├── viewmodel/        # ViewModels
│       ├── domain/           # Use cases
│       ├── data/             # Repositories & data sources
│       │   ├── repository/
│       │   ├── remote/       # API clients
│       │   └── local/        # Room database
│       └── di/               # Dependency injection (Hilt)
└── build.gradle.kts
```

## Architecture
- **UI Layer**: Compose screens observing ViewModel StateFlow
- **ViewModel**: Holds UI state, calls use cases
- **Domain**: Use cases with single responsibility
- **Data**: Repository pattern abstracting data sources

## Compose Guidelines
- Use state hoisting - composables should be stateless when possible
- Prefer `remember` and `derivedStateOf` for performance
- Use `LaunchedEffect` for side effects
- Follow Material 3 design guidelines

## Dependency Injection
- Use Hilt for DI
- Annotate ViewModels with `@HiltViewModel`
- Use `@Inject constructor` for dependencies

## Testing
- Unit tests for ViewModels and Use Cases (JUnit + MockK)
- UI tests with Compose Testing (composeTestRule)
- Target >80% coverage for ViewModels

## Code Style
- Follow Kotlin coding conventions
- Use `ktlint` for formatting
- Prefer immutable data (`val`, `data class`)
