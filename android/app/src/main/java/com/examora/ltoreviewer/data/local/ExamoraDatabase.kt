package com.examora.ltoreviewer.data.local

import android.content.Context
import androidx.datastore.preferences.core.*
import androidx.datastore.preferences.preferencesDataStore
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import com.examora.ltoreviewer.data.local.dao.ReviewerDao
import com.examora.ltoreviewer.data.local.entity.*
import com.examora.ltoreviewer.domain.model.AppLanguage
import com.examora.ltoreviewer.domain.model.PreparationTrack
import com.examora.ltoreviewer.domain.model.UserSettings
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

@Database(
    entities = [
        CompletedLessonEntity::class,
        QuestionAttemptEntity::class,
        BookmarkEntity::class,
        PersonalNoteEntity::class,
        StudySessionEntity::class
    ],
    version = 1,
    exportSchema = false
)
abstract class ExamoraDatabase : RoomDatabase() {
    abstract fun reviewerDao(): ReviewerDao

    companion object {
        @Volatile
        private var INSTANCE: ExamoraDatabase? = null

        fun getInstance(context: Context): ExamoraDatabase =
            INSTANCE ?: synchronized(this) {
                INSTANCE ?: Room.databaseBuilder(
                    context.applicationContext,
                    ExamoraDatabase::class.java,
                    "examora_lto_reviewer.db"
                ).build().also { INSTANCE = it }
            }
    }
}

private val Context.dataStore by preferencesDataStore(name = "examora_user_preferences")

class UserPreferencesDataStore(private val context: Context) {
    private object Keys {
        val ONBOARDING_DONE = booleanPreferencesKey("onboarding_completed")
        val LANGUAGE = stringPreferencesKey("app_language")
        val TRACK = stringPreferencesKey("prep_track")
        val DISPLAY_NAME = stringPreferencesKey("display_name")
        val DAILY_GOAL = intPreferencesKey("daily_goal")
        val REMINDER_HOUR = intPreferencesKey("reminder_hour")
        val REMINDER_MINUTE = intPreferencesKey("reminder_minute")
        val REMINDER_DAYS = stringPreferencesKey("reminder_days")
        val DARK_THEME = stringPreferencesKey("dark_theme_mode")
        val NOTIFICATIONS = booleanPreferencesKey("notifications_enabled")
        val SOUND = booleanPreferencesKey("sound_enabled")
    }

    val settingsFlow: Flow<UserSettings> = context.dataStore.data.map { prefs ->
        UserSettings(
            onboardingCompleted = prefs[Keys.ONBOARDING_DONE] ?: false,
            language = if (prefs[Keys.LANGUAGE] == "tl") AppLanguage.FILIPINO else AppLanguage.ENGLISH,
            preparationTrack = runCatching {
                PreparationTrack.valueOf(prefs[Keys.TRACK] ?: PreparationTrack.NON_PROFESSIONAL.name)
            }.getOrDefault(PreparationTrack.NON_PROFESSIONAL),
            displayName = prefs[Keys.DISPLAY_NAME] ?: "",
            dailyGoal = prefs[Keys.DAILY_GOAL] ?: 20,
            reminderHour = (prefs[Keys.REMINDER_HOUR] ?: 19).coerceIn(0, 23),
            reminderMinute = (prefs[Keys.REMINDER_MINUTE] ?: 0).coerceIn(0, 59),
            reminderDays = prefs[Keys.REMINDER_DAYS]
                ?.split(',')
                ?.mapNotNull { it.toIntOrNull()?.takeIf { day -> day in 0..6 } }
                ?.toSet()
                ?: setOf(0, 1, 2, 3, 4, 5, 6),
            darkTheme = when (prefs[Keys.DARK_THEME]) {
                "DARK" -> true
                "LIGHT" -> false
                else -> null
            },
            notificationsEnabled = prefs[Keys.NOTIFICATIONS] ?: false,
            soundEnabled = prefs[Keys.SOUND] ?: true
        )
    }

    suspend fun saveSettings(settings: UserSettings) {
        context.dataStore.edit { prefs ->
            prefs[Keys.ONBOARDING_DONE] = settings.onboardingCompleted
            prefs[Keys.LANGUAGE] = settings.language.code
            prefs[Keys.TRACK] = settings.preparationTrack.name
            prefs[Keys.DISPLAY_NAME] = settings.displayName
            prefs[Keys.DAILY_GOAL] = settings.dailyGoal
            prefs[Keys.REMINDER_HOUR] = settings.reminderHour.coerceIn(0, 23)
            prefs[Keys.REMINDER_MINUTE] = settings.reminderMinute.coerceIn(0, 59)
            prefs[Keys.REMINDER_DAYS] = settings.reminderDays
                .filter { it in 0..6 }
                .sorted()
                .joinToString(",")
            prefs[Keys.DARK_THEME] = when (settings.darkTheme) {
                true -> "DARK"
                false -> "LIGHT"
                null -> "SYSTEM"
            }
            prefs[Keys.NOTIFICATIONS] = settings.notificationsEnabled
            prefs[Keys.SOUND] = settings.soundEnabled
        }
    }
}
