"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";

type Status = "active" | "inactive" | "suspended";

const ALL_MEMBERS = [
  { id: 1, name: "Dr. Maya Okonkwo", credentials: "LCSW", email: "maya@example.com", joined: "Jan 12, 2026", status: "active" as Status, accepting: true },
  { id: 2, name: "James Whitfield", credentials: "LPC", email: "james@example.com", joined: "Jan 28, 2026", status: "active" as Status, accepting: false },
  { id: 3, name: "Sofia Reyes", credentials: "LMFT", email: "sofia@example.com", joined: "Feb 5, 2026", status: "active" as Status, accepting: true },
  { id: 4, name: "Dr. Claire Hutchinson", credentials: "PhD", email: "claire@example.com", joined: "Feb 14, 2026", status: "active" as Status, accepting: true },
  { id: 5, name: "Marcus Lee", credentials: "LPC", email: "marcus@example.com", joined: "Apr 15, 2026", status: "active" as Status, accepting: true },
  { id: 6, name: "Priya Nair", credentials: "LCSW", email: "priya@example.com", joined: "Apr 10, 2026", status: "active" as Status, accepting: false },
  { id: 7, name: "Thomas Garza", credentials: "LMFT", email: "thomas@example.com", joined: "Apr 3, 2026", status: "active" as Status, accepting: true },
  { id: 8, name: "Rachel Bloom", credentials: "LPC", email: "rachel@example.com", joined: "Mar 20, 2026", status: "active" as Status, accepting: true },
  { id: 9, name: "Dr. Ade Kolade", credentials: "PsyD", email: "ade@example.com", joined: "Mar 8, 2026", status: "inactive" as Status, accepting: false },
  { id: 10, name: "Christine Walsh", credentials: "LPC-S", email: "christine@example.com", joined: "Feb 22, 2026", status: "suspended" as Status, accepting: false },
];

const STATUS_LABELS: Record<Status, string> = { active: "Active", inactive: "Inactive", suspended: "Suspended" };
const STATUS_VARIANTS: Record<Status, "success" | "default" | "error"> = {
  active: "success",
  inactive: "default",
  suspended: "error",
};

export default function AdminMembersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | Status>("all");

  const filtered = ALL_MEMBERS.filter((m) => {
    if (statusFilter !== "all" && m.status !== statusFilter) return false;
    if (search && !m.name.toLowerCase().includes(search.toLowerCase()) && !m.email.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: "var(--color-sage-600)" }}>Admin</p>
        <h1 style={{ fontFamily: "var(--font-serif), Manrope, sans-serif", fontSize: "2rem", fontWeight: 400, color: "var(--color-sage-900)" }}>
          Members
        </h1>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2.5 text-sm rounded-lg border outline-none"
          style={{ borderColor: "var(--color-cream-400)", background: "#fff", color: "var(--color-text-primary)" }}
        />
        <div className="flex gap-2 flex-wrap">
          {(["all", "active", "inactive", "suspended"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className="px-3 py-1.5 rounded text-xs font-medium capitalize transition-colors"
              style={{
                background: statusFilter === s ? "var(--color-sage-700)" : "var(--color-sage-50)",
                color: statusFilter === s ? "#fff" : "var(--color-sage-700)",
                border: statusFilter === s ? "none" : "1px solid var(--color-cream-300)",
              }}
            >
              {s === "all" ? "All" : STATUS_LABELS[s]}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>
        {filtered.length} member{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Table */}
      {filtered.length > 0 && (
        <div className="md:hidden flex flex-col gap-3">
          {filtered.map((m) => (
            <div
              key={m.id}
              className="rounded-2xl border bg-white p-4 flex flex-col gap-4"
              style={{ borderColor: "var(--color-cream-300)" }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium shrink-0"
                    style={{ background: "var(--color-sage-100)", color: "var(--color-sage-600)" }}
                  >
                    {m.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium" style={{ color: "var(--color-text-primary)" }}>{m.name}</p>
                    <p className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>{m.credentials}</p>
                  </div>
                </div>
                <Badge variant={STATUS_VARIANTS[m.status]}>{STATUS_LABELS[m.status]}</Badge>
              </div>
              <div className="text-sm flex flex-col gap-1.5">
                <p style={{ color: "var(--color-text-secondary)" }}>{m.email}</p>
                <p className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>Joined {m.joined}</p>
                <p className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>
                  {m.accepting ? "Accepting clients" : "Not accepting clients"}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  className="text-xs underline"
                  style={{ color: "var(--color-sage-700)", textUnderlineOffset: "3px" }}
                >
                  View
                </button>
                {m.status === "active" && (
                  <button
                    className="text-xs underline"
                    style={{ color: "var(--color-error)", textUnderlineOffset: "3px" }}
                  >
                    Suspend
                  </button>
                )}
                {m.status === "suspended" && (
                  <button
                    className="text-xs underline"
                    style={{ color: "var(--color-success)", textUnderlineOffset: "3px" }}
                  >
                    Reinstate
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div
        className="hidden md:block rounded-2xl border overflow-hidden bg-white"
        style={{ borderColor: "var(--color-cream-300)" }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-cream-300)", background: "var(--color-cream-100)" }}>
                <th className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "var(--color-text-tertiary)" }}>Name</th>
                <th className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "var(--color-text-tertiary)" }}>Email</th>
                <th className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "var(--color-text-tertiary)" }}>Joined</th>
                <th className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "var(--color-text-tertiary)" }}>Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((m, i) => (
                <tr
                  key={m.id}
                  style={{ borderBottom: i < filtered.length - 1 ? "1px solid var(--color-cream-200)" : "none" }}
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium shrink-0"
                        style={{ background: "var(--color-sage-100)", color: "var(--color-sage-600)" }}
                      >
                        {m.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium" style={{ color: "var(--color-text-primary)" }}>{m.name}</p>
                        <p className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>{m.credentials}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5" style={{ color: "var(--color-text-secondary)" }}>{m.email}</td>
                  <td className="px-5 py-3.5" style={{ color: "var(--color-text-tertiary)" }}>{m.joined}</td>
                  <td className="px-5 py-3.5">
                    <Badge variant={STATUS_VARIANTS[m.status]}>{STATUS_LABELS[m.status]}</Badge>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        className="text-xs underline"
                        style={{ color: "var(--color-sage-700)", textUnderlineOffset: "3px" }}
                      >
                        View
                      </button>
                      {m.status === "active" && (
                        <button
                          className="text-xs underline"
                          style={{ color: "var(--color-error)", textUnderlineOffset: "3px" }}
                        >
                          Suspend
                        </button>
                      )}
                      {m.status === "suspended" && (
                        <button
                          className="text-xs underline"
                          style={{ color: "var(--color-success)", textUnderlineOffset: "3px" }}
                        >
                          Reinstate
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center" style={{ color: "var(--color-text-tertiary)" }}>
          <p className="text-sm">No members match your filters.</p>
        </div>
      )}
    </div>
  );
}
