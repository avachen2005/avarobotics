package com.avarobotics.ui.catalog.sections

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.size
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

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun ShapeSection() {
    val shapes = AppTheme.shapes
    val values = listOf(
        "none" to shapes.none,
        "small" to shapes.small,
        "medium" to shapes.medium,
        "large" to shapes.large,
        "extraLarge" to shapes.extraLarge,
        "xxl" to shapes.xxl,
        "xxxl" to shapes.xxxl,
        "full" to shapes.full,
    )

    FlowRow(
        horizontalArrangement = Arrangement.spacedBy(12.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp),
    ) {
        values.forEach { (name, radius) ->
            ShapeSample(name = name, radius = radius)
        }
    }
}

@Composable
private fun ShapeSample(name: String, radius: Dp) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(4.dp),
    ) {
        Box(
            modifier = Modifier
                .size(64.dp)
                .clip(RoundedCornerShape(radius))
                .background(AppColors.Primary100),
        )
        Text(
            text = "$name (${radius.value.toInt()}dp)",
            style = AppTheme.typography.caption,
            color = AppTheme.colors.onSurfaceVariant,
        )
    }
}
