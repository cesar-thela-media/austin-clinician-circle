"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileSidePanel } from "@/components/layout/MobileSidePanel";

const navLinks = [
  { href: "/who-we-are", label: "Who we are" },
  { href: "/what-we-offer", label: "What we offer" },
  { href: "/find-a-clinician", label: "Find a clinician" },
];

export function PublicNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isHomepage = pathname === "/";

  useEffect(() => {
    if (!isHomepage) return;
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [isHomepage]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* Announcement bar — always dark, always visible */}
        <div
          style={{
            background: "var(--color-sage-900)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="max-w-6xl mx-auto px-6 py-2.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse-dot shrink-0"
                style={{ background: "var(--color-sage-500)" }}
              />
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
                Now accepting founding members —{" "}
                <strong style={{ color: "#fff" }}>24 of 40 spots filled.</strong>{" "}
                Applications reviewed weekly.
              </p>
            </div>
            <Link
              href="/join"
              className="text-xs font-semibold shrink-0 hidden sm:block transition-opacity hover:opacity-80"
              style={{ color: "var(--color-accent-highlight)" }}
            >
              Apply now →
            </Link>
          </div>
        </div>

        {/* Nav — transparent on hero (homepage only), solid elsewhere */}
        <div
          className="transition-all duration-300"
          style={{
            background: isHomepage && !scrolled ? "transparent" : "rgba(248, 250, 243, 0.92)",
            backdropFilter: isHomepage && !scrolled ? "none" : "blur(20px)",
            WebkitBackdropFilter: isHomepage && !scrolled ? "none" : "blur(20px)",
            borderBottom: isHomepage && !scrolled
              ? "none"
              : "1px solid rgba(223, 227, 218, 0.6)",
          }}
        >
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link
              href="/"
              className="text-base font-semibold tracking-wide transition-colors duration-300"
              style={{
                fontFamily: "var(--font-serif), Georgia, serif",
                color: isHomepage && !scrolled ? "#fff" : "var(--color-sage-800)",
              }}
            >
              Austin Clinician Circle
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium transition-colors duration-300"
                  style={{
                    color: isHomepage && !scrolled
                      ? pathname === link.href ? "var(--color-accent-highlight)" : "rgba(255,255,255,0.85)"
                      : pathname === link.href ? "var(--color-sage-700)" : "var(--color-text-secondary)",
                    textDecoration: pathname === link.href ? "underline" : "none",
                    textUnderlineOffset: "4px",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/sign-in"
                className="text-sm font-medium px-4 py-2 rounded-full transition-all duration-300"
                style={{
                  color: isHomepage && !scrolled ? "rgba(255,255,255,0.85)" : "var(--color-text-secondary)",
                }}
              >
                Sign in
              </Link>
              <Link
                href="/join"
                className="text-sm font-medium px-5 py-2 rounded-full transition-all duration-300"
                style={{
                  background: "var(--color-sage-700)",
                  color: "#fff",
                  border: isHomepage && !scrolled ? "1px solid rgba(255,255,255,0.12)" : "none",
                  boxShadow: "0 10px 28px rgba(74, 93, 78, 0.18)",
                }}
              >
                Join the circle
              </Link>
            </div>

            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <span
                className="block w-5 h-0.5 transition-colors duration-300"
                style={{ background: isHomepage && !scrolled ? "#fff" : "var(--color-sage-800)" }}
              />
              <span
                className="block w-5 h-0.5 transition-colors duration-300"
                style={{ background: isHomepage && !scrolled ? "#fff" : "var(--color-sage-800)" }}
              />
              <span
                className="block w-5 h-0.5 transition-colors duration-300"
                style={{ background: isHomepage && !scrolled ? "#fff" : "var(--color-sage-800)" }}
              />
            </button>
          </div>
        </div>
      </header>

      <MobileSidePanel
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        side="right"
        background="rgba(27,27,27,0.98)"
        borderColor="rgba(255,255,255,0.08)"
        title={
          <div>
            <p
              className="text-[11px] font-medium uppercase tracking-[0.24em] mb-2"
              style={{ color: "rgba(255,255,255,0.42)" }}
            >
              Navigate
            </p>
            <span
              className="text-base font-semibold"
              style={{
                fontFamily: "var(--font-serif), Georgia, serif",
                color: "#fff",
              }}
            >
              Austin Clinician Circle
            </span>
          </div>
        }
      >
        <nav className="flex flex-col gap-2">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-2xl text-base font-medium transition-all duration-300"
                style={{
                  background: active ? "rgba(74,93,78,0.24)" : "transparent",
                  color: active ? "#fff" : "rgba(255,255,255,0.84)",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div
          className="mt-8 pt-6 flex flex-col gap-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <Link
            href="/sign-in"
            onClick={() => setMobileOpen(false)}
            className="text-center py-3 rounded-full text-sm font-medium border transition-all duration-300"
            style={{ color: "#fff", borderColor: "rgba(255,255,255,0.2)" }}
          >
            Sign in
          </Link>
          <Link
            href="/join"
            onClick={() => setMobileOpen(false)}
            className="text-center py-3 rounded-full text-sm font-medium transition-all duration-300"
            style={{ background: "var(--color-sage-700)", color: "#fff" }}
          >
            Join the circle
          </Link>
        </div>
      </MobileSidePanel>
    </>
  );
}
