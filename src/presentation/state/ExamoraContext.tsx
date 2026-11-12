import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { examoraRepository } from '../../data/repository/examoraRepositoryImpl';
import {
  Bookmark,
  BookmarkItemType,
  Category,
  ContentReport,
  Lesson,
  LocalizedText,
  MockExamAttempt,
  MockExamPreset,
  PersonalNote,
  Question,
  RoadSign,
  StudySession,
  UserPreferences,
  UserProgress,
} from '../../domain/model/models';
import {
  calculateDashboardMetrics,
  DashboardMetrics,
  playSubtleFeedbackTone,
} from '../../domain/usecase/useCases';
import { en, TranslationDictionary } from '../../i18n/en';
import { fil } from '../../i18n/fil';

export type MainTab = 'HOME' | 'LEARN' | 'PRACTICE' | 'MOCK_EXAM' | 'PROFILE';
export type SubDestination =
  | { type: 'NONE' }
  | { type: 'ROAD_SIGNS' }
  | { type: 'CATEGORY_DETAIL'; categoryId: string }
  | { type: 'LESSON_READER'; lessonId: string }
  | { type: 'PRACTICE_MISTAKES' }
  | { type: 'SAVED_NOTES' }
  | { type: 'PROGRESS_ANALYTICS' };

interface ExamoraViewModelContextValue {
  preferences: UserPreferences;
  t: TranslationDictionary;
  loc: (text: LocalizedText) => string;
  categories: Category[];
  lessons: Lesson[];
  roadSigns: RoadSign[];
  questions: Question[];
  mockExamPresets: MockExamPreset[];
  progress: UserProgress;
  bookmarks: Bookmark[];
  notes: PersonalNote[];
  sessions: StudySession[];
  mockExamHistory: MockExamAttempt[];
  reports: ContentReport[];
  metrics: DashboardMetrics;

  activeTab: MainTab;
  subDestination: SubDestination;
  navigateTab: (tab: MainTab, sub?: SubDestination) => void;
  setSubDestination: (sub: SubDestination) => void;

  completeOnboarding: (setup: {
    language: UserPreferences['language'];
    preparationTrack: UserPreferences['preparationTrack'];
    displayName: string;
  }) => void;
  replayOnboarding: () => void;
  updatePreferences: (partial: Partial<UserPreferences>) => void;

  toggleLessonCompleted: (lessonId: string, categoryId: string) => void;
  markCategoryOpened: (categoryId: string, lessonId?: string) => void;
  recordQuestionAttempt: (question: Question, selectedChoiceId: string) => boolean;
  recordSessionCompleted: (session: Omit<StudySession, 'id' | 'date' | 'dayKey'>) => void;
  saveCompletedMockExam: (attempt: Omit<MockExamAttempt, 'id' | 'date'>) => MockExamAttempt;

  toggleBookmark: (itemType: BookmarkItemType, itemId: string) => void;
  isBookmarked: (itemType: BookmarkItemType, itemId: string) => boolean;

  savePersonalNote: (note: Omit<PersonalNote, 'id' | 'updatedAt'> & { id?: string }) => void;
  deletePersonalNote: (noteId: string) => void;

  submitReport: (questionId: string, reason: string, details: string) => void;
  resetAllProgress: () => void;
}

const ExamoraContext = createContext<ExamoraViewModelContextValue | null>(null);

export const ExamoraProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<UserPreferences>(() =>
    examoraRepository.getPreferences(),
  );
  const [progress, setProgress] = useState<UserProgress>(() =>
    examoraRepository.getUserProgress(),
  );
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() =>
    examoraRepository.getBookmarks(),
  );
  const [notes, setNotes] = useState<PersonalNote[]>(() => examoraRepository.getNotes());
  const [sessions, setSessions] = useState<StudySession[]>(() =>
    examoraRepository.getStudySessions(),
  );
  const [mockExamHistory, setMockExamHistory] = useState<MockExamAttempt[]>(() =>
    examoraRepository.getMockExamHistory(),
  );
  const [reports, setReports] = useState<ContentReport[]>(() =>
    examoraRepository.getContentReports(),
  );

  const [activeTab, setActiveTab] = useState<MainTab>('HOME');
  const [subDestination, setSubDestination] = useState<SubDestination>({ type: 'NONE' });

  const categories = useMemo(() => examoraRepository.getCategories(), []);
  const lessons = useMemo(() => examoraRepository.getLessons(), []);
  const roadSigns = useMemo(() => examoraRepository.getRoadSigns(), []);
  const questions = useMemo(() => examoraRepository.getQuestions(), []);
  const mockExamPresets = useMemo(() => examoraRepository.getMockExamPresets(), []);

  // Apply light/dark/system theme cleanly to <html>
  useEffect(() => {
    const root = document.documentElement;
    const applyTheme = () => {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const shouldUseDark =
        preferences.theme === 'dark' || (preferences.theme === 'system' && prefersDark);
      if (shouldUseDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };
    applyTheme();

    if (preferences.theme === 'system') {
      const media = window.matchMedia('(prefers-color-scheme: dark)');
      media.addEventListener('change', applyTheme);
      return () => media.removeEventListener('change', applyTheme);
    }
    return undefined;
  }, [preferences.theme]);

  const t = preferences.language === 'fil' ? fil : en;

  const loc = useCallback(
    (text: LocalizedText): string => (preferences.language === 'fil' ? text.fil : text.en),
    [preferences.language],
  );

  const metrics = useMemo(
    () =>
      calculateDashboardMetrics(
        categories,
        lessons,
        questions,
        progress,
        sessions,
        preferences.preparationTrack,
      ),
    [categories, lessons, questions, progress, sessions, preferences.preparationTrack],
  );

  const navigateTab = useCallback((tab: MainTab, sub: SubDestination = { type: 'NONE' }) => {
    setActiveTab(tab);
    setSubDestination(sub);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const completeOnboarding = useCallback(
    (setup: {
      language: UserPreferences['language'];
      preparationTrack: UserPreferences['preparationTrack'];
      displayName: string;
    }) => {
      const updated = examoraRepository.savePreferences({
        language: setup.language,
        preparationTrack: setup.preparationTrack,
        displayName: setup.displayName.trim(),
        onboardingCompleted: true,
      });
      setPreferences(updated);
      setActiveTab('HOME');
      setSubDestination({ type: 'NONE' });
    },
    [],
  );

  const replayOnboarding = useCallback(() => {
    const updated = examoraRepository.savePreferences({ onboardingCompleted: false });
    setPreferences(updated);
  }, []);

  const updatePreferences = useCallback((partial: Partial<UserPreferences>) => {
    const updated = examoraRepository.savePreferences(partial);
    setPreferences(updated);
  }, []);

  const toggleLessonCompleted = useCallback(
    (lessonId: string, categoryId: string) => {
      const wasCompleted = progress.completedLessons.includes(lessonId);
      const updated = examoraRepository.toggleLessonCompleted(lessonId, categoryId);
      setProgress(updated);
      if (!wasCompleted) {
        playSubtleFeedbackTone(true, preferences.soundEnabled);
        const updatedSessions = examoraRepository.recordStudySession({
          sessionType: 'LESSON',
          modeLabel: 'Lesson Completed',
          questionsAnswered: 0,
          correctAnswers: 0,
          durationSeconds: 360,
        });
        setSessions(updatedSessions);
      }
    },
    [preferences.soundEnabled, progress.completedLessons],
  );

  const markCategoryOpened = useCallback((categoryId: string, lessonId?: string) => {
    const updated = examoraRepository.recordLastStudied(categoryId, lessonId);
    setProgress(updated);
  }, []);

  const recordQuestionAttempt = useCallback(
    (question: Question, selectedChoiceId: string): boolean => {
      const isCorrect = question.correctAnswerId === selectedChoiceId;
      playSubtleFeedbackTone(isCorrect, preferences.soundEnabled);
      const updated = examoraRepository.recordQuestionAnswer({
        questionId: question.id,
        categoryId: question.categoryId,
        selectedAnswerId: selectedChoiceId,
        isCorrect,
        timestamp: new Date().toISOString(),
      });
      setProgress(updated);
      return isCorrect;
    },
    [preferences.soundEnabled],
  );

  const recordSessionCompleted = useCallback(
    (session: Omit<StudySession, 'id' | 'date' | 'dayKey'>) => {
      const updated = examoraRepository.recordStudySession(session);
      setSessions(updated);
    },
    [],
  );

  const saveCompletedMockExam = useCallback(
    (attempt: Omit<MockExamAttempt, 'id' | 'date'>): MockExamAttempt => {
      const saved = examoraRepository.saveMockExamAttempt(attempt);
      setMockExamHistory(examoraRepository.getMockExamHistory());
      // Also record each answered question into user progress for accurate category weak-area analytics
      for (const qId of attempt.questionIds) {
        const selected = attempt.selectedAnswers[qId];
        if (!selected) continue;
        const q = questions.find((item) => item.id === qId);
        if (!q) continue;
        examoraRepository.recordQuestionAnswer({
          questionId: q.id,
          categoryId: q.categoryId,
          selectedAnswerId: selected,
          isCorrect: q.correctAnswerId === selected,
          timestamp: new Date().toISOString(),
        });
      }
      setProgress(examoraRepository.getUserProgress());
      const updatedSessions = examoraRepository.recordStudySession({
        sessionType: 'MOCK_EXAM',
        modeLabel: 'Mock Examination',
        questionsAnswered: attempt.correctAnswers + attempt.incorrectAnswers,
        correctAnswers: attempt.correctAnswers,
        durationSeconds: attempt.durationSeconds,
      });
      setSessions(updatedSessions);
      return saved;
    },
    [questions],
  );

  const toggleBookmark = useCallback((itemType: BookmarkItemType, itemId: string) => {
    const updated = examoraRepository.toggleBookmark(itemType, itemId);
    setBookmarks(updated);
  }, []);

  const isBookmarked = useCallback(
    (itemType: BookmarkItemType, itemId: string) =>
      bookmarks.some((b) => b.itemType === itemType && b.itemId === itemId),
    [bookmarks],
  );

  const savePersonalNote = useCallback(
    (note: Omit<PersonalNote, 'id' | 'updatedAt'> & { id?: string }) => {
      const updated = examoraRepository.saveNote(note);
      setNotes(updated);
    },
    [],
  );

  const deletePersonalNote = useCallback((noteId: string) => {
    const updated = examoraRepository.deleteNote(noteId);
    setNotes(updated);
  }, []);

  const submitReport = useCallback((questionId: string, reason: string, details: string) => {
    const updated = examoraRepository.submitContentReport(questionId, reason, details);
    setReports(updated);
  }, []);

  const resetAllProgress = useCallback(() => {
    examoraRepository.resetAllUserData();
    setProgress(examoraRepository.getUserProgress());
    setBookmarks([]);
    setNotes([]);
    setSessions([]);
    setMockExamHistory([]);
    setReports([]);
  }, []);

  const value = useMemo<ExamoraViewModelContextValue>(
    () => ({
      preferences,
      t,
      loc,
      categories,
      lessons,
      roadSigns,
      questions,
      mockExamPresets,
      progress,
      bookmarks,
      notes,
      sessions,
      mockExamHistory,
      reports,
      metrics,
      activeTab,
      subDestination,
      navigateTab,
      setSubDestination,
      completeOnboarding,
      replayOnboarding,
      updatePreferences,
      toggleLessonCompleted,
      markCategoryOpened,
      recordQuestionAttempt,
      recordSessionCompleted,
      saveCompletedMockExam,
      toggleBookmark,
      isBookmarked,
      savePersonalNote,
      deletePersonalNote,
      submitReport,
      resetAllProgress,
    }),
    [
      preferences,
      t,
      loc,
      categories,
      lessons,
      roadSigns,
      questions,
      mockExamPresets,
      progress,
      bookmarks,
      notes,
      sessions,
      mockExamHistory,
      reports,
      metrics,
      activeTab,
      subDestination,
      navigateTab,
      completeOnboarding,
      replayOnboarding,
      updatePreferences,
      toggleLessonCompleted,
      markCategoryOpened,
      recordQuestionAttempt,
      recordSessionCompleted,
      saveCompletedMockExam,
      toggleBookmark,
      isBookmarked,
      savePersonalNote,
      deletePersonalNote,
      submitReport,
      resetAllProgress,
    ],
  );

  return <ExamoraContext.Provider value={value}>{children}</ExamoraContext.Provider>;
};

export function useExamoraViewModel(): ExamoraViewModelContextValue {
  const ctx = useContext(ExamoraContext);
  if (!ctx) {
    throw new Error('useExamoraViewModel must be used inside ExamoraProvider');
  }
  return ctx;
}
