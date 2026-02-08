package com.avarobotics.ui.theme

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

object AppComponentTokens {
    object Button {
        // Padding - Small
        val paddingSmallVertical: Dp = 8.dp
        val paddingSmallHorizontal: Dp = 16.dp

        // Padding - Medium
        val paddingMediumVertical: Dp = 16.dp
        val paddingMediumHorizontal: Dp = 24.dp

        // Padding - Large
        val paddingLargeVertical: Dp = 12.dp
        val paddingLargeHorizontal: Dp = 32.dp

        // Shape
        val radiusFull: Dp = 999.dp

        // Outline variant
        val outlineBorderWidth: Dp = 2.dp
        val outlineBorderColor: Color = AppColors.Primary500

        // Shadow
        val shadow: ShadowToken = AppElevation.md
    }

    object Card {
        val paddingSmall: Dp = 16.dp
        val paddingMedium: Dp = 24.dp
        val paddingLarge: Dp = 32.dp
        val radius: Dp = 24.dp
        val background: Color = AppColors.White
        val shadow: ShadowToken = AppElevation.lg
    }

    object Input {
        val paddingVertical: Dp = 12.dp
        val paddingHorizontal: Dp = 16.dp
        val radius: Dp = 12.dp
        val borderWidth: Dp = 2.dp
        val borderDefault: Color = AppColors.Neutral200
        val borderFocus: Color = AppColors.Primary500
        val borderError: Color = AppColors.Error
    }
}
