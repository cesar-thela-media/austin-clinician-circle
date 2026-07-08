import { NextRequest, NextResponse } from "next/server";
import { hasRobollyConfig } from "@/lib/env";
import { getCurrentMemberName } from "@/lib/auth";
import { renderCertificatePdf } from "@/lib/robolly";

// Next.js App Router default runtime is Node.js and required for fetch → Buffer here
export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  if (!hasRobollyConfig) {
    return NextResponse.json(
      { error: "Certificate template isn't configured yet. Set ROBOLLY_API_KEY and ROBOLLY_TEMPLATE_ID." },
      { status: 503 }
    );
  }

  const { firstName, lastName } = await getCurrentMemberName();
  const name = [firstName, lastName].filter(Boolean).join(" ") || "Member";

  const workshop = req.nextUrl.searchParams.get("workshop") || undefined;
  const ceHours = req.nextUrl.searchParams.get("ceus") || undefined;

  let pdfBuffer: Buffer;
  try {
    pdfBuffer = await renderCertificatePdf({ name, date: new Date(), workshop, ceHours });
  } catch (err) {
    console.error("[certificate] Robolly render failed:", err);
    return NextResponse.json({ error: "Failed to generate certificate. Please try again." }, { status: 502 });
  }

  return new NextResponse(new Uint8Array(pdfBuffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="austin-clinician-circle-certificate.pdf"`,
    },
  });
}
