"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";

const CATEGORIES = ["All", "Clinical Tools", "Handouts", "Business", "Self-Care"];
const RESOURCE_TYPES = ["PDF", "Guide", "Worksheet", "Video"];

type SortKey = "title" | "category" | "type" | "published" | "downloads";
type SortDir = "asc" | "desc";

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  return (
    <span className="inline-block ml-1 text-xs" style={{ opacity: active ? 1 : 0.25 }}>
      {dir === "asc" ? "▲" : "▼"}
    </span>
  );
}

const RESOURCES = [
  { id: 1, title: "CBT Session Planning Template", category: "Clinical Tools", type: "PDF", published: "Apr 18, 2026", publishedSort: "2026-04-18", downloads: 14 },
  { id: 2, title: "Psychoeducation: Anxiety Handout", category: "Handouts", type: "PDF", published: "Apr 15, 2026", publishedSort: "2026-04-15", downloads: 22 },
  { id: 3, title: "Fee Setting for Private Practice", category: "Business", type: "Guide", published: "Apr 10, 2026", publishedSort: "2026-04-10", downloads: 19 },
  { id: 4, title: "Attachment Styles Explainer", category: "Handouts", type: "PDF", published: "Apr 8, 2026", publishedSort: "2026-04-08", downloads: 31 },
  { id: 5, title: "EMDR Phase Protocol Checklist", category: "Clinical Tools", type: "PDF", published: "Apr 3, 2026", publishedSort: "2026-04-03", downloads: 17 },
  { id: 6, title: "Marketing for Therapists: Getting Started", category: "Business", type: "Guide", published: "Mar 28, 2026", publishedSort: "2026-03-28", downloads: 25 },
  { id: 7, title: "Burnout Self-Assessment", category: "Self-Care", type: "Worksheet", published: "Mar 22, 2026", publishedSort: "2026-03-22", downloads: 38 },
  { id: 8, title: "Trauma-Informed Care Intro", category: "Clinical Tools", type: "Video", published: "Feb 28, 2026", publishedSort: "2026-02-28", downloads: 42 },
];

export default function AdminResourcesPage() {
  const [category, setCategory] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [formCategory, setFormCategory] = useState("Clinical Tools");
  const [formType, setFormType] = useState("PDF");
  const [submitted, setSubmitted] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>("published");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "title" ? "asc" : "desc");
    }
  }

  const filtered = RESOURCES.filter((r) => category === "All" || r.category === category);
  const sorted = [...filtered].sort((a, b) => {
    const mul = sortDir === "asc" ? 1 : -1;
    if (sortKey === "title") return mul * a.title.localeCompare(b.title);
    if (sortKey === "category") return mul * a.category.localeCompare(b.category);
    if (sortKey === "type") return mul * a.type.localeCompare(b.type);
    if (sortKey === "downloads") return mul * (a.downloads - b.downloads);
    return mul * a.publishedSort.localeCompare(b.publishedSort);
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowForm(false);
    }, 2000);
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
            Resources
          </h1>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="inline-flex items-center justify-center px-5 py-2 rounded-full text-sm font-medium transition-opacity hover:opacity-90 w-full sm:w-auto"
          style={{ background: "#C2963A", color: "#fff" }}
        >
          {showForm ? "Cancel" : "+ Upload resource"}
        </button>
      </div>

      {/* Upload form */}
      {showForm && (
        <div
          className="rounded-2xl border p-6 bg-white flex flex-col gap-5"
          style={{ borderColor: "rgba(194,150,58,0.12)" }}
        >
          <h2
            className="text-base"
            style={{
              fontFamily: "var(--font-serif), Georgia, serif",
              fontWeight: 400,
              color: "var(--color-sage-800)",
            }}
          >
            Upload new resource
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input label="Title" name="title" placeholder="Resource title" required />
            <Textarea label="Description" name="description" rows={3} placeholder="Brief description shown to members" required />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: "var(--color-text-secondary)" }}>Category</label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.filter((c) => c !== "All").map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setFormCategory(c)}
                      className="px-3 py-1 rounded-full text-xs font-medium transition-colors"
                      style={{
                        background: formCategory === c ? "#C2963A" : "#fff",
                        color: formCategory === c ? "#fff" : "var(--color-sage-700)",
                        border: `1px solid ${formCategory === c ? "#C2963A" : "rgba(194,150,58,0.20)"}`,
                      }}
                    >{c}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: "var(--color-text-secondary)" }}>Type</label>
                <div className="flex flex-wrap gap-2">
                  {RESOURCE_TYPES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setFormType(t)}
                      className="px-3 py-1 rounded-full text-xs font-medium transition-colors"
                      style={{
                        background: formType === t ? "#C2963A" : "#fff",
                        color: formType === t ? "#fff" : "var(--color-sage-700)",
                        border: `1px solid ${formType === t ? "#C2963A" : "rgba(194,150,58,0.20)"}`,
                      }}
                    >{t}</button>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium mb-2" style={{ color: "var(--color-text-secondary)" }}>File</label>
              <div
                className="border-2 border-dashed rounded-xl p-8 text-center"
                style={{ borderColor: "rgba(194,150,58,0.25)" }}
              >
                <p className="text-sm" style={{ color: "var(--color-text-tertiary)" }}>
                  Drag & drop a file or{" "}
                  <button type="button" className="underline" style={{ color: "#C2963A", textUnderlineOffset: "3px" }}>
                    browse
                  </button>
                </p>
                <p className="text-xs mt-1" style={{ color: "var(--color-text-tertiary)" }}>PDF, DOC, MP4 · 50MB max</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="submit"
                className="inline-flex items-center justify-center px-5 py-2 rounded-full text-sm font-medium transition-opacity hover:opacity-90"
                style={{ background: "#C2963A", color: "#fff" }}
              >
                {submitted ? "Publishing…" : "Publish resource"}
              </button>
              <Button type="button" variant="ghost" size="sm" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className="px-3 py-1.5 rounded text-xs font-medium transition-colors"
            style={{
              background: category === c ? "#C2963A" : "var(--color-cream-100)",
              color: category === c ? "#fff" : "var(--color-sage-700)",
              border: category === c ? "none" : "1px solid rgba(194,150,58,0.20)",
            }}
          >{c}</button>
        ))}
      </div>

      {/* Mobile cards */}
      <div className="md:hidden flex flex-col gap-3">
        {sorted.map((r) => (
          <div
            key={r.id}
            className="rounded-2xl border bg-white p-4 flex flex-col gap-3"
            style={{ borderColor: "rgba(194,150,58,0.12)" }}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>{r.title}</p>
                <p className="text-xs mt-1" style={{ color: "var(--color-text-tertiary)" }}>{r.published}</p>
              </div>
              <Badge>{r.category}</Badge>
            </div>
            <div className="flex items-center gap-3 flex-wrap text-xs" style={{ color: "var(--color-text-tertiary)" }}>
              <span>{r.type}</span>
              <span>•</span>
              <span>{r.downloads} downloads</span>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <button className="text-xs underline" style={{ color: "#C2963A", textUnderlineOffset: "3px" }}>Edit</button>
              <button className="text-xs underline" style={{ color: "var(--color-error)", textUnderlineOffset: "3px" }}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center flex flex-col items-center gap-3" style={{ color: "var(--color-text-tertiary)" }}>
          <span className="text-3xl" style={{ opacity: 0.3 }}>◫</span>
          <p className="text-sm">No resources match this category yet.</p>
          <button
            onClick={() => setCategory("All")}
            className="text-xs font-medium underline"
            style={{ color: "#C2963A", textUnderlineOffset: "3px" }}
          >
            View all categories
          </button>
        </div>
      )}

      {/* Desktop table */}
      <div className="hidden md:block rounded-2xl border overflow-hidden bg-white" style={{ borderColor: "rgba(194,150,58,0.12)" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(194,150,58,0.12)", background: "var(--color-cream-100)" }}>
                <th
                  className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] cursor-pointer select-none hover:opacity-70 transition-opacity"
                  style={{ color: "#C2963A" }}
                  onClick={() => toggleSort("title")}
                >
                  Title
                  <SortIcon active={sortKey === "title"} dir={sortDir} />
                </th>
                <th
                  className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] cursor-pointer select-none hover:opacity-70 transition-opacity"
                  style={{ color: "#C2963A" }}
                  onClick={() => toggleSort("category")}
                >
                  Category
                  <SortIcon active={sortKey === "category"} dir={sortDir} />
                </th>
                <th
                  className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] cursor-pointer select-none hover:opacity-70 transition-opacity"
                  style={{ color: "#C2963A" }}
                  onClick={() => toggleSort("type")}
                >
                  Type
                  <SortIcon active={sortKey === "type"} dir={sortDir} />
                </th>
                <th
                  className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] cursor-pointer select-none hover:opacity-70 transition-opacity"
                  style={{ color: "#C2963A" }}
                  onClick={() => toggleSort("published")}
                >
                  Published
                  <SortIcon active={sortKey === "published"} dir={sortDir} />
                </th>
                <th
                  className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] cursor-pointer select-none hover:opacity-70 transition-opacity"
                  style={{ color: "#C2963A" }}
                  onClick={() => toggleSort("downloads")}
                >
                  Downloads
                  <SortIcon active={sortKey === "downloads"} dir={sortDir} />
                </th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {sorted.map((r, i) => (
                <tr
                  key={r.id}
                  className="transition-colors duration-150"
                  style={{ borderBottom: i < sorted.length - 1 ? "1px solid rgba(194,150,58,0.08)" : "none" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLTableRowElement).style.background = "rgba(194,150,58,0.04)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLTableRowElement).style.background = ""; }}
                >
                  <td className="px-5 py-3.5 font-medium" style={{ color: "var(--color-text-primary)" }}>{r.title}</td>
                  <td className="px-5 py-3.5"><Badge>{r.category}</Badge></td>
                  <td className="px-5 py-3.5 text-xs" style={{ color: "var(--color-text-tertiary)" }}>{r.type}</td>
                  <td className="px-5 py-3.5" style={{ color: "var(--color-text-tertiary)" }}>{r.published}</td>
                  <td className="px-5 py-3.5" style={{ color: "var(--color-text-secondary)" }}>{r.downloads}</td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button className="text-xs underline" style={{ color: "#C2963A", textUnderlineOffset: "3px" }}>Edit</button>
                      <button className="text-xs underline" style={{ color: "var(--color-error)", textUnderlineOffset: "3px" }}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
