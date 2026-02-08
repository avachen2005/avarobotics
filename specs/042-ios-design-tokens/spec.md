# Feature Specification: iOS Design Tokens

Establish a centralized design token system for the iOS app (Swift/SwiftUI) that mirrors the web application's design language, ensuring visual consistency across platforms.

## Table of Contents

- [Clarifications](#clarifications)
- [User Scenarios & Testing](#user-scenarios--testing-mandatory)
- [Requirements](#requirements-mandatory)
- [Success Criteria](#success-criteria-mandatory)

---

**Feature Branch**: `042-ios-design-tokens`
**Created**: 2026-02-08
**Status**: Draft
**Input**: User description: "Build iOS design tokens based on web app design system for Swift/SwiftUI"

## Clarifications

### Session 2026-02-08

- Q: Should the design token system include semantic status colors (success, warning, error, info) beyond the single error red (#ef4444) defined in the web tokens? → A: Yes, include the full standard set: success (#22c55e green), warning (#f59e0b amber), error (#ef4444 red), info (#3b82f6 blue)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Consistent Brand Colors Across Platforms (Priority: P1)

As a developer building the iOS app, I need a single source of truth for all brand colors so that the iOS app visually matches the web application without manually copying hex values into each view.

The web app defines the following color palettes that must be available on iOS:
- **Primary (Tech Purple)**: 10-shade scale from #f5f3ff (50) to #4c1d95 (900), with #8b5cf6 (500) as the main brand color
- **Accent (Neon Pink)**: 7-shade scale from #fdf4ff (50) to #a21caf (700), with #e879f9 (400) as the main accent
- **Secondary (Electric Cyan)**: 6-shade scale from #ecfeff (50) to #0891b2 (600), with #22d3ee (400) as the main cyan
- **Neutral (Grays)**: 10-shade scale from #f8fafc (50) to #0f172a (900)
- **Semantic**: White (#ffffff) and Black (#000000)
- **Status Colors**: Success (#22c55e green), Warning (#f59e0b amber), Error (#ef4444 red), Info (#3b82f6 blue) — for validation feedback, alerts, banners, and toast messages

**Why this priority**: Colors are the most visible element of brand consistency. Without a shared color system, every screen built will diverge from the web design.

**Independent Test**: Can be fully tested by creating a color swatch preview screen that renders every color token side-by-side with the web hex values and verifying they match exactly.

**Acceptance Scenarios**:

1. **Given** the iOS design token package is integrated, **When** a developer references the primary brand color, **Then** the rendered color matches #8b5cf6 exactly
2. **Given** the iOS design token package is integrated, **When** a developer uses any color from the primary, accent, secondary, or neutral palette, **Then** every shade matches its corresponding web hex value
3. **Given** both web and iOS apps are displayed side by side, **When** comparing identical UI elements, **Then** the colors are visually indistinguishable
4. **Given** the iOS design token package is integrated, **When** a developer references a status color (success, warning, error, info), **Then** the rendered color matches the defined hex value (#22c55e, #f59e0b, #ef4444, #3b82f6 respectively)

---

### User Story 2 - Consistent Typography System (Priority: P1)

As a developer, I need predefined typography styles (font families, sizes, weights, line heights, letter spacing) so that text rendering on iOS matches the web app's type hierarchy without manual configuration per view.

The web app defines:
- **Font Families**: SF Pro Display (titles), SF Pro Text (body) — these are native iOS system fonts
- **Font Sizes**: xs (12px), sm (14px), base (16px), lg (18px), xl (20px), 2xl (24px), 3xl (30px), 4xl (36px)
- **Font Weights**: normal (400), medium (500), semibold (600), bold (700)
- **Line Heights**: tight (1.2), normal (1.5), relaxed (1.75)
- **Letter Spacing**: tight (-0.5px), normal (0px), wide (0.5px)
- **Typography Presets**: display-1, display-2, heading-1/2/3, body-large/regular/medium/semibold/small, caption, button-large/medium/small, label, input

**Why this priority**: Typography defines the reading experience. Inconsistent type styles create a disjointed feel between platforms.

**Independent Test**: Can be fully tested by rendering a type specimen screen showing all typography presets and comparing against the web app's rendered output.

**Acceptance Scenarios**:

1. **Given** the typography tokens are available, **When** a developer applies the "heading-1" preset, **Then** it renders at 24pt, semibold weight, with tight line height (1.2)
2. **Given** the typography tokens are available, **When** a developer applies the "body-regular" preset, **Then** it renders at 16pt, regular weight, with normal line height (1.5)
3. **Given** a list of all typography presets, **When** each is rendered on iOS, **Then** every preset matches the corresponding web definition

---

### User Story 3 - Spacing and Layout Tokens (Priority: P2)

As a developer, I need a standardized spacing scale so that padding, margins, and gaps between elements are consistent with the web app's layout rhythm.

The web app defines:
- **Spacing Scale**: xs (4pt), sm (8pt), md (16pt), lg (24pt), xl (32pt), 2xl (48pt), 3xl (64pt)

**Why this priority**: Spacing consistency is critical for a polished look but is less immediately noticeable than color or typography mismatches.

**Independent Test**: Can be fully tested by creating a layout demo screen that shows each spacing token as visible gaps between elements and verifying measurements.

**Acceptance Scenarios**:

1. **Given** the spacing tokens are available, **When** a developer uses the "md" spacing value, **Then** it renders as exactly 16 points of space
2. **Given** the spacing tokens are available, **When** all seven spacing values are applied, **Then** each matches the defined scale (4, 8, 16, 24, 32, 48, 64 points)

---

### User Story 4 - Shape and Shadow Tokens (Priority: P2)

As a developer, I need predefined border radius values and shadow styles so that cards, buttons, and containers match the web app's visual depth and shape language.

The web app defines:
- **Border Radius**: none (0), sm (6pt), md (8pt), lg (12pt), xl (16pt), 2xl (24pt), 3xl (28pt), full (capsule)
- **Shadows**: sm, md, lg, xl, 2xl with specific offset/blur/color values
- **Glow Effects**: purple, pink, and cyan neon glow effects

**Why this priority**: Shape and shadow create visual hierarchy and depth. They are important for cards and interactive elements.

**Independent Test**: Can be fully tested by creating a shape/shadow demo screen that renders each variant and comparing with web screenshots.

**Acceptance Scenarios**:

1. **Given** the shape tokens are available, **When** a developer applies "2xl" border radius, **Then** corners render with 24pt radius
2. **Given** the shadow tokens are available, **When** a developer applies the "lg" shadow, **Then** it renders with offset (0, 10), blur 15, and 10% black opacity spread
3. **Given** the glow tokens are available, **When** a developer applies "glow-purple", **Then** it renders a 30pt blur purple glow matching #8b5cf6 at 50% opacity

---

### User Story 5 - Gradient Tokens (Priority: P3)

As a developer, I need predefined gradient definitions so that backgrounds and accent elements match the web app's gradient styles.

The web app defines:
- **Primary Gradient**: 135deg, #8b5cf6 → #6d28d9 → #5b21b6
- **Accent Gradient**: 135deg, #e879f9 → #d946ef → #c026d3
- **Secondary Gradient**: 135deg, #22d3ee → #06b6d4 → #0891b2
- **Neon Gradient**: 135deg, #8b5cf6 → #d946ef → #22d3ee
- **Tech Gradient**: 135deg, #6d28d9 → #a21caf → #0891b2
- **Background Gradient**: 135deg, #f5f3ff → #fdf4ff → #ecfeff

**Why this priority**: Gradients are decorative accents used less frequently than solid colors, but they are important for brand identity on key screens.

**Independent Test**: Can be fully tested by rendering each gradient on a sample view and comparing against web app gradient rendering.

**Acceptance Scenarios**:

1. **Given** the gradient tokens are available, **When** a developer applies the "neon" gradient, **Then** it renders a 135-degree linear gradient transitioning from purple (#8b5cf6) through pink (#d946ef) to cyan (#22d3ee)
2. **Given** all six gradient tokens are available, **When** each is rendered, **Then** every gradient matches the web app's gradient direction, color stops, and positions

---

### User Story 6 - Component-Level Tokens (Priority: P3)

As a developer, I need predefined component tokens (button, card, input field styles) so that common UI components are consistent with the web app without per-component manual configuration.

The web app defines component tokens for:
- **Buttons**: primary/secondary/outline variants with specific padding, radius (full), shadow, and gradient backgrounds
- **Cards**: white background, 24pt radius, lg shadow, with small/medium/large padding variants
- **Input Fields**: 12pt x 16pt padding, lg (12pt) radius, 2pt border, with default/focus/error border color states

**Why this priority**: Component tokens build on primitive tokens (colors, spacing, shapes) and are less foundational. They can be composed from the primitive tokens.

**Independent Test**: Can be fully tested by rendering sample button, card, and input field components and comparing against web app component screenshots.

**Acceptance Scenarios**:

1. **Given** the button component tokens are available, **When** a developer creates a primary button, **Then** it uses the primary gradient background, white text, full border radius, and medium shadow
2. **Given** the card component tokens are available, **When** a developer creates a standard card, **Then** it uses white background, 24pt border radius, lg shadow, and 24pt padding
3. **Given** the input field component tokens are available, **When** a developer creates a text field, **Then** it uses 12pt vertical / 16pt horizontal padding, 12pt border radius, 2pt border width, and neutral-200 default border color

---

### Edge Cases

- What happens when the device is in Dark Mode? The current web design tokens are light-mode only. The iOS tokens should be structured to support future dark mode values without requiring a redesign of the token architecture.
- What happens when Dynamic Type (accessibility font scaling) is enabled? Typography tokens should respect the user's accessibility settings while maintaining proportional relationships.
- What happens if a color token is referenced that doesn't exist in the palette? The system should fail at compile time, not at runtime.
- How are opacity values combined with colors? The web defines an opacity scale (0-100). The iOS tokens should provide a way to apply opacity to any color token.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The design token system MUST define all color palettes (primary, accent, secondary, neutral, semantic) with every shade matching the web app's hex values exactly
- **FR-012**: The design token system MUST define four status colors — success (#22c55e), warning (#f59e0b), error (#ef4444), info (#3b82f6) — for use in validation feedback, alerts, banners, and toast messages
- **FR-002**: The design token system MUST define typography presets (display, heading, body, caption, button, label, input) with font size, weight, line height, and letter spacing matching the web definitions
- **FR-003**: The design token system MUST define a spacing scale with seven levels (xs through 3xl) matching the web spacing values
- **FR-004**: The design token system MUST define border radius tokens with eight levels (none through full) matching the web shape values
- **FR-005**: The design token system MUST define shadow tokens with five levels (sm through 2xl) and three glow effects (purple, pink, cyan) matching the web shadow definitions
- **FR-006**: The design token system MUST define six gradient presets (primary, accent, secondary, neon, tech, background) matching the web gradient definitions
- **FR-007**: The design token system MUST define component-level tokens for buttons (primary, secondary, outline), cards (standard with padding variants), and input fields (with state-based border colors)
- **FR-008**: The design token system MUST be structured so that all values are resolved at compile time, preventing runtime errors from missing or mistyped token references
- **FR-009**: The design token system MUST be compatible with Dynamic Type, allowing typography tokens to scale proportionally with the user's accessibility text size preference
- **FR-010**: The design token system MUST be organized to support future addition of dark mode values without requiring restructuring of existing token definitions
- **FR-011**: The design token system MUST provide an opacity scale (5% through 100% in the same increments as the web) that can be applied to any color token

### Key Entities

- **Color Palette**: A named group of color shades (e.g., "primary" with shades 50-900). Each shade has a name and an exact color value.
- **Typography Preset**: A named combination of font family, size, weight, line height, and letter spacing (e.g., "heading-1" = SF Pro Display, 24pt, semibold, 1.2 line height).
- **Spacing Token**: A named size value from a fixed scale used for padding, margins, and gaps (e.g., "md" = 16pt).
- **Shape Token**: A named border radius value (e.g., "2xl" = 24pt) or shadow definition (e.g., "lg" = specific offset, blur, and opacity).
- **Gradient Token**: A named linear gradient definition with direction and color stops (e.g., "neon" = 135deg from purple through pink to cyan).
- **Component Token**: A named collection of primitive tokens that define the appearance of a specific component type (e.g., "primary button" = primary gradient + white text + full radius + md shadow).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of color values in the iOS design token system match the corresponding web hex values exactly (verified by automated comparison)
- **SC-002**: 100% of typography presets in the iOS system match the web definitions for font size, weight, line height, and letter spacing
- **SC-003**: A developer can apply any design token to a view using a single, descriptive reference (e.g., one line of code per token application) without needing to know the underlying values
- **SC-004**: All design tokens are validated at compile time — referencing a non-existent token produces a compile error, not a runtime failure
- **SC-005**: Typography tokens respect Dynamic Type settings, scaling proportionally when the user changes their preferred text size
- **SC-006**: The token architecture supports adding dark mode variants without modifying any existing token definitions or references in consuming views
- **SC-007**: A new developer can find and apply any token within 30 seconds by browsing the token definitions, without consulting external documentation

### Assumptions

- The web app's `figma-design-tokens.json` and `DESIGN_SPEC.md` are the authoritative sources for all token values
- The iOS app targets iOS 15+ and uses SwiftUI as the primary UI framework
- SF Pro Display and SF Pro Text are the intended fonts, which are available natively on iOS (no custom font bundling required)
- Pixel values from the web (px) map 1:1 to points (pt) on iOS
- The initial implementation is light mode only; dark mode support means the architecture allows future extension, not that dark mode values are defined now
- The opacity scale follows the same increments as the web: 0, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100
