import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";

import { Button } from "@/components/ui/Button";

import { images } from "@/content/image-manifest";
import { home } from "@/content/home";
import { getProduct } from "@/content/products";
import { Monogram } from "@/components/brand/Monogram";

/**
 * Put the garment in the first mobile viewport. Type and photography share a
 * compact opening composition; larger screens give each its own column.
 */
export function Hero() {
  const hoodie = getProduct("rhinestone-hoodie");
  const photo = images["rhinestone-hoodie-red"];
  const alt = hoodie?.colorways[0]?.images[0]?.alt ?? "Red Mental Toughness rhinestone hoodie";

  return (
    <section aria-labelledby="hero-title" className="storefront-hero">
      <Container className="hero-grid">
        <div className="hero-copy">
          <div className="rise" style={{ "--i": 0 } as React.CSSProperties}>
            <p className="eyebrow text-bone">Mental Toughness Clothing</p>
          </div>
          <h1 id="hero-title" className="display rise hero-headline" style={{ "--i": 1 } as React.CSSProperties}>
            Wear your<br /><span>strength.</span>
          </h1>

          <p className="rise hero-lede text-bone" style={{ "--i": 2 } as React.CSSProperties}>
            {home.hero.lede}
          </p>
          <div className="rise hero-actions" style={{ "--i": 3 } as React.CSSProperties}>
            <Button href={home.hero.primary.href}>{home.hero.primary.label}</Button>
            <Button href={home.hero.secondary.href} variant="secondary">
              {home.hero.secondary.label}
            </Button>
          </div>
        </div>

        <div className="hero-art">

          <Monogram className="hero-watermark" />
          <Link href="/product/rhinestone-hoodie" className="settle group hero-product">
            <Image
              src={photo.src}
              alt={alt}
              width={photo.width}
              height={photo.height}
              priority
              sizes="(min-width: 1024px) 40vw, 80vw"
              className="hero-garment"
            />
          </Link>
          <div className="hero-product-label"><div><span className="eyebrow">Rhinestone Hoodie</span><p className="display-narrow">Signature sparkle. Everyday comfort.</p></div><Link href="/product/rhinestone-hoodie" aria-label="Explore the Rhinestone Hoodie">↗</Link></div>
        </div>
      </Container>
      <div className="brand-ribbon eyebrow"><span>Mental Toughness</span><span aria-hidden="true">✳</span><span>Stay strong</span><span aria-hidden="true">✳</span><span>Southern Minnesota</span></div>
    </section>
  );
}
