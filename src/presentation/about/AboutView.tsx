import React, { useState } from 'react';
import {
  BookOpen,
  Check,
  ChevronRight,
  Gamepad2,
  Mail,
  RefreshCw,
  Send,
  Sparkles,
  Star,
  WifiOff,
  X,
} from 'lucide-react';

interface AboutViewProps {
  onReplayOnboarding?: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onReplayOnboarding }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [refreshToast, setRefreshToast] = useState<string | null>(null);

  const [showSupportModal, setShowSupportModal] = useState(false);
  const [supportMessage, setSupportMessage] = useState('');
  const [supportSuccess, setSupportSuccess] = useState(false);

  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState<number>(5);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setRefreshToast('Question bank is fully synchronized and up-to-date!');
      setTimeout(() => setRefreshToast(null), 3000);
    }, 900);
  };

  const handleSendSupport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportMessage.trim()) return;
    setSupportSuccess(true);
    setTimeout(() => {
      setSupportSuccess(false);
      setShowSupportModal(false);
      setSupportMessage('');
    }, 1500);
  };

  const handleRate = () => {
    setRatingSubmitted(true);
    setTimeout(() => {
      setRatingSubmitted(false);
      setShowRatingModal(false);
    }, 1400);
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 pt-8 pb-32 min-h-screen text-[#14243A]">
      <h1 className="font-display text-3xl font-bold tracking-tight mb-5">About</h1>

      <section className="mb-5 rounded-3xl border border-[#BFDBFE] bg-gradient-to-br from-white to-[#EFF6FF] p-5 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 shrink-0 overflow-hidden rounded-2xl border border-[#DBEAFE] bg-white p-1.5">
            <img
              src="/assets/png/examora_logo.png"
              alt="LTO Driver Exam Reviewer"
              className="h-full w-full object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#D8A43B]">
              EXAMORA
            </p>
            <h2 className="mt-1 text-lg font-bold leading-tight text-[#14243A]">
              LTO Driver Exam Reviewer
            </h2>
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-[#475569]">
          Your comprehensive guide to passing the LTO driver's license examination
        </p>
      </section>

      {refreshToast && (
        <div className="mb-5 flex items-center gap-2 rounded-2xl border border-[#86EFAC] bg-[#F0FDF4] p-3 text-xs font-semibold text-[#166534] animate-in fade-in">
          <Check className="h-4 w-4 shrink-0" />
          <span>{refreshToast}</span>
        </div>
      )}

      <section className="mb-5">
        <h3 className="mb-3 text-lg font-bold text-[#14243A]">Features</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-[#E9EBEF] bg-white p-4">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#0A84FF]">
              <Gamepad2 className="h-5 w-5" />
            </div>
            <h4 className="text-sm font-semibold text-[#14243A]">Interactive Quiz</h4>
            <p className="mt-1 text-xs leading-relaxed text-[#667085]">
              Test your knowledge with customizable quizzes
            </p>
          </div>
          <div className="rounded-2xl border border-[#E9EBEF] bg-white p-4">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#0A84FF]">
              <BookOpen className="h-5 w-5" />
            </div>
            <h4 className="text-sm font-semibold text-[#14243A]">Study Guide</h4>
            <p className="mt-1 text-xs leading-relaxed text-[#667085]">
              Review all questions with detailed explanations
            </p>
          </div>
          <div className="rounded-2xl border border-[#E9EBEF] bg-white p-4">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#0A84FF]">
              <WifiOff className="h-5 w-5" />
            </div>
            <h4 className="text-sm font-semibold text-[#14243A]">Offline Access</h4>
            <p className="mt-1 text-xs leading-relaxed text-[#667085]">
              Study anywhere with cached questions
            </p>
          </div>
          <div className="rounded-2xl border border-[#E9EBEF] bg-white p-4">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#0A84FF]">
              <RefreshCw className="h-5 w-5" />
            </div>
            <h4 className="text-sm font-semibold text-[#14243A]">Auto Updates</h4>
            <p className="mt-1 text-xs leading-relaxed text-[#667085]">
              Questions are automatically updated from our servers
            </p>
          </div>
        </div>
      </section>

      <section className="mb-5 rounded-2xl border border-[#E9EBEF] bg-white p-5">
        <h3 className="mb-2 text-lg font-bold text-[#14243A]">Information</h3>
        <div className="divide-y divide-[#E9EBEF]">
          <div className="flex items-center justify-between gap-4 py-3 text-sm">
            <span className="text-[#667085]">Version</span>
            <span className="font-semibold text-[#14243A]">26 (1)</span>
          </div>
          <div className="flex items-center justify-between gap-4 py-3 text-sm">
            <span className="text-[#667085]">Developer</span>
            <span className="font-semibold text-[#14243A]">EXAMORA</span>
          </div>
          <div className="flex items-center justify-between gap-4 py-3 text-sm">
            <span className="text-[#667085]">Last Updated</span>
            <span className="font-semibold text-[#14243A]">Nov 12, 2026</span>
          </div>
        </div>
      </section>

      <section className="mb-5 rounded-2xl border border-[#E9EBEF] bg-white p-5">
        <h3 className="mb-2 text-lg font-bold text-[#14243A]">Disclaimer</h3>
        <p className="mb-3 text-sm leading-relaxed text-[#475569]">
          This app helps you prepare for the LTO exam. Check official LTO sources for current rules and requirements. Examora does not guarantee exam results.
        </p>
        <p className="rounded-xl border border-[#F3D28A] bg-[#FFF8E8] p-3 text-xs leading-relaxed text-[#7A5517]">
          Examora - LTO reviewer is an independent educational application and is not affiliated with or endorsed by the Land Transportation Office (LTO).
        </p>
      </section>

      <section className="mb-6 rounded-2xl border border-[#E9EBEF] bg-white p-5">
        <h3 className="mb-3 text-lg font-bold text-[#14243A]">Support</h3>
        <div className="space-y-2">
          <button
            type="button"
            onClick={handleRefresh}
            className="flex min-h-16 w-full items-center gap-3 rounded-xl p-2 text-left transition-colors hover:bg-[#F5F9FF]"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#0A84FF]">
              <RefreshCw className={`h-5 w-5 ${refreshing ? 'animate-spin' : ''}`} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold text-[#14243A]">Refresh Questions</span>
              <span className="mt-0.5 block text-xs leading-relaxed text-[#667085]">
                Update your question database with latest content
              </span>
            </span>
            <ChevronRight className="h-4 w-4 shrink-0 text-[#98A2B3]" />
          </button>
          <button
            type="button"
            onClick={() => setShowSupportModal(true)}
            className="flex min-h-16 w-full items-center gap-3 rounded-xl p-2 text-left transition-colors hover:bg-[#F5F9FF]"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#0A84FF]">
              <Mail className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold text-[#14243A]">Contact Support</span>
              <span className="mt-0.5 block text-xs leading-relaxed text-[#667085]">
                Get help with issues or share your feedback
              </span>
            </span>
            <ChevronRight className="h-4 w-4 shrink-0 text-[#98A2B3]" />
          </button>
          <button
            type="button"
            onClick={() => setShowRatingModal(true)}
            className="flex min-h-16 w-full items-center gap-3 rounded-xl p-2 text-left transition-colors hover:bg-[#F5F9FF]"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#0A84FF]">
              <Star className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold text-[#14243A]">Rate This App</span>
              <span className="mt-0.5 block text-xs leading-relaxed text-[#667085]">
                Help us improve by leaving a review
              </span>
            </span>
            <ChevronRight className="h-4 w-4 shrink-0 text-[#98A2B3]" />
          </button>
          {onReplayOnboarding && (
            <button
              type="button"
              onClick={onReplayOnboarding}
              className="flex min-h-16 w-full items-center gap-3 rounded-xl p-2 text-left transition-colors hover:bg-[#F5F9FF]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#0A84FF]">
                <Sparkles className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-[#14243A]">Welcome &amp; Setup Guide</span>
                <span className="mt-0.5 block text-xs leading-relaxed text-[#667085]">
                  View onboarding walkthrough and update license track
                </span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-[#98A2B3]" />
            </button>
          )}
        </div>
      </section>

      <div className="space-y-1 border-t border-[#E9EBEF] pt-5 pb-4 text-center text-xs text-[#667085]">
        <p>© 2026 EXAMORA</p>
      </div>

      {showSupportModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#14243A]/55 p-0 backdrop-blur-sm sm:items-center sm:p-4">
          <div role="dialog" aria-modal="true" aria-labelledby="support-title" className="w-full max-w-md rounded-t-3xl border border-[#BFDBFE] bg-white p-6 text-[#14243A] shadow-2xl sm:rounded-3xl">
            <div className="mb-4 flex items-center justify-between border-b border-[#E9EBEF] pb-3">
              <h3 id="support-title" className="flex items-center gap-2 text-base font-bold">
                <Mail className="h-4 w-4 text-[#0A84FF]" /> Contact Support
              </h3>
              <button
                type="button"
                onClick={() => setShowSupportModal(false)}
                aria-label="Close contact support"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#475569]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {supportSuccess ? (
              <div className="space-y-2 py-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F0FDF4] text-[#15803D]">
                  <Check className="h-6 w-6 stroke-[3]" />
                </div>
                <p className="text-sm font-bold">Salamat! Feedback Sent.</p>
                <p className="text-xs text-[#667085]">We appreciate your review and suggestions.</p>
              </div>
            ) : (
              <form onSubmit={handleSendSupport} className="space-y-4">
                <p className="text-sm leading-relaxed text-[#475569]">
                  Have a question about an LTO exam topic or want to suggest a feature? Send us a quick note:
                </p>
                <textarea
                  required
                  rows={4}
                  value={supportMessage}
                  onChange={(e) => setSupportMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="w-full rounded-2xl border border-[#BFDBFE] bg-[#F8FAFC] p-3 text-sm text-[#14243A] placeholder-[#667085] focus:border-[#0A84FF] focus:outline-none focus:ring-2 focus:ring-[#0A84FF]/20"
                />
                <button
                  type="submit"
                  className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0A84FF] py-3 text-sm font-bold text-white transition-colors hover:bg-[#006FE6]"
                >
                  <Send className="h-4 w-4" /> Submit Message
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {showRatingModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#14243A]/55 p-0 backdrop-blur-sm sm:items-center sm:p-4">
          <div role="dialog" aria-modal="true" aria-labelledby="rating-title" className="w-full max-w-md rounded-t-3xl border border-[#BFDBFE] bg-white p-6 text-center text-[#14243A] shadow-2xl sm:rounded-3xl">
            <div className="mb-2 flex justify-end">
              <button
                type="button"
                onClick={() => setShowRatingModal(false)}
                aria-label="Close rating"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#475569]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {ratingSubmitted ? (
              <div className="space-y-2 py-6">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F0FDF4] text-[#15803D]">
                  <Check className="h-6 w-6 stroke-[3]" />
                </div>
                <p id="rating-title" className="text-sm font-bold">Thank you for rating!</p>
                <p className="text-xs text-[#667085]">Your support helps us make this reviewer even better.</p>
              </div>
            ) : (
              <>
                <h3 id="rating-title" className="mb-1 text-lg font-bold">Enjoying the Reviewer?</h3>
                <p className="mb-5 text-sm text-[#667085]">
                  Tap a star to rate your exam preparation experience:
                </p>

                <div className="mb-6 flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((starVal) => (
                    <button
                      key={starVal}
                      type="button"
                      onClick={() => setRating(starVal)}
                      aria-label={`${starVal} star${starVal === 1 ? '' : 's'}`}
                      className="rounded-lg p-1.5 transition-transform hover:scale-110 active:scale-95"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          starVal <= rating
                            ? 'fill-[#F5A623] text-[#F5A623]'
                            : 'text-[#CBD5E1]'
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleRate}
                  className="w-full rounded-xl bg-[#0A84FF] py-3.5 text-sm font-bold text-white shadow-md shadow-[#0A84FF]/20 transition-colors hover:bg-[#006FE6]"
                >
                  Submit {rating} Star Rating
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
