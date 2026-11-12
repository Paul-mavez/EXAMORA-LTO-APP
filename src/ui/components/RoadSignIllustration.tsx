import React from 'react';

interface RoadSignIllustrationProps {
  imageResource: string;
  className?: string;
}

/**
 * Renders crystal-clear, realistic Philippine LTO Road Signs, Traffic Signals,
 * and Pavement Markings with full roadway context (lanes, curbs, cars, intersections)
 * so learners never get confused about what the diagram represents.
 */
export const RoadSignIllustration: React.FC<RoadSignIllustrationProps> = ({
  imageResource,
  className = '',
}) => {
  const key = imageResource.split('/').pop()?.replace('.png', '') || '';

  const renderGraphic = () => {
    switch (key) {
      // 1. YELLOW BOX JUNCTION (Full 4-Way Road Intersection View with Cars, Curbs & Stop Lines)
      case 'mark_yellow_box':
        return (
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 280 220" className="w-64 h-48 rounded-2xl shadow-lg">
              <rect x="0" y="0" width="280" height="220" fill="#182218" />
              <rect x="0" y="0" width="82" height="52" rx="6" fill="#2A2D34" stroke="#4A4E58" strokeWidth="2" />
              <rect x="198" y="0" width="82" height="52" rx="6" fill="#2A2D34" stroke="#4A4E58" strokeWidth="2" />
              <rect x="0" y="168" width="82" height="52" rx="6" fill="#2A2D34" stroke="#4A4E58" strokeWidth="2" />
              <rect x="198" y="168" width="82" height="52" rx="6" fill="#2A2D34" stroke="#4A4E58" strokeWidth="2" />

              {/* Asphalt 4-Way Road */}
              <rect x="82" y="0" width="116" height="220" fill="#1F242D" />
              <rect x="0" y="52" width="280" height="116" fill="#1F242D" />

              {/* Dashed White Lane Dividers on 4 approaches */}
              <line x1="140" y1="6" x2="140" y2="44" stroke="#FFFFFF" strokeWidth="2.5" strokeDasharray="7 6" />
              <line x1="140" y1="176" x2="140" y2="214" stroke="#FFFFFF" strokeWidth="2.5" strokeDasharray="7 6" />
              <line x1="8" y1="110" x2="72" y2="110" stroke="#FFFFFF" strokeWidth="2.5" strokeDasharray="7 6" />
              <line x1="208" y1="110" x2="272" y2="110" stroke="#FFFFFF" strokeWidth="2.5" strokeDasharray="7 6" />

              {/* White Stop Lines before the intersection */}
              <line x1="82" y1="48" x2="198" y2="48" stroke="#FFFFFF" strokeWidth="4" />
              <line x1="82" y1="172" x2="198" y2="172" stroke="#FFFFFF" strokeWidth="4" />
              <line x1="78" y1="52" x2="78" y2="168" stroke="#FFFFFF" strokeWidth="4" />
              <line x1="202" y1="52" x2="202" y2="168" stroke="#FFFFFF" strokeWidth="4" />

              {/* THE YELLOW BOX JUNCTION */}
              <g>
                <rect
                  x="86"
                  y="56"
                  width="108"
                  height="108"
                  fill="#F59E0B"
                  fillOpacity="0.14"
                  stroke="#FACC15"
                  strokeWidth="4"
                />
                <line x1="86" y1="56" x2="194" y2="164" stroke="#FACC15" strokeWidth="3.5" />
                <line x1="194" y1="56" x2="86" y2="164" stroke="#FACC15" strokeWidth="3.5" />
                <line x1="140" y1="56" x2="194" y2="110" stroke="#FACC15" strokeWidth="3" />
                <line x1="86" y1="110" x2="140" y2="164" stroke="#FACC15" strokeWidth="3" />
                <line x1="140" y1="56" x2="86" y2="110" stroke="#FACC15" strokeWidth="3" />
                <line x1="194" y1="110" x2="140" y2="164" stroke="#FACC15" strokeWidth="3" />
              </g>

              {/* Vehicles waiting before stop lines */}
              <g transform="translate(154, 178)">
                <rect x="0" y="0" width="22" height="36" rx="5" fill="#0A84FF" stroke="#FFFFFF" strokeWidth="1" />
                <rect x="3" y="7" width="16" height="8" rx="2" fill="#0F172A" />
                <rect x="3" y="23" width="16" height="6" rx="1.5" fill="#0F172A" />
              </g>
              <g transform="translate(104, 6)">
                <rect x="0" y="0" width="22" height="36" rx="5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1" />
                <rect x="3" y="21" width="16" height="8" rx="2" fill="#0F172A" />
                <rect x="3" y="6" width="16" height="6" rx="1.5" fill="#0F172A" />
              </g>
              <g transform="translate(16, 124)">
                <rect x="0" y="0" width="36" height="22" rx="5" fill="#10B981" stroke="#FFFFFF" strokeWidth="1" />
                <rect x="21" y="3" width="8" height="16" rx="2" fill="#0F172A" />
                <rect x="6" y="3" width="6" height="16" rx="1.5" fill="#0F172A" />
              </g>

              <rect x="86" y="98" width="108" height="22" rx="6" fill="#000000" fillOpacity="0.82" stroke="#FACC15" strokeWidth="1.5" />
              <text x="140" y="113" textAnchor="middle" fill="#FACC15" fontSize="9.5" fontWeight="bold" fontFamily="sans-serif">
                YELLOW BOX JUNCTION
              </text>
            </svg>
            <span className="mt-2.5 text-[11px] font-semibold text-[#8E8E93] bg-[#1C1C1E] px-3 py-1 rounded-full border border-[#2C2C2E]">
              🛣️ 4-Way Road Intersection Marking
            </span>
          </div>
        );

      // 2. SOLID DOUBLE YELLOW LINE
      case 'mark_double_yellow':
        return (
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 260 190" className="w-60 h-44 rounded-2xl shadow-lg">
              <rect x="0" y="0" width="260" height="190" fill="#1E293B" />
              <rect x="45" y="0" width="170" height="190" fill="#1F242D" />
              <line x1="52" y1="0" x2="52" y2="190" stroke="#E2E8F0" strokeWidth="3" />
              <line x1="208" y1="0" x2="208" y2="190" stroke="#E2E8F0" strokeWidth="3" />
              <line x1="126" y1="0" x2="126" y2="190" stroke="#FACC15" strokeWidth="5" />
              <line x1="134" y1="0" x2="134" y2="190" stroke="#FACC15" strokeWidth="5" />
              <path d="M 90 140 L 90 100 L 82 108 M 90 100 L 98 108" stroke="#94A3B8" strokeWidth="3" fill="none" />
              <path d="M 170 50 L 170 90 L 162 82 M 170 90 L 178 82" stroke="#94A3B8" strokeWidth="3" fill="none" />
              <g transform="translate(158, 125)">
                <rect x="0" y="0" width="24" height="40" rx="6" fill="#0A84FF" stroke="#FFFFFF" strokeWidth="1" />
                <rect x="3" y="8" width="18" height="10" rx="2" fill="#0F172A" />
              </g>
              <g transform="translate(78, 25)">
                <rect x="0" y="0" width="24" height="40" rx="6" fill="#F97316" stroke="#FFFFFF" strokeWidth="1" />
                <rect x="3" y="22" width="18" height="10" rx="2" fill="#0F172A" />
              </g>
            </svg>
            <span className="mt-2.5 text-[11px] font-semibold text-[#8E8E93] bg-[#1C1C1E] px-3 py-1 rounded-full border border-[#2C2C2E]">
              🛣️ Two-Lane Highway Center Line
            </span>
          </div>
        );

      // 3. BROKEN WHITE LINE
      case 'mark_broken_white':
        return (
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 260 190" className="w-60 h-44 rounded-2xl shadow-lg">
              <rect x="0" y="0" width="260" height="190" fill="#1E293B" />
              <rect x="45" y="0" width="170" height="190" fill="#1F242D" />
              <line x1="52" y1="0" x2="52" y2="190" stroke="#E2E8F0" strokeWidth="3" />
              <line x1="208" y1="0" x2="208" y2="190" stroke="#E2E8F0" strokeWidth="3" />
              <line x1="130" y1="10" x2="130" y2="185" stroke="#FFFFFF" strokeWidth="6" strokeDasharray="24 18" />
              <g transform="translate(158, 120)">
                <rect x="0" y="0" width="24" height="40" rx="6" fill="#34C759" stroke="#FFFFFF" strokeWidth="1" />
                <rect x="3" y="8" width="18" height="10" rx="2" fill="#0F172A" />
              </g>
              <g transform="translate(78, 45)">
                <rect x="0" y="0" width="24" height="40" rx="6" fill="#0A84FF" stroke="#FFFFFF" strokeWidth="1" />
                <rect x="3" y="8" width="18" height="10" rx="2" fill="#0F172A" />
              </g>
            </svg>
            <span className="mt-2.5 text-[11px] font-semibold text-[#8E8E93] bg-[#1C1C1E] px-3 py-1 rounded-full border border-[#2C2C2E]">
              🛣️ Broken White Lane Divider
            </span>
          </div>
        );

      // 4. ZEBRA PEDESTRIAN CROSSING
      case 'mark_zebra_crossing':
        return (
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 260 190" className="w-60 h-44 rounded-2xl shadow-lg">
              <rect x="0" y="0" width="260" height="190" fill="#2A2D34" />
              <rect x="35" y="0" width="190" height="190" fill="#1F242D" />
              <line x1="130" y1="0" x2="130" y2="55" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="8 6" />
              <line x1="130" y1="145" x2="130" y2="190" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="8 6" />
              <line x1="35" y1="142" x2="225" y2="142" stroke="#FFFFFF" strokeWidth="4" />
              {[46, 74, 102, 130, 158, 186].map((xPos) => (
                <rect key={xPos} x={xPos} y="68" width="18" height="58" rx="2" fill="#FFFFFF" />
              ))}
            </svg>
            <span className="mt-2.5 text-[11px] font-semibold text-[#8E8E93] bg-[#1C1C1E] px-3 py-1 rounded-full border border-[#2C2C2E]">
              🚶 Pedestrian Zebra Crossing
            </span>
          </div>
        );

      // 5. STOP SIGN (Octagon)
      case 'reg_stop':
        return (
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 200 200" className="w-40 h-40 drop-shadow-xl">
              <polygon
                points="62,10 138,10 190,62 190,138 138,190 62,190 10,138 10,62"
                fill="#DC2626"
                stroke="#FFFFFF"
                strokeWidth="8"
              />
              <text x="100" y="116" textAnchor="middle" fill="#FFFFFF" fontSize="48" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">
                STOP
              </text>
            </svg>
            <span className="mt-2.5 text-[11px] font-semibold text-[#8E8E93] bg-[#1C1C1E] px-3 py-1 rounded-full border border-[#2C2C2E]">
              🛑 Regulatory Octagon Sign
            </span>
          </div>
        );

      // 6. GIVE WAY / YIELD (Inverted Triangle)
      case 'reg_give_way':
        return (
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 200 200" className="w-40 h-40 drop-shadow-xl">
              <polygon
                points="16,26 184,26 100,180"
                fill="#FFFFFF"
                stroke="#DC2626"
                strokeWidth="18"
                strokeLinejoin="round"
              />
              <text x="100" y="72" textAnchor="middle" fill="#111827" fontSize="22" fontWeight="900" fontFamily="sans-serif">
                GIVE
              </text>
              <text x="100" y="98" textAnchor="middle" fill="#111827" fontSize="22" fontWeight="900" fontFamily="sans-serif">
                WAY
              </text>
            </svg>
            <span className="mt-2.5 text-[11px] font-semibold text-[#8E8E93] bg-[#1C1C1E] px-3 py-1 rounded-full border border-[#2C2C2E]">
              ⚠️ Regulatory Yield Sign
            </span>
          </div>
        );

      // 7. NO ENTRY
      case 'reg_no_entry':
        return (
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 200 200" className="w-40 h-40 drop-shadow-xl">
              <circle cx="100" cy="100" r="86" fill="#DC2626" stroke="#FFFFFF" strokeWidth="6" />
              <rect x="34" y="82" width="132" height="36" rx="6" fill="#FFFFFF" />
            </svg>
            <span className="mt-2.5 text-[11px] font-semibold text-[#8E8E93] bg-[#1C1C1E] px-3 py-1 rounded-full border border-[#2C2C2E]">
              ⛔ Regulatory Prohibition Sign
            </span>
          </div>
        );

      // 8. SPEED LIMIT 60
      case 'reg_speed_60':
        return (
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 200 200" className="w-40 h-40 drop-shadow-xl">
              <circle cx="100" cy="100" r="84" fill="#FFFFFF" stroke="#DC2626" strokeWidth="20" />
              <text x="100" y="120" textAnchor="middle" fill="#111827" fontSize="68" fontWeight="900" fontFamily="sans-serif">
                60
              </text>
              <text x="100" y="148" textAnchor="middle" fill="#4B5563" fontSize="14" fontWeight="700" fontFamily="sans-serif">
                km/h
              </text>
            </svg>
            <span className="mt-2.5 text-[11px] font-semibold text-[#8E8E93] bg-[#1C1C1E] px-3 py-1 rounded-full border border-[#2C2C2E]">
              🚗 Speed Restriction Sign
            </span>
          </div>
        );

      // 9. MANDATORY SEATBELT SIGN
      case 'reg_seatbelt':
        return (
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 200 200" className="w-40 h-40 drop-shadow-xl">
              <circle cx="100" cy="100" r="86" fill="#0284C7" stroke="#FFFFFF" strokeWidth="6" />
              <circle cx="100" cy="62" r="20" fill="#FFFFFF" />
              <path d="M 62 152 C 62 105, 138 105, 138 152 Z" fill="#FFFFFF" />
              <line x1="64" y1="96" x2="134" y2="146" stroke="#0284C7" strokeWidth="12" strokeLinecap="round" />
              <line x1="60" y1="144" x2="140" y2="144" stroke="#0284C7" strokeWidth="10" strokeLinecap="round" />
              <rect x="128" y="138" width="12" height="12" rx="2" fill="#EF4444" />
            </svg>
            <span className="mt-2.5 text-[11px] font-semibold text-[#8E8E93] bg-[#1C1C1E] px-3 py-1 rounded-full border border-[#2C2C2E]">
              🔵 Mandatory Seatbelt Sign
            </span>
          </div>
        );

      // 10. NO U-TURN
      case 'reg_no_uturn':
        return (
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 200 200" className="w-40 h-40 drop-shadow-xl">
              <circle cx="100" cy="100" r="84" fill="#FFFFFF" stroke="#DC2626" strokeWidth="18" />
              <path d="M 126 145 L 126 88 A 26 26 0 0 0 74 88 L 74 125" fill="none" stroke="#111827" strokeWidth="16" strokeLinecap="round" />
              <polygon points="74,148 54,118 94,118" fill="#111827" />
              <line x1="42" y1="42" x2="158" y2="158" stroke="#DC2626" strokeWidth="18" />
            </svg>
            <span className="mt-2.5 text-[11px] font-semibold text-[#8E8E93] bg-[#1C1C1E] px-3 py-1 rounded-full border border-[#2C2C2E]">
              🚫 Regulatory Prohibition Sign
            </span>
          </div>
        );

      // 11. NO OVERTAKING
      case 'reg_no_overtaking':
        return (
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 200 200" className="w-40 h-40 drop-shadow-xl">
              <circle cx="100" cy="100" r="84" fill="#FFFFFF" stroke="#DC2626" strokeWidth="18" />
              <g transform="translate(46, 86)">
                <rect x="4" y="10" width="42" height="22" rx="5" fill="#DC2626" />
                <path d="M 10 10 L 16 0 L 34 0 L 40 10 Z" fill="#DC2626" />
                <circle cx="12" cy="34" r="5" fill="#111827" />
                <circle cx="38" cy="34" r="5" fill="#111827" />
              </g>
              <g transform="translate(104, 86)">
                <rect x="4" y="10" width="42" height="22" rx="5" fill="#111827" />
                <path d="M 10 10 L 16 0 L 34 0 L 40 10 Z" fill="#111827" />
                <circle cx="12" cy="34" r="5" fill="#111827" />
                <circle cx="38" cy="34" r="5" fill="#111827" />
              </g>
              <line x1="42" y1="42" x2="158" y2="158" stroke="#DC2626" strokeWidth="16" />
            </svg>
            <span className="mt-2.5 text-[11px] font-semibold text-[#8E8E93] bg-[#1C1C1E] px-3 py-1 rounded-full border border-[#2C2C2E]">
              🚫 Regulatory Prohibition Sign
            </span>
          </div>
        );

      // 12. NO PARKING
      case 'reg_no_parking':
        return (
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 200 200" className="w-40 h-40 drop-shadow-xl">
              <circle cx="100" cy="100" r="84" fill="#FFFFFF" stroke="#DC2626" strokeWidth="18" />
              <text x="100" y="132" textAnchor="middle" fill="#111827" fontSize="96" fontWeight="900" fontFamily="sans-serif">
                P
              </text>
              <line x1="42" y1="42" x2="158" y2="158" stroke="#DC2626" strokeWidth="18" />
            </svg>
            <span className="mt-2.5 text-[11px] font-semibold text-[#8E8E93] bg-[#1C1C1E] px-3 py-1 rounded-full border border-[#2C2C2E]">
              🚫 Parking Restriction Sign
            </span>
          </div>
        );

      // 13. WARNING: SLIPPERY ROAD
      case 'warn_slippery':
        return (
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 200 200" className="w-40 h-40 drop-shadow-xl">
              <polygon points="100,18 186,174 14,174" fill="#FFFFFF" stroke="#DC2626" strokeWidth="16" strokeLinejoin="round" />
              <rect x="76" y="88" width="48" height="22" rx="5" fill="#111827" />
              <path d="M 82 88 L 88 74 L 112 74 L 118 88 Z" fill="#111827" />
              <path d="M 84 114 Q 98 130, 76 144 Q 64 154, 82 162" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" />
              <path d="M 116 114 Q 130 130, 108 144 Q 96 154, 114 162" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" />
            </svg>
            <span className="mt-2.5 text-[11px] font-semibold text-[#8E8E93] bg-[#1C1C1E] px-3 py-1 rounded-full border border-[#2C2C2E]">
              ⚠️ Road Hazard Warning Sign
            </span>
          </div>
        );

      // 14. WARNING: PEDESTRIAN CROSSING AHEAD
      case 'warn_pedestrian':
        return (
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 200 200" className="w-40 h-40 drop-shadow-xl">
              <polygon points="100,18 186,174 14,174" fill="#FFFFFF" stroke="#DC2626" strokeWidth="16" strokeLinejoin="round" />
              <circle cx="100" cy="78" r="10" fill="#111827" />
              <line x1="100" y1="90" x2="100" y2="124" stroke="#111827" strokeWidth="8" strokeLinecap="round" />
              <line x1="100" y1="98" x2="82" y2="116" stroke="#111827" strokeWidth="7" strokeLinecap="round" />
              <line x1="100" y1="98" x2="118" y2="114" stroke="#111827" strokeWidth="7" strokeLinecap="round" />
              <line x1="100" y1="124" x2="84" y2="152" stroke="#111827" strokeWidth="8" strokeLinecap="round" />
              <line x1="100" y1="124" x2="116" y2="152" stroke="#111827" strokeWidth="8" strokeLinecap="round" />
            </svg>
            <span className="mt-2.5 text-[11px] font-semibold text-[#8E8E93] bg-[#1C1C1E] px-3 py-1 rounded-full border border-[#2C2C2E]">
              ⚠️ Advance Warning Sign
            </span>
          </div>
        );

      // 15. WARNING: SHARP CURVE AHEAD
      case 'warn_sharp_curve':
        return (
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 200 200" className="w-40 h-40 drop-shadow-xl">
              <polygon points="100,18 186,174 14,174" fill="#FFFFFF" stroke="#DC2626" strokeWidth="16" strokeLinejoin="round" />
              <path d="M 82 154 L 82 108 Q 82 90, 100 90 L 122 90" fill="none" stroke="#111827" strokeWidth="14" strokeLinecap="round" />
              <polygon points="140,90 116,72 116,108" fill="#111827" />
            </svg>
            <span className="mt-2.5 text-[11px] font-semibold text-[#8E8E93] bg-[#1C1C1E] px-3 py-1 rounded-full border border-[#2C2C2E]">
              ⚠️ Horizontal Alignment Warning Sign
            </span>
          </div>
        );

      // 16. WARNING: SCHOOL ZONE AHEAD (Pentagon)
      case 'warn_school_zone':
        return (
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 200 200" className="w-40 h-40 drop-shadow-xl">
              <polygon points="100,16 184,84 158,180 42,180 16,84" fill="#FACC15" stroke="#111827" strokeWidth="8" strokeLinejoin="round" />
              <circle cx="82" cy="84" r="9" fill="#111827" />
              <line x1="82" y1="95" x2="82" y2="132" stroke="#111827" strokeWidth="8" strokeLinecap="round" />
              <line x1="68" y1="110" x2="96" y2="110" stroke="#111827" strokeWidth="7" strokeLinecap="round" />
              <line x1="82" y1="132" x2="72" y2="160" stroke="#111827" strokeWidth="7" strokeLinecap="round" />
              <line x1="82" y1="132" x2="92" y2="160" stroke="#111827" strokeWidth="7" strokeLinecap="round" />
              <circle cx="122" cy="96" r="8" fill="#111827" />
              <line x1="122" y1="106" x2="122" y2="136" stroke="#111827" strokeWidth="7" strokeLinecap="round" />
              <line x1="110" y1="118" x2="134" y2="118" stroke="#111827" strokeWidth="6" strokeLinecap="round" />
              <line x1="122" y1="136" x2="114" y2="160" stroke="#111827" strokeWidth="6" strokeLinecap="round" />
              <line x1="122" y1="136" x2="130" y2="160" stroke="#111827" strokeWidth="6" strokeLinecap="round" />
            </svg>
            <span className="mt-2.5 text-[11px] font-semibold text-[#8E8E93] bg-[#1C1C1E] px-3 py-1 rounded-full border border-[#2C2C2E]">
              🚸 School Zone Pentagon Sign
            </span>
          </div>
        );

      // 17. WARNING: TWO-WAY TRAFFIC AHEAD
      case 'warn_two_way':
        return (
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 200 200" className="w-40 h-40 drop-shadow-xl">
              <polygon points="100,18 186,174 14,174" fill="#FFFFFF" stroke="#DC2626" strokeWidth="16" strokeLinejoin="round" />
              <line x1="84" y1="152" x2="84" y2="96" stroke="#111827" strokeWidth="10" strokeLinecap="round" />
              <polygon points="84,76 70,100 98,100" fill="#111827" />
              <line x1="116" y1="84" x2="116" y2="140" stroke="#111827" strokeWidth="10" strokeLinecap="round" />
              <polygon points="116,160 102,136 130,136" fill="#111827" />
            </svg>
            <span className="mt-2.5 text-[11px] font-semibold text-[#8E8E93] bg-[#1C1C1E] px-3 py-1 rounded-full border border-[#2C2C2E]">
              ⚠️ Two-Way Traffic Warning Sign
            </span>
          </div>
        );

      // 18. WARNING: TRAFFIC LIGHT AHEAD
      case 'warn_traffic_light_ahead':
        return (
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 200 200" className="w-40 h-40 drop-shadow-xl">
              <polygon points="100,18 186,174 14,174" fill="#FFFFFF" stroke="#DC2626" strokeWidth="16" strokeLinejoin="round" />
              <rect x="84" y="72" width="32" height="86" rx="8" fill="#111827" />
              <circle cx="100" cy="90" r="8" fill="#EF4444" />
              <circle cx="100" cy="115" r="8" fill="#FACC15" />
              <circle cx="100" cy="140" r="8" fill="#22C55E" />
            </svg>
            <span className="mt-2.5 text-[11px] font-semibold text-[#8E8E93] bg-[#1C1C1E] px-3 py-1 rounded-full border border-[#2C2C2E]">
              ⚠️ Traffic Signal Ahead Sign
            </span>
          </div>
        );

      // 19. GUIDE: HOSPITAL
      case 'guide_hospital':
        return (
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 200 200" className="w-40 h-40 drop-shadow-xl">
              <rect x="20" y="20" width="160" height="160" rx="22" fill="#0284C7" stroke="#FFFFFF" strokeWidth="6" />
              <rect x="56" y="52" width="24" height="96" fill="#FFFFFF" />
              <rect x="120" y="52" width="24" height="96" fill="#FFFFFF" />
              <rect x="56" y="88" width="88" height="24" fill="#FFFFFF" />
            </svg>
            <span className="mt-2.5 text-[11px] font-semibold text-[#8E8E93] bg-[#1C1C1E] px-3 py-1 rounded-full border border-[#2C2C2E]">
              🏥 Blue Service Guide Sign
            </span>
          </div>
        );

      // 20. GUIDE: EXPRESSWAY EXIT
      case 'guide_expressway':
        return (
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 240 160" className="w-52 h-36 drop-shadow-xl">
              <rect x="10" y="14" width="220" height="132" rx="16" fill="#15803D" stroke="#FFFFFF" strokeWidth="6" />
              <text x="120" y="58" textAnchor="middle" fill="#FFFFFF" fontSize="20" fontWeight="900" fontFamily="sans-serif">
                EXPRESSWAY
              </text>
              <text x="120" y="86" textAnchor="middle" fill="#FFFFFF" fontSize="18" fontWeight="800" fontFamily="sans-serif">
                EXIT 1 KM
              </text>
              <line x1="80" y1="116" x2="152" y2="116" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" />
              <polygon points="164,116 142,102 142,130" fill="#FFFFFF" />
            </svg>
            <span className="mt-2.5 text-[11px] font-semibold text-[#8E8E93] bg-[#1C1C1E] px-3 py-1 rounded-full border border-[#2C2C2E]">
              🛣️ Green Expressway Guide Sign
            </span>
          </div>
        );

      // 21. TRAFFIC SIGNAL: STEADY RED
      case 'sig_steady_red':
        return (
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 200 200" className="w-40 h-40 drop-shadow-xl">
              <rect x="64" y="14" width="72" height="172" rx="22" fill="#1F2937" stroke="#4B5563" strokeWidth="4" />
              <circle cx="100" cy="52" r="22" fill="#EF4444" />
              <circle cx="100" cy="52" r="15" fill="#FCA5A5" />
              <circle cx="100" cy="100" r="18" fill="#374151" />
              <circle cx="100" cy="148" r="18" fill="#374151" />
            </svg>
            <span className="mt-2.5 text-[11px] font-semibold text-[#8E8E93] bg-[#1C1C1E] px-3 py-1 rounded-full border border-[#2C2C2E]">
              🚦 Red Traffic Light Signal
            </span>
          </div>
        );

      // 22. TRAFFIC SIGNAL: FLASHING YELLOW LIGHT
      case 'sig_flashing_yellow':
        return (
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 200 200" className="w-40 h-40 drop-shadow-xl">
              <rect x="64" y="14" width="72" height="172" rx="22" fill="#1F2937" stroke="#4B5563" strokeWidth="4" />
              <circle cx="100" cy="52" r="18" fill="#374151" />
              <circle cx="100" cy="100" r="22" fill="#FACC15" />
              <circle cx="100" cy="100" r="16" fill="#FEF08A" />
              <line x1="36" y1="100" x2="54" y2="100" stroke="#FACC15" strokeWidth="4" strokeLinecap="round" />
              <line x1="146" y1="100" x2="164" y2="100" stroke="#FACC15" strokeWidth="4" strokeLinecap="round" />
              <line x1="46" y1="74" x2="58" y2="82" stroke="#FACC15" strokeWidth="4" strokeLinecap="round" />
              <line x1="154" y1="74" x2="142" y2="82" stroke="#FACC15" strokeWidth="4" strokeLinecap="round" />
              <line x1="46" y1="126" x2="58" y2="118" stroke="#FACC15" strokeWidth="4" strokeLinecap="round" />
              <line x1="154" y1="126" x2="142" y2="118" stroke="#FACC15" strokeWidth="4" strokeLinecap="round" />
              <circle cx="100" cy="148" r="18" fill="#374151" />
            </svg>
            <span className="mt-2.5 text-[11px] font-semibold text-[#8E8E93] bg-[#1C1C1E] px-3 py-1 rounded-full border border-[#2C2C2E]">
              🚦 Flashing Yellow Traffic Signal
            </span>
          </div>
        );

      // 23. TRAFFIC SIGNAL: STEADY GREEN
      case 'sig_steady_green':
        return (
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 200 200" className="w-40 h-40 drop-shadow-xl">
              <rect x="64" y="14" width="72" height="172" rx="22" fill="#1F2937" stroke="#4B5563" strokeWidth="4" />
              <circle cx="100" cy="52" r="18" fill="#374151" />
              <circle cx="100" cy="100" r="18" fill="#374151" />
              <circle cx="100" cy="148" r="22" fill="#22C55E" />
              <circle cx="100" cy="148" r="15" fill="#86EFAC" />
            </svg>
            <span className="mt-2.5 text-[11px] font-semibold text-[#8E8E93] bg-[#1C1C1E] px-3 py-1 rounded-full border border-[#2C2C2E]">
              🚦 Green Traffic Light Signal
            </span>
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center">
            <img
              src={imageResource}
              alt="LTO Road Sign"
              className="w-36 h-36 object-contain drop-shadow-lg"
            />
          </div>
        );
    }
  };

  return (
    <div
      className={`my-4 p-4 bg-[#0B0D13] rounded-2xl border border-[#2C2C2E] flex items-center justify-center ${className}`}
    >
      {renderGraphic()}
    </div>
  );
};
