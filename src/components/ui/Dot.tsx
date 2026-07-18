interface DotProps {
  color?: "primary" | "today" | "muted" | "white";
  className?: string;
}

const COLOR_MAP: Record<NonNullable<DotProps["color"]>, string> = {
  primary: "var(--color-primary)",
  today: "var(--color-today)",
  muted: "var(--color-muted)",
  white: "#FFFFFF",
};

/** Small filled circle used as a status/marker indicator (e.g. "today", active nav item, task count). */
export default function Dot({ color = "today", className = "" }: DotProps) {
  return (
    <span
      className={`inline-block rounded-full ${className}`}
      style={{ backgroundColor: COLOR_MAP[color] }}
    />
  );
}