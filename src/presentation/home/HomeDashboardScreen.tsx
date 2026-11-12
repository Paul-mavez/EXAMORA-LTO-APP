import React from 'react';
import {
  ArrowRight,
  BarChart3,
  Bookmark,
  ClipboardCheck,
  Compass,
  RotateCcw,
  Target,
  UserCircle2,
} from 'lucide-react';
import {
  PrimaryButton,
  ProgressIndicator,
  SafePngImage,
  SecondaryButton,
} from '../../ui/components/ExamoraComponents';
import { useExamoraViewModel } from '../state/ExamoraContext';

export const HomeDashboardScreen: React.FC = () => {
  const {
    preferences,
    t,
    loc,
    metrics,
    progress,
    navigateTab,
  } = useExamoraViewModel();

  const dailyGoalPct =
    preferences.dailyGoalQuestions > 0
      ? Math.min(100, Math.round((metrics.questionsAnsweredToday / preferences.dailyGoalQuestions) * 100))
      : 0;

  const trackInfo = t.tracks[preferences.preparationTrack];
  const hasStartedLearning =
    metrics.completedLessonsCount > 0 ||
    metrics.answeredQuestionsCount > 0 ||
    Boolean(progress.lastStudiedCategoryId);

  return (
    <div className="space-y-8">
      {/* Hero / Top Greeting Section */}
      <section className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D]">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-3.5">
            <SafePngImage
              src="/assets/png/examora_logo.png"
              alt="Examora - LTO reviewer"
              className="w-12 h-12 rounded-2xl object-contain shrink-0"
            />
            <div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-[#667085] dark:text-[#98A2B3]">
                <span className="font-semibold text-[#D8A43B]">{t.brandParent}</span>
                <span aria-hidden="true">·</span>
                <span>{trackInfo.short}</span>
                {preferences.displayName && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>
                      {t.home.greetingNamed}, {preferences.displayName}
                    </span>
                  </>
                )}
              </div>
              <p className="text-sm font-medium text-[#14243A] dark:text-[#F4F6F9]">
                {t.appName}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigateTab('PROFILE')}
            aria-label="Open Profile and Settings"
            className="min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center text-[#14243A] dark:text-[#F4F6F9] bg-[#FAF9F6] dark:bg-[#1C2C46] hover:bg-[#E9EBEF] dark:hover:bg-[#24344D] transition-colors shrink-0"
          >
            <UserCircle2 className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-8">
            <h1
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#14243A] dark:text-[#F4F6F9] leading-tight mb-2"
              style={{ textWrap: 'balance' }}
            >
              {t.home.mainGreeting}
            </h1>
            <p className="text-base text-[#667085] dark:text-[#98A2B3]">
              {t.home.supportingText}
            </p>
          </div>

          {/* Dominant Focal CTA: Continue Learning */}
          <div className="lg:col-span-4 flex lg:justify-end">
            <PrimaryButton
              onClick={() =>
                navigateTab('LEARN', {
                  type: 'CATEGORY_DETAIL',
                  categoryId: metrics.continueCategory.id,
                })
              }
              fullWidth
              className="lg:w-auto"
            >
              {hasStartedLearning ? t.home.continueBtn : t.home.startFirstLesson}
              <ArrowRight className="w-4 h-4" />
            </PrimaryButton>
          </div>
        </div>
      </section>

      {/* Section A: Study Progress KPI Strip (100% Real Local User Activity) */}
      <section aria-labelledby="study-progress-heading">
        <div className="flex items-center justify-between gap-4 mb-3">
          <h2
            id="study-progress-heading"
            className="font-display text-lg font-bold text-[#14243A] dark:text-[#F4F6F9]"
          >
            {t.home.studyProgress}
          </h2>
          <button
            type="button"
            onClick={() => navigateTab('PROFILE', { type: 'PROGRESS_ANALYTICS' })}
            className="text-xs font-medium text-[#14243A] dark:text-[#D8A43B] hover:underline inline-flex items-center gap-1 whitespace-nowrap"
          >
            <BarChart3 className="w-3.5 h-3.5" />
            {t.home.viewProgressAnalytics}
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D]">
            <p className="text-xs text-[#667085] dark:text-[#98A2B3] mb-1">
              {t.home.overallCompletion}
            </p>
            <p className="text-2xl sm:text-3xl font-bold font-mono-tabular text-[#14243A] dark:text-[#F4F6F9] mb-3">
              {metrics.overallCompletionPercent}%
            </p>
            <ProgressIndicator value={metrics.overallCompletionPercent} tone="gold" />
          </div>

          <div className="p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D]">
            <p className="text-xs text-[#667085] dark:text-[#98A2B3] mb-1">
              {t.home.lessonsCompleted}
            </p>
            <p className="text-2xl sm:text-3xl font-bold font-mono-tabular text-[#14243A] dark:text-[#F4F6F9]">
              {metrics.completedLessonsCount}
              <span className="text-sm font-normal text-[#667085] dark:text-[#98A2B3]">
                {' '}
                / {metrics.totalLessonsCount}
              </span>
            </p>
            <p className="text-xs text-[#667085] dark:text-[#98A2B3] mt-2">
              8 curriculum categories
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D]">
            <p className="text-xs text-[#667085] dark:text-[#98A2B3] mb-1">
              {t.home.questionsAnswered}
            </p>
            <p className="text-2xl sm:text-3xl font-bold font-mono-tabular text-[#14243A] dark:text-[#F4F6F9]">
              {metrics.answeredQuestionsCount}
              <span className="text-sm font-normal text-[#667085] dark:text-[#98A2B3]">
                {' '}
                / {metrics.totalQuestionsCount}
              </span>
            </p>
            <p className="text-xs text-[#667085] dark:text-[#98A2B3] mt-2">
              Unique items practiced
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D]">
            <p className="text-xs text-[#667085] dark:text-[#98A2B3] mb-1">
              {t.home.correctRate}
            </p>
            <p className="text-2xl sm:text-3xl font-bold font-mono-tabular text-[#32845A]">
              {metrics.correctRatePercent}%
            </p>
            <p className="text-xs text-[#667085] dark:text-[#98A2B3] mt-2 font-mono-tabular">
              {metrics.correctAnswersCount} correct answers
            </p>
          </div>
        </div>
      </section>

      {/* Two-Column Split: Continue Learning + Daily Learning Goal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Section B: Continue Learning */}
        <section className="lg:col-span-7 p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D] flex flex-col justify-between gap-5">
          <div>
            <div className="flex items-center justify-between gap-2 text-xs text-[#667085] dark:text-[#98A2B3] mb-2">
              <span className="font-semibold text-[#14243A] dark:text-[#D8A43B]">
                {t.home.continueLearning}
              </span>
              <span className="font-mono-tabular">
                Module {metrics.continueCategory.number}
              </span>
            </div>
            <h3 className="font-display text-xl font-bold text-[#14243A] dark:text-[#F4F6F9] mb-1.5">
              {loc(metrics.continueCategory.title)}
            </h3>
            <p className="text-sm text-[#667085] dark:text-[#98A2B3] leading-relaxed">
              {loc(metrics.continueCategory.description)}
            </p>
          </div>

          <div className="space-y-4">
            <ProgressIndicator
              value={metrics.continueCategoryProgressPercent}
              label="Category Completion"
              rightText={`${metrics.continueCategoryProgressPercent}%`}
              tone={metrics.continueCategoryProgressPercent === 100 ? 'success' : 'gold'}
            />
            <div className="flex flex-wrap items-center gap-3">
              <SecondaryButton
                onClick={() =>
                  navigateTab('LEARN', {
                    type: 'CATEGORY_DETAIL',
                    categoryId: metrics.continueCategory.id,
                  })
                }
              >
                {t.home.continueBtn}
                <ArrowRight className="w-4 h-4" />
              </SecondaryButton>
              <button
                type="button"
                onClick={() => navigateTab('PROFILE', { type: 'SAVED_NOTES' })}
                className="min-h-[44px] px-3 text-xs font-medium text-[#667085] hover:text-[#14243A] dark:text-[#98A2B3] dark:hover:text-[#F4F6F9] inline-flex items-center gap-1.5 whitespace-nowrap"
              >
                <Bookmark className="w-4 h-4" />
                {t.home.viewSavedMaterials}
              </button>
            </div>
          </div>
        </section>

        {/* Section D: Daily Learning Goal */}
        <section className="lg:col-span-5 p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D] flex flex-col justify-between gap-5">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <h3 className="font-display text-base font-bold text-[#14243A] dark:text-[#F4F6F9]">
                {t.home.dailyGoal}
              </h3>
              <span className="text-xs font-mono-tabular text-[#667085] dark:text-[#98A2B3]">
                {metrics.activeStudyDaysCount} active day{metrics.activeStudyDaysCount === 1 ? '' : 's'}
              </span>
            </div>
            <p className="text-sm text-[#667085] dark:text-[#98A2B3] mb-4">
              {t.home.questionsToday}
            </p>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-3xl font-bold font-mono-tabular text-[#14243A] dark:text-[#D8A43B]">
                {metrics.questionsAnsweredToday}
              </span>
              <span className="text-sm font-mono-tabular text-[#667085] dark:text-[#98A2B3]">
                / {preferences.dailyGoalQuestions} questions
              </span>
            </div>
            <ProgressIndicator
              value={dailyGoalPct}
              tone={dailyGoalPct >= 100 ? 'success' : 'gold'}
            />
          </div>

          <p className="text-xs text-[#667085] dark:text-[#98A2B3]">
            {dailyGoalPct >= 100
              ? 'Daily target achieved. Keep reinforcing weak topics at your own pace.'
              : 'Consistent 10–15 minute daily practice builds stronger retention than cramming.'}
          </p>
        </section>
      </div>

      {/* Section C: Quick Actions */}
      <section aria-labelledby="quick-actions-heading">
        <h2
          id="quick-actions-heading"
          className="font-display text-lg font-bold text-[#14243A] dark:text-[#F4F6F9] mb-3"
        >
          {t.home.quickActions}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            type="button"
            onClick={() => navigateTab('LEARN', { type: 'ROAD_SIGNS' })}
            className="p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D] hover:border-[#14243A]/35 dark:hover:border-[#D8A43B]/50 text-left transition-colors flex items-center justify-between gap-3 min-h-[76px]"
          >
            <div>
              <p className="text-sm font-semibold text-[#14243A] dark:text-[#F4F6F9]">
                {t.home.actionRoadSigns}
              </p>
              <p className="text-xs text-[#667085] dark:text-[#98A2B3] mt-0.5">
                5 categories · PNG visual guide
              </p>
            </div>
            <Compass className="w-5 h-5 text-[#D8A43B] shrink-0" />
          </button>

          <button
            type="button"
            onClick={() => navigateTab('PRACTICE')}
            className="p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D] hover:border-[#14243A]/35 dark:hover:border-[#D8A43B]/50 text-left transition-colors flex items-center justify-between gap-3 min-h-[76px]"
          >
            <div>
              <p className="text-sm font-semibold text-[#14243A] dark:text-[#F4F6F9]">
                {t.home.actionPractice}
              </p>
              <p className="text-xs text-[#667085] dark:text-[#98A2B3] mt-0.5">
                Immediate explanations
              </p>
            </div>
            <Target className="w-5 h-5 text-[#32845A] shrink-0" />
          </button>

          <button
            type="button"
            onClick={() => navigateTab('MOCK_EXAM')}
            className="p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D] hover:border-[#14243A]/35 dark:hover:border-[#D8A43B]/50 text-left transition-colors flex items-center justify-between gap-3 min-h-[76px]"
          >
            <div>
              <p className="text-sm font-semibold text-[#14243A] dark:text-[#F4F6F9]">
                {t.home.actionMockExam}
              </p>
              <p className="text-xs text-[#667085] dark:text-[#98A2B3] mt-0.5">
                Timed practice simulation
              </p>
            </div>
            <ClipboardCheck className="w-5 h-5 text-[#14243A] dark:text-[#D8A43B] shrink-0" />
          </button>

          <button
            type="button"
            onClick={() => navigateTab('PRACTICE', { type: 'PRACTICE_MISTAKES' })}
            className="p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D] hover:border-[#14243A]/35 dark:hover:border-[#D8A43B]/50 text-left transition-colors flex items-center justify-between gap-3 min-h-[76px]"
          >
            <div>
              <p className="text-sm font-semibold text-[#14243A] dark:text-[#F4F6F9]">
                {t.home.actionReviewMistakes}
              </p>
              <p className="text-xs text-[#667085] dark:text-[#98A2B3] mt-0.5 font-mono-tabular">
                {progress.incorrectQuestionIds.length} saved mistake
                {progress.incorrectQuestionIds.length === 1 ? '' : 's'}
              </p>
            </div>
            <RotateCcw className="w-5 h-5 text-[#C44B4B] shrink-0" />
          </button>
        </div>
      </section>

      {/* Section E: Recommended Topics */}
      <section aria-labelledby="recommended-topics-heading">
        <h2
          id="recommended-topics-heading"
          className="font-display text-lg font-bold text-[#14243A] dark:text-[#F4F6F9] mb-3"
        >
          {t.home.recommendedTopics}
        </h2>
        <div className="divide-y divide-[#E9EBEF] dark:divide-[#24344D] rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D]">
          {metrics.recommendedTopics.map((item) => (
            <button
              key={item.category.id}
              type="button"
              onClick={() =>
                navigateTab('LEARN', {
                  type: 'CATEGORY_DETAIL',
                  categoryId: item.category.id,
                })
              }
              className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#FAF9F6] dark:hover:bg-[#1B2B44] transition-colors first:rounded-t-2xl last:rounded-b-2xl"
            >
              <div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-[#667085] dark:text-[#98A2B3] mb-1">
                  <span className="font-mono-tabular">Module {item.category.number}</span>
                  <span aria-hidden="true">·</span>
                  <span
                    className={
                      item.reason === 'WEAK'
                        ? 'text-[#C44B4B] font-medium'
                        : 'text-[#D8A43B] font-medium'
                    }
                  >
                    {item.reason === 'WEAK'
                      ? `${t.home.needsImprovement} (${item.accuracy}% accuracy)`
                      : t.home.unstudiedTrackTopic}
                  </span>
                </div>
                <p className="text-base font-semibold text-[#14243A] dark:text-[#F4F6F9]">
                  {loc(item.category.title)}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-[#667085] dark:text-[#98A2B3] shrink-0" />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
