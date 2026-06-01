import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { hasStripeSandboxConfig } from "@/lib/env";
import { syncStripeEvent } from "@/lib/stripe-sync";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!hasStripeSandboxConfig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Stripe sandbox webhook is not configured." }, { status: 503 });
  }

  const signature = (await headers()).get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature." }, { status: 400 });
  }

  const payload = await req.text();

  let event: Stripe.Event;
  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid webhook signature.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const syncResult = await syncStripeEvent(event);

  return NextResponse.json({
    received: true,
    eventType: event.type,
    sandbox: true,
    syncResult,
  });
}
