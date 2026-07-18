import { Task } from "@/types/task";
import { PRIORITY_ORDER } from "@/lib/priority";

/**
 * Sorts tasks by due time ascending; tasks without a due time are placed
 * after timed tasks. Within each group (and for ties on the same due time),
 * sorts by priority: High → Medium → Low.
 */
export function sortTasksByDueTime(tasks: Task[]): Task[] {
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