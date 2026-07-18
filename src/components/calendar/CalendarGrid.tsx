"use client";

import { WEEKDAY_LABELS, isSameDay, isSameMonth, toDateKey } from "@/lib/date";
import { useTasks } from "@/hooks/useTasks";
import CalendarDayCell from "./CalendarDayCell";

interface CalendarGridProps {
  days: Date[];
  currentMonth: Date;
  selectedDate: Date | null;
  today: Date;
  onSelectDate: (date: Date) => void;
}

export default function CalendarGrid({
  days,
  currentMonth,
  selectedDate,
  today,
  onSelectDate,
}: CalendarGridProps) {
  const { getTasksForDate } = useTasks();

  return (
    <div>
      <div className="grid grid-cols-7 mb-2">
        {WEEKDAY_LABELS.map((label) => (
          <div
            key={label}
            className="text-xs text-center text-[var(--color-muted)] font-medium py-1"
          >
            {label}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {days.map((date) => {
          const dateKey = toDateKey(date);
          const taskCount = getTasksForDate(dateKey).length;

          return (
            <CalendarDayCell
              key={date.toISOString()}
              date={date}
              isCurrentMonth={isSameMonth(date, currentMonth)}
              isToday={isSameDay(date, today)}
              isSelected={selectedDate ? isSameDay(date, selectedDate) : false}
              taskCount={taskCount}
              onSelect={onSelectDate}
            />
          );
        })}
      </div>
    </div>
  );
}