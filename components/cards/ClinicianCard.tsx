"use client";

import { Badge } from "@/components/ui/Badge";

interface ClinicianCardProps {
  name: string;
  credentials: string;
  tagline: string;
  specialties: string[];
  photo?: string;
  href?: string;
  acceptingClients?: boolean;
}

export function ClinicianCard({
  name,
  credentials,
  tagline,
  specialties,
  photo,
  href = "#",
  acceptingClients = true,
}: ClinicianCardProps) {
  return (
    <div
      className="bg-white rounded-2xl p-5 sm:p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1"
      style={{
        border: "1px solid rgba(197, 200, 190, 0.5)",
        boxShadow: "0 2px 16px rgba(74, 93, 78, 0.07)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 8px 32px rgba(74, 93, 78, 0.12)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 2px 16px rgba(74, 93, 78, 0.07)";
      }}
    >
      <div className="flex items-start gap-4">
        <div
          className="w-14 h-14 rounded-full shrink-0 overflow-hidden flex items-center justify-center text-lg font-medium"
          style={{
            background: "var(--color-sage-100)",
            color: "var(--color-sage-500)",
          }}
        >
          {photo ? (
            <img src={photo} alt={name} loading="lazy" decoding="async" className="w-full h-full object-cover" />
          ) : (
            name.charAt(0)
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p
            className="text-sm font-semibold leading-snug"
            style={{ color: "var(--color-text-primary)" }}
          >
            {name}, {credentials}
          </p>
          <p
            className="text-sm mt-0.5 line-clamp-3"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {tagline}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {specialties.slice(0, 3).map((s) => (
          <Badge key={s}>{s}</Badge>
        ))}
        {acceptingClients && (
          <Badge variant="success">Accepting clients</Badge>
        )}
      </div>

      <a
        href={href}
        className="text-sm font-medium mt-auto transition-colors duration-150 hover:underline"
        style={{ color: "var(--color-sage-700)", textUnderlineOffset: "3px" }}
      >
        View profile →
      </a>
    </div>
  );
}
