# Austin Clinician Circle

A subscription-based virtual support network for licensed therapists — built to end the isolation of private practice.

Founded by Sarah Arnold, LPC-S (Restored Family Counseling, Austin TX). ACC gives clinicians a professional home: case consultation, CEUs, a referral network, a public directory, and resources for long-term practice sustainability.

**This is not a client-facing therapy platform.** It serves therapists.

---

## What It Does

Members get access to:
- Monthly case consultation groups
- Continuing education (CEUs)
- Trusted referral network + public directory listing
- Curated clinical and business resources
- Burnout prevention structures and peer community

Three tiers: **Starter · Professional · Premium**

---

## Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js (App Router), Tailwind CSS v4, TypeScript |
| Auth | BetterAuth (session + role-based access) |
| Database | PostgreSQL on Railway, Prisma ORM |
| Payments | Stripe (subscriptions + cancellation) |
| File Storage | Cloudflare R2 |
| Email | Resend |
| Hosting | Railway (Docker, single platform) |

---

## Local Dev — Docker

**Prerequisites:** Docker Desktop installed and running.

```bash
# 1. Clone and enter the repo
git clone https://github.com/thela-media-group/austin-clinician-circle.git
cd austin-clinician-circle

# 2. Copy env template and fill in secrets
cp .env.example .env

# 3. Spin up Postgres + the app
docker compose up -d

# 4. Run Prisma migrations (first time only)
docker compose exec app npx prisma migrate dev --name init

# 5. Open http://localhost:3000
```

To wipe the database and start fresh:
```bash
docker compose down -v
```

---

## Design

Calm sage/cream palette — complementing restoredfamily.com.
Typography: Cormorant Garamond (headings) + Plus Jakarta Sans (body).
Colors: sage `#4A5D4E`, soft surface `#F8FAF3`, nested surface `#ECEFE8`, accent gold `#C9A96E`.

---

## Pages

**Public:** Home (Coming Soon → full marketing), Who We Are, What We Offer, Join the Circle, Find a Clinician directory

**Member dashboard:** Resources library, events calendar, referral network, directory profile, billing

**Admin:** Member management, resource uploads, application review, event management

---

## Documentation

All docs live in [`docs/`](./docs/):

- **[PRD](./docs/PRD.md)** — Product scope, user stories, page specs, subscription model, MVP definition, success metrics
- **[Design System](./docs/design-system.md)** — Color palette, typography, component specs, Tailwind token reference
- **[Design Strategy](./docs/DESIGN.md)** — Design intent and rationale
- **[System Design](./docs/system-design.md)** — Architecture diagram, database ERD, auth flow, Stripe payment flow, file storage flow, API structure, deployment pipeline

---

## Project Structure

```
app/                      # Next.js application (main codebase)
docs/                     # PRD, design system, system design
diagrams/                 # Architecture and flow diagrams (PNG)
  design-references/      # Visual design reference images
images/                   # Production photos
  screenshots/            # UI review screenshots
notes/                    # Developer notes (blockers, client requests)
```
