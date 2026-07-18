import { TaskCategory } from "@/types/task";

export const TASK_CATEGORIES: TaskCategory[] = ["Study", "Work", "Personal", "Health"];

export const CATEGORY_STYLES: Record<TaskCategory, { bg: string; text: string }> = {
  Study: { bg: "#EEF2FF", text: "#4338CA" },
  Work: { bg: "#E8F0EC", text: "#2D5A4A" },
  Personal: { bg: "#FDF2E9", text: "#C2620C" },
  Health: { bg: "#FDECEC", text: "#B91C1C" },
}; 