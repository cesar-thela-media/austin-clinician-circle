import Link from "next/link";

const exploreLinks = [
  { href: "/", label: "Home" },
  { href: "/who-we-are", label: "Who we are" },
  { href: "/what-we-offer", label: "What we offer" },
  { href: "/find-a-clinician", label: "Find a clinician" },
];

const memberLinks = [
  { href: "/join", label: "Apply for membership" },
  { href: "/sign-in", label: "Sign in" },
  { href: "/dashboard", label: "Member dashboard" },
  { href: "/coming-soon", label: "Free practice playbook" },
];

const memberHighlights = [
  "Monthly case consultation led by Sarah Arnold, LPC-S",
  "Curated referral network and public clinician directory",
  "Clinical tools, CEUs, and practice-building support",
];

export function Footer() {
  return (
    <footer style={{ background: "var(--color-sage-900)" }}>
      <div className="max-w-6xl mx-auto px-5 md:px-6 py-12 md:py-16">
        <div
          className="mb-10 md:mb-12 rounded-[28px] border px-6 py-7 md:px-8 md:py-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
          style={{
            background: "rgba(255,255,255,0.04)",
            borderColor: "rgba(255,255,255,0.08)",
          }}
        >
          <div className="max-w-2xl text-center lg:text-left">
            <p
              className="text-xs font-medium uppercase tracking-widest mb-3"
              style={{ color: "rgba(255,255,255,0.42)" }}
            >
              For licensed therapists in Austin
            </p>
            <h2
              className="section-title-strong text-[1.75rem] md:text-[2rem] mb-3"
              style={{ color: "#fff" }}
            >
              Deepen your work with a real community behind you.
            </h2>
            <p
              className="text-sm md:text-base leading-relaxed"
              style={{ color: "rgba(255,255,255,0.62)" }}
            >
              Consultation, referrals, resources, and practice support — all in one grounded membership designed for therapists.
            </p>
          </div>

          <div className="flex w-full lg:w-auto flex-col sm:flex-row gap-3">
            <Link
              href="/join"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ background: "var(--color-sage-700)", color: "#fff" }}
            >
              Apply for membership
            </Link>
            <Link
              href="/sign-in"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-medium transition-colors hover:bg-white/10"
              style={{
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.16)",
              }}
            >
              Sign in
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1.35fr,0.9fr,0.9fr,1fr] gap-8 md:gap-10 mb-10 md:mb-12 text-center md:text-left">
          <div>
            <p
              className="text-lg font-semibold mb-3"
              style={{
                fontFamily: "var(--font-serif), Georgia, serif",
                color: "#fff",
              }}
            >
              Austin Clinician Circle
            </p>
            <p
              className="text-sm leading-relaxed max-w-sm mx-auto md:mx-0"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              A virtual support network for licensed therapists. Deepen your work. Find your community.
            </p>
            <p
              className="text-xs mt-4 max-w-sm mx-auto md:mx-0"
              style={{ color: "rgba(255,255,255,0.42)" }}
            >
              Founded by Sarah Arnold, LPC-S at Restored Family Counseling in Austin, Texas.
            </p>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mt-5"
              style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.62)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-accent-highlight)" }} />
              <span className="text-xs font-medium">Find your community.</span>
            </div>
          </div>

          <div>
            <p
              className="text-xs font-medium uppercase tracking-widest mb-4"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Explore
            </p>
            <nav className="flex flex-col gap-2.5">
              {exploreLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm transition-colors duration-150 hover:text-white"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p
              className="text-xs font-medium uppercase tracking-widest mb-4"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Membership
            </p>
            <nav className="flex flex-col gap-2.5">
              {memberLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm transition-colors duration-150 hover:text-white"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p
              className="text-xs font-medium uppercase tracking-widest mb-4"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Inside ACC
            </p>
            <div className="flex flex-col gap-3">
              {memberHighlights.map((item) => (
                <p
                  key={item}
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div
          className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 text-center md:text-left"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
            © {new Date().getFullYear()} Austin Clinician Circle. All rights reserved.
          </p>
          <div
            className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-xs"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            <span>Austin, Texas</span>
            <span className="hidden md:inline">•</span>
            <a
              href="https://www.restoredfamily.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white transition-colors duration-150"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Restored Family Counseling
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
