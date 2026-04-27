"use client";

// Swap CALENDLY_URL for the real link when Sarah's Calendly is set up.
// e.g. "https://calendly.com/saraharnoldlpc/coaching-session"
const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL ?? "";

export function CalendlyEmbed() {
  if (!CALENDLY_URL) {
    return (
      <div
        className="rounded-2xl flex flex-col items-center justify-center gap-3 py-16 px-8 text-center"
        style={{
          background: "var(--color-cream-200)",
          border: "1.5px dashed var(--color-cream-400)",
        }}
      >
        <span className="text-3xl">📅</span>
        <p
          className="text-base font-semibold"
          style={{ color: "var(--color-sage-700)" }}
        >
          1-on-1 coaching — coming soon
        </p>
        <p
          className="text-sm max-w-xs leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Book a discounted practice-building session with Sarah Arnold, LPC-S.
          Scheduling will open here shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--color-cream-300)" }}>
      <iframe
        src={`${CALENDLY_URL}?embed_type=Inline&hide_event_type_details=1&hide_gdpr_banner=1`}
        title="Book a session with Sarah Arnold"
        loading="lazy"
        className="w-full"
        style={{ height: 700, border: "none" }}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation"
      />
    </div>
  );
}
