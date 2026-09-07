import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { home } from "@/content/home";
import { getProduct, sortedProducts } from "@/content/products";
import { formatPrice } from "@/lib/money";

/**
 * Lead with three supplied mockups, then show the remaining upcoming pieces.
 * Membership is independent of image availability so new images never hide items.
 */
export function Collection() {
  const shown = ["core-tee", "fleece-joggers", "sweat-shorts"].map(getProduct).filter((p): p is NonNullable<typeof p> => Boolean(p));
  const spans = [5, 4, 3];
  const rest = sortedProducts.filter((p) => p.line === "print" && p.slug !== "heavyweight-hoodie" && !shown.some((featured) => featured.slug === p.slug));
  const stock = getProduct("rhinestone-hoodie");

  return (
    <section aria-labelledby="collection-title" className="py-16 lg:py-24">
      <Container>
        <SectionHeading
          index="02"
          eyebrow={home.collection.eyebrow}
          title={<span id="collection-title">{home.collection.title}</span>}
          description={home.collection.description}
          action={
            <Link href="/shop" className="link-sweep eyebrow text-paper">
              Shop everything →
            </Link>
          }
        />

        <div className="collection-rail mt-8 lg:mt-14">
          {shown.map((p, i) => (
            <ProductCard key={p.slug} product={p} span={spans[i] ?? 4} className={i === 0 ? "lg:col-span-5" : i === 1 ? "lg:col-span-4" : "lg:col-span-3"} />
          ))}
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          {stock ? (
            <div className="lg:col-span-4">
              <p className="eyebrow text-bone">In stock now</p>
              <Link href={`/product/${stock.slug}`} className="group mt-3 flex items-baseline justify-between gap-4 border-y border-rule py-4">
                <span className="display-narrow text-display-xs text-paper group-hover:text-ember">{stock.name}</span>
                <span className="eyebrow tabular text-paper">{formatPrice(stock.price)}</span>
              </Link>
              <p className="mt-3 text-body-sm text-bone">{stock.summary}</p>
            </div>
          ) : null}
          <div className="lg:col-span-8">
            <p className="eyebrow text-bone">{home.collection.lineSheetTitle}</p>
            <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5">
              {rest.map((p) => <ProductCard key={p.slug} product={p} span={4} />)}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
