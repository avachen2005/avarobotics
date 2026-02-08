# Implementation Plan: iOS Design Tokens

Implement a compile-time-safe SwiftUI design token system using enum-based token definitions with ViewModifiers, mirroring the web app's design language from `figma-design-tokens.json`.

## Table of Contents

- [Summary](#summary)
- [Technical Context](#technical-context)
- [Constitution Check](#constitution-check)
- [Project Structure](#project-structure)
- [Complexity Tracking](#complexity-tracking)

---

**Branch**: `042-ios-design-tokens` | **Date**: 2026-02-08 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/042-ios-design-tokens/spec.md`

## Summary

Build a centralized design token system for the iOS app that mirrors the web application's Figma design tokens. The system uses Swift enums with static properties for primitive tokens (colors, spacing, shapes) and enum cases with computed properties for composite tokens (typography, shadows). SwiftUI ViewModifiers provide ergonomic application of typography and shadow tokens. Component-level tokens are implemented via SwiftUI's native style protocols (`ButtonStyle`, `TextFieldStyle`) and custom ViewModifiers. All tokens are resolved at compile time. Typography supports Dynamic Type via `@ScaledMetric`.

## Technical Context

**Language/Version**: Swift 5.9+
**Primary Dependencies**: SwiftUI (system framework), XCTest (system framework) — no third-party dependencies
**Storage**: N/A
**Testing**: XCTest — unit tests validating token values against web spec hex/pt values
**Target Platform**: iOS 15+
**Project Type**: Mobile (iOS only — design tokens module within existing app structure)
**Performance Goals**: N/A (design tokens are static constants with zero runtime overhead)
**Constraints**: All token references must resolve at compile time; typography must support Dynamic Type
**Scale/Scope**: ~37 color shades + 4 status colors, 17 typography presets, 7 spacing levels, 8 border radii, 5 shadows + 3 glows, 6 gradients, 3 component styles

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Constitution is an unpopulated template — no custom principles defined. No gates to check. Proceeding.

**Post-Phase 1 re-check**: Design uses only Swift enums, static properties, ViewModifiers, and SwiftUI style protocols. No external dependencies, no complex architecture patterns. No violations.

## Project Structure

### Documentation (this feature)

```text
specs/042-ios-design-tokens/
├── plan.md              # This file
├── research.md          # Phase 0: SwiftUI design token patterns research
├── data-model.md        # Phase 1: Token entity definitions
├── quickstart.md        # Phase 1: Developer quickstart guide
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
ios/AvaRobotics/
├── DesignSystem/
│   ├── Tokens/
│   │   ├── ColorToken.swift           # Color palettes (primary, accent, secondary, neutral, semantic, status)
│   │   ├── TypographyToken.swift      # Typography presets + TypographyModifier
│   │   ├── SpacingToken.swift         # Spacing scale (xs through 3xl)
│   │   ├── ShapeToken.swift           # Border radius + border width tokens
│   │   ├── ShadowToken.swift          # Shadow levels + glow effects + ShadowModifier
│   │   ├── GradientToken.swift        # Gradient presets (primary, accent, secondary, neon, tech, background)
│   │   └── OpacityToken.swift         # Opacity scale (5% through 100%)
│   ├── Components/
│   │   ├── ButtonStyles.swift         # PrimaryButtonStyle, SecondaryButtonStyle, OutlineButtonStyle
│   │   ├── CardModifier.swift         # CardModifier + .cardStyle() convenience
│   │   └── TextFieldStyles.swift      # BrandedTextFieldStyle with focus/error states
│   └── Extensions/
│       ├── Color+Hex.swift            # Color(hex:) initializer utility
│       └── View+DesignSystem.swift    # .typography(), .shadow() View extensions
├── AvaRoboticsTests/
│   └── DesignSystem/
│       ├── ColorTokenTests.swift      # Verify hex values match web spec
│       ├── TypographyTokenTests.swift # Verify preset configurations
│       ├── SpacingTokenTests.swift    # Verify spacing scale values
│       ├── ShapeTokenTests.swift      # Verify border radius values
│       ├── ShadowTokenTests.swift     # Verify shadow configurations
│       └── GradientTokenTests.swift   # Verify gradient color stops
```

**Structure Decision**: Mobile (iOS) structure. Design tokens live in a dedicated `DesignSystem/` directory within the existing `ios/AvaRobotics/` project structure defined in `ios/CLAUDE.md`. The `DesignSystem/` directory is organized into `Tokens/` (primitive values), `Components/` (composed styles), and `Extensions/` (utilities). This keeps design tokens separate from business logic while remaining part of the main app target. No API endpoints — contracts directory is not applicable.

## Complexity Tracking

No violations to justify. The design uses only:
- Swift enums with static properties (simplest possible constant definition)
- SwiftUI ViewModifiers (standard pattern for reusable styling)
- SwiftUI style protocols (ButtonStyle, TextFieldStyle — framework-native patterns)
- XCTest assertions (standard unit testing)
