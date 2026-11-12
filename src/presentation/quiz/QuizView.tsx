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

  // 1. STAGE: CATEGORY SELECTOR (Matches Screenshot IMG_4102)
  if (stage === 'CATEGORY_SELECT') {
    return (
      <div className="w-full max-w-md mx-auto px-4 pt-10 pb-28 text-white min-h-screen">
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-6">
          LTO Driver Exam
        </h1>

        <div className="bg-[#1C1C1E] border border-[#2C2C2E] rounded-3xl overflow-hidden divide-y divide-[#2C2C2E]/70 shadow-2xl">
          {REVIEWER_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleSelectCategory(cat)}
              className="w-full p-4 text-left flex items-center justify-between gap-3.5 hover:bg-[#2C2C2E]/40 active:bg-[#2C2C2E]/60 transition-colors group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <CategoryBadge type={cat.iconType} size="md" />
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-white group-hover:text-[#0A84FF] transition-colors truncate">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-[#8E8E93] line-clamp-1 mt-0.5">
                    {cat.subtitle}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-[#0A84FF] font-medium mt-1">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>{cat.questionCount} questions</span>
                  </div>
                </div>
              </div>

              <ChevronRight className="w-5 h-5 text-[#8E8E93] shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  // 2. STAGE: READY? QUESTION COUNT PICKER (Matches Screenshot IMG_4103, Responsive & Non-Scrollable Page)
  if (stage === 'READY_SETUP') {
    const allCounts = Array.from(
      { length: selectedCategory.questionCount },
      (_, i) => i + 1
    );

    return (
      <div className="w-full max-w-md mx-auto px-4 pt-7 pb-[96px] text-white h-[100dvh] max-h-[100dvh] overflow-hidden flex flex-col justify-between">
        <div>
          {/* Top Bar with circular back button and centered title */}
          <div className="relative flex items-center justify-center py-1.5 mb-3">
            <button
              type="button"
              onClick={() => setStage('CATEGORY_SELECT')}
              className="absolute left-0 w-9 h-9 rounded-full bg-[#1C1C1E] border border-[#2C2C2E] flex items-center justify-center text-white hover:bg-[#2C2C2E] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-sm sm:text-base font-semibold text-white truncate max-w-[75%]">
              {selectedCategory.title}
            </h2>
          </div>

          {/* Center visual emblem & "Ready?" */}
          <div className="flex flex-col items-center text-center mt-2 sm:mt-4 mb-4 sm:mb-6">
            <CategoryBadge type={selectedCategory.iconType} size="lg" className="mb-3 sm:mb-4 shadow-2xl" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-1 tracking-tight">Ready?</h1>
            <p className="text-xs sm:text-sm text-[#8E8E93]">
              Select how many questions you'd like to answer
            </p>
          </div>

          {/* "Number of Questions" Scrollable iOS Drum Wheel (Matches IMG_4103) */}
          <div className="mt-2 sm:mt-4">
            <h3 className="text-center text-sm sm:text-base font-semibold text-white mb-3">
              Number of Questions
            </h3>

            <div className="bg-[#1C1C1E] rounded-2xl px-3 py-2 shadow-2xl relative overflow-hidden">
              {/* Center Highlight Pill Bar (Behind Selected Row) */}
              <div
                className="absolute left-3 right-3 top-1/2 -translate-y-1/2 h-[44px] rounded-xl bg-[#2C2C2E] pointer-events-none"
                aria-hidden="true"
              />

              {/* Vertical Scrollable Wheel Container (3 visible rows: 3 * 44px = 132px) */}
              <div
                ref={wheelRef}
                onScroll={handleWheelScroll}
                className="relative z-10 h-[132px] overflow-y-scroll snap-y snap-mandatory no-scrollbar select-none"
              >
                {/* Top 1-row spacer so item 1 can snap to center */}
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
                          ? 'text-white text-lg sm:text-xl font-medium'
                          : distance === 1
                          ? 'text-[#8E8E93]/75 text-base sm:text-lg font-normal'
                          : 'text-[#8E8E93]/30 text-sm sm:text-base font-normal'
                      }`}
                    >
                      {num} {num === 1 ? 'question' : 'questions'}
                    </button>
                  );
                })}

                {/* Bottom 1-row spacer so max item can snap to center */}
                <div className="h-[44px] shrink-0" />
              </div>
            </div>
          </div>
        </div>

        {/* Start Quiz Button Above the Bottom Navigation Bar with Padding */}
        <div className="pt-3 pb-2 shrink-0">
          <button
            type="button"
            onClick={handleStartQuiz}
            className="w-full py-3.5 sm:py-4 rounded-2xl bg-[#0A84FF] hover:bg-[#0071E3] active:scale-[0.99] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#0A84FF]/25 transition-all"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  // 3. STAGE: ACTIVE QUIZ (Non-Scrollable, Responsive on All Devices, With Explanation & Conditional Button)
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
    const scoreColorClass = isPassingSoFar ? 'text-[#30D158]' : 'text-[#FF453A]';
    const scoreBadgeBgClass = isPassingSoFar ? 'bg-[#30D158]' : 'bg-[#FF453A]';

    const handleNext = () => {
      if (currentIdx < activeQuestions.length - 1) {
        setCurrentIdx((prev) => prev + 1);
      } else {
        setStage('QUIZ_RESULT');
      }
    };

    const progressPct = ((currentIdx + 1) / activeQuestions.length) * 100;

    return (
      <div className="w-full max-w-md mx-auto px-4 pb-[90px] text-white h-[100dvh] max-h-[100dvh] overflow-hidden flex flex-col justify-between select-none">
        {/* Top Dark Header Block (Exit Pill + Category Title + Question Progress + Live Score) */}
        <div className="-mx-4 px-4 pt-6 pb-3 bg-[#161618] border-b border-[#242426] shrink-0">
          {/* Row 1: Exit button & Category title */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setStage('CATEGORY_SELECT')}
              className="px-4 py-1.5 rounded-full bg-[#242426] border border-[#38383A] text-[#FF453A] text-xs sm:text-sm font-medium hover:bg-[#2C2C2E] active:scale-95 transition-all shrink-0"
            >
              Exit
            </button>
            <h2 className="text-sm sm:text-base font-semibold text-white truncate">
              {selectedCategory.title}
            </h2>
          </div>

          {/* Row 2: Question X of Y & Live Score */}
          <div className="mt-2.5 mb-2 flex items-end justify-between">
            <span className="text-xs sm:text-sm font-medium text-white">
              Question {currentIdx + 1} of {activeQuestions.length}
            </span>

            <div className={`flex flex-col items-end leading-tight ${scoreColorClass}`}>
              <div className="flex items-center gap-1 text-xs sm:text-sm font-medium">
                <span
                  className={`w-3.5 h-3.5 rounded-full ${scoreBadgeBgClass} text-black flex items-center justify-center shrink-0`}
                >
                  <Check className="w-2.5 h-2.5 stroke-[3.5]" />
                </span>
                <span>
                  Score: {correctSoFar}/{answeredCount}
                </span>
              </div>
              <span className="text-[11px] font-medium">{livePct}%</span>
            </div>
          </div>

          {/* Row 3: Blue Progress Bar */}
          <div className="w-full h-1.5 bg-[#2C2C2E] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0A84FF] rounded-full transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Question Body Directly on Pure Black Canvas — Top-Aligned & Non-Scrollable */}
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

            <h3 className="text-[clamp(0.88rem,1.95vh,1.05rem)] font-medium text-white leading-snug mb-3">
              {currentQ.question}
            </h3>

            {/* Answer Options (A, B, C) */}
            <div className="space-y-2">
              {currentQ.choices.map((choice) => {
                const isSelected = userChoiceId === choice.id;
                const isCorrect = choice.id === currentQ.correctChoiceId;

                let containerClasses =
                  'bg-[#1C1C1E] border-[#2C2C2E] text-white hover:bg-[#242426]';
                let letterBadgeClasses =
                  'border-2 border-[#48484A] text-[#8E8E93]';
                let textClasses = 'text-white';

                if (isAnswered) {
                  if (isCorrect) {
                    containerClasses = 'bg-[#0E2415] border-[#30D158]';
                    letterBadgeClasses = 'border-2 border-[#30D158] text-[#30D158]';
                    textClasses = 'text-[#EBEBF5]/90';
                  } else if (isSelected && !isCorrect) {
                    containerClasses = 'bg-[#2A1215] border-[#FF453A]';
                    letterBadgeClasses = 'border-2 border-[#FF453A] text-[#FF453A]';
                    textClasses = 'text-[#EBEBF5]/80';
                  } else {
                    containerClasses = 'bg-[#1C1C1E] border-[#2C2C2E]';
                    letterBadgeClasses = 'border-2 border-[#3A3A3C] text-[#636366]';
                    textClasses = 'text-[#8E8E93]';
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
                        className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${letterBadgeClasses}`}
                      >
                        {choice.letter}
                      </span>
                      <span className={`text-[clamp(0.78rem,1.75vh,0.9rem)] font-normal leading-snug line-clamp-2 ${textClasses}`}>
                        {choice.text}
                      </span>
                    </div>

                    {isAnswered && isCorrect && (
                      <span className="w-5 h-5 rounded-full bg-[#30D158] text-black flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                    {isAnswered && isSelected && !isCorrect && (
                      <span className="w-5 h-5 rounded-full bg-[#FF453A] text-black flex items-center justify-center shrink-0">
                        <X className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation Callout — Appears Once Answered */}
            {isAnswered && (
              <div className="mt-2 px-3 py-2 rounded-xl bg-[#20170A] border border-[#422E14] text-[#E0B88F] shrink-0">
                <div className="flex items-center gap-1 font-bold text-[11px] text-[#FF9500] mb-0.5">
                  <span>💡</span>
                  <span>Explanation</span>
                </div>
                <p className="text-[11px] leading-snug text-[#D2B48C] line-clamp-2">
                  {currentQ.explanation}
                </p>
              </div>
            )}
          </div>

          {/* Bottom Action Button — Appears ONLY Once User Taps an Answer */}
          {isAnswered ? (
            <div className="pt-2 pb-1 shrink-0">
              <button
                type="button"
                onClick={handleNext}
                className="w-full py-3 rounded-2xl bg-[#0A84FF] hover:bg-[#0071E3] active:scale-[0.99] text-white font-semibold text-sm sm:text-base shadow-lg transition-all"
              >
                {currentIdx < activeQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </button>
            </div>
          ) : (
            <div className="h-2 shrink-0" />
          )}
        </div>
      </div>
    );
  }

  // 4. STAGE: QUIZ RESULT
  const score = calculateScore();
  return (
    <div className="w-full max-w-md mx-auto px-4 pt-6 pb-28 text-white min-h-screen flex flex-col justify-between">
      <div>
        <div className="text-center py-6">
          <CategoryBadge type={selectedCategory.iconType} size="lg" className="mx-auto mb-4" />
          <h1 className="text-3xl font-extrabold text-white mb-2">Quiz Complete!</h1>
          <p className="text-sm text-[#8E8E93]">{selectedCategory.title}</p>
        </div>

        <div className="bg-[#1C1C1E] border border-[#2C2C2E] rounded-3xl p-6 text-center shadow-xl space-y-4">
          <p className="text-5xl font-black text-[#0A84FF] font-mono-tabular">
            {score.pct}%
          </p>
          <p className="text-base font-semibold text-white">
            {score.correct} out of {score.total} correct
          </p>
          <div className="w-full bg-[#2C2C2E] h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-[#0A84FF] h-full rounded-full transition-all duration-500"
              style={{ width: `${score.pct}%` }}
            />
          </div>
          <p className="text-xs text-[#8E8E93]">
            {score.pct >= 80
              ? '🎉 Excellent work! You passed the passing score criteria for this quiz.'
              : 'Keep practicing! Review the explanations in the Study Guide to strengthen weak areas.'}
          </p>
        </div>
      </div>

      <div className="space-y-3 mt-6">
        <button
          type="button"
          onClick={handleStartQuiz}
          className="w-full py-4 rounded-2xl bg-[#0A84FF] hover:bg-[#0071E3] text-white font-bold text-base flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          Retake Quiz
        </button>
        <button
          type="button"
          onClick={() => setStage('CATEGORY_SELECT')}
          className="w-full py-3.5 rounded-2xl bg-[#1C1C1E] border border-[#2C2C2E] text-white font-semibold text-sm hover:bg-[#2C2C2E]"
        >
          Choose Another Category
        </button>
      </div>
    </div>
  );
};
