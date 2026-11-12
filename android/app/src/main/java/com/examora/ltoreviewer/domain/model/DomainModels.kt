package com.examora.ltoreviewer.domain.model

enum class PreparationTrack {
    STUDENT_PERMIT,
    NON_PROFESSIONAL,
    PROFESSIONAL
}

enum class AppLanguage(val code: String) {
    ENGLISH("en"),
    FILIPINO("tl")
}

enum class RoadSignCategory {
    REGULATORY,
    WARNING,
    GUIDE_INFORMATIONAL,
    PAVEMENT_MARKINGS,
    TRAFFIC_SIGNALS
}

enum class BookmarkItemType {
    LESSON,
    QUESTION,
    ROAD_SIGN
}

data class QuestionChoice(
    val id: String,
    val text: String
)

data class Question(
    val id: String,
    val question: String,
    val categoryId: String,
    val topicId: String,
    val choices: List<QuestionChoice>,
    val correctAnswerId: String,
    val explanation: String,
    val difficulty: String,
    val sourceReference: String,
    val lastVerified: String,
    val imageResName: String? = null
)

data class Category(
    val id: String,
    val title: String,
    val description: String,
    val icon: String,
    val topics: List<String>
)

data class Lesson(
    val id: String,
    val title: String,
    val categoryId: String,
    val content: String,
    val objectives: List<String>,
    val sourceReferences: List<String>,
    val illustrationResName: String? = null
)

data class RoadSign(
    val id: String,
    val name: String,
    val category: RoadSignCategory,
    val imageResource: Int,
    val meaning: String,
    val requiredAction: String,
    val exampleSituation: String,
    val sourceReference: String
)

data class UserProgress(
    val completedLessons: Set<String>,
    val answeredQuestions: Int,
    val correctAnswers: Int,
    val categoryPerformance: Map<String, Float>,
    val lastStudiedCategoryId: String?
)

data class Bookmark(
    val id: Long = 0,
    val itemType: BookmarkItemType,
    val itemId: String
)

data class StudySession(
    val id: Long = 0,
    val dateEpochMillis: Long,
    val questionsAnswered: Int,
    val correctAnswers: Int,
    val durationSeconds: Long
)

data class UserSettings(
    val onboardingCompleted: Boolean = false,
    val language: AppLanguage = AppLanguage.ENGLISH,
    val preparationTrack: PreparationTrack = PreparationTrack.NON_PROFESSIONAL,
    val displayName: String = "",
    val dailyGoal: Int = 20,
    val darkTheme: Boolean? = null,
    val notificationsEnabled: Boolean = true,
    val soundEnabled: Boolean = true
)
