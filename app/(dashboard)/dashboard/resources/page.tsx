"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { MobileSidePanel } from "@/components/layout/MobileSidePanel";

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
const COLLECTIONS = [
  {
    title: "Clinical essentials",
    description: "Protocols, checklists, and templates you can use in session this week.",
    category: "Clinical Tools",
    type: "All",
    icon: "◎",
  },
  {
    title: "Client handout pack",
    description: "Psychoeducation tools for anxiety, attachment, and relationships.",
    category: "Handouts",
    type: "PDF",
    icon: "◫",
  },
  {
    title: "Practice growth",
    description: "Business guides for fees, marketing, and private practice systems.",
    category: "Business",
    type: "Guide",
    icon: "◈",
  },
];

export default function ResourcesPage() {
  const [category, setCategory] = useState("All");
  const [type, setType] = useState("All");
  const [search, setSearch] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(
    () =>
      RESOURCES.filter((r) => {
        if (category !== "All" && r.category !== category) return false;
        if (type !== "All" && r.type !== type) return false;
        if (
          search &&
          !`${r.title} ${r.description} ${r.category}`
            .toLowerCase()
            .includes(search.toLowerCase())
        )
          return false;
        return true;
      }),
    [category, type, search]
  );

  const featuredResource = filtered[0] ?? RESOURCES[0];
  const hasActiveFilters = Boolean(
    search.trim() || category !== "All" || type !== "All"
  );

  function clearFilters() {
    setSearch("");
    setCategory("All");
    setType("All");
  }

  function applyCollection(collection: (typeof COLLECTIONS)[number]) {
    setCategory(collection.category);
    setType(collection.type);
  }

  const filterBlocks = (
    <>
      <div>
        <p
          className="text-xs font-medium uppercase tracking-widest mb-3"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          Category
        </p>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((item) => {
            const active = category === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
                style={{
                  background: active ? "var(--color-sage-700)" : "#fff",
                  color: active ? "#fff" : "var(--color-sage-700)",
                  border: `1px solid ${
                    active ? "var(--color-sage-700)" : "var(--color-cream-300)"
                  }`,
                }}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p
          className="text-xs font-medium uppercase tracking-widest mb-3"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          Type
        </p>
        <div className="flex flex-wrap gap-2">
          {TYPES.map((item) => {
            const active = type === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setType(item)}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
                style={{
                  background: active ? "var(--color-sage-700)" : "#fff",
                  color: active ? "#fff" : "var(--color-sage-700)",
                  border: `1px solid ${
                    active ? "var(--color-sage-700)" : "var(--color-cream-300)"
                  }`,
                }}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p
          className="text-xs font-medium uppercase tracking-widest mb-3"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          Recommended collections
        </p>
        <div className="flex flex-col gap-3">
          {COLLECTIONS.map((collection) => (
            <button
              key={collection.title}
              type="button"
              onClick={() => applyCollection(collection)}
              className="text-left rounded-2xl border px-4 py-4 transition-colors hover:bg-[var(--color-cream-100)]"
              style={{ borderColor: "var(--color-cream-300)", background: "#fff" }}
            >
              <div className="flex items-start gap-3">
                <span
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm shrink-0"
                  style={{ background: "var(--color-sage-50)", color: "var(--color-sage-700)" }}
                >
                  {collection.icon}
                </span>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--color-sage-800)" }}>
                    {collection.title}
                  </p>
                  <p className="text-xs mt-1 leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                    {collection.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: "var(--color-sage-600)" }}>
            Resources
          </p>
          <h1 style={{ fontFamily: "var(--font-serif), Manrope, sans-serif", fontSize: "2rem", fontWeight: 400, color: "var(--color-sage-900)" }}>
            Resource library
          </h1>
          <p className="text-sm mt-2 max-w-2xl" style={{ color: "var(--color-text-secondary)" }}>
            Browse the clinical tools, handouts, and business guides members return to most often.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { value: RESOURCES.length, label: "Resources available" },
            { value: 12, label: "Updated this month" },
            { value: 7, label: "Member favorites" },
          ].map((stat) => (
            <Card key={stat.label} className="flex flex-col gap-1">
              <p
                className="text-3xl font-light"
                style={{ fontFamily: "var(--font-serif), Manrope, sans-serif", color: "var(--color-sage-700)" }}
              >
                {stat.value}
              </p>
              <p className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>{stat.label}</p>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="flex-1">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search resources, topics, or formats..."
            className="h-12"
          />
        </div>
        <div className="flex gap-2 sm:w-auto">
          {hasActiveFilters && (
            <Button variant="secondary" size="md" onClick={clearFilters} className="flex-1 sm:flex-none">
              Clear filters
            </Button>
          )}
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden px-5 py-3 rounded-full text-sm font-medium"
            style={{ background: "var(--color-sage-700)", color: "#fff" }}
          >
            Filters
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <aside className="hidden lg:flex lg:w-72 shrink-0 flex-col gap-4 self-start sticky top-24">
          <Card className="flex flex-col gap-6">{filterBlocks}</Card>
        </aside>

        <div className="flex-1 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>
              {filtered.length} resource{filtered.length !== 1 ? "s" : ""} in your library
            </p>
            <Badge variant="accent">Updated weekly</Badge>
          </div>

          <Card className="grid grid-cols-1 md:grid-cols-[1.2fr,0.8fr] gap-6 md:gap-8">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--color-sage-600)" }}>
                Featured this week
              </p>
              <h2
                className="section-title-strong"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--color-sage-900)" }}
              >
                {featuredResource.title}
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                {featuredResource.description}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <Badge>{featuredResource.category}</Badge>
                <Badge variant="highlight">{featuredResource.type}</Badge>
                <span className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>{featuredResource.date}</span>
              </div>
            </div>

            <div
              className="rounded-2xl px-5 py-5 flex flex-col gap-4"
              style={{ background: "var(--color-cream-100)", border: "1px solid var(--color-cream-300)" }}
            >
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--color-sage-800)" }}>
                  Why members keep using this
                </p>
                <p className="text-xs mt-1" style={{ color: "var(--color-text-secondary)" }}>
                  It&apos;s concise, practical, and ready to use in session or supervision.
                </p>
              </div>
              <div className="flex flex-col gap-2 text-xs" style={{ color: "var(--color-text-secondary)" }}>
                <p>• Recommended by 9 members this month</p>
                <p>• Pairs well with your consultation group notes</p>
                <p>• Great for client prep and supervision follow-up</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                <Button size="sm">Download</Button>
                <Button variant="secondary" size="sm">Preview</Button>
              </div>
            </div>
          </Card>

          {filtered.length === 0 ? (
            <Card className="py-14 text-center">
              <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                No resources match your current search and filters.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-4 text-sm font-medium underline"
                style={{ color: "var(--color-sage-700)", textUnderlineOffset: "3px" }}
              >
                Reset library view
              </button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((resource) => (
                <Card key={resource.title} hover className="flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-3">
                    <Badge>{resource.category}</Badge>
                    <span className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>{resource.type}</span>
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <h3 className="text-sm font-semibold" style={{ color: "var(--color-sage-800)" }}>{resource.title}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{resource.description}</p>
                  </div>
                  <div className="flex items-center justify-between gap-3 mt-auto">
                    <span className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>{resource.date}</span>
                    <div className="flex items-center gap-3">
                      <button className="text-xs font-medium underline" style={{ color: "var(--color-sage-700)", textUnderlineOffset: "3px" }}>
                        Preview
                      </button>
                      <button className="text-xs font-medium underline" style={{ color: "var(--color-sage-700)", textUnderlineOffset: "3px" }}>
                        Download
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <MobileSidePanel
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        side="right"
        hideAbove="lg"
        background="var(--color-cream-100)"
        borderColor="rgba(197,200,190,0.7)"
        titleColor="var(--color-sage-900)"
        closeColor="var(--color-text-secondary)"
        title={
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] mb-2" style={{ color: "var(--color-sage-600)" }}>
              Resource library
            </p>
            <span className="text-base font-semibold" style={{ fontFamily: "var(--font-serif), Georgia, serif" }}>
              Refine results
            </span>
          </div>
        }
      >
        <div className="flex flex-col gap-6">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search resources..."
          />
          {filterBlocks}
          <div className="mt-auto pt-6 flex flex-col gap-3" style={{ borderTop: "1px solid var(--color-cream-300)" }}>
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              className="w-full py-3 rounded-full text-sm font-medium"
              style={{ background: "var(--color-sage-700)", color: "#fff" }}
            >
              Show {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </button>
            <button
              type="button"
              onClick={() => {
                clearFilters();
                setMobileFiltersOpen(false);
              }}
              className="w-full py-3 rounded-full text-sm font-medium"
              style={{ background: "#fff", color: "var(--color-sage-700)", border: "1px solid var(--color-cream-300)" }}
            >
              Clear filters
            </button>
          </div>
        </div>
      </MobileSidePanel>
    </div>
  );
}
