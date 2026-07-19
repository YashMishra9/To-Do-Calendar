import Panel from "@/components/ui/Panel";
import { WeeklyDataPoint } from "@/lib/dashboard";

interface WeeklyChartProps {
  data: WeeklyDataPoint[];
}

export default function WeeklyChart({ data }: WeeklyChartProps) {
  const hasData = data.some((d) => d.count > 0);
  const maxCount = Math.max(...data.map((d) => d.count), 1);

  return (
    <Panel className="flex-1">
      <h3 className="text-sm font-semibold mb-4">Weekly Productivity</h3>
      {!hasData ? (
        <p className="text-sm text-[var(--color-muted)] text-center py-8">
          No completed tasks in the last 7 days yet.
        </p>
      ) : (
        <div className="flex items-end justify-between gap-2 h-32">
          {data.map((day) => (
            <div key={day.dateKey} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex items-end justify-center h-24">
                <div
                  className="w-full max-w-[28px] rounded-t-md transition-all"
                  style={{
                    height: `${(day.count / maxCount) * 100}%`,
                    minHeight: day.count > 0 ? "4px" : "0px",
                    backgroundColor: "var(--color-primary)",
                  }}
                  title={`${day.count} completed`}
                />
              </div>
              <span className="text-[10px] text-[var(--color-muted)]">{day.label}</span>
            </div>
          ))}
        </div>
      )}
    </Panel>
  );
}