"use client";

import { useContext, useCallback } from "react";
import { TasksContext } from "@/context/TasksContext";
import { Task } from "@/types/task";

export function useTasks() {
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }

  const { tasksByDate, addTask, toggleTask, editTask, deleteTask } = context;

  const getTasksForDate = useCallback(
    (dateKey: string): Task[] => tasksByDate[dateKey] ?? [],
    [tasksByDate]
  );

  return { getTasksForDate, addTask, toggleTask, editTask, deleteTask };
}