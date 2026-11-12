package com.examora.ltoreviewer.data.local.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "completed_lessons")
data class CompletedLessonEntity(
    @PrimaryKey val lessonId: String,
    val categoryId: String,
    val completedAtMillis: Long
)

@Entity(tableName = "question_attempts")
data class QuestionAttemptEntity(
    @PrimaryKey val questionId: String,
    val categoryId: String,
    val isCorrect: Boolean,
    val answeredAtMillis: Long
)

@Entity(tableName = "bookmarks")
data class BookmarkEntity(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val itemType: String,
    val itemId: String,
    val createdAtMillis: Long
)

@Entity(tableName = "personal_notes")
data class PersonalNoteEntity(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val title: String,
    val content: String,
    val updatedAtMillis: Long
)

@Entity(tableName = "study_sessions")
data class StudySessionEntity(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val dateEpochMillis: Long,
    val questionsAnswered: Int,
    val correctAnswers: Int,
    val durationSeconds: Long
)
