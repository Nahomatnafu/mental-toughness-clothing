import { Container } from "@/components/layout/Container";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CategoryNav } from "./CategoryNav";
import { getCategory, type CategorySlug } from "@/content/categories";
import { getProductsByCategory, sortedProducts } from "@/content/products";


export function ShopPage({ category }: { category?: CategorySlug }) {
  const cat = category ? getCategory(category) : undefined;
  const products = category ? getProductsByCategory(category) : sortedProducts;

  return (
    <Container className="pb-8 pt-10 lg:pt-16">
      <SectionHeading
        as="h1"
        eyebrow={cat ? `Shop · ${cat.name}` : "Shop"}
        title={cat ? cat.name : "Shop the collection"}
        description={
          cat
            ? cat.blurb
            : "Tees, hoodies, and everyday essentials. Find your fit and make it your own."
        }
        loadAt={0.1}
      />
      <div className="category-bar mt-8">
        <CategoryNav active={category} />
      </div>

      {products.length === 0 ? (
        <p className="mt-16 text-body text-bone">Nothing in this category yet.</p>
      ) : (
        <ul className="shop-grid mt-8 grid list-none grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-6 lg:mt-12 lg:grid-cols-4">
          {products.map((p, i) => {
            const span = 3;
            return (
              <li key={p.slug} className="min-w-0">
                <ProductCard product={p} span={span} priority={i < 2} headingLevel="h2" />
              </li>
            );
          })}
        </ul>
      )}
    </Container>
  );
}
