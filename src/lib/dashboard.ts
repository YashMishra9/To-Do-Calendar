import { prisma } from "@/lib/prisma";
import { toDateKey } from "@/lib/date";
import { TaskCategory, TaskPriority } from "@/types/task";

export interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  dueToday: number;
  highPriorityPending: number;
  completionPercentage: number;
}

export async function getDashboardStats(userId: string): Promise<DashboardStats> {
  const todayKey = toDateKey(new Date());

  const [totalTasks, completedTasks, dueToday, highPriorityPending] = await Promise.all([
    prisma.task.count({ where: { userId } }),
    prisma.task.count({ where: { userId, completed: true } }),
    prisma.task.count({ where: { userId, dateKey: todayKey } }),
    prisma.task.count({ where: { userId, priority: "High", completed: false } }),
  ]);

  const pendingTasks = totalTasks - completedTasks;
  const completionPercentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return { totalTasks, completedTasks, pendingTasks, dueToday, highPriorityPending, completionPercentage };
}

export interface WeeklyDataPoint {
  label: string;
  dateKey: string;
  count: number;
}

export async function getWeeklyProductivity(userId: string): Promise<WeeklyDataPoint[]> {
  const days: WeeklyDataPoint[] = [];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    days.push({
      label: date.toLocaleDateString("en-US", { weekday: "short" }),
      dateKey: toDateKey(date),
      count: 0,
    });
  }

  const rangeStart = new Date(today);
  rangeStart.setDate(rangeStart.getDate() - 6);
  rangeStart.setHours(0, 0, 0, 0);

  const completed = await prisma.task.findMany({
    where: { userId, completed: true, completedAt: { gte: rangeStart } },
    select: { completedAt: true },
  });

  for (const task of completed) {
    if (!task.completedAt) continue;
    const key = toDateKey(new Date(task.completedAt));
    const day = days.find((d) => d.dateKey === key);
    if (day) day.count += 1;
  }

  return days;
}

export interface CategoryBreakdownItem {
  category: TaskCategory;
  count: number;
  percentage: number;
}

export async function getCategoryBreakdown(userId: string): Promise<CategoryBreakdownItem[]> {
  const grouped = await prisma.task.groupBy({
    by: ["category"],
    where: { userId },
    _count: { _all: true },
  });

  const total = grouped.reduce((sum, g) => sum + g._count._all, 0);

  return grouped
    .map((g) => ({
      category: g.category as TaskCategory,
      count: g._count._all,
      percentage: total === 0 ? 0 : Math.round((g._count._all / total) * 100),
    }))
    .sort((a, b) => b.count - a.count);
}

export interface UpcomingTask {
  id: string;
  title: string;
  category: TaskCategory;
  priority: TaskPriority;
  dueTime: string | null;
  dateKey: string;
}

export async function getUpcomingDeadlines(userId: string): Promise<UpcomingTask[]> {
  const todayKey = toDateKey(new Date());

  const tasks = await prisma.task.findMany({
    where: { userId, completed: false, dateKey: { gte: todayKey } },
  });

  const sorted = tasks.sort((a, b) => {
    if (a.dateKey !== b.dateKey) return a.dateKey < b.dateKey ? -1 : 1;
    if (a.dueTime && b.dueTime) return a.dueTime < b.dueTime ? -1 : a.dueTime > b.dueTime ? 1 : 0;
    if (a.dueTime) return -1;
    if (b.dueTime) return 1;
    return 0;
  });

  return sorted.slice(0, 5).map((t) => ({
    id: t.id,
    title: t.title,
    category: t.category as TaskCategory,
    priority: t.priority as TaskPriority,
    dueTime: t.dueTime,
    dateKey: t.dateKey,
  }));
}

export interface ActivityTask {
  id: string;
  title: string;
  timestamp: string;
}

export interface RecentActivityData {
  recentlyCreated: ActivityTask[];
  recentlyCompleted: ActivityTask[];
}

export async function getRecentActivity(userId: string): Promise<RecentActivityData> {
  const [created, completed] = await Promise.all([
    prisma.task.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.task.findMany({
      where: { userId, completed: true, completedAt: { not: null } },
      orderBy: { completedAt: "desc" },
      take: 5,
    }),
  ]);

  return {
    recentlyCreated: created.map((t) => ({ id: t.id, title: t.title, timestamp: t.createdAt.toISOString() })),
    recentlyCompleted: completed.map((t) => ({
      id: t.id,
      title: t.title,
      timestamp: t.completedAt!.toISOString(),
    })),
  };
}