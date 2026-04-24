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
      className="w-56 shrink-0 min-h-screen flex flex-col py-8 px-4"
      style={{
        background: "var(--color-sage-700)",
        borderRight: "1px solid rgba(255, 255, 255, 0.12)",
      }}
    >
      <Link
        href="/dashboard"
        className="text-sm font-semibold tracking-wide px-3 mb-8 block"
        style={{
          fontFamily: "var(--font-serif), Georgia, serif",
          color: "#fff",
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
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
              style={{
                background: active ? "rgba(27, 27, 27, 0.22)" : "transparent",
                color: active ? "#fff" : "rgba(255,255,255,0.82)",
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
        <button
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full transition-all duration-300 hover:bg-white/10"
          style={{ color: "rgba(255,255,255,0.68)" }}
        >
          <span>⇤</span> Sign out
        </button>
      </div>
    </aside>
  );
}
