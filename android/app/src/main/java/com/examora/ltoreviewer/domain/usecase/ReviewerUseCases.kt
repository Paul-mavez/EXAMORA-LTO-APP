package com.examora.ltoreviewer.domain.usecase

import com.examora.ltoreviewer.domain.model.Question
import com.examora.ltoreviewer.domain.repository.ReviewerRepository

class GeneratePracticeSessionUseCase(private val repository: ReviewerRepository) {
    operator fun invoke(
        language: com.examora.ltoreviewer.domain.model.AppLanguage,
        categoryId: String? = null,
        limit: Int = 10
    ): List<Question> {
        val pool = repository.getQuestions(language)
        val filtered = if (categoryId != null) pool.filter { it.categoryId == categoryId } else pool
        return filtered.shuffled().take(limit)
    }
}

class ScoreMockExamUseCase {
    data class ExamScoreResult(
        val totalQuestions: Int,
        val correctAnswers: Int,
        val incorrectAnswers: Int,
        val unansweredQuestions: Int,
        val scorePercentage: Int
    )

    operator fun invoke(
        questions: List<Question>,
        selectedAnswers: Map<String, String>
    ): ExamScoreResult {
        var correct = 0
        var incorrect = 0
        var unanswered = 0
        questions.forEach { q ->
            val selected = selectedAnswers[q.id]
            when {
                selected == null -> unanswered++
                selected == q.correctAnswerId -> correct++
                else -> incorrect++
            }
        }
        val pct = if (questions.isNotEmpty()) ((correct * 100f) / questions.size).toInt() else 0
        return ExamScoreResult(
            totalQuestions = questions.size,
            correctAnswers = correct,
            incorrectAnswers = incorrect,
            unansweredQuestions = unanswered,
            scorePercentage = pct
        )
    }
}
