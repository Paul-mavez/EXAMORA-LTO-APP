import React, { useState } from 'react';
import {
  AlertTriangle,
  Bookmark as BookmarkIcon,
  BookOpen,
  Check,
  ChevronRight,
  Compass,
  FileText,
  Flag,
  HeartHandshake,
  IdCard,
  Landmark,
  RotateCcw,
  Scale,
  ShieldCheck,
  X,
} from 'lucide-react';
import {
  Category,
  Lesson,
  LocalizedText,
  Question,
  QuestionChoice,
  RoadSign,
} from '../../domain/model/models';

export const SafePngImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}> = ({ src, alt, className = '', fallbackLabel }) => {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#14243A] text-[#FAF9F6] p-4 text-center rounded-xl ${className}`}
      >
        <ShieldCheck className="w-8 h-8 text-[#D8A43B] mb-1.5" />
        <span className="text-xs font-medium">{fallbackLabel || alt}</span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
};

export const PrimaryButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit';
  className?: string;
}> = ({ children, onClick, disabled = false, fullWidth = false, type = 'button', className = '' }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`min-h-[46px] px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D8A43B] active:scale-[0.99] disabled:opacity-45 disabled:pointer-events-none bg-[#14243A] text-[#FFFFFF] hover:bg-[#1E3454] dark:bg-[#D8A43B] dark:text-[#14243A] dark:hover:bg-[#E2B452] ${
      fullWidth ? 'w-full' : ''
    } ${className}`}
  >
    {children}
  </button>
);

export const SecondaryButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit';
  className?: string;
}> = ({ children, onClick, disabled = false, fullWidth = false, type = 'button', className = '' }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`min-h-[46px] px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 border border-[#E9EBEF] bg-[#FFFFFF] text-[#14243A] hover:bg-[#F3F4F7] dark:border-[#24344D] dark:bg-[#142033] dark:text-[#F4F6F9] dark:hover:bg-[#1B2B44] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D8A43B] active:scale-[0.99] disabled:opacity-45 disabled:pointer-events-none ${
      fullWidth ? 'w-full' : ''
    } ${className}`}
  >
    {children}
  </button>
);

export const ProgressIndicator: React.FC<{
  value: number; // 0 to 100
  label?: string;
  rightText?: string;
  tone?: 'navy' | 'gold' | 'success';
}> = ({ value, label, rightText, tone = 'gold' }) => {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));
  const fillClass =
    tone === 'success'
      ? 'bg-[#32845A]'
      : tone === 'navy'
      ? 'bg-[#14243A] dark:bg-[#D8A43B]'
      : 'bg-[#D8A43B]';
  return (
    <div className="w-full">
      {(label || rightText) && (
        <div className="flex items-center justify-between gap-4 mb-2 text-xs text-[#667085] dark:text-[#98A2B3]">
          {label && <span className="font-medium text-[#14243A] dark:text-[#F4F6F9]">{label}</span>}
          {rightText && <span className="font-mono-tabular">{rightText}</span>}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-2 w-full rounded-full bg-[#E9EBEF] dark:bg-[#24344D] overflow-hidden"
      >
        <div
          className={`h-full rounded-full transition-transform duration-200 origin-left ${fillClass}`}
          style={{ transform: `scaleX(${clamped / 100})` }}
        />
      </div>
    </div>
  );
};

function renderCategoryIcon(iconName: string) {
  const cls = 'w-5 h-5 text-[#14243A] dark:text-[#D8A43B]';
  switch (iconName) {
    case 'IdCard':
      return <IdCard className={cls} />;
    case 'ShieldCheck':
      return <ShieldCheck className={cls} />;
    case 'Compass':
      return <Compass className={cls} />;
    case 'HeartHandshake':
      return <HeartHandshake className={cls} />;
    case 'Scale':
      return <Scale className={cls} />;
    case 'FileText':
      return <FileText className={cls} />;
    case 'Landmark':
      return <Landmark className={cls} />;
    case 'AlertTriangle':
      return <AlertTriangle className={cls} />;
    default:
      return <BookOpen className={cls} />;
  }
}

export const CategoryCard: React.FC<{
  category: Category;
  loc: (text: LocalizedText) => string;
  completedCount: number;
  totalCount: number;
  lessonsLabel: string;
  completedLabel: string;
  onClick: () => void;
}> = ({ category, loc, completedCount, totalCount, lessonsLabel, completedLabel, onClick }) => {
  const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D] hover:border-[#14243A]/30 dark:hover:border-[#D8A43B]/45 transition-colors duration-150 flex flex-col justify-between gap-4 focus-visible:outline-2 focus-visible:outline-[#D8A43B]"
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] dark:bg-[#1C2C46] flex items-center justify-center shrink-0">
            {renderCategoryIcon(category.icon)}
          </div>
          <ChevronRight className="w-5 h-5 text-[#667085] dark:text-[#98A2B3] shrink-0 mt-1" />
        </div>
        <div className="text-xs text-[#667085] dark:text-[#98A2B3] font-mono-tabular mb-1">
          <span>Module {category.number}</span>
          <span aria-hidden="true"> · </span>
          <span>
            {totalCount} {lessonsLabel}
          </span>
          <span aria-hidden="true"> · </span>
          <span>
            {completedCount}/{totalCount} {completedLabel}
          </span>
        </div>
        <h3 className="text-base font-semibold text-[#14243A] dark:text-[#F4F6F9] mb-1.5">
          {loc(category.title)}
        </h3>
        <p className="text-sm text-[#667085] dark:text-[#98A2B3] line-clamp-2 leading-relaxed">
          {loc(category.description)}
        </p>
      </div>
      <ProgressIndicator value={pct} tone={pct === 100 ? 'success' : 'gold'} />
    </button>
  );
};

export const LessonCard: React.FC<{
  lesson: Lesson;
  index: number;
  loc: (text: LocalizedText) => string;
  isCompleted: boolean;
  isBookmarked: boolean;
  onOpen: () => void;
  onToggleBookmark: () => void;
}> = ({ lesson, index, loc, isCompleted, isBookmarked, onOpen, onToggleBookmark }) => (
  <div className="p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D] flex items-start justify-between gap-4">
    <button
      type="button"
      onClick={onOpen}
      className="flex-1 text-left focus-visible:outline-2 focus-visible:outline-[#D8A43B] rounded-lg"
    >
      <div className="flex items-center gap-2 text-xs text-[#667085] dark:text-[#98A2B3] mb-1.5">
        <span className="font-mono-tabular">Lesson 0{index + 1}</span>
        <span aria-hidden="true">·</span>
        <span className="font-mono-tabular">{lesson.estimatedMinutes} min read</span>
        {isCompleted && (
          <>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1 font-medium text-[#32845A]">
              <Check className="w-3.5 h-3.5" />
              Completed
            </span>
          </>
        )}
      </div>
      <h4 className="text-base font-semibold text-[#14243A] dark:text-[#F4F6F9] mb-1.5">
        {loc(lesson.title)}
      </h4>
      <p className="text-sm text-[#667085] dark:text-[#98A2B3] leading-relaxed line-clamp-2">
        {loc(lesson.introduction)}
      </p>
    </button>

    <div className="flex items-center gap-1 shrink-0">
      <button
        type="button"
        onClick={onToggleBookmark}
        aria-label={isBookmarked ? 'Remove lesson bookmark' : 'Bookmark lesson'}
        className="min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center text-[#667085] hover:text-[#14243A] dark:text-[#98A2B3] dark:hover:text-[#F4F6F9] hover:bg-[#FAF9F6] dark:hover:bg-[#1C2C46] transition-colors"
      >
        <BookmarkIcon
          className={`w-5 h-5 ${isBookmarked ? 'fill-[#D8A43B] text-[#D8A43B]' : ''}`}
        />
      </button>
      <button
        type="button"
        onClick={onOpen}
        aria-label="Open lesson"
        className="min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center text-[#14243A] dark:text-[#F4F6F9] hover:bg-[#FAF9F6] dark:hover:bg-[#1C2C46] transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  </div>
);

export const AnswerOption: React.FC<{
  choice: QuestionChoice;
  index: number;
  loc: (text: LocalizedText) => string;
  selected: boolean;
  revealed: boolean;
  isCorrectChoice: boolean;
  disabled?: boolean;
  onSelect: () => void;
}> = ({ choice, index, loc, selected, revealed, isCorrectChoice, disabled = false, onSelect }) => {
  const letter = String.fromCharCode(65 + index);

  let stateClasses =
    'border-[#E9EBEF] bg-[#FFFFFF] text-[#14243A] hover:border-[#14243A]/40 dark:border-[#24344D] dark:bg-[#142033] dark:text-[#F4F6F9] dark:hover:border-[#D8A43B]/50';
  let statusBadge: React.ReactNode = null;

  if (!revealed && selected) {
    stateClasses =
      'border-[#14243A] bg-[#14243A]/[0.04] text-[#14243A] dark:border-[#D8A43B] dark:bg-[#D8A43B]/10 dark:text-[#F4F6F9]';
  } else if (revealed && isCorrectChoice) {
    stateClasses =
      'border-[#32845A] bg-[#32845A]/10 text-[#14243A] dark:border-[#32845A] dark:bg-[#32845A]/20 dark:text-[#F4F6F9]';
    statusBadge = (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#32845A] shrink-0">
        <Check className="w-4 h-4" />
        Correct
      </span>
    );
  } else if (revealed && selected && !isCorrectChoice) {
    stateClasses =
      'border-[#C44B4B] bg-[#C44B4B]/10 text-[#14243A] dark:border-[#C44B4B] dark:bg-[#C44B4B]/20 dark:text-[#F4F6F9]';
    statusBadge = (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#C44B4B] shrink-0">
        <X className="w-4 h-4" />
        Your Answer
      </span>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onSelect}
      className={`w-full min-h-[54px] p-4 rounded-xl border text-left transition-colors duration-150 flex items-center justify-between gap-3 focus-visible:outline-2 focus-visible:outline-[#D8A43B] ${stateClasses}`}
    >
      <div className="flex items-start gap-3.5">
        <span
          className={`w-7 h-7 rounded-lg text-xs font-mono-tabular font-semibold flex items-center justify-center shrink-0 mt-0.5 ${
            !revealed && selected
              ? 'bg-[#14243A] text-white dark:bg-[#D8A43B] dark:text-[#14243A]'
              : revealed && isCorrectChoice
              ? 'bg-[#32845A] text-white'
              : revealed && selected && !isCorrectChoice
              ? 'bg-[#C44B4B] text-white'
              : 'bg-[#FAF9F6] text-[#667085] dark:bg-[#1C2C46] dark:text-[#98A2B3]'
          }`}
        >
          {letter}
        </span>
        <span className="text-[15px] leading-relaxed">{loc(choice.text)}</span>
      </div>
      {statusBadge}
    </button>
  );
};

export const QuestionCard: React.FC<{
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  loc: (text: LocalizedText) => string;
  selectedChoiceId: string | null;
  revealed: boolean;
  isBookmarked: boolean;
  onSelectChoice: (choiceId: string) => void;
  onToggleBookmark: () => void;
  onReport?: () => void;
  explanationLabel?: string;
}> = ({
  question,
  questionNumber,
  totalQuestions,
  loc,
  selectedChoiceId,
  revealed,
  isBookmarked,
  onSelectChoice,
  onToggleBookmark,
  onReport,
  explanationLabel = 'Explanation & Legal Basis',
}) => {
  return (
    <div className="p-5 sm:p-7 rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D]">
      {/* Metadata Header — Zero-Pill unboxed text with middot separators */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#667085] dark:text-[#98A2B3]">
          <span className="font-mono-tabular font-semibold text-[#14243A] dark:text-[#D8A43B]">
            {questionNumber} / {totalQuestions}
          </span>
          <span aria-hidden="true">·</span>
          <span>{loc(question.topicTitle)}</span>
          <span aria-hidden="true">·</span>
          <span>{question.difficulty}</span>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={onToggleBookmark}
            aria-label={isBookmarked ? 'Remove question bookmark' : 'Bookmark question'}
            className="min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center text-[#667085] hover:text-[#14243A] dark:text-[#98A2B3] dark:hover:text-[#F4F6F9] hover:bg-[#FAF9F6] dark:hover:bg-[#1C2C46] transition-colors"
          >
            <BookmarkIcon
              className={`w-5 h-5 ${isBookmarked ? 'fill-[#D8A43B] text-[#D8A43B]' : ''}`}
            />
          </button>
          {onReport && (
            <button
              type="button"
              onClick={onReport}
              aria-label="Report incorrect or unclear content"
              className="min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center text-[#667085] hover:text-[#C44B4B] dark:text-[#98A2B3] dark:hover:text-[#E57373] hover:bg-[#FAF9F6] dark:hover:bg-[#1C2C46] transition-colors"
            >
              <Flag className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Optional Road Sign PNG Visual */}
      {question.imageResource && (
        <div className="my-4 p-4 rounded-xl bg-[#FAF9F6] dark:bg-[#0D1726] flex items-center justify-center">
          <SafePngImage
            src={question.imageResource}
            alt={loc(question.topicTitle)}
            className="w-32 h-32 object-contain"
          />
        </div>
      )}

      {/* Question Text */}
      <h2 className="text-lg sm:text-xl font-semibold text-[#14243A] dark:text-[#F4F6F9] leading-snug mb-6">
        {loc(question.question)}
      </h2>

      {/* Four Answer Options */}
      <div className="space-y-3">
        {question.choices.map((choice, idx) => (
          <AnswerOption
            key={choice.id}
            choice={choice}
            index={idx}
            loc={loc}
            selected={selectedChoiceId === choice.id}
            revealed={revealed}
            isCorrectChoice={choice.id === question.correctAnswerId}
            disabled={revealed}
            onSelect={() => onSelectChoice(choice.id)}
          />
        ))}
      </div>

      {/* Immediate Explanation After Answering */}
      {revealed && (
        <div className="mt-6 pt-5 border-t border-[#E9EBEF] dark:border-[#24344D]">
          <div className="flex items-center gap-2 mb-2">
            {selectedChoiceId === question.correctAnswerId ? (
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#32845A]">
                <Check className="w-4 h-4" />
                Correct Answer
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C44B4B]">
                <X className="w-4 h-4" />
                Review Explanation
              </span>
            )}
          </div>
          <p className="text-xs font-medium text-[#667085] dark:text-[#98A2B3] mb-1.5">
            {explanationLabel}
          </p>
          <p className="text-sm text-[#14243A] dark:text-[#F4F6F9] leading-relaxed mb-3">
            {loc(question.explanation)}
          </p>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#667085] dark:text-[#98A2B3]">
            <span>Source: {question.sourceReference}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-tabular">Verified {question.lastVerified}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export const RoadSignCard: React.FC<{
  sign: RoadSign;
  categoryLabel: string;
  loc: (text: LocalizedText) => string;
  isBookmarked: boolean;
  onOpen: () => void;
  onToggleBookmark: () => void;
}> = ({ sign, categoryLabel, loc, isBookmarked, onOpen, onToggleBookmark }) => (
  <div className="p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D] flex flex-col justify-between gap-3 hover:border-[#14243A]/30 dark:hover:border-[#D8A43B]/45 transition-colors">
    <div className="flex items-start justify-between gap-2">
      <span className="text-xs text-[#667085] dark:text-[#98A2B3] truncate">{categoryLabel}</span>
      <button
        type="button"
        onClick={onToggleBookmark}
        aria-label={isBookmarked ? 'Remove road sign bookmark' : 'Bookmark road sign'}
        className="min-w-[44px] min-h-[44px] -mt-2 -mr-2 rounded-xl flex items-center justify-center text-[#667085] hover:text-[#14243A] dark:text-[#98A2B3] dark:hover:text-[#F4F6F9]"
      >
        <BookmarkIcon
          className={`w-4 h-4 ${isBookmarked ? 'fill-[#D8A43B] text-[#D8A43B]' : ''}`}
        />
      </button>
    </div>

    <button
      type="button"
      onClick={onOpen}
      className="flex-1 flex flex-col items-start text-left w-full focus-visible:outline-2 focus-visible:outline-[#D8A43B] rounded-xl"
    >
      <div className="w-full h-32 rounded-xl bg-[#FAF9F6] dark:bg-[#0D1726] flex items-center justify-center mb-3 p-3">
        <SafePngImage
          src={sign.imageResource}
          alt={loc(sign.name)}
          className="h-24 w-24 object-contain"
        />
      </div>
      <h4 className="text-sm font-semibold text-[#14243A] dark:text-[#F4F6F9] mb-1">
        {loc(sign.name)}
      </h4>
      <p className="text-xs text-[#667085] dark:text-[#98A2B3] line-clamp-2 leading-relaxed">
        {loc(sign.meaning)}
      </p>
    </button>
  </div>
);

export const ResultSummary: React.FC<{
  title: string;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unansweredQuestions?: number;
  onPrimaryAction: () => void;
  primaryLabel: string;
  onSecondaryAction?: () => void;
  secondaryLabel?: string;
}> = ({
  title,
  totalQuestions,
  correctAnswers,
  incorrectAnswers,
  unansweredQuestions = 0,
  onPrimaryAction,
  primaryLabel,
  onSecondaryAction,
  secondaryLabel,
}) => {
  const pct = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D]">
      <p className="text-xs text-[#667085] dark:text-[#98A2B3] mb-1">Session Complete</p>
      <h2 className="text-2xl font-bold text-[#14243A] dark:text-[#F4F6F9] mb-6">{title}</h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 border-y border-[#E9EBEF] dark:border-[#24344D] mb-6">
        <div>
          <p className="text-xs text-[#667085] dark:text-[#98A2B3] mb-1">Score Rate</p>
          <p className="text-2xl font-bold font-mono-tabular text-[#14243A] dark:text-[#D8A43B]">
            {pct}%
          </p>
        </div>
        <div>
          <p className="text-xs text-[#667085] dark:text-[#98A2B3] mb-1">Correct</p>
          <p className="text-2xl font-bold font-mono-tabular text-[#32845A]">{correctAnswers}</p>
        </div>
        <div>
          <p className="text-xs text-[#667085] dark:text-[#98A2B3] mb-1">Incorrect</p>
          <p className="text-2xl font-bold font-mono-tabular text-[#C44B4B]">{incorrectAnswers}</p>
        </div>
        <div>
          <p className="text-xs text-[#667085] dark:text-[#98A2B3] mb-1">
            {unansweredQuestions > 0 ? 'Unanswered' : 'Total Answered'}
          </p>
          <p className="text-2xl font-bold font-mono-tabular text-[#14243A] dark:text-[#F4F6F9]">
            {unansweredQuestions > 0 ? unansweredQuestions : totalQuestions}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <PrimaryButton onClick={onPrimaryAction}>{primaryLabel}</PrimaryButton>
        {onSecondaryAction && secondaryLabel && (
          <SecondaryButton onClick={onSecondaryAction}>
            <RotateCcw className="w-4 h-4" />
            {secondaryLabel}
          </SecondaryButton>
        )}
      </div>
    </div>
  );
};
