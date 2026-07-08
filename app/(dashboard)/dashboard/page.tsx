import { currentUser } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import { hasClerkCredentials } from "@/lib/env";

const upcomingEvents = [
  {
    title: "Monthly case consultation",
    date: "Thu, May 1 · 9:00–10:30am",
    format: "Virtual",
    rsvp: true,
  },
  {
    title: "Practice building workshop",
    date: "Wed, May 14 · 12:00–1:00pm",
    format: "Virtual",
    rsvp: false,
  },
  {
    title: "Trauma-informed care CEU",
    date: "Fri, May 23 · 10:00am–12:00pm",
    format: "Virtual",
    rsvp: false,
  },
];

const recentResources = [
  { title: "CBT Session Planning Template", category: "Clinical Tools" },
  { title: "Fee Setting for Private Practice", category: "Business" },
  { title: "Psychoeducation: Anxiety Handout", category: "Handouts" },
];

export default async function DashboardPage() {
  let firstName = "there";
  if (hasClerkCredentials) {
    const user = await currentUser();
    if (user?.firstName) firstName = user.firstName;
  } else {
    const jar = await cookies();
    const demoCookieName = jar.get("acc_demo_name")?.value;
    if (demoCookieName) firstName = demoCookieName.replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.)\s+/i, "").split(" ")[0];
  }

  return (
    <div className="flex flex-col gap-10 2xl:gap-14">
      {/* Header */}
      <div>
        <p
          className="text-xs font-medium uppercase tracking-widest mb-2"
          style={{ color: "var(--color-sage-600)" }}
        >
          Member dashboard
        </p>
        <h1 className="text-page-title">
          Welcome back, {firstName}.
        </h1>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { href: "/dashboard/events", label: "RSVP to next event", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="9" y1="14" x2="9" y2="18"/><line x1="15" y1="14" x2="15" y2="18"/></svg> },
          { href: "/dashboard/network", label: "Add a referral", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="10" r="3"/><path d="M12 13v4"/><path d="M8 17h8"/><circle cx="5" cy="7" r="2"/><circle cx="19" cy="7" r="2"/><path d="M6.5 8.5 9 10"/><path d="M15 10l2.5-1.5"/></svg> },
          { href: "/dashboard/resources", label: "Browse resources", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><line x1="8" y1="7" x2="16" y2="7"/><line x1="8" y1="11" x2="14" y2="11"/></svg> },
        ].map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="rounded-2xl px-5 py-4 flex items-center gap-4 transition-all duration-300 hover:-translate-y-0.5 no-underline group"
            style={{
              background: "var(--color-cream-100)",
              border: "1px solid rgba(194,150,58,0.12)",
            }}
          >
            <span
              className="w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0"
              style={{ background: "var(--color-sage-100)", color: "var(--color-sage-600)" }}
            >
              {action.icon}
            </span>
            <span className="text-sm font-medium group-hover:text-[var(--color-sage-800)]" style={{ color: "var(--color-sage-800)" }}>
              {action.label} →
            </span>
          </Link>
        ))}
      </div>

      {/* Member spotlight */}
      <Card className="flex flex-col sm:flex-row items-start gap-5">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-medium shrink-0"
          style={{ background: "var(--color-sage-100)", color: "var(--color-sage-600)" }}
        >
          MO
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-eyebrow">
            Member spotlight
          </p>
          <p className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>
            Dr. Maya Okonkwo, LCSW
          </p>
          <p className="text-sm mt-1 leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
            "The consultation group alone is worth the membership. I've found referral partners I actually trust, and the resource library saves me hours every week."
          </p>
          <div className="flex items-center gap-2 mt-3">
            <Link
              href="/dashboard/network"
              className="text-xs font-medium underline"
              style={{ color: "var(--color-sage-700)", textUnderlineOffset: "3px" }}
            >
              Connect with Maya →
            </Link>
            <span className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>·</span>
            <Link
              href="/dashboard/network"
              className="text-xs underline"
              style={{ color: "var(--color-sage-600)", textUnderlineOffset: "3px" }}
            >
              View all members
            </Link>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upcoming events */}
        <Card className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2
              className="text-base font-semibold"
              style={{ color: "var(--color-sage-800)" }}
            >
              Upcoming events
            </h2>
            <Link
              href="/dashboard/events"
              className="text-xs underline"
              style={{ color: "var(--color-sage-600)", textUnderlineOffset: "3px" }}
            >
              View all
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            {upcomingEvents.map((ev) => (
              <div
                key={ev.title}
                className="flex items-start justify-between gap-4 pb-4 border-b last:border-0 last:pb-0"
                style={{ borderColor: "rgba(194,150,58,0.12)" }}
              >
                <div>
                  <p
                    className="text-sm font-medium"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {ev.title}
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "var(--color-text-tertiary)" }}
                  >
                    {ev.date}
                  </p>
                </div>
                {ev.rsvp ? (
                  <Badge variant="success">RSVP&apos;d</Badge>
                ) : (
                  <Link href="/dashboard/events">
                    <Badge>RSVP</Badge>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Recent resources */}
        <Card className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2
              className="text-base font-semibold"
              style={{ color: "var(--color-sage-800)" }}
            >
              New resources
            </h2>
            <Link
              href="/dashboard/resources"
              className="text-xs underline"
              style={{ color: "var(--color-sage-600)", textUnderlineOffset: "3px" }}
            >
              View all
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            {recentResources.map((r) => (
              <div
                key={r.title}
                className="flex items-center justify-between gap-4 pb-4 border-b last:border-0 last:pb-0"
                style={{ borderColor: "rgba(194,150,58,0.12)" }}
              >
                <p
                  className="text-sm"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {r.title}
                </p>
                <Badge>{r.category}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Membership status */}
      <Card
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        style={{ border: "1px solid rgba(194,150,58,0.15)", background: "var(--color-cream-100)" }}
      >
        <div>
          <p
            className="text-sm font-semibold"
            style={{ color: "var(--color-sage-800)" }}
          >
            Active membership
          </p>
          <p className="text-xs mt-0.5" style={{ color: "var(--color-text-tertiary)" }}>
            $79/month · Renews May 21, 2026
          </p>
        </div>
        <Link
          href="/dashboard/billing"
          className="text-xs font-medium underline"
          style={{ color: "var(--color-sage-700)", textUnderlineOffset: "3px" }}
        >
          Manage billing →
        </Link>
      </Card>
    </div>
  );
}
