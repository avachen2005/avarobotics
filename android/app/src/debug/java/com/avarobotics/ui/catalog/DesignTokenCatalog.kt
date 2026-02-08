package com.avarobotics.ui.catalog

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.unit.dp
import com.avarobotics.ui.catalog.sections.ColorSection
import com.avarobotics.ui.catalog.sections.GradientSection
import com.avarobotics.ui.catalog.sections.ShapeSection
import com.avarobotics.ui.catalog.sections.ShadowSection
import com.avarobotics.ui.catalog.sections.SpacingSection
import com.avarobotics.ui.catalog.sections.TypographySection
import com.avarobotics.ui.theme.AppColors
import com.avarobotics.ui.theme.AppComponentTokens
import com.avarobotics.ui.theme.AppGradients
import com.avarobotics.ui.theme.AppTheme

@Composable
fun DesignTokenCatalog() {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(24.dp),
    ) {
        Text(text = "Design Token Catalog", style = AppTheme.typography.display2)

        CatalogSection("Colors") { ColorSection() }
        CatalogSection("Typography") { TypographySection() }
        CatalogSection("Spacing") { SpacingSection() }
        CatalogSection("Shapes") { ShapeSection() }
        CatalogSection("Shadows & Glows") { ShadowSection() }
        CatalogSection("Gradients") { GradientSection() }
        CatalogSection("Component Tokens") { ComponentTokenExamples() }
    }
}

@Composable
private fun CatalogSection(
    title: String,
    content: @Composable () -> Unit,
) {
    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        HorizontalDivider(color = AppTheme.colors.outline)
        Text(text = title, style = AppTheme.typography.heading1)
        content()
    }
}

@Composable
private fun ComponentTokenExamples() {
    Column(verticalArrangement = Arrangement.spacedBy(16.dp)) {
        // Button examples
        Text(text = "Buttons", style = AppTheme.typography.heading3)
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            // Primary button
            Box(
                modifier = Modifier
                    .background(
                        brush = AppGradients.primary,
                        shape = RoundedCornerShape(AppComponentTokens.Button.radiusFull),
                    )
                    .padding(
                        horizontal = AppComponentTokens.Button.paddingMediumHorizontal,
                        vertical = AppComponentTokens.Button.paddingMediumVertical,
                    ),
                contentAlignment = Alignment.Center,
            ) {
                Text("Primary", style = AppTheme.typography.buttonMedium, color = AppColors.White)
            }

            // Outline button
            Box(
                modifier = Modifier
                    .border(
                        width = AppComponentTokens.Button.outlineBorderWidth,
                        color = AppComponentTokens.Button.outlineBorderColor,
                        shape = RoundedCornerShape(AppComponentTokens.Button.radiusFull),
                    )
                    .padding(
                        horizontal = AppComponentTokens.Button.paddingMediumHorizontal,
                        vertical = AppComponentTokens.Button.paddingMediumVertical,
                    ),
                contentAlignment = Alignment.Center,
            ) {
                Text("Outline", style = AppTheme.typography.buttonMedium, color = AppColors.Primary500)
            }
        }

        // Card example
        Text(text = "Card", style = AppTheme.typography.heading3)
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .shadow(
                    elevation = 8.dp,
                    shape = RoundedCornerShape(AppComponentTokens.Card.radius),
                )
                .clip(RoundedCornerShape(AppComponentTokens.Card.radius))
                .background(AppComponentTokens.Card.background)
                .padding(AppComponentTokens.Card.paddingMedium),
        ) {
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                Text("Card Title", style = AppTheme.typography.heading3)
                Text("Card body text with medium padding.", style = AppTheme.typography.bodyRegular)
            }
        }

        // Input example
        Text(text = "Input", style = AppTheme.typography.heading3)
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .border(
                    width = AppComponentTokens.Input.borderWidth,
                    color = AppComponentTokens.Input.borderDefault,
                    shape = RoundedCornerShape(AppComponentTokens.Input.radius),
                )
                .padding(
                    horizontal = AppComponentTokens.Input.paddingHorizontal,
                    vertical = AppComponentTokens.Input.paddingVertical,
                ),
        ) {
            Text(
                "Placeholder text",
                style = AppTheme.typography.input,
                color = AppTheme.colors.onSurfaceVariant,
            )
        }

        // Input focus
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .border(
                    width = AppComponentTokens.Input.borderWidth,
                    color = AppComponentTokens.Input.borderFocus,
                    shape = RoundedCornerShape(AppComponentTokens.Input.radius),
                )
                .padding(
                    horizontal = AppComponentTokens.Input.paddingHorizontal,
                    vertical = AppComponentTokens.Input.paddingVertical,
                ),
        ) {
            Text("Focus state", style = AppTheme.typography.input)
        }

        // Input error
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .border(
                    width = AppComponentTokens.Input.borderWidth,
                    color = AppComponentTokens.Input.borderError,
                    shape = RoundedCornerShape(AppComponentTokens.Input.radius),
                )
                .padding(
                    horizontal = AppComponentTokens.Input.paddingHorizontal,
                    vertical = AppComponentTokens.Input.paddingVertical,
                ),
        ) {
            Text("Error state", style = AppTheme.typography.input, color = AppColors.Error)
        }
    }
}
