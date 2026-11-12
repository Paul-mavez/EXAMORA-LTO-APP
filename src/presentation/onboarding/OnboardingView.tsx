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
    <div className="w-full max-w-md mx-auto px-6 pt-8 pb-8 h-[100dvh] max-h-[100dvh] overflow-hidden flex flex-col justify-between select-none bg-[#EFF6FF]">
      {/* Top Bar: Step Counter & Skip Button */}
      <div className="flex items-center justify-between h-9 shrink-0">
        <span className="text-xs font-bold tracking-wider uppercase text-[#0A84FF] bg-[#DBEAFE] px-3 py-1 rounded-full">
          Step {step + 1} of 3
        </span>

        {step < 2 ? (
          <button
            type="button"
            onClick={handleFinish}
            className="text-sm font-semibold text-[#475569] hover:text-[#0F172A] px-2 py-1 transition-colors"
          >
            Skip
          </button>
        ) : (
          <div className="w-10" />
        )}
      </div>

      {/* Center Content — Clean, Simple, Airy & Fits 100% Without Scrolling */}
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center text-center my-2">
        {step === 0 && (
          <div className="w-full flex flex-col items-center animate-in fade-in duration-200">
            {/* App Logo */}
            <div className="w-24 h-24 rounded-[22px] overflow-hidden shadow-xl mb-6 bg-[#001F87] flex items-center justify-center shrink-0">
              <img
                src="/assets/png/examora_logo.png"
                alt="LTO Driver Exam Reviewer"
                className="w-full h-full object-cover scale-[1.08]"
              />
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight leading-tight mb-3">
              Pass Your LTO Exam with Confidence
            </h1>

            <p className="text-sm text-[#475569] leading-relaxed max-w-xs mb-7">
              Everything you need to prepare for your Philippine driver’s license exam in one simple app.
            </p>

            {/* Simple 3-item summary card */}
            <div className="w-full bg-[#FFFFFF] border border-[#BFDBFE] rounded-3xl p-4 shadow-sm space-y-3 text-left">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#DBEAFE] text-[#0A84FF] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0F172A]">622+ Exam Questions</p>
                  <p className="text-xs text-[#475569]">Tagalog, English, CDE, and TDC categories</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#DBEAFE] text-[#0A84FF] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0F172A]">182+ Road Signs & Markings</p>
                  <p className="text-xs text-[#475569]">Clear visual illustrations for every sign</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="w-full flex flex-col items-center animate-in fade-in duration-200">
            {/* Icon Badge */}
            <div className="w-20 h-20 rounded-3xl bg-[#FFFFFF] border border-[#BFDBFE] shadow-md flex items-center justify-center text-[#0A84FF] mb-6 shrink-0">
              <Gamepad2 className="w-10 h-10" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight leading-tight mb-3">
              Learn & Practice Your Way
            </h1>

            <p className="text-sm text-[#475569] leading-relaxed max-w-xs mb-7">
              Choose how many questions you want to answer or browse the full study guide anytime.
            </p>

            <div className="w-full space-y-3 text-left">
              <div className="bg-[#FFFFFF] border border-[#BFDBFE] rounded-3xl p-4 flex items-center gap-3.5 shadow-sm">
                <div className="w-10 h-10 rounded-2xl bg-[#DBEAFE] text-[#0A84FF] flex items-center justify-center shrink-0">
                  <Gamepad2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0F172A]">Interactive Quiz</h3>
                  <p className="text-xs text-[#475569] mt-0.5">
                    Pick your question count and get instant score feedback.
                  </p>
                </div>
              </div>

              <div className="bg-[#FFFFFF] border border-[#BFDBFE] rounded-3xl p-4 flex items-center gap-3.5 shadow-sm">
                <div className="w-10 h-10 rounded-2xl bg-[#DBEAFE] text-[#0A84FF] flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0F172A]">Study Guide & Explanations</h3>
                  <p className="text-xs text-[#475569] mt-0.5">
                    Tap any question to reveal the correct answer and explanation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="w-full flex flex-col items-center animate-in fade-in duration-200">
            {/* Icon Badge */}
            <div className="w-20 h-20 rounded-3xl bg-[#FFFFFF] border border-[#BFDBFE] shadow-md flex items-center justify-center text-[#0A84FF] mb-6 shrink-0">
              <WifiOff className="w-10 h-10" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight leading-tight mb-3">
              100% Offline & Ready to Use
            </h1>

            <p className="text-sm text-[#475569] leading-relaxed max-w-xs mb-7">
              No account or internet connection needed. Start reviewing right away wherever you are.
            </p>

            <div className="w-full bg-[#FFFFFF] border border-[#BFDBFE] rounded-3xl p-4 shadow-sm space-y-3 text-left">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#DBEAFE] text-[#0A84FF] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0F172A]">No Login or Registration</p>
                  <p className="text-xs text-[#475569]">Jump straight into your review sessions</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#DBEAFE] text-[#0A84FF] flex items-center justify-center shrink-0">
                  <WifiOff className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0F172A]">Works Offline Anytime</p>
                  <p className="text-xs text-[#475569]">All questions and signs are saved on your device</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Controls: Pagination Dots & Action Button */}
      <div className="shrink-0 space-y-5">
        {/* Step Dots */}
        <div className="flex items-center justify-center gap-2">
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setStep(idx)}
              aria-label={`Go to step ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === step ? 'w-7 bg-[#0A84FF]' : 'w-2 bg-[#BFDBFE]'
              }`}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-3">
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep((prev) => prev - 1)}
              className="w-13 h-13 rounded-2xl bg-[#FFFFFF] border border-[#BFDBFE] flex items-center justify-center text-[#0F172A] hover:bg-[#DBEAFE] transition-colors shrink-0 shadow-xs"
              aria-label="Previous step"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}

          {step < 2 ? (
            <button
              type="button"
              onClick={() => setStep((prev) => prev + 1)}
              className="flex-1 py-4 rounded-2xl bg-[#0A84FF] hover:bg-[#0071E3] active:scale-[0.99] text-white font-bold text-base shadow-lg shadow-[#0A84FF]/25 transition-all flex items-center justify-center gap-2 keep-white"
            >
              <span>Continue</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="flex-1 py-4 rounded-2xl bg-[#0A84FF] hover:bg-[#0071E3] active:scale-[0.99] text-white font-bold text-base shadow-lg shadow-[#0A84FF]/25 transition-all flex items-center justify-center gap-2 keep-white"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
