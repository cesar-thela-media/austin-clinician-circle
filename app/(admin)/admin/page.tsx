import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

const stats = [
  { label: "Total members", value: "24", delta: "+2 this month", href: "/admin/members" },
  { label: "Pending applications", value: "6", delta: "Needs review", href: "/admin/applications", urgent: true },
  { label: "Events this month", value: "3", delta: "1 upcoming", href: "/admin/events" },
  { label: "Resources published", value: "48", delta: "+4 this month", href: "/admin/resources" },
];

const recentApplications = [
  { name: "Lauren Park", credentials: "LPC", submitted: "Apr 20, 2026", status: "pending" },
  { name: "DeShawn Morris", credentials: "LCSW", submitted: "Apr 19, 2026", status: "pending" },
  { name: "Ingrid Larsson", credentials: "LMFT", submitted: "Apr 17, 2026", status: "pending" },
];

const recentMembers = [
  { name: "Marcus Lee", credentials: "LPC", joined: "Apr 15, 2026" },
  { name: "Priya Nair", credentials: "LCSW", joined: "Apr 10, 2026" },
  { name: "Thomas Garza", credentials: "LMFT", joined: "Apr 3, 2026" },
];

export default function AdminOverviewPage() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: "var(--color-sage-600)" }}>
          Admin
        </p>
        <h1
          style={{
            fontFamily: "var(--font-serif), Manrope, sans-serif",
            fontSize: "2rem",
            fontWeight: 400,
            color: "var(--color-sage-900)",
          }}
        >
          Overview
        </h1>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href}>
            <Card hover className="flex flex-col gap-1 py-5 h-full">
              <p
                className="text-3xl font-light"
                style={{
                  fontFamily: "var(--font-serif), Manrope, sans-serif",
                  color: s.urgent ? "var(--color-error)" : "var(--color-sage-700)",
                }}
              >
                {s.value}
              </p>
              <p className="text-xs font-medium" style={{ color: "var(--color-text-secondary)" }}>
                {s.label}
              </p>
              <p className="text-xs" style={{ color: s.urgent ? "var(--color-error)" : "var(--color-text-tertiary)" }}>
                {s.delta}
              </p>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pending applications */}
        <Card className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold" style={{ color: "var(--color-sage-800)" }}>
              Pending applications
            </h2>
            <Link
              href="/admin/applications"
              className="text-xs underline"
              style={{ color: "var(--color-sage-600)", textUnderlineOffset: "3px" }}
            >
              View all
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {recentApplications.map((a) => (
              <div
                key={a.name}
                className="flex items-center justify-between gap-4 pb-3 border-b last:border-0 last:pb-0"
                style={{ borderColor: "var(--color-cream-300)" }}
              >
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
                    {a.name}, {a.credentials}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--color-text-tertiary)" }}>
                    Submitted {a.submitted}
                  </p>
                </div>
                <Badge variant="warning">Pending</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent members */}
        <Card className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold" style={{ color: "var(--color-sage-800)" }}>
              Recently joined
            </h2>
            <Link
              href="/admin/members"
              className="text-xs underline"
              style={{ color: "var(--color-sage-600)", textUnderlineOffset: "3px" }}
            >
              View all
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {recentMembers.map((m) => (
              <div
                key={m.name}
                className="flex items-center justify-between gap-4 pb-3 border-b last:border-0 last:pb-0"
                style={{ borderColor: "var(--color-cream-300)" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0"
                    style={{ background: "var(--color-sage-100)", color: "var(--color-sage-600)" }}
                  >
                    {m.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
                      {m.name}, {m.credentials}
                    </p>
                    <p className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>
                      Joined {m.joined}
                    </p>
                  </div>
                </div>
                <Badge variant="success">Active</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
