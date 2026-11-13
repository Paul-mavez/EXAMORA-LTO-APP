import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Check, ChevronRight, HelpCircle, RotateCcw, X } from 'lucide-react';
import { REVIEWER_CATEGORIES, REVIEWER_QUESTIONS } from '../../data/local/reviewerDatabase';
import { ReviewerCategory, ReviewerQuestion } from '../../domain/model/reviewerModels';
import { CategoryBadge } from '../../ui/components/CategoryBadge';
import { RoadSignIllustration } from '../../ui/components/RoadSignIllustration';

const WHEEL_ITEM_HEIGHT = 44;
const QUIZ_SESSION_STORAGE_KEY = 'examora_active_quiz_session_v1';

interface SavedQuizSession {
  stage: 'CATEGORY_SELECT' | 'READY_SETUP' | 'QUIZ_ACTIVE' | 'QUIZ_RESULT';
  categoryId: string;
  questionCount: number;
  activeQuestions: ReviewerQuestion[];
  currentIdx: number;
  selectedAnswers: Record<string, string>;
}

const loadSavedQuizSession = (): SavedQuizSession | null => {
  try {
    const raw = localStorage.getItem(QUIZ_SESSION_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SavedQuizSession;
  } catch {
    return null;
  }
};

export const QuizView: React.FC = () => {
  const savedSession = useRef<SavedQuizSession | null>(loadSavedQuizSession()).current;

  // Navigation states: 'CATEGORY_SELECT' | 'READY_SETUP' | 'QUIZ_ACTIVE' | 'QUIZ_RESULT'
  const [stage, setStage] = useState<'CATEGORY_SELECT' | 'READY_SETUP' | 'QUIZ_ACTIVE' | 'QUIZ_RESULT'>(
    () => savedSession?.stage || 'CATEGORY_SELECT'
  );
  const [selectedCategory, setSelectedCategory] = useState<ReviewerCategory>(() => {
    if (savedSession?.categoryId) {
      const found = REVIEWER_CATEGORIES.find((c) => c.id === savedSession.categoryId);
      if (found) return found;
    }
    return REVIEWER_CATEGORIES[0];
  });
  const [questionCount, setQuestionCount] = useState<number>(() => savedSession?.questionCount || 10);
  const wheelRef = useRef<HTMLDivElement | null>(null);
  // Active quiz states
  const [activeQuestions, setActiveQuestions] = useState<ReviewerQuestion[]>(
    () => savedSession?.activeQuestions || []
  );
  const [currentIdx, setCurrentIdx] = useState<number>(() => savedSession?.currentIdx || 0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>(
    () => savedSession?.selectedAnswers || {}
  );

  // Persist quiz session automatically whenever quiz state changes
  useEffect(() => {
    try {
      const payload: SavedQuizSession = {
        stage,
        categoryId: selectedCategory.id,
        questionCount,
        activeQuestions,
        currentIdx,
        selectedAnswers,
      };
      localStorage.setItem(QUIZ_SESSION_STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // ignore storage errors
    }
  }, [stage, selectedCategory.id, questionCount, activeQuestions, currentIdx, selectedAnswers]);

  useEffect(() => {
    if (stage === 'READY_SETUP' && wheelRef.current) {
      const targetScroll = (questionCount - 1) * WHEEL_ITEM_HEIGHT;
      wheelRef.current.scrollTop = targetScroll;
    }
  }, [stage, selectedCategory.id]);

  const handleSelectCategory = (cat: ReviewerCategory) => {
    const initialCount = Math.min(10, cat.questionCount);
    setSelectedCategory(cat);
    setQuestionCount(initialCount);
    setStage('READY_SETUP');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWheelScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    const index = Math.round(scrollTop / WHEEL_ITEM_HEIGHT);
    const clamped = Math.max(1, Math.min(selectedCategory.questionCount, index + 1));
    if (clamped !== questionCount) {
      setQuestionCount(clamped);
    }
  };

  const scrollToQuestionCount = (count: number) => {
    setQuestionCount(count);
    if (wheelRef.current) {
      wheelRef.current.scrollTo({
        top: (count - 1) * WHEEL_ITEM_HEIGHT,
        behavior: 'smooth',
      });
    }
  };

  const handleStartQuiz = () => {
    const pool = REVIEWER_QUESTIONS.filter((q) => q.categoryId === selectedCategory.id);
    const shuffled = [...pool].sort(() => 0.5 - Math.random()).slice(0, questionCount);
    setActiveQuestions(shuffled);
    setCurrentIdx(0);
    setSelectedAnswers({});
    setStage('QUIZ_ACTIVE');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectOption = (questionId: string, choiceId: string) => {
    if (selectedAnswers[questionId]) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: choiceId }));
  };

  const calculateScore = () => {
    let correct = 0;
    activeQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctChoiceId) {
        correct++;
      }
    });
    return {
      correct,
      total: activeQuestions.length,
      pct: Math.round((correct / activeQuestions.length) * 100),
    };
  };

  // 1. STAGE: CATEGORY SELECTOR
  if (stage === 'CATEGORY_SELECT') {
    return (
      <div className="w-full max-w-md mx-auto px-4 pt-8 pb-32 min-h-screen text-[#14243A]">
        <h1 className="mb-2 font-display text-3xl font-bold tracking-tight text-[#14243A]">
          LTO Driver Exam
        </h1>
        <p className="mb-5 text-sm text-[#667085]">
          Choose a category to start your quiz.
        </p>

        <div className="overflow-hidden rounded-3xl border border-[#E9EBEF] bg-white shadow-sm divide-y divide-[#E9EBEF]">
          {REVIEWER_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleSelectCategory(cat)}
              className="group flex w-full items-center justify-between gap-3.5 p-4 text-left transition-colors hover:bg-[#F5F9FF] active:bg-[#EFF6FF]"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <CategoryBadge type={cat.iconType} size="md" />
                <div className="min-w-0">
                  <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug text-[#14243A] transition-colors group-hover:text-[#0A84FF]">
                    {cat.title}
                  </h3>
                  <p className="mt-0.5 line-clamp-1 text-xs text-[#667085]">
                    {cat.subtitle}
                  </p>
                  <div className="mt-1 flex items-center gap-1.5 text-xs font-medium text-[#0A84FF]">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>{cat.questionCount} questions</span>
                  </div>
                </div>
              </div>

              <ChevronRight className="h-5 w-5 shrink-0 text-[#98A2B3] transition-transform group-hover:translate-x-0.5" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  // 2. STAGE: QUIZ SETUP
  if (stage === 'READY_SETUP') {
    const allCounts = Array.from(
      { length: selectedCategory.questionCount },
      (_, i) => i + 1
    );

    return (
      <div className="w-full max-w-md mx-auto px-4 pt-8 pb-32 min-h-screen text-[#14243A]">
        <div>
          <div className="mb-6 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setStage('CATEGORY_SELECT')}
              aria-label="Back to categories"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E9EBEF] bg-white text-[#475569] transition-colors hover:bg-[#F5F9FF]"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h2 className="truncate text-base font-semibold text-[#14243A]">
              {selectedCategory.title}
            </h2>
          </div>

          <div className="mb-5 flex items-center gap-4 rounded-2xl border border-[#BFDBFE] bg-white p-4">
            <CategoryBadge type={selectedCategory.iconType} size="md" />
            <div>
              <h1 className="text-lg font-bold tracking-tight text-[#14243A]">Ready?</h1>
              <p className="mt-0.5 text-sm text-[#667085]">
                Choose how many questions to answer.
              </p>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="mb-3 text-center text-sm font-semibold text-[#14243A]">
              Number of Questions
            </h3>

            <div className="relative overflow-hidden rounded-2xl border border-[#E9EBEF] bg-white px-3 py-2 shadow-sm">
              <div
                className="pointer-events-none absolute left-3 right-3 top-1/2 h-[44px] -translate-y-1/2 rounded-xl border border-[#BFDBFE] bg-[#EFF6FF]"
                aria-hidden="true"
              />
              <div
                ref={wheelRef}
                onScroll={handleWheelScroll}
                className="relative z-10 h-[132px] overflow-y-scroll snap-y snap-mandatory no-scrollbar select-none"
              >
                <div className="h-[44px] shrink-0" />

                {allCounts.map((num) => {
                  const isSelected = num === questionCount;
                  const distance = Math.abs(num - questionCount);
                  return (
                    <button
                      key={num}
                      type="button"
                      onClick={() => scrollToQuestionCount(num)}
                      className={`w-full h-[44px] snap-center flex items-center justify-center transition-all duration-150 ${
                        isSelected
                          ? 'text-[#0A84FF] text-lg sm:text-xl font-semibold'
                          : distance === 1
                          ? 'text-[#667085] text-base sm:text-lg font-normal'
                          : 'text-[#98A2B3]/60 text-sm sm:text-base font-normal'
                      }`}
                    >
                      {num} {num === 1 ? 'question' : 'questions'}
                    </button>
                  );
                })}

                <div className="h-[44px] shrink-0" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <button
            type="button"
            onClick={handleStartQuiz}
            className="min-h-12 w-full rounded-xl bg-[#0A84FF] px-4 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#006FE6]"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  // 3. STAGE: ACTIVE QUIZ
  if (stage === 'QUIZ_ACTIVE' && activeQuestions.length > 0) {
    const currentQ = activeQuestions[currentIdx];
    const userChoiceId = selectedAnswers[currentQ.id];
    const isAnswered = Boolean(userChoiceId);

    // Live score calculation across answered questions so far
    const answeredIds = Object.keys(selectedAnswers);
    const answeredCount = answeredIds.length;
    const correctSoFar = activeQuestions.reduce((acc, q) => {
      if (selectedAnswers[q.id] && selectedAnswers[q.id] === q.correctChoiceId) {
        return acc + 1;
      }
      return acc;
    }, 0);
    const livePct = answeredCount > 0 ? Math.round((correctSoFar / answeredCount) * 100) : 0;
    const isPassingSoFar = answeredCount > 0 && livePct >= 80;
    const scoreColorClass = isPassingSoFar ? 'text-[#32845A]' : 'text-[#667085]';
    const scoreBadgeBgClass = isPassingSoFar
      ? 'bg-[#DCFCE7] text-[#15803D]'
      : 'bg-[#EFF6FF] text-[#475569]';

    const handlePrevious = () => {
      if (currentIdx > 0) {
        setCurrentIdx((prev) => prev - 1);
      }
    };

    const handleNext = () => {
      if (currentIdx < activeQuestions.length - 1) {
        setCurrentIdx((prev) => prev + 1);
      } else {
        setStage('QUIZ_RESULT');
      }
    };

    const progressPct = ((currentIdx + 1) / activeQuestions.length) * 100;

    return (
      <div className="w-full max-w-md mx-auto px-4 pb-[100px] text-[#14243A] h-[100dvh] max-h-[100dvh] overflow-hidden flex flex-col justify-between">
        <div className="-mx-4 shrink-0 border-b border-[#E9EBEF] bg-white px-4 pb-4 pt-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setStage('CATEGORY_SELECT')}
              className="shrink-0 rounded-xl border border-[#E9EBEF] bg-[#F5F9FF] px-3.5 py-2 text-xs font-semibold text-[#475569] transition-colors hover:bg-[#EFF6FF]"
            >
              Exit
            </button>
            <h2 className="truncate text-sm font-semibold text-[#14243A]">
              {selectedCategory.title}
            </h2>
          </div>

          <div className="mb-2 mt-4 flex items-end justify-between">
            <span className="text-sm font-semibold text-[#14243A]">
              Question {currentIdx + 1} of {activeQuestions.length}
            </span>

            <div className={`flex flex-col items-end leading-tight ${scoreColorClass}`}>
              <div className="flex items-center gap-1.5 text-xs font-semibold">
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${scoreBadgeBgClass}`}
                >
                  <Check className="h-2.5 w-2.5 stroke-[3.5]" />
                </span>
                <span>
                  Score: {correctSoFar}/{answeredCount}
                </span>
              </div>
              <span className="text-[11px] font-medium">{livePct}% correct</span>
            </div>
          </div>

          <div
            className="h-1.5 w-full overflow-hidden rounded-full bg-[#E9EBEF]"
            role="progressbar"
            aria-label="Quiz progress"
            aria-valuemin={0}
            aria-valuemax={activeQuestions.length}
            aria-valuenow={currentIdx + 1}
          >
            <div
              className="h-full rounded-full bg-[#0A84FF] transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        <div className="flex-1 min-h-0 flex flex-col justify-between py-2">
          <div className="flex-1 min-h-0 flex flex-col justify-start pt-2">
            {currentQ.imageResource && (
              <RoadSignIllustration
                imageResource={currentQ.imageResource}
                variant="quiz"
                className={
                  isAnswered
                    ? '[&_svg]:!w-[clamp(4.5rem,11.5vh,7.25rem)] [&_svg]:!h-[clamp(4.25rem,11vh,6.75rem)] !my-1 transition-all duration-200'
                    : '[&_svg]:!w-[clamp(6.25rem,16vh,9.5rem)] [&_svg]:!h-[clamp(5.75rem,15vh,9rem)] !my-1.5 transition-all duration-200'
                }
              />
            )}

            <h3 className="mb-3 text-[clamp(0.88rem,1.95vh,1.05rem)] font-medium leading-snug text-[#14243A]">
              {currentQ.question}
            </h3>

            {/* Answer Options (A, B, C) */}
            <div className="space-y-2">
              {currentQ.choices.map((choice) => {
                const isSelected = userChoiceId === choice.id;
                const isCorrect = choice.id === currentQ.correctChoiceId;

                let containerClasses =
                  'border-[#E9EBEF] bg-white text-[#14243A] hover:bg-[#F5F9FF]';
                let letterBadgeClasses =
                  'border-2 border-[#CBD5E1] text-[#667085]';
                let textClasses = 'text-[#14243A]';

                if (isAnswered) {
                  if (isCorrect) {
                    containerClasses = 'bg-[#F0FDF4] border-[#86EFAC]';
                    letterBadgeClasses = 'border-2 border-[#22C55E] text-[#15803D]';
                    textClasses = 'text-[#166534]';
                  } else if (isSelected && !isCorrect) {
                    containerClasses = 'bg-[#FEF2F2] border-[#FECACA]';
                    letterBadgeClasses = 'border-2 border-[#EF4444] text-[#B91C1C]';
                    textClasses = 'text-[#991B1B]';
                  } else {
                    containerClasses = 'bg-[#F8FAFC] border-[#E9EBEF]';
                    letterBadgeClasses = 'border-2 border-[#CBD5E1] text-[#98A2B3]';
                    textClasses = 'text-[#667085]';
                  }
                }

                return (
                  <button
                    key={choice.id}
                    type="button"
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(currentQ.id, choice.id)}
                    className={`w-full px-3.5 py-[clamp(0.5rem,1.25vh,0.8rem)] rounded-2xl border text-left flex items-center justify-between gap-2.5 transition-all ${containerClasses}`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${letterBadgeClasses}`}
                      >
                        {choice.letter}
                      </span>
                      <span className={`line-clamp-2 text-[clamp(0.78rem,1.75vh,0.9rem)] font-normal leading-snug ${textClasses}`}>
                        {choice.text}
                      </span>
                    </div>

                    {isAnswered && isCorrect && (
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#22C55E] text-white">
                        <Check className="h-3 w-3 stroke-[3]" />
                      </span>
                    )}
                    {isAnswered && isSelected && !isCorrect && (
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EF4444] text-white">
                        <X className="h-3 w-3 stroke-[3]" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation Callout — Appears Once Answered */}
            {isAnswered && (
              <div className="mt-2 shrink-0 rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] px-3 py-2 text-[#0369A1]">
                <div className="mb-0.5 flex items-center gap-1 text-[11px] font-bold text-[#0A84FF]">
                  <span>💡</span>
                  <span>Explanation</span>
                </div>
                <p className="line-clamp-2 text-[11px] leading-snug text-[#475569]">
                  {currentQ.explanation}
                </p>
              </div>
            )}
          </div>

          <div className="grid shrink-0 grid-cols-2 gap-3 pt-2 pb-1">
            {currentIdx > 0 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="min-h-11 rounded-xl border border-[#BFDBFE] bg-white px-3 text-sm font-semibold text-[#475569] transition-colors hover:bg-[#F5F9FF]"
              >
                Previous
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              disabled={!isAnswered}
              className={`min-h-11 rounded-xl bg-[#0A84FF] px-3 text-sm font-semibold text-white transition-colors hover:bg-[#006FE6] disabled:cursor-not-allowed disabled:bg-[#BFDBFE] ${
                currentIdx === 0 ? 'col-span-2' : ''
              }`}
            >
              {currentIdx < activeQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 4. STAGE: QUIZ RESULT
  const score = calculateScore();
  return (
    <div className="w-full max-w-md mx-auto px-4 pt-8 pb-32 min-h-screen text-[#14243A] flex flex-col justify-between">
      <div>
        <div className="text-center py-6">
          <CategoryBadge type={selectedCategory.iconType} size="lg" className="mx-auto mb-4" />
          <h1 className="mb-2 text-3xl font-extrabold text-[#14243A]">Quiz Complete!</h1>
          <p className="text-sm text-[#667085]">{selectedCategory.title}</p>
        </div>

        <div className="space-y-4 rounded-3xl border border-[#E9EBEF] bg-white p-6 text-center shadow-sm">
          <p className="font-mono-tabular text-5xl font-black text-[#0A84FF]">
            {score.pct}%
          </p>
          <p className="text-base font-semibold text-[#14243A]">
            {score.correct} out of {score.total} correct
          </p>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#E9EBEF]">
            <div
              className="bg-[#0A84FF] h-full rounded-full transition-all duration-500"
              style={{ width: `${score.pct}%` }}
            />
          </div>
          <p className="text-sm leading-relaxed text-[#667085]">
            {score.pct >= 80
              ? '🎉 Excellent work! You passed the passing score criteria for this quiz.'
              : 'Keep practicing! Review the explanations in the Study Guide to strengthen weak areas.'}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <button
          type="button"
          onClick={handleStartQuiz}
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0A84FF] py-3 text-base font-bold text-white transition-colors hover:bg-[#006FE6]"
        >
          <RotateCcw className="w-5 h-5" />
          Retake Quiz
        </button>
        <button
          type="button"
          onClick={() => setStage('CATEGORY_SELECT')}
          className="w-full rounded-xl border border-[#BFDBFE] bg-white py-3.5 text-sm font-semibold text-[#475569] transition-colors hover:bg-[#F5F9FF]"
        >
          Choose Another Category
        </button>
      </div>
    </div>
  );
};
