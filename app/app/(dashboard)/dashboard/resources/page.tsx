"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const RESOURCES = [
  { title: "CBT Session Planning Template", category: "Clinical Tools", type: "PDF", date: "Apr 18, 2026", description: "A structured template for planning CBT sessions across presenting concerns." },
  { title: "Psychoeducation: Anxiety Handout", category: "Handouts", type: "PDF", date: "Apr 15, 2026", description: "Client-facing psychoeducation on the anxiety cycle, suitable for most adult clients." },
  { title: "Fee Setting for Private Practice", category: "Business", type: "Guide", date: "Apr 10, 2026", description: "A practical guide to setting, communicating, and adjusting fees in private practice." },
  { title: "Attachment Styles Explainer", category: "Handouts", type: "PDF", date: "Apr 8, 2026", description: "One-page overview of attachment styles for client psychoeducation." },
  { title: "EMDR Phase Protocol Checklist", category: "Clinical Tools", type: "PDF", date: "Apr 3, 2026", description: "Phase-by-phase checklist for standard EMDR protocol." },
  { title: "Marketing for Therapists: Getting Started", category: "Business", type: "Guide", date: "Mar 28, 2026", description: "How to build an effective online presence and fill your caseload." },
  { title: "Burnout Self-Assessment", category: "Self-Care", type: "Worksheet", date: "Mar 22, 2026", description: "A clinician self-assessment tool for recognizing and tracking burnout symptoms." },
  { title: "Gottman Four Horsemen Handout", category: "Handouts", type: "PDF", date: "Mar 17, 2026", description: "Client handout explaining the four communication patterns that predict relationship breakdown." },
  { title: "Mindfulness Practices for Clinicians", category: "Self-Care", type: "Guide", date: "Mar 10, 2026", description: "A curated set of brief mindfulness practices designed for therapist self-care between sessions." },
  { title: "Insurance vs. Private Pay: Pros & Cons", category: "Business", type: "Guide", date: "Mar 5, 2026", description: "An honest breakdown of the trade-offs between insurance panels and private pay practice." },
  { title: "Trauma-Informed Care Intro", category: "Clinical Tools", type: "Video", date: "Feb 28, 2026", description: "Introduction to trauma-informed principles for general clinical practice." },
  { title: "Intake Form Template", category: "Clinical Tools", type: "PDF", date: "Feb 20, 2026", description: "A customizable intake form template for new clients in private practice." },
];

const CATEGORIES = ["All", "Clinical Tools", "Handouts", "Business", "Self-Care"];
const TYPES = ["All", "PDF", "Guide", "Worksheet", "Video"];

export default function ResourcesPage() {
  const [category, setCategory] = useState("All");
  const [type, setType] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = RESOURCES.filter((r) => {
    if (category !== "All" && r.category !== category) return false;
    if (type !== "All" && r.type !== type) return false;
    if (search && !r.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: "var(--color-sage-600)" }}>Resources</p>
        <h1 style={{ fontFamily: "var(--font-serif), Manrope, sans-serif", fontSize: "2rem", fontWeight: 400, color: "var(--color-sage-900)" }}>
          Resource library
        </h1>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search resources..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2.5 text-sm rounded-lg border outline-none"
          style={{ borderColor: "var(--color-cream-400)", background: "#fff", color: "var(--color-text-primary)" }}
        />
        <div className="flex flex-wrap gap-2">
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
        <div className="flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className="px-3 py-1.5 rounded text-xs font-medium transition-colors"
              style={{
                background: type === t ? "var(--color-sage-700)" : "var(--color-sage-50)",
                color: type === t ? "#fff" : "var(--color-sage-700)",
                border: type === t ? "none" : "1px solid var(--color-cream-300)",
              }}
            >{t}</button>
          ))}
        </div>
      </div>

      <p className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>
        {filtered.length} resource{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((r) => (
          <Card key={r.title} hover className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <Badge>{r.category}</Badge>
              <span className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>{r.type}</span>
            </div>
            <h3 className="text-sm font-semibold" style={{ color: "var(--color-sage-800)" }}>{r.title}</h3>
            <p className="text-xs leading-relaxed flex-1" style={{ color: "var(--color-text-secondary)" }}>{r.description}</p>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>{r.date}</span>
              <button
                className="text-xs font-medium underline"
                style={{ color: "var(--color-sage-700)", textUnderlineOffset: "3px" }}
              >
                Download
              </button>
            </div>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center" style={{ color: "var(--color-text-tertiary)" }}>
          <p className="text-sm">No resources match your filters.</p>
        </div>
      )}
    </div>
  );
}
