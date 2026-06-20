import type { Metadata } from "next";
import Link from "next/link";

const AMBER = "#C2963A";
const SAGE = "#2D3B2C";

const benefits = [
  { title: "Set your fees with confidence", body: "Stop undercharging. A proven framework to calculate what your practice is worth and communicate it clearly." },
  { title: "Build a referral engine", body: "The three-ring referral model that keeps your caseload full without marketing yourself into burnout." },
  { title: "Spot burnout before it spots you", body: "12 early-warning signs most clinicians miss, and the protective structures that actually work." },
  { title: "Find your clinical community", body: "What thriving private practices do differently. The isolation tax is real. Here's how to stop paying it." },
];

export const metadata: Metadata = {
  title: "Free Practice Playbook | The Circle",
  description: "Download our free playbook for private practice therapists. Fee-setting, referral networks, burnout prevention, and community.",
};

export default function PlaybookPage() {
  return (
    <>
      {/* Hero — two column */}
      <section style={{ background: SAGE, padding: "clamp(3rem,6vw,5rem) 0" }}>
        <div className="container-fluid">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center max-w-5xl mx-auto">
            {/* Left — text */}
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] mb-4" style={{ color: AMBER }}>
                Free guide
              </p>
              <h1
                className="leading-tight mb-5"
                style={{
                  fontFamily: "var(--font-serif), Georgia, serif",
                  fontSize: "clamp(2rem, 4vw, 3.25rem)",
                  fontWeight: 400,
                  color: "#fff",
                }}
              >
                The Private Practice Playbook
              </h1>
              <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.6)" }}>
                A practical guide for licensed therapists who want to build a sustainable, connected private practice, without going it alone.
              </p>
              <Link
                href="/sign-in"
                className="inline-flex items-center justify-center rounded-full text-sm font-medium px-8 py-3.5 transition-opacity hover:opacity-90"
                style={{ background: AMBER, color: "#fff" }}
              >
                Get the free playbook →
              </Link>
            </div>
            {/* Right — PDF placeholder */}
            <div className="hidden md:flex items-center justify-center">
              <div
                className="w-64 h-80 rounded-2xl flex flex-col items-center justify-center gap-3 relative overflow-hidden"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>PDF Preview</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's inside */}
      <section style={{ background: "#F0EDE6", padding: "clamp(2.5rem,5vw,4rem) 0" }}>
        <div className="container-fluid max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] mb-3" style={{ color: AMBER }}>
              What&apos;s inside
            </p>
            <h2
              className="leading-tight"
              style={{
                fontFamily: "var(--font-serif), Georgia, serif",
                fontSize: "clamp(1.6rem, 3vw, 2.25rem)",
                fontWeight: 400,
                color: SAGE,
              }}
            >
              Everything you need to build a practice that lasts.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-2xl p-6"
                style={{ background: "#fff", border: "1px solid rgba(194,150,58,0.12)", boxShadow: "0 2px 12px rgba(45,59,44,0.05)" }}
              >
                <div style={{ width: 20, height: 1.5, background: AMBER, borderRadius: 1, marginBottom: "1rem" }} />
                <h3 className="text-base font-semibold mb-2" style={{ color: SAGE }}>{b.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: SAGE, padding: "clamp(3rem,6vw,5rem) 0" }}>
        <div className="text-center max-w-xl mx-auto px-5">
          <h2
            className="leading-tight mb-4"
            style={{
              fontFamily: "var(--font-serif), Georgia, serif",
              fontSize: "clamp(1.6rem, 3vw, 2.25rem)",
              fontWeight: 400,
              color: "#fff",
            }}
          >
            Ready to stop practicing alone?
          </h2>
          <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
            Sign in to download your free playbook and explore what The Circle has to offer.
          </p>
          <Link
            href="/sign-in"
            className="inline-flex items-center justify-center rounded-full text-sm font-medium px-8 py-3.5 transition-opacity hover:opacity-90"
            style={{ background: AMBER, color: "#fff" }}
          >
            Get the playbook →
          </Link>
        </div>
      </section>
    </>
  );
}
