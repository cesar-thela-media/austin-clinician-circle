import { type ReactNode } from "react";

type BadgeVariant = "default" | "success" | "warning" | "error" | "gold" | "blush";

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, { background: string; color: string }> = {
  default: { background: "rgba(228,235,230,0.7)", color: "var(--color-sage-700)" },
  success: { background: "rgba(74,124,89,0.12)", color: "var(--color-success)" },
  warning: { background: "rgba(201,169,110,0.18)", color: "var(--color-warning)" },
  error:   { background: "rgba(181,75,75,0.12)", color: "var(--color-error)" },
  gold:    { background: "rgba(201,169,110,0.12)", color: "var(--color-gold)" },
  blush:   { background: "var(--color-blush)", color: "var(--color-text-primary)" },
};

export function Badge({
  variant = "default",
  children,
  className = "",
}: BadgeProps) {
  const { background, color } = variantStyles[variant];
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-medium ${className}`}
      style={{ background, color }}
    >
      {children}
    </span>
  );
}
