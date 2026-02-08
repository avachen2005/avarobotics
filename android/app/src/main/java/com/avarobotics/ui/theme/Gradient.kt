package com.avarobotics.ui.theme

import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush

object AppGradients {
    val primary: Brush = Brush.linearGradient(
        colorStops = arrayOf(
            0.0f to AppColors.Primary500,
            0.5f to AppColors.Primary700,
            1.0f to AppColors.Primary800,
        ),
        start = Offset.Zero,
        end = Offset(Float.POSITIVE_INFINITY, Float.POSITIVE_INFINITY),
    )

    val accent: Brush = Brush.linearGradient(
        colorStops = arrayOf(
            0.0f to AppColors.Accent400,
            0.5f to AppColors.Accent500,
            1.0f to AppColors.Accent600,
        ),
        start = Offset.Zero,
        end = Offset(Float.POSITIVE_INFINITY, Float.POSITIVE_INFINITY),
    )

    val secondary: Brush = Brush.linearGradient(
        colorStops = arrayOf(
            0.0f to AppColors.Secondary400,
            0.5f to AppColors.Secondary500,
            1.0f to AppColors.Secondary600,
        ),
        start = Offset.Zero,
        end = Offset(Float.POSITIVE_INFINITY, Float.POSITIVE_INFINITY),
    )

    val neon: Brush = Brush.linearGradient(
        colorStops = arrayOf(
            0.0f to AppColors.Primary500,
            0.5f to AppColors.Accent500,
            1.0f to AppColors.Secondary400,
        ),
        start = Offset.Zero,
        end = Offset(Float.POSITIVE_INFINITY, Float.POSITIVE_INFINITY),
    )
}
