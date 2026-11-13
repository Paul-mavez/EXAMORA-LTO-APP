import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Bookmark,
  BookOpen,
  Check,
  Clock,
  Eye,
  EyeOff,
  Search,
  WifiOff,
  X,
} from 'lucide-react';
import { REVIEWER_CATEGORIES, REVIEWER_QUESTIONS } from '../../data/local/reviewerDatabase';
import { ReviewerCategory } from '../../domain/model/reviewerModels';
import { CategoryBadge } from '../../ui/components/CategoryBadge';
import { RoadSignIllustration } from '../../ui/components/RoadSignIllustration';

const SHOW_STUDY_SESSION_BANNER = false;

interface ReviewersViewProps {
  bookmarkedQuestionIds: string[];
  onToggleBookmark: (questionId: string) => void;
}

export const ReviewersView: React.FC<ReviewersViewProps> = ({
  bookmarkedQuestionIds,
  onToggleBookmark,
}) => {
  const [activeCategory, setActiveCategory] = useState<ReviewerCategory | null>(null);
  const [showSavedQuestions, setShowSavedQuestions] = useState(false);
  const [searchCategoryQuery, setSearchCategoryQuery] = useState('');
  const [searchQuestionQuery, setSearchQuestionQuery] = useState('');

  const [revealedQuestions, setRevealedQuestions] = useState<Record<string, boolean>>({
    tl_q1: true,
  });

  const [secondsRemaining, setSecondsRemaining] = useState<number>(58 * 60 + 24);

  useEffect(() => {
    if (!SHOW_STUDY_SESSION_BANNER) return;
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

  const filteredCategories = useMemo(() => {
    if (!searchCategoryQuery.trim()) return REVIEWER_CATEGORIES;
    const q = searchCategoryQuery.toLowerCase();
    return REVIEWER_CATEGORIES.filter(
      (c) => c.title.toLowerCase().includes(q) || c.subtitle.toLowerCase().includes(q)
    );
  }, [searchCategoryQuery]);

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

  const savedQuestions = useMemo(
    () => REVIEWER_QUESTIONS.filter((q) => bookmarkedQuestionIds.includes(q.id)),
    [bookmarkedQuestionIds],
  );

  const toggleQuestionReveal = (questionId: string) => {
    setRevealedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const areAllRevealed =
    categoryQuestions.length > 0 && categoryQuestions.every((q) => revealedQuestions[q.id]);

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

  if (!activeCategory && showSavedQuestions) {
    return (
      <div className="w-full max-w-md mx-auto px-4 pt-8 pb-32 min-h-screen text-[#14243A]">
        <div className="mb-5 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowSavedQuestions(false)}
            aria-label="Back to reviewer categories"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[#E2E5EB] bg-white text-[#14243A] transition-colors hover:bg-[#E9EBEF]"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
          </button>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5578A8]">
              Reviewers
            </p>
            <h1 className="font-display text-xl font-bold text-[#14243A]">Saved Questions</h1>
          </div>
        </div>

        {savedQuestions.length === 0 ? (
          <div className="rounded-xl border border-[#E2E5EB] bg-white p-8 text-center">
            <Bookmark className="mx-auto mb-3 h-6 w-6 text-[#5578A8]" />
            <p className="text-sm font-semibold text-[#14243A]">No saved questions yet</p>
            <p className="mt-1 text-xs leading-relaxed text-[#667085]">
              Bookmark a question while taking a quiz to review it here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {savedQuestions.map((item) => (
              <article
                key={item.id}
                className="rounded-xl border border-[#E2E5EB] bg-white p-4"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <p className="text-xs font-medium text-[#667085]">
                    {REVIEWER_CATEGORIES.find((category) => category.id === item.categoryId)?.title}
                    {' · '}Q{item.number}
                  </p>
                  <button
                    type="button"
                    onClick={() => onToggleBookmark(item.id)}
                    aria-label="Remove bookmark"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[#5578A8]"
                  >
                    <Bookmark className="h-4 w-4 fill-current" />
                  </button>
                </div>
                <h2 className="text-sm font-semibold leading-snug text-[#14243A]">
                  {item.question}
                </h2>
                {item.imageResource && (
                  <RoadSignIllustration imageResource={item.imageResource} />
                )}
                <div className="mt-3 space-y-2">
                  {item.choices.map((choice) => {
                    const isCorrect = choice.id === item.correctChoiceId;
                    return (
                      <div
                        key={choice.id}
                        className={`flex items-center gap-3 rounded-lg border p-3 ${
                          isCorrect
                            ? 'border-[#2E7D5B]/50 bg-[#F3FAF6]'
                            : 'border-[#E2E5EB] bg-[#FAF9F6]'
                        }`}
                      >
                        <span
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md font-mono-tabular text-xs font-semibold ${
                            isCorrect
                              ? 'bg-[#2E7D5B] text-white'
                              : 'border border-[#E2E5EB] bg-white text-[#667085]'
                          }`}
                        >
                          {choice.letter}
                        </span>
                        <span className="text-sm leading-relaxed text-[#14243A]">
                          {choice.text}
                        </span>
                        {isCorrect && (
                          <Check className="ml-auto h-4 w-4 shrink-0 text-[#2E7D5B]" />
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-3 rounded-lg border border-[#E2E5EB] bg-[#FAF9F6] p-3">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#5578A8]">
                    Answer Rationale
                  </p>
                  <p className="text-xs leading-relaxed text-[#667085]">{item.explanation}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    );
  }

  // VIEW 1: STUDY GUIDE CATEGORY LIST
  if (!activeCategory) {
    return (
      <div className="w-full max-w-md mx-auto px-4 pt-9 pb-32 min-h-screen text-[#14243A]">
        <div className="mb-5">
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#5578A8]">
            Reference library
          </p>
          <h1 className="font-display text-3xl font-bold tracking-[-0.03em] text-[#14243A]">
            Study Guide
          </h1>
          <p className="mt-1 text-sm text-[#667085]">
            Browse the bank by subject and revisit key rules.
          </p>
        </div>

        <section className="mb-5 flex items-center justify-between gap-3 rounded-2xl bg-[#EAF1F7] p-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#5578A8]">
              Your library
            </p>
            <p className="mt-1 font-mono-tabular text-sm font-bold text-[#14243A]">
              {REVIEWER_QUESTIONS.length} questions
              <span className="mx-1.5 text-[#98A2B3]">·</span>
              {REVIEWER_CATEGORIES.length} subjects
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowSavedQuestions(true)}
            className="flex min-h-10 shrink-0 items-center gap-2 rounded-xl bg-[#14243A] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#1E3554]"
          >
            <Bookmark className="h-3.5 w-3.5" />
            Saved
            <span className="font-mono-tabular text-white/70">{bookmarkedQuestionIds.length}</span>
          </button>
        </section>

        <div className="relative mb-5">
          <Search
            className="w-4 h-4 text-[#667085] absolute left-3.5 top-1/2 -translate-y-1/2"
            strokeWidth={1.75}
          />
          <input
            type="text"
            value={searchCategoryQuery}
            onChange={(e) => setSearchCategoryQuery(e.target.value)}
            placeholder="Search categories..."
            className="w-full bg-white border border-[#E2E5EB] rounded-md py-2.5 pl-10 pr-10 text-sm text-[#14243A] placeholder-[#667085] focus:outline-none focus:border-[#14243A] transition-colors"
          />
          {searchCategoryQuery && (
            <button
              type="button"
              onClick={() => setSearchCategoryQuery('')}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#667085] hover:text-[#14243A]"
            >
              <X className="w-4 h-4" strokeWidth={1.75} />
            </button>
          )}
        </div>

        <div className="space-y-3">
          {filteredCategories.map((cat) => {
            const categoryNumber = REVIEWER_CATEGORIES.findIndex(
              (category) => category.id === cat.id,
            ) + 1;
            return (
            <button
              key={cat.id}
              type="button"
              style={{ borderLeftColor: cat.accentColor }}
              onClick={() => {
                setActiveCategory(cat);
                setShowSavedQuestions(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group flex w-full items-center gap-3 rounded-2xl border border-[#E2E5EB] border-l-[5px] bg-white p-4 text-left shadow-[0_3px_12px_rgba(20,36,58,0.035)] transition-all hover:shadow-[0_7px_18px_rgba(20,36,58,0.08)] active:scale-[0.99]"
            >
              <CategoryBadge type={cat.iconType} size="sm" />
              <span className="min-w-0 flex-1">
                <span className="mb-1 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#667085]">
                  Subject {String(categoryNumber).padStart(2, '0')}
                  <span className="h-1 w-1 rounded-full bg-[#B8C0CC]" />
                  <span className="font-mono-tabular">{cat.questionCount} items</span>
                </span>
                <span className="block text-sm font-bold leading-snug text-[#14243A]">
                  {cat.title}
                </span>
                <span className="mt-1 line-clamp-2 block text-[11px] leading-relaxed text-[#667085]">
                  {cat.subtitle}
                </span>
              </span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F0F4F8] text-[#5578A8] transition-all group-hover:bg-[#14243A] group-hover:text-white">
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
              </span>
            </button>
            );
          })}
          {filteredCategories.length === 0 && (
            <div className="rounded-2xl border border-dashed border-[#C7D0DC] bg-white p-8 text-center">
              <p className="text-sm font-semibold text-[#14243A]">No subjects found</p>
              <p className="mt-1 text-xs text-[#667085]">Try a different search term.</p>
            </div>
          )}
        </div>

        {/* Offline Archive Notice */}
        <div className="mt-5 p-4 rounded-xl bg-white border border-[#E2E5EB] flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-md bg-[#FAF9F6] border border-[#E2E5EB] text-[#5578A8] flex items-center justify-center shrink-0">
            <WifiOff className="w-4 h-4" strokeWidth={1.65} />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-[#14243A]">Offline Study Archive</h4>
            <p className="text-xs text-[#667085] leading-relaxed">
              All 622 questions, road signs, and rationales are cached locally on your device.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // VIEW 2: CATEGORY STUDY SESSION
  return (
    <div className="w-full max-w-md mx-auto px-4 pt-8 pb-32 text-[#14243A] min-h-screen">
      {/* Top Bar */}
      <div className="flex items-center gap-3 mb-5">
        <button
          type="button"
          onClick={() => {
            setActiveCategory(null);
            setSearchQuestionQuery('');
          }}
          className="w-10 h-10 shrink-0 rounded-md bg-white border border-[#E2E5EB] flex items-center justify-center text-[#14243A] hover:bg-[#E9EBEF] transition-colors"
          aria-label="Back to categories"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.75} />
        </button>
        <h2 className="truncate font-display text-base font-semibold text-[#14243A]">
          {activeCategory.title}
        </h2>
      </div>

      {/* Search Questions */}
      <div className="relative mb-5">
        <Search
          className="w-4 h-4 text-[#667085] absolute left-3.5 top-1/2 -translate-y-1/2"
          strokeWidth={1.75}
        />
        <input
          type="text"
          value={searchQuestionQuery}
          onChange={(e) => setSearchQuestionQuery(e.target.value)}
          placeholder="Search questions, choices, or rationales..."
          className="w-full bg-white border border-[#E2E5EB] rounded-md py-2.5 pl-10 pr-10 text-xs text-[#14243A] placeholder-[#667085] focus:outline-none focus:border-[#14243A] transition-colors"
        />
        {searchQuestionQuery && (
          <button
            type="button"
            onClick={() => setSearchQuestionQuery('')}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#667085] hover:text-[#14243A]"
          >
            <X className="w-4 h-4" strokeWidth={1.75} />
          </button>
        )}
      </div>

      {SHOW_STUDY_SESSION_BANNER && (
        <div className="mb-5 p-4 rounded-xl bg-white border border-[#E2E5EB] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-[#FAF9F6] text-[#C5A46D] flex items-center justify-center shrink-0 border border-[#E2E5EB]">
              <Clock className="w-4 h-4" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-[11px] font-semibold tracking-[0.12em] text-[#5578A8] uppercase">
                Study Session Active
              </p>
              <p className="text-sm font-semibold text-[#14243A] font-mono-tabular">
                Expires in {formatTimer(secondsRemaining)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header Row: Unboxed Count + Clean Toggle Button */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-mono-tabular text-sm font-semibold text-[#14243A]">
            {categoryQuestions.length} Questions
          </h3>
          <p className="text-xs text-[#667085]">
            Tap any question card to reveal its answer
          </p>
        </div>

        <button
          type="button"
          onClick={toggleAll}
          className="px-3.5 py-2 rounded-md bg-white border border-[#E2E5EB] hover:bg-[#E9EBEF] text-[#14243A] text-xs font-semibold transition-colors shrink-0"
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
              className={`rounded-xl p-5 border bg-white transition-colors ${
                isRevealed ? 'border-[#5578A8]/50' : 'border-[#E2E5EB]'
              }`}
            >
              {/* Card Header: Unboxed Numerical Index + Restrained Show/Hide Control */}
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2 font-mono-tabular text-xs text-[#667085]">
                  <span className="font-semibold text-[#14243A]">
                    Q{String(item.number || idx + 1).padStart(2, '0')}
                  </span>
                  <span aria-hidden="true">/</span>
                  <span>{activeCategory.questionCount}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onToggleBookmark(item.id)}
                    aria-label={
                      bookmarkedQuestionIds.includes(item.id)
                        ? 'Remove bookmark'
                        : 'Bookmark question'
                    }
                    aria-pressed={bookmarkedQuestionIds.includes(item.id)}
                    className={`flex h-8 w-8 items-center justify-center rounded-md border ${
                      bookmarkedQuestionIds.includes(item.id)
                        ? 'border-[#5578A8]/40 bg-[#5578A8]/10 text-[#355C8A]'
                        : 'border-[#E2E5EB] bg-[#FAF9F6] text-[#667085]'
                    }`}
                  >
                    <Bookmark
                      className={`h-3.5 w-3.5 ${
                        bookmarkedQuestionIds.includes(item.id) ? 'fill-current' : ''
                      }`}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleQuestionReveal(item.id)}
                    className="px-2.5 py-1 rounded-md bg-[#FAF9F6] border border-[#E2E5EB] text-[#14243A] text-xs font-medium flex items-center gap-1.5 hover:bg-[#E9EBEF] transition-colors"
                  >
                    {isRevealed ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5 text-[#5578A8]" strokeWidth={1.75} />
                        <span>Hide</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5 text-[#5578A8]" strokeWidth={1.75} />
                        <span>Show</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Question Text */}
              <p
                onClick={() => toggleQuestionReveal(item.id)}
                className="font-display text-[15px] font-semibold text-[#14243A] leading-snug mb-4 cursor-pointer select-none"
              >
                {item.question}
              </p>

              {/* Optional Road Sign Illustration */}
              {item.imageResource && (
                <RoadSignIllustration imageResource={item.imageResource} />
              )}

              {/* Choices (A, B, C) */}
              <div className="space-y-2">
                {item.choices.map((choice) => {
                  const isCorrect = choice.id === item.correctChoiceId;
                  const showAsCorrect = isRevealed && isCorrect;

                  return (
                    <div
                      key={choice.id}
                      onClick={() => toggleQuestionReveal(item.id)}
                      className={`p-3 rounded-lg border transition-colors flex items-center justify-between gap-3 cursor-pointer ${
                        showAsCorrect
                          ? 'bg-[#F3FAF6] border-[#2E7D5B]/60'
                          : 'bg-[#FAF9F6] border-[#E2E5EB] hover:bg-[#E9EBEF]/40'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`w-6 h-6 rounded-md font-mono-tabular text-xs font-semibold flex items-center justify-center shrink-0 transition-colors ${
                            showAsCorrect
                              ? 'bg-[#2E7D5B] text-white'
                              : 'bg-white border border-[#E2E5EB] text-[#667085]'
                          }`}
                        >
                          {choice.letter}
                        </span>
                        <span
                          className={`text-sm leading-relaxed ${
                            showAsCorrect
                              ? 'text-[#14243A] font-medium'
                              : 'text-[#14243A]'
                          }`}
                        >
                          {choice.text}
                        </span>
                      </div>

                      {showAsCorrect && (
                        <Check
                          className="w-4 h-4 shrink-0 text-[#2E7D5B]"
                          strokeWidth={2.25}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Clear Answer Rationale Box */}
              {isRevealed && (
                <div className="mt-4 p-4 rounded-xl bg-[#FAF9F6] border border-[#E2E5EB]">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5578A8] mb-1.5">
                    <BookOpen className="w-3.5 h-3.5" strokeWidth={1.75} />
                    <span>Answer Rationale</span>
                  </div>
                  <p className="text-xs leading-[1.6] text-[#667085]">
                    {item.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}

        {categoryQuestions.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-[#E2E5EB] p-6">
            <p className="text-sm text-[#667085]">No questions found matching your search.</p>
            <button
              type="button"
              onClick={() => setSearchQuestionQuery('')}
              className="mt-3 text-xs text-[#14243A] font-semibold underline underline-offset-4"
            >
              Clear search filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
