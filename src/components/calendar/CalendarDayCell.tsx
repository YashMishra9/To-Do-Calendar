import { CalendarDayCellProps } from "@/types/calendar";
import CalendarDayIndicators from "./CalendarDayIndicators";

export default function CalendarDayCell({
  date,
  isCurrentMonth,
  isToday,
  isSelected,
  taskCount,
  onSelect,
}: CalendarDayCellProps) {
  return (
    <button
      onClick={() => onSelect(date)}
      title={taskCount > 0 ? `${taskCount} task${taskCount === 1 ? "" : "s"}` : undefined}
      className={`
        w-full min-h-[48px] sm:min-h-[56px] rounded-lg text-sm sm:text-base
        flex flex-col items-center justify-center gap-1
        transition-all duration-150 relative
        outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-1
        ${isCurrentMonth ? "text-[var(--color-ink)]" : "text-neutral-300"}
        ${
          isSelected
            ? "bg-[var(--color-primary)] text-white font-medium"
            : "hover:bg-neutral-100 hover:scale-[1.03]"
        }
        ${isToday && !isSelected ? "ring-1 ring-inset ring-[var(--color-today)] font-semibold" : ""}
      `}
    >
      <span>{date.getDate()}</span>
      <CalendarDayIndicators taskCount={taskCount} isSelected={isSelected} />
    </button>
  );
}