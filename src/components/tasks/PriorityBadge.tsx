import { TaskPriority } from "@/types/task";
import { PRIORITY_STYLES } from "@/lib/priority";

interface PriorityBadgeProps {
  priority: TaskPriority;
}

export default function PriorityBadge({ priority }: PriorityBadgeProps) {
  const { bg, text } = PRIORITY_STYLES[priority] ?? PRIORITY_STYLES.Medium;
  return (
    <span
      className="text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0"
      style={{ backgroundColor: bg, color: text }}
    >
      {priority ?? "Medium"}
    </span>
  );
}