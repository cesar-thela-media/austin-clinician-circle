import { type ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "inverse" | "destructive";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-sage-700)] text-white hover:bg-[var(--color-sage-800)]",
  secondary:
    "bg-transparent text-[var(--color-sage-700)] border border-[var(--color-sage-700)] hover:bg-[var(--color-sage-50)] hover:border-[var(--color-sage-800)] hover:text-[var(--color-sage-800)]",
  ghost:
    "bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-cream-200)]",
  inverse:
    "bg-white text-[var(--color-sage-700)] hover:bg-[var(--color-cream-100)]",
  destructive: "bg-[var(--color-error)] text-white hover:opacity-90",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-4 text-sm",
  md: "h-10 px-6 text-sm",
  lg: "h-12 px-8 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full font-medium transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    />
  );
}
