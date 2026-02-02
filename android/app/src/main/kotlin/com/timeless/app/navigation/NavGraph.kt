package com.timeless.app.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.timeless.app.ui.login.LoginScreen

/**
 * Navigation destinations
 */
object Destinations {
    const val LOGIN = "login"
    const val WELCOME = "welcome"
    const val BIOMETRIC = "biometric"
    const val PROFILE_SETUP = "profile_setup"
    const val COMPLETE = "complete"
    const val HOME = "home"
}

@Composable
fun NavGraph() {
    val navController = rememberNavController()

    NavHost(
        navController = navController,
        startDestination = Destinations.LOGIN
    ) {
        composable(Destinations.LOGIN) {
            LoginScreen(
                onLoginSuccess = {
                    navController.navigate(Destinations.WELCOME) {
                        popUpTo(Destinations.LOGIN) { inclusive = true }
                    }
                }
            )
        }

        // Additional screens will be added in future issues
    }
}
