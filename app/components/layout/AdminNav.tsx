"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/admin", label: "Overview", icon: "⊞" },
  { href: "/admin/members", label: "Members", icon: "◉" },
  { href: "/admin/resources", label: "Resources", icon: "◫" },
  { href: "/admin/applications", label: "Applications", icon: "◈" },
  { href: "/admin/events", label: "Events", icon: "◷" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <aside
      className="w-56 shrink-0 min-h-screen flex flex-col py-8 px-4 border-r"
      style={{
        background: "var(--color-sage-900)",
        borderColor: "rgba(255,255,255,0.08)",
      }}
    >
      <div className="px-3 mb-8">
        <p
          className="text-xs font-medium uppercase tracking-widest mb-1"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Admin
        </p>
        <span
          className="text-sm font-semibold"
          style={{
            fontFamily: "var(--font-serif), Georgia, serif",
            color: "#fff",
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
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150"
              style={{
                background: active ? "rgba(255,255,255,0.1)" : "transparent",
                color: active ? "#fff" : "rgba(255,255,255,0.6)",
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
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      >
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          <span>⇤</span> Back to site
        </Link>
      </div>
    </aside>
  );
}
