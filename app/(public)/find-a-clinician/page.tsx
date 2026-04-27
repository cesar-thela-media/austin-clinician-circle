"use client";

import { useState } from "react";
import { ClinicianCard } from "@/components/cards/ClinicianCard";
import { MobileSidePanel } from "@/components/layout/MobileSidePanel";

const ALL_CLINICIANS = [
  {
    name: "Dr. Maya Okonkwo",
    credentials: "LCSW",
    tagline: "Trauma-informed care for adults navigating complex grief, loss, and identity transitions.",
    specialties: ["Trauma", "Grief", "Identity"],
    format: "Virtual only",
    modality: "Individual therapy",
    acceptingClients: true,
  },
  {
    name: "James Whitfield",
    credentials: "LPC",
    tagline: "Helping couples and individuals rebuild trust and intimacy after relational rupture.",
    specialties: ["Couples", "Attachment", "Gottman"],
    format: "Hybrid",
    modality: "Couples therapy",
    acceptingClients: false,
  },
  {
    name: "Sofia Reyes",
    credentials: "LMFT",
    tagline: "Culturally responsive family therapy for first-generation and bilingual families.",
    specialties: ["Family", "Bilingual", "Anxiety"],
    format: "Hybrid",
    modality: "Family therapy",
    acceptingClients: true,
  },
  {
    name: "Dr. Claire Hutchinson",
    credentials: "PhD",
    tagline: "Specialist in OCD, anxiety disorders, and exposure-based treatments using ERP.",
    specialties: ["OCD", "Anxiety", "ERP"],
    format: "Virtual only",
    modality: "Individual therapy",
    acceptingClients: true,
  },
  {
    name: "Marcus Lee",
    credentials: "LPC",
    tagline: "Somatic and mindfulness-based therapy for adults managing chronic stress and burnout.",
    specialties: ["Somatic", "Burnout", "Mindfulness"],
    format: "In-person only",
    modality: "Individual therapy",
    acceptingClients: true,
  },
  {
    name: "Priya Nair",
    credentials: "LCSW",
    tagline: "Perinatal mental health specialist supporting mothers and families through the fourth trimester and beyond.",
    specialties: ["Perinatal", "Postpartum", "Women"],
    format: "Hybrid",
    modality: "Individual therapy",
    acceptingClients: false,
  },
  {
    name: "Thomas Garza",
    credentials: "LMFT",
    tagline: "Working with LGBTQ+ individuals and couples on identity, relationships, and chosen family.",
    specialties: ["LGBTQ+", "Couples", "Identity"],
    format: "Virtual only",
    modality: "Couples therapy",
    acceptingClients: true,
  },
  {
    name: "Rachel Bloom",
    credentials: "LPC",
    tagline: "Adolescent and young adult therapy specializing in school transitions and emerging adulthood.",
    specialties: ["Adolescents", "Young Adults", "Transitions"],
    format: "Hybrid",
    modality: "Individual therapy",
    acceptingClients: true,
  },
  {
    name: "Dr. Ade Kolade",
    credentials: "PsyD",
    tagline: "Culturally affirming therapy for Black men and professionals navigating workplace stress and racial identity.",
    specialties: ["Cultural Identity", "Men", "Workplace"],
    format: "Virtual only",
    modality: "Individual therapy",
    acceptingClients: true,
  },
];

const allSpecialties = Array.from(
  new Set(ALL_CLINICIANS.flatMap((c) => c.specialties))
).sort();

const formats = ["Virtual only", "In-person only", "Hybrid"];

export default function FindAClinicianPage() {
  const [search, setSearch] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("");
  const [acceptingOnly, setAcceptingOnly] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const hasActiveFilters = Boolean(
    selectedSpecialty || selectedFormat || acceptingOnly
  );

  function clearFilters() {
    setSelectedSpecialty("");
    setSelectedFormat("");
    setAcceptingOnly(false);
  }

  const filtered = ALL_CLINICIANS.filter((c) => {
    if (
      search &&
      !c.name.toLowerCase().includes(search.toLowerCase()) &&
      !c.tagline.toLowerCase().includes(search.toLowerCase()) &&
      !c.specialties.some((s) =>
        s.toLowerCase().includes(search.toLowerCase())
      )
    )
      return false;
    if (selectedSpecialty && !c.specialties.includes(selectedSpecialty))
      return false;
    if (selectedFormat && c.format !== selectedFormat) return false;
    if (acceptingOnly && !c.acceptingClients) return false;
    return true;
  });

  return (
    <>
      {/* HERO */}
      <section
        className="pt-28 md:pt-32 pb-10 md:pb-12"
        style={{ background: "var(--color-cream-100)" }}
      >
        <div className="max-w-6xl mx-auto px-5 md:px-6">
          <p
            className="text-xs font-medium uppercase tracking-widest mb-5"
            style={{ color: "var(--color-sage-600)" }}
          >
            Find a clinician
          </p>
          <h1
            className="leading-tight mb-6 max-w-xl"
            style={{
              fontFamily: "var(--font-serif), Manrope, sans-serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 400,
              color: "var(--color-sage-900)",
            }}
          >
            Trusted therapists in the Austin area.
          </h1>
          <p
            className="text-base leading-relaxed max-w-xl"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Every clinician listed here is a vetted member of the Austin
            Clinician Circle. Search by specialty, format, or availability.
          </p>
        </div>
      </section>

      <section
        className="py-8 md:py-10"
        style={{ background: "var(--color-cream-100)" }}
      >
        <div className="max-w-6xl mx-auto px-5 md:px-6 flex flex-col lg:flex-row gap-8 md:gap-10">
          <div className="lg:hidden flex flex-col gap-3">
            <input
              type="text"
              placeholder="Search name or specialty..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 text-sm rounded-xl border outline-none"
              style={{
                borderColor: "var(--color-cream-400)",
                background: "#fff",
                color: "var(--color-text-primary)",
              }}
            />
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>
                {filtered.length} clinician{filtered.length !== 1 ? "s" : ""} found
              </p>
              <div className="flex items-center gap-2">
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="px-3 py-2 rounded-full text-xs font-medium"
                    style={{
                      background: "var(--color-sage-50)",
                      color: "var(--color-sage-700)",
                      border: "1px solid var(--color-cream-300)",
                    }}
                  >
                    Clear
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
                  className="px-4 py-2 rounded-full text-xs font-medium"
                  style={{
                    background: "var(--color-sage-700)",
                    color: "#fff",
                  }}
                >
                  Filters
                </button>
              </div>
            </div>
          </div>

          {/* FILTERS */}
          <aside className="hidden lg:flex lg:w-56 shrink-0 flex-col gap-7 lg:sticky lg:top-24 self-start">
            <div>
              <input
                type="text"
                placeholder="Search name or specialty..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2.5 text-sm rounded-lg border outline-none"
                style={{
                  borderColor: "var(--color-cream-400)",
                  background: "#fff",
                  color: "var(--color-text-primary)",
                }}
              />
            </div>

            <div>
              <p
                className="text-xs font-medium uppercase tracking-widest mb-3"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                Specialty
              </p>
              <div className="flex flex-col gap-1.5">
                <button
                  onClick={() => setSelectedSpecialty("")}
                  className="text-left text-sm px-1 py-0.5 transition-colors"
                  style={{
                    color:
                      selectedSpecialty === ""
                        ? "var(--color-sage-700)"
                        : "var(--color-text-secondary)",
                    fontWeight: selectedSpecialty === "" ? 600 : 400,
                  }}
                >
                  All specialties
                </button>
                {allSpecialties.map((s) => (
                  <button
                    key={s}
                    onClick={() =>
                      setSelectedSpecialty(s === selectedSpecialty ? "" : s)
                    }
                    className="text-left text-sm px-1 py-0.5 transition-colors"
                    style={{
                      color:
                        selectedSpecialty === s
                          ? "var(--color-sage-700)"
                          : "var(--color-text-secondary)",
                      fontWeight: selectedSpecialty === s ? 600 : 400,
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p
                className="text-xs font-medium uppercase tracking-widest mb-3"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                Format
              </p>
              <div className="flex flex-col gap-1.5">
                <button
                  onClick={() => setSelectedFormat("")}
                  className="text-left text-sm px-1 py-0.5 transition-colors"
                  style={{
                    color:
                      selectedFormat === ""
                        ? "var(--color-sage-700)"
                        : "var(--color-text-secondary)",
                    fontWeight: selectedFormat === "" ? 600 : 400,
                  }}
                >
                  All formats
                </button>
                {formats.map((f) => (
                  <button
                    key={f}
                    onClick={() =>
                      setSelectedFormat(f === selectedFormat ? "" : f)
                    }
                    className="text-left text-sm px-1 py-0.5 transition-colors"
                    style={{
                      color:
                        selectedFormat === f
                          ? "var(--color-sage-700)"
                          : "var(--color-text-secondary)",
                      fontWeight: selectedFormat === f ? 600 : 400,
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <div
                  onClick={() => setAcceptingOnly((v) => !v)}
                  className="w-9 h-5 rounded-full transition-colors flex items-center px-0.5 cursor-pointer"
                  style={{
                    background: acceptingOnly
                      ? "var(--color-sage-700)"
                      : "var(--color-cream-400)",
                  }}
                >
                  <div
                    className="w-4 h-4 rounded-full bg-white shadow transition-transform"
                    style={{
                      transform: acceptingOnly
                        ? "translateX(16px)"
                        : "translateX(0)",
                    }}
                  />
                </div>
                <span
                  className="text-sm"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Accepting clients
                </span>
              </label>
            </div>
          </aside>

          {/* GRID */}
          <div className="flex-1">
            <p
              className="hidden lg:block text-xs mb-5"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              {filtered.length} clinician{filtered.length !== 1 ? "s" : ""}{" "}
              found
            </p>
            {filtered.length === 0 ? (
              <div
                className="py-20 text-center"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                <p className="text-sm">
                  No clinicians match your current filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((c) => (
                  <ClinicianCard key={c.name} {...c} />
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
                Clinician search
              </p>
              <span className="text-base font-semibold" style={{ fontFamily: "var(--font-serif), Georgia, serif" }}>
                Refine results
              </span>
            </div>
          }
        >
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: "var(--color-text-tertiary)" }}>
                Specialty
              </p>
              <div className="flex flex-col gap-1.5">
                <button
                  onClick={() => setSelectedSpecialty("")}
                  className="text-left text-sm px-1 py-1 transition-colors"
                  style={{
                    color: selectedSpecialty === "" ? "var(--color-sage-700)" : "var(--color-text-secondary)",
                    fontWeight: selectedSpecialty === "" ? 600 : 400,
                  }}
                >
                  All specialties
                </button>
                {allSpecialties.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSpecialty(s === selectedSpecialty ? "" : s)}
                    className="text-left text-sm px-1 py-1 transition-colors"
                    style={{
                      color: selectedSpecialty === s ? "var(--color-sage-700)" : "var(--color-text-secondary)",
                      fontWeight: selectedSpecialty === s ? 600 : 400,
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: "var(--color-text-tertiary)" }}>
                Format
              </p>
              <div className="flex flex-col gap-1.5">
                <button
                  onClick={() => setSelectedFormat("")}
                  className="text-left text-sm px-1 py-1 transition-colors"
                  style={{
                    color: selectedFormat === "" ? "var(--color-sage-700)" : "var(--color-text-secondary)",
                    fontWeight: selectedFormat === "" ? 600 : 400,
                  }}
                >
                  All formats
                </button>
                {formats.map((f) => (
                  <button
                    key={f}
                    onClick={() => setSelectedFormat(f === selectedFormat ? "" : f)}
                    className="text-left text-sm px-1 py-1 transition-colors"
                    style={{
                      color: selectedFormat === f ? "var(--color-sage-700)" : "var(--color-text-secondary)",
                      fontWeight: selectedFormat === f ? 600 : 400,
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex items-center justify-between gap-3 cursor-pointer">
              <span className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                Accepting clients only
              </span>
              <div
                onClick={() => setAcceptingOnly((v) => !v)}
                className="w-9 h-5 rounded-full transition-colors flex items-center px-0.5 cursor-pointer"
                style={{
                  background: acceptingOnly ? "var(--color-sage-700)" : "var(--color-cream-400)",
                }}
              >
                <div
                  className="w-4 h-4 rounded-full bg-white shadow transition-transform"
                  style={{ transform: acceptingOnly ? "translateX(16px)" : "translateX(0)" }}
                />
              </div>
            </label>

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
      </section>
    </>
  );
}
