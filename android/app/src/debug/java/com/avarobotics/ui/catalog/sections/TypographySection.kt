package com.avarobotics.ui.catalog.sections

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.unit.dp
import com.avarobotics.ui.theme.AppTheme

@Composable
fun TypographySection() {
    val typography = AppTheme.typography
    val presets = listOf(
        "display1" to typography.display1,
        "display2" to typography.display2,
        "heading1" to typography.heading1,
        "heading2" to typography.heading2,
        "heading3" to typography.heading3,
        "bodyLarge" to typography.bodyLarge,
        "bodyRegular" to typography.bodyRegular,
        "bodyMedium" to typography.bodyMedium,
        "bodySemibold" to typography.bodySemibold,
        "bodySmall" to typography.bodySmall,
        "bodySmallMedium" to typography.bodySmallMedium,
        "caption" to typography.caption,
        "captionMedium" to typography.captionMedium,
        "buttonLarge" to typography.buttonLarge,
        "buttonMedium" to typography.buttonMedium,
        "buttonSmall" to typography.buttonSmall,
        "label" to typography.label,
        "input" to typography.input,
    )

    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        presets.forEach { (name, style) ->
            TypographyPreview(name = name, style = style)
        }
    }
}

@Composable
private fun TypographyPreview(name: String, style: TextStyle) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Text(
            text = name,
            style = style,
            modifier = Modifier.weight(1f),
        )
        Text(
            text = "${style.fontSize}",
            style = AppTheme.typography.caption,
            color = AppTheme.colors.onSurfaceVariant,
        )
    }
}
