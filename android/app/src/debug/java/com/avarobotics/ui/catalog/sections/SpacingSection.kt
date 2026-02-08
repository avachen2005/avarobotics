package com.avarobotics.ui.catalog.sections

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import com.avarobotics.ui.theme.AppColors
import com.avarobotics.ui.theme.AppTheme

@Composable
fun SpacingSection() {
    val spacing = AppTheme.spacing
    val values = listOf(
        "xs" to spacing.xs,
        "sm" to spacing.sm,
        "md" to spacing.md,
        "lg" to spacing.lg,
        "xl" to spacing.xl,
        "xxl" to spacing.xxl,
        "xxxl" to spacing.xxxl,
    )

    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
        values.forEach { (name, value) ->
            SpacingBar(name = name, size = value)
        }
    }
}

@Composable
private fun SpacingBar(name: String, size: Dp) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(12.dp),
    ) {
        Text(
            text = "$name (${size.value.toInt()}dp)",
            style = AppTheme.typography.caption,
            color = AppTheme.colors.onSurfaceVariant,
            modifier = Modifier.width(100.dp),
        )
        Box(
            modifier = Modifier
                .width(size * 2)
                .height(24.dp)
                .clip(RoundedCornerShape(4.dp))
                .background(AppColors.Primary400),
        )
    }
}
