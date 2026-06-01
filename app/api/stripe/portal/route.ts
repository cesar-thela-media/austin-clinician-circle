import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { findSandboxCustomerByEmail, getStripe, getStripeSandboxUrls } from "@/lib/stripe";
import { hasClerkCredentials, hasStripeSandboxConfig } from "@/lib/env";

export const runtime = "nodejs";

export async function POST() {
  if (!hasClerkCredentials) {
    return NextResponse.json({ error: "Clerk sandbox auth is not configured." }, { status: 503 });
  }

  if (!hasStripeSandboxConfig) {
    return NextResponse.json({ error: "Stripe sandbox mode is not configured." }, { status: 503 });
  }

  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "You must be signed in to manage billing." }, { status: 401 });
  }

  const user = await currentUser();
  const email =
    user?.emailAddresses.find((entry) => entry.id === user.primaryEmailAddressId)?.emailAddress ||
    user?.emailAddresses[0]?.emailAddress;

  if (!email) {
    return NextResponse.json({ error: "Your account needs an email address before the billing portal can open." }, { status: 400 });
  }

  const customer = await findSandboxCustomerByEmail(email);
  if (!customer) {
    return NextResponse.json({ error: "No Stripe sandbox customer exists for this account yet. Start checkout first." }, { status: 400 });
  }

  const stripe = getStripe();
  const { successUrl } = getStripeSandboxUrls();
  const session = await stripe.billingPortal.sessions.create({
    customer: customer.id,
    return_url: successUrl,
  });

  return NextResponse.json({ url: session.url });
}
