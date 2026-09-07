"use client";

import { useEffect, useRef } from "react";
import { useCart } from "./CartProvider";
import { EmailCapture } from "@/components/forms/EmailCapture";
import { describeCart } from "@/lib/cart";
import { site } from "@/content/site";

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
        <p className="eyebrow text-ember">{site.drop.name}</p>
        <h2 id="checkout-title" ref={headingRef} tabIndex={-1} className="display mt-3 text-display-md text-paper outline-none">
          The first drop hasn’t opened yet.
        </h2>
        <p className="mt-4 text-body text-bone">
          We’re not taking payment until the first run is printed and checked. Leave an email and you’ll hear before
          anyone else, with what you picked already in the note.
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
