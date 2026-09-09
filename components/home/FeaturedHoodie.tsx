import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HoodieExplorer } from "./HoodieExplorer";
import { home } from "@/content/home";
import { getProduct, type Product } from "@/content/products";
import { eliteHoodies } from "@/content/elite-hoodies";

export function FeaturedHoodie() {
  const hoodie = getProduct("heavyweight-hoodie");
  const designs = eliteHoodies.map(d => getProduct(d.slug)).filter((p): p is Product => Boolean(p));
  if (!hoodie) return null;
  return (
    <section aria-labelledby="featured-title" className="py-12 lg:py-24">
      <Container>
        <SectionHeading index="01" eyebrow={home.featured.eyebrow} title={<span id="featured-title">{home.featured.title}</span>} description={home.featured.description} />
        <HoodieExplorer product={hoodie} />
        {designs[0] ? <div className="mt-16 border-t border-rule pt-12">
          <SectionHeading eyebrow="Elite hoodies" title="Choose your logo color." description="Yellow, green, blue, or red. Then choose the hoodie color underneath." />
          <HoodieExplorer product={designs[0]} designs={designs} />
        </div> : null}
      </Container>
    </section>
  );
}
