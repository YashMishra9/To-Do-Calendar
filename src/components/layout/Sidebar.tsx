import Dot from "@/components/ui/Dot";

const navItems = [
  { label: "Today", active: true },
  { label: "Calendar", active: false },
  { label: "Tasks", active: false },
  { label: "Settings", active: false },
];

export default function Sidebar() {
  return (
    <aside className="w-56 shrink-0 border-r border-[var(--color-border)] bg-white h-screen sticky top-0 flex flex-col">
      <div className="px-5 py-6">
        <span className="text-lg font-semibold tracking-tight" style={{ color: "var(--color-primary)" }}>
          Planner
        </span>
      </div>
      <nav className="flex-1 px-3">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.label}>
              <div
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm cursor-pointer transition-colors ${
                  item.active
                    ? "bg-[var(--color-primary-light)] text-[var(--color-primary)] font-medium"
                    : "text-[var(--color-muted)] hover:bg-neutral-50"
                }`}
              >
                {item.active && <Dot color="today" className="w-1.5 h-1.5" />}
                {item.label}
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}