import Link from "next/link";
import { getCategory } from "@/content/categories";
import { type Product } from "@/content/products";
import { imageKindLabel } from "./ProductImage";
import { formatPrice } from "@/lib/money";

/**
 * Type-only product rows. Where there is no photograph, a list reads as a
 * line sheet — deliberate — rather than a grid with holes in it.
 */
export function LineSheet({ products, className = "" }: { products: readonly Product[]; className?: string }) {
  return (
    <ul className={`border-y border-rule divide-y divide-rule ${className}`}>
      {products.map((p) => {
        const status = p.line === "stock" ? "In stock" : imageKindLabel(p);
        return (
          <li key={p.slug}>
            <Link
              href={`/product/${p.slug}`}
              className="group grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 gap-y-1 py-4 transition-colors hover:bg-ink-2 sm:grid-cols-[minmax(0,1fr)_7rem_5rem_11rem] sm:px-3"
            >
              <span className="display-narrow text-display-xs text-paper transition-colors group-hover:text-ember">{p.name}</span>
              <span className="eyebrow tabular text-paper sm:order-3 sm:text-right">{formatPrice(p.price)}</span>
              <span className="eyebrow text-bone sm:order-2">{getCategory(p.category)?.name}</span>
              <span className={`eyebrow sm:order-4 sm:text-right ${p.line === "stock" ? "text-paper" : "text-ash"}`}>{status}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
