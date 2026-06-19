import Link from "next/link";

const AMBER = "#C2963A";
const BG    = "#2D3B2C";

const quickLinks = [
  { href: "/who-we-are",   label: "Who we are" },
  { href: "/what-we-offer", label: "Membership" },
  { href: "/coming-soon",  label: "Community" },
  { href: "/coming-soon",  label: "Resources" },
  { href: "/coming-soon",  label: "Events" },
];

const insideLinks = [
  { href: "/find-a-clinician",      label: "Member Directory" },
  { href: "/coming-soon",           label: "Consultation Groups" },
  { href: "/dashboard/resources",   label: "Resource Library" },
  { href: "/coming-soon",           label: "Continuing Education" },
  { href: "/coming-soon",           label: "FAQs" },
];

export function Footer() {
  return (
    <footer style={{ background: BG }}>
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-[1.5fr,1fr,1fr,1fr] gap-10 mb-10">
          {/* Brand */}
          <div>
            <Link href="/" aria-label="Austin Clinician Circle" className="inline-block mb-1">
              <img
                src="/logo.png"
                alt="Austin Clinician Circle"
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-xs mb-6" style={{ color: "rgba(255,255,255,0.48)" }}>
              Connection. Consultation. Community.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-2.5">
              {[
                { label: "Instagram", path: "M7.5 2h5a5.5 5.5 0 0 1 5.5 5.5v5A5.5 5.5 0 0 1 12.5 18h-5A5.5 5.5 0 0 1 2 12.5v-5A5.5 5.5 0 0 1 7.5 2zm2.5 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm5-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" },
                { label: "LinkedIn",  path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 hover:bg-white/10"
                  style={{ border: "1px solid rgba(255,255,255,0.14)" }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
              <a
                href="mailto:hello@austincliniciancircle.org"
                aria-label="Email"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 hover:bg-white/10"
                style={{ border: "1px solid rgba(255,255,255,0.14)" }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M2 7l10 7 10-7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.22em] mb-4" style={{ color: AMBER }}>
              Quick Links
            </p>
            <nav className="flex flex-col gap-2.5">
              {quickLinks.map((l) => (
                <Link key={l.label} href={l.href} className="text-[13px] transition-colors duration-150 hover:text-white" style={{ color: "rgba(255,255,255,0.55)" }}>
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Inside ACC */}
          <div>
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.22em] mb-4" style={{ color: AMBER }}>
              Inside ACC
            </p>
            <nav className="flex flex-col gap-2.5">
              {insideLinks.map((l) => (
                <Link key={l.label} href={l.href} className="text-[13px] transition-colors duration-150 hover:text-white" style={{ color: "rgba(255,255,255,0.55)" }}>
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Community */}
          <div>
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.22em] mb-4" style={{ color: AMBER }}>
              Community
            </p>
            <div className="flex flex-col gap-2.5">
              <p className="text-[13px]" style={{ color: "rgba(255,255,255,0.55)" }}>Austin, Texas</p>
              <a href="mailto:hello@austincliniciancircle.org" className="text-[13px] transition-colors duration-150 hover:text-white" style={{ color: "rgba(255,255,255,0.55)" }}>
                hello@austincliniciancircle.org
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar — thin amber hairline top */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: `1px solid rgba(194,150,58,0.2)` }}
        >
          <p className="text-[11.5px]" style={{ color: "rgba(255,255,255,0.32)" }}>
            © {new Date().getFullYear()} Austin Clinician Circle. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {["Privacy", "Terms"].map((label) => (
              <Link key={label} href="/coming-soon" className="text-[11.5px] transition-colors duration-150 hover:text-white" style={{ color: "rgba(255,255,255,0.32)" }}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
