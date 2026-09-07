import { imageMeta, primaryImage, type Product } from "@/content/products";
import { site } from "@/content/site";
import { priceForSchema } from "@/lib/money";
import { absoluteUrl } from "@/lib/seo";

export function ProductJsonLd({ product }: { product: Product }) {
  const img = primaryImage(product);
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.slug,
    url: absoluteUrl(`/product/${product.slug}`),
    image: img ? [absoluteUrl(imageMeta(img).src)] : undefined,
    brand: { "@type": "Brand", name: site.name },
    manufacturer: { "@type": "Organization", name: site.parent.legalName },
    color: product.colorways.map((c) => c.name).join(", "),
    category: product.category,
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/product/${product.slug}`),
      priceCurrency: "USD",
      price: priceForSchema(product.price),
      itemCondition: "https://schema.org/NewCondition",
      // Nothing is purchasable until Phase 2; PreOrder is the honest state.
      availability: product.line === "stock" ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
      seller: { "@type": "Organization", name: site.name },
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
