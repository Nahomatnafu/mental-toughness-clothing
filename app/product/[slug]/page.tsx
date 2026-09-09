import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { ProductView } from "@/components/product/ProductView";
import { ProductJsonLd } from "@/components/product/ProductJsonLd";
import { SizeGuide } from "@/components/product/SizeGuide";
import { ProductCard } from "@/components/product/ProductCard";
import { Beam } from "@/components/ui/Beam";
import { getCategory } from "@/content/categories";
import { getProduct, nextProduct, products } from "@/content/products";
import { formatPrice } from "@/lib/money";
import { pageMetadata } from "@/lib/seo";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return pageMetadata({
    title: `${product.name} — ${formatPrice(product.price)}`,
    description: product.summary,
    path: `/product/${product.slug}`,
  });
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const category = getCategory(product.category);
  const next = nextProduct(product.slug);

  return (
    <>
      <ProductJsonLd product={product} />
      <Container className="pt-8 lg:pt-12">
        <nav aria-label="Breadcrumb" className="eyebrow text-bone">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/shop" className="link-sweep hover:text-paper">
                Shop
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            {category ? (
              <>
                <li>
                  <Link href={`/shop/${category.slug}`} className="link-sweep hover:text-paper">
                    {category.name}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
              </>
            ) : null}
            <li aria-current="page" className="text-paper">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="mt-8">
          <ProductView product={product}>
            <div className="prose-mt text-body text-bone">
              <p>{product.description}</p>
            </div>

            <dl className="mt-8 grid grid-cols-[6rem_1fr] gap-x-4 gap-y-3 border-t border-rule pt-6 text-body-sm">
              <dt className="eyebrow text-ash">Fabric</dt>
              <dd className="text-bone">{product.details.fabric}</dd>
              <dt className="eyebrow text-ash">Fit</dt>
              <dd className="text-bone">{product.details.fit}</dd>
              <dt className="eyebrow text-ash">Print</dt>
              <dd className="text-bone">{product.details.print}</dd>
              <dt className="eyebrow text-ash">Sizes</dt>
              <dd className="text-bone">{product.sizes.join(" · ")}</dd>
            </dl>

            <div className="mt-8">
              <SizeGuide guide={product.sizeGuide} product={product} />
              <details className="disclosure">
                <summary>Care</summary>
                <ul className="space-y-2 pb-6 text-body-sm text-bone">
                  {product.care.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </details>
              <details className="disclosure">
                <summary>Shipping and returns</summary>
                <div className="space-y-3 pb-6 text-body-sm text-bone">
                  <p>Ordering, shipping options, and delivery estimates will be available when checkout is connected.</p>
                  <p>For questions about an existing order, please contact the brand.</p>
                </div>
              </details>
            </div>
          </ProductView>
        </div>
      </Container>

      <section aria-labelledby="next-title" className="mt-20 lg:mt-28">
        <Container>

          <h2 id="next-title" className="display mt-3 text-display-md text-paper">
            You may also like
          </h2>
          <Beam loadAt={0.08} className="mt-5" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-12">
            <ProductCard product={next} span={5} className="lg:col-span-5" />
            <div className="flex flex-col justify-end lg:col-span-4 lg:col-start-8">
              <p className="text-body text-bone">{next.summary}</p>
              <Link href="/shop" className="link-sweep eyebrow mt-6 inline-block text-paper">
                Or see everything →
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
