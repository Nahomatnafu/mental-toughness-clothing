import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { home } from "@/content/home";
import { getProduct, sortedProducts } from "@/content/products";
import { formatPrice } from "@/lib/money";

/** Column spans at `lg`, three rows summing to twelve so the grid breaks unevenly. */
const SPANS = [5, 4, 3, 4, 4, 4, 7, 5];

/**
 * Editorial grid of the printed drop. The heavyweight hoodie has its own
 * section above and the rhinestone hoodie its own block below, so neither
 * repeats here. Scale varies per card so eight items read as a composition.
 */
export function Collection() {
  const shown = sortedProducts.filter((p) => p.line === "print" && p.slug !== "heavyweight-hoodie");
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

        <ul className="mt-10 grid list-none gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-14 lg:grid-cols-12 lg:items-end">
          {shown.map((p, i) => {
            const span = SPANS[i % SPANS.length] ?? 4;
            return (
              <li key={p.slug} className={spanClass(span)}>
                <ProductCard product={p} span={span} />
              </li>
            );
          })}
        </ul>

        {stock ? (
          <div className="mt-16 max-w-[34rem]">
            <p className="eyebrow text-bone">In stock now</p>
            <Link href={`/product/${stock.slug}`} className="group mt-3 flex items-baseline justify-between gap-4 border-y border-rule py-4">
              <span className="display-narrow text-display-xs text-paper group-hover:text-ember">{stock.name}</span>
              <span className="eyebrow tabular text-paper">{formatPrice(stock.price)}</span>
            </Link>
            <p className="mt-3 text-body-sm text-bone">{stock.summary}</p>
          </div>
        ) : null}
      </Container>
    </section>
  );
}

/** Static class names so Tailwind can see them. */
function spanClass(span: number): string {
  switch (span) {
    case 7:
      return "lg:col-span-7";
    case 5:
      return "lg:col-span-5";
    case 3:
      return "sm:col-span-2 lg:col-span-3";
    default:
      return "lg:col-span-4";
  }
}
