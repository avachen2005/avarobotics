# Implementation Plan: Android Design Token System

Implement a Kotlin/Compose design token system inside the existing `android/` project that mirrors all values from the web's `figma-design-tokens.json`, using MaterialTheme extension with CompositionLocal for custom tokens.

## Table of Contents

- [Summary](#summary)
- [Technical Context](#technical-context)
- [Constitution Check](#constitution-check)
- [Project Structure](#project-structure)
- [Complexity Tracking](#complexity-tracking)

---

**Branch**: `044-android-design-tokens` | **Date**: 2026-02-08 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/044-android-design-tokens/spec.md`

## Summary

Build a complete design token system for the Android app using Kotlin and Jetpack Compose that replicates all visual tokens from the web's `figma-design-tokens.json` (v1.1.0). The approach extends MaterialTheme with parallel CompositionLocal subsystems for custom tokens (spacing, elevation, extended colors, gradients). Includes raw palette colors (35 total), semantic color aliases for dark-mode readiness, 18 typography presets, 7-step spacing scale, 8 border radius values, 8 shadow definitions (5 standard + 3 glow), 12 opacity levels, 4 gradient presets, and component-level tokens for buttons/cards/inputs. A debug-only catalog screen (excluded from release builds via `src/debug/` source set) provides a visual reference for all tokens.

## Technical Context

**Language/Version**: Kotlin 1.9+
**Primary Dependencies**: Jetpack Compose (BOM 2025.08.00+), Material 3, Hilt
**Storage**: N/A (design tokens are compile-time constants)
**Testing**: JUnit + Compose Testing (composeTestRule) for catalog screen, unit tests for token value verification
**Target Platform**: Android API 28+ (Android 9.0+)
**Project Type**: Mobile (Android)
**Performance Goals**: N/A (static token definitions; no runtime computation)
**Constraints**: Must use Compose 1.9+ for `Modifier.dropShadow()` API; all token values must exactly match web's `figma-design-tokens.json`
**Scale/Scope**: ~35 color tokens, 18 semantic colors, 18 typography presets, 7 spacing values, 8 shape values, 8 shadow definitions, 12 opacity levels, 4 gradients, 3 component token groups, 1 debug catalog screen

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

The project constitution is an unfilled template with no project-specific principles defined. No gates to enforce. Proceeding.

**Post-Phase 1 re-check**: No violations. The design follows standard Compose patterns (MaterialTheme extension, CompositionLocal, `@Immutable` data classes) with no unnecessary complexity.

## Project Structure

### Documentation (this feature)

```text
specs/044-android-design-tokens/
├── plan.md              # This file
├── spec.md              # Feature specification
├── research.md          # Phase 0: Technology research
├── data-model.md        # Phase 1: Token value mappings
├── quickstart.md        # Phase 1: Developer usage guide
├── checklists/
│   └── requirements.md  # Spec quality checklist
└── tasks.md             # Phase 2 output (created by /speckit.tasks)
```

No `contracts/` directory needed - this feature has no API endpoints.

### Source Code (repository root)

```text
android/
├── app/
│   ├── build.gradle.kts                          # App-level Gradle config
│   └── src/
│       ├── main/
│       │   ├── AndroidManifest.xml
│       │   └── java/com/avarobotics/
│       │       └── ui/
│       │           └── theme/
│       │               ├── Color.kt              # Raw palette colors (FR-001)
│       │               ├── ExtendedColors.kt      # Semantic color aliases (FR-011)
│       │               ├── Type.kt               # Typography presets (FR-002)
│       │               ├── Spacing.kt            # Spacing scale (FR-003)
│       │               ├── Shape.kt              # Border radius tokens (FR-004)
│       │               ├── Elevation.kt          # Shadow & glow tokens (FR-005)
│       │               ├── Opacity.kt            # Opacity tokens (FR-006)
│       │               ├── Gradient.kt           # Gradient presets (FR-007)
│       │               ├── ComponentTokens.kt    # Button/card/input tokens (FR-008)
│       │               └── Theme.kt              # AppTheme composable + theme object
│       ├── debug/
│       │   └── java/com/avarobotics/
│       │       └── ui/
│       │           └── catalog/
│       │               ├── DesignTokenCatalog.kt  # Catalog screen (FR-009)
│       │               └── sections/              # Catalog section composables
│       │                   ├── ColorSection.kt
│       │                   ├── TypographySection.kt
│       │                   ├── SpacingSection.kt
│       │                   ├── ShapeSection.kt
│       │                   ├── ShadowSection.kt
│       │                   └── GradientSection.kt
│       └── release/
│           └── java/com/avarobotics/
│               └── ui/
│                   └── catalog/                   # No-op stubs for release
├── build.gradle.kts                               # Project-level Gradle config
├── settings.gradle.kts                            # Settings
├── gradle.properties                              # Gradle properties
└── gradle/
    └── libs.versions.toml                         # Version catalog
```

**Structure Decision**: Mobile (Android) project using the existing `android/` directory per clarification. Design tokens live in `ui/theme/` following the convention from `android/CLAUDE.md`. The catalog screen uses `src/debug/` and `src/release/` source sets to ensure exclusion from production builds.

### Key Architecture Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Theme approach | Extend MaterialTheme | Keeps Material 3 components working; layers custom tokens via CompositionLocal |
| Semantic colors | Parallel `@Immutable` data class | Material's ColorScheme cannot be subclassed; parallel system supports future dark mode |
| Custom tokens (spacing, elevation) | `staticCompositionLocalOf` | Tokens set once at theme init, never change at runtime; static avoids tracking overhead |
| Shadow/glow effects | `Modifier.dropShadow()` (Compose 1.9+) | First-party API with full color/blur/spread control; supports colored glow natively |
| Gradients | `Brush` properties in object | Static gradient definitions; no theme variation needed (light only) |
| Debug catalog | `src/debug/` source set | Compile-time exclusion from release; zero debug code in production |
| Font family | System Roboto | Matches web's fallback stack; no custom font files needed |

## Complexity Tracking

No constitution violations to justify. The implementation uses standard Compose patterns with no unnecessary abstractions.
