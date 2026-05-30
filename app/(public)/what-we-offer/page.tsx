import type { Metadata } from "next";
import Link from "next/link";
import { PricingCard } from "@/components/cards/PricingCard";

const benefits = [
  {
    category: "Clinical",
    icon: "◎",
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
    category: "Professional",
    icon: "◈",
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
    category: "Support",
    icon: "◇",
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
    a: "By email - sarah@restoredfamily.com",
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
  "Private online community for real-time support",
];

export const metadata: Metadata = {
  title: "What We Offer | The Circle",
  description:
    "Membership gives you full access to clinical support, professional development, and community. Monthly case consultation, CEU trainings, resource library, and more.",
};

export default function WhatWeOfferPage() {
  return (
    <>
      {/* HERO */}
      <section
        className="pt-28 md:pt-32 pb-16 md:pb-20"
        style={{ background: "var(--color-cream-100)" }}
      >
        <div className="container-fluid text-center max-w-5xl">
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
            Membership gives you full access to clinical support, professional
            development, and community.
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
          <div className="container-fluid">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-6 md:gap-8 xl:gap-10">
              {section.items.map((item) => (
                <div
                  key={item.title}
                  className={
                    section.category === "Support"
                      ? "text-center"
                      : "text-left md:text-center"
                  }
                >
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
        <div className="container-fluid">
          <div className="flex flex-col items-center gap-10 md:gap-12 text-center max-w-5xl mx-auto">
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
                A simple membership with full access to consultation,
                professional development, and community.
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
            <div className="max-w-md w-full mx-auto">
              <PricingCard price="$79" features={pricingFeatures} featured />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="py-16 md:py-24"
        style={{ background: "var(--color-cream-100)" }}
      >
        <div className="container-fluid text-center max-w-4xl">
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
