import Panel from "@/components/ui/Panel";
import { RecentActivityData } from "@/lib/dashboard";

interface RecentActivityProps {
  activity: RecentActivityData;
}

function formatRelativeTime(iso: string): string {
  const date = new Date(iso);
  const diffMins = Math.round((Date.now() - date.getTime()) / 60000);
  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.round(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.round(diffHours / 24);
  return `${diffDays}d ago`;
}

export default function RecentActivity({ activity }: RecentActivityProps) {
  const hasActivity = activity.recentlyCreated.length > 0 || activity.recentlyCompleted.length > 0;

  if (!hasActivity) {
    return (
      <Panel className="flex-1">
        <h3 className="text-sm font-semibold mb-4">Recent Activity</h3>
        <p className="text-sm text-[var(--color-muted)] text-center py-8">
          Your activity will show up here once you start adding tasks.
        </p>
      </Panel>
    );
  }

  return (
    <Panel className="flex-1">
      <h3 className="text-sm font-semibold mb-4">Recent Activity</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-medium text-[var(--color-muted)] mb-2">Recently Added</p>
          {activity.recentlyCreated.length === 0 ? (
            <p className="text-xs text-[var(--color-muted)]">Nothing yet.</p>
          ) : (
            <ul className="flex flex-col gap-1.5">
              {activity.recentlyCreated.map((task) => (
                <li key={task.id} className="flex items-center gap-2 text-xs">
                  <span className="flex-1 min-w-0 truncate text-[var(--color-ink)]">{task.title}</span>
                  <span className="text-[var(--color-muted)] flex-shrink-0">
                    {formatRelativeTime(task.timestamp)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <p className="text-xs font-medium text-[var(--color-muted)] mb-2">Recently Completed</p>
          {activity.recentlyCompleted.length === 0 ? (
            <p className="text-xs text-[var(--color-muted)]">Nothing yet.</p>
          ) : (
            <ul className="flex flex-col gap-1.5">
              {activity.recentlyCompleted.map((task) => (
                <li key={task.id} className="flex items-center gap-2 text-xs">
                  <span className="flex-1 min-w-0 truncate text-[var(--color-muted)] line-through">
                    {task.title}
                  </span>
                  <span className="text-[var(--color-muted)] flex-shrink-0">
                    {formatRelativeTime(task.timestamp)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Panel>
  );
}