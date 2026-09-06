# Mental Toughness Clothing

Storefront for **Mental Toughness Clothing**, a mental-health-awareness
streetwear brand operating under MILLZ Global Solutions LLC in Minnesota.

Sibling to the parent company site at
[Nahomatnafu/millz-global](https://github.com/Nahomatnafu/millz-global).

> **Status: set up, not built.** This repository currently contains the build
> brief, the brand's photography, and the reference material carried over from
> the parent build. No application code has been written yet.

---

## What is here

```
prompt-mental-toughness.md     The build brief. Run this.
ASSET-INVENTORY.md             What every image actually is. Read before products.ts.
assets/                        All brand photography (see inventory — read it)
  derived/                     Cut-outs produced during the parent build
reference/
  INHERITED-TOKENS.md          Distilled palette, contrast and type decisions
  DECISIONS.md                 Parent build's full design record (authoritative)
  CLIENT-ANSWERS.md            The client in his own words — brand voice source
  CLIENT-QUESTIONS.md          The questionnaire those answers respond to
  CLIENT-TODO.md               Outstanding items on the parent site
  CONTENT-PLAN.md              Parent content strategy
  prompt-millz-global.md       The sibling brief, for context
```

## Running the build

1. Read [`ASSET-INVENTORY.md`](ASSET-INVENTORY.md) — **first**. It is the
   difference between a catalogue that is honest and one that gets the client a
   chargeback. It documents a real conflict between the photographed stock and
   the mockup renders that needs a decision.
2. Read [`reference/INHERITED-TOKENS.md`](reference/INHERITED-TOKENS.md) for the
   palette and type inheritance, then
   [`reference/DECISIONS.md`](reference/DECISIONS.md) §2, §2.1, §2.2 and §3 for
   the reasoning behind it.
3. Read [`prompt-mental-toughness.md`](prompt-mental-toughness.md) and build it.

Target stack per the brief: Next.js 15 App Router, TypeScript, Tailwind, Vercel.
Product data as typed config in `content/products.ts`. Fulfillment via Printify.
Phase 1 is catalogue plus waitlist — **no live checkout**, by design.

## Open questions blocking a finished build

These are decisions only the client can make. The build proceeds around them with
labelled placeholders, but they should be raised at the review:

1. **Which product line is the store selling?** Rhinestone stock, the printed
   mockups, or both as separate collections. See the conflict table in
   [`ASSET-INVENTORY.md`](ASSET-INVENTORY.md).
2. **What is at `mentaltoughnessclothing.shop`?** The parent site already links
   the apparel division there, but the client's own answer says the store is only
   "in progress". Replace, or build alongside?
3. **A vector logo.** `logo.jpg` is 359×500 and caps clean rendering at ~138px.
   Too small for a storefront.
4. **Photo releases** for the people in the lifestyle images.
5. **The founder's paragraph on the About page.** The brief flags this
   deliberately: it is the passage that makes the brand real, and only he can
   write it. His answer in `reference/CLIENT-ANSWERS.md` — the name came to him
   after his mother passed away — is the seed, but it should be his words on the
   page, with his consent to publish something that personal.

## A note on scope

The brief asks for restraint, not volume. Red-and-black streetwear is a well-worn
look, and the failure mode it names is a grid of identical rounded product cards.
With only one genuinely photographed product, a sparse editorial layout is both
the honest choice and the better-looking one.
