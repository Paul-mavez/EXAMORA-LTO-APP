import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Clock,
  Eye,
  EyeOff,
  HelpCircle,
  Search,
  Sparkles,
  X,
} from 'lucide-react';
import { REVIEWER_CATEGORIES, REVIEWER_QUESTIONS } from '../../data/local/reviewerDatabase';
import { ReviewerCategory } from '../../domain/model/reviewerModels';
import { CategoryBadge } from '../../ui/components/CategoryBadge';
import { RoadSignIllustration } from '../../ui/components/RoadSignIllustration';

export const ReviewersView: React.FC = () => {
  // View states: 'CATEGORY_LIST' | 'STUDY_SESSION'
  const [activeCategory, setActiveCategory] = useState<ReviewerCategory | null>(null);
  const [searchCategoryQuery, setSearchCategoryQuery] = useState('');
  const [searchQuestionQuery, setSearchQuestionQuery] = useState('');

  // Track expanded questions by id
  const [revealedQuestions, setRevealedQuestions] = useState<Record<string, boolean>>({
    tl_q1: true, // open question 1 by default like in screenshot IMG_4105
  });

  // 1-hour active study session timer countdown (matches IMG_4104 & IMG_4105 "STUDY SESSION ACTIVE / Expires in 58m 24s")
  const [secondsRemaining, setSecondsRemaining] = useState<number>(58 * 60 + 24);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 60 * 60));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
  };

  // Filter categories by search
  const filteredCategories = useMemo(() => {
    if (!searchCategoryQuery.trim()) return REVIEWER_CATEGORIES;
    const q = searchCategoryQuery.toLowerCase();
    return REVIEWER_CATEGORIES.filter(
      (c) => c.title.toLowerCase().includes(q) || c.subtitle.toLowerCase().includes(q)
    );
  }, [searchCategoryQuery]);

  // Questions for active category
  const categoryQuestions = useMemo(() => {
    if (!activeCategory) return [];
    let list = REVIEWER_QUESTIONS.filter((q) => q.categoryId === activeCategory.id);
    if (list.length === 0) {
      list = REVIEWER_QUESTIONS.slice(0, 15);
    }
    if (searchQuestionQuery.trim()) {
      const q = searchQuestionQuery.toLowerCase();
      list = list.filter(
        (item) =>
          item.question.toLowerCase().includes(q) ||
          item.explanation.toLowerCase().includes(q) ||
          item.choices.some((c) => c.text.toLowerCase().includes(q))
      );
    }
    return list;
  }, [activeCategory, searchQuestionQuery]);

  const toggleQuestionReveal = (questionId: string) => {
    setRevealedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const areAllRevealed = categoryQuestions.length > 0 && categoryQuestions.every((q) => revealedQuestions[q.id]);

  const toggleAll = () => {
    if (areAllRevealed) {
      setRevealedQuestions({});
    } else {
      const all: Record<string, boolean> = {};
      categoryQuestions.forEach((q) => {
        all[q.id] = true;
      });
      setRevealedQuestions(all);
    }
  };

  // -------------------------------------------------------------
  // VIEW 1: CATEGORY LIST (Matches Screenshot IMG_4106)
  // -------------------------------------------------------------
  if (!activeCategory) {
    return (
      <div className="w-full max-w-md mx-auto px-4 pt-4 pb-28 text-white">
        {/* Large Bold Header */}
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-4">
          Study Guide
        </h1>

        {/* Search Categories input */}
        <div className="relative mb-6">
          <Search className="w-4 h-4 text-[#8E8E93] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchCategoryQuery}
            onChange={(e) => setSearchCategoryQuery(e.target.value)}
            placeholder="Search categories..."
            className="w-full bg-[#1C1C1E] border border-[#2C2C2E] rounded-2xl py-3 pl-10 pr-10 text-sm text-white placeholder-[#8E8E93] focus:outline-none focus:border-[#0A84FF] transition-all"
          />
          {searchCategoryQuery && (
            <button
              type="button"
              onClick={() => setSearchCategoryQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E8E93] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Categories Grouped Container */}
        <div className="bg-[#1C1C1E] border border-[#2C2C2E] rounded-3xl overflow-hidden divide-y divide-[#2C2C2E]/70 shadow-2xl">
          {filteredCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setActiveCategory(cat);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full p-4 text-left flex items-center justify-between gap-3.5 hover:bg-[#2C2C2E]/40 active:bg-[#2C2C2E]/60 transition-colors group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="relative shrink-0">
                  <CategoryBadge type={cat.iconType} size="md" />
                  {cat.id === 'tagalog' && (
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#34C759] border-2 border-[#1C1C1E]" />
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-white group-hover:text-[#0A84FF] transition-colors truncate">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-[#8E8E93] line-clamp-1 mt-0.5">
                    {cat.subtitle}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-[#0A84FF] font-medium mt-1">
                    <HelpCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{cat.questionCount} questions</span>
                  </div>
                </div>
              </div>

              <ChevronRight className="w-5 h-5 text-[#8E8E93] shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </button>
          ))}
        </div>

        {/* Offline & Ready Notice */}
        <div className="mt-6 p-4 rounded-2xl bg-[#1C1C1E]/60 border border-[#2C2C2E] flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#0A84FF]/10 text-[#0A84FF] flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-white">Full Offline Reviewer</h4>
            <p className="text-[11px] text-[#8E8E93]">
              All questions, road signs, and explanations are stored locally on your device.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 2: CATEGORY STUDY SESSION (Matches Screenshot IMG_4104 & IMG_4105)
  // -------------------------------------------------------------
  return (
    <div className="w-full max-w-md mx-auto px-4 pt-3 pb-28 text-white min-h-screen">
      {/* Top Bar with circular back button and centered title */}
      <div className="relative flex items-center justify-center py-2 mb-3">
        <button
          type="button"
          onClick={() => {
            setActiveCategory(null);
            setSearchQuestionQuery('');
          }}
          className="absolute left-0 w-10 h-10 rounded-full bg-[#1C1C1E] border border-[#2C2C2E] flex items-center justify-center text-white hover:bg-[#2C2C2E] transition-colors"
          aria-label="Back to categories"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-base font-semibold text-white tracking-tight">
          {activeCategory.title}
        </h2>
      </div>

      {/* Search questions, answers, or explanations input */}
      <div className="relative mb-4">
        <Search className="w-4 h-4 text-[#8E8E93] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuestionQuery}
          onChange={(e) => setSearchQuestionQuery(e.target.value)}
          placeholder="Search questions, answers, or explanations..."
          className="w-full bg-[#1C1C1E] border border-[#2C2C2E] rounded-2xl py-3 pl-10 pr-10 text-xs text-white placeholder-[#8E8E93] focus:outline-none focus:border-[#0A84FF] transition-all"
        />
        {searchQuestionQuery && (
          <button
            type="button"
            onClick={() => setSearchQuestionQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E8E93] hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* STUDY SESSION ACTIVE BANNER (Matches IMG_4104 & IMG_4105) */}
      <div className="mb-5 p-3.5 rounded-2xl bg-[#1C1408] border border-[#3E2911] flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#3B2206] text-[#FF9500] flex items-center justify-center shrink-0 border border-[#683C0B]/60">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold tracking-wider text-[#A3733A] uppercase">
              STUDY SESSION ACTIVE
            </p>
            <p className="text-sm font-bold text-[#FF9500]">
              Expires in {formatTimer(secondsRemaining)}
            </p>
          </div>
        </div>

        {/* Circular Countdown Progress Ring */}
        <div className="relative w-8 h-8 shrink-0 flex items-center justify-center">
          <svg className="w-8 h-8 -rotate-90" viewBox="0 0 36 36">
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="none"
              stroke="#3B2206"
              strokeWidth="3.5"
            />
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="none"
              stroke="#FF9500"
              strokeWidth="3.5"
              strokeDasharray="88"
              strokeDashoffset={`${88 - (secondsRemaining / 3600) * 88}`}
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Header Row: Questions count + Show All / Hide All pill button */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-white">
            {activeCategory.questionCount} Questions
          </h3>
          <p className="text-xs text-[#8E8E93]">
            Tap any question to reveal the answer
          </p>
        </div>

        <button
          type="button"
          onClick={toggleAll}
          className="px-3.5 py-1.5 rounded-full bg-[#0E2A47] hover:bg-[#153D66] text-[#0A84FF] text-xs font-semibold transition-colors flex items-center gap-1.5"
        >
          {areAllRevealed ? 'Hide All' : 'Show All'}
        </button>
      </div>

      {/* Question Cards List */}
      <div className="space-y-4">
        {categoryQuestions.map((item, idx) => {
          const isRevealed = Boolean(revealedQuestions[item.id]);

          return (
            <div
              key={item.id}
              className={`rounded-3xl p-5 border transition-all duration-200 ${
                isRevealed
                  ? 'bg-[#1C1C1E] border-[#0A84FF]/40 shadow-xl'
                  : 'bg-[#1C1C1E] border-[#2C2C2E] hover:border-[#3A3A3C]'
              }`}
            >
              {/* Card Header: Question Badge + Question number + Show/Hide Button */}
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#0A84FF] text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {item.number || idx + 1}
                  </span>
                  <span className="text-xs font-medium text-[#8E8E93]">
                    Question {item.number || idx + 1} of {activeCategory.questionCount}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => toggleQuestionReveal(item.id)}
                  className="px-3 py-1 rounded-full bg-[#0E2A47] text-[#0A84FF] text-xs font-semibold flex items-center gap-1.5 hover:bg-[#153D66] transition-colors"
                >
                  {isRevealed ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>Hide</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>Show</span>
                    </>
                  )}
                </button>
              </div>

              {/* Question Text */}
              <p
                onClick={() => toggleQuestionReveal(item.id)}
                className="text-base font-medium text-white leading-snug mb-4 cursor-pointer select-none"
              >
                {item.question}
              </p>

              {/* Optional Road Sign Image */}
              {item.imageResource && (
                <RoadSignIllustration imageResource={item.imageResource} />
              )}

              {/* Choices (A, B, C) */}
              <div className="space-y-2.5">
                {item.choices.map((choice) => {
                  const isCorrect = choice.id === item.correctChoiceId;
                  const showAsCorrect = isRevealed && isCorrect;

                  return (
                    <div
                      key={choice.id}
                      onClick={() => toggleQuestionReveal(item.id)}
                      className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                        showAsCorrect
                          ? 'bg-[#112418] border-[#34C759] text-[#34C759]'
                          : 'bg-[#2C2C2E]/60 border-[#38383A]/60 text-white hover:bg-[#2C2C2E]'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${
                            showAsCorrect
                              ? 'bg-[#34C759] text-black shadow-sm'
                              : 'bg-[#3A3A3C] text-white/80'
                          }`}
                        >
                          {choice.letter}
                        </span>
                        <span
                          className={`text-sm leading-relaxed ${
                            showAsCorrect ? 'text-[#34C759] font-medium' : 'text-[#E5E5EA]'
                          }`}
                        >
                          {choice.text}
                        </span>
                      </div>

                      {showAsCorrect && (
                        <div className="w-5 h-5 rounded-full bg-[#34C759] text-black flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Explanation Callout (Amber Box matching IMG_4105) */}
              {isRevealed && (
                <div className="mt-4 p-4 rounded-2xl bg-[#20170A] border border-[#422E14] text-[#E0B88F] animate-in fade-in duration-200">
                  <div className="flex items-center gap-1.5 font-bold text-sm text-[#FF9500] mb-1.5">
                    <span>💡</span>
                    <span>Explanation</span>
                  </div>
                  <p className="text-xs leading-relaxed text-[#D2B48C]">
                    {item.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}

        {categoryQuestions.length === 0 && (
          <div className="text-center py-12 bg-[#1C1C1E] rounded-3xl border border-[#2C2C2E] p-6">
            <p className="text-sm text-[#8E8E93]">No questions found matching your search.</p>
            <button
              type="button"
              onClick={() => setSearchQuestionQuery('')}
              className="mt-3 text-xs text-[#0A84FF] font-semibold underline"
            >
              Clear search filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
