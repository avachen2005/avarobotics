# Data Model: iOS Design Tokens

Token entity definitions mapping web design values to Swift/SwiftUI constructs.

## Table of Contents

- [Color Palette Tokens](#color-palette-tokens)
- [Typography Preset Tokens](#typography-preset-tokens)
- [Spacing Tokens](#spacing-tokens)
- [Shape Tokens](#shape-tokens)
- [Shadow Tokens](#shadow-tokens)
- [Gradient Tokens](#gradient-tokens)
- [Opacity Tokens](#opacity-tokens)
- [Component Tokens](#component-tokens)

---

## Color Palette Tokens

### Primary (Tech Purple)

| Token Name | Hex Value | Usage |
|------------|-----------|-------|
| `primary50` | #f5f3ff | Light background |
| `primary100` | #ede9fe | — |
| `primary200` | #ddd6fe | — |
| `primary300` | #c4b5fd | — |
| `primary400` | #a78bfa | — |
| `primary500` | #8b5cf6 | Main brand color |
| `primary600` | #7c3aed | — |
| `primary700` | #6d28d9 | — |
| `primary800` | #5b21b6 | — |
| `primary900` | #4c1d95 | — |

### Accent (Neon Pink)

| Token Name | Hex Value | Usage |
|------------|-----------|-------|
| `accent50` | #fdf4ff | — |
| `accent100` | #fae8ff | — |
| `accent200` | #f5d0fe | — |
| `accent300` | #f0abfc | — |
| `accent400` | #e879f9 | Main accent |
| `accent500` | #d946ef | — |
| `accent600` | #c026d3 | — |
| `accent700` | #a21caf | — |

### Secondary (Electric Cyan)

| Token Name | Hex Value | Usage |
|------------|-----------|-------|
| `secondary50` | #ecfeff | — |
| `secondary100` | #cffafe | — |
| `secondary200` | #a5f3fc | — |
| `secondary300` | #67e8f9 | — |
| `secondary400` | #22d3ee | Main cyan |
| `secondary500` | #06b6d4 | — |
| `secondary600` | #0891b2 | — |

### Neutral (Grays)

| Token Name | Hex Value | Usage |
|------------|-----------|-------|
| `neutral50` | #f8fafc | Light backgrounds |
| `neutral100` | #f1f5f9 | Card backgrounds |
| `neutral200` | #e2e8f0 | Borders |
| `neutral300` | #cbd5e1 | Dividers |
| `neutral400` | #94a3b8 | — |
| `neutral500` | #64748b | — |
| `neutral600` | #475569 | Secondary text |
| `neutral700` | #334155 | Primary text |
| `neutral800` | #1e293b | — |
| `neutral900` | #0f172a | Dark text/backgrounds |

### Semantic

| Token Name | Hex Value |
|------------|-----------|
| `white` | #ffffff |
| `black` | #000000 |

### Status

| Token Name | Hex Value | Usage |
|------------|-----------|-------|
| `success` | #22c55e | Success feedback |
| `warning` | #f59e0b | Warning feedback |
| `error` | #ef4444 | Error feedback |
| `info` | #3b82f6 | Informational feedback |

## Typography Preset Tokens

Each preset maps to: font family (SF Pro via `.system()`), size (pt), weight, line spacing (pt), tracking (pt), and Dynamic Type `relativeTo` style.

| Preset | Size | Weight | Line Spacing | Tracking | Relative To |
|--------|------|--------|-------------|----------|-------------|
| `display1` | 36 | bold | 4 | -0.5 | `.largeTitle` |
| `display2` | 30 | bold | 4 | -0.5 | `.title` |
| `heading1` | 24 | semibold | 2 | 0 | `.title2` |
| `heading2` | 20 | semibold | 2 | 0 | `.title3` |
| `heading3` | 18 | semibold | 2 | 0 | `.headline` |
| `bodyLarge` | 18 | regular | 4 | 0 | `.body` |
| `bodyRegular` | 16 | regular | 4 | 0 | `.body` |
| `bodyMedium` | 16 | medium | 4 | 0 | `.body` |
| `bodySemibold` | 16 | semibold | 4 | 0 | `.body` |
| `bodySmall` | 14 | regular | 3 | 0 | `.callout` |
| `bodySmallMedium` | 14 | medium | 3 | 0 | `.callout` |
| `caption` | 12 | regular | 2 | 0 | `.caption` |
| `captionMedium` | 12 | medium | 2 | 0 | `.caption` |
| `buttonLarge` | 18 | semibold | 0 | 0.5 | `.headline` |
| `buttonMedium` | 16 | medium | 0 | 0.5 | `.body` |
| `buttonSmall` | 14 | medium | 0 | 0.5 | `.callout` |
| `label` | 14 | medium | 0 | 0.5 | `.callout` |
| `input` | 16 | regular | 0 | 0 | `.body` |

## Spacing Tokens

| Token | Value (pt) | Web Equivalent |
|-------|-----------|----------------|
| `xs` | 4 | 0.25rem |
| `sm` | 8 | 0.5rem |
| `md` | 16 | 1rem |
| `lg` | 24 | 1.5rem |
| `xl` | 32 | 2rem |
| `xxl` | 48 | 3rem |
| `xxxl` | 64 | 4rem |

## Shape Tokens

### Corner Radius

| Token | Value (pt) | Usage |
|-------|-----------|-------|
| `none` | 0 | No rounding |
| `sm` | 6 | Small elements |
| `md` | 8 | Input fields |
| `lg` | 12 | Small cards |
| `xl` | 16 | Medium cards |
| `xxl` | 24 | Large cards |
| `xxxl` | 28 | iOS icon standard |
| `full` | 9999 | Pill/capsule (buttons, avatars) |

### Border Width

| Token | Value (pt) |
|-------|-----------|
| `thin` | 1 |
| `regular` | 2 |

## Shadow Tokens

### Standard Shadows

| Token | X | Y | Blur | Spread Color |
|-------|---|---|------|-------------|
| `sm` | 0 | 1 | 2 | rgba(0, 0, 0, 0.05) |
| `md` | 0 | 4 | 6 | rgba(0, 0, 0, 0.1) |
| `lg` | 0 | 10 | 15 | rgba(0, 0, 0, 0.1) |
| `xl` | 0 | 20 | 25 | rgba(0, 0, 0, 0.1) |
| `xxl` | 0 | 25 | 50 | rgba(0, 0, 0, 0.25) |

### Glow Effects

| Token | X | Y | Blur | Color |
|-------|---|---|------|-------|
| `glowPurple` | 0 | 0 | 30 | rgba(139, 92, 246, 0.5) |
| `glowPink` | 0 | 0 | 30 | rgba(217, 70, 239, 0.5) |
| `glowCyan` | 0 | 0 | 30 | rgba(34, 211, 238, 0.5) |

## Gradient Tokens

All gradients are linear at 135 degrees (`.topLeading` → `.bottomTrailing` in SwiftUI).

| Token | Stop 1 | Stop 2 | Stop 3 |
|-------|--------|--------|--------|
| `primary` | #8b5cf6 (0%) | #6d28d9 (50%) | #5b21b6 (100%) |
| `accent` | #e879f9 (0%) | #d946ef (50%) | #c026d3 (100%) |
| `secondary` | #22d3ee (0%) | #06b6d4 (50%) | #0891b2 (100%) |
| `neon` | #8b5cf6 (0%) | #d946ef (50%) | #22d3ee (100%) |
| `tech` | #6d28d9 (0%) | #a21caf (50%) | #0891b2 (100%) |
| `background` | #f5f3ff (0%) | #fdf4ff (50%) | #ecfeff (100%) |

## Opacity Tokens

| Token | Value |
|-------|-------|
| `opacity5` | 0.05 |
| `opacity10` | 0.10 |
| `opacity20` | 0.20 |
| `opacity30` | 0.30 |
| `opacity40` | 0.40 |
| `opacity50` | 0.50 |
| `opacity60` | 0.60 |
| `opacity70` | 0.70 |
| `opacity80` | 0.80 |
| `opacity90` | 0.90 |
| `opacity100` | 1.00 |

## Component Tokens

### Button — Primary

| Property | Token Reference |
|----------|----------------|
| Background | `GradientToken.primary` |
| Text color | `ColorToken.Semantic.white` |
| Text style | `TypographyToken.buttonMedium` |
| Corner radius | `ShapeToken.CornerRadius.full` |
| Shadow | `ShadowToken.md` |
| Padding H | `SpacingToken.lg` (24pt) |
| Padding V | `SpacingToken.md` (16pt) |

### Button — Secondary

| Property | Token Reference |
|----------|----------------|
| Background | `GradientToken.accent` |
| Text color | `ColorToken.Semantic.white` |
| Text style | `TypographyToken.buttonMedium` |
| Corner radius | `ShapeToken.CornerRadius.full` |
| Shadow | `ShadowToken.md` |
| Padding H | `SpacingToken.lg` (24pt) |
| Padding V | `SpacingToken.md` (16pt) |

### Button — Outline

| Property | Token Reference |
|----------|----------------|
| Background | Transparent |
| Border color | `ColorToken.Primary.p500` |
| Border width | `ShapeToken.BorderWidth.regular` (2pt) |
| Text color | `ColorToken.Primary.p500` |
| Text style | `TypographyToken.buttonMedium` |
| Corner radius | `ShapeToken.CornerRadius.full` |
| Padding H | `SpacingToken.lg` (24pt) |
| Padding V | `SpacingToken.md` (16pt) |

### Card — Standard

| Property | Token Reference |
|----------|----------------|
| Background | `ColorToken.Semantic.white` |
| Corner radius | `ShapeToken.CornerRadius.xxl` (24pt) |
| Shadow | `ShadowToken.lg` |
| Padding (small) | `SpacingToken.md` (16pt) |
| Padding (medium) | `SpacingToken.lg` (24pt) |
| Padding (large) | `SpacingToken.xl` (32pt) |

### Input Field

| Property | Token Reference |
|----------|----------------|
| Text style | `TypographyToken.input` |
| Padding V | 12pt |
| Padding H | `SpacingToken.md` (16pt) |
| Corner radius | `ShapeToken.CornerRadius.lg` (12pt) |
| Border width | `ShapeToken.BorderWidth.regular` (2pt) |
| Border — default | `ColorToken.Neutral.n200` |
| Border — focus | `ColorToken.Primary.p500` |
| Border — error | `ColorToken.Status.error` |
