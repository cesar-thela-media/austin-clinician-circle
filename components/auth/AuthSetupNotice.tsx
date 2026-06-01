import Link from "next/link";
import { Card } from "@/components/ui/Card";

export function AuthSetupNotice() {
  return (
    <Card className="w-full max-w-md flex flex-col gap-4">
      <div>
        <p
          className="text-xs font-medium uppercase tracking-widest mb-2"
          style={{ color: "var(--color-sage-600)" }}
        >
          Setup required
        </p>
        <h1
          style={{
            fontFamily: "var(--font-serif), Manrope, sans-serif",
            fontSize: "2rem",
            fontWeight: 400,
            color: "var(--color-sage-900)",
          }}
        >
          Clerk sandbox isn&apos;t configured yet.
        </h1>
      </div>

      <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
        Add your Clerk development keys to <code>.env</code> to enable sign in,
        sign up, and protected member/admin routes.
      </p>

      <div
        className="rounded-2xl px-4 py-3 text-xs"
        style={{
          background: "var(--color-sage-50)",
          border: "1px solid var(--color-cream-300)",
          color: "var(--color-text-secondary)",
        }}
      >
        Required variables: <code>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code> and <code>CLERK_SECRET_KEY</code>.
      </div>

      <Link
        href="/join"
        className="text-sm font-medium underline"
        style={{ color: "var(--color-sage-700)", textUnderlineOffset: "3px" }}
      >
        Continue browsing the membership pages →
      </Link>
    </Card>
  );
}
