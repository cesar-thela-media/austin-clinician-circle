import { NextRequest, NextResponse } from "next/server";
import { setCurrentMemberName } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { firstName, lastName } = (await req.json().catch(() => ({}))) as {
    firstName?: string;
    lastName?: string;
  };

  if (!firstName?.trim()) {
    return NextResponse.json({ error: "First name is required." }, { status: 400 });
  }

  try {
    await setCurrentMemberName({
      firstName: firstName.trim().slice(0, 80),
      lastName: (lastName ?? "").trim().slice(0, 80),
    });
  } catch (err) {
    console.error("[profile] failed to update name:", err);
    return NextResponse.json({ error: "Failed to save profile." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
