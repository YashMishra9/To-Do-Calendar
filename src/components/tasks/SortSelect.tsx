import { TaskSortOption } from "@/lib/sortTasks";

interface SortSelectProps {
  value: TaskSortOption;
  onChange: (option: TaskSortOption) => void;
}

const SORT_LABELS: Record<TaskSortOption, string> = {
  dueTime: "Due Time",
  priority: "Priority",
  alphabetical: "Alphabetical",
  recent: "Recently Added",
};

export default function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as TaskSortOption)}
      aria-label="Sort tasks by"
      className="px-2 py-1.5 text-xs rounded-md border border-[var(--color-border)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
    >
      {(Object.keys(SORT_LABELS) as TaskSortOption[]).map((option) => (
        <option key={option} value={option}>
          Sort: {SORT_LABELS[option]}
        </option>
      ))}
    </select>
  );
}