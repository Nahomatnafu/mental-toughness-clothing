"use client";

import { useCart } from "./CartProvider";

export function CartButton() {
  const { count, open } = useCart();
  return (
    <button
      type="button"
      onClick={open}
      className="link-sweep eyebrow tabular inline-flex min-h-11 items-center gap-1 text-paper"
      aria-label={`Open cart, ${count} ${count === 1 ? "item" : "items"}`}
      aria-haspopup="dialog"
    >
      Cart <span className={count > 0 ? "text-ember" : "text-bone"}>({count})</span>
    </button>
  );
}
