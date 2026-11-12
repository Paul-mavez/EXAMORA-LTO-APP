import React, { useState } from 'react';
import {
  AlertTriangle,
  BarChart3,
  Bookmark,
  Check,
  Moon,
  RotateCcw,
  Sun,
  Trash2,
} from 'lucide-react';
import {
  AppLanguage,
  PreparationTrack,
  ThemePreference,
} from '../../domain/model/models';
import {
  PrimaryButton,
  SafePngImage,
  SecondaryButton,
} from '../../ui/components/ExamoraComponents';
import {
  ProgressAnalyticsScreen,
  SavedAndNotesScreen,
} from '../progress/ProgressAndSavedScreens';
import { useExamoraViewModel } from '../state/ExamoraContext';

export const ProfileScreen: React.FC = () => {
  const {
    preferences,
    t,
    bookmarks,
    notes,
    reports,
    subDestination,
    setSubDestination,
    updatePreferences,
    replayOnboarding,
    resetAllProgress,
  } = useExamoraViewModel();

  const [nameInput, setNameInput] = useState(preferences.displayName);
  const [savedNameFeedback, setSavedNameFeedback] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  if (subDestination.type === 'SAVED_NOTES') {
    return <SavedAndNotesScreen />;
  }

  if (subDestination.type === 'PROGRESS_ANALYTICS') {
    return <ProgressAnalyticsScreen />;
  }

  const tracks: PreparationTrack[] = ['STUDENT_PERMIT', 'NON_PROFESSIONAL', 'PROFESSIONAL'];
  const dailyGoals = [10, 20, 30, 50];

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    updatePreferences({ displayName: nameInput.trim() });
    setSavedNameFeedback(true);
    setTimeout(() => setSavedNameFeedback(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#14243A] dark:text-[#F4F6F9] mb-1">
          {t.profile.title}
        </h1>
        <p className="text-sm text-[#667085] dark:text-[#98A2B3]">{t.profile.subtitle}</p>
      </div>

      {/* Quick Shortcuts to Progress Analytics & Saved Materials */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => setSubDestination({ type: 'PROGRESS_ANALYTICS' })}
          className="p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D] hover:border-[#14243A]/35 dark:hover:border-[#D8A43B]/50 text-left flex items-center justify-between gap-3 transition-colors"
        >
          <div>
            <p className="text-base font-semibold text-[#14243A] dark:text-[#F4F6F9]">
              {t.progress.title}
            </p>
            <p className="text-xs text-[#667085] dark:text-[#98A2B3] mt-0.5">
              Topic charts, accuracy, and study sessions
            </p>
          </div>
          <BarChart3 className="w-5 h-5 text-[#D8A43B] shrink-0" />
        </button>

        <button
          type="button"
          onClick={() => setSubDestination({ type: 'SAVED_NOTES' })}
          className="p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D] hover:border-[#14243A]/35 dark:hover:border-[#D8A43B]/50 text-left flex items-center justify-between gap-3 transition-colors"
        >
          <div>
            <p className="text-base font-semibold text-[#14243A] dark:text-[#F4F6F9]">
              {t.saved.title}
            </p>
            <p className="text-xs text-[#667085] dark:text-[#98A2B3] mt-0.5 font-mono-tabular">
              {bookmarks.length} bookmarks · {notes.length} personal notes
            </p>
          </div>
          <Bookmark className="w-5 h-5 text-[#32845A] shrink-0" />
        </button>
      </div>

      {/* Learner Display Name & Preparation Track */}
      <section className="p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D] space-y-6">
        <form onSubmit={handleSaveName} className="space-y-2">
          <label
            htmlFor="profile-display-name"
            className="block text-sm font-semibold text-[#14243A] dark:text-[#F4F6F9]"
          >
            {t.profile.displayName} (Optional · No Account Required)
          </label>
          <div className="flex items-center gap-3">
            <input
              id="profile-display-name"
              type="text"
              maxLength={40}
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Learner"
              className="flex-1 min-h-[46px] px-4 rounded-xl border border-[#E9EBEF] dark:border-[#24344D] bg-[#FAF9F6] dark:bg-[#0D1726] text-sm text-[#14243A] dark:text-[#F4F6F9]"
            />
            <PrimaryButton type="submit">
              {savedNameFeedback ? <Check className="w-4 h-4" /> : null}
              {t.profile.saveName}
            </PrimaryButton>
          </div>
        </form>

        <div>
          <label className="block text-sm font-semibold text-[#14243A] dark:text-[#F4F6F9] mb-2.5">
            {t.profile.prepTrack}
          </label>
          <div className="space-y-2.5">
            {tracks.map((trk) => {
              const active = preferences.preparationTrack === trk;
              const info = t.tracks[trk];
              return (
                <button
                  key={trk}
                  type="button"
                  onClick={() => updatePreferences({ preparationTrack: trk })}
                  className={`w-full p-4 rounded-xl border text-left transition-colors flex items-center justify-between gap-3 ${
                    active
                      ? 'border-[#14243A] bg-[#14243A]/[0.04] dark:border-[#D8A43B] dark:bg-[#D8A43B]/10'
                      : 'border-[#E9EBEF] dark:border-[#24344D] hover:bg-[#FAF9F6] dark:hover:bg-[#1C2C46]'
                  }`}
                >
                  <div>
                    <p className="text-sm font-semibold text-[#14243A] dark:text-[#F4F6F9]">
                      {info.title}
                    </p>
                    <p className="text-xs text-[#667085] dark:text-[#98A2B3] mt-0.5">
                      {info.desc}
                    </p>
                  </div>
                  {active && <Check className="w-4 h-4 text-[#32845A] shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Language, Daily Goal, Theme & Preferences */}
      <section className="p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D] space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Language */}
          <div>
            <label className="block text-sm font-semibold text-[#14243A] dark:text-[#F4F6F9] mb-2.5">
              {t.profile.language}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  { code: 'en', label: 'English' },
                  { code: 'fil', label: 'Filipino' },
                ] as { code: AppLanguage; label: string }[]
              ).map((l) => {
                const active = preferences.language === l.code;
                return (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => updatePreferences({ language: l.code })}
                    className={`min-h-[44px] px-4 rounded-xl text-xs font-semibold border transition-colors ${
                      active
                        ? 'bg-[#14243A] text-white border-[#14243A] dark:bg-[#D8A43B] dark:text-[#14243A] dark:border-[#D8A43B]'
                        : 'bg-[#FAF9F6] text-[#667085] border-[#E9EBEF] dark:bg-[#0D1726] dark:text-[#98A2B3] dark:border-[#24344D]'
                    }`}
                  >
                    {l.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Daily Learning Goal */}
          <div>
            <label className="block text-sm font-semibold text-[#14243A] dark:text-[#F4F6F9] mb-2.5">
              {t.profile.dailyGoal}
            </label>
            <div className="grid grid-cols-4 gap-2">
              {dailyGoals.map((goal) => {
                const active = preferences.dailyGoalQuestions === goal;
                return (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => updatePreferences({ dailyGoalQuestions: goal })}
                    className={`min-h-[44px] rounded-xl text-xs font-mono-tabular font-semibold border transition-colors ${
                      active
                        ? 'bg-[#14243A] text-white border-[#14243A] dark:bg-[#D8A43B] dark:text-[#14243A] dark:border-[#D8A43B]'
                        : 'bg-[#FAF9F6] text-[#667085] border-[#E9EBEF] dark:bg-[#0D1726] dark:text-[#98A2B3] dark:border-[#24344D]'
                    }`}
                  >
                    {goal}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Theme Preference */}
        <div>
          <label className="block text-sm font-semibold text-[#14243A] dark:text-[#F4F6F9] mb-2.5">
            {t.profile.theme}
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            {(
              [
                { id: 'light', label: t.profile.themeLight, icon: <Sun className="w-4 h-4" /> },
                { id: 'dark', label: t.profile.themeDark, icon: <Moon className="w-4 h-4" /> },
                { id: 'system', label: t.profile.themeSystem, icon: null },
              ] as { id: ThemePreference; label: string; icon: React.ReactNode }[]
            ).map((opt) => {
              const active = preferences.theme === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => updatePreferences({ theme: opt.id })}
                  className={`min-h-[44px] px-3 rounded-xl text-xs font-semibold border inline-flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap ${
                    active
                      ? 'bg-[#14243A] text-white border-[#14243A] dark:bg-[#D8A43B] dark:text-[#14243A] dark:border-[#D8A43B]'
                      : 'bg-[#FAF9F6] text-[#667085] border-[#E9EBEF] dark:bg-[#0D1726] dark:text-[#98A2B3] dark:border-[#24344D]'
                  }`}
                >
                  {opt.icon}
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Local Toggles: Notifications & Sound */}
        <div className="divide-y divide-[#E9EBEF] dark:divide-[#24344D] pt-2">
          <div className="py-3 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-[#14243A] dark:text-[#F4F6F9]">
                {t.profile.notifications}
              </p>
              <p className="text-xs text-[#667085] dark:text-[#98A2B3]">
                Store local study reminder preference on device
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={preferences.notificationsEnabled}
              onClick={() =>
                updatePreferences({ notificationsEnabled: !preferences.notificationsEnabled })
              }
              className={`w-12 h-7 rounded-full p-1 transition-colors ${
                preferences.notificationsEnabled
                  ? 'bg-[#32845A]'
                  : 'bg-[#E9EBEF] dark:bg-[#24344D]'
              }`}
            >
              <span
                className={`block w-5 h-5 rounded-full bg-white transition-transform ${
                  preferences.notificationsEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="py-3 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-[#14243A] dark:text-[#F4F6F9]">
                {t.profile.soundEffects}
              </p>
              <p className="text-xs text-[#667085] dark:text-[#98A2B3]">
                Play subtle audio confirmation on practice answers
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={preferences.soundEnabled}
              onClick={() => updatePreferences({ soundEnabled: !preferences.soundEnabled })}
              className={`w-12 h-7 rounded-full p-1 transition-colors ${
                preferences.soundEnabled ? 'bg-[#32845A]' : 'bg-[#E9EBEF] dark:bg-[#24344D]'
              }`}
            >
              <span
                className={`block w-5 h-5 rounded-full bg-white transition-transform ${
                  preferences.soundEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* Actions: Replay Onboarding & Reset Progress */}
      <section className="p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D] flex flex-wrap items-center justify-between gap-4">
        <SecondaryButton onClick={replayOnboarding}>
          <RotateCcw className="w-4 h-4" />
          {t.profile.replayOnboarding}
        </SecondaryButton>

        <button
          type="button"
          onClick={() => setShowResetModal(true)}
          className="min-h-[46px] px-5 py-2.5 rounded-xl text-sm font-medium border border-[#C44B4B]/40 text-[#C44B4B] hover:bg-[#C44B4B]/10 inline-flex items-center gap-2 transition-colors whitespace-nowrap"
        >
          <Trash2 className="w-4 h-4" />
          {t.profile.resetProgress}
        </button>
      </section>

      {/* About Examora, Privacy Policy & Independent Disclaimer */}
      <section className="p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D] space-y-5">
        <div className="flex items-center gap-3.5">
          <SafePngImage
            src="/assets/png/examora_logo.png"
            alt="Examora - LTO reviewer"
            className="w-12 h-12 rounded-2xl object-contain"
          />
          <div>
            <p className="text-xs font-mono-tabular text-[#D8A43B] font-semibold">
              {t.brandParent}
            </p>
            <h2 className="font-display text-lg font-bold text-[#14243A] dark:text-[#F4F6F9]">
              {t.profile.aboutTitle}
            </h2>
            <p className="text-xs text-[#667085] dark:text-[#98A2B3]">{t.tagline}</p>
          </div>
        </div>

        <div className="space-y-2 text-xs text-[#667085] dark:text-[#98A2B3] leading-relaxed">
          <p className="font-semibold text-[#14243A] dark:text-[#F4F6F9]">
            {t.profile.privacyTitle}
          </p>
          <p>{t.profile.privacyBody}</p>
        </div>

        {reports.length > 0 && (
          <div className="pt-3 border-t border-[#E9EBEF] dark:border-[#24344D] text-xs text-[#667085] dark:text-[#98A2B3]">
            Flagged items stored locally for content review: {reports.length}
          </div>
        )}

        <div className="pt-3 border-t border-[#E9EBEF] dark:border-[#24344D] text-xs text-[#667085] dark:text-[#98A2B3] leading-relaxed">
          <p className="font-semibold text-[#14243A] dark:text-[#F4F6F9] mb-1">Disclaimer</p>
          <p>{t.disclaimer}</p>
        </div>
      </section>

      {/* Reset Progress Confirmation Modal */}
      {showResetModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/55 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowResetModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D] p-6 space-y-4"
          >
            <div className="flex items-center gap-2.5 text-[#C44B4B]">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <h3 className="font-display text-lg font-bold">{t.profile.resetConfirmTitle}</h3>
            </div>
            <p className="text-sm text-[#667085] dark:text-[#98A2B3] leading-relaxed">
              {t.profile.resetConfirmBody}
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <SecondaryButton onClick={() => setShowResetModal(false)}>Cancel</SecondaryButton>
              <button
                type="button"
                onClick={() => {
                  resetAllProgress();
                  setShowResetModal(false);
                }}
                className="min-h-[46px] px-5 py-2.5 rounded-xl bg-[#C44B4B] text-white text-sm font-medium hover:bg-[#AF3E3E] transition-colors whitespace-nowrap"
              >
                {t.profile.confirmResetBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
