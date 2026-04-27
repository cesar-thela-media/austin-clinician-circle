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
            "radial-gradient(circle at 70% 20%, rgba(var(--color-accent-highlight-rgb), 0.08) 0%, transparent 55%), radial-gradient(circle at 20% 80%, rgba(74,93,78,0.22) 0%, transparent 50%)",
        }}
      />

      {/* Header */}
      <header className="relative z-10 px-5 md:px-6 pt-6 md:pt-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p
              className="text-[11px] font-medium uppercase tracking-[0.24em] mb-2"
              style={{ color: "rgba(255,255,255,0.34)" }}
            >
              Free guide for therapists
            </p>
            <p
              className="text-sm font-semibold"
              style={{ fontFamily: "var(--font-serif), Georgia, serif", color: "#fff" }}
            >
              Austin Clinician Circle
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-full text-sm font-medium transition-colors hover:bg-white/10"
              style={{ color: "#fff", border: "1px solid rgba(255,255,255,0.14)" }}
            >
              Back to site
            </Link>
            <Link
              href="/join"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-full text-sm font-medium transition-opacity hover:opacity-90"
              style={{ background: "var(--color-sage-700)", color: "#fff" }}
            >
              Apply now
            </Link>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: copy ── */}
          <div>
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-full" style={{ background: "var(--color-accent-highlight)", border: "1px solid rgba(27,27,27,0.08)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-text-primary)" }} />
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--color-text-primary)" }}>
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
              <em style={{ color: "var(--color-sage-100)", fontStyle: "italic" }}>
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
                    style={{ background: "rgba(var(--color-accent-highlight-rgb), 0.18)", color: "var(--color-text-primary)" }}
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
                      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(var(--color-accent-highlight-rgb), 0.5)")}
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
                      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(var(--color-accent-highlight-rgb), 0.5)")}
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
                  <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full" style={{ background: "var(--color-accent-highlight)", border: "1px solid rgba(27,27,27,0.08)" }}>
                    <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--color-text-primary)" }}>
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
                    style={{ background: "rgba(var(--color-accent-highlight-rgb), 0.88)", border: "1px solid rgba(27,27,27,0.08)" }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium" style={{ color: "rgba(27,27,27,0.62)" }}>
                        Founding spots remaining
                      </span>
                      <span className="text-sm font-bold" style={{ color: "var(--color-text-primary)" }}>
                        {SPOTS_REMAINING} of 40
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(27,27,27,0.12)" }}>
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${((40 - SPOTS_REMAINING) / 40) * 100}%`,
                          background: "var(--color-text-primary)",
                        }}
                      />
                    </div>
                    <p className="text-xs" style={{ color: "rgba(27,27,27,0.62)" }}>
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
      <footer className="relative z-10 px-5 md:px-6 pb-8 md:pb-10 pt-10">
        <div className="max-w-6xl mx-auto border-t pt-8 md:pt-10" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <p
                className="text-sm font-semibold mb-3"
                style={{ fontFamily: "var(--font-serif), Georgia, serif", color: "#fff" }}
              >
                Austin Clinician Circle
              </p>
              <p className="text-sm leading-relaxed max-w-sm mx-auto md:mx-0" style={{ color: "rgba(255,255,255,0.52)" }}>
                A grounded professional community for licensed therapists who want consultation, connection, and sustainable private practice.
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.34)" }}>
                What&apos;s inside the playbook
              </p>
              <div className="flex flex-col gap-2 text-sm" style={{ color: "rgba(255,255,255,0.56)" }}>
                <p>Fee setting and messaging guidance</p>
                <p>Referral network blueprint</p>
                <p>Burnout early-warning checklist</p>
              </div>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.34)" }}>
                Next steps
              </p>
              <div className="flex flex-col gap-2.5">
                <Link href="/what-we-offer" className="text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.56)" }}>
                  Explore membership
                </Link>
                <Link href="/join" className="text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.56)" }}>
                  Apply for founding membership
                </Link>
                <Link href="/find-a-clinician" className="text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.56)" }}>
                  Browse the clinician directory
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.26)" }}>
              Founded by Sarah Arnold, LPC-S · Austin, TX
            </p>
            <a
              href="https://www.restoredfamily.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs underline transition-colors hover:text-white"
              style={{ color: "rgba(255,255,255,0.34)" }}
            >
              Restored Family Counseling
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
