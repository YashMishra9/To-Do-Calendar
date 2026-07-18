import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "icon";
}

/** Shared button styles, reused across calendar controls and the task input. */
export default function Button({
  variant = "primary",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const variantClasses =
    variant === "primary"
      ? "px-4 py-2 text-sm font-medium text-white rounded-md"
      : "w-8 h-8 rounded-md border border-[var(--color-border)] flex items-center justify-center hover:bg-neutral-50 text-[var(--color-muted)]";

  const style = variant === "primary" ? { backgroundColor: "var(--color-primary)" } : undefined;

  return (
    <button className={`${variantClasses} ${className}`} style={style} {...rest}>
      {children}
    </button>
  );
}