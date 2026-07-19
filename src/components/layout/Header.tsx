import Dot from "@/components/ui/Dot";
import { formatFullDate } from "@/lib/date";
import UserMenu from "./UserMenu";

export default function Header() {
  const today = new Date();

  return (
    <header className="flex items-center justify-between px-8 py-5 border-b border-[var(--color-border)] bg-white">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Today</h1>
        <p className="text-sm font-mono-stamp text-[var(--color-muted)] mt-0.5">
          {formatFullDate(today)}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Dot color="today" className="w-2 h-2" />
          <span className="text-sm text-[var(--color-muted)]">On track</span>
        </div>
        <UserMenu />
      </div>
    </header>
  );
}