package com.timeless.app.ui.login

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Email
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.timeless.app.designsystem.tokens.*
import com.timeless.app.viewmodel.LoginViewModel

@Composable
fun LoginScreen(
    onLoginSuccess: () -> Unit,
    viewModel: LoginViewModel = viewModel()
) {
    val uiState by viewModel.uiState.collectAsState()

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(BackgroundDark)
            .padding(horizontal = Spacing.lg)
    ) {
        Column(
            modifier = Modifier.fillMaxSize(),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Spacer(modifier = Modifier.weight(1f))

            // Logo and title
            Text(
                text = "∞",
                fontSize = 64.sp,
                style = TimelessTypography.displayLarge.copy(
                    brush = Brush.horizontalGradient(
                        colors = listOf(Primary400, Accent400, Secondary400)
                    )
                )
            )

            Spacer(modifier = Modifier.height(Spacing.md))

            Text(
                text = "Timeless",
                style = TimelessTypography.displaySmall,
                color = TextPrimary
            )

            Spacer(modifier = Modifier.height(Spacing.xs))

            Text(
                text = "Strive on your timeless journey",
                style = TimelessTypography.bodyLarge,
                color = TextSecondary
            )

            Spacer(modifier = Modifier.weight(1f))

            // Login buttons
            Column(
                modifier = Modifier.fillMaxWidth(),
                verticalArrangement = Arrangement.spacedBy(Spacing.md)
            ) {
                // Google Sign In
                SignInButton(
                    text = "Sign in with Google",
                    onClick = { viewModel.signInWithGoogle() }
                )

                // Apple Sign In (placeholder)
                SignInButton(
                    text = "Sign in with Apple",
                    onClick = { /* Not implemented */ }
                )
            }

            Spacer(modifier = Modifier.height(Spacing.lg))

            // Terms
            Text(
                text = "By continuing, you agree to our Terms and Privacy Policy",
                style = TimelessTypography.bodySmall,
                color = TextMuted,
                textAlign = TextAlign.Center
            )

            Spacer(modifier = Modifier.height(Spacing.xxl))
        }

        // Error dialog
        if (uiState.error != null) {
            AlertDialog(
                onDismissRequest = { viewModel.clearError() },
                title = { Text("Error") },
                text = { Text(uiState.error ?: "") },
                confirmButton = {
                    TextButton(onClick = { viewModel.clearError() }) {
                        Text("OK")
                    }
                }
            )
        }
    }

    // Handle login success
    LaunchedEffect(uiState.isLoggedIn) {
        if (uiState.isLoggedIn) {
            onLoginSuccess()
        }
    }
}

@Composable
private fun SignInButton(
    text: String,
    onClick: () -> Unit
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(CornerRadius.lg))
            .background(Surface)
            .border(1.dp, SurfaceBorder, RoundedCornerShape(CornerRadius.lg))
            .clickable(onClick = onClick)
            .padding(vertical = Spacing.md),
        horizontalArrangement = Arrangement.Center,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Icon(
            imageVector = Icons.Default.Email,
            contentDescription = null,
            tint = TextPrimary,
            modifier = Modifier.size(24.dp)
        )
        Spacer(modifier = Modifier.width(Spacing.sm))
        Text(
            text = text,
            style = TimelessTypography.titleMedium,
            color = TextPrimary
        )
    }
}
