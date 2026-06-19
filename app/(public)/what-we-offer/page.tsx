import type { Metadata } from "next";
import Link from "next/link";

const PARCHMENT = "#F0EDE6";
const SAGE_800 = "#2D3B2C";
const AMBER = "#C2963A";

const sections = [
  {
    eyebrow: "Clinical",
    heading: "Support for your hardest cases.",
    items: [
      {
        title: "Monthly case consultation",
        body: "A structured consultation group meets the first Thursday of every month from 9:00 to 10:30am. Bring your difficult cases, process with trusted peers, and leave with new perspective.",
      },
      {
        title: "Continuing education (CEUs)",
        body: "Access to continuing education content aligned with your licensure requirements. Curated for practicing clinicians and designed for professional growth.",
      },
      {
        title: "Resource library",
        body: "A growing library of clinical tools, assessment instruments, psychoeducation handouts, treatment frameworks, and business templates, organized and searchable.",
      },
    ],
  },
  {
    eyebrow: "Professional",
    heading: "Visibility and referrals that matter.",
    items: [
      {
        title: "Clinician directory listing",
        body: "Your profile in the public directory, searchable by specialty, modality, location, and availability. A trusted source for referrals from clients and colleagues.",
      },
      {
        title: "Referral network",
        body: "A private network of vetted clinicians. Send and receive referrals confidently, knowing every member has been part of the same professional community.",
      },
      {
        title: "Practice and marketing guidance",
        body: "Structured guidance on building a sustainable private practice: fee setting, marketing, business systems, and more.",
      },
    ],
  },
  {
    eyebrow: "Support",
    heading: "Sustaining the person behind the work.",
    items: [
      {
        title: "Burnout prevention",
        body: "Mindfulness practices and burnout prevention structures designed specifically for therapists carrying heavy caseloads. Because your sustainability matters too.",
      },
      {
        title: "Discounted coaching with Sarah",
        body: "Members receive discounted access to individual coaching sessions with Sarah Arnold, LPC-S for clinical consultation, practice development, or both.",
      },
    ],
  },
];

const pricingFeatures = [
  "Monthly case consultation group",
  "CEU trainings each month",
  "Curated clinical resource library",
  "Public directory listing",
  "Trusted clinician referral network",
  "Marketing and practice guidance",
  "Discounted coaching with Sarah",
  "Mindfulness and burnout resources",
  "Professional Will designation",
  "Private online community",
];

const faqs = [
  {
    q: "Who is The Circle for?",
    a: "The Circle is for licensed therapists, LPC, LCSW, LMFT, PhD, and PsyD, who are in independent or group private practice. Pre-licensed associates are not currently eligible for full membership.",
  },
  {
    q: "Is this for Austin only?",
    a: "No. While The Circle is based in Austin, we provide connection and support for clinicians all across Texas.",
  },
  {
    q: "How does the consultation group work?",
    a: "The monthly group meets virtually on the first Thursday of each month, 9:00 to 10:30am. Members may present cases for discussion, and various topics will be covered for CEUs. The group is kept intentionally small for the quality of discussion.",
  },
  {
    q: "Is there a long-term contract?",
    a: "No. There is no long-term contract, and you can cancel at any time from your billing settings.",
  },
  {
    q: "How do I reach Sarah?",
    a: "By email — sarah@restoredfc.com",
  },
];

function AmberCheck() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
      <circle cx="8" cy="8" r="8" fill="rgba(194,150,58,0.72)" />
      <path d="M4.5 8l2.5 2.5 4.5-5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export const metadata: Metadata = {
  title: "What We Offer | The Circle",
  description:
    "Membership gives you full access to clinical support, professional development, and community. Monthly case consultation, CEU trainings, resource library, and more.",
};

export default function WhatWeOfferPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden text-center"
        style={{ background: SAGE_800, padding: "clamp(5rem,10vw,9rem) 1.5rem clamp(3rem,6vw,5rem)" }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 55% 48% at 50% 48%, rgba(194,150,58,0.07) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div className="relative container-fluid">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] mb-5" style={{ color: AMBER }}>
            What we offer
          </p>
          <h1
            className="leading-tight mb-6 max-w-2xl mx-auto"
            style={{
              fontFamily: "var(--font-serif), Georgia, serif",
              fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)",
              fontWeight: 400,
              color: "#fff",
            }}
          >
            Everything a thriving private practice needs.
          </h1>
          <p
            className="text-[0.9375rem] leading-relaxed max-w-xl mx-auto"
            style={{ color: "rgba(255,255,255,0.68)" }}
          >
            Membership gives you full access to clinical support, professional
            development, and community.
          </p>
        </div>
      </section>

      {/* Benefit sections */}
      {sections.map((sec, i) => (
        <section
          key={sec.eyebrow}
          style={{
            background: PARCHMENT,
            padding: "clamp(2.5rem,5vw,4rem) 0",
            borderTop: `1px solid rgba(194,150,58,0.12)`,
          }}
        >
          <div className="container-fluid">
            <div className="mb-8">
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] mb-3" style={{ color: AMBER }}>
                {sec.eyebrow}
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-serif), Georgia, serif",
                  fontWeight: 400,
                  fontSize: "clamp(1.6rem, 2.8vw, 2.25rem)",
                  letterSpacing: "-0.016em",
                  lineHeight: 1.18,
                  color: SAGE_800,
                }}
              >
                {sec.heading}
              </h2>
            </div>
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {sec.items.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl p-6 flex flex-col gap-3"
                  style={{
                    background: "#fff",
                    border: `1px solid rgba(194,150,58,0.12)`,
                    boxShadow: "0 2px 12px rgba(45,59,44,0.06)",
                  }}
                >
                  <div style={{ width: 20, height: 1.5, background: AMBER, borderRadius: 1 }} />
                  <h3
                    className="text-base leading-snug"
                    style={{
                      fontFamily: "var(--font-serif), Georgia, serif",
                      fontWeight: 400,
                      color: SAGE_800,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Pricing */}
      <section
        style={{
          background: PARCHMENT,
          padding: "clamp(2.5rem,5vw,4rem) 0",
          borderTop: `1px solid rgba(194,150,58,0.12)`,
        }}
      >
        <div className="container-fluid">
          <div className="text-center mb-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] mb-3" style={{ color: AMBER }}>
              Membership
            </p>
            <h2
              style={{
                fontFamily: "var(--font-serif), Georgia, serif",
                fontWeight: 400,
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                letterSpacing: "-0.018em",
                lineHeight: 1.18,
                color: "#1A1A1A",
              }}
            >
              Simple, all-inclusive pricing.
            </h2>
          </div>

          <div
            className="max-w-3xl mx-auto rounded-2xl overflow-hidden"
            style={{ background: "#fff", boxShadow: "0 4px 28px rgba(45,59,44,0.09)", border: `1px solid rgba(194,150,58,0.12)` }}
          >
            <div className="grid grid-cols-1 md:grid-cols-[190px,1fr]">
              <div
                className="flex flex-col items-center justify-center"
                style={{ padding: "2.5rem 1.5rem", borderRight: `1px solid rgba(194,150,58,0.12)` }}
              >
                <div className="flex items-baseline gap-1">
                  <span
                    style={{
                      fontFamily: "var(--font-serif), Georgia, serif",
                      fontSize: "clamp(3rem, 7vw, 5rem)",
                      fontWeight: 400,
                      letterSpacing: "-0.03em",
                      lineHeight: 1,
                      color: "#1A1A1A",
                    }}
                  >
                    $79
                  </span>
                  <span style={{ fontSize: 13, color: "#7A7A6E", alignSelf: "flex-end", paddingBottom: 4 }}>/month</span>
                </div>
                <p className="text-xs mt-2 text-center" style={{ color: "#9A9A8E" }}>Billed monthly · Cancel anytime</p>
              </div>
              <div style={{ padding: "2rem" }}>
                <div className="md:hidden" style={{ height: "0.5px", background: `rgba(194,150,58,0.3)`, marginBottom: "1.5rem" }} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5" style={{ marginBottom: "1.75rem" }}>
                  {pricingFeatures.map((feature) => (
                    <div key={feature} className="flex items-start gap-2">
                      <AmberCheck />
                      <span style={{ fontSize: 13, color: "#3D4A3B" }}>{feature}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/join"
                  className="block text-center w-full rounded-full text-sm font-medium"
                  style={{ background: AMBER, color: "#fff", padding: "0.85rem 1.5rem" }}
                >
                  Apply for membership
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        style={{
          background: PARCHMENT,
          padding: "clamp(2.5rem,5vw,4rem) 0",
          borderTop: `1px solid rgba(194,150,58,0.12)`,
        }}
      >
        <div className="container-fluid max-w-4xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] mb-4" style={{ color: AMBER }}>
            Questions
          </p>
          <h2
            className="mb-10"
            style={{
              fontFamily: "var(--font-serif), Georgia, serif",
              fontWeight: 400,
              fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
              letterSpacing: "-0.018em",
              lineHeight: 1.18,
              color: SAGE_800,
            }}
          >
            Frequently asked questions.
          </h2>
          <div className="flex flex-col">
            {faqs.map((faq, i) => (
              <div
                key={faq.q}
                className="py-6"
                style={{ borderTop: i === 0 ? `1px solid rgba(194,150,58,0.18)` : `1px solid rgba(194,150,58,0.12)` }}
              >
                <h3
                  className="text-[0.9375rem] font-medium mb-2.5"
                  style={{ color: SAGE_800 }}
                >
                  {faq.q}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="text-center relative overflow-hidden"
        style={{ background: SAGE_800, padding: "clamp(2.5rem,5vw,4.5rem) 1.5rem" }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(194,150,58,0.07) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div className="relative max-w-2xl mx-auto">
          <h2
            className="mb-8"
            style={{
              fontFamily: "var(--font-serif), Georgia, serif",
              fontWeight: 400,
              fontSize: "clamp(1.8rem, 3.2vw, 2.75rem)",
              color: "#fff",
              lineHeight: 1.18,
            }}
          >
            Ready to join?
          </h2>
          <Link
            href="/join"
            className="inline-flex w-full sm:w-auto items-center justify-center rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
            style={{ background: AMBER, color: "#fff", padding: "0.85rem 2.25rem" }}
          >
            Apply for membership
          </Link>
        </div>
      </section>
    </>
  );
}
