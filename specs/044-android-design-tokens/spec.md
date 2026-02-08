# Feature Specification: Android Design Token System

Establish a unified design token system for the Android app (Kotlin/Compose) that mirrors the existing web design system, ensuring visual consistency across platforms.

## Table of Contents

- [User Scenarios & Testing](#user-scenarios--testing-mandatory)
- [Requirements](#requirements-mandatory)
- [Success Criteria](#success-criteria-mandatory)

---

**Feature Branch**: `044-android-design-tokens`
**Created**: 2026-02-08
**Status**: Draft
**Input**: User description: "Build design tokens for Android app based on web design system, using Kotlin and Jetpack Compose"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Developer Uses Color Tokens in Compose UI (Priority: P1)

A developer building an Android screen needs to apply the brand's primary purple color to a button and neutral colors to text. They import the design token color definitions and use them directly in Compose composables, confident that the colors match the web app exactly.

**Why this priority**: Colors are the most visible aspect of brand identity. Without a centralized color system, developers will hardcode hex values, leading to inconsistency and maintenance burden.

**Independent Test**: Can be fully tested by creating a sample Compose screen that renders all color tokens as swatches, visually comparing against the web app's color palette.

**Acceptance Scenarios**:

1. **Given** the design token color definitions exist, **When** a developer references the primary 500 color token, **Then** the resulting color matches `#8b5cf6` from the web design system.
2. **Given** the full color palette is defined, **When** a developer browses all available colors, **Then** every color from the web's Figma design tokens (primary 50-900, accent 50-700, secondary 50-600, neutral 50-900, white, black) is available.
3. **Given** the color tokens are used in a composable, **When** the app is rendered, **Then** colors appear identical to the corresponding web UI elements.

---

### User Story 2 - Developer Applies Typography Styles (Priority: P1)

A developer building a screen with headings, body text, and buttons needs to apply consistent typography. They use predefined typography presets (e.g., display-1, heading-1, body-regular, button-medium) that automatically set the correct font size, weight, line height, and letter spacing.

**Why this priority**: Typography presets are used on every screen and are tightly coupled with layout decisions. Defining them early prevents rework.

**Independent Test**: Can be fully tested by rendering a typography specimen screen showing all text style presets, verifying sizes, weights, and spacing against the web design spec.

**Acceptance Scenarios**:

1. **Given** typography presets are defined, **When** a developer applies the heading-1 preset, **Then** the text renders at the equivalent of 24px with semibold weight and 1.2 line height ratio.
2. **Given** the full typography system is defined, **When** a developer lists all available styles, **Then** all 18 typography presets from the web design tokens are available (display-1, display-2, heading-1 through heading-3, body-large through body-small-medium, caption, caption-medium, button-large through button-small, label, input).
3. **Given** the device font scale is changed via accessibility settings, **When** the app renders text, **Then** typography scales appropriately while maintaining relative proportions.

---

### User Story 3 - Developer Uses Spacing and Shape Tokens (Priority: P2)

A developer laying out a card component needs consistent padding, margins, and corner radius values. They reference the spacing scale and border radius tokens, which match the web's spacing system exactly.

**Why this priority**: Spacing and shape tokens ensure layout consistency but are less immediately visible than color and typography. They become essential when building multi-component screens.

**Independent Test**: Can be fully tested by building a sample card component using spacing and border radius tokens, then comparing layout dimensions against the web equivalent.

**Acceptance Scenarios**:

1. **Given** the spacing scale is defined, **When** a developer uses the medium spacing token, **Then** the value resolves to 16dp, matching the web's 16px standard spacing.
2. **Given** border radius tokens are defined, **When** a developer applies the 2xl radius token, **Then** the resulting corner radius is 24dp, matching the web's large card radius.
3. **Given** the full spacing system exists, **When** a developer uses any spacing token (xs through 3xl), **Then** each value corresponds exactly to its web counterpart (4, 8, 16, 24, 32, 48, 64 dp).

---

### User Story 4 - Developer Applies Elevation and Shadow Effects (Priority: P2)

A developer needs to add depth to UI components using shadows and elevation. They reference shadow tokens that correspond to the web's shadow system, including the brand's signature glow effects (purple, pink, cyan).

**Why this priority**: Shadows and elevation add visual polish and hierarchy but are not blocking for basic UI construction. Glow effects are a signature brand element.

**Independent Test**: Can be fully tested by rendering cards at each elevation level and comparing shadow appearance against the web UI.

**Acceptance Scenarios**:

1. **Given** shadow tokens are defined, **When** a developer applies the large shadow token, **Then** the shadow visually approximates the web's large shadow (10dp y-offset, 15dp blur, slight inward spread).
2. **Given** glow effect tokens are defined, **When** a developer applies the purple glow token, **Then** a purple glow effect renders around the component, matching the web's neon aesthetic.

---

### User Story 5 - Developer Uses Gradient Definitions (Priority: P3)

A developer needs to apply the brand's signature gradient to a button or hero section. They reference gradient token definitions that specify the exact color stops and angles from the web design system.

**Why this priority**: Gradients are used selectively on key UI elements and can be added after the base token system is established.

**Independent Test**: Can be fully tested by rendering buttons with each gradient (primary, accent, secondary, neon) and comparing against web screenshots.

**Acceptance Scenarios**:

1. **Given** gradient tokens are defined, **When** a developer applies the primary gradient, **Then** the gradient renders from `#8b5cf6` (0%) through `#6d28d9` (50%) to `#5b21b6` (100%) at 135 degrees.
2. **Given** all four gradient presets exist (primary, accent, secondary, neon), **When** each is applied to a composable, **Then** each matches the corresponding web gradient exactly.

---

### User Story 6 - Developer Previews All Tokens in a Catalog Screen (Priority: P3)

A developer or designer wants to see all available design tokens at a glance. They open a debug-only catalog screen (excluded from release builds) that displays every color, typography style, spacing value, shape, and shadow in a scrollable reference layout.

**Why this priority**: A catalog screen accelerates adoption by making tokens discoverable, but is not required for feature development. It is debug-only to avoid shipping unnecessary UI to end users.

**Independent Test**: Can be fully tested by launching a debug build, navigating to the catalog screen, and verifying that all token categories are displayed with correct values. Verified excluded from release builds.

**Acceptance Scenarios**:

1. **Given** the catalog screen exists, **When** a developer navigates to it, **Then** all color palettes (primary, accent, secondary, neutral) are displayed as labeled swatches.
2. **Given** the catalog screen exists, **When** a developer scrolls through it, **Then** typography presets, spacing values, shapes, shadows, and gradients are all visually demonstrated.

---

### Edge Cases

- What happens when the device uses a very high or very low font scale (accessibility settings)? Typography tokens should scale proportionally without breaking layouts.
- How does the system handle dark mode? The initial implementation defines light theme values only (matching the web's current design). However, semantic color aliases (e.g., `background`, `onPrimary`) are included from the start so that dark mode can be added later by providing an alternate mapping without refactoring consuming code.
- What happens if a developer tries to use a token that exists in the web system but hasn't been ported? The design token system should be complete, covering all tokens from `figma-design-tokens.json`.

## Clarifications

### Session 2026-02-08

- Q: Should the design token system be built inside the existing `android/` project or as a separate module? → A: Build inside the existing `android/` project as a new package/directory.
- Q: Should the token system include semantic color aliases (e.g., `background`, `onPrimary`) for future dark mode support, or raw palette values only? → A: Define both raw palette values AND semantic aliases mapped to light theme initially.
- Q: Should the catalog/preview screen be debug-only, always available, or a separate demo app? → A: Debug-only screen, excluded from release builds.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST define a complete color palette matching all colors from the web's `figma-design-tokens.json` (primary 50-900, accent 50-700, secondary 50-600, neutral 50-900, white, black).
- **FR-002**: System MUST define all 18 typography presets from the web design tokens, including font size, weight, line height, and letter spacing for each preset.
- **FR-003**: System MUST define a spacing scale with all 7 values (xs=4dp, sm=8dp, md=16dp, lg=24dp, xl=32dp, 2xl=48dp, 3xl=64dp).
- **FR-004**: System MUST define border radius tokens with all 8 values (none=0dp, sm=6dp, md=8dp, lg=12dp, xl=16dp, 2xl=24dp, 3xl=28dp, full=maximum rounding).
- **FR-005**: System MUST define shadow/elevation tokens covering 5 standard shadow levels (sm, md, lg, xl, 2xl) and 3 glow effects (purple, pink, cyan).
- **FR-006**: System MUST define opacity tokens covering 12 levels (0, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100).
- **FR-007**: System MUST define 4 gradient presets (primary, accent, secondary, neon) matching the web's gradient specifications.
- **FR-008**: System MUST define component-level tokens for buttons (primary, secondary, outline styles), cards (padding, radius, background, shadow), and inputs (padding, radius, border colors, border width).
- **FR-009**: System MUST provide a debug-only catalog/preview screen (excluded from release builds) that displays all design tokens organized by category for developer reference.
- **FR-010**: All token values MUST be defined as strongly-typed constants, preventing accidental use of raw values.
- **FR-011**: System MUST define semantic color aliases (e.g., `background`, `surface`, `onPrimary`, `onBackground`) that map to the raw palette values for the light theme, enabling future dark mode support without refactoring consuming code.

### Key Entities

- **Color Token**: A named constant mapping a semantic name (e.g., Primary500) to a specific color value. Organized into palettes (primary, accent, secondary, neutral).
- **Typography Preset**: A composite token combining font size, weight, line height, and letter spacing into a named text style (e.g., HeadingOne, BodyRegular).
- **Spacing Token**: A named dimension value representing a step in the spacing scale (e.g., Md = 16dp).
- **Shape Token**: A named corner radius value (e.g., Radius2xl = 24dp).
- **Shadow Token**: A named elevation/shadow definition specifying offset, blur, spread, and color.
- **Gradient Token**: A named gradient definition specifying color stops and angle.
- **Component Token**: A composite token grouping color, spacing, shape, and shadow values for a specific UI component type (button, card, input).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of color values from the web's `figma-design-tokens.json` are available as named tokens in the Android design system.
- **SC-002**: All 18 typography presets from the web design tokens are defined and usable in the Android app.
- **SC-003**: Developers can build any screen using only design tokens (no hardcoded color hex values, font sizes, spacing values, or radius values).
- **SC-004**: The catalog screen renders all token categories (colors, typography, spacing, shapes, shadows, gradients) with visible labels and values.
- **SC-005**: Visual comparison between the Android app and web app shows consistent use of brand colors, typography hierarchy, and spacing across platforms.
- **SC-006**: A new developer can discover and use the correct token for any visual property within 30 seconds using the catalog screen or code autocomplete.

### Assumptions

- The web app's `figma-design-tokens.json` (version 1.1.0) is the single source of truth for all design values.
- The Android app targets a light theme only, matching the web's current design (dark mode is a future feature).
- Font sizes in the web system (px) translate to sp (scalable pixels) in Android for text, and dp (density-independent pixels) for spacing and dimensions.
- The Android system default font (Roboto) is acceptable since the web's font stack already includes Roboto as a fallback.
- The glow effects from the web may need platform-appropriate adaptation for Android rendering capabilities.
- The design token system will be built inside the existing `android/` project as a new package/directory, not as a separate module.
