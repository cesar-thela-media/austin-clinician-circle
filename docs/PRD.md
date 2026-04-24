Hiii,

I want to flag something before I go further on the Austin Clinician Circle project. I jumped into some early setup work (Coming Soon page, project scaffold, design token exploration) before formalizing a proper PRD, that's on me.

I've gone back and written a full PRD modeled after the structure you used on the Restored Family redesign. It covers everything: personas, page-by-page specs, tech stack, data model, security, permissions, milestones, and risks.

What I'm asking: Can you review this before I continue execution? I want to make sure the scope, architecture, and priorities are aligned before I build further. Everything past the Coming Soon page is paused until this is approved.

A few things I'd specifically like your input on:

- Does the tech stack make sense (Vercel + Railway + BetterAuth + Drizzle)?
- Anything missing from Sarah's side that I should add?

Appreciate you taking a look.

— Cesar

# Product Requirements Document (PRD)
# Austin Clinician Circle — Subscription-Based Therapist Network

**Version:** 2.0
**Date:** April 24, 2026
**Status:** Draft — Pending Approval
**Client:** Sarah Arnold, LPC-S — Restored Family Counseling
**Project Code:** ACC

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Current State and Context](#2-current-state-and-context)
3. [Competitive Landscape](#3-competitive-landscape)
4. [Target Audience and User Personas](#4-target-audience-and-user-personas)
5. [Brand and Design System](#5-brand-and-design-system)
6. [Information Architecture](#6-information-architecture)
7. [Page-by-Page Specifications](#7-page-by-page-specifications)
8. [Technical Architecture](#8-technical-architecture)
9. [Data Model and Contracts](#9-data-model-and-contracts)
10. [Role Permissions Matrix](#10-role-permissions-matrix)
11. [Animation and Interaction Design](#11-animation-and-interaction-design)
12. [Mobile Experience](#12-mobile-experience)
13. [Performance and SEO Technical Requirements](#13-performance-and-seo-technical-requirements)
14. [Security and Compliance](#14-security-and-compliance)
15. [Launch Plan and Milestones](#15-launch-plan-and-milestones)
16. [MVP Scope vs. Future](#16-mvp-scope-vs-future)
17. [Success Metrics](#17-success-metrics)
18. [Assumptions and Risks](#18-assumptions-and-risks)
19. [Appendix: Source Material](#19-appendix-source-material)

---

## 1. Executive Summary

### Project Vision

Build the Austin Clinician Circle as a subscription-based virtual support network exclusively for licensed therapists. ACC provides clinical community, professional development, and business support — combating the isolation of private practice through a curated, membership-driven platform. The product is built on Next.js (App Router), deployed on Vercel, with Stripe for billing and Railway for the database.

### What This Is NOT

- Not a client-facing therapy platform — ACC serves therapists, not their clients
- Not a group therapy practice (like Shelterwood Collective's client-facing side)
- Not an insurance billing service
- Not a physical co-working space
- Not a peer-support group chat (yet — community feature is deferred)

### Core Objectives

1. **Professional Home for Therapists** — Give Austin-area clinicians a single platform for consultation, CEUs, resources, referrals, and community
2. **Public Credibility Engine** — A searchable clinician directory that drives referrals and positions ACC members as trusted professionals
3. **Sustainable Revenue** — Monthly recurring subscriptions processed through Stripe with minimal admin overhead
4. **Founder-Manageable** — Sarah Arnold operates everything through an admin dashboard with no engineering support needed post-launch
5. **Brand Alignment** — Complement the restoredfamily.com aesthetic. Same family, distinct identity

### Key Metrics

| Metric | Target |
|--------|--------|
| Founding members signed up (month 1) | 10–15 |
| Member retention rate (monthly) | 90%+ |
| Directory page views (monthly) | 500+ |
| Resource downloads (monthly) | 50+ |
| Event attendance rate | 70%+ |
| Page load time | < 2s |
| Lighthouse Performance Score | 90+ |

---

## 2. Current State and Context

### 2.1 Origin

Sarah Arnold (LPC-S, founder of Restored Family Counseling) identified a gap: private practice therapists in Austin lack trusted colleagues for case consultation, organized access to CEUs, marketing guidance, and burnout prevention structures. ACC was conceived as the answer — a virtual, subscription-based network that provides all of this under one roof.

### 2.2 What Exists Today (Early Exploration)

Before this PRD was formalized, some exploratory groundwork was done to test feasibility and get a Coming Soon page live per Sarah's request. None of this is final — everything below is subject to revision based on PRD approval.

| Asset | Status | Notes |
|-------|--------|-------|
| Coming Soon page (email capture) | Live | Deployed per Sarah's request so invitations have a landing URL |
| Project scaffold (Next.js + Tailwind + Docker) | Scaffolded | Basic project structure, can be restructured |
| Design system (color tokens, component drafts) | Exploratory | Needs review — tokens based on restoredfamily.com palette |
| Database schema | Drafted | Preliminary Prisma schema, not migrated |
| Public pages (5 pages) | Not started | Awaiting PRD approval |
| Auth system (BetterAuth) | Not started | Awaiting PRD approval |
| Stripe integration | Not started | Awaiting PRD approval |
| Admin dashboard | Not started | Awaiting PRD approval |
| Member dashboard | Not started | Awaiting PRD approval |

### 2.3 Client Direction (Sarah's Original Brief)

> "I am creating The Austin Clinician Circle as a support network for therapists. I would like the color scheme to complement the restoredfamily.com site. Again, not an exact copy, but similar vibe."

**Pages requested:** Who We Are, What We Offer, Find a Clinician, Join the Circle, Login.
**Behind login:** Subscription management, resource access, Stripe payments.
**Immediate need:** Coming Soon page while content is developed.
**Design reference:** shelterwoodcollective.com — structural inspiration, not a copy.

---

## 3. Competitive Landscape

### 3.1 Direct Comparison: Shelterwood Collective

Shelterwood Collective (shelterwoodcollective.com) is the closest analog Sarah identified. Key differences:

| Dimension | Shelterwood | ACC |
|-----------|-------------|-----|
| Geography | Different state, in-person offices | Austin TX, virtual-only |
| Model | Group practice + affiliate tiers | Subscription network |
| Services | Client-facing therapy + insurance billing | Therapist-facing support only |
| Scale | Multi-location, large team | Solo founder, 10–30 members |
| Design | Polished, warm, editorial | Same warmth — complement restoredfamily.com |

### 3.2 What ACC Borrows from Shelterwood

- Clean visual hierarchy and warm aesthetic
- Clinician directory as a public-facing trust signal
- Tiered membership benefits (simplified to one tier for MVP)
- Resource library as a member perk

### 3.3 What ACC Does Differently

- Virtual-only — no physical office overhead
- Not a group practice — members keep their own practices
- Subscription-first revenue model — no insurance billing
- Founder-managed — Sarah runs everything through the admin dashboard

---

## 4. Target Audience and User Personas

### Persona 1: "The Isolated Practitioner" (Primary)
- **Demographics:** Licensed therapist (LPC, LCSW, LMFT), 28–50, Austin-based, 2–10 years in private practice
- **Pain Points:** Professional isolation, no trusted peers for case consultation, limited access to affordable CEUs, struggles with marketing and business side of practice
- **What They Need:** A community of vetted colleagues, curated resources, referral network, someone who understands the business of therapy
- **Conversion Triggers:** Invitation from Sarah, seeing familiar colleagues already in the network, clear ROI on the subscription price
- **Discovery:** Direct invitation letter, word of mouth, restoredfamily.com referral

### Persona 2: "The New Associate" (Secondary)
- **Demographics:** LPC-Associate or newly licensed therapist, 25–35, building their first private practice
- **Pain Points:** No established referral network, imposter syndrome, overwhelmed by business logistics, needs mentorship
- **What They Need:** Experienced colleagues, practice-building resources, a directory listing to build credibility
- **Conversion Triggers:** Sarah's reputation as a supervisor, community of established therapists, practical business resources

### Persona 3: "The Public Visitor" (Passive)
- **Demographics:** Anyone looking for a therapist in Austin — clients, referral sources, colleagues
- **Pain Points:** Need to find a trusted, vetted therapist with specific specialties
- **What They Need:** A searchable directory with filters (specialty, modality, insurance, availability)
- **Conversion Triggers:** Clean directory, detailed clinician profiles, trust in the ACC brand

### Persona 4: "Sarah Arnold" (Admin)
- **Demographics:** Founder, sole administrator, LPC-Supervisor
- **Pain Points:** Needs to run the entire network without engineering help
- **What They Need:** Simple admin dashboard to manage members, review applications, upload resources, create events, monitor subscriptions
- **Conversion Triggers:** N/A — she is the product owner

---

## 5. Brand and Design System

### 5.1 Brand Positioning

Austin Clinician Circle is a professional sanctuary for therapists — where clinical excellence meets genuine community. The brand should feel like a trusted colleague: warm, grounded, and competent. Never corporate. Never clinical.

### 5.2 Brand Voice and Tone

| Attribute | Description | Example |
|-----------|-------------|---------|
| **Warm** | Feels like a colleague, not a platform | "Deepen your work. Find your community." |
| **Grounded** | Confident without being corporate | "The clinicians who thrive long term aren't just skilled — they're connected." |
| **Professional** | Clinical credibility without jargon | "Case consultation, CEUs, and a referral network — in one place." |
| **Inclusive** | Welcoming across all modalities and backgrounds | "Every clinician deserves a professional home." |
| **Direct** | Sentence case, no ALL CAPS, no filler | "Join the Circle" — not "JOIN THE CIRCLE TODAY!" |

### 5.3 Color Palette

**Primary — "Sage Earth"**

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-sage-900` | `#2F3E33` | Hero backgrounds, footer, dark sections |
| `--color-sage-800` | `#3B4D3F` | Dark section variants, hover on dark |
| `--color-sage-700` | `#4A5D4E` | **Primary brand** — buttons, links, icons, active states |
| `--color-sage-600` | `#5A7060` | Eyebrow labels, secondary accents |
| `--color-sage-500` | `#6B8572` | Lighter icons, decorative accents |
| `--color-sage-100` | `#E4EBE6` | Light sage tint, subtle backgrounds |
| `--color-sage-50` | `#F3F6F4` | Barely-there sage wash |

**Surfaces — Sage-Tinted (not warm beige)**

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-cream-100` / `--color-surface` | `#F8FAF3` | Page base background |
| `--color-cream-200` / `--color-surface-low` | `#ECEFE8` | Section nesting, alternating containers |
| `--color-cream-300` | `#DFE3DA` | Ghost borders (at ≤60% opacity) |
| `--color-cream-400` | `#C5C8BE` | Disabled states, subtle dividers |
| `--color-surface-card` | `#FFFFFF` | Interactive cards, floating modules |

**Text**

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-text-primary` | `#191C18` | Headings, body (never pure black) |
| `--color-text-secondary` | `#444841` | Subtext, captions |
| `--color-text-tertiary` | `#75796E` | Placeholders, fine print |
| `--color-text-inverse` | `#FFFFFF` | Text on dark/sage backgrounds |

**Accent**

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-gold` | `#C9A96E` | Premium highlights, membership badge |
| `--color-terracotta` | `#C07A5A` | Warm CTA accents, callout borders |
| `--color-blush` | `#FED7D2` | Achievement callouts, milestone banners |

**Functional**

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-success` | `#4A7C59` | Success, "accepting clients" |
| `--color-warning` | `#C4932A` | Warnings, pending |
| `--color-error` | `#B54B4B` | Errors, destructive |
| `--color-info` | `#4A6F8C` | Info badges |

### 5.4 Typography

| Role | Font | Weight | Size Range |
|------|------|--------|------------|
| **Display / H1** | Cormorant Garamond (Serif) | 400 | clamp(3rem, 8vw, 6rem) |
| **H2–H3** | Cormorant Garamond | 400 | clamp(1.75rem, 3.5vw, 2.5rem) |
| **H4–H6 / Titles** | Plus Jakarta Sans (Sans) | 600 | 1rem–1.25rem |
| **Body** | Plus Jakarta Sans | 400 | 1rem (16px) |
| **Body large** | Plus Jakarta Sans | 400 | 1.125rem (18px) |
| **Captions / Meta** | Plus Jakarta Sans | 400 | 0.875rem (14px) |
| **Labels / Overlines** | Plus Jakarta Sans | 500 | 0.75rem, uppercase, tracked |
| **CTA Buttons** | Plus Jakarta Sans | 600 | 1rem |

Both fonts loaded via `next/font/google` as CSS variables: `--font-serif`, `--font-sans`.

**Typography Rules:**
- All headings: sentence case (never ALL CAPS)
- Max body width: 680px for readability
- Line-height: 1.6 for body, 1.1–1.3 for headings
- No pure black anywhere — use `--color-text-primary` (#191C18)

### 5.5 Spacing and Layout

- 4px base grid
- Section padding: 80–112px vertical on desktop, 40–56px on mobile
- Content max-width: 1280px
- Card border-radius: 24px (`--radius-xl`)
- Button border-radius: 9999px (`--radius-full`, pill shape)
- Whitespace ratio: minimum 40% breathing room on any viewport

### 5.6 Design Philosophy — "The Breathable Interface"

| Principle | Rule |
|-----------|------|
| **No-Line Rule** | Sections separated by background color shifts, not 1px borders |
| **Glass & Gradient Rule** | Floating elements use glassmorphism (backdrop-blur + translucent bg) |
| **Ambient Shadows** | Sage-tinted shadows (`rgba(74, 93, 78, ...)`) — never cold black |
| **Breath-Like Motion** | 300–400ms ease-in-out transitions. Nothing snaps or pops |
| **Tonal Layering** | Depth through surface color stacking, not borders or heavy shadows |

### 5.7 Component Standards

**Buttons:**
- Primary: `--color-sage-700` bg, white text, pill shape, scale 1.02 + shadow on hover
- Secondary: transparent bg, sage border, sage text
- Ghost: text-only, underline animation on hover
- All: 300ms ease-in-out transitions

**Cards:**
- White background, ghost border (`1px solid rgba(197, 200, 190, 0.5)`)
- 24px radius, 24px padding
- Shadow: `0 2px 16px rgba(74, 93, 78, 0.07)`
- Hover: translateY(-2px) + shadow increase

**Inputs:**
- Surface-low background, ghost border, 24px radius
- Focus: bg shifts to `#D9E7CD`, soft glow — no harsh outlines

**Navigation:**
- Transparent on hero, glassmorphism on scroll
- `backdrop-filter: blur(20px)`, 300ms transition

---

## 6. Information Architecture

### 6.1 Site Map

```text
austincliniciancircle.com/
├── /                              Home (Coming Soon variant ships first)
├── /who-we-are                    Mission, Sarah's story, values
├── /what-we-offer                 Membership benefits, pricing, FAQ
├── /find-a-clinician              Public directory with search/filter
│   └── /clinicians/[slug]         Individual clinician profile
├── /join                          Interest form + membership conversion
├── /sign-in                       Email/password login (BetterAuth)
├── /sign-up                       Account creation (post-approval only)
├── /dashboard                     Member dashboard
│   ├── /dashboard/profile         Edit clinician profile
│   ├── /dashboard/resources       Browse/download resources
│   ├── /dashboard/events          View/RSVP to events
│   ├── /dashboard/billing         Stripe Customer Portal
│   └── /dashboard/network         Member directory (internal)
├── /admin                         Admin dashboard
│   ├── /admin/members             Manage members
│   ├── /admin/applications        Review interest forms
│   ├── /admin/resources           Upload/manage resources
│   └── /admin/events              Create/manage events
```

### 6.2 Primary Navigation

```text
Public:   [Logo]  Who We Are   What We Offer   Find a Clinician   [Join the Circle button]
Member:   [Logo]  Dashboard    Resources    Events    Network    Profile    [Billing]
Admin:    [Logo]  Overview     Members      Applications    Resources    Events
```

### 6.3 Footer Structure

```text
Column 1: Brand              Column 2: Explore           Column 3: Connect
Logo                          Who We Are                   Email: sarah@restoredfamily.com
"Deepen your work.            What We Offer                Phone: 512.627.3880
 Find your community."        Find a Clinician             Austin, TX
                               Join the Circle
                               Sign In

(c) 2026 Austin Clinician Circle | A Restored Family Counseling initiative
```

---

## 7. Page-by-Page Specifications

### 7.1 Home / Coming Soon

**URL:** `/`
**Purpose:** Create an immediate emotional connection with prospective members and capture interest before the full site launches.

**Coming Soon Variant (ships first):**
1. Hero — Tagline: "Deepen your work. Find your community." Brief description of ACC. Email capture form. "Launching soon" messaging.
2. Footer — Contact info.

**Full Home Page (post-launch):**
1. **Hero** — Tagline + description. Primary CTA: "Join the Circle." Secondary CTA: "Learn More."
2. **Value Proposition** — Three pillars:
   - Clinical Focus (consultation, CEUs, resource library)
   - Professional Growth (directory, referrals, marketing guidance)
   - Custom Support (coaching, mindfulness, burnout prevention)
3. **About Preview** — Brief intro to Sarah and the mission. Link to Who We Are.
4. **Membership Preview** — Pricing card with key benefits. CTA to Join the Circle.
5. **Footer**

---

### 7.2 Who We Are

**URL:** `/who-we-are`
**Purpose:** Build trust and personal connection. Establish Sarah's credibility and ACC's mission.

**Sections:**
1. **Mission Statement** — "The clinicians who thrive long term aren't just skilled — they're connected."
2. **Sarah's Story** — Founder bio, credentials (LPC-S), connection to Restored Family Counseling. First-person, warm tone.
3. **Values** — Community over isolation, clinical excellence, sustainability, mutual support.
4. **What Makes ACC Different** — Not a peer group. Not a group practice. A full professional home. Virtual-first.
5. **CTA** — "Ready to join?" → Join the Circle.

---

### 7.3 What We Offer

**URL:** `/what-we-offer`
**Purpose:** Detail membership benefits so prospective members can evaluate the value proposition.

**Sections:**
1. **Overview** — "Everything you need to thrive in private practice."
2. **Clinical Focus** — Monthly case consultation (first Thursday, 9–10:30am), CEUs, curated resource library.
3. **Professional Growth** — Clinician directory listing, referral network, marketing and business strategy guidance.
4. **Custom Support** — Discounted coaching with Sarah, mindfulness and burnout prevention resources, Calendly booking embed.
5. **Pricing Card** — Monthly subscription rate, feature list, CTA to join.
6. **FAQ** — Common questions about membership, billing, what's included.

---

### 7.4 Find a Clinician

**URL:** `/find-a-clinician`
**Purpose:** Public-facing directory so clients, colleagues, and referral sources can discover ACC member therapists.

**Sections:**
1. **Search / Filter Bar** — All optional:
   - Specialty (anxiety, trauma, depression, couples, family, etc.)
   - Modality (EMDR, CBT, IFS, somatic, etc.)
   - Client type (individual, couples, family, teen, child)
   - Format (virtual, in-person, both)
   - Insurance accepted
   - Language
   - Location / area served
   - Accepting new clients (yes/no)
2. **Clinician Cards Grid** — Photo, name, credentials, tagline, specialty tags, "View Profile" link.
3. **Individual Clinician Profile** (dynamic route: `/clinicians/[slug]`):
   - Photo, name, credentials
   - Bio / about text (first-person)
   - Specialties, modalities, client types
   - Insurance accepted
   - Contact info or booking link
   - Location / areas served

**Data source:** Member-managed profiles via dashboard. Only active, approved members appear in the directory.

---

### 7.5 Join the Circle

**URL:** `/join`
**Purpose:** Convert prospective members into applicants, then into paying subscribers.

**Sections:**
1. **Membership Benefits** — Condensed recap of What We Offer.
2. **Pricing** — Monthly subscription card with price and feature list.
3. **How It Works** — Steps: Express Interest → Connect with Sarah → Get Approved → Subscribe → Onboarding.
4. **Application / Interest Form** — Fields: name, email, license type, practice name, brief statement of interest.
5. **Reassurance** — "Not sure yet? Reach out to Sarah directly."

**Conversion Flow:**

```text
[Visitor submits interest form]
       |
       v
[APPLICATION created in DB, status: pending]
       |
       v
[Sarah reviews in admin dashboard]
       |
       +-- APPROVED --> [Email sent with Stripe payment link]
       |                       |
       |                       v
       |                 [Visitor completes Stripe Checkout]
       |                       |
       |                       v
       |                 [Webhook fires: checkout.session.completed]
       |                       |
       |                       v
       |                 [USER account created, status: active]
       |                       |
       |                       v
       |                 [Welcome email sent via Resend]
       |                       |
       |                       v
       |                 [Member logs in --> Dashboard]
       |
       +-- REJECTED --> [Polite rejection email sent]
```

---

### 7.6 Sign In

**URL:** `/sign-in`
**Purpose:** Auth gate for members and admin.

- BetterAuth email/password login form
- "Forgot password" link → email reset via Resend
- On success: redirect to `/dashboard` (members) or `/admin` (admin)
- Clean, minimal design. No distractions.

---

### 7.7 Member Dashboard

**URL:** `/dashboard`
**Purpose:** Central hub for subscribed members. Everything a member needs in one place.

**Tabs / Sub-Pages:**

| Tab | URL | Purpose |
|-----|-----|---------|
| **Overview** | `/dashboard` | Welcome message, upcoming events, quick links |
| **Profile** | `/dashboard/profile` | Edit bio, photo, credentials, specialties, modalities, insurance, contact. Populates the public directory |
| **Resources** | `/dashboard/resources` | Browse and download curated resources (PDFs, templates, guides). Organized by category |
| **Events** | `/dashboard/events` | View upcoming events, RSVP, view past recordings |
| **Network** | `/dashboard/network` | Internal member directory (not public) |
| **Billing** | `/dashboard/billing` | View plan, billing history, update payment, cancel. Powered by Stripe Customer Portal |

---

### 7.8 Admin Dashboard

**URL:** `/admin`
**Purpose:** Sarah manages the entire network. No engineering support needed.

**Tabs / Sub-Pages:**

| Tab | URL | Purpose |
|-----|-----|---------|
| **Overview** | `/admin` | Member count, recent applications, subscription stats |
| **Members** | `/admin/members` | View all members, status, approve/reject, deactivate |
| **Applications** | `/admin/applications` | Review interest forms. Approve triggers payment link email |
| **Resources** | `/admin/resources` | Upload, categorize, edit, delete resource files (stored on R2) |
| **Events** | `/admin/events` | Create, edit, delete events. Set date/time, description, Zoom link, capacity |

---

## 8. Technical Architecture

### 8.1 Technology Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Framework** | Next.js 15 (App Router) | SSR/SSG, file-based routing, React Server Components |
| **Language** | TypeScript | Type safety, better DX |
| **Styling** | Tailwind CSS v4 | Utility-first, CSS variables for brand tokens |
| **Fonts** | `next/font/google` | Zero-flash loading, self-hosted (Cormorant Garamond + Plus Jakarta Sans) |
| **Animations** | AOS (scroll-triggered) | Lightweight scroll reveal |
| **Auth** | BetterAuth | Server-side sessions in DB, role-based access |
| **ORM** | Drizzle ORM | Schema-first, TypeScript, lightweight |
| **Database** | PostgreSQL (Railway) | Managed, persistent, scalable |
| **Payments** | Stripe | Checkout, recurring billing, Customer Portal, webhooks |
| **File Storage** | Cloudflare R2 | S3-compatible, cheap, signed URLs for access control |
| **Email** | Resend | Modern email API, transactional messages |
| **Scheduling** | Calendly (embed) | Coaching session booking widget |
| **Hosting** | Vercel | Auto-deploy, preview deployments, edge CDN |
| **Video** | Embedded player (`VideoPlayer.tsx`) | Event recordings (Phase 2) |

### 8.2 Project Structure

```text
app/                                 (Next.js project root)
  app/
    globals.css                      Tailwind imports + CSS custom properties
    layout.tsx                       Root layout (fonts, providers)
    (public)/
      layout.tsx                     Public nav + footer
      page.tsx                       Home / Coming Soon
      who-we-are/page.tsx
      what-we-offer/page.tsx
      find-a-clinician/page.tsx
      join/page.tsx
    (auth)/
      layout.tsx                     Minimal auth layout
      sign-in/page.tsx
      sign-up/page.tsx
    (dashboard)/
      layout.tsx                     Dashboard nav + auth guard
      dashboard/
        page.tsx                     Overview
        profile/page.tsx
        resources/page.tsx
        events/page.tsx
        network/page.tsx
        billing/page.tsx
    (admin)/
      layout.tsx                     Admin nav + admin guard
      admin/
        page.tsx                     Overview
        members/page.tsx
        applications/page.tsx
        resources/page.tsx
        events/page.tsx
    api/
      leads/route.ts                 Interest form submission
      auth/[...betterauth]/route.ts  BetterAuth handlers (TBD)
      stripe/webhook/route.ts        Stripe webhook receiver (TBD)
      upload/route.ts                R2 file upload (TBD)
  components/
    ui/                              Primitives (Button, Card, Input, Badge)
    cards/                           ClinicianCard, PricingCard
    layout/                          PublicNav, DashboardNav, AdminNav, Footer
    AosInit.tsx                      Scroll animation initializer
    CalendlyEmbed.tsx                Calendly booking widget
    VideoPlayer.tsx                  Video playback component
  lib/
    pdf/playbook.tsx                 PDF generation utilities
  prisma/
    schema.prisma                    Database schema
  public/                            Static assets (images, favicon)
```

### 8.3 Rendering Strategy

| Page | Strategy | Rationale |
|------|----------|-----------|
| Home | SSG | Static content, maximum performance |
| Who We Are | SSG | Static content |
| What We Offer | SSG | Static content |
| Find a Clinician | SSR | Dynamic data — active member profiles |
| Clinician Profile | SSR with cache | Dynamic per-member data |
| Join the Circle | SSG + client form | Static page, form is client-side |
| Sign In | SSG + client form | Static shell, auth logic client-side |
| Dashboard (all tabs) | SSR | Authenticated, personalized content |
| Admin (all tabs) | SSR | Authenticated, real-time data |

### 8.4 Deployment Configuration

**Vercel:**
- Auto-deploy from `main` branch
- Preview deployments per pull request
- Environment variables configured in Vercel dashboard

**Railway (PostgreSQL):**
- Managed instance, persistent
- Connection via `DATABASE_URL` env var

**Environment Variables:**

```text
DATABASE_URL                    Railway PostgreSQL connection string
BETTER_AUTH_SECRET               Session encryption key
STRIPE_SECRET_KEY                Stripe API key (server-side)
STRIPE_WEBHOOK_SECRET            Webhook signature verification
RESEND_API_KEY                   Email delivery
R2_ACCESS_KEY_ID                 Cloudflare R2 access
R2_SECRET_ACCESS_KEY             Cloudflare R2 secret
R2_BUCKET_NAME                   Resource storage bucket name
NEXT_PUBLIC_APP_URL              Public app URL (https://austincliniciancircle.com)
```

**Local Development:**
- Docker Compose (`docker-compose.yml` + `Dockerfile.dev`) — app + local Postgres
- `npm run dev` for hot-reload development

---

## 9. Data Model and Contracts

### 9.1 Database Schema

```text
TABLES
------
USER
  - id            uuid, PK
  - email         string, unique
  - name          string
  - role          enum (member, admin)
  - status        enum (active, inactive, pending)
  - created_at    timestamp
  - updated_at    timestamp

CLINICIAN_PROFILE
  - id                uuid, PK
  - user_id           uuid, FK -> USER.id, unique
  - slug              string, unique (URL-safe)
  - display_name      string
  - credentials       string (e.g. "LPC", "LCSW")
  - bio               text
  - photo_url         string
  - accepting_clients boolean
  - created_at        timestamp
  - updated_at        timestamp

SUBSCRIPTION
  - id                      uuid, PK
  - user_id                 uuid, FK -> USER.id, unique
  - stripe_customer_id      string
  - stripe_subscription_id  string
  - status                  enum (active, canceled, past_due, trialing)
  - plan                    string
  - current_period_end      timestamp
  - created_at              timestamp

APPLICATION
  - id              uuid, PK
  - name            string
  - email           string
  - license_type    string
  - practice_name   string (nullable)
  - statement       text (nullable)
  - status          enum (pending, approved, rejected)
  - reviewed_at     timestamp (nullable)
  - created_at      timestamp

EVENT
  - id            uuid, PK
  - title         string
  - description   text
  - event_type    enum (consultation, ceu, workshop, social)
  - start_time    timestamp
  - end_time      timestamp
  - location      string (Zoom link or address)
  - capacity      integer (nullable)
  - created_at    timestamp

EVENT_RSVP
  - id          uuid, PK
  - event_id    uuid, FK -> EVENT.id
  - user_id     uuid, FK -> USER.id
  - status      enum (attending, declined, waitlisted)
  - created_at  timestamp

RESOURCE
  - id          uuid, PK
  - title       string
  - description text (nullable)
  - file_url    string (R2 signed URL or key)
  - file_type   string (pdf, doc, xlsx, etc.)
  - category    string
  - uploaded_by uuid, FK -> USER.id
  - created_at  timestamp

PROFILE_SPECIALTY
  - profile_id  uuid, FK -> CLINICIAN_PROFILE.id
  - specialty   string

PROFILE_MODALITY
  - profile_id  uuid, FK -> CLINICIAN_PROFILE.id
  - modality    string

PROFILE_INSURANCE
  - profile_id  uuid, FK -> CLINICIAN_PROFILE.id
  - insurance   string

LEAD
  - id          uuid, PK
  - email       string
  - source      string (coming-soon, newsletter, etc.)
  - created_at  timestamp
```

### 9.2 Entity Relationships

```text
USER (1) ──────── (0..1) CLINICIAN_PROFILE
USER (1) ──────── (0..1) SUBSCRIPTION
USER (1) ──────── (0..N) APPLICATION
USER (1) ──────── (0..N) EVENT_RSVP
EVENT (1) ─────── (0..N) EVENT_RSVP
CLINICIAN_PROFILE (1) ── (0..N) PROFILE_SPECIALTY
CLINICIAN_PROFILE (1) ── (0..N) PROFILE_MODALITY
CLINICIAN_PROFILE (1) ── (0..N) PROFILE_INSURANCE
```

### 9.3 Stripe Webhook Contracts

| Webhook Event | Action |
|---------------|--------|
| `checkout.session.completed` | Create USER (active) + SUBSCRIPTION (active). Send welcome email |
| `invoice.paid` | Update SUBSCRIPTION.current_period_end. Log payment |
| `invoice.payment_failed` | Update SUBSCRIPTION.status to past_due. Notify admin |
| `customer.subscription.deleted` | Set SUBSCRIPTION.status to canceled. Set USER.status to inactive. Remove from public directory |
| `customer.subscription.updated` | Sync SUBSCRIPTION fields (plan, status, period) |

### 9.4 File Storage Contract (Cloudflare R2)

```text
ADMIN UPLOAD
  [Admin Dashboard] -> POST /api/upload (multipart form)
                          |
                          +-> validate file type + size (max 25MB)
                          +-> PUT to R2 bucket: acc-resources/{category}/{filename}
                          +-> create RESOURCE record in DB
                          +-> return file metadata to admin UI

MEMBER DOWNLOAD
  [Member Dashboard] -> GET /api/resource/:id
                          |
                          +-> verify user is active member
                          +-> generate short-lived signed URL (15 min expiry)
                          +-> redirect or return URL to client
```

---

## 10. Role Permissions Matrix

| Action | Public | Member | Admin |
|--------|--------|--------|-------|
| View home, who we are, what we offer | Yes | Yes | Yes |
| View clinician directory | Yes | Yes | Yes |
| View clinician profile | Yes | Yes | Yes |
| Submit interest form | Yes | Yes | Yes |
| Sign in | No | Yes | Yes |
| View dashboard overview | No | Yes | Yes |
| Edit own clinician profile | No | Yes | Yes |
| Browse / download resources | No | Yes | Yes |
| View / RSVP to events | No | Yes | Yes |
| View internal member network | No | Yes | Yes |
| Manage own billing (Stripe Portal) | No | Yes | Yes |
| View admin dashboard | No | No | Yes |
| Review / approve applications | No | No | Yes |
| Upload / manage resources | No | No | Yes |
| Create / edit / delete events | No | No | Yes |
| View all members + subscriptions | No | No | Yes |
| Deactivate members | No | No | Yes |

**Enforcement:** Next.js middleware blocks `/dashboard/*` for non-members and `/admin/*` for non-admins. API route handlers re-verify role server-side on every request.

---

## 11. Animation and Interaction Design

### 11.1 Animation Philosophy

Motion should feel **organic and calming** — like a slow exhale. Every animation serves one of three purposes: guide attention, provide feedback, or establish premium feel. Nothing should snap, pop, or distract.

### 11.2 Global Animations

| Element | Animation | Trigger | Duration |
|---------|-----------|---------|----------|
| Page sections | Fade up from bottom (20px) | Scroll into viewport | 700ms |
| Staggered cards | Sequential fade-up, 100ms delay between | Scroll into viewport | 500ms each |
| Navigation | Glassmorphism fade-in (blur + bg opacity) | Scroll past hero | 300ms |
| Page load | Content fade-in | Mount | 400ms |

### 11.3 Micro-Interactions

| Element | Interaction | Effect |
|---------|-------------|--------|
| CTA Buttons | Hover | Scale 1.02, shadow elevation, bg darken 5% |
| CTA Buttons | Click | Scale 0.98 (press feedback) |
| Cards | Hover | TranslateY -2px, shadow increase |
| Nav links | Hover | Underline slides in from left |
| Clinician photos | Hover | Slight zoom (1.05) within container |
| Form inputs | Focus | Background shifts to sage tint, soft glow |
| Form submit | Loading | Button morphs to spinner, then success check |

### 11.4 Performance Guidelines

- Use `transform` and `opacity` only (GPU-accelerated)
- Respect `prefers-reduced-motion` — disable non-essential animations
- Intersection Observer for scroll triggers (not scroll event listeners)
- All transitions: 300–400ms `cubic-bezier(0.4, 0, 0.2, 1)`

---

## 12. Mobile Experience

### 12.1 Principles

- Thumb-zone navigation — primary CTAs within easy thumb reach
- Tap targets — minimum 44x44px for all interactive elements
- Sticky "Join the Circle" bar on public pages (mobile only)
- Collapsible content — accordions for FAQ, resource categories
- Touch-optimized form fields with appropriate `inputmode`

### 12.2 Responsive Breakpoints

| Breakpoint | Width | Layout |
|-----------|-------|--------|
| Mobile (base) | 0–639px | Single column, stacked |
| Tablet | 640–1023px | 2-column grids |
| Desktop | 1024–1279px | Full layout |
| Large Desktop | 1280px+ | Max-width contained (1280px) |

### 12.3 Mobile Navigation

- Hamburger menu (right-aligned) with full-screen overlay
- Animated open/close with staggered menu items
- "Join the Circle" button always visible
- Phone tap-to-call in header

---

## 13. Performance and SEO Technical Requirements

### 13.1 Core Web Vitals Targets

| Metric | Target | Strategy |
|--------|--------|----------|
| **LCP** (Largest Contentful Paint) | < 2.5s | Optimized hero image, `priority` loading, Vercel CDN |
| **INP** (Interaction to Next Paint) | < 200ms | Minimal client JS, Server Components by default |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Font preloading via `next/font`, explicit image dimensions |

### 13.2 Performance Optimizations

- **Images:** Next.js Image component with automatic WebP/AVIF, responsive `sizes`, lazy loading (except hero)
- **Fonts:** `next/font/google` — zero-flash, no layout shift
- **JavaScript:** Code-split per route, Server Components reduce client bundle
- **CSS:** Tailwind CSS purging — no unused styles in production
- **Caching:** Vercel edge caching, static pages cached at CDN

### 13.3 SEO Checklist

- Server-rendered public pages (SSR/SSG) for full crawler access
- Next.js Metadata API per page — `title`, `description`, `openGraph`, `twitter`
- Dynamic OG tags on clinician profile pages (`/clinicians/[slug]`)
- Auto-generated `sitemap.xml` for all public pages
- `robots.txt` blocks `/dashboard`, `/admin`
- Semantic HTML — proper heading hierarchy, landmarks
- Alt text on all images
- Canonical URLs on every page
- Clean URL structure (no query parameters)

### 13.4 Meta Tag Templates

**Homepage:**
```text
Title: Austin Clinician Circle | Professional Support for Therapists
Description: A subscription-based virtual support network for licensed therapists in Austin, TX.
             Case consultation, CEUs, referral network, and curated resources.
```

**Clinician Profile:**
```text
Title: [Name], [Credentials] | Austin Clinician Circle
Description: [Name] is a [credentials] specializing in [top 3 specialties].
             [Virtual/In-person] sessions available in Austin, TX.
```

---

## 14. Security and Compliance

### 14.1 Security Architecture

| Layer | Implementation |
|-------|---------------|
| **Transport** | HTTPS enforced by Vercel on all traffic |
| **Authentication** | BetterAuth — server-side sessions stored in PostgreSQL, not JWT |
| **Authorization** | Middleware enforces role-based routing; API handlers re-verify server-side |
| **Payments** | Stripe handles all PCI-sensitive data — no card numbers touch the app |
| **File Access** | R2 resources served via signed URLs only (time-limited, not guessable) |
| **Input Validation** | Zod schemas on all API endpoints at system boundaries |
| **Webhook Integrity** | Stripe webhook signature verification on every inbound event |
| **Secrets** | All secrets in environment variables; none exposed to client bundle |

### 14.2 OWASP Top 10 Coverage

| Threat | Mitigation |
|--------|-----------|
| XSS | Next.js escapes output by default; no `dangerouslySetInnerHTML` without sanitization |
| SQL Injection | Drizzle ORM parameterized queries — no raw SQL |
| Broken Access Control | Middleware + server-side role verification on every protected route and API |
| CSRF | BetterAuth handles CSRF token validation |
| Sensitive Data Exposure | Secrets in env vars only; R2 signed URLs expire; no PII in client bundle |

### 14.3 Data Sensitivity Note

ACC stores licensed clinician professional data (credentials, specialties, practice info). While this is not PHI (Protected Health Information), it is professionally sensitive and requires appropriate access controls and data handling practices.

---

## 15. Launch Plan and Milestones

### Phase 0 — Foundation (Done)

```text
[DONE]  Coming Soon page with email capture
[DONE]  Project scaffold (Next.js + Tailwind + Docker)
```

### Phase 1 — Public Pages

```text
[ACTIVE]  Design system in code (tokens, components)       Apr 24 -> May 01
[TODO]    Home page (full version)                          Apr 26 -> May 03
[TODO]    Who We Are                                        Apr 29 -> May 05
[TODO]    What We Offer                                     May 01 -> May 07
[TODO]    Join the Circle (interest form)                   May 03 -> May 10
```

### Phase 2 — Auth + Payments

```text
[TODO]    BetterAuth setup (login, sessions, roles)         May 06 -> May 12
[TODO]    Stripe integration (checkout, webhooks, portal)   May 08 -> May 15
[TODO]    Application flow (form -> review -> approval)     May 10 -> May 17
[TODO]    Database schema + seed data                       May 12 -> May 18
```

### Phase 3 — Clinician Directory

```text
[TODO]    Find a Clinician (search, filter, grid)           May 15 -> May 22
[TODO]    Individual clinician profiles                     May 19 -> May 24
```

### Phase 4 — Member Dashboard

```text
[TODO]    Dashboard shell + navigation                      May 22 -> May 26
[TODO]    Profile editor                                    May 23 -> May 28
[TODO]    Resource library (browse, download)               May 27 -> Jun 03
[TODO]    Event system (view, RSVP)                         May 29 -> Jun 04
[TODO]    Subscription management (Stripe Portal)           Jun 02 -> Jun 08
```

### Phase 5 — Admin + Launch

```text
[TODO]    Admin dashboard (all tabs)                        Jun 05 -> Jun 12
[TODO]    Testing + polish                                  Jun 10 -> Jun 14
[MILESTONE]  Launch                                         Jun 14
```

---

## 16. MVP Scope vs. Future

### MVP (Phases 0–5)

- [x] Coming Soon page with email capture
- [ ] All 5 public pages (Home, Who We Are, What We Offer, Find a Clinician, Join the Circle)
- [ ] Auth (BetterAuth login, sessions, roles)
- [ ] Member Dashboard (profile, resources, events, network, billing)
- [ ] Admin Dashboard (members, applications, resources, events)
- [ ] Stripe integration (checkout, webhooks, customer portal)
- [ ] Clinician directory with search/filter
- [ ] Resource file storage (Cloudflare R2)
- [ ] Transactional email (approval, welcome, payment link)

### Phase 2 (Post-Launch)

- [ ] Community / discussion feature (type TBD — avoid building the wrong thing)
- [ ] CEU tracking system
- [ ] Event recordings / archive
- [ ] Multiple subscription tiers
- [ ] Email notifications (event reminders, resource alerts, billing warnings)
- [ ] Analytics dashboard for admin (member count, churn, engagement)
- [ ] Blog / content section
- [ ] GitHub Actions CI/CD pipeline
- [ ] Sentry error tracking
- [ ] Playwright E2E tests for critical paths

---

## 17. Success Metrics

| Metric | How Measured | Target |
|--------|-------------|--------|
| Founding members signed up | USER count (active) | 10–15 in month 1 |
| Member retention rate | Monthly churn (canceled / total) | < 10% |
| Directory traffic | Page views on `/find-a-clinician` | 500+ / month |
| Resource engagement | Download count per resource | 50+ / month |
| Event attendance | RSVP attending / total members | 70%+ |
| Application conversion | Approved / total applications | 80%+ |
| Page load time | Vercel Analytics | < 2s |

---

## 18. Assumptions and Risks

| Assumption | Risk if Wrong | Mitigation |
|-----------|---------------|------------|
| Sarah handles member vetting manually | Bottleneck if volume grows past 50 applicants | Build automated screening in Phase 2 |
| One subscription tier is sufficient | Members may want à la carte pricing | Track feature-request signals; add tiers post-launch |
| Community feature can be deferred | Members may expect real-time interaction from day one | Set expectations in onboarding; launch community in Phase 2 |
| Virtual-only is acceptable | Some members may want in-person meetup support | Survey members post-launch; add event location support if needed |
| Content will be provided by Sarah | Prototype copy may need significant revision | Use invitation letter as primary copy source; iterate with Sarah |
| 10–30 members at launch | Architecture must handle growth gracefully | PostgreSQL + Vercel scale to 200+ without changes |

---

## 19. Appendix: Source Material

### A. Sarah's Original Brief

From Sarah Arnold to development team (April 17, 2026):

> "I am creating The Austin Clinician Circle as a support network for therapists. I would like the color scheme to complement the restoredfamily.com site. Again, not an exact copy, but similar vibe."

**Pages requested:** Who We Are, What We Offer, Find a Clinician, Join the Circle, Login.
**Behind login:** Subscription management, resource access, Stripe payments.
**Immediate need:** Coming Soon page.
**Design reference:** shelterwoodcollective.com — structural inspiration, not a copy.

### B. Design References

- **restoredfamily.com** — Brand family, color and tone reference
- **shelterwoodcollective.com** — Structural inspiration for clinician network site
- **Zenith wellness app** — UI language reference for "Breathable Interface" design system

### C. Design System Documents

- `new-design-system.md/design-system.md` — Full unified design system spec (v2.0)
- `new-design-system.md/DESIGN.md` — Design strategy: "The Breathable Interface"

### D. Subscription Pricing Reference

| Source | Monthly Rate |
|--------|-------------|
| Shelterwood Collective benchmark | ~$120/month |
| ACC target range | $99–149/month (TBD by Sarah) |
