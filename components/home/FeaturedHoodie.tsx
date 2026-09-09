import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HoodieExplorer } from "./HoodieExplorer";
import { home } from "@/content/home";
import { getProduct } from "@/content/products";

export function FeaturedHoodie() {
  const hoodie = getProduct("heavyweight-hoodie");
  if (!hoodie) return null;
  return (
    <section aria-labelledby="featured-title" className="py-12 lg:py-24">
      <Container>
        <SectionHeading index="01" eyebrow={home.featured.eyebrow} title={<span id="featured-title">{home.featured.title}</span>} description={home.featured.description} />
        <HoodieExplorer product={hoodie} />
      </Container>
    </section>
  );
}
