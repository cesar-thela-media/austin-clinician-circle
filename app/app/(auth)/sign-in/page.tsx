"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setError("");
    // TODO: wire to BetterAuth
  }

  return (
    <div className="w-full max-w-sm">
      <div className="mb-8">
        <h1
          className="mb-2"
          style={{
            fontFamily: "var(--font-serif), Georgia, serif",
            fontSize: "2rem",
            fontWeight: 400,
            color: "var(--color-sage-900)",
          }}
        >
          Welcome back.
        </h1>
        <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
          Sign in to your ACC member account.
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
          <Link
            href="#"
            className="text-xs underline"
            style={{
              color: "var(--color-sage-600)",
              textUnderlineOffset: "3px",
            }}
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" className="w-full mt-2">
          Sign in
        </Button>
      </form>

      <div
        className="mt-8 pt-6 border-t text-sm text-center"
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
          Apply for membership
        </Link>
      </div>
    </div>
  );
}
