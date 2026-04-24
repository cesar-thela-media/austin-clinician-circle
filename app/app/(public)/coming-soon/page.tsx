"use client";

// TODO: wire form submission to Resend — send the guide PDF to the captured
// email and notify Sarah at sarah@restoredfc.com of the new lead.
// Handler pattern: POST /api/leads  { firstName, email }

import { useState } from "react";
import Link from "next/link";

const SPOTS_REMAINING = 16; // update manually or pull from DB

const WHAT_YOULL_GET = [
  "A proven fee-setting framework — stop undercharging for good",
  "The referral network blueprint — build trust before you need it",
  "Burnout early-warning checklist — 12 signs most clinicians miss",
  "The ACC community playbook — what thriving practices do differently",
];

export default function ComingSoonPage() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName.trim() || !email.trim()) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName: firstName.trim(), email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
      setLoading(false);
      return;
    }

    setLoading(false);
    setSubmitted(true);
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--color-sage-900)" }}
    >
      {/* Subtle texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 70% 20%, rgba(201,169,110,0.08) 0%, transparent 55%), radial-gradient(circle at 20% 80%, rgba(74,93,78,0.22) 0%, transparent 50%)",
        }}
      />

      {/* Wordmark */}
      <header className="relative z-10 px-6 pt-8 flex justify-center">
        <p
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          Austin Clinician Circle
        </p>
      </header>

      {/* Main */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: copy ── */}
          <div>
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-full" style={{ background: "rgba(249,210,81,0.12)", border: "1px solid rgba(249,210,81,0.25)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-gold)" }} />
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--color-gold)" }}>
                Free guide for Austin therapists
              </span>
            </div>

            <h1
              className="leading-[1.08] mb-5"
              style={{
                fontFamily: "var(--font-serif), Georgia, serif",
                fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
                fontWeight: 400,
                color: "#fff",
                letterSpacing: "-0.01em",
              }}
            >
              Stop building your
              <br />
              <em style={{ color: "var(--color-gold)", fontStyle: "italic" }}>
                practice alone.
              </em>
            </h1>

            <p
              className="text-lg leading-relaxed mb-8"
              style={{ color: "rgba(255,255,255,0.6)", maxWidth: "30rem" }}
            >
              Download <strong style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>The Private Practice Playbook</strong> — a free guide used by licensed therapists in Austin to build sustainable, fulfilling practices.
            </p>

            {/* What you'll get */}
            <ul className="flex flex-col gap-3 mb-8">
              {WHAT_YOULL_GET.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs"
                    style={{ background: "rgba(249,210,81,0.15)", color: "var(--color-gold)" }}
                  >
                    ✓
                  </span>
                  <span className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* Social proof */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {["MO", "JW", "SR"].map((init) => (
                  <div
                    key={init}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold"
                    style={{ background: "var(--color-sage-700)", color: "rgba(255,255,255,0.8)", border: "2px solid var(--color-sage-900)" }}
                  >
                    {init}
                  </div>
                ))}
              </div>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                Trusted by 40+ licensed therapists in Austin
              </p>
            </div>
          </div>

          {/* ── Right: form or thank-you ── */}
          <div>
            {!submitted ? (
              /* ── Opt-in form ── */
              <div
                className="rounded-3xl p-8"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <p
                  className="text-base font-semibold mb-1"
                  style={{ color: "#fff" }}
                >
                  Get the free playbook
                </p>
                <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>
                  Delivered instantly to your inbox. No spam, ever.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>
                      First name
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Jane"
                      required
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{
                        background: "rgba(255,255,255,0.07)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        color: "#fff",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(249,210,81,0.5)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>
                      Email address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@example.com"
                      required
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{
                        background: "rgba(255,255,255,0.07)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        color: "#fff",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(249,210,81,0.5)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
                    />
                  </div>

                  {error && (
                    <p className="text-xs" style={{ color: "#B54B4B" }}>{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading || !firstName.trim() || !email.trim()}
                    className="w-full py-3.5 rounded-full text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: loading ? "rgba(255,255,255,0.7)" : "#fff",
                      color: "var(--color-sage-800)",
                    }}
                  >
                    {loading ? "Sending…" : "Send me the playbook →"}
                  </button>

                  <p className="text-center text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
                    By submitting you agree to receive occasional emails from Austin Clinician Circle. Unsubscribe anytime.
                  </p>
                </form>
              </div>
            ) : (
              /* ── Tripwire reveal ── */
              <div
                className="rounded-3xl p-8 flex flex-col gap-6"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  backdropFilter: "blur(12px)",
                }}
              >
                {/* Confirmation */}
                <div className="flex flex-col gap-2">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-base mb-1"
                    style={{ background: "rgba(74,124,89,0.16)", color: "var(--color-success)" }}
                  >
                    ✓
                  </div>
                  <p className="text-base font-semibold" style={{ color: "#fff" }}>
                    Check your inbox, {firstName}!
                  </p>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                    The Private Practice Playbook is on its way to <span style={{ color: "rgba(255,255,255,0.75)" }}>{email}</span>.
                  </p>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: "rgba(255,255,255,0.08)" }} />

                {/* Tripwire offer */}
                <div className="flex flex-col gap-3">
                  <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full" style={{ background: "rgba(249,210,81,0.12)", border: "1px solid rgba(249,210,81,0.3)" }}>
                    <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--color-gold)" }}>
                      One more thing
                    </span>
                  </div>
                  <p
                    className="text-xl leading-snug"
                    style={{
                      fontFamily: "var(--font-serif), Georgia, serif",
                      fontWeight: 400,
                      color: "#fff",
                    }}
                  >
                    You&apos;re invited to become a founding member.
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                    Austin Clinician Circle is launching with a founding cohort of 40 therapists who shape the community from day one — locked-in founding pricing, priority access, and direct input with Sarah.
                  </p>

                  {/* Urgency bar */}
                  <div
                    className="rounded-xl p-4 flex flex-col gap-2"
                    style={{ background: "rgba(249,210,81,0.07)", border: "1px solid rgba(249,210,81,0.15)" }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
                        Founding spots remaining
                      </span>
                      <span className="text-sm font-bold" style={{ color: "var(--color-gold)" }}>
                        {SPOTS_REMAINING} of 40
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${((40 - SPOTS_REMAINING) / 40) * 100}%`,
                          background: "var(--color-gold)",
                        }}
                      />
                    </div>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                      {40 - SPOTS_REMAINING} therapists have already applied
                    </p>
                  </div>

                  <Link
                    href="/join"
                    className="w-full text-center py-3.5 rounded-full text-sm font-semibold transition-all hover:opacity-90"
                    style={{ background: "#fff", color: "var(--color-sage-800)" }}
                  >
                    Apply for founding membership →
                  </Link>
                  <p className="text-center text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
                    Applications reviewed weekly · No commitment required
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 pb-8 flex justify-center">
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
          Founded by Sarah Arnold, LPC-S · Restored Family Counseling · Austin, TX
        </p>
      </footer>
    </div>
  );
}
