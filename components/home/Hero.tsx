import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Beam } from "@/components/ui/Beam";
import { Button } from "@/components/ui/Button";
import { DropStatus } from "@/components/ui/Tag";
import { images } from "@/content/image-manifest";
import { home } from "@/content/home";
import { getProduct } from "@/content/products";

/**
 * Type-led, with the one real photograph. Elements rise into place on load —
 * transform only — and the beam under the headline takes its load. That is
 * the page's single orchestrated moment. Below `md` the text block fills the
 * first viewport and the photograph sits just under the fold (DECISIONS.md §8).
 */
export function Hero() {
  const hoodie = getProduct("rhinestone-hoodie");
  const photo = images["rhinestone-hoodie-red"];
  const alt = hoodie?.colorways[0]?.images[0]?.alt ?? "Red Mental Toughness rhinestone hoodie";

  return (
    <section aria-labelledby="hero-title">
      <Container className="grid gap-12 pb-16 pt-12 lg:grid-cols-12 lg:items-center lg:gap-8 lg:pb-28 lg:pt-20">
        {/* On phones the type fills the first screen and the photograph follows it:
            the largest first paint is text, which arrives with the HTML. */}
        <div className="flex min-h-[calc(100svh-11rem)] flex-col justify-center md:min-h-0 lg:col-span-7">
          <div className="rise" style={{ "--i": 0 } as React.CSSProperties}>
            <DropStatus />
          </div>
          <h1 id="hero-title" className="display rise mt-6 max-w-[14ch] text-display-xl text-paper" style={{ "--i": 1 } as React.CSSProperties}>
            {home.hero.headline}
          </h1>
          <Beam mode="hero" loadAt={0.1} sag={14} className="mt-8 max-w-[38rem]" />
          <p className="rise mt-7 max-w-[42ch] text-body-lg text-bone" style={{ "--i": 2 } as React.CSSProperties}>
            {home.hero.lede}
          </p>
          <div className="rise mt-9 flex flex-col gap-3 sm:flex-row" style={{ "--i": 3 } as React.CSSProperties}>
            <Button href={home.hero.primary.href}>{home.hero.primary.label}</Button>
            <Button href={home.hero.secondary.href} variant="secondary">
              {home.hero.secondary.label}
            </Button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <Link href="/product/rhinestone-hoodie" className="settle group block lg:ml-auto lg:max-w-[30rem]">
            <Image
              src={photo.src}
              alt={alt}
              width={photo.width}
              height={photo.height}
              priority
              sizes="(min-width: 1024px) 30rem, (min-width: 640px) 70vw, 100vw"
              className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.015]"
            />
            <p className="eyebrow mt-5 text-bone">
              <span className="text-paper">{home.hero.caption.lead}</span> {home.hero.caption.rest}
            </p>
          </Link>
        </div>
      </Container>
    </section>
  );
}
