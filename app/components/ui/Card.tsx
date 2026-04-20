import { type HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({ hover = false, className = "", ...props }: CardProps) {
  return (
    <div
      className={`bg-white rounded-2xl border p-6 shadow-md ${
        hover
          ? "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
          : ""
      } ${className}`}
      style={{ borderColor: "var(--color-cream-300)" }}
      {...props}
    />
  );
}
