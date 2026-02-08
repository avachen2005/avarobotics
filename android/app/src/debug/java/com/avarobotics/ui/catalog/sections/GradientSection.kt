package com.avarobotics.ui.catalog.sections

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.unit.dp
import com.avarobotics.ui.theme.AppGradients
import com.avarobotics.ui.theme.AppTheme

@Composable
fun GradientSection() {
    val gradients = listOf(
        "primary" to AppGradients.primary,
        "accent" to AppGradients.accent,
        "secondary" to AppGradients.secondary,
        "neon" to AppGradients.neon,
    )

    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        gradients.forEach { (name, brush) ->
            GradientSample(name = name, brush = brush)
        }
    }
}

@Composable
private fun GradientSample(name: String, brush: Brush) {
    Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
        Text(
            text = name,
            style = AppTheme.typography.caption,
            color = AppTheme.colors.onSurfaceVariant,
        )
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(48.dp)
                .clip(RoundedCornerShape(12.dp))
                .background(brush),
        )
    }
}
