import { TaskPriority } from "@/types/task";

export const TASK_PRIORITIES: TaskPriority[] = ["High", "Medium", "Low"];

export const PRIORITY_STYLES: Record<TaskPriority, { bg: string; text: string }> = {
  High: { bg: "#FDECEC", text: "#B91C1C" },
  Medium: { bg: "#FDF2E9", text: "#C2620C" },
  Low: { bg: "#E8F0EC", text: "#2D5A4A" },
};

/** Used for sorting: lower number = higher priority. */
export const PRIORITY_ORDER: Record<TaskPriority, number> = {
  High: 0,
  Medium: 1,
  Low: 2,
};  