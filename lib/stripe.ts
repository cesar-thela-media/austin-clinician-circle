import Stripe from "stripe";
import {
  hasStripeSandboxConfig,
  stripeSandboxCancelUrl,
  stripeSandboxSuccessUrl,
} from "@/lib/env";

const globalForStripe = globalThis as unknown as { stripe?: Stripe };

export function getStripe() {
  if (!hasStripeSandboxConfig || !process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe sandbox mode is not configured.");
  }

  if (!globalForStripe.stripe) {
    globalForStripe.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }

  return globalForStripe.stripe;
}

export async function findOrCreateSandboxCustomer(params: {
  email: string;
  name?: string | null;
  clerkUserId?: string | null;
}) {
  const stripe = getStripe();
  const existing = await stripe.customers.list({ email: params.email, limit: 1 });
  const customer = existing.data[0];

  if (customer) {
    return customer;
  }

  return stripe.customers.create({
    email: params.email,
    name: params.name || undefined,
    metadata: {
      sandbox: "true",
      clerkUserId: params.clerkUserId || "",
    },
  });
}

export async function findSandboxCustomerByEmail(email: string) {
  const stripe = getStripe();
  const existing = await stripe.customers.list({ email, limit: 1 });
  return existing.data[0] || null;
}

export function getStripeSandboxUrls() {
  return {
    successUrl: stripeSandboxSuccessUrl,
    cancelUrl: stripeSandboxCancelUrl,
  };
}
