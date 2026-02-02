package com.timeless.app

import android.app.Application
import com.timeless.app.core.config.AppConfig

class TimelessApp : Application() {
    override fun onCreate() {
        super.onCreate()
        // Initialize app configuration
        AppConfig.init(this)
    }
}
