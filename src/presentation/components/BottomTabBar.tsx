import React from 'react';
import { BookOpen, Gamepad2, Info, Newspaper } from 'lucide-react';

export type AppTab = 'QUIZ' | 'REVIEWERS' | 'NEWS' | 'ABOUT';

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
      id: 'NEWS',
      label: 'News',
      icon: <Newspaper className="w-5 h-5" />,
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
        className="w-full max-w-[400px] bg-[#1C1C1E]/95 backdrop-blur-xl border border-[#2C2C2E] rounded-full p-1.5 flex items-center justify-between shadow-2xl pointer-events-auto"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`flex-1 py-2 rounded-full flex flex-col items-center justify-center gap-0.5 transition-all duration-200 ${
                isActive
                  ? 'bg-[#2C2C2E] text-[#0A84FF] shadow-inner'
                  : 'text-[#8E8E93] hover:text-white'
              }`}
            >
              {tab.icon}
              <span className="text-[11px] font-semibold tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
