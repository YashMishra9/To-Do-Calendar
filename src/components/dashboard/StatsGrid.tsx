import StatCard from "./StatCard";
import { DashboardStats } from "@/lib/dashboard";

interface StatsGridProps {
  stats: DashboardStats;
}

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
      <StatCard label="Total Tasks" value={stats.totalTasks} />
      <StatCard label="Completed" value={stats.completedTasks} accent="primary" />
      <StatCard label="Pending" value={stats.pendingTasks} accent="today" />
      <StatCard label="Due Today" value={stats.dueToday} accent="today" />
      <StatCard label="High Priority" value={stats.highPriorityPending} />
      <StatCard label="Completion Rate" value={`${stats.completionPercentage}%`} accent="primary" />
    </div>
  );
}