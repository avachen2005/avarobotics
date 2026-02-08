package com.avarobotics.ui.theme

import androidx.compose.material3.Typography
import androidx.compose.runtime.Immutable
import androidx.compose.runtime.staticCompositionLocalOf
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp

@Immutable
data class AppTypographyTokens(
    val display1: TextStyle = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.Bold,
        fontSize = 36.sp,
        lineHeight = (36 * 1.2).sp,
        letterSpacing = (-0.5).sp,
    ),
    val display2: TextStyle = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.Bold,
        fontSize = 30.sp,
        lineHeight = (30 * 1.2).sp,
        letterSpacing = (-0.5).sp,
    ),
    val heading1: TextStyle = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.SemiBold,
        fontSize = 24.sp,
        lineHeight = (24 * 1.2).sp,
        letterSpacing = 0.sp,
    ),
    val heading2: TextStyle = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.SemiBold,
        fontSize = 20.sp,
        lineHeight = (20 * 1.2).sp,
        letterSpacing = 0.sp,
    ),
    val heading3: TextStyle = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.SemiBold,
        fontSize = 18.sp,
        lineHeight = (18 * 1.2).sp,
        letterSpacing = 0.sp,
    ),
    val bodyLarge: TextStyle = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.Normal,
        fontSize = 18.sp,
        lineHeight = (18 * 1.5).sp,
        letterSpacing = 0.sp,
    ),
    val bodyRegular: TextStyle = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.Normal,
        fontSize = 16.sp,
        lineHeight = (16 * 1.5).sp,
        letterSpacing = 0.sp,
    ),
    val bodyMedium: TextStyle = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.Medium,
        fontSize = 16.sp,
        lineHeight = (16 * 1.5).sp,
        letterSpacing = 0.sp,
    ),
    val bodySemibold: TextStyle = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.SemiBold,
        fontSize = 16.sp,
        lineHeight = (16 * 1.5).sp,
        letterSpacing = 0.sp,
    ),
    val bodySmall: TextStyle = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.Normal,
        fontSize = 14.sp,
        lineHeight = (14 * 1.5).sp,
        letterSpacing = 0.sp,
    ),
    val bodySmallMedium: TextStyle = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.Medium,
        fontSize = 14.sp,
        lineHeight = (14 * 1.5).sp,
        letterSpacing = 0.sp,
    ),
    val caption: TextStyle = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.Normal,
        fontSize = 12.sp,
        lineHeight = (12 * 1.5).sp,
        letterSpacing = 0.sp,
    ),
    val captionMedium: TextStyle = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.Medium,
        fontSize = 12.sp,
        lineHeight = (12 * 1.5).sp,
        letterSpacing = 0.sp,
    ),
    val buttonLarge: TextStyle = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.SemiBold,
        fontSize = 18.sp,
        lineHeight = (18 * 1.2).sp,
        letterSpacing = 0.5.sp,
    ),
    val buttonMedium: TextStyle = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.Medium,
        fontSize = 16.sp,
        lineHeight = (16 * 1.2).sp,
        letterSpacing = 0.5.sp,
    ),
    val buttonSmall: TextStyle = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.Medium,
        fontSize = 14.sp,
        lineHeight = (14 * 1.2).sp,
        letterSpacing = 0.5.sp,
    ),
    val label: TextStyle = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.Medium,
        fontSize = 14.sp,
        lineHeight = (14 * 1.2).sp,
        letterSpacing = 0.5.sp,
    ),
    val input: TextStyle = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.Normal,
        fontSize = 16.sp,
        lineHeight = (16 * 1.5).sp,
        letterSpacing = 0.sp,
    ),
)

val DefaultAppTypography = AppTypographyTokens()

val LocalAppTypography = staticCompositionLocalOf { DefaultAppTypography }

val MaterialTypography = Typography(
    displayLarge = DefaultAppTypography.display1,
    displayMedium = DefaultAppTypography.display2,
    headlineLarge = DefaultAppTypography.heading1,
    headlineMedium = DefaultAppTypography.heading2,
    headlineSmall = DefaultAppTypography.heading3,
    titleLarge = DefaultAppTypography.heading3,
    titleMedium = DefaultAppTypography.bodySemibold,
    titleSmall = DefaultAppTypography.bodySmallMedium,
    bodyLarge = DefaultAppTypography.bodyRegular,
    bodyMedium = DefaultAppTypography.bodyMedium,
    bodySmall = DefaultAppTypography.bodySmall,
    labelLarge = DefaultAppTypography.buttonMedium,
    labelMedium = DefaultAppTypography.label,
    labelSmall = DefaultAppTypography.caption,
)
