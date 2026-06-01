import Stripe from "stripe";
import { BillingActions } from "@/components/billing/BillingActions";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { getCurrentViewer } from "@/lib/auth";
import { hasClerkCredentials, hasStripeSandboxConfig } from "@/lib/env";
import { findSandboxCustomerByEmail, getStripe } from "@/lib/stripe";

function formatMoney(amount?: number | null, currency = "usd") {
  if (amount == null) return "$79.00";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

function formatDate(value?: number | string | null) {
  if (!value) return "Not available yet";
  const date = new Date(typeof value === "number" ? value * 1000 : value);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function toBadgeVariant(status?: string | null) {
  if (status === "active") return "success" as const;
  if (status === "trialing") return "accent" as const;
  if (status === "past_due" || status === "unpaid") return "warning" as const;
  if (status === "canceled") return "error" as const;
  return "default" as const;
}

function toLabel(status?: string | null, hasCustomer?: boolean) {
  if (!status) return hasCustomer ? "Customer created" : "Not started";
  return status.replace(/_/g, " ");
}

export default async function BillingPage() {
  const viewer = await getCurrentViewer();
  let customer: Stripe.Customer | null = null;
  let subscription: Stripe.Subscription | null = null;
  let invoices: Stripe.Invoice[] = [];

  if (hasStripeSandboxConfig && viewer.primaryEmail) {
    const foundCustomer = await findSandboxCustomerByEmail(viewer.primaryEmail);
    if (foundCustomer && !("deleted" in foundCustomer && foundCustomer.deleted)) {
      customer = foundCustomer;
      const stripe = getStripe();
      const subscriptionList = await stripe.subscriptions.list({
        customer: customer.id,
        status: "all",
        limit: 1,
      });
      subscription = subscriptionList.data[0] ?? null;

      const invoiceList = await stripe.invoices.list({
        customer: customer.id,
        limit: 5,
      });
      invoices = invoiceList.data;
    }
  }

  const planAmount = subscription?.items.data[0]?.price.unit_amount ?? null;
  const planCurrency = subscription?.currency ?? "usd";
  const renewalDate = subscription?.items.data[0]?.current_period_end
    ? formatDate(subscription.items.data[0].current_period_end)
    : customer
      ? "Awaiting first sandbox invoice"
      : "Not started";

  const sandboxCopy = hasStripeSandboxConfig
    ? "Stripe is configured for test mode. Use test cards and webhook forwarding to validate checkout, renewals, failures, and cancellation flows safely."
    : "Add STRIPE_SECRET_KEY, STRIPE_PRICE_ID, and STRIPE_WEBHOOK_SECRET test values in .env to enable sandbox billing.";

  return (
    <div className="flex flex-col gap-10 max-w-4xl w-full">
      <div>
        <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: "var(--color-sage-600)" }}>Billing</p>
        <h1 className="text-page-title">
          Subscription & billing
        </h1>
        <p className="text-sm mt-3" style={{ color: "var(--color-text-secondary)" }}>
          Sandbox-ready Stripe billing for The Circle membership.
        </p>
      </div>

      <Card className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold" style={{ color: "var(--color-sage-800)" }}>
              The Circle membership
            </h2>
            <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>
              Full access to community resources, events, and the member directory, powered by Stripe test mode while sandbox credentials are in use.
            </p>
          </div>
          <Badge variant={toBadgeVariant(subscription?.status, )}>{toLabel(subscription?.status, Boolean(customer))}</Badge>
        </div>

        <div
          className="rounded-xl px-4 sm:px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          style={{ background: "var(--color-cream-100)", border: "1px solid var(--color-cream-300)" }}
        >
          <div>
            <p className="text-2xl font-light" style={{ fontFamily: "var(--font-serif), Manrope, sans-serif", color: "var(--color-sage-700)" }}>
              {formatMoney(planAmount, planCurrency)}
              <span className="text-sm font-normal ml-1" style={{ color: "var(--color-text-tertiary)" }}>/month</span>
            </p>
            <p className="text-xs mt-0.5" style={{ color: "var(--color-text-tertiary)" }}>
              {renewalDate} · {hasStripeSandboxConfig ? "Sandbox billing active" : "Sandbox not configured"}
            </p>
          </div>
          <div className="text-xs text-right" style={{ color: "var(--color-text-tertiary)" }}>
            {viewer.primaryEmail || "Sign in with Clerk sandbox auth to attach billing to an account."}
          </div>
        </div>

        <div
          className="rounded-xl px-4 sm:px-5 py-4 flex flex-col gap-1"
          style={{ background: "var(--color-cream-100)", border: "1px solid var(--color-cream-300)" }}
        >
          <p className="text-xs font-medium" style={{ color: "var(--color-text-secondary)" }}>Sandbox customer</p>
          <p className="text-sm mt-1" style={{ color: "var(--color-text-primary)" }}>
            {customer ? `Stripe customer ${customer.id}` : "No sandbox customer exists for this account yet."}
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--color-text-tertiary)" }}>
            Payment methods, invoices, and cancellations are managed through Stripe&apos;s test customer portal.
          </p>
        </div>

        <BillingActions
          hasStripeSandboxConfig={hasStripeSandboxConfig && hasClerkCredentials}
          hasActiveCustomer={Boolean(customer)}
        />
      </Card>

      <Card
        className="flex flex-col gap-3"
        style={{ background: "var(--color-sage-50)", borderColor: "var(--color-sage-100)" }}
      >
        <div>
          <p className="text-sm font-semibold" style={{ color: "var(--color-sage-800)" }}>
            Stripe sandbox mode
          </p>
          <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>
            {sandboxCopy}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs" style={{ color: "var(--color-text-tertiary)" }}>
          <span>Recommended test card: 4242 4242 4242 4242</span>
          <span>•</span>
          <span>Webhook endpoint: /api/stripe/webhook</span>
        </div>
      </Card>

      <div>
        <h2 className="text-base font-semibold mb-4" style={{ color: "var(--color-sage-900)" }}>Invoice history</h2>
        {invoices.length === 0 ? (
          <Card>
            <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
              No sandbox invoices yet. Once you complete a test checkout, invoice history will appear here.
            </p>
          </Card>
        ) : (
          <>
            <div className="md:hidden flex flex-col gap-3">
              {invoices.map((invoice) => (
                <Card key={invoice.id} className="flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>{invoice.number || invoice.id}</p>
                      <p className="text-xs mt-1" style={{ color: "var(--color-text-tertiary)" }}>{formatDate(invoice.created)}</p>
                    </div>
                    <Badge variant={toBadgeVariant(invoice.status)}>{toLabel(invoice.status, true)}</Badge>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>{formatMoney(invoice.amount_paid || invoice.amount_due, invoice.currency || "usd")}</p>
                    {invoice.invoice_pdf ? (
                      <a href={invoice.invoice_pdf} target="_blank" rel="noreferrer" className="text-xs underline" style={{ color: "var(--color-sage-700)", textUnderlineOffset: "3px" }}>
                        Download
                      </a>
                    ) : null}
                  </div>
                </Card>
              ))}
            </div>
            <Card className="hidden md:block overflow-hidden" style={{ padding: 0 }}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: "1px solid var(--color-cream-300)", background: "var(--color-cream-100)" }}>
                      <th className="text-left px-6 py-3 text-xs font-semibold" style={{ color: "var(--color-text-tertiary)" }}>Invoice</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold" style={{ color: "var(--color-text-tertiary)" }}>Date</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold" style={{ color: "var(--color-text-tertiary)" }}>Amount</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold" style={{ color: "var(--color-text-tertiary)" }}>Status</th>
                      <th className="px-6 py-3" />
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice, index) => (
                      <tr
                        key={invoice.id}
                        style={{ borderBottom: index < invoices.length - 1 ? "1px solid var(--color-cream-200)" : "none" }}
                      >
                        <td className="px-6 py-3.5" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-sans)" }}>
                          {invoice.number || invoice.id}
                        </td>
                        <td className="px-6 py-3.5" style={{ color: "var(--color-text-secondary)" }}>{formatDate(invoice.created)}</td>
                        <td className="px-6 py-3.5" style={{ color: "var(--color-text-primary)", fontWeight: 500 }}>{formatMoney(invoice.amount_paid || invoice.amount_due, invoice.currency || "usd")}</td>
                        <td className="px-6 py-3.5"><Badge variant={toBadgeVariant(invoice.status)}>{toLabel(invoice.status, true)}</Badge></td>
                        <td className="px-6 py-3.5 text-right">
                          {invoice.invoice_pdf ? (
                            <a href={invoice.invoice_pdf} target="_blank" rel="noreferrer" className="text-xs underline" style={{ color: "var(--color-sage-700)", textUnderlineOffset: "3px" }}>
                              Download
                            </a>
                          ) : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </>
        )}
      </div>

      <div
        className="rounded-2xl border px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        style={{ borderColor: "var(--color-cream-300)", background: "#fff" }}
      >
        <div>
          <p className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>Cancellation flow</p>
          <p className="text-xs mt-0.5" style={{ color: "var(--color-text-tertiary)" }}>
            Sandbox cancellations are handled through the Stripe customer portal so you can validate end-of-period cancellation behavior without touching live billing.
          </p>
        </div>
        <Badge variant={hasStripeSandboxConfig ? "warning" : "default"}>
          {hasStripeSandboxConfig ? "Test mode only" : "Awaiting Stripe config"}
        </Badge>
      </div>
    </div>
  );
}
