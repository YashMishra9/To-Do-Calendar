export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

/** Maps a date key ("YYYY-MM-DD") to that day's list of tasks. */
export type TasksByDate = Record<string, Task[]>;

export type TaskAction =
  | { type: "ADD_TASK"; dateKey: string; task: Task }
  | { type: "TOGGLE_TASK"; dateKey: string; taskId: string }
  | { type: "DELETE_TASK"; dateKey: string; taskId: string }
  | { type: "LOAD_TASKS"; tasksByDate: TasksByDate };