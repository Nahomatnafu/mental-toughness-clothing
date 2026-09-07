import { Container } from "@/components/layout/Container";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CategoryNav } from "./CategoryNav";
import { getCategory, type CategorySlug } from "@/content/categories";
import { getProductsByCategory, hasPhotograph, sortedProducts } from "@/content/products";

/** Column spans, repeating. Rows sum to 12 so the grid breaks unevenly on purpose. */
const SPANS = [5, 7, 4, 4, 4, 7, 5, 4, 4, 4];

export function ShopPage({ category }: { category?: CategorySlug }) {
  const cat = category ? getCategory(category) : undefined;
  const products = category ? getProductsByCategory(category) : sortedProducts;
  const photographed = products.filter(hasPhotograph).length;

  return (
    <Container className="pb-8 pt-10 lg:pt-16">
      <SectionHeading
        as="h1"
        eyebrow={cat ? `Shop · ${cat.name}` : "Shop"}
        title={cat ? cat.name : "Everything"}
        description={
          cat
            ? cat.blurb
            : `${products.length} pieces across two lines: the rhinestone hoodie we hold in stock, and the printed drop. ${photographed} of them ${photographed === 1 ? "is" : "are"} photographed; the rest are labelled mockups or illustrations.`
        }
        loadAt={0.1}
      />
      <div className="mt-8">
        <CategoryNav active={category} />
      </div>

      {products.length === 0 ? (
        <p className="mt-16 text-body text-bone">Nothing in this category yet.</p>
      ) : (
        <ul className="mt-12 grid list-none gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-12 lg:items-end">
          {products.map((p, i) => {
            const span = SPANS[i % SPANS.length] ?? 4;
            return (
              <li key={p.slug} className={spanClass(span)}>
                <ProductCard product={p} span={span} priority={i < 2} headingLevel="h2" />
              </li>
            );
          })}
        </ul>
      )}
    </Container>
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
      return "lg:col-span-3";
    default:
      return "lg:col-span-4";
  }
}
