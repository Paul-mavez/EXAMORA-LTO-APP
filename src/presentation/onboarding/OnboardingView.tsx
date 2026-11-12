import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Gamepad2,
  WifiOff,
} from 'lucide-react';
import { CategoryBadge } from '../../ui/components/CategoryBadge';

export interface OnboardingPreferences {
  language: 'tagalog' | 'english';
  licenseType: 'STUDENT_PERMIT' | 'NON_PROFESSIONAL' | 'PROFESSIONAL';
  dailyGoalQuestions: number;
}

interface OnboardingViewProps {
  onComplete: (prefs: OnboardingPreferences) => void;
}

export const OnboardingView: React.FC<OnboardingViewProps> = ({ onComplete }) => {
  const [step, setStep] = useState<number>(0);
  const [language, setLanguage] = useState<'tagalog' | 'english'>('tagalog');
  const [licenseType, setLicenseType] = useState<'STUDENT_PERMIT' | 'NON_PROFESSIONAL' | 'PROFESSIONAL'>('NON_PROFESSIONAL');
  const [dailyGoalQuestions, setDailyGoalQuestions] = useState<number>(20);

  const isTagalog = language === 'tagalog';

  const slides = [
    {
      badge: 'LTO EXAM REVIEWER',
      title: isTagalog
        ? 'Ipasa ang LTO Driver’s Exam sa Unang Subok'
        : 'Pass Your LTO Driver’s Exam on the First Try',
      subtitle: isTagalog
        ? 'Kumpletong reviewer para sa Student Permit, Non-Professional, at Professional Driver’s License sa Pilipinas.'
        : 'Your complete, up-to-date study companion for Student Permit, Non-Professional, and Professional licenses.',
      highlights: isTagalog
        ? [
            { icon: 'ph_flag' as const, label: 'Tagalog & English', sub: '622+ tanong at sagot mula sa TDC at CDE' },
            { icon: 'traffic_light' as const, label: '182+ Road Signs', sub: 'Regulatory, warning, at pavement markings' },
          ]
        : [
            { icon: 'english_book' as const, label: 'Tagalog & English', sub: '622+ updated TDC and CDE exam questions' },
            { icon: 'traffic_light' as const, label: '182+ Road Signs', sub: 'Official regulatory, warning & road markings' },
          ],
    },
    {
      badge: isTagalog ? 'PAANO MAG-ARAL' : 'HOW IT WORKS',
      title: isTagalog
        ? 'Interactive Quiz at Malinaw na Study Guide'
        : 'Interactive Quizzes & Instant Explanations',
      subtitle: isTagalog
        ? 'Pumili kung ilang tanong ang gustong sagutan o basahin ang bawat tanong na may detalyadong paliwanag.'
        : 'Customize your quiz length or use the Study Guide to reveal answers and legal explanations at your own pace.',
      features: isTagalog
        ? [
            {
              icon: <Gamepad2 className="w-5 h-5 text-[#0A84FF]" />,
              title: 'Customizable Quiz',
              desc: 'Pumili ng 5, 10, 20, o lahat ng tanong bawat kategorya.',
            },
            {
              icon: <BookOpen className="w-5 h-5 text-[#34C759]" />,
              title: 'One-Tap Show Answer',
              desc: 'I-tap ang Show para makita agad ang tamang sagot at 💡 Explanation.',
            },
          ]
        : [
            {
              icon: <Gamepad2 className="w-5 h-5 text-[#0A84FF]" />,
              title: 'Customizable Quiz',
              desc: 'Practice with 5, 10, 20, or full category question sets.',
            },
            {
              icon: <BookOpen className="w-5 h-5 text-[#34C759]" />,
              title: 'One-Tap Show Answer',
              desc: 'Tap Show on any question card to reveal the answer and 💡 Explanation.',
            },
          ],
    },
    {
      badge: '100% OFFLINE & FREE ACCESS',
      title: isTagalog
        ? 'Walang Login. Gumagana Kahit Walang Internet.'
        : 'No Account Required. Works 100% Offline.',
      subtitle: isTagalog
        ? 'Hindi kailangan ng email o registration. Mag-review kahit nasa biyahe o naghihintay sa LTO branch.'
        : 'Start studying immediately without sign-ups or passwords. All questions and road signs are saved on your device.',
      perks: isTagalog
        ? [
            'Walang registration o password na kailangan',
            'Offline access sa lahat ng kategorya at batas trapiko',
            'Kasama ang RA 4136, RA 10930 (10-Year License), at BLOWBAGETS',
          ]
        : [
            'Zero login, zero email, and zero account barriers',
            'Full offline access to all categories and road signs',
            'Covers RA 4136, RA 10930 (10-Year Validity), and BLOWBAGETS',
          ],
    },
  ] as const;

  const handleFinish = () => {
    onComplete({
      language,
      licenseType,
      dailyGoalQuestions,
    });
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 pt-2 pb-8 text-white min-h-[92vh] flex flex-col justify-between select-none">
      {/* Top Bar: Language Toggle + Skip button */}
      <div>
        <div className="flex items-center justify-between py-2 mb-4">
          {/* Language Pill Switcher */}
          <div className="inline-flex items-center bg-[#1C1C1E] border border-[#2C2C2E] rounded-full p-1">
            <button
              type="button"
              onClick={() => setLanguage('tagalog')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                language === 'tagalog'
                  ? 'bg-[#0A84FF] text-white shadow-xs'
                  : 'text-[#8E8E93] hover:text-white'
              }`}
            >
              🇵🇭 Tagalog
            </button>
            <button
              type="button"
              onClick={() => setLanguage('english')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                language === 'english'
                  ? 'bg-[#0A84FF] text-white shadow-xs'
                  : 'text-[#8E8E93] hover:text-white'
              }`}
            >
              🇬🇧 English
            </button>
          </div>

          {step < 3 && (
            <button
              type="button"
              onClick={() => setStep(3)}
              className="text-xs font-semibold text-[#8E8E93] hover:text-white px-2.5 py-1.5 rounded-full transition-colors"
            >
              {isTagalog ? 'Laktawan' : 'Skip'}
            </button>
          )}
        </div>

        {/* Step Progress Bar */}
        <div className="grid grid-cols-4 gap-1.5 mb-6">
          {[0, 1, 2, 3].map((idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setStep(idx)}
              aria-label={`Step ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx <= step ? 'bg-[#0A84FF]' : 'bg-[#2C2C2E]'
              }`}
            />
          ))}
        </div>

        {/* SLIDE 0: WELCOME & OVERVIEW */}
        {step === 0 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-[#1C1C1E] border border-[#2C2C2E] rounded-3xl p-6 flex flex-col items-center text-center shadow-2xl relative overflow-hidden">
              <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-2xl border border-white/10 mb-4 bg-[#0A2540] p-1 flex items-center justify-center">
                <img
                  src="/assets/png/examora_logo.png"
                  alt="LTO Driver Exam Reviewer"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>

              <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-[#0E2A47] text-[#0A84FF] mb-3">
                {slides[0].badge}
              </span>

              <h1 className="text-2xl font-extrabold text-white tracking-tight leading-snug mb-2">
                {slides[0].title}
              </h1>

              <p className="text-xs text-[#8E8E93] leading-relaxed">
                {slides[0].subtitle}
              </p>
            </div>

            <div className="space-y-3">
              {slides[0].highlights.map((item, i) => (
                <div
                  key={i}
                  className="bg-[#1C1C1E] border border-[#2C2C2E] rounded-2xl p-4 flex items-center gap-3.5 shadow-lg"
                >
                  <CategoryBadge type={item.icon} size="sm" />
                  <div>
                    <h3 className="text-sm font-bold text-white">{item.label}</h3>
                    <p className="text-xs text-[#8E8E93] mt-0.5">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SLIDE 1: INTERACTIVE QUIZ & STUDY GUIDE PREVIEW */}
        {step === 1 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="text-center px-2">
              <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-[#0E2A47] text-[#0A84FF]">
                {slides[1].badge}
              </span>
              <h1 className="text-2xl font-extrabold text-white tracking-tight leading-snug mt-3 mb-2">
                {slides[1].title}
              </h1>
              <p className="text-xs text-[#8E8E93] leading-relaxed">
                {slides[1].subtitle}
              </p>
            </div>

            <div className="bg-[#1C1C1E] border border-[#0A84FF]/40 rounded-3xl p-4 shadow-2xl">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#0A84FF] text-white text-[11px] font-bold flex items-center justify-center">
                    1
                  </span>
                  <span className="text-[11px] text-[#8E8E93]">Question 1 of 75</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#0E2A47] text-[#0A84FF] text-[11px] font-semibold">
                  👁️ Revealed
                </span>
              </div>

              <p className="text-xs font-semibold text-white mb-3">
                Habang nagmamaneho, dapat kang tumingin sa side and rear view mirror ng:
              </p>

              <div className="p-2.5 rounded-xl bg-[#112418] border border-[#34C759] flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#34C759] text-black text-xs font-bold flex items-center justify-center">
                    A
                  </span>
                  <span className="text-xs font-medium text-[#34C759]">
                    Mabilis / madalian
                  </span>
                </div>
                <div className="w-4 h-4 rounded-full bg-[#34C759] text-black flex items-center justify-center">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#20170A] border border-[#422E14]">
                <p className="text-[11px] font-bold text-[#FF9500] mb-0.5">
                  💡 Explanation
                </p>
                <p className="text-[11px] text-[#D2B48C] leading-relaxed">
                  Dapat tumingin sa mga side at rear view mirror ng mabilis para masiguradong ligtas ang pag-drive.
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              {slides[1].features.map((feat, idx) => (
                <div
                  key={idx}
                  className="bg-[#1C1C1E] border border-[#2C2C2E] rounded-2xl p-3.5 flex items-start gap-3"
                >
                  <div className="p-2 rounded-xl bg-[#2C2C2E]/70 shrink-0">
                    {feat.icon}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">{feat.title}</h3>
                    <p className="text-[11px] text-[#8E8E93] mt-0.5">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SLIDE 2: OFFLINE & ZERO-LOGIN ASSURANCE */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-[#1C1C1E] border border-[#2C2C2E] rounded-3xl p-6 text-center shadow-2xl">
              <div className="w-16 h-16 rounded-2xl bg-[#0A84FF]/15 border border-[#0A84FF]/30 text-[#0A84FF] flex items-center justify-center mx-auto mb-4">
                <WifiOff className="w-8 h-8" />
              </div>

              <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-[#0E2A47] text-[#0A84FF]">
                {slides[2].badge}
              </span>

              <h1 className="text-2xl font-extrabold text-white tracking-tight leading-snug mt-3 mb-2">
                {slides[2].title}
              </h1>

              <p className="text-xs text-[#8E8E93] leading-relaxed">
                {slides[2].subtitle}
              </p>
            </div>

            <div className="bg-[#1C1C1E] border border-[#2C2C2E] rounded-3xl p-5 space-y-3.5 shadow-xl">
              {slides[2].perks.map((perk, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#34C759]/20 text-[#34C759] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-xs font-medium text-white leading-snug">
                    {perk}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-2xl bg-[#1C1408] border border-[#3E2911] text-[11px] text-[#D2B48C] leading-relaxed">
              <strong className="text-[#FF9500] block mb-0.5">
                {isTagalog ? 'Paunawa:' : 'Educational Disclaimer:'}
              </strong>
              Examora - LTO reviewer is an independent educational application and is not affiliated with or endorsed by the Land Transportation Office (LTO).
            </div>
          </div>
        )}

        {/* SLIDE 3: PERSONALIZE STUDY PREFERENCES */}
        {step === 3 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-[#0E2A47] text-[#0A84FF]">
                {isTagalog ? 'HULING HAKBANG' : 'FINAL STEP'}
              </span>
              <h1 className="text-2xl font-extrabold text-white tracking-tight mt-2 mb-1">
                {isTagalog ? 'I-customize ang Iyong Reviewer' : 'Personalize Your Study Plan'}
              </h1>
              <p className="text-xs text-[#8E8E93]">
                {isTagalog
                  ? 'Piliin ang uri ng lisensya na iyong kukunin:'
                  : 'Select the driver’s license you are preparing for:'}
              </p>
            </div>

            <div className="space-y-2.5">
              {(
                [
                  {
                    id: 'STUDENT_PERMIT',
                    title: 'Student Permit (TDC)',
                    desc: isTagalog
                      ? 'Para sa mga bagong aplikante at kumukuha ng 15-hour Theoretical Driving Course'
                      : 'For first-time applicants taking the 15-hour Theoretical Driving Course',
                    badge: 'tdc_car' as const,
                  },
                  {
                    id: 'NON_PROFESSIONAL',
                    title: 'Non-Professional License',
                    desc: isTagalog
                      ? 'Para sa pribadong sasakyan at motorsiklo (DL Codes A, A1, B, B1)'
                      : 'For private cars and motorcycles (DL Codes A, A1, B, B1)',
                    badge: 'ph_flag' as const,
                  },
                  {
                    id: 'PROFESSIONAL',
                    title: 'Professional / CDE Renewal',
                    desc: isTagalog
                      ? 'Para sa pampublikong sasakyan, trak, at 10-year license CDE renewal'
                      : 'For commercial vehicles, PUVs, and 10-year license CDE renewal',
                    badge: 'cde_en' as const,
                  },
                ] as const
              ).map((item) => {
                const isSelected = licenseType === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setLicenseType(item.id)}
                    className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all ${
                      isSelected
                        ? 'bg-[#0E2A47]/70 border-[#0A84FF] shadow-lg'
                        : 'bg-[#1C1C1E] border-[#2C2C2E] hover:border-[#3A3A3C]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <CategoryBadge type={item.badge} size="sm" />
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold text-white truncate">
                          {item.title}
                        </h3>
                        <p className="text-[11px] text-[#8E8E93] line-clamp-2 mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-[#0A84FF] text-white'
                          : 'border border-[#3A3A3C]'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="bg-[#1C1C1E] border border-[#2C2C2E] rounded-2xl p-4">
              <label className="block text-xs font-bold text-white mb-2.5">
                {isTagalog
                  ? 'Ilang tanong ang target mong sagutan bawat araw?'
                  : 'Daily Practice Goal (Questions per day)'}
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[10, 20, 30, 50].map((goal) => (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => setDailyGoalQuestions(goal)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      dailyGoalQuestions === goal
                        ? 'bg-[#0A84FF] text-white shadow-sm'
                        : 'bg-[#2C2C2E] text-[#8E8E93] hover:text-white'
                    }`}
                  >
                    {goal} Qs
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation Buttons */}
      <div className="pt-6 space-y-3">
        <div className="flex items-center gap-3">
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep((prev) => prev - 1)}
              className="w-12 h-13 rounded-2xl bg-[#1C1C1E] border border-[#2C2C2E] flex items-center justify-center text-white hover:bg-[#2C2C2E] transition-colors shrink-0"
              aria-label="Previous step"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep((prev) => prev + 1)}
              className="flex-1 py-4 rounded-2xl bg-[#0A84FF] hover:bg-[#0071E3] active:scale-[0.99] text-white font-bold text-base shadow-lg shadow-[#0A84FF]/25 transition-all flex items-center justify-center gap-2"
            >
              <span>{isTagalog ? 'Sunod' : 'Continue'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="flex-1 py-4 rounded-2xl bg-[#0A84FF] hover:bg-[#0071E3] active:scale-[0.99] text-white font-bold text-base shadow-lg shadow-[#0A84FF]/25 transition-all flex items-center justify-center gap-2"
            >
              <span>{isTagalog ? 'Simulan ang Pag-review' : 'Start Reviewing Now'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
