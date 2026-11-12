import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Globe, ShieldCheck } from 'lucide-react';
import { AppLanguage, PreparationTrack } from '../../domain/model/models';
import { en } from '../../i18n/en';
import { fil } from '../../i18n/fil';
import {
  PrimaryButton,
  SafePngImage,
  SecondaryButton,
} from '../../ui/components/ExamoraComponents';
import { useExamoraViewModel } from '../state/ExamoraContext';

const SLIDE_IMAGES = [
  '/assets/png/onboarding/onboarding_1.png',
  '/assets/png/onboarding/onboarding_2.png',
  '/assets/png/onboarding/onboarding_3.png',
  '/assets/png/onboarding/onboarding_4.png',
];

export const OnboardingScreen: React.FC = () => {
  const { preferences, completeOnboarding } = useExamoraViewModel();

  const [stepIndex, setStepIndex] = useState<number>(0); // 0..3 = slides, 4 = initial setup
  const [selectedLang, setSelectedLang] = useState<AppLanguage>(preferences.language || 'en');
  const [selectedTrack, setSelectedTrack] = useState<PreparationTrack>(
    preferences.preparationTrack || 'NON_PROFESSIONAL',
  );
  const [displayName, setDisplayName] = useState<string>(preferences.displayName || '');

  const dict = selectedLang === 'fil' ? fil : en;
  const isSetupStep = stepIndex === 4;
  const currentSlide = dict.onboarding.slides[Math.min(stepIndex, 3)];

  const tracks: PreparationTrack[] = ['STUDENT_PERMIT', 'NON_PROFESSIONAL', 'PROFESSIONAL'];

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    completeOnboarding({
      language: selectedLang,
      preparationTrack: selectedTrack,
      displayName,
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#0D1726] text-[#14243A] dark:text-[#F4F6F9] flex flex-col justify-between">
      {/* Top Minimal Brand Bar */}
      <header className="w-full max-w-5xl mx-auto px-4 sm:px-8 pt-6 pb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <SafePngImage
            src="/assets/png/examora_logo.png"
            alt="Examora - LTO reviewer"
            className="w-10 h-10 rounded-xl object-contain"
          />
          <div>
            <p className="text-[11px] font-mono-tabular tracking-wider text-[#667085] dark:text-[#98A2B3]">
              {dict.brandParent}
            </p>
            <p className="font-display text-base font-bold text-[#14243A] dark:text-[#F4F6F9]">
              {dict.appName}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Language Preview Toggle */}
          <div className="inline-flex items-center p-1 rounded-xl bg-[#E9EBEF] dark:bg-[#142033]">
            <button
              type="button"
              onClick={() => setSelectedLang('en')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                selectedLang === 'en'
                  ? 'bg-[#FFFFFF] text-[#14243A] shadow-xs dark:bg-[#24344D] dark:text-[#F4F6F9]'
                  : 'text-[#667085] dark:text-[#98A2B3]'
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setSelectedLang('fil')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                selectedLang === 'fil'
                  ? 'bg-[#FFFFFF] text-[#14243A] shadow-xs dark:bg-[#24344D] dark:text-[#F4F6F9]'
                  : 'text-[#667085] dark:text-[#98A2B3]'
              }`}
            >
              Filipino
            </button>
          </div>

          {!isSetupStep && (
            <button
              type="button"
              onClick={() => setStepIndex(4)}
              className="min-h-[40px] px-3 py-1.5 text-xs font-medium text-[#667085] hover:text-[#14243A] dark:text-[#98A2B3] dark:hover:text-[#F4F6F9] whitespace-nowrap"
            >
              {dict.onboarding.skipSlide}
            </button>
          )}
        </div>
      </header>

      {/* Center Content */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-8 py-6 flex items-center">
        {!isSetupStep ? (
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left / Top Illustration Stage */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl overflow-hidden border border-[#E9EBEF] dark:border-[#24344D] bg-[#14243A] shadow-sm">
                <SafePngImage
                  src={SLIDE_IMAGES[stepIndex]}
                  alt={currentSlide.title}
                  className="w-full h-64 sm:h-80 object-contain p-4"
                />
              </div>
            </div>

            {/* Right / Bottom Editorial Copy & Controls */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <p className="text-xs font-mono-tabular text-[#D8A43B] font-semibold mb-2">
                  0{stepIndex + 1} / 04 · {dict.tagline}
                </p>
                <h1
                  className="font-display text-2xl sm:text-3xl font-bold text-[#14243A] dark:text-[#F4F6F9] leading-tight mb-4"
                  style={{ textWrap: 'balance' }}
                >
                  {currentSlide.title}
                </h1>
                <p className="text-base text-[#667085] dark:text-[#98A2B3] leading-relaxed mb-8">
                  {currentSlide.description}
                </p>
              </div>

              {/* Page Indicators */}
              <div className="flex items-center gap-2 mb-8" aria-label="Onboarding Slide Progress">
                {[0, 1, 2, 3].map((idx) => (
                  <button
                    key={idx}
                    type="button"
                    aria-label={`Go to slide ${idx + 1}`}
                    onClick={() => setStepIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-150 ${
                      idx === stepIndex
                        ? 'w-8 bg-[#14243A] dark:bg-[#D8A43B]'
                        : 'w-2.5 bg-[#E9EBEF] dark:bg-[#24344D]'
                    }`}
                  />
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center gap-3">
                {stepIndex > 0 && (
                  <SecondaryButton onClick={() => setStepIndex((prev) => prev - 1)}>
                    <ArrowLeft className="w-4 h-4" />
                    {dict.onboarding.back}
                  </SecondaryButton>
                )}
                {stepIndex < 3 ? (
                  <PrimaryButton onClick={() => setStepIndex((prev) => prev + 1)} className="flex-1">
                    {dict.onboarding.next}
                    <ArrowRight className="w-4 h-4" />
                  </PrimaryButton>
                ) : (
                  <PrimaryButton onClick={() => setStepIndex(4)} className="flex-1">
                    {dict.onboarding.getStarted}
                    <ArrowRight className="w-4 h-4" />
                  </PrimaryButton>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Initial Setup Step: Language + Preparation Track + Optional Display Name */
          <form
            onSubmit={handleFinish}
            className="w-full max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D]"
          >
            <div className="mb-6">
              <p className="text-xs font-mono-tabular text-[#D8A43B] font-semibold mb-1">
                Initial Study Setup
              </p>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#14243A] dark:text-[#F4F6F9] mb-2">
                {dict.onboarding.setupTitle}
              </h1>
              <p className="text-sm text-[#667085] dark:text-[#98A2B3] leading-relaxed">
                {dict.onboarding.setupSubtitle}
              </p>
            </div>

            {/* 1. Language Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-[#14243A] dark:text-[#F4F6F9] mb-2.5">
                <span className="inline-flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-[#D8A43B]" />
                  {dict.onboarding.selectLanguage}
                </span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {(
                  [
                    { code: 'en', label: 'English', sub: 'Verified statutory terms' },
                    { code: 'fil', label: 'Filipino', sub: 'Malinaw na gabay sa batas trapiko' },
                  ] as const
                ).map((langOpt) => {
                  const active = selectedLang === langOpt.code;
                  return (
                    <button
                      key={langOpt.code}
                      type="button"
                      onClick={() => setSelectedLang(langOpt.code)}
                      className={`p-4 rounded-xl border text-left transition-colors ${
                        active
                          ? 'border-[#14243A] bg-[#14243A]/[0.04] dark:border-[#D8A43B] dark:bg-[#D8A43B]/10'
                          : 'border-[#E9EBEF] dark:border-[#24344D] hover:bg-[#FAF9F6] dark:hover:bg-[#1C2C46]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <span className="text-sm font-semibold text-[#14243A] dark:text-[#F4F6F9]">
                          {langOpt.label}
                        </span>
                        {active && <Check className="w-4 h-4 text-[#32845A]" />}
                      </div>
                      <p className="text-xs text-[#667085] dark:text-[#98A2B3]">{langOpt.sub}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Preparation Track Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-[#14243A] dark:text-[#F4F6F9] mb-2.5">
                {dict.onboarding.selectTrack}
              </label>
              <div className="space-y-3">
                {tracks.map((trackKey) => {
                  const active = selectedTrack === trackKey;
                  const info = dict.tracks[trackKey];
                  return (
                    <button
                      key={trackKey}
                      type="button"
                      onClick={() => setSelectedTrack(trackKey)}
                      className={`w-full p-4 rounded-xl border text-left transition-colors flex items-start justify-between gap-3 ${
                        active
                          ? 'border-[#14243A] bg-[#14243A]/[0.04] dark:border-[#D8A43B] dark:bg-[#D8A43B]/10'
                          : 'border-[#E9EBEF] dark:border-[#24344D] hover:bg-[#FAF9F6] dark:hover:bg-[#1C2C46]'
                      }`}
                    >
                      <div>
                        <p className="text-sm font-semibold text-[#14243A] dark:text-[#F4F6F9] mb-1">
                          {info.title}
                        </p>
                        <p className="text-xs text-[#667085] dark:text-[#98A2B3] leading-relaxed">
                          {info.desc}
                        </p>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                          active
                            ? 'bg-[#32845A] border-[#32845A] text-white'
                            : 'border-[#667085]'
                        }`}
                      >
                        {active && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Optional Display Name */}
            <div className="mb-6">
              <label
                htmlFor="onboarding-display-name"
                className="block text-sm font-semibold text-[#14243A] dark:text-[#F4F6F9] mb-2"
              >
                {dict.onboarding.optionalNameLabel}
              </label>
              <input
                id="onboarding-display-name"
                type="text"
                maxLength={40}
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder={dict.onboarding.optionalNamePlaceholder}
                className="w-full min-h-[46px] px-4 py-2.5 rounded-xl border border-[#E9EBEF] dark:border-[#24344D] bg-[#FAF9F6] dark:bg-[#0D1726] text-sm text-[#14243A] dark:text-[#F4F6F9] focus:outline-2 focus:outline-[#D8A43B]"
              />
              <p className="mt-2 text-xs text-[#667085] dark:text-[#98A2B3] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#32845A] shrink-0" />
                {dict.onboarding.noAccountNotice}
              </p>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <SecondaryButton onClick={() => setStepIndex(3)}>
                <ArrowLeft className="w-4 h-4" />
                {dict.onboarding.back}
              </SecondaryButton>
              <PrimaryButton type="submit" className="flex-1 sm:flex-none">
                {dict.onboarding.completeSetup}
                <ArrowRight className="w-4 h-4" />
              </PrimaryButton>
            </div>
          </form>
        )}
      </main>

      {/* Mandatory Disclaimer Footer */}
      <footer className="w-full max-w-5xl mx-auto px-4 sm:px-8 py-5 text-xs text-[#667085] dark:text-[#98A2B3]">
        <p className="leading-relaxed">{dict.disclaimer}</p>
      </footer>
    </div>
  );
};
