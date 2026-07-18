import { TaskPriority } from "@/types/task";
import { TASK_PRIORITIES } from "@/lib/priority";

interface PrioritySelectProps {
  value: TaskPriority;
  onChange: (priority: TaskPriority) => void;
}

export default function PrioritySelect({ value, onChange }: PrioritySelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as TaskPriority)}
      aria-label="Task priority"
      className="px-2 py-2 text-sm rounded-md border border-[var(--color-border)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
    >
      {TASK_PRIORITIES.map((p) => (
        <option key={p} value={p}>
          {p}
        </option>
      ))}
    </select>
  );
}