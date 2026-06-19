"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";

type Status = "active" | "inactive" | "suspended";
type SortKey = "name" | "joined" | "status";
type SortDir = "asc" | "desc";

const ALL_MEMBERS = [
  { id: 1, name: "Dr. Maya Okonkwo", credentials: "LCSW", email: "maya@example.com", joined: "Jan 12, 2026", joinedSort: "2026-01-12", status: "active" as Status, accepting: true },
  { id: 2, name: "James Whitfield", credentials: "LPC", email: "james@example.com", joined: "Jan 28, 2026", joinedSort: "2026-01-28", status: "active" as Status, accepting: false },
  { id: 3, name: "Sofia Reyes", credentials: "LMFT", email: "sofia@example.com", joined: "Feb 5, 2026", joinedSort: "2026-02-05", status: "active" as Status, accepting: true },
  { id: 4, name: "Dr. Claire Hutchinson", credentials: "PhD", email: "claire@example.com", joined: "Feb 14, 2026", joinedSort: "2026-02-14", status: "active" as Status, accepting: true },
  { id: 5, name: "Marcus Lee", credentials: "LPC", email: "marcus@example.com", joined: "Apr 15, 2026", joinedSort: "2026-04-15", status: "active" as Status, accepting: true },
  { id: 6, name: "Priya Nair", credentials: "LCSW", email: "priya@example.com", joined: "Apr 10, 2026", joinedSort: "2026-04-10", status: "active" as Status, accepting: false },
  { id: 7, name: "Thomas Garza", credentials: "LMFT", email: "thomas@example.com", joined: "Apr 3, 2026", joinedSort: "2026-04-03", status: "active" as Status, accepting: true },
  { id: 8, name: "Rachel Bloom", credentials: "LPC", email: "rachel@example.com", joined: "Mar 20, 2026", joinedSort: "2026-03-20", status: "active" as Status, accepting: true },
  { id: 9, name: "Dr. Ade Kolade", credentials: "PsyD", email: "ade@example.com", joined: "Mar 8, 2026", joinedSort: "2026-03-08", status: "inactive" as Status, accepting: false },
  { id: 10, name: "Christine Walsh", credentials: "LPC-S", email: "christine@example.com", joined: "Feb 22, 2026", joinedSort: "2026-02-22", status: "suspended" as Status, accepting: false },
];

const STATUS_LABELS: Record<Status, string> = { active: "Active", inactive: "Inactive", suspended: "Suspended" };
const STATUS_VARIANTS: Record<Status, "success" | "default" | "error"> = {
  active: "success",
  inactive: "default",
  suspended: "error",
};

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  return (
    <span className="inline-block ml-1 text-xs" style={{ opacity: active ? 1 : 0.25 }}>
      {dir === "asc" ? "▲" : "▼"}
    </span>
  );
}

export default function AdminMembersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | Status>("all");
  const [sortKey, setSortKey] = useState<SortKey>("joined");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "name" ? "asc" : "desc");
    }
  }

  const filtered = ALL_MEMBERS.filter((m) => {
    if (statusFilter !== "all" && m.status !== statusFilter) return false;
    if (search && !m.name.toLowerCase().includes(search.toLowerCase()) && !m.email.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }).sort((a, b) => {
    const mul = sortDir === "asc" ? 1 : -1;
    if (sortKey === "name") return mul * a.name.localeCompare(b.name);
    if (sortKey === "status") return mul * a.status.localeCompare(b.status);
    return mul * a.joinedSort.localeCompare(b.joinedSort);
  });

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
          className="flex-1 px-4 py-2.5 text-sm rounded-lg border outline-none transition-colors"
          style={{
            borderColor: "rgba(194,150,58,0.20)",
            background: "#fff",
            color: "var(--color-text-primary)",
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = "#C2963A"; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(194,150,58,0.20)"; }}
        />
        <div className="flex gap-2 flex-wrap">
          {(["all", "active", "inactive", "suspended"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className="px-3 py-1.5 rounded text-xs font-medium capitalize transition-colors"
              style={{
                background: statusFilter === s ? "#C2963A" : "var(--color-cream-100)",
                color: statusFilter === s ? "#fff" : "var(--color-sage-700)",
                border: statusFilter === s ? "none" : "1px solid rgba(194,150,58,0.20)",
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

      {/* Mobile cards */}
      {filtered.length > 0 && (
        <div className="md:hidden flex flex-col gap-3">
          {filtered.map((m) => (
            <div
              key={m.id}
              className="rounded-2xl border bg-white p-4 flex flex-col gap-4"
              style={{ borderColor: "rgba(194,150,58,0.12)" }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium shrink-0"
                    style={{ background: "rgba(194,150,58,0.10)", color: "#C2963A" }}
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
                  style={{ color: "#C2963A", textUnderlineOffset: "3px" }}
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

      {/* Desktop table */}
      <div
        className="hidden md:block rounded-2xl border overflow-hidden bg-white"
        style={{ borderColor: "rgba(194,150,58,0.12)" }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(194,150,58,0.12)", background: "var(--color-cream-100)" }}>
                <th
                  className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] cursor-pointer select-none hover:opacity-70 transition-opacity"
                  style={{ color: "#C2963A" }}
                  onClick={() => toggleSort("name")}
                >
                  Name
                  <SortIcon active={sortKey === "name"} dir={sortDir} />
                </th>
                <th
                  className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: "#C2963A" }}
                >
                  Email
                </th>
                <th
                  className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] cursor-pointer select-none hover:opacity-70 transition-opacity"
                  style={{ color: "#C2963A" }}
                  onClick={() => toggleSort("joined")}
                >
                  Joined
                  <SortIcon active={sortKey === "joined"} dir={sortDir} />
                </th>
                <th
                  className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] cursor-pointer select-none hover:opacity-70 transition-opacity"
                  style={{ color: "#C2963A" }}
                  onClick={() => toggleSort("status")}
                >
                  Status
                  <SortIcon active={sortKey === "status"} dir={sortDir} />
                </th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((m, i) => (
                <tr
                  key={m.id}
                  className="transition-colors duration-150"
                  style={{
                    borderBottom: i < filtered.length - 1 ? "1px solid rgba(194,150,58,0.08)" : "none",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLTableRowElement).style.background = "rgba(194,150,58,0.04)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLTableRowElement).style.background = ""; }}
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium shrink-0"
                        style={{ background: "rgba(194,150,58,0.10)", color: "#C2963A" }}
                      >
                        {m.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm" style={{ color: "var(--color-text-primary)" }}>{m.name}</p>
                          {m.accepting && (
                            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--color-success)" }} />
                          )}
                        </div>
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
                        style={{ color: "#C2963A", textUnderlineOffset: "3px" }}
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
        <div className="py-20 text-center flex flex-col items-center gap-3" style={{ color: "var(--color-text-tertiary)" }}>
          <span className="text-3xl" style={{ opacity: 0.3 }}>◎</span>
          <p className="text-sm">No members match your filters.</p>
          <button
            onClick={() => { setSearch(""); setStatusFilter("all"); }}
            className="text-xs font-medium underline"
            style={{ color: "#C2963A", textUnderlineOffset: "3px" }}
          >
            Reset all filters
          </button>
        </div>
      )}
    </div>
  );
}
