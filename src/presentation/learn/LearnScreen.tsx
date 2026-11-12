import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  Bookmark as BookmarkIcon,
  Check,
  FileEdit,
  Search,
  X,
} from 'lucide-react';
import { RoadSign, RoadSignCategory } from '../../domain/model/models';
import {
  CategoryCard,
  LessonCard,
  PrimaryButton,
  RoadSignCard,
  SafePngImage,
  SecondaryButton,
} from '../../ui/components/ExamoraComponents';
import { useExamoraViewModel } from '../state/ExamoraContext';

const SIGN_CATEGORIES: ('ALL' | RoadSignCategory)[] = [
  'ALL',
  'REGULATORY',
  'WARNING',
  'GUIDE_INFORMATIONAL',
  'PAVEMENT_MARKINGS',
  'TRAFFIC_SIGNALS',
];

export const LearnScreen: React.FC = () => {
  const {
    t,
    loc,
    categories,
    lessons,
    roadSigns,
    progress,
    notes,
    subDestination,
    setSubDestination,
    toggleLessonCompleted,
    markCategoryOpened,
    toggleBookmark,
    isBookmarked,
    savePersonalNote,
  } = useExamoraViewModel();

  const [sectionMode, setSectionMode] = useState<'MODULES' | 'SIGNS'>(() =>
    subDestination.type === 'ROAD_SIGNS' ? 'SIGNS' : 'MODULES',
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(() =>
    subDestination.type === 'CATEGORY_DETAIL' ? subDestination.categoryId : null,
  );
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(() =>
    subDestination.type === 'LESSON_READER' ? subDestination.lessonId : null,
  );

  // Road signs filter state
  const [signSearch, setSignSearch] = useState('');
  const [signCategoryFilter, setSignCategoryFilter] = useState<'ALL' | RoadSignCategory>('ALL');
  const [activeSignDetail, setActiveSignDetail] = useState<RoadSign | null>(null);

  // Lesson interactive Knowledge Check & Note state
  const [kcChoiceId, setKcChoiceId] = useState<string | null>(null);
  const [kcChecked, setKcChecked] = useState(false);
  const [showLessonNoteBox, setShowLessonNoteBox] = useState(false);
  const [lessonNoteDraft, setLessonNoteDraft] = useState('');
  const [noteSavedToast, setNoteSavedToast] = useState(false);

  // Sync incoming subDestination from Home / Saved navigation
  useEffect(() => {
    if (subDestination.type === 'ROAD_SIGNS') {
      setSectionMode('SIGNS');
      setSelectedCategoryId(null);
      setSelectedLessonId(null);
    } else if (subDestination.type === 'CATEGORY_DETAIL') {
      setSectionMode('MODULES');
      setSelectedCategoryId(subDestination.categoryId);
      setSelectedLessonId(null);
      markCategoryOpened(subDestination.categoryId);
    } else if (subDestination.type === 'LESSON_READER') {
      const found = lessons.find((l) => l.id === subDestination.lessonId);
      if (found) {
        setSectionMode('MODULES');
        setSelectedCategoryId(found.categoryId);
        setSelectedLessonId(found.id);
        markCategoryOpened(found.categoryId, found.id);
      }
    }
  }, [subDestination, lessons, markCategoryOpened]);

  // Reset knowledge check when switching lessons
  useEffect(() => {
    setKcChoiceId(null);
    setKcChecked(false);
    setShowLessonNoteBox(false);
    setNoteSavedToast(false);
    if (selectedLessonId) {
      const existing = notes.find(
        (n) => n.linkedType === 'LESSON' && n.linkedId === selectedLessonId,
      );
      setLessonNoteDraft(existing?.content || '');
    }
  }, [selectedLessonId, notes]);

  const activeCategory = useMemo(
    () => categories.find((c) => c.id === selectedCategoryId) || null,
    [categories, selectedCategoryId],
  );

  const activeLesson = useMemo(
    () => lessons.find((l) => l.id === selectedLessonId) || null,
    [lessons, selectedLessonId],
  );

  const filteredSigns = useMemo(() => {
    const q = signSearch.trim().toLowerCase();
    return roadSigns.filter((s) => {
      if (signCategoryFilter !== 'ALL' && s.category !== signCategoryFilter) return false;
      if (!q) return true;
      return (
        loc(s.name).toLowerCase().includes(q) ||
        loc(s.meaning).toLowerCase().includes(q) ||
        loc(s.requiredAction).toLowerCase().includes(q)
      );
    });
  }, [roadSigns, signCategoryFilter, signSearch, loc]);

  // 1. FULL LESSON READER VIEW
  if (activeLesson && activeCategory) {
    const completed = progress.completedLessons.includes(activeLesson.id);
    const bookmarked = isBookmarked('LESSON', activeLesson.id);
    const existingNote = notes.find(
      (n) => n.linkedType === 'LESSON' && n.linkedId === activeLesson.id,
    );

    const handleSaveLessonNote = () => {
      if (!lessonNoteDraft.trim()) return;
      savePersonalNote({
        id: existingNote?.id,
        title: loc(activeLesson.title),
        content: lessonNoteDraft,
        linkedType: 'LESSON',
        linkedId: activeLesson.id,
      });
      setNoteSavedToast(true);
      setShowLessonNoteBox(false);
    };

    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => {
              setSelectedLessonId(null);
              setSubDestination({ type: 'CATEGORY_DETAIL', categoryId: activeCategory.id });
            }}
            className="min-h-[44px] inline-flex items-center gap-2 text-sm font-medium text-[#667085] hover:text-[#14243A] dark:text-[#98A2B3] dark:hover:text-[#F4F6F9]"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.learn.backToCategory}
          </button>

          <div className="flex items-center gap-2">
            <SecondaryButton onClick={() => setShowLessonNoteBox((v) => !v)}>
              <FileEdit className="w-4 h-4" />
              {t.learn.addNote}
            </SecondaryButton>
            <button
              type="button"
              onClick={() => toggleBookmark('LESSON', activeLesson.id)}
              aria-label="Bookmark Lesson"
              className="min-w-[44px] min-h-[44px] rounded-xl border border-[#E9EBEF] dark:border-[#24344D] bg-[#FFFFFF] dark:bg-[#142033] flex items-center justify-center"
            >
              <BookmarkIcon
                className={`w-5 h-5 ${
                  bookmarked ? 'fill-[#D8A43B] text-[#D8A43B]' : 'text-[#667085]'
                }`}
              />
            </button>
          </div>
        </div>

        {noteSavedToast && (
          <div className="p-3.5 rounded-xl bg-[#32845A]/12 border border-[#32845A]/40 text-xs font-medium text-[#32845A] flex items-center justify-between">
            <span>Personal note saved offline under Saved & Notes.</span>
            <button type="button" onClick={() => setNoteSavedToast(false)}>
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {showLessonNoteBox && (
          <div className="p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D] space-y-3">
            <p className="text-sm font-semibold text-[#14243A] dark:text-[#F4F6F9]">
              Personal Study Note · {loc(activeLesson.title)}
            </p>
            <textarea
              rows={3}
              value={lessonNoteDraft}
              onChange={(e) => setLessonNoteDraft(e.target.value)}
              placeholder={t.saved.noteBodyPlaceholder}
              className="w-full p-3 rounded-xl border border-[#E9EBEF] dark:border-[#24344D] bg-[#FAF9F6] dark:bg-[#0D1726] text-sm text-[#14243A] dark:text-[#F4F6F9] focus:outline-2 focus:outline-[#D8A43B]"
            />
            <div className="flex justify-end gap-2">
              <SecondaryButton onClick={() => setShowLessonNoteBox(false)}>Cancel</SecondaryButton>
              <PrimaryButton onClick={handleSaveLessonNote}>{t.saved.saveNote}</PrimaryButton>
            </div>
          </div>
        )}

        {/* Lesson Article Container */}
        <article className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D] space-y-8">
          <header className="space-y-3 border-b border-[#E9EBEF] dark:border-[#24344D] pb-6">
            <div className="text-xs text-[#667085] dark:text-[#98A2B3] font-mono-tabular">
              <span>Module {activeCategory.number}</span>
              <span aria-hidden="true"> · </span>
              <span>{loc(activeCategory.title)}</span>
              <span aria-hidden="true"> · </span>
              <span>{activeLesson.estimatedMinutes} min study</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#14243A] dark:text-[#F4F6F9] leading-tight">
              {loc(activeLesson.title)}
            </h1>
            <p className="text-base text-[#667085] dark:text-[#98A2B3] leading-relaxed">
              {loc(activeLesson.introduction)}
            </p>
          </header>

          {/* Learning Objectives */}
          <section className="space-y-2.5">
            <h2 className="font-display text-base font-bold text-[#14243A] dark:text-[#F4F6F9]">
              {t.learn.objectives}
            </h2>
            <ul className="space-y-2 text-sm text-[#14243A] dark:text-[#F4F6F9]">
              {activeLesson.objectives.map((obj, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                  <Check className="w-4 h-4 text-[#32845A] shrink-0 mt-1" />
                  <span>{loc(obj)}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Optional PNG Diagram */}
          {activeLesson.illustrationPng && (
            <div className="rounded-2xl overflow-hidden border border-[#E9EBEF] dark:border-[#24344D] bg-[#14243A]">
              <SafePngImage
                src={activeLesson.illustrationPng}
                alt={loc(activeLesson.title)}
                className="w-full h-auto object-contain"
              />
            </div>
          )}

          {/* Core Explanations */}
          <section className="space-y-6">
            {activeLesson.explanations.map((sec, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="font-display text-lg font-bold text-[#14243A] dark:text-[#F4F6F9]">
                  {loc(sec.heading)}
                </h3>
                <p className="text-[15px] text-[#14243A]/90 dark:text-[#F4F6F9]/90 leading-relaxed">
                  {loc(sec.body)}
                </p>
              </div>
            ))}
          </section>

          {/* Important Reminders */}
          <section className="p-5 rounded-2xl bg-[#FAF9F6] dark:bg-[#0D1726] border border-[#E9EBEF] dark:border-[#24344D] space-y-2.5">
            <h3 className="font-display text-sm font-bold text-[#14243A] dark:text-[#D8A43B]">
              {t.learn.importantReminders}
            </h3>
            <ul className="space-y-2 text-sm text-[#14243A] dark:text-[#F4F6F9]">
              {activeLesson.importantReminders.map((rem, idx) => (
                <li key={idx} className="leading-relaxed">
                  • {loc(rem)}
                </li>
              ))}
            </ul>
          </section>

          {/* Practical Philippine Examples */}
          <section className="space-y-2">
            <h3 className="font-display text-base font-bold text-[#14243A] dark:text-[#F4F6F9]">
              {t.learn.realWorldExamples}
            </h3>
            {activeLesson.examples.map((ex, idx) => (
              <p
                key={idx}
                className="text-sm text-[#667085] dark:text-[#98A2B3] leading-relaxed"
              >
                {loc(ex)}
              </p>
            ))}
          </section>

          {/* Interactive Knowledge Check */}
          <section className="pt-6 border-t border-[#E9EBEF] dark:border-[#24344D] space-y-4">
            <p className="text-xs font-mono-tabular text-[#D8A43B] font-semibold">
              {t.learn.knowledgeCheck}
            </p>
            <h3 className="text-base font-semibold text-[#14243A] dark:text-[#F4F6F9]">
              {loc(activeLesson.knowledgeCheck.question)}
            </h3>
            <div className="space-y-2.5">
              {activeLesson.knowledgeCheck.choices.map((ch) => {
                const isSelected = kcChoiceId === ch.id;
                const isRight = ch.id === activeLesson.knowledgeCheck.correctChoiceId;
                let cls =
                  'border-[#E9EBEF] dark:border-[#24344D] bg-[#FAF9F6] dark:bg-[#0D1726]';
                if (!kcChecked && isSelected) {
                  cls = 'border-[#14243A] dark:border-[#D8A43B] bg-[#14243A]/5 dark:bg-[#D8A43B]/10';
                } else if (kcChecked && isRight) {
                  cls = 'border-[#32845A] bg-[#32845A]/12';
                } else if (kcChecked && isSelected && !isRight) {
                  cls = 'border-[#C44B4B] bg-[#C44B4B]/12';
                }
                return (
                  <button
                    key={ch.id}
                    type="button"
                    disabled={kcChecked}
                    onClick={() => setKcChoiceId(ch.id)}
                    className={`w-full min-h-[48px] p-3.5 rounded-xl border text-left text-sm transition-colors flex items-center justify-between gap-3 ${cls}`}
                  >
                    <span>{loc(ch.text)}</span>
                    {kcChecked && isRight && (
                      <span className="text-xs font-semibold text-[#32845A] shrink-0">Correct</span>
                    )}
                    {kcChecked && isSelected && !isRight && (
                      <span className="text-xs font-semibold text-[#C44B4B] shrink-0">Incorrect</span>
                    )}
                  </button>
                );
              })}
            </div>

            {!kcChecked ? (
              <SecondaryButton
                disabled={!kcChoiceId}
                onClick={() => setKcChecked(true)}
              >
                {t.learn.checkAnswer}
              </SecondaryButton>
            ) : (
              <p className="text-sm text-[#667085] dark:text-[#98A2B3] leading-relaxed pt-1">
                {loc(activeLesson.knowledgeCheck.explanation)}
              </p>
            )}
          </section>

          {/* Verified References & Mark as Completed */}
          <footer className="pt-6 border-t border-[#E9EBEF] dark:border-[#24344D] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-[#667085] dark:text-[#98A2B3]">
              <span className="font-semibold">{t.learn.sourcesLabel}: </span>
              <span>{activeLesson.sourceReferences.join(' · ')}</span>
            </div>

            {completed ? (
              <SecondaryButton
                onClick={() => toggleLessonCompleted(activeLesson.id, activeCategory.id)}
              >
                <Check className="w-4 h-4 text-[#32845A]" />
                {t.learn.unmarkCompleted}
              </SecondaryButton>
            ) : (
              <PrimaryButton
                onClick={() => toggleLessonCompleted(activeLesson.id, activeCategory.id)}
              >
                <Check className="w-4 h-4" />
                {t.learn.markCompleted}
              </PrimaryButton>
            )}
          </footer>
        </article>
      </div>
    );
  }

  // 2. CATEGORY LESSONS LIST VIEW
  if (activeCategory && sectionMode === 'MODULES') {
    const catLessons = lessons.filter((l) => l.categoryId === activeCategory.id);
    return (
      <div className="space-y-6">
        <button
          type="button"
          onClick={() => {
            setSelectedCategoryId(null);
            setSubDestination({ type: 'NONE' });
          }}
          className="min-h-[44px] inline-flex items-center gap-2 text-sm font-medium text-[#667085] hover:text-[#14243A] dark:text-[#98A2B3] dark:hover:text-[#F4F6F9]"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.learn.backToModules}
        </button>

        <div className="p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D]">
          <p className="text-xs font-mono-tabular text-[#D8A43B] font-semibold mb-1">
            Module {activeCategory.number}
          </p>
          <h1 className="font-display text-2xl font-bold text-[#14243A] dark:text-[#F4F6F9] mb-2">
            {loc(activeCategory.title)}
          </h1>
          <p className="text-sm text-[#667085] dark:text-[#98A2B3] leading-relaxed mb-4">
            {loc(activeCategory.description)}
          </p>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#667085] dark:text-[#98A2B3]">
            {activeCategory.topics.map((tp, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span aria-hidden="true">·</span>}
                <span>{loc(tp)}</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {catLessons.map((lesson, idx) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              index={idx}
              loc={loc}
              isCompleted={progress.completedLessons.includes(lesson.id)}
              isBookmarked={isBookmarked('LESSON', lesson.id)}
              onOpen={() => {
                setSelectedLessonId(lesson.id);
                markCategoryOpened(activeCategory.id, lesson.id);
              }}
              onToggleBookmark={() => toggleBookmark('LESSON', lesson.id)}
            />
          ))}
        </div>
      </div>
    );
  }

  // 3. TOP-LEVEL CURRICULUM MODULES OR ROAD SIGNS DIRECTORY
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#14243A] dark:text-[#F4F6F9] mb-1">
            {t.learn.headerTitle}
          </h1>
          <p className="text-sm text-[#667085] dark:text-[#98A2B3]">{t.learn.headerSubtitle}</p>
        </div>

        {/* Interactive Segmented Mode Control */}
        <div className="inline-flex items-center p-1 rounded-xl bg-[#E9EBEF] dark:bg-[#142033] self-start shrink-0">
          <button
            type="button"
            onClick={() => {
              setSectionMode('MODULES');
              setSubDestination({ type: 'NONE' });
            }}
            className={`min-h-[40px] px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
              sectionMode === 'MODULES'
                ? 'bg-[#FFFFFF] text-[#14243A] shadow-xs dark:bg-[#24344D] dark:text-[#F4F6F9]'
                : 'text-[#667085] dark:text-[#98A2B3]'
            }`}
          >
            {t.learn.tabModules} (8)
          </button>
          <button
            type="button"
            onClick={() => {
              setSectionMode('SIGNS');
              setSubDestination({ type: 'ROAD_SIGNS' });
            }}
            className={`min-h-[40px] px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
              sectionMode === 'SIGNS'
                ? 'bg-[#FFFFFF] text-[#14243A] shadow-xs dark:bg-[#24344D] dark:text-[#F4F6F9]'
                : 'text-[#667085] dark:text-[#98A2B3]'
            }`}
          >
            {t.learn.tabRoadSigns} ({roadSigns.length})
          </button>
        </div>
      </div>

      {sectionMode === 'MODULES' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((cat) => {
            const catLessons = lessons.filter((l) => l.categoryId === cat.id);
            const done = catLessons.filter((l) => progress.completedLessons.includes(l.id)).length;
            return (
              <CategoryCard
                key={cat.id}
                category={cat}
                loc={loc}
                completedCount={done}
                totalCount={catLessons.length}
                lessonsLabel={t.learn.lessonsCount}
                completedLabel={t.learn.completedCount}
                onClick={() => {
                  setSelectedCategoryId(cat.id);
                  markCategoryOpened(cat.id);
                }}
              />
            );
          })}
        </div>
      ) : (
        /* DEDICATED ROAD SIGNS DIRECTORY */
        <div className="space-y-5">
          {/* Search & Category Filter Bar */}
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#667085] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={signSearch}
                onChange={(e) => setSignSearch(e.target.value)}
                placeholder={t.learn.searchSignsPlaceholder}
                className="w-full min-h-[46px] pl-11 pr-4 py-2 rounded-xl border border-[#E9EBEF] dark:border-[#24344D] bg-[#FFFFFF] dark:bg-[#142033] text-sm text-[#14243A] dark:text-[#F4F6F9] focus:outline-2 focus:outline-[#D8A43B]"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {SIGN_CATEGORIES.map((catKey) => {
                const active = signCategoryFilter === catKey;
                const label =
                  catKey === 'ALL' ? t.learn.allSigns : t.signCategories[catKey];
                return (
                  <button
                    key={catKey}
                    type="button"
                    onClick={() => setSignCategoryFilter(catKey)}
                    className={`min-h-[40px] px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors whitespace-nowrap shrink-0 border ${
                      active
                        ? 'bg-[#14243A] text-white border-[#14243A] dark:bg-[#D8A43B] dark:text-[#14243A] dark:border-[#D8A43B]'
                        : 'bg-[#FFFFFF] text-[#667085] border-[#E9EBEF] hover:text-[#14243A] dark:bg-[#142033] dark:text-[#98A2B3] dark:border-[#24344D]'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Signs Grid */}
          {filteredSigns.length === 0 ? (
            <div className="p-10 text-center rounded-2xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D] text-sm text-[#667085] dark:text-[#98A2B3]">
              No road signs matched your search query. Try clearing the search filter.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredSigns.map((sign) => (
                <RoadSignCard
                  key={sign.id}
                  sign={sign}
                  categoryLabel={t.signCategories[sign.category]}
                  loc={loc}
                  isBookmarked={isBookmarked('ROAD_SIGN', sign.id)}
                  onOpen={() => setActiveSignDetail(sign)}
                  onToggleBookmark={() => toggleBookmark('ROAD_SIGN', sign.id)}
                />
              ))}
            </div>
          )}

          {/* Individual Road Sign Detail Modal */}
          {activeSignDetail && (
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="road-sign-detail-title"
              className="fixed inset-0 z-50 bg-black/55 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
              onClick={() => setActiveSignDetail(null)}
            >
              <div
                className="w-full max-w-xl rounded-t-3xl sm:rounded-3xl bg-[#FFFFFF] dark:bg-[#142033] border border-[#E9EBEF] dark:border-[#24344D] p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-5"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs text-[#D8A43B] font-semibold mb-1">
                      {t.signCategories[activeSignDetail.category]}
                    </p>
                    <h2
                      id="road-sign-detail-title"
                      className="font-display text-xl font-bold text-[#14243A] dark:text-[#F4F6F9]"
                    >
                      {loc(activeSignDetail.name)}
                    </h2>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => toggleBookmark('ROAD_SIGN', activeSignDetail.id)}
                      aria-label="Bookmark road sign"
                      className="min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center text-[#667085] hover:bg-[#FAF9F6] dark:hover:bg-[#1C2C46]"
                    >
                      <BookmarkIcon
                        className={`w-5 h-5 ${
                          isBookmarked('ROAD_SIGN', activeSignDetail.id)
                            ? 'fill-[#D8A43B] text-[#D8A43B]'
                            : ''
                        }`}
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveSignDetail(null)}
                      aria-label="Close sign details"
                      className="min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center text-[#667085] hover:bg-[#FAF9F6] dark:hover:bg-[#1C2C46]"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#FAF9F6] dark:bg-[#0D1726] flex items-center justify-center">
                  <SafePngImage
                    src={activeSignDetail.imageResource}
                    alt={loc(activeSignDetail.name)}
                    className="w-36 h-36 object-contain"
                  />
                </div>

                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-xs font-semibold text-[#667085] dark:text-[#98A2B3] mb-1">
                      Visual Description
                    </p>
                    <p className="text-[#14243A] dark:text-[#F4F6F9] leading-relaxed">
                      {loc(activeSignDetail.explanation)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-[#667085] dark:text-[#98A2B3] mb-1">
                      {t.learn.signMeaning}
                    </p>
                    <p className="text-[#14243A] dark:text-[#F4F6F9] font-medium leading-relaxed">
                      {loc(activeSignDetail.meaning)}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FAF9F6] dark:bg-[#0D1726] border border-[#E9EBEF] dark:border-[#24344D]">
                    <p className="text-xs font-semibold text-[#32845A] mb-1">
                      {t.learn.signRequiredAction}
                    </p>
                    <p className="text-[#14243A] dark:text-[#F4F6F9] leading-relaxed">
                      {loc(activeSignDetail.requiredAction)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-[#667085] dark:text-[#98A2B3] mb-1">
                      {t.learn.signExample}
                    </p>
                    <p className="text-[#667085] dark:text-[#98A2B3] leading-relaxed">
                      {loc(activeSignDetail.exampleSituation)}
                    </p>
                  </div>

                  <p className="text-xs text-[#667085] dark:text-[#98A2B3] pt-2 border-t border-[#E9EBEF] dark:border-[#24344D]">
                    Reference: {activeSignDetail.sourceReference}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
