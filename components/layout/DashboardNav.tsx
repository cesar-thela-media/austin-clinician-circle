"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileSidePanel } from "@/components/layout/MobileSidePanel";
import { SignOutAction } from "@/components/auth/SignOutAction";

const navLinks = [
  { href: "/dashboard", label: "Overview", icon: "⊞" },
  { href: "/dashboard/resources", label: "Resources", icon: "◫" },
  { href: "/dashboard/files", label: "Files", icon: "◰" },
  { href: "/dashboard/events", label: "Events", icon: "◷" },
  { href: "/dashboard/network", label: "Network", icon: "◎" },
  { href: "/dashboard/profile", label: "Profile", icon: "◉" },
  { href: "/dashboard/billing", label: "Billing", icon: "◈" },
];

export function DashboardNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-40 h-16 px-4 flex items-center justify-between"
        style={{
          background: "rgba(45,59,44,0.96)",
          borderBottom: "1px solid rgba(255,255,255,0.12)",
          backdropFilter: "blur(16px)",
        }}
      >
        <Link
          href="/dashboard"
          className="shrink-0"
          aria-label="Austin Clinician Circle"
        >
          <img
            src="/logo.png"
            alt="Austin Clinician Circle"
            className="h-9 w-auto"
          />
        </Link>

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="flex items-center justify-center w-10 h-10 rounded-full"
          style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}
          aria-label="Open dashboard menu"
        >
          ☰
        </button>
      </div>

      <aside
        className="hidden md:flex w-56 shrink-0 h-screen overflow-hidden flex-col py-6 px-4"
        style={{
          background: "var(--color-sage-800)",
          borderRight: "1px solid rgba(255, 255, 255, 0.10)",
        }}
      >
        <Link
          href="/dashboard"
          className="px-3 mb-6 block"
          aria-label="Austin Clinician Circle"
        >
          <img
            src="/logo.png"
            alt="Austin Clinician Circle"
            className="h-9 w-auto"
          />
        </Link>

        <nav className="flex flex-col gap-1">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
                style={{
                  background: active ? "rgba(194,150,58,0.18)" : "transparent",
                  color: active ? "#C2963A" : "rgba(255,255,255,0.78)",
                  borderLeft: active ? "3px solid #C2963A" : "3px solid transparent",
                }}
              >
                <span className="text-base leading-none">{link.icon}</span>
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div
          className="mt-auto pt-6"
          style={{ borderTop: "1px solid rgba(255, 255, 255, 0.12)" }}
        >
          <SignOutAction
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full transition-all duration-300 hover:bg-white/10"
            style={{ color: "rgba(255,255,255,0.68)" }}
          />
        </div>
      </aside>

      <MobileSidePanel
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        background="var(--color-sage-800)"
        borderColor="rgba(255,255,255,0.10)"
        title={
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] mb-2" style={{ color: "rgba(255,255,255,0.48)" }}>
              Member dashboard
            </p>
            <span className="text-base font-semibold" style={{ fontFamily: "var(--font-serif), Georgia, serif", color: "#fff" }}>
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
                className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300"
                style={{
                  background: active ? "rgba(194,150,58,0.18)" : "transparent",
                  color: active ? "#C2963A" : "rgba(255,255,255,0.78)",
                  borderLeft: active ? "3px solid #C2963A" : "3px solid transparent",
                }}
              >
                <span className="text-base leading-none">{link.icon}</span>
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
          <SignOutAction
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium w-full transition-all duration-300 hover:bg-white/10"
            style={{ color: "rgba(255,255,255,0.72)" }}
            onSignedOut={() => setMobileOpen(false)}
          />
        </div>
      </MobileSidePanel>
    </>
  );
}
