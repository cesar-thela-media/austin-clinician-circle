"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ClinicianCard } from "@/components/cards/ClinicianCard";

const MEMBERS = [
  { name: "Dr. Maya Okonkwo", credentials: "LCSW", specialties: ["Trauma", "Grief", "EMDR"], accepting: true, tagline: "Complex trauma, grief, and identity transitions. Warm, evidence-based care.", photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face" },
  { name: "James Whitfield", credentials: "LPC", specialties: ["Couples", "Attachment", "Gottman"], accepting: false, tagline: "Couples therapy and relational repair grounded in Gottman Method.", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" },
  { name: "Sofia Reyes", credentials: "LMFT", specialties: ["Family", "Bilingual", "Anxiety"], accepting: true, tagline: "Family systems and bilingual care for Spanish-speaking families.", photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face" },
  { name: "Dr. Claire Hutchinson", credentials: "PhD", specialties: ["OCD", "Anxiety", "ERP"], accepting: true, tagline: "OCD, anxiety disorders, and ERP. Specialized, compassionate treatment.", photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop&crop=face" },
  { name: "Marcus Lee", credentials: "LPC", specialties: ["Somatic", "Burnout", "Mindfulness"], accepting: true, tagline: "Burnout, chronic stress, and somatic work for high-achieving professionals.", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face" },
  { name: "Priya Nair", credentials: "LCSW", specialties: ["Perinatal", "Postpartum", "Women"], accepting: false, tagline: "Perinatal and postpartum mental health. Culturally attuned care.", photo: "https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?w=200&h=200&fit=crop&crop=face" },
  { name: "Thomas Garza", credentials: "LMFT", specialties: ["LGBTQ+", "Couples", "Identity"], accepting: true, tagline: "LGBTQ+ identity exploration and affirming couples therapy.", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face" },
  { name: "Rachel Bloom", credentials: "LPC", specialties: ["Adolescents", "Young Adults", "Transitions"], accepting: true, tagline: "Teens, emerging adults, and life transitions. Relational, strengths-based.", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face" },
  { name: "Dr. Ade Kolade", credentials: "PsyD", specialties: ["Cultural Identity", "Men", "Workplace"], accepting: true, tagline: "Black men, workplace stress, and racial identity. Culturally grounded care.", photo: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=200&h=200&fit=crop&crop=face" },
];

const specialties = ["All", ...Array.from(new Set(MEMBERS.flatMap((m) => m.specialties))).sort()];

export default function FindAClinicianPage() {
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("All");
  const [acceptingOnly, setAcceptingOnly] = useState(false);

  const filtered = useMemo(() => {
    return MEMBERS.filter((m) => {
      if (search && !`${m.name} ${m.tagline} ${m.specialties.join(" ")}`.toLowerCase().includes(search.toLowerCase())) return false;
      if (specialty !== "All" && !m.specialties.includes(specialty)) return false;
      if (acceptingOnly && !m.accepting) return false;
      return true;
    });
  }, [search, specialty, acceptingOnly]);

  const acceptingCount = MEMBERS.filter((m) => m.accepting).length;

  return (
    <>
      {/* Directory */}
      <section style={{ background: "#F0EDE6", padding: "clamp(4rem,8vw,5rem) 0 clamp(2.5rem,5vw,4rem)" }}>
        <div className="container-fluid">
          {/* Search */}
          <div className="max-w-2xl mx-auto mb-6">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, specialty, or keywords…"
              className="w-full rounded-2xl px-6 py-4 text-base outline-none transition-all shadow-sm"
              style={{ border: "1px solid rgba(194,150,58,0.22)", background: "#fff", color: "var(--color-text-primary)" }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#C2963A"; e.currentTarget.style.boxShadow = "0 0 0 4px rgba(194,150,58,0.08)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(194,150,58,0.22)"; e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)"; }}
            />
          </div>

          {/* Filter pills — simplified */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {["All", "Trauma", "Anxiety", "Couples", "Family", "LGBTQ+"].map((s) => {
              const active = specialty === s || (s === "All" && specialty === "All");
              return (
                <button key={s} type="button" onClick={() => setSpecialty(s === "All" ? "All" : s)}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-colors"
                  style={{ background: active ? "#C2963A" : "#fff", color: active ? "#fff" : "var(--color-sage-700)", border: `1px solid ${active ? "#C2963A" : "rgba(194,150,58,0.18)"}` }}
                >{s}</button>
              );
            })}
            <label className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm cursor-pointer" style={{ border: "1px solid rgba(194,150,58,0.18)", background: acceptingOnly ? "rgba(194,150,58,0.08)" : "#fff" }}>
              <input type="checkbox" checked={acceptingOnly} onChange={(e) => setAcceptingOnly(e.target.checked)} className="sr-only" />
              <span style={{ color: acceptingOnly ? "#C2963A" : "var(--color-text-tertiary)" }}>Accepting clients</span>
            </label>
          </div>

          {/* Results */}
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-base mb-2" style={{ color: "var(--color-text-secondary)" }}>No clinicians match your filters.</p>
              <button onClick={() => { setSearch(""); setSpecialty("All"); setAcceptingOnly(false); }}
                className="text-sm underline" style={{ color: "#C2963A" }}
              >Clear all filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((m) => (
                <ClinicianCard key={m.name} name={m.name} credentials={m.credentials} tagline={m.tagline} specialties={m.specialties} photo={m.photo} acceptingClients={m.accepting} href="/join" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#2D3B2C", padding: "clamp(3rem,6vw,5rem) 0" }}>
        <div className="mx-auto px-5 md:px-6 text-center" style={{ maxWidth: 680 }}>
          <p className="font-medium uppercase tracking-[0.28em] text-[11px] mb-4" style={{ color: "#C2963A" }}>
            Are you a licensed therapist?
          </p>
          <h2 className="leading-tight mb-5"
            style={{ fontFamily: "var(--font-serif), Georgia, serif", fontSize: "clamp(1.8rem, 3.2vw, 2.5rem)", fontWeight: 400, color: "#fff" }}
          >
            Join The Circle. Get listed in the directory.
          </h2>
          <p className="text-base leading-relaxed mb-8 mx-auto" style={{ color: "rgba(255,255,255,0.62)", maxWidth: 520 }}>
            Members get a public directory listing, referral network access, and a professional home in Austin&rsquo;s clinical community.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/join"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full text-sm font-medium transition-opacity hover:opacity-90"
              style={{ background: "#C2963A", color: "#fff" }}
            >Apply for membership</Link>
            <Link href="/what-we-offer"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full text-sm font-medium transition-opacity hover:opacity-80"
              style={{ border: "1px solid rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.88)" }}
            >Learn what&rsquo;s included →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
