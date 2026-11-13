const DAILY_REMINDER_STORAGE_KEY = 'examora_daily_practice_reminder_v1';

export interface DailyReminderSettings {
  enabled: boolean;
  time: string;
  repeatDays: number[];
  lastReminderDate: string | null;
}

const DEFAULT_REPEAT_DAYS = [0, 1, 2, 3, 4, 5, 6];

export const getTodayKey = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const loadDailyReminderSettings = (): DailyReminderSettings => {
  const defaults: DailyReminderSettings = {
    enabled: false,
    time: '19:00',
    repeatDays: DEFAULT_REPEAT_DAYS,
    lastReminderDate: null,
  };
  try {
    const raw = localStorage.getItem(DAILY_REMINDER_STORAGE_KEY);
    if (!raw) return defaults;
    const saved = JSON.parse(raw) as Partial<DailyReminderSettings>;
    return {
      enabled: saved.enabled === true,
      time: typeof saved.time === 'string' && /^([01]\d|2[0-3]):[0-5]\d$/.test(saved.time)
        ? saved.time
        : defaults.time,
      repeatDays: Array.isArray(saved.repeatDays)
        ? [...new Set(saved.repeatDays.filter((day) => Number.isInteger(day) && day >= 0 && day <= 6))]
        : defaults.repeatDays,
      lastReminderDate:
        typeof saved.lastReminderDate === 'string' ? saved.lastReminderDate : null,
    };
  } catch {
    return defaults;
  }
};

export const saveDailyReminderSettings = (settings: DailyReminderSettings): boolean => {
  try {
    localStorage.setItem(DAILY_REMINDER_STORAGE_KEY, JSON.stringify(settings));
    return true;
  } catch {
    return false;
  }
};
