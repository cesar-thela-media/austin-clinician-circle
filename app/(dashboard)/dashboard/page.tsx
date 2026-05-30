import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

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

export default function DashboardPage() {
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
          Welcome back, Jane.
        </h1>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { href: "/dashboard/events", label: "RSVP to next event", icon: "◈" },
          { href: "/dashboard/network", label: "Add a referral", icon: "◎" },
          { href: "/dashboard/resources", label: "Browse resources", icon: "◫" },
        ].map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="rounded-2xl px-5 py-4 flex items-center gap-4 transition-all duration-300 hover:-translate-y-0.5 no-underline group"
            style={{
              background: "var(--color-cream-100)",
              border: "1px solid var(--color-cream-300)",
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
                style={{ borderColor: "rgba(197,200,190,0.5)" }}
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
                style={{ borderColor: "rgba(197,200,190,0.5)" }}
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
        style={{ border: "1px solid rgba(197,200,190,0.65)", background: "var(--color-cream-100)" }}
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
