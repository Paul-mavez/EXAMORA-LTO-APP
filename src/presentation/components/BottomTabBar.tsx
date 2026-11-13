import React from 'react';
import { Bell, BookOpen, ClipboardCheck, Gamepad2, Info } from 'lucide-react';

export type AppTab = 'QUIZ' | 'REVIEWERS' | 'MOCK_EXAM' | 'NEWS' | 'ABOUT';

interface BottomTabBarProps {
  activeTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({ activeTab, onSelectTab }) => {
  const tabs: { id: AppTab; label: string; icon: React.ReactNode }[] = [
    {
      id: 'QUIZ',
      label: 'Quiz',
      icon: <Gamepad2 className="w-5 h-5" />,
    },
    {
      id: 'REVIEWERS',
      label: 'Reviewers',
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      id: 'MOCK_EXAM',
      label: 'Mock Exam',
      icon: <ClipboardCheck className="w-5 h-5" />,
    },
    {
      id: 'NEWS',
      label: 'Reminder',
      icon: <Bell className="w-5 h-5" />,
    },
    {
      id: 'ABOUT',
      label: 'About',
      icon: <Info className="w-5 h-5" />,
    },
  ];

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav
        aria-label="Primary Bottom Navigation"
        className="w-full max-w-[400px] bg-white/95 backdrop-blur-md border border-[#E2E5EB] rounded-full p-1.5 flex items-center justify-between shadow-sm pointer-events-auto"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`min-w-0 flex-1 py-2 rounded-full flex flex-col items-center justify-center gap-0.5 transition-all duration-200 ${
                isActive
                  ? 'bg-[#E9EBEF] text-[#14243A]'
                  : 'text-[#667085] hover:text-[#14243A]'
              }`}
            >
              {tab.icon}
              <span className="text-[10px] font-semibold tracking-tight whitespace-nowrap">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
