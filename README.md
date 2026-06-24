# Austin Clinician Circle

A subscription-based virtual support network for licensed therapists in Austin, TX. Founded by Sarah Arnold, LPC-S (Restored Family Counseling).

Not a client-facing therapy platform — it serves therapists.

> **Live:** [acc-lac.vercel.app](https://acc-lac.vercel.app)

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + CSS custom properties
- **Database:** PostgreSQL (Prisma ORM)
- **Auth:** Clerk (with mock fallback for local dev)
- **Payments:** Stripe (sandbox mode)
- **Email:** Resend
- **Hosting:** Vercel

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Install & Run

```bash
cd app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

No environment variables are needed to run locally — the app falls back to mock data for auth, billing, and email.

### Build

```bash
npm run build
```

---

## Project Structure

```
app/                  Next.js App Router
  (public)/           Public marketing pages (/, /who-we-are, /what-we-offer, /join, /find-a-clinician)
  (auth)/             Auth pages (/sign-in, /sign-up)
  (dashboard)/        Member dashboard (/dashboard/*)
  (admin)/            Admin dashboard (/admin/*)
  api/                API routes (leads, applications, Stripe, mock auth)
components/           Shared UI components
lib/                  Utilities (auth, db, env, Stripe, PDF generation)
prisma/               Database schema
docs/                 Design docs, PRD, system design
public/               Static assets
```

---

## Pages

| Route | Description |
|---|---|
| `/` | Homepage — hero, Why ACC, testimonials, membership, pricing |
| `/who-we-are` | Founder story, origin, values |
| `/what-we-offer` | Membership benefits, pricing, FAQs |
| `/find-a-clinician` | Public clinician directory with search/filter |
| `/join` | Membership application form |
| `/playbook` | Free lead magnet page |
| `/sign-in` | Sign in / demo login |
| `/sign-up` | Account creation |
| `/dashboard` | Member overview |
| `/dashboard/free` | Free tier dashboard with paywall |
| `/admin` | Admin overview |

---

## Design System

- **Fonts:** Playfair Display (serif, headings) + DM Sans (sans, body)
- **Colors:** Sage green primary, amber accents, cream/parchment surfaces
- **All colors via CSS custom properties** — never raw hex in JSX
- Full spec in `docs/design-system.md`

