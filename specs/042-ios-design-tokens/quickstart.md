# Quickstart: iOS Design Tokens

Get started using the Ava Robotics design token system in your SwiftUI views.

## Table of Contents

- [Colors](#colors)
- [Typography](#typography)
- [Spacing](#spacing)
- [Shapes](#shapes)
- [Shadows](#shadows)
- [Gradients](#gradients)
- [Opacity](#opacity)
- [Components](#components)

---

## Colors

All colors are accessed via `ColorToken` with nested enums for each palette.

```swift
// Brand colors
Text("Hello")
    .foregroundStyle(ColorToken.Primary.p500)    // Tech Purple

// Accent
Circle()
    .fill(ColorToken.Accent.a400)               // Neon Pink

// Secondary
Rectangle()
    .fill(ColorToken.Secondary.s400)             // Electric Cyan

// Neutral (text, backgrounds, borders)
Text("Subtitle")
    .foregroundStyle(ColorToken.Neutral.n600)     // Secondary text
VStack { }
    .background(ColorToken.Neutral.n50)           // Light background

// Semantic
Text("Label")
    .foregroundStyle(ColorToken.Semantic.white)

// Status
Text("Saved!")
    .foregroundStyle(ColorToken.Status.success)   // Green
Text("Error occurred")
    .foregroundStyle(ColorToken.Status.error)     // Red
```

## Typography

Apply typography presets with the `.typography()` modifier. All presets support Dynamic Type automatically.

```swift
// Titles
Text("Welcome Back")
    .typography(.display1)

Text("Section Title")
    .typography(.heading1)

// Body text
Text("Regular body content.")
    .typography(.bodyRegular)

Text("Emphasized body content.")
    .typography(.bodyMedium)

// Small text
Text("Helper text")
    .typography(.caption)

// Buttons
Text("SIGN IN")
    .typography(.buttonMedium)

// Form labels
Text("Email Address")
    .typography(.label)
```

## Spacing

Use `SpacingToken` constants for padding, margins, and gaps.

```swift
VStack(spacing: SpacingToken.md) {          // 16pt gap between items
    Text("Title")
    Text("Subtitle")
}
.padding(.horizontal, SpacingToken.lg)      // 24pt horizontal padding
.padding(.vertical, SpacingToken.xl)        // 32pt vertical padding

// Available values:
// SpacingToken.xs   =  4pt
// SpacingToken.sm   =  8pt
// SpacingToken.md   = 16pt
// SpacingToken.lg   = 24pt
// SpacingToken.xl   = 32pt
// SpacingToken.xxl  = 48pt
// SpacingToken.xxxl = 64pt
```

## Shapes

Use `ShapeToken.CornerRadius` for border radius and `ShapeToken.BorderWidth` for borders.

```swift
// Rounded card
RoundedRectangle(cornerRadius: ShapeToken.CornerRadius.xxl)
    .fill(ColorToken.Semantic.white)

// Pill shape (buttons, tags)
Capsule()  // or use ShapeToken.CornerRadius.full
    .fill(ColorToken.Primary.p500)

// Bordered input
RoundedRectangle(cornerRadius: ShapeToken.CornerRadius.lg)
    .strokeBorder(ColorToken.Neutral.n200, lineWidth: ShapeToken.BorderWidth.regular)
```

## Shadows

Apply shadows with the `.tokenShadow()` modifier.

```swift
// Standard shadows
CardView()
    .tokenShadow(.lg)                          // Standard card shadow

// Glow effects
FeatureIcon()
    .tokenShadow(.glowPurple)                  // Purple neon glow

// Available levels: .sm, .md, .lg, .xl, .xxl
// Glow effects: .glowPurple, .glowPink, .glowCyan
```

## Gradients

Use `GradientToken` for predefined linear gradients.

```swift
// Primary gradient background
RoundedRectangle(cornerRadius: ShapeToken.CornerRadius.xxl)
    .fill(GradientToken.primary)

// Neon gradient (purple → pink → cyan)
Text("Featured")
    .padding()
    .background(GradientToken.neon)

// Subtle background gradient
ZStack { }
    .background(GradientToken.background)

// Available: .primary, .accent, .secondary, .neon, .tech, .background
```

## Opacity

Apply opacity to any color using `OpacityToken`.

```swift
// Semi-transparent overlay
Rectangle()
    .fill(ColorToken.Semantic.black.opacity(OpacityToken.opacity50))

// Subtle background tint
VStack { }
    .background(ColorToken.Primary.p500.opacity(OpacityToken.opacity10))
```

## Components

### Buttons

Use SwiftUI's `.buttonStyle()` with predefined styles.

```swift
// Primary button (gradient background, white text, pill shape)
Button("Get Started") { }
    .buttonStyle(.brandPrimary)

// Secondary button (accent gradient)
Button("Learn More") { }
    .buttonStyle(.brandSecondary)

// Outline button (bordered, transparent)
Button("Cancel") { }
    .buttonStyle(.brandOutline)
```

### Cards

Use the `.cardStyle()` modifier.

```swift
// Standard card (white bg, 24pt radius, lg shadow, 24pt padding)
VStack {
    Text("Robot Status")
        .typography(.heading2)
    Text("All systems operational")
        .typography(.bodyRegular)
        .foregroundStyle(ColorToken.Neutral.n600)
}
.cardStyle()

// Card with custom padding
VStack { ... }
    .cardStyle(padding: .small)     // 16pt padding
    .cardStyle(padding: .large)     // 32pt padding
```

### Text Fields

Use `.textFieldStyle(.branded)` for styled inputs.

```swift
// Standard text field (with focus/error border states)
TextField("Email", text: $email)
    .textFieldStyle(.branded)
```
