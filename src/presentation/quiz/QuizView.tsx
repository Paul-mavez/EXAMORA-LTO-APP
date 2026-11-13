import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, BookOpen, Check, ChevronRight, RotateCcw, X } from 'lucide-react';
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
  const [activeQuestions, setActiveQuestions] = useState<ReviewerQuestion[]>(
    () => savedSession?.activeQuestions || []
  );
  const [currentIdx, setCurrentIdx] = useState<number>(() => savedSession?.currentIdx || 0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>(
    () => savedSession?.selectedAnswers || {}
  );

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
      <div className="w-full max-w-md mx-auto px-4 pt-9 pb-32 min-h-screen text-[#14243A]">
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5578A8]">
          Practice Assessment
        </p>
        <h1 className="mb-1.5 font-display text-3xl font-bold tracking-[-0.02em] text-[#14243A]">
          LTO Driver Exam
        </h1>
        <p className="mb-6 text-sm text-[#667085] leading-[1.6]">
          Select an examination category to begin.
        </p>

        <div className="overflow-hidden rounded-xl border border-[#E2E5EB] bg-white divide-y divide-[#E9EBEF]">
          {REVIEWER_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleSelectCategory(cat)}
              className="group flex w-full items-center justify-between gap-3.5 p-4 text-left transition-colors hover:bg-[#FAF9F6] active:bg-[#E9EBEF]/50"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <CategoryBadge type={cat.iconType} size="md" />
                <div className="min-w-0">
                  <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug text-[#14243A]">
                    {cat.title}
                  </h3>
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-[#667085] truncate">
                    <span className="truncate">{cat.subtitle}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono-tabular font-medium text-[#5578A8] shrink-0">
                      {cat.questionCount} questions
                    </span>
                  </div>
                </div>
              </div>

              <ChevronRight
                className="h-4 w-4 shrink-0 text-[#667085] transition-transform group-hover:translate-x-0.5 group-hover:text-[#14243A]"
                strokeWidth={1.75}
              />
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
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[#E2E5EB] bg-white text-[#14243A] transition-colors hover:bg-[#E9EBEF]"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
            </button>
            <h2 className="truncate font-display text-base font-semibold text-[#14243A]">
              {selectedCategory.title}
            </h2>
          </div>

          <div className="mb-6 flex items-center gap-4 rounded-xl border border-[#E2E5EB] bg-white p-4">
            <CategoryBadge type={selectedCategory.iconType} size="md" />
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5578A8]">
                Session Setup
              </p>
              <h1 className="font-display text-lg font-bold tracking-[-0.02em] text-[#14243A]">
                Ready to practice?
              </h1>
              <p className="mt-0.5 text-xs text-[#667085]">
                {selectedCategory.questionCount} questions available in bank
              </p>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.12em] text-[#667085]">
              Number of Questions
            </h3>

            <div className="relative overflow-hidden rounded-xl border border-[#E2E5EB] bg-white px-3 py-2">
              <div
                className="pointer-events-none absolute left-3 right-3 top-1/2 h-[44px] -translate-y-1/2 rounded-md border border-[#E2E5EB] bg-[#FAF9F6]"
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
                      className={`w-full h-[44px] snap-center flex items-center justify-center font-mono-tabular transition-all duration-150 ${
                        isSelected
                          ? 'text-[#14243A] text-lg font-bold'
                          : distance === 1
                          ? 'text-[#667085] text-sm font-medium'
                          : 'text-[#667085]/50 text-xs font-normal'
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

        <div className="mt-6">
          <button
            type="button"
            onClick={handleStartQuiz}
            className="min-h-12 w-full rounded-md bg-[#14243A] px-4 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-[#FAF9F6] transition-colors hover:bg-[#1E3554]"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  // 3. STAGE: ACTIVE QUIZ (Non-scrollable 100dvh, distraction-free)
  if (stage === 'QUIZ_ACTIVE' && activeQuestions.length > 0) {
    const currentQ = activeQuestions[currentIdx];
    const userChoiceId = selectedAnswers[currentQ.id];
    const isAnswered = Boolean(userChoiceId);

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
      <div className="w-full max-w-md mx-auto px-4 pb-[92px] text-[#14243A] h-[100dvh] max-h-[100dvh] overflow-hidden flex flex-col justify-between bg-[#FAF9F6]">
        {/* Compact Editorial Top Header */}
        <div className="-mx-4 shrink-0 border-b border-[#E2E5EB] bg-white px-4 pb-3.5 pt-5">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setStage('CATEGORY_SELECT')}
              className="shrink-0 rounded-md border border-[#E2E5EB] bg-[#FAF9F6] px-3 py-1.5 text-xs font-semibold text-[#14243A] transition-colors hover:bg-[#E9EBEF]"
            >
              Exit
            </button>
            <h2 className="truncate font-display text-sm font-semibold text-[#14243A]">
              {selectedCategory.title}
            </h2>
          </div>

          <div className="mb-2 mt-3.5 flex items-baseline justify-between gap-2">
            <span className="font-mono-tabular text-xs font-semibold text-[#14243A]">
              Question {currentIdx + 1} / {activeQuestions.length}
            </span>

            <div className="flex items-center gap-1.5 font-mono-tabular text-xs text-[#667085]">
              {isPassingSoFar && (
                <Check className="h-3.5 w-3.5 text-[#C5A46D]" strokeWidth={2.25} />
              )}
              <span>
                Score: {correctSoFar}/{answeredCount}
              </span>
              <span aria-hidden="true">·</span>
              <span className={isPassingSoFar ? 'font-semibold text-[#14243A]' : ''}>
                {livePct}%
              </span>
            </div>
          </div>

          <div
            className="h-1 w-full overflow-hidden bg-[#E9EBEF]"
            role="progressbar"
            aria-label="Quiz progress"
            aria-valuemin={0}
            aria-valuemax={activeQuestions.length}
            aria-valuenow={currentIdx + 1}
          >
            <div
              className="h-full bg-[#14243A] transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Question & Options — Top-Aligned & Fits Cleanly */}
        <div className="flex-1 min-h-0 flex flex-col justify-between py-2.5">
          <div className="flex-1 min-h-0 flex flex-col justify-start pt-1.5">
            {currentQ.imageResource && (
              <RoadSignIllustration
                imageResource={currentQ.imageResource}
                variant="quiz"
                className={
                  isAnswered
                    ? '[&_svg]:!w-[clamp(4.25rem,10.5vh,6.75rem)] [&_svg]:!h-[clamp(4rem,10vh,6.25rem)] !my-1 transition-all duration-200'
                    : '[&_svg]:!w-[clamp(6rem,15vh,9rem)] [&_svg]:!h-[clamp(5.5rem,14vh,8.5rem)] !my-1.5 transition-all duration-200'
                }
              />
            )}

            <h3 className="mb-3 font-display text-[clamp(0.9rem,1.95vh,1.06rem)] font-semibold leading-snug text-[#14243A]">
              {currentQ.question}
            </h3>

            {/* Pure White Option Cards */}
            <div className="space-y-2">
              {currentQ.choices.map((choice) => {
                const isSelected = userChoiceId === choice.id;
                const isCorrect = choice.id === currentQ.correctChoiceId;

                let containerClasses =
                  'border-[#E2E5EB] bg-white text-[#14243A] hover:bg-[#E9EBEF]/40';
                let letterBadgeClasses =
                  'border border-[#E2E5EB] bg-[#FAF9F6] text-[#667085]';
                let textClasses = 'text-[#14243A]';

                if (isAnswered) {
                  if (isCorrect) {
                    containerClasses = 'bg-[#F3FAF6] border-[#2E7D5B]/60';
                    letterBadgeClasses = 'border-[#2E7D5B] bg-[#2E7D5B] text-white';
                    textClasses = 'text-[#14243A] font-medium';
                  } else if (isSelected && !isCorrect) {
                    containerClasses = 'bg-[#FDF4F4] border-[#B44040]/60';
                    letterBadgeClasses = 'border-[#B44040] bg-[#B44040] text-white';
                    textClasses = 'text-[#14243A]';
                  } else {
                    containerClasses = 'bg-[#FAF9F6] border-[#E2E5EB]';
                    letterBadgeClasses = 'border border-[#E2E5EB] bg-white text-[#667085]/70';
                    textClasses = 'text-[#667085]';
                  }
                }

                return (
                  <button
                    key={choice.id}
                    type="button"
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(currentQ.id, choice.id)}
                    className={`w-full px-3.5 py-[clamp(0.5rem,1.25vh,0.8rem)] rounded-xl border text-left flex items-center justify-between gap-2.5 transition-colors ${containerClasses}`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md font-mono-tabular text-xs font-semibold ${letterBadgeClasses}`}
                      >
                        {choice.letter}
                      </span>
                      <span
                        className={`line-clamp-2 text-[clamp(0.8rem,1.75vh,0.9rem)] leading-snug ${textClasses}`}
                      >
                        {choice.text}
                      </span>
                    </div>

                    {isAnswered && isCorrect && (
                      <Check className="h-4 w-4 shrink-0 text-[#2E7D5B]" strokeWidth={2.25} />
                    )}
                    {isAnswered && isSelected && !isCorrect && (
                      <X className="h-4 w-4 shrink-0 text-[#B44040]" strokeWidth={2.25} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Clear Answer Rationale Box */}
            {isAnswered && (
              <div className="mt-2.5 shrink-0 rounded-xl border border-[#E2E5EB] bg-white px-3.5 py-2.5">
                <div className="mb-0.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#5578A8]">
                  <BookOpen className="h-3 w-3" strokeWidth={1.75} />
                  <span>Answer Rationale</span>
                </div>
                <p className="line-clamp-2 text-[11px] leading-snug text-[#667085]">
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
                className="min-h-11 rounded-md border border-[#E2E5EB] bg-white px-3 text-xs font-semibold uppercase tracking-[0.08em] text-[#14243A] transition-colors hover:bg-[#E9EBEF]"
              >
                Previous
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              disabled={!isAnswered}
              className={`min-h-11 rounded-md bg-[#14243A] px-3 text-xs font-semibold uppercase tracking-[0.08em] text-[#FAF9F6] transition-colors hover:bg-[#1E3554] disabled:cursor-not-allowed disabled:bg-[#E9EBEF] disabled:text-[#667085] ${
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
  const isPassed = score.pct >= 80;
  return (
    <div className="w-full max-w-md mx-auto px-4 pt-9 pb-32 min-h-screen text-[#14243A] flex flex-col justify-between">
      <div>
        <div className="text-center py-6">
          <CategoryBadge type={selectedCategory.iconType} size="lg" className="mx-auto mb-4" />
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5578A8]">
            Assessment Summary
          </p>
          <h1 className="mb-1 font-display text-3xl font-bold tracking-[-0.02em] text-[#14243A]">
            Quiz Complete
          </h1>
          <p className="text-sm text-[#667085]">{selectedCategory.title}</p>
        </div>

        <div className="space-y-4 rounded-xl border border-[#E2E5EB] bg-white p-6 text-center">
          <p className="font-mono-tabular text-5xl font-bold text-[#14243A]">
            {score.pct}%
          </p>
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-[#667085]">
            <span className="font-mono-tabular text-[#14243A] font-semibold">
              {score.correct} / {score.total} correct
            </span>
            <span aria-hidden="true">·</span>
            <span className={isPassed ? 'text-[#C5A46D] font-semibold' : 'text-[#667085]'}>
              {isPassed ? 'Passing Criteria Met' : 'Target 80%'}
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden bg-[#E9EBEF]">
            <div
              className={`h-full transition-all duration-500 ${
                isPassed ? 'bg-[#14243A]' : 'bg-[#5578A8]'
              }`}
              style={{ width: `${score.pct}%` }}
            />
          </div>
          <p className="text-sm leading-[1.6] text-[#667085]">
            {isPassed
              ? 'Strong command of the material. You exceeded the 80% LTO passing benchmark for this session.'
              : 'Review the answer rationales in the Study Guide to reinforce key rules and road signs.'}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <button
          type="button"
          onClick={handleStartQuiz}
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-[#14243A] py-3 text-xs font-semibold uppercase tracking-[0.1em] text-[#FAF9F6] transition-colors hover:bg-[#1E3554]"
        >
          <RotateCcw className="w-4 h-4" strokeWidth={1.75} />
          Retake Quiz
        </button>
        <button
          type="button"
          onClick={() => setStage('CATEGORY_SELECT')}
          className="w-full rounded-md border border-[#E2E5EB] bg-white py-3.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#14243A] transition-colors hover:bg-[#E9EBEF]"
        >
          Choose Another Category
        </button>
      </div>
    </div>
  );
};
