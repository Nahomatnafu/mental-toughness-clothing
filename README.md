# Mental Toughness Clothing

Storefront for **Mental Toughness Clothing**, a mental-health-awareness streetwear
brand from southern Minnesota, operating under Millz Global LLC. Sibling to the
parent company site at [Nahomatnafu/millz-global](https://github.com/Nahomatnafu/millz-global).

**Status: Phase 1 built.** Catalogue, product pages, a local-state cart, and
email capture are live. **Nothing takes payment** — checkout opens a modal that
collects an email, by design. Phase 2 (Stripe + Printify) is specified in
[`PHASE-2.md`](PHASE-2.md) with the interfaces already in place.

Stack: Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
Resend · Vercel. Every route is statically generated.

---

## Run it

```bash
npm install
cp .env.example .env.local      # optional in development — see below
npm run dev                     # http://localhost:3000
```

Without `RESEND_API_KEY`, the waitlist, notify-me and contact forms log to the
terminal and report success in development. In production they report an honest
failure instead, so a live site never silently drops a lead.

```bash
npm run build && npm start      # production build, all 28 routes static
npm run lint                    # eslint
npm run typecheck               # tsc --noEmit
```

## Edit content

No CMS. Everything a page says lives in typed config:

| File | What it holds |
|---|---|
| [`content/site.ts`](content/site.ts) | Name, legal parent, domain, phone, hours, socials, drop status, 988 resource |
| [`content/products.ts`](content/products.ts) | The catalogue. **Read [`ASSET-INVENTORY.md`](ASSET-INVENTORY.md) first.** Two lines — `stock` and `print` — never merged |
| [`content/categories.ts`](content/categories.ts) | Shop filters |
| [`content/size-guide.ts`](content/size-guide.ts) | Measurement tables per garment type |
| [`content/home.ts`](content/home.ts), [`content/about.ts`](content/about.ts) | Long-form copy |
| [`content/image-manifest.ts`](content/image-manifest.ts) | **Generated.** Pixel dimensions of every image in `/public/images` |

Every product is `confirmed: false` and every price is a placeholder until the
client signs off. The full list of what is unconfirmed is in
[`CLIENT-TODO.md`](CLIENT-TODO.md).

### Adding a photograph

1. Drop the file in `/assets`.
2. Add a line to [`scripts/prepare-images.mjs`](scripts/prepare-images.mjs) and run `npm run images`.
   It writes a resized derivative to `/public/images` and regenerates the manifest.
3. Reference the new manifest key from the product's colourway in `content/products.ts`
   with `kind: "photo"` and real alt text describing the garment and the print.

Lifestyle images with unreleased likenesses (`hero-01`, `hero-02`, `customer_01`)
are **not** copied to `/public` unless you pass `--include-unreleased`. Anything
under `/public` is a public URL whether or not a page renders it.

### The logo

`assets/logo.jpg` is a 359×500 JPEG. `npm run trace-logo` traces it to
`public/images/brand/monogram.svg` and a path constant in
`components/brand/monogram-path.ts`, so the mark renders crisp at any size and
takes `currentColor`. Replace both with the designer's vector when it arrives.

## Project layout

```
app/                    Routes. Home, /shop, /shop/[category], /product/[slug],
                        /about, /contact, /privacy, OG images, sitemap, robots, manifest
app/actions/            Server actions: subscribe (waitlist / notify / checkout), contact
components/
  brand/                Monogram (inline SVG), Wordmark
  ui/                   Beam (the signature element), Button, SectionHeading, Tag, Placeholder
  product/              ProductView (client), cards, line sheet, size guide, JSON-LD
  cart/                 CartProvider (React state only — no localStorage), drawer, checkout modal
  forms/                EmailCapture, ContactForm (useActionState)
  home/ shop/ layout/   Page sections
content/                Typed config — see above
lib/
  commerce.ts           Phase 2 interfaces: Stripe, Printify, webhooks. Throws NotImplemented today
  cart.ts               Cart reducer and totals
  email.ts              Resend wrapper with the dev/prod fallback rule
  og.ts                 Satori helpers for the OG image routes
emails/                 Plain-text + HTML templates
scripts/                prepare-images.mjs, trace-logo.mjs
public/images/          Generated derivatives (committed so Vercel needs no extra step)
```

## Deploy

Vercel, zero config. Set in the project's environment:

```
NEXT_PUBLIC_SITE_URL   RESEND_API_KEY   WAITLIST_TO_EMAIL   CONTACT_TO_EMAIL   CONTACT_FROM_EMAIL
```

`CONTACT_FROM_EMAIL`'s domain must be verified in Resend or nothing sends.
Re-run Lighthouse against the deployed URL; local numbers are in
[`DECISIONS.md`](DECISIONS.md) §8.

## Documents

- [`DECISIONS.md`](DECISIONS.md) — direction, tokens, what was inherited from the parent build, the risk taken, measured results
- [`PHASE-2.md`](PHASE-2.md) — the checkout and fulfilment plan
- [`CLIENT-TODO.md`](CLIENT-TODO.md) — every placeholder, grouped by what to collect
- [`ASSET-INVENTORY.md`](ASSET-INVENTORY.md) — what every image actually is
- [`reference/`](reference/) — the parent build's design record and the client's answers
