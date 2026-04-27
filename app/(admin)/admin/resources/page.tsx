"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";

const CATEGORIES = ["All", "Clinical Tools", "Handouts", "Business", "Self-Care"];
const RESOURCE_TYPES = ["PDF", "Guide", "Worksheet", "Video"];

const RESOURCES = [
  { id: 1, title: "CBT Session Planning Template", category: "Clinical Tools", type: "PDF", published: "Apr 18, 2026", downloads: 14 },
  { id: 2, title: "Psychoeducation: Anxiety Handout", category: "Handouts", type: "PDF", published: "Apr 15, 2026", downloads: 22 },
  { id: 3, title: "Fee Setting for Private Practice", category: "Business", type: "Guide", published: "Apr 10, 2026", downloads: 19 },
  { id: 4, title: "Attachment Styles Explainer", category: "Handouts", type: "PDF", published: "Apr 8, 2026", downloads: 31 },
  { id: 5, title: "EMDR Phase Protocol Checklist", category: "Clinical Tools", type: "PDF", published: "Apr 3, 2026", downloads: 17 },
  { id: 6, title: "Marketing for Therapists: Getting Started", category: "Business", type: "Guide", published: "Mar 28, 2026", downloads: 25 },
  { id: 7, title: "Burnout Self-Assessment", category: "Self-Care", type: "Worksheet", published: "Mar 22, 2026", downloads: 38 },
  { id: 8, title: "Trauma-Informed Care Intro", category: "Clinical Tools", type: "Video", published: "Feb 28, 2026", downloads: 42 },
];

export default function AdminResourcesPage() {
  const [category, setCategory] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [formCategory, setFormCategory] = useState("Clinical Tools");
  const [formType, setFormType] = useState("PDF");
  const [submitted, setSubmitted] = useState(false);

  const filtered = RESOURCES.filter((r) => category === "All" || r.category === category);

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
          <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: "var(--color-sage-600)" }}>Admin</p>
          <h1 style={{ fontFamily: "var(--font-serif), Manrope, sans-serif", fontSize: "2rem", fontWeight: 400, color: "var(--color-sage-900)" }}>
            Resources
          </h1>
        </div>
        <Button variant="primary" size="sm" className="w-full sm:w-auto" onClick={() => setShowForm((v) => !v)}>
          {showForm ? "Cancel" : "+ Upload resource"}
        </Button>
      </div>

      {/* Upload form */}
      {showForm && (
        <div
          className="rounded-2xl border p-6 bg-white flex flex-col gap-5"
          style={{ borderColor: "var(--color-cream-300)" }}
        >
          <h2 className="text-base font-semibold" style={{ color: "var(--color-sage-800)" }}>Upload new resource</h2>
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
                        background: formCategory === c ? "var(--color-sage-700)" : "#fff",
                        color: formCategory === c ? "#fff" : "var(--color-sage-700)",
                        border: `1px solid ${formCategory === c ? "var(--color-sage-700)" : "var(--color-cream-300)"}`,
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
                        background: formType === t ? "var(--color-sage-700)" : "#fff",
                        color: formType === t ? "#fff" : "var(--color-sage-700)",
                        border: `1px solid ${formType === t ? "var(--color-sage-700)" : "var(--color-cream-300)"}`,
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
                style={{ borderColor: "var(--color-cream-400)" }}
              >
                <p className="text-sm" style={{ color: "var(--color-text-tertiary)" }}>
                  Drag & drop a file or{" "}
                  <button type="button" className="underline" style={{ color: "var(--color-sage-700)", textUnderlineOffset: "3px" }}>
                    browse
                  </button>
                </p>
                <p className="text-xs mt-1" style={{ color: "var(--color-text-tertiary)" }}>PDF, DOC, MP4 · 50MB max</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button type="submit" variant="primary" size="sm">
                {submitted ? "Publishing…" : "Publish resource"}
              </Button>
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
              background: category === c ? "var(--color-sage-700)" : "var(--color-sage-50)",
              color: category === c ? "#fff" : "var(--color-sage-700)",
              border: category === c ? "none" : "1px solid var(--color-cream-300)",
            }}
          >{c}</button>
        ))}
      </div>

      {/* Resource table */}
      <div className="md:hidden flex flex-col gap-3">
        {filtered.map((r) => (
          <div
            key={r.id}
            className="rounded-2xl border bg-white p-4 flex flex-col gap-3"
            style={{ borderColor: "var(--color-cream-300)" }}
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
              <button className="text-xs underline" style={{ color: "var(--color-sage-700)", textUnderlineOffset: "3px" }}>Edit</button>
              <button className="text-xs underline" style={{ color: "var(--color-error)", textUnderlineOffset: "3px" }}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center" style={{ color: "var(--color-text-tertiary)" }}>
          <p className="text-sm">No resources match this category yet.</p>
        </div>
      )}

      <div className="hidden md:block rounded-2xl border overflow-hidden bg-white" style={{ borderColor: "var(--color-cream-300)" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-cream-300)", background: "var(--color-cream-100)" }}>
                <th className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "var(--color-text-tertiary)" }}>Title</th>
                <th className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "var(--color-text-tertiary)" }}>Category</th>
                <th className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "var(--color-text-tertiary)" }}>Type</th>
                <th className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "var(--color-text-tertiary)" }}>Published</th>
                <th className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "var(--color-text-tertiary)" }}>Downloads</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={r.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid var(--color-cream-200)" : "none" }}>
                  <td className="px-5 py-3.5 font-medium" style={{ color: "var(--color-text-primary)" }}>{r.title}</td>
                  <td className="px-5 py-3.5"><Badge>{r.category}</Badge></td>
                  <td className="px-5 py-3.5 text-xs" style={{ color: "var(--color-text-tertiary)" }}>{r.type}</td>
                  <td className="px-5 py-3.5" style={{ color: "var(--color-text-tertiary)" }}>{r.published}</td>
                  <td className="px-5 py-3.5" style={{ color: "var(--color-text-secondary)" }}>{r.downloads}</td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button className="text-xs underline" style={{ color: "var(--color-sage-700)", textUnderlineOffset: "3px" }}>Edit</button>
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
