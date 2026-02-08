package com.avarobotics.ui.catalog.sections

import androidx.compose.foundation.background
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
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.unit.dp
import com.avarobotics.ui.theme.AppColors
import com.avarobotics.ui.theme.AppElevation
import com.avarobotics.ui.theme.AppTheme
import com.avarobotics.ui.theme.ShadowToken

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun ShadowSection() {
    Column(verticalArrangement = Arrangement.spacedBy(24.dp)) {
        Text(text = "Standard Shadows", style = AppTheme.typography.heading3)
        FlowRow(
            horizontalArrangement = Arrangement.spacedBy(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp),
        ) {
            ShadowSample("sm", AppElevation.sm)
            ShadowSample("md", AppElevation.md)
            ShadowSample("lg", AppElevation.lg)
            ShadowSample("xl", AppElevation.xl)
            ShadowSample("xxl", AppElevation.xxl)
        }

        Text(text = "Glow Effects", style = AppTheme.typography.heading3)
        FlowRow(
            horizontalArrangement = Arrangement.spacedBy(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp),
        ) {
            ShadowSample("glowPurple", AppElevation.glowPurple)
            ShadowSample("glowPink", AppElevation.glowPink)
            ShadowSample("glowCyan", AppElevation.glowCyan)
        }
    }
}

@Composable
private fun ShadowSample(name: String, token: ShadowToken) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(8.dp),
    ) {
        Box(
            modifier = Modifier
                .padding(16.dp)
                .shadow(
                    elevation = token.blurRadius.dp,
                    shape = RoundedCornerShape(12.dp),
                    ambientColor = token.color,
                    spotColor = token.color,
                )
                .size(80.dp)
                .clip(RoundedCornerShape(12.dp))
                .background(AppColors.White),
        )
        Text(
            text = name,
            style = AppTheme.typography.caption,
            color = AppTheme.colors.onSurfaceVariant,
        )
    }
}
