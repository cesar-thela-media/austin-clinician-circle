import { NextRequest, NextResponse } from "next/server";

const COOKIE_OPTS = {
  path: "/",
  httpOnly: true,
  sameSite: "lax" as const,
  maxAge: 60 * 60 * 24 * 7,
};

export async function POST(req: NextRequest) {
  const { name, email } = await req.json().catch(() => ({})) as {
    name?: string;
    email?: string;
  };

  if (!name?.trim() || !email?.trim()) {
    return NextResponse.json({ error: "Name and email required." }, { status: 400 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("acc_demo_name", name.trim().slice(0, 80), COOKIE_OPTS);
  res.cookies.set("acc_demo_email", email.trim().toLowerCase().slice(0, 254), COOKIE_OPTS);
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("acc_demo_name", "", { path: "/", maxAge: 0 });
  res.cookies.set("acc_demo_email", "", { path: "/", maxAge: 0 });
  return res;
}
