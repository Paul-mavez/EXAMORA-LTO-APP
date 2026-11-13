import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Check,
  Clock,
  RotateCcw,
} from 'lucide-react';
import { REVIEWER_CATEGORIES, REVIEWER_QUESTIONS } from '../../data/local/reviewerDatabase';
import { ReviewerQuestion } from '../../domain/model/reviewerModels';
import { RoadSignIllustration } from '../../ui/components/RoadSignIllustration';

const EXAM_PRESETS = [
  { count: 25, durationMinutes: 30 },
  { count: 50, durationMinutes: 60 },
  { count: 100, durationMinutes: 120 },
];

interface MockExamViewProps {
  bookmarkedQuestionIds: string[];
  onToggleBookmark: (questionId: string) => void;
}

type MockExamStage = 'SETUP' | 'RUNNING' | 'RESULTS' | 'REVIEW';

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

const shuffleQuestions = (questions: ReviewerQuestion[]) => {
  const shuffled = [...questions];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const MockExamView: React.FC<MockExamViewProps> = ({
  bookmarkedQuestionIds,
  onToggleBookmark,
}) => {
  const [stage, setStage] = useState<MockExamStage>('SETUP');
  const [questionCount, setQuestionCount] = useState(50);
  const [examQuestions, setExamQuestions] = useState<ReviewerQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [showFinishConfirm, setShowFinishConfirm] = useState(false);

  const preset = EXAM_PRESETS.find((item) => item.count === questionCount) ?? EXAM_PRESETS[0];
  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = useMemo(
    () =>
      examQuestions.filter((question) => selectedAnswers[question.id] === question.correctChoiceId)
        .length,
    [examQuestions, selectedAnswers],
  );
  const unansweredCount = examQuestions.length - answeredCount;
  const scorePercent =
    examQuestions.length > 0 ? Math.round((correctCount / examQuestions.length) * 100) : 0;

  useEffect(() => {
    if (stage !== 'RUNNING') return undefined;
    const timer = window.setInterval(() => {
      setSecondsRemaining((remaining) => Math.max(0, remaining - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [stage]);

  useEffect(() => {
    if (stage === 'RUNNING' && secondsRemaining === 0) {
      setShowFinishConfirm(false);
      setStage('RESULTS');
    }
  }, [secondsRemaining, stage]);

  const startExam = () => {
    const selectedQuestions = shuffleQuestions(REVIEWER_QUESTIONS).slice(
      0,
      Math.min(questionCount, REVIEWER_QUESTIONS.length),
    );
    setExamQuestions(selectedQuestions);
    setSelectedAnswers({});
    setCurrentIndex(0);
    setSecondsRemaining(preset.durationMinutes * 60);
    setShowFinishConfirm(false);
    setStage('RUNNING');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectAnswer = (questionId: string, choiceId: string) => {
    setSelectedAnswers((answers) => ({ ...answers, [questionId]: choiceId }));
  };

  const finishExam = () => {
    setShowFinishConfirm(false);
    setStage('RESULTS');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (stage === 'SETUP') {
    return (
      <div className="w-full max-w-md mx-auto px-4 pt-9 pb-32 min-h-screen text-[#14243A]">
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5578A8]">
          Timed Practice
        </p>
        <h1 className="mb-1.5 font-display text-3xl font-bold tracking-[-0.02em] text-[#14243A]">
          Mock Exam
        </h1>
        <p className="mb-6 text-sm leading-relaxed text-[#667085]">
          Random questions from all categories. Answers and explanations are shown after you finish.
        </p>

        <section className="rounded-xl border border-[#E2E5EB] bg-white p-5">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#667085]">
            Choose exam length
          </h2>
          <div className="space-y-2">
            {EXAM_PRESETS.map((item) => {
              const isSelected = questionCount === item.count;
              return (
                <button
                  key={item.count}
                  type="button"
                  onClick={() => setQuestionCount(item.count)}
                  className={`flex min-h-14 w-full items-center justify-between rounded-lg border px-4 text-left transition-colors ${
                    isSelected
                      ? 'border-[#5578A8] bg-[#5578A8]/[0.07]'
                      : 'border-[#E2E5EB] bg-white hover:bg-[#FAF9F6]'
                  }`}
                >
                  <span>
                    <span className="block text-sm font-semibold text-[#14243A]">
                      {item.count} questions
                    </span>
                    <span className="text-xs text-[#667085]">{item.durationMinutes} minutes</span>
                  </span>
                  <span
                    className={`h-4 w-4 rounded-full border ${
                      isSelected
                        ? 'border-[5px] border-[#5578A8]'
                        : 'border-[#B8C0CC]'
                    }`}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={startExam}
            disabled={REVIEWER_QUESTIONS.length === 0}
            className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-[#14243A] px-4 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-[#FAF9F6] transition-colors hover:bg-[#1E3554] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Start Mock Exam
            <ArrowRight className="h-4 w-4" />
          </button>
        </section>

        <div className="mt-4 rounded-xl border border-[#E2E5EB] bg-white p-4 text-xs leading-relaxed text-[#667085]">
          The exam is timed. You can move between questions and change your answers before
          submitting.
        </div>
      </div>
    );
  }

  if (stage === 'RUNNING' && examQuestions.length > 0) {
    const currentQuestion = examQuestions[currentIndex];
    const isLowTime = secondsRemaining <= 120;
    const progressPercent = ((currentIndex + 1) / examQuestions.length) * 100;

    return (
      <div className="w-full max-w-md mx-auto px-4 pt-6 pb-32 min-h-screen text-[#14243A]">
        <div className="mb-4 flex items-center justify-between gap-3 rounded-xl border border-[#E2E5EB] bg-white p-4">
          <div className="flex items-center gap-2">
            <Clock className={`h-4 w-4 ${isLowTime ? 'text-[#B44040]' : 'text-[#5578A8]'}`} />
            <span
              className={`font-mono-tabular text-lg font-bold ${
                isLowTime ? 'text-[#B44040]' : 'text-[#14243A]'
              }`}
              aria-live="polite"
            >
              {formatTime(secondsRemaining)}
            </span>
          </div>
          <span className="text-right text-xs text-[#667085]">
            {answeredCount}/{examQuestions.length} answered
          </span>
        </div>

        <div
          className="mb-4 h-1 w-full overflow-hidden rounded-full bg-[#E9EBEF]"
          role="progressbar"
          aria-label="Mock exam progress"
          aria-valuemin={0}
          aria-valuemax={examQuestions.length}
          aria-valuenow={currentIndex + 1}
        >
          <div
            className="h-full bg-[#5578A8] transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <article className="rounded-xl border border-[#E2E5EB] bg-white p-5">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <p className="font-mono-tabular text-xs font-semibold text-[#5578A8]">
                Question {currentIndex + 1} of {examQuestions.length}
              </p>
              <p className="mt-1 text-xs text-[#667085]">
                {REVIEWER_CATEGORIES.find((category) => category.id === currentQuestion.categoryId)
                  ?.title ?? 'LTO Reviewer'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onToggleBookmark(currentQuestion.id)}
              aria-label={
                bookmarkedQuestionIds.includes(currentQuestion.id)
                  ? 'Remove bookmark'
                  : 'Bookmark question'
              }
              aria-pressed={bookmarkedQuestionIds.includes(currentQuestion.id)}
              className={`flex h-9 shrink-0 items-center gap-1.5 rounded-md border px-2.5 text-xs font-semibold ${
                bookmarkedQuestionIds.includes(currentQuestion.id)
                  ? 'border-[#5578A8]/40 bg-[#5578A8]/10 text-[#355C8A]'
                  : 'border-[#E2E5EB] bg-[#FAF9F6] text-[#667085]'
              }`}
            >
              <Bookmark
                className={`h-3.5 w-3.5 ${
                  bookmarkedQuestionIds.includes(currentQuestion.id) ? 'fill-current' : ''
                }`}
              />
              {bookmarkedQuestionIds.includes(currentQuestion.id) ? 'Saved' : 'Save'}
            </button>
          </div>

          {currentQuestion.imageResource && (
            <RoadSignIllustration imageResource={currentQuestion.imageResource} />
          )}
          <h2 className="mb-5 text-base font-semibold leading-snug text-[#14243A]">
            {currentQuestion.question}
          </h2>

          <div className="space-y-2">
            {currentQuestion.choices.map((choice) => {
              const isSelected = selectedAnswers[currentQuestion.id] === choice.id;
              return (
                <button
                  key={choice.id}
                  type="button"
                  onClick={() => selectAnswer(currentQuestion.id, choice.id)}
                  aria-pressed={isSelected}
                  className={`flex min-h-12 w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors ${
                    isSelected
                      ? 'border-[#5578A8] bg-[#5578A8]/[0.07]'
                      : 'border-[#E2E5EB] bg-[#FAF9F6] hover:bg-[#E9EBEF]/50'
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md font-mono-tabular text-xs font-semibold ${
                      isSelected
                        ? 'bg-[#5578A8] text-white'
                        : 'border border-[#E2E5EB] bg-white text-[#667085]'
                    }`}
                  >
                    {choice.letter}
                  </span>
                  <span className="text-sm leading-relaxed text-[#14243A]">{choice.text}</span>
                </button>
              );
            })}
          </div>
        </article>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            type="button"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((index) => Math.max(0, index - 1))}
            className="flex min-h-11 items-center justify-center gap-1 rounded-md border border-[#E2E5EB] bg-white px-3 text-xs font-semibold text-[#14243A] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </button>
          {currentIndex < examQuestions.length - 1 ? (
            <button
              type="button"
              onClick={() =>
                setCurrentIndex((index) => Math.min(examQuestions.length - 1, index + 1))
              }
              className="flex min-h-11 items-center justify-center gap-1 rounded-md bg-[#14243A] px-3 text-xs font-semibold text-white"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowFinishConfirm(true)}
              className="min-h-11 rounded-md bg-[#14243A] px-3 text-xs font-semibold text-white"
            >
              Finish Exam
            </button>
          )}
        </div>

        <div className="mt-4 rounded-xl border border-[#E2E5EB] bg-white p-4">
          <p className="mb-3 text-xs font-semibold text-[#14243A]">Jump to question</p>
          <div className="grid grid-cols-5 gap-2">
            {examQuestions.map((question, index) => {
              const isAnswered = Boolean(selectedAnswers[question.id]);
              return (
                <button
                  key={question.id}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to question ${index + 1}${isAnswered ? ', answered' : ', unanswered'}`}
                  aria-current={index === currentIndex ? 'step' : undefined}
                  className={`min-h-9 rounded-md border font-mono-tabular text-xs font-semibold ${
                    index === currentIndex
                      ? 'border-[#14243A] bg-[#14243A] text-white'
                      : isAnswered
                        ? 'border-[#2E7D5B]/40 bg-[#F3FAF6] text-[#2E7D5B]'
                        : 'border-[#E2E5EB] bg-[#FAF9F6] text-[#667085]'
                  }`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </div>

        {showFinishConfirm && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="finish-exam-title"
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
            onClick={() => setShowFinishConfirm(false)}
          >
            <div
              className="w-full max-w-sm rounded-xl border border-[#E2E5EB] bg-white p-5"
              onClick={(event) => event.stopPropagation()}
            >
              <h2 id="finish-exam-title" className="font-display text-lg font-bold">
                Finish this exam?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#667085]">
                {unansweredCount > 0
                  ? `${unansweredCount} question${unansweredCount === 1 ? ' is' : 's are'} unanswered. You can still review them before submitting.`
                  : 'Your answers will be scored and explanations will be available.'}
              </p>
              <div className="mt-5 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowFinishConfirm(false)}
                  className="min-h-10 rounded-md border border-[#E2E5EB] px-3 text-xs font-semibold text-[#14243A]"
                >
                  Keep going
                </button>
                <button
                  type="button"
                  onClick={finishExam}
                  className="min-h-10 rounded-md bg-[#14243A] px-3 text-xs font-semibold text-white"
                >
                  Submit exam
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (stage === 'REVIEW') {
    return (
      <div className="w-full max-w-md mx-auto px-4 pt-8 pb-32 min-h-screen text-[#14243A]">
        <button
          type="button"
          onClick={() => setStage('RESULTS')}
          className="mb-5 inline-flex min-h-10 items-center gap-2 text-xs font-semibold text-[#667085]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to results
        </button>
        <h1 className="mb-4 font-display text-2xl font-bold">Answer Review</h1>
        <div className="space-y-3">
          {examQuestions.map((question, index) => {
            const selectedChoiceId = selectedAnswers[question.id];
            const isCorrect = selectedChoiceId === question.correctChoiceId;
            return (
              <article
                key={question.id}
                className="rounded-xl border border-[#E2E5EB] bg-white p-4"
              >
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="font-mono-tabular text-xs font-semibold text-[#5578A8]">
                    Question {index + 1}
                  </p>
                  <span
                    className={`text-xs font-semibold ${
                      isCorrect ? 'text-[#2E7D5B]' : 'text-[#B44040]'
                    }`}
                  >
                    {isCorrect ? 'Correct' : selectedChoiceId ? 'Incorrect' : 'Unanswered'}
                  </span>
                </div>
                <h2 className="text-sm font-semibold leading-snug text-[#14243A]">
                  {question.question}
                </h2>
                {question.imageResource && (
                  <RoadSignIllustration imageResource={question.imageResource} />
                )}
                <div className="mt-3 space-y-2">
                  {question.choices.map((choice) => {
                    const isCorrectChoice = choice.id === question.correctChoiceId;
                    const isSelected = choice.id === selectedChoiceId;
                    return (
                      <div
                        key={choice.id}
                        className={`flex items-center gap-3 rounded-lg border p-3 ${
                          isCorrectChoice
                            ? 'border-[#2E7D5B]/50 bg-[#F3FAF6]'
                            : isSelected
                              ? 'border-[#B44040]/50 bg-[#FDF4F4]'
                              : 'border-[#E2E5EB] bg-[#FAF9F6]'
                        }`}
                      >
                        <span className="font-mono-tabular text-xs font-semibold text-[#667085]">
                          {choice.letter}
                        </span>
                        <span className="text-sm leading-relaxed text-[#14243A]">
                          {choice.text}
                        </span>
                        {isCorrectChoice && (
                          <Check className="ml-auto h-4 w-4 shrink-0 text-[#2E7D5B]" />
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-3 flex items-start justify-between gap-3 rounded-lg border border-[#E2E5EB] bg-[#FAF9F6] p-3">
                  <div>
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#5578A8]">
                      Answer Rationale
                    </p>
                    <p className="text-xs leading-relaxed text-[#667085]">
                      {question.explanation}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onToggleBookmark(question.id)}
                    aria-label={
                      bookmarkedQuestionIds.includes(question.id)
                        ? 'Remove bookmark'
                        : 'Bookmark question'
                    }
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[#5578A8]"
                  >
                    <Bookmark
                      className={`h-4 w-4 ${
                        bookmarkedQuestionIds.includes(question.id) ? 'fill-current' : ''
                      }`}
                    />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto px-4 pt-9 pb-32 min-h-screen text-[#14243A]">
      <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5578A8]">
        Assessment Summary
      </p>
      <h1 className="mb-5 font-display text-3xl font-bold tracking-[-0.02em]">Exam Complete</h1>

      <section className="rounded-xl border border-[#E2E5EB] bg-white p-6 text-center">
        <p className="font-mono-tabular text-5xl font-bold text-[#14243A]">{scorePercent}%</p>
        <p className="mt-2 text-sm font-semibold text-[#14243A]">
          {correctCount} / {examQuestions.length} correct
        </p>
        <p className="mt-1 text-xs text-[#667085]">
          {unansweredCount} unanswered · {formatTime(preset.durationMinutes * 60 - secondsRemaining)} used
        </p>
        <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-[#E9EBEF]">
          <div
            className={`h-full transition-all ${
              scorePercent >= 80 ? 'bg-[#2E7D5B]' : 'bg-[#5578A8]'
            }`}
            style={{ width: `${scorePercent}%` }}
          />
        </div>
        <p className="mt-4 text-sm leading-relaxed text-[#667085]">
          {scorePercent >= 80
            ? 'Great work — you reached the 80% practice target.'
            : 'Review the explanations and try another randomized exam.'}
        </p>
      </section>

      <div className="mt-4 space-y-3">
        <button
          type="button"
          onClick={() => setStage('REVIEW')}
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-[#14243A] px-4 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-white"
        >
          Review Answers
          <ArrowRight className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={startExam}
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-md border border-[#E2E5EB] bg-white px-4 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-[#14243A]"
        >
          <RotateCcw className="h-4 w-4" />
          Retake with new questions
        </button>
        <button
          type="button"
          onClick={() => setStage('SETUP')}
          className="w-full py-2 text-xs font-semibold text-[#667085]"
        >
          Back to setup
        </button>
      </div>
    </div>
  );
};
