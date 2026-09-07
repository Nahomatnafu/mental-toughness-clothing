"use client";

import { useState } from "react";
import { ProductGallery } from "@/components/product/ProductGallery";
import { Button } from "@/components/ui/Button";
import type { Product } from "@/content/products";
import { formatPrice } from "@/lib/money";

export function HoodieExplorer({ product }: { product: Product }) {
  const [colour, setColour] = useState("black");
  const selected = product.colorways.find(c => c.slug === colour) ?? product.colorways[0];
  if (!selected) return null;
  return <div className="hoodie-explorer">
    <ProductGallery key={selected.slug} name={product.name} colorway={selected} />
    <div className="hoodie-explorer-copy">
      <p className="eyebrow text-ember">One piece. Your way.</p>
      <h3 className="display mt-4 text-display-md">Find your colour.<br />See every side.</h3>
      <p className="mt-5 text-body text-bone">{product.summary}</p>
      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Featured hoodie colours">
        {product.colorways.map(c => <button key={c.slug} type="button" className="explorer-swatch eyebrow" aria-pressed={c.slug === colour} onClick={() => setColour(c.slug)}><i style={{ background: c.hex }} />{c.name}</button>)}
      </div>
      <div className="mt-8 border-t border-rule pt-6"><p className="display-narrow text-display-sm">{formatPrice(product.price)}</p><p className="eyebrow mt-2 text-bone">S–3XL · Relaxed fit</p></div>
      <Button href={`/product/${product.slug}?color=${selected.slug}`} className="mt-6">Explore the hoodie ↗</Button>
    </div>
  </div>;
}
