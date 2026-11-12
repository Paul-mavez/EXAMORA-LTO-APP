import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  Compass,
  Flag,
  RotateCcw,
  Shuffle,
  TrendingDown,
  X,
} from 'lucide-react';
import { PracticeMode, Question } from '../../domain/model/models';
import { generatePracticeSet } from '../../domain/usecase/useCases';
import {
  PrimaryButton,
  ProgressIndicator,
  QuestionCard,
  ResultSummary,
  SecondaryButton,
} from '../../ui/components/ExamoraComponents';
import { useExamoraViewModel } from '../state/ExamoraContext';

export const PracticeScreen: React.FC = () => {
  const {
    preferences,
    t,
    loc,
    categories,
    questions,
    progress,
    bookmarks,
    metrics,
    subDestination,
    setSubDestination,
    recordQuestionAttempt,
    recordSessionCompleted,
    toggleBookmark,
    isBookmarked,
    submitReport,
  } = useExamoraViewModel();

  const [selectedMode, setSelectedMode] = useState<PracticeMode>('CATEGORY');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(categories[0].id);
  const [sessionLength, setSessionLength] = useState<number>(10);

  // Active Practice Quiz State
  const [activeSet, setActiveSet] = useState<Question[] | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answersMap, setAnswersMap] = useState<Record<string, string>>({});
  const [sessionFinished, setSessionFinished] = useState<boolean>(false);
  const [emptyNotice, setEmptyNotice] = useState<string | null>(null);
  const sessionStartRef = useRef<number>(Date.now());

  // Content Report Modal State
  const [reportingQuestion, setReportingQuestion] = useState<Question | null>(null);
  const [reportReason, setReportReason] = useState<string>('Unclear phrasing');
  const [reportDetails, setReportDetails] = useState<string>('');
  const [reportSuccessToast, setReportSuccessToast] = useState<boolean>(false);

  const startMode = (mode: PracticeMode, catId?: string) => {
    setEmptyNotice(null);
    const generated = generatePracticeSet({
      mode,
      allQuestions: questions,
      track: preferences.preparationTrack,
      categoryId: catId || selectedCategoryId,
      count: sessionLength,
      progress,
      bookmarks,
      categoryPerformances: metrics.categoryPerformances,
    });

    if (generated.length === 0) {
      if (mode === 'BOOKMARKED') {
        setEmptyNotice(t.practice.emptyBookmarks);
      } else if (mode === 'MISTAKES') {
        setEmptyNotice(t.practice.emptyMistakes);
      } else {
        setEmptyNotice('No questions found for the selected filter.');
      }
      return;
    }

    sessionStartRef.current = Date.now();
    setSelectedMode(mode);
    setActiveSet(generated);
    setCurrentIndex(0);
    setAnswersMap({});
    setSessionFinished(false);
  };

  // Handle incoming "Review Mistakes" shortcut from Home Dashboard
  useEffect(() => {
    if (subDestination.type === 'PRACTICE_MISTAKES') {
      setSelectedMode('MISTAKES');
      const mistakePool = generatePracticeSet({
        mode: 'MISTAKES',
        allQuestions: questions,
        track: preferences.preparationTrack,
        count: 20,
        progress,
        bookmarks,
        categoryPerformances: metrics.categoryPerformances,
      });
      if (mistakePool.length > 0) {
        sessionStartRef.current = Date.now();
        setActiveSet(mistakePool);
        setCurrentIndex(0);
        setAnswersMap({});
        setSessionFinished(false);
        setEmptyNotice(null);
      } else {
        setActiveSet(null);
        setEmptyNotice(t.practice.emptyMistakes);
      }
      setSubDestination({ type: 'NONE' });
    }
  }, [
    subDestination,
    questions,
    preferences.preparationTrack,
    progress,
    bookmarks,
    metrics.categoryPerformances,
    t.practice.emptyMistakes,
    setSubDestination,
  ]);

  const handleSelectChoice = (question: Question, choiceId: string) => {
    if (answersMap[question.id]) return; // Already answered with immediate feedback
    setAnswersMap((prev) => ({ ...prev, [question.id]: choiceId }));
    recordQuestionAttempt(question, choiceId);
  };

  const handleCompleteQuiz = () => {
    if (!activeSet) return;
    const answeredIds = Object.keys(answersMap);
    const correctCount = activeSet.filter(
      (q) => answersMap[q.id] && answersMap[q.id] === q.correctAnswerId,
    ).length;
    const elapsedSec = Math.max(5, Math.round((Date.now() - sessionStartRef.current) / 1000));

    recordSessionCompleted({
      sessionType: 'PRACTICE',
      modeLabel: t.practice.modes[selectedMode].title,
      questionsAnswered: answeredIds.length,
      correctAnswers: correctCount,
      durationSeconds: elapsedSec,
    });
    setSessionFinished(true);
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportingQuestion) return;
    submitReport(reportingQuestion.id, reportReason, reportDetails);
    setReportingQuestion(null);
    setReportDetails('');
    setReportSuccessToast(true);
  };

  // 1. PRACTICE SESSION SUMMARY SCREEN
  if (activeSet && sessionFinished) {
    const answeredCount = Object.keys(answersMap).length;
    const correctCount = activeSet.filter(
      (q) => answersMap[q.id] === q.correctAnswerId,
    ).length;
    const incorrectCount = answeredCount - correctCount;

    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <ResultSummary
          title={t.practice.modes[selectedMode].title}
          totalQuestions={activeSet.length}
          correctAnswers={correctCount}
          incorrectAnswers={incorrectCount}
          unansweredQuestions={activeSet.length - answeredCount}
          primaryLabel="Choose Another Practice Mode"
          onPrimaryAction={() => {
            setActiveSet(null);
            setSessionFinished(false);
          }}
          secondaryLabel="Practice Again"
          onSecondaryAction={() => startMode(selectedMode, selectedCategoryId)}
        />
      </div>
    );
  }

  // 2. ACTIVE DISTRACTION-FREE QUESTION READER
  if (activeSet) {
    const currentQ = activeSet[currentIndex];
    const chosenId = answersMap[currentQ.id] || null;
    const isRevealed = Boolean(chosenId);
    const answeredSoFar = Object.keys(answersMap).length;
    const progressPct = Math.round(((currentIndex + 1) / activeSet.length) * 100);

    return (
      <div className="max-w-3xl mx-auto space-y-5">
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setActiveSet(null)}
            className="min-h-[44px] inline-flex items-center gap-2 text-sm font-medium text-[#667085] hover:text-[#14243A] dark:text-[#98A2B3] dark:hover:text-[#F4F6F9]"
          >
            <ArrowLeft className="w-4 h-4" />
            Exit Practice
          </button>
          <span className="text-xs font-mono-tabular text-[#667085] dark:text-[#98A2B3]">
            {t.practice.modes[selectedMode].title} · {answeredSoFar}/{activeSet.length} answered
          </span>
        </div>

        <ProgressIndicator value={progressPct} tone="gold" />

        {reportSuccessToast && (
          <div className="p-3.5 rounded-xl bg-[#32845A]/12 border border-[#32845A]/40 text-xs font-medium text-[#32845A] flex items-center justify-between">
            <span>Question flagged locally for editorial verification. Thank you.</span>
            <button type="button" onClick={() => setReportSuccessToast(false)}>
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <QuestionCard
          question={currentQ}
          questionNumber={currentIndex + 1}
          totalQuestions={activeSet.length}
          loc={loc}
          selectedChoiceId={chosenId}
          revealed={isRevealed}
          isBookmarked={isBookmarked('QUESTION', currentQ.id)}
          onSelectChoice={(cId) => handleSelectChoice(currentQ, cId)}
          onToggleBookmark={() => toggleBookmark('QUESTION', currentQ.id)}
          onReport={() => setReportingQuestion(currentQ)}
          explanationLabel={t.practice.explanationTitle}
        />

        {/* Previous / Next / Finish Controls */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <SecondaryButton
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
          >
            <ArrowLeft className="w-4 h-4" />
            {t.practice.prevQuestion}
          </SecondaryButton>

          {currentIndex < activeSet.length - 1 ? (
            <PrimaryButton onClick={() => setCurrentIndex((i) => i + 1)}>
              {t.practice.nextQuestion}
              <ArrowRight className="w-4 h-4" />
            </PrimaryButton>
          ) : (
            <PrimaryButton onClick={handleCompleteQuiz}>
              <CheckCircle2 className="w-4 h-4" />
              {t.practice.finishSession}
            </PrimaryButton>
          )}
        </div>

        {/* Report Content Modal */}
        {reportingQuestion && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 bg-black/55 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setReportingQuestion(null)}
          >
            <form
              onSubmit={handleReportSubmit}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D] p-6 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-bold text-[#14243A] dark:text-[#F4F6F9] flex items-center gap-2">
                  <Flag className="w-4 h-4 text-[#C44B4B]" />
                  {t.practice.reportQuestion}
                </h3>
                <button
                  type="button"
                  onClick={() => setReportingQuestion(null)}
                  className="min-w-[40px] min-h-[40px] flex items-center justify-center text-[#667085]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#667085] dark:text-[#98A2B3] mb-1.5">
                  Reason for Review Flag
                </label>
                <select
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  className="w-full min-h-[44px] px-3 rounded-xl border border-[#E9EBEF] dark:border-[#24344D] bg-[#FAF9F6] dark:bg-[#0D1726] text-sm"
                >
                  <option value="Unclear phrasing">Unclear question phrasing</option>
                  <option value="Translation accuracy">Filipino/English translation review</option>
                  <option value="Statutory reference update">Statutory citation needs update</option>
                  <option value="Answer explanation">Answer explanation needs clarification</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#667085] dark:text-[#98A2B3] mb-1.5">
                  Additional Notes (Saved Locally)
                </label>
                <textarea
                  rows={3}
                  value={reportDetails}
                  onChange={(e) => setReportDetails(e.target.value)}
                  placeholder="Describe what looks unclear..."
                  className="w-full p-3 rounded-xl border border-[#E9EBEF] dark:border-[#24344D] bg-[#FAF9F6] dark:bg-[#0D1726] text-sm"
                />
              </div>

              <div className="flex justify-end gap-2">
                <SecondaryButton onClick={() => setReportingQuestion(null)}>Cancel</SecondaryButton>
                <PrimaryButton type="submit">Flag for Review</PrimaryButton>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }

  // 3. PRACTICE MODE SELECTION HUB
  const modeCards: {
    mode: PracticeMode;
    icon: React.ReactNode;
    meta: string;
  }[] = [
    {
      mode: 'CATEGORY',
      icon: <Compass className="w-5 h-5 text-[#14243A] dark:text-[#D8A43B]" />,
      meta: '8 LTO modules',
    },
    {
      mode: 'RANDOM',
      icon: <Shuffle className="w-5 h-5 text-[#32845A]" />,
      meta: t.tracks[preferences.preparationTrack].short,
    },
    {
      mode: 'WEAK_AREAS',
      icon: <TrendingDown className="w-5 h-5 text-[#D8A43B]" />,
      meta: `${metrics.weakestCategories.length} focus area(s)`,
    },
    {
      mode: 'BOOKMARKED',
      icon: <Bookmark className="w-5 h-5 text-[#14243A] dark:text-[#D8A43B]" />,
      meta: `${bookmarks.filter((b) => b.itemType === 'QUESTION').length} saved`,
    },
    {
      mode: 'MISTAKES',
      icon: <RotateCcw className="w-5 h-5 text-[#C44B4B]" />,
      meta: `${progress.incorrectQuestionIds.length} to review`,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#14243A] dark:text-[#F4F6F9] mb-1">
          {t.practice.title}
        </h1>
        <p className="text-sm text-[#667085] dark:text-[#98A2B3] mb-3">{t.practice.subtitle}</p>
        <p className="text-xs text-[#667085] dark:text-[#98A2B3]">{t.practice.disclaimerBanner}</p>
      </div>

      {emptyNotice && (
        <div className="p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#D8A43B]/60 text-sm text-[#14243A] dark:text-[#F4F6F9] flex items-center justify-between gap-4">
          <span>{emptyNotice}</span>
          <button
            type="button"
            onClick={() => setEmptyNotice(null)}
            className="text-xs font-medium text-[#667085]"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* 5 Practice Mode Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {modeCards.map((card) => {
          const active = selectedMode === card.mode;
          const info = t.practice.modes[card.mode];
          return (
            <button
              key={card.mode}
              type="button"
              onClick={() => {
                setSelectedMode(card.mode);
                setEmptyNotice(null);
              }}
              className={`p-5 rounded-2xl border text-left transition-colors flex flex-col justify-between gap-4 ${
                active
                  ? 'border-[#14243A] bg-[#FFFFFF] dark:border-[#D8A43B] dark:bg-[#142033]'
                  : 'border-[#E9EBEF] bg-[#FFFFFF]/80 hover:border-[#14243A]/30 dark:border-[#24344D] dark:bg-[#142033]/70'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] dark:bg-[#1C2C46] flex items-center justify-center">
                    {card.icon}
                  </div>
                  <span className="text-xs font-mono-tabular text-[#667085] dark:text-[#98A2B3]">
                    {card.meta}
                  </span>
                </div>
                <h2 className="font-display text-base font-bold text-[#14243A] dark:text-[#F4F6F9] mb-1">
                  {info.title}
                </h2>
                <p className="text-xs text-[#667085] dark:text-[#98A2B3] leading-relaxed">
                  {info.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Configuration & Launch Bar for Selected Mode */}
      <section className="p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D] space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-mono-tabular text-[#D8A43B] font-semibold mb-0.5">
              Selected Mode
            </p>
            <h3 className="font-display text-lg font-bold text-[#14243A] dark:text-[#F4F6F9]">
              {t.practice.modes[selectedMode].title}
            </h3>
          </div>

          {(selectedMode === 'RANDOM' ||
            selectedMode === 'CATEGORY' ||
            selectedMode === 'WEAK_AREAS') && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#667085] dark:text-[#98A2B3] whitespace-nowrap">
                {t.practice.questionCountLabel}:
              </span>
              <div className="inline-flex items-center p-1 rounded-xl bg-[#FAF9F6] dark:bg-[#0D1726] border border-[#E9EBEF] dark:border-[#24344D]">
                {[5, 10, 20, 40].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setSessionLength(num)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono-tabular font-semibold transition-colors ${
                      sessionLength === num
                        ? 'bg-[#14243A] text-white dark:bg-[#D8A43B] dark:text-[#14243A]'
                        : 'text-[#667085] dark:text-[#98A2B3]'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {selectedMode === 'CATEGORY' && (
          <div>
            <label className="block text-xs font-semibold text-[#667085] dark:text-[#98A2B3] mb-2">
              {t.practice.chooseCategory}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {categories.map((cat) => {
                const active = selectedCategoryId === cat.id;
                const countInCat = questions.filter((q) => q.categoryId === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategoryId(cat.id)}
                    className={`p-3.5 rounded-xl border text-left transition-colors flex items-center justify-between gap-2 ${
                      active
                        ? 'border-[#14243A] bg-[#14243A]/[0.04] dark:border-[#D8A43B] dark:bg-[#D8A43B]/10'
                        : 'border-[#E9EBEF] dark:border-[#24344D] hover:bg-[#FAF9F6] dark:hover:bg-[#1C2C46]'
                    }`}
                  >
                    <span className="text-sm font-medium text-[#14243A] dark:text-[#F4F6F9] truncate">
                      {cat.number}. {loc(cat.title)}
                    </span>
                    <span className="text-xs font-mono-tabular text-[#667085] dark:text-[#98A2B3] shrink-0">
                      {countInCat} items
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div>
          <PrimaryButton onClick={() => startMode(selectedMode, selectedCategoryId)}>
            {t.practice.startPractice}
            <ArrowRight className="w-4 h-4" />
          </PrimaryButton>
        </div>
      </section>
    </div>
  );
};
