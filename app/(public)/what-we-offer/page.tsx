import type { Metadata } from "next";
import Link from "next/link";

const SAGE_800 = "#2D3B2C";
const AMBER = "#C2963A";
const PARCHMENT = "#F0EDE6";

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
    a: "By email, sarah@restoredfc.com",
  },
];

export const metadata: Metadata = {
  title: "What We Offer | The Circle",
  description:
    "Membership gives you full access to clinical support, professional development, and community. Monthly case consultation, CEU trainings, resource library, and more.",
};

export default function WhatWeOfferPage() {
  return (
    <>
      {/* Hero — emotional pull */}
      <section style={{ background: SAGE_800, padding: "clamp(3rem,6vw,5rem) 0" }}>
        <div className="container-fluid text-center max-w-3xl mx-auto">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] mb-5" style={{ color: AMBER }}>
            What we offer
          </p>
          <h1
            className="leading-tight mb-5"
            style={{ fontFamily: "var(--font-serif), Georgia, serif", fontSize: "clamp(2rem, 4.5vw, 3.5rem)", fontWeight: 400, color: "#fff" }}
          >
            The support you&apos;ve been missing since you left the agency.
          </h1>
          <p className="text-base leading-relaxed max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.58)" }}>
            One membership. Every tool, every connection, every resource you need to build a private practice that feels sustainable.
          </p>
        </div>
      </section>

      {/* Benefits — large emotional cards */}
      <section style={{ background: PARCHMENT, padding: "clamp(2.5rem,5vw,4rem) 0" }}>
        <div className="container-fluid max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "01", title: "You talk through cases with people who get it.", body: "Monthly case consultation with a small, trusted group of clinicians. Bring your hardest sessions and leave with perspective you can actually use." },
              { label: "02", title: "You stop Googling for handouts at 10pm.", body: "A searchable library of clinical tools, assessments, and templates, organized by specialty and ready when you are." },
              { label: "03", title: "You send referrals without second-guessing.", body: "A vetted network of clinicians you know and trust. Because the best referrals come from real professional relationships." },
              { label: "04", title: "You stay sharp without sitting through irrelevant CEUs.", body: "Continuing education designed for practicing clinicians, practical, relevant, and actually worth your Saturday morning." },
              { label: "05", title: "You get found by the clients who need you.", body: "Your profile in our public directory, searchable by specialty, modality, and availability. A trusted source for client referrals." },
              { label: "06", title: "You have someone to call when it feels heavy.", body: "Discounted one-on-one coaching with Sarah Arnold, LPC-S, for clinical guidance, practice strategy, or just a grounded conversation." },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl p-7 flex gap-5" style={{ background: "#fff", border: "1px solid rgba(194,150,58,0.12)", boxShadow: "0 2px 12px rgba(45,59,44,0.05)" }}>
                <span className="text-2xl shrink-0" style={{ fontFamily: "var(--font-serif), Georgia, serif", fontWeight: 400, color: AMBER, lineHeight: 1 }}>{item.label}</span>
                <div>
                  <h3 className="text-base font-semibold mb-2 leading-snug" style={{ color: SAGE_800 }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing — compact */}
      <section style={{ background: SAGE_800, padding: "clamp(2.5rem,5vw,4rem) 0" }}>
        <div className="container-fluid text-center max-w-xl mx-auto">
          <h2 className="mb-4" style={{ fontFamily: "var(--font-serif), Georgia, serif", fontSize: "clamp(1.6rem, 3vw, 2rem)", fontWeight: 400, color: "#fff" }}>
            One membership. Everything included.
          </h2>
          <div className="flex items-baseline justify-center gap-2 mb-6">
            <span style={{ fontFamily: "var(--font-serif), Georgia, serif", fontSize: "clamp(3rem, 6vw, 4rem)", fontWeight: 400, color: "#fff", lineHeight: 1 }}>$79</span>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>/month</span>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm mb-8 max-w-md mx-auto">
            {["Monthly case consultation","CEU trainings","Clinical resource library","Public directory listing","Referral network","Practice guidance","Coaching with Sarah","Burnout resources"].map((f) => (
              <div key={f} className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="rgba(194,150,58,0.5)" strokeWidth="1.2"/><path d="M5 8l2 2 4-4" stroke="#C2963A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span style={{ color: "rgba(255,255,255,0.7)", textAlign: "left" }}>{f}</span>
              </div>
            ))}
          </div>
          <Link href="/join" className="inline-flex items-center justify-center rounded-full text-sm font-medium px-8 py-3.5 transition-opacity hover:opacity-90" style={{ background: AMBER, color: "#fff" }}>
            Apply for membership
          </Link>
        </div>
      </section>

      {/* FAQs */}
      <section style={{ background: PARCHMENT, padding: "clamp(2.5rem,5vw,4rem) 0" }}>
        <div className="container-fluid max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] mb-3" style={{ color: AMBER }}>FAQ</p>
            <h2 className="leading-tight" style={{ fontFamily: "var(--font-serif), Georgia, serif", fontSize: "clamp(1.6rem, 3vw, 2rem)", fontWeight: 400, color: SAGE_800 }}>
              You probably have questions.
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {faqs.map((faq) => (
              <details key={faq.q} className="rounded-2xl p-5 group" style={{ background: "#fff", border: "1px solid rgba(194,150,58,0.12)" }}>
                <summary className="text-sm font-semibold cursor-pointer list-none flex items-center justify-between" style={{ color: SAGE_800 }}>
                  {faq.q}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="transition-transform group-open:rotate-45"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </summary>
                <p className="text-sm leading-relaxed mt-3" style={{ color: "var(--color-text-secondary)" }}>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

