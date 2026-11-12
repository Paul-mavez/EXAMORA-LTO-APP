export type AppLanguage = 'en' | 'fil';

export type PreparationTrack =
  | 'STUDENT_PERMIT'
  | 'NON_PROFESSIONAL'
  | 'PROFESSIONAL';

export type ThemePreference = 'light' | 'dark' | 'system';

export type DifficultyLevel = 'Easy' | 'Medium' | 'Challenging';

export type RoadSignCategory =
  | 'REGULATORY'
  | 'WARNING'
  | 'GUIDE_INFORMATIONAL'
  | 'PAVEMENT_MARKINGS'
  | 'TRAFFIC_SIGNALS';

export type BookmarkItemType = 'LESSON' | 'QUESTION' | 'ROAD_SIGN';

export type PracticeMode =
  | 'CATEGORY'
  | 'RANDOM'
  | 'WEAK_AREAS'
  | 'BOOKMARKED'
  | 'MISTAKES';

export interface LocalizedText {
  en: string;
  fil: string;
}

export interface Category {
  id: string;
  number: string;
  title: LocalizedText;
  description: LocalizedText;
  icon: string;
  topics: LocalizedText[];
  recommendedTracks: PreparationTrack[];
}

export interface KnowledgeCheck {
  question: LocalizedText;
  choices: { id: string; text: LocalizedText }[];
  correctChoiceId: string;
  explanation: LocalizedText;
}

export interface Lesson {
  id: string;
  categoryId: string;
  title: LocalizedText;
  introduction: LocalizedText;
  objectives: LocalizedText[];
  explanations: { heading: LocalizedText; body: LocalizedText }[];
  importantReminders: LocalizedText[];
  examples: LocalizedText[];
  illustrationPng?: string;
  knowledgeCheck: KnowledgeCheck;
  sourceReferences: string[];
  estimatedMinutes: number;
}

export interface RoadSign {
  id: string;
  name: LocalizedText;
  category: RoadSignCategory;
  imageResource: string;
  explanation: LocalizedText;
  meaning: LocalizedText;
  requiredAction: LocalizedText;
  exampleSituation: LocalizedText;
  sourceReference: string;
}

export interface QuestionChoice {
  id: string;
  text: LocalizedText;
}

export interface Question {
  id: string;
  question: LocalizedText;
  categoryId: string;
  topicId: string;
  topicTitle: LocalizedText;
  choices: QuestionChoice[];
  correctAnswerId: string;
  explanation: LocalizedText;
  difficulty: DifficultyLevel;
  sourceReference: string;
  lastVerified: string;
  imageResource?: string;
  eligibleTracks: PreparationTrack[];
  needsContentReview?: boolean;
}

export interface AnswerAttempt {
  questionId: string;
  categoryId: string;
  selectedAnswerId: string;
  isCorrect: boolean;
  timestamp: string;
}

export interface CategoryPerformance {
  categoryId: string;
  answered: number;
  correct: number;
  accuracy: number;
}

export interface UserProgress {
  completedLessons: string[];
  answeredQuestions: Record<string, AnswerAttempt>;
  incorrectQuestionIds: string[];
  lastStudiedCategoryId: string | null;
  lastStudiedLessonId: string | null;
  lastStudiedAt: string | null;
}

export interface Bookmark {
  id: string;
  itemType: BookmarkItemType;
  itemId: string;
  createdAt: string;
}

export interface PersonalNote {
  id: string;
  title: string;
  content: string;
  linkedType?: BookmarkItemType;
  linkedId?: string;
  updatedAt: string;
}

export interface StudySession {
  id: string;
  date: string; // ISO string
  dayKey: string; // YYYY-MM-DD local date
  sessionType: 'PRACTICE' | 'MOCK_EXAM' | 'LESSON';
  modeLabel: string;
  questionsAnswered: number;
  correctAnswers: number;
  durationSeconds: number;
}

export interface MockExamPreset {
  id: string;
  label: LocalizedText;
  description: LocalizedText;
  questionCount: number;
  durationMinutes: number;
}

export interface MockExamAttempt {
  id: string;
  date: string;
  track: PreparationTrack;
  difficulty: 'ALL' | DifficultyLevel;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unansweredQuestions: number;
  scorePercentage: number;
  durationSeconds: number;
  questionIds: string[];
  selectedAnswers: Record<string, string>;
}

export interface ContentReport {
  id: string;
  questionId: string;
  reason: string;
  details: string;
  createdAt: string;
}

export interface UserPreferences {
  onboardingCompleted: boolean;
  language: AppLanguage;
  preparationTrack: PreparationTrack;
  displayName: string;
  dailyGoalQuestions: number;
  notificationsEnabled: boolean;
  soundEnabled: boolean;
  theme: ThemePreference;
}
