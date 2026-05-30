"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

// Mock accounts; replace with BetterAuth when backend is wired
const MOCK_ACCOUNTS: Record<string, { password: string; redirect: string }> = {
  "jane@acc.com":    { password: "demo",    redirect: "/dashboard" },
  "sarah@acc.com":   { password: "founder", redirect: "/admin" },
};

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    const account = MOCK_ACCOUNTS[email.toLowerCase().trim()];
    if (account && account.password === password) {
      router.push(account.redirect);
      return;
    }
    setError("Incorrect email or password.");
  }

  return (
    <div className="w-full max-w-md">
      {/* Quick access: one-click demo accounts */}
      <div
        className="mb-8 p-4 rounded-2xl"
        style={{
          background: "var(--color-sage-50)",
          border: "1px solid rgba(197,200,190,0.35)",
        }}
      >
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-3"
          style={{ color: "var(--color-sage-600)" }}
        >
          Demo: quick access
        </p>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="w-full text-left px-4 py-3 rounded-xl transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            style={{ background: "var(--color-sage-700)" }}
          >
            <p className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.65)" }}>
              Member account
            </p>
            <p className="text-sm font-medium" style={{ color: "#fff" }}>
              Jane: Member Dashboard →
            </p>
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="w-full text-left px-4 py-3 rounded-xl transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            style={{ background: "var(--color-sage-900)" }}
          >
            <p className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.5)" }}>
              Founder account
            </p>
            <p className="text-sm font-medium" style={{ color: "#fff" }}>
              Sarah Arnold: Admin Panel →
            </p>
          </button>
        </div>
      </div>

      <div className="mb-8">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-base mb-5"
          style={{ background: "var(--color-sage-100)", color: "var(--color-sage-600)" }}
        >
          ◉
        </div>
        <h1 className="text-page-title mb-2">
          Welcome back.
        </h1>
        <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
          Sign in to The Circle.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Email address"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
          placeholder="jane@example.com"
        />
        <Input
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (error) setError("");
          }}
          placeholder="••••••••"
        />

        {error && (
          <p className="text-xs" style={{ color: "var(--color-error)" }}>
            {error}
          </p>
        )}

        <div className="flex items-center justify-between mt-1">
          {showForgot ? (
            <p className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>
              Password reset will be available once the backend is connected. In the meantime, use the demo accounts above.
            </p>
          ) : (
            <button
              type="button"
              onClick={() => setShowForgot(true)}
              className="text-xs underline text-left"
              style={{
                color: "var(--color-sage-600)",
                textUnderlineOffset: "3px",
              }}
            >
              Forgot password?
            </button>
          )}
        </div>

        <Button type="submit" className="w-full mt-2">
          Sign in
        </Button>
      </form>

      <div
        className="mt-6 pt-6 border-t text-sm text-center"
        style={{
          borderColor: "var(--color-cream-300)",
          color: "var(--color-text-secondary)",
        }}
      >
        Not a member yet?{" "}
        <Link
          href="/join"
          className="font-medium underline"
          style={{
            color: "var(--color-sage-700)",
            textUnderlineOffset: "3px",
          }}
        >
          Join the circle
        </Link>
      </div>
    </div>
  );
}
