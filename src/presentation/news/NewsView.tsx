import React, { useEffect, useRef, useState } from 'react';
import { Bell, BellOff, CalendarDays } from 'lucide-react';
import {
  DailyReminderSettings,
  getTodayKey,
  loadDailyReminderSettings,
  saveDailyReminderSettings,
} from '../../data/local/dailyPractice';

const TIME_WHEEL_ROW_HEIGHT = 44;
const TIME_WHEEL_PADDING = 88;
type TimeWheelSelection = { hour: number; minute: number; period: 'AM' | 'PM' };

const parseTime = (time: string): TimeWheelSelection => {
  const [hour24, minute] = time.split(':').map(Number);
  const validHour = Number.isFinite(hour24) ? hour24 : 19;
  return {
    hour: validHour % 12 || 12,
    minute: Number.isFinite(minute) ? minute : 0,
    period: validHour >= 12 ? 'PM' : 'AM',
  };
};

const toStoredTime = ({ hour, minute, period }: TimeWheelSelection): string => {
  const hour24 = (hour % 12) + (period === 'PM' ? 12 : 0);
  return `${String(hour24).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
};

interface TimeWheelPickerProps {
  value: string;
  onChange: (value: string) => void;
}

const TimeWheelPicker: React.FC<TimeWheelPickerProps> = ({ value, onChange }) => {
  const [selection, setSelection] = useState(() => parseTime(value));
  const selectionRef = useRef(selection);
  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);
  const periodRef = useRef<HTMLDivElement>(null);
  const commitTimerRef = useRef<number | null>(null);
  const hourValues = Array.from({ length: 12 }, (_, index) => String(index + 1));
  const minuteValues = Array.from({ length: 60 }, (_, index) => String(index).padStart(2, '0'));
  const periodValues: TimeWheelSelection['period'][] = ['AM', 'PM'];

  useEffect(() => {
    const nextSelection = parseTime(value);
    selectionRef.current = nextSelection;
    setSelection(nextSelection);
    if (hourRef.current) hourRef.current.scrollTop = (nextSelection.hour - 1) * TIME_WHEEL_ROW_HEIGHT;
    if (minuteRef.current) minuteRef.current.scrollTop = nextSelection.minute * TIME_WHEEL_ROW_HEIGHT;
    if (periodRef.current) {
      periodRef.current.scrollTop =
        (nextSelection.period === 'PM' ? 1 : 0) * TIME_WHEEL_ROW_HEIGHT;
    }
  }, [value]);

  useEffect(
    () => () => {
      if (commitTimerRef.current !== null) window.clearTimeout(commitTimerRef.current);
    },
    []
  );

  const commitSelection = (nextSelection: TimeWheelSelection) => {
    selectionRef.current = nextSelection;
    setSelection(nextSelection);
    if (commitTimerRef.current !== null) window.clearTimeout(commitTimerRef.current);
    commitTimerRef.current = window.setTimeout(
      () => onChange(toStoredTime(selectionRef.current)),
      180
    );
  };

  const handleWheelScroll = (
    column: 'hour' | 'minute' | 'period',
    values: string[],
    ref: React.RefObject<HTMLDivElement | null>
  ) => {
    const selectedIndex = Math.max(
      0,
      Math.min(values.length - 1, Math.round((ref.current?.scrollTop ?? 0) / TIME_WHEEL_ROW_HEIGHT))
    );
    const nextSelection = { ...selectionRef.current };
    if (column === 'hour') nextSelection.hour = selectedIndex + 1;
    if (column === 'minute') nextSelection.minute = selectedIndex;
    if (column === 'period') nextSelection.period = periodValues[selectedIndex];
    if (
      nextSelection.hour !== selectionRef.current.hour ||
      nextSelection.minute !== selectionRef.current.minute ||
      nextSelection.period !== selectionRef.current.period
    ) {
      commitSelection(nextSelection);
    }
  };

  const renderWheel = (
    label: string,
    values: string[],
    selectedIndex: number,
    ref: React.RefObject<HTMLDivElement | null>,
    onScroll: () => void
  ) => (
    <div className="relative h-[220px] overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-[88px] z-0 h-11 rounded-xl bg-[#DBEAFE]" />
      <div
        ref={ref}
        role="listbox"
        aria-label={label}
        tabIndex={0}
        onScroll={onScroll}
        className="relative z-10 h-full snap-y snap-mandatory overflow-y-auto overscroll-contain text-[#14243A] no-scrollbar"
        style={{ paddingTop: TIME_WHEEL_PADDING, paddingBottom: TIME_WHEEL_PADDING }}
      >
        {values.map((item, index) => (
          <div
            key={`${label}-${item}`}
            role="option"
            aria-selected={index === selectedIndex}
            className={`flex h-11 snap-center items-center justify-center text-[28px] tabular-nums transition-opacity ${
              index === selectedIndex ? 'text-[#14243A] opacity-100' : 'text-[#98A2B3] opacity-70'
            }`}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[88px] bg-linear-to-b from-white to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[88px] bg-linear-to-t from-white to-transparent" />
    </div>
  );

  return (
    <section
      aria-label="Choose alarm time"
      className="mt-5 overflow-hidden rounded-3xl border border-[#BFDBFE] bg-white p-3"
    >
      <div className="grid grid-cols-[1fr_1.2fr_1fr] items-center gap-1">
        {renderWheel(
          'Hour',
          hourValues,
          selection.hour - 1,
          hourRef,
          () => handleWheelScroll('hour', hourValues, hourRef)
        )}
        {renderWheel(
          'Minute',
          minuteValues,
          selection.minute,
          minuteRef,
          () => handleWheelScroll('minute', minuteValues, minuteRef)
        )}
        {renderWheel(
          'AM or PM',
          periodValues,
          selection.period === 'PM' ? 1 : 0,
          periodRef,
          () => handleWheelScroll('period', periodValues, periodRef)
        )}
      </div>
    </section>
  );
};

export const NewsView: React.FC = () => {
  const [settings, setSettings] = useState<DailyReminderSettings>(loadDailyReminderSettings);
  const [reminderVisible, setReminderVisible] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const checkReminder = () => {
      const today = getTodayKey();
      const currentTime = new Date().toTimeString().slice(0, 5);
      const currentDay = new Date().getDay();
      if (
        !settings.enabled ||
        settings.repeatDays.length > 0 && !settings.repeatDays.includes(currentDay) ||
        currentTime < settings.time ||
        settings.lastReminderDate === today
      ) {
        return;
      }

      const updatedSettings = {
        ...settings,
        enabled: settings.repeatDays.length > 0,
        lastReminderDate: today,
      };
      if (!saveDailyReminderSettings(updatedSettings)) {
        setStatusMessage('Could not save the reminder state on this device.');
        return;
      }
      setSettings(updatedSettings);
      setReminderVisible(true);

      if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
        try {
          new Notification('Daily practice reminder', {
            body: "It's time for your daily LTO practice.",
          });
        } catch {
          setStatusMessage('The in-app reminder is ready, but the browser alert could not be shown.');
        }
      }
    };

    checkReminder();
    const timerId = window.setInterval(checkReminder, 30_000);
    return () => window.clearInterval(timerId);
  }, [settings]);

  const updateSettings = (updates: Partial<DailyReminderSettings>): boolean => {
    const updatedSettings = { ...settings, ...updates };
    if (!saveDailyReminderSettings(updatedSettings)) {
      setStatusMessage('Could not save your reminder settings on this device.');
      return false;
    }
    setSettings(updatedSettings);
    setStatusMessage('');
    if (!updatedSettings.enabled) setReminderVisible(false);
    return true;
  };

  const toggleRepeatDay = (day: number) => {
    const repeatDays = settings.repeatDays.includes(day)
      ? settings.repeatDays.filter((selectedDay) => selectedDay !== day)
      : [...settings.repeatDays, day];
    updateSettings({ repeatDays });
  };

  const weekDays = [
    { short: 'S', name: 'Sunday' },
    { short: 'M', name: 'Monday' },
    { short: 'T', name: 'Tuesday' },
    { short: 'W', name: 'Wednesday' },
    { short: 'T', name: 'Thursday' },
    { short: 'F', name: 'Friday' },
    { short: 'S', name: 'Saturday' },
  ];

  const repeatSummary =
    settings.repeatDays.length === 0
      ? 'Never'
      : settings.repeatDays.length === 7
        ? 'Every day'
        : settings.repeatDays
            .slice()
            .sort((left, right) => left - right)
            .map((day) => weekDays[day].name.slice(0, 3))
            .join(', ');

  const toggleReminder = async () => {
    if (settings.enabled) {
      if (updateSettings({ enabled: false })) {
        setReminderVisible(false);
        setStatusMessage('Daily reminder turned off.');
      }
      return;
    }

    let message = 'Daily reminder turned on.';
    if (typeof Notification !== 'undefined' && Notification.permission === 'default') {
      try {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
          message = 'Reminder saved. Allow browser notifications to receive alerts.';
        }
      } catch {
        message = 'Reminder saved, but browser notifications are unavailable.';
      }
    } else if (typeof Notification === 'undefined' || Notification.permission === 'denied') {
      message = 'Reminder saved. Allow browser notifications to receive alerts.';
    }

    if (updateSettings({ enabled: true })) setStatusMessage(message);
  };

  const formattedTime = (() => {
    const [hour, minute] = settings.time.split(':').map(Number);
    const time = new Date();
    time.setHours(hour, minute, 0, 0);
    return new Intl.DateTimeFormat(undefined, {
      hour: 'numeric',
      minute: '2-digit',
    }).format(time);
  })();

  return (
    <div className="w-full max-w-md mx-auto px-4 pt-8 pb-32 min-h-screen text-[#14243A]">
      <div className="mb-6">
        <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-[#0A84FF]">
          Daily alarm
        </p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-[#14243A]">
          Practice reminder
        </h1>
        <p className="mt-1 text-sm text-[#667085]">
          Set a time for Examora to remind you to practice.
        </p>
      </div>

      <section className="rounded-3xl border border-[#BFDBFE] bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#DBEAFE] text-[#0A84FF]">
            {settings.enabled ? <Bell className="h-5 w-5" /> : <BellOff className="h-5 w-5" />}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-[#14243A]">Alarm</p>
            <p className="text-xs text-[#667085]">
              {settings.enabled ? 'On' : 'Off'}
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-label="Enable daily practice reminder"
            aria-checked={settings.enabled}
            onClick={toggleReminder}
            className={`h-7 w-12 shrink-0 rounded-full p-1 transition-colors ${
              settings.enabled ? 'bg-[#32845A]' : 'bg-[#CBD5E1]'
            }`}
          >
            <span
              className={`block h-5 w-5 rounded-full bg-white transition-transform ${
                settings.enabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        <p className="mb-2 mt-5 text-xs font-semibold uppercase tracking-wide text-[#667085]">
          Alarm time · {formattedTime}
        </p>
        <TimeWheelPicker
          value={settings.time}
          onChange={(time) => updateSettings({ time })}
        />

        <div className="mt-3 rounded-2xl border border-[#E9EBEF] px-4 py-4">
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2 text-sm font-medium text-[#475569]">
              <CalendarDays className="h-4 w-4 text-[#0A84FF]" />
              Repeat
            </span>
            <span className="text-sm font-semibold text-[#14243A]">{repeatSummary}</span>
          </div>
          <div className="mt-3 flex items-center justify-between gap-1 border-t border-[#E9EBEF] pt-3">
            {weekDays.map((day, index) => {
              const selected = settings.repeatDays.includes(index);
              return (
                <button
                  key={day.name}
                  type="button"
                  aria-label={day.name}
                  aria-pressed={selected}
                  onClick={() => toggleRepeatDay(index)}
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                    selected
                      ? 'bg-[#0A84FF] text-white'
                      : 'bg-[#EEF0F4] text-[#667085] hover:bg-[#DBEAFE]'
                  }`}
                >
                  {day.short}
                </button>
              );
            })}
          </div>
        </div>

        {statusMessage && (
          <p role="status" className="mt-3 text-xs font-medium text-[#475569]">
            {statusMessage}
          </p>
        )}
      </section>

      {reminderVisible && (
        <div className="mt-4 rounded-2xl border border-[#F5D99A] bg-[#FFFAEB] p-4">
          <p className="text-sm font-semibold text-[#7A4B00]">Time for your daily practice</p>
        </div>
      )}
    </div>
  );
};
