import Link from "next/link";
import { cookies } from "next/headers";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const AMBER = "#C2963A";
const SAGE = "#2D3B2C";

const lockedResources = [
  { title: "CBT Session Planning Template", category: "Clinical Tools", locked: true },
  { title: "Fee Setting for Private Practice", category: "Business", locked: true },
  { title: "Psychoeducation: Anxiety Handout", category: "Handouts", locked: true },
];

const upcomingEvents = [
  { title: "Monthly case consultation", date: "Thu, Jun 5 · 9:00–10:30am", locked: true },
  { title: "Practice building workshop", date: "Wed, Jun 14 · 12:00–1:00pm", locked: true },
];

export default async function FreeDashboardPage() {
  const jar = await cookies();
  const name = jar.get("acc_demo_name")?.value?.replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.)\s+/i, "").split(" ")[0] || "there";

  return (
    <div className="flex flex-col gap-8 max-w-4xl">
      {/* Welcome banner */}
      <Card className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start" style={{ background: SAGE, border: "none" }}>
        <div className="flex-1">
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] mb-3" style={{ color: AMBER }}>Welcome, {name}</p>
          <h1 className="text-2xl md:text-3xl mb-3 leading-tight" style={{ fontFamily: "var(--font-serif), Georgia, serif", fontWeight: 400, color: "#fff" }}>
            Your free playbook is ready.
          </h1>
          <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.6)" }}>
            You have access to The Private Practice Playbook — a practical guide for building a sustainable practice. Upgrade to unlock the full Circle.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#" className="inline-flex items-center gap-2 rounded-full text-sm font-medium px-5 py-2.5 transition-opacity hover:opacity-90" style={{ background: AMBER, color: "#fff" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              Download your playbook
            </a>
            <Link href="/join" className="inline-flex items-center rounded-full text-sm font-medium px-5 py-2.5 transition-opacity hover:opacity-90" style={{ border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.8)" }}>
              Upgrade to full access →
            </Link>
          </div>
        </div>
        <div className="shrink-0 w-full md:w-40 h-48 rounded-xl flex flex-col items-center justify-center gap-2" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Your Playbook</span>
        </div>
      </Card>

      {/* Upgrade banner */}
      <div className="rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4" style={{ background: "rgba(194,150,58,0.08)", border: "1px solid rgba(194,150,58,0.18)" }}>
        <div className="flex-1">
          <p className="text-sm font-semibold mb-1" style={{ color: SAGE }}>Ready for the full experience?</p>
          <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>Monthly case consultation, CEUs, referral network, resource library, and more — all included.</p>
        </div>
        <Link href="/join" className="shrink-0 rounded-full text-sm font-medium px-6 py-2.5 transition-opacity hover:opacity-90" style={{ background: AMBER, color: "#fff" }}>
          Upgrade — $79/mo
        </Link>
      </div>

      {/* Locked Resources */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold" style={{ color: "var(--color-sage-800)" }}>Resource library</h2>
          <Badge variant="warning">Upgrade to unlock</Badge>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {lockedResources.map((r) => (
            <div key={r.title} className="rounded-xl p-4 relative overflow-hidden" style={{ background: "var(--color-cream-100)", border: "1px solid var(--color-cream-300)", opacity: 0.6 }}>
              <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(240,237,230,0.5)", backdropFilter: "blur(1px)" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-tertiary)" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
              <p className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>{r.title}</p>
              <Badge variant="default">{r.category}</Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Locked Events */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold" style={{ color: "var(--color-sage-800)" }}>Upcoming events</h2>
          <Badge variant="warning">Upgrade to RSVP</Badge>
        </div>
        <div className="flex flex-col gap-2">
          {upcomingEvents.map((e) => (
            <div key={e.title} className="rounded-xl p-4 flex items-center justify-between opacity-60" style={{ background: "var(--color-cream-100)", border: "1px solid var(--color-cream-300)" }}>
              <div>
                <p className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>{e.title}</p>
                <p className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>{e.date}</p>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-tertiary)" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
          ))}
        </div>
      </div>

      {/* Locked Network */}
      <div className="rounded-2xl p-6 text-center" style={{ background: "var(--color-cream-100)", border: "1px solid var(--color-cream-300)" }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-tertiary)" strokeWidth="1.2" strokeLinecap="round" className="mx-auto mb-3" style={{ opacity: 0.4 }}><circle cx="12" cy="10" r="3"/><path d="M12 13v4"/><path d="M8 17h8"/><circle cx="5" cy="7" r="2"/><circle cx="19" cy="7" r="2"/><path d="M6.5 8.5 9 10"/><path d="M15 10l2.5-1.5"/></svg>
        <p className="text-sm font-semibold mb-1" style={{ color: "var(--color-sage-800)" }}>Clinician network</p>
        <p className="text-xs mb-4" style={{ color: "var(--color-text-tertiary)" }}>Connect with vetted clinicians. Send and receive referrals confidently.</p>
        <Link href="/join" className="inline-flex items-center rounded-full text-sm font-medium px-5 py-2 transition-opacity hover:opacity-90" style={{ background: AMBER, color: "#fff" }}>
          Upgrade to connect
        </Link>
      </div>

      {/* Bottom CTA */}
      <div className="text-center py-6">
        <p className="text-2xl mb-1" style={{ fontFamily: "var(--font-serif), Georgia, serif", fontWeight: 400, color: SAGE }}>$79<span className="text-sm" style={{ color: "var(--color-text-tertiary)" }}>/month</span></p>
        <p className="text-sm mb-4" style={{ color: "var(--color-text-secondary)" }}>Everything included. Cancel anytime.</p>
        <Link href="/join" className="inline-flex items-center rounded-full text-sm font-medium px-8 py-3 transition-opacity hover:opacity-90" style={{ background: AMBER, color: "#fff" }}>
          Apply for membership
        </Link>
      </div>
    </div>
  );
}
