"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCart } from "./CartProvider";
import { CheckoutModal } from "./CheckoutModal";
import { Button } from "@/components/ui/Button";
import { images, type ImageKey } from "@/content/image-manifest";
import { formatPrice } from "@/lib/money";
import { CHECKOUT_ENABLED } from "@/lib/commerce";

export function CartDrawer() {
  const { state, count, subtotal, dispatch, isOpen, close, lastAdded } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);

  // Focus management: move focus in on open, restore on close, Escape closes.
  useEffect(() => {
    if (!isOpen) return;
    restoreFocus.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !checkoutOpen) close();
      if (e.key === "Tab" && !checkoutOpen) {
        const focusable = Array.from(panelRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), [tabindex="0"]') ?? []).filter(el => el.offsetParent !== null);
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      restoreFocus.current?.focus?.();
    };
  }, [isOpen, close, checkoutOpen]);

  return (
    <>
      <div className="scrim" data-open={isOpen} onClick={close} aria-hidden="true" />
      <div
        ref={panelRef}
        className="drawer"
        data-open={isOpen}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        aria-hidden={!isOpen}
        inert={!isOpen || checkoutOpen}
      >
        <div className="flex items-center justify-between border-b border-rule px-6 py-5">
          <h2 id="cart-title" className="display-narrow text-display-sm text-paper">
            Cart <span className="tabular text-bone">({count})</span>
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            className="eyebrow link-sweep text-bone hover:text-paper"
            tabIndex={isOpen ? 0 : -1}
          >
            Close
          </button>
        </div>

        <p className="sr-only" role="status" aria-live="polite">
          {lastAdded && isOpen && count > 0 ? `${lastAdded} added to cart.` : ""}
        </p>

        <div className="flex-1 overflow-y-auto px-6">
          {state.lines.length === 0 ? (
            <div className="py-12">
              <p className="text-body text-bone">Nothing in here yet.</p>
              <Link href="/shop" onClick={close} className="link-sweep mt-4 inline-block text-paper" tabIndex={isOpen ? 0 : -1}>
                Start with the hoodie →
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-rule">
              {state.lines.map((line) => {
                const img = line.imageKey ? images[line.imageKey as ImageKey] : undefined;
                return (
                  <li key={line.key} className="flex gap-4 py-5">
                    <div className="frame frame-contain h-24 w-20 shrink-0 bg-ink-3" style={{ "--cut": "8px" } as React.CSSProperties}>
                      {img ? (
                        <Image src={img.src} alt="" width={img.width} height={img.height} sizes="80px" className="h-full w-full object-contain p-1" />
                      ) : (
                        <div className="hatch h-full w-full" aria-hidden="true" />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <Link href={`/product/${line.slug}?color=${line.colorway.slug}`} onClick={close} className="display-narrow text-display-xs text-paper hover:text-ember" tabIndex={isOpen ? 0 : -1}>
                            {line.name}
                          </Link>
                          <p className="eyebrow mt-1 text-bone">
                            {line.colorway.name} · {line.size}
                          </p>
                          {line.imageKey?.startsWith("concept-") ? <p className="eyebrow mt-1 text-ash">AI concept preview</p> : null}
                        </div>
                        <p className="eyebrow tabular text-paper">{formatPrice(line.unitPrice * line.quantity)}</p>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <div className="inline-flex items-center border border-rule-strong" role="group" aria-label={`Quantity for ${line.name}`}>
                          <button
                            type="button"
                            className="h-9 w-9 text-bone hover:bg-ink-3 hover:text-paper"
                            aria-label="Decrease quantity"
                            onClick={() => dispatch({ type: "setQuantity", key: line.key, quantity: line.quantity - 1 })}
                            tabIndex={isOpen ? 0 : -1}
                          >
                            −
                          </button>
                          <span className="eyebrow tabular w-8 text-center text-paper" aria-live="polite">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            className="h-9 w-9 text-bone hover:bg-ink-3 hover:text-paper"
                            aria-label="Increase quantity"
                            onClick={() => dispatch({ type: "setQuantity", key: line.key, quantity: line.quantity + 1 })}
                            tabIndex={isOpen ? 0 : -1}
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          className="eyebrow link-sweep text-bone hover:text-paper"
                          onClick={() => dispatch({ type: "remove", key: line.key })}
                          tabIndex={isOpen ? 0 : -1}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {state.lines.length > 0 ? (
          <div className="border-t border-rule px-6 py-5">
            <div className="flex items-baseline justify-between">
              <span className="eyebrow text-bone">Subtotal</span>
              <span className="display-narrow tabular text-display-sm text-paper">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-2 text-body-sm text-bone">Shipping and tax are worked out at checkout. Checkout opens with Drop 01.</p>
            <Button block className="mt-5" onClick={() => setCheckoutOpen(true)} tabIndex={isOpen ? 0 : -1}>
              {CHECKOUT_ENABLED ? "Checkout" : "Checkout — get notified"}
            </Button>
            <p className="eyebrow mt-3 text-center text-ash">This cart lives in this tab. Close it and it’s gone.</p>
          </div>
        ) : null}
      </div>

      {checkoutOpen ? <CheckoutModal onClose={() => setCheckoutOpen(false)} /> : null}
    </>
  );
}
