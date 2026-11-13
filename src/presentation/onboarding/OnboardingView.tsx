import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Gamepad2,
  ShieldCheck,
  WifiOff,
} from 'lucide-react';

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

  const handleFinish = () => {
    onComplete({
      language: 'english',
      licenseType: 'NON_PROFESSIONAL',
      dailyGoalQuestions: 20,
    });
  };

  return (
    <div className="w-full max-w-md mx-auto px-6 pt-7 pb-7 h-[100dvh] max-h-[100dvh] overflow-hidden flex flex-col justify-between select-none bg-[#FAF9F6] text-[#14243A]">
      {/* Top Bar: Unboxed Step Counter & Skip Button */}
      <div className="flex items-center justify-between h-9 shrink-0">
        <span className="font-mono-tabular text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5578A8]">
          Step {step + 1} / 3
        </span>

        {step < 2 ? (
          <button
            type="button"
            onClick={handleFinish}
            className="text-xs font-semibold uppercase tracking-[0.08em] text-[#667085] hover:text-[#14243A] px-2 py-1.5 rounded-md transition-colors"
          >
            Skip
          </button>
        ) : (
          <div className="w-10" />
        )}
      </div>

      {/* Center Content — Editorial, Calm, Non-Scrollable 100dvh */}
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center text-center my-2">
        {step === 0 && (
          <div className="w-full flex flex-col items-center">
            <div className="w-20 h-20 rounded-xl overflow-hidden border border-[#E2E5EB] mb-5 bg-white flex items-center justify-center shrink-0">
              <img
                src="/assets/png/examora_logo.png"
                alt="LTO Driver Exam Reviewer"
                className="w-full h-full object-cover scale-[1.06]"
              />
            </div>

            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#C5A46D] mb-2">
              Examora · LTO Reviewer
            </p>

            <h1 className="font-display text-2xl sm:text-[26px] font-bold text-[#14243A] tracking-[-0.02em] leading-tight mb-2.5 max-w-xs">
              Pass Your LTO Exam with Confidence
            </h1>

            <p className="text-sm text-[#667085] leading-[1.6] max-w-xs mb-6">
              Everything you need to prepare for your Philippine driver’s license exam in one calm, focused reviewer.
            </p>

            <div className="w-full bg-white border border-[#E2E5EB] rounded-xl divide-y divide-[#E9EBEF] text-left">
              <div className="p-4 flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-md bg-[#FAF9F6] border border-[#E2E5EB] text-[#5578A8] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4.5 h-4.5" strokeWidth={1.65} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#14243A]">622 Exam Questions</p>
                  <p className="text-xs text-[#667085] mt-0.5">
                    Tagalog · English · CDE · TDC
                  </p>
                </div>
              </div>

              <div className="p-4 flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-md bg-[#FAF9F6] border border-[#E2E5EB] text-[#5578A8] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4.5 h-4.5" strokeWidth={1.65} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#14243A]">182 Road Signs &amp; Markings</p>
                  <p className="text-xs text-[#667085] mt-0.5">
                    Clear diagrams with concise explanations
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="w-full flex flex-col items-center">
            <div className="w-16 h-16 rounded-xl bg-white border border-[#E2E5EB] flex items-center justify-center text-[#5578A8] mb-5 shrink-0">
              <Gamepad2 className="w-7 h-7" strokeWidth={1.6} />
            </div>

            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5578A8] mb-2">
              Structured Practice
            </p>

            <h1 className="font-display text-2xl sm:text-[26px] font-bold text-[#14243A] tracking-[-0.02em] leading-tight mb-2.5 max-w-xs">
              Learn &amp; Practice Your Way
            </h1>

            <p className="text-sm text-[#667085] leading-[1.6] max-w-xs mb-6">
              Choose how many questions to answer or browse the full study guide anytime.
            </p>

            <div className="w-full bg-white border border-[#E2E5EB] rounded-xl divide-y divide-[#E9EBEF] text-left">
              <div className="p-4 flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-md bg-[#FAF9F6] border border-[#E2E5EB] text-[#5578A8] flex items-center justify-center shrink-0">
                  <Gamepad2 className="w-4.5 h-4.5" strokeWidth={1.65} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#14243A]">Distraction-Free Quiz</h3>
                  <p className="text-xs text-[#667085] mt-0.5">
                    Pick your question count with instant score tracking.
                  </p>
                </div>
              </div>

              <div className="p-4 flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-md bg-[#FAF9F6] border border-[#E2E5EB] text-[#5578A8] flex items-center justify-center shrink-0">
                  <BookOpen className="w-4.5 h-4.5" strokeWidth={1.65} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#14243A]">Study Guide &amp; Rationale</h3>
                  <p className="text-xs text-[#667085] mt-0.5">
                    Tap any question to reveal the answer and rationale.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="w-full flex flex-col items-center">
            <div className="w-16 h-16 rounded-xl bg-white border border-[#E2E5EB] flex items-center justify-center text-[#5578A8] mb-5 shrink-0">
              <WifiOff className="w-7 h-7" strokeWidth={1.6} />
            </div>

            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5578A8] mb-2">
              Always Accessible
            </p>

            <h1 className="font-display text-2xl sm:text-[26px] font-bold text-[#14243A] tracking-[-0.02em] leading-tight mb-2.5 max-w-xs">
              100% Offline &amp; Ready to Use
            </h1>

            <p className="text-sm text-[#667085] leading-[1.6] max-w-xs mb-6">
              No account or internet connection needed. Start reviewing right away wherever you are.
            </p>

            <div className="w-full bg-white border border-[#E2E5EB] rounded-xl divide-y divide-[#E9EBEF] text-left">
              <div className="p-4 flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-md bg-[#FAF9F6] border border-[#E2E5EB] text-[#5578A8] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4.5 h-4.5" strokeWidth={1.65} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#14243A]">No Login Required</p>
                  <p className="text-xs text-[#667085] mt-0.5">
                    Open and start practicing immediately
                  </p>
                </div>
              </div>

              <div className="p-4 flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-md bg-[#FAF9F6] border border-[#E2E5EB] text-[#5578A8] flex items-center justify-center shrink-0">
                  <WifiOff className="w-4.5 h-4.5" strokeWidth={1.65} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#14243A]">Works Offline Anytime</p>
                  <p className="text-xs text-[#667085] mt-0.5">
                    All questions and signs stored locally
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Controls: Subtle Progress Bars & Restrained CTAs */}
      <div className="shrink-0 space-y-4">
        <div className="flex items-center justify-center gap-2">
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setStep(idx)}
              aria-label={`Go to step ${idx + 1}`}
              className={`h-1 rounded-sm transition-all duration-200 ${
                idx === step ? 'w-7 bg-[#C5A46D]' : 'w-2.5 bg-[#E9EBEF]'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep((prev) => prev - 1)}
              className="h-12 w-12 rounded-md bg-white border border-[#E2E5EB] flex items-center justify-center text-[#14243A] hover:bg-[#E9EBEF] transition-colors shrink-0"
              aria-label="Previous step"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={1.75} />
            </button>
          )}

          {step < 2 ? (
            <button
              type="button"
              onClick={() => setStep((prev) => prev + 1)}
              className="flex-1 h-12 rounded-md bg-[#14243A] hover:bg-[#1E3554] text-[#FAF9F6] font-semibold text-xs uppercase tracking-[0.1em] transition-colors flex items-center justify-center gap-2"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="flex-1 h-12 rounded-md bg-[#14243A] hover:bg-[#1E3554] text-[#FAF9F6] font-semibold text-xs uppercase tracking-[0.1em] transition-colors flex items-center justify-center gap-2"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
