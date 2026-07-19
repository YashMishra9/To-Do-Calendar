import Panel from "@/components/ui/Panel";
import { CategoryBreakdownItem } from "@/lib/dashboard";
import { CATEGORY_STYLES } from "@/lib/categories";

interface CategoryBreakdownProps {
  data: CategoryBreakdownItem[];
}

export default function CategoryBreakdown({ data }: CategoryBreakdownProps) {
  if (data.length === 0) {
    return (
      <Panel className="flex-1">
        <h3 className="text-sm font-semibold mb-4">Category Breakdown</h3>
        <p className="text-sm text-[var(--color-muted)] text-center py-8">
          Add tasks to see your category breakdown.
        </p>
      </Panel>
    );
  }

  return (
    <Panel className="flex-1">
      <h3 className="text-sm font-semibold mb-4">Category Breakdown</h3>
      <div className="flex flex-col gap-3">
        {data.map((item) => (
          <div key={item.category}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[var(--color-ink)]">{item.category}</span>
              <span className="text-[var(--color-muted)]">
                {item.count} ({item.percentage}%)
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-neutral-100 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${item.percentage}%`,
                  backgroundColor: CATEGORY_STYLES[item.category].text,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}