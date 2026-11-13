import React, { useEffect, useState } from 'react';
import { AppTab, BottomTabBar } from './presentation/components/BottomTabBar';
import { QuizView } from './presentation/quiz/QuizView';
import { ReviewersView } from './presentation/reviewers/ReviewersView';
import { MockExamView } from './presentation/mockexam/MockExamView';
import { NewsView } from './presentation/news/NewsView';
import { AboutView } from './presentation/about/AboutView';
import { OnboardingPreferences, OnboardingView } from './presentation/onboarding/OnboardingView';

const ONBOARDING_STORAGE_KEY = 'examora_lto_onboarding_v2_completed';
const PREFS_STORAGE_KEY = 'examora_lto_user_prefs_v2';
const BOOKMARKS_STORAGE_KEY = 'examora_lto_question_bookmarks_v1';

const loadBookmarkedQuestionIds = (): string[] => {
  try {
    const raw = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
    if (!raw) return [];
    const value: unknown = JSON.parse(raw);
    return Array.isArray(value) && value.every((id) => typeof id === 'string')
      ? value
      : [];
  } catch {
    return [];
  }
};

export default function App() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(() => {
    try {
      return localStorage.getItem(ONBOARDING_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [activeTab, setActiveTab] = useState<AppTab>('QUIZ');
  const [bookmarkedQuestionIds, setBookmarkedQuestionIds] = useState<string[]>(
    loadBookmarkedQuestionIds,
  );

  useEffect(() => {
    try {
      localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarkedQuestionIds));
    } catch {
      // Keep bookmarks available for the current session if storage is unavailable.
    }
  }, [bookmarkedQuestionIds]);

  const toggleQuestionBookmark = (questionId: string) => {
    setBookmarkedQuestionIds((current) =>
      current.includes(questionId)
        ? current.filter((id) => id !== questionId)
        : [...current, questionId],
    );
  };

  const handleCompleteOnboarding = (prefs: OnboardingPreferences) => {
    try {
      localStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
      localStorage.setItem(PREFS_STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      // ignore storage errors
    }
    setHasCompletedOnboarding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#14243A] flex justify-center selection:bg-[#14243A] selection:text-[#FAF9F6]">
      {/* Mobile-constrained Application Container */}
      <div className="w-full max-w-md min-h-screen flex flex-col relative bg-[#FAF9F6] sm:border-x sm:border-[#E2E5EB]">
        {!hasCompletedOnboarding ? (
          <main className="flex-1">
            <OnboardingView onComplete={handleCompleteOnboarding} />
          </main>
        ) : (
          <>
            {/* Screen Content by Tab (Kept Mounted so Quiz & Reviewer Progress Never Resets on Tab Switch) */}
            <main className="flex-1">
              <div className={activeTab === 'QUIZ' ? 'block' : 'hidden'}>
                <QuizView
                  bookmarkedQuestionIds={bookmarkedQuestionIds}
                  onToggleBookmark={toggleQuestionBookmark}
                />
              </div>
              <div className={activeTab === 'REVIEWERS' ? 'block' : 'hidden'}>
                <ReviewersView
                  bookmarkedQuestionIds={bookmarkedQuestionIds}
                  onToggleBookmark={toggleQuestionBookmark}
                />
              </div>
              <div className={activeTab === 'MOCK_EXAM' ? 'block' : 'hidden'}>
                <MockExamView
                  bookmarkedQuestionIds={bookmarkedQuestionIds}
                  onToggleBookmark={toggleQuestionBookmark}
                />
              </div>
              <div className={activeTab === 'NEWS' ? 'block' : 'hidden'}>
                <NewsView />
              </div>
              <div className={activeTab === 'ABOUT' ? 'block' : 'hidden'}>
                <AboutView />
              </div>
            </main>

            {/* Bottom Floating Pill Navigation Dock */}
            <BottomTabBar activeTab={activeTab} onSelectTab={setActiveTab} />
          </>
        )}
      </div>
    </div>
  );
}
