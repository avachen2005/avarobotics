# Timeless App - Native Mobile App Specification

> Complete technical specification for native iOS (Swift + SwiftUI) and Android (Kotlin + Jetpack Compose) development

**Project**: Timeless Health Tracking App (Native Mobile)  
**Version**: 1.0.0  
**Last Updated**: 2024-12-18  
**Platforms**: 
- 🍎 **iOS 15.0+** - Swift 5.9 + SwiftUI 4.0
- 🤖 **Android 8.0+ (API 26+)** - Kotlin 1.9 + Jetpack Compose 1.5

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Design System Implementation](#design-system-implementation)
5. [Component Specifications](#component-specifications)
6. [Data Models](#data-models)
7. [Localization (i18n)](#localization-i18n)
8. [Screen Specifications](#screen-specifications)
9. [Navigation](#navigation)
10. [State Management](#state-management)
11. [Code Examples](#code-examples)
12. [Build & Deployment](#build--deployment)

---

## 🎯 Project Overview

### App Information
- **Name**: Timeless
- **Bundle ID**: `com.timeless.app`
- **Slogan**: "Strive on your timeless journey"
- **Design Style**: Tech Neon (科技霓虹風格)
- **Supported Languages**: 繁中、簡中、English、日本語、한국어

### App Features
1. **Multi-language Login Flow** (5 steps)
   - Login (OAuth + Email)
   - Welcome
   - Biometric Setup (Face ID / Fingerprint)
   - Profile Setup (24 health goals)
   - Complete

2. **Design System Showcase**
   - Colors, Gradients, Shadows
   - Typography, Spacing, Components

### Platform-Specific Design
- **iOS**: Rounded corners (28px), SF Symbols, Face ID
- **Android**: Circular icons, Material Icons, Fingerprint

---

## 🛠️ Tech Stack

### iOS (Swift + SwiftUI)

```swift
// Minimum Requirements
- iOS 15.0+
- Xcode 15.0+
- Swift 5.9+
- SwiftUI 4.0+

// Key Frameworks
- SwiftUI              // UI Framework
- Combine              // Reactive Programming
- LocalAuthentication  // Face ID / Touch ID
- SwiftUI Navigation   // NavigationStack (iOS 16+)
```

#### Dependencies (Swift Package Manager)
```swift
dependencies: [
    // None required for MVP (純原生實作)
    // Optional: SDWebImageSwiftUI for image loading
]
```

---

### Android (Kotlin + Compose)

```kotlin
// Minimum Requirements
- Android 8.0 (API 26+)
- Target SDK: 34
- Kotlin 1.9.0+
- Compose 1.5.0+

// Key Libraries
- Jetpack Compose      // UI Framework
- Compose Material3    // Material Design 3
- Compose Navigation   // Navigation
- Coroutines + Flow    // Async & State
- BiometricPrompt      // Fingerprint Auth
```

#### Dependencies (build.gradle.kts)
```kotlin
dependencies {
    // Compose BOM
    implementation(platform("androidx.compose:compose-bom:2024.01.00"))
    
    // Compose Core
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.material3:material3")
    implementation("androidx.compose.ui:ui-tooling-preview")
    implementation("androidx.activity:activity-compose:1.8.2")
    
    // Navigation
    implementation("androidx.navigation:navigation-compose:2.7.6")
    
    // ViewModel
    implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.7.0")
    
    // Biometric
    implementation("androidx.biometric:biometric:1.2.0-alpha05")
    
    // Coroutines
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.7.3")
}
```

---

## 📁 Project Structure

### iOS (SwiftUI) Structure

```
TimelessApp/
├── TimelessApp.xcodeproj
├── TimelessApp/
│   ├── App/
│   │   └── TimelessApp.swift           # App entry point
│   │
│   ├── DesignSystem/
│   │   ├── Tokens/
│   │   │   ├── Colors.swift            # Color palette
│   │   │   ├── Gradients.swift         # Gradient definitions
│   │   │   ├── Shadows.swift           # Shadow styles
│   │   │   ├── Spacing.swift           # Spacing scale
│   │   │   └── Typography.swift        # Font styles
│   │   │
│   │   └── Components/
│   │       ├── PrimaryButton.swift     # Button components
│   │       ├── TimelessCard.swift      # Card component
│   │       └── AppIcon.swift           # Icon component
│   │
│   ├── Models/
│   │   ├── User.swift                  # User model
│   │   ├── HealthGoal.swift            # Health goal model
│   │   └── Language.swift              # Language enum
│   │
│   ├── ViewModels/
│   │   ├── LoginViewModel.swift        # Login flow state
│   │   ├── ProfileViewModel.swift      # Profile state
│   │   └── BiometricViewModel.swift    # Biometric state
│   │
│   ├── Views/
│   │   ├── Login/
│   │   │   ├── LoginView.swift         # Step 1: Login
│   │   │   ├── WelcomeView.swift       # Step 2: Welcome
│   │   │   ├── BiometricView.swift     # Step 3: Biometric
│   │   │   ├── ProfileSetupView.swift  # Step 4: Profile
│   │   │   └── CompleteView.swift      # Step 5: Complete
│   │   │
│   │   └── DesignSystem/
│   │       └── DesignSystemView.swift  # Design showcase
│   │
│   ├── Utilities/
│   │   ├── Localization.swift          # i18n helper
│   │   └── BiometricAuth.swift         # Face ID helper
│   │
│   └── Resources/
│       ├── Localizable.strings (zh-Hant)  # 繁中
│       ├── Localizable.strings (zh-Hans)  # 簡中
│       ├── Localizable.strings (en)       # English
│       ├── Localizable.strings (ja)       # 日本語
│       ├── Localizable.strings (ko)       # 한국어
│       └── Assets.xcassets/
│           ├── AppIcon.appiconset
│           └── Colors/
│
└── TimelessAppTests/
    └── ...
```

---

### Android (Kotlin + Compose) Structure

```
TimelessApp/
├── app/
│   ├── build.gradle.kts
│   └── src/
│       └── main/
│           ├── AndroidManifest.xml
│           │
│           ├── kotlin/com/timeless/app/
│           │   ├── TimelessApp.kt          # Application class
│           │   │
│           │   ├── designsystem/
│           │   │   ├── tokens/
│           │   │   │   ├── Colors.kt       # Color palette
│           │   │   │   ├── Gradients.kt    # Gradient brushes
│           │   │   │   ├── Shadows.kt      # Elevation/Shadow
│           │   │   │   ├── Spacing.kt      # Spacing scale
│           │   │   │   └── Typography.kt   # Text styles
│           │   │   │
│           │   │   ├── components/
│           │   │   │   ├── PrimaryButton.kt    # Button
│           │   │   │   ├── TimelessCard.kt     # Card
│           │   │   │   └── AppIcon.kt          # Icon
│           │   │   │
│           │   │   └── theme/
│           │   │       └── TimelessTheme.kt    # Theme setup
│           │   │
│           │   ├── data/
│           │   │   ├── model/
│           │   │   │   ├── User.kt             # User data class
│           │   │   │   ├── HealthGoal.kt       # Health goal
│           │   │   │   └── Language.kt         # Language enum
│           │   │   │
│           │   │   └── repository/
│           │   │       └── HealthGoalsRepository.kt  # CMS data
│           │   │
│           │   ├── ui/
│           │   │   ├── login/
│           │   │   │   ├── LoginScreen.kt      # Step 1
│           │   │   │   ├── WelcomeScreen.kt    # Step 2
│           │   │   │   ├── BiometricScreen.kt  # Step 3
│           │   │   │   ├── ProfileScreen.kt    # Step 4
│           │   │   │   └── CompleteScreen.kt   # Step 5
│           │   │   │
│           │   │   ├── designsystem/
│           │   │   │   └── DesignSystemScreen.kt
│           │   │   │
│           │   │   └── MainActivity.kt         # Entry point
│           │   │
│           │   ├── navigation/
│           │   │   └── NavGraph.kt             # Navigation setup
│           │   │
│           │   └── viewmodel/
│           │       ├── LoginViewModel.kt
│           │       ├── ProfileViewModel.kt
│           │       └── BiometricViewModel.kt
│           │
│           └── res/
│               ├── values/
│               │   ├── strings.xml             # English (default)
│               │   └── colors.xml
│               ├── values-zh-rTW/
│               │   └── strings.xml             # 繁中
│               ├── values-zh-rCN/
│               │   └── strings.xml             # 簡中
│               ├── values-ja/
│               │   └── strings.xml             # 日文
│               ├── values-ko/
│               │   └── strings.xml             # 韓文
│               └── mipmap-*/
│                   └── ic_launcher.png
│
└── build.gradle.kts
```

---

## 🎨 Design System Implementation

### Color System

#### iOS (SwiftUI)

**File**: `DesignSystem/Tokens/Colors.swift`

```swift
import SwiftUI

extension Color {
    // MARK: - Primary (Tech Purple)
    static let primary50 = Color(hex: "f5f3ff")
    static let primary100 = Color(hex: "ede9fe")
    static let primary200 = Color(hex: "ddd6fe")
    static let primary300 = Color(hex: "c4b5fd")
    static let primary400 = Color(hex: "a78bfa")
    static let primary500 = Color(hex: "8b5cf6")  // ⭐ Main
    static let primary600 = Color(hex: "7c3aed")
    static let primary700 = Color(hex: "6d28d9")
    static let primary800 = Color(hex: "5b21b6")
    static let primary900 = Color(hex: "4c1d95")
    
    // MARK: - Accent (Neon Pink)
    static let accent50 = Color(hex: "fdf4ff")
    static let accent100 = Color(hex: "fae8ff")
    static let accent200 = Color(hex: "f5d0fe")
    static let accent300 = Color(hex: "f0abfc")
    static let accent400 = Color(hex: "e879f9")  // ⭐ Main
    static let accent500 = Color(hex: "d946ef")
    static let accent600 = Color(hex: "c026d3")
    static let accent700 = Color(hex: "a21caf")
    
    // MARK: - Secondary (Cyan)
    static let secondary50 = Color(hex: "ecfeff")
    static let secondary100 = Color(hex: "cffafe")
    static let secondary200 = Color(hex: "a5f3fc")
    static let secondary300 = Color(hex: "67e8f9")
    static let secondary400 = Color(hex: "22d3ee")  // ⭐ Main
    static let secondary500 = Color(hex: "06b6d4")
    static let secondary600 = Color(hex: "0891b2")
    
    // MARK: - Neutral
    static let neutral50 = Color(hex: "f8fafc")
    static let neutral100 = Color(hex: "f1f5f9")
    static let neutral200 = Color(hex: "e2e8f0")
    static let neutral300 = Color(hex: "cbd5e1")
    static let neutral600 = Color(hex: "475569")
    static let neutral700 = Color(hex: "334155")
    static let neutral900 = Color(hex: "0f172a")
}

// MARK: - Helper Extension
extension Color {
    init(hex: String) {
        let scanner = Scanner(string: hex)
        var rgbValue: UInt64 = 0
        scanner.scanHexInt64(&rgbValue)
        
        let r = Double((rgbValue & 0xFF0000) >> 16) / 255.0
        let g = Double((rgbValue & 0x00FF00) >> 8) / 255.0
        let b = Double(rgbValue & 0x0000FF) / 255.0
        
        self.init(red: r, green: g, blue: b)
    }
}
```

---

#### Android (Compose)

**File**: `designsystem/tokens/Colors.kt`

```kotlin
package com.timeless.app.designsystem.tokens

import androidx.compose.ui.graphics.Color

object TimelessColors {
    // Primary (Tech Purple)
    val Primary50 = Color(0xFFF5F3FF)
    val Primary100 = Color(0xFFEDE9FE)
    val Primary200 = Color(0xFFDDD6FE)
    val Primary300 = Color(0xFFC4B5FD)
    val Primary400 = Color(0xFFA78BFA)
    val Primary500 = Color(0xFF8B5CF6)  // ⭐ Main
    val Primary600 = Color(0xFF7C3AED)
    val Primary700 = Color(0xFF6D28D9)
    val Primary800 = Color(0xFF5B21B6)
    val Primary900 = Color(0xFF4C1D95)
    
    // Accent (Neon Pink)
    val Accent50 = Color(0xFFFDF4FF)
    val Accent100 = Color(0xFFFAE8FF)
    val Accent200 = Color(0xFFF5D0FE)
    val Accent300 = Color(0xFFF0ABFC)
    val Accent400 = Color(0xFFE879F9)  // ⭐ Main
    val Accent500 = Color(0xFFD946EF)
    val Accent600 = Color(0xFFC026D3)
    val Accent700 = Color(0xFFA21CAF)
    
    // Secondary (Cyan)
    val Secondary50 = Color(0xFFECFEFF)
    val Secondary100 = Color(0xFFCFFAFE)
    val Secondary200 = Color(0xFFA5F3FC)
    val Secondary300 = Color(0xFF67E8F9)
    val Secondary400 = Color(0xFF22D3EE)  // ⭐ Main
    val Secondary500 = Color(0xFF06B6D4)
    val Secondary600 = Color(0xFF0891B2)
    
    // Neutral
    val Neutral50 = Color(0xFFF8FAFC)
    val Neutral100 = Color(0xFFF1F5F9)
    val Neutral200 = Color(0xFFE2E8F0)
    val Neutral300 = Color(0xFFCBD5E1)
    val Neutral600 = Color(0xFF475569)
    val Neutral700 = Color(0xFF334155)
    val Neutral900 = Color(0xFF0F172A)
}
```

---

### Gradients

#### iOS (SwiftUI)

**File**: `DesignSystem/Tokens/Gradients.swift`

```swift
import SwiftUI

struct TimelessGradients {
    // Primary Gradient
    static let primary = LinearGradient(
        colors: [
            Color(hex: "8b5cf6"),
            Color(hex: "6d28d9"),
            Color(hex: "5b21b6")
        ],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )
    
    // Accent Gradient
    static let accent = LinearGradient(
        colors: [
            Color(hex: "e879f9"),
            Color(hex: "d946ef"),
            Color(hex: "c026d3")
        ],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )
    
    // Secondary Gradient
    static let secondary = LinearGradient(
        colors: [
            Color(hex: "22d3ee"),
            Color(hex: "06b6d4"),
            Color(hex: "0891b2")
        ],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )
    
    // Neon Gradient ⭐ (特色)
    static let neon = LinearGradient(
        colors: [
            Color(hex: "8b5cf6"),
            Color(hex: "d946ef"),
            Color(hex: "22d3ee")
        ],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )
    
    // Background Gradient
    static let background = LinearGradient(
        colors: [
            Color(hex: "f5f3ff"),
            Color(hex: "fdf4ff"),
            Color(hex: "ecfeff")
        ],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )
}
```

---

#### Android (Compose)

**File**: `designsystem/tokens/Gradients.kt`

```kotlin
package com.timeless.app.designsystem.tokens

import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color

object TimelessGradients {
    // Primary Gradient
    val Primary = Brush.linearGradient(
        colors = listOf(
            Color(0xFF8B5CF6),
            Color(0xFF6D28D9),
            Color(0xFF5B21B6)
        )
    )
    
    // Accent Gradient
    val Accent = Brush.linearGradient(
        colors = listOf(
            Color(0xFFE879F9),
            Color(0xFFD946EF),
            Color(0xFFC026D3)
        )
    )
    
    // Secondary Gradient
    val Secondary = Brush.linearGradient(
        colors = listOf(
            Color(0xFF22D3EE),
            Color(0xFF06B6D4),
            Color(0xFF0891B2)
        )
    )
    
    // Neon Gradient ⭐
    val Neon = Brush.linearGradient(
        colors = listOf(
            Color(0xFF8B5CF6),
            Color(0xFFD946EF),
            Color(0xFF22D3EE)
        )
    )
    
    // Background Gradient
    val Background = Brush.linearGradient(
        colors = listOf(
            Color(0xFFF5F3FF),
            Color(0xFFFDF4FF),
            Color(0xFFECFEFF)
        )
    )
}
```

---

### Spacing

#### iOS (SwiftUI)

**File**: `DesignSystem/Tokens/Spacing.swift`

```swift
import SwiftUI

struct Spacing {
    static let xs: CGFloat = 4    // 0.25rem
    static let sm: CGFloat = 8    // 0.5rem
    static let md: CGFloat = 16   // 1rem ⭐
    static let lg: CGFloat = 24   // 1.5rem
    static let xl: CGFloat = 32   // 2rem
    static let xxl: CGFloat = 48  // 3rem
    static let xxxl: CGFloat = 64 // 4rem
}
```

---

#### Android (Compose)

**File**: `designsystem/tokens/Spacing.kt`

```kotlin
package com.timeless.app.designsystem.tokens

import androidx.compose.ui.unit.dp

object Spacing {
    val xs = 4.dp    // 0.25rem
    val sm = 8.dp    // 0.5rem
    val md = 16.dp   // 1rem ⭐
    val lg = 24.dp   // 1.5rem
    val xl = 32.dp   // 2rem
    val xxl = 48.dp  // 3rem
    val xxxl = 64.dp // 4rem
}
```

---

### Typography

#### iOS (SwiftUI)

**File**: `DesignSystem/Tokens/Typography.swift`

```swift
import SwiftUI

extension Font {
    // Display (Hero titles)
    static let display = Font.system(size: 36, weight: .bold)
    
    // Headings
    static let h1 = Font.system(size: 30, weight: .semibold)
    static let h2 = Font.system(size: 24, weight: .semibold)
    static let h3 = Font.system(size: 20, weight: .semibold)
    
    // Body
    static let bodyLarge = Font.system(size: 18, weight: .regular)
    static let body = Font.system(size: 16, weight: .regular)  // ⭐
    static let bodySmall = Font.system(size: 14, weight: .regular)
    
    // Label
    static let label = Font.system(size: 14, weight: .medium)
    static let caption = Font.system(size: 12, weight: .regular)
}
```

---

#### Android (Compose)

**File**: `designsystem/tokens/Typography.kt`

```kotlin
package com.timeless.app.designsystem.tokens

import androidx.compose.material3.Typography
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp

val TimelessTypography = Typography(
    // Display (Hero titles)
    displayLarge = TextStyle(
        fontSize = 36.sp,
        fontWeight = FontWeight.Bold,
        lineHeight = 44.sp
    ),
    
    // Headings
    headlineLarge = TextStyle(
        fontSize = 30.sp,
        fontWeight = FontWeight.SemiBold,
        lineHeight = 36.sp
    ),
    headlineMedium = TextStyle(
        fontSize = 24.sp,
        fontWeight = FontWeight.SemiBold,
        lineHeight = 30.sp
    ),
    headlineSmall = TextStyle(
        fontSize = 20.sp,
        fontWeight = FontWeight.SemiBold,
        lineHeight = 26.sp
    ),
    
    // Body ⭐
    bodyLarge = TextStyle(
        fontSize = 18.sp,
        fontWeight = FontWeight.Normal,
        lineHeight = 27.sp
    ),
    bodyMedium = TextStyle(
        fontSize = 16.sp,
        fontWeight = FontWeight.Normal,
        lineHeight = 24.sp
    ),
    bodySmall = TextStyle(
        fontSize = 14.sp,
        fontWeight = FontWeight.Normal,
        lineHeight = 21.sp
    ),
    
    // Label
    labelLarge = TextStyle(
        fontSize = 14.sp,
        fontWeight = FontWeight.Medium,
        lineHeight = 20.sp
    ),
    labelSmall = TextStyle(
        fontSize = 12.sp,
        fontWeight = FontWeight.Normal,
        lineHeight = 16.sp
    )
)
```

---

## 🧩 Component Specifications

### Primary Button

#### iOS (SwiftUI)

**File**: `DesignSystem/Components/PrimaryButton.swift`

```swift
import SwiftUI

enum ButtonVariant {
    case primary
    case secondary
    case outline
    case ghost
}

enum ButtonSize {
    case small
    case medium
    case large
    
    var padding: EdgeInsets {
        switch self {
        case .small:
            return EdgeInsets(top: 8, leading: 16, bottom: 8, trailing: 16)
        case .medium:
            return EdgeInsets(top: 10, leading: 24, bottom: 10, trailing: 24)
        case .large:
            return EdgeInsets(top: 12, leading: 32, bottom: 12, trailing: 32)
        }
    }
    
    var fontSize: CGFloat {
        switch self {
        case .small: return 14
        case .medium: return 16
        case .large: return 18
        }
    }
}

struct PrimaryButton: View {
    let title: String
    let variant: ButtonVariant
    let size: ButtonSize
    let action: () -> Void
    
    init(
        _ title: String,
        variant: ButtonVariant = .primary,
        size: ButtonSize = .medium,
        action: @escaping () -> Void
    ) {
        self.title = title
        self.variant = variant
        self.size = size
        self.action = action
    }
    
    var body: some View {
        Button(action: action) {
            Text(title)
                .font(.system(size: size.fontSize, weight: .medium))
                .foregroundColor(textColor)
                .padding(size.padding)
                .frame(maxWidth: .infinity)
                .background(backgroundView)
                .overlay(borderView)
        }
        .buttonStyle(ScaleButtonStyle())
    }
    
    @ViewBuilder
    private var backgroundView: some View {
        switch variant {
        case .primary:
            RoundedRectangle(cornerRadius: 999)
                .fill(TimelessGradients.primary)
                .shadow(color: Color.black.opacity(0.1), radius: 4, y: 2)
            
        case .secondary:
            RoundedRectangle(cornerRadius: 999)
                .fill(TimelessGradients.accent)
                .shadow(color: Color.black.opacity(0.1), radius: 4, y: 2)
            
        case .outline:
            RoundedRectangle(cornerRadius: 999)
                .fill(Color.clear)
            
        case .ghost:
            Color.clear
        }
    }
    
    @ViewBuilder
    private var borderView: some View {
        if variant == .outline {
            RoundedRectangle(cornerRadius: 999)
                .stroke(Color.primary500, lineWidth: 2)
        }
    }
    
    private var textColor: Color {
        switch variant {
        case .primary, .secondary:
            return .white
        case .outline:
            return .primary500
        case .ghost:
            return .neutral600
        }
    }
}

// Scale animation on tap
struct ScaleButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .scaleEffect(configuration.isPressed ? 0.98 : 1.0)
            .animation(.easeInOut(duration: 0.15), value: configuration.isPressed)
    }
}
```

**Usage**:
```swift
PrimaryButton("登入", variant: .primary, size: .large) {
    // Handle login
}

PrimaryButton("跳過", variant: .outline, size: .medium) {
    // Handle skip
}
```

---

#### Android (Compose)

**File**: `designsystem/components/PrimaryButton.kt`

```kotlin
package com.timeless.app.designsystem.components

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.timeless.app.designsystem.tokens.*

enum class ButtonVariant {
    Primary, Secondary, Outline, Ghost
}

enum class ButtonSize(
    val horizontalPadding: androidx.compose.ui.unit.Dp,
    val verticalPadding: androidx.compose.ui.unit.Dp,
    val fontSize: androidx.compose.ui.unit.TextUnit
) {
    Small(16.dp, 8.dp, 14.sp),
    Medium(24.dp, 10.dp, 16.sp),
    Large(32.dp, 12.dp, 18.sp)
}

@Composable
fun PrimaryButton(
    text: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    variant: ButtonVariant = ButtonVariant.Primary,
    size: ButtonSize = ButtonSize.Medium,
    enabled: Boolean = true
) {
    val shape = RoundedCornerShape(percent = 50)  // Fully rounded
    
    Button(
        onClick = onClick,
        modifier = modifier
            .fillMaxWidth()
            .height(IntrinsicSize.Min)
            .then(
                if (variant == ButtonVariant.Primary || variant == ButtonVariant.Secondary) {
                    Modifier.shadow(4.dp, shape)
                } else Modifier
            ),
        enabled = enabled,
        shape = shape,
        colors = ButtonDefaults.buttonColors(
            containerColor = Color.Transparent,
            contentColor = when (variant) {
                ButtonVariant.Primary, ButtonVariant.Secondary -> Color.White
                ButtonVariant.Outline -> TimelessColors.Primary500
                ButtonVariant.Ghost -> TimelessColors.Neutral600
            },
            disabledContainerColor = Color.Transparent,
            disabledContentColor = TimelessColors.Neutral300
        ),
        border = when (variant) {
            ButtonVariant.Outline -> BorderStroke(2.dp, TimelessColors.Primary500)
            else -> null
        },
        contentPadding = PaddingValues(
            horizontal = size.horizontalPadding,
            vertical = size.verticalPadding
        )
    ) {
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .clip(shape)
                .background(
                    brush = when (variant) {
                        ButtonVariant.Primary -> TimelessGradients.Primary
                        ButtonVariant.Secondary -> TimelessGradients.Accent
                        else -> Brush.linearGradient(listOf(Color.Transparent, Color.Transparent))
                    }
                )
                .padding(
                    horizontal = size.horizontalPadding,
                    vertical = size.verticalPadding
                )
        ) {
            Text(
                text = text,
                fontSize = size.fontSize,
                style = MaterialTheme.typography.labelLarge
            )
        }
    }
}
```

**Usage**:
```kotlin
PrimaryButton(
    text = "登入",
    onClick = { /* Handle login */ },
    variant = ButtonVariant.Primary,
    size = ButtonSize.Large
)

PrimaryButton(
    text = "跳過",
    onClick = { /* Handle skip */ },
    variant = ButtonVariant.Outline,
    size = ButtonSize.Medium
)
```

---

### Card Component

#### iOS (SwiftUI)

**File**: `DesignSystem/Components/TimelessCard.swift`

```swift
import SwiftUI

enum CardPadding {
    case small
    case medium
    case large
    
    var value: CGFloat {
        switch self {
        case .small: return 16
        case .medium: return 24
        case .large: return 32
        }
    }
}

struct TimelessCard<Content: View>: View {
    let title: String?
    let padding: CardPadding
    let content: Content
    
    init(
        title: String? = nil,
        padding: CardPadding = .medium,
        @ViewBuilder content: () -> Content
    ) {
        self.title = title
        self.padding = padding
        self.content = content()
    }
    
    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            if let title = title {
                Text(title)
                    .font(.h3)
                    .foregroundColor(.neutral900)
            }
            
            content
        }
        .padding(padding.value)
        .background(Color.white)
        .cornerRadius(24)
        .shadow(color: Color.black.opacity(0.1), radius: 10, y: 4)
    }
}
```

**Usage**:
```swift
TimelessCard(title: "統計資料", padding: .large) {
    Text("內容區域")
        .foregroundColor(.neutral600)
}
```

---

#### Android (Compose)

**File**: `designsystem/components/TimelessCard.kt`

```kotlin
package com.timeless.app.designsystem.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.timeless.app.designsystem.tokens.Spacing

enum class CardPadding(val value: androidx.compose.ui.unit.Dp) {
    Small(16.dp),
    Medium(24.dp),
    Large(32.dp)
}

@Composable
fun TimelessCard(
    modifier: Modifier = Modifier,
    title: String? = null,
    padding: CardPadding = CardPadding.Medium,
    content: @Composable ColumnScope.() -> Unit
) {
    Card(
        modifier = modifier
            .fillMaxWidth()
            .shadow(10.dp, RoundedCornerShape(24.dp)),
        shape = RoundedCornerShape(24.dp),
        colors = CardDefaults.cardColors(
            containerColor = Color.White
        )
    ) {
        Column(
            modifier = Modifier.padding(padding.value)
        ) {
            title?.let {
                Text(
                    text = it,
                    style = MaterialTheme.typography.headlineSmall,
                    modifier = Modifier.padding(bottom = Spacing.md)
                )
            }
            
            content()
        }
    }
}
```

**Usage**:
```kotlin
TimelessCard(
    title = "統計資料",
    padding = CardPadding.Large
) {
    Text(
        text = "內容區域",
        color = TimelessColors.Neutral600
    )
}
```

---

## 📊 Data Models

### User Model

#### iOS (Swift)

**File**: `Models/User.swift`

```swift
import Foundation

struct User: Codable, Identifiable {
    let id: UUID
    var name: String
    var email: String
    var age: Int?
    var weight: Double?
    var healthGoals: [String]  // HealthGoal IDs
    var dailyStepsGoal: Int?
    var biometricEnabled: Bool
    var biometricType: BiometricType?
    var language: Language
    let createdAt: Date
    var updatedAt: Date
    
    init(
        id: UUID = UUID(),
        name: String,
        email: String,
        age: Int? = nil,
        weight: Double? = nil,
        healthGoals: [String] = [],
        dailyStepsGoal: Int? = nil,
        biometricEnabled: Bool = false,
        biometricType: BiometricType? = nil,
        language: Language = .zhTW,
        createdAt: Date = Date(),
        updatedAt: Date = Date()
    ) {
        self.id = id
        self.name = name
        self.email = email
        self.age = age
        self.weight = weight
        self.healthGoals = healthGoals
        self.dailyStepsGoal = dailyStepsGoal
        self.biometricEnabled = biometricEnabled
        self.biometricType = biometricType
        self.language = language
        self.createdAt = createdAt
        self.updatedAt = updatedAt
    }
}

enum BiometricType: String, Codable {
    case faceID = "face_id"
    case touchID = "touch_id"
}
```

---

#### Android (Kotlin)

**File**: `data/model/User.kt`

```kotlin
package com.timeless.app.data.model

import java.util.Date
import java.util.UUID

data class User(
    val id: String = UUID.randomUUID().toString(),
    val name: String,
    val email: String,
    val age: Int? = null,
    val weight: Double? = null,
    val healthGoals: List<String> = emptyList(),  // HealthGoal IDs
    val dailyStepsGoal: Int? = null,
    val biometricEnabled: Boolean = false,
    val biometricType: BiometricType? = null,
    val language: Language = Language.ZH_TW,
    val createdAt: Date = Date(),
    val updatedAt: Date = Date()
)

enum class BiometricType {
    FINGERPRINT,
    FACE
}
```

---

### Health Goal Model

#### iOS (Swift)

**File**: `Models/HealthGoal.swift`

```swift
import Foundation

struct HealthGoal: Identifiable, Codable {
    let id: String
    let icon: String  // Emoji
    let labels: [Language: String]
    
    var label: String {
        labels[AppState.shared.currentLanguage] ?? labels[.en] ?? ""
    }
}

// Sample data (simulating CMS)
extension HealthGoal {
    static let allGoals: [HealthGoal] = [
        HealthGoal(
            id: "lose-weight",
            icon: "🏃",
            labels: [
                .zhTW: "減重",
                .zhCN: "减重",
                .en: "Lose Weight",
                .ja: "減量",
                .ko: "체중 감량"
            ]
        ),
        HealthGoal(
            id: "gain-muscle",
            icon: "💪",
            labels: [
                .zhTW: "增肌",
                .zhCN: "增肌",
                .en: "Gain Muscle",
                .ja: "筋肉増強",
                .ko: "근육 증가"
            ]
        ),
        // ... 22 more goals (total 24)
    ]
}
```

---

#### Android (Kotlin)

**File**: `data/model/HealthGoal.kt`

```kotlin
package com.timeless.app.data.model

data class HealthGoal(
    val id: String,
    val icon: String,  // Emoji
    val labels: Map<Language, String>
) {
    fun getLabel(language: Language): String {
        return labels[language] ?: labels[Language.EN] ?: ""
    }
}

// Sample data repository
object HealthGoalsRepository {
    val allGoals = listOf(
        HealthGoal(
            id = "lose-weight",
            icon = "🏃",
            labels = mapOf(
                Language.ZH_TW to "減重",
                Language.ZH_CN to "减重",
                Language.EN to "Lose Weight",
                Language.JA to "減量",
                Language.KO to "체중 감량"
            )
        ),
        HealthGoal(
            id = "gain-muscle",
            icon = "💪",
            labels = mapOf(
                Language.ZH_TW to "增肌",
                Language.ZH_CN to "增肌",
                Language.EN to "Gain Muscle",
                Language.JA to "筋肉増強",
                Language.KO to "근육 증가"
            )
        ),
        // ... 22 more goals (total 24)
    )
}
```

---

### Language Enum

#### iOS (Swift)

**File**: `Models/Language.swift`

```swift
import Foundation

enum Language: String, Codable, CaseIterable {
    case zhTW = "zh-Hant"  // 繁體中文
    case zhCN = "zh-Hans"  // 简体中文
    case en = "en"         // English
    case ja = "ja"         // 日本語
    case ko = "ko"         // 한국어
    
    var displayName: String {
        switch self {
        case .zhTW: return "繁體中文"
        case .zhCN: return "简体中文"
        case .en: return "English"
        case .ja: return "日本語"
        case .ko: return "한국어"
        }
    }
    
    var flag: String {
        switch self {
        case .zhTW: return "🇹🇼"
        case .zhCN: return "🇨🇳"
        case .en: return "🇺🇸"
        case .ja: return "🇯🇵"
        case .ko: return "🇰🇷"
        }
    }
}
```

---

#### Android (Kotlin)

**File**: `data/model/Language.kt`

```kotlin
package com.timeless.app.data.model

enum class Language(val code: String, val displayName: String, val flag: String) {
    ZH_TW("zh-TW", "繁體中文", "🇹🇼"),
    ZH_CN("zh-CN", "简体中文", "🇨🇳"),
    EN("en", "English", "🇺🇸"),
    JA("ja", "日本語", "🇯🇵"),
    KO("ko", "한국어", "🇰🇷");
    
    companion object {
        fun fromCode(code: String): Language {
            return values().find { it.code == code } ?: EN
        }
    }
}
```

---

## 🌐 Localization (i18n)

### iOS (SwiftUI)

**Structure**:
```
Resources/
├── en.lproj/
│   └── Localizable.strings
├── zh-Hant.lproj/
│   └── Localizable.strings
├── zh-Hans.lproj/
│   └── Localizable.strings
├── ja.lproj/
│   └── Localizable.strings
└── ko.lproj/
    └── Localizable.strings
```

**File**: `Resources/en.lproj/Localizable.strings`

```swift
/* Login Screen */
"app_name" = "Timeless";
"tagline" = "Strive on your timeless journey";
"continue_with_apple" = "Continue with Apple";
"continue_with_google" = "Continue with Google";
"continue_with_email" = "Continue with Email";
"logging_in" = "Logging in...";
"or" = "or";

/* Welcome Screen */
"welcome_title" = "Welcome, %@";  // %@ = name
"login_success" = "Login successful!";
"welcome_message" = "Welcome to Timeless";
"continue" = "Continue";

/* Biometric Screen */
"enable_face_id" = "Enable Face ID";
"enable_touch_id" = "Enable Touch ID";
"biometric_description" = "Use %@ for quick and secure login";  // %@ = type
"face_id" = "Face ID";
"touch_id" = "Touch ID";
"quick_login" = "Quick Login";
"quick_login_desc" = "Verify in one second";
"high_security" = "Higher Security";
"high_security_desc" = "Only you can access data";
"flexible_control" = "Can be disabled anytime";
"flexible_control_desc" = "Adjust in settings";
"security_note" = "🔒 %@ data is stored on your device, Timeless cannot access it";
"enable_biometric" = "Enable %@";
"skip_for_now" = "Skip for now";
"setup_later" = "Set up later";

/* Profile Setup Screen */
"setup_profile" = "Set up profile";
"setup_profile_desc" = "Help us create your personalized health plan";
"age" = "Age";
"age_example" = "e.g., 25";
"weight" = "Weight (kg)";
"weight_example" = "e.g., 70";
"health_goal" = "Health Goal";
"healthy_choice" = "Healthy Choice";
"choose_goal" = "Choose your goals";
"lose_weight" = "Lose Weight";
"gain_muscle" = "Gain Muscle";
"stay_healthy" = "Stay Healthy";
"improve_performance" = "Improve Performance";
"better_sleep" = "Better Sleep";
"reduce_stress" = "Reduce Stress";
"daily_steps" = "Daily Steps Goal";
"steps_example" = "e.g., 10000";
"complete_setup" = "Complete Setup";

/* Complete Screen */
"all_set" = "All Set!";
"all_set_message" = "%@, ready to start your health journey?";
"biometric_enabled" = "%@ enabled";
"start_using" = "Start Using Timeless";
"start" = "Start";

/* Common */
"hi" = "Hi";
"ready" = "Ready?";
```

**File**: `Resources/zh-Hant.lproj/Localizable.strings` (繁中)

```swift
/* 登入頁面 */
"app_name" = "Timeless";
"tagline" = "在你的永恆旅程中努力";
"continue_with_apple" = "繼續使用 Apple";
"continue_with_google" = "使用 Google 帳戶登入";
"continue_with_email" = "使用電子郵件登入";
"logging_in" = "登入中...";
"or" = "或";

/* 歡迎頁面 */
"welcome_title" = "歡迎，%@";
"login_success" = "登入成功！";
"welcome_message" = "歡迎來到 Timeless";
"continue" = "繼續";

/* 生物辨識頁面 */
"enable_face_id" = "啟用 Face ID";
"enable_touch_id" = "啟用 Touch ID";
"biometric_description" = "使用 %@ 快速安全地登入";
"face_id" = "Face ID";
"touch_id" = "Touch ID";
"quick_login" = "快速登入";
"quick_login_desc" = "一秒完成驗證";
"high_security" = "更高安全性";
"high_security_desc" = "只有你能存取資料";
"flexible_control" = "隨時可關閉";
"flexible_control_desc" = "在設定中調整";
"security_note" = "🔒 %@ 資料儲存在您的裝置上，Timeless 無法存取";
"enable_biometric" = "啟用 %@";
"skip_for_now" = "暫時跳過";
"setup_later" = "稍後設定";

/* 個人資料頁面 */
"setup_profile" = "設定個人資料";
"setup_profile_desc" = "幫助我們為你量身打造健康計畫";
"age" = "年齡";
"age_example" = "例如：25";
"weight" = "體重（公斤）";
"weight_example" = "例如：70";
"health_goal" = "健康目標";
"healthy_choice" = "健康選擇";
"choose_goal" = "選擇你的目標";
"lose_weight" = "減重";
"gain_muscle" = "增肌";
"stay_healthy" = "維持健康";
"improve_performance" = "提升體能";
"better_sleep" = "改善睡眠";
"reduce_stress" = "減少壓力";
"daily_steps" = "每日步數目標";
"steps_example" = "例如：10000";
"complete_setup" = "完成設定";

/* 完成頁面 */
"all_set" = "一切就緒！";
"all_set_message" = "%@，準備好開始你的健康之旅了嗎？";
"biometric_enabled" = "%@ 已啟用";
"start_using" = "開始使用 Timeless";
"start" = "開始";

/* 通用 */
"hi" = "嗨";
"ready" = "準備好了嗎？";
```

**Helper File**: `Utilities/Localization.swift`

```swift
import SwiftUI

func NSLocalizedString(_ key: String, _ args: CVarArg...) -> String {
    let format = NSLocalizedString(key, comment: "")
    return String(format: format, arguments: args)
}

// Usage example:
// Text(NSLocalizedString("welcome_title", userName))
// Text(NSLocalizedString("biometric_description", "Face ID"))
```

---

### Android (Kotlin + Compose)

**Structure**:
```
res/
├── values/                  # English (default)
│   └── strings.xml
├── values-zh-rTW/          # 繁體中文
│   └── strings.xml
├── values-zh-rCN/          # 简体中文
│   └── strings.xml
├── values-ja/              # 日本語
│   └── strings.xml
└── values-ko/              # 한국어
    └── strings.xml
```

**File**: `res/values/strings.xml` (English)

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <!-- App Info -->
    <string name="app_name">Timeless</string>
    <string name="tagline">Strive on your timeless journey</string>
    
    <!-- Login Screen -->
    <string name="continue_with_apple">Continue with Apple</string>
    <string name="continue_with_google">Continue with Google</string>
    <string name="continue_with_email">Continue with Email</string>
    <string name="logging_in">Logging in…</string>
    <string name="or">or</string>
    
    <!-- Welcome Screen -->
    <string name="welcome_title">Welcome, %1$s</string>
    <string name="login_success">Login successful!</string>
    <string name="welcome_message">Welcome to Timeless</string>
    <string name="continue_button">Continue</string>
    
    <!-- Biometric Screen -->
    <string name="enable_fingerprint">Enable Fingerprint</string>
    <string name="biometric_description">Use %1$s for quick and secure login</string>
    <string name="fingerprint">Fingerprint</string>
    <string name="quick_login">Quick Login</string>
    <string name="quick_login_desc">Verify in one second</string>
    <string name="high_security">Higher Security</string>
    <string name="high_security_desc">Only you can access data</string>
    <string name="flexible_control">Can be disabled anytime</string>
    <string name="flexible_control_desc">Adjust in settings</string>
    <string name="security_note">🔒 %1$s data is stored on your device, Timeless cannot access it</string>
    <string name="enable_biometric">Enable %1$s</string>
    <string name="skip_for_now">Skip for now</string>
    
    <!-- Profile Setup Screen -->
    <string name="setup_profile">Set up profile</string>
    <string name="setup_profile_desc">Help us create your personalized health plan</string>
    <string name="age">Age</string>
    <string name="age_example">e.g., 25</string>
    <string name="weight">Weight (kg)</string>
    <string name="weight_example">e.g., 70</string>
    <string name="health_goal">Health Goal</string>
    <string name="choose_goal">Choose your goals</string>
    <string name="lose_weight">Lose Weight</string>
    <string name="gain_muscle">Gain Muscle</string>
    <string name="stay_healthy">Stay Healthy</string>
    <string name="improve_performance">Improve Performance</string>
    <string name="better_sleep">Better Sleep</string>
    <string name="reduce_stress">Reduce Stress</string>
    <string name="daily_steps">Daily Steps Goal</string>
    <string name="steps_example">e.g., 10000</string>
    <string name="complete_setup">Complete Setup</string>
    
    <!-- Complete Screen -->
    <string name="all_set">All Set!</string>
    <string name="all_set_message">%1$s, ready to start your health journey?</string>
    <string name="biometric_enabled">%1$s enabled</string>
    <string name="start_using">Start Using Timeless</string>
    <string name="start_button">Start</string>
    
    <!-- Common -->
    <string name="hi">Hi</string>
    <string name="ready">Ready?</string>
</resources>
```

**File**: `res/values-zh-rTW/strings.xml` (繁體中文)

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <!-- App 資訊 -->
    <string name="app_name">Timeless</string>
    <string name="tagline">在你的永恆旅程中努力</string>
    
    <!-- 登入頁面 -->
    <string name="continue_with_apple">繼續使用 Apple</string>
    <string name="continue_with_google">使用 Google 帳戶登入</string>
    <string name="continue_with_email">使用電子郵件登入</string>
    <string name="logging_in">登入中…</string>
    <string name="or">或</string>
    
    <!-- 歡迎頁面 -->
    <string name="welcome_title">歡迎，%1$s</string>
    <string name="login_success">登入成功！</string>
    <string name="welcome_message">歡迎來到 Timeless</string>
    <string name="continue_button">繼續</string>
    
    <!-- 生物辨識頁面 -->
    <string name="enable_fingerprint">啟用指紋辨識</string>
    <string name="biometric_description">使用 %1$s 快速安全地登入</string>
    <string name="fingerprint">指紋辨識</string>
    <string name="quick_login">快速登入</string>
    <string name="quick_login_desc">一秒完成驗證</string>
    <string name="high_security">更高安全性</string>
    <string name="high_security_desc">只有你能存取資料</string>
    <string name="flexible_control">隨時可關閉</string>
    <string name="flexible_control_desc">在設定中調整</string>
    <string name="security_note">🔒 %1$s 資料儲存在您的裝置上，Timeless 無法存取</string>
    <string name="enable_biometric">啟用 %1$s</string>
    <string name="skip_for_now">暫時跳過</string>
    
    <!-- 個人資料頁面 -->
    <string name="setup_profile">設定個人資料</string>
    <string name="setup_profile_desc">幫助我們為你量身打造健康計畫</string>
    <string name="age">年齡</string>
    <string name="age_example">例如：25</string>
    <string name="weight">體重（公斤）</string>
    <string name="weight_example">例如：70</string>
    <string name="health_goal">健康目標</string>
    <string name="choose_goal">選擇你的目標</string>
    <string name="lose_weight">減重</string>
    <string name="gain_muscle">增肌</string>
    <string name="stay_healthy">維持健康</string>
    <string name="improve_performance">提升體能</string>
    <string name="better_sleep">改善睡眠</string>
    <string name="reduce_stress">減少壓力</string>
    <string name="daily_steps">每日步數目標</string>
    <string name="steps_example">例如：10000</string>
    <string name="complete_setup">完成設定</string>
    
    <!-- 完成頁面 -->
    <string name="all_set">一切就緒！</string>
    <string name="all_set_message">%1$s，準備好開始你的健康之旅了嗎？</string>
    <string name="biometric_enabled">%1$s 已啟用</string>
    <string name="start_using">開始使用 Timeless</string>
    <string name="start_button">開始</string>
    
    <!-- 通用 -->
    <string name="hi">嗨</string>
    <string name="ready">準備好了嗎？</string>
</resources>
```

**Usage in Compose**:
```kotlin
import androidx.compose.runtime.Composable
import androidx.compose.ui.res.stringResource

@Composable
fun LoginScreen() {
    Text(text = stringResource(R.string.tagline))
    
    // With placeholder
    Text(text = stringResource(R.string.welcome_title, "John"))
}
```

---

## 📱 Screen Specifications

### Login Flow (5 Steps)

#### Step 1: Login Screen

**iOS (SwiftUI)**:

```swift
// Views/Login/LoginView.swift
import SwiftUI

struct LoginView: View {
    @EnvironmentObject var viewModel: LoginViewModel
    
    var body: some View {
        ZStack {
            // Background gradient
            TimelessGradients.background
                .ignoresSafeArea()
            
            VStack(spacing: Spacing.xl) {
                Spacer()
                
                // App Logo & Title
                VStack(spacing: Spacing.md) {
                    // App icon would go here
                    Text("Timeless")
                        .font(.display)
                        .foregroundColor(.primary500)
                    
                    Text(NSLocalizedString("tagline"))
                        .font(.bodyLarge)
                        .foregroundColor(.neutral600)
                        .multilineTextAlignment(.center)
                }
                
                Spacer()
                
                // Login Buttons
                VStack(spacing: Spacing.md) {
                    // Apple Sign In
                    PrimaryButton(
                        NSLocalizedString("continue_with_apple"),
                        variant: .primary,
                        size: .large
                    ) {
                        viewModel.loginWithApple()
                    }
                    
                    // Google Sign In
                    PrimaryButton(
                        NSLocalizedString("continue_with_google"),
                        variant: .secondary,
                        size: .large
                    ) {
                        viewModel.loginWithGoogle()
                    }
                    
                    // Email
                    PrimaryButton(
                        NSLocalizedString("continue_with_email"),
                        variant: .outline,
                        size: .large
                    ) {
                        viewModel.loginWithEmail()
                    }
                }
                .padding(.horizontal, Spacing.lg)
                
                Spacer()
            }
        }
    }
}
```

**Android (Compose)**:

```kotlin
// ui/login/LoginScreen.kt
package com.timeless.app.ui.login

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import com.timeless.app.R
import com.timeless.app.designsystem.components.*
import com.timeless.app.designsystem.tokens.*

@Composable
fun LoginScreen(
    viewModel: LoginViewModel,
    onNavigateToWelcome: () -> Unit
) {
    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(brush = TimelessGradients.Background)
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(horizontal = Spacing.lg),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.SpaceBetween
        ) {
            Spacer(modifier = Modifier.height(Spacing.xxxl))
            
            // App Logo & Title
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(Spacing.md)
            ) {
                // App icon would go here
                
                Text(
                    text = stringResource(R.string.app_name),
                    style = MaterialTheme.typography.displayLarge,
                    color = TimelessColors.Primary500
                )
                
                Text(
                    text = stringResource(R.string.tagline),
                    style = MaterialTheme.typography.bodyLarge,
                    color = TimelessColors.Neutral600,
                    textAlign = TextAlign.Center
                )
            }
            
            Spacer(modifier = Modifier.weight(1f))
            
            // Login Buttons
            Column(
                verticalArrangement = Arrangement.spacedBy(Spacing.md)
            ) {
                PrimaryButton(
                    text = stringResource(R.string.continue_with_google),
                    onClick = { viewModel.loginWithGoogle() },
                    variant = ButtonVariant.Primary,
                    size = ButtonSize.Large
                )
                
                PrimaryButton(
                    text = stringResource(R.string.continue_with_email),
                    onClick = { viewModel.loginWithEmail() },
                    variant = ButtonVariant.Outline,
                    size = ButtonSize.Large
                )
            }
            
            Spacer(modifier = Modifier.height(Spacing.xxxl))
        }
    }
}
```

---

## 🧭 Navigation

### iOS (SwiftUI)

**File**: `App/TimelessApp.swift`

```swift
import SwiftUI

@main
struct TimelessApp: App {
    @StateObject private var loginViewModel = LoginViewModel()
    
    var body: some Scene {
        WindowGroup {
            NavigationStack {
                LoginFlowCoordinator()
                    .environmentObject(loginViewModel)
            }
        }
    }
}

// Flow Coordinator
struct LoginFlowCoordinator: View {
    @EnvironmentObject var viewModel: LoginViewModel
    
    var body: some View {
        switch viewModel.currentStep {
        case .login:
            LoginView()
        case .welcome:
            WelcomeView()
        case .biometric:
            BiometricView()
        case .profile:
            ProfileSetupView()
        case .complete:
            CompleteView()
        }
    }
}
```

**ViewModel**:

```swift
// ViewModels/LoginViewModel.swift
import SwiftUI
import Combine

enum LoginStep {
    case login, welcome, biometric, profile, complete
}

class LoginViewModel: ObservableObject {
    @Published var currentStep: LoginStep = .login
    @Published var userName: String = ""
    @Published var selectedGoals: [String] = []
    @Published var biometricEnabled: Bool = false
    
    func loginWithApple() {
        // Handle Apple login
        userName = "John"
        currentStep = .welcome
    }
    
    func loginWithGoogle() {
        // Handle Google login
        userName = "Mary"
        currentStep = .welcome
    }
    
    func nextStep() {
        switch currentStep {
        case .login:
            currentStep = .welcome
        case .welcome:
            currentStep = .biometric
        case .biometric:
            currentStep = .profile
        case .profile:
            currentStep = .complete
        case .complete:
            // Navigate to main app
            break
        }
    }
    
    func skipBiometric() {
        currentStep = .profile
    }
}
```

---

### Android (Compose)

**File**: `navigation/NavGraph.kt`

```kotlin
package com.timeless.app.navigation

import androidx.compose.runtime.*
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.timeless.app.ui.login.*

sealed class Screen(val route: String) {
    object Login : Screen("login")
    object Welcome : Screen("welcome")
    object Biometric : Screen("biometric")
    object Profile : Screen("profile")
    object Complete : Screen("complete")
}

@Composable
fun AppNavigation(
    navController: NavHostController = rememberNavController(),
    viewModel: LoginViewModel
) {
    NavHost(
        navController = navController,
        startDestination = Screen.Login.route
    ) {
        composable(Screen.Login.route) {
            LoginScreen(
                viewModel = viewModel,
                onNavigateToWelcome = {
                    navController.navigate(Screen.Welcome.route)
                }
            )
        }
        
        composable(Screen.Welcome.route) {
            WelcomeScreen(
                viewModel = viewModel,
                onNavigateToBiometric = {
                    navController.navigate(Screen.Biometric.route)
                }
            )
        }
        
        composable(Screen.Biometric.route) {
            BiometricScreen(
                viewModel = viewModel,
                onNavigateToProfile = {
                    navController.navigate(Screen.Profile.route)
                },
                onSkip = {
                    navController.navigate(Screen.Profile.route)
                }
            )
        }
        
        composable(Screen.Profile.route) {
            ProfileScreen(
                viewModel = viewModel,
                onNavigateToComplete = {
                    navController.navigate(Screen.Complete.route)
                }
            )
        }
        
        composable(Screen.Complete.route) {
            CompleteScreen(
                viewModel = viewModel,
                onStartApp = {
                    // Navigate to main app
                }
            )
        }
    }
}
```

**ViewModel**:

```kotlin
// viewmodel/LoginViewModel.kt
package com.timeless.app.viewmodel

import androidx.lifecycle.ViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

class LoginViewModel : ViewModel() {
    private val _userName = MutableStateFlow("")
    val userName: StateFlow<String> = _userName.asStateFlow()
    
    private val _selectedGoals = MutableStateFlow<List<String>>(emptyList())
    val selectedGoals: StateFlow<List<String>> = _selectedGoals.asStateFlow()
    
    private val _biometricEnabled = MutableStateFlow(false)
    val biometricEnabled: StateFlow<Boolean> = _biometricEnabled.asStateFlow()
    
    fun loginWithGoogle() {
        _userName.value = "Mary"
        // Navigate to welcome (handled by composable)
    }
    
    fun loginWithEmail() {
        _userName.value = "John"
        // Navigate to welcome
    }
    
    fun toggleGoal(goalId: String) {
        _selectedGoals.value = if (_selectedGoals.value.contains(goalId)) {
            _selectedGoals.value - goalId
        } else {
            _selectedGoals.value + goalId
        }
    }
    
    fun enableBiometric() {
        _biometricEnabled.value = true
    }
}
```

---

## 📝 Complete Code Examples

### Example 1: Biometric Authentication

#### iOS (Face ID)

```swift
// Utilities/BiometricAuth.swift
import LocalAuthentication

class BiometricAuth: ObservableObject {
    @Published var biometricType: BiometricType?
    @Published var isAvailable: Bool = false
    
    init() {
        checkBiometricAvailability()
    }
    
    func checkBiometricAvailability() {
        let context = LAContext()
        var error: NSError?
        
        if context.canEvaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, error: &error) {
            isAvailable = true
            
            switch context.biometryType {
            case .faceID:
                biometricType = .faceID
            case .touchID:
                biometricType = .touchID
            default:
                biometricType = nil
            }
        } else {
            isAvailable = false
            biometricType = nil
        }
    }
    
    func authenticate(completion: @escaping (Bool, Error?) -> Void) {
        let context = LAContext()
        let reason = NSLocalizedString("biometric_auth_reason", comment: "")
        
        context.evaluatePolicy(
            .deviceOwnerAuthenticationWithBiometrics,
            localizedReason: reason
        ) { success, error in
            DispatchQueue.main.async {
                completion(success, error)
            }
        }
    }
}
```

**Usage**:
```swift
struct BiometricView: View {
    @StateObject private var biometricAuth = BiometricAuth()
    
    var body: some View {
        VStack {
            if biometricAuth.isAvailable {
                PrimaryButton("Enable \(biometricAuth.biometricType == .faceID ? "Face ID" : "Touch ID")") {
                    biometricAuth.authenticate { success, error in
                        if success {
                            // Biometric enabled
                        }
                    }
                }
            }
        }
    }
}
```

---

#### Android (Fingerprint)

```kotlin
// ui/biometric/BiometricHelper.kt
package com.timeless.app.ui.biometric

import androidx.biometric.BiometricManager
import androidx.biometric.BiometricPrompt
import androidx.core.content.ContextCompat
import androidx.fragment.app.FragmentActivity

class BiometricHelper(private val activity: FragmentActivity) {
    
    fun isBiometricAvailable(): Boolean {
        val biometricManager = BiometricManager.from(activity)
        return biometricManager.canAuthenticate(
            BiometricManager.Authenticators.BIOMETRIC_STRONG
        ) == BiometricManager.BIOMETRIC_SUCCESS
    }
    
    fun authenticate(
        onSuccess: () -> Unit,
        onError: (String) -> Unit
    ) {
        val executor = ContextCompat.getMainExecutor(activity)
        
        val biometricPrompt = BiometricPrompt(
            activity,
            executor,
            object : BiometricPrompt.AuthenticationCallback() {
                override fun onAuthenticationSucceeded(
                    result: BiometricPrompt.AuthenticationResult
                ) {
                    super.onAuthenticationSucceeded(result)
                    onSuccess()
                }
                
                override fun onAuthenticationError(
                    errorCode: Int,
                    errString: CharSequence
                ) {
                    super.onAuthenticationError(errorCode, errString)
                    onError(errString.toString())
                }
                
                override fun onAuthenticationFailed() {
                    super.onAuthenticationFailed()
                    onError("Authentication failed")
                }
            }
        )
        
        val promptInfo = BiometricPrompt.PromptInfo.Builder()
            .setTitle("Enable Fingerprint")
            .setSubtitle("Use fingerprint for quick login")
            .setNegativeButtonText("Cancel")
            .build()
        
        biometricPrompt.authenticate(promptInfo)
    }
}
```

**Usage in Compose**:
```kotlin
@Composable
fun BiometricScreen(
    viewModel: LoginViewModel,
    onNavigateToProfile: () -> Unit
) {
    val context = LocalContext.current
    val activity = context as FragmentActivity
    val biometricHelper = remember { BiometricHelper(activity) }
    
    Column {
        if (biometricHelper.isBiometricAvailable()) {
            PrimaryButton(
                text = "Enable Fingerprint",
                onClick = {
                    biometricHelper.authenticate(
                        onSuccess = {
                            viewModel.enableBiometric()
                            onNavigateToProfile()
                        },
                        onError = { error ->
                            // Show error
                        }
                    )
                }
            )
        }
    }
}
```

---

## 🚀 Build & Deployment

### iOS

#### Project Setup

1. **Create new Xcode project**:
   - iOS App
   - Interface: SwiftUI
   - Language: Swift
   - Minimum iOS: 15.0

2. **Configure Info.plist**:
```xml
<key>NSFaceIDUsageDescription</key>
<string>We use Face ID for secure and quick login</string>

<key>CFBundleLocalizations</key>
<array>
    <string>en</string>
    <string>zh-Hant</string>
    <string>zh-Hans</string>
    <string>ja</string>
    <string>ko</string>
</array>
```

3. **Build Settings**:
   - Bundle ID: `com.timeless.app`
   - Version: 1.0.0
   - Build: 1

#### Build & Run

```bash
# Build for Simulator
xcodebuild -scheme TimelessApp -destination 'platform=iOS Simulator,name=iPhone 15 Pro'

# Build for Device
xcodebuild -scheme TimelessApp -destination 'generic/platform=iOS'

# Archive for App Store
xcodebuild archive -scheme TimelessApp -archivePath ./build/Timeless.xcarchive
```

---

### Android

#### Project Setup

**File**: `app/build.gradle.kts`

```kotlin
plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "com.timeless.app"
    compileSdk = 34
    
    defaultConfig {
        applicationId = "com.timeless.app"
        minSdk = 26
        targetSdk = 34
        versionCode = 1
        versionName = "1.0.0"
        
        vectorDrawables {
            useSupportLibrary = true
        }
    }
    
    buildTypes {
        release {
            isMinifyEnabled = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    
    kotlinOptions {
        jvmTarget = "17"
    }
    
    buildFeatures {
        compose = true
    }
    
    composeOptions {
        kotlinCompilerExtensionVersion = "1.5.3"
    }
    
    packaging {
        resources {
            excludes += "/META-INF/{AL2.0,LGPL2.1}"
        }
    }
}

dependencies {
    implementation(platform("androidx.compose:compose-bom:2024.01.00"))
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.material3:material3")
    implementation("androidx.compose.ui:ui-tooling-preview")
    implementation("androidx.activity:activity-compose:1.8.2")
    implementation("androidx.navigation:navigation-compose:2.7.6")
    implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.7.0")
    implementation("androidx.biometric:biometric:1.2.0-alpha05")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.7.3")
    
    debugImplementation("androidx.compose.ui:ui-tooling")
}
```

**File**: `AndroidManifest.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    
    <!-- Biometric Permission -->
    <uses-permission android:name="android.permission.USE_BIOMETRIC" />
    
    <application
        android:name=".TimelessApp"
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.Timeless">
        
        <activity
            android:name=".ui.MainActivity"
            android:exported="true"
            android:theme="@style/Theme.Timeless">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
```

#### Build & Run

```bash
# Build Debug APK
./gradlew assembleDebug

# Build Release APK
./gradlew assembleRelease

# Install on device
./gradlew installDebug

# Run app
./gradlew run
```

---

## ✅ Development Checklist

### iOS (SwiftUI)
- [ ] Set up Xcode project with SwiftUI
- [ ] Create Design System (Colors, Gradients, Typography)
- [ ] Implement Localization (5 languages)
- [ ] Build UI Components (Button, Card, etc.)
- [ ] Create Login Flow (5 screens)
- [ ] Integrate Face ID / Touch ID
- [ ] Implement Navigation
- [ ] Add animations
- [ ] Test on iPhone simulator
- [ ] Test on real device
- [ ] Prepare App Store assets

### Android (Compose)
- [ ] Set up Android Studio project with Compose
- [ ] Create Design System (Colors, Gradients, Typography)
- [ ] Implement Localization (5 languages)
- [ ] Build UI Components (@Composable)
- [ ] Create Login Flow (5 screens)
- [ ] Integrate Fingerprint authentication
- [ ] Implement Navigation (NavHost)
- [ ] Add animations
- [ ] Test on Android emulator
- [ ] Test on real device
- [ ] Prepare Google Play assets

---

## 📚 Additional Resources

### iOS
- [SwiftUI Documentation](https://developer.apple.com/documentation/swiftui/)
- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [LocalAuthentication Framework](https://developer.apple.com/documentation/localauthentication)

### Android
- [Jetpack Compose Documentation](https://developer.android.com/jetpack/compose)
- [Material Design 3](https://m3.material.io/)
- [BiometricPrompt Guide](https://developer.android.com/training/sign-in/biometric-auth)

---

## 🔗 Related Files

| File | Description |
|------|-------------|
| `/DESIGN_SPEC.md` | Design specifications (colors, spacing, etc.) |
| `/TECHNICAL_SPEC.md` | React web app technical spec (for reference) |
| `/NATIVE_APP_SPEC.md` | This file - Native app spec |

---

**Made with 💜 for Timeless Native Apps**

> Complete specification for building native iOS (Swift + SwiftUI) and Android (Kotlin + Compose) apps. Ready for AI editor implementation.
