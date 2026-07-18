import { Task } from "@/types/task";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
}

export default function TaskItem({ task, onToggle }: TaskItemProps) {
  return (
    <li className="flex items-center gap-3 py-2 border-b border-[var(--color-border)] last:border-b-0">
      <button
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? "Mark as not done" : "Mark as done"}
        className={`w-4 h-4 rounded-full border flex-shrink-0 ${
          task.completed
            ? "bg-[var(--color-primary)] border-[var(--color-primary)]"
            : "border-[var(--color-muted)]"
        }`}
      />
      <span
        className={`text-sm ${
          task.completed ? "line-through text-[var(--color-muted)]" : "text-[var(--color-ink)]"
        }`}
      >
        {task.title}
      </span>
    </li>
  );
}