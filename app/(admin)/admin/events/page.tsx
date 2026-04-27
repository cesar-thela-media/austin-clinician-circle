"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";

const CATEGORIES = ["Consultation", "Workshop", "CEU", "Self-Care"];

type EventEntry = {
  id: number;
  title: string;
  date: string;
  time: string;
  format: string;
  category: string;
  ceus: number | null;
  rsvpCount: number;
  spots: number | null;
};

const INITIAL_EVENTS: EventEntry[] = [
  { id: 1, title: "Monthly case consultation", date: "May 1, 2026", time: "9:00 – 10:30am", format: "Virtual (Zoom)", category: "Consultation", ceus: 1.5, rsvpCount: 9, spots: null },
  { id: 2, title: "Practice building workshop: Setting your fee", date: "May 14, 2026", time: "12:00 – 1:00pm", format: "Virtual (Zoom)", category: "Workshop", ceus: null, rsvpCount: 4, spots: 20 },
  { id: 3, title: "Trauma-informed care: CEU training", date: "May 23, 2026", time: "10:00am – 12:00pm", format: "Virtual (Zoom)", category: "CEU", ceus: 2.0, rsvpCount: 11, spots: 30 },
  { id: 4, title: "Monthly case consultation", date: "Jun 5, 2026", time: "9:00 – 10:30am", format: "Virtual (Zoom)", category: "Consultation", ceus: 1.5, rsvpCount: 0, spots: null },
  { id: 5, title: "Burnout prevention: clinician self-care", date: "Jun 17, 2026", time: "1:00 – 2:30pm", format: "Virtual (Zoom)", category: "Self-Care", ceus: null, rsvpCount: 2, spots: 25 },
];

const CATEGORY_VARIANTS: Record<string, "default" | "accent" | "success" | "warning" | "highlight"> = {
  Consultation: "default",
  Workshop: "accent",
  CEU: "success",
  "Self-Care": "highlight",
};

const BLANK_FORM = { title: "", date: "", time: "", format: "Virtual (Zoom)", category: "Consultation", ceus: "", description: "", spots: "" };

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventEntry[]>(INITIAL_EVENTS);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(BLANK_FORM);
  const [formCategory, setFormCategory] = useState("Consultation");

  function openCreate() {
    setEditId(null);
    setForm(BLANK_FORM);
    setFormCategory("Consultation");
    setShowForm(true);
  }

  function openEdit(ev: EventEntry) {
    setEditId(ev.id);
    setForm({
      title: ev.title,
      date: ev.date,
      time: ev.time,
      format: ev.format,
      category: ev.category,
      ceus: ev.ceus != null ? String(ev.ceus) : "",
      description: "",
      spots: ev.spots != null ? String(ev.spots) : "",
    });
    setFormCategory(ev.category);
    setShowForm(true);
  }

  function handleDelete(id: number) {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editId != null) {
      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === editId
            ? {
                ...ev,
                title: form.title,
                date: form.date,
                time: form.time,
                format: form.format,
                category: formCategory,
                ceus: form.ceus ? parseFloat(form.ceus) : null,
                spots: form.spots ? parseInt(form.spots) : null,
              }
            : ev
        )
      );
    } else {
      setEvents((prev) => [
        ...prev,
        {
          id: Date.now(),
          title: form.title,
          date: form.date,
          time: form.time,
          format: form.format,
          category: formCategory,
          ceus: form.ceus ? parseFloat(form.ceus) : null,
          rsvpCount: 0,
          spots: form.spots ? parseInt(form.spots) : null,
        },
      ]);
    }
    setShowForm(false);
    setEditId(null);
    setForm(BLANK_FORM);
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: "var(--color-sage-600)" }}>Admin</p>
          <h1 style={{ fontFamily: "var(--font-serif), Manrope, sans-serif", fontSize: "2rem", fontWeight: 400, color: "var(--color-sage-900)" }}>
            Events
          </h1>
        </div>
        <Button variant="primary" size="sm" className="w-full sm:w-auto" onClick={openCreate}>+ Create event</Button>
      </div>

      {/* Create / Edit form */}
      {showForm && (
        <div
          className="rounded-2xl border p-6 bg-white flex flex-col gap-5"
          style={{ borderColor: "var(--color-cream-300)" }}
        >
          <h2 className="text-base font-semibold" style={{ color: "var(--color-sage-800)" }}>
            {editId != null ? "Edit event" : "Create new event"}
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Title"
              name="title"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              required
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Date"
                name="date"
                placeholder="e.g. May 1, 2026"
                value={form.date}
                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                required
              />
              <Input
                label="Time"
                name="time"
                placeholder="e.g. 9:00 – 10:30am"
                value={form.time}
                onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Format"
                name="format"
                value={form.format}
                onChange={(e) => setForm((f) => ({ ...f, format: e.target.value }))}
              />
              <Input
                label="Max spots (leave blank for unlimited)"
                name="spots"
                type="number"
                value={form.spots}
                onChange={(e) => setForm((f) => ({ ...f, spots: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: "var(--color-text-secondary)" }}>Category</label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((c) => (
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
              <Input
                label="CEU credits (optional)"
                name="ceus"
                type="number"
                step="0.5"
                placeholder="e.g. 1.5"
                value={form.ceus}
                onChange={(e) => setForm((f) => ({ ...f, ceus: e.target.value }))}
              />
            </div>
            <Textarea
              label="Description"
              name="description"
              rows={3}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Event description shown to members"
            />
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button type="submit" variant="primary" size="sm">
                {editId != null ? "Save changes" : "Create event"}
              </Button>
              <Button type="button" variant="ghost" size="sm" onClick={() => { setShowForm(false); setEditId(null); }}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Event list */}
      {events.length > 0 && (
        <div className="md:hidden flex flex-col gap-3">
          {events.map((ev) => (
            <div
              key={ev.id}
              className="rounded-2xl border bg-white p-4 flex flex-col gap-3"
              style={{ borderColor: "var(--color-cream-300)" }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>{ev.title}</p>
                  <p className="text-xs mt-1" style={{ color: "var(--color-text-tertiary)" }}>{ev.format}</p>
                </div>
                <Badge variant={CATEGORY_VARIANTS[ev.category] ?? "default"}>{ev.category}</Badge>
              </div>
              <div className="text-sm flex flex-col gap-1" style={{ color: "var(--color-text-secondary)" }}>
                <p>{ev.date}</p>
                <p className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>{ev.time}</p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {ev.ceus && <Badge variant="success">{ev.ceus} CEU{ev.ceus !== 1 ? "s" : ""}</Badge>}
                <span className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>
                  {ev.rsvpCount}{ev.spots ? ` / ${ev.spots}` : ""} RSVPs
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  className="text-xs underline"
                  style={{ color: "var(--color-sage-700)", textUnderlineOffset: "3px" }}
                  onClick={() => openEdit(ev)}
                >
                  Edit
                </button>
                <button
                  className="text-xs underline"
                  style={{ color: "var(--color-error)", textUnderlineOffset: "3px" }}
                  onClick={() => handleDelete(ev.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="hidden md:block rounded-2xl border overflow-hidden bg-white" style={{ borderColor: "var(--color-cream-300)" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-cream-300)", background: "var(--color-cream-100)" }}>
                <th className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "var(--color-text-tertiary)" }}>Event</th>
                <th className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "var(--color-text-tertiary)" }}>Date & time</th>
                <th className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "var(--color-text-tertiary)" }}>Category</th>
                <th className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "var(--color-text-tertiary)" }}>RSVPs</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {events.map((ev, i) => (
                <tr key={ev.id} style={{ borderBottom: i < events.length - 1 ? "1px solid var(--color-cream-200)" : "none" }}>
                  <td className="px-5 py-3.5">
                    <p className="font-medium" style={{ color: "var(--color-text-primary)" }}>{ev.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--color-text-tertiary)" }}>{ev.format}</p>
                  </td>
                  <td className="px-5 py-3.5" style={{ color: "var(--color-text-secondary)" }}>
                    <p>{ev.date}</p>
                    <p className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>{ev.time}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex flex-col gap-1">
                      <Badge variant={CATEGORY_VARIANTS[ev.category] ?? "default"}>{ev.category}</Badge>
                      {ev.ceus && <Badge variant="success">{ev.ceus} CEU{ev.ceus !== 1 ? "s" : ""}</Badge>}
                    </div>
                  </td>
                  <td className="px-5 py-3.5" style={{ color: "var(--color-text-secondary)" }}>
                    {ev.rsvpCount}{ev.spots ? ` / ${ev.spots}` : ""}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        className="text-xs underline"
                        style={{ color: "var(--color-sage-700)", textUnderlineOffset: "3px" }}
                        onClick={() => openEdit(ev)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-xs underline"
                        style={{ color: "var(--color-error)", textUnderlineOffset: "3px" }}
                        onClick={() => handleDelete(ev.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {events.length === 0 && (
          <div className="py-16 text-center" style={{ color: "var(--color-text-tertiary)" }}>
            <p className="text-sm">No events yet. Create one above.</p>
          </div>
        )}
      </div>

      {events.length === 0 && (
        <div className="md:hidden py-16 text-center" style={{ color: "var(--color-text-tertiary)" }}>
          <p className="text-sm">No events yet. Create one above.</p>
        </div>
      )}
    </div>
  );
}
