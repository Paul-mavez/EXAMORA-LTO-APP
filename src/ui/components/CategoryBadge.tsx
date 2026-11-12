import React from 'react';

interface CategoryBadgeProps {
  type: 'ph_flag' | 'english_book' | 'traffic_light' | 'cde_en' | 'cde_tl' | 'tdc_car';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({
  type,
  size = 'md',
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-11 h-11 rounded-2xl',
    md: 'w-14 h-14 rounded-2xl',
    lg: 'w-24 h-24 rounded-3xl',
  };

  const iconScaleMap = {
    sm: 'scale-75',
    md: 'scale-100',
    lg: 'scale-[1.65]',
  };

  const currentSize = sizeMap[size];
  const iconScale = iconScaleMap[size];

  switch (type) {
    // 1. TAGALOG (Crisp Royal-Sky Blue Squircle with Detailed PH Flag & Sun)
    case 'ph_flag':
      return (
        <div
          className={`${currentSize} keep-white bg-gradient-to-br from-[#0A84FF] via-[#2563EB] to-[#1D4ED8] flex items-center justify-center shrink-0 shadow-md shadow-[#0A84FF]/20 border border-white/40 relative overflow-hidden ${className}`}
        >
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent pointer-events-none" />
          <div className={`relative flex flex-col items-center justify-center ${iconScale}`}>
            <svg viewBox="0 0 40 30" className="w-9 h-7 drop-shadow-sm">
              <defs>
                <clipPath id="phFlagClip">
                  <rect x="2" y="3" width="36" height="24" rx="4" />
                </clipPath>
              </defs>
              <g clipPath="url(#phFlagClip)">
                <rect x="2" y="3" width="36" height="12" fill="#0038A8" />
                <rect x="2" y="15" width="36" height="12" fill="#CE1126" />
                <polygon points="2,3 20,15 2,27" fill="#FFFFFF" />
                {/* Golden Sun */}
                <circle cx="8.5" cy="15" r="3.2" fill="#FCD116" />
                {/* 3 Stars */}
                <circle cx="4.5" cy="7.5" r="1.1" fill="#FCD116" />
                <circle cx="4.5" cy="22.5" r="1.1" fill="#FCD116" />
                <circle cx="15.5" cy="15" r="1.1" fill="#FCD116" />
              </g>
              <rect
                x="2"
                y="3"
                width="36"
                height="24"
                rx="4"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </div>
      );

    // 2. ENGLISH (Sleek Azure-Blue Squircle with Open 3D Book & EN Ribbon)
    case 'english_book':
      return (
        <div
          className={`${currentSize} keep-white bg-gradient-to-br from-[#38BDF8] via-[#0284C7] to-[#0369A1] flex items-center justify-center shrink-0 shadow-md shadow-[#0284C7]/20 border border-white/40 relative overflow-hidden ${className}`}
        >
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent pointer-events-none" />
          <div className={`relative flex flex-col items-center justify-center ${iconScale}`}>
            <span className="px-1.5 py-0.5 rounded-md bg-white text-[#0284C7] text-[8px] font-black tracking-wider leading-none shadow-xs mb-1">
              ENG
            </span>
            <svg viewBox="0 0 28 20" className="w-7 h-5 drop-shadow-xs">
              <path
                d="M14 4C11 1.8 5.5 1.5 2 2.8v13.5c3.5-1.2 9-.9 12 1.3 3-2.2 8.5-2.5 12-1.3V2.8C22.5 1.5 17 1.8 14 4z"
                fill="#FFFFFF"
              />
              <path
                d="M14 4.5v12.8"
                stroke="#0284C7"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      );

    // 3. TRAFFIC SIGNS, SIGNALS AND MARKINGS (Modern Road Sign Diamond + Glowing Traffic Signal)
    case 'traffic_light':
      return (
        <div
          className={`${currentSize} keep-white bg-gradient-to-br from-[#0EA5E9] via-[#0284C7] to-[#1E40AF] flex items-center justify-center shrink-0 shadow-md shadow-[#0284C7]/20 border border-white/40 relative overflow-hidden ${className}`}
        >
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent pointer-events-none" />
          <div className={`relative flex items-center justify-center ${iconScale}`}>
            <svg viewBox="0 0 36 36" className="w-9 h-9 drop-shadow-sm">
              {/* Crisp White Outer Housing */}
              <rect
                x="10"
                y="3"
                width="16"
                height="30"
                rx="6"
                fill="#0F172A"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
              {/* Red, Yellow, Green Glowing Lenses */}
              <circle cx="18" cy="10" r="3.4" fill="#FF453A" />
              <circle cx="18" cy="18" r="3.4" fill="#FACC15" />
              <circle cx="18" cy="26" r="3.4" fill="#30D158" />
            </svg>
          </div>
        </div>
      );

    // 4. CDE ENGLISH (Royal Blue Squircle with Graduation Cap & EN Star Badge)
    case 'cde_en':
      return (
        <div
          className={`${currentSize} keep-white bg-gradient-to-br from-[#2563EB] via-[#1D4ED8] to-[#1E3A8A] flex items-center justify-center shrink-0 shadow-md shadow-[#1D4ED8]/20 border border-white/40 relative overflow-hidden ${className}`}
        >
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent pointer-events-none" />
          <div className={`relative flex flex-col items-center justify-center ${iconScale}`}>
            <span className="px-1.5 py-0.5 rounded-md bg-[#DBEAFE] text-[#1E3A8A] text-[7.5px] font-black tracking-wider leading-none mb-0.5">
              CDE•EN
            </span>
            <svg viewBox="0 0 24 20" className="w-7 h-6 text-white fill-current drop-shadow-xs">
              <path d="M12 2L1 7.5 12 13l9-4.5V15h2V7.5L12 2zm0 13l-6.5-3.2v2.7C5.5 16.8 8.4 18.5 12 18.5s6.5-1.7 6.5-4v-2.7L12 15z" />
            </svg>
          </div>
        </div>
      );

    // 5. CDE TAGALOG (Sky-Royal Blue Squircle with Graduation Cap & Golden Sun Accent)
    case 'cde_tl':
      return (
        <div
          className={`${currentSize} keep-white bg-gradient-to-br from-[#0284C7] via-[#2563EB] to-[#1E40AF] flex items-center justify-center shrink-0 shadow-md shadow-[#2563EB]/20 border border-white/40 relative overflow-hidden ${className}`}
        >
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent pointer-events-none" />
          <div className={`relative flex flex-col items-center justify-center ${iconScale}`}>
            <span className="px-1.5 py-0.5 rounded-md bg-[#FEF08A] text-[#1E3A8A] text-[7.5px] font-black tracking-wider leading-none mb-0.5">
              CDE•TL
            </span>
            <svg viewBox="0 0 24 20" className="w-7 h-6 text-white fill-current drop-shadow-xs">
              <path d="M12 2L1 7.5 12 13l9-4.5V15h2V7.5L12 2zm0 13l-6.5-3.2v2.7C5.5 16.8 8.4 18.5 12 18.5s6.5-1.7 6.5-4v-2.7L12 15z" />
            </svg>
          </div>
        </div>
      );

    // 6. TDC: THEORETICAL DRIVING COURSE (Bright Sky-Azure Squircle with Modern Car & Steering Emblem)
    case 'tdc_car':
      return (
        <div
          className={`${currentSize} keep-white bg-gradient-to-br from-[#38BDF8] via-[#0A84FF] to-[#2563EB] flex items-center justify-center shrink-0 shadow-md shadow-[#0A84FF]/20 border border-white/40 relative overflow-hidden ${className}`}
        >
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent pointer-events-none" />
          <div className={`relative flex flex-col items-center justify-center ${iconScale}`}>
            <span className="px-1.5 py-0.5 rounded-md bg-white text-[#0A84FF] text-[7.5px] font-black tracking-wider leading-none mb-0.5">
              TDC
            </span>
            <svg viewBox="0 0 24 18" className="w-7 h-5 text-white fill-current drop-shadow-xs">
              <path d="M18.92 3.01C18.72 2.42 18.16 2 17.5 2h-11c-.66 0-1.21.42-1.42 1.01L3 9v7c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1V9l-2.08-5.99zM6.85 4h10.29l1.04 3H5.81l1.04-3zM7.5 12.5c-.83 0-1.5-.67-1.5-1.5S6.67 9.5 7.5 9.5 9 10.17 9 11s-.67 1.5-1.5 1.5zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
            </svg>
          </div>
        </div>
      );
  }
};
