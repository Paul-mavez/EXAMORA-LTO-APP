import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Bookmark as BookmarkIcon,
  FileEdit,
  Plus,
  Trash2,
} from 'lucide-react';
import {
  PrimaryButton,
  ProgressIndicator,
  RoadSignCard,
  SecondaryButton,
} from '../../ui/components/ExamoraComponents';
import { useExamoraViewModel } from '../state/ExamoraContext';

export const ProgressAnalyticsScreen: React.FC = () => {
  const {
    t,
    loc,
    categories,
    metrics,
    sessions,
    navigateTab,
  } = useExamoraViewModel();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <button
            type="button"
            onClick={() => navigateTab('PROFILE')}
            className="min-h-[40px] inline-flex items-center gap-1.5 text-xs font-medium text-[#667085] hover:text-[#14243A] dark:text-[#98A2B3] dark:hover:text-[#F4F6F9] mb-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Profile
          </button>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#14243A] dark:text-[#F4F6F9]">
            {t.progress.title}
          </h1>
          <p className="text-sm text-[#667085] dark:text-[#98A2B3]">{t.progress.subtitle}</p>
        </div>
      </div>

      {/* Core Stored KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D]">
          <p className="text-xs text-[#667085] dark:text-[#98A2B3] mb-1">
            {t.home.overallCompletion}
          </p>
          <p className="text-2xl font-bold font-mono-tabular text-[#14243A] dark:text-[#F4F6F9]">
            {metrics.overallCompletionPercent}%
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D]">
          <p className="text-xs text-[#667085] dark:text-[#98A2B3] mb-1">
            {t.home.lessonsCompleted}
          </p>
          <p className="text-2xl font-bold font-mono-tabular text-[#14243A] dark:text-[#F4F6F9]">
            {metrics.completedLessonsCount}/{metrics.totalLessonsCount}
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D]">
          <p className="text-xs text-[#667085] dark:text-[#98A2B3] mb-1">
            {t.home.questionsAnswered}
          </p>
          <p className="text-2xl font-bold font-mono-tabular text-[#14243A] dark:text-[#F4F6F9]">
            {metrics.answeredQuestionsCount}
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D]">
          <p className="text-xs text-[#667085] dark:text-[#98A2B3] mb-1">{t.home.correctRate}</p>
          <p className="text-2xl font-bold font-mono-tabular text-[#32845A]">
            {metrics.correctRatePercent}%
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D]">
          <p className="text-xs text-[#667085] dark:text-[#98A2B3] mb-1">
            {t.progress.studySessions}
          </p>
          <p className="text-2xl font-bold font-mono-tabular text-[#14243A] dark:text-[#F4F6F9]">
            {sessions.length}
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D]">
          <p className="text-xs text-[#667085] dark:text-[#98A2B3] mb-1">
            {t.progress.studyStreak}
          </p>
          <p className="text-2xl font-bold font-mono-tabular text-[#D8A43B]">
            {metrics.activeStudyDaysCount}
          </p>
        </div>
      </div>

      {/* Topic-by-Topic Accuracy Chart */}
      <section className="p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D] space-y-5">
        <h2 className="font-display text-lg font-bold text-[#14243A] dark:text-[#F4F6F9]">
          {t.progress.topicBreakdown}
        </h2>
        <div className="space-y-4">
          {categories.map((cat) => {
            const perf = metrics.categoryPerformances.find((cp) => cp.categoryId === cat.id);
            const answered = perf?.answered || 0;
            const acc = perf?.accuracy || 0;
            return (
              <ProgressIndicator
                key={cat.id}
                value={acc}
                label={`${cat.number}. ${loc(cat.title)}`}
                rightText={
                  answered > 0 ? `${perf?.correct}/${answered} (${acc}%)` : 'Not practiced yet'
                }
                tone={acc >= 80 ? 'success' : 'gold'}
              />
            );
          })}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weakest Categories */}
        <section className="p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D] space-y-3">
          <h2 className="font-display text-base font-bold text-[#14243A] dark:text-[#F4F6F9]">
            {t.progress.weakestCategories}
          </h2>
          {metrics.weakestCategories.length === 0 ? (
            <p className="text-sm text-[#667085] dark:text-[#98A2B3]">
              {metrics.answeredQuestionsCount === 0
                ? t.progress.noActivityYet
                : 'Great work—all practiced categories are currently at 80% accuracy or higher.'}
            </p>
          ) : (
            <div className="divide-y divide-[#E9EBEF] dark:divide-[#24344D]">
              {metrics.weakestCategories.map((w) => (
                <button
                  key={w.category.id}
                  type="button"
                  onClick={() =>
                    navigateTab('LEARN', {
                      type: 'CATEGORY_DETAIL',
                      categoryId: w.category.id,
                    })
                  }
                  className="w-full py-3 text-left flex items-center justify-between gap-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-[#14243A] dark:text-[#F4F6F9]">
                      {loc(w.category.title)}
                    </p>
                    <p className="text-xs text-[#C44B4B] font-mono-tabular">
                      {w.accuracy}% accuracy across {w.answered} answered item(s)
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#667085]" />
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Recent Study Activity */}
        <section className="p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D] space-y-3">
          <h2 className="font-display text-base font-bold text-[#14243A] dark:text-[#F4F6F9]">
            {t.progress.recentActivity}
          </h2>
          {sessions.length === 0 ? (
            <p className="text-sm text-[#667085] dark:text-[#98A2B3]">
              {t.progress.noActivityYet}
            </p>
          ) : (
            <div className="divide-y divide-[#E9EBEF] dark:divide-[#24344D]">
              {sessions.slice(0, 6).map((ses) => (
                <div
                  key={ses.id}
                  className="py-3 flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <p className="font-semibold text-[#14243A] dark:text-[#F4F6F9]">
                      {ses.modeLabel}
                    </p>
                    <p className="text-[#667085] dark:text-[#98A2B3] font-mono-tabular">
                      {new Date(ses.date).toLocaleString([], {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <span className="font-mono-tabular font-medium text-[#14243A] dark:text-[#D8A43B]">
                    {ses.questionsAnswered > 0
                      ? `${ses.correctAnswers}/${ses.questionsAnswered} correct`
                      : 'Completed'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export const SavedAndNotesScreen: React.FC = () => {
  const {
    t,
    loc,
    lessons,
    questions,
    roadSigns,
    bookmarks,
    notes,
    toggleBookmark,
    savePersonalNote,
    deletePersonalNote,
    navigateTab,
  } = useExamoraViewModel();

  const [tab, setTab] = useState<'LESSONS' | 'QUESTIONS' | 'SIGNS' | 'NOTES'>('LESSONS');
  const [editingNoteId, setEditingNoteId] = useState<string | undefined>(undefined);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [showNoteEditor, setShowNoteEditor] = useState(false);

  const savedLessons = lessons.filter((l) =>
    bookmarks.some((b) => b.itemType === 'LESSON' && b.itemId === l.id),
  );
  const savedQuestions = questions.filter((q) =>
    bookmarks.some((b) => b.itemType === 'QUESTION' && b.itemId === q.id),
  );
  const savedSigns = roadSigns.filter((s) =>
    bookmarks.some((b) => b.itemType === 'ROAD_SIGN' && b.itemId === s.id),
  );

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle.trim() && !noteContent.trim()) return;
    savePersonalNote({
      id: editingNoteId,
      title: noteTitle.trim() || 'Study Note',
      content: noteContent.trim(),
    });
    setEditingNoteId(undefined);
    setNoteTitle('');
    setNoteContent('');
    setShowNoteEditor(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#14243A] dark:text-[#F4F6F9] mb-1">
            {t.saved.title}
          </h1>
          <p className="text-sm text-[#667085] dark:text-[#98A2B3]">{t.saved.subtitle}</p>
        </div>

        <PrimaryButton
          onClick={() => {
            setTab('NOTES');
            setEditingNoteId(undefined);
            setNoteTitle('');
            setNoteContent('');
            setShowNoteEditor(true);
          }}
        >
          <Plus className="w-4 h-4" />
          {t.saved.newNoteBtn}
        </PrimaryButton>
      </div>

      {/* Interactive Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {(
          [
            { id: 'LESSONS', label: `${t.saved.tabLessons} (${savedLessons.length})` },
            { id: 'QUESTIONS', label: `${t.saved.tabQuestions} (${savedQuestions.length})` },
            { id: 'SIGNS', label: `${t.saved.tabSigns} (${savedSigns.length})` },
            { id: 'NOTES', label: `${t.saved.tabNotes} (${notes.length})` },
          ] as const
        ).map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={`min-h-[42px] px-4 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap border ${
              tab === item.id
                ? 'bg-[#14243A] text-white border-[#14243A] dark:bg-[#D8A43B] dark:text-[#14243A] dark:border-[#D8A43B]'
                : 'bg-[#FFFFFF] text-[#667085] border-[#E9EBEF] dark:bg-[#142033] dark:text-[#98A2B3] dark:border-[#24344D]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {tab === 'LESSONS' &&
        (savedLessons.length === 0 ? (
          <div className="p-10 text-center rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D] text-sm text-[#667085] dark:text-[#98A2B3]">
            {t.saved.emptySaved}
          </div>
        ) : (
          <div className="space-y-3">
            {savedLessons.map((les) => (
              <div
                key={les.id}
                className="p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D] flex items-center justify-between gap-4"
              >
                <button
                  type="button"
                  onClick={() =>
                    navigateTab('LEARN', { type: 'LESSON_READER', lessonId: les.id })
                  }
                  className="text-left flex-1"
                >
                  <h3 className="text-base font-semibold text-[#14243A] dark:text-[#F4F6F9] mb-1">
                    {loc(les.title)}
                  </h3>
                  <p className="text-xs text-[#667085] dark:text-[#98A2B3] line-clamp-2">
                    {loc(les.introduction)}
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => toggleBookmark('LESSON', les.id)}
                  aria-label="Remove bookmark"
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[#D8A43B]"
                >
                  <BookmarkIcon className="w-5 h-5 fill-[#D8A43B]" />
                </button>
              </div>
            ))}
          </div>
        ))}

      {tab === 'QUESTIONS' &&
        (savedQuestions.length === 0 ? (
          <div className="p-10 text-center rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D] text-sm text-[#667085] dark:text-[#98A2B3]">
            {t.saved.emptySaved}
          </div>
        ) : (
          <div className="space-y-3">
            {savedQuestions.map((q) => {
              const rightChoice = q.choices.find((c) => c.id === q.correctAnswerId);
              return (
                <div
                  key={q.id}
                  className="p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D] space-y-2"
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-xs text-[#667085] dark:text-[#98A2B3]">
                      {loc(q.topicTitle)} · {q.difficulty}
                    </p>
                    <button
                      type="button"
                      onClick={() => toggleBookmark('QUESTION', q.id)}
                      aria-label="Remove question bookmark"
                      className="text-[#D8A43B]"
                    >
                      <BookmarkIcon className="w-4 h-4 fill-[#D8A43B]" />
                    </button>
                  </div>
                  <h3 className="text-sm font-semibold text-[#14243A] dark:text-[#F4F6F9]">
                    {loc(q.question)}
                  </h3>
                  {rightChoice && (
                    <p className="text-xs font-medium text-[#32845A]">
                      Correct Answer: {loc(rightChoice.text)}
                    </p>
                  )}
                  <p className="text-xs text-[#667085] dark:text-[#98A2B3] leading-relaxed">
                    {loc(q.explanation)}
                  </p>
                </div>
              );
            })}
          </div>
        ))}

      {tab === 'SIGNS' &&
        (savedSigns.length === 0 ? (
          <div className="p-10 text-center rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D] text-sm text-[#667085] dark:text-[#98A2B3]">
            {t.saved.emptySaved}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {savedSigns.map((sign) => (
              <RoadSignCard
                key={sign.id}
                sign={sign}
                categoryLabel={t.signCategories[sign.category]}
                loc={loc}
                isBookmarked
                onOpen={() => navigateTab('LEARN', { type: 'ROAD_SIGNS' })}
                onToggleBookmark={() => toggleBookmark('ROAD_SIGN', sign.id)}
              />
            ))}
          </div>
        ))}

      {tab === 'NOTES' && (
        <div className="space-y-4">
          {showNoteEditor && (
            <form
              onSubmit={handleSaveNote}
              className="p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D] space-y-3"
            >
              <input
                type="text"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                placeholder={t.saved.noteTitlePlaceholder}
                className="w-full min-h-[44px] px-4 rounded-xl border border-[#E9EBEF] dark:border-[#24344D] bg-[#FAF9F6] dark:bg-[#0D1726] text-sm font-medium"
              />
              <textarea
                rows={4}
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder={t.saved.noteBodyPlaceholder}
                className="w-full p-4 rounded-xl border border-[#E9EBEF] dark:border-[#24344D] bg-[#FAF9F6] dark:bg-[#0D1726] text-sm"
              />
              <div className="flex justify-end gap-2">
                <SecondaryButton onClick={() => setShowNoteEditor(false)}>Cancel</SecondaryButton>
                <PrimaryButton type="submit">{t.saved.saveNote}</PrimaryButton>
              </div>
            </form>
          )}

          {notes.length === 0 && !showNoteEditor ? (
            <div className="p-10 text-center rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D] text-sm text-[#667085] dark:text-[#98A2B3]">
              {t.saved.emptySaved}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D] flex flex-col justify-between gap-3"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-base font-semibold text-[#14243A] dark:text-[#F4F6F9]">
                        {note.title}
                      </h3>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingNoteId(note.id);
                            setNoteTitle(note.title);
                            setNoteContent(note.content);
                            setShowNoteEditor(true);
                          }}
                          aria-label="Edit note"
                          className="min-w-[38px] min-h-[38px] rounded-lg flex items-center justify-center text-[#667085] hover:text-[#14243A] dark:hover:text-[#F4F6F9]"
                        >
                          <FileEdit className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deletePersonalNote(note.id)}
                          aria-label="Delete note"
                          className="min-w-[38px] min-h-[38px] rounded-lg flex items-center justify-center text-[#667085] hover:text-[#C44B4B]"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-[#667085] dark:text-[#98A2B3] whitespace-pre-line leading-relaxed">
                      {note.content}
                    </p>
                  </div>
                  <p className="text-xs font-mono-tabular text-[#667085] dark:text-[#98A2B3]">
                    Updated {new Date(note.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
