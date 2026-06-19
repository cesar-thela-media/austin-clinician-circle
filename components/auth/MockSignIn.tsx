"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const PARCHMENT = "#F0EDE6";
const SAGE_800 = "#2D3B2C";
const AMBER = "#C2963A";

type Props = {
  redirectTo?: string;
};

export function MockSignIn({ redirectTo = "/dashboard" }: Props) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Please enter your name and email.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/mock-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });
      if (res.ok) {
        router.push(redirectTo);
        router.refresh();
      } else {
        setError("Sign in failed. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="w-full max-w-md rounded-2xl p-8 flex flex-col gap-6"
      style={{
        background: "#fff",
        border: "1px solid rgba(194,150,58,0.15)",
        boxShadow: "0 4px 24px rgba(45,59,44,0.10)",
      }}
    >
      {/* Demo badge */}
      <div
        className="inline-flex self-start items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium uppercase tracking-[0.2em]"
        style={{ background: "rgba(194,150,58,0.10)", color: AMBER }}
      >
        Demo mode
      </div>

      <div>
        <h1
          style={{
            fontFamily: "var(--font-serif), Georgia, serif",
            fontSize: "clamp(1.8rem, 3vw, 2.25rem)",
            fontWeight: 400,
            letterSpacing: "-0.018em",
            lineHeight: 1.18,
            color: SAGE_800,
            marginBottom: "0.5rem",
          }}
        >
          Sign in to The Circle
        </h1>
        <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
          Clerk auth isn&apos;t configured — enter any name and email to access the member dashboard.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--color-text-primary)" }}>
            Full name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Smith"
            required
            className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all"
            style={{
              border: "1px solid rgba(194,150,58,0.22)",
              background: "#fff",
              color: "var(--color-text-primary)",
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = AMBER; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(194,150,58,0.22)"; }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--color-text-primary)" }}>
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@example.com"
            required
            className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all"
            style={{
              border: "1px solid rgba(194,150,58,0.22)",
              background: "#fff",
              color: "var(--color-text-primary)",
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = AMBER; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(194,150,58,0.22)"; }}
          />
        </div>

        {error && (
          <p className="text-sm" style={{ color: "var(--color-error)" }}>{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full text-sm font-medium py-3 transition-opacity hover:opacity-90 disabled:opacity-60"
          style={{ background: AMBER, color: "#fff" }}
        >
          {loading ? "Signing in…" : "Sign in →"}
        </button>
      </form>

      <p className="text-xs text-center" style={{ color: "var(--color-text-tertiary)" }}>
        To enable real auth, add <code className="font-mono">NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code> and{" "}
        <code className="font-mono">CLERK_SECRET_KEY</code> to your environment.
      </p>
    </div>
  );
}
