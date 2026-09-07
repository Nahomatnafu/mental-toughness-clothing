# Client to-do — Mental Toughness Clothing

**Imagery update, September 7, 2026:** All 11 previously empty colorways now
have owner-approved AI concept previews. The photography tasks below still
apply to production images. Review the concepts' colors, garment blanks and
logo placement before using them as a manufacturing reference.


Everything on this site that is a placeholder, an estimate, or waiting on the
client, grouped by what needs collecting. The parent site's own list is in
[`reference/CLIENT-TODO.md`](reference/CLIENT-TODO.md); items that affect both
sites are marked **(both)**.

Nothing here stops the site from being reviewed. Items in §1–§3 stop it from
being *launched*.

---

## 1. Decisions — one answer each

### 1.1 Which product line is the store selling?

The repository holds two different product designs (see
[`ASSET-INVENTORY.md`](ASSET-INVENTORY.md)):

- a **rhinestone hoodie** that physically exists and is photographed, and
- **twelve mockup renders** of a printed line with different artwork.

The site shows both, labelled as two lines — "In stock · rhinestone" and
"Drop 01 · print" — and never merges them. Confirm that is right, or say which
one goes.

### 1.2 The domain

The site assumes **`mentaltoughnessclothing.shop`**, because the parent site
already points there. It drives every canonical URL, the sitemap, robots and the
Open Graph tags. Confirm the domain, and what (if anything) is currently hosted
on it. Set `NEXT_PUBLIC_SITE_URL` if it changes.

### 1.3 The legal name **(both)**

The footer and About page say **"a Millz Global LLC company"** — the exact
registered name the client gave. The original brief said "MILLZ Global
Solutions LLC". Those cannot both be right without an assumed-name filing.
One edit in `content/site.ts` once resolved.

### 1.4 The rhinestone hoodie's price

Listed at **$95** as an estimate. The brief priced a *printed* hoodie at $65;
rhinestone transfer on a heavyweight blank costs more. Replace with the real
figure.

### 1.5 Where the site's email goes

The waitlist, notify-me and contact forms deliver to `WAITLIST_TO_EMAIL` /
`CONTACT_TO_EMAIL`. **Neither is set.** Until they are, submissions are logged in
development and fail with an honest message in production. Any working inbox is
fine to start. Also needed: a Resend account with the sending domain verified
(`RESEND_API_KEY`, `CONTACT_FROM_EMAIL`).

## 2. Words only the client can write

### 2.1 The founder's paragraph on /about — **the most important item**

There is a visible, labelled placeholder on the About page where the founder
says in his own words what the name means to him and where it came from. His
questionnaire answer — that it came to him after his mother passed away and helps
him daily — is the seed. It was **deliberately not published**: it is personal,
and it should be his words with his consent. Two to four sentences, written or
dictated, and permission to publish them.

### 2.2 Confirm the founder's name and title

"Millz Johnson, founder" appears on the home page (as attribution on his own
quote) and on About. Both are from his questionnaire. Confirm.

## 3. Photographs and permissions

### 3.1 Model releases **(both)**

The client confirmed he has **no written permission** from the people in
`hero-01.jpg`, `hero-02.jpg` and `customer_01.jpg`. **None of them are on the
site**, and the image pipeline does not even copy them into the public folder.
Once releases are signed: run `npm run images -- --include-unreleased` and add
them to the hero or About page. `hero-01.jpg` is the strongest lifestyle image
the brand has.

### 3.2 The founder's own photo

`millz_01.png` (bucket hat, tank) is used on About. His consent covers his own
boxing images explicitly; this frame was not asked about specifically. A yes,
or a different portrait he prefers.

### 3.3 A vector logo **(both)**

`logo.jpg` is 359×500. The site uses an **SVG traced from it**
(`public/images/brand/monogram.svg`) so the mark can be any size. The trace is
faithful but a designer's original vector will have exact geometry. Ask whoever
made the mark for an `.svg` or `.ai` file.

### 3.4 Product photography

Only the rhinestone hoodie is photographed, front only. Everything else is a
labelled 3D mockup or a labelled placeholder. Before the drop ships:

- Photograph the **first printed samples** of every piece, front and back, on a
  plain background. Phone photos are fine.
- A **back and a detail shot** of the rhinestone hoodie.
- Five products have **no imagery at all**: Long Sleeve Tee, Crewneck
  Sweatshirt, Tank Top, Bucket Hat, Beanie.

## 4. Catalogue — every entry is `confirmed: false`

All prices are Printify-cost estimates at 40–50% margin. Confirm or change each,
in `content/products.ts`.

| Product | Price | Notes |
|---|---|---|
| Rhinestone Hoodie | $95 | Estimate — see §1.4. Quantity on hand unknown. |
| Heavyweight Hoodie | $65 | Renders show **two spelling errors**: the back reads "MENTAL TOUGHNES" and the white sleeve appears to read "TOUGHNESSS". Fix the artwork before printing. |
| Core Tee | $32 | Only render is **royal blue**, off the red/black palette. Neck label in the render reads "Süllohe" — a template blank. |
| Long Sleeve Tee | $40 | No imagery. |
| Crewneck Sweatshirt | $55 | No imagery. |
| Fleece Joggers | $58 | Brief said "Sweatpants"; the render is a cuffed jogger, so named for what is shown. |
| Sweat Shorts | $45 | **Not in the brief.** Added because a render exists. Keep or drop. |
| Tank Top | $28 | No product shot; visible on the founder only. |
| Bucket Hat | $32 | **Replaces the brief's Dad Hat** — the only hat that exists in any photo is a bucket hat. Confirm which. |
| Beanie | $28 | No imagery. |

Also needed, per product:

- **The Printify blank** for each. Fabric weights in the descriptions are
  written to match the renders and are placeholders until then.
- **2XL/3XL upcharge.** The field exists (`sizeUpcharge`) and is `null`.
- **Size guide figures.** Typical for the garment type; replace with the
  blank's spec sheet (`content/size-guide.ts`).
- **Colourways.** Several are listed with "no image" and a note. Confirm the
  drop's actual colours.

## 5. Facts published that need a yes

- **Phone number** `(507) 456-5565` and hours `2:30–5:30 pm Central` — given for
  the parent site; confirm they should appear on the apparel site too.
- **In-person sales**: "River Hills Mall, Mankato" and "county fairs" — from the
  questionnaire. Confirm the mall arrangement is current and can be named.
- **Social links**: TikTok `@toughclothin` (confirmed yours) and Snapchat
  `toughclothing`. No Instagram is linked — the only handle given
  (`millz_training`) is the training account. Is there a brand Instagram?
- **Reply time** "within a couple of business days" on the contact form.
- **Shipping/returns** disclosure on product pages is a plausible default
  ("made to order, about a week; exchange-only for sizing"). Confirm or rewrite.

## 6. Legal, before launch

- **Privacy page** (`/privacy`) is a plain-language description of the real data
  flow. Have a lawyer read it.
- **Terms** page does not exist yet; needed once checkout opens (PHASE-2.md §7).
- **Printify's terms** on returns for made-to-order goods should shape the
  returns copy.

## 7. Technical, for the developer

- Set env vars in Vercel: `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`,
  `WAITLIST_TO_EMAIL`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.
- Re-run Lighthouse against the deployed URL; local figures are in
  DECISIONS.md §8.
- `public/images/**`, `content/image-manifest.ts`, `app/apple-icon.png` and
  `components/brand/monogram-path.ts` are generated by `npm run images` and
  `npm run trace-logo`. They are committed so Vercel needs no build step for
  them; re-run after adding photographs.
- `app/fonts/*.woff2` are subsetted variable fonts generated by `npm run fonts`
  (see DECISIONS.md §8). Re-run only if the type system changes — e.g. a new
  weight or a wider width than 125.
