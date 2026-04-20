import { type ReactNode } from "react";

type BadgeVariant = "default" | "success" | "warning" | "error" | "gold";

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, { background: string; color: string }> = {
  default: { background: "var(--color-sage-50)", color: "var(--color-sage-700)" },
  success: { background: "#EBF5EE", color: "var(--color-success)" },
  warning: { background: "#FDF3E3", color: "#C4932A" },
  error: { background: "#FAEAEA", color: "var(--color-error)" },
  gold: { background: "#FBF5EA", color: "var(--color-gold)" },
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
