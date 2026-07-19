import Link from "next/link";

export default function QuickActions() {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Link
        href="/planner?new=true"
        className="px-4 py-2 text-sm font-medium text-white rounded-md"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        + Add Task
      </Link>
      <Link
        href="/planner"
        className="px-4 py-2 text-sm font-medium rounded-md border border-[var(--color-border)] text-[var(--color-ink)] hover:bg-neutral-50"
      >
        Jump to Today
      </Link>
      <Link
        href="/planner"
        className="px-4 py-2 text-sm font-medium rounded-md border border-[var(--color-border)] text-[var(--color-ink)] hover:bg-neutral-50"
      >
        Open Calendar
      </Link>
    </div>
  );
}