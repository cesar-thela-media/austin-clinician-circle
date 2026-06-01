import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getStripe, getStripeSandboxUrls, findOrCreateSandboxCustomer } from "@/lib/stripe";
import { hasClerkCredentials, hasStripeSandboxConfig } from "@/lib/env";

export const runtime = "nodejs";

export async function POST() {
  if (!hasClerkCredentials) {
    return NextResponse.json({ error: "Clerk sandbox auth is not configured." }, { status: 503 });
  }

  if (!hasStripeSandboxConfig || !process.env.STRIPE_PRICE_ID) {
    return NextResponse.json({ error: "Stripe sandbox mode is not configured." }, { status: 503 });
  }

  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "You must be signed in to start sandbox checkout." }, { status: 401 });
  }

  const user = await currentUser();
  const email =
    user?.emailAddresses.find((entry) => entry.id === user.primaryEmailAddressId)?.emailAddress ||
    user?.emailAddresses[0]?.emailAddress;

  if (!email) {
    return NextResponse.json({ error: "Your account needs an email address before checkout can start." }, { status: 400 });
  }

  const stripe = getStripe();
  const customer = await findOrCreateSandboxCustomer({
    email,
    name: user?.fullName,
    clerkUserId: userId,
  });
  const { successUrl, cancelUrl } = getStripeSandboxUrls();

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customer.id,
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID,
        quantity: 1,
      },
    ],
    allow_promotion_codes: true,
    billing_address_collection: "auto",
    success_url: successUrl,
    cancel_url: cancelUrl,
    subscription_data: {
      metadata: {
        sandbox: "true",
        clerkUserId: userId,
        email,
      },
    },
    metadata: {
      sandbox: "true",
      clerkUserId: userId,
      email,
    },
  });

  if (!session.url) {
    return NextResponse.json({ error: "Stripe did not return a checkout URL." }, { status: 502 });
  }

  return NextResponse.json({ url: session.url });
}
