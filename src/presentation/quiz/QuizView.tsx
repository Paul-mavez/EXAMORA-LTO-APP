import React, { useState } from 'react';
import { ArrowLeft, Check, ChevronDown, ChevronRight, HelpCircle, RotateCcw, X } from 'lucide-react';
import { REVIEWER_CATEGORIES, REVIEWER_QUESTIONS } from '../../data/local/reviewerDatabase';
import { ReviewerCategory, ReviewerQuestion } from '../../domain/model/reviewerModels';
import { CategoryBadge } from '../../ui/components/CategoryBadge';
import { RoadSignIllustration } from '../../ui/components/RoadSignIllustration';

export const QuizView: React.FC = () => {
  // Navigation states: 'CATEGORY_SELECT' | 'READY_SETUP' | 'QUIZ_ACTIVE' | 'QUIZ_RESULT'
  const [stage, setStage] = useState<'CATEGORY_SELECT' | 'READY_SETUP' | 'QUIZ_ACTIVE' | 'QUIZ_RESULT'>('CATEGORY_SELECT');
  const [selectedCategory, setSelectedCategory] = useState<ReviewerCategory>(REVIEWER_CATEGORIES[0]);
  const [questionCount, setQuestionCount] = useState<number>(10);

  // Active quiz states
  const [activeQuestions, setActiveQuestions] = useState<ReviewerQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});

  const baseNumbers = [5, 8, 9, 10, 11, 15, 20, 25, 30, 40, 50, 60, 75, 100, selectedCategory.questionCount];
  const availableNumbers = Array.from(
    new Set(baseNumbers.filter((n) => n <= selectedCategory.questionCount))
  ).sort((a, b) => a - b);

  const handleSelectCategory = (cat: ReviewerCategory) => {
    setSelectedCategory(cat);
    setQuestionCount(Math.min(10, cat.questionCount));
    setStage('READY_SETUP');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      <div className="w-full max-w-md mx-auto px-4 pt-4 pb-28 text-white min-h-screen">
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

  // 2. STAGE: READY? QUESTION COUNT PICKER (Matches Screenshot IMG_4103)
  if (stage === 'READY_SETUP') {
    const currentIndex = availableNumbers.indexOf(questionCount);
    const validIdx = currentIndex === -1 ? 3 : currentIndex;
    const prevCount = validIdx > 0 ? availableNumbers[validIdx - 1] : null;
    const nextCount = validIdx < availableNumbers.length - 1 ? availableNumbers[validIdx + 1] : null;

    return (
      <div className="w-full max-w-md mx-auto px-4 pt-3 pb-28 text-white min-h-screen flex flex-col justify-between">
        <div>
          {/* Top Bar with circular back button and centered title */}
          <div className="relative flex items-center justify-center py-2 mb-6">
            <button
              type="button"
              onClick={() => setStage('CATEGORY_SELECT')}
              className="absolute left-0 w-10 h-10 rounded-full bg-[#1C1C1E] border border-[#2C2C2E] flex items-center justify-center text-white hover:bg-[#2C2C2E] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-base font-semibold text-white">
              {selectedCategory.title}
            </h2>
          </div>

          {/* Center visual emblem & "Ready?" */}
          <div className="flex flex-col items-center text-center mt-6 mb-8">
            <CategoryBadge type={selectedCategory.iconType} size="lg" className="mb-5 shadow-2xl" />
            <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Ready?</h1>
            <p className="text-sm text-[#8E8E93]">
              Select how many questions you'd like to answer
            </p>
          </div>

          {/* "Number of Questions" wheel roller (Matches IMG_4103) */}
          <div className="mt-8">
            <h3 className="text-center text-base font-semibold text-white mb-4">
              Number of Questions
            </h3>

            <div className="bg-[#1C1C1E] border border-[#2C2C2E] rounded-3xl p-3 shadow-2xl max-w-xs mx-auto">
              <div className="flex flex-col items-center py-1">
                {/* Previous question count */}
                {prevCount ? (
                  <button
                    type="button"
                    onClick={() => setQuestionCount(prevCount)}
                    className="py-2 text-sm text-[#8E8E93]/60 hover:text-white transition-colors"
                  >
                    {prevCount} questions
                  </button>
                ) : (
                  <div className="h-8" />
                )}

                {/* Highlighted Selected question count */}
                <div className="w-full py-3 px-6 rounded-2xl bg-[#2C2C2E] text-center text-white font-bold text-lg shadow-inner my-1 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => prevCount && setQuestionCount(prevCount)}
                    disabled={!prevCount}
                    className="text-[#8E8E93] disabled:opacity-20 hover:text-white p-1"
                  >
                    <ChevronDown className="w-4 h-4 rotate-180" />
                  </button>
                  <span>{questionCount} questions</span>
                  <button
                    type="button"
                    onClick={() => nextCount && setQuestionCount(nextCount)}
                    disabled={!nextCount}
                    className="text-[#8E8E93] disabled:opacity-20 hover:text-white p-1"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>

                {/* Next question count */}
                {nextCount ? (
                  <button
                    type="button"
                    onClick={() => setQuestionCount(nextCount)}
                    className="py-2 text-sm text-[#8E8E93]/60 hover:text-white transition-colors"
                  >
                    {nextCount} questions
                  </button>
                ) : (
                  <div className="h-8" />
                )}
              </div>

              {/* Quick Select Buttons */}
              <div className="grid grid-cols-4 gap-1.5 pt-3 border-t border-[#2C2C2E] mt-2">
                {[5, 10, 20, selectedCategory.questionCount].map((cnt) => (
                  <button
                    key={cnt}
                    type="button"
                    onClick={() => setQuestionCount(cnt)}
                    className={`py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      questionCount === cnt
                        ? 'bg-[#0A84FF] text-white shadow-xs'
                        : 'bg-[#2C2C2E]/60 text-[#8E8E93] hover:text-white'
                    }`}
                  >
                    {cnt === selectedCategory.questionCount ? `All (${cnt})` : cnt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Start Quiz Bottom Vibrant Blue CTA (Matches IMG_4103) */}
        <div className="mt-8 pt-4">
          <button
            type="button"
            onClick={handleStartQuiz}
            className="w-full py-4 rounded-2xl bg-[#0A84FF] hover:bg-[#0071E3] active:scale-[0.99] text-white font-bold text-base shadow-lg shadow-[#0A84FF]/25 transition-all"
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

    const handleNext = () => {
      if (currentIdx < activeQuestions.length - 1) {
        setCurrentIdx((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setStage('QUIZ_RESULT');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    return (
      <div className="w-full max-w-md mx-auto px-4 pt-3 pb-28 text-white min-h-screen flex flex-col justify-between">
        <div>
          {/* Top Bar with back button */}
          <div className="relative flex items-center justify-between py-2 mb-4">
            <button
              type="button"
              onClick={() => setStage('READY_SETUP')}
              className="w-10 h-10 rounded-full bg-[#1C1C1E] border border-[#2C2C2E] flex items-center justify-center text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-sm font-semibold text-[#8E8E93]">
              {selectedCategory.title}
            </h2>
            <div className="w-10" />
          </div>

          {/* Question Card */}
          <div className="bg-[#1C1C1E] border border-[#2C2C2E] rounded-3xl p-5 mb-5 shadow-2xl">
            <div className="flex items-center gap-2 mb-3.5">
              <span className="w-6 h-6 rounded-full bg-[#0A84FF] text-white text-xs font-bold flex items-center justify-center">
                {currentIdx + 1}
              </span>
              <span className="text-xs text-[#8E8E93] font-medium">
                Question {currentIdx + 1} of {activeQuestions.length}
              </span>
            </div>

            {currentQ.imageResource && (
              <RoadSignIllustration imageResource={currentQ.imageResource} />
            )}

            <h3 className="text-base font-semibold text-white leading-snug mb-5">
              {currentQ.question}
            </h3>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQ.choices.map((choice) => {
                const isSelected = userChoiceId === choice.id;
                const isCorrect = choice.id === currentQ.correctChoiceId;

                let stateClasses = 'bg-[#2C2C2E]/60 border-[#38383A] text-white hover:bg-[#2C2C2E]';
                if (isAnswered) {
                  if (isCorrect) {
                    stateClasses = 'bg-[#112418] border-[#34C759] text-[#34C759]';
                  } else if (isSelected && !isCorrect) {
                    stateClasses = 'bg-red-950/40 border-red-500 text-red-300';
                  } else {
                    stateClasses = 'bg-[#2C2C2E]/30 border-transparent text-[#8E8E93] opacity-60';
                  }
                }

                return (
                  <button
                    key={choice.id}
                    type="button"
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(currentQ.id, choice.id)}
                    className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all ${stateClasses}`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${
                          isAnswered && isCorrect
                            ? 'bg-[#34C759] text-black'
                            : isAnswered && isSelected && !isCorrect
                            ? 'bg-red-500 text-white'
                            : 'bg-[#38383A] text-[#8E8E93]'
                        }`}
                      >
                        {choice.letter}
                      </span>
                      <span className="text-sm font-medium leading-relaxed">
                        {choice.text}
                      </span>
                    </div>

                    {isAnswered && isCorrect && (
                      <Check className="w-5 h-5 text-[#34C759] shrink-0" />
                    )}
                    {isAnswered && isSelected && !isCorrect && (
                      <X className="w-5 h-5 text-red-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation when answered */}
            {isAnswered && (
              <div className="mt-5 p-4 rounded-2xl bg-[#20170A] border border-[#422E14] text-[#E0B88F]">
                <div className="flex items-center gap-1.5 font-bold text-sm text-[#FF9500] mb-1">
                  <span>💡</span>
                  <span>Explanation</span>
                </div>
                <p className="text-xs leading-relaxed text-[#D2B48C]">
                  {currentQ.explanation}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Next / Submit Button */}
        <div>
          {isAnswered && (
            <button
              type="button"
              onClick={handleNext}
              className="w-full py-4 rounded-2xl bg-[#0A84FF] hover:bg-[#0071E3] active:scale-[0.99] text-white font-bold text-base shadow-lg transition-all"
            >
              {currentIdx < activeQuestions.length - 1 ? 'Next Question' : 'View Results'}
            </button>
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
