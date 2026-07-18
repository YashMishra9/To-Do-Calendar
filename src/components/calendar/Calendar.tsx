"use client";

import { useCalendarMonth } from "@/hooks/useCalendarMonth";
import Panel from "@/components/ui/Panel";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";

interface CalendarProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export default function Calendar({ selectedDate, onSelectDate }: CalendarProps) {
  const today = new Date();
  const { currentMonth, days, goToPrevMonth, goToNextMonth } = useCalendarMonth(today);

  return (
    <Panel className="flex-1">
      <CalendarHeader
        currentMonth={currentMonth}
        onPrevMonth={goToPrevMonth}
        onNextMonth={goToNextMonth}
      />
      <CalendarGrid
        days={days}
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        today={today}
        onSelectDate={onSelectDate}
      />
    </Panel>
  );
}