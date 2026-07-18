"use client";

import { toDateKey, formatFullDate } from "@/lib/date";
import { useTasks } from "@/hooks/useTasks";
import Panel from "@/components/ui/Panel";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";

interface TasksPanelProps {
  selectedDate: Date;
}

export default function TasksPanel({ selectedDate }: TasksPanelProps) {
  const { getTasksForDate, addTask, toggleTask, editTask, deleteTask } = useTasks();

  const dateKey = toDateKey(selectedDate);
  const tasksForDay = getTasksForDate(dateKey);

  return (
    <Panel className="w-80 shrink-0">
      <h2 className="text-base font-semibold mb-1">{formatFullDate(selectedDate)}</h2>
      <p className="text-xs text-[var(--color-muted)] mb-4">
        {tasksForDay.length} task{tasksForDay.length === 1 ? "" : "s"}
      </p>
      <TaskInput
        onAdd={(title, category, priority, dueTime) =>
          addTask(dateKey, title, category, priority, dueTime)
        }
      />
      <TaskList
        tasks={tasksForDay}
        onToggle={(taskId) => toggleTask(dateKey, taskId)}
        onEdit={(taskId, updates) => editTask(dateKey, taskId, updates)}
        onDelete={(taskId) => deleteTask(dateKey, taskId)}
      />
    </Panel>
  );
}