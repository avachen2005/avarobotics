package com.avarobotics.ui.theme

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.DpOffset
import androidx.compose.ui.unit.dp

data class ShadowToken(
    val offset: DpOffset,
    val blurRadius: Float,
    val spreadRadius: Float,
    val color: Color,
)

object AppElevation {
    // Standard shadows
    val sm = ShadowToken(
        offset = DpOffset(0.dp, 1.dp),
        blurRadius = 2f,
        spreadRadius = 0f,
        color = Color.Black.copy(alpha = 0.05f),
    )
    val md = ShadowToken(
        offset = DpOffset(0.dp, 4.dp),
        blurRadius = 6f,
        spreadRadius = -1f,
        color = Color.Black.copy(alpha = 0.1f),
    )
    val lg = ShadowToken(
        offset = DpOffset(0.dp, 10.dp),
        blurRadius = 15f,
        spreadRadius = -3f,
        color = Color.Black.copy(alpha = 0.1f),
    )
    val xl = ShadowToken(
        offset = DpOffset(0.dp, 20.dp),
        blurRadius = 25f,
        spreadRadius = -5f,
        color = Color.Black.copy(alpha = 0.1f),
    )
    val xxl = ShadowToken(
        offset = DpOffset(0.dp, 25.dp),
        blurRadius = 50f,
        spreadRadius = -12f,
        color = Color.Black.copy(alpha = 0.25f),
    )

    // Glow effects
    val glowPurple = ShadowToken(
        offset = DpOffset.Zero,
        blurRadius = 30f,
        spreadRadius = 0f,
        color = Color(0xFF8B5CF6).copy(alpha = 0.5f),
    )
    val glowPink = ShadowToken(
        offset = DpOffset.Zero,
        blurRadius = 30f,
        spreadRadius = 0f,
        color = Color(0xFFD946EF).copy(alpha = 0.5f),
    )
    val glowCyan = ShadowToken(
        offset = DpOffset.Zero,
        blurRadius = 30f,
        spreadRadius = 0f,
        color = Color(0xFF22D3EE).copy(alpha = 0.5f),
    )
}
