export interface ReviewerCategory {
  id: string;
  title: string;
  subtitle: string;
  questionCount: number;
  iconType: 'ph_flag' | 'english_book' | 'traffic_light' | 'cde_en' | 'cde_tl' | 'tdc_car';
  accentColor: string;
}

export interface ReviewerQuestionChoice {
  id: string;
  letter: string;
  text: string;
}

export interface ReviewerQuestion {
  id: string;
  categoryId: string;
  number: number;
  question: string;
  choices: ReviewerQuestionChoice[];
  correctChoiceId: string;
  explanation: string;
  imageResource?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  content: string;
}
