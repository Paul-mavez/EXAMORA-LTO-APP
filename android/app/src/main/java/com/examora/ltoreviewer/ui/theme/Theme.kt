package com.examora.ltoreviewer.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

// Examora Editorial Driving Education Brand Palette
val PrimaryNavy = Color(0xFF14243A)
val WarmIvory = Color(0xFFFAF9F6)
val PureWhite = Color(0xFFFFFFFF)
val SlateMuted = Color(0xFF667085)
val LightGrayBorder = Color(0xFFE9EBEF)
val RoadSafetyAccent = Color(0xFFD8A43B)
val SemanticSuccess = Color(0xFF32845A)
val SemanticError = Color(0xFFC44B4B)

val DarkCanvas = Color(0xFF0D1726)
val DarkSurface = Color(0xFF142033)
val DarkOutline = Color(0xFF24344D)

private val LightColors = lightColorScheme(
    primary = PrimaryNavy,
    onPrimary = PureWhite,
    secondary = RoadSafetyAccent,
    onSecondary = PrimaryNavy,
    background = WarmIvory,
    onBackground = PrimaryNavy,
    surface = PureWhite,
    onSurface = PrimaryNavy,
    surfaceVariant = WarmIvory,
    onSurfaceVariant = SlateMuted,
    outline = LightGrayBorder,
    error = SemanticError
)

private val DarkColors = darkColorScheme(
    primary = RoadSafetyAccent,
    onPrimary = PrimaryNavy,
    secondary = RoadSafetyAccent,
    onSecondary = PrimaryNavy,
    background = DarkCanvas,
    onBackground = WarmIvory,
    surface = DarkSurface,
    onSurface = WarmIvory,
    surfaceVariant = DarkCanvas,
    onSurfaceVariant = Color(0xFF98A2B3),
    outline = DarkOutline,
    error = SemanticError
)

@Composable
fun ExamoraTheme(
    darkThemeOverride: Boolean? = null,
    content: @Composable () -> Unit
) {
    val useDark = darkThemeOverride ?: isSystemInDarkTheme()
    MaterialTheme(
        colorScheme = if (useDark) DarkColors else LightColors,
        typography = Typography(),
        content = content
    )
}
