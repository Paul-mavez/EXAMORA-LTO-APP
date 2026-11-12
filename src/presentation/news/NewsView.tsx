import React, { useState } from 'react';
import {
  Calendar,
  ChevronRight,
  ShieldCheck,
  X,
} from 'lucide-react';
import { NEWS_ITEMS } from '../../data/local/reviewerDatabase';
import { NewsItem } from '../../domain/model/reviewerModels';

export const NewsView: React.FC = () => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  const filters = ['ALL', 'Licensing Policy', 'Road Safety', 'Traffic Regulations', 'Law Enforcement'];

  const filteredNews = NEWS_ITEMS.filter((item) => {
    if (activeFilter === 'ALL') return true;
    return item.category === activeFilter;
  });

  return (
    <div className="w-full max-w-md mx-auto px-4 pt-10 pb-28 text-white min-h-screen">
      {/* Title */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          News
        </h1>
        <span className="text-xs px-2.5 py-1 rounded-full bg-[#1C1C1E] border border-[#2C2C2E] text-[#8E8E93]">
          Updated Daily
        </span>
      </div>

      {/* Filter Category Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 no-scrollbar">
        {filters.map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#0A84FF] text-white shadow-sm shadow-[#0A84FF]/30'
                  : 'bg-[#1C1C1E] text-[#8E8E93] border border-[#2C2C2E] hover:text-white'
              }`}
            >
              {filter === 'ALL' ? 'All Updates' : filter}
            </button>
          );
        })}
      </div>

      {/* Featured Banner */}
      <div className="mb-5 p-4 rounded-3xl bg-linear-to-br from-[#0F223D] to-[#1C1C1E] border border-[#1F3E68] shadow-xl">
        <div className="flex items-center gap-2 text-xs font-bold text-[#0A84FF] uppercase tracking-wider mb-2">
          <ShieldCheck className="w-4 h-4" />
          <span>Official LTO Policy Advisory</span>
        </div>
        <h3 className="text-base font-bold text-white mb-1.5">
          10-Year Driver’s License Eligibility Criteria
        </h3>
        <p className="text-xs text-[#8E8E93] line-clamp-2 leading-relaxed mb-3">
          Motorists with zero traffic violations during their 5-year validity cycle are rewarded with a 10-year validity license under RA 10930.
        </p>
        <button
          type="button"
          onClick={() => setSelectedNews(NEWS_ITEMS[0])}
          className="text-xs text-[#0A84FF] font-semibold hover:underline flex items-center gap-1"
        >
          Read full advisory <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* News Articles List */}
      <div className="space-y-3.5">
        {filteredNews.map((news) => (
          <div
            key={news.id}
            onClick={() => setSelectedNews(news)}
            className="p-4 rounded-3xl bg-[#1C1C1E] border border-[#2C2C2E] hover:border-[#3A3A3C] transition-all cursor-pointer group shadow-md"
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#2C2C2E] text-[#0A84FF]">
                {news.category}
              </span>
              <div className="flex items-center gap-1 text-[11px] text-[#8E8E93]">
                <Calendar className="w-3 h-3" />
                <span>{news.date}</span>
              </div>
            </div>

            <h3 className="text-sm font-bold text-white group-hover:text-[#0A84FF] transition-colors leading-snug mb-1.5">
              {news.title}
            </h3>

            <p className="text-xs text-[#8E8E93] line-clamp-2 leading-relaxed mb-3">
              {news.summary}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-[#2C2C2E]/60 text-xs">
              <span className="text-[#0A84FF] font-medium flex items-center gap-1">
                Read memo <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
              <span className="text-[11px] text-[#8E8E93]">LTO Central Office</span>
            </div>
          </div>
        ))}
      </div>

      {/* Article Detail Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-[#1C1C1E] border border-[#2C2C2E] rounded-t-3xl sm:rounded-3xl p-6 text-white max-h-[85vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#2C2C2E] mb-4">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#0E2A47] text-[#0A84FF]">
                {selectedNews.category}
              </span>
              <button
                type="button"
                onClick={() => setSelectedNews(null)}
                className="w-8 h-8 rounded-full bg-[#2C2C2E] flex items-center justify-center text-[#8E8E93] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h2 className="text-lg font-bold text-white mb-2 leading-snug">
              {selectedNews.title}
            </h2>

            <div className="flex items-center gap-2 text-xs text-[#8E8E93] mb-4">
              <Calendar className="w-3.5 h-3.5" />
              <span>{selectedNews.date}</span>
              <span>•</span>
              <span>Republic of the Philippines</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#000000]/60 border border-[#2C2C2E] mb-4">
              <p className="text-xs font-medium text-white italic">
                "{selectedNews.summary}"
              </p>
            </div>

            <div className="text-xs text-[#D1D1D6] leading-relaxed space-y-3">
              <p>{selectedNews.content}</p>
              <p>
                All student permit holders, non-professional drivers, and professional operators are strictly required to adhere to road safety guidelines, vehicle inspection protocols, and current traffic signs.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#2C2C2E] flex items-center justify-between">
              <p className="text-[11px] text-[#8E8E93]">Examora Educational Bulletin</p>
              <button
                type="button"
                onClick={() => setSelectedNews(null)}
                className="px-4 py-2 rounded-xl bg-[#0A84FF] text-white text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
