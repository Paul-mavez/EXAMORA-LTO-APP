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
      setRefreshToast('Question bank is fully synchronized and up to date.');
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
    <div className="w-full max-w-md mx-auto px-4 pt-9 pb-32 min-h-screen text-[#14243A]">
      <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5578A8]">
        Platform Overview
      </p>
      <h1 className="font-display text-3xl font-bold tracking-[-0.02em] mb-5 text-[#14243A]">
        About
      </h1>

      <section className="mb-5 rounded-xl border border-[#E2E5EB] bg-white p-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 shrink-0 overflow-hidden rounded-lg border border-[#E2E5EB] bg-[#FAF9F6] p-1">
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
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#C5A46D]">
              Examora
            </p>
            <h2 className="mt-0.5 font-display text-lg font-bold leading-tight text-[#14243A]">
              LTO Driver Exam Reviewer
            </h2>
          </div>
        </div>
        <p className="mt-4 pt-4 border-t border-[#E9EBEF] text-sm leading-[1.6] text-[#667085]">
          A structured, offline-first study companion for the Philippine Land Transportation Office driver’s license theoretical examination.
        </p>
      </section>

      {refreshToast && (
        <div className="mb-5 flex items-center gap-2 rounded-xl border border-[#2E7D5B]/40 bg-[#F3FAF6] p-3.5 text-xs font-medium text-[#14243A]">
          <Check className="h-4 w-4 shrink-0 text-[#2E7D5B]" strokeWidth={2} />
          <span>{refreshToast}</span>
        </div>
      )}

      <section className="mb-5">
        <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5578A8]">
          Core Capabilities
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-[#E2E5EB] bg-white p-4">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md border border-[#E2E5EB] bg-[#FAF9F6] text-[#5578A8]">
              <Gamepad2 className="h-4.5 w-4.5" strokeWidth={1.65} />
            </div>
            <h4 className="text-sm font-semibold text-[#14243A]">Interactive Quiz</h4>
            <p className="mt-1 text-xs leading-relaxed text-[#667085]">
              Customizable practice sessions with live scoring
            </p>
          </div>
          <div className="rounded-xl border border-[#E2E5EB] bg-white p-4">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md border border-[#E2E5EB] bg-[#FAF9F6] text-[#5578A8]">
              <BookOpen className="h-4.5 w-4.5" strokeWidth={1.65} />
            </div>
            <h4 className="text-sm font-semibold text-[#14243A]">Study Guide</h4>
            <p className="mt-1 text-xs leading-relaxed text-[#667085]">
              Browse questions paired with clear rationales
            </p>
          </div>
          <div className="rounded-xl border border-[#E2E5EB] bg-white p-4">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md border border-[#E2E5EB] bg-[#FAF9F6] text-[#5578A8]">
              <WifiOff className="h-4.5 w-4.5" strokeWidth={1.65} />
            </div>
            <h4 className="text-sm font-semibold text-[#14243A]">Offline Access</h4>
            <p className="mt-1 text-xs leading-relaxed text-[#667085]">
              Complete question bank cached locally
            </p>
          </div>
          <div className="rounded-xl border border-[#E2E5EB] bg-white p-4">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md border border-[#E2E5EB] bg-[#FAF9F6] text-[#5578A8]">
              <RefreshCw className="h-4.5 w-4.5" strokeWidth={1.65} />
            </div>
            <h4 className="text-sm font-semibold text-[#14243A]">Local Sync</h4>
            <p className="mt-1 text-xs leading-relaxed text-[#667085]">
              Verify and refresh curated exam materials
            </p>
          </div>
        </div>
      </section>

      <section className="mb-5 rounded-xl border border-[#E2E5EB] bg-white p-5">
        <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5578A8]">
          Information
        </h3>
        <div className="divide-y divide-[#E9EBEF]">
          <div className="flex items-center justify-between gap-4 py-3 text-sm">
            <span className="text-[#667085]">Version</span>
            <span className="font-mono-tabular font-semibold text-[#14243A]">26 (1)</span>
          </div>
          <div className="flex items-center justify-between gap-4 py-3 text-sm">
            <span className="text-[#667085]">Publisher</span>
            <span className="font-semibold text-[#14243A]">EXAMORA</span>
          </div>
          <div className="flex items-center justify-between gap-4 py-3 text-sm">
            <span className="text-[#667085]">Last Updated</span>
            <span className="font-mono-tabular font-semibold text-[#14243A]">Nov 12, 2026</span>
          </div>
        </div>
      </section>

      <section className="mb-5 rounded-xl border border-[#E2E5EB] bg-white p-5">
        <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5578A8]">
          Disclaimer
        </h3>
        <p className="mb-3 text-sm leading-[1.6] text-[#667085]">
          This reviewer assists candidates preparing for the LTO examination. Always verify official rules with the Land Transportation Office. Examora does not guarantee exam outcomes.
        </p>
        <p className="rounded-lg border border-[#E2E5EB] bg-[#FAF9F6] p-3 text-xs leading-[1.6] text-[#667085]">
          Examora - LTO reviewer is an independent educational application and is not affiliated with or endorsed by the Land Transportation Office (LTO).
        </p>
      </section>

      <section className="mb-6 rounded-xl border border-[#E2E5EB] bg-white p-5">
        <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5578A8]">
          Support &amp; Preferences
        </h3>
        <div className="divide-y divide-[#E9EBEF]">
          <button
            type="button"
            onClick={handleRefresh}
            className="flex min-h-14 w-full items-center gap-3 py-3 text-left transition-colors hover:bg-[#FAF9F6]"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[#E2E5EB] bg-[#FAF9F6] text-[#5578A8]">
              <RefreshCw
                className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`}
                strokeWidth={1.65}
              />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold text-[#14243A]">Refresh Questions</span>
              <span className="mt-0.5 block text-xs text-[#667085]">
                Verify local question bank synchronization
              </span>
            </span>
            <ChevronRight className="h-4 w-4 shrink-0 text-[#667085]" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            onClick={() => setShowSupportModal(true)}
            className="flex min-h-14 w-full items-center gap-3 py-3 text-left transition-colors hover:bg-[#FAF9F6]"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[#E2E5EB] bg-[#FAF9F6] text-[#5578A8]">
              <Mail className="h-4 w-4" strokeWidth={1.65} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold text-[#14243A]">Contact Support</span>
              <span className="mt-0.5 block text-xs text-[#667085]">
                Report an issue or share feedback
              </span>
            </span>
            <ChevronRight className="h-4 w-4 shrink-0 text-[#667085]" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            onClick={() => setShowRatingModal(true)}
            className="flex min-h-14 w-full items-center gap-3 py-3 text-left transition-colors hover:bg-[#FAF9F6]"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[#E2E5EB] bg-[#FAF9F6] text-[#C5A46D]">
              <Star className="h-4 w-4" strokeWidth={1.65} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold text-[#14243A]">Rate This App</span>
              <span className="mt-0.5 block text-xs text-[#667085]">
                Share your review experience
              </span>
            </span>
            <ChevronRight className="h-4 w-4 shrink-0 text-[#667085]" strokeWidth={1.75} />
          </button>
          {onReplayOnboarding && (
            <button
              type="button"
              onClick={onReplayOnboarding}
              className="flex min-h-14 w-full items-center gap-3 py-3 text-left transition-colors hover:bg-[#FAF9F6]"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[#E2E5EB] bg-[#FAF9F6] text-[#5578A8]">
                <Sparkles className="h-4 w-4" strokeWidth={1.65} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-[#14243A]">
                  Welcome &amp; Setup Guide
                </span>
                <span className="mt-0.5 block text-xs text-[#667085]">
                  Replay the onboarding walkthrough
                </span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-[#667085]" strokeWidth={1.75} />
            </button>
          )}
        </div>
      </section>

      <div className="border-t border-[#E9EBEF] pt-5 pb-4 text-center text-xs text-[#667085]">
        <p>© 2026 EXAMORA</p>
      </div>

      {showSupportModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#14243A]/40 p-0 backdrop-blur-xs sm:items-center sm:p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="support-title"
            className="w-full max-w-md rounded-t-xl border border-[#E2E5EB] bg-white p-6 text-[#14243A] sm:rounded-xl"
          >
            <div className="mb-4 flex items-center justify-between border-b border-[#E9EBEF] pb-3">
              <h3 id="support-title" className="flex items-center gap-2 font-display text-base font-bold">
                <Mail className="h-4 w-4 text-[#5578A8]" strokeWidth={1.75} /> Contact Support
              </h3>
              <button
                type="button"
                onClick={() => setShowSupportModal(false)}
                aria-label="Close contact support"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-[#E2E5EB] bg-[#FAF9F6] text-[#14243A] hover:bg-[#E9EBEF]"
              >
                <X className="h-4 w-4" strokeWidth={1.75} />
              </button>
            </div>

            {supportSuccess ? (
              <div className="space-y-2 py-6 text-center">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-md border border-[#2E7D5B]/40 bg-[#F3FAF6] text-[#2E7D5B]">
                  <Check className="h-5 w-5" strokeWidth={2.25} />
                </div>
                <p className="text-sm font-semibold text-[#14243A]">Feedback Sent</p>
                <p className="text-xs text-[#667085]">Thank you for sharing your feedback.</p>
              </div>
            ) : (
              <form onSubmit={handleSendSupport} className="space-y-4">
                <p className="text-sm leading-[1.6] text-[#667085]">
                  Have a question about an LTO exam topic or want to suggest an improvement? Send us a note:
                </p>
                <textarea
                  required
                  rows={4}
                  value={supportMessage}
                  onChange={(e) => setSupportMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="w-full rounded-md border border-[#E2E5EB] bg-[#FAF9F6] p-3 text-sm text-[#14243A] placeholder-[#667085] focus:border-[#14243A] focus:outline-none"
                />
                <button
                  type="submit"
                  className="flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-[#14243A] py-3 text-xs font-semibold uppercase tracking-[0.1em] text-[#FAF9F6] transition-colors hover:bg-[#1E3554]"
                >
                  <Send className="h-4 w-4" strokeWidth={1.75} /> Submit Message
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {showRatingModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#14243A]/40 p-0 backdrop-blur-xs sm:items-center sm:p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="rating-title"
            className="w-full max-w-md rounded-t-xl border border-[#E2E5EB] bg-white p-6 text-center text-[#14243A] sm:rounded-xl"
          >
            <div className="mb-2 flex justify-end">
              <button
                type="button"
                onClick={() => setShowRatingModal(false)}
                aria-label="Close rating"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-[#E2E5EB] bg-[#FAF9F6] text-[#14243A] hover:bg-[#E9EBEF]"
              >
                <X className="h-4 w-4" strokeWidth={1.75} />
              </button>
            </div>

            {ratingSubmitted ? (
              <div className="space-y-2 py-6">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-md border border-[#2E7D5B]/40 bg-[#F3FAF6] text-[#2E7D5B]">
                  <Check className="h-5 w-5" strokeWidth={2.25} />
                </div>
                <p id="rating-title" className="text-sm font-semibold text-[#14243A]">
                  Thank you for rating
                </p>
                <p className="text-xs text-[#667085]">
                  Your feedback helps us improve this reviewer.
                </p>
              </div>
            ) : (
              <>
                <h3 id="rating-title" className="mb-1 font-display text-lg font-bold">
                  Enjoying Examora?
                </h3>
                <p className="mb-5 text-sm text-[#667085]">
                  Select a rating for your exam preparation experience:
                </p>

                <div className="mb-6 flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((starVal) => (
                    <button
                      key={starVal}
                      type="button"
                      onClick={() => setRating(starVal)}
                      aria-label={`${starVal} star${starVal === 1 ? '' : 's'}`}
                      className="rounded-md p-1.5 transition-transform hover:scale-105 active:scale-95"
                    >
                      <Star
                        strokeWidth={1.65}
                        className={`h-7 w-7 ${
                          starVal <= rating
                            ? 'fill-[#C5A46D] text-[#C5A46D]'
                            : 'text-[#E2E5EB]'
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleRate}
                  className="w-full rounded-md bg-[#14243A] py-3.5 text-xs font-semibold uppercase tracking-[0.1em] text-[#FAF9F6] transition-colors hover:bg-[#1E3554]"
                >
                  Submit {rating}-Star Rating
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
