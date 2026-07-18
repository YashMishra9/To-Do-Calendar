import { CalendarDayCellProps } from "@/types/calendar";
import Dot from "@/components/ui/Dot";

export default function CalendarDayCell({
  date,
  isCurrentMonth,
  isToday,
  isSelected,
  onSelect,
}: CalendarDayCellProps) {
  return (
    <button
      onClick={() => onSelect(date)}
      className={`
        aspect-square w-full rounded-md text-sm flex items-center justify-center
        transition-colors relative
        ${isCurrentMonth ? "text-[var(--color-ink)]" : "text-neutral-300"}
        ${isSelected ? "bg-[var(--color-primary)] text-white font-medium" : "hover:bg-neutral-100"}
      `}
    >
      {date.getDate()}
      {isToday && !isSelected && <Dot color="today" className="absolute bottom-1 w-1 h-1" />}
    </button>
  );
}