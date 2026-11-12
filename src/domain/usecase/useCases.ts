import { TRACK_PRIORITY_CATEGORIES } from '../../data/local/mockExamConfig';
import {
  Bookmark,
  Category,
  CategoryPerformance,
  DifficultyLevel,
  Lesson,
  PracticeMode,
  PreparationTrack,
  Question,
  StudySession,
  UserProgress,
} from '../model/models';

export interface DashboardMetrics {
  overallCompletionPercent: number;
  completedLessonsCount: number;
  totalLessonsCount: number;
  answeredQuestionsCount: number;
  totalQuestionsCount: number;
  correctAnswersCount: number;
  correctRatePercent: number;
  questionsAnsweredToday: number;
  activeStudyDaysCount: number;
  categoryPerformances: CategoryPerformance[];
  weakestCategories: { category: Category; accuracy: number; answered: number }[];
  recommendedTopics: { category: Category; reason: 'WEAK' | 'NEXT_IN_TRACK'; accuracy?: number }[];
  continueCategory: Category;
  continueCategoryProgressPercent: number;
}

function getLocalDayKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function shuffleArray<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function calculateDashboardMetrics(
  categories: Category[],
  lessons: Lesson[],
  questions: Question[],
  progress: UserProgress,
  sessions: StudySession[],
  track: PreparationTrack,
): DashboardMetrics {
  const completedLessonsCount = progress.completedLessons.length;
  const totalLessonsCount = lessons.length;

  const attempts = Object.values(progress.answeredQuestions);
  const answeredQuestionsCount = attempts.length;
  const totalQuestionsCount = questions.length;
  const correctAnswersCount = attempts.filter((a) => a.isCorrect).length;
  const correctRatePercent =
    answeredQuestionsCount > 0 ? Math.round((correctAnswersCount / answeredQuestionsCount) * 100) : 0;

  // Overall completion combines lesson completion (50%) and unique question bank coverage (50%)
  const lessonRatio = totalLessonsCount > 0 ? completedLessonsCount / totalLessonsCount : 0;
  const questionRatio = totalQuestionsCount > 0 ? answeredQuestionsCount / totalQuestionsCount : 0;
  const overallCompletionPercent = Math.round(((lessonRatio + questionRatio) / 2) * 100);

  const todayKey = getLocalDayKey();
  const questionsAnsweredToday = sessions
    .filter((s) => s.dayKey === todayKey)
    .reduce((sum, s) => sum + s.questionsAnswered, 0);

  const uniqueStudyDays = new Set(sessions.map((s) => s.dayKey));
  const activeStudyDaysCount = uniqueStudyDays.size;

  const categoryPerformances: CategoryPerformance[] = categories.map((cat) => {
    const catAttempts = attempts.filter((a) => a.categoryId === cat.id);
    const answered = catAttempts.length;
    const correct = catAttempts.filter((a) => a.isCorrect).length;
    const accuracy = answered > 0 ? Math.round((correct / answered) * 100) : 0;
    return {
      categoryId: cat.id,
      answered,
      correct,
      accuracy,
    };
  });

  const weakestCategories = categoryPerformances
    .filter((cp) => cp.answered > 0 && cp.accuracy < 80)
    .sort((a, b) => a.accuracy - b.accuracy)
    .map((cp) => ({
      category: categories.find((c) => c.id === cp.categoryId)!,
      accuracy: cp.accuracy,
      answered: cp.answered,
    }))
    .filter((item) => Boolean(item.category));

  const recommendedTopics: { category: Category; reason: 'WEAK' | 'NEXT_IN_TRACK'; accuracy?: number }[] = [];
  for (const weak of weakestCategories.slice(0, 2)) {
    recommendedTopics.push({
      category: weak.category,
      reason: 'WEAK',
      accuracy: weak.accuracy,
    });
  }

  const priorityCatIds = TRACK_PRIORITY_CATEGORIES[track] || categories.map((c) => c.id);
  for (const catId of priorityCatIds) {
    if (recommendedTopics.length >= 3) break;
    if (recommendedTopics.some((r) => r.category.id === catId)) continue;
    const catLessons = lessons.filter((l) => l.categoryId === catId);
    const allDone = catLessons.every((l) => progress.completedLessons.includes(l.id));
    if (!allDone) {
      const cat = categories.find((c) => c.id === catId);
      if (cat) {
        recommendedTopics.push({ category: cat, reason: 'NEXT_IN_TRACK' });
      }
    }
  }

  const fallbackCat = categories.find((c) => c.id === priorityCatIds[0]) || categories[0];
  const continueCategory =
    categories.find((c) => c.id === progress.lastStudiedCategoryId) || fallbackCat;
  const continueCatLessons = lessons.filter((l) => l.categoryId === continueCategory.id);
  const continueDone = continueCatLessons.filter((l) => progress.completedLessons.includes(l.id)).length;
  const continueCategoryProgressPercent =
    continueCatLessons.length > 0 ? Math.round((continueDone / continueCatLessons.length) * 100) : 0;

  return {
    overallCompletionPercent,
    completedLessonsCount,
    totalLessonsCount,
    answeredQuestionsCount,
    totalQuestionsCount,
    correctAnswersCount,
    correctRatePercent,
    questionsAnsweredToday,
    activeStudyDaysCount,
    categoryPerformances,
    weakestCategories,
    recommendedTopics,
    continueCategory,
    continueCategoryProgressPercent,
  };
}

export function generatePracticeSet(params: {
  mode: PracticeMode;
  allQuestions: Question[];
  track: PreparationTrack;
  categoryId?: string;
  count: number;
  progress: UserProgress;
  bookmarks: Bookmark[];
  categoryPerformances: CategoryPerformance[];
}): Question[] {
  const { mode, allQuestions, track, categoryId, count, progress, bookmarks, categoryPerformances } = params;

  if (mode === 'CATEGORY' && categoryId) {
    return shuffleArray(allQuestions.filter((q) => q.categoryId === categoryId)).slice(0, count);
  }

  if (mode === 'BOOKMARKED') {
    const bookmarkedIds = new Set(
      bookmarks.filter((b) => b.itemType === 'QUESTION').map((b) => b.itemId),
    );
    return allQuestions.filter((q) => bookmarkedIds.has(q.id));
  }

  if (mode === 'MISTAKES') {
    const mistakeSet = new Set(progress.incorrectQuestionIds);
    return shuffleArray(allQuestions.filter((q) => mistakeSet.has(q.id)));
  }

  if (mode === 'WEAK_AREAS') {
    const weakCatIds = categoryPerformances
      .filter((cp) => cp.answered > 0 && cp.accuracy < 80)
      .sort((a, b) => a.accuracy - b.accuracy)
      .map((cp) => cp.categoryId);

    const missedIds = new Set(progress.incorrectQuestionIds);
    const prioritized = allQuestions.filter(
      (q) => missedIds.has(q.id) || weakCatIds.includes(q.categoryId),
    );
    if (prioritized.length > 0) {
      return shuffleArray(prioritized).slice(0, count);
    }
    // Fallback to unanswered track questions if user has no weak areas yet
    const unanswered = allQuestions.filter(
      (q) => q.eligibleTracks.includes(track) && !progress.answeredQuestions[q.id],
    );
    return shuffleArray(unanswered.length > 0 ? unanswered : allQuestions).slice(0, count);
  }

  // RANDOM mode prioritized by user track
  const eligible = allQuestions.filter((q) => q.eligibleTracks.includes(track));
  const pool = eligible.length >= count ? eligible : allQuestions;
  return shuffleArray(pool).slice(0, count);
}

export function generateMockExamSet(params: {
  allQuestions: Question[];
  track: PreparationTrack;
  difficulty: 'ALL' | DifficultyLevel;
  questionCount: number;
}): Question[] {
  const { allQuestions, track, difficulty, questionCount } = params;
  let pool = allQuestions.filter((q) => q.eligibleTracks.includes(track));
  if (difficulty !== 'ALL') {
    const diffFiltered = pool.filter((q) => q.difficulty === difficulty);
    pool = diffFiltered.length >= Math.min(10, questionCount) ? diffFiltered : allQuestions.filter((q) => q.difficulty === difficulty);
  }
  if (pool.length < questionCount) {
    const existingIds = new Set(pool.map((q) => q.id));
    const extras = shuffleArray(allQuestions.filter((q) => !existingIds.has(q.id)));
    pool = [...pool, ...extras];
  }
  return shuffleArray(pool).slice(0, questionCount);
}

export function playSubtleFeedbackTone(isCorrect: boolean, enabled: boolean): void {
  if (!enabled || typeof window === 'undefined') return;
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(isCorrect ? 587.33 : 261.63, ctx.currentTime);
    if (isCorrect) {
      osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.11);
    }
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.17);
    setTimeout(() => {
      ctx.close().catch(() => {});
    }, 250);
  } catch {
    // Audio feedback is strictly optional
  }
}
