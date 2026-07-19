import Link from "next/link";

export default function EmptyDashboardState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-24 text-center">
      <h2 className="text-lg font-semibold mb-2">Welcome to your planner</h2>
      <p className="text-sm text-[var(--color-muted)] mb-6 max-w-sm">
        You haven&apos;t added any tasks yet. Once you do, your stats, weekly
        progress, and upcoming deadlines will show up here.
      </p>
      <Link
        href="/planner?new=true"
        className="px-4 py-2 text-sm font-medium text-white rounded-md"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        + Add your first task
      </Link>
    </div>
  );
}