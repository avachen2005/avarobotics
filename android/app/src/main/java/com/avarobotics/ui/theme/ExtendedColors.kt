package com.avarobotics.ui.theme

import androidx.compose.runtime.Immutable
import androidx.compose.runtime.staticCompositionLocalOf
import androidx.compose.ui.graphics.Color

@Immutable
data class ExtendedColors(
    val background: Color,
    val onBackground: Color,
    val surface: Color,
    val onSurface: Color,
    val surfaceVariant: Color,
    val onSurfaceVariant: Color,
    val primary: Color,
    val onPrimary: Color,
    val primaryContainer: Color,
    val onPrimaryContainer: Color,
    val secondary: Color,
    val onSecondary: Color,
    val accent: Color,
    val onAccent: Color,
    val outline: Color,
    val outlineVariant: Color,
    val error: Color,
    val onError: Color,
)

val LightExtendedColors = ExtendedColors(
    background = AppColors.Neutral50,
    onBackground = AppColors.Neutral900,
    surface = AppColors.White,
    onSurface = AppColors.Neutral900,
    surfaceVariant = AppColors.Neutral100,
    onSurfaceVariant = AppColors.Neutral600,
    primary = AppColors.Primary500,
    onPrimary = AppColors.White,
    primaryContainer = AppColors.Primary50,
    onPrimaryContainer = AppColors.Primary900,
    secondary = AppColors.Secondary400,
    onSecondary = AppColors.White,
    accent = AppColors.Accent400,
    onAccent = AppColors.White,
    outline = AppColors.Neutral200,
    outlineVariant = AppColors.Neutral300,
    error = AppColors.Error,
    onError = AppColors.White,
)

val LocalExtendedColors = staticCompositionLocalOf { LightExtendedColors }
