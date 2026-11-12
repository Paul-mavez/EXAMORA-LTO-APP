import { MockExamPreset, PreparationTrack } from '../../domain/model/models';

/**
 * Practice Simulation Presets.
 * Kept intentionally modular and configurable so official parameters are never fabricated
 * and can be adjusted independently. Clearly labeled in the UI as simulated practice formats.
 */
export const MOCK_EXAM_PRESETS: MockExamPreset[] = [
  {
    id: 'preset_quick_20',
    label: {
      en: 'Focused Practice Set (20 Questions · 20 Minutes)',
      fil: 'Maikling Pagsasanay (20 Tanong · 20 Minuto)',
    },
    description: {
      en: 'Ideal for daily timed revision across your selected preparation track.',
      fil: 'Angkop para sa araw-araw na may-oras na pagsasanay sa iyong piniling track.',
    },
    questionCount: 20,
    durationMinutes: 20,
  },
  {
    id: 'preset_standard_30',
    label: {
      en: 'Comprehensive Practice Set (30 Questions · 35 Minutes)',
      fil: 'Komprehensibong Pagsasanay (30 Tanong · 35 Minuto)',
    },
    description: {
      en: 'Balanced full-curriculum simulation covering traffic laws, road signs, courtesy, and emergencies.',
      fil: 'Malawak na pagsasanay na sumasaklaw sa batas trapiko, road signs, paggalang sa kalsada, at emergency.',
    },
    questionCount: 30,
    durationMinutes: 35,
  },
  {
    id: 'preset_extended_40',
    label: {
      en: 'Extended Mastery Simulation (40 Questions · 45 Minutes)',
      fil: 'Mahabang Pagsasanay (40 Tanong · 45 Minuto)',
    },
    description: {
      en: 'Thorough endurance test drawing from the entire verified Examora question bank.',
      fil: 'Masusing pagsusulit mula sa buong question bank ng Examora.',
    },
    questionCount: 40,
    durationMinutes: 45,
  },
];

export const TRACK_PRIORITY_CATEGORIES: Record<PreparationTrack, string[]> = {
  STUDENT_PERMIT: [
    'cat_licensing',
    'cat_getting_ready',
    'cat_fundamentals',
    'cat_courtesy_safety',
    'cat_rights_duties',
    'cat_laws',
  ],
  NON_PROFESSIONAL: [
    'cat_licensing',
    'cat_getting_ready',
    'cat_fundamentals',
    'cat_courtesy_safety',
    'cat_rights_duties',
    'cat_registration',
    'cat_laws',
    'cat_fines_penalties',
  ],
  PROFESSIONAL: [
    'cat_courtesy_safety',
    'cat_rights_duties',
    'cat_fundamentals',
    'cat_laws',
    'cat_fines_penalties',
    'cat_registration',
    'cat_getting_ready',
    'cat_licensing',
  ],
};
