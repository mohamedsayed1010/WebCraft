# WebCraft — Design System

The visual identity, specified. Source of truth is `src/styles/tokens.css`; this document explains the reasoning behind it.

---

## 1. The idea

**Urban premium.** A gallery, not a garage.

The reference points are high-end brand studios and print art direction — generous space, confident typography, restrained colour — with a controlled amount of street energy: pixel labels, grain, brush masks, hard edges.

The tension to manage: the brief asks for graffiti accents *and* explicitly rules out childish graffiti. The resolution is that street elements never appear as illustration. They appear as **texture and mask** — a brush shape revealing a brand gradient, a pixel face at 11px marking a section index. The energy is structural rather than decorative, which is why it reads as design rather than as clip art.

---

## 2. Colour

### The four constants

| Token | Value | Role |
|---|---|---|
| `--color-lime-500` | `#B6FF00` | Signal. The one thing that matters in a viewport. |
| `--color-violet-500` | `#6D28FF` | Atmosphere. Glow, gradient, depth. |
| `--color-ink-900` | `#0B0B0B` | The ground. |
| `--color-paper` | `#FFFFFF` | Inversion, contrast. |

### How each behaves

**Lime is a signal, not a colour.** It marks the primary action, the live metric, the hovered card. Its power is entirely proportional to its scarcity — above roughly 5% coverage it stops meaning anything and starts looking like a sports drink. Full ramp exists for borders, glows and hover states; the mid values are not for large fills.

**Violet does the atmospheric work.** Blurred orbs, gradient sweeps, the bloom behind dark sections. Rarely a flat fill. On dark it measures 2.7:1 against the background, so it is **never information** there — decorative only.

**Ink is a value ramp, not a set of greys.** Surfaces separate by lightness, not by borders. A border is what you reach for when value separation has already failed.

**Paper is a rhythm break.** Two or three sections invert to white — Process and Founder are the intended users. Continuous darkness numbs; the switch resets attention exactly where the argument gets serious.

### Contrast — measured, and structurally enforced

| Pair | Ratio | Verdict |
|---|---|---|
| lime-500 on ink-900 | 16.4:1 | AAA — any size |
| white on ink-900 | 19.3:1 | AAA |
| ink-200 on ink-900 | 9.8:1 | AAA — body copy |
| ink-300 on ink-900 | 5.4:1 | AA — captions, meta only |
| ink-900 on lime-500 | 16.4:1 | AAA — the CTA pairing |
| violet-500 on paper | 7.1:1 | AA |
| violet-500 on ink-900 | 2.7:1 | **fail** — decorative only |
| lime-500 on paper | 1.2:1 | **fail** — never text |

These are not guidelines to remember. They are built into the semantic layer:

- `--color-accent-fg` is near-black, so lime buttons are always legible.
- Inside `.paper`, `--color-accent` becomes **violet**, because lime on white is unreadable.

Getting it right is the path of least resistance. That is the only kind of accessibility rule that survives a deadline.

---

## 3. Typography

### Three faces, three jobs

**Archivo — display.** A grotesk with a genuinely heavy black weight and a width axis. At 900 with `-0.045em` tracking it delivers the compressed, poster-like headline the brand needs, without the coldness of a Didone or the novelty of a display face that dates within a year.

**Inter — body.** The audience is business owners who do not read code. Body copy has one job: disappear.

**Silkscreen — pixel.** The signature texture, and the most dangerous font in the stack.

> **The hard rule.** The pixel face never exceeds 14px, and is never a headline, a paragraph or a button label. It marks section indices, eyebrows, tags and metric captions.
>
> This restriction is the entire difference between "pixel-inspired premium branding" and "arcade website". Silkscreen is a *clean* bitmap face — square terminals, even rhythm, no gaming novelty — which is why it survives at label size and collapses at headline size. Break this rule and the brand tips childish in a single screen.

### Scale

Fluid `clamp()` throughout — no breakpoint needed for type to look right.

| Token | Range | Use |
|---|---|---|
| `--text-3xs` / `--text-2xs` | 10 / 11px | Pixel labels only |
| `--text-xs` → `--text-base` | 12 → 16px | UI, captions, body |
| `--text-lg` → `--text-2xl` | 17 → 32px | Lead paragraphs, card titles |
| `--text-3xl` → `--text-5xl` | 30 → 80px | Section headings |
| `--text-6xl` / `--text-7xl` | 52 → 152px | Statement headlines |
| `--text-8xl` | 64 → 208px | Hero mega-type, once per page |

### Tracking and leading

Big type needs negative tracking to feel engineered; tiny pixel type needs positive tracking to stay legible. `--tracking-mega: -0.045em` down to `--tracking-label: 0.16em`. `0.86` leading is for **Latin lockups only** — Archivo can take the tight stacking Arabic cannot. Arabic display sits at `1.2` and body at `1.85`, which is looser than most sites and is the single biggest readability win available in an Arabic layout.

**Every type step declares its own line-height, and it has to.** Tailwind v4 extends its default theme rather than replacing it, so `text-5xl` compiles to `font-size: var(--text-5xl); line-height: var(--tw-leading, var(--text-5xl--line-height))` — and redefining `--text-5xl` in `@theme` leaves Tailwind's Latin default in place. Before the `--text-*--line-height` companions existed, every heading on this site measured 80px/80px: the `line-height` in `@utility display-mega` and the `h1..h4` rule in `base.css` both lose to a utility. In Arabic a ratio of 1.0 runs the tail of ك through the dots of the line beneath it.

An element that wants a specific value still says so — `leading-mega`, `leading-display`, `leading-body`. Those set `--tw-leading`, which the step default reads through, so they win by design rather than by cascade order. **Any Arabic display heading should carry one explicitly.**

---

## 4. Space and layout

`--layout-max: 1440px` · `--gutter: clamp(1.25rem, 4vw, 4rem)` · `--section-py: clamp(5rem, 11vh, 9.5rem)`

Space is the cheapest luxury signal available. The section padding is deliberately larger than feels comfortable in a mockup — at real viewport sizes it is what separates premium from cramped.

**Grid.** 12 columns desktop / 6 tablet / 4 mobile. Sections deliberately break it — asymmetric portfolio spans, offset founder image, full-bleed marquees. A grid that is never broken looks like a template; a grid that is broken without one looks like an accident.

**Radius.** Mostly sharp: 2 / 4 / 8 / 16px, plus a pill reserved for buttons and tags. Sharp corners read as designed; uniformly soft corners read as a component library.

---

## 5. Texture and effects

| Utility | What it does | Why |
|---|---|---|
| `noise` | 4.5% self-generated SVG grain | A flat near-black is a dead near-black. This is the single highest-value detail on the site. |
| `glow-lime` / `glow-violet` | Coloured bloom | Depth without grey drop-shadow, which looks cheap on dark. |
| `orb-violet` / `orb-lime` | Blurred radial atmosphere | Section backgrounds. |
| `grid-lines` | Faint blueprint grid | Reads as "designed on a grid". |
| `mask-brush` | SVG mask over a brand gradient | Street energy, always on-palette. Never a spray-can graphic. |
| `text-gradient-brand` | Lime → violet sweep | **Once per viewport, maximum.** |
| `text-outline` | Stroked display type | Depth without weight; pairs with a solid line in the same headline. |
| `mask-edges-x` | Fades marquee edges | Strips should dissolve, not stop. |

Noise is generated inline as a data URI — no asset, no request.

---

## 6. Motion

### Easings

| Token | Curve | Use |
|---|---|---|
| `--ease-brand` | `cubic-bezier(0.16, 1, 0.3, 1)` | The house easing. ~80% of all motion. |
| `--ease-power` | `cubic-bezier(0.65, 0, 0.35, 1)` | Slides, drawers — anything that returns. |
| `--ease-snap` | `cubic-bezier(0.34, 1.4, 0.64, 1)` | Micro-interactions only. |

### Durations

`instant 120ms` · `fast 240ms` · `base 420ms` · `slow 700ms` · `reveal 1000ms` · `cinematic 1600ms`

### Stagger — where "premium" actually lives

`tight 0.04s` (characters) · `base 0.08s` (grid cards) · `loose 0.14s` (hero, process steps)

Too fast and a grid looks like a glitch; too slow and the user scrolls past the tail. These three values cover every list on the site.

### Travel

`sm 16px` · `base 24px` · `lg 40px` · `display 64px`. Restraint matters: a 24px rise reads as considered, an 80px rise reads as a template.

### The signature moves

1. **Line reveal** — headline lines slide up from beneath their own baseline inside `overflow-hidden` wrappers. The most recognisable premium-agency move, and it costs nothing: transform and opacity only.
2. **Image mask** — a clip-path wipe while the inner image settles from `1.12` → `1`. The counter-movement is what makes it cinematic rather than a rectangle growing.
3. **Magnetic buttons** — spring-follow at `0.28` strength. Above ~0.4 it stops feeling magnetic and starts feeling broken.
4. **Custom cursor** — six states (`default` · `hover` · `view` · `drag` · `text` · `hidden`), spring-tracked, pointer devices only.

### CSS and JS must not drift

`lib/motion/tokens.ts` mirrors the CSS easings and durations exactly. A card whose border animates in CSS and whose transform animates in JS will visibly desync otherwise. Change one, change both.

---

## 7. Section rhythm

Sequence is an argument. Each section answers the question the previous one raised.

| # | Section | Ground | Job |
|---|---|---|---|
| 00 | Hero | dark | Promise + one CTA |
| — | Trust bar | dark | Credibility *before* claims |
| 01 | Services | dark | Design / Build / Grow — echoes the tagline |
| 02 | Portfolio | dark | Proof, asymmetric grid |
| — | Case study | dark | Problem → solution → **sourced results** |
| 03 | Why Us | dark | Falsifiable claims, each with proof |
| 04 | Process | **paper** | Removes fear. Inversion signals "this part is serious" |
| 05 | Testimonials | dark | Other people's voices |
| 06 | Founder | **paper** | A named, accountable human |
| 07 | FAQ | dark | Clears the last objections |
| 08 | Contact | dark | The ask |

Two paper inversions, placed at the two moments the argument turns from *what we make* to *who you are trusting*. That is why they are there and not somewhere prettier.

---

## 8. Component conventions (Phase 2)

- Every component accepts `className` and merges it last via `cn()` — the caller always wins.
- Variants use `cva`. No boolean prop soup.
- Server Components by default. `"use client"` only where interaction genuinely requires it: cursor, menu, form, carousel, reveals.
- Sections are self-contained and read from `@/content`. Pages compose; they do not configure.
- No hard-coded hex value, duration or cubic-bezier in any component. If it is worth using twice, it is a token.
