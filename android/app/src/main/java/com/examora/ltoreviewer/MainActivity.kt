package com.examora.ltoreviewer

import android.app.Application
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.examora.ltoreviewer.data.local.ExamoraDatabase
import com.examora.ltoreviewer.data.local.UserPreferencesDataStore
import com.examora.ltoreviewer.data.repository.ReviewerRepositoryImpl
import com.examora.ltoreviewer.domain.model.AppLanguage
import com.examora.ltoreviewer.domain.model.PreparationTrack
import com.examora.ltoreviewer.presentation.MainReviewerViewModel
import com.examora.ltoreviewer.ui.components.*
import com.examora.ltoreviewer.ui.theme.ExamoraTheme

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
            ExamoraTheme(darkThemeOverride = settings.darkTheme) {
                if (!settings.onboardingCompleted) {
                    OnboardingFlow(
                        onComplete = { lang, track, name ->
                            viewModel.finishOnboarding(lang, track, name)
                        }
                    )
                } else {
                    MainReviewerScaffold(viewModel = viewModel)
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
private fun MainReviewerScaffold(viewModel: MainReviewerViewModel) {
    val navController = rememberNavController()
    val backStack by navController.currentBackStackEntryAsState()
    val currentRoute = backStack?.destination?.route ?: "home"
    val progress by viewModel.progress.collectAsState()

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
                Column(modifier = Modifier.padding(20.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                    Text("Profile & Offline Settings", style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.Bold)
                    SecondaryButton(text = "Replay First-Time Onboarding", onClick = { viewModel.replayOnboarding() })
                    SecondaryButton(text = "Reset All Local Progress", onClick = { viewModel.resetProgress() })
                    Text(stringResource(R.string.lto_disclaimer), style = MaterialTheme.typography.bodySmall)
                }
            }
        }
    }
}
