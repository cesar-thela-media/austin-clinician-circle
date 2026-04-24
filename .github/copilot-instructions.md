# Austin Clinician Circle — Copilot Instructions

## Project

ACC is a subscription-based virtual support network for licensed therapists.
Founded by Sarah Arnold, LPC-S (Restored Family Counseling, Austin TX).
Not a client-facing therapy platform — it serves therapists.

Stack: Next.js App Router, TypeScript, Tailwind CSS v4, BetterAuth, Drizzle ORM, PostgreSQL (Railway), Stripe, Cloudflare R2, Resend, Vercel.

App lives at: `app/` (Next.js project root)
Docs live at: `docs/` — PRD, design system, DESIGN, system-design
Diagrams: `diagrams/*.png` (system diagrams), `diagrams/design-references/` (visual references)

---

## Design System

Always refer to `docs/design-system.md` for the full spec. Summary:

Fonts: Cormorant Garamond (serif, headings) + Plus Jakarta Sans (sans, body)
Loaded via next/font/google as CSS variables: --font-serif, --font-sans

Colors (always use CSS variables, never raw hex):
- --color-sage-900: #2F3E33  (dark hero, footer, deep sections)
- --color-sage-800: #3B4D3F
- --color-sage-700: #4A5D4E  (primary brand, buttons, links)
- --color-sage-600: #5A7060
- --color-sage-500: #6B8572
- --color-sage-100: #E4EBE6
- --color-sage-50:  #F3F6F4
- --color-cream-100: #F8FAF3  (page background)
- --color-cream-200: #ECEFE8  (section alt background)
- --color-cream-300: #DFE3DA  (borders, dividers)
- --color-cream-400: #C5C8BE
- --color-text-primary: #191C18
- --color-text-secondary: #444841
- --color-text-tertiary: #75796E
- --color-text-inverse: #FFFFFF
- --color-error: #B54B4B
- --color-success: #4A7C59
- --color-gold: #C9A96E

Borders: rounded-full for buttons/pills, rounded-2xl for cards
Shadows: soft sage-tinted ambient — shadow-md for cards, shadow-lg for modals

---

## Code Conventions

- Use CSS variables (var(--color-...)) for all colors, never raw hex in JSX
- Tailwind utility classes for layout/spacing, CSS vars for brand colors
- All pages are in app/app/ using Next.js App Router file-based routing
- "use client" only when the component needs useState/useEffect
- No unnecessary comments, no docstrings on unchanged code
- Keep components co-located in the route folder unless shared across 3+ places
- Shared components go in app/components/
- Server components by default; opt into client only when needed

---

## Site Structure

Public (no auth):
- / — Home (Coming Soon now, full marketing page later)
- /who-we-are
- /what-we-offer
- /join
- /find-a-clinician

Auth:
- /sign-in
- /sign-up

Member dashboard (/dashboard):
- /dashboard — overview
- /dashboard/resources
- /dashboard/events
- /dashboard/network
- /dashboard/profile
- /dashboard/billing

Admin (/admin):
- /admin — overview
- /admin/members
- /admin/resources
- /admin/applications
- /admin/events

---

## Tone & Copy

Professional, warm, grounded. Sentence case always — never ALL CAPS headings.
Write for therapists, not for the general public. Assume licensure, clinical vocabulary.
Sarah's tagline: "Deepen your work. Find your community."

---

## Workflow Orchestration

### 1. Plan Mode Default
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity

### 2. Subagent Strategy
- Spin up as many subagents as needed to finish the task — don't hold back
- Use subagents liberally to keep main context window clean
- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute at it via subagents
- One task per subagent for focused execution
- For every feature/code completion, spawn a review subagent to check for bugs
  and edge cases when relevant
- For UI work: use Playwright to scroll, click buttons, take screenshots, and
  fix/retry until the goal is achieved — ONLY trigger Playwright after significant
  UI progress has been made, NOT after every small change (Playwright is
  token-heavy, use it deliberately)

### 3. Self-Improvement Loop
- After ANY correction: update tasks/lessons.md with the pattern
- Write rules for yourself that prevent the same mistake
- Ruthlessly iterate on these lessons until mistake rate drops
- Review lessons at session start for relevant project

### 4. Verification Before Done
- Never mark a task complete without proving it works
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness

### 5. Demand Elegance (Balanced)
- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: implement the elegant solution
- Skip this for simple, obvious fixes — don't over-engineer
- Challenge your own work before presenting it

### 6. Autonomous Bug Fixing
- When given a bug report: just fix it. Don't ask for hand-holding
- Point at logs, errors, failing tests — then resolve them
- Zero context switching required from the user

---

## Task Management
1. Plan First: tasks/todo.md with checkable items
2. Verify Plan: check in before starting implementation
3. Track Progress: mark items complete as you go
4. Explain Changes: high-level summary at each step
5. Document Results: add review section to tasks/todo.md
6. Capture Lessons: update tasks/lessons.md after corrections

---

## Core Principles
- Simplicity First: minimal code impact
- No Laziness: root causes, no temp fixes, senior standards
- Minimal Impact: only touch what's necessary
