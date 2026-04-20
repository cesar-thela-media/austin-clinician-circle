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
      className="bg-white rounded-2xl border p-5 flex flex-col gap-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
      style={{
        borderColor: "var(--color-cream-300)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
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
            <img src={photo} alt={name} className="w-full h-full object-cover" />
          ) : (
            name.charAt(0)
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p
            className="text-sm font-semibold truncate"
            style={{ color: "var(--color-text-primary)" }}
          >
            {name}, {credentials}
          </p>
          <p
            className="text-sm mt-0.5 line-clamp-2"
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
