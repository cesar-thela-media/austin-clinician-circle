"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { MobileSidePanel } from "@/components/layout/MobileSidePanel";

const MEMBERS = [
  { name: "Dr. Maya Okonkwo", credentials: "LCSW", specialties: ["Trauma", "Grief", "EMDR"], city: "Austin, TX", format: "Virtual only", accepting: true, responseTime: "Within 24 hours", referralsThisMonth: 4, fit: "Complex trauma, grief, identity transitions" },
  { name: "James Whitfield", credentials: "LPC", specialties: ["Couples", "Attachment", "Gottman"], city: "Austin, TX", format: "Hybrid", accepting: false, responseTime: "2–3 days", referralsThisMonth: 2, fit: "Couples therapy and relational repair" },
  { name: "Sofia Reyes", credentials: "LMFT", specialties: ["Family", "Bilingual", "Anxiety"], city: "Austin, TX", format: "Hybrid", accepting: true, responseTime: "Within 48 hours", referralsThisMonth: 5, fit: "Family systems and bilingual care" },
  { name: "Dr. Claire Hutchinson", credentials: "PhD", specialties: ["OCD", "Anxiety", "ERP"], city: "Austin, TX", format: "Virtual only", accepting: true, responseTime: "Within 24 hours", referralsThisMonth: 3, fit: "OCD, anxiety disorders, ERP referrals" },
  { name: "Marcus Lee", credentials: "LPC", specialties: ["Somatic", "Burnout", "Mindfulness"], city: "Austin, TX", format: "In-person only", accepting: true, responseTime: "Same week", referralsThisMonth: 4, fit: "Burnout, chronic stress, somatic work" },
  { name: "Priya Nair", credentials: "LCSW", specialties: ["Perinatal", "Postpartum", "Women"], city: "Austin, TX", format: "Hybrid", accepting: false, responseTime: "3–4 days", referralsThisMonth: 2, fit: "Perinatal and postpartum mental health" },
  { name: "Thomas Garza", credentials: "LMFT", specialties: ["LGBTQ+", "Couples", "Identity"], city: "Austin, TX", format: "Virtual only", accepting: true, responseTime: "Within 24 hours", referralsThisMonth: 5, fit: "LGBTQ+ identity and couples therapy" },
  { name: "Rachel Bloom", credentials: "LPC", specialties: ["Adolescents", "Young Adults", "Transitions"], city: "Austin, TX", format: "Hybrid", accepting: true, responseTime: "Within 48 hours", referralsThisMonth: 3, fit: "Teens, emerging adults, life transitions" },
  { name: "Dr. Ade Kolade", credentials: "PsyD", specialties: ["Cultural Identity", "Men", "Workplace"], city: "Austin, TX", format: "Virtual only", accepting: true, responseTime: "Within 48 hours", referralsThisMonth: 4, fit: "Black men, workplace stress, racial identity" },
];

const referralActivity = [
  { from: "James Whitfield, LPC", to: "You", specialty: "Somatic therapy", date: "Apr 18", status: "Completed" },
  { from: "You", to: "Sofia Reyes, LMFT", specialty: "Family therapy", date: "Apr 14", status: "Pending fit call" },
  { from: "Dr. Claire Hutchinson, PhD", to: "You", specialty: "Trauma (adult)", date: "Apr 9", status: "Accepted" },
];

const sortOptions = [
  { value: "recommended", label: "Recommended" },
  { value: "accepting", label: "Accepting now" },
  { value: "name", label: "A–Z" },
] as const;

type SortOption = (typeof sortOptions)[number]["value"];

export default function NetworkPage() {
  const [search, setSearch] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [acceptingOnly, setAcceptingOnly] = useState(false);
  const [sort, setSort] = useState<SortOption>("recommended");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const specialties = useMemo(
    () => ["All", ...Array.from(new Set(MEMBERS.flatMap((member) => member.specialties))).sort()],
    []
  );

  const filteredMembers = useMemo(() => {
    const results = MEMBERS.filter((member) => {
      if (
        search &&
        !`${member.name} ${member.fit} ${member.specialties.join(" ")}`
          .toLowerCase()
          .includes(search.toLowerCase())
      )
        return false;
      if (selectedSpecialty !== "All" && !member.specialties.includes(selectedSpecialty)) return false;
      if (acceptingOnly && !member.accepting) return false;
      return true;
    });

    if (sort === "accepting") {
      return [...results].sort((a, b) => Number(b.accepting) - Number(a.accepting) || b.referralsThisMonth - a.referralsThisMonth);
    }
    if (sort === "name") {
      return [...results].sort((a, b) => a.name.localeCompare(b.name));
    }
    return [...results].sort((a, b) => b.referralsThisMonth - a.referralsThisMonth || Number(b.accepting) - Number(a.accepting));
  }, [acceptingOnly, search, selectedSpecialty, sort]);

  const hasActiveFilters = Boolean(search.trim() || selectedSpecialty !== "All" || acceptingOnly || sort !== "recommended");
  const acceptingCount = MEMBERS.filter((member) => member.accepting).length;
  const totalReferrals = MEMBERS.reduce((sum, member) => sum + member.referralsThisMonth, 0);

  function clearFilters() {
    setSearch("");
    setSelectedSpecialty("All");
    setAcceptingOnly(false);
    setSort("recommended");
  }

  const filterBlocks = (
    <>
      <div>
        <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: "var(--color-text-tertiary)" }}>
          Specialty
        </p>
        <div className="flex flex-wrap gap-2">
          {specialties.map((specialty) => {
            const active = selectedSpecialty === specialty;
            return (
              <button
                key={specialty}
                type="button"
                onClick={() => setSelectedSpecialty(specialty)}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
                style={{
                  background: active ? "var(--color-sage-700)" : "#fff",
                  color: active ? "#fff" : "var(--color-sage-700)",
                  border: `1px solid ${active ? "var(--color-sage-700)" : "var(--color-cream-300)"}`,
                }}
              >
                {specialty}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: "var(--color-text-tertiary)" }}>
          Sort by
        </p>
        <div className="flex flex-wrap gap-2">
          {sortOptions.map((option) => {
            const active = sort === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setSort(option.value)}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
                style={{
                  background: active ? "var(--color-sage-700)" : "#fff",
                  color: active ? "#fff" : "var(--color-sage-700)",
                  border: `1px solid ${active ? "var(--color-sage-700)" : "var(--color-cream-300)"}`,
                }}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <label className="flex items-center justify-between gap-3 cursor-pointer">
        <span className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
          Accepting clients only
        </span>
        <div
          onClick={() => setAcceptingOnly((value) => !value)}
          className="w-10 h-6 rounded-full transition-colors flex items-center px-0.5 cursor-pointer"
          style={{ background: acceptingOnly ? "var(--color-sage-700)" : "var(--color-cream-400)" }}
        >
          <div
            className="w-5 h-5 rounded-full bg-white shadow transition-transform"
            style={{ transform: acceptingOnly ? "translateX(16px)" : "translateX(0)" }}
          />
        </div>
      </label>
    </>
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: "var(--color-sage-600)" }}>
            Network
          </p>
          <h1 style={{ fontFamily: "var(--font-serif), Manrope, sans-serif", fontSize: "2rem", fontWeight: 400, color: "var(--color-sage-900)" }}>
            Referral network
          </h1>
          <p className="text-sm mt-2 max-w-2xl" style={{ color: "var(--color-text-secondary)" }}>
            Search the member network, find the right clinical fit, and make referrals with more confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { value: MEMBERS.length, label: "Active members" },
            { value: acceptingCount, label: "Accepting clients now" },
            { value: totalReferrals, label: "Referrals this month" },
          ].map((stat) => (
            <Card key={stat.label} className="flex flex-col gap-1">
              <p className="text-3xl font-light" style={{ fontFamily: "var(--font-serif), Manrope, sans-serif", color: "var(--color-sage-700)" }}>
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
            placeholder="Search members, specialties, or referral fit..."
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
        <aside className="hidden lg:flex lg:w-72 shrink-0 flex-col gap-4 sticky top-24 self-start">
          <Card className="flex flex-col gap-6">{filterBlocks}</Card>
          <Card className="flex flex-col gap-3">
            <p className="text-sm font-semibold" style={{ color: "var(--color-sage-800)" }}>
              Need faster referrals?
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              Keep your own directory listing updated so members can quickly understand your fit, format, and availability.
            </p>
            <Link
              href="/dashboard/profile"
              className="text-xs font-medium underline"
              style={{ color: "var(--color-sage-700)", textUnderlineOffset: "3px" }}
            >
              Update your profile →
            </Link>
          </Card>
        </aside>

        <div className="flex-1 flex flex-col gap-6">
          <Card className="grid grid-cols-1 md:grid-cols-[1.15fr,0.85fr] gap-6 md:gap-8">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--color-sage-600)" }}>
                Referral momentum
              </p>
              <h2 className="section-title-strong" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--color-sage-900)" }}>
                Start with members who are active and accepting right now.
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                The network works best when fit is obvious at a glance. Use the filters below to find therapists by specialty, availability, and responsiveness.
              </p>
            </div>

            <div className="rounded-2xl px-5 py-5 flex flex-col gap-4" style={{ background: "var(--color-cream-100)", border: "1px solid var(--color-cream-300)" }}>
              <p className="text-sm font-semibold" style={{ color: "var(--color-sage-800)" }}>
                This week at a glance
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl px-3 py-3" style={{ background: "#fff", border: "1px solid var(--color-cream-300)" }}>
                  <p style={{ color: "var(--color-text-tertiary)" }}>Accepting now</p>
                  <p className="text-base font-semibold mt-1" style={{ color: "var(--color-sage-800)" }}>{acceptingCount} clinicians</p>
                </div>
                <div className="rounded-xl px-3 py-3" style={{ background: "#fff", border: "1px solid var(--color-cream-300)" }}>
                  <p style={{ color: "var(--color-text-tertiary)" }}>Avg response</p>
                  <p className="text-base font-semibold mt-1" style={{ color: "var(--color-sage-800)" }}>24–48 hours</p>
                </div>
              </div>
              <Link
                href="/dashboard/profile"
                className="text-xs font-medium underline"
                style={{ color: "var(--color-sage-700)", textUnderlineOffset: "3px" }}
              >
                Refresh your public listing →
              </Link>
            </div>
          </Card>

          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <h2 className="text-base font-semibold" style={{ color: "var(--color-sage-900)" }}>Recent referral activity</h2>
              <Badge variant="highlight">Live network feed</Badge>
            </div>
            <Card className="flex flex-col gap-3" style={{ padding: 0 }}>
              {referralActivity.map((item, index) => (
                <div
                  key={`${item.from}-${item.date}`}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4"
                  style={{ borderBottom: index < referralActivity.length - 1 ? "1px solid var(--color-cream-200)" : "none" }}
                >
                  <div>
                    <p className="text-sm" style={{ color: "var(--color-text-primary)" }}>
                      <span className="font-medium">{item.from}</span>
                      <span style={{ color: "var(--color-text-tertiary)" }}> referred </span>
                      <span className="font-medium">{item.to}</span>
                    </p>
                    <p className="text-xs mt-1" style={{ color: "var(--color-text-tertiary)" }}>
                      {item.specialty} · {item.date}
                    </p>
                  </div>
                  <Badge variant={item.status === "Completed" ? "success" : item.status === "Accepted" ? "highlight" : "accent"}>
                    {item.status}
                  </Badge>
                </div>
              ))}
            </Card>
          </div>

          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="text-base font-semibold" style={{ color: "var(--color-sage-800)" }}>Member directory</h2>
                <p className="text-xs mt-1" style={{ color: "var(--color-text-tertiary)" }}>
                  {filteredMembers.length} member{filteredMembers.length !== 1 ? "s" : ""} match your current view
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                {sortOptions.map((option) => {
                  const active = sort === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setSort(option.value)}
                      className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
                      style={{
                        background: active ? "var(--color-sage-700)" : "var(--color-sage-50)",
                        color: active ? "#fff" : "var(--color-sage-700)",
                        border: active ? "none" : "1px solid var(--color-cream-300)",
                      }}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {filteredMembers.length === 0 ? (
              <Card className="py-14 text-center">
                <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                  No members match your current search and filters.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-4 text-sm font-medium underline"
                  style={{ color: "var(--color-sage-700)", textUnderlineOffset: "3px" }}
                >
                  Reset network view
                </button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {filteredMembers.map((member) => (
                  <Card key={member.name} hover className="flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div
                          className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-medium shrink-0"
                          style={{ background: "var(--color-sage-100)", color: "var(--color-sage-600)" }}
                        >
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>
                            {member.name}, {member.credentials}
                          </p>
                          <p className="text-xs mt-1" style={{ color: "var(--color-text-tertiary)" }}>
                            {member.city} · {member.format}
                          </p>
                        </div>
                      </div>
                      <Badge variant={member.accepting ? "success" : "accent"}>
                        {member.accepting ? "Accepting clients" : "At capacity"}
                      </Badge>
                    </div>

                    <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                      Best fit for {member.fit}.
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((specialty) => (
                        <Badge key={specialty}>{specialty}</Badge>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="rounded-xl px-3 py-3" style={{ background: "var(--color-cream-100)", border: "1px solid var(--color-cream-300)" }}>
                        <p style={{ color: "var(--color-text-tertiary)" }}>Referrals this month</p>
                        <p className="text-sm font-semibold mt-1" style={{ color: "var(--color-sage-800)" }}>{member.referralsThisMonth}</p>
                      </div>
                      <div className="rounded-xl px-3 py-3" style={{ background: "var(--color-cream-100)", border: "1px solid var(--color-cream-300)" }}>
                        <p style={{ color: "var(--color-text-tertiary)" }}>Typical response time</p>
                        <p className="text-sm font-semibold mt-1" style={{ color: "var(--color-sage-800)" }}>{member.responseTime}</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                      <Button size="sm">Refer client</Button>
                      <Button variant="secondary" size="sm">Message intro</Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
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
              Referral network
            </p>
            <span className="text-base font-semibold" style={{ fontFamily: "var(--font-serif), Georgia, serif" }}>
              Refine members
            </span>
          </div>
        }
      >
        <div className="flex flex-col gap-6">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search members or specialties..."
          />
          {filterBlocks}
          <div className="mt-auto pt-6 flex flex-col gap-3" style={{ borderTop: "1px solid var(--color-cream-300)" }}>
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              className="w-full py-3 rounded-full text-sm font-medium"
              style={{ background: "var(--color-sage-700)", color: "#fff" }}
            >
              Show {filteredMembers.length} member{filteredMembers.length !== 1 ? "s" : ""}
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
