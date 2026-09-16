# WebCraft — Architecture

**Phase 1 deliverable.** Structure, systems and decisions. No UI.

---

## 1. The strategic premise

Everything below follows from one sentence in the brief: *we sell results, not technology*, to *people who know nothing about programming*.

That has architectural consequences, not just copywriting ones:

| Premise | Architectural consequence |
|---|---|
| The audience cannot evaluate our technical claims | Credibility must come from **proof** — sourced metrics, named clients, verifiable badges. The content model makes `source` a required field on every metric. |
| They are comparing us to three other agencies | The site must load instantly. Static-first rendering, no client-side data fetching on the critical path. |
| They arrive from a Google search for *"web designer for dental clinic"* | Ten real service pages, not a homepage grid with anchor links. |
| They have probably been burned before | The Process and FAQ sections are risk-removal instruments, and are modelled with `deliverables` and `duration` as required fields. |

---

## 2. Rendering strategy

Static-first. Every page is generated at build time.

```
/                        static
/services                static
/services/[slug]         generateStaticParams — 10 pages
/work                    static
/work/[slug]             generateStaticParams — case studies only
/about                   static
/contact                 static
/legal/[slug]            static
/api/contact             the only server surface
```

There is no database, no client-side fetch on first paint, no loading spinner anywhere on the critical path. Perceived speed is a brand attribute here — a slow agency site refutes its own pitch.

**Route groups.** Public pages live in `(marketing)`, which owns the header, footer and page transitions. The group exists so a future bare landing-page group (ads traffic, no navigation, no exits) or a client portal can opt out of that chrome entirely without restructuring.

---

## 3. Directory structure

```
src/
├── app/
│   ├── layout.tsx              document shell, fonts, metadata defaults, providers
│   ├── globals.css             stylesheet entry — imports only
│   ├── sitemap.ts              derived from the content layer
│   ├── robots.ts               blocks indexing on non-production origins
│   ├── opengraph-image.tsx     ── phase 2
│   │
│   ├── (marketing)/
│   │   ├── layout.tsx          skip link · header · transitions · footer
│   │   ├── page.tsx            homepage — composes sections
│   │   ├── services/
│   │   │   ├── page.tsx        index
│   │   │   └── [slug]/         10 SEO landing pages
│   │   ├── work/
│   │   │   ├── page.tsx        filterable portfolio
│   │   │   └── [slug]/         case study + generated OG image
│   │   ├── about/              founder
│   │   ├── contact/
│   │   └── legal/[slug]/
│   │
│   └── api/contact/route.ts    zod → rate limit → honeypot → Resend
│
├── components/
│   ├── ui/                     shadcn/ui primitives — vendored, lint-ignored
│   ├── primitives/             brand atoms (see §6)
│   ├── motion/                 animation building blocks (see §7)
│   ├── layout/                 header, footer, nav, container, cursor
│   ├── sections/               one folder per page section
│   ├── work/                   case-study-specific blocks
│   ├── forms/                  contact form + fields
│   └── seo/                    <JsonLd />
│
├── content/                    ← all site content, typed. Single import point.
├── config/                     site facts, fonts, navigation, feature flags
├── lib/
│   ├── motion/                 easings, durations, shared variants
│   ├── seo/                    metadata builder, JSON-LD builders
│   ├── validations/            zod schemas, shared client + server
│   ├── server/                 email, rate limiting — server-only
│   └── utils.ts
├── hooks/
├── providers/                  smooth scroll, cursor, motion config
├── styles/                     tokens · base · utilities
└── types/                      the content contract
```

**The one rule that keeps this from rotting:** dependencies point inward. `components` may import from `content`, `lib`, `config` and `types`. Nothing in `content`, `lib` or `types` may import from `components`. Content never knows how it is rendered.

---

## 4. The content layer

`src/content/*` holds every word and image reference on the site, typed against `src/types/content.ts`.

This is the highest-leverage decision in the build. It means:

- Adding a project or service is a data edit — no component is touched.
- `tsc` catches a missing `alt` or an unsourced metric at build time.
- Moving to a CMS later is one adapter that returns these same shapes. Zero component changes.

**Current state.** `services`, `process`, `differentiators` and `faqs` are written and launch-ready. `projects`, `testimonials`, `clientLogos` and `founder` are **empty, by design** — see §10.

### Two content rules encoded in the types

1. **`ResultMetric.source` is required.** A performance number without a traceable source cannot be added. Invented statistics are the fastest way to lose a serious lead and, in most markets, unlawful advertising.
2. **`ImageAsset.width`/`height` are required.** Without them Next.js cannot reserve space and every image becomes layout shift. CLS is the cheapest way to make an expensive site feel cheap.

---

## 5. Design system

Full specification in [`DESIGN-SYSTEM.md`](./DESIGN-SYSTEM.md). The load-bearing decisions:

**Dark-first, not dark-mode.** `#0B0B0B` is the ground the brand stands on. A handful of sections invert to white via a `.paper` class that re-points six semantic tokens — every descendant adapts with no conditional styling.

**Lime is a signal, not a colour.** It marks the single most important thing in a viewport. If more than roughly 5% of a screen is lime, the design is wrong.

**Contrast is enforced by the token names.** `--color-accent-fg` is near-black, so a lime button is always legible. Inside `.paper`, `--color-accent` becomes violet, because lime on white measures 1.2:1 and fails at any size. The system makes the accessible choice the default one.

**Three fonts, three jobs.** Archivo (display) · Inter (body) · Silkscreen (pixel). The pixel face is capped at 11px and restricted to labels — that single restriction is the line between "premium graphic design" and "arcade theme", which is exactly the line the brief drew.

---

## 6. Component inventory — Phase 2

### `primitives/` — brand atoms

| Component | Purpose |
|---|---|
| `NoiseOverlay` | Self-generated SVG grain. Flat near-black is dead near-black. |
| `GlowOrb` | Blurred violet/lime radial. Atmosphere behind dark sections. |
| `GridLines` | Faint blueprint grid. Reads as "designed on a grid". |
| `BrushStroke` | SVG mask over a brand gradient — graffiti energy, always on-palette. |
| `PixelLabel` | The controlled dose of pixel type. Enforces the 11px cap. |
| `SectionHeader` | Index + eyebrow + headline. Every section uses it; the rhythm is the brand. |
| `Marquee` | Edge-masked infinite strip. Tagline, logos, service list. |
| `Badge` / `Tag` | Service chips, industry filters, tech tags. |
| `Counter` | Count-up on scroll for the stats strip. |

### `motion/` — animation building blocks

`TextReveal` · `SplitText` · `ImageReveal` · `Reveal` · `Stagger` · `Parallax` · `Magnetic` · `ScrollProgress` · `PageTransition` · `Preloader`

### `layout/`

`SiteHeader` · `MegaMenu` · `MobileNav` · `SiteFooter` · `Container` · `Section` · `CustomCursor` · `SmoothScroll`

### `sections/` — one folder per section

`hero` · `portfolio` · `capabilities` · `services` · `why-us` · `process` · `concept-lab` · `founder` · `faq` · `contact`

That is also the homepage's render order, and it is load-bearing: it must match `sectionAnchors` in `config/navigation.ts` and the indices in `content/copy.ts`, or the header's scroll-spy highlights the wrong item.

`testimonials` still exists as a component but is composed into nothing — there are no verified quotes, and an empty social-proof block tells a visitor nobody has hired us. `trust`, `case-studies` and `cta` are empty folders from the original scaffold; their jobs are done by the hero's stats strip, `/work/[slug]`, and the contact section respectively.

### `graphics/` — interfaces drawn in code

`ui-fragments` (the atoms) · `concept-screens` (twenty-four assembled screens plus the registry) · `hero-fragments`.

Three sections need to show what a digital product looks like — the hero, Capabilities, and the Concept Lab — and none of them may use a screenshot, because we have no client work in those categories and borrowing someone else's would be a lie. So the interfaces are drawn: CSS and inline SVG, no text anywhere in them, every one `aria-hidden`, all server-rendered.

**The server/client contract matters here.** Every drawing is rendered by a server component and handed to its interactive wrapper as a React node. `CapabilityExplorer` and `ConceptSwitcher` hold the state; the graphics library never reaches the browser. Import the drawings directly into a client component and the whole folder ships with it.

### `ui/` — shadcn primitives to add

`button` · `accordion` (FAQ) · `dialog` (project lightbox) · `input` · `textarea` · `select` · `checkbox` · `label` · `form` · `tabs` · `sonner`

Added via `npx shadcn@latest add <name>`. `components.json` is configured. These are **vendored, then restyled** to brand tokens — they are a starting point, not the finished look, and they are lint-ignored because they are not our code.

---

## 7. Motion architecture

Motion is a system, not a collection of animations. The vocabulary is fixed in `types/motion.ts`: `fade` · `rise` · `mask` · `split` · `scale` · `draw`. Every entrance on the site is one of those six.

**One source of numbers.** `lib/motion/tokens.ts` mirrors the `--ease-*` and `--duration-*` values in `styles/tokens.css` exactly. Without this, a card whose border animates in CSS and whose transform animates in JS visibly desyncs.

**Springs for input, tweens for choreography.** Anything following the pointer (cursor, magnetic buttons) uses a spring. Anything on a timeline (reveals, transitions) uses a tween with the house easing.

**Reveals fire once.** `once: true` is the default. Content that re-animates every time it scrolls past is the hallmark of an amateur build.

### Reduced motion

Handled in exactly two places, not per-component:

1. `<MotionConfig reducedMotion="user">` at the root — strips transform and layout animation from every Framer Motion component, preserves opacity.
2. The `@media (prefers-reduced-motion: reduce)` block in `styles/base.css` — collapses CSS transitions, hides the custom cursor, and hands scrolling back to the browser.

Under reduced motion: Lenis is disabled, the preloader is skipped, parallax and marquees stop, the cursor is hidden. Fades survive. The site remains fully usable and still looks composed — which is the actual test.

---

## 8. SEO architecture

- **Metadata** — every route builds through `buildMetadata()`. Canonicals are never optional, because service and case-study pages are reachable by several internal paths and would otherwise generate duplicate-content signals.
- **Structured data** — `ProfessionalService`, `WebSite`, `Service` (×10), `Article` (case studies), `FAQPage`, `Person` (founder), `BreadcrumbList`.
- **Sitemap** — derived from the content layer, so it cannot drift.
- **robots** — auto-blocks any non-production origin. A preview deployment indexed alongside production competes with it directly.
- **OG images** — generated per route via `ImageResponse`.

**Integrity constraint:** structured data must describe what is visibly on the page. Marking up reviews that are not displayed, or ratings never collected, is a manual-action offence that can remove the whole domain from search results. Rating schema is therefore never generated from placeholder testimonials.

---

## 9. Accessibility

Not a compliance afterthought — enterprise and public-sector procurement asks for it, so it is also a commercial requirement.

- Contrast pairs measured and documented in `styles/tokens.css`; failing pairs are structurally prevented by the semantic layer.
- Focus is visible everywhere, lime at 16.4:1, never removed.
- Semantic landmarks, skip link, logical heading order.
- Accordion, dialog and menu behaviour comes from Radix via shadcn — keyboard and ARIA handled by primitives rather than reimplemented.
- Every `ImageAsset.alt` is required; decorative images pass `""` explicitly, which is a decision rather than an omission.
- Reduced motion fully honoured (§7).

Target: **WCAG 2.2 AA**.

---

## 10. Why four content files are empty

`projects`, `testimonials`, `clientLogos` and `founder` ship empty, and every consumer is written to render nothing when they are.

This is a deliberate call, and worth stating plainly because it is the one place this delivery looks incomplete:

Placeholder case studies are the most damaging possible content on an agency site. The metrics are precisely what a serious prospect scrutinises; invented client names carry legal exposure; and *"Lorem Ipsum Dental — +240% revenue"* destroys the credibility every other section is built to establish. The same applies to a logo wall of companies you have not worked with and a founder block with an empty portrait frame.

So the architecture treats missing proof as a **state to handle**, not a gap to paper over. `isFounderContentReady`, `publishedStats` and the feature flags in `config/site.ts` all exist for this. Turn a flag off and the section disappears cleanly.

Three strong case studies convert better than nine thin ones. If only two are ready, ship two.

---

## 11. Phase plan

| Phase | Scope | Status |
|---|---|---|
| **1** | Architecture, design tokens, content model, motion system, SEO layer | **complete** |
| **2** | Design system in code: primitives, motion components, layout chrome | next |
| **3** | Sections — hero, services, portfolio, process, founder, FAQ, contact | |
| **4** | Routes — service pages, case studies, about, contact, legal | |
| **5** | Real content, images, OG generation, form wiring | blocked on client data |
| **6** | Lighthouse, axe audit, cross-browser, launch | |

---

## 12. Commands

```bash
npm install
npm run dev          # http://localhost:3000
npm run build
npm run typecheck    # the content layer's safety net
npm run lint
npm run format
npx shadcn@latest add button accordion dialog
```
