# Design decisions — MILLZ Global Solutions

Every colour and type decision on this site, why it was made, and what it cost.
Written so the sibling Mental Toughness build can reuse what should be shared
and diverge where it should not.

---

## 1. Direction

The failure mode for this brief is the generic fitness site: black background,
neon accent, condensed all-caps, stock barbell photo, the word "TRANSFORM".

The register built instead is **institutional** — closer to a well-run trade or
civil-engineering company than to a supplement ad. The reasoning is audience:
the primary reader is a credit union loan officer checking whether MILLZ is a
real operating company. That reader is not impressed by motion and is suspicious
of vagueness. So the site is built out of the things that signal a real business:
consistent legal naming, a plain explanation of what the company does, honest
labelling of what is not finished, and real contact details.

The second audience — a prospective training client — is converted by the same
plainness plus a visible price list and a free consultation.

---

## 2. Palette

All values sampled from the files in `/assets` with a script, not chosen by eye.

| Token | Hex | Role | Provenance | Contrast |
|---|---|---|---|---|
| `ink` | `#0E0D12` | Dark surface | Sampled from the shadows of `hero-01.jpg` | 15.7:1 vs paper |
| `paper` | `#EDE7DC` | Light surface | Chosen warm off-white | — |
| **`brick`** | **`#9C2736`** | **Shared family red** | Sampled from `red-hoodie-front.jpg`, mid-chest | **6.19:1 on paper** ✅ AA |
| `ember` | `#D85A45` | Red for text on dark | `brick` lifted toward the merch orange | **5.04:1 on ink** ✅ AA |
| `graphite` | `#4A4751` | Secondary text on paper | — | 7.38:1 ✅ |
| `bone` | `#A8A29B` | Secondary text on ink | — | 7.66:1 ✅ |

The logo itself is pure `#000000` on `#FFFFFF` and yielded no colour. What it
contributed was geometry (see §5).

### 2.1 The red, and who owns it — read this before rebranding either site

`#9C2736` was sampled from a **Mental Toughness garment** — a photograph of the
apparel brand's own product. That matters more than it looks:

- **The apparel brand is the origin of this red.** It exists on physical stock
  that has already been manufactured. The parent company had no independent red
  before this build; it inherited one from its subsidiary's product.
- It is therefore recorded here as the **shared family red**, not as a parent
  token that the apparel site is expected to inherit. The dependency runs the
  other way.
- **Practical consequence:** if the client ever rebrands one business and not the
  other, the apparel brand is the one with the stronger claim to keep `#9C2736`,
  because its inventory is dyed that colour. The parent site is the cheaper thing
  to change. Do not assume the parent's palette is authoritative.
- The sampled range across the garment is `#8A1C26` (shadow) → `#9C2736` (mid) →
  `#BA3E52` (lit). `#9C2736` is the mid-tone and the canonical value.

### 2.2 Why there are two reds

`brick` scores **2.54:1 on ink** — it fails badly as text on the dark surface. The
brief said to fix the red rather than add an outline, so:

- On **paper**, `brick` is used for text and rules (6.19:1).
- On **ink**, `brick` is **fill-only** — a solid block with `paper` text on it,
  which is the same 6.19:1 pairing. Buttons and spine nodes use it this way.
- Red **text** on ink uses `ember` (5.04:1), which is `brick` pulled toward the
  orange that already appears in the merch (`#FE732E`, sampled from `hero-02.jpg`
  and the bucket hat in `millz_01.jpg`).

This is **one hue at two calibrated stops, not two accent colours.** Components
never choose between them: each section declares `surface-ink` or `surface-paper`
and the correct stop resolves through `--accent` / `--accent-fill`. See
`src/app/globals.css`.

### 2.3 Orange is deliberately excluded from the UI

Orange is unmistakably present in the real merchandise. It is allowed to appear
**inside photographs** and nowhere else. Introducing a second accent would have
diluted the single-accent discipline the brief asked for.

---

## 3. Typography

| Role | Face | Why |
|---|---|---|
| Display | **Archivo** (variable, `wdth` axis) | Grotesque with real structure; the width axis is the whole idea (§4) |
| Body | **Literata** (variable, `wght` + `opsz`) | Holds its colour reversed on dark. See §3.1 |
| Utility | **IBM Plex Mono** (500 only) | Eyebrows, spine labels, prices. Mono reads as spec sheet and invoice — trade, not gym |

None of the banned faces are used: no Inter, Roboto, Arial, Space Grotesk,
Poppins, Montserrat, Bebas Neue or Oswald.

Pairing a wide grotesque against a workhorse serif is what produces the
institutional register. The serif carries all sustained reading; the grotesque is
used only at display sizes.

### 3.1 Why the body face changed twice, and the rule that settled it

The body face went Source Serif 4 → Athelas → Literata. The middle step is worth
recording, because it failed for a reason that constrains any future swap.

Athelas was supplied by the client and looked visibly thin in place. Two causes,
both structural rather than matters of taste:

1. **It is a print book face.** Most book serifs are drawn for dark ink on light
   paper. Reversed to cream on near-black, the light background bleeds into the
   stem edges and the face optically thins. This site is majority dark surfaces,
   so anything that cannot survive reversal is disqualified regardless of how
   well it reads in print.
2. **It shipped as a single weight.** With no weight axis there was nothing to
   compensate with.

**The rule now: the body face must carry a weight axis.** That is what makes the
per-surface compensation possible:

```
.surface-ink   { --body-weight: 430; }   /* reversed — needs more */
.surface-paper { --body-weight: 400; }
```

Body copy is set 30 units heavier on dark so both surfaces read at matching
apparent colour. Headings and the utility face declare their own weight and are
untouched. `-webkit-font-smoothing: antialiased` is also deliberately **not**
set — it thins stems on macOS, which is the same problem in a different form.

Implementation note: the `font-weight` declaration lives on the surface utilities
themselves, not on `body`. `body` computes its font-weight before any descendant
sets `--body-weight`, so a `var()` reference there always resolves to the
fallback and the compensation silently does nothing.

Literata was chosen over Newsreader, Bitter, Fraunces and Vollkorn by rendering
all six as reversed text at the site's real body size and comparing. It has the
largest x-height and sturdiest stems of the group while keeping genuine
character in its flared terminals, and it is OFL — no licence to buy, which
Athelas would have needed.

---

## 4. The aesthetic risk: expanded type where the industry uses condensed

**Bebas Neue and Oswald are banned by the brief because condensed all-caps *is*
the fitness default.** Rather than sidestep that axis, this build inverts it:
Archivo is set at a **width axis of 112–118** — noticeably wider than normal.

Wide display type reads like civil engineering, freight, and bank nameplates. It
is the opposite gesture to a gym logo, and it is what makes the page look like a
holding company.

**What the risk costs, honestly:**

- Expanded faces are unforgiving of loose tracking. Display type is set at
  `-0.015em` with `line-height: 0.95` to compensate.
- Wide type breaks first on narrow screens. See §4.1.
- Archivo carrying two axes (`wght` + `wdth`) is a **~90KB** font file — the
  single heaviest asset on the site. There is no static "Archivo Expanded" family
  on Google Fonts (only `Archivo`, `Archivo Black`, `Archivo Narrow`), so the
  variable font is the only way to get this. **This is the measurable price of
  the risk**, and it is most of the remaining performance gap in §8.

### 4.1 Mobile hero treatment — verified at 375px

Expanded type is display-only, and it is governed by two hard rules:

1. **Never below 1.75rem.** Anything smaller uses `type-display-sm`, which pins
   `wdth` to 100. Small expanded type is illegible and looks like a mistake.
2. **Never below the 768px breakpoint.** `--display-wdth` is set to `100` at
   `:root`, rising to `112` at 48rem and `118` at 80rem. On a phone the display
   face is simply Archivo at normal width.

Three further changes were made after looking at an actual 375px render, each
fixing a defect that only appeared there:

| Problem at 375px | Fix |
|---|---|
| Header wordmark "MILLZ GLOBAL SOLUTIONS" wrapped to three lines and pushed the nav off its row | Wordmark hidden below `sm`; the monogram carries the identity alone |
| Hero eyebrow wrapped and orphaned "· MINNESOTA" onto its own line | `· Minnesota` hidden below `sm`. The state is still stated in the summary sentence and the footer |
| Hero wordmark risked overflowing | Set to `clamp(1.875rem, 0.5rem + 5vw, 5.5rem)` — 30px floor at 375px — and split across two fixed lines, `MILLZ GLOBAL` / `SOLUTIONS` |

Net result at 375px: the monogram, a single-line eyebrow, a two-line wordmark at
normal width, the tagline, a rule, the summary, and two stacked full-width
buttons. Verified by screenshot, not assumed.

---

## 5. Signature element: the spine

The one thing the page should be remembered by had to express *one organisation
containing distinct businesses*, structurally rather than as an org-chart graphic.

The answer came from the client's own logo. The TM monogram is a **T nested
inside an M** — one form containing another. That is the parent/division
relationship, already drawn.

So the site is built around a **continuous vertical rule down the entire
document** — the parent company. Everything attaches to it:

- **Section headings** attach with a short **tick**. Ticks are structure.
- **Businesses** attach with a **node**. Nodes are status, and they carry the
  page's central factual claim:

| Node | Meaning |
|---|---|
| **■ filled `brick`** | An operating division. Trading today. |
| **□ hollow outline** | In development. Not running yet. |

This is why `content/development.ts` forbids attaching photography to a hollow
node: an image reads as evidence that something is operating and would contradict
the node beside it. Both node states also carry a screen-reader-only text
equivalent, so the distinction is never conveyed by shape alone.

Implementation note: the spine is drawn as one segment per `<Section>` rather
than a single full-height element, because the rule colour has to change with the
surface beneath it. The segments abut exactly and read as one unbroken line.

**Supporting detail:** every corner on the site is **chamfered at 45°** rather
than rounded — `border-radius` is `0` everywhere. This is taken from the bevelled
facets of the monogram. On interactive elements the chamfer is painted on a
`::before` pseudo-element so `clip-path` can never clip the focus outline.

---

## 6. Motion

Motion was added in a second pass, after the site was otherwise finished. The
governing rule: **animate the structure, not the decoration.** The page already
has a signature — the spine, the nodes, the chamfer — so motion makes those
legible rather than adding a new layer on top.

Nothing here uses a JavaScript animation library. All of it is CSS scroll-driven
animation, which is why **First Load JS is unchanged at 103KB**.

| Effect | What it does | Why it earns its place |
|---|---|---|
| **Page-load reveal** | Hero elements rise into place, staggered | The one orchestrated moment |
| **Spine draw** | The rule extends downward as each section arrives | The parent company, extending |
| **Node arrival** | Nodes scale onto the line once it passes them | Businesses attaching to the parent |
| **Button sweep** | A rule grows along the bottom edge on hover and focus | Same rule language as the section dividers |

### 6.1 Rules this obeys without exception

1. **Transform only. Nothing touches opacity.** An early hero reveal faded from
   `opacity: 0`, which meant the headline was not painted until its stagger delay
   elapsed — delaying Largest Contentful Paint and contradicting the brief's
   requirement that someone on hotel wifi sees content immediately. Nothing on
   this site is ever invisible or low-contrast while waiting to animate.
2. **The static state is the finished state.** Scroll animations sit inside an
   `@supports (animation-timeline: view())` guard. A browser without scroll
   timelines renders the page fully drawn. Nothing is hidden by default.
3. **Node motion preserves the hierarchy.** Filled nodes (operating divisions)
   overshoot slightly and assert themselves; hollow ones ease in flat. The
   in-development entries are quieter in motion for the same reason they are
   quieter in type and colour.

### 6.2 What got cut, and the numbers that cut it

A `.settle` effect — blocks rising as they enter view, on every section header
and image column — was built and then **removed after measuring**:

| | Perf | TBT | Style & Layout |
|---|---|---|---|
| No animation | 94 | 69ms | 570ms |
| **With `.settle`** | **88** | **455ms** | **1650ms** |
| Final (spine + nodes only) | **95** | 78ms | 659ms |

Roughly fifteen concurrent scroll timelines cost six Lighthouse points. Cutting
`.settle` recovered all of it: the spine and nodes together add about **9ms of
blocking time**.

It was also the right call on design grounds. "Content rises on scroll" is the
generic effect — it means nothing about this business. The spine and its nodes
describe the company's structure. If something like `.settle` is ever wanted
back, budget it: measure TBT before and after, and keep the total number of
scroll timelines in single figures.

### 6.3 Three traps worth knowing about

Each of these produced silently broken output that still built and still passed
type-checking:

- **`overflow: hidden` breaks `view()` timelines.** Any overflow value other than
  `visible` establishes a scroll container, and `animation-timeline: view()`
  resolves against the nearest one. The spine sat inside an `overflow-hidden`
  wrapper, so its timeline was pinned at a constant ~50% and the line rendered
  permanently drawn.
- **The `animation` shorthand resets duration to `0s`.** A scroll-driven
  animation takes progress from the timeline, not from time, but omitting the
  duration still completes it instantly. Every scroll animation here carries an
  explicit `1ms`.
- **Tailwind v4's `scale-x-*` writes to `scale`, not `transform`.** Pairing it
  with a `transform: scaleX(0)` base leaves both properties applied and the
  element permanently collapsed. The button sweep owns its rest and hover states
  on one property in plain CSS.

### 6.4 The globe

A rotating wireframe globe sits beside the wordmark in the hero — the literal
reading of "MILLZ Global". It is decorative: `aria-hidden`, no pointer input,
desktop only.

It was added from a third-party component and needed substantial rework before
it was shippable. As dropped in, it cost **12,211ms of Total Blocking Time** and
took the home page's mobile Lighthouse performance score from **95 to 55**.

| | Perf | LCP | TBT |
|---|---|---|---|
| No globe | 95 | 1.5s | 78ms |
| **Globe as supplied** | **55** | 4.1s | **12,211ms** |
| Globe, reworked | 92 mobile / **100 desktop** | 2.8s | 145ms |

Four causes, four fixes:

1. **It fetched 232KB of GeoJSON from `raw.githubusercontent.com` on every page
   load.** Geometry is now precomputed to `/public/globe.json` by
   `scripts/generate-globe-data.py` (116KB raw, 31KB gzipped). No third-party
   request at runtime — the page cannot be broken by someone else's outage,
   rate limit, or privacy policy.
2. **It brute-forced a lat/lng grid to find land dots** — ~33,500 grid points
   against ~1.3M polygon vertex comparisons, synchronously on the main thread.
   That now happens once, at build time.
3. **It drew 13,149 dots per frame at 60fps.** Density is down to ~3,700, only
   the front-facing hemisphere is drawn (orthographic projection maps the far
   side onto the same disc, so the back was drawing straight through the front —
   a correctness bug as well as double the work), and the frame rate is capped
   at 30.
4. **It never stopped.** It now pauses via `IntersectionObserver` when scrolled
   out of view, and does not animate at all under `prefers-reduced-motion`.

Two further gates in `GlobeMount.tsx`: a `min-width: 1024px` media query, so
phones never download the chunk or the data for something set to `display: none`;
and `requestIdleCallback`, so on desktop it waits for the main thread to go quiet
rather than competing with the hero text. `ssr: false` keeps it out of the
initial bundle.

Also removed: `console.log` debug output that fired once per land feature, an
unused `isLoading` state, a "Drag to rotate" label describing an interaction the
component could not perform, and hardcoded hex colours — it now reads
`--color-bone` from the design tokens.

The dependency was narrowed from the full `d3` package to `d3-geo` and
`d3-timer`.

### 6.5 Reduced motion

`prefers-reduced-motion: reduce` disables everything, including smooth scrolling.

Note that the global reduced-motion rule collapses `animation-duration`, which
does **nothing** to a scroll-driven animation — its progress comes from scroll
position, not elapsed time. `animation-timeline` has to be set to `none`
explicitly, which it is. Verified: with reduced motion on, the spine and nodes
report `animation-timeline: none` and `animation-name: none`.

---

## 7. Asset decisions

**Every image in `/assets` belongs to Mental Toughness.** There is no photography
of the training business and no confirmed portrait of the founder. That governed
four decisions:

1. **The Fitness Training block has no photograph.** A hoodie photo standing in
   for a personal training business would misrepresent the division. It renders a
   labelled placeholder at the correct 4:3 ratio, so dropping the real asset in
   later causes no layout shift. This is the top item in `CLIENT-TODO.md`.
2. **The hero is type-led, with no photograph at all.** No single image in the
   library represents the *parent* company; apparel photography at the top of the
   parent site would misstate what the parent is. It also makes the largest paint
   a piece of text, which is the fastest thing to deliver on a poor connection.
3. **`millz_02.jpg` (the fight photo) is not used.** Boxing is in development, not
   operating. Attaching a photograph to a hollow node would have broken the
   filled/hollow system that the whole page depends on. If the image is the
   founder, it belongs in the About section as personal background — but see the
   next point.
4. **`millz_03.jpg` is not used and no founder name is published.** That file is a
   social-media screenshot, with interface chrome and a watermark, carrying the
   name "Millz Johnson" over the same person as `millz_02.jpg`. That is
   suggestive but it is **not confirmation**, and a name inferred from a
   screenshot has no place on a document supporting a loan application. Logged in
   `CLIENT-TODO.md` for the client to confirm.

Only `hero-01.jpg` is used, in the Mental Toughness division block, where it is
accurate: real product, worn by real people, shot by the brand.

**The monogram** was keyed to transparent alpha from `logo.jpg` with a
contrast-stretched threshold, then trimmed. It is applied as a CSS mask so it
takes any token colour. The source is a **359×500 JPEG**, so the usable ceiling is
roughly **138px** before it goes soft — every on-site use stays under that. The
keying is clean (no visible fringe), but an SVG is requested in `CLIENT-TODO.md`
and would remove the ceiling entirely.

---

## 8. Measured results

Lighthouse 12, production build, three-run median.

**Desktop preset — all three pages:**

| Page | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| `/` | **100** | **100** | **100** | **100** |
| `/training` | **100** | **100** | **100** | **100** |
| `/contact` | **100** | **100** | **100** | **100** |

**Mobile preset (simulated slow 4G + 4× CPU throttling):**

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS |
|---|---|---|---|---|---|---|
| `/` | 94 | **100** | **100** | **100** | 2.8s | 0.001 |
| `/training` | 95 | **100** | **100** | **100** | 2.6s | 0.046 |
| `/contact` | 95 | **100** | **100** | **100** | 2.6s | 0.001 |

**Accessibility is 100 on every page, which was the hard requirement.**
Mobile performance medians land at **94–95 against a 95+ target** — `/training`
and `/contact` meet it, `/` sits one point under. Reported as measured rather
than rounded up. Two things are worth knowing about that number:

- It is dominated by the ~148KB font payload, of which the ~90KB dual-axis
  Archivo is the deliberate cost of the expanded-type decision (§4). Dropping the
  width axis would clear the target and remove the design.
- These runs are on a local machine that is also running the build, served from a
  single Node process. On Vercel's CDN with HTTP/2 and edge caching the figures
  should improve. **Re-measure against the deployed URL before treating 94 as
  final.**

Work already done to get here: static-rendered every route, cut the font payload
from 5 files/172KB to 3 files/148KB, dropped IBM Plex Mono from three weights to
one, removed the opacity fade from the hero reveal, and set modern browser targets
to strip legacy polyfills.

`/training` retains **CLS 0.046** — within Google's "good" threshold (<0.1) but
not zero. It comes from the intro copy reflowing when the display font swaps.
Explicit metric-compatible fallbacks were added and did not remove it; the
residual is inherent to swapping in a width-axis font.

---

## 9. Assumptions made

Each of these was a judgement call made to keep the build moving. All are
reversible by editing `/content`.

1. **The company is described as owning "two businesses".** Trading status was
   taken from the brief. If either is not yet trading it must move to
   `content/development.ts` and its node becomes hollow.
2. **Voice.** Plain, second person, short sentences, no exclamation points, and
   none of the banned vocabulary ("unlock", "elevate", "journey", "transform",
   "empower", "solutions-driven").
3. **US spelling throughout**, as a Minnesota company.
4. **No street address is published anywhere** — not in the footer, not in the
   JSON-LD. The business runs from a home address and publishing it is a privacy
   and safety problem. `LocalBusiness` schema carries locality and region only.
5. **A 24-hour cancellation policy and non-expiring session packs** were written
   into the training FAQ and pricing note. These are plausible defaults, not
   client-confirmed. Flagged in `CLIENT-TODO.md`.
6. **"Reply within one business day"** appears next to the contact form and in the
   auto-reply. It is a commitment the client has not agreed to. Confirm or change.
7. **A scope disclaimer** was added to the training page — that this is not
   medical rehabilitation and readers needing clinical care should see a physical
   therapist. Not requested, but a training business making no such distinction
   carries avoidable liability.
8. **Testimonials and credentials arrays are empty and their sections do not
   render.** Nothing was written on the client's behalf.
9. **`millzglobalsolutions.org`** is assumed as the canonical domain, derived from
   the given email address. It drives metadata, canonical URLs, sitemap and
   robots, and must be confirmed.
