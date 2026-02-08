# Quickstart: Android Design Tokens

How to use the design token system in your Compose code.

## Table of Contents

- [Setup](#setup)
- [Using Colors](#using-colors)
- [Using Typography](#using-typography)
- [Using Spacing](#using-spacing)
- [Using Shapes](#using-shapes)
- [Using Shadows](#using-shadows)
- [Using Gradients](#using-gradients)
- [Using Component Tokens](#using-component-tokens)
- [Debug Catalog](#debug-catalog)

---

## Setup

Wrap your app content with `AppTheme`:

```kotlin
@Composable
fun App() {
    AppTheme {
        // Your app content here
    }
}
```

`AppTheme` extends `MaterialTheme` and provides all custom tokens via `CompositionLocal`.

## Using Colors

### Raw Palette Colors

Access raw palette values via `AppColors`:

```kotlin
// Direct palette access
Box(modifier = Modifier.background(AppColors.Primary500))
Text("Hello", color = AppColors.Neutral900)
```

### Semantic Colors (Recommended)

Use semantic aliases for theme-aware colors:

```kotlin
// Theme-aware semantic colors
Box(modifier = Modifier.background(AppTheme.colors.background))
Text("Title", color = AppTheme.colors.onBackground)
Card(colors = CardDefaults.cardColors(containerColor = AppTheme.colors.surface))
```

### Available Semantic Colors

| Token | Usage |
|-------|-------|
| `AppTheme.colors.background` | App background |
| `AppTheme.colors.onBackground` | Text on background |
| `AppTheme.colors.surface` | Card/sheet surfaces |
| `AppTheme.colors.onSurface` | Text on surfaces |
| `AppTheme.colors.primary` | Primary actions |
| `AppTheme.colors.onPrimary` | Text on primary |
| `AppTheme.colors.accent` | Accent highlights |
| `AppTheme.colors.error` | Error states |

## Using Typography

Apply typography presets via `AppTheme.typography`:

```kotlin
Text("Hero Title", style = AppTheme.typography.display1)
Text("Section", style = AppTheme.typography.heading1)
Text("Body text", style = AppTheme.typography.bodyRegular)
Text("Click me", style = AppTheme.typography.buttonMedium)
Text("Helper", style = AppTheme.typography.caption)
```

All 18 presets are available: `display1`, `display2`, `heading1`-`heading3`, `bodyLarge`, `bodyRegular`, `bodyMedium`, `bodySemibold`, `bodySmall`, `bodySmallMedium`, `caption`, `captionMedium`, `buttonLarge`, `buttonMedium`, `buttonSmall`, `label`, `input`.

## Using Spacing

Access spacing scale via `AppTheme.spacing`:

```kotlin
Column(
    modifier = Modifier.padding(AppTheme.spacing.md),  // 16.dp
    verticalArrangement = Arrangement.spacedBy(AppTheme.spacing.sm)  // 8.dp
) {
    // content
}
```

| Token | Value |
|-------|-------|
| `AppTheme.spacing.xs` | 4.dp |
| `AppTheme.spacing.sm` | 8.dp |
| `AppTheme.spacing.md` | 16.dp |
| `AppTheme.spacing.lg` | 24.dp |
| `AppTheme.spacing.xl` | 32.dp |
| `AppTheme.spacing.xxl` | 48.dp |
| `AppTheme.spacing.xxxl` | 64.dp |

## Using Shapes

Apply border radius via `AppTheme.shapes`:

```kotlin
Box(
    modifier = Modifier
        .clip(RoundedCornerShape(AppTheme.shapes.xxl))  // 24.dp (card radius)
        .background(AppTheme.colors.surface)
)

// Full rounding for buttons/avatars
Box(modifier = Modifier.clip(CircleShape))  // equivalent to shapes.full
```

## Using Shadows

### Standard Elevation

```kotlin
Box(
    modifier = Modifier
        .dropShadow(
            shape = RoundedCornerShape(AppTheme.shapes.xxl),
            shadow = AppElevation.lg
        )
)
```

### Glow Effects

```kotlin
Box(
    modifier = Modifier
        .dropShadow(
            shape = RoundedCornerShape(AppTheme.shapes.full),
            shadow = AppElevation.glowPurple
        )
)
```

## Using Gradients

Apply gradient backgrounds:

```kotlin
Box(
    modifier = Modifier
        .background(
            brush = AppGradients.primary,
            shape = RoundedCornerShape(AppTheme.shapes.full)
        )
)
```

Available gradients: `primary`, `accent`, `secondary`, `neon`.

## Using Component Tokens

### Button Example

```kotlin
// Primary button using component tokens
Box(
    modifier = Modifier
        .background(
            brush = AppGradients.primary,
            shape = RoundedCornerShape(AppComponentTokens.Button.radiusFull)
        )
        .padding(
            horizontal = AppComponentTokens.Button.paddingMediumHorizontal,
            vertical = AppComponentTokens.Button.paddingMediumVertical
        )
) {
    Text("Submit", style = AppTheme.typography.buttonMedium, color = AppColors.White)
}
```

### Card Example

```kotlin
Box(
    modifier = Modifier
        .dropShadow(
            shape = RoundedCornerShape(AppComponentTokens.Card.radius),
            shadow = AppComponentTokens.Card.shadow
        )
        .background(
            color = AppComponentTokens.Card.background,
            shape = RoundedCornerShape(AppComponentTokens.Card.radius)
        )
        .padding(AppComponentTokens.Card.paddingMedium)
) {
    // Card content
}
```

## Debug Catalog

In **debug builds only**, navigate to the design token catalog screen to preview all tokens:

- All color palettes as labeled swatches
- All typography presets rendered as sample text
- Spacing scale visualized as bars
- Shape tokens shown on sample cards
- Shadow and glow effects on sample elements
- Gradient tokens on sample surfaces

The catalog screen is excluded from release builds via the `src/debug/` source set.
