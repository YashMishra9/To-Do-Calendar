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
  const { getTasksForDate, addTask, toggleTask } = useTasks();

  const dateKey = toDateKey(selectedDate);
  const tasksForDay = getTasksForDate(dateKey);

  return (
    <Panel className="w-80 shrink-0">
      <h2 className="text-base font-semibold mb-1">{formatFullDate(selectedDate)}</h2>
      <p className="text-xs text-[var(--color-muted)] mb-4">
        {tasksForDay.length} task{tasksForDay.length === 1 ? "" : "s"}
      </p>
      <TaskInput onAdd={(title) => addTask(dateKey, title)} />
      <TaskList tasks={tasksForDay} onToggle={(taskId) => toggleTask(dateKey, taskId)} />
    </Panel>
  );
}