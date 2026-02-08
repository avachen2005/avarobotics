package com.avarobotics.ui.catalog.sections

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.avarobotics.ui.theme.AppColors
import com.avarobotics.ui.theme.AppTheme

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun ColorSection() {
    Column(verticalArrangement = Arrangement.spacedBy(16.dp)) {
        ColorGroup("Primary", primaryColors())
        ColorGroup("Accent", accentColors())
        ColorGroup("Secondary", secondaryColors())
        ColorGroup("Neutral", neutralColors())
        ColorGroup("Basic & Error", basicColors())
    }
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
private fun ColorGroup(title: String, colors: List<Pair<String, Color>>) {
    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
        Text(text = title, style = AppTheme.typography.heading3)
        FlowRow(
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp),
        ) {
            colors.forEach { (name, color) ->
                ColorSwatch(name = name, color = color)
            }
        }
    }
}

@Composable
private fun ColorSwatch(name: String, color: Color) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(4.dp),
    ) {
        Box(
            modifier = Modifier
                .size(56.dp)
                .clip(RoundedCornerShape(8.dp))
                .background(color)
                .border(1.dp, AppColors.Neutral200, RoundedCornerShape(8.dp)),
        )
        Text(
            text = name,
            style = AppTheme.typography.caption,
            color = AppTheme.colors.onSurfaceVariant,
        )
    }
}

private fun primaryColors() = listOf(
    "50" to AppColors.Primary50,
    "100" to AppColors.Primary100,
    "200" to AppColors.Primary200,
    "300" to AppColors.Primary300,
    "400" to AppColors.Primary400,
    "500" to AppColors.Primary500,
    "600" to AppColors.Primary600,
    "700" to AppColors.Primary700,
    "800" to AppColors.Primary800,
    "900" to AppColors.Primary900,
)

private fun accentColors() = listOf(
    "50" to AppColors.Accent50,
    "100" to AppColors.Accent100,
    "200" to AppColors.Accent200,
    "300" to AppColors.Accent300,
    "400" to AppColors.Accent400,
    "500" to AppColors.Accent500,
    "600" to AppColors.Accent600,
    "700" to AppColors.Accent700,
)

private fun secondaryColors() = listOf(
    "50" to AppColors.Secondary50,
    "100" to AppColors.Secondary100,
    "200" to AppColors.Secondary200,
    "300" to AppColors.Secondary300,
    "400" to AppColors.Secondary400,
    "500" to AppColors.Secondary500,
    "600" to AppColors.Secondary600,
)

private fun neutralColors() = listOf(
    "50" to AppColors.Neutral50,
    "100" to AppColors.Neutral100,
    "200" to AppColors.Neutral200,
    "300" to AppColors.Neutral300,
    "400" to AppColors.Neutral400,
    "500" to AppColors.Neutral500,
    "600" to AppColors.Neutral600,
    "700" to AppColors.Neutral700,
    "800" to AppColors.Neutral800,
    "900" to AppColors.Neutral900,
)

private fun basicColors() = listOf(
    "White" to AppColors.White,
    "Black" to AppColors.Black,
    "Error" to AppColors.Error,
)
