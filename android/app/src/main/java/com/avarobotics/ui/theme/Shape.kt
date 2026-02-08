package com.avarobotics.ui.theme

import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Shapes
import androidx.compose.runtime.Immutable
import androidx.compose.runtime.staticCompositionLocalOf
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

@Immutable
data class AppShapeTokens(
    val none: Dp = 0.dp,
    val small: Dp = 6.dp,
    val medium: Dp = 8.dp,
    val large: Dp = 12.dp,
    val extraLarge: Dp = 16.dp,
    val xxl: Dp = 24.dp,
    val xxxl: Dp = 28.dp,
    val full: Dp = 999.dp,
)

val LocalAppShapes = staticCompositionLocalOf { AppShapeTokens() }

val MaterialShapes = Shapes(
    extraSmall = RoundedCornerShape(6.dp),
    small = RoundedCornerShape(8.dp),
    medium = RoundedCornerShape(12.dp),
    large = RoundedCornerShape(16.dp),
    extraLarge = RoundedCornerShape(24.dp),
)
