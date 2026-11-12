import {
  AnswerAttempt,
  Bookmark,
  BookmarkItemType,
  Category,
  ContentReport,
  Lesson,
  MockExamAttempt,
  MockExamPreset,
  PersonalNote,
  Question,
  RoadSign,
  StudySession,
  UserPreferences,
  UserProgress,
} from '../../domain/model/models';
import { ExamoraRepository } from '../../domain/repository/examoraRepository';
import { CATEGORIES, LESSONS } from '../local/curriculumData';
import { LocalDatabase } from '../local/localDatabase';
import { MOCK_EXAM_PRESETS } from '../local/mockExamConfig';
import { QUESTIONS } from '../local/questionsData';
import { ROAD_SIGNS } from '../local/roadSignsData';

function getTodayDayKey(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export class ExamoraRepositoryImpl implements ExamoraRepository {
  getCategories(): Category[] {
    return CATEGORIES;
  }

  getLessons(): Lesson[] {
    return LESSONS;
  }

  getLessonsByCategory(categoryId: string): Lesson[] {
    return LESSONS.filter((l) => l.categoryId === categoryId);
  }

  getLessonById(lessonId: string): Lesson | undefined {
    return LESSONS.find((l) => l.id === lessonId);
  }

  getRoadSigns(): RoadSign[] {
    return ROAD_SIGNS;
  }

  getQuestions(): Question[] {
    return QUESTIONS;
  }

  getMockExamPresets(): MockExamPreset[] {
    return MOCK_EXAM_PRESETS;
  }

  getPreferences(): UserPreferences {
    return LocalDatabase.loadPreferences();
  }

  savePreferences(prefs: Partial<UserPreferences>): UserPreferences {
    const updated: UserPreferences = {
      ...LocalDatabase.loadPreferences(),
      ...prefs,
    };
    LocalDatabase.savePreferences(updated);
    return updated;
  }

  getUserProgress(): UserProgress {
    return LocalDatabase.loadProgress();
  }

  toggleLessonCompleted(lessonId: string, categoryId: string): UserProgress {
    const current = LocalDatabase.loadProgress();
    const exists = current.completedLessons.includes(lessonId);
    const completedLessons = exists
      ? current.completedLessons.filter((id) => id !== lessonId)
      : [...current.completedLessons, lessonId];
    const updated: UserProgress = {
      ...current,
      completedLessons,
      lastStudiedCategoryId: categoryId,
      lastStudiedLessonId: lessonId,
      lastStudiedAt: new Date().toISOString(),
    };
    LocalDatabase.saveProgress(updated);
    return updated;
  }

  recordLastStudied(categoryId: string, lessonId?: string): UserProgress {
    const current = LocalDatabase.loadProgress();
    const updated: UserProgress = {
      ...current,
      lastStudiedCategoryId: categoryId,
      lastStudiedLessonId: lessonId ?? current.lastStudiedLessonId,
      lastStudiedAt: new Date().toISOString(),
    };
    LocalDatabase.saveProgress(updated);
    return updated;
  }

  recordQuestionAnswer(attempt: AnswerAttempt): UserProgress {
    const current = LocalDatabase.loadProgress();
    const answeredQuestions = {
      ...current.answeredQuestions,
      [attempt.questionId]: attempt,
    };
    const incorrectSet = new Set(current.incorrectQuestionIds);
    if (attempt.isCorrect) {
      incorrectSet.delete(attempt.questionId);
    } else {
      incorrectSet.add(attempt.questionId);
    }
    const updated: UserProgress = {
      ...current,
      answeredQuestions,
      incorrectQuestionIds: Array.from(incorrectSet),
      lastStudiedCategoryId: attempt.categoryId,
      lastStudiedAt: attempt.timestamp,
    };
    LocalDatabase.saveProgress(updated);
    return updated;
  }

  getBookmarks(): Bookmark[] {
    return LocalDatabase.loadBookmarks();
  }

  toggleBookmark(itemType: BookmarkItemType, itemId: string): Bookmark[] {
    const current = LocalDatabase.loadBookmarks();
    const existing = current.find((b) => b.itemType === itemType && b.itemId === itemId);
    const updated = existing
      ? current.filter((b) => !(b.itemType === itemType && b.itemId === itemId))
      : [
          {
            id: `bm_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
            itemType,
            itemId,
            createdAt: new Date().toISOString(),
          },
          ...current,
        ];
    LocalDatabase.saveBookmarks(updated);
    return updated;
  }

  isBookmarked(itemType: BookmarkItemType, itemId: string): boolean {
    return LocalDatabase.loadBookmarks().some((b) => b.itemType === itemType && b.itemId === itemId);
  }

  getNotes(): PersonalNote[] {
    return LocalDatabase.loadNotes();
  }

  saveNote(noteInput: Omit<PersonalNote, 'id' | 'updatedAt'> & { id?: string }): PersonalNote[] {
    const current = LocalDatabase.loadNotes();
    const now = new Date().toISOString();
    let updated: PersonalNote[];
    if (noteInput.id) {
      updated = current.map((n) =>
        n.id === noteInput.id
          ? {
              ...n,
              title: noteInput.title.trim(),
              content: noteInput.content.trim(),
              linkedType: noteInput.linkedType,
              linkedId: noteInput.linkedId,
              updatedAt: now,
            }
          : n,
      );
    } else {
      const created: PersonalNote = {
        id: `note_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        title: noteInput.title.trim(),
        content: noteInput.content.trim(),
        linkedType: noteInput.linkedType,
        linkedId: noteInput.linkedId,
        updatedAt: now,
      };
      updated = [created, ...current];
    }
    LocalDatabase.saveNotes(updated);
    return updated;
  }

  deleteNote(noteId: string): PersonalNote[] {
    const updated = LocalDatabase.loadNotes().filter((n) => n.id !== noteId);
    LocalDatabase.saveNotes(updated);
    return updated;
  }

  getStudySessions(): StudySession[] {
    return LocalDatabase.loadSessions();
  }

  recordStudySession(session: Omit<StudySession, 'id' | 'date' | 'dayKey'>): StudySession[] {
    const current = LocalDatabase.loadSessions();
    const created: StudySession = {
      ...session,
      id: `ses_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      date: new Date().toISOString(),
      dayKey: getTodayDayKey(),
    };
    const updated = [created, ...current].slice(0, 100);
    LocalDatabase.saveSessions(updated);
    return updated;
  }

  getMockExamHistory(): MockExamAttempt[] {
    return LocalDatabase.loadMockExams();
  }

  saveMockExamAttempt(attempt: Omit<MockExamAttempt, 'id' | 'date'>): MockExamAttempt {
    const current = LocalDatabase.loadMockExams();
    const created: MockExamAttempt = {
      ...attempt,
      id: `exam_${Date.now()}`,
      date: new Date().toISOString(),
    };
    LocalDatabase.saveMockExams([created, ...current].slice(0, 50));
    return created;
  }

  getContentReports(): ContentReport[] {
    return LocalDatabase.loadReports();
  }

  submitContentReport(questionId: string, reason: string, details: string): ContentReport[] {
    const current = LocalDatabase.loadReports();
    const report: ContentReport = {
      id: `rep_${Date.now()}`,
      questionId,
      reason,
      details,
      createdAt: new Date().toISOString(),
    };
    const updated = [report, ...current];
    LocalDatabase.saveReports(updated);
    return updated;
  }

  resetAllUserData(): void {
    LocalDatabase.clearLearningData();
  }
}

export const examoraRepository = new ExamoraRepositoryImpl();
