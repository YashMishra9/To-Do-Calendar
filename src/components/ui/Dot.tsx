interface DotProps {
    color?: "primary" | "today";
    className?: string;
  }
  
  /** Small filled circle used as a status/marker indicator (e.g. "today", active nav item). */
  export default function Dot({ color = "today", className = "" }: DotProps) {
    const varName = color === "today" ? "--color-today" : "--color-primary";
    return (
      <span
        className={`inline-block rounded-full ${className}`}
        style={{ backgroundColor: `var(${varName})` }}
      />
    );
  }