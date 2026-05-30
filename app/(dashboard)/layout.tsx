import type { Metadata } from "next";
import { DashboardNav } from "@/components/layout/DashboardNav";

export const metadata: Metadata = {
  title: "Dashboard | The Circle",
  description:
    "Your member dashboard. Access resources, events, your referral network, billing, and profile settings.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen md:h-screen md:overflow-hidden" style={{ background: "var(--color-cream-100)" }}>
      <DashboardNav />
      <main
        className="flex-1 min-w-0 overflow-visible md:h-screen md:overflow-y-auto pt-20 md:pt-0"
        style={{ background: "var(--color-cream-100)", color: "var(--color-text-primary)" }}
      >
        <div className="container-fluid py-8 md:py-10">{children}</div>
      </main>
    </div>
  );
}
