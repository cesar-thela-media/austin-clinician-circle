interface PricingCardProps {
  price: string;
  period?: string;
  features: string[];
  ctaLabel?: string;
  ctaHref?: string;
  featured?: boolean;
}

export function PricingCard({
  price,
  period = "/month",
  features,
  ctaLabel = "Join the circle",
  ctaHref = "/join",
  featured = false,
}: PricingCardProps) {
  return (
    <div
      className="rounded-3xl p-6 sm:p-8 flex flex-col gap-5 sm:gap-6 w-full"
      style={{
        background: "#fff",
        border: `2px solid ${
          featured ? "var(--color-sage-700)" : "var(--color-cream-300)"
        }`,
        boxShadow: featured
          ? "0 16px 48px rgba(0,0,0,0.12)"
          : "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <div>
        <p
          className="text-xs font-medium uppercase tracking-widest mb-3"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          Monthly membership
        </p>
        <div className="flex items-baseline gap-1">
          <span
            className="font-light"
            style={{
              fontFamily: "var(--font-serif), Georgia, serif",
              color: "var(--color-sage-700)",
              fontSize: "clamp(2.75rem, 12vw, 3.5rem)",
            }}
          >
            {price}
          </span>
          <span className="text-sm" style={{ color: "var(--color-text-tertiary)" }}>
            {period}
          </span>
        </div>
      </div>

      <ul className="flex flex-col gap-3">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-3 text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            <span
              className="mt-0.5 shrink-0"
              style={{ color: "var(--color-sage-500)" }}
            >
              ✓
            </span>
            {feature}
          </li>
        ))}
      </ul>

      <a
        href={ctaHref}
        className="mt-auto block text-center py-3 rounded-full text-sm font-medium transition-colors duration-150 hover:opacity-90"
        style={{ background: "var(--color-sage-700)", color: "#fff" }}
      >
        {ctaLabel}
      </a>
    </div>
  );
}
