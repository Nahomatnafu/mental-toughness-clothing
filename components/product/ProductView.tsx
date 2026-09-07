"use client";

import Image from "next/image";
import { useId, useState, type ReactNode } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { EmailCapture } from "@/components/forms/EmailCapture";
import { Button } from "@/components/ui/Button";
import { LineTag } from "@/components/ui/Tag";
import { Placeholder } from "@/components/ui/Placeholder";
import { imageMeta, placeholderAspect, type Product, type Size } from "@/content/products";
import { unitPriceFor } from "@/lib/cart";
import { formatPrice } from "@/lib/money";

interface ProductViewProps {
  product: Product;
  /** Server-rendered description, specs and disclosures, shown under the purchase panel. */
  children: ReactNode;
}

/**
 * Gallery + purchase panel. Client component because colourway, size and
 * quantity are shared state between the two halves.
 */
export function ProductView({ product, children }: ProductViewProps) {
  const id = useId();
  const { dispatch } = useCart();

  const firstWithImages = product.colorways.find((c) => c.images.length > 0) ?? product.colorways[0];
  const [colorwaySlug, setColorwaySlug] = useState(firstWithImages?.slug ?? "");
  const colorway = product.colorways.find((c) => c.slug === colorwaySlug) ?? firstWithImages;
  const [view, setView] = useState(0);
  const [size, setSize] = useState<Size | null>(product.sizes.length === 1 ? (product.sizes[0] ?? null) : null);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);

  const images = colorway?.images ?? [];
  const current = images[Math.min(view, Math.max(0, images.length - 1))];
  const price = size ? unitPriceFor(product, size) : product.price;

  function addToCart() {
    if (!size || !colorway) {
      setSizeError(true);
      document.getElementById(`${id}-sizes`)?.focus();
      return;
    }
    dispatch({
      type: "add",
      quantity,
      line: {
        slug: product.slug,
        name: product.name,
        colorway: { slug: colorway.slug, name: colorway.name, hex: colorway.hex },
        size,
        unitPrice: unitPriceFor(product, size),
        imageKey: colorway.images[0]?.key,
      },
    });
  }

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-12 lg:gap-y-14">
      {/* ---------------- Gallery ---------------- */}
      <div className="lg:col-span-7 lg:row-start-1">
        {current ? (
          <figure>
            <div className={`frame ${current.kind === "photo" ? "frame-contain" : ""}`} style={{ aspectRatio: `${imageMeta(current).width / imageMeta(current).height}` }}>
              <Image
                key={current.key}
                src={imageMeta(current).src}
                alt={current.alt}
                width={imageMeta(current).width}
                height={imageMeta(current).height}
                sizes="(min-width: 1024px) 56vw, 100vw"
                priority
                className={current.kind === "photo" ? "h-full w-full object-contain p-[8%]" : "h-full w-full object-cover"}
              />
            </div>
            <figcaption className="eyebrow mt-3 flex flex-wrap items-center justify-between gap-2 text-bone">
              <span>
                {current.kind === "photo" ? (
                  <>
                    <span className="text-paper">Photograph.</span> The garment in stock, as it is.
                  </>
                ) : current.kind === "render" ? (
                  <>
                    <span className="text-paper">3D mockup.</span> Not a photograph — the finished garment is shot before it ships.
                  </>
                ) : (
                  <>
                    <span className="text-paper">Illustration.</span> Drawn from the print spec — the finished garment is shot before it ships.
                  </>
                )}
              </span>
              <span className="text-ash">
                {colorway?.name} · {current.view}
              </span>
            </figcaption>
          </figure>
        ) : (
          <Placeholder aspect={placeholderAspect(product)} label={`${product.name} — ${colorway?.name ?? ""}`} sub="No photograph or mockup of this colour yet" />
        )}

        {images.length > 1 ? (
          <div className="mt-4 flex gap-3" role="group" aria-label="Views">
            {images.map((img, i) => (
              <button
                key={img.key}
                type="button"
                onClick={() => setView(i)}
                aria-pressed={i === view}
                aria-label={`Show ${img.view} view`}
                className={`frame h-20 w-16 shrink-0 border transition-colors ${i === view ? "border-paper" : "border-transparent hover:border-rule-strong"}`}
                style={{ "--cut": "7px" } as React.CSSProperties}
              >
                <Image src={imageMeta(img).src} alt="" width={imageMeta(img).width} height={imageMeta(img).height} sizes="64px" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {/* ---------------- Description, specs, disclosures (server-rendered) -------- */}
      <div className="order-3 lg:order-none lg:col-span-7 lg:row-start-2">
        <div className="lg:max-w-[40rem]">{children}</div>
      </div>

      {/* ---------------- Purchase panel ---------------- */}
      <div className="order-2 lg:order-none lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1">
        <div className="lg:sticky lg:top-24">
          <LineTag line={product.line} />
          <h1 className="display mt-4 text-display-lg text-paper">{product.name}</h1>
          <p className="mt-3 flex items-baseline gap-3">
            <span className="display-narrow tabular text-display-sm text-paper">{formatPrice(price)}</span>
            <span className="eyebrow text-ash">USD</span>
          </p>
          <p className="mt-4 text-body text-bone">{product.summary}</p>

          {/* Colourway */}
          <fieldset className="mt-8">
            <legend className="label">
              Colour <span className="text-paper">— {colorway?.name}</span>
            </legend>
            <div className="flex flex-wrap gap-2">
              {product.colorways.map((c) => (
                <span key={c.slug} className="inline-flex">
                  <input
                    type="radio"
                    name={`${id}-colour`}
                    id={`${id}-colour-${c.slug}`}
                    className="sr-only"
                    checked={c.slug === colorwaySlug}
                    onChange={() => {
                      setColorwaySlug(c.slug);
                      setView(0);
                    }}
                  />
                  <label htmlFor={`${id}-colour-${c.slug}`} className="swatch" style={{ "--swatch": c.hex } as React.CSSProperties}>
                    <i aria-hidden="true" />
                    {c.name}
                    {c.images.length === 0 ? <span className="text-ash">· no image</span> : null}
                  </label>
                </span>
              ))}
            </div>
            {colorway?.note ? <p className="eyebrow mt-2 text-ash">{colorway.note}</p> : null}
          </fieldset>

          {/* Size */}
          <fieldset className="mt-7" aria-describedby={sizeError ? `${id}-size-error` : undefined}>
            <div className="flex items-baseline justify-between">
              <legend className="label">Size{size ? <span className="text-paper"> — {size}</span> : null}</legend>
              {product.sizes.length > 1 ? (
                <a href="#size-guide" className="eyebrow link-sweep text-bone hover:text-paper">
                  Size guide
                </a>
              ) : null}
            </div>
            <div id={`${id}-sizes`} tabIndex={-1} className="flex flex-wrap gap-2 outline-none">
              {product.sizes.map((s) => (
                <span key={s} className="inline-flex">
                  <input
                    type="radio"
                    name={`${id}-size`}
                    id={`${id}-size-${s}`}
                    className="sr-only"
                    checked={size === s}
                    onChange={() => {
                      setSize(s);
                      setSizeError(false);
                    }}
                  />
                  <label htmlFor={`${id}-size-${s}`} className="chip">
                    {s}
                  </label>
                </span>
              ))}
            </div>
            {sizeError ? (
              <p id={`${id}-size-error`} role="alert" className="mt-2 text-body-sm text-ember">
                Pick a size first.
              </p>
            ) : null}
            {product.sizes.includes("2XL") ? (
              <p className="eyebrow mt-3 text-ash">
                {product.sizeUpcharge ? "2XL and 3XL carry a small upcharge, shown in the price." : "2XL and 3XL — same price for now; the blank's cost is confirmed at the drop."}
              </p>
            ) : null}
          </fieldset>

          {/* Quantity + add */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <div className="inline-flex h-12 items-stretch border border-rule-strong" role="group" aria-label="Quantity">
              <button type="button" className="w-12 text-bone hover:bg-ink-3 hover:text-paper" aria-label="Decrease quantity" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                −
              </button>
              <span className="eyebrow tabular flex w-10 items-center justify-center text-paper" aria-live="polite">
                {quantity}
              </span>
              <button type="button" className="w-12 text-bone hover:bg-ink-3 hover:text-paper" aria-label="Increase quantity" onClick={() => setQuantity((q) => Math.min(10, q + 1))}>
                +
              </button>
            </div>
            <Button onClick={addToCart} className="flex-1">
              Add to cart
            </Button>
          </div>

          <div className="mt-8 border-t border-rule pt-6">
            <p className="text-body-sm text-bone">
              {product.line === "stock"
                ? "Ordering opens with the first drop. Leave an email and you'll hear the day it does."
                : "Printed in small runs when the drop opens. Leave an email and you'll hear the day it does."}
            </p>
            <div className="mt-4">
              <EmailCapture
                source="notify"
                productSlug={product.slug}
                context={`${product.name}${colorway ? ` — ${colorway.name}` : ""}`}
                label={product.line === "stock" ? "Email me when ordering opens" : "Notify me when it drops"}
                variant="stacked"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
