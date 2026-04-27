import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const invoices = [
  { id: "INV-2026-04", date: "Apr 1, 2026", amount: "$129.00", status: "Paid" },
  { id: "INV-2026-03", date: "Mar 1, 2026", amount: "$129.00", status: "Paid" },
  { id: "INV-2026-02", date: "Feb 1, 2026", amount: "$129.00", status: "Paid" },
  { id: "INV-2026-01", date: "Jan 1, 2026", amount: "$129.00", status: "Paid" },
  { id: "INV-2025-12", date: "Dec 1, 2025", amount: "$129.00", status: "Paid" },
];

export default function BillingPage() {
  return (
    <div className="flex flex-col gap-10 max-w-2xl w-full">
      <div>
        <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: "var(--color-sage-600)" }}>Billing</p>
        <h1 style={{ fontFamily: "var(--font-serif), Manrope, sans-serif", fontSize: "2rem", fontWeight: 400, color: "var(--color-sage-900)" }}>
          Subscription & billing
        </h1>
      </div>

      {/* Current plan */}
      <Card className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold" style={{ color: "var(--color-sage-800)" }}>
              ACC Member — Monthly
            </h2>
            <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>
              Full access to all community resources, events, and the member directory.
            </p>
          </div>
          <Badge variant="success">Active</Badge>
        </div>

        <div
          className="rounded-xl px-4 sm:px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          style={{ background: "var(--color-cream-100)", border: "1px solid var(--color-cream-300)" }}
        >
          <div>
            <p className="text-2xl font-light" style={{ fontFamily: "var(--font-serif), Manrope, sans-serif", color: "var(--color-sage-700)" }}>
              $129
              <span className="text-sm font-normal ml-1" style={{ color: "var(--color-text-tertiary)" }}>/month</span>
            </p>
            <p className="text-xs mt-0.5" style={{ color: "var(--color-text-tertiary)" }}>
              Renews May 1, 2026 · Billed monthly
            </p>
          </div>
        </div>

        <div
          className="rounded-xl px-4 sm:px-5 py-4 flex flex-col gap-1"
          style={{ background: "var(--color-cream-100)", border: "1px solid var(--color-cream-300)" }}
        >
          <p className="text-xs font-medium" style={{ color: "var(--color-text-secondary)" }}>Payment method</p>
          <div className="flex flex-wrap items-center gap-3 mt-1">
            <div
              className="px-3 py-1 rounded text-xs font-semibold"
              style={{ background: "var(--color-sage-900)", color: "#fff" }}
            >
              VISA
            </div>
            <p className="text-sm" style={{ color: "var(--color-text-primary)" }}>
              Visa ending in 4242
            </p>
            <p className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>
              Exp. 09/28
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
          <Button variant="secondary" size="sm">Update payment method</Button>
          <Button variant="ghost" size="sm">Download receipt</Button>
        </div>
      </Card>

      {/* Annual upgrade callout */}
      <Card
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        style={{ background: "var(--color-sage-50)", borderColor: "var(--color-sage-100)" }}
      >
        <div>
          <p className="text-sm font-semibold" style={{ color: "var(--color-sage-800)" }}>
            Save 15% with annual billing
          </p>
          <p className="text-xs mt-0.5" style={{ color: "var(--color-text-secondary)" }}>
            Switch to $1,313/year (equivalent to $109/month) and lock in your rate.
          </p>
        </div>
        <Button variant="primary" size="sm">Switch to annual</Button>
      </Card>

      {/* Invoice history */}
      <div>
        <h2 className="text-base font-semibold mb-4" style={{ color: "var(--color-sage-900)" }}>Invoice history</h2>
        <div className="md:hidden flex flex-col gap-3">
          {invoices.map((inv) => (
            <Card key={inv.id} className="flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>{inv.id}</p>
                  <p className="text-xs mt-1" style={{ color: "var(--color-text-tertiary)" }}>{inv.date}</p>
                </div>
                <Badge variant="success">{inv.status}</Badge>
              </div>
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>{inv.amount}</p>
                <button className="text-xs underline" style={{ color: "var(--color-sage-700)", textUnderlineOffset: "3px" }}>
                  Download
                </button>
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
                {invoices.map((inv, i) => (
                  <tr
                    key={inv.id}
                    style={{ borderBottom: i < invoices.length - 1 ? "1px solid var(--color-cream-200)" : "none" }}
                  >
                    <td className="px-6 py-3.5" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-sans)" }}>
                      {inv.id}
                    </td>
                    <td className="px-6 py-3.5" style={{ color: "var(--color-text-secondary)" }}>{inv.date}</td>
                    <td className="px-6 py-3.5" style={{ color: "var(--color-text-primary)", fontWeight: 500 }}>{inv.amount}</td>
                    <td className="px-6 py-3.5"><Badge variant="success">{inv.status}</Badge></td>
                    <td className="px-6 py-3.5 text-right">
                      <button className="text-xs underline" style={{ color: "var(--color-sage-700)", textUnderlineOffset: "3px" }}>
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Cancel */}
      <div
        className="rounded-2xl border px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        style={{ borderColor: "var(--color-cream-300)", background: "#fff" }}
      >
        <div>
          <p className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>Cancel membership</p>
          <p className="text-xs mt-0.5" style={{ color: "var(--color-text-tertiary)" }}>
            You&apos;ll retain access through May 1, 2026. This action cannot be undone.
          </p>
        </div>
        <Button variant="destructive" size="sm">Cancel membership</Button>
      </div>
    </div>
  );
}
