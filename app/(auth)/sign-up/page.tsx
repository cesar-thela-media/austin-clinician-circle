"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const licenseTypes = ["LPC", "LCSW", "LMFT", "PhD", "PsyD", "LPC-A", "Other"];

export default function SignUpPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
    licenseType: "",
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  function set(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: "" }));
  }

  function validate() {
    const e: Partial<typeof form> = {};
    if (!form.firstName) e.firstName = "Required";
    if (!form.lastName) e.lastName = "Required";
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email";
    if (!form.password || form.password.length < 8)
      e.password = "Password must be at least 8 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords do not match";
    if (!form.licenseType) e.licenseType = "Select your license type";
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    // TODO: wire to BetterAuth
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-8">
        <h1
          className="mb-2"
          style={{
            fontFamily: "var(--font-serif), Manrope, sans-serif",
            fontSize: "2rem",
            fontWeight: 400,
            color: "var(--color-sage-900)",
          }}
        >
          Create your account.
        </h1>
        <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
          Already a member?{" "}
          <Link
            href="/sign-in"
            className="font-medium underline"
            style={{
              color: "var(--color-sage-700)",
              textUnderlineOffset: "3px",
            }}
          >
            Sign in
          </Link>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="First name"
            value={form.firstName}
            onChange={(e) => set("firstName", e.target.value)}
            placeholder="Jane"
            error={errors.firstName}
          />
          <Input
            label="Last name"
            value={form.lastName}
            onChange={(e) => set("lastName", e.target.value)}
            placeholder="Smith"
            error={errors.lastName}
          />
        </div>

        <Input
          label="Email address"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
          placeholder="jane@example.com"
          error={errors.email}
        />

        <div>
          <label
            className="block text-sm font-medium mb-1.5"
            style={{ color: "var(--color-text-primary)" }}
          >
            License type
          </label>
          <div className="flex flex-wrap gap-2">
            {licenseTypes.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => set("licenseType", t)}
                className="px-3 py-1.5 rounded text-xs font-medium transition-colors"
                style={{
                  background:
                    form.licenseType === t
                      ? "var(--color-sage-700)"
                      : "var(--color-sage-50)",
                  color:
                    form.licenseType === t ? "#fff" : "var(--color-sage-700)",
                  border:
                    form.licenseType === t
                      ? "none"
                      : "1px solid var(--color-cream-300)",
                }}
              >
                {t}
              </button>
            ))}
          </div>
          {errors.licenseType && (
            <p
              className="text-xs mt-1"
              style={{ color: "var(--color-error)" }}
            >
              {errors.licenseType}
            </p>
          )}
        </div>

        <Input
          label="Password"
          type="password"
          autoComplete="new-password"
          value={form.password}
          onChange={(e) => set("password", e.target.value)}
          placeholder="At least 8 characters"
          error={errors.password}
        />

        <Input
          label="Confirm password"
          type="password"
          autoComplete="new-password"
          value={form.confirm}
          onChange={(e) => set("confirm", e.target.value)}
          placeholder="••••••••"
          error={errors.confirm}
        />

        <Button type="submit" className="w-full mt-2">
          Create account
        </Button>
      </form>

      <p
        className="mt-6 text-xs text-center leading-relaxed"
        style={{ color: "var(--color-text-tertiary)" }}
      >
        By creating an account you agree to our terms of service and privacy
        policy.
      </p>
    </div>
  );
}
