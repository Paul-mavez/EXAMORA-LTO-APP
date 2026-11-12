import React from 'react';
import {
  Bookmark,
  BookOpen,
  ClipboardCheck,
  Home,
  SlidersHorizontal,
  Target,
} from 'lucide-react';
import { MainTab, useExamoraViewModel } from '../state/ExamoraContext';
import { SafePngImage } from '../../ui/components/ExamoraComponents';

export const BottomNavigation: React.FC = () => {
  const { activeTab, navigateTab, t } = useExamoraViewModel();

  const items: { tab: MainTab; label: string; icon: React.ReactNode }[] = [
    { tab: 'HOME', label: t.nav.home, icon: <Home className="w-5 h-5" /> },
    { tab: 'LEARN', label: t.nav.learn, icon: <BookOpen className="w-5 h-5" /> },
    { tab: 'PRACTICE', label: t.nav.practice, icon: <Target className="w-5 h-5" /> },
    { tab: 'MOCK_EXAM', label: t.nav.mockExam, icon: <ClipboardCheck className="w-5 h-5" /> },
    { tab: 'PROFILE', label: t.nav.profile, icon: <SlidersHorizontal className="w-5 h-5" /> },
  ];

  return (
    <nav
      aria-label="Primary Bottom Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFFFFF]/95 dark:bg-[#142033]/95 backdrop-blur-md border-t border-[#E9EBEF] dark:border-[#24344D]"
    >
      <div className="grid grid-cols-5 items-center h-16 max-w-lg mx-auto px-1">
        {items.map((item) => {
          const active = activeTab === item.tab;
          return (
            <button
              key={item.tab}
              type="button"
              onClick={() => navigateTab(item.tab)}
              className={`min-h-[48px] flex flex-col items-center justify-center gap-0.5 rounded-xl transition-colors whitespace-nowrap shrink-0 ${
                active
                  ? 'text-[#14243A] dark:text-[#D8A43B] font-semibold'
                  : 'text-[#667085] dark:text-[#98A2B3] hover:text-[#14243A] dark:hover:text-[#F4F6F9]'
              }`}
            >
              {item.icon}
              <span className="text-[10px] tracking-tight truncate max-w-[68px]">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export const NavigationShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { activeTab, subDestination, navigateTab, t, bookmarks, notes } = useExamoraViewModel();
  const savedTotal = bookmarks.length + notes.length;

  const navLinks: { tab: MainTab; label: string }[] = [
    { tab: 'HOME', label: t.nav.home },
    { tab: 'LEARN', label: t.nav.learn },
    { tab: 'PRACTICE', label: t.nav.practice },
    { tab: 'MOCK_EXAM', label: t.nav.mockExam },
    { tab: 'PROFILE', label: t.nav.profile },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] dark:bg-[#0D1726] text-[#14243A] dark:text-[#F4F6F9]">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-30 bg-[#FFFFFF]/95 dark:bg-[#142033]/95 backdrop-blur-md border-b border-[#E9EBEF] dark:border-[#24344D]">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 h-14 sm:h-16">
          {/* Zone 1: Brand Wordmark + Attached PNG Logo */}
          <button
            type="button"
            onClick={() => navigateTab('HOME')}
            className="flex items-center gap-2.5 text-left whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#D8A43B] rounded-lg"
          >
            <SafePngImage
              src="/assets/png/examora_logo.png"
              alt="Examora - LTO reviewer logo"
              className="w-8 h-8 rounded-lg object-contain shrink-0"
            />
            <span className="font-display text-base sm:text-lg font-bold tracking-tight text-[#14243A] dark:text-[#F4F6F9]">
              {t.appName}
            </span>
          </button>

          {/* Zone 2: 5 Clean Single-Line Text Navigation Links (Desktop) */}
          <nav
            aria-label="Desktop Primary Navigation"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-[#667085] dark:text-[#98A2B3]"
          >
            {navLinks.map((link) => {
              const isActive =
                activeTab === link.tab && subDestination.type !== 'SAVED_NOTES';
              return (
                <button
                  key={link.tab}
                  type="button"
                  onClick={() => navigateTab(link.tab)}
                  className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                    isActive
                      ? 'text-[#14243A] dark:text-[#F4F6F9] border-[#D8A43B] font-semibold'
                      : 'border-transparent hover:text-[#14243A] dark:hover:text-[#F4F6F9]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Contextual Action (Saved Bookmarks & Notes) */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => navigateTab('PROFILE', { type: 'SAVED_NOTES' })}
              className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-medium inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 border ${
                subDestination.type === 'SAVED_NOTES'
                  ? 'bg-[#14243A] text-white border-[#14243A] dark:bg-[#D8A43B] dark:text-[#14243A] dark:border-[#D8A43B]'
                  : 'bg-[#FAF9F6] text-[#14243A] border-[#E9EBEF] hover:bg-[#E9EBEF]/70 dark:bg-[#1C2C46] dark:text-[#F4F6F9] dark:border-[#24344D]'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>{t.nav.savedAndNotes}</span>
              {savedTotal > 0 && (
                <span className="font-mono-tabular opacity-80">({savedTotal})</span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 pb-24 md:pb-12">
        {children}
      </main>

      {/* Quiet Editorial Disclaimer Footer */}
      <footer className="pb-20 md:pb-8 px-4 sm:px-6 border-t border-[#E9EBEF] dark:border-[#24344D] bg-[#FFFFFF]/60 dark:bg-[#142033]/40">
        <div className="max-w-6xl mx-auto py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#667085] dark:text-[#98A2B3]">
          <p className="max-w-3xl leading-relaxed">{t.disclaimer}</p>
          <p className="whitespace-nowrap shrink-0 font-medium text-[#14243A] dark:text-[#F4F6F9]">
            {t.brandParent} · Offline-First Edition
          </p>
        </div>
      </footer>

      {/* Mobile 5-Tab Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};
