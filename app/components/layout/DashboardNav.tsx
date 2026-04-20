"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/dashboard", label: "Overview", icon: "⊞" },
  { href: "/dashboard/resources", label: "Resources", icon: "◫" },
  { href: "/dashboard/events", label: "Events", icon: "◷" },
  { href: "/dashboard/network", label: "Network", icon: "◎" },
  { href: "/dashboard/profile", label: "Profile", icon: "◉" },
  { href: "/dashboard/billing", label: "Billing", icon: "◈" },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <aside
      className="w-56 shrink-0 min-h-screen flex flex-col py-8 px-4 border-r"
      style={{
        background: "var(--color-cream-100)",
        borderColor: "var(--color-cream-300)",
      }}
    >
      <Link
        href="/dashboard"
        className="text-sm font-semibold tracking-wide px-3 mb-8 block"
        style={{
          fontFamily: "var(--font-serif), Georgia, serif",
          color: "var(--color-sage-800)",
        }}
      >
        Austin Clinician Circle
      </Link>

      <nav className="flex flex-col gap-1">
        {navLinks.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150"
              style={{
                background: active ? "var(--color-sage-100)" : "transparent",
                color: active
                  ? "var(--color-sage-700)"
                  : "var(--color-text-secondary)",
              }}
            >
              <span className="text-base leading-none">{link.icon}</span>
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div
        className="mt-auto pt-6 border-t"
        style={{ borderColor: "var(--color-cream-300)" }}
      >
        <button
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium w-full transition-colors duration-150 hover:bg-[var(--color-cream-200)]"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          <span>⇤</span> Sign out
        </button>
      </div>
    </aside>
  );
}
