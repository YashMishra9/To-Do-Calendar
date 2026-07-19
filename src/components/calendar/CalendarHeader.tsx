import { MONTH_LABELS } from "@/lib/date";
import Button from "@/components/ui/Button";

interface CalendarHeaderProps {
  currentMonth: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

export default function CalendarHeader({
  currentMonth,
  onPrevMonth,
  onNextMonth,
  onToday,
}: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-base font-semibold">
        {MONTH_LABELS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
      </h2>
      <div className="flex items-center gap-2">
        <button
          onClick={onToday}
          className="px-2.5 py-1 text-xs rounded-md border border-[var(--color-border)] text-[var(--color-muted)] hover:bg-neutral-50"
        >
          Today
        </button>
        <div className="flex gap-1">
          <Button variant="icon" onClick={onPrevMonth} aria-label="Previous month">
            ‹
          </Button>
          <Button variant="icon" onClick={onNextMonth} aria-label="Next month">
            ›
          </Button>
        </div>
      </div>
    </div>
  );
}