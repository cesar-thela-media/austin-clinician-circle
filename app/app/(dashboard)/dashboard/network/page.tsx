import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const MEMBERS = [
  { name: "Dr. Maya Okonkwo", credentials: "LCSW", specialties: ["Trauma", "Grief", "EMDR"], city: "Austin, TX", accepting: true },
  { name: "James Whitfield", credentials: "LPC", specialties: ["Couples", "Attachment", "Gottman"], city: "Austin, TX", accepting: false },
  { name: "Sofia Reyes", credentials: "LMFT", specialties: ["Family", "Bilingual", "Anxiety"], city: "Austin, TX", accepting: true },
  { name: "Dr. Claire Hutchinson", credentials: "PhD", specialties: ["OCD", "Anxiety", "ERP"], city: "Austin, TX", accepting: true },
  { name: "Marcus Lee", credentials: "LPC", specialties: ["Somatic", "Burnout", "Mindfulness"], city: "Austin, TX", accepting: true },
  { name: "Priya Nair", credentials: "LCSW", specialties: ["Perinatal", "Postpartum", "Women"], city: "Austin, TX", accepting: false },
  { name: "Thomas Garza", credentials: "LMFT", specialties: ["LGBTQ+", "Couples", "Identity"], city: "Austin, TX", accepting: true },
  { name: "Rachel Bloom", credentials: "LPC", specialties: ["Adolescents", "Young Adults", "Transitions"], city: "Austin, TX", accepting: true },
  { name: "Dr. Ade Kolade", credentials: "PsyD", specialties: ["Cultural Identity", "Men", "Workplace"], city: "Austin, TX", accepting: true },
];

const referralActivity = [
  { from: "James Whitfield, LPC", to: "You", specialty: "Somatic therapy", date: "Apr 18" },
  { from: "You", to: "Sofia Reyes, LMFT", specialty: "Family therapy", date: "Apr 14" },
  { from: "Dr. Claire Hutchinson, PhD", to: "You", specialty: "Trauma (adult)", date: "Apr 9" },
];

export default function NetworkPage() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: "var(--color-sage-600)" }}>Network</p>
        <h1 style={{ fontFamily: "var(--font-serif), Georgia, serif", fontSize: "2rem", fontWeight: 400, color: "var(--color-sage-900)" }}>
          Referral network
        </h1>
      </div>

      {/* Recent referral activity */}
      <div>
        <h2 className="text-base font-semibold mb-4" style={{ color: "var(--color-sage-800)" }}>Recent referral activity</h2>
        <Card className="flex flex-col divide-y" style={{ padding: 0 }}>
          {referralActivity.map((r, i) => (
            <div key={i} className="flex items-center justify-between gap-4 px-6 py-4">
              <div>
                <p className="text-sm" style={{ color: "var(--color-text-primary)" }}>
                  <span className="font-medium">{r.from}</span>
                  <span style={{ color: "var(--color-text-tertiary)" }}> referred </span>
                  <span className="font-medium">{r.to}</span>
                </p>
                <p className="text-xs mt-0.5" style={{ color: "var(--color-text-tertiary)" }}>
                  {r.specialty} · {r.date}
                </p>
              </div>
              <Badge>Referral</Badge>
            </div>
          ))}
        </Card>
      </div>

      {/* Member directory */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold" style={{ color: "var(--color-sage-800)" }}>Member directory</h2>
          <p className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>{MEMBERS.length} members</p>
        </div>
        <div className="flex flex-col gap-3">
          {MEMBERS.map((m) => (
            <Card key={m.name} hover className="flex items-center justify-between gap-4 py-4">
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium shrink-0"
                  style={{ background: "var(--color-sage-100)", color: "var(--color-sage-500)" }}
                >
                  {m.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
                    {m.name}, {m.credentials}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {m.specialties.slice(0, 3).map((s) => (
                      <Badge key={s}>{s}</Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                {m.accepting && <Badge variant="success">Accepting clients</Badge>}
                <button
                  className="text-xs font-medium underline"
                  style={{ color: "var(--color-sage-700)", textUnderlineOffset: "3px" }}
                >
                  Refer →
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
