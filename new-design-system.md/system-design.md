# Austin Clinician Circle — System Design

> **Version:** 1.1
> **Date:** April 21, 2026
> **Stack:** Next.js, Tailwind CSS, Postgres (Railway), BetterAuth, Stripe, Cloudflare R2, Railway (hosting)

---

> **Diagram images:** All diagrams are saved as PNG files in `notes/diagrams/` for easy sharing via email/docs.

---

## 1. Architecture Overview

![Architecture Overview](../diagrams/01-architecture-overview.png)

<details><summary>Mermaid source (click to expand)</summary>

```mermaid
graph TB
    subgraph Client["Client (Browser)"]
        UI["Next.js App<br/>React + Tailwind"]
    end

    subgraph Railway_App["Railway (App Service)"]
        SSR["Next.js Server<br/>(App Router, SSR/SSG)"]
        API["API Routes<br/>(/api/*)"]
        MW["Middleware<br/>(Auth + Role checks)"]
    end

    subgraph Services["External Services"]
        STRIPE["Stripe<br/>(Payments)"]
        R2["Cloudflare R2<br/>(File Storage)"]
        EMAIL["Email Service<br/>(Resend / SendGrid)"]
    end

    subgraph Database["Railway"]
        PG["PostgreSQL<br/>(Primary Database)"]
    end

    subgraph Auth["Auth"]
        BA["BetterAuth<br/>(Session + Roles)"]
    end

    UI -->|HTTPS| SSR
    UI -->|fetch| API
    SSR --> MW
    MW --> BA
    BA --> PG
    API --> PG
    API --> STRIPE
    API --> R2
    API --> EMAIL
    STRIPE -->|Webhooks| API
```

</details>

---

## 2. Tech Stack Decisions

| Layer | Choice | Why |
|---|---|---|
| **Framework** | Next.js (App Router) | SSR for SEO on public pages, server components, API routes built-in |
| **Styling** | Tailwind CSS | Utility-first, fast iteration, matches design system tokens |
| **Database** | PostgreSQL on Railway | Relational data (users, profiles, subscriptions), Railway is straightforward |
| **ORM** | Drizzle ORM | Type-safe, lightweight, good DX with Postgres |
| **Auth** | BetterAuth | Self-hosted, role-based access, session management |
| **Payments** | Stripe | Industry standard, Checkout + Customer Portal + Webhooks |
| **File Storage** | Cloudflare R2 | S3-compatible, no egress fees, good for PDFs/resources |
| **Email** | Resend (recommended) | Developer-friendly, React Email templates |
| **Deployment** | Railway | Single-platform with Postgres, Docker-native, no vendor split |

---

## 3. Database Schema (ERD)

![Database ERD](../diagrams/02-database-erd.png)

<details><summary>Mermaid source</summary>

```mermaid
erDiagram
    USER ||--o| CLINICIAN_PROFILE : "has"
    USER ||--o| SUBSCRIPTION : "has"
    USER ||--o{ APPLICATION : "submits"
    USER ||--o{ EVENT_RSVP : "registers"

    CLINICIAN_PROFILE ||--o{ PROFILE_SPECIALTY : "has"
    CLINICIAN_PROFILE ||--o{ PROFILE_MODALITY : "has"
    CLINICIAN_PROFILE ||--o{ PROFILE_INSURANCE : "accepts"

    RESOURCE ||--o{ RESOURCE_CATEGORY : "belongs to"
    EVENT ||--o{ EVENT_RSVP : "has"

    USER {
        uuid id PK
        string email UK
        string name
        string role "member | admin"
        string status "pending | active | inactive"
        timestamp created_at
        timestamp updated_at
    }

    CLINICIAN_PROFILE {
        uuid id PK
        uuid user_id FK
        string slug UK
        string display_name
        string credentials "e.g. LPC-S, LMFT"
        text bio
        string photo_url
        string tagline
        string phone
        string email_public
        string website
        string booking_url
        string[] client_types "individual, couples, family, teen"
        string[] formats "virtual, in-person, both"
        string[] languages
        string[] areas_served
        boolean accepting_clients
        boolean is_visible "admin can toggle"
        timestamp created_at
        timestamp updated_at
    }

    PROFILE_SPECIALTY {
        uuid id PK
        uuid profile_id FK
        string name "anxiety, trauma, depression, etc."
    }

    PROFILE_MODALITY {
        uuid id PK
        uuid profile_id FK
        string name "EMDR, CBT, IFS, etc."
    }

    PROFILE_INSURANCE {
        uuid id PK
        uuid profile_id FK
        string name "Aetna, BCBS, Cigna, etc."
    }

    SUBSCRIPTION {
        uuid id PK
        uuid user_id FK
        string stripe_customer_id
        string stripe_subscription_id
        boolean active "true when status is active or trialing"
        string status "active | past_due | canceled | trialing"
        string plan "standard"
        timestamp current_period_start
        timestamp current_period_end
        timestamp cancel_at_period_end "set when member schedules cancellation"
        timestamp canceled_at
        timestamp created_at
    }

    APPLICATION {
        uuid id PK
        uuid user_id FK "nullable — may not have account yet"
        string name
        string email
        string license_type
        text practice_info
        text statement
        string status "pending | approved | rejected"
        text admin_notes
        timestamp created_at
        timestamp reviewed_at
    }

    RESOURCE {
        uuid id PK
        string title
        text description
        string file_url "R2 URL"
        string file_type "pdf | video | link | template"
        string category
        integer sort_order
        boolean is_published
        timestamp created_at
        timestamp updated_at
    }

    RESOURCE_CATEGORY {
        uuid id PK
        string name "Clinical Tools, CEU Materials, Business, etc."
        integer sort_order
    }

    EVENT {
        uuid id PK
        string title
        text description
        string event_type "meeting | ceu | workshop"
        timestamp start_time
        timestamp end_time
        string location "Zoom link, Google Meet, etc."
        integer capacity "nullable — no limit if null"
        boolean is_published
        timestamp created_at
    }

    EVENT_RSVP {
        uuid id PK
        uuid event_id FK
        uuid user_id FK
        string status "registered | attended | canceled"
        timestamp created_at
    }
```

</details>

---

## 4. Application Routes

### Public Routes

| Route | Page | Rendering |
|---|---|---|
| `/` | Home / Coming Soon | SSG (static) |
| `/about` | Who We Are | SSG |
| `/offerings` | What We Offer | SSG |
| `/clinicians` | Find a Clinician (directory) | SSR (dynamic filters) |
| `/clinicians/[slug]` | Clinician Profile | SSR (dynamic) |
| `/join` | Join the Circle | SSG + client-side form |
| `/login` | Login page | Client-side |

### Protected Routes (Member)

| Route | Page | Auth |
|---|---|---|
| `/dashboard` | Member Dashboard (overview) | Member |
| `/dashboard/profile` | Edit My Profile | Member |
| `/dashboard/resources` | Browse Resources | Member |
| `/dashboard/events` | View/RSVP Events | Member |
| `/dashboard/subscription` | Manage Subscription | Member |

### Protected Routes (Admin)

| Route | Page | Auth |
|---|---|---|
| `/admin` | Admin Dashboard | Admin |
| `/admin/members` | Manage Members | Admin |
| `/admin/applications` | Review Applications | Admin |
| `/admin/resources` | Upload/Manage Resources | Admin |
| `/admin/events` | Manage Events | Admin |
| `/admin/subscriptions` | Subscription Overview | Admin |

### API Routes

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/auth/*` | * | BetterAuth handlers |
| `/api/applications` | POST | Submit interest form |
| `/api/applications/[id]` | PATCH | Approve/reject (admin) |
| `/api/clinicians` | GET | Directory search with filters |
| `/api/profile` | GET/PUT | Member profile CRUD |
| `/api/resources` | GET/POST | List/upload resources |
| `/api/resources/[id]` | PUT/DELETE | Edit/delete resource (admin) |
| `/api/events` | GET/POST | List/create events |
| `/api/events/[id]` | PUT/DELETE | Edit/delete event (admin) |
| `/api/events/[id]/rsvp` | POST/DELETE | RSVP/cancel |
| `/api/stripe/checkout` | POST | Create Checkout session |
| `/api/stripe/portal` | POST | Create Customer Portal session |
| `/api/stripe/webhook` | POST | Handle Stripe events |
| `/api/upload` | POST | Upload file to R2 (admin) |

---

## 5. Authentication & Authorization Flow

![Auth Flow](../diagrams/03-auth-flow.png)

<details><summary>Mermaid source</summary>

```mermaid
sequenceDiagram
    actor Visitor
    participant Site as Public Site
    participant Form as Interest Form
    participant Admin as Sarah (Admin)
    participant Email as Email Service
    participant Stripe as Stripe
    participant Auth as BetterAuth
    participant DB as Database

    Visitor->>Site: Browses public pages
    Visitor->>Form: Submits interest form
    Form->>DB: Create APPLICATION (status: pending)
    Form->>Email: Notify admin (new application)
    Admin->>DB: Reviews application
    Admin->>DB: Set status: approved
    DB->>Email: Send approval + payment link to applicant
    Visitor->>Stripe: Completes Checkout
    Stripe->>DB: Webhook: checkout.session.completed
    DB->>Auth: Create user account (role: member)
    DB->>Email: Send welcome email + login instructions
    Visitor->>Auth: Logs in
    Auth->>DB: Verify session + role
    Auth->>Site: Redirect to /dashboard
```

### Role-Based Access

| Role | Access |
|---|---|
| `public` | Home, About, Offerings, Directory, Join, Login |
| `member` | All public + Dashboard, Profile, Resources, Events, Subscription |
| `admin` | All member + Admin panel (members, applications, resources, events, subscriptions) |

### Middleware Logic

```
Request → Next.js Middleware
  ├── /dashboard/* → Check BetterAuth session → role: member or admin → allow
  ├── /admin/*     → Check BetterAuth session → role: admin → allow
  ├── /api/*       → Route-level auth checks
  └── /*           → Allow (public)
```

</details>

---

## 6. Payment Flow (Stripe)

![Stripe Payment Flow](../diagrams/04-stripe-payment-flow.png)

<details><summary>Mermaid source</summary>

```mermaid
sequenceDiagram
    participant Member as Approved Applicant
    participant App as Next.js API
    participant Stripe as Stripe
    participant DB as Database

    Member->>App: Click "Subscribe" (POST /api/stripe/checkout)
    App->>Stripe: Create Checkout Session (subscription mode)
    Stripe-->>Member: Redirect to Stripe Checkout page
    Member->>Stripe: Enters payment info
    Stripe->>App: Webhook: checkout.session.completed
    App->>DB: Create/update SUBSCRIPTION record
    App->>DB: Set USER.status = active

    Note over Stripe,App: Ongoing billing
    Stripe->>App: Webhook: invoice.paid → keep active, active=true
    Stripe->>App: Webhook: invoice.payment_failed → set past_due, active=false
    Stripe->>App: Webhook: customer.subscription.updated → sync cancel_at_period_end
    Stripe->>App: Webhook: customer.subscription.deleted → set canceled, active=false

    Note over Member,Stripe: Cancellation flow
    Member->>App: Click "Cancel membership" (POST /api/stripe/portal)
    App->>Stripe: Create Customer Portal session (cancel_at_period_end)
    Stripe-->>Member: Redirect to portal — member confirms cancellation
    Stripe->>App: Webhook: customer.subscription.updated (cancel_at_period_end=true)
    App->>DB: Set SUBSCRIPTION.cancel_at_period_end, keep active=true until period ends
    Stripe->>App: Webhook: customer.subscription.deleted (at period end)
    App->>DB: Set active=false, status=canceled, USER.status=inactive

    Member->>App: Click "Manage Subscription" (POST /api/stripe/portal)
    App->>Stripe: Create Customer Portal session
    Stripe-->>Member: Redirect to Stripe Customer Portal
```

### Stripe Setup Required

1. **Product**: "Austin Clinician Circle Membership"
2. **Price**: Monthly recurring (amount TBD, mock at $129/mo)
3. **Customer Portal**: Enable subscription management, cancellation, payment update
4. **Webhooks**: Register endpoint `https://<domain>/api/stripe/webhook`
5. **Events to listen for**: `checkout.session.completed`, `invoice.paid`, `invoice.payment_failed`, `customer.subscription.deleted`, `customer.subscription.updated`
6. **Customer Portal**: Enable cancellation (schedule at period end, not immediate), payment method update, and invoice history

</details>

---

## 7. File Storage (Cloudflare R2)

![File Storage Flow](../diagrams/05-file-storage-flow.png)

<details><summary>Mermaid source</summary>

```mermaid
graph LR
    Admin["Admin Dashboard"]
    API["Next.js API<br/>(/api/upload)"]
    R2["Cloudflare R2<br/>(Bucket: acc-resources)"]
    Member["Member Dashboard"]

    Admin -->|Upload file| API
    API -->|PUT object| R2
    R2 -->|Signed URL or public URL| API
    API -->|Return URL| Admin
    Member -->|Request resource| API
    API -->|Generate signed URL| R2
    R2 -->|File delivery| Member
```

### Structure

```
acc-resources/
├── profiles/
│   └── {user_id}/photo.jpg          ← Clinician profile photos
├── resources/
│   ├── clinical-tools/
│   │   └── {filename}.pdf           ← Uploaded resources
│   ├── ceu-materials/
│   │   └── {filename}.pdf
│   └── business/
│       └── {filename}.pdf
```

### Access Control
- **Profile photos**: Public read (used on public directory)
- **Resources**: Signed URLs with expiry (members only)
- Admin uploads via dashboard → API route → R2 SDK

</details>

---

## 8. Directory Search Architecture

```mermaid
graph TB
    Browser["Browser"]
    Route["GET /api/clinicians"]
    DB["PostgreSQL"]
    Cache["Vercel ISR Cache"]

    Browser -->|"?specialty=trauma<br/>&modality=EMDR<br/>&format=virtual"| Route
    Route -->|SQL query with filters| DB
    DB -->|Results| Route
    Route -->|JSON| Browser
    Route -.->|Cache public results| Railway_Cache
```

### Query Design

Filters are applied as `WHERE` clauses with `AND` logic. All optional.

```sql
SELECT p.*, u.name, u.email
FROM clinician_profile p
JOIN user u ON p.user_id = u.id
WHERE p.is_visible = true
  AND u.status = 'active'
  AND (p.specialties @> ARRAY['trauma'] OR :specialty IS NULL)
  AND (p.modalities @> ARRAY['EMDR'] OR :modality IS NULL)
  AND (p.formats @> ARRAY['virtual'] OR :format IS NULL)
  AND (p.accepting_clients = true OR :accepting IS NULL)
  -- ... more filters
ORDER BY p.display_name ASC
```

For MVP, full-text search is not needed. Simple filter dropdowns with Postgres array contains (`@>`) is sufficient. Can add full-text search (pg_trgm or Postgres FTS) in Phase 2 if directory grows.

---

## 9. Project Structure

```
acc/
├── src/
│   ├── app/
│   │   ├── layout.tsx                    ← Root layout (fonts, metadata)
│   │   ├── page.tsx                      ← Home / Coming Soon
│   │   ├── about/page.tsx                ← Who We Are
│   │   ├── offerings/page.tsx            ← What We Offer
│   │   ├── clinicians/
│   │   │   ├── page.tsx                  ← Directory (search + filter)
│   │   │   └── [slug]/page.tsx           ← Individual profile
│   │   ├── join/page.tsx                 ← Join the Circle
│   │   ├── login/page.tsx                ← Login
│   │   ├── dashboard/
│   │   │   ├── layout.tsx                ← Dashboard shell (sidebar nav)
│   │   │   ├── page.tsx                  ← Overview
│   │   │   ├── profile/page.tsx          ← Edit profile
│   │   │   ├── resources/page.tsx        ← Browse resources
│   │   │   ├── events/page.tsx           ← Events + RSVP
│   │   │   └── subscription/page.tsx     ← Manage subscription
│   │   ├── admin/
│   │   │   ├── layout.tsx                ← Admin shell
│   │   │   ├── page.tsx                  ← Admin overview
│   │   │   ├── members/page.tsx
│   │   │   ├── applications/page.tsx
│   │   │   ├── resources/page.tsx
│   │   │   ├── events/page.tsx
│   │   │   └── subscriptions/page.tsx
│   │   └── api/
│   │       ├── auth/[...all]/route.ts    ← BetterAuth catch-all
│   │       ├── applications/route.ts
│   │       ├── clinicians/route.ts
│   │       ├── profile/route.ts
│   │       ├── resources/route.ts
│   │       ├── events/route.ts
│   │       ├── upload/route.ts
│   │       └── stripe/
│   │           ├── checkout/route.ts
│   │           ├── portal/route.ts
│   │           └── webhook/route.ts
│   ├── components/
│   │   ├── ui/                           ← Reusable primitives (Button, Card, Input, etc.)
│   │   ├── layout/                       ← Nav, Footer, Sidebar, DashboardShell
│   │   ├── clinicians/                   ← ClinicianCard, ClinicianFilters, ProfileForm
│   │   ├── resources/                    ← ResourceCard, ResourceList
│   │   ├── events/                       ← EventCard, EventList, RSVPButton
│   │   └── forms/                        ← ApplicationForm, LoginForm
│   ├── lib/
│   │   ├── auth.ts                       ← BetterAuth config
│   │   ├── db.ts                         ← Drizzle client
│   │   ├── stripe.ts                     ← Stripe client + helpers
│   │   ├── r2.ts                         ← Cloudflare R2 client
│   │   ├── email.ts                      ← Email sending
│   │   └── utils.ts                      ← cn(), formatDate, etc.
│   ├── db/
│   │   ├── schema.ts                     ← Drizzle schema (all tables)
│   │   └── migrations/                   ← Generated migration files
│   └── types/
│       └── index.ts                      ← Shared TypeScript types
├── public/
│   └── images/                           ← Static assets
├── drizzle.config.ts
├── next.config.ts
├── tailwind.config.ts
├── package.json
├── tsconfig.json
└── .env.local                            ← Environment variables (not committed)
```

---

## 10. Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:pass@host:5432/acc

# BetterAuth
BETTER_AUTH_SECRET=<random-secret>
BETTER_AUTH_URL=https://austincliniciancircle.com

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID=price_...

# Cloudflare R2
R2_ACCOUNT_ID=<cloudflare-account-id>
R2_ACCESS_KEY_ID=<r2-access-key>
R2_SECRET_ACCESS_KEY=<r2-secret-key>
R2_BUCKET_NAME=acc-resources
R2_PUBLIC_URL=https://resources.austincliniciancircle.com

# Email (Resend)
RESEND_API_KEY=re_...
EMAIL_FROM=hello@austincliniciancircle.com

# App
NEXT_PUBLIC_APP_URL=https://austincliniciancircle.com
```

---

## 11. Deployment Pipeline

```mermaid
graph LR
    Dev["Local Dev<br/>(next dev)"]
    Git["Git Push<br/>(main branch)"]
    Vercel["Vercel<br/>(Auto-deploy)"]
    Preview["Preview Deploy<br/>(PR branches)"]
    Prod["Production<br/>(main → vercel.app)"]

    Dev -->|git push| Git
    Git -->|PR branch| Preview
    Git -->|merge to main| Vercel
    Vercel --> Prod
```

### Infrastructure Setup Checklist

| Service | What You Need | Who Provides It |
|---|---|---|
| **Railway** | Postgres database URL | Request team invite or project access from founder |
| **Stripe** | API keys (publishable + secret), webhook secret | Sarah's Stripe account — request API access |
| **Cloudflare R2** | Account ID, access key, secret key, bucket | Request from founder or create under company Cloudflare account |
| **Vercel** | Team/project access, domain connection | Request team invite from founder |
| **Resend/Email** | API key, verified sending domain | Set up under project, needs DNS verification |
| **Domain** | DNS access to point domain to Vercel | Founder buys domain, gives you DNS access |

---

## 12. Phased Delivery Plan

![Development Timeline](../diagrams/08-development-timeline.png)

<details><summary>Mermaid source</summary>

```mermaid
gantt
    title ACC Development Phases
    dateFormat  YYYY-MM-DD
    axisFormat  %b %d

    section Phase 0
    Coming Soon Page          :p0, 2026-04-21, 3d
    Stripe Account Setup      :p0s, 2026-04-21, 2d

    section Phase 1 - Public
    Project Scaffold          :p1a, after p0, 2d
    Design System in Code     :p1b, after p1a, 3d
    Home Page                 :p1c, after p1b, 3d
    Who We Are                :p1d, after p1c, 2d
    What We Offer             :p1e, after p1d, 2d
    Join the Circle           :p1f, after p1e, 3d

    section Phase 2 - Auth & Payments
    BetterAuth Setup          :p2a, after p1f, 2d
    Stripe Integration        :p2b, after p2a, 3d
    Application Flow          :p2c, after p2b, 2d

    section Phase 3 - Directory
    DB Schema + Seed          :p3a, after p2c, 2d
    Clinician Directory       :p3b, after p3a, 4d
    Profile Pages             :p3c, after p3b, 2d

    section Phase 4 - Dashboard
    Member Dashboard Shell    :p4a, after p3c, 2d
    Profile Editor            :p4b, after p4a, 3d
    Resource Library          :p4c, after p4b, 3d
    Event System              :p4d, after p4c, 3d
    Subscription Management   :p4e, after p4d, 2d

    section Phase 5 - Admin
    Admin Dashboard           :p5a, after p4e, 5d
    Testing + Polish          :p5b, after p5a, 5d
    Launch                    :milestone, after p5b, 0d
```

</details>

---

## 13. Security Considerations

| Concern | Mitigation |
|---|---|
| **Auth bypass** | BetterAuth middleware on all protected routes + API routes |
| **CSRF** | BetterAuth includes CSRF protection by default |
| **Stripe webhook spoofing** | Verify webhook signatures with `stripe.webhooks.constructEvent()` |
| **File upload abuse** | Validate file type + size server-side before R2 upload. Max 10MB. |
| **SQL injection** | Drizzle ORM parameterized queries — no raw SQL interpolation |
| **XSS** | React auto-escapes. Sanitize user-generated bio content. |
| **Rate limiting** | Rate limit login attempts and API endpoints (Vercel middleware or upstash/ratelimit) |
| **Env secrets** | Never expose server-side keys. Use `NEXT_PUBLIC_` prefix only for publishable keys. |
| **Role escalation** | Server-side role checks on every admin endpoint — never trust client. |

---

## 14. Developer Verdict — Big Picture

### What This Project Is

You're building a **SaaS-lite membership platform** — not a full SaaS, but it has all the bones:
- Auth + role-based access
- Subscription billing (Stripe)
- User-generated content (profiles)
- Admin content management (resources, events)
- Public directory with search

Think of it as a **niche professional network** — a small-scale LinkedIn for Austin therapists, combined with a gated resource library and event system.

### What You're Actually Building (as a developer)

1. **A marketing site** (5 static/SSR pages) — the public face
2. **A member portal** (profile editor, resources, events, billing) — the product
3. **An admin panel** (CRUD for members, resources, events, applications) — the ops tool
4. **An API layer** (Stripe webhooks, file uploads, directory search) — the glue
5. **A database** (users, profiles, subscriptions, resources, events) — the backbone

### End Goals

| Goal | What It Means for You |
|---|---|
| **Coming Soon page live** | Ship a single static page with email capture. Unblocks Sarah's outreach. |
| **MVP launch** | All 8 pages functional. Members can sign up, manage profile, access resources, RSVP to events. Sarah can manage everything from admin. |
| **Ongoing maintenance** | Low-maintenance after launch. Sarah manages content. You maintain infrastructure and handle feature requests. |
| **Potential growth** | If ACC grows, you may add: community features, CEU tracking, multiple tiers, automated onboarding, mobile app. But that's Phase 2+. |

### Complexity Assessment

| Area | Difficulty | Notes |
|---|---|---|
| Public marketing pages | Low | Static content, design work |
| Auth (BetterAuth) | Medium | Setup + role-based middleware |
| Stripe integration | Medium-High | Webhooks, edge cases (failed payments, cancellations) |
| Clinician directory | Medium | Filtering, profile management, search |
| Resource library | Low-Medium | File upload to R2, list/download |
| Event system | Low-Medium | CRUD + RSVP, simple calendar |
| Admin dashboard | Medium | Multiple CRUD views, but straightforward |

### What to Request from Your Founder Today

Send this to your founder/boss to unblock development:

> **To get started on the ACC project, I need:**
> 1. **Railway** — Team invite or a new Postgres database provisioned (I need the `DATABASE_URL`)
> 2. **Stripe** — API keys from Sarah's Stripe account (publishable key, secret key). I'll set up the webhook myself.
> 3. **Cloudflare R2** — Access to create a bucket under the company Cloudflare account (or credentials if one exists)
> 4. **Vercel** — Team invite or a new project created for this
> 5. **Domain** — Has Sarah purchased a domain for ACC? I need DNS access to point it to Vercel.
> 6. **Email sending** — Should I set up Resend under the company account, or is there an existing email service?
