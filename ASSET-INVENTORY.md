# Asset inventory — read before writing `content/products.ts`

Every file in `/assets` was opened and looked at, not just listed. The headline:

> **Only one image in this repository is a photograph of a physical Mental
> Toughness garment.** Everything else in the product set is a 3D mockup render,
> and the renders show a **different design** than the real garment.

The build spec is explicit about why this matters — *"a customer who receives a
product that does not match the photo is a chargeback, and a brand that has not
shot its products yet should look unfinished rather than fraudulent."* That
sentence applies directly to this library. See "The conflict" below.

---

## Tier 1 — real physical stock (1 image)

| File | What it is |
|---|---|
| `assets/derived/mt-hoodie-red.webp` | Red pullover hoodie, **rhinestone/bling** work: TM monogram across the chest, rhinestone US flag on the left sleeve, **rhinestone outline of Minnesota** on the right sleeve, scattered rhinestones across the hood and pocket. Background already keyed out. |

This is a photograph of a garment that exists. It is the single most trustworthy
image in the library and it is the origin of the brand red (`#9C2736`, sampled
mid-chest). `assets/derived/hoodie-v2-preview.png` is a cut-out working file of
the same garment.

## Tier 2 — mockup renders (12 images)

Template renders, not photographs. Identical garment geometry recoloured per
colourway, with flat vector artwork composited on.

| Files | Garment | Backdrop | Artwork on the render |
|---|---|---|---|
| `red-hoodie-{front,back}.jpg` | Pullover hoodie | Black gradient | Small flat TM at left chest · flat US flag on left sleeve · "MENTAL TOUGHNESS" set vertically down the right sleeve in a serif |
| `white-hoodie-{front,back}.jpg` | Pullover hoodie | Black gradient | Same, in black |
| `black-hoodie-{front,back}.jpg` | Pullover hoodie | **Red** | Same, in white |
| `blue-shirt-{front,back}.jpg` | Boxy short-sleeve tee | Black | Large red-and-white TM monogram, centre chest |
| `black-pants-{front,back}.jpg` | Cuffed **joggers** | Red | Circular "MENTAL TOUGHNESS · STAY STRONG" badge, right thigh |
| `black-shorts-{front,back}.jpg` | Sweat shorts | Red | Same circular badge, right leg |

Two things to check with the client before these ship:

- **The blue tee's neck label reads "Süllohe"** — a third-party blank. If that is
  a stock mockup template rather than the brand's chosen blank, the neck label is
  wrong.
- **The sleeve wordmark on `white-hoodie-front.jpg` appears to read "TOUGHNESSS"**
  with a trailing extra S. Worth a look at full size before it goes in front of
  anyone.

## Tier 3 — lifestyle / founder (5 images, likeness-restricted)

| File | What it is | Status |
|---|---|---|
| `millz_01.png` | Founder in an **orange bucket hat** with the TM logo, plus a tank with a TM chest print. Heavy orange colour cast. | Source of the merch orange `#FE732E`. Real merch, worn. |
| `millz_02.jpg` | Boxing / fight photo | Parent build **excluded** it — see `DECISIONS.md` §7.3 |
| `millz_03.jpg` | Social-media screenshot, has interface chrome and a watermark | Parent build **excluded** it — §7.4 |
| `hero-01.jpg` | Real product, worn by real people, shot by the brand | The one lifestyle image the parent trusted |
| `hero-02.jpg` | Lifestyle | Contributed the orange sample |
| `customer_01.jpg` | Customer photo | Unverified |

`DECISIONS.md` §7 records that there is **no signed release** on the people in
these. The parent site worked around it by going type-led. A storefront has more
appetite for lifestyle imagery — but the release question is unresolved, and it
is in `reference/CLIENT-TODO.md`.

## The logo — a hard ceiling

`assets/logo.jpg` is **359×500, black on white**. Parent `DECISIONS.md` §7
measured the usable ceiling at roughly **138px** before the keyed monogram goes
soft.

That was survivable on the parent site, where the mark is a small structural
accent. **It is a real problem here.** A streetwear storefront wants the monogram
large — hero lockup, watermarks, favicons, OG images. Assume you cannot exceed
138px from this source, and design accordingly, or trace an SVG. An SVG is
already requested in `reference/CLIENT-TODO.md`; it is now blocking rather than
nice-to-have.

The mark itself is a hexagonal shield with an interlocked **T over M**, reading
as a helmet. It is genuinely distinctive and it appears on every real product.

---

## The conflict — needs a client answer

The rhinestone hoodie and the mockup renders are **not the same product line**:

| | Real garment (Tier 1) | Renders (Tier 2) |
|---|---|---|
| Decoration | Rhinestone / bling | Flat print or vinyl |
| Chest mark | Large rhinestone TM | Small flat TM |
| Left sleeve | Rhinestone US flag | Flat US flag |
| Right sleeve | **Rhinestone Minnesota outline** | "MENTAL TOUGHNESS" wordmark |

The client answered "**Both**" when asked whether he holds inventory or uses
print-on-demand ([`reference/CLIENT-ANSWERS.md`](reference/CLIENT-ANSWERS.md)),
which is consistent with two lines existing — a bling line he stocks, and a POD
line. But the spec assumes a single Printify catalogue, and no image is labelled
as belonging to either line.

**Do not silently merge them into one catalogue.** Until the client confirms,
treat the renders as *proposed* artwork and the rhinestone hoodie as *actual*
stock, and label them that way in the data model.

## Coverage against the spec's catalogue

The spec's placeholder catalogue is eight products. Actual coverage:

| Product | Imagery available |
|---|---|
| Heavyweight Hoodie | ✅ Renders in 3 colourways + **1 real photo** — this is the featured product |
| Core Tee | ⚠️ Blue render only. The spec's palette is red/black; a blue hero tee is off-brand |
| Sweatpants | ⚠️ Render only — and they are **joggers**, so rename or reshoot |
| Tank Top | ⚠️ Visible on the founder in `millz_01.png`, no product shot |
| Dad Hat | ⚠️ A **bucket** hat exists in `millz_01.png`, not a dad hat |
| Long Sleeve Tee | ❌ Nothing |
| Crewneck Sweatshirt | ❌ Nothing |
| Beanie | ❌ Nothing |

**Not in the spec but photographed:** sweat **shorts** (`black-shorts-*`). The
founder is described wearing "Mental Toughness patterned shorts" in the parent's
`content/founder.ts`. Shorts should probably be a ninth product.

So: **1 of 8 products has a real photograph.** Three have nothing at all. Per the
spec, those render as labelled placeholders at correct aspect ratio — do not
invent product images to fill the grid.

Design consequence: the spec already calls for an editorial layout that varies
scale and lets one product be large. That is fortunate. **Let the real rhinestone
hoodie be the large one.** The layout should be built so a sparse catalogue reads
as deliberate rather than empty.
