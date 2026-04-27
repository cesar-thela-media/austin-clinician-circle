"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileSidePanel } from "@/components/layout/MobileSidePanel";

const navLinks = [
  { href: "/admin", label: "Overview", icon: "⊞" },
  { href: "/admin/members", label: "Members", icon: "◉" },
  { href: "/admin/resources", label: "Resources", icon: "◫" },
  { href: "/admin/applications", label: "Applications", icon: "◈" },
  { href: "/admin/events", label: "Events", icon: "◷" },
];

const logoutHref = "/sign-in";

export function AdminNav() {
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
          background: "rgba(var(--color-accent-highlight-rgb), 0.96)",
          borderBottom: "1px solid rgba(27,27,27,0.12)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.24em]" style={{ color: "rgba(27,27,27,0.52)" }}>
            Admin
          </p>
          <span className="text-sm font-semibold" style={{ fontFamily: "var(--font-serif), Manrope, sans-serif", color: "var(--color-text-primary)" }}>
            Austin Clinician Circle
          </span>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="flex items-center justify-center w-10 h-10 rounded-full"
          style={{ background: "rgba(27,27,27,0.08)", color: "var(--color-text-primary)" }}
          aria-label="Open admin menu"
        >
          ☰
        </button>
      </div>

      <aside
        className="hidden md:flex w-56 shrink-0 h-screen overflow-hidden flex-col py-6 px-4"
        style={{
          background: "var(--color-accent-highlight)",
          borderRight: "1px solid rgba(27,27,27,0.12)",
        }}
      >
        <div className="px-3 mb-6">
          <p
            className="text-xs font-medium uppercase tracking-widest mb-1"
            style={{ color: "rgba(27,27,27,0.52)" }}
          >
            Admin
          </p>
          <span
            className="text-sm font-semibold"
            style={{
              fontFamily: "var(--font-serif), Manrope, sans-serif",
              color: "var(--color-text-primary)",
            }}
          >
            Austin Clinician Circle
          </span>
        </div>

        <nav className="flex flex-col gap-1">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
                style={{
                  background: active ? "rgba(27,27,27,0.08)" : "transparent",
                  color: active ? "var(--color-text-primary)" : "rgba(27,27,27,0.78)",
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
          style={{ borderTop: "1px solid rgba(27,27,27,0.12)" }}
        >
          <Link
            href={logoutHref}
            className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-black/5"
            style={{ color: "rgba(27,27,27,0.84)" }}
          >
            <span>⇤</span> Log out
          </Link>
        </div>
      </aside>

      <MobileSidePanel
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        background="rgba(var(--color-accent-highlight-rgb), 0.98)"
        borderColor="rgba(27,27,27,0.12)"
        closeColor="rgba(27,27,27,0.72)"
        title={
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] mb-2" style={{ color: "rgba(27,27,27,0.52)" }}>
              Admin
            </p>
            <span className="text-base font-semibold" style={{ fontFamily: "var(--font-serif), Manrope, sans-serif", color: "var(--color-text-primary)" }}>
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
                  background: active ? "rgba(27,27,27,0.08)" : "transparent",
                  color: active ? "var(--color-text-primary)" : "rgba(27,27,27,0.82)",
                }}
              >
                <span className="text-base leading-none">{link.icon}</span>
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-6" style={{ borderTop: "1px solid rgba(27,27,27,0.12)" }}>
          <Link
            href={logoutHref}
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 hover:bg-black/5"
            style={{ color: "rgba(27,27,27,0.84)" }}
          >
            <span>⇤</span> Log out
          </Link>
        </div>
      </MobileSidePanel>
    </>
  );
}
