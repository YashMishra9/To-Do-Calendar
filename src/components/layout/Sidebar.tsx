"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Dot from "@/components/ui/Dot";

const navItems = [
  { label: "Dashboard", href: "/" },
  { label: "Planner", href: "/planner" },
  { label: "Settings", href: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 border-r border-[var(--color-border)] bg-white h-screen sticky top-0 flex flex-col">
      <div className="px-5 py-6">
        <span className="text-lg font-semibold tracking-tight" style={{ color: "var(--color-primary)" }}>
          Planner
        </span>
      </div>
      <nav className="flex-1 px-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                    isActive
                      ? "bg-[var(--color-primary-light)] text-[var(--color-primary)] font-medium"
                      : "text-[var(--color-muted)] hover:bg-neutral-50"
                  }`}
                >
                  {isActive && <Dot color="today" className="w-1.5 h-1.5" />}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}