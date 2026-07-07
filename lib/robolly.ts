import { hasRobollyConfig, robollyNameElement } from "@/lib/env";

const ROBOLLY_API_BASE = "https://api.robolly.com";

// Render a member's name into the membership certificate template and
// return the rendered PDF as a buffer. Robolly returns the rendered file
// synchronously — no polling or webhook required.
export async function renderCertificatePdf(params: { name: string }): Promise<Buffer> {
  if (!hasRobollyConfig) {
    throw new Error("Robolly is not configured (missing ROBOLLY_API_KEY or ROBOLLY_TEMPLATE_ID).");
  }

  const templateId = process.env.ROBOLLY_TEMPLATE_ID;
  const apiKey = process.env.ROBOLLY_API_KEY;

  const url = new URL(`${ROBOLLY_API_BASE}/templates/${templateId}/render.pdf`);
  url.searchParams.set(robollyNameElement, params.name);

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
