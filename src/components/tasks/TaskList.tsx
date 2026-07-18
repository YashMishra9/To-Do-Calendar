import { Task, TaskPriority } from "@/types/task";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onEdit: (id: string, updates: { title?: string; priority?: TaskPriority }) => void;
  onDelete: (id: string) => void;
}

export default function TaskList({ tasks, onToggle, onEdit, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-sm text-[var(--color-ink)]">Nothing planned for this day yet.</p>
        <p className="text-xs text-[var(--color-muted)] mt-1">Add a task above to get started.</p>
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