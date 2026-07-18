import { ReactNode } from "react";

interface PanelProps {
  children: ReactNode;
  className?: string;
}

/** Shared card/panel wrapper used across the dashboard (calendar, tasks, etc). */
export default function Panel({ children, className = "" }: PanelProps) {
  return (
    <div className={`border border-[var(--color-border)] rounded-lg bg-white p-6 ${className}`}>
      {children}
    </div>
  );
}