package com.examora.ltoreviewer.data.repository

import com.examora.ltoreviewer.R
import com.examora.ltoreviewer.data.local.UserPreferencesDataStore
import com.examora.ltoreviewer.data.local.dao.ReviewerDao
import com.examora.ltoreviewer.data.local.entity.*
import com.examora.ltoreviewer.domain.model.*
import com.examora.ltoreviewer.domain.repository.ReviewerRepository
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.map

class ReviewerRepositoryImpl(
    private val dao: ReviewerDao,
    private val prefs: UserPreferencesDataStore
) : ReviewerRepository {

    override val userSettings: Flow<UserSettings> = prefs.settingsFlow

    override val userProgress: Flow<UserProgress> = combine(
        dao.observeCompletedLessons(),
        dao.observeQuestionAttempts()
    ) { completed, attempts ->
        val perfByCategory = attempts.groupBy { it.categoryId }.mapValues { (_, list) ->
            if (list.isEmpty()) 0f else list.count { it.isCorrect }.toFloat() / list.size.toFloat()
        }
        val latestCategory = completed.maxByOrNull { it.completedAtMillis }?.categoryId
            ?: attempts.maxByOrNull { it.answeredAtMillis }?.categoryId
        UserProgress(
            completedLessons = completed.map { it.lessonId }.toSet(),
            answeredQuestions = attempts.size,
            correctAnswers = attempts.count { it.isCorrect },
            categoryPerformance = perfByCategory,
            lastStudiedCategoryId = latestCategory
        )
    }

    override val bookmarks: Flow<List<Bookmark>> = dao.observeBookmarks().map { list ->
        list.map {
            Bookmark(
                id = it.id,
                itemType = BookmarkItemType.valueOf(it.itemType),
                itemId = it.itemId
            )
        }
    }

    override val studySessions: Flow<List<StudySession>> = dao.observeSessions().map { list ->
        list.map {
            StudySession(
                id = it.id,
                dateEpochMillis = it.dateEpochMillis,
                questionsAnswered = it.questionsAnswered,
                correctAnswers = it.correctAnswers,
                durationSeconds = it.durationSeconds
            )
        }
    }

    override fun getCategories(language: AppLanguage): List<Category> = listOf(
        Category("cat_1", "Licensing Information", "Student permit, DL codes, and RA 10930 validity", "badge", listOf("Classifications", "Student Permit", "NPDL & PDL")),
        Category("cat_2", "Getting Ready to Drive", "BLOWBAGETS inspection, seatbelts, and child safety", "shield", listOf("BLOWBAGETS", "Driver Readiness", "RA 8750 & RA 11229")),
        Category("cat_3", "Driving Fundamentals", "Speed management, 3-second rule, overtaking, and parking", "compass", listOf("Speed Limits", "Following Distance", "Overtaking & Parking")),
        Category("cat_4", "Road Courtesy and Safety", "Pedestrians, motorcycles, passenger safety, and emergencies", "safety", listOf("Pedestrians", "RA 10054 & RA 10666", "Blowouts")),
        Category("cat_5", "Rights, Duties and Responsibilities", "Right of way at intersections, rotundas, and emergency vehicles", "scale", listOf("Right of Way", "Rotundas", "Emergency Vehicles")),
        Category("cat_6", "Motor Vehicle Registration", "OR/CR documents, plate renewal schedules, and CTPL", "document", listOf("OR/CR", "Plate Ending Schedule", "CTPL")),
        Category("cat_7", "Land Transportation Laws", "RA 4136, RA 10913 Anti-Distracted, and RA 10586 Anti-Drunk Driving", "law", listOf("RA 4136", "RA 10913", "RA 10586")),
        Category("cat_8", "Fines and Penalties", "Demerit point system, apprehensions, and crash duties", "gavel", listOf("Demerit Points", "RA 4136 Sec. 55", "Compliance"))
    )

    override fun getLessonsByCategory(categoryId: String, language: AppLanguage): List<Lesson> =
        listOf(
            Lesson(
                id = "${categoryId}_lesson_1",
                title = "Core Principles & Verified LTO Rules",
                categoryId = categoryId,
                content = "Structured offline lesson grounded in RA 4136, RA 10930, and the LTO Driver's Manual.",
                objectives = listOf("Apply safe Philippine road practices", "Comply with verified statutory requirements"),
                sourceReferences = listOf("RA 4136", "LTO Driver's Manual"),
                illustrationResName = "blowbagets"
            )
        )

    override fun getRoadSigns(language: AppLanguage): List<RoadSign> = listOf(
        RoadSign("stop", "Stop Sign", RoadSignCategory.REGULATORY, R.drawable.reg_stop, "Come to a complete stop.", "Stop behind the stop line and yield to cross traffic and pedestrians.", "Approaching a major highway intersection.", "DPWH R1-1"),
        RoadSign("give_way", "Give Way", RoadSignCategory.REGULATORY, R.drawable.reg_give_way, "Yield priority to intersecting or roundabout traffic.", "Slow down and stop if needed for vehicles on the priority road.", "Entering a rotunda.", "DPWH R1-2"),
        RoadSign("pedestrian", "Pedestrian Crossing Ahead", RoadSignCategory.WARNING, R.drawable.warn_pedestrian, "Marked pedestrian crossing ahead.", "Reduce speed and prepare to stop for pedestrians.", "Approaching public schools and markets.", "DPWH W6-1"),
        RoadSign("hospital", "Hospital Service Zone", RoadSignCategory.GUIDE_INFORMATIONAL, R.drawable.guide_hospital, "Medical emergency facility nearby; quiet zone.", "Avoid horn blowing and keep emergency driveways clear.", "Hospital frontage.", "DPWH S1-2"),
        RoadSign("yellow_box", "Yellow Box Junction", RoadSignCategory.PAVEMENT_MARKINGS, R.drawable.mark_yellow_box, "Do not block intersection.", "Do not enter even on green unless your exit lane is completely clear.", "Major city intersections.", "DPWH Pavement Manual"),
        RoadSign("red_signal", "Steady & Flashing Red Signal", RoadSignCategory.TRAFFIC_SIGNALS, R.drawable.sig_steady_red, "Full stop required.", "Wait for green on steady red; treat flashing red as a STOP sign.", "Signalized crossroads.", "LTO Manual")
    )

    override fun getQuestions(language: AppLanguage): List<Question> = listOf(
        Question(
            id = "q_1",
            question = "When is a Student Permit holder legally allowed to drive on a public road?",
            categoryId = "cat_1",
            topicId = "sp_rules",
            choices = listOf(
                QuestionChoice("a", "When driving alone during daytime"),
                QuestionChoice("b", "When accompanied by a duly licensed driver holding the proper DL code"),
                QuestionChoice("c", "Immediately after finishing TDC without a companion"),
                QuestionChoice("d", "On barangay roads only")
            ),
            correctAnswerId = "b",
            explanation = "RA 4136 Sec. 30 requires a Student Permit holder to be accompanied by a duly licensed driver authorized for that vehicle category.",
            difficulty = "Easy",
            sourceReference = "RA 4136 Sec. 30",
            lastVerified = "2026-03-15"
        ),
        Question(
            id = "q_2",
            question = "Two vehicles arrive at an uncontrolled intersection at the exact same time. Which driver must yield?",
            categoryId = "cat_5",
            topicId = "right_of_way",
            choices = listOf(
                QuestionChoice("a", "The driver on the right yields to the left"),
                QuestionChoice("b", "The driver on the left yields to the vehicle on the right"),
                QuestionChoice("c", "The smaller vehicle always yields"),
                QuestionChoice("d", "Whoever honks first has priority")
            ),
            correctAnswerId = "b",
            explanation = "Under RA 4136 Sec. 42(a), the driver on the left shall yield the right of way to the vehicle on the right.",
            difficulty = "Medium",
            sourceReference = "RA 4136 Sec. 42(a)",
            lastVerified = "2026-03-15"
        )
    )

    override suspend fun completeOnboarding(
        language: AppLanguage,
        track: PreparationTrack,
        displayName: String
    ) {
        val current = prefs.settingsFlow.first()
        prefs.saveSettings(
            current.copy(
                onboardingCompleted = true,
                language = language,
                preparationTrack = track,
                displayName = displayName.trim()
            )
        )
    }

    override suspend fun setReplayOnboarding() {
        val current = prefs.settingsFlow.first()
        prefs.saveSettings(current.copy(onboardingCompleted = false))
    }

    override suspend fun updateSettings(transform: (UserSettings) -> UserSettings) {
        val current = prefs.settingsFlow.first()
        prefs.saveSettings(transform(current))
    }

    override suspend fun toggleLessonCompleted(lessonId: String, categoryId: String) {
        if (dao.isLessonCompleted(lessonId)) {
            dao.deleteCompletedLesson(lessonId)
        } else {
            dao.insertCompletedLesson(
                CompletedLessonEntity(lessonId, categoryId, System.currentTimeMillis())
            )
        }
    }

    override suspend fun recordQuestionAnswer(
        questionId: String,
        categoryId: String,
        isCorrect: Boolean
    ) {
        dao.upsertQuestionAttempt(
            QuestionAttemptEntity(questionId, categoryId, isCorrect, System.currentTimeMillis())
        )
    }

    override suspend fun toggleBookmark(itemType: BookmarkItemType, itemId: String) {
        val existing = dao.findBookmark(itemType.name, itemId)
        if (existing != null) {
            dao.deleteBookmarkById(existing.id)
        } else {
            dao.insertBookmark(
                BookmarkEntity(
                    itemType = itemType.name,
                    itemId = itemId,
                    createdAtMillis = System.currentTimeMillis()
                )
            )
        }
    }

    override suspend fun savePersonalNote(title: String, body: String) {
        dao.upsertNote(
            PersonalNoteEntity(
                title = title,
                content = body,
                updatedAtMillis = System.currentTimeMillis()
            )
        )
    }

    override suspend fun recordStudySession(
        questionsAnswered: Int,
        correctAnswers: Int,
        durationSeconds: Long
    ) {
        dao.insertSession(
            StudySessionEntity(
                dateEpochMillis = System.currentTimeMillis(),
                questionsAnswered = questionsAnswered,
                correctAnswers = correctAnswers,
                durationSeconds = durationSeconds
            )
        )
    }

    override suspend fun resetAllProgress() {
        dao.clearAllUserProgress()
    }
}
