import { Task } from "@/types/task";
import { PRIORITY_ORDER } from "@/lib/priority";

export type TaskSortOption = "dueTime" | "priority" | "alphabetical" | "recent";

function sortByDueTime(tasks: Task[]): Task[] {
  const timed = tasks.filter((t) => t.dueTime);
  const untimed = tasks.filter((t) => !t.dueTime);

  const byTimeThenPriority = (a: Task, b: Task) => {
    if (a.dueTime !== b.dueTime) {
      return a.dueTime! < b.dueTime! ? -1 : 1;
    }
    return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
  };

  const sortedTimed = [...timed].sort(byTimeThenPriority);
  const sortedUntimed = [...untimed].sort(
    (a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
  );

  return [...sortedTimed, ...sortedUntimed];
}

/**
 * Sorts tasks by the given strategy. Assumes tasks arrive in creation order
 * (oldest first), which is how the API returns them.
 */
export function sortTasksBy(tasks: Task[], option: TaskSortOption): Task[] {
  switch (option) {
    case "priority":
      return [...tasks].sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]);
    case "alphabetical":
      return [...tasks].sort((a, b) => a.title.localeCompare(b.title));
    case "recent":
      return [...tasks].reverse();
    case "dueTime":
    default:
      return sortByDueTime(tasks);
  }
}