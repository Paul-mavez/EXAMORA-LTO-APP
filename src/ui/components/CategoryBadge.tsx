import React from 'react';

interface CategoryBadgeProps {
  type: 'ph_flag' | 'english_book' | 'traffic_light' | 'cde_en' | 'cde_tl' | 'tdc_car';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ type, size = 'md', className = '' }) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-24 h-24',
  };

  const currentSize = sizeMap[size];

  switch (type) {
    case 'ph_flag':
      return (
        <div
          className={`${currentSize} rounded-full bg-[#70C1B3] flex items-center justify-center shrink-0 shadow-lg relative overflow-hidden ${className}`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-black/20 pointer-events-none" />
          <div className="w-8/12 h-5/12 rounded-xs overflow-hidden flex flex-col relative shadow-md">
            <div className="h-1/2 bg-[#0038A8] w-full" />
            <div className="h-1/2 bg-[#CE1126] w-full" />
            <div
              className="absolute inset-y-0 left-0 w-1/2 bg-white flex items-center justify-center"
              style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-[#FCD116] -ml-1 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-[#F59E0B]" />
              </div>
            </div>
          </div>
        </div>
      );

    case 'cde_tl':
      return (
        <div
          className={`${currentSize} rounded-full bg-[#F28482] flex items-center justify-center shrink-0 shadow-lg relative overflow-hidden ${className}`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-black/20 pointer-events-none" />
          <div className="w-8/12 h-5/12 rounded-xs overflow-hidden flex flex-col relative shadow-md">
            <div className="h-1/2 bg-[#0038A8] w-full" />
            <div className="h-1/2 bg-[#CE1126] w-full" />
            <div
              className="absolute inset-y-0 left-0 w-1/2 bg-white flex items-center justify-center"
              style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-[#FCD116] -ml-1 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-[#F59E0B]" />
              </div>
            </div>
          </div>
        </div>
      );

    case 'english_book':
      return (
        <div
          className={`${currentSize} rounded-full bg-[#52B788] flex items-center justify-center shrink-0 shadow-lg relative overflow-hidden ${className}`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-black/20 pointer-events-none" />
          <div className="flex flex-col items-center">
            <div className="bg-[#2D6A4F] text-[9px] font-black tracking-widest text-white px-1.5 py-0.2 rounded-xs mb-0.5 shadow-xs">
              ENG
            </div>
            <svg
              className="w-7 h-5 text-white fill-current filter drop-shadow-xs"
              viewBox="0 0 24 16"
            >
              <path d="M12 4.5C9.5 2 4.5 2 2 3v11c2.5-1 7.5-1 10 1.5 2.5-2.5 7.5-2.5 10-1.5V3c-2.5-1-7.5-1-10 1.5z" />
            </svg>
          </div>
        </div>
      );

    case 'traffic_light':
      return (
        <div
          className={`${currentSize} rounded-full bg-[#F6BD60] flex items-center justify-center shrink-0 shadow-lg relative overflow-hidden ${className}`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-black/20 pointer-events-none" />
          <div className="w-4 h-9 bg-[#2B2D42] rounded-md p-0.5 flex flex-col justify-around items-center shadow-md border border-black/30">
            <div className="w-2 h-2 rounded-full bg-[#E63946] shadow-xs" />
            <div className="w-2 h-2 rounded-full bg-[#FFB703] shadow-xs" />
            <div className="w-2 h-2 rounded-full bg-[#52B788] shadow-xs" />
          </div>
        </div>
      );

    case 'cde_en':
      return (
        <div
          className={`${currentSize} rounded-full bg-[#E07A5F] flex items-center justify-center shrink-0 shadow-lg relative overflow-hidden ${className}`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-black/20 pointer-events-none" />
          <svg
            className="w-7 h-7 text-white fill-current filter drop-shadow-xs"
            viewBox="0 0 24 24"
          >
            <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 14.5l-8-4.36v3.27C4 18.86 7.58 21 12 21s8-2.14 8-4.59v-3.27l-8 4.36z" />
          </svg>
        </div>
      );

    case 'tdc_car':
      return (
        <div
          className={`${currentSize} rounded-full bg-[#4EA8DE] flex items-center justify-center shrink-0 shadow-lg relative overflow-hidden ${className}`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-black/20 pointer-events-none" />
          <div className="text-center">
            <svg
              className="w-7 h-6 text-white fill-current filter drop-shadow-xs mx-auto"
              viewBox="0 0 24 24"
            >
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.04 3H5.81l1.04-3zM19 17H5v-4.66l.12-.34h13.77l.11.34V17z" />
              <circle cx="7.5" cy="14.5" r="1.5" />
              <circle cx="16.5" cy="14.5" r="1.5" />
            </svg>
          </div>
        </div>
      );
  }
};
