import Dot from "@/components/ui/Dot";

interface CalendarDayIndicatorsProps {
  taskCount: number;
  isSelected: boolean;
}

const MAX_VISIBLE_DOTS = 3;

export default function CalendarDayIndicators({
  taskCount,
  isSelected,
}: CalendarDayIndicatorsProps) {
  if (taskCount === 0) return null;

  const visibleDots = Math.min(taskCount, MAX_VISIBLE_DOTS);
  const overflow = taskCount - MAX_VISIBLE_DOTS;
  const dotColor = isSelected ? "white" : "primary";

  return (
    <div className="flex items-center justify-center gap-0.5 h-2">
      {Array.from({ length: visibleDots }).map((_, i) => (
        <Dot key={i} color={dotColor} className="w-1 h-1" />
      ))}
      {overflow > 0 && (
        <span
          className={`text-[9px] leading-none font-medium ml-0.5 ${
            isSelected ? "text-white" : "text-[var(--color-muted)]"
          }`}
        >
          +{overflow}
        </span>
      )}
    </div>
  );
}