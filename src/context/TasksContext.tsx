"use client";

import { createContext, useReducer, useEffect, ReactNode, Dispatch } from "react";
import { TasksByDate, TaskAction } from "@/types/task";
import { loadTasksFromStorage, saveTasksToStorage } from "@/lib/storage";

function tasksReducer(state: TasksByDate, action: TaskAction): TasksByDate {
  switch (action.type) {
    case "ADD_TASK": {
      const existing = state[action.dateKey] ?? [];
      return {
        ...state,
        [action.dateKey]: [...existing, action.task],
      };
    }
    case "TOGGLE_TASK": {
      const existing = state[action.dateKey] ?? [];
      return {
        ...state,
        [action.dateKey]: existing.map((task) =>
          task.id === action.taskId ? { ...task, completed: !task.completed } : task
        ),
      };
    }
    case "DELETE_TASK": {
      const existing = state[action.dateKey] ?? [];
      return {
        ...state,
        [action.dateKey]: existing.filter((task) => task.id !== action.taskId),
      };
    }
    case "LOAD_TASKS": {
      return action.tasksByDate;
    }
    default:
      return state;
  }
}

interface TasksContextValue {
  tasksByDate: TasksByDate;
  dispatch: Dispatch<TaskAction>;
}

export const TasksContext = createContext<TasksContextValue | null>(null);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasksByDate, dispatch] = useReducer(tasksReducer, {});

  // Load saved tasks from localStorage once, when the app first mounts.
  useEffect(() => {
    const stored = loadTasksFromStorage();
    dispatch({ type: "LOAD_TASKS", tasksByDate: stored });
  }, []);

  // Persist to localStorage every time tasks change.
  useEffect(() => {
    saveTasksToStorage(tasksByDate);
  }, [tasksByDate]);

  return (
    <TasksContext.Provider value={{ tasksByDate, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
}