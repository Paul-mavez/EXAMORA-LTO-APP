package com.examora.ltoreviewer

import android.app.Application
import android.content.pm.PackageManager
import android.os.Build
import android.os.Bundle
import android.view.Gravity
import android.view.ViewGroup
import android.widget.LinearLayout
import android.widget.NumberPicker
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.selected
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.viewinterop.AndroidView
import androidx.core.content.ContextCompat
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.examora.ltoreviewer.data.local.ExamoraDatabase
import com.examora.ltoreviewer.data.local.UserPreferencesDataStore
import com.examora.ltoreviewer.data.repository.ReviewerRepositoryImpl
import com.examora.ltoreviewer.domain.model.AppLanguage
import com.examora.ltoreviewer.domain.model.PreparationTrack
import com.examora.ltoreviewer.domain.model.UserSettings
import com.examora.ltoreviewer.notifications.DailyPracticeNotifications
import com.examora.ltoreviewer.presentation.MainReviewerViewModel
import com.examora.ltoreviewer.ui.components.*
import com.examora.ltoreviewer.ui.theme.ExamoraTheme
import java.util.Calendar
import java.util.Locale

class ExamoraApplication : Application() {
    lateinit var repository: ReviewerRepositoryImpl
        private set

    override fun onCreate() {
        super.onCreate()
        val db = ExamoraDatabase.getInstance(this)
        val prefs = UserPreferencesDataStore(this)
        repository = ReviewerRepositoryImpl(db.reviewerDao(), prefs)
    }
}

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val app = application as ExamoraApplication
        val viewModel = MainReviewerViewModel(app.repository)

        setContent {
            val settings by viewModel.settings.collectAsState()
            val context = LocalContext.current
            var notificationPermissionDenied by remember { mutableStateOf(false) }
            val notificationPermissionLauncher = rememberLauncherForActivityResult(
                ActivityResultContracts.RequestPermission()
            ) { granted ->
                if (granted) {
                    notificationPermissionDenied = false
                    viewModel.updateSettings { it.copy(notificationsEnabled = true) }
                } else {
                    notificationPermissionDenied = true
                }
            }

            LaunchedEffect(
                settings.notificationsEnabled,
                settings.reminderHour,
                settings.reminderMinute
            ) {
                DailyPracticeNotifications.sync(context.applicationContext, settings)
            }
            LaunchedEffect(settings.notificationsEnabled) {
                if (
                    settings.notificationsEnabled &&
                    !DailyPracticeNotifications.canPostNotifications(context)
                ) {
                    notificationPermissionDenied = true
                }
            }

            ExamoraTheme(darkThemeOverride = settings.darkTheme) {
                if (!settings.onboardingCompleted) {
                    OnboardingFlow(
                        onComplete = { lang, track, name ->
                            viewModel.finishOnboarding(lang, track, name)
                        }
                    )
                } else {
                    MainReviewerScaffold(
                        viewModel = viewModel,
                        settings = settings,
                        notificationPermissionDenied = notificationPermissionDenied,
                        onReminderToggle = { enabled ->
                            if (!enabled) {
                                notificationPermissionDenied = false
                                viewModel.updateSettings { it.copy(notificationsEnabled = false) }
                            } else if (
                                Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU &&
                                ContextCompat.checkSelfPermission(
                                    context,
                                    android.Manifest.permission.POST_NOTIFICATIONS
                                ) != PackageManager.PERMISSION_GRANTED
                            ) {
                                notificationPermissionLauncher.launch(
                                    android.Manifest.permission.POST_NOTIFICATIONS
                                )
                            } else {
                                notificationPermissionDenied = false
                                viewModel.updateSettings { it.copy(notificationsEnabled = true) }
                            }
                        }
                    )
                }
            }
        }
    }
}

@Composable
private fun OnboardingFlow(
    onComplete: (AppLanguage, PreparationTrack, String) -> Unit
) {
    var slideIndex by remember { mutableIntStateOf(0) }
    var selectedLang by remember { mutableStateOf(AppLanguage.ENGLISH) }
    var selectedTrack by remember { mutableStateOf(PreparationTrack.NON_PROFESSIONAL) }
    var displayName by remember { mutableStateOf("") }

    val titles = listOf(
        stringResource(R.string.onboard_title_1),
        stringResource(R.string.onboard_title_2),
        stringResource(R.string.onboard_title_3),
        stringResource(R.string.onboard_title_4)
    )
    val descriptions = listOf(
        stringResource(R.string.onboard_desc_1),
        stringResource(R.string.onboard_desc_2),
        stringResource(R.string.onboard_desc_3),
        stringResource(R.string.onboard_desc_4)
    )
    val drawables = listOf(
        R.drawable.onboarding_1,
        R.drawable.onboarding_2,
        R.drawable.onboarding_3,
        R.drawable.onboarding_4
    )

    Scaffold { innerPadding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .padding(24.dp),
            verticalArrangement = Arrangement.SpaceBetween
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                    Image(
                        painter = painterResource(id = R.drawable.examora_logo),
                        contentDescription = stringResource(R.string.app_name),
                        modifier = Modifier.size(40.dp)
                    )
                    Text(stringResource(R.string.app_name), fontWeight = FontWeight.Bold)
                }
                if (slideIndex < 4) {
                    TextButton(onClick = { slideIndex = 4 }) { Text("Skip") }
                }
            }

            if (slideIndex < 4) {
                Column(verticalArrangement = Arrangement.spacedBy(16.dp)) {
                    Image(
                        painter = painterResource(id = drawables[slideIndex]),
                        contentDescription = titles[slideIndex],
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(220.dp)
                    )
                    Text(titles[slideIndex], style = MaterialTheme.typography.headlineSmall, fontWeight = FontWeight.Bold)
                    Text(descriptions[slideIndex], color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
                PrimaryButton(
                    text = if (slideIndex < 3) "Next" else "Get Started",
                    onClick = { slideIndex += 1 },
                    modifier = Modifier.fillMaxWidth()
                )
            } else {
                Column(verticalArrangement = Arrangement.spacedBy(14.dp)) {
                    Text("Initial Study Setup", style = MaterialTheme.typography.headlineSmall, fontWeight = FontWeight.Bold)
                    OutlinedTextField(
                        value = displayName,
                        onValueChange = { displayName = it },
                        label = { Text("Display Name (Optional — No Login Required)") },
                        modifier = Modifier.fillMaxWidth()
                    )
                    PreparationTrack.entries.forEach { track ->
                        SecondaryButton(
                            text = track.name.replace('_', ' '),
                            onClick = { selectedTrack = track },
                            modifier = Modifier.fillMaxWidth()
                        )
                    }
                    Text(stringResource(R.string.lto_disclaimer), style = MaterialTheme.typography.bodySmall)
                }
                PrimaryButton(
                    text = "Start Learning",
                    onClick = { onComplete(selectedLang, selectedTrack, displayName) },
                    modifier = Modifier.fillMaxWidth()
                )
            }
        }
    }
}

@Composable
private fun MainReviewerScaffold(
    viewModel: MainReviewerViewModel,
    settings: UserSettings,
    notificationPermissionDenied: Boolean,
    onReminderToggle: (Boolean) -> Unit
) {
    val navController = rememberNavController()
    val backStack by navController.currentBackStackEntryAsState()
    val currentRoute = backStack?.destination?.route ?: "home"
    val progress by viewModel.progress.collectAsState()
    val context = LocalContext.current

    Scaffold(
        bottomBar = {
            BottomNavigation(
                currentRoute = currentRoute,
                onNavigate = { route ->
                    navController.navigate(route) {
                        launchSingleTop = true
                        restoreState = true
                    }
                }

                @Composable
                private fun AlarmTimeWheelDialog(
                    initialHour: Int,
                    initialMinute: Int,
                    onDismiss: () -> Unit,
                    onConfirm: (hour: Int, minute: Int) -> Unit
                ) {
                    val context = LocalContext.current
                    val initialHour12 = initialHour % 12
                    val selectedHour = remember(initialHour) {
                        mutableIntStateOf(if (initialHour12 == 0) 12 else initialHour12)
                    }
                    val selectedMinute = remember(initialMinute) { mutableIntStateOf(initialMinute) }
                    val selectedPeriod = remember(initialHour) { mutableIntStateOf(if (initialHour >= 12) 1 else 0) }

                    AlertDialog(
                        onDismissRequest = onDismiss,
                        title = { Text(stringResource(R.string.daily_reminder_time_picker_title)) },
                        text = {
                            AndroidView(
                                factory = { viewContext ->
                                    val pickerHeight = (220 * viewContext.resources.displayMetrics.density).toInt()
                                    val hourPicker = NumberPicker(viewContext).apply {
                                        minValue = 1
                                        maxValue = 12
                                        value = selectedHour.intValue
                                        wrapSelectorWheel = true
                                        descendantFocusability = ViewGroup.FOCUS_BLOCK_DESCENDANTS
                                    }
                                    val minutePicker = NumberPicker(viewContext).apply {
                                        minValue = 0
                                        maxValue = 59
                                        displayedValues = Array(60) {
                                            String.format(Locale.ROOT, "%02d", it)
                                        }
                                        value = selectedMinute.intValue
                                        wrapSelectorWheel = true
                                        descendantFocusability = ViewGroup.FOCUS_BLOCK_DESCENDANTS
                                    }
                                    val periodPicker = NumberPicker(viewContext).apply {
                                        minValue = 0
                                        maxValue = 1
                                        displayedValues = arrayOf(
                                            viewContext.getString(R.string.alarm_am),
                                            viewContext.getString(R.string.alarm_pm)
                                        )
                                        value = selectedPeriod.intValue
                                        wrapSelectorWheel = true
                                        descendantFocusability = ViewGroup.FOCUS_BLOCK_DESCENDANTS
                                    }
                                    hourPicker.setOnValueChangedListener { _, _, newValue ->
                                        selectedHour.intValue = newValue
                                    }
                                    minutePicker.setOnValueChangedListener { _, _, newValue ->
                                        selectedMinute.intValue = newValue
                                    }
                                    periodPicker.setOnValueChangedListener { _, _, newValue ->
                                        selectedPeriod.intValue = newValue
                                    }

                                    LinearLayout(viewContext).apply {
                                        orientation = LinearLayout.HORIZONTAL
                                        gravity = Gravity.CENTER
                                        addView(hourPicker, LinearLayout.LayoutParams(0, pickerHeight, 1f))
                                        addView(minutePicker, LinearLayout.LayoutParams(0, pickerHeight, 1f))
                                        addView(periodPicker, LinearLayout.LayoutParams(0, pickerHeight, 1f))
                                    }
                                },
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .height(220.dp)
                            )
                        },
                        confirmButton = {
                            TextButton(
                                onClick = {
                                    val hour24 = (selectedHour.intValue % 12) +
                                        if (selectedPeriod.intValue == 1) 12 else 0
                                    onConfirm(hour24, selectedMinute.intValue)
                                }
                            ) {
                                Text(stringResource(android.R.string.ok))
                            }
                        },
                        dismissButton = {
                            TextButton(onClick = onDismiss) {
                                Text(stringResource(android.R.string.cancel))
                            }
                        }
                    )
                }
            )
        }
    ) { innerPadding ->
        NavHost(
            navController = navController,
            startDestination = "home",
            modifier = Modifier.padding(innerPadding)
        ) {
            composable("home") {
                LazyColumn(
                    contentPadding = PaddingValues(20.dp),
                    verticalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    item {
                        Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                            Image(
                                painter = painterResource(id = R.drawable.examora_logo),
                                contentDescription = null,
                                modifier = Modifier.size(44.dp)
                            )
                            Column {
                                Text(stringResource(R.string.brand_parent), style = MaterialTheme.typography.labelSmall)
                                Text(stringResource(R.string.app_name), fontWeight = FontWeight.Bold)
                            }
                        }
                        Spacer(Modifier.height(12.dp))
                        Text(stringResource(R.string.home_greeting), style = MaterialTheme.typography.headlineSmall, fontWeight = FontWeight.Bold)
                        Text(stringResource(R.string.home_supporting), color = MaterialTheme.colorScheme.onSurfaceVariant)
                    }
                    item {
                        Text(
                            "Lessons Completed: ${progress.completedLessons.size} · Answered: ${progress.answeredQuestions}",
                            fontWeight = FontWeight.Medium
                        )
                    }
                    items(viewModel.categories()) { category ->
                        CategoryCard(
                            category = category,
                            progressRatio = progress.categoryPerformance[category.id] ?: 0f,
                            onClick = { navController.navigate("learn") }
                        )
                    }
                }
            }
            composable("learn") {
                LazyColumn(
                    contentPadding = PaddingValues(20.dp),
                    verticalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    item { Text("Road Signs & Learning Modules", style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.Bold) }
                    items(viewModel.roadSigns()) { sign ->
                        RoadSignCard(sign = sign, onClick = {})
                    }
                }
            }
            composable("practice") {
                val questions = remember { viewModel.practiceSet() }
                var idx by remember { mutableIntStateOf(0) }
                var chosen by remember { mutableStateOf<String?>(null) }
                val current = questions[idx]
                Column(modifier = Modifier.padding(20.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
                    QuestionCard(
                        question = current,
                        selectedChoiceId = chosen,
                        revealed = chosen != null,
                        onSelectChoice = {
                            chosen = it
                            viewModel.submitQuestion(current, it)
                        }
                    )
                    if (idx < questions.lastIndex) {
                        PrimaryButton(
                            text = "Next Question",
                            onClick = {
                                idx += 1
                                chosen = null
                            }
                        )
                    }
                }
            }
            composable("mockexam") {
                val remaining by viewModel.mockRemainingSeconds.collectAsState()
                LaunchedEffect(Unit) { viewModel.startMockTimer {} }
                Column(modifier = Modifier.padding(20.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                    Text("Simulated Practice Examination", style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.Bold)
                    Text("Time Remaining: ${remaining / 60}m ${remaining % 60}s")
                    Text(stringResource(R.string.lto_disclaimer), style = MaterialTheme.typography.bodySmall)
                }
            }
            composable("profile") {
                LazyColumn(
                    contentPadding = PaddingValues(20.dp),
                    verticalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    item {
                        Text(
                            "Profile & Offline Settings",
                            style = MaterialTheme.typography.titleLarge,
                            fontWeight = FontWeight.Bold
                        )
                    }
                    item {
                        val dayOptions = listOf(
                            R.string.day_sunday_short to R.string.day_sunday,
                            R.string.day_monday_short to R.string.day_monday,
                            R.string.day_tuesday_short to R.string.day_tuesday,
                            R.string.day_wednesday_short to R.string.day_wednesday,
                            R.string.day_thursday_short to R.string.day_thursday,
                            R.string.day_friday_short to R.string.day_friday,
                            R.string.day_saturday_short to R.string.day_saturday
                        )
                        val repeatSummary = when (settings.reminderDays.size) {
                            0 -> stringResource(R.string.daily_reminder_never)
                            7 -> stringResource(R.string.daily_reminder_every_day)
                            else -> settings.reminderDays
                                .sorted()
                                .joinToString(", ") { context.getString(dayOptions[it].second) }
                        }
                        var showTimeWheel by remember { mutableStateOf(false) }
                        if (showTimeWheel) {
                            AlarmTimeWheelDialog(
                                initialHour = settings.reminderHour,
                                initialMinute = settings.reminderMinute,
                                onDismiss = { showTimeWheel = false },
                                onConfirm = { hour, minute ->
                                    viewModel.updateSettings {
                                        it.copy(reminderHour = hour, reminderMinute = minute)
                                    }
                                    showTimeWheel = false
                                }
                            )
                        }
                        Card {
                            Column(
                                modifier = Modifier.padding(16.dp),
                                verticalArrangement = Arrangement.spacedBy(12.dp)
                            ) {
                                Row(
                                    modifier = Modifier.fillMaxWidth(),
                                    verticalAlignment = Alignment.CenterVertically
                                ) {
                                    Column(modifier = Modifier.weight(1f)) {
                                        Text(
                                            stringResource(R.string.daily_reminder_title),
                                            fontWeight = FontWeight.SemiBold
                                        )
                                        Text(
                                            stringResource(R.string.daily_reminder_description),
                                            style = MaterialTheme.typography.bodySmall,
                                            color = MaterialTheme.colorScheme.onSurfaceVariant
                                        )
                                    }
                                    Switch(
                                        checked = settings.notificationsEnabled,
                                        onCheckedChange = onReminderToggle
                                    )
                                }
                                val reminderCalendar = Calendar.getInstance().apply {
                                    set(Calendar.HOUR_OF_DAY, settings.reminderHour)
                                    set(Calendar.MINUTE, settings.reminderMinute)
                                }
                                val reminderTime = android.text.format.DateFormat
                                    .getTimeFormat(context)
                                    .format(reminderCalendar.time)
                                OutlinedButton(
                                    onClick = { showTimeWheel = true },
                                    modifier = Modifier.fillMaxWidth()
                                ) {
                                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                                        Text(
                                            stringResource(R.string.daily_reminder_time),
                                            style = MaterialTheme.typography.labelSmall
                                        )
                                        Text(
                                            reminderTime,
                                            style = MaterialTheme.typography.headlineSmall,
                                            fontWeight = FontWeight.SemiBold
                                        )
                                    }
                                }
                                Row(
                                    modifier = Modifier
                                        .fillMaxWidth()
                                        .padding(horizontal = 4.dp, vertical = 4.dp),
                                    horizontalArrangement = Arrangement.SpaceBetween
                                ) {
                                    Text(
                                        stringResource(R.string.daily_reminder_repeat),
                                        color = MaterialTheme.colorScheme.onSurfaceVariant
                                    )
                                    Text(
                                        repeatSummary,
                                        fontWeight = FontWeight.Medium
                                    )
                                }
                                HorizontalDivider()
                                Row(
                                    modifier = Modifier.fillMaxWidth(),
                                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                                ) {
                                    dayOptions.forEachIndexed { day, labels ->
                                        val isSelected = day in settings.reminderDays
                                        Surface(
                                            onClick = {
                                                viewModel.updateSettings { current ->
                                                    current.copy(
                                                        reminderDays = if (day in current.reminderDays) {
                                                            current.reminderDays - day
                                                        } else {
                                                            current.reminderDays + day
                                                        }
                                                    )
                                                }
                                            },
                                            modifier = Modifier
                                                .weight(1f)
                                                .aspectRatio(1f)
                                                .semantics {
                                                    contentDescription = context.getString(labels.second)
                                                    selected = isSelected
                                                },
                                            shape = CircleShape,
                                            color = if (isSelected) {
                                                MaterialTheme.colorScheme.primary
                                            } else {
                                                MaterialTheme.colorScheme.surfaceVariant
                                            }
                                        ) {
                                            Box(
                                                modifier = Modifier.fillMaxSize(),
                                                contentAlignment = Alignment.Center
                                            ) {
                                                Text(
                                                    stringResource(labels.first),
                                                    color = if (isSelected) {
                                                        MaterialTheme.colorScheme.onPrimary
                                                    } else {
                                                        MaterialTheme.colorScheme.onSurfaceVariant
                                                    },
                                                    fontWeight = FontWeight.SemiBold
                                                )
                                            }
                                        }
                                    }
                                }
                                if (settings.notificationsEnabled) {
                                    Text(
                                        stringResource(R.string.daily_reminder_permission_note),
                                        style = MaterialTheme.typography.bodySmall,
                                        color = MaterialTheme.colorScheme.onSurfaceVariant
                                    )
                                }
                                if (notificationPermissionDenied) {
                                    Text(
                                        stringResource(R.string.daily_reminder_permission_denied),
                                        style = MaterialTheme.typography.bodySmall,
                                        color = MaterialTheme.colorScheme.error
                                    )
                                }
                            }
                        }
                    }
                    item {
                        SecondaryButton(
                            text = "Replay First-Time Onboarding",
                            onClick = { viewModel.replayOnboarding() }
                        )
                    }
                    item {
                        SecondaryButton(
                            text = "Reset All Local Progress",
                            onClick = { viewModel.resetProgress() }
                        )
                    }
                    item {
                        Text(
                            stringResource(R.string.lto_disclaimer),
                            style = MaterialTheme.typography.bodySmall
                        )
                    }
                }
            }
        }
    }
}
