import Link from "next/link";

const benefits = [
  {
    icon: "◉",
    title: "Monthly case consultation",
    body: "A structured group consultation led by Sarah Arnold, LPC-S. Bring a real case, get real support from peers who understand the clinical realities of your work.",
    accent: "var(--color-sage-600)",
  },
  {
    icon: "◫",
    title: "Curated resource library",
    body: "Clinical tools, handouts, worksheets, and business guides, organized, downloadable, and built for active private practice.",
    accent: "var(--color-accent-highlight)",
  },
  {
    icon: "◎",
    title: "Referral network",
    body: "A trusted, vetted circle of clinicians. Refer with confidence. Get referred. Build relationships that last longer than a single consult.",
    accent: "var(--color-accent-highlight)",
  },
  {
    icon: "◈",
    title: "Continuing education",
    body: "CEU trainings each month on clinical and business topics. All virtual, all archived, and all included in your membership.",
    accent: "var(--color-sage-600)",
  },
  {
    icon: "◷",
    title: "Public directory listing",
    body: "A professionally crafted listing in our public clinician directory, searchable by specialty, format, and availability. Clients find you here.",
    accent: "var(--color-accent-highlight)",
  },
  {
    icon: "◇",
    title: "Practice coaching access",
    body: "Discounted one-on-one practice-building sessions with Sarah Arnold, LPC-S on fees, marketing, burnout, and long-term sustainability.",
    accent: "var(--color-accent-highlight)",
  },
  {
    icon: "◌",
    title: "Professional Will designation",
    body: "Guidance and structure for putting a professional will in place so your practice is cared for responsibly.",
    accent: "var(--color-sage-600)",
  },
  {
    icon: "◍",
    title: "Private online community",
    body: "A private online community for real-time support, connection, and steady encouragement between meetings.",
    accent: "var(--color-accent-highlight)",
  },
];

const steps = [
  {
    num: "01",
    title: "Apply",
    body: "Submit a short application sharing your background, specialties, and what you're looking for in a clinical community.",
  },
  {
    num: "02",
    title: "Get approved",
    body: "Applications are reviewed within 5 business days. We admit licensed clinicians who are committed to growth and peer support.",
  },
  {
    num: "03",
    title: "Join the circle",
    body: "Access the full resource library, RSVP to your first case consultation, and introduce yourself to the network.",
  },
];

export default function HomePage() {
  return (
    <>
      <section
        className="relative min-h-[100svh] md:h-screen flex flex-col pt-24 md:pt-24 pb-10 md:pb-0 overflow-hidden"
        style={{ background: "var(--color-sage-900)" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-community.svg"
          alt=""
          aria-hidden="true"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          style={{ opacity: 0.96, objectPosition: "center center" }}
        />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(27,27,27,0.88) 0%, rgba(27,27,27,0.70) 55%, rgba(27,27,27,0.40) 100%)",
          }}
        />

        <div
          className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(27,27,27,0.97) 0%, rgba(27,27,27,0.0) 100%)",
          }}
        />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 72% 38%, rgba(var(--color-accent-highlight-rgb), 0.12) 0%, transparent 55%)",
          }}
        />

        <div className="absolute -top-24 -right-24 w-[28rem] h-[28rem] rounded-full pointer-events-none"
          style={{ border: "1px solid rgba(var(--color-accent-highlight-rgb), 0.09)", animation: "float 8s ease-in-out infinite" }}
        />
        <div
          className="absolute top-16 right-24 w-64 h-64 rounded-full pointer-events-none"
          style={{ border: "1px solid rgba(var(--color-accent-highlight-rgb), 0.06)", animation: "float 12s ease-in-out infinite reverse" }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-[40rem] h-[40rem] rounded-full pointer-events-none"
          style={{ border: "1px solid rgba(var(--color-accent-highlight-rgb), 0.05)" }}
        />

        <div className="flex-1 flex items-center relative z-10">
          <div className="container-fluid py-6 md:py-10 w-full">
            <div>
              <p
                className="text-xs font-medium uppercase tracking-widest mb-6 md:mb-8 inline-flex items-center gap-2"
                style={{
                  color: "rgba(255,255,255,0.4)",
                  animation:
                    "fadeInUp 0.6s 0.1s cubic-bezier(0.16, 1, 0.3, 1) both",
                }}
              >
                <span
                  className="inline-block w-6 h-px"
                  style={{ background: "var(--color-sage-100)" }}
                />
                For licensed therapists in Austin, TX
              </p>

              <h1
                className="leading-[1.05] mb-8"
                style={{
                  fontFamily: "var(--font-serif), Manrope, sans-serif",
                  fontSize: "clamp(2.25rem, 5vw, 4rem)",
                  fontWeight: 400,
                  color: "#fff",
                  letterSpacing: "-0.01em",
                  animation:
                    "fadeInUp 0.8s 0.25s cubic-bezier(0.16, 1, 0.3, 1) both",
                }}
              >
                Deepen your work.
                <br />
                <em
                  style={{
                    color: "var(--color-hero-tagline)",
                    fontStyle: "italic",
                  }}
                >
                  Find your community.
                </em>
              </h1>

              <p
                className="text-base md:text-lg leading-relaxed mb-10 md:mb-12 max-w-xl"
                style={{
                  color: "rgba(255,255,255,0.65)",
                  animation:
                    "fadeInUp 0.8s 0.45s cubic-bezier(0.16, 1, 0.3, 1) both",
                }}
              >
                The Circle is a curated membership network for
                licensed therapists, built to end the isolation of private
                practice and deepen the clinical work you do every day.
              </p>

              <div
                className="flex flex-col sm:flex-row gap-4"
                style={{
                  animation:
                    "fadeInUp 0.8s 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
                }}
              >
                <Link
                  href="/join"
                  className="inline-flex w-full sm:w-auto items-center justify-center px-8 py-4 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-90 hover:shadow-xl"
                  style={{ background: "#fff", color: "var(--color-sage-800)" }}
                >
                  Apply for membership
                </Link>
                <Link
                  href="/what-we-offer"
                  className="inline-flex w-full sm:w-auto items-center justify-center px-8 py-4 rounded-full text-sm font-medium transition-all duration-200 hover:bg-white/10"
                  style={{
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "rgba(255,255,255,0.8)",
                  }}
                >
                  See what&apos;s included →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll indicator */}
      <div
        className="hidden md:flex fixed bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 z-20 pointer-events-none"
        style={{ animation: "fadeIn 1s 1.2s both" }}
      >
        <span
          className="w-px h-10 block"
          style={{
            background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)",
            animation: "pulseDot 2s ease-in-out infinite",
          }}
        />
      </div>

      {/* Why The Circle exists section */}
      <section
        className="py-20 md:py-28 xl:py-32 relative overflow-hidden"
        style={{ background: "var(--color-sage-700)" }}
      >
        {/* Decorative rings */}
        <div
          className="absolute -top-32 -right-32 w-[32rem] h-[32rem] rounded-full pointer-events-none"
          style={{ border: "1px solid rgba(255,255,255,0.06)" }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full pointer-events-none"
          style={{ border: "1px solid rgba(255,255,255,0.05)" }}
        />

        {/* Warm radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 50% 40%, rgba(var(--color-accent-highlight-rgb), 0.08) 0%, transparent 60%)",
          }}
        />

        {/* Subtle sage-to-cream texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 70%, rgba(255,255,255,0.8) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(255,255,255,0.6) 0%, transparent 50%)",
          }}
        />

        <div className="container-fluid text-center relative z-10">
          <p
            className="text-xs font-medium uppercase tracking-widest mb-6"
            data-aos="fade-in"
            style={{ color: "rgba(255,255,255,0.72)" }}
          >
            Why The Circle exists
          </p>
          <h2
            className="section-title-strong mb-8 leading-tight"
            data-aos="fade-in-up"
            data-delay="100"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.25rem)",
              color: "#fff",
            }}
          >
            Private practice can feel isolating.
            <br />
            <span style={{ color: "var(--color-sage-100)" }}>
              You don&apos;t have to do this alone.
            </span>
          </h2>

          {/* Accent divider */}
          <div
            className="w-16 h-px mx-auto mb-8"
            style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)" }}
          />

          <p
            className="text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-5"
            data-aos="fade-in"
            data-delay="200"
            style={{ color: "rgba(255,255,255,0.82)" }}
          >
            When you leave an agency or group practice, you gain autonomy and
            lose the built-in consultation, community, and support from
            colleagues that kept your clinical work sharp. Most therapists in
            private practice never fully replace it.
          </p>
          <p
            className="text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10 md:mb-12 font-medium"
            data-aos="fade-in"
            data-delay="300"
            style={{ color: "#fff" }}
          >
            The Circle is here to change that.
          </p>
          <div
            className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 px-6 sm:px-8 py-3.5 rounded-2xl sm:rounded-full text-center sm:text-left"
            data-aos="fade-in"
            data-delay="400"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              backdropFilter: "blur(4px)",
            }}
          >
            <span
              className="text-xs font-medium uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Founded by
            </span>
            <span
              className="text-sm font-semibold"
              style={{ color: "#fff" }}
            >
              Sarah Arnold, LPC-S
            </span>
            <span
              className="w-px h-4"
              style={{ background: "rgba(255,255,255,0.2)" }}
            />
            <span
              className="text-sm"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              Restored Family Counseling
            </span>
          </div>
        </div>
      </section>

      {/* Membership includes section */}
      <section className="py-20 md:py-28 xl:py-32" style={{ background: "var(--color-cream-100)" }}>
        <div className="container-fluid">
          <div className="mb-12 md:mb-16 xl:mb-20" data-aos="fade-in-up">
            <p
              className="text-xs font-medium uppercase tracking-widest mb-4"
              style={{ color: "var(--color-sage-600)" }}
            >
              Membership includes
            </p>
            <h2
              className="section-title-strong max-w-xl"
              style={{
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
                color: "var(--color-sage-900)",
              }}
            >
              Everything you need to thrive in private practice.
            </h2>
          </div>

          <div
            className="grid-fluid-sm"
            style={{ background: "var(--color-cream-300)", gap: "1px" }}
          >
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="group flex flex-col gap-4 p-6 md:p-8 xl:p-10 transition-all duration-500 hover:bg-white hover:shadow-lg hover:-translate-y-0.5"
                data-aos="fade-in-up"
                data-delay={String(((index % 3) + 1) * 100)}
                style={{ background: "var(--color-cream-100)" }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-base transition-all duration-300 group-hover:scale-110 group-hover:shadow-md"
                  style={{
                    background: `color-mix(in srgb, ${benefit.accent} 12%, transparent)`,
                    color: benefit.accent,
                  }}
                >
                  {benefit.icon}
                </div>
                <h3
                  className="text-base font-semibold"
                  style={{ color: "var(--color-sage-800)" }}
                >
                  {benefit.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {benefit.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting started section */}
      <section className="py-20 md:py-28 xl:py-32" style={{ background: "var(--color-cream-100)" }}>
        <div className="container-fluid">
          <div className="mb-16 text-center" data-aos="fade-in-up">
            <p
              className="text-xs font-medium uppercase tracking-widest mb-4"
              style={{ color: "var(--color-sage-600)" }}
            >
              Getting started
            </p>
            <h2
              className="section-title-strong"
              style={{
                fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                color: "var(--color-sage-900)",
              }}
            >
              How membership works.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 relative">
            {/* Connecting line */}
            <div
              className="absolute top-8 left-[16.67%] right-[16.67%] h-px hidden md:block"
              style={{
                background:
                  "linear-gradient(to right, transparent 0%, var(--color-cream-300) 15%, var(--color-cream-300) 85%, transparent 100%)",
              }}
            />

            {steps.map((step, index) => (
              <div
                key={step.num}
                className="flex flex-col gap-4 items-center md:items-start text-center md:text-left"
                data-aos="fade-in-up"
                data-delay={String((index + 1) * 150)}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center shrink-0 mb-2 relative"
                  style={{
                    background: "var(--color-cream-100)",
                    border: "2px solid var(--color-cream-300)",
                    boxShadow: "0 0 0 4px var(--color-cream-200)",
                  }}
                >
                  <span
                    className="text-2xl font-light"
                    style={{
                      fontFamily: "var(--font-serif), Manrope, sans-serif",
                      color: "var(--color-sage-700)",
                    }}
                  >
                    {step.num}
                  </span>
                </div>
                <h3
                  className="text-base font-semibold"
                  style={{ color: "var(--color-sage-800)" }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {step.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center" data-aos="fade-in" data-delay="400">
            <Link
              href="/join"
              className="inline-flex w-full sm:w-auto items-center justify-center px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5"
              style={{ background: "var(--color-sage-700)", color: "#fff" }}
            >
              Start your application →
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing section */}
      <section className="py-20 md:py-28 xl:py-32" style={{ background: "var(--color-surface-low)" }}>
        <div className="container-fluid text-center">
          <p
            className="text-xs font-medium uppercase tracking-widest mb-4"
            data-aos="fade-in"
            style={{ color: "var(--color-sage-600)" }}
          >
            Membership
          </p>
          <h2
            className="section-title-strong mb-12"
            data-aos="fade-in-up"
            data-delay="100"
            style={{
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              color: "var(--color-sage-900)",
            }}
          >
            Simple, all-inclusive pricing.
          </h2>

          <div
            className="max-w-lg mx-auto rounded-2xl border p-6 md:p-10 text-left relative overflow-hidden"
            data-aos="scale-in"
            data-delay="150"
            style={{
              background: "#fff",
              borderColor: "var(--color-cream-300)",
              boxShadow: "0 8px 48px rgba(27,27,27,0.08)",
            }}
          >
            {/* Subtle top accent */}
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{ background: "linear-gradient(to right, var(--color-sage-500), var(--color-sage-700))" }}
            />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span
                  className="font-light"
                  style={{
                    fontFamily: "var(--font-serif), Manrope, sans-serif",
                    fontSize: "clamp(2.75rem, 14vw, 3.5rem)",
                    color: "var(--color-sage-700)",
                    lineHeight: 1,
                  }}
                >
                  $79
                </span>
                <span
                  className="text-sm"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  / month
                </span>
              </div>
              <span
                className="text-xs px-3 py-1.5 rounded-full"
                style={{
                  background: "var(--color-sage-100)",
                  color: "var(--color-sage-700)",
                }}
              >
                10 benefits included
              </span>
            </div>

            <div className="flex flex-col gap-3 mb-8">
              {[
                "Monthly case consultation group",
                "CEU trainings each month",
                "Curated resource library",
                "Public clinician directory listing",
                "Vetted referral network access",
                "Practice marketing and business guidance",
                "Mindfulness and burnout prevention resources",
                "Discounted coaching with Sarah Arnold, LPC-S",
                "Professional Will designation",
                "Private online community for real-time support",
              ].map((feature, i) => (
                <div key={feature} className="flex items-start gap-3 group/feature">
                  <span
                    className="mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 group-hover/feature:scale-110"
                    style={{
                      background: "var(--color-sage-100)",
                      color: "var(--color-sage-700)",
                    }}
                  >
                    ✓
                  </span>
                  <span
                    className="text-sm transition-colors duration-300 group-hover/feature:text-[var(--color-sage-800)]"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/join"
              className="block text-center w-full py-4 rounded-full text-sm font-semibold transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5"
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
