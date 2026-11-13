package com.examora.ltoreviewer.notifications

import android.Manifest
import android.app.AlarmManager
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Build
import android.util.Log
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import androidx.core.content.ContextCompat
import com.examora.ltoreviewer.MainActivity
import com.examora.ltoreviewer.R
import com.examora.ltoreviewer.data.local.UserPreferencesDataStore
import com.examora.ltoreviewer.domain.model.UserSettings
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.launch
import java.util.Calendar

object DailyPracticeNotifications {
    private const val CHANNEL_ID = "daily_practice"
    private const val NOTIFICATION_ID = 1001
    private const val REMINDER_ACTION = "com.examora.ltoreviewer.DAILY_PRACTICE_REMINDER"
    private const val TAG = "DailyPracticeReminder"

    fun sync(context: Context, settings: UserSettings) {
        if (settings.notificationsEnabled && canPostNotifications(context)) {
            schedule(context, settings)
        } else {
            cancel(context)
        }
    }

    fun schedule(context: Context, settings: UserSettings) {
        if (!canPostNotifications(context)) return
        createNotificationChannel(context)

        val now = Calendar.getInstance()
        val nextReminder = if (settings.reminderDays.isEmpty()) {
            Calendar.getInstance().apply {
                set(Calendar.HOUR_OF_DAY, settings.reminderHour.coerceIn(0, 23))
                set(Calendar.MINUTE, settings.reminderMinute.coerceIn(0, 59))
                set(Calendar.SECOND, 0)
                set(Calendar.MILLISECOND, 0)
                if (timeInMillis <= now.timeInMillis) add(Calendar.DAY_OF_YEAR, 1)
            }
        } else {
            findNextSelectedDay(now, settings)
        }

        val alarmManager = context.getSystemService(AlarmManager::class.java)
        alarmManager.setAndAllowWhileIdle(
            AlarmManager.RTC_WAKEUP,
            nextReminder.timeInMillis,
            reminderPendingIntent(context)
        )
    }

    private fun findNextSelectedDay(now: Calendar, settings: UserSettings): Calendar {
        for (dayOffset in 0..7) {
            val candidate = Calendar.getInstance().apply {
                add(Calendar.DAY_OF_YEAR, dayOffset)
                set(Calendar.HOUR_OF_DAY, settings.reminderHour.coerceIn(0, 23))
                set(Calendar.MINUTE, settings.reminderMinute.coerceIn(0, 59))
                set(Calendar.SECOND, 0)
                set(Calendar.MILLISECOND, 0)
            }
            val weekday = candidate.get(Calendar.DAY_OF_WEEK) - 1
            if (weekday in settings.reminderDays && candidate.timeInMillis > now.timeInMillis) {
                return candidate
            }
        }
        return Calendar.getInstance().apply {
            add(Calendar.DAY_OF_YEAR, 7)
            set(Calendar.HOUR_OF_DAY, settings.reminderHour.coerceIn(0, 23))
            set(Calendar.MINUTE, settings.reminderMinute.coerceIn(0, 59))
            set(Calendar.SECOND, 0)
            set(Calendar.MILLISECOND, 0)
        }
    }

    fun cancel(context: Context) {
        context.getSystemService(AlarmManager::class.java)
            .cancel(reminderPendingIntent(context))
    }

    fun canPostNotifications(context: Context): Boolean {
        val runtimePermissionGranted =
            Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU ||
                ContextCompat.checkSelfPermission(
                    context,
                    Manifest.permission.POST_NOTIFICATIONS
                ) == PackageManager.PERMISSION_GRANTED
        return runtimePermissionGranted && NotificationManagerCompat.from(context).areNotificationsEnabled()
    }

    fun showNotification(context: Context) {
        if (!canPostNotifications(context)) return
        createNotificationChannel(context)

        val contentIntent = PendingIntent.getActivity(
            context,
            NOTIFICATION_ID,
            Intent(context, MainActivity::class.java).apply {
                flags = Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_SINGLE_TOP
            },
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )
        val notification = NotificationCompat.Builder(context, CHANNEL_ID)
            .setSmallIcon(R.drawable.ic_notification)
            .setContentTitle(context.getString(R.string.daily_reminder_notification_title))
            .setContentText(context.getString(R.string.daily_reminder_notification_body))
            .setStyle(
                NotificationCompat.BigTextStyle().bigText(
                    context.getString(R.string.daily_reminder_notification_body)
                )
            )
            .setContentIntent(contentIntent)
            .setAutoCancel(true)
            .setPriority(NotificationCompat.PRIORITY_DEFAULT)
            .build()

        try {
            NotificationManagerCompat.from(context).notify(NOTIFICATION_ID, notification)
        } catch (error: SecurityException) {
            Log.w(TAG, "Notification permission was revoked before the reminder was posted.", error)
        }
    }

    private fun createNotificationChannel(context: Context) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) return
        val channel = NotificationChannel(
            CHANNEL_ID,
            context.getString(R.string.daily_reminder_channel_name),
            NotificationManager.IMPORTANCE_DEFAULT
        ).apply {
            description = context.getString(R.string.daily_reminder_channel_description)
        }
        context.getSystemService(NotificationManager::class.java).createNotificationChannel(channel)
    }

    private fun reminderPendingIntent(context: Context): PendingIntent =
        PendingIntent.getBroadcast(
            context,
            NOTIFICATION_ID,
            Intent(context, DailyPracticeReminderReceiver::class.java).setAction(REMINDER_ACTION),
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )
}

class DailyPracticeReminderReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent?) {
        val pendingResult = goAsync()
        CoroutineScope(SupervisorJob() + Dispatchers.IO).launch {
            try {
                val settings = UserPreferencesDataStore(context).settingsFlow.first()
                if (settings.notificationsEnabled &&
                    DailyPracticeNotifications.canPostNotifications(context)
                ) {
                    DailyPracticeNotifications.showNotification(context)
                    if (settings.reminderDays.isEmpty()) {
                        UserPreferencesDataStore(context).saveSettings(
                            settings.copy(notificationsEnabled = false)
                        )
                    } else {
                        DailyPracticeNotifications.schedule(context, settings)
                    }
                } else {
                    DailyPracticeNotifications.cancel(context)
                }
            } finally {
                pendingResult.finish()
            }
        }
    }
}

class DailyPracticeRescheduleReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent?) {
        val pendingResult = goAsync()
        CoroutineScope(SupervisorJob() + Dispatchers.IO).launch {
            try {
                val settings = UserPreferencesDataStore(context).settingsFlow.first()
                DailyPracticeNotifications.sync(context, settings)
            } finally {
                pendingResult.finish()
            }
        }
    }
}
