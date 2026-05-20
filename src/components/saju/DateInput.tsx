"use client";

import { HOUR_OPTIONS } from "@/lib/saju/constants";
import type { SajuInput } from "@/lib/saju/types";

interface DateInputProps {
  value: SajuInput;
  onChange: (v: SajuInput) => void;
  showHour?: boolean;
  label?: string;
}

function getDaysInMonth(year: number, month: number, isLunar: boolean): number {
  if (isLunar) return 30;
  return new Date(year, month, 0).getDate();
}

const CURRENT_YEAR = new Date().getFullYear();

export default function DateInput({ value, onChange, showHour = true, label }: DateInputProps) {
  const isLunar = value.calendar === "lunar";
  const maxDay = getDaysInMonth(value.year, value.month, isLunar);

  function setCalendar(cal: "solar" | "lunar") {
    onChange({
      ...value,
      calendar: cal,
      isLeapMonth: cal === "solar" ? undefined : value.isLeapMonth,
      hourBranch: undefined,
    });
  }

  function setYear(year: number) {
    const safeDay = Math.min(value.day, getDaysInMonth(year, value.month, isLunar));
    onChange({ ...value, year, day: safeDay });
  }

  function setMonth(month: number) {
    const safeDay = Math.min(value.day, getDaysInMonth(value.year, month, isLunar));
    onChange({ ...value, month, day: safeDay });
  }

  function setDay(day: number) {
    onChange({ ...value, day });
  }

  function setHour(idx: number) {
    const opt = HOUR_OPTIONS[idx];
    onChange({ ...value, hourBranch: opt.branch });
  }

  function getHourIdx(): number {
    if (value.hourBranch === undefined) return 0;
    const idx = HOUR_OPTIONS.findIndex((o) => o.branch === value.hourBranch);
    return idx >= 0 ? idx : 0;
  }

  const years: number[] = [];
  for (let y = CURRENT_YEAR; y >= 1930; y--) {
    years.push(y);
  }

  const days: number[] = [];
  for (let d = 1; d <= maxDay; d++) {
    days.push(d);
  }

  return (
    <div className="space-y-4">
      {label && (
        <p className="text-sm font-semibold text-(--color-primary)">{label}</p>
      )}

      <div className="flex gap-1 p-1 rounded-lg bg-(--color-border) w-fit">
        <button
          type="button"
          onClick={() => setCalendar("solar")}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
            !isLunar
              ? "bg-(--color-surface) text-(--color-primary) shadow-sm"
              : "text-(--color-secondary) hover:text-(--color-primary)"
          }`}
        >
          양력
        </button>
        <button
          type="button"
          onClick={() => setCalendar("lunar")}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
            isLunar
              ? "bg-(--color-surface) text-(--color-primary) shadow-sm"
              : "text-(--color-secondary) hover:text-(--color-primary)"
          }`}
        >
          음력
        </button>
      </div>

      <div className="flex gap-2">
        <select
          value={value.year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="flex-1 px-3 py-2 rounded-lg border border-(--color-border) bg-(--color-surface) text-(--color-primary) text-sm focus:outline-none focus:border-(--color-accent)"
        >
          {years.map((y) => (
            <option key={y} value={y}>{y}년</option>
          ))}
        </select>

        <select
          value={value.month}
          onChange={(e) => setMonth(Number(e.target.value))}
          className="w-20 px-3 py-2 rounded-lg border border-(--color-border) bg-(--color-surface) text-(--color-primary) text-sm focus:outline-none focus:border-(--color-accent)"
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
            <option key={m} value={m}>{m}월</option>
          ))}
        </select>

        <select
          value={value.day}
          onChange={(e) => setDay(Number(e.target.value))}
          className="w-20 px-3 py-2 rounded-lg border border-(--color-border) bg-(--color-surface) text-(--color-primary) text-sm focus:outline-none focus:border-(--color-accent)"
        >
          {days.map((d) => (
            <option key={d} value={d}>{d}일</option>
          ))}
        </select>
      </div>

      {isLunar && (
        <label className="flex items-center gap-2 text-sm text-(--color-secondary) cursor-pointer">
          <input
            type="checkbox"
            checked={value.isLeapMonth ?? false}
            onChange={(e) => onChange({ ...value, isLeapMonth: e.target.checked })}
            className="w-4 h-4 accent-(--color-accent)"
          />
          윤달
        </label>
      )}

      {showHour && (
        <select
          value={getHourIdx()}
          onChange={(e) => setHour(Number(e.target.value))}
          className="w-full px-3 py-2 rounded-lg border border-(--color-border) bg-(--color-surface) text-(--color-primary) text-sm focus:outline-none focus:border-(--color-accent)"
        >
          {HOUR_OPTIONS.map((opt, idx) => (
            <option key={idx} value={idx}>{opt.label}</option>
          ))}
        </select>
      )}
    </div>
  );
}
