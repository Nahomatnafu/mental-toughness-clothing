# BUILD PROMPT — Mental Toughness Clothing

> Paste everything below the line into Claude Code as a single message.
> **Run this second.** It depends on `DECISIONS.md` from the MILLZ Global build.
> Assumes `frontend-design` skill is active and assets are in `/assets`.

---

## Project

Build a complete, production-ready storefront for **Mental Toughness Clothing**, a mental-health-awareness streetwear brand operating under MILLZ Global Solutions LLC in Minnesota.

**Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS, Vercel. Product data in typed config under `/content/products.ts`. Fulfillment is Printify print-on-demand.

**Build it in one pass.** Plan, then write every file. Do not stop to ask questions — decide, log it in `DECISIONS.md`, continue.

## Sibling site relationship

This is the second of two complementary sites. Before you design anything, read `DECISIONS.md` from the MILLZ Global Solutions build and pull out:

- The exact red hex value
- The type scale
- The border-radius and spacing scale

**Reuse the red exactly.** Invert its role: the parent site is light-dominant with red as a rare structural accent. This site is **black-dominant with red carrying real weight.** Same pigment, opposite temperature. Someone who visits both should feel the relationship without being able to name it.

You may — and should — use a different display typeface here. Keep the body face shared. Sibling brands, not clones.

## Brand

Mental Toughness is about continuing when stopping would be easier. Mental health and physical health as the same fight. The person wearing it is doing the work anyway.

This is **not** a hustle-culture brand. Avoid "no excuses," "grind," "rise and grind," "beast mode," "pain is weakness leaving the body." That vocabulary is the opposite of what a mental-health-aware brand should sound like — it's the thing people wearing this are recovering from. The register is quieter and harder: someone who has actually been through something, not someone yelling about it.

## Aesthetic direction

Red and black is specified by the client, so that constraint is fixed. The risk is that red-and-black streetwear is a well-worn look. Your job is to do it with more restraint than the category default.

- **Palette:** black-dominant. The inherited red as the primary accent. One neutral for body text that is not pure white — pick an off-white or warm grey with a slight cast. Consider one unexpected tertiary used in a single place.
- **Typography:** the display face should feel physical and confident. Do not use Inter, Roboto, Arial, Space Grotesk, Poppins, Montserrat, Bebas Neue, Oswald, or Anton. Streetwear defaults to heavy condensed sans — if you go there, do something specific with it rather than setting it and moving on. A wide or unusually-proportioned face would be more interesting than another condensed one.
- **Layout:** editorial rather than e-commerce-template. Product grids of identical rounded cards are the failure mode. Vary scale. Let one product be large. Break the grid.
- **Motion:** more permitted here than on the parent site, but earn it. One orchestrated moment beats scattered hover effects.
- **Signature element:** the brand's core idea is continuing under load. Find a way to express that structurally in the interface — not as a slogan in a hero, and not as a heartbeat line or mountain graphic.

Take one real risk. Justify it in `DECISIONS.md`.

## Assets

Read `/assets` first. Contains logo files and apparel photography.

- Derive exact colors from the logo, overriding my description if they conflict.
- Use real product photography everywhere it exists.
- Where a product has no photo: render a labeled placeholder at correct aspect ratio. **Do not generate fake product images or AI-generated models.** A customer who receives a product that does not match the photo is a chargeback, and a brand that has not shot its products yet should look unfinished rather than fraudulent.
- Optimize with `next/image`. Real alt text describing the garment and print.

## Commerce approach — read this carefully

Do not build a full checkout in this pass. Build **Phase 1**, and structure the code so Phase 2 drops in cleanly.

**Phase 1 (build now):**
- Full product catalog with detail pages
- Size, color, and price display
- A "Notify me" email capture on every product and a launch waitlist on the homepage
- Cart UI built and functional in local state — but the checkout button opens a modal saying the first drop is coming and captures an email

**Phase 2 (stub only — write the interfaces, comment the implementation):**
- Stripe Checkout
- Printify Order API submission on payment success
- Order confirmation email
- Webhook handler for fulfillment status

Write `PHASE-2.md` describing exactly what remains, which files to touch, and which env vars are needed. Structure `lib/commerce.ts` with typed function signatures so the real implementation is a fill-in, not a refactor.

Reason: launching a store that takes money before fulfillment is tested is how a new brand gets its payment processor frozen. Waitlist first is also better marketing — a drop with a list behind it outperforms a store that is quietly always open.

## Products

Use these as **placeholder** catalog entries, each flagged `// PLACEHOLDER — confirm with client`. Pricing reflects Printify base costs at roughly 40–50% gross margin, positioned as mid-tier streetwear rather than budget POD:

| Product | Price |
|---|---|
| Core Tee | $32 |
| Long Sleeve Tee | $40 |
| Heavyweight Hoodie | $65 |
| Crewneck Sweatshirt | $55 |
| Sweatpants | $58 |
| Dad Hat | $30 |
| Beanie | $28 |
| Tank Top | $28 |

Sizes S–3XL. Note in the data model that 2XL and 3XL carry higher Printify base cost — include an optional `sizeUpcharge` field, set to null for now.

Write real product copy for each: two or three sentences on fabric, fit, and the print. No filler.

## Pages

- **`/`** — Hero, featured product, full collection, brand story, waitlist capture, footer
- **`/shop`** — Full catalog with filtering by category
- **`/product/[slug]`** — Gallery, size selector, size guide, description, care instructions, add to cart
- **`/about`** — The brand story and its connection to mental health. Write this carefully. It should sound like a person, not a mission statement. `PLACEHOLDER` for the founder's personal connection — flag it prominently, because that paragraph is what makes this brand real and only the client can write it.
- **`/contact`** — Form, plus a clear link back to MILLZ Global Solutions

Every page links back to the parent company in the footer. Explicit corporate relationship — it matters for the loan context.

## Mental health responsibility

The brand references mental health. Handle that seriously:

- The About page should include a short, non-preachy line acknowledging that clothing is not treatment, and link to a real resource. Use the 988 Suicide & Crisis Lifeline.
- Do not use mental illness as an aesthetic. No sad-boy styling, no diagnostic language as a design motif, no romanticizing struggle.
- Do not make health claims of any kind.

## Technical requirements

- Lighthouse 95+ performance, 100 accessibility.
- Full metadata, OG images per product, `sitemap.ts`, `robots.ts`.
- JSON-LD `Product` schema on detail pages.
- WCAG AA. Red on black frequently fails contrast — test it, and adjust the red's lightness for text use while keeping the brand red for large fills. Document both values as separate tokens.
- Mobile-first. 375px, 768px, 1440px.
- No `localStorage`. Cart in React state only.
- Email capture posts to a server action → Resend. `.env.example` included.

## Deliverables

1. Complete working site.
2. `DECISIONS.md` — direction, tokens, which values were inherited from the parent build, the risk taken.
3. `PHASE-2.md` — the checkout implementation plan.
4. `CLIENT-TODO.md` — every placeholder grouped by what to collect.
5. `README.md`.

## Process

Read the parent site's `DECISIONS.md` first. Plan the design system, deliberately check it against the AI-design calibration note in the frontend-design skill, and revise anything that is a category default rather than a choice for this brand. Then build.

Review your own work against this brief before declaring it done.
