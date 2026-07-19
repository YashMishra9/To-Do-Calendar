import { redirect } from "next/navigation";
import { auth } from "../../auth";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import StatsGrid from "@/components/dashboard/StatsGrid";
import WeeklyChart from "@/components/dashboard/WeeklyChart";
import CategoryBreakdown from "@/components/dashboard/CategoryBreakdown";
import UpcomingDeadlines from "@/components/dashboard/UpcomingDeadlines";
import RecentActivity from "@/components/dashboard/RecentActivity";
import QuickActions from "@/components/dashboard/QuickActions";
import EmptyDashboardState from "@/components/dashboard/EmptyDashboardState";
import {
  getDashboardStats,
  getWeeklyProductivity,
  getCategoryBreakdown,
  getUpcomingDeadlines,
  getRecentActivity,
} from "@/lib/dashboard";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const userId = session.user.id;

  const [stats, weekly, categories, upcoming, activity] = await Promise.all([
    getDashboardStats(userId),
    getWeeklyProductivity(userId),
    getCategoryBreakdown(userId),
    getUpcomingDeadlines(userId),
    getRecentActivity(userId),
  ]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-8">
          <QuickActions />
          {stats.totalTasks === 0 ? (
            <EmptyDashboardState />
          ) : (
            <>
              <StatsGrid stats={stats} />
              <div className="flex flex-col lg:flex-row gap-6 mb-6">
                <WeeklyChart data={weekly} />
                <CategoryBreakdown data={categories} />
              </div>
              <div className="flex flex-col lg:flex-row gap-6">
                <UpcomingDeadlines tasks={upcoming} />
                <RecentActivity activity={activity} />
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}