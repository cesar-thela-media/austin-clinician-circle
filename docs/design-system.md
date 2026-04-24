# Austin Clinician Circle — Unified Design System

> **Version:** 2.0
> **Date:** April 2026
> **Philosophy:** The Breathable Interface — calm, botanical, editorial. A digital sanctuary for licensed therapists.
> **References:** restoredfamily.com (brand family), Zenith wellness app (UI language), DESIGN.md (token spec)

---

## 1. Design Philosophy

### The "Breathable Interface"

ACC is not a productivity app. It is a professional sanctuary. The UI should feel like:

- **Calm + botanical** — sage-tinted surfaces, not warm beige. Nature, not decoration.
- **Editorial, not dashboard-y** — generous whitespace, asymmetric breathing, no crowding.
- **Warm precision** — trusted colleague energy. Professional but never corporate.
- **Ambient depth** — elevation through tonal layering (color shifts), not hard borders.

### The "No-Line" Rule
Sections and regions are **separated by background color shifts**, not 1px borders.
Cards may use ghost borders (≤50% opacity). Hard 1px borders on sections are prohibited.

### The "Glass & Gradient" Rule
Floating nav, overlays, and elevated elements use **glassmorphism**: backdrop-blur + semi-transparent surface color. Never solid opaque backgrounds on floating elements.

### Animation Principle
Transitions are **slow and breath-like**. Use 300–400ms ease-in-out. Nothing should snap or pop. Motion mimics a slow exhale.

---

## 2. Color Tokens

All colors are CSS custom properties defined in `globals.css → @theme inline`.

### Sage Palette (primary brand)

| Token | Value | Usage |
|---|---|---|
| `--color-sage-900` | `#2F3E33` | Hero backgrounds, footer, dark CTA sections |
| `--color-sage-800` | `#3B4D3F` | Dark section variants, hover on dark |
| `--color-sage-700` | `#4A5D4E` | **Primary brand** — buttons, links, icons, headlines in light sections |
| `--color-sage-600` | `#5A7060` | Eyebrow labels, secondary accents, active states |
| `--color-sage-500` | `#6B8572` | Lighter icons, decorative accents |
| `--color-sage-100` | `#E4EBE6` | Light sage tint — avatar backgrounds, soft highlights |
| `--color-sage-50` | `#F3F6F4` | Barely-there sage wash |

### Surface Palette (sage-tinted, not warm-beige)

| Token | Value | Semantic Alias | Usage |
|---|---|---|---|
| `--color-cream-100` | `#F8FAF3` | `--color-surface` | Page base background |
| `--color-cream-200` | `#ECEFE8` | `--color-surface-low` | Section nest, alternating containers |
| `--color-cream-300` | `#DFE3DA` | Ghost borders / dividers | Use at ≤60% opacity for borders |
| `--color-cream-400` | `#C5C8BE` | Outline-variant | Disabled states, subtle dividers |
| — | `#FFFFFF` | `--color-surface-card` | Interactive cards, floating modules |

> **Note:** These surfaces have a botanical sage tint — slightly green-grey, not warm yellow-cream. This matches the Zenith reference palette.

### Accent Colors

| Token | Value | Usage |
|---|---|---|
| `--color-gold` | `#C9A96E` | Premium highlights, serif display accents, stats |
| `--color-terracotta` | `#C07A5A` | Warm CTA accents, stress indicators, callout borders |
| `--color-blush` | `#FED7D2` | **Achievement / reward callouts** — milestones, streak banners, warm announcements |
| `--color-blush-dark` | `#F4B4AE` | Blush icon tint, deeper blush accents |

### Text Colors

| Token | Value | Usage |
|---|---|---|
| `--color-text-primary` | `#191C18` | Headings, body text on light backgrounds |
| `--color-text-secondary` | `#444841` | Subtext, captions, meta info |
| `--color-text-tertiary` | `#75796E` | Placeholders, labels, fine print |
| `--color-text-inverse` | `#FFFFFF` | Text on dark/sage backgrounds |
| `--color-text-inverse-muted` | `rgba(255,255,255,0.65)` | Subtext on dark backgrounds |

### Functional

| Token | Value | Usage |
|---|---|---|
| `--color-success` | `#4A7C59` | Success states, "accepting clients" badges |
| `--color-warning` | `#C4932A` | Warnings, pending states |
| `--color-error` | `#B54B4B` | Errors, destructive actions |
| `--color-info` | `#4A6F8C` | Info badges, informational states |

---

## 3. Typography

### Font Stack

| Role | Font | CSS Var | Fallback |
|---|---|---|---|
| **Display / Headings** | Cormorant Garamond | `var(--font-serif)` | Georgia, Times, serif |
| **Body / UI** | Plus Jakarta Sans | `var(--font-sans)` | Inter, Helvetica, sans-serif |

Both fonts are loaded via `next/font/google` in the root layout.

### Type Scale

| Level | Size | Weight | Line Height | Usage |
|---|---|---|---|---|
| `display-lg` | `clamp(3rem, 8vw, 6rem)` | 400 | 1.05 | Hero headline |
| `display-sm` | `clamp(2rem, 5vw, 3.5rem)` | 400 | 1.1 | Section hero headings |
| `heading-2` | `clamp(1.75rem, 3.5vw, 2.5rem)` | 400 | 1.2 | Section titles |
| `title-md` | `1.25rem / 1rem` | 600 | 1.3 | Card titles, sub-sections |
| `body-lg` | `1.125rem` | 400 | 1.6 | Lead paragraphs |
| `body` | `1rem` | 400 | 1.6 | Default body text |
| `body-sm` | `0.875rem` | 400 | 1.5 | Captions, meta |
| `label` | `0.75rem` | 500 | 1.4 | Overlines, badges — UPPERCASE + tracked |

### Typography Rules
- **All headings**: `var(--font-serif)`, sentence case (never ALL CAPS)
- **Headings in light sections**: use `var(--color-sage-800)` or `var(--color-sage-900)` for maximum legibility
- **Headings in dark sections**: use `#FFFFFF` or `var(--color-gold)` for accent
- **Overlines / section labels**: `0.75rem`, uppercase, `tracking-widest`, `var(--color-sage-600)`
- **Max body width**: `680px` for readability
- **No pure black** anywhere — use `--color-text-primary` (`#191C18`)

---

## 4. Surface Architecture & Layering

Think of the UI as a stack of physical materials:

```
Layer 0 (Base):    --color-surface (#F8FAF3)         → page background
Layer 1 (Nest):    --color-surface-low (#ECEFE8)      → section containers
Layer 2 (Cards):   --color-surface-card (#FFFFFF)     → interactive cards
Layer 3 (Dark):    --color-sage-900 (#2F3E33)         → hero, footer, CTA sections
```

**Separation between layers is achieved by background shift only — not borders.**
Cards may have a ghost border: `1px solid rgba(197, 200, 190, 0.5)`.

---

## 5. Spacing

`4px` base unit.

| Value | Tailwind | Usage |
|---|---|---|
| `4px` | `p-1` | Tight gaps, icon padding |
| `8px` | `p-2` | Small gaps, badge padding |
| `12px` | `p-3` | Input padding, inline spacing |
| `16px` | `p-4` | Card internal padding (min) |
| `24px` | `p-6` | Card padding standard |
| `32px` | `p-8` | Card padding generous |
| `40px` | `p-10` | Section mobile padding |
| `56px` | `py-14` | Section padding medium |
| `80px` | `py-20` | Section padding large |
| `112px` | `py-28` | Section padding full |

---

## 6. Shape & Borders

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | `6px` | Tags, badges |
| `--radius-md` | `10px` | Inputs, small elements |
| `--radius-lg` | `16px` | Standard cards |
| `--radius-xl` | `24px` | **Main content cards**, large containers |
| `--radius-full` | `9999px` | Buttons, pills, avatars |

**Card border standard**: `1px solid rgba(197, 200, 190, 0.5)` — ghost, not solid.
**Focus ring**: `2px solid var(--color-sage-700)` with `2px` offset.

---

## 7. Shadows (Sage-Tinted Ambient)

All shadows use a sage-green tint (`rgba(74, 93, 78, ...)`) — never cold black.

| Token | Value | Usage |
|---|---|---|
| `--shadow-xs` | `0 1px 3px rgba(74,93,78,0.06)` | Barely-lifted inputs |
| `--shadow-sm` | `0 2px 8px rgba(74,93,78,0.07)` | Subtle cards |
| `--shadow-md` | `0 4px 20px rgba(74,93,78,0.09)` | Standard cards (default) |
| `--shadow-lg` | `0 8px 36px rgba(74,93,78,0.11)` | Elevated / hover state |
| `--shadow-xl` | `0 16px 56px rgba(74,93,78,0.13)` | Modals, hero cards |

**Floating elements** (nav, badges): Use glassmorphism — `backdrop-blur(20px)` + translucent background, never solid.

---

## 8. Components

### Buttons

| Variant | Background | Text | Hover |
|---|---|---|---|
| **Primary** | `--color-sage-700` | white | `--color-sage-800` |
| **Secondary** | transparent | `--color-sage-700` | border + bg tint |
| **Ghost** | transparent | `--color-text-primary` | `--color-surface-low` |
| **Inverse** | white | `--color-sage-700` | `--color-surface` |
| **Destructive** | `--color-error` | white | opacity 90% |

Radius: `--radius-full` (9999px) for all buttons.
Transition: 300ms `ease-in-out`.

### Cards

```
Background:     white (#FFFFFF)
Border:         1px solid rgba(197, 200, 190, 0.5)  ← ghost border
Border-radius:  24px (radius-xl)
Padding:        24px (space-6)
Shadow:         0 2px 16px rgba(74, 93, 78, 0.07)
Hover shadow:   0 8px 36px rgba(74, 93, 78, 0.12)
Hover lift:     translateY(-2px) over 300ms
```

### Badges

| Variant | Background | Text |
|---|---|---|
| `default` | `rgba(228, 235, 230, 0.7)` | `--color-sage-700` |
| `success` | `#EAF5EE` | `--color-success` |
| `warning` | `#FDF3E3` | `#C4932A` |
| `error` | `#FAEAEA` | `--color-error` |
| `gold` | `rgba(201,169,110,0.12)` | `--color-gold` |
| `blush` | `--color-blush` | `#755754` |

### Floating Navigation (Public)

```
Base state:      background: transparent
Scrolled state:  background: rgba(248, 250, 243, 0.85)
                 backdrop-filter: blur(20px)
                 border-bottom: 1px solid rgba(223, 227, 218, 0.6)
Transition:      300ms ease-in-out
```

### Inputs

```
Background:     --color-surface-low (#ECEFE8)
Border:         1px solid rgba(197, 200, 190, 0.6)
Border-radius:  --radius-xl (24px) for standalone fields
                --radius-md (10px) for compact fields
Focus:          background shifts to primary-fixed (#D9E7CD), soft border
No harsh outlines — use soft glow or bg shift only
```

---

## 9. Motion

All interactive transitions: **300–400ms** `cubic-bezier(0.4, 0, 0.2, 1)`.

- Navigation: 300ms
- Button hover: 300ms
- Card hover: 400ms (breath-like float)
- Scroll-reveal animations: 700ms with `cubic-bezier(0.16, 1, 0.3, 1)` (spring)
- Floating elements: `animation: float 4s ease-in-out infinite`
- Persistent loops (badges, indicators): `pulseDot 2.2s ease-in-out infinite`

**No pop. No snap. Everything exhales.**

---

## 10. Blush Usage (Warm Reward Callouts)

`--color-blush` (`#FED7D2`) is used for:
- Milestone banners ("founding member", "streak achieved")
- Achievement section backgrounds
- Warm welcome / announcement banners
- "Limited spots" callout sections

Pair with `--color-blush-dark` (`#F4B4AE`) for icons and text emphasis.
Never use blush for error states — it reads as soft/positive.

---

## 11. Do's and Don'ts

| Do | Don't |
|---|---|
| Use color shifts for section separation | Use 1px solid borders between sections |
| Glassmorphism for floating elements | Solid opaque backgrounds on floating UI |
| Sage-tinted shadows | Cold black shadows |
| 300–400ms transitions | Instant snaps (`duration-0`, `duration-100`) |
| `--color-text-primary` (#191C18) | Pure black (#000000) |
| XL radius (24px) on cards | Sharp corners on cards |
| Generous whitespace | Crowded layouts |
| Sentence case headings | ALL CAPS headings |
| Blush for warm achievement moments | Blush for error or warning states |


> **Version:** 1.0 (Draft)
> **Date:** April 20, 2026
> **Direction:** Warm, organic, earthy — complementing restoredfamily.com
> **Reference:** restoredfamily.com (primary), shelterwoodcollective.com (structural inspiration)

---

## 1. Design Philosophy

ACC is a professional network for therapists. The design should feel:
- **Warm and grounded** — not clinical, not corporate
- **Professional but approachable** — like a trusted colleague
- **Clean and modern** — generous whitespace, clear hierarchy
- **Organic** — natural tones, rounded shapes, earthy textures

Sarah wants the site to "complement" restoredfamily.com — same family of aesthetics, not a copy.

---

## 2. Color Palette

### Extracted from restoredfamily.com (reference)

| Token | Hex | RGB | Usage on restoredfamily.com |
|---|---|---|---|
| Deep Sage | `#4A5D4E` | `rgb(74, 93, 78)` | Hero background, CTA sections, accent |
| Soft Cream | `#F2EDE4` | `rgb(242, 237, 228)` | Alternating section backgrounds |
| Warm White | `#FAF8F5` | `rgb(250, 248, 245)` | Main content backgrounds |
| Charcoal | `#2D2D2D` | `rgb(45, 45, 45)` | Primary body text |
| White | `#FFFFFF` | `rgb(255, 255, 255)` | Text on dark, button fill |

### ACC Palette (complementary — same family, distinct identity)

#### Core Colors

| Token | Hex | Usage |
|---|---|---|
| `--color-sage-900` | `#2F3E33` | Primary dark (nav bg, footer, hero overlay) |
| `--color-sage-800` | `#3B4D3F` | Dark sections, hover states |
| `--color-sage-700` | `#4A5D4E` | Primary brand (buttons, links, accents) — matches restoredfamily |
| `--color-sage-600` | `#5A7060` | Secondary accents, active states |
| `--color-sage-500` | `#6B8572` | Lighter accents, icons |
| `--color-sage-100` | `#E8EDE9` | Light sage tint for subtle backgrounds |
| `--color-sage-50` | `#F3F6F4` | Barely-there sage wash |

#### Neutral Warmth

| Token | Hex | Usage |
|---|---|---|
| `--color-cream-100` | `#FAF8F5` | Page background (warm white) |
| `--color-cream-200` | `#F2EDE4` | Section alternating background (soft cream) |
| `--color-cream-300` | `#E8E0D4` | Card borders, dividers |
| `--color-cream-400` | `#D4C9B9` | Subtle borders, disabled states |

#### Text

| Token | Hex | Usage |
|---|---|---|
| `--color-text-primary` | `#2D2D2D` | Headings, body text on light backgrounds |
| `--color-text-secondary` | `#5C5C5C` | Subtext, captions, meta info |
| `--color-text-tertiary` | `#8A8A8A` | Placeholders, disabled text |
| `--color-text-inverse` | `#FFFFFF` | Text on dark/sage backgrounds |
| `--color-text-inverse-muted` | `rgba(255,255,255,0.7)` | Subtext on dark backgrounds |

#### Functional

| Token | Hex | Usage |
|---|---|---|
| `--color-success` | `#4A7C59` | Success states, active badges |
| `--color-warning` | `#C4932A` | Warnings, pending states |
| `--color-error` | `#B54B4B` | Errors, destructive actions |
| `--color-info` | `#4A6F8C` | Info badges, links |

#### Accent (optional — use sparingly)

| Token | Hex | Usage |
|---|---|---|
| `--color-gold` | `#C9A96E` | Premium highlights, membership badge |
| `--color-terracotta` | `#C07A5A` | Warm accent for CTAs or callouts |

---

## 3. Typography

### Font Stack

| Role | Font | Fallback |
|---|---|---|
| **Headings (display/serif)** | `Cormorant Garamond` | `Georgia`, `Times New Roman`, `serif` |
| **Body (sans-serif)** | `Plus Jakarta Sans` | `Inter`, `Segoe UI`, `Helvetica`, `sans-serif` |
| **Mono (code/data)** | `JetBrains Mono` | `Fira Code`, `Consolas`, `monospace` |

Both fonts match restoredfamily.com exactly. Load via Google Fonts.

### Type Scale

| Token | Size | Weight | Line Height | Usage |
|---|---|---|---|---|
| `display-lg` | `56px` / `3.5rem` | 400 | 1.1 | Hero headline |
| `display-sm` | `40px` / `2.5rem` | 400 | 1.2 | Section headlines |
| `heading-1` | `32px` / `2rem` | 600 | 1.3 | Page titles |
| `heading-2` | `24px` / `1.5rem` | 600 | 1.3 | Section titles |
| `heading-3` | `20px` / `1.25rem` | 600 | 1.4 | Card titles, subsection |
| `body-lg` | `18px` / `1.125rem` | 400 | 1.6 | Lead paragraphs |
| `body` | `16px` / `1rem` | 400 | 1.6 | Default body text |
| `body-sm` | `14px` / `0.875rem` | 400 | 1.5 | Captions, meta, labels |
| `caption` | `12px` / `0.75rem` | 500 | 1.4 | Badges, tags, fine print |

### Rules
- Headings always use `Cormorant Garamond` (serif)
- Body text always uses `Plus Jakarta Sans` (sans-serif)
- Max line width: `680px` for body text readability
- Use `font-weight: 400` for most text, `600` for emphasis and headings
- All serif headings are sentence case, not ALL CAPS (warm, not corporate)

---

## 4. Spacing

Use a consistent `4px` base rhythm.

| Token | Value | Usage |
|---|---|---|
| `--space-1` | `4px` | Tight gaps, icon padding |
| `--space-2` | `8px` | Small gaps, tag padding |
| `--space-3` | `12px` | Input padding, inline spacing |
| `--space-4` | `16px` | Card padding, form gaps |
| `--space-5` | `20px` | Group spacing |
| `--space-6` | `24px` | Section internal padding |
| `--space-8` | `32px` | Component gaps |
| `--space-10` | `40px` | Section padding (mobile) |
| `--space-12` | `48px` | Section dividers |
| `--space-16` | `64px` | Section padding (desktop) |
| `--space-20` | `80px` | Large section gaps |
| `--space-24` | `96px` | Hero/footer padding |

---

## 5. Shape & Borders

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | `6px` | Tags, badges, small elements |
| `--radius-md` | `10px` | Inputs, small cards |
| `--radius-lg` | `16px` | Cards, modals |
| `--radius-xl` | `24px` | Large cards, image containers |
| `--radius-full` | `9999px` | Buttons, pills, avatars |

### Borders
- Default border: `1px solid var(--color-cream-300)`
- Subtle divider: `1px solid var(--color-cream-400)`
- Focus ring: `2px solid var(--color-sage-700)` with `2px` offset

---

## 6. Shadows

| Token | Value | Usage |
|---|---|---|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Inputs, small cards |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,0.08)` | Cards, dropdowns |
| `--shadow-lg` | `0 8px 24px rgba(0,0,0,0.10)` | Modals, popovers |
| `--shadow-xl` | `0 16px 48px rgba(0,0,0,0.12)` | Hero cards, featured elements |

Shadows should be warm and soft — never harsh or blue-tinted.

---

## 7. Components

### Buttons

| Variant | Background | Text | Border | Radius |
|---|---|---|---|---|
| **Primary** | `--color-sage-700` | `white` | none | `--radius-full` |
| **Primary Hover** | `--color-sage-800` | `white` | none | `--radius-full` |
| **Secondary** | `transparent` | `--color-sage-700` | `1px solid --color-sage-700` | `--radius-full` |
| **Secondary Hover** | `--color-sage-50` | `--color-sage-800` | `1px solid --color-sage-800` | `--radius-full` |
| **Ghost** | `transparent` | `--color-text-primary` | none | `--radius-full` |
| **Inverse (on dark)** | `white` | `--color-sage-700` | none | `--radius-full` |
| **Destructive** | `--color-error` | `white` | none | `--radius-full` |

**Sizes:**
- `sm`: `h-8`, `px-4`, `text-sm`
- `md`: `h-10`, `px-6`, `text-body`
- `lg`: `h-12`, `px-8`, `text-body-lg`

### Cards

```
Background:     white (#FFFFFF)
Border:         1px solid var(--color-cream-300)
Border-radius:  var(--radius-lg) — 16px
Padding:        var(--space-6) — 24px
Shadow:         var(--shadow-md)
Hover:          var(--shadow-lg), slight translate-y (-2px)
```

### Clinician Profile Card

```
┌──────────────────────────────┐
│  ┌──────┐                    │
│  │ Photo │  Name, Credentials│
│  │ (1:1) │  Tagline / brief  │
│  └──────┘                    │
│                              │
│  [Tag] [Tag] [Tag]           │
│                              │
│  [View Profile →]            │
└──────────────────────────────┘

Photo:       120x120, rounded-full (circle), object-cover
Tags:        bg: --color-sage-50, text: --color-sage-700, radius-sm
CTA link:    text: --color-sage-700, underline on hover
```

### Navigation

```
Desktop:
- Fixed top, transparent on hero → solid (cream-100) on scroll
- Logo left, links center, "Login" + "Join" right
- Links: Plus Jakarta Sans, body-sm, weight 500
- Active link: sage-700 underline

Mobile:
- Hamburger menu → full-screen overlay with sage-900 background
- Links stacked, display-sm size, white text
```

### Form Inputs

```
Background:     white
Border:         1px solid var(--color-cream-400)
Border-radius:  var(--radius-md) — 10px
Padding:        12px 16px
Font:           Plus Jakarta Sans, body
Focus:          border-color: var(--color-sage-700), ring: 2px sage-700/20
Error:          border-color: var(--color-error), helper text in error color
```

### Tags / Badges

```
Background:     var(--color-sage-50)
Text:           var(--color-sage-700)
Font:           caption (12px), weight 500
Padding:        4px 10px
Border-radius:  var(--radius-sm) — 6px
```

### Membership Pricing Card

```
┌──────────────────────────────┐
│        Monthly Plan          │  ← heading-2
│                              │
│     $XX /month               │  ← display-sm, sage-700
│                              │
│  ✓ Case consultation         │
│  ✓ CEU access                │  ← body, check icons in sage-500
│  ✓ Resource library          │
│  ✓ Directory listing         │
│  ✓ Referral network          │
│  ✓ Coaching discount         │
│                              │
│  ┌──────────────────────┐    │
│  │    Join the Circle    │    │  ← Primary button, full-width
│  └──────────────────────┘    │
└──────────────────────────────┘

Border:     2px solid var(--color-sage-700)
Radius:     var(--radius-xl) — 24px
Shadow:     var(--shadow-xl)
```

---

## 8. Layout

### Grid

- Max content width: `1280px`
- Side padding: `24px` (mobile), `48px` (tablet), `80px` (desktop)
- Column grid: 12-column for desktop, collapse to single on mobile
- Gutter: `24px` (mobile), `32px` (desktop)

### Section Pattern

```
hero (sage-900 bg, full-bleed)
  ↓
value props (cream-100 bg)
  ↓
feature detail (cream-200 bg)
  ↓
social proof / directory preview (cream-100 bg)
  ↓
CTA section (sage-700 bg, full-bleed)
  ↓
footer (sage-900 bg, full-bleed)
```

Alternate between `cream-100` and `cream-200` for visual rhythm.
Dark sections (hero, CTA, footer) use the sage palette.

### Responsive Breakpoints

| Token | Value | Description |
|---|---|---|
| `sm` | `640px` | Large phones |
| `md` | `768px` | Tablets |
| `lg` | `1024px` | Small laptops |
| `xl` | `1280px` | Desktops |
| `2xl` | `1536px` | Large screens |

---

## 9. Imagery & Media

- **Photo style:** Warm, natural lighting. Diverse professionals. Candid over posed. No stock-feeling images.
- **Photo treatment:** Slight warm filter, desaturated slightly. Avoid cool/blue tones.
- **Placeholder photos:** Use warm-toned placeholder images for prototype.
- **Icons:** Lucide React — use outline style, `stroke-width: 1.5`, sized at `20px` (inline) or `24px` (standalone).
- **Logo:** TBD — placeholder text logo "Austin Clinician Circle" in Cormorant Garamond, weight 600.

---

## 10. Motion & Animation

Keep motion subtle and purposeful. This is a professional site, not a playful one.

| Interaction | Animation | Duration | Easing |
|---|---|---|---|
| Page transitions | Fade in | `300ms` | `ease-out` |
| Card hover | `translateY(-2px)` + shadow lift | `200ms` | `ease` |
| Button hover | Background color shift | `150ms` | `ease` |
| Nav scroll | Background opacity | `200ms` | `ease` |
| Modal open | Fade + scale from `0.95` | `200ms` | `ease-out` |
| Skeleton loading | Shimmer pulse | `1.5s` | `ease-in-out` |

No bounce, no spring, no parallax. Clean and restrained.

---

## 11. Tailwind CSS Configuration Reference

```js
// tailwind.config.ts — key custom values
{
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#F3F6F4',
          100: '#E8EDE9',
          500: '#6B8572',
          600: '#5A7060',
          700: '#4A5D4E',
          800: '#3B4D3F',
          900: '#2F3E33',
        },
        cream: {
          100: '#FAF8F5',
          200: '#F2EDE4',
          300: '#E8E0D4',
          400: '#D4C9B9',
        },
        gold: '#C9A96E',
        terracotta: '#C07A5A',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        'card': '16px',
        'card-lg': '24px',
      },
      maxWidth: {
        'content': '1280px',
        'prose': '680px',
      },
    },
  },
}
```

---

## 12. Accessibility

- All text meets WCAG 2.1 AA contrast ratios (4.5:1 for body, 3:1 for large text)
- Sage-700 (`#4A5D4E`) on cream-100 (`#FAF8F5`): **contrast ratio ~4.8:1** — passes AA
- White on sage-700: **contrast ratio ~5.2:1** — passes AA
- Charcoal (`#2D2D2D`) on cream-100: **contrast ratio ~12.5:1** — passes AAA
- Focus states must be visible (2px ring)
- All interactive elements must be keyboard-navigable
- Images must have alt text
- Form inputs must have labels
