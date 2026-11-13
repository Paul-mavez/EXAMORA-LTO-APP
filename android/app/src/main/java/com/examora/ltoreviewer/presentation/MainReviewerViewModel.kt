package com.examora.ltoreviewer.presentation

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.examora.ltoreviewer.domain.model.*
import com.examora.ltoreviewer.domain.repository.ReviewerRepository
import com.examora.ltoreviewer.domain.usecase.GeneratePracticeSessionUseCase
import com.examora.ltoreviewer.domain.usecase.ScoreMockExamUseCase
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch

class MainReviewerViewModel(
    private val repository: ReviewerRepository,
    private val generatePractice: GeneratePracticeSessionUseCase = GeneratePracticeSessionUseCase(repository),
    private val scoreMockExam: ScoreMockExamUseCase = ScoreMockExamUseCase()
) : ViewModel() {

    val settings: StateFlow<UserSettings> = repository.userSettings.stateIn(
        viewModelScope,
        SharingStarted.WhileSubscribed(5_000),
        UserSettings()
    )

    val progress: StateFlow<UserProgress> = repository.userProgress.stateIn(
        viewModelScope,
        SharingStarted.WhileSubscribed(5_000),
        UserProgress(emptySet(), 0, 0, emptyMap(), null)
    )

    private val _mockRemainingSeconds = MutableStateFlow(1200)
    val mockRemainingSeconds: StateFlow<Int> = _mockRemainingSeconds.asStateFlow()
    private var timerJob: Job? = null

    fun categories(): List<Category> = repository.getCategories(settings.value.language)
    fun roadSigns(): List<RoadSign> = repository.getRoadSigns(settings.value.language)
    fun practiceSet(categoryId: String? = null): List<Question> =
        generatePractice(settings.value.language, categoryId)

    fun finishOnboarding(lang: AppLanguage, track: PreparationTrack, name: String) {
        viewModelScope.launch {
            repository.completeOnboarding(lang, track, name)
        }
    }

    fun replayOnboarding() {
        viewModelScope.launch { repository.setReplayOnboarding() }
    }

    fun updateSettings(transform: (UserSettings) -> UserSettings) {
        viewModelScope.launch { repository.updateSettings(transform) }
    }

    fun submitQuestion(question: Question, selectedChoiceId: String) {
        viewModelScope.launch {
            repository.recordQuestionAnswer(
                question.id,
                question.categoryId,
                question.correctAnswerId == selectedChoiceId
            )
        }
    }

    fun toggleLessonComplete(lessonId: String, categoryId: String) {
        viewModelScope.launch { repository.toggleLessonCompleted(lessonId, categoryId) }
    }

    fun startMockTimer(durationSeconds: Int = 1200, onExpired: () -> Unit) {
        timerJob?.cancel()
        _mockRemainingSeconds.value = durationSeconds
        timerJob = viewModelScope.launch {
            while (_mockRemainingSeconds.value > 0) {
                delay(1_000L)
                _mockRemainingSeconds.value -= 1
            }
            onExpired()
        }
    }

    fun evaluateMockExam(questions: List<Question>, answers: Map<String, String>) =
        scoreMockExam(questions, answers).also { result ->
            timerJob?.cancel()
            viewModelScope.launch {
                repository.recordStudySession(
                    questionsAnswered = result.correctAnswers + result.incorrectAnswers,
                    correctAnswers = result.correctAnswers,
                    durationSeconds = (1200 - _mockRemainingSeconds.value).toLong().coerceAtLeast(5L)
                )
            }
        }

    fun resetProgress() {
        viewModelScope.launch { repository.resetAllProgress() }
    }
}
