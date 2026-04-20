"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/who-we-are", label: "Who we are" },
  { href: "/what-we-offer", label: "What we offer" },
  { href: "/find-a-clinician", label: "Find a clinician" },
];

export function PublicNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-200"
        style={{
          background: scrolled ? "var(--color-cream-100)" : "transparent",
          boxShadow: scrolled ? "0 1px 0 var(--color-cream-300)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="text-base font-semibold tracking-wide"
            style={{
              fontFamily: "var(--font-serif), Georgia, serif",
              color: "var(--color-sage-800)",
            }}
          >
            Austin Clinician Circle
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors duration-150"
                style={{
                  color:
                    pathname === link.href
                      ? "var(--color-sage-700)"
                      : "var(--color-text-secondary)",
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
              className="text-sm font-medium px-4 py-2 rounded-full transition-colors duration-150"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Sign in
            </Link>
            <Link
              href="/join"
              className="text-sm font-medium px-5 py-2 rounded-full transition-colors duration-150"
              style={{ background: "var(--color-sage-700)", color: "#fff" }}
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
              className="block w-5 h-0.5"
              style={{ background: "var(--color-sage-800)" }}
            />
            <span
              className="block w-5 h-0.5"
              style={{ background: "var(--color-sage-800)" }}
            />
            <span
              className="block w-5 h-0.5"
              style={{ background: "var(--color-sage-800)" }}
            />
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col px-8 py-10"
          style={{ background: "var(--color-sage-900)" }}
        >
          <div className="flex items-center justify-between mb-12">
            <span
              className="text-base font-semibold"
              style={{
                fontFamily: "var(--font-serif), Georgia, serif",
                color: "#fff",
              }}
            >
              Austin Clinician Circle
            </span>
            <button
              onClick={() => setMobileOpen(false)}
              className="text-2xl leading-none"
              style={{ color: "rgba(255,255,255,0.7)" }}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-3xl font-light"
                style={{
                  fontFamily: "var(--font-serif), Georgia, serif",
                  color: "#fff",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-3">
            <Link
              href="/sign-in"
              onClick={() => setMobileOpen(false)}
              className="text-center py-3 rounded-full text-sm font-medium border"
              style={{ color: "#fff", borderColor: "rgba(255,255,255,0.3)" }}
            >
              Sign in
            </Link>
            <Link
              href="/join"
              onClick={() => setMobileOpen(false)}
              className="text-center py-3 rounded-full text-sm font-medium"
              style={{ background: "#fff", color: "var(--color-sage-700)" }}
            >
              Join the circle
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
