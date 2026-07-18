"use client";

import { useState, useMemo } from "react";
import { getMonthGrid, addMonths } from "@/lib/date";

export function useCalendarMonth(initialDate: Date = new Date()) {
  const [currentMonth, setCurrentMonth] = useState(
    new Date(initialDate.getFullYear(), initialDate.getMonth(), 1)
  );

  const days = useMemo(
    () => getMonthGrid(currentMonth.getFullYear(), currentMonth.getMonth()),
    [currentMonth]
  );

  const goToPrevMonth = () => setCurrentMonth((prev) => addMonths(prev, -1));
  const goToNextMonth = () => setCurrentMonth((prev) => addMonths(prev, 1));

  return { currentMonth, days, goToPrevMonth, goToNextMonth };
}