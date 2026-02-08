# Research: Android Design Tokens

Research findings for implementing a design token system in Kotlin/Jetpack Compose.

## Table of Contents

- [Theme Architecture](#theme-architecture)
- [Semantic Color Strategy](#semantic-color-strategy)
- [Shadow and Glow Effects](#shadow-and-glow-effects)
- [Gradient Brushes](#gradient-brushes)
- [Debug-Only Catalog Screen](#debug-only-catalog-screen)
- [CompositionLocal Usage](#compositionlocal-usage)
- [Android Project Bootstrap](#android-project-bootstrap)

---

## Theme Architecture

**Decision**: Extend MaterialTheme (Approach 1) with parallel CompositionLocal subsystems for spacing, elevation, extended colors, and gradients.

**Rationale**: This keeps all Material 3 components working out of the box while layering custom tokens on top. Google's official documentation recommends this approach for apps that need custom design tokens beyond Material's defaults.

**Alternatives considered**:
- Replace Material subsystems (Approach 2): Requires wrapping every Material component to apply custom values. Too much boilerplate.
- Fully custom design system (Approach 3): Loses all Material component defaults. Excessive for our needs since we want to leverage Material 3 components.

**Architecture layers**:
1. `@Immutable` data classes defining token values (system classes)
2. `staticCompositionLocalOf` instances storing defaults (CompositionLocals)
3. `@Composable` theme function building values and providing via `CompositionLocalProvider`
4. Kotlin `object` with `@Composable` getter properties for convenient access (theme object)

## Semantic Color Strategy

**Decision**: Parallel `@Immutable` data class + `staticCompositionLocalOf` for extended/semantic colors, separate from Material's `ColorScheme`.

**Rationale**: Material 3's `ColorScheme` is a fixed `data class` with 29 color roles and cannot be subclassed. A parallel system allows us to define custom semantic roles (background, surface, onPrimary, etc.) that can hold different values for light vs dark themes.

**Alternatives considered**:
- Extension properties on `ColorScheme`: Cannot vary by theme instance. Values are hardcoded or require `@Composable` context checks, breaking clean theme composition.
- Stuffing values into Material's existing roles: Misuses Material semantics and breaks Material component defaults.

**Naming convention**: Follow Material 3's pattern. For every surface color, define a corresponding `on` color for accessible contrast (e.g., `background` / `onBackground`, `surface` / `onSurface`).

## Shadow and Glow Effects

**Decision**: Use `Modifier.dropShadow()` from Compose 1.9+ (Compose BOM 2025.08.00) for all shadow and glow effects.

**Rationale**: First-party API with full customization (radius, spread, color, offset, brush, alpha). Supports colored glow effects natively. No third-party dependencies needed.

**Alternatives considered**:
- `Modifier.shadow()`: Only supports Material elevation. Cannot control blur, spread, offset, or color independently.
- `BlurMaskFilter` via `drawBehind`: Manual approach; inconsistent rendering on API 26 and below with hardware acceleration. Only needed for pre-Compose 1.9.
- Third-party `compose-ShadowGlow` library: Unnecessary since Compose 1.9 provides the same capability natively.

**Glow effect implementation**: Use `Modifier.dropShadow()` with `color` set to the brand color (with alpha), `radius` set to 30dp (matching web's 30px blur), `spread` at 0dp, and `offset` at `DpOffset.Zero` for centered glow.

## Gradient Brushes

**Decision**: Define reusable `Brush` properties in a centralized `AppGradients` object. Use `Brush.linearGradient()` with explicit color stops.

**Rationale**: Brush factory methods return lightweight objects suitable as constants. No need for `CompositionLocal` since gradients don't change based on theme (light theme only for now). The 135-degree angle maps to a top-left-to-bottom-right `linearGradient` with `start = Offset(0f, 0f)` and `end = Offset(Float.POSITIVE_INFINITY, Float.POSITIVE_INFINITY)`.

**Alternatives considered**:
- `ShaderBrush` with `remember`: Only needed for size-dependent gradients. Our gradients have fixed color stops.
- `CompositionLocal` for gradients: Over-engineering since gradients don't vary by theme (yet).

## Debug-Only Catalog Screen

**Decision**: Use `src/debug/` source set for the catalog screen composable. Use an interface in `src/main/` with a no-op `src/release/` stub for navigation integration.

**Rationale**: Code in `src/debug/` is excluded from release APKs at compile time, not just hidden at runtime. Zero debug code in production builds. Clean separation of concerns.

**Alternatives considered**:
- `BuildConfig.DEBUG` runtime check: Debug code ships in release binary (larger APK, reverse-engineering exposure).
- Product flavors: Overkill for just a debug screen.

**Navigation pattern**: Define a `DebugNavigationProvider` interface in `src/main/`. Implement in `src/debug/` with actual catalog composable. Provide no-op in `src/release/`. Use Hilt to inject the correct implementation.

## CompositionLocal Usage

**Decision**: Use `staticCompositionLocalOf` for all custom design tokens (spacing, shapes, elevation, extended colors).

**Rationale**: Design tokens are set once at theme initialization and do not change during a screen's lifecycle. `staticCompositionLocalOf` avoids per-read tracking overhead compared to `compositionLocalOf`.

**Naming convention**: Prefix all locals with `Local` (e.g., `LocalSpacing`, `LocalElevations`, `LocalExtendedColors`). Always provide sensible defaults.

## Android Project Bootstrap

**Decision**: Since the Android project has no existing source code (only CLAUDE.md), this feature must bootstrap the Gradle project structure before implementing design tokens.

**Rationale**: The `android/` directory currently has no `build.gradle.kts`, no `settings.gradle.kts`, no source files. The design token implementation requires a functional Compose project to compile and test against.

**Key project parameters** (from `android/CLAUDE.md`):
- Package name: `com.avarobotics`
- Kotlin: 1.9+
- Min SDK: API 28 (Android 9.0+)
- Target SDK: API 35
- Compose: Latest (Compose BOM 2025.08.00+)
- Architecture: MVVM + Clean Architecture
- DI: Hilt
- Testing: JUnit + MockK + Compose Testing
- Code style: ktlint
