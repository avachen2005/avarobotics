package com.timeless.app.designsystem.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable
import com.timeless.app.designsystem.tokens.*

private val DarkColorScheme = darkColorScheme(
    primary = Primary500,
    onPrimary = TextPrimary,
    primaryContainer = Primary700,
    onPrimaryContainer = Primary100,

    secondary = Secondary400,
    onSecondary = TextPrimary,
    secondaryContainer = Secondary600,
    onSecondaryContainer = Secondary100,

    tertiary = Accent400,
    onTertiary = TextPrimary,
    tertiaryContainer = Accent600,
    onTertiaryContainer = Accent100,

    background = BackgroundDark,
    onBackground = TextPrimary,

    surface = Surface,
    onSurface = TextPrimary,
    surfaceVariant = SurfaceHover,
    onSurfaceVariant = TextSecondary,

    outline = SurfaceBorder,
    outlineVariant = SurfaceBorder,
)

@Composable
fun TimelessTheme(
    content: @Composable () -> Unit
) {
    MaterialTheme(
        colorScheme = DarkColorScheme,
        typography = TimelessTypography,
        content = content
    )
}
