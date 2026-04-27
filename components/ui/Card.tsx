"use client";
import { type HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({ hover = false, className = "", ...props }: CardProps) {
  return (
    <div
      className={`bg-white rounded-2xl p-6 ${
        hover
          ? "transition-all duration-300 hover:-translate-y-0.5"
          : ""
      } ${className}`}
      style={{
        border: "1px solid rgba(197, 200, 190, 0.5)",
        boxShadow: hover
          ? undefined
          : "0 2px 16px rgba(74, 93, 78, 0.07)",
      }}
      onMouseEnter={
        hover
          ? (e) => {
              (e.currentTarget as HTMLDivElement).style.boxShadow =
                "0 8px 36px rgba(74, 93, 78, 0.12)";
            }
          : undefined
      }
      onMouseLeave={
        hover
          ? (e) => {
              (e.currentTarget as HTMLDivElement).style.boxShadow =
                "0 2px 16px rgba(74, 93, 78, 0.07)";
            }
          : undefined
      }
      {...props}
    />
  );
}

