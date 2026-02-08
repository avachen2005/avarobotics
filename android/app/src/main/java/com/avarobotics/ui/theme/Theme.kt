package com.avarobotics.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.ReadOnlyComposable

@Composable
fun AppTheme(
    content: @Composable () -> Unit,
) {
    val colorScheme = lightColorScheme(
        primary = AppColors.Primary500,
        onPrimary = AppColors.White,
        primaryContainer = AppColors.Primary50,
        onPrimaryContainer = AppColors.Primary900,
        secondary = AppColors.Secondary400,
        onSecondary = AppColors.White,
        error = AppColors.Error,
        onError = AppColors.White,
        background = AppColors.Neutral50,
        onBackground = AppColors.Neutral900,
        surface = AppColors.White,
        onSurface = AppColors.Neutral900,
        surfaceVariant = AppColors.Neutral100,
        onSurfaceVariant = AppColors.Neutral600,
        outline = AppColors.Neutral200,
        outlineVariant = AppColors.Neutral300,
    )

    val extendedColors = LightExtendedColors
    val spacing = SpacingTokens()
    val shapes = AppShapeTokens()
    val typography = DefaultAppTypography

    CompositionLocalProvider(
        LocalExtendedColors provides extendedColors,
        LocalSpacing provides spacing,
        LocalAppShapes provides shapes,
        LocalAppTypography provides typography,
    ) {
        MaterialTheme(
            colorScheme = colorScheme,
            shapes = MaterialShapes,
            typography = MaterialTypography,
            content = content,
        )
    }
}

object AppTheme {
    val colors: ExtendedColors
        @Composable
        @ReadOnlyComposable
        get() = LocalExtendedColors.current

    val typography: AppTypographyTokens
        @Composable
        @ReadOnlyComposable
        get() = LocalAppTypography.current

    val spacing: SpacingTokens
        @Composable
        @ReadOnlyComposable
        get() = LocalSpacing.current

    val shapes: AppShapeTokens
        @Composable
        @ReadOnlyComposable
        get() = LocalAppShapes.current
}
