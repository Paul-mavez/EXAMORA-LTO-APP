import { NewsItem, ReviewerCategory, ReviewerQuestion } from '../../domain/model/reviewerModels';
import {
  getCdeEnglishQuestions,
  getCdeTagalogQuestions,
  getEnglishQuestions,
  getTagalogQuestions,
  getTdcQuestions,
  getTrafficSignsQuestions,
} from './fullQuestionBank';

export const REVIEWER_CATEGORIES: ReviewerCategory[] = [
  {
    id: 'tagalog',
    title: 'Tagalog',
    subtitle: 'Mga tanong at sagot para sa LTO exam sa wikang Filipino',
    questionCount: 75,
    iconType: 'ph_flag',
    accentColor: '#4A90E2',
  },
  {
    id: 'english',
    title: 'English',
    subtitle: 'LTO exam questions and answers in English',
    questionCount: 97,
    iconType: 'english_book',
    accentColor: '#34A853',
  },
  {
    id: 'signs',
    title: 'Traffic Signs, Signals and Markings',
    subtitle: 'Philippine road signs, signals, and pavement markings',
    questionCount: 182,
    iconType: 'traffic_light',
    accentColor: '#FBBC05',
  },
  {
    id: 'cde_en',
    title: "CDE: Comprehensive Driver's Education (English)",
    subtitle: 'Essential road rules and driving fundamentals in English',
    questionCount: 98,
    iconType: 'cde_en',
    accentColor: '#EA4335',
  },
  {
    id: 'cde_tl',
    title: "CDE: Comprehensive Driver's Education (Tagalog)",
    subtitle: 'Essential road rules and driving fundamentals in Tagalog',
    questionCount: 90,
    iconType: 'cde_tl',
    accentColor: '#E91E63',
  },
  {
    id: 'tdc',
    title: 'TDC: Theoretical Driving Course',
    subtitle: '15-hour foundational course for Student Permit applicants',
    questionCount: 80,
    iconType: 'tdc_car',
    accentColor: '#00BCD4',
  },
];

/**
 * Full 622-Question Bank across all 6 categories:
 * - Tagalog: 75 questions
 * - English: 97 questions
 * - Traffic Signs, Signals and Markings: 182 questions
 * - CDE (English): 98 questions
 * - CDE (Tagalog): 90 questions
 * - TDC: 80 questions
 */
export const REVIEWER_QUESTIONS: ReviewerQuestion[] = [
  ...getTagalogQuestions(),
  ...getEnglishQuestions(),
  ...getTrafficSignsQuestions(),
  ...getCdeEnglishQuestions(),
  ...getCdeTagalogQuestions(),
  ...getTdcQuestions(),
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: 'news_1',
    title: '10-Year Driver’s License Validity Guidelines Under RA 10930',
    date: 'Nov 10, 2026',
    category: 'Licensing Policy',
    summary: 'How safe driving habits and clean records earn motorists a 10-year driver’s license validity period upon renewal.',
    content: 'Under Republic Act No. 10930, drivers renewing their license who possess zero demerit points across their preceding 5-year cycle qualify for a 10-year validity driver’s license upon passing the Comprehensive Driver’s Education (CDE) exam. Keep your traffic record clean to save time and renewal fees.',
  },
  {
    id: 'news_2',
    title: 'Official Advisory: Pre-Drive Vehicle Check with BLOWBAGETS',
    date: 'Nov 06, 2026',
    category: 'Road Safety',
    summary: 'Preventing highway breakdowns through mandatory 3-minute pre-departure walkaround inspections.',
    content: 'The LTO urges all private and commercial drivers to religiously conduct BLOWBAGETS checks: Battery, Lights, Oil, Water, Brakes, Air pressure, Gas/Fuel, Engine, Tires, and Self before every drive.',
  },
  {
    id: 'news_3',
    title: 'Revised Rules on E-Bikes and E-Trikes on National Highways',
    date: 'Oct 28, 2026',
    category: 'Traffic Regulations',
    summary: 'Clarification on light electric vehicle restrictions and permitted municipal routes.',
    content: 'Light electric vehicles (LEVs) including e-bikes and e-trikes remain restricted on major circumferential national highways for safety reasons. Operators on secondary municipal roads must adhere to helmet and lane restrictions.',
  },
  {
    id: 'news_4',
    title: 'Anti-Distracted Driving (RA 10913) Enforcement at Signalized Stops',
    date: 'Oct 15, 2026',
    category: 'Law Enforcement',
    summary: 'Using handheld devices while stationary at red traffic lights is strictly prohibited.',
    content: 'Motorists are reminded that RA 10913 explicitly applies even while a vehicle is temporarily stationary at a red stoplight or intersection. Only hands-free navigation devices mounted below dashboard line-of-sight are permissible.',
  },
];
