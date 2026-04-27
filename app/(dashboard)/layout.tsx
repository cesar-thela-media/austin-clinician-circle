import { DashboardNav } from "@/components/layout/DashboardNav";

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
        <div className="max-w-5xl mx-auto px-5 md:px-8 py-8 md:py-10">{children}</div>
      </main>
    </div>
  );
}
