/**
 * Commerce layer — Phase 2 interface.
 *
 * Phase 1 ships the catalogue, a local-state cart, and email capture. Nothing
 * here is called yet. The signatures are fixed now so that Phase 2 is a
 * fill-in, not a refactor: the cart drawer already hands `CartState` to
 * `createCheckoutSession`, and the webhook route already expects
 * `handleStripeWebhook` and `handlePrintifyWebhook` to exist.
 *
 * See PHASE-2.md for the implementation plan, file list and env vars.
 */
import type { CartState } from "./cart";

// ---------------------------------------------------------------------------
// Types shared by Stripe and Printify steps
// ---------------------------------------------------------------------------

export interface Address {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  line1: string;
  line2?: string;
  city: string;
  region: string; // state code, e.g. "MN"
  postalCode: string;
  country: string; // ISO-2, e.g. "US"
}

export interface CheckoutSession {
  /** Stripe Checkout Session id. */
  id: string;
  /** Redirect the customer here. */
  url: string;
}

export interface PaidOrder {
  /** Our order reference, also written to Stripe metadata. */
  reference: string;
  stripeSessionId: string;
  stripePaymentIntentId: string;
  email: string;
  shipping: Address;
  lines: Array<{
    slug: string;
    colorway: string;
    size: string;
    quantity: number;
    unitPrice: number; // cents
    /** Printify variant id, resolved from content/printify-map.ts (Phase 2). */
    printifyVariantId: number;
    printifyProductId: string;
  }>;
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  currency: "usd";
}

export interface PrintifySubmission {
  printifyOrderId: string;
  status: "pending" | "on-hold" | "sending-to-production" | "in-production" | "fulfilled" | "canceled";
}

export type FulfillmentEvent =
  | { type: "order:created"; printifyOrderId: string; reference: string }
  | { type: "order:sent-to-production"; printifyOrderId: string }
  | { type: "order:shipment:created"; printifyOrderId: string; carrier: string; tracking: string; url?: string }
  | { type: "order:shipment:delivered"; printifyOrderId: string }
  | { type: "order:canceled"; printifyOrderId: string; reason?: string };

export class NotImplementedError extends Error {
  constructor(step: string) {
    super(`${step} is a Phase 2 feature. See PHASE-2.md.`);
    this.name = "NotImplementedError";
  }
}

/** True once Phase 2 is wired. The cart drawer reads this to decide which button to show. */
export const CHECKOUT_ENABLED = false;

// ---------------------------------------------------------------------------
// 1. Stripe Checkout
// ---------------------------------------------------------------------------

/**
 * Creates a Stripe Checkout Session for the cart and returns the redirect URL.
 *
 * Phase 2 implementation:
 *   - Re-price every line from content/products.ts on the server. Never trust
 *     client-side unit prices.
 *   - Apply `sizeUpcharge` per size.
 *   - `mode: "payment"`, `shipping_address_collection: { allowed_countries: ["US"] }`,
 *     `automatic_tax: { enabled: true }`, shipping options from Printify's
 *     shipping API for the cart's blanks.
 *   - Put `reference` and a JSON of `{slug, colorway, size, qty}` lines in
 *     `metadata` so the webhook can rebuild the order without a database.
 *   - `success_url: /order/{CHECKOUT_SESSION_ID}`, `cancel_url: /shop`.
 */
export async function createCheckoutSession(_cart: CartState, _origin: string): Promise<CheckoutSession> {
  throw new NotImplementedError("createCheckoutSession");
}

// ---------------------------------------------------------------------------
// 2. Stripe webhook → order
// ---------------------------------------------------------------------------

/**
 * Verifies the Stripe signature and, on `checkout.session.completed`, builds a
 * `PaidOrder` and hands it to `submitPrintifyOrder` and `sendOrderConfirmation`.
 *
 * Phase 2 implementation lives in app/api/webhooks/stripe/route.ts and calls
 * this with the raw body and the `stripe-signature` header. Idempotency: key
 * on `session.id`; Printify rejects duplicate `external_id`s, which is the
 * backstop.
 */
export async function handleStripeWebhook(_rawBody: string, _signature: string): Promise<PaidOrder | null> {
  throw new NotImplementedError("handleStripeWebhook");
}

// ---------------------------------------------------------------------------
// 3. Printify order submission
// ---------------------------------------------------------------------------

/**
 * POST /v1/shops/{shop_id}/orders.json with `external_id: order.reference`,
 * line items `{ product_id, variant_id, quantity }`, and the shipping address.
 * Then POST /orders/{id}/send_to_production.json.
 *
 * Do NOT auto-send to production until at least one test order has been
 * printed and inspected. Leave the order "on hold" and confirm manually for
 * the first drop. See PHASE-2.md §4.
 */
export async function submitPrintifyOrder(_order: PaidOrder): Promise<PrintifySubmission> {
  throw new NotImplementedError("submitPrintifyOrder");
}

// ---------------------------------------------------------------------------
// 4. Confirmation email
// ---------------------------------------------------------------------------

/** Sends emails/order-confirmation.ts via lib/email.ts. */
export async function sendOrderConfirmation(_order: PaidOrder): Promise<void> {
  throw new NotImplementedError("sendOrderConfirmation");
}

// ---------------------------------------------------------------------------
// 5. Printify fulfilment webhook
// ---------------------------------------------------------------------------

/**
 * Verifies the Printify HMAC and maps their event payload onto
 * `FulfillmentEvent`. On `order:shipment:created` sends the shipping email.
 * Route: app/api/webhooks/printify/route.ts.
 */
export async function handlePrintifyWebhook(_rawBody: string, _signature: string): Promise<FulfillmentEvent | null> {
  throw new NotImplementedError("handlePrintifyWebhook");
}
