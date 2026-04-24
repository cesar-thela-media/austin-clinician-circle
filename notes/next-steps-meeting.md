# ACC — Next Steps & Meeting Reference

> Created: April 21, 2026
> For: Review before next founder meeting

---

## 1. Waiting On (Blocked — Not Our Work)

| Item | Who | Why It's Needed |
|---|---|---|
| Railway project invite | Landon | We need access to deploy |
| WireGuard config file | Landon | VPN access to Railway private network |
| Stripe account / price ID | Landon | Can't wire real payments without it |
| Cloudflare R2 credentials | Landon | Account ID, Access Key, Secret, Bucket name |
| Domain DNS control | Landon | Needed for SSL + Resend sending domain |
| Sarah's design/copy feedback | Sarah | Content revisions, photo direction |
| Monthly membership price | Sarah | Currently mocked at $129/month |

---

## 2. What We've Already Built

| Area | Status |
|---|---|
| All public pages (Home, Who We Are, What We Offer, Find a Clinician, Join) | Done (UI) |
| Member dashboard (overview, resources, events, profile, billing, community) | Done (UI + mock data) |
| Admin dashboard (members, applications, resources, events) | Done (UI + mock data) |
| Coming soon / tripwire page with PDF delivery | Done (real API) |
| Prisma database schema (all tables) | Done |
| Docker dev + production setup | Done |
| Railway deployment config (Dockerfile, standalone output) | Done |
| BetterAuth schema tables | Done (tables only — not wired yet) |
| .env.example with all variables documented | Done |
| README with quickstart | Done |

---

## 3. What's Left to Build (Priority Order)

### Sprint 1 — Auth (needs Railway first)
- Wire BetterAuth to Next.js middleware
- Real sign-in / sign-up / forgot password flows
- Role-based redirects (member → /dashboard, admin → /admin)
- Session-protected routes (middleware guard)

### Sprint 2 — Database (needs Railway + Prisma)
- `npx prisma migrate deploy` on Railway
- Replace all mock data in dashboard/admin with real DB queries
- Member profile save/edit (writes to DB)
- Application form → saves to DB → appears in admin

### Sprint 3 — Stripe Integration
- Stripe Checkout session (new member payment)
- Stripe webhook handler (activates account on payment)
- Stripe Customer Portal (billing self-service)
- Subscription status sync to DB

### Sprint 4 — Cloudflare R2 (file storage)
- Upload API route (admin uploads resource PDF/image)
- Download signed URL generation (members download)
- Member profile photo upload
- Wire resource library to real files

### Sprint 5 — Resend Email
- Welcome email on new member signup
- Application received confirmation
- Application approved + payment link email
- Event reminder emails (Phase 2)

### Sprint 6 — Polish + Launch
- Final copy from Sarah applied everywhere
- Public clinician directory live (real member data)
- SEO meta tags on all public pages
- Mobile QA pass
- Domain DNS pointed to Railway
- Launch

---

## 4. UI Enhancements to Discuss at Meeting

### Scroll Scrubbing / Image Sequence Animation
A premium scroll-driven animation for the home page hero — content reveals as user scrolls, like Apple product pages.

**Two options:**

**Option A — Image Sequence (Recommended)**
- Export a video as ~60–120 WebP frames
- Host all frames on Cloudflare R2 (free bandwidth)
- JavaScript maps scroll position → frame index → swaps `<img src>`
- Crisp at any resolution, works on all browsers
- Best for: showing a product, telling a visual story, step reveals

**Option B — Video Scrubbing**
- Host a short `.mp4` on R2
- JavaScript sets `video.currentTime` based on scroll progress
- Smaller file size, easier to produce
- Limitation: Safari throttles seeks — can feel laggy
- Best for: clips under 10 seconds

**Recommendation:** Image sequence for hero/section reveals. Video scrubbing only for very short clips.

**Cost:** Near zero. R2 has free egress — every page load serving images or video costs nothing. A full 120-frame WebP sequence is ~5–10MB, costing ~$0.0002/month to store.

**When to implement:** After Sarah confirms the design direction and provides or approves visual assets for the animation.

---

## 5. Questions to Raise at the Meeting

1. Has Sarah reviewed the prototype? What are her specific copy/design notes?
2. What's the monthly membership price she's decided on?
3. From email address — `hello@austincliniciancircle.com`?
4. Does she want cancellation at end of billing period (what we built) or immediate?
5. Does she want scroll animation on the home page hero? If yes, what visual story should it tell?
6. Timeline for launch — is there a target date for first real members?
7. Cloudflare account — does anyone have one already or does Landon need to create it?

---

## 6. Tech Stack Reference (for meeting context)

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | Next.js (App Router) + TypeScript | All pages and UI |
| Styling | Tailwind CSS v4 | Layout and spacing |
| Auth | BetterAuth | Sign in, sessions, roles |
| Database | PostgreSQL + Prisma | All data storage |
| Payments | Stripe | Subscriptions, billing |
| File storage | Cloudflare R2 | PDFs, images, video |
| Email | Resend | Transactional emails |
| Hosting | Railway | App + database server |
| Dev environment | Docker | Local postgres + Next.js |
| VPN | WireGuard | Secure access to Railway network |
