# Phase 2 — Checkout and fulfilment

Phase 1 (this build) ships the catalogue, a local-state cart, and email capture.
**Nothing on the site takes money.** Phase 2 turns the cart into a paid order that
Printify prints and ships. This document says exactly what remains, which files
to touch, and which environment variables are needed.

The interfaces are already written in [`lib/commerce.ts`](lib/commerce.ts). Every
function there throws `NotImplementedError` today and has a doc comment describing
its implementation. Phase 2 is a fill-in, not a refactor.

---

## 0. Before writing any code

These are business decisions, not engineering ones. Each one blocks a step below.

| Decision | Blocks |
|---|---|
| Which products are print-on-demand (Printify) and which ship from the client's own stock (the rhinestone hoodie) | §3, §5 |
| Printify blanks per product, and therefore real prices and 2XL/3XL upcharges | §1 (`sizeUpcharge`), `content/products.ts` |
| Return / exchange policy in plain words | Product page "Shipping and returns" disclosure, `/terms` |
| Sales tax registration (Minnesota nexus at minimum) | §1 (`automatic_tax`) |
| Business bank account for Stripe payouts, matching the legal entity name | Stripe onboarding |
| A test order printed and inspected before anything auto-sends to production | §3 |

## 1. Stripe Checkout

**Files**

- `lib/commerce.ts` → implement `createCheckoutSession(cart, origin)`
- `app/actions/checkout.ts` (new, `"use server"`): takes the cart, calls
  `createCheckoutSession`, returns `{ url }`
- `components/cart/CartDrawer.tsx`: when `CHECKOUT_ENABLED` is true, the button
  calls the action and `window.location.assign(url)` instead of opening the modal
- `content/printify-map.ts` (new): `{ [slug]: { productId, variants: { [colorway]: { [size]: variantId } } } }`
- `app/order/[session]/page.tsx` (new): success page. Reads the session from
  Stripe, shows what was bought and the email the receipt went to

**Rules**

1. Re-price every line on the server from `content/products.ts` +
   `sizeUpcharge`. Client unit prices are display only.
2. `mode: "payment"`, `shipping_address_collection: { allowed_countries: ["US"] }`.
   Expand later; Printify ships internationally but duties get complicated.
3. `automatic_tax: { enabled: true }` once tax registration exists.
4. `shipping_options` from Printify's shipping estimate for the cart's blanks,
   or a flat rate to start.
5. `metadata.reference` = our order reference (`MT-` + short id) and
   `metadata.lines` = JSON of `{slug, colorway, size, qty}` so the webhook can
   rebuild the order without a database.
6. `success_url: ${origin}/order/{CHECKOUT_SESSION_ID}`, `cancel_url: ${origin}/shop`.

**Env**: `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

## 2. Stripe webhook → order

**Files**

- `app/api/webhooks/stripe/route.ts` (new): `export const runtime = "nodejs"`,
  reads the raw body with `await req.text()`, passes it and the `stripe-signature`
  header to `handleStripeWebhook`
- `lib/commerce.ts` → implement `handleStripeWebhook(rawBody, signature)`

**Rules**

1. `stripe.webhooks.constructEvent(rawBody, signature, STRIPE_WEBHOOK_SECRET)`.
   Return 400 on failure.
2. Handle `checkout.session.completed` only. Ignore everything else with 200.
3. Build `PaidOrder` from `session.metadata`, `customer_details`, `shipping_details`.
4. Call `submitPrintifyOrder` then `sendOrderConfirmation`. If Printify fails,
   still return 200 to Stripe (the money is taken) and alert the owner by email
   — see §6.
5. Idempotency: Stripe retries. Use `session.id` as Printify `external_id`;
   Printify rejects duplicates, which is the backstop. A tiny KV (Vercel KV or
   a Resend-side log) is optional.

**Env**: `STRIPE_WEBHOOK_SECRET`

## 3. Printify order submission

**Files**

- `lib/printify.ts` (new): thin client over `https://api.printify.com/v1`
  with `Authorization: Bearer PRINTIFY_API_TOKEN`
- `lib/commerce.ts` → implement `submitPrintifyOrder(order)`

**Calls**

1. `POST /shops/{PRINTIFY_SHOP_ID}/orders.json` with `external_id`, `label`,
   `line_items: [{ product_id, variant_id, quantity }]`, `shipping_method: 1`,
   `send_shipping_notification: false` (we send our own), `address_to`.
2. **Do not** call `POST /orders/{id}/send_to_production.json` automatically
   for the first drop. Leave orders on hold and release them by hand from the
   Printify dashboard after checking each one. Automate only after a full drop
   has gone out cleanly.

**Stock line**: the rhinestone hoodie is not a Printify product. Orders that
contain it need a manual fulfilment path — at minimum an email to the owner
with the address and a line in the confirmation saying it ships from Minnesota.
`PaidOrder.lines[].printifyProductId` is optional for these; branch on
`product.line === "stock"`.

**Env**: `PRINTIFY_API_TOKEN`, `PRINTIFY_SHOP_ID`

## 4. Order confirmation email

**Files**

- `emails/order-confirmation.ts` (new): plain text + HTML, same register as
  `emails/waitlist.ts`. Lines, totals, shipping address, "made to order,
  about a week before it ships", the reference number
- `lib/commerce.ts` → implement `sendOrderConfirmation(order)` via
  `lib/email.ts`

**Env**: already present — `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`

## 5. Printify fulfilment webhook

**Files**

- `app/api/webhooks/printify/route.ts` (new)
- `lib/commerce.ts` → implement `handlePrintifyWebhook(rawBody, signature)`
- `emails/order-shipped.ts` (new): carrier, tracking link

**Rules**

1. Register the webhook in Printify for `order:shipment:created` and
   `order:shipment:delivered`. Verify the `X-Pfy-Signature` HMAC with
   `PRINTIFY_WEBHOOK_SECRET`.
2. Map the payload onto `FulfillmentEvent`. On `shipment:created`, email the
   customer with tracking. We need the customer email: either store
   `reference → email` at order time (KV) or include it in Printify's order
   `label`/`address_to` and read it back.

**Env**: `PRINTIFY_WEBHOOK_SECRET`

## 6. Operational safety

- **Owner alerts.** Any failure after payment (Printify down, variant mismatch)
  emails `CONTACT_TO_EMAIL` with the Stripe session id and the cart. Money
  taken with no order created is the failure mode that freezes a payment
  processor; make it loud.
- **Stripe Radar** defaults on. No manual review queue needed at this volume.
- **Test mode end-to-end** with Stripe test cards and Printify's sandbox flag
  before switching keys.
- **Flip `CHECKOUT_ENABLED`** in `lib/commerce.ts` last. Until then the modal
  keeps collecting emails, and the waitlist is the launch list.

## 7. Content changes that come with Phase 2

- `content/products.ts`: set `confirmed: true` per product as the client
  approves it; fill `sizeUpcharge`; replace mockups with photographs of the
  first printed run.
- `content/site.ts`: `drop.status: "open"`. The footer line and the hero's
  status pill read from it.
- `/privacy`: add the payment-processor paragraph. `/terms` (new): returns,
  made-to-order exchange policy, contact for problems.

## Environment summary

```
# Phase 1 (live)
NEXT_PUBLIC_SITE_URL
RESEND_API_KEY
WAITLIST_TO_EMAIL
CONTACT_TO_EMAIL
CONTACT_FROM_EMAIL
RESEND_AUDIENCE_ID          (optional)

# Phase 2
STRIPE_SECRET_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_WEBHOOK_SECRET
PRINTIFY_API_TOKEN
PRINTIFY_SHOP_ID
PRINTIFY_WEBHOOK_SECRET
```

All of them are listed, commented, in [`.env.example`](.env.example).
