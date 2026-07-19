import { TaskCategory, TaskPriority } from "@/types/task";
import { StatusFilter } from "@/lib/filterTasks";
import { TASK_CATEGORIES } from "@/lib/categories";
import { TASK_PRIORITIES } from "@/lib/priority";

interface TaskFiltersProps {
  status: StatusFilter;
  onStatusChange: (status: StatusFilter) => void;
  category: TaskCategory | "All";
  onCategoryChange: (category: TaskCategory | "All") => void;
  priority: TaskPriority | "All";
  onPriorityChange: (priority: TaskPriority | "All") => void;
}

const STATUS_OPTIONS: StatusFilter[] = ["All", "Pending", "Completed"];

export default function TaskFilters({
  status,
  onStatusChange,
  category,
  onCategoryChange,
  priority,
  onPriorityChange,
}: TaskFiltersProps) {
  return (
    <div className="flex flex-col gap-2 mb-3">
      <div className="flex gap-1">
        {STATUS_OPTIONS.map((option) => (
          <button
            key={option}
            onClick={() => onStatusChange(option)}
            className={`px-2.5 py-1 text-xs rounded-full border transition-colors ${
              status === option
                ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                : "border-[var(--color-border)] text-[var(--color-muted)] hover:bg-neutral-50"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value as TaskCategory | "All")}
          aria-label="Filter by category"
          className="flex-1 px-2 py-1.5 text-xs rounded-md border border-[var(--color-border)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        >
          <option value="All">All categories</option>
          {TASK_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          value={priority}
          onChange={(e) => onPriorityChange(e.target.value as TaskPriority | "All")}
          aria-label="Filter by priority"
          className="flex-1 px-2 py-1.5 text-xs rounded-md border border-[var(--color-border)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        >
          <option value="All">All priorities</option>
          {TASK_PRIORITIES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}