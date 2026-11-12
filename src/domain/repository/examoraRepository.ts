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
} from '../model/models';

export interface ExamoraRepository {
  getCategories(): Category[];
  getLessons(): Lesson[];
  getLessonsByCategory(categoryId: string): Lesson[];
  getLessonById(lessonId: string): Lesson | undefined;
  getRoadSigns(): RoadSign[];
  getQuestions(): Question[];
  getMockExamPresets(): MockExamPreset[];

  getPreferences(): UserPreferences;
  savePreferences(prefs: Partial<UserPreferences>): UserPreferences;

  getUserProgress(): UserProgress;
  toggleLessonCompleted(lessonId: string, categoryId: string): UserProgress;
  recordLastStudied(categoryId: string, lessonId?: string): UserProgress;
  recordQuestionAnswer(attempt: AnswerAttempt): UserProgress;

  getBookmarks(): Bookmark[];
  toggleBookmark(itemType: BookmarkItemType, itemId: string): Bookmark[];
  isBookmarked(itemType: BookmarkItemType, itemId: string): boolean;

  getNotes(): PersonalNote[];
  saveNote(note: Omit<PersonalNote, 'id' | 'updatedAt'> & { id?: string }): PersonalNote[];
  deleteNote(noteId: string): PersonalNote[];

  getStudySessions(): StudySession[];
  recordStudySession(session: Omit<StudySession, 'id' | 'date' | 'dayKey'>): StudySession[];

  getMockExamHistory(): MockExamAttempt[];
  saveMockExamAttempt(attempt: Omit<MockExamAttempt, 'id' | 'date'>): MockExamAttempt;

  getContentReports(): ContentReport[];
  submitContentReport(questionId: string, reason: string, details: string): ContentReport[];

  resetAllUserData(): void;
}
