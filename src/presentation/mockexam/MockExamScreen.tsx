import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Eye,
  RotateCcw,
} from 'lucide-react';
import {
  DifficultyLevel,
  MockExamAttempt,
  Question,
} from '../../domain/model/models';
import { generateMockExamSet } from '../../domain/usecase/useCases';
import {
  AnswerOption,
  PrimaryButton,
  ProgressIndicator,
  QuestionCard,
  ResultSummary,
  SafePngImage,
  SecondaryButton,
} from '../../ui/components/ExamoraComponents';
import { useExamoraViewModel } from '../state/ExamoraContext';

function formatSeconds(sec: number): string {
  const safe = Math.max(0, sec);
  const mins = Math.floor(safe / 60);
  const rem = safe % 60;
  return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
}

export const MockExamScreen: React.FC = () => {
  const {
    preferences,
    t,
    loc,
    categories,
    lessons,
    questions,
    mockExamPresets,
    mockExamHistory,
    saveCompletedMockExam,
    toggleBookmark,
    isBookmarked,
    navigateTab,
  } = useExamoraViewModel();

  const [selectedPresetId, setSelectedPresetId] = useState<string>(mockExamPresets[0].id);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'ALL' | DifficultyLevel>('ALL');

  // Exam Runtime State
  const [stage, setStage] = useState<'SETUP' | 'RUNNING' | 'RESULTS' | 'REVIEW'>('SETUP');
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [secondsLeft, setSecondsLeft] = useState<number>(0);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState<boolean>(false);
  const [completedAttempt, setCompletedAttempt] = useState<MockExamAttempt | null>(null);

  const startTimeRef = useRef<number>(Date.now());
  const selectedAnswersRef = useRef<Record<string, string>>({});
  selectedAnswersRef.current = selectedAnswers;

  const activePreset = useMemo(
    () => mockExamPresets.find((p) => p.id === selectedPresetId) || mockExamPresets[0],
    [mockExamPresets, selectedPresetId],
  );

  const finalizeExam = useCallback(
    (questionsList: Question[], answers: Record<string, string>) => {
      let correct = 0;
      let incorrect = 0;
      let unanswered = 0;
      for (const q of questionsList) {
        const ans = answers[q.id];
        if (!ans) {
          unanswered += 1;
        } else if (ans === q.correctAnswerId) {
          correct += 1;
        } else {
          incorrect += 1;
        }
      }
      const total = questionsList.length;
      const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
      const elapsedSec = Math.max(
        5,
        Math.round((Date.now() - startTimeRef.current) / 1000),
      );

      const saved = saveCompletedMockExam({
        track: preferences.preparationTrack,
        difficulty: selectedDifficulty,
        totalQuestions: total,
        correctAnswers: correct,
        incorrectAnswers: incorrect,
        unansweredQuestions: unanswered,
        scorePercentage: pct,
        durationSeconds: elapsedSec,
        questionIds: questionsList.map((q) => q.id),
        selectedAnswers: answers,
      });

      setCompletedAttempt(saved);
      setShowSubmitConfirm(false);
      setStage('RESULTS');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [preferences.preparationTrack, saveCompletedMockExam, selectedDifficulty],
  );

  // Countdown Timer Effect
  useEffect(() => {
    if (stage !== 'RUNNING') return undefined;
    const interval = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(interval);
          finalizeExam(examQuestions, selectedAnswersRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [stage, examQuestions, finalizeExam]);

  const startMockExam = () => {
    const generated = generateMockExamSet({
      allQuestions: questions,
      track: preferences.preparationTrack,
      difficulty: selectedDifficulty,
      questionCount: Math.min(activePreset.questionCount, questions.length),
    });
    startTimeRef.current = Date.now();
    setExamQuestions(generated);
    setSelectedAnswers({});
    setCurrentIdx(0);
    setSecondsLeft(activePreset.durationMinutes * 60);
    setCompletedAttempt(null);
    setShowSubmitConfirm(false);
    setStage('RUNNING');
  };

  // 1. POST-EXAM ANSWER REVIEW WALKTHROUGH
  if (stage === 'REVIEW' && completedAttempt) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setStage('RESULTS')}
            className="min-h-[44px] inline-flex items-center gap-2 text-sm font-medium text-[#667085] hover:text-[#14243A] dark:text-[#98A2B3] dark:hover:text-[#F4F6F9]"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Exam Summary
          </button>
          <span className="text-xs font-mono-tabular text-[#667085] dark:text-[#98A2B3]">
            Score: {completedAttempt.scorePercentage}% ({completedAttempt.correctAnswers}/
            {completedAttempt.totalQuestions})
          </span>
        </div>

        <div className="space-y-5">
          {examQuestions.map((q, idx) => (
            <QuestionCard
              key={q.id}
              question={q}
              questionNumber={idx + 1}
              totalQuestions={examQuestions.length}
              loc={loc}
              selectedChoiceId={completedAttempt.selectedAnswers[q.id] || null}
              revealed
              isBookmarked={isBookmarked('QUESTION', q.id)}
              onSelectChoice={() => {}}
              onToggleBookmark={() => toggleBookmark('QUESTION', q.id)}
              explanationLabel={t.practice.explanationTitle}
            />
          ))}
        </div>
      </div>
    );
  }

  // 2. MOCK EXAM RESULTS & PERFORMANCE BREAKDOWN
  if (stage === 'RESULTS' && completedAttempt) {
    const categoryStats = categories
      .map((cat) => {
        const catQs = examQuestions.filter((q) => q.categoryId === cat.id);
        if (catQs.length === 0) return null;
        const right = catQs.filter(
          (q) => completedAttempt.selectedAnswers[q.id] === q.correctAnswerId,
        ).length;
        const pct = Math.round((right / catQs.length) * 100);
        return { category: cat, total: catQs.length, right, pct };
      })
      .filter((x): x is NonNullable<typeof x> => Boolean(x));

    const weakCatIds = categoryStats.filter((cs) => cs.pct < 80).map((cs) => cs.category.id);
    const recommendedLessons = lessons
      .filter((l) => weakCatIds.includes(l.categoryId))
      .slice(0, 4);

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <ResultSummary
          title={t.mockExam.resultsTitle}
          totalQuestions={completedAttempt.totalQuestions}
          correctAnswers={completedAttempt.correctAnswers}
          incorrectAnswers={completedAttempt.incorrectAnswers}
          unansweredQuestions={completedAttempt.unansweredQuestions}
          primaryLabel={t.mockExam.reviewAnswersBtn}
          onPrimaryAction={() => setStage('REVIEW')}
          secondaryLabel={t.mockExam.retakeExamBtn}
          onSecondaryAction={startMockExam}
        />

        {/* Topic Performance Breakdown */}
        <section className="p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D] space-y-4">
          <h3 className="font-display text-lg font-bold text-[#14243A] dark:text-[#F4F6F9]">
            {t.mockExam.topicPerformance}
          </h3>
          <div className="space-y-4">
            {categoryStats.map((stat) => (
              <ProgressIndicator
                key={stat.category.id}
                value={stat.pct}
                label={`${stat.category.number}. ${loc(stat.category.title)}`}
                rightText={`${stat.right}/${stat.total} (${stat.pct}%)`}
                tone={stat.pct >= 80 ? 'success' : 'gold'}
              />
            ))}
          </div>
        </section>

        {/* Recommended Lessons */}
        {recommendedLessons.length > 0 && (
          <section className="p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D] space-y-3">
            <h3 className="font-display text-lg font-bold text-[#14243A] dark:text-[#F4F6F9]">
              {t.mockExam.recommendedLessons}
            </h3>
            <div className="divide-y divide-[#E9EBEF] dark:divide-[#24344D]">
              {recommendedLessons.map((les) => (
                <button
                  key={les.id}
                  type="button"
                  onClick={() =>
                    navigateTab('LEARN', { type: 'LESSON_READER', lessonId: les.id })
                  }
                  className="w-full py-3.5 text-left flex items-center justify-between gap-4 hover:text-[#D8A43B] transition-colors"
                >
                  <div>
                    <p className="text-sm font-semibold text-[#14243A] dark:text-[#F4F6F9]">
                      {loc(les.title)}
                    </p>
                    <p className="text-xs text-[#667085] dark:text-[#98A2B3] line-clamp-1">
                      {loc(les.introduction)}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 shrink-0 text-[#667085]" />
                </button>
              ))}
            </div>
          </section>
        )}

        <div>
          <SecondaryButton onClick={() => setStage('SETUP')}>
            {t.mockExam.backToSetup}
          </SecondaryButton>
        </div>
      </div>
    );
  }

  // 3. RUNNING TIMED EXAMINATION STAGE
  if (stage === 'RUNNING' && examQuestions.length > 0) {
    const currentQ = examQuestions[currentIdx];
    const answeredCount = Object.keys(selectedAnswers).length;
    const unansweredCount = examQuestions.length - answeredCount;
    const lowTime = secondsLeft <= 120;

    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Question Area */}
        <div className="lg:col-span-8 space-y-5">
          {/* Exam Top Status Strip */}
          <div className="p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D] flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Clock
                className={`w-4 h-4 ${
                  lowTime ? 'text-[#C44B4B]' : 'text-[#14243A] dark:text-[#D8A43B]'
                }`}
              />
              <span className="text-xs text-[#667085] dark:text-[#98A2B3]">
                {t.mockExam.timeRemaining}:
              </span>
              <span
                className={`text-base font-bold font-mono-tabular ${
                  lowTime ? 'text-[#C44B4B]' : 'text-[#14243A] dark:text-[#F4F6F9]'
                }`}
              >
                {formatSeconds(secondsLeft)}
              </span>
            </div>

            <div className="text-xs font-mono-tabular text-[#667085] dark:text-[#98A2B3]">
              {answeredCount}/{examQuestions.length} answered · {unansweredCount}{' '}
              {t.mockExam.unansweredCount}
            </div>
          </div>

          {/* Question Box (No answer reveal during active exam) */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D]">
            <div className="flex items-center justify-between gap-2 text-xs text-[#667085] dark:text-[#98A2B3] mb-4">
              <span className="font-mono-tabular font-semibold text-[#14243A] dark:text-[#D8A43B]">
                Question {currentIdx + 1} of {examQuestions.length}
              </span>
              <span>
                {loc(currentQ.topicTitle)} · {currentQ.difficulty}
              </span>
            </div>

            {currentQ.imageResource && (
              <div className="my-4 p-4 rounded-xl bg-[#FAF9F6] dark:bg-[#0D1726] flex items-center justify-center">
                <SafePngImage
                  src={currentQ.imageResource}
                  alt={loc(currentQ.topicTitle)}
                  className="w-32 h-32 object-contain"
                />
              </div>
            )}

            <h2 className="text-lg sm:text-xl font-semibold text-[#14243A] dark:text-[#F4F6F9] leading-snug mb-6">
              {loc(currentQ.question)}
            </h2>

            <div className="space-y-3">
              {currentQ.choices.map((ch, idx) => (
                <AnswerOption
                  key={ch.id}
                  choice={ch}
                  index={idx}
                  loc={loc}
                  selected={selectedAnswers[currentQ.id] === ch.id}
                  revealed={false}
                  isCorrectChoice={false}
                  onSelect={() =>
                    setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: ch.id }))
                  }
                />
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between gap-3">
            <SecondaryButton
              disabled={currentIdx === 0}
              onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
            >
              <ArrowLeft className="w-4 h-4" />
              {t.practice.prevQuestion}
            </SecondaryButton>

            <div className="flex items-center gap-2">
              {currentIdx < examQuestions.length - 1 && (
                <SecondaryButton onClick={() => setCurrentIdx((i) => i + 1)}>
                  {t.practice.nextQuestion}
                  <ArrowRight className="w-4 h-4" />
                </SecondaryButton>
              )}
              <PrimaryButton onClick={() => setShowSubmitConfirm(true)}>
                <Check className="w-4 h-4" />
                {t.mockExam.submitExam}
              </PrimaryButton>
            </div>
          </div>
        </div>

        {/* Question Navigator Panel (Highlights Answered vs Unanswered) */}
        <aside className="lg:col-span-4 p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-sm font-bold text-[#14243A] dark:text-[#F4F6F9]">
              {t.mockExam.questionNavigator}
            </h3>
            <span className="text-xs font-mono-tabular text-[#667085] dark:text-[#98A2B3]">
              {unansweredCount} {t.mockExam.unansweredCount}
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {examQuestions.map((q, idx) => {
              const isCurrent = idx === currentIdx;
              const isAnswered = Boolean(selectedAnswers[q.id]);
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setCurrentIdx(idx)}
                  className={`min-h-[42px] rounded-xl text-xs font-mono-tabular font-semibold transition-colors border ${
                    isCurrent
                      ? 'border-[#D8A43B] ring-2 ring-[#D8A43B]/40 bg-[#14243A] text-white dark:bg-[#D8A43B] dark:text-[#14243A]'
                      : isAnswered
                      ? 'border-[#32845A]/50 bg-[#32845A]/12 text-[#32845A]'
                      : 'border-[#E9EBEF] dark:border-[#24344D] bg-[#FAF9F6] dark:bg-[#0D1726] text-[#667085]'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-[#E9EBEF] dark:border-[#24344D] text-xs text-[#667085] dark:text-[#98A2B3] space-y-1">
            <p>• Numbers in green have a selected answer.</p>
            <p>• Neutral numbers are still unanswered.</p>
          </div>
        </aside>

        {/* Submit Examination Confirmation Modal */}
        {showSubmitConfirm && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 bg-black/55 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setShowSubmitConfirm(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D] p-6 space-y-4"
            >
              <h3 className="font-display text-lg font-bold text-[#14243A] dark:text-[#F4F6F9]">
                {t.mockExam.confirmSubmitTitle}
              </h3>
              <p className="text-sm text-[#667085] dark:text-[#98A2B3] leading-relaxed">
                {t.mockExam.confirmSubmitBody}
              </p>

              {unansweredCount > 0 && (
                <div className="p-3.5 rounded-xl bg-[#D8A43B]/15 border border-[#D8A43B]/50 text-xs text-[#14243A] dark:text-[#F4F6F9] flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-[#D8A43B] shrink-0 mt-0.5" />
                  <span>
                    {t.mockExam.confirmUnansweredWarning}{' '}
                    <strong className="font-mono-tabular">{unansweredCount}</strong>
                  </span>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <SecondaryButton onClick={() => setShowSubmitConfirm(false)}>
                  {t.mockExam.cancel}
                </SecondaryButton>
                <PrimaryButton
                  onClick={() => finalizeExam(examQuestions, selectedAnswers)}
                >
                  {t.mockExam.confirmSubmitBtn}
                </PrimaryButton>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 4. MOCK EXAM INSTRUCTIONS & PRESET SETUP SCREEN
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#14243A] dark:text-[#F4F6F9] mb-1">
          {t.mockExam.title}
        </h1>
        <p className="text-sm text-[#667085] dark:text-[#98A2B3]">{t.mockExam.subtitle}</p>
      </div>

      {/* Independent Practice Test Notice */}
      <div className="p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D] text-xs text-[#667085] dark:text-[#98A2B3] leading-relaxed">
        {t.mockExam.simulationNotice}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Configurable Preset & Difficulty */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D] space-y-6">
          <div>
            <label className="block text-sm font-semibold text-[#14243A] dark:text-[#F4F6F9] mb-3">
              {t.mockExam.selectPreset}
            </label>
            <div className="space-y-3">
              {mockExamPresets.map((preset) => {
                const active = selectedPresetId === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setSelectedPresetId(preset.id)}
                    className={`w-full p-4 rounded-xl border text-left transition-colors ${
                      active
                        ? 'border-[#14243A] bg-[#14243A]/[0.04] dark:border-[#D8A43B] dark:bg-[#D8A43B]/10'
                        : 'border-[#E9EBEF] dark:border-[#24344D] hover:bg-[#FAF9F6] dark:hover:bg-[#1C2C46]'
                    }`}
                  >
                    <p className="text-sm font-semibold text-[#14243A] dark:text-[#F4F6F9] mb-0.5">
                      {loc(preset.label)}
                    </p>
                    <p className="text-xs text-[#667085] dark:text-[#98A2B3]">
                      {loc(preset.description)}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#14243A] dark:text-[#F4F6F9] mb-2.5">
              {t.mockExam.selectDifficulty}
            </label>
            <div className="flex flex-wrap gap-2">
              {(['ALL', 'Easy', 'Medium', 'Challenging'] as const).map((diff) => {
                const active = selectedDifficulty === diff;
                return (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`min-h-[40px] px-4 py-1.5 rounded-xl text-xs font-medium border transition-colors whitespace-nowrap ${
                      active
                        ? 'bg-[#14243A] text-white border-[#14243A] dark:bg-[#D8A43B] dark:text-[#14243A] dark:border-[#D8A43B]'
                        : 'bg-[#FAF9F6] text-[#667085] border-[#E9EBEF] dark:bg-[#0D1726] dark:text-[#98A2B3] dark:border-[#24344D]'
                    }`}
                  >
                    {diff === 'ALL' ? t.mockExam.difficultyAll : diff}
                  </button>
                );
              })}
            </div>
          </div>

          <PrimaryButton onClick={startMockExam} fullWidth>
            {t.mockExam.beginExam}
            <ArrowRight className="w-4 h-4" />
          </PrimaryButton>
        </div>

        {/* Right: Exam Instructions & Past Simulations */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D] space-y-3">
            <h2 className="font-display text-base font-bold text-[#14243A] dark:text-[#F4F6F9]">
              {t.mockExam.instructionsTitle}
            </h2>
            <ul className="space-y-2.5 text-xs text-[#667085] dark:text-[#98A2B3] leading-relaxed">
              {t.mockExam.instructionsList.map((line, idx) => (
                <li key={idx}>
                  <span className="font-mono-tabular font-semibold text-[#14243A] dark:text-[#D8A43B] mr-1.5">
                    0{idx + 1}.
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </div>

          {mockExamHistory.length > 0 && (
            <div className="p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D] space-y-3">
              <h3 className="font-display text-sm font-bold text-[#14243A] dark:text-[#F4F6F9]">
                Recent Practice Simulations
              </h3>
              <div className="divide-y divide-[#E9EBEF] dark:divide-[#24344D]">
                {mockExamHistory.slice(0, 4).map((hist) => (
                  <div
                    key={hist.id}
                    className="py-2.5 flex items-center justify-between gap-2 text-xs"
                  >
                    <div>
                      <p className="font-medium text-[#14243A] dark:text-[#F4F6F9]">
                        {hist.correctAnswers}/{hist.totalQuestions} Correct
                      </p>
                      <p className="text-[#667085] dark:text-[#98A2B3] font-mono-tabular">
                        {new Date(hist.date).toLocaleDateString()} ·{' '}
                        {formatSeconds(hist.durationSeconds)}
                      </p>
                    </div>
                    <span className="font-mono-tabular font-bold text-sm text-[#32845A]">
                      {hist.scorePercentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
