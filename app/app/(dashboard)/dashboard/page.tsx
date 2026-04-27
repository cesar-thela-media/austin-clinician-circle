import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

const stats = [
  { label: "Resources available", value: "48" },
  { label: "Members in network", value: "24" },
  { label: "Events this month", value: "3" },
  { label: "CEU credits logged", value: "6.5" },
];

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
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div>
        <p
          className="text-xs font-medium uppercase tracking-widest mb-2"
          style={{ color: "var(--color-sage-600)" }}
        >
          Member dashboard
        </p>
        <h1
          style={{
            fontFamily: "var(--font-serif), Manrope, sans-serif",
            fontSize: "2rem",
            fontWeight: 400,
            color: "var(--color-sage-900)",
          }}
        >
          Welcome back, Jane.
        </h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="flex flex-col gap-1 py-5">
            <p
              className="text-3xl font-light"
              style={{
                fontFamily: "var(--font-serif), Manrope, sans-serif",
                color: "var(--color-sage-700)",
              }}
            >
              {s.value}
            </p>
            <p className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>
              {s.label}
            </p>
          </Card>
        ))}
      </div>

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
                  <Badge>RSVP</Badge>
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

      {/* Weekly milestone — warm accent callout */}
      <div
        className="rounded-2xl p-6 flex items-center justify-between gap-6"
        style={{
          background: "rgba(var(--color-accent-highlight-rgb), 0.16)",
          border: "1px solid rgba(var(--color-accent-highlight-rgb), 0.24)",
        }}
      >
        <div className="flex flex-col gap-1">
          <p
            className="text-xs font-medium uppercase tracking-widest"
            style={{ color: "var(--color-text-primary)" }}
          >
            Weekly ritual
          </p>
          <p
            className="text-base font-semibold"
            style={{
              fontFamily: "var(--font-serif), Manrope, sans-serif",
              color: "var(--color-text-primary)",
              fontSize: "1.25rem",
            }}
          >
            You&apos;ve attended 4 consultation groups in a row.
          </p>
          <p className="text-sm mt-0.5" style={{ color: "var(--color-text-primary)" }}>
            Consistency is the foundation of great clinical work.
          </p>
        </div>
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-2xl shrink-0"
          style={{
            background: "rgba(255,255,255,0.45)",
            color: "var(--color-sage-700)",
          }}
        >
          ◈
        </div>
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
            $129/month · Renews May 21, 2026
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
