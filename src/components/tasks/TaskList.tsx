import { Task, TaskPriority } from "@/types/task";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  emptyState: "none" | "no-tasks" | "no-results";
  onToggle: (id: string) => void;
  onEdit: (id: string, updates: { title?: string; priority?: TaskPriority }) => void;
  onDelete: (id: string) => void;
}

export default function TaskList({ tasks, emptyState, onToggle, onEdit, onDelete }: TaskListProps) {
  if (emptyState === "no-tasks") {
    return (
      <div className="py-8 text-center">
        <p className="text-sm text-[var(--color-ink)]">Nothing planned for this day yet.</p>
        <p className="text-xs text-[var(--color-muted)] mt-1">Add a task above to get started.</p>
      </div>
    );
  }

  if (emptyState === "no-results") {
    return (
      <div className="py-8 text-center">
        <p className="text-sm text-[var(--color-ink)]">No tasks match your search or filters.</p>
        <p className="text-xs text-[var(--color-muted)] mt-1">Try adjusting your filters or search term.</p>
      </div>
    );
  }

  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ul>
  );
}