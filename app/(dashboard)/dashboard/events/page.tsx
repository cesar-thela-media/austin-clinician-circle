"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CalendlyEmbed } from "@/components/CalendlyEmbed";

const EVENTS = [
  {
    id: 1,
    title: "Monthly case consultation",
    date: "Thursday, May 1, 2026",
    time: "9:00 – 10:30am",
    format: "Virtual (Zoom)",
    category: "Consultation",
    description: "Our monthly group case consultation. Bring a case you're working with — or come to support peers. Led by Sarah Arnold, LPC-S. Zoom link sent 24 hours before.",
    ceus: 1.5,
    rsvp: true,
    spots: null,
  },
  {
    id: 2,
    title: "Practice building workshop: Setting your fee",
    date: "Wednesday, May 14, 2026",
    time: "12:00 – 1:00pm",
    format: "Virtual (Zoom)",
    category: "Workshop",
    description: "A practical workshop on fee setting, sliding scale considerations, and communicating rates with confidence. Led by Sarah Arnold.",
    ceus: null,
    rsvp: false,
    spots: 20,
  },
  {
    id: 3,
    title: "Trauma-informed care: CEU training",
    date: "Friday, May 23, 2026",
    time: "10:00am – 12:00pm",
    format: "Virtual (Zoom)",
    category: "CEU",
    description: "A 2-hour CEU training on applying trauma-informed principles across clinical presentations. Guest presenter TBD. 2.0 CEU credits.",
    ceus: 2.0,
    rsvp: false,
    spots: 30,
  },
  {
    id: 4,
    title: "Monthly case consultation",
    date: "Thursday, June 5, 2026",
    time: "9:00 – 10:30am",
    format: "Virtual (Zoom)",
    category: "Consultation",
    description: "Monthly case consultation group.",
    ceus: 1.5,
    rsvp: false,
    spots: null,
  },
  {
    id: 5,
    title: "Burnout prevention: clinician self-care",
    date: "Tuesday, June 17, 2026",
    time: "1:00 – 2:30pm",
    format: "Virtual (Zoom)",
    category: "Self-Care",
    description: "A workshop focused on sustainable clinical practice — identifying early burnout signs and building personal structures for longevity.",
    ceus: null,
    rsvp: false,
    spots: 25,
  },
];

const categoryColor: Record<string, "default" | "success" | "warning" | "accent" | "highlight"> = {
  Consultation: "default",
  Workshop: "accent",
  CEU: "success",
  "Self-Care": "highlight",
};

export default function EventsPage() {
  const [rsvpd, setRsvpd] = useState<Set<number>>(new Set([1]));
  const [expanded, setExpanded] = useState<number | null>(null);

  function toggleRsvp(id: number) {
    setRsvpd((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: "var(--color-sage-600)" }}>Events</p>
        <h1 style={{ fontFamily: "var(--font-serif), Manrope, sans-serif", fontSize: "2rem", fontWeight: 400, color: "var(--color-sage-900)" }}>
          Upcoming events
        </h1>
      </div>

      <div className="flex flex-col gap-4">
        {EVENTS.map((ev) => {
          const isRsvpd = rsvpd.has(ev.id);
          const isExpanded = expanded === ev.id;
          return (
            <div
              key={ev.id}
              className="bg-white rounded-2xl border overflow-hidden transition-shadow hover:shadow-md"
              style={{ borderColor: "var(--color-cream-300)" }}
            >
              <button
                className="w-full text-left px-6 py-5 flex items-start justify-between gap-4"
                onClick={() => setExpanded(isExpanded ? null : ev.id)}
              >
                <div className="flex flex-col gap-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant={categoryColor[ev.category] ?? "default"}>{ev.category}</Badge>
                    {ev.ceus && <Badge variant="success">{ev.ceus} CEU{ev.ceus !== 1 ? "s" : ""}</Badge>}
                    {isRsvpd && <Badge variant="success">RSVP&apos;d</Badge>}
                  </div>
                  <p className="text-base font-semibold mt-1" style={{ color: "var(--color-sage-800)" }}>{ev.title}</p>
                  <p className="text-sm" style={{ color: "var(--color-text-tertiary)" }}>
                    {ev.date} · {ev.time} · {ev.format}
                  </p>
                </div>
                <span
                  className="text-lg mt-1 shrink-0 transition-transform"
                  style={{
                    color: "var(--color-text-tertiary)",
                    transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  ⌄
                </span>
              </button>

              {isExpanded && (
                <div
                  className="px-6 pb-6 border-t pt-4 flex flex-col gap-4"
                  style={{ borderColor: "var(--color-cream-200)" }}
                >
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                    {ev.description}
                  </p>
                  {ev.spots && (
                    <p className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>
                      {ev.spots} spots available
                    </p>
                  )}
                  <div className="flex gap-3">
                    <Button
                      variant={isRsvpd ? "secondary" : "primary"}
                      size="sm"
                      onClick={() => toggleRsvp(ev.id)}
                    >
                      {isRsvpd ? "Cancel RSVP" : "RSVP"}
                    </Button>
                    <Button variant="ghost" size="sm">
                      Add to calendar
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── 1-on-1 Coaching ─────────────────────────────────────────────── */}
      <div>
        <div className="mb-5">
          <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: "var(--color-sage-600)" }}>Practice coaching</p>
          <h2 style={{ fontFamily: "var(--font-serif), Manrope, sans-serif", fontSize: "1.5rem", fontWeight: 400, color: "var(--color-sage-900)" }}>
            Book a session with Sarah
          </h2>
          <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>
            Discounted 1-on-1 practice-building sessions — fees, marketing, burnout, and long-term sustainability. Members only.
          </p>
        </div>
        <CalendlyEmbed />
      </div>
    </div>
  );
}
