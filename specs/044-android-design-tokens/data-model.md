# Data Model: Android Design Tokens

Entity definitions for the design token system mapped to Kotlin/Compose types.

## Table of Contents

- [Color Palette](#color-palette)
- [Semantic Colors](#semantic-colors)
- [Typography Presets](#typography-presets)
- [Spacing Scale](#spacing-scale)
- [Shape Tokens](#shape-tokens)
- [Shadow Tokens](#shadow-tokens)
- [Opacity Tokens](#opacity-tokens)
- [Gradient Tokens](#gradient-tokens)
- [Component Tokens](#component-tokens)

---

## Color Palette

Raw palette values organized by color family. Maps directly from `figma-design-tokens.json`.

### Primary (Tech Purple) - 10 shades

| Token Name | Hex Value | Web Token |
|------------|-----------|-----------|
| Primary50 | #f5f3ff | primary.50 |
| Primary100 | #ede9fe | primary.100 |
| Primary200 | #ddd6fe | primary.200 |
| Primary300 | #c4b5fd | primary.300 |
| Primary400 | #a78bfa | primary.400 |
| Primary500 | #8b5cf6 | primary.500 (main) |
| Primary600 | #7c3aed | primary.600 |
| Primary700 | #6d28d9 | primary.700 |
| Primary800 | #5b21b6 | primary.800 |
| Primary900 | #4c1d95 | primary.900 |

### Accent (Neon Pink) - 7 shades

| Token Name | Hex Value | Web Token |
|------------|-----------|-----------|
| Accent50 | #fdf4ff | accent.50 |
| Accent100 | #fae8ff | accent.100 |
| Accent200 | #f5d0fe | accent.200 |
| Accent300 | #f0abfc | accent.300 |
| Accent400 | #e879f9 | accent.400 (main) |
| Accent500 | #d946ef | accent.500 |
| Accent600 | #c026d3 | accent.600 |
| Accent700 | #a21caf | accent.700 |

### Secondary (Cyan) - 6 shades

| Token Name | Hex Value | Web Token |
|------------|-----------|-----------|
| Secondary50 | #ecfeff | secondary.50 |
| Secondary100 | #cffafe | secondary.100 |
| Secondary200 | #a5f3fc | secondary.200 |
| Secondary300 | #67e8f9 | secondary.300 |
| Secondary400 | #22d3ee | secondary.400 (main) |
| Secondary500 | #06b6d4 | secondary.500 |
| Secondary600 | #0891b2 | secondary.600 |

### Neutral - 10 shades

| Token Name | Hex Value | Web Token |
|------------|-----------|-----------|
| Neutral50 | #f8fafc | neutral.50 |
| Neutral100 | #f1f5f9 | neutral.100 |
| Neutral200 | #e2e8f0 | neutral.200 |
| Neutral300 | #cbd5e1 | neutral.300 |
| Neutral400 | #94a3b8 | neutral.400 |
| Neutral500 | #64748b | neutral.500 |
| Neutral600 | #475569 | neutral.600 |
| Neutral700 | #334155 | neutral.700 |
| Neutral800 | #1e293b | neutral.800 |
| Neutral900 | #0f172a | neutral.900 |

### Basic

| Token Name | Hex Value |
|------------|-----------|
| White | #ffffff |
| Black | #000000 |

### Error

| Token Name | Hex Value | Usage |
|------------|-----------|-------|
| Error | #ef4444 | Input error border (from component tokens) |

## Semantic Colors

Semantic aliases that map to raw palette values. Light theme mapping (initial). These are the developer-facing tokens for building UI.

| Semantic Name | Light Value | Usage |
|---------------|-------------|-------|
| background | Neutral50 (#f8fafc) | App background |
| onBackground | Neutral900 (#0f172a) | Text on background |
| surface | White (#ffffff) | Card, sheet surfaces |
| onSurface | Neutral900 (#0f172a) | Text on surfaces |
| surfaceVariant | Neutral100 (#f1f5f9) | Secondary surfaces |
| onSurfaceVariant | Neutral600 (#475569) | Secondary text on surfaces |
| primary | Primary500 (#8b5cf6) | Primary actions, brand |
| onPrimary | White (#ffffff) | Text/icons on primary |
| primaryContainer | Primary50 (#f5f3ff) | Primary container |
| onPrimaryContainer | Primary900 (#4c1d95) | Text on primary container |
| secondary | Secondary400 (#22d3ee) | Secondary actions |
| onSecondary | White (#ffffff) | Text on secondary |
| accent | Accent400 (#e879f9) | Accent highlights |
| onAccent | White (#ffffff) | Text on accent |
| outline | Neutral200 (#e2e8f0) | Borders, dividers |
| outlineVariant | Neutral300 (#cbd5e1) | Subtle borders |
| error | Error (#ef4444) | Error states |
| onError | White (#ffffff) | Text on error |

## Typography Presets

All 18 presets from `figma-design-tokens.json`. Font sizes in sp, line heights as multipliers.

| Preset Name | Size (sp) | Weight | Line Height | Letter Spacing (sp) | Usage |
|-------------|-----------|--------|-------------|---------------------|-------|
| Display1 | 36 | Bold (700) | 1.2 | -0.5 | Hero title |
| Display2 | 30 | Bold (700) | 1.2 | -0.5 | Page main title |
| Heading1 | 24 | SemiBold (600) | 1.2 | 0 | Section title |
| Heading2 | 20 | SemiBold (600) | 1.2 | 0 | Subsection title |
| Heading3 | 18 | SemiBold (600) | 1.2 | 0 | Card title |
| BodyLarge | 18 | Normal (400) | 1.5 | 0 | Large body text |
| BodyRegular | 16 | Normal (400) | 1.5 | 0 | Standard body text |
| BodyMedium | 16 | Medium (500) | 1.5 | 0 | Emphasized body text |
| BodySemibold | 16 | SemiBold (600) | 1.5 | 0 | Important body text |
| BodySmall | 14 | Normal (400) | 1.5 | 0 | Secondary text |
| BodySmallMedium | 14 | Medium (500) | 1.5 | 0 | Emphasized secondary |
| Caption | 12 | Normal (400) | 1.5 | 0 | Helper text |
| CaptionMedium | 12 | Medium (500) | 1.5 | 0 | Emphasized helper |
| ButtonLarge | 18 | SemiBold (600) | 1.2 | 0.5 | Large button text |
| ButtonMedium | 16 | Medium (500) | 1.2 | 0.5 | Standard button text |
| ButtonSmall | 14 | Medium (500) | 1.2 | 0.5 | Small button text |
| Label | 14 | Medium (500) | 1.2 | 0.5 | Form labels |
| Input | 16 | Normal (400) | 1.5 | 0 | Input field text |

**Font family**: Roboto (Android system default, included in web's fallback stack).

## Spacing Scale

7-step scale. Values in dp.

| Token Name | Value (dp) | Web Value (px) | Usage |
|------------|-----------|----------------|-------|
| Xs | 4 | 4 | Minimal spacing |
| Sm | 8 | 8 | Small spacing |
| Md | 16 | 16 | Standard spacing |
| Lg | 24 | 24 | Large spacing |
| Xl | 32 | 32 | Extra large |
| Xxl | 48 | 48 | Section spacing |
| Xxxl | 64 | 64 | Page spacing |

## Shape Tokens

Border radius values. Values in dp.

| Token Name | Value (dp) | Web Value (px) | Usage |
|------------|-----------|----------------|-------|
| None | 0 | 0 | Square elements |
| Small | 6 | 6 | Small elements |
| Medium | 8 | 8 | Input fields |
| Large | 12 | 12 | Small cards |
| ExtraLarge | 16 | 16 | Medium cards |
| Xxl | 24 | 24 | Large cards |
| Xxxl | 28 | 28 | Icon standard |
| Full | 50% | 999 | Circular (buttons, avatars) |

## Shadow Tokens

Shadow definitions mapping web CSS box-shadow to Compose shadow parameters.

### Standard Shadows

| Token Name | Y Offset (dp) | Blur (dp) | Spread (dp) | Color | Web CSS |
|------------|---------------|-----------|-------------|-------|---------|
| Sm | 1 | 2 | 0 | black 5% alpha | 0 1px 2px rgba(0,0,0,0.05) |
| Md | 4 | 6 | -1 | black 10% alpha | 0 4px 6px -1px rgba(0,0,0,0.1) |
| Lg | 10 | 15 | -3 | black 10% alpha | 0 10px 15px -3px rgba(0,0,0,0.1) |
| Xl | 20 | 25 | -5 | black 10% alpha | 0 20px 25px -5px rgba(0,0,0,0.1) |
| Xxl | 25 | 50 | -12 | black 25% alpha | 0 25px 50px -12px rgba(0,0,0,0.25) |

### Glow Effects

| Token Name | Blur (dp) | Color | Alpha | Web CSS |
|------------|-----------|-------|-------|---------|
| GlowPurple | 30 | #8b5cf6 | 50% | 0 0 30px rgba(139,92,246,0.5) |
| GlowPink | 30 | #d946ef | 50% | 0 0 30px rgba(217,70,239,0.5) |
| GlowCyan | 30 | #22d3ee | 50% | 0 0 30px rgba(34,211,238,0.5) |

## Opacity Tokens

12-level opacity scale.

| Token Name | Value |
|------------|-------|
| Opacity0 | 0.0f |
| Opacity5 | 0.05f |
| Opacity10 | 0.1f |
| Opacity20 | 0.2f |
| Opacity30 | 0.3f |
| Opacity40 | 0.4f |
| Opacity50 | 0.5f |
| Opacity60 | 0.6f |
| Opacity70 | 0.7f |
| Opacity80 | 0.8f |
| Opacity90 | 0.9f |
| Opacity100 | 1.0f |

## Gradient Tokens

4 gradient presets. All use 135-degree angle (top-left to bottom-right).

| Token Name | Color Stops | Usage |
|------------|-------------|-------|
| Primary | #8b5cf6 (0%) → #6d28d9 (50%) → #5b21b6 (100%) | Primary buttons, hero |
| Accent | #e879f9 (0%) → #d946ef (50%) → #c026d3 (100%) | Accent buttons, highlights |
| Secondary | #22d3ee (0%) → #06b6d4 (50%) → #0891b2 (100%) | Secondary actions |
| Neon | #8b5cf6 (0%) → #d946ef (50%) → #22d3ee (100%) | Special multi-color effect |

## Component Tokens

### Button

| Variant | Padding | Radius | Background | Text Color | Shadow |
|---------|---------|--------|------------|------------|--------|
| Primary Small | 8×16 dp | Full | Primary gradient | White | Md |
| Primary Medium | 16×24 dp | Full | Primary gradient | White | Md |
| Primary Large | 12×32 dp | Full | Primary gradient | White | Md |
| Secondary | (same sizes) | Full | Accent gradient | White | Md |
| Outline | (same sizes) | Full | Transparent | Primary500 | None |

Outline border: 2dp, Primary500 color.

### Card

| Size | Padding (dp) | Radius | Background | Shadow |
|------|-------------|--------|------------|--------|
| Small | 16 | Xxl (24dp) | White | Lg |
| Medium | 24 | Xxl (24dp) | White | Lg |
| Large | 32 | Xxl (24dp) | White | Lg |

### Input

| Property | Value |
|----------|-------|
| Padding | 12×16 dp |
| Radius | Large (12dp) |
| Border Width | 2dp |
| Border Default | Neutral200 (#e2e8f0) |
| Border Focus | Primary500 (#8b5cf6) |
| Border Error | Error (#ef4444) |
