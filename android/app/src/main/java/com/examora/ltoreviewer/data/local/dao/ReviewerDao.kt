package com.examora.ltoreviewer.data.local.dao

import androidx.room.*
import com.examora.ltoreviewer.data.local.entity.*
import kotlinx.coroutines.flow.Flow

@Dao
interface ReviewerDao {
    @Query("SELECT * FROM completed_lessons")
    fun observeCompletedLessons(): Flow<List<CompletedLessonEntity>>

    @Query("SELECT EXISTS(SELECT 1 FROM completed_lessons WHERE lessonId = :lessonId)")
    suspend fun isLessonCompleted(lessonId: String): Boolean

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertCompletedLesson(entity: CompletedLessonEntity)

    @Query("DELETE FROM completed_lessons WHERE lessonId = :lessonId")
    suspend fun deleteCompletedLesson(lessonId: String)

    @Query("SELECT * FROM question_attempts")
    fun observeQuestionAttempts(): Flow<List<QuestionAttemptEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun upsertQuestionAttempt(entity: QuestionAttemptEntity)

    @Query("SELECT * FROM bookmarks ORDER BY createdAtMillis DESC")
    fun observeBookmarks(): Flow<List<BookmarkEntity>>

    @Query("SELECT * FROM bookmarks WHERE itemType = :type AND itemId = :itemId LIMIT 1")
    suspend fun findBookmark(type: String, itemId: String): BookmarkEntity?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertBookmark(entity: BookmarkEntity)

    @Query("DELETE FROM bookmarks WHERE id = :id")
    suspend fun deleteBookmarkById(id: Long)

    @Query("SELECT * FROM personal_notes ORDER BY updatedAtMillis DESC")
    fun observeNotes(): Flow<List<PersonalNoteEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun upsertNote(note: PersonalNoteEntity)

    @Query("SELECT * FROM study_sessions ORDER BY dateEpochMillis DESC")
    fun observeSessions(): Flow<List<StudySessionEntity>>

    @Insert
    suspend fun insertSession(session: StudySessionEntity)

    @Transaction
    suspend fun clearAllUserProgress() {
        clearLessons()
        clearAttempts()
        clearBookmarks()
        clearNotes()
        clearSessions()
    }

    @Query("DELETE FROM completed_lessons")
    suspend fun clearLessons()

    @Query("DELETE FROM question_attempts")
    suspend fun clearAttempts()

    @Query("DELETE FROM bookmarks")
    suspend fun clearBookmarks()

    @Query("DELETE FROM personal_notes")
    suspend fun clearNotes()

    @Query("DELETE FROM study_sessions")
    suspend fun clearSessions()
}
