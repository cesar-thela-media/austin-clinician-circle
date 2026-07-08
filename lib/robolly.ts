import {
  hasRobollyConfig,
  robollyCeHoursElement,
  robollyDateElement,
  robollyNameElement,
  robollyWorkshopElement,
} from "@/lib/env";

const ROBOLLY_API_BASE = "https://api.robolly.com";

// Render a member's name (and optionally which workshop + CE hours) into the
// certificate template and return the rendered PDF as a buffer. Robolly
// returns the rendered file synchronously — no polling or webhook required.
//
// Workshop/ceHours are optional: when omitted (e.g. a general, non-workshop
// certificate), the template's own default text is used instead.
//
// Signature is intentionally never sent: that text box is sized for a
// signature graphic, not typed text, and the template already prints
// "Sarah Arnold, LPC-S / Director" statically beneath it — sending text
// there duplicates it and overflows the box.
export async function renderCertificatePdf(params: {
  name: string;
  date: Date;
  workshop?: string;
  ceHours?: string;
}): Promise<Buffer> {
  if (!hasRobollyConfig) {
    throw new Error("Robolly is not configured (missing ROBOLLY_API_KEY or ROBOLLY_TEMPLATE_ID).");
  }

  const templateId = process.env.ROBOLLY_TEMPLATE_ID;
  const apiKey = process.env.ROBOLLY_API_KEY;

  const url = new URL(`${ROBOLLY_API_BASE}/templates/${templateId}/render.pdf`);
  url.searchParams.set(robollyNameElement, params.name);
  url.searchParams.set(robollyDateElement, formatCertificateDate(params.date));
  if (params.workshop) url.searchParams.set(robollyWorkshopElement, params.workshop);
  if (params.ceHours) url.searchParams.set(robollyCeHoursElement, params.ceHours);

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Robolly render failed (${res.status}): ${detail || res.statusText}`);
  }

  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

function formatCertificateDate(date: Date): string {
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${mm}/${dd}/${date.getFullYear()}`;
}
