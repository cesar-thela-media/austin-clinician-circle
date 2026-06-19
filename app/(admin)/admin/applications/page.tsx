"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

type AppStatus = "pending" | "approved" | "rejected";

const APPLICATIONS = [
  {
    id: 1,
    name: "Lauren Park",
    credentials: "LPC",
    email: "lauren@example.com",
    city: "Austin, TX",
    submitted: "Apr 20, 2026",
    status: "pending" as AppStatus,
    bio: "I'm a licensed counselor with 4 years of experience specializing in anxiety, perfectionism, and identity work with young adults. I'm looking for a collegial community to support my private practice growth.",
    specialties: ["Anxiety", "Young Adults", "Identity"],
    format: "Telehealth",
    licenseNumber: "LPC-91032",
  },
  {
    id: 2,
    name: "DeShawn Morris",
    credentials: "LCSW",
    email: "deshawn@example.com",
    city: "Austin, TX",
    submitted: "Apr 19, 2026",
    status: "pending" as AppStatus,
    bio: "Clinical social worker with 7 years experience, primarily working with men, cultural identity, and workplace stress. Private practice for 2 years.",
    specialties: ["Men", "Cultural Identity", "Workplace"],
    format: "Both",
    licenseNumber: "LCSW-44820",
  },
  {
    id: 3,
    name: "Ingrid Larsson",
    credentials: "LMFT",
    email: "ingrid@example.com",
    city: "Austin, TX",
    submitted: "Apr 17, 2026",
    status: "pending" as AppStatus,
    bio: "Marriage and family therapist with a focus on couples and attachment. I've been in private practice for 6 years and am passionate about peer consultation.",
    specialties: ["Couples", "Attachment", "Family"],
    format: "In-person",
    licenseNumber: "LMFT-77391",
  },
  {
    id: 4,
    name: "Tamara Wells",
    credentials: "LPC",
    email: "tamara@example.com",
    city: "Austin, TX",
    submitted: "Apr 10, 2026",
    status: "approved" as AppStatus,
    bio: "LPC specializing in perinatal mental health and postpartum support.",
    specialties: ["Perinatal", "Postpartum", "Women"],
    format: "Telehealth",
    licenseNumber: "LPC-60812",
  },
  {
    id: 5,
    name: "Ryan Calloway",
    credentials: "LPC",
    email: "ryan@example.com",
    city: "Houston, TX",
    submitted: "Apr 8, 2026",
    status: "rejected" as AppStatus,
    bio: "Counselor based in Houston, applied but does not meet Austin-area requirement.",
    specialties: ["Depression", "CBT"],
    format: "Telehealth",
    licenseNumber: "LPC-55144",
  },
];

const STATUS_VARIANTS: Record<AppStatus, "warning" | "success" | "error"> = {
  pending: "warning",
  approved: "success",
  rejected: "error",
};

export default function AdminApplicationsPage() {
  const [statuses, setStatuses] = useState<Record<number, AppStatus>>(
    Object.fromEntries(APPLICATIONS.map((a) => [a.id, a.status]))
  );
  const [expanded, setExpanded] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | AppStatus>("pending");

  function decide(id: number, decision: "approved" | "rejected") {
    setStatuses((prev) => ({ ...prev, [id]: decision }));
  }

  const filtered = APPLICATIONS.filter((a) => filter === "all" || statuses[a.id] === filter);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p
          className="text-[11px] font-medium uppercase tracking-[0.2em] mb-1"
          style={{ color: "#C2963A" }}
        >
          Admin
        </p>
        <h1
          style={{
            fontFamily: "var(--font-serif), Georgia, serif",
            fontWeight: 400,
            fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
            color: "var(--color-sage-800)",
            lineHeight: 1.15,
          }}
        >
          Applications
        </h1>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {(["pending", "approved", "rejected", "all"] as const).map((f) => {
          const count = f === "all" ? APPLICATIONS.length : APPLICATIONS.filter((a) => statuses[a.id] === f).length;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-3 py-1.5 rounded text-xs font-medium capitalize transition-colors"
              style={{
                background: filter === f ? "#C2963A" : "var(--color-cream-100)",
                color: filter === f ? "#fff" : "var(--color-sage-700)",
                border: filter === f ? "none" : "1px solid rgba(194,150,58,0.20)",
              }}
            >
              {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)} ({count})
            </button>
          );
        })}
      </div>

      {/* Application cards */}
      <div className="flex flex-col gap-4">
        {filtered.map((app) => {
          const status = statuses[app.id];
          const isExpanded = expanded === app.id;
          return (
            <div
              key={app.id}
              className="bg-white rounded-2xl border overflow-hidden transition-all duration-200"
              style={{
                borderColor: "rgba(194,150,58,0.12)",
                boxShadow: isExpanded ? "0 4px 20px rgba(194,150,58,0.08)" : "none",
              }}
            >
              <button
                className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 transition-colors duration-150"
                style={{}}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(194,150,58,0.03)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = ""; }}
                onClick={() => setExpanded(isExpanded ? null : app.id)}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium shrink-0"
                    style={{ background: "rgba(194,150,58,0.10)", color: "#C2963A" }}
                  >
                    {app.name.charAt(0)}
                  </div>
                  <div>
                    <p
                      className="text-base"
                      style={{
                        fontFamily: "var(--font-serif), Georgia, serif",
                        fontWeight: 400,
                        color: "var(--color-sage-800)",
                      }}
                    >
                      {app.name}, {app.credentials}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--color-text-tertiary)" }}>
                      {app.email} · {app.city} · Submitted {app.submitted}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <Badge variant={STATUS_VARIANTS[status]}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Badge>
                  <span
                    className="text-lg"
                    style={{
                      color: "var(--color-text-tertiary)",
                      transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                      display: "inline-block",
                      transition: "transform 0.15s",
                    }}
                  >
                    ⌄
                  </span>
                </div>
              </button>

              {isExpanded && (
                <div
                  className="px-6 pb-6 border-t pt-5 flex flex-col gap-5"
                  style={{ borderColor: "rgba(194,150,58,0.10)" }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p
                        className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-1"
                        style={{ color: "#C2963A" }}
                      >
                        License
                      </p>
                      <p style={{ color: "var(--color-text-primary)" }}>{app.credentials} · {app.licenseNumber}</p>
                    </div>
                    <div>
                      <p
                        className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-1"
                        style={{ color: "#C2963A" }}
                      >
                        Format
                      </p>
                      <p style={{ color: "var(--color-text-primary)" }}>{app.format}</p>
                    </div>
                    <div>
                      <p
                        className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-1"
                        style={{ color: "#C2963A" }}
                      >
                        Specialties
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {app.specialties.map((s) => <Badge key={s}>{s}</Badge>)}
                      </div>
                    </div>
                  </div>
                  <div>
                    <p
                      className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-2"
                      style={{ color: "#C2963A" }}
                    >
                      Statement
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                      {app.bio}
                    </p>
                  </div>
                  {status === "pending" && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => decide(app.id, "approved")}
                        className="inline-flex items-center justify-center px-5 py-2 rounded-full text-sm font-medium transition-opacity hover:opacity-90"
                        style={{ background: "#C2963A", color: "#fff" }}
                      >
                        Approve
                      </button>
                      <Button variant="destructive" size="sm" onClick={() => decide(app.id, "rejected")}>
                        Reject
                      </Button>
                    </div>
                  )}
                  {status !== "pending" && (
                    <div className="flex items-center gap-2">
                      <Badge variant={STATUS_VARIANTS[status]}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </Badge>
                      <button
                        className="text-xs underline"
                        style={{ color: "var(--color-text-tertiary)", textUnderlineOffset: "3px" }}
                        onClick={() => decide(app.id, status === "approved" ? "rejected" : "approved")}
                      >
                        Undo
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center flex flex-col items-center gap-3" style={{ color: "var(--color-text-tertiary)" }}>
          <span className="text-3xl" style={{ opacity: 0.3 }}>◷</span>
          <p className="text-sm">No applications in this category.</p>
          <button
            onClick={() => setFilter("pending")}
            className="text-xs font-medium underline"
            style={{ color: "#C2963A", textUnderlineOffset: "3px" }}
          >
            View pending applications
          </button>
        </div>
      )}
    </div>
  );
}
