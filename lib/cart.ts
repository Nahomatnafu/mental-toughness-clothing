/**
 * Cart domain logic. Pure functions, no React, no storage.
 * The brief forbids localStorage: the cart lives in React state for the tab.
 */
import type { Product, Size } from "@/content/products";

export interface CartLine {
  /** `${slug}:${colorway}:${size}` — one line per variant. */
  key: string;
  slug: string;
  name: string;
  colorway: { slug: string; name: string; hex: string };
  size: Size;
  /** Unit price in cents, including any size upcharge. */
  unitPrice: number;
  quantity: number;
  /** ImageKey of the thumbnail, if the colourway has imagery. */
  imageKey?: string;
}

export type CartAction =
  | { type: "add"; line: Omit<CartLine, "key" | "quantity">; quantity?: number }
  | { type: "setQuantity"; key: string; quantity: number }
  | { type: "remove"; key: string }
  | { type: "clear" };

export interface CartState {
  lines: CartLine[];
}

export const emptyCart: CartState = { lines: [] };

export const MAX_PER_LINE = 10;

export function lineKey(slug: string, colorway: string, size: string): string {
  return `${slug}:${colorway}:${size}`;
}

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "add": {
      const key = lineKey(action.line.slug, action.line.colorway.slug, action.line.size);
      const qty = Math.max(1, action.quantity ?? 1);
      const existing = state.lines.find((l) => l.key === key);
      if (existing) {
        return {
          lines: state.lines.map((l) =>
            l.key === key ? { ...l, quantity: Math.min(MAX_PER_LINE, l.quantity + qty) } : l,
          ),
        };
      }
      return { lines: [...state.lines, { ...action.line, key, quantity: Math.min(MAX_PER_LINE, qty) }] };
    }
    case "setQuantity": {
      if (action.quantity <= 0) return { lines: state.lines.filter((l) => l.key !== action.key) };
      return {
        lines: state.lines.map((l) =>
          l.key === action.key ? { ...l, quantity: Math.min(MAX_PER_LINE, action.quantity) } : l,
        ),
      };
    }
    case "remove":
      return { lines: state.lines.filter((l) => l.key !== action.key) };
    case "clear":
      return emptyCart;
  }
}

export function cartCount(state: CartState): number {
  return state.lines.reduce((n, l) => n + l.quantity, 0);
}

export function cartSubtotal(state: CartState): number {
  return state.lines.reduce((n, l) => n + l.unitPrice * l.quantity, 0);
}

/** Unit price for a size, applying the upcharge once the client sets one. */
export function unitPriceFor(product: Product, size: Size): number {
  const up = product.sizeUpcharge?.[size] ?? 0;
  return product.price + up;
}

/** Plain-text summary for the checkout-interest email. */
export function describeCart(state: CartState): string {
  if (state.lines.length === 0) return "(empty cart)";
  return state.lines
    .map((l) => `${l.quantity} × ${l.name} — ${l.colorway.name} / ${l.size}`)
    .join("\n");
}
