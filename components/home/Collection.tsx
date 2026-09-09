import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getProduct } from "@/content/products";

const sections = [
  { title: "Find your favorite tee.", description: "Classic logos, bold graphics, and easy everyday fits.", category: "tees", products: ["mt-classic-tee", "mt-classic-tee-1", "mt-new-era-tee", "mt-stay-strong-oversized-tee"] },
  { title: "Made for layering.", description: "Explore Elite graphics, full-zip styles, and the signature rhinestone hoodie.", category: "fleece", products: ["mental-toughness-hoodie-elite-1", "mental-toughness-full-zip-hoodie-stay-strong-logo", "black-full-zip-hoodie-og-logo", "rhinestone-hoodie"] },
];
export function Collection() {
  return <>{sections.map(section => <section key={section.category} aria-labelledby={'collection-' + section.category} className="py-12 lg:py-20">
    <Container>
      <SectionHeading eyebrow="" title={<span id={'collection-' + section.category}>{section.title}</span>} description={section.description} action={<Link href={'/shop/' + section.category} className="link-sweep eyebrow text-paper">View all {section.category === "tees" ? "tees" : "hoodies"} →</Link>} />
      <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-6 lg:grid-cols-4">
        {section.products.map(getProduct).filter(p=>p!==undefined).map(p=><ProductCard key={p.slug} product={p} span={3} />)}
      </div>
    </Container>
  </section>)}</>;
}
