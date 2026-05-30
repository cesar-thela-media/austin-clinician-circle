import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find a Clinician | The Circle",
  description:
    "The therapist directory is coming soon. Join The Circle to be listed in our trusted network of licensed clinicians.",
};

export default function FindAClinicianPage() {
  return (
    <>
      <section
        className="pt-28 md:pt-32 pb-16 md:pb-20"
        style={{ background: "var(--color-cream-100)" }}
      >
        <div className="container-fluid text-center max-w-5xl">
          <p
            className="text-xs font-medium uppercase tracking-widest mb-5"
            style={{ color: "var(--color-sage-600)" }}
          >
            Find a clinician
          </p>
          <h1
            className="leading-tight mb-6 max-w-2xl mx-auto"
            style={{
              fontFamily: "var(--font-serif), Manrope, sans-serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 400,
              color: "var(--color-sage-900)",
            }}
          >
            Therapist directory coming soon.
          </h1>
          <p
            className="text-base leading-relaxed max-w-xl mx-auto mb-8"
            style={{ color: "var(--color-text-secondary)" }}
          >
            We are building a trusted network of vetted, licensed clinicians in
            Austin and across Texas. The public directory will be available after
            launch.
          </p>
          <div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm"
            style={{
              background: "var(--color-sage-100)",
              color: "var(--color-sage-700)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-sage-500)" }} />
            Launching soon
          </div>
        </div>
      </section>

      <section
        className="pb-28 md:pb-36 text-center"
        style={{ background: "var(--color-cream-100)" }}
      >
        <div className="max-w-2xl mx-auto px-5 md:px-6">
          <div
            className="rounded-2xl border p-8 md:p-10"
            style={{
              background: "#fff",
              borderColor: "var(--color-cream-300)",
            }}
          >
            <span className="text-3xl mb-3 block" style={{ color: "var(--color-sage-500)" }}>
              ◎
            </span>
            <h2
              className="section-title-strong mb-3"
              style={{
                fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)",
                color: "var(--color-sage-900)",
              }}
            >
              Are you a licensed therapist?
            </h2>
            <p
              className="text-sm leading-relaxed mb-6"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Join The Circle and get listed in our member directory when it
              launches. Members can share referrals, connect with colleagues, and
              be found by potential clients.
            </p>
            <Link
              href="/join"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-sm font-medium transition-opacity hover:opacity-90"
              style={{ background: "var(--color-sage-700)", color: "#fff" }}
            >
              Apply for membership
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
