import Link from "next/link";
import { PricingCard } from "@/components/cards/PricingCard";

const benefits = [
  {
    category: "Clinical",
    icon: "◎",
    items: [
      {
        title: "Monthly case consultation",
        body: "A structured consultation group meets the first Thursday of every month, 9–10:30am. Bring your difficult cases, process with trusted peers, and leave with new perspective.",
      },
      {
        title: "Continuing education (CEUs)",
        body: "Access to continuing education content aligned with your licensure requirements. Curated for practicing clinicians — not generic HR training.",
      },
      {
        title: "Resource library",
        body: "A growing library of clinical tools, assessment instruments, psychoeducation handouts, treatment frameworks, and business templates — organized and searchable.",
      },
    ],
  },
  {
    category: "Professional",
    icon: "◈",
    items: [
      {
        title: "Clinician directory listing",
        body: "Your profile on the public ACC directory — searchable by specialty, modality, location, and availability. A trusted source for referrals from clients and colleagues.",
      },
      {
        title: "Referral network",
        body: "A private network of vetted Austin-area clinicians. Send and receive referrals confidently, knowing every member has been part of the same professional community.",
      },
      {
        title: "Practice and marketing guidance",
        body: "Structured guidance on building a sustainable private practice — fee setting, marketing, business systems, and more. Drawn from Sarah's experience building Restored Family Counseling.",
      },
    ],
  },
  {
    category: "Support",
    icon: "◇",
    items: [
      {
        title: "Burnout prevention",
        body: "Mindfulness practices and burnout prevention structures designed specifically for therapists carrying heavy caseloads. Because your sustainability matters too.",
      },
      {
        title: "Discounted coaching with Sarah",
        body: "Members receive discounted access to individual coaching sessions with Sarah Arnold, LPC-S — for clinical consultation, practice development, or both.",
      },
    ],
  },
];

const faqs = [
  {
    q: "Who is ACC for?",
    a: "ACC is for licensed therapists — LPC, LCSW, LMFT, PhD, PsyD — who are in independent or group private practice. Pre-licensed associates are not currently eligible for full membership.",
  },
  {
    q: "Is this only for Austin-based therapists?",
    a: "Yes, at launch ACC serves therapists in the Austin metro area. All meetings are virtual, so you don't need to be in any specific neighborhood — but we are building a community around this region.",
  },
  {
    q: "How does the consultation group work?",
    a: "The monthly group meets virtually on the first Thursday of each month, 9–10:30am. Members may present cases for discussion, and Sarah facilitates. The group is kept intentionally small for the quality of discussion.",
  },
  {
    q: "Is there a long-term contract?",
    a: "No. Membership is month-to-month. You can cancel at any time from your billing settings.",
  },
  {
    q: "What if I apply and am not accepted?",
    a: "Founding membership cohorts are limited in size. If your application is not accepted in the current cohort, you will be added to the waitlist for the next opening.",
  },
  {
    q: "I have more questions — how do I reach Sarah?",
    a: "You can reach Sarah through Restored Family Counseling at restoredfamily.com. She reviews all ACC inquiries personally.",
  },
];

const pricingFeatures = [
  "Monthly case consultation group",
  "Continuing education access (CEUs)",
  "Curated clinical resource library",
  "Public directory listing",
  "Trusted clinician referral network",
  "Marketing and practice guidance",
  "Discounted coaching with Sarah",
  "Mindfulness and burnout resources",
];

export default function WhatWeOfferPage() {
  return (
    <>
      {/* HERO */}
      <section
        className="pt-28 md:pt-32 pb-16 md:pb-20"
        style={{ background: "var(--color-cream-100)" }}
      >
        <div className="max-w-4xl mx-auto px-5 md:px-6 text-center">
          <p
            className="text-xs font-medium uppercase tracking-widest mb-5"
            style={{ color: "var(--color-sage-600)" }}
          >
            What we offer
          </p>
          <h1
            className="leading-tight mb-8 max-w-2xl mx-auto"
            style={{
              fontFamily: "var(--font-serif), Manrope, sans-serif",
              fontSize: "clamp(2.5rem, 5vw, 3.75rem)",
              fontWeight: 400,
              color: "var(--color-sage-900)",
            }}
          >
            Everything a thriving private practice needs.
          </h1>
          <p
            className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ color: "var(--color-text-secondary)" }}
          >
            One membership gives you full access to clinical support, professional
            development, and community — no tiers, no upsells.
          </p>
        </div>
      </section>

      {/* BENEFITS */}
      {benefits.map((section, i) => (
        <section
          key={section.category}
          className="py-16 md:py-20"
          style={{
            background:
              i % 2 === 0
                ? "var(--color-cream-200)"
                : "var(--color-cream-100)",
          }}
        >
          <div className="max-w-6xl mx-auto px-5 md:px-6">
            <div className="flex flex-col items-center gap-3 mb-10 md:mb-12 text-center">
              <span
                className="text-2xl"
                style={{ color: "var(--color-sage-500)" }}
              >
                {section.icon}
              </span>
              <p
                className="text-xs font-medium uppercase tracking-widest"
                style={{ color: "var(--color-sage-600)" }}
              >
                {section.category}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {section.items.map((item) => (
                <div key={item.title} className="text-left md:text-center">
                  <h3
                    className="text-base font-semibold mb-3"
                    style={{ color: "var(--color-sage-800)" }}
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

      {/* PRICING */}
      <section
        className="py-16 md:py-24"
        style={{ background: "var(--color-cream-200)" }}
      >
        <div className="max-w-5xl mx-auto px-5 md:px-6">
          <div className="flex flex-col items-center gap-10 md:gap-12 text-center">
            <div className="max-w-2xl">
              <p
                className="text-xs font-medium uppercase tracking-widest mb-5"
                style={{ color: "var(--color-sage-600)" }}
              >
                Membership
              </p>
              <h2
                className="section-title-strong mb-6"
                style={{
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  color: "var(--color-sage-900)",
                }}
              >
                One flat membership.
                <br />
                Everything included.
              </h2>
              <p
                className="text-sm leading-relaxed mb-8"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Month-to-month, no contracts. Cancel anytime. Founding member
                cohort spots are limited — apply now to lock in your place.
              </p>
              <Link
                href="/join"
                className="inline-flex w-full sm:w-auto items-center justify-center px-8 py-3.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                style={{
                  background: "var(--color-sage-700)",
                  color: "#fff",
                }}
              >
                Apply for membership
              </Link>
            </div>
            <div className="max-w-sm w-full mx-auto">
              <PricingCard price="$129" features={pricingFeatures} featured />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="py-16 md:py-24"
        style={{ background: "var(--color-cream-100)" }}
      >
        <div className="max-w-3xl mx-auto px-5 md:px-6 text-center">
          <p
            className="text-xs font-medium uppercase tracking-widest mb-5"
            style={{ color: "var(--color-sage-600)" }}
          >
            Questions
          </p>
          <h2
            className="section-title-strong mb-10 md:mb-14"
            style={{
              fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
              color: "var(--color-sage-900)",
            }}
          >
            Frequently asked questions.
          </h2>
          <div className="flex flex-col divide-y text-left" style={{ borderColor: "var(--color-cream-300)" }}>
            {faqs.map((faq) => (
              <div key={faq.q} className="py-6 md:py-7">
                <h3
                  className="text-base font-semibold mb-3"
                  style={{ color: "var(--color-sage-800)" }}
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
    </>
  );
}
