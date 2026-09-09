"use client";

import { useEffect, useRef } from "react";
import { useCart } from "./CartProvider";
import { EmailCapture } from "@/components/forms/EmailCapture";
import { describeCart } from "@/lib/cart";


/**
 * Phase 1 checkout: nothing takes money. The modal says so plainly and
 * captures an email against the cart contents so the customer is first in
 * line when Drop 01 opens.
 */
export function CheckoutModal({ onClose }: { onClose: () => void }) {
  const { state } = useCart();
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="checkout-title" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="p-7 sm:p-8">

        <h2 id="checkout-title" ref={headingRef} tabIndex={-1} className="display mt-3 text-display-md text-paper outline-none">
          Checkout is coming soon.
        </h2>
        <p className="mt-4 text-body text-bone">
          This preview lets you explore the collection and try the cart. It does not place orders or take payment.
        </p>
        <div className="mt-6">
          <EmailCapture source="checkout" context={describeCart(state)} label="Email me when checkout opens" variant="stacked" />
        </div>
        <button type="button" onClick={onClose} className="eyebrow link-sweep mt-6 text-bone hover:text-paper">
          Back to the cart
        </button>
      </div>
    </div>
  );
}
