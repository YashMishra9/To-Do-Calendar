import { TasksByDate } from "@/types/task";

const TASKS_STORAGE_KEY = "planner:tasksByDate";

/** Reads tasks from localStorage. Returns an empty object if nothing is stored or parsing fails. */
export function loadTasksFromStorage(): TasksByDate {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.localStorage.getItem(TASKS_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as TasksByDate;
  } catch {
    return {};
  }
}

/** Writes tasks to localStorage. Fails silently (e.g. storage full or disabled). */
export function saveTasksToStorage(tasksByDate: TasksByDate): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasksByDate));
  } catch {
    // Ignore write failures (private browsing, storage quota, etc.)
  }
}