package com.examora.ltoreviewer.domain.repository

import com.examora.ltoreviewer.domain.model.*
import kotlinx.coroutines.flow.Flow

interface ReviewerRepository {
    val userSettings: Flow<UserSettings>
    val userProgress: Flow<UserProgress>
    val bookmarks: Flow<List<Bookmark>>
    val studySessions: Flow<List<StudySession>>

    fun getCategories(language: AppLanguage): List<Category>
    fun getLessonsByCategory(categoryId: String, language: AppLanguage): List<Lesson>
    fun getRoadSigns(language: AppLanguage): List<RoadSign>
    fun getQuestions(language: AppLanguage): List<Question>

    suspend fun completeOnboarding(language: AppLanguage, track: PreparationTrack, displayName: String)
    suspend fun setReplayOnboarding()
    suspend fun updateSettings(transform: (UserSettings) -> UserSettings)
    suspend fun toggleLessonCompleted(lessonId: String, categoryId: String)
    suspend fun recordQuestionAnswer(questionId: String, categoryId: String, isCorrect: Boolean)
    suspend fun toggleBookmark(itemType: BookmarkItemType, itemId: String)
    suspend fun savePersonalNote(title: String, body: String)
    suspend fun recordStudySession(questionsAnswered: Int, correctAnswers: Int, durationSeconds: Long)
    suspend fun resetAllProgress()
}
