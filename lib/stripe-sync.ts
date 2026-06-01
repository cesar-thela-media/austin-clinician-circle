import { SubscriptionStatus, UserStatus } from "@prisma/client";
import Stripe from "stripe";
import { db } from "@/lib/db";
import { hasDatabaseConfig } from "@/lib/env";
import { getStripe } from "@/lib/stripe";

function toSubscriptionStatus(status: Stripe.Subscription.Status): SubscriptionStatus {
  switch (status) {
    case "trialing":
      return SubscriptionStatus.trialing;
    case "active":
      return SubscriptionStatus.active;
    case "past_due":
      return SubscriptionStatus.past_due;
    case "unpaid":
      return SubscriptionStatus.unpaid;
    default:
      return SubscriptionStatus.canceled;
  }
}

function toUserStatus(status: Stripe.Subscription.Status): UserStatus {
  return status === "active" || status === "trialing"
    ? UserStatus.active
    : UserStatus.inactive;
}

async function resolveCustomerEmail(customerId: string) {
  const stripe = getStripe();
  const customer = await stripe.customers.retrieve(customerId);

  if ("deleted" in customer && customer.deleted) {
    return null;
  }

  return {
    email: customer.email,
    name: customer.name,
  };
}

async function upsertSubscriptionFromStripe(params: {
  email: string;
  name?: string | null;
  customerId: string;
  subscription: Stripe.Subscription;
}) {
  const status = toSubscriptionStatus(params.subscription.status);
  const userStatus = toUserStatus(params.subscription.status);
  const active = params.subscription.status === "active" || params.subscription.status === "trialing";
  const currentPrice = params.subscription.items.data[0]?.price;

  const user = await db.user.upsert({
    where: { email: params.email },
    update: {
      ...(params.name ? { name: params.name } : {}),
      status: userStatus,
    },
    create: {
      email: params.email,
      ...(params.name ? { name: params.name } : {}),
      status: userStatus,
    },
  });

  await db.subscription.upsert({
    where: { userId: user.id },
    update: {
      stripeCustomerId: params.customerId,
      stripeSubscriptionId: params.subscription.id,
      stripePriceId: currentPrice?.id ?? null,
      active,
      status,
      plan: currentPrice?.nickname || currentPrice?.lookup_key || "standard",
      currentPeriodStart: params.subscription.items.data[0]?.current_period_start
        ? new Date(params.subscription.items.data[0].current_period_start * 1000)
        : null,
      currentPeriodEnd: params.subscription.items.data[0]?.current_period_end
        ? new Date(params.subscription.items.data[0].current_period_end * 1000)
        : null,
      cancelAtPeriodEnd: params.subscription.cancel_at_period_end,
      cancelAt: params.subscription.cancel_at
        ? new Date(params.subscription.cancel_at * 1000)
        : null,
      canceledAt: params.subscription.canceled_at
        ? new Date(params.subscription.canceled_at * 1000)
        : null,
      trialStart: params.subscription.trial_start
        ? new Date(params.subscription.trial_start * 1000)
        : null,
      trialEnd: params.subscription.trial_end
        ? new Date(params.subscription.trial_end * 1000)
        : null,
    },
    create: {
      userId: user.id,
      stripeCustomerId: params.customerId,
      stripeSubscriptionId: params.subscription.id,
      stripePriceId: currentPrice?.id ?? null,
      active,
      status,
      plan: currentPrice?.nickname || currentPrice?.lookup_key || "standard",
      currentPeriodStart: params.subscription.items.data[0]?.current_period_start
        ? new Date(params.subscription.items.data[0].current_period_start * 1000)
        : null,
      currentPeriodEnd: params.subscription.items.data[0]?.current_period_end
        ? new Date(params.subscription.items.data[0].current_period_end * 1000)
        : null,
      cancelAtPeriodEnd: params.subscription.cancel_at_period_end,
      cancelAt: params.subscription.cancel_at
        ? new Date(params.subscription.cancel_at * 1000)
        : null,
      canceledAt: params.subscription.canceled_at
        ? new Date(params.subscription.canceled_at * 1000)
        : null,
      trialStart: params.subscription.trial_start
        ? new Date(params.subscription.trial_start * 1000)
        : null,
      trialEnd: params.subscription.trial_end
        ? new Date(params.subscription.trial_end * 1000)
        : null,
    },
  });
}

async function syncSubscriptionById(subscriptionId: string, email?: string | null, name?: string | null) {
  const stripe = getStripe();
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const customerId = typeof subscription.customer === "string" ? subscription.customer : subscription.customer.id;
  const resolvedCustomer = email ? { email, name } : await resolveCustomerEmail(customerId);

  if (!resolvedCustomer?.email) {
    return { synced: false, reason: "missing_email" as const };
  }

  await upsertSubscriptionFromStripe({
    email: resolvedCustomer.email,
    name: resolvedCustomer.name,
    customerId,
    subscription,
  });

  return { synced: true, reason: "subscription_synced" as const };
}

export async function syncStripeEvent(event: Stripe.Event) {
  if (!hasDatabaseConfig) {
    return { synced: false, reason: "database_not_configured" as const };
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const subscriptionId =
        typeof session.subscription === "string"
          ? session.subscription
          : session.subscription?.id;

      if (!subscriptionId) {
        return { synced: false, reason: "missing_subscription" as const };
      }

      return syncSubscriptionById(
        subscriptionId,
        session.customer_details?.email || session.metadata?.email || null,
        session.customer_details?.name || null
      );
    }

    case "invoice.paid":
    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      const invoiceWithSubscription = invoice as Stripe.Invoice & {
        subscription?: string | Stripe.Subscription | null;
      };
      const subscriptionId =
        typeof invoiceWithSubscription.subscription === "string"
          ? invoiceWithSubscription.subscription
          : invoiceWithSubscription.subscription?.id;

      if (!subscriptionId) {
        return { synced: false, reason: "missing_subscription" as const };
      }

      return syncSubscriptionById(subscriptionId, invoice.customer_email || null, null);
    }

    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = typeof subscription.customer === "string" ? subscription.customer : subscription.customer.id;
      const resolvedCustomer = await resolveCustomerEmail(customerId);

      if (!resolvedCustomer?.email) {
        return { synced: false, reason: "missing_email" as const };
      }

      await upsertSubscriptionFromStripe({
        email: resolvedCustomer.email,
        name: resolvedCustomer.name,
        customerId,
        subscription,
      });

      return { synced: true, reason: "subscription_synced" as const };
    }

    default:
      return { synced: false, reason: "ignored_event" as const };
  }
}