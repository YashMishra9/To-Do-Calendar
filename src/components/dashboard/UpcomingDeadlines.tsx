import Panel from "@/components/ui/Panel";
import { UpcomingTask } from "@/lib/dashboard";
import CategoryBadge from "@/components/tasks/CategoryBadge";
import PriorityBadge from "@/components/tasks/PriorityBadge";

interface UpcomingDeadlinesProps {
  tasks: UpcomingTask[];
}

export default function UpcomingDeadlines({ tasks }: UpcomingDeadlinesProps) {
  return (
    <Panel className="flex-1">
      <h3 className="text-sm font-semibold mb-4">Upcoming Deadlines</h3>
      {tasks.length === 0 ? (
        <p className="text-sm text-[var(--color-muted)] text-center py-8">
          No upcoming deadlines. You&apos;re all caught up.
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center gap-2 py-1.5 border-b border-[var(--color-border)] last:border-b-0"
            >
              <span className="flex-1 min-w-0 text-sm truncate">{task.title}</span>
              {task.dueTime && (
                <span className="text-xs font-mono-stamp text-[var(--color-muted)]">{task.dueTime}</span>
              )}
              <PriorityBadge priority={task.priority} />
              <CategoryBadge category={task.category} />
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}