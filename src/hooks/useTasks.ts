"use client";

import { useContext, useCallback } from "react";
import { TasksContext } from "@/context/TasksContext";
import { Task } from "@/types/task";
import { generateId } from "@/lib/id";

export function useTasks() {
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }

  const { tasksByDate, dispatch } = context;

  const getTasksForDate = useCallback(
    (dateKey: string): Task[] => tasksByDate[dateKey] ?? [],
    [tasksByDate]
  );

  const addTask = useCallback(
    (dateKey: string, title: string) => {
      const task: Task = { id: generateId(), title, completed: false };
      dispatch({ type: "ADD_TASK", dateKey, task });
    },
    [dispatch]
  );

  const toggleTask = useCallback(
    (dateKey: string, taskId: string) => {
      dispatch({ type: "TOGGLE_TASK", dateKey, taskId });
    },
    [dispatch]
  );

  const deleteTask = useCallback(
    (dateKey: string, taskId: string) => {
      dispatch({ type: "DELETE_TASK", dateKey, taskId });
    },
    [dispatch]
  );

  return { getTasksForDate, addTask, toggleTask, deleteTask };
}