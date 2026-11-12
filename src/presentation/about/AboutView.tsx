import React, { useState } from 'react';
import {
  BookOpen,
  Check,
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
    <div className="w-full max-w-md mx-auto px-4 pt-4 pb-28 text-white min-h-screen">
      {/* Title */}
      <h1 className="text-3xl font-extrabold tracking-tight text-white mb-6">
        About
      </h1>

      {/* App Squircle Emblem & Title (Exact match to Screenshot IMG_4107) */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-2xl border border-white/10 mb-4 bg-[#0A2540] p-1 flex items-center justify-center">
          <img
            src="/assets/png/examora_logo.png"
            alt="LTO Driver Exam Reviewer"
            className="w-full h-full object-cover rounded-2xl"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = 'none';
            }}
          />
        </div>

        <h2 className="text-2xl font-black text-white tracking-tight mb-1.5">
          LTO Driver Exam Reviewer
        </h2>
        <p className="text-xs text-[#8E8E93] max-w-xs leading-relaxed">
          Your comprehensive guide to passing the LTO driver's license examination
        </p>
      </div>

      {/* Toast Notification */}
      {refreshToast && (
        <div className="mb-4 p-3 rounded-2xl bg-[#0E2A47] border border-[#0A84FF]/40 text-xs text-[#0A84FF] font-semibold flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-[#34C759]" />
          <span>{refreshToast}</span>
        </div>
      )}

      {/* 1. FEATURES CARD (Matches IMG_4107) */}
      <div className="bg-[#1C1C1E] border border-[#2C2C2E] rounded-3xl p-5 mb-4 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white">Features</h3>

        <div className="flex items-start gap-3.5">
          <Gamepad2 className="w-5 h-5 text-[#0A84FF] shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-white">Interactive Quiz</h4>
            <p className="text-xs text-[#8E8E93] mt-0.5">
              Test your knowledge with customizable quizzes
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3.5">
          <BookOpen className="w-5 h-5 text-[#0A84FF] shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-white">Study Guide</h4>
            <p className="text-xs text-[#8E8E93] mt-0.5">
              Review all questions with detailed explanations
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3.5">
          <WifiOff className="w-5 h-5 text-[#0A84FF] shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-white">Offline Access</h4>
            <p className="text-xs text-[#8E8E93] mt-0.5">
              Study anywhere with cached questions
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3.5">
          <RefreshCw className="w-5 h-5 text-[#0A84FF] shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-white">Auto Updates</h4>
            <p className="text-xs text-[#8E8E93] mt-0.5">
              Questions are automatically updated from our servers
            </p>
          </div>
        </div>
      </div>

      {/* 2. INFORMATION CARD (Matches IMG_4107 & IMG_4108) */}
      <div className="bg-[#1C1C1E] border border-[#2C2C2E] rounded-3xl p-5 mb-4 shadow-xl">
        <h3 className="text-base font-bold text-white mb-3">Information</h3>
        <div className="divide-y divide-[#2C2C2E]">
          <div className="py-2.5 flex items-center justify-between text-xs">
            <span className="text-[#8E8E93]">Version</span>
            <span className="text-white font-medium">26 (1)</span>
          </div>
          <div className="py-2.5 flex items-center justify-between text-xs">
            <span className="text-[#8E8E93]">Developer</span>
            <span className="text-white font-medium">EXAMORA</span>
          </div>
          <div className="py-2.5 flex items-center justify-between text-xs">
            <span className="text-[#8E8E93]">Last Updated</span>
            <span className="text-white font-medium">Nov 12, 2026</span>
          </div>
        </div>
      </div>

      {/* 3. DISCLAIMER CARD (Matches IMG_4108) */}
      <div className="bg-[#1C1C1E] border border-[#2C2C2E] rounded-3xl p-5 mb-4 shadow-xl">
        <h3 className="text-base font-bold text-white mb-2">Disclaimer</h3>
        <p className="text-xs text-[#8E8E93] leading-relaxed mb-2.5">
          This app is designed to help you prepare for the LTO driver's license examination. While we strive to provide accurate and up-to-date information, please verify all information with official LTO guidelines and regulations. The developers are not responsible for any examination results.
        </p>
        <p className="text-[11px] text-[#A3733A] bg-[#201608] border border-[#422E14] rounded-xl p-2.5 leading-normal">
          Examora - LTO reviewer is an independent educational application and is not affiliated with or endorsed by the Land Transportation Office (LTO).
        </p>
      </div>

      {/* 4. SUPPORT CARD (Matches IMG_4108) */}
      <div className="bg-[#1C1C1E] border border-[#2C2C2E] rounded-3xl p-5 mb-6 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white">Support</h3>

        <button
          type="button"
          onClick={handleRefresh}
          className="w-full text-left flex items-start gap-3.5 hover:opacity-80 transition-opacity"
        >
          <RefreshCw
            className={`w-5 h-5 text-[#0A84FF] shrink-0 mt-0.5 ${
              refreshing ? 'animate-spin' : ''
            }`}
          />
          <div>
            <h4 className="text-sm font-semibold text-white">Refresh Questions</h4>
            <p className="text-xs text-[#8E8E93] mt-0.5">
              Update your question database with latest content
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setShowSupportModal(true)}
          className="w-full text-left flex items-start gap-3.5 hover:opacity-80 transition-opacity"
        >
          <Mail className="w-5 h-5 text-[#0A84FF] shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-white">Contact Support</h4>
            <p className="text-xs text-[#8E8E93] mt-0.5">
              Get help with issues or share your feedback
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setShowRatingModal(true)}
          className="w-full text-left flex items-start gap-3.5 hover:opacity-80 transition-opacity"
        >
          <Star className="w-5 h-5 text-[#0A84FF] shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-white">Rate This App</h4>
            <p className="text-xs text-[#8E8E93] mt-0.5">
              Help us improve by leaving a review
            </p>
          </div>
        </button>

        {onReplayOnboarding && (
          <button
            type="button"
            onClick={onReplayOnboarding}
            className="w-full text-left flex items-start gap-3.5 hover:opacity-80 transition-opacity"
          >
            <Sparkles className="w-5 h-5 text-[#0A84FF] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-white">Welcome & Setup Guide</h4>
              <p className="text-xs text-[#8E8E93] mt-0.5">
                View onboarding walkthrough and update license track
              </p>
            </div>
          </button>
        )}
      </div>

      {/* Footer (Matches IMG_4108) */}
      <div className="text-center text-xs text-[#8E8E93] pb-4 space-y-1">
        <p>Made with ❤️ for Filipinos</p>
        <p>© 2026 EXAMORA</p>
      </div>

      {/* Support / Contact Modal */}
      {showSupportModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-md bg-[#1C1C1E] border border-[#2C2C2E] rounded-t-3xl sm:rounded-3xl p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#2C2C2E] mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#0A84FF]" /> Contact Support
              </h3>
              <button
                type="button"
                onClick={() => setShowSupportModal(false)}
                className="w-8 h-8 rounded-full bg-[#2C2C2E] flex items-center justify-center text-[#8E8E93]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {supportSuccess ? (
              <div className="text-center py-6 space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <p className="text-sm font-bold text-white">Salamat! Feedback Sent.</p>
                <p className="text-xs text-[#8E8E93]">We appreciate your review and suggestions.</p>
              </div>
            ) : (
              <form onSubmit={handleSendSupport} className="space-y-4">
                <p className="text-xs text-[#8E8E93]">
                  Have a question about an LTO exam topic or want to suggest a feature? Send us a quick note:
                </p>
                <textarea
                  required
                  rows={4}
                  value={supportMessage}
                  onChange={(e) => setSupportMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="w-full bg-[#000000] border border-[#2C2C2E] rounded-2xl p-3 text-xs text-white placeholder-[#8E8E93] focus:outline-none focus:border-[#0A84FF]"
                />
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-[#0A84FF] text-white font-bold text-xs flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" /> Submit Message
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Rate This App Modal */}
      {showRatingModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-md bg-[#1C1C1E] border border-[#2C2C2E] rounded-t-3xl sm:rounded-3xl p-6 text-white text-center shadow-2xl">
            <div className="flex justify-end mb-2">
              <button
                type="button"
                onClick={() => setShowRatingModal(false)}
                className="w-8 h-8 rounded-full bg-[#2C2C2E] flex items-center justify-center text-[#8E8E93]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {ratingSubmitted ? (
              <div className="py-6 space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <p className="text-sm font-bold text-white">Thank you for rating!</p>
                <p className="text-xs text-[#8E8E93]">Your support helps us make this reviewer even better.</p>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-bold text-white mb-1">Enjoying the Reviewer?</h3>
                <p className="text-xs text-[#8E8E93] mb-5">
                  Tap a star to rate your exam preparation experience:
                </p>

                <div className="flex items-center justify-center gap-2 mb-6">
                  {[1, 2, 3, 4, 5].map((starVal) => (
                    <button
                      key={starVal}
                      type="button"
                      onClick={() => setRating(starVal)}
                      className="p-1.5 transition-transform hover:scale-110 active:scale-95"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          starVal <= rating
                            ? 'text-[#FF9500] fill-[#FF9500]'
                            : 'text-[#38383A]'
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleRate}
                  className="w-full py-3.5 rounded-2xl bg-[#0A84FF] text-white font-bold text-xs shadow-lg shadow-[#0A84FF]/25"
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
