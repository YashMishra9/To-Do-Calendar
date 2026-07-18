export default function TasksPlaceholder() {
    return (
      <div className="w-80 shrink-0 border border-[var(--color-border)] rounded-lg bg-white p-6 min-h-[420px] flex items-center justify-center">
        <p className="text-sm text-[var(--color-muted)] font-mono-stamp">
          Today&apos;s tasks — coming next
        </p>
      </div>
    );
  }