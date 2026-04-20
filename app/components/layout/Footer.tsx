import Link from "next/link";

export function Footer() {
  return (
    <footer style={{ background: "var(--color-sage-900)" }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
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
              className="text-sm leading-relaxed max-w-xs"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              A virtual support network for licensed therapists. Deepen your
              work. Find your community.
            </p>
          </div>

          <div>
            <p
              className="text-xs font-medium uppercase tracking-widest mb-4"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Site
            </p>
            <nav className="flex flex-col gap-2.5">
              {[
                { href: "/who-we-are", label: "Who we are" },
                { href: "/what-we-offer", label: "What we offer" },
                { href: "/find-a-clinician", label: "Find a clinician" },
                { href: "/join", label: "Join the circle" },
              ].map((link) => (
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
              Account
            </p>
            <nav className="flex flex-col gap-2.5">
              {[
                { href: "/sign-in", label: "Sign in" },
                { href: "/sign-up", label: "Create account" },
                { href: "/dashboard", label: "Member dashboard" },
              ].map((link) => (
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
        </div>

        <div
          className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
            © {new Date().getFullYear()} Austin Clinician Circle. All rights
            reserved.
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
            By{" "}
            <a
              href="https://www.restoredfamily.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white transition-colors duration-150"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Restored Family Counseling
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
