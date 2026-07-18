import { TaskCategory } from "@/types/task";
import { TASK_CATEGORIES } from "@/lib/categories";

interface CategorySelectProps {
  value: TaskCategory;
  onChange: (category: TaskCategory) => void;
}

export default function CategorySelect({ value, onChange }: CategorySelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as TaskCategory)}
      aria-label="Task category"
      className="px-2 py-2 text-sm rounded-md border border-[var(--color-border)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
    >
      {TASK_CATEGORIES.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  );
}