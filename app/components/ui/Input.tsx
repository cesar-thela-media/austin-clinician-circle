"use client";

import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const baseStyles =
  "w-full bg-white border rounded-lg px-4 py-3 text-sm outline-none transition-colors duration-150 placeholder:text-[var(--color-text-tertiary)]";

const normalBorder =
  "border-[var(--color-cream-400)] focus:border-[var(--color-sage-700)]";
const errorBorder =
  "border-[var(--color-error)] focus:border-[var(--color-error)]";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            className="text-sm font-medium"
            style={{ color: "var(--color-text-primary)" }}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`${baseStyles} ${error ? errorBorder : normalBorder} ${className}`}
          style={{ color: "var(--color-text-primary)" }}
          {...props}
        />
        {error && (
          <p className="text-xs" style={{ color: "var(--color-error)" }}>
            {error}
          </p>
        )}
        {hint && !error && (
          <p className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>
            {hint}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            className="text-sm font-medium"
            style={{ color: "var(--color-text-primary)" }}
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`${baseStyles} ${error ? errorBorder : normalBorder} resize-none ${className}`}
          style={{ color: "var(--color-text-primary)" }}
          {...props}
        />
        {error && (
          <p className="text-xs" style={{ color: "var(--color-error)" }}>
            {error}
          </p>
        )}
        {hint && !error && (
          <p className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>
            {hint}
          </p>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
