# Design decisions — Mental Toughness Clothing

Every direction, colour, type and structural decision on this site, why it was
made, and what it cost. Written to sit beside the parent build's record at
[`reference/DECISIONS.md`](reference/DECISIONS.md): what was inherited from it
is marked, what deliberately diverges is explained.

---

## 1. Direction

The failure mode for this brief is red-and-black streetwear as the category
does it: a grid of identical rounded cards, condensed all-caps, "no excuses"
copy, and a hero shouting at you. The brief names a second failure that is
specific to this client: a storefront that looks finished when the products are
not. Twelve of the thirteen product images in the repository are 3D mockups of
a design that differs from the one garment that physically exists.

So the register built is **quiet and hard, and honest about what is real.**

- **Black-dominant, red carrying weight.** The parent site is light with red as
  a rare accent; this one inverts it. Same pigment, opposite temperature (§2).
- **Sentence case, not shouting.** Display type is wide and confident but set in
  sentence case at moderate weight. Someone who has been through something does
  not need to yell about it. Hustle vocabulary — grind, beast mode, pain is
  weakness — appears exactly once on the site, in the About page's "What it
  isn't", as the thing the brand is not.
- **Honesty as a design feature.** Every image says what it is: *Photograph*,
  *3D mockup*, or *Placeholder*. The hero caption says the hoodie is "the one
  product photograph on this site." The shop heading counts how many pieces are
  photographed. This is not an apology; a brand that has not shot its products
  should look unfinished rather than fraudulent, and a customer who knows what a
  mockup is will trust the photographs more for it.
- **Two lines, never merged.** The rhinestone hoodie the client stocks and the
  print-on-demand drop are different products with different artwork.
  `content/products.ts` carries `line: "stock" | "print"`, every card and page
  labels it, and nothing on the site implies the rhinestone design will arrive
  printed. See [`ASSET-INVENTORY.md`](ASSET-INVENTORY.md) for the conflict.
- **Waitlist first.** Nothing takes money. The cart works, checkout opens a
  modal that says the first drop has not opened and collects an email. The
  footer says so on every page.

---

## 2. Palette

All values are tokens in `app/globals.css` (`@theme`). Tailwind's default
palette is removed so only these exist.

| Token | Hex | Role | Provenance | Contrast |
|---|---|---|---|---|
| `ink` | `#0E0D12` | Base surface | **Inherited.** Sampled from `hero-01.jpg` shadows | — |
| `ink-2` | `#15141A` | Raised surface: cards, drawer, fields | New, one step up | — |
| `ink-3` | `#1D1B22` | Hover on raised | New | — |
| `coal` | `#08080A` | Footer | New, one step down | — |
| `paper` | `#EDE7DC` | Primary text | **Inherited** | 15.7:1 on ink |
| `bone` | `#A8A29B` | Secondary text | **Inherited** | 7.7:1 on ink · 7.2:1 on ink-2 |
| `ash` | `#857F78` | Tertiary text: placeholder labels, "USD", statuses | New | 4.9:1 on ink · 4.6:1 on ink-2 |
| **`brick`** | **`#9C2736`** | **The family red. Fills only.** Buttons, the waitlist band, beam bearings | **Inherited exactly** — sampled from this brand's own garment | 6.2:1 with paper text on it |
| `brick-deep` | `#8A1C26` | Fill hover | Inherited (garment shadow stop) | 7.5:1 with paper |
| `brick-lit` | `#BA3E52` | Reserved (garment highlight stop) | Inherited | — |
| `ember` | `#D85A45` | **Red as text** on dark: prices' accents, section indices, errors, "Placeholder" | **Inherited** | 5.0:1 on ink · 4.8:1 on ink-2 |
| `signal` | `#FE732E` | **One place only:** the square beside "Drop 01 · waitlist open" | Sampled from the merch (bucket hat, `hero-02.jpg`) | 7.1:1 on ink |
| `rule` / `rule-strong` | paper at 14% / 30% | Hairlines and the beam | New | decorative |

### 2.1 The red, and which way the dependency runs

`#9C2736` is used exactly. The parent record is explicit that this is a
**Mental Toughness colour the parent borrowed**, not a parent token handed down:
it was sampled from this brand's hoodie, and the brand's inventory is dyed that
colour. So here it is native, not inherited, and it does real work — the
waitlist band is a full-bleed brick fill, the primary button is brick, the beam
bearings are brick.

### 2.2 Two reds, one mechanism — copied from the parent

`brick` fails as text on ink (2.5:1). The parent solved it with two calibrated
stops of one hue and a rule that **components never choose between them**: the
surface declares itself and `--accent` / `--accent-fill` resolve. That mechanism
is copied. On `ink`, `--accent` is `ember` and `--accent-fill` is `brick`. The
waitlist band sets both to `paper`, and the button, the beam's bearings and the
form inside it all resolve without knowing where they are.

Because this site is black-dominant, `ember` carries far more load than on the
parent. Lighthouse's contrast audit passes on every page; the one failure found
in testing (paper at 70% opacity on brick, 3.8:1) was fixed by raising the
opacity to 90%.

### 2.3 The tertiary: orange, in one place

The brief invited "one unexpected tertiary used in a single place." The merch
already contains an orange the parent excluded from its UI. Here it is the
single live status indicator — the 8px square beside *Drop 01 · waitlist open*
in the hero and the OG image. It is the only thing on the site that is neither
red, black nor cream, and it marks the only thing that is currently happening.
`DropStatus` in `components/ui/Tag.tsx` is the one component allowed to use it.

---

## 3. Typography

| Role | Face | Parent used | Why |
|---|---|---|---|
| Display | **Mona Sans** (variable, `wdth` 100–125 · `wght` 500–800), set wide | Archivo, set wide | Must differ from the parent; see §3.1 |
| Body | **Literata** (variable `wght` 400–700) | Literata | **Shared, by brief.** Set at 430 on dark — the parent's reversal compensation |
| Utility | **IBM Plex Mono** 500 | IBM Plex Mono 500 | Shared. Prices, sizes, eyebrows, care labels: garment labels are mono-ish anyway |

No banned face is used: no Inter, Roboto, Arial, Space Grotesk, Poppins,
Montserrat, Bebas Neue, Oswald or Anton.

### 3.1 Why Mona Sans

Four candidates were rendered side by side in Chrome at the site's real hero
size on the real palette — Mona Sans at width 120, Anybody at 130, Anek Latin at
125, and Syne — before choosing. Anybody read as Eurostile, which is the
esports and car-brand default; Anek was plain; Syne was arty. Mona Sans at
110–120 is wide without being squared, confident in sentence case, and has a
genuine width axis so the same file serves normal-width type on phones.

Going wide is coherent with the parent (which also went wide, against the
condensed fitness default). The parent's record says that means wide type is
**not this build's risk** — so the risk is taken elsewhere (§6).

### 3.2 Width rules

- `--display-wdth` is `100` at `:root`, `110` from 48rem, `116` from 64rem.
  Expanded type never appears on a phone.
- Utility `.display` applies the variable width; `.display-narrow` pins 100 for
  anything under ~1.4rem (card titles, cart lines, the header wordmark), where
  expanded type looks like a mistake.
- Buttons sit at width 104: a hair wider than normal, so they read as the same
  family without competing with headlines.

### 3.3 Scale

Set in `@theme` as `--text-display-xl` … `--text-mono-sm`, each carrying its own
line-height and letter-spacing. Display sizes are `clamp()`ed against viewport
width, with tightening negative tracking as size grows (−0.028em at the largest).
Body is 17px / 1.55; body-lg is 18–21px for ledes. Mono is 12px uppercase with
0.08em tracking, 11px with 0.1em for the smallest labels.

---

## 4. Layout

**Editorial, not template.** The brief's stated failure mode is a grid of
identical rounded cards. Measures taken:

- **`border-radius: 0` everywhere**, inherited from the parent's reading of the
  monogram's bevelled facets. Where the parent chamfers every corner at 45°,
  this site cuts **one corner** — the top right, 12px — on every image frame and
  button. It is the hangtag. Apparel-specific, and enough to make the sites feel
  related without matching.
- **The shop grid breaks unevenly on purpose.** Column spans repeat
  `5, 7, 4, 4, 4, 7, 5, 4, 4, 4` — rows sum to twelve, no two adjacent rows
  match. `items-end` lets differently-proportioned garments sit on a common
  baseline. The real photograph gets 5 columns, not 7: it is a 485px source and
  goes soft past ~560px.
- **One product is large.** The rhinestone hoodie is the hero image on every
  visit, the largest thing on the home page, and the only thing in the hero
  besides type. The heavyweight hoodie gets a 3 / 6 / 3 triptych at three scales.
- **What has no photograph or render is drawn, not left as a hole.** Eleven
  colourways across six products had no imagery of any kind. Rather than
  leave hatched placeholders in front of the client, each is a flat front-view
  illustration generated from the print spec (`scripts/illustrate-products.mjs`):
  the garment silhouette in its colour, the monogram and wordmark where the
  spec puts them, on the same dark backdrop as the mockups. They are labelled
  **Illustration** on every card and caption, exactly as renders are labelled
  **3D mockup**. The home collection is an eight-card grid at
  5 / 4 / 3 · 4 / 4 / 4 · 7 / 5 columns.
- **The placeholder component still exists** for any colourway added without
  imagery: correct-aspect, hatched, labelled, no layout shift when the real
  image lands.
- **Product page**: gallery left with description, specs and disclosures
  beneath it; a sticky purchase panel right. On phones the panel follows the
  gallery and the long copy comes last.
- **Every product page ends with the next one** ("Keep going — Next: Core
  Tee"), so browsing a ten-piece catalogue never dead-ends.

---

## 5. Signature element: the beam

The brand's idea is continuing under load. The brief rules out the slogan, the
heartbeat line and the mountain. The parent's signature is a vertical spine —
one organisation containing businesses.

This site's is horizontal: **every section heading stands on a beam.** A rule
runs edge to edge beneath the heading, supported at both ends by a small brick
bearing, and it **deflects under the heading and holds** — the sag is deepest
directly below the title, not at the geometric centre, because that is where the
load is. Vertical spine on the parent (containing), horizontal beam here
(carrying): someone who visits both should feel the relationship without naming
it.

Implementation, `components/ui/Beam.tsx`:

- One SVG, `preserveAspectRatio="none"`, two quadratic curves meeting at the
  load point with a horizontal tangent, stroke 1.25px with
  `vector-effect: non-scaling-stroke` so the line stays crisp at any width.
- `loadAt` (0–1) places the deflection; `sag` sets depth in px (8–14 used).
- The bearings are `::before` / `::after` in `--accent-fill`, so they turn cream
  on the brick surface without the component knowing.
- **Motion**: the beam is drawn flat and *takes its load* as it enters view —
  `transform: scaleY(0.04 → 1)` on the SVG, driven by
  `animation-timeline: view()`, guarded by `@supports`, one millisecond
  duration so progress comes from scroll (the parent's trap #2). In the hero
  the same keyframe runs on a 900ms timer instead, as part of the page-load
  moment. Transform only; the static state is the finished state.

Budget: five to seven beams per page, all one property. Measured cost is
invisible: TBT is 10–20ms on every page (§8).

---

## 6. The risk: none of the rules are straight

Every horizontal rule that carries a heading on this site is bent. Design
convention says a rule is straight, and a curved one reads as an error. That is
the risk, and it is taken deliberately for three reasons:

1. It is the only structural expression of *under load* that is not a picture
   of something. A heartbeat is a picture of a heartbeat. A bowed beam is what
   load does.
2. It is quiet. At 1.25px and 8–14px of sag across 1300px, most people will not
   consciously notice. The ones who do will notice that the dip sits under the
   words.
3. It is cheap and it degrades to nothing. No JavaScript, one SVG per section,
   and a browser without scroll timelines simply shows the bowed line.

What it costs: some readers will see a rendering mistake. The mitigations are
consistency (every beam behaves the same), the bearings (a supported line
reads as a beam, an unsupported one reads as a wobble), and the animation,
which shows the line being straight first.

---

## 7. Motion

Rules inherited from the parent and obeyed without exception:

1. **Transform only. Nothing touches opacity.** No element is ever invisible
   while waiting to animate; the LCP is never delayed by a fade.
2. **The static state is the finished state.** Scroll animation sits inside
   `@supports (animation-timeline: view())`.
3. **Reduced motion disables everything**, including `animation-timeline`
   (set to `none` explicitly — collapsing duration does nothing to a
   scroll-driven animation). Verified with Playwright: under
   `prefers-reduced-motion: reduce` the beam reports `animation-timeline: none`.

What moves:

| Effect | What it does | Why it earns its place |
|---|---|---|
| **Page-load reveal** | Hero status, headline, lede and buttons rise 20px into place, staggered 90ms; the photograph settles from 2.5% below at 102% scale; the hero beam takes its load at 380ms | The one orchestrated moment |
| **Beam load** | Each section's rule bows as it enters view | The signature, made legible |
| **Cart drawer** | Slides in on `translateX`, scrim fades | Standard; 420ms, expo ease |
| **Link sweep, button fill** | A rule grows under nav links; the button fill darkens; images scale 1.5% on hover | Small, consistent, transform-based |

Nothing uses a JavaScript animation library. First-load JS is 102KB shared —
the React 19 + Next 15 baseline — plus 1–8KB per route.

---

## 8. Performance and measured results

Lighthouse 12.8, production build served locally by `next start`, mobile preset
(simulated slow 4G, 4× CPU throttle) and desktop preset. Single runs, after the
optimisations below.

| Page | Preset | Performance | Accessibility | Best practices | SEO | FCP | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|---|---|
| `/` | mobile | **95** | **100** | 100 | 100 | 1.1s | 2.9s | 0.001 | 10ms |
| `/product/heavyweight-hoodie` | mobile | **96** | **100** | 100 | 100 | 1.1s | 2.7s | 0.033 | 10ms |
| `/shop` | mobile | **97** | **100** | 100 | 100 | 0.9s | 2.6s | 0.015 | 10ms |
| `/about` | mobile | **98** | **100** | 100 | 100 | 0.9s | 2.4s | 0.001 | 10ms |
| `/` | desktop | **100** | **100** | 100 | 100 | 0.3s | 0.6s | 0.002 | 0ms |
| `/product/heavyweight-hoodie` | desktop | **100** | **100** | 100 | 100 | 0.3s | 0.6s | 0.005 | 0ms |

Accessibility is 100 everywhere, which was the hard requirement. Every route is
statically generated. **Re-measure against the deployed URL** — these are one
machine also running the server.

### 8.1 How the home page went from 88 to 95

The first measurement was 88 / 96. Diagnosis and fixes, in order of effect:

1. **The LCP was the hero photograph, and its render was pinned to
   Time-to-Interactive** (both 3.9s) — Lighthouse's simulation counts every
   byte loaded before the image against it. On phones the text block now fills
   the first viewport (`min-h-[calc(100svh-11rem)]` below `md`) and the
   photograph sits just under the fold. The largest first paint is the lede,
   which arrives with the HTML. On tablets and up the layout is unchanged.
2. **Fonts were 214KB and preloaded.** `next/font/google` self-hosts but ships
   the whole latin variable file. `scripts/build-fonts.mjs` now fetches the same
   files and runs HarfBuzz **partial instancing** — Mona Sans keeps only
   `wdth` 100–125 and `wght` 500–800, Literata only `wght` 400–700 with `opsz`
   pinned at 16 — and subsets to basic Latin. **98KB → 50KB and 110KB → 28KB.**
   The files live in `app/fonts/` via `next/font/local`, with metric-compatible
   fallbacks. IBM Plex Mono is no longer preloaded (it can arrive a beat late
   for eyebrows and prices).
3. **Modern browser targets** (`browserslist` in `package.json`) strip 11KB of
   legacy polyfills from the shared chunk.
4. **Contrast**: paper at 70% on brick → 90%.

Total transfer on the home page fell from 462KB to 337KB.

### 8.2 What was not changed

- The Mona Sans width axis stays. Dropping it would save perhaps 20KB and
  remove the design. The parent made the same call with Archivo.
- `/product/*` keeps its gallery image as the LCP; that is the content.
- The Tailwind CSS is 38KB uncompressed / 9KB on the wire. Fine.

---

## 9. Assets and honesty

Decisions that follow directly from [`ASSET-INVENTORY.md`](ASSET-INVENTORY.md):

1. **Only one photograph exists**, and it is 485×512. It is the hero image, the
   featured product and the first card in the shop, always shown `object-fit:
   contain` against `ink-2` so the cut-out is never cropped, and never rendered
   wider than about 560px. It is slightly soft on a retina display at that
   size. That is the true resolution of the brand's only photograph, and it is
   preferred to a sharp render of a garment that does not exist.
2. **Renders are labelled "3D mockup"** in the gallery caption on every product
   page and in the meta line of every card. The renders' own backdrops (black
   gradient, red) are kept — they happen to match the palette exactly.
3. **Six products have no photograph or render.** Their eleven colourways
   are flat illustrations drawn from the print spec — silhouette, colour,
   artwork placement — and labelled "Illustration" wherever a mockup would
   say "3D mockup". They are generated, not hand-drawn, so a change to a
   colour or a print position is one line and a re-run of `npm run images`.
4. **Nobody appears without a release.** `hero-01.jpg`, `hero-02.jpg` and
   `customer_01.jpg` contain identifiable people and the client has confirmed
   he has no written permission. The image pipeline does not copy them into
   `/public` at all — anything under `/public` is a URL — unless run with
   `--include-unreleased`. The founder's own photograph is used on About with a
   consent flag in CLIENT-TODO.
5. **The logo is traced.** `scripts/trace-logo.mjs` runs potrace with
   corner-preserving settings over a 4× upscale of the 359×500 JPEG and emits an
   SVG plus a path constant, so the mark takes `currentColor` and has no raster
   ceiling. The trace is faithful to the eye at every size used; a designer's
   original vector should still replace it.
6. **The mockups contain artwork errors** — "TOUGHNES" on the red back,
   "TOUGHNESSS" on the white sleeve — recorded in the product notes and
   CLIENT-TODO. They are not retouched.

---

## 10. Commerce approach

Phase 1 only, exactly as the brief specifies: catalogue, cart in React state,
email capture. `lib/commerce.ts` holds typed signatures for Stripe Checkout,
the Stripe webhook, Printify submission, the confirmation email and the
Printify fulfilment webhook; each throws `NotImplementedError` with its
implementation described in a doc comment. `CHECKOUT_ENABLED = false` is the
one flag the cart drawer reads. [`PHASE-2.md`](PHASE-2.md) has the plan.

- **No `localStorage`.** The cart lives in a `useReducer` inside
  `CartProvider` for the life of the tab, and the drawer says so.
- **One server action for three captures** — homepage waitlist, per-product
  notify-me, checkout interest — distinguished by a `source` field so the
  owner's notification says where the lead came from and, for checkout, what
  was in the cart. A honeypot field silently swallows bots.
- **Honest failure.** Without a Resend key, development logs and succeeds;
  production returns a real error with the phone number. A live site that
  silently drops leads is worse than one that admits it.
- **Every price is server-side data.** Phase 2 must re-price from
  `content/products.ts`; the cart's unit prices are display only and the
  commerce stubs say so.

---

## 11. Mental health

- The 988 Suicide & Crisis Lifeline appears twice: as a full sentence at the
  end of the About page's "What it isn't" section, and as one quiet line in the
  footer of every page. Real number, real link, no illustration.
- "It isn't treatment either, and it won't pretend to be. A hoodie can be a
  reminder. It can't be a plan." — the About page's own words.
- No diagnostic language, no sad styling, no romance about struggle. The
  register is that you showed up today and that counts.
- No health claims anywhere. Product copy describes fabric, fit and print.

---

## 12. Assumptions made

Each is reversible by editing `/content`. All are in CLIENT-TODO.md.

1. **Legal name is "Millz Global LLC"**, as the client gave it, matching the
   parent site's current state. The brief's "MILLZ Global Solutions LLC" is
   unresolved; one edit in `content/site.ts`.
2. **Domain is `mentaltoughnessclothing.shop`**, because the parent already
   points there. Drives every canonical URL.
3. **Rhinestone Hoodie at $95** — an estimate; the brief priced only the print
   hoodie.
4. **Bucket Hat replaces Dad Hat**; **Sweat Shorts are added**; **Sweatpants
   are named Fleece Joggers.** All follow what the assets actually show.
5. **Founder's name and title** "Millz Johnson, founder" and his one-sentence
   quote are from his questionnaire and are published; his personal origin story
   is **not**, and renders as a visible placeholder.
6. **Phone, hours, in-person locations, social handles** are the client's
   answers for the parent site, reused here and flagged.
7. **"Within a couple of business days"** on the contact form, and the
   shipping/returns disclosure ("made to order, about a week; exchange-only for
   sizing") are plausible defaults, not client commitments.
8. **Size guide figures** are typical for each garment type, not the chosen
   blank's.
9. **US spelling** throughout except product colour names, which follow the
   parent's convention.

---

## 13. Traps hit during the build, for whoever builds Phase 2

- **Exporting a non-function from a `"use server"` file** compiles but the
  client receives a server-action proxy: `CONTACT_TOPICS.map is not a function`
  at prerender. Constants shared between an action and a form live in
  `content/`.
- **Chrome headless `--window-size` below ~500px lays the page out wider than
  the screenshot.** The first 375px captures looked like horizontal overflow;
  it was the tool. Playwright with a real viewport shows `scrollWidth` equal to
  the viewport on every page.
- **Google Fonts serves WOFF, not TTF, to old user agents** for this family, so
  the OG image route's font loader must accept `format('woff')`, and the
  `text=` subset must include the whole alphabet or individual glyphs silently
  fall back to another face.
- **The build machine ran out of disk mid-build.** A partially written `.next`
  serves broken pages with 200s. If a page is oddly wrong after a build, check
  `du -sh .next` before checking the code.
