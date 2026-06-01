"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";

type BillingActionsProps = {
  hasStripeSandboxConfig: boolean;
  hasActiveCustomer: boolean;
};

export function BillingActions({
  hasStripeSandboxConfig,
  hasActiveCustomer,
}: BillingActionsProps) {
  const [loadingAction, setLoadingAction] = useState<"checkout" | "portal" | null>(null);
  const [error, setError] = useState("");

  const helperText = useMemo(() => {
    if (!hasStripeSandboxConfig) {
      return "Add Stripe test keys and a test price ID in .env to enable sandbox billing.";
    }

    if (hasActiveCustomer) {
      return "Sandbox billing is connected. Use Stripe's test cards and customer portal to validate the lifecycle.";
    }

    return "No Stripe sandbox subscription exists for this account yet. Start one with a test checkout session.";
  }, [hasActiveCustomer, hasStripeSandboxConfig]);

  async function startFlow(flow: "checkout" | "portal") {
    try {
      setError("");
      setLoadingAction(flow);
      const response = await fetch(`/api/stripe/${flow}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const payload = (await response.json()) as { error?: string; url?: string };

      if (!response.ok || !payload.url) {
        throw new Error(payload.error || "Unable to start billing flow.");
      }

      window.location.href = payload.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to start billing flow.");
      setLoadingAction(null);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => startFlow("portal")}
          disabled={!hasStripeSandboxConfig || !hasActiveCustomer || loadingAction !== null}
        >
          {loadingAction === "portal" ? "Opening sandbox portal..." : "Manage sandbox billing"}
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={() => startFlow("checkout")}
          disabled={!hasStripeSandboxConfig || loadingAction !== null}
        >
          {loadingAction === "checkout" ? "Starting sandbox checkout..." : hasActiveCustomer ? "Start another sandbox checkout" : "Start sandbox subscription"}
        </Button>
      </div>

      <p className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>
        {helperText}
      </p>

      {error ? (
        <p className="text-xs" style={{ color: "var(--color-error)" }}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
