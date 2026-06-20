"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileSidePanel } from "@/components/layout/MobileSidePanel";

const navLinks = [
  { href: "/who-we-are",   label: "Who we are" },
  { href: "/what-we-offer", label: "What we offer" },
  { href: "/find-a-clinician",  label: "Community" },
  { href: "/what-we-offer",  label: "Resources" },
];

export function PublicNav() {
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const onDark = isHome && !scrolled;

  useEffect(() => {
    if (!isHome) return;
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [isHome]);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-50">
        <div
          className="transition-all duration-300"
          style={{
            background: onDark ? "transparent" : "rgba(240,237,230,0.94)",
            backdropFilter: onDark ? "none" : "blur(20px)",
            WebkitBackdropFilter: onDark ? "none" : "blur(20px)",
            borderBottom: onDark ? "none" : "1px solid rgba(194,150,58,0.14)",
          }}
        >
          <div className="max-w-7xl mx-auto px-6 py-1 flex items-center justify-between gap-8">
            {/* Logo */}
            <Link href="/" className="shrink-0" aria-label="Austin Clinician Circle">
              <img
                src="/logo.png"
                alt="Austin Clinician Circle"
                className="h-16 w-auto transition-all duration-300"
                style={{
                  filter: onDark ? "none" : "brightness(0) saturate(100%) invert(15%) sepia(3%) saturate(685%) hue-rotate(60deg) brightness(95%) contrast(89%)",
                }}
              />
            </Link>

            {/* Desktop nav with dot separators */}
            <nav className="hidden lg:flex items-center gap-0">
              {navLinks.map((link, i) => (
                <span key={link.href + link.label} className="flex items-center">
                  {i > 0 && (
                    <span
                      className="mx-3 select-none text-xs"
                      style={{ color: onDark ? "rgba(255,255,255,0.28)" : "rgba(45,59,44,0.22)" }}
                    >·</span>
                  )}
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-300 hover:opacity-70"
                    style={{ color: onDark ? "rgba(255,255,255,0.8)" : "#3D4A3B" }}
                  >
                    {link.label}
                  </Link>
                </span>
              ))}
            </nav>

            {/* Right actions */}
            <div className="hidden lg:flex items-center gap-5 shrink-0">
              <Link
                href="/sign-in"
                className="text-sm transition-colors duration-300 hover:opacity-70"
                style={{ color: onDark ? "rgba(255,255,255,0.8)" : "#3D4A3B" }}
              >
                Sign In
              </Link>
              <Link
                href="/join"
                className="text-sm px-5 py-2 rounded-full transition-all duration-300"
                style={{
                  border: onDark ? "1px solid rgba(255,255,255,0.45)" : "1px solid #C2963A",
                  color: onDark ? "#fff" : "#C2963A",
                  background: "transparent",
                  fontWeight: 500,
                }}
              >
                Join the Circle
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden flex flex-col gap-1.5 p-2 ml-auto"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              {[0, 1, 2].map((n) => (
                <span key={n} className="block w-5 h-0.5" style={{ background: onDark ? "#fff" : "#2D3B2C" }} />
              ))}
            </button>
          </div>
        </div>
      </header>

      <MobileSidePanel
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        side="right"
        background="rgba(45,59,44,0.98)"
        borderColor="rgba(255,255,255,0.08)"
        title={
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] mb-2" style={{ color: "rgba(255,255,255,0.38)" }}>Navigate</p>
            <span className="text-base" style={{ fontFamily: "var(--font-serif), Georgia, serif", fontWeight: 400, color: "#fff" }}>
              Austin Clinician Circle
            </span>
          </div>
        }
      >
        <nav className="flex flex-col gap-1.5">
          {navLinks.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="px-4 py-3 rounded-xl text-base transition-all duration-200"
              style={{
                background: pathname === link.href ? "rgba(194,150,58,0.18)" : "transparent",
                color: pathname === link.href ? "#C2963A" : "rgba(255,255,255,0.8)",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-8 pt-6 flex flex-col gap-3" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <Link href="/sign-in" onClick={() => setMobileOpen(false)} className="text-center py-3 rounded-full text-sm border transition-all duration-200" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.2)" }}>
            Sign In
          </Link>
          <Link href="/join" onClick={() => setMobileOpen(false)} className="text-center py-3 rounded-full text-sm font-medium transition-all duration-200" style={{ border: "1px solid #C2963A", color: "#C2963A", background: "transparent" }}>
            Join the Circle
          </Link>
        </div>
      </MobileSidePanel>
    </>
  );
}
