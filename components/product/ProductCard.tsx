"use client";

import Link from "next/link";
import { useState } from "react";
import { ProductImage } from "./ProductImage";
import { imageKindLabels, type Product } from "@/content/products";
import { formatPrice } from "@/lib/money";

interface ProductCardProps {
  product: Product;
  /** Grid columns of 12 this card occupies at `lg`. Drives `sizes`. */
  span?: number;
  priority?: boolean;
  headingLevel?: "h2" | "h3";
  className?: string;
}

export function ProductCard({ product, span = 4, priority, headingLevel: H = "h3", className = "" }: ProductCardProps) {
  const [colour, setColour] = useState(product.colorways[0]?.slug ?? "");
  const [back, setBack] = useState(false);
  const colorway = product.colorways.find(c => c.slug === colour) ?? product.colorways[0];
  const image = colorway?.images.find(i => i.view === (back ? "back" : "front")) ?? colorway?.images[0];
  const canTurn = colorway?.images.some(i => i.view === "back");
  const sizes = `(min-width: 1024px) ${Math.round(span / 12 * 100)}vw, (min-width: 640px) 50vw, 80vw`;

  return (
    <article className={`product-card ${className}`}>
      <div className="card-visual">
        <Link href={`/product/${product.slug}?color=${colour}`} aria-label={`Explore ${product.name} in ${colorway?.name}`}>
          <ProductImage product={product} image={image} colorway={colour} sizes={sizes} priority={priority} aspect={1} />
        </Link>
        {canTurn ? <button type="button" className="card-turn eyebrow" onClick={() => setBack(b => !b)} aria-label={`Show ${back ? "front" : "back"} of ${product.name}`}><span aria-hidden="true">↻</span> {back ? "Front" : "Back"}</button> : null}
      </div>
      <div className="card-colours" role="group" aria-label={`${product.name} colours`}>
        <div className="card-swatches">{product.colorways.map(c => <button key={c.slug} type="button" className="card-swatch" aria-label={`${product.name} in ${c.name}`} aria-pressed={c.slug === colour} onClick={() => setColour(c.slug)}><span style={{ background: c.hex }} /></button>)}</div>
        <span className="eyebrow text-bone">{colorway?.name}</span>
      </div>
      <Link href={`/product/${product.slug}?color=${colour}`} className="group block">
        <H className="display-narrow card-title text-paper group-hover:text-ember">{product.name}</H>
        <p className="eyebrow mt-2 text-paper">{product.priceVaries ? "From " : ""}{formatPrice(colorway?.variants?.length ? Math.min(...colorway.variants.map(v=>v.price)) : product.price)}</p>
      </Link>
      {image?.kind !== "catalog" && image?.kind !== "photo" ? <p className="card-kind eyebrow text-bone" aria-live="polite">{image ? imageKindLabels[image.kind] : "Image coming soon"}</p> : null}
    </article>
  );
}
