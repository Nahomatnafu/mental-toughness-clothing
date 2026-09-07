import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { home } from "@/content/home";
import { getProduct, imageMeta } from "@/content/products";
import { formatPrice } from "@/lib/money";

/** The lead piece of Drop 01 in its three colourways, at three scales. */
export function FeaturedHoodie() {
  const hoodie = getProduct("heavyweight-hoodie");
  if (!hoodie) return null;
  const [black, red, white] = ["black", "red", "white"].map((slug) => hoodie.colorways.find((c) => c.slug === slug)?.images[0]);
  if (!black || !red || !white) return null;

  const frame = (img: typeof black, sizes: string, className = "") => {
    const m = imageMeta(img);
    return (
      <Link href={`/product/${hoodie.slug}`} className={`group block ${className}`} aria-label={`Heavyweight Hoodie — view product`}>
        <div className="frame" style={{ aspectRatio: `${m.width / m.height}` }}>
          <Image src={m.src} alt={img.alt} width={m.width} height={m.height} sizes={sizes} className="h-full w-full object-cover" />
        </div>
      </Link>
    );
  };

  return (
    <section aria-labelledby="featured-title" className="py-16 lg:py-24">
      <Container>
        <SectionHeading index="01" eyebrow={home.featured.eyebrow} title={<span id="featured-title">{home.featured.title}</span>} description={home.featured.description} />
        <div className="mt-10 grid grid-cols-2 items-end gap-4 lg:mt-14 lg:grid-cols-12 lg:gap-6">
          {frame(red, "(min-width: 1024px) 25vw, 50vw", "lg:col-span-3")}
          {frame(black, "(min-width: 1024px) 50vw, 100vw", "col-span-2 lg:col-span-6 lg:order-none order-first")}
          {frame(white, "(min-width: 1024px) 25vw, 50vw", "lg:col-span-3 lg:mb-16")}
        </div>
        <div className="mt-8 grid gap-6 border-t border-rule pt-6 md:grid-cols-12 md:items-start">
          <div className="md:col-span-5">
            <h3 className="display-narrow text-display-sm text-paper">{hoodie.name}</h3>
            <p className="eyebrow mt-2 text-bone">
              {formatPrice(hoodie.price)} · {hoodie.colorways.map((c) => c.name).join(" / ")} · S–3XL
            </p>
          </div>
          <p className="text-body text-bone md:col-span-5">{hoodie.description}</p>
          <div className="md:col-span-2 md:text-right">
            <Button href={`/product/${hoodie.slug}`} variant="secondary" size="sm">
              View the hoodie
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
