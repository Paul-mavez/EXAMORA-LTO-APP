import React, { useState } from 'react';
import { AppTab, BottomTabBar } from './presentation/components/BottomTabBar';
import { QuizView } from './presentation/quiz/QuizView';
import { ReviewersView } from './presentation/reviewers/ReviewersView';
import { NewsView } from './presentation/news/NewsView';
import { AboutView } from './presentation/about/AboutView';
import { OnboardingPreferences, OnboardingView } from './presentation/onboarding/OnboardingView';

const ONBOARDING_STORAGE_KEY = 'examora_lto_onboarding_v2_completed';
const PREFS_STORAGE_KEY = 'examora_lto_user_prefs_v2';

export default function App() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(() => {
    try {
      return localStorage.getItem(ONBOARDING_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [activeTab, setActiveTab] = useState<AppTab>('QUIZ');

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

  const handleReplayOnboarding = () => {
    try {
      localStorage.removeItem(ONBOARDING_STORAGE_KEY);
    } catch {
      // ignore
    }
    setHasCompletedOnboarding(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#EFF6FF] text-[#0F172A] flex justify-center selection:bg-[#0A84FF] selection:text-white">
      {/* Mobile-constrained Application Container */}
      <div className="w-full max-w-md min-h-screen flex flex-col relative bg-[#EFF6FF] border-x border-[#BFDBFE]/70 shadow-xl">
        {!hasCompletedOnboarding ? (
          <main className="flex-1">
            <OnboardingView onComplete={handleCompleteOnboarding} />
          </main>
        ) : (
          <>
            {/* Screen Content by Tab (Kept Mounted so Quiz & Reviewer Progress Never Resets on Tab Switch) */}
            <main className="flex-1">
              <div className={activeTab === 'QUIZ' ? 'block' : 'hidden'}>
                <QuizView />
              </div>
              <div className={activeTab === 'REVIEWERS' ? 'block' : 'hidden'}>
                <ReviewersView />
              </div>
              <div className={activeTab === 'NEWS' ? 'block' : 'hidden'}>
                <NewsView />
              </div>
              <div className={activeTab === 'ABOUT' ? 'block' : 'hidden'}>
                <AboutView onReplayOnboarding={handleReplayOnboarding} />
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
