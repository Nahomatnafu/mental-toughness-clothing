"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { EmailCapture } from "@/components/forms/EmailCapture";
import { Button } from "@/components/ui/Button";
import { ProductGallery } from "./ProductGallery";
import { type Product, type Size } from "@/content/products";
import { unitPriceFor } from "@/lib/cart";
import { formatPrice } from "@/lib/money";
import { eliteHoodies } from "@/content/elite-hoodies";

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
  const eliteDesign = eliteHoodies.find(d => d.slug === product.slug);

  const firstWithImages = product.colorways.find((c) => c.images.length > 0) ?? product.colorways[0];
  const [colorwaySlug, setColorwaySlug] = useState(firstWithImages?.slug ?? "");
  const colorway = product.colorways.find((c) => c.slug === colorwaySlug) ?? firstWithImages;
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("color");
    if (requested && product.colorways.some(c => c.slug === requested)) setColorwaySlug(requested);
  }, [product]);
  const [size, setSize] = useState<Size | null>(product.sizes.length === 1 ? (product.sizes[0] ?? null) : null);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);

  const availableSizes = colorway?.variants ? colorway.variants.filter(v => v.available).map(v => v.size) : product.sizes;
  const selectedSize = size && availableSizes.includes(size) ? size : null;
  const colorPrice = colorway?.variants?.length ? Math.min(...colorway.variants.map(v=>v.price)) : product.price;
  const price = selectedSize ? unitPriceFor(product, selectedSize, colorwaySlug) : colorPrice;

  function addToCart() {
    if (!selectedSize || !colorway) {
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
        size: selectedSize,
        unitPrice: unitPriceFor(product, selectedSize, colorwaySlug),
        imageKey: colorway.images[0]?.key,
      },
    });
  }

  return (
    <div className="product-detail grid gap-7 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-12 lg:gap-y-14">
      <div className="mobile-product-title lg:hidden"><h1 className="display text-display-lg">{product.name}</h1><p className="eyebrow mt-3">{product.priceVaries && !selectedSize ? "From " : ""}{formatPrice(price)} USD</p></div>
      {/* ---------------- Gallery ---------------- */}
      <div className="lg:col-span-7 lg:row-start-1">
        {colorway ? <ProductGallery key={product.slug + colorway.slug} name={product.name} colorway={colorway} priority /> : null}
      </div>

      {/* ---------------- Description, specs, disclosures (server-rendered) -------- */}
      <div className="order-3 lg:order-none lg:col-span-7 lg:row-start-2">
        <div className="lg:max-w-[40rem]">{children}</div>
      </div>

      {/* ---------------- Purchase panel ---------------- */}
      <div className="order-2 lg:order-none lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1">
        <div className="lg:sticky lg:top-24" id="product-options">
          <h1 className="display mt-4 hidden text-display-lg text-paper lg:block">{product.name}</h1>
          <p className="mt-3 flex items-baseline gap-3">
            <span className="display-narrow tabular text-display-sm text-paper">{product.priceVaries && !selectedSize ? "From " : ""}{formatPrice(price)}</span>
            <span className="eyebrow text-ash">USD</span>
          </p>
          <p className="mt-4 text-body text-bone">{product.summary}</p>

          {eliteDesign ? <div className="mt-7"><p className="label">Logo color — {eliteDesign.name}</p><div className="flex flex-wrap gap-2" role="group" aria-label="Logo color">{eliteHoodies.map(design => <Link key={design.slug} className={`explorer-swatch eyebrow ${design.slug === product.slug ? "border-paper bg-ink-3" : ""}`} aria-current={design.slug === product.slug ? "page" : undefined} href={`/product/${design.slug}?color=${design.colors.some(c => c === colorwaySlug) ? colorwaySlug : "black"}`}><i style={{ background: design.hex }} />{design.name}</Link>)}</div></div> : null}

          {/* Colourway */}
          <fieldset className="mt-8">
            <legend className="label">
              {eliteDesign ? "Hoodie color" : "Color"} <span className="text-paper">— {colorway?.name}</span>
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
              <legend className="label">Size{selectedSize ? <span className="text-paper"> — {selectedSize}</span> : null}</legend>
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
                    checked={selectedSize === s}
                    disabled={!availableSizes.includes(s)}
                    onChange={() => {
                      setSize(s);
                      setSizeError(false);
                    }}
                  />
                  <label htmlFor={`${id}-size-${s}`} className="chip" title={availableSizes.includes(s) ? undefined : "Unavailable in this color"}>
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
            {product.priceVaries ? (
              <p className="eyebrow mt-3 text-ash">
                Price varies by color and size. Select a size to see the price.
              </p>
            ) : null}
          </fieldset>

          {/* Quantity + add */}
          <div className="mt-8 flex flex-wrap gap-3">
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
            <Button onClick={addToCart} className="min-w-[10rem] flex-1">
              Add to cart
            </Button>
          </div>

          <div className="mt-8 border-t border-rule pt-6">
            <p className="text-body-sm text-bone">
              Get updates about this style.
            </p>
            <div className="mt-4">
              <EmailCapture
                source="notify"
                productSlug={product.slug}
                context={`${product.name}${colorway ? ` — ${colorway.name}` : ""}`}
                label="Keep me updated"
                variant="stacked"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mobile-product-bar"><div><span className="display-narrow">{product.name}</span><span className="eyebrow text-bone">{product.priceVaries && !selectedSize ? "From " : ""}{formatPrice(price)} · {colorway?.name}</span></div><button type="button" className="btn btn-primary" onClick={() => { if (selectedSize) addToCart(); else { document.getElementById(`${id}-sizes`)?.scrollIntoView({ block: "center" }); document.getElementById(`${id}-sizes`)?.focus(); } }}>{selectedSize ? "Add to cart" : "Choose size"}</button></div>
    </div>
  );
}
