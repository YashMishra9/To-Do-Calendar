export type TaskCategory = "Study" | "Work" | "Personal" | "Health";
export type TaskPriority = "High" | "Medium" | "Low";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  category: TaskCategory;
  priority: TaskPriority;
  dueTime?: string | null;
}

export type TasksByDate = Record<string, Task[]>;

export interface TaskUpdates {
  title?: string;
  category?: TaskCategory;
  priority?: TaskPriority;
  dueTime?: string | null;
  completed?: boolean;
}