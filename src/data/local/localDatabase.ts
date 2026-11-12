import {
  Bookmark,
  ContentReport,
  MockExamAttempt,
  PersonalNote,
  StudySession,
  UserPreferences,
  UserProgress,
} from '../../domain/model/models';

const STORAGE_KEYS = {
  PREFS: 'examora_lto_prefs_v1',
  PROGRESS: 'examora_lto_progress_v1',
  BOOKMARKS: 'examora_lto_bookmarks_v1',
  NOTES: 'examora_lto_notes_v1',
  SESSIONS: 'examora_lto_sessions_v1',
  MOCK_EXAMS: 'examora_lto_mock_exams_v1',
  REPORTS: 'examora_lto_reports_v1',
} as const;

export const DEFAULT_PREFERENCES: UserPreferences = {
  onboardingCompleted: false,
  language: 'en',
  preparationTrack: 'NON_PROFESSIONAL',
  displayName: '',
  dailyGoalQuestions: 20,
  notificationsEnabled: true,
  soundEnabled: true,
  theme: 'light',
};

export const DEFAULT_PROGRESS: UserProgress = {
  completedLessons: [],
  answeredQuestions: {},
  incorrectQuestionIds: [],
  lastStudiedCategoryId: null,
  lastStudiedLessonId: null,
  lastStudiedAt: null,
};

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage quota exceptions silently in restricted environments
  }
}

export const LocalDatabase = {
  loadPreferences(): UserPreferences {
    return { ...DEFAULT_PREFERENCES, ...readJson<Partial<UserPreferences>>(STORAGE_KEYS.PREFS, {}) };
  },
  savePreferences(prefs: UserPreferences): void {
    writeJson(STORAGE_KEYS.PREFS, prefs);
  },

  loadProgress(): UserProgress {
    return { ...DEFAULT_PROGRESS, ...readJson<Partial<UserProgress>>(STORAGE_KEYS.PROGRESS, {}) };
  },
  saveProgress(progress: UserProgress): void {
    writeJson(STORAGE_KEYS.PROGRESS, progress);
  },

  loadBookmarks(): Bookmark[] {
    return readJson<Bookmark[]>(STORAGE_KEYS.BOOKMARKS, []);
  },
  saveBookmarks(bookmarks: Bookmark[]): void {
    writeJson(STORAGE_KEYS.BOOKMARKS, bookmarks);
  },

  loadNotes(): PersonalNote[] {
    return readJson<PersonalNote[]>(STORAGE_KEYS.NOTES, []);
  },
  saveNotes(notes: PersonalNote[]): void {
    writeJson(STORAGE_KEYS.NOTES, notes);
  },

  loadSessions(): StudySession[] {
    return readJson<StudySession[]>(STORAGE_KEYS.SESSIONS, []);
  },
  saveSessions(sessions: StudySession[]): void {
    writeJson(STORAGE_KEYS.SESSIONS, sessions);
  },

  loadMockExams(): MockExamAttempt[] {
    return readJson<MockExamAttempt[]>(STORAGE_KEYS.MOCK_EXAMS, []);
  },
  saveMockExams(exams: MockExamAttempt[]): void {
    writeJson(STORAGE_KEYS.MOCK_EXAMS, exams);
  },

  loadReports(): ContentReport[] {
    return readJson<ContentReport[]>(STORAGE_KEYS.REPORTS, []);
  },
  saveReports(reports: ContentReport[]): void {
    writeJson(STORAGE_KEYS.REPORTS, reports);
  },

  clearLearningData(): void {
    writeJson(STORAGE_KEYS.PROGRESS, DEFAULT_PROGRESS);
    writeJson(STORAGE_KEYS.BOOKMARKS, []);
    writeJson(STORAGE_KEYS.NOTES, []);
    writeJson(STORAGE_KEYS.SESSIONS, []);
    writeJson(STORAGE_KEYS.MOCK_EXAMS, []);
    writeJson(STORAGE_KEYS.REPORTS, []);
  },
};
