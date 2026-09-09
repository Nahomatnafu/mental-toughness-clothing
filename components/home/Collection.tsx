import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sortedProducts, type Product } from "@/content/products";

const sections = [
  { title: "Finish your fit.", description: "Bucket hats, beanies, joggers, and shorts. Explore the colors and turn each piece around.", id: "essentials", href: "/shop", action: "Shop everything", products: ["bucket-hat", "beanie", "fleece-joggers", "sweat-shorts"].map(slug => sortedProducts.find(p => p.slug === slug)).filter((p): p is Product => Boolean(p)) },
  { title: "Find your favorite tee.", description: "Classic logos, bold graphics, tanks, and long sleeves.", id: "tees", href: "/shop/tees", action: "View all tees", products: sortedProducts.filter(p => p.category === "tees") },
  { title: "Made for layering.", description: "From 3D hoodie concepts to Elite graphics, zip hoodies, and signature rhinestones.", id: "fleece", href: "/shop/fleece", action: "View all hoodies", products: sortedProducts.filter(p => p.category === "fleece") },
];
export function Collection() {
  return <>{sections.map(section => <section key={section.id} aria-labelledby={'collection-' + section.id} className="py-12 lg:py-20">
    <Container>
      <SectionHeading eyebrow="" title={<span id={'collection-' + section.id}>{section.title}</span>} description={section.description} action={<Link href={section.href} className="link-sweep eyebrow text-paper">{section.action} →</Link>} />
      <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-6 lg:grid-cols-4">
        {section.products.map(p=><ProductCard key={p.slug} product={p} span={3} initialColorway={p.slug === "bucket-hat" ? "orange" : p.slug === "beanie" ? "red" : undefined} />)}
      </div>
    </Container>
  </section>)}</>;
}
