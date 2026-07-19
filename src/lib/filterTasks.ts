import { Task, TaskCategory, TaskPriority } from "@/types/task";

export type StatusFilter = "All" | "Pending" | "Completed";

export interface TaskFilterState {
  search: string;
  status: StatusFilter;
  category: TaskCategory | "All";
  priority: TaskPriority | "All";
}

export function filterTasks(tasks: Task[], filters: TaskFilterState): Task[] {
  const query = filters.search.trim().toLowerCase();

  return tasks.filter((task) => {
    if (filters.status === "Pending" && task.completed) return false;
    if (filters.status === "Completed" && !task.completed) return false;
    if (filters.category !== "All" && task.category !== filters.category) return false;
    if (filters.priority !== "All" && task.priority !== filters.priority) return false;
    if (query && !task.title.toLowerCase().includes(query)) return false;
    return true;
  });
}