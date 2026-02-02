package com.timeless.app.designsystem.tokens

import androidx.compose.ui.graphics.Brush

/**
 * Timeless Design System Gradients
 */

// Primary gradient - 科技紫漸層
val PrimaryGradient = Brush.linearGradient(
    colors = listOf(Primary500, Accent400)
)

// Neon glow gradient
val NeonGlowGradient = Brush.horizontalGradient(
    colors = listOf(Primary400, Accent400, Secondary400)
)

// Card background gradient
val CardBackgroundGradient = Brush.verticalGradient(
    colors = listOf(BackgroundCard, BackgroundElevated)
)

// Button gradient
val ButtonGradient = Brush.verticalGradient(
    colors = listOf(Primary500, Primary600)
)
