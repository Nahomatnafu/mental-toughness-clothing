import Link from "next/link";
import { ProductImage, imageKindLabel } from "./ProductImage";
import { getCategory } from "@/content/categories";
import type { Product } from "@/content/products";
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
  const vw = Math.round((span / 12) * 100);
  const sizes = `(min-width: 1024px) ${vw}vw, (min-width: 640px) 50vw, 100vw`;
  const colours = product.colorways.length;
  const category = getCategory(product.category)?.name ?? product.category;

  return (
    <article className={className}>
      <Link href={`/product/${product.slug}`} className="group block">
        <ProductImage product={product} sizes={sizes} priority={priority} />
        <div className="mt-4 flex items-baseline justify-between gap-4">
          <H className="display-narrow text-display-sm text-paper group-hover:text-ember transition-colors">{product.name}</H>
          <span className="eyebrow tabular shrink-0 text-paper">{formatPrice(product.price)}</span>
        </div>
        <p className="eyebrow mt-2 text-bone">
          {category} · {colours} {colours === 1 ? "colour" : "colours"} ·{" "}
          <span className={product.line === "stock" ? "text-paper" : "text-ash"}>{imageKindLabel(product)}</span>
        </p>
      </Link>
    </article>
  );
}
