import Link from "next/link";
import { ConsultationScheduler } from "@/components/ConsultationScheduler";

/* ── Reference design tokens ───────────────────────────────── */
const HERO_BG   = "#2D3B2C";   // deep forest sage — hero, CTA band, footer
const SECTION2  = "#4A5E48";   // medium sage — why acc exists
const PARCHMENT = "#F0EDE6";   // warm parchment — sections 3-5
const AMBER     = "#C2963A";   // muted warm amber — accents, CTAs

/* ── Benefit data ─────────────────────────────────────────── */
const benefits = [
  {
    label: "Monthly Case\nConsultation",
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="7.5" cy="6" r="3" /><path d="M1.5 18c0-3.31 2.69-6 6-6" />
        <circle cx="14.5" cy="8" r="2.5" opacity=".55" /><path d="M11 17c0-2.5 1.6-4.5 3.5-5.5" opacity=".55" />
      </svg>
    ),
  },
  {
    label: "Curated\nResource Library",
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="2" width="14" height="16" rx="2" /><path d="M7 7h6M7 10.5h6M7 14h3.5" />
      </svg>
    ),
  },
  {
    label: "Referral\nNetwork",
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="4" cy="10" r="2" /><circle cx="16" cy="4.5" r="2" /><circle cx="16" cy="15.5" r="2" />
        <path d="M6 10h3.5l4-4.8M9.5 10l4 4.8" />
      </svg>
    ),
  },
  {
    label: "Continuing\nEducation",
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2.5 1.5 7.5l8.5 5 8.5-5-8.5-5z" /><path d="M1.5 7.5v5c3.5 2.5 5.5 3 8.5 3s5-.5 8.5-3v-5" /><path d="M18.5 7.5v6" />
      </svg>
    ),
  },
  {
    label: "Public Directory\nListing",
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="16" height="16" rx="2" /><circle cx="10" cy="8.5" r="2.5" />
        <path d="M5 18c0-2.76 2.24-5 5-5s5 2.24 5 5" />
      </svg>
    ),
  },
  {
    label: "Practice\nCoaching",
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2C5.58 2 2 5.13 2 9c0 2.1 1.04 3.96 2.7 5.25L4 18l4-1.6A9.8 9.8 0 0 0 10 16c4.42 0 8-3.13 8-7s-3.58-7-8-7z" />
        <path d="M7 9h.01M10 9h.01M13 9h.01" />
      </svg>
    ),
  },
  {
    label: "Professional Will\nDesignation",
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6l-4-4z" />
        <path d="M13 2v4h4M7 9h6M7 12h6M7 15h3" />
      </svg>
    ),
  },
  {
    label: "Private Online\nCommunity",
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 13a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
];

/* ── Corkboard cards ──────────────────────────────────────── */
/* Positions designed so adjacent cards genuinely overlap at their edges,
   never grid-aligned. zIndex cascade keeps Card 1 (center) on top. */
const corkCards = [
  {
    // Card 1 — center landscape (highest z-index — visually dominant)
    quote: "I started dreading Mondays. Not because of my clients — because I was completely alone with the weight of it.",
    author: "Anonymous, PhD", location: "Austin, TX",
    desktop: { left: "16%", top: "48px",  width: "355px" },
    rotation: 2,
  },
  {
    // Card 2 — upper-left portrait (overlaps Card 1 left edge)
    quote: "I went three years without a single peer consultation. I didn't realize how much I was carrying until I talked to another clinician.",
    author: "Anonymous, LPC-S", location: "Austin, TX",
    desktop: { left: "0%",  top: "18px",  width: "220px" },
    rotation: -3,
  },
  {
    // Card 3 — lower-center landscape (overlaps Card 1 bottom-right + Card 4 left)
    quote: "The agency had built-in support I never appreciated until it was gone. Private practice felt like flying blind.",
    author: "Anonymous, LCSW", location: "Round Rock, TX",
    desktop: { left: "34%", top: "282px", width: "348px" },
    rotation: -1.5,
  },
  {
    // Card 4 — upper-right small square (overlaps Card 3 right edge)
    quote: "I didn't need more CEUs. I needed someone who understood what this work actually costs.",
    author: "Anonymous, LMFT", location: "Cedar Park, TX",
    desktop: { left: "60%", top: "12px",  width: "218px" },
    rotation: 4,
  },
  {
    // Card 5 — lower-left portrait (overlaps Card 2 bottom + Card 3 left edge)
    quote: "The first consultation group felt like exhaling for the first time in years.",
    author: "Anonymous, LPC", location: "Austin, TX",
    desktop: { left: "4%",  top: "265px", width: "218px" },
    rotation: -2.5,
  },
];

/* ── Pricing features ─────────────────────────────────────── */
const pricingFeatures = [
  ["Monthly case consultation",       "Public directory listing"],
  ["Full access to resource library", "Practice coaching support"],
  ["Referral network connection",     "Professional will designation"],
  ["Continuing education discounts",  "Private online community"],
];

/* ── Shared components ────────────────────────────────────── */
function AmberCheck() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
      <circle cx="8" cy="8" r="8" fill={AMBER} />
      <path d="M4.5 8l2.5 2.5 4.5-5" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BenefitIcon({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: 40, height: 40,
        borderRadius: "50%",
        border: `1.5px solid rgba(194,150,58,0.55)`,
        color: AMBER,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════ */

export default function HomePage() {
  return (
    <>
      {/* ══ HERO ════════════════════════════════════════════ */}
      <section
        className="relative flex flex-col items-center justify-center text-center overflow-hidden"
        style={{ background: HERO_BG, minHeight: "100svh", paddingTop: 80, paddingBottom: 100 }}
      >
        {/* 5 concentric rings — innermost brightest (8%), outermost most faded (3%).
            vw-relative so they span ~75% viewport at any desktop size (1440–1920px). */}
        {["75vw","58vw","43vw","28vw","15vw"].map((size, i) => (
          <div
            key={size}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: size, height: size,
              top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
              border: `1px solid rgba(255,255,255,${(0.03 + i * 0.013).toFixed(3)})`,
            }}
          />
        ))}

        {/* Crosshair mark — upper right */}
        <div className="absolute pointer-events-none" style={{ top: 28, right: 28, opacity: 0.18 }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <line x1="9" y1="0" x2="9" y2="18" stroke="white" strokeWidth="0.6" />
            <line x1="0" y1="9" x2="18" y2="9" stroke="white" strokeWidth="0.6" />
          </svg>
        </div>

        {/* Three thin horizontal hairlines */}
        {[
          { top: "22%", left: "8%",  width: "55%" },
          { top: "58%", left: "22%", width: "40%" },
          { top: "80%", left: "12%", width: "62%" },
        ].map((h, i) => (
          <div
            key={i}
            className="absolute pointer-events-none"
            style={{ top: h.top, left: h.left, width: h.width, height: "0.5px", background: "rgba(255,255,255,0.04)" }}
          />
        ))}

        {/* Warm amber glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 55% 48% at 50% 48%, rgba(194,150,58,0.07) 0%, transparent 65%)` }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center" style={{ maxWidth: 1100, padding: "0 1.5rem", width: "100%" }}>
          {/* Eyebrow */}
          <p
            className="uppercase tracking-[0.28em] font-medium mb-8 text-xs"
            style={{
              color: `rgba(194,150,58,0.78)`,
              animation: "fadeInUp 0.55s 0.1s cubic-bezier(0.16,1,0.3,1) both",
            }}
          >
            For licensed clinicians in Austin, TX
          </p>

          {/* Headline — Playfair Display 400 (closest free match to Tiempos Fine / Freight Display Light) */}
          <h1
            style={{
              fontFamily: "var(--font-serif), Georgia, serif",
              fontSize: "clamp(3rem, 7.2vw, 6rem)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              lineHeight: 1.0,
              marginBottom: "2.75rem",
              animation: "fadeInUp 0.75s 0.2s cubic-bezier(0.16,1,0.3,1) both",
            }}
          >
            <span style={{ color: "#fff", display: "block" }}>Deepen your work.</span>
            <em style={{ color: AMBER, fontStyle: "italic", display: "block" }}>Find your people.</em>
          </h1>

          {/* CTA buttons */}
          <div
            className="flex flex-col sm:flex-row gap-3 justify-center"
            style={{ animation: "fadeInUp 0.75s 0.36s cubic-bezier(0.16,1,0.3,1) both" }}
          >
            <Link
              href="/join"
              className="inline-flex items-center justify-center rounded-full text-sm font-medium"
              style={{ background: AMBER, color: "#fff", padding: "0.8rem 2.1rem" }}
            >
              Apply for membership
            </Link>
            <Link
              href="/what-we-offer"
              className="inline-flex items-center justify-center rounded-full text-sm font-medium"
              style={{ border: "1px solid rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.88)", padding: "0.8rem 2.1rem" }}
            >
              See what&apos;s included →
            </Link>
          </div>
        </div>
      </section>

      {/* ══ WHY ACC EXISTS ══════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ background: SECTION2, padding: "clamp(4.5rem,9vw,7.5rem) 0" }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 70% 50% at 50% 28%, rgba(194,150,58,0.055) 0%, transparent 65%)` }} />

        <div className="container-fluid text-center relative z-10" style={{ maxWidth: 740 }}>
          {/* Eyebrow */}
          <p className="uppercase tracking-[0.28em] font-medium text-[11px] mb-5" data-aos="fade-in" style={{ color: `rgba(194,150,58,0.75)` }}>
            Why ACC exists
          </p>

          {/* Heading */}
          <h2
            data-aos="fade-in-up" data-delay="80"
            style={{
              fontFamily: "var(--font-serif), Georgia, serif",
              fontSize: "clamp(2.1rem, 5.5vw, 3.75rem)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "#fff",
              marginBottom: "1.75rem",
            }}
          >
            Private practice can feel isolating.
            <br />
            <em style={{ color: AMBER, fontStyle: "italic" }}>You don&apos;t have to do this alone.</em>
          </h2>

          {/* Body */}
          <p className="text-sm leading-[1.85] max-w-[520px] mx-auto mb-4" data-aos="fade-in" data-delay="160" style={{ color: "rgba(255,255,255,0.65)" }}>
            When you leave an agency or group practice, you gain autonomy and lose the built-in
            consultation, community, and support from colleagues that keep your clinical work sharp.
            Most therapists in private practice never fully replace it.
          </p>
          <p className="text-sm font-semibold mb-14" data-aos="fade-in" data-delay="220" style={{ color: "#fff" }}>
            Austin Clinician Circle is here to change that.
          </p>

          {/* Stats — amber hairline dividers */}
          <div className="grid grid-cols-3 mb-12 mx-auto" data-aos="fade-in-up" data-delay="160" style={{ maxWidth: 680 }}>
            {[
              { stat: "67%",     sub: "feel isolated in\nprivate practice" },
              { stat: "3 years", sub: "average without formal\npeer consultation" },
              { stat: "89%",     sub: "say peer support improved\ntheir confidence" },
            ].map((item, i) => (
              <div
                key={item.stat}
                className="flex flex-col items-center py-5 px-3 md:px-5"
                style={i === 1 ? {
                  borderLeft:  `1px solid rgba(194,150,58,0.3)`,
                  borderRight: `1px solid rgba(194,150,58,0.3)`,
                } : {}}
              >
                <span
                  style={{
                    fontFamily: "var(--font-serif), Georgia, serif",
                    fontSize: "clamp(2rem, 5vw, 3.5rem)",
                    fontWeight: 400,
                    color: "#fff",
                    lineHeight: 1,
                    display: "block",
                    marginBottom: "0.6rem",
                  }}
                >
                  {item.stat}
                </span>
                <span style={{ fontSize: "11px", lineHeight: 1.5, color: "rgba(255,255,255,0.46)", whiteSpace: "pre-line", maxWidth: 110, display: "block" }}>
                  {item.sub}
                </span>
              </div>
            ))}
          </div>

          {/* Founder pills */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5" data-aos="fade-in" data-delay="300">
            {["Founded by [Clinical Founder], LPC-S", "Austin, Texas"].map((txt) => (
              <span
                key={txt}
                className="inline-flex items-center rounded-full text-xs"
                style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)", padding: "0.45rem 1.15rem" }}
              >
                {txt}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS — CORKBOARD ════════════════════════ */}
      <section style={{ background: PARCHMENT, padding: "clamp(4.5rem,9vw,7rem) 0" }}>
        <div className="container-fluid">
          {/* Header */}
          <p className="uppercase tracking-[0.28em] font-medium text-[11px] mb-5" data-aos="fade-in" style={{ color: AMBER }}>
            What members say before they join
          </p>
          <h2
            data-aos="fade-in-up" data-delay="80"
            style={{
              fontFamily: "var(--font-serif), Georgia, serif",
              fontSize: "clamp(1.9rem, 3.5vw, 2.75rem)",
              fontWeight: 400,
              letterSpacing: "-0.018em",
              lineHeight: 1.1,
              color: "#1A1A1A",
              marginBottom: "0.5rem",
            }}
          >
            Recognition is the first thing.
          </h2>
          <p className="text-sm mb-12" style={{ color: "#7A7A6E" }}>You don&apos;t have to carry it all alone.</p>

          {/* ── Desktop corkboard ── */}
          <div
            className="hidden md:block relative"
            style={{ minHeight: 570 }}
          >
            {corkCards.map((card, i) => (
              <div
                key={i}
                data-aos="fade-in"
                data-delay={String(100 + i * 60)}
                style={{
                  position: "absolute",
                  left: card.desktop.left,
                  top: card.desktop.top,
                  width: card.desktop.width,
                  transform: `rotate(${card.rotation}deg)`,
                  background: "#fff",
                  borderRadius: "12px",
                  padding: "1.4rem 1.5rem",
                  boxShadow: "0 4px 20px rgba(45,59,44,0.09), 0 1px 4px rgba(45,59,44,0.06)",
                  zIndex: 5 - i,
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-serif), Georgia, serif",
                    fontSize: "clamp(0.88rem, 1.1vw, 1rem)",
                    fontStyle: "italic",
                    fontWeight: 400,
                    lineHeight: 1.65,
                    color: "#1A1A1A",
                  }}
                >
                  &ldquo;{card.quote}&rdquo;
                </p>
                {/* Amber hairline */}
                <div style={{ height: "0.5px", background: `rgba(194,150,58,0.35)` }} />
                <div>
                  <p style={{ fontSize: "11.5px", fontWeight: 500, color: "#4A5E48" }}>— {card.author}</p>
                  <p style={{ fontSize: "11px", color: "#7A7A6E", marginTop: 2 }}>{card.location}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Mobile stack ── */}
          <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {corkCards.map((card, i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  borderRadius: "12px",
                  padding: "1.4rem 1.5rem",
                  boxShadow: "0 2px 12px rgba(45,59,44,0.08)",
                  display: "flex", flexDirection: "column", gap: "0.9rem",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-serif), Georgia, serif",
                    fontSize: "1rem",
                    fontStyle: "italic",
                    fontWeight: 400,
                    lineHeight: 1.65,
                    color: "#1A1A1A",
                  }}
                >
                  &ldquo;{card.quote}&rdquo;
                </p>
                <div style={{ height: "0.5px", background: `rgba(194,150,58,0.35)` }} />
                <div>
                  <p style={{ fontSize: "11.5px", fontWeight: 500, color: "#4A5E48" }}>— {card.author}</p>
                  <p style={{ fontSize: "11px", color: "#7A7A6E", marginTop: 2 }}>{card.location}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <p className="text-center text-sm font-medium mt-12" data-aos="fade-in" data-delay="200" style={{ color: "#3D4A3B" }}>
            Austin Clinician Circle was built for this moment.
          </p>
        </div>
      </section>

      {/* ══ MEMBERSHIP INCLUDES ══════════════════════════════ */}
      <section style={{ background: PARCHMENT, padding: "clamp(3.5rem,7vw,6rem) 0", borderTop: `1px solid rgba(194,150,58,0.12)` }}>
        <div className="container-fluid">
          <div className="grid grid-cols-1 lg:grid-cols-[260px,1fr] gap-10 xl:gap-16 items-start" style={{ marginBottom: "3.5rem" }}>
            {/* Left */}
            <div data-aos="fade-in-up">
              <p className="uppercase tracking-[0.28em] font-medium text-[11px] mb-4" style={{ color: AMBER }}>
                Membership includes
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-serif), Georgia, serif",
                  fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                  fontWeight: 400,
                  letterSpacing: "-0.018em",
                  lineHeight: 1.18,
                  color: "#1A1A1A",
                }}
              >
                Everything you need to thrive in private practice.
              </h2>
            </div>

            {/* Right: 5-col grid */}
            <div
              className="grid gap-x-6 gap-y-7"
              style={{ gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))" }}
            >
              {benefits.map((b, i) => (
                <div
                  key={b.label}
                  className="flex flex-col gap-2.5"
                  data-aos="fade-in-up"
                  data-delay={String(((i % 5) + 1) * 55)}
                >
                  <BenefitIcon>{b.icon}</BenefitIcon>
                  <span style={{ fontSize: "12.5px", fontWeight: 500, lineHeight: 1.4, color: "#1A1A1A", whiteSpace: "pre-line" }}>
                    {b.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Consultation Scheduler */}
          <div data-aos="fade-in-up" data-delay="80">
            <ConsultationScheduler />
          </div>
        </div>
      </section>

      {/* ══ PRICING ══════════════════════════════════════════ */}
      <section style={{ background: PARCHMENT, padding: "clamp(3.5rem,7vw,6rem) 0", borderTop: `1px solid rgba(194,150,58,0.12)` }}>
        <div className="container-fluid">
          <div className="grid grid-cols-1 lg:grid-cols-[220px,1fr] gap-10 xl:gap-16 items-center">
            {/* Left */}
            <div data-aos="fade-in-up">
              <p className="uppercase tracking-[0.28em] font-medium text-[11px] mb-4" style={{ color: AMBER }}>
                Membership
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-serif), Georgia, serif",
                  fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                  fontWeight: 400,
                  letterSpacing: "-0.018em",
                  lineHeight: 1.18,
                  color: "#1A1A1A",
                }}
              >
                Simple,<br />all-inclusive<br />pricing.
              </h2>
            </div>

            {/* Pricing card */}
            <div
              data-aos="scale-in"
              data-delay="80"
              className="rounded-2xl overflow-hidden"
              style={{ background: "#fff", boxShadow: "0 4px 28px rgba(45,59,44,0.09)", border: "1px solid rgba(194,150,58,0.12)" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-[190px,1fr]">
                {/* Price */}
                <div
                  className="flex flex-col items-center justify-center"
                  style={{ padding: "2.5rem 1.5rem", borderRight: "1px solid rgba(194,150,58,0.12)" }}
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
                </div>

                {/* Features */}
                <div style={{ padding: "2rem" }}>
                  {/* Amber hairline */}
                  <div className="md:hidden" style={{ height: "0.5px", background: `rgba(194,150,58,0.3)`, marginBottom: "1.5rem" }} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5" style={{ marginBottom: "1.75rem" }}>
                    {pricingFeatures.map(([left, right], i) => (
                      <div key={i} className="contents">
                        <div className="flex items-start gap-2">
                          <AmberCheck />
                          <span style={{ fontSize: 13, color: "#3D4A3B" }}>{left}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <AmberCheck />
                          <span style={{ fontSize: 13, color: "#3D4A3B" }}>{right}</span>
                        </div>
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
        </div>
      </section>

      {/* ══ FINAL CTA BAND ═══════════════════════════════════ */}
      <section
        className="relative overflow-hidden text-center"
        style={{ background: HERO_BG, padding: "clamp(5rem,10vw,9rem) 1.5rem" }}
      >
        {/* Rings */}
        {[480, 320].map((d) => (
          <div key={d} className="absolute rounded-full pointer-events-none"
            style={{ width: d, height: d, top: "50%", left: "50%", transform: "translate(-50%,-50%)", border: "1px solid rgba(255,255,255,0.04)" }}
          />
        ))}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 55% 45% at 50% 50%, rgba(194,150,58,0.07) 0%, transparent 65%)` }}
        />
        <div className="relative z-10">
          <h2
            data-aos="fade-in-up"
            style={{
              fontFamily: "var(--font-serif), Georgia, serif",
              fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              lineHeight: 1.08,
              color: "#fff",
              marginBottom: "2.25rem",
            }}
          >
            You&apos;ve been doing this alone
            <br />
            <em style={{ color: AMBER, fontStyle: "italic" }}>long enough.</em>
          </h2>
          <Link
            href="/join"
            data-aos="fade-in-up"
            data-delay="100"
            className="inline-flex items-center justify-center rounded-full text-sm font-medium"
            style={{ background: AMBER, color: "#fff", padding: "0.85rem 2.5rem" }}
          >
            Join the Circle
          </Link>
        </div>
      </section>
    </>
  );
}
