"use client";

import { createContext, useState, useEffect, useCallback, ReactNode } from "react";
import { Task, TasksByDate, TaskCategory, TaskPriority, TaskUpdates } from "@/types/task";

interface RawTask extends Task {
  dateKey: string;
}

interface TasksContextValue {
  tasksByDate: TasksByDate;
  addTask: (dateKey: string, title: string, category: TaskCategory, priority: TaskPriority, dueTime?: string) => Promise<void>;
  toggleTask: (dateKey: string, taskId: string) => Promise<void>;
  editTask: (dateKey: string, taskId: string, updates: TaskUpdates) => Promise<void>;
  deleteTask: (dateKey: string, taskId: string) => Promise<void>;
}

export const TasksContext = createContext<TasksContextValue | null>(null);

function groupByDate(tasks: RawTask[]): TasksByDate {
  const grouped: TasksByDate = {};
  for (const { dateKey, ...task } of tasks) {
    if (!grouped[dateKey]) grouped[dateKey] = [];
    grouped[dateKey].push(task);
  }
  return grouped;
}

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasksByDate, setTasksByDate] = useState<TasksByDate>({});

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => (res.ok ? res.json() : []))
      .then((data: RawTask[]) => setTasksByDate(groupByDate(data)));
  }, []);

  const addTask = useCallback(
    async (dateKey: string, title: string, category: TaskCategory, priority: TaskPriority, dueTime?: string) => {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, category, priority, dueTime, dateKey }),
      });
      if (!res.ok) return;
      const created: RawTask = await res.json();
      const { dateKey: _omit, ...task } = created;
      setTasksByDate((prev) => ({
        ...prev,
        [dateKey]: [...(prev[dateKey] ?? []), task],
      }));
    },
    []
  );

  const toggleTask = useCallback(
    async (dateKey: string, taskId: string) => {
      const current = tasksByDate[dateKey] ?? [];
      const target = current.find((t) => t.id === taskId);
      if (!target) return;

      const nextCompleted = !target.completed;

      setTasksByDate((prev) => ({
        ...prev,
        [dateKey]: (prev[dateKey] ?? []).map((t) =>
          t.id === taskId ? { ...t, completed: nextCompleted } : t
        ),
      }));

      await fetch(`/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: nextCompleted }),
      });
    },
    [tasksByDate]
  );

  const editTask = useCallback(async (dateKey: string, taskId: string, updates: TaskUpdates) => {
    setTasksByDate((prev) => ({
      ...prev,
      [dateKey]: (prev[dateKey] ?? []).map((t) => (t.id === taskId ? { ...t, ...updates } : t)),
    }));

    await fetch(`/api/tasks/${taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
  }, []);

  const deleteTask = useCallback(async (dateKey: string, taskId: string) => {
    setTasksByDate((prev) => ({
      ...prev,
      [dateKey]: (prev[dateKey] ?? []).filter((t) => t.id !== taskId),
    }));

    await fetch(`/api/tasks/${taskId}`, { method: "DELETE" });
  }, []);

  return (
    <TasksContext.Provider value={{ tasksByDate, addTask, toggleTask, editTask, deleteTask }}>
      {children}
    </TasksContext.Provider>
  );
}