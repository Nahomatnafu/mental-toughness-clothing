"use client";

import { useState } from "react";
import { ProductGallery } from "@/components/product/ProductGallery";
import { Button } from "@/components/ui/Button";
import type { Product } from "@/content/products";
import { formatPrice } from "@/lib/money";
import { eliteHoodies } from "@/content/elite-hoodies";

export function HoodieExplorer({ product: initialProduct, designs }: { product: Product; designs?: readonly Product[] }) {
  const [productSlug, setProductSlug] = useState(initialProduct.slug);
  const product = designs?.find(p => p.slug === productSlug) ?? initialProduct;
  const [colour, setColour] = useState("black");
  const selected = product.colorways.find(c => c.slug === colour) ?? product.colorways[0];
  if (!selected) return null;
  return <div className="hoodie-explorer">
    <ProductGallery key={product.slug + selected.slug} name={product.name} colorway={selected} />
    <div className="hoodie-explorer-copy">

      <h3 className="display mt-4 text-display-md">{product.name}</h3>
      <p className="mt-5 text-body text-bone">{product.summary}</p>
      {designs ? <div className="mt-6"><p className="label">Logo color</p><div className="flex flex-wrap gap-2" role="group" aria-label="Featured logo color">{eliteHoodies.map(design => <button type="button" key={design.slug} className="explorer-swatch eyebrow" aria-pressed={design.slug === product.slug} onClick={() => { setProductSlug(design.slug); if (!design.colors.some(c => c === colour)) setColour("black"); }}><i style={{ background: design.hex }} />{design.name}</button>)}</div></div> : null}
      <p className="label mt-6">{designs ? "Hoodie color" : "Color"}</p>
      <div className="flex flex-wrap gap-2" role="group" aria-label={designs ? "Featured hoodie color" : "Featured hoodie colours"}>
        {product.colorways.map(c => <button key={c.slug} type="button" className="explorer-swatch eyebrow" aria-pressed={c.slug === selected.slug} onClick={() => setColour(c.slug)}><i style={{ background: c.hex }} />{c.name}</button>)}
      </div>
      <div className="mt-8 border-t border-rule pt-6"><p className="display-narrow text-display-sm">{formatPrice(product.price)}</p><p className="eyebrow mt-2 text-bone">Choose your color and size</p></div>
      <Button href={`/product/${product.slug}?color=${selected.slug}`} className="mt-6">Shop this hoodie</Button>
    </div>
  </div>;
}
