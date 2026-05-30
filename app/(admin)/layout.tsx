import type { Metadata } from "next";
import { AdminNav } from "@/components/layout/AdminNav";

export const metadata: Metadata = {
  title: "Admin | The Circle",
  description:
    "Admin dashboard for managing members, applications, events, and resources.",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen md:h-screen md:overflow-hidden" style={{ background: "var(--color-cream-100)" }}>
      <AdminNav />
      <main className="flex-1 min-w-0 overflow-visible md:h-screen md:overflow-y-auto pt-20 md:pt-0" style={{ background: "var(--color-cream-100)", color: "var(--color-text-primary)" }}>
        <div className="container-fluid py-8 md:py-10">{children}</div>
      </main>
    </div>
  );
}
