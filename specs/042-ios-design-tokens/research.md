# Research: iOS Design Tokens

Summary of technology decisions and best practices for implementing SwiftUI design tokens.

## Table of Contents

- [Color Token Pattern](#color-token-pattern)
- [Typography Token Pattern](#typography-token-pattern)
- [Spacing Token Pattern](#spacing-token-pattern)
- [Shape and Shadow Token Pattern](#shape-and-shadow-token-pattern)
- [Gradient Token Pattern](#gradient-token-pattern)
- [Component Token Pattern](#component-token-pattern)
- [File Organization](#file-organization)
- [Testing Strategy](#testing-strategy)
- [Dynamic Type Support](#dynamic-type-support)
- [Dark Mode Architecture](#dark-mode-architecture)

---

## Color Token Pattern

**Decision**: Swift enum with static `Color` properties using hex initializer

**Rationale**:
- Provides compile-time safety — referencing a non-existent color produces a compile error
- Enum namespacing groups colors by palette (e.g., `ColorToken.Primary.p500`)
- Hex initializer allows direct mapping from web `figma-design-tokens.json` values
- No Asset Catalog dependency keeps the system self-contained in Swift source files
- Future dark mode can be added by wrapping hex values in `Color(UIColor { traitCollection in ... })` without changing the public API

**Alternatives considered**:
- Asset Catalog colors: Provide native dark mode toggle and visual Xcode editor, but add a non-code dependency. Color names are stringly-typed unless using Xcode 15+ generated accessors. Rejected because the project prioritizes source-code-as-truth and cross-referencing with `figma-design-tokens.json`.
- Raw `Color` extensions (e.g., `Color.brandPrimary`): Simple but pollutes the `Color` namespace and lacks grouping. Rejected for discoverability reasons.

## Typography Token Pattern

**Decision**: Enum cases with computed properties for font, size, weight, lineSpacing, and tracking + ViewModifier with `@ScaledMetric` for Dynamic Type

**Rationale**:
- Enum cases model the finite set of 17 typography presets as discrete values
- Computed properties return the correct `Font`, `CGFloat` values per preset
- `@ScaledMetric(relativeTo:)` in the ViewModifier ensures proportional scaling with Dynamic Type
- Single `.typography(.headingOne)` call site keeps views clean
- SF Pro Display/Text are automatically selected by SwiftUI's `.system(size:weight:design:)` based on point size (Display for 20pt+, Text for below)

**Alternatives considered**:
- Font extensions (e.g., `Font.heading1`): Simple but cannot encapsulate line spacing and tracking. Rejected because typography presets require multiple properties.
- Struct-based tokens: More flexible but enum cases provide exhaustive switch coverage and clearer intent. Rejected as over-engineering for a fixed set of presets.

## Spacing Token Pattern

**Decision**: Enum with static `CGFloat` properties

**Rationale**:
- Static properties give zero-boilerplate usage: `SpacingToken.md` returns `CGFloat` directly
- No `.rawValue` needed at call sites (unlike `enum: CGFloat`)
- Matches the web's 7-level scale exactly: xs (4), sm (8), md (16), lg (24), xl (32), xxl (48), xxxl (64)

**Alternatives considered**:
- `enum SpacingToken: CGFloat` with rawValue: Requires `.rawValue` at every call site. Rejected for verbosity.
- Dedicated struct: Over-engineering for simple constants. Rejected.

## Shape and Shadow Token Pattern

**Decision**: Nested enums for corner radius/border width; enum cases with computed properties for shadows

**Rationale**:
- Corner radius and border width are simple constants — static properties in nested enums (e.g., `ShapeToken.CornerRadius.lg`)
- Shadows have multiple dimensions (radius, x, y, color) — enum cases with computed properties model this cleanly
- Glow effects are additional shadow enum cases with different color/radius configurations
- A `ShadowModifier` ViewModifier wraps `View.shadow(color:radius:x:y:)` for ergonomic usage

**Alternatives considered**:
- Struct-based shadow definitions: More flexible but enum cases are sufficient for a fixed set of 5 shadows + 3 glows. Rejected.

## Gradient Token Pattern

**Decision**: Enum with static `LinearGradient` properties, composed from token colors

**Rationale**:
- All web gradients are linear at 135 degrees — `LinearGradient` with `.topLeading` → `.bottomTrailing` maps directly
- Static properties return ready-to-use `LinearGradient` values (no assembly at call site)
- Gradient color stops reference `ColorToken` values, maintaining single source of truth

**Alternatives considered**:
- Separate `Gradient.Stop` arrays: More flexible for reuse across gradient types (linear/radial/angular), but only linear gradients are defined in the web spec. Rejected as YAGNI.

## Component Token Pattern

**Decision**: SwiftUI style protocols (`ButtonStyle`, `TextFieldStyle`) for system views; custom `ViewModifier` for cards

**Rationale**:
- SwiftUI provides native style protocols for buttons and text fields — using them enables `.buttonStyle(.primary)` syntax
- Cards have no system style protocol — a `ViewModifier` with `.cardStyle()` convenience is the standard pattern
- Component styles compose primitive tokens (colors, spacing, shapes, shadows) rather than defining raw values
- Pressed/focused states are handled within the style protocol's `makeBody(configuration:)` method

**Alternatives considered**:
- Custom wrapper views (e.g., `BrandButton`): Hides SwiftUI's native `Button` API surface. Rejected to preserve framework idioms.
- ViewModifier for everything: Would lose SwiftUI's style cascade behavior for buttons/text fields. Rejected.

## File Organization

**Decision**: `DesignSystem/` directory with `Tokens/`, `Components/`, `Extensions/` subdirectories

**Rationale**:
- Dedicated top-level directory signals this is the single source of truth for all visual decisions
- `Tokens/` holds primitive values (one file per token category)
- `Components/` holds composed styles (ButtonStyles, CardModifier, TextFieldStyles)
- `Extensions/` holds utilities (Color+Hex, View+DesignSystem convenience methods)
- Maps cleanly to a future Swift Package extraction if needed
- Aligns with existing project structure from `ios/CLAUDE.md`

**Alternatives considered**:
- `Theme/` directory: Implies only colors and appearance toggling, not a full design system. Rejected.
- Flat file structure: All tokens in one file. Rejected for maintainability at 37+ colors, 17 typography presets, etc.

## Testing Strategy

**Decision**: XCTest unit tests validating raw token values against web spec

**Rationale**:
- Color tests resolve `Color` → `UIColor` → RGBA components → hex string, then assert against spec hex values
- Spacing/shape tests assert `CGFloat` values directly against spec point values
- Typography tests verify size, weight, line spacing, and tracking per preset
- Shadow tests verify radius, offset, and color configurations
- Tests serve as a contract between the design spec and the code implementation

**Alternatives considered**:
- Snapshot testing: Useful for visual regression but requires infrastructure (reference images, CI rendering). Deferred — can be added later as a complement.
- No tests: Rejected because token values are the entire deliverable and must be verified against the web spec.

## Dynamic Type Support

**Decision**: `@ScaledMetric(relativeTo:)` in `TypographyModifier` for proportional font scaling

**Rationale**:
- `@ScaledMetric` property wrapper scales the base point size proportionally to the user's Dynamic Type setting
- The `relativeTo` parameter maps each typography preset to the nearest Apple semantic text style (e.g., heading-1 → `.title2`), ensuring consistent scaling behavior
- SwiftUI's `.system(size:weight:design:)` does NOT scale with Dynamic Type on its own — `@ScaledMetric` is required

**Alternatives considered**:
- Apple semantic text styles only (e.g., `.title`, `.body`): Would lose the exact point sizes from the web spec. Rejected because the spec requires precise size matching.
- No Dynamic Type support: Violates FR-009. Rejected.

## Dark Mode Architecture

**Decision**: Structure tokens to support future dark mode without current implementation

**Rationale**:
- The enum-based color token pattern can be extended by replacing `Color(hex:)` with `Color(UIColor { traitCollection in ... })` to return different hex values per appearance
- This change is internal to `ColorToken.swift` — consuming views reference `ColorToken.Primary.p500` regardless of whether it returns a fixed or adaptive color
- No architectural restructuring needed when dark mode values are later defined
- FR-010 requires the architecture to support this, not that dark mode values exist now

**Alternatives considered**:
- Asset Catalog from the start: Would provide dark mode toggle natively but introduces non-source dependency. Can be migrated to later if needed. Rejected for initial implementation simplicity.
