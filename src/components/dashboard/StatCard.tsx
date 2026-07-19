interface StatCardProps {
    label: string;
    value: string | number;
    accent?: "primary" | "today" | "muted";
  }
  
  const ACCENT_COLORS: Record<NonNullable<StatCardProps["accent"]>, string> = {
    primary: "var(--color-primary)",
    today: "var(--color-today)",
    muted: "var(--color-ink)",
  };
  
  export default function StatCard({ label, value, accent = "muted" }: StatCardProps) {
    return (
      <div className="border border-[var(--color-border)] rounded-lg bg-white p-4">
        <p className="text-xs text-[var(--color-muted)] mb-1">{label}</p>
        <p className="text-2xl font-semibold" style={{ color: ACCENT_COLORS[accent] }}>
          {value}
        </p>
      </div>
    );
  }