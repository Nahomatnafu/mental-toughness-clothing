import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Beam } from "@/components/ui/Beam";
import { Button } from "@/components/ui/Button";
import { about } from "@/content/about";
import { images } from "@/content/image-manifest";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: "Mental health awareness, resilience, and active living. Get to know Mental Toughness Clothing.",
  path: "/about",
});

export default function AboutPage() {
  const founder = images["founder-millz"];
  return (
    <Container className="pt-10 lg:pt-16">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="eyebrow text-bone">About</p>
          <h1 className="display mt-3 max-w-[14ch] text-display-xl text-paper">{about.title}</h1>
          <Beam mode="hero" loadAt={0.08} sag={14} className="mt-8 max-w-[38rem]" />
          <p className="mt-7 max-w-[46ch] text-body-lg text-bone">{about.lede}</p>
        </div>
      </div>

      <div className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-12">
        <div className="lg:col-span-7">
          {about.sections.map((s, i) => (
            <section key={s.heading} aria-labelledby={`about-${i}`} className={i === 0 ? "" : "mt-14"}>
              <h2 id={`about-${i}`} className="display text-display-md text-paper">
                {s.heading}
              </h2>
              <Beam loadAt={0.12} sag={8} className="mt-4" />
              <div className="prose-mt measure mt-6 text-body text-bone">
                {s.paragraphs.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>

              {i === about.sections.length - 1 ? (
                <p className="measure mt-6 border-l-2 border-ember pl-5 text-body text-paper">
                  {about.crisis.lead}{" "}
                  <a href={site.crisis.url} rel="noopener" className="underline decoration-ember underline-offset-4 hover:decoration-paper">
                    {about.crisis.body}
                  </a>
                </p>
              ) : null}
            </section>
          ))}
        </div>

        <aside className="lg:col-span-4 lg:col-start-9">
          <figure>
            <div className="frame" style={{ aspectRatio: `${founder.width / founder.height}` }}>
              <Image
                src={founder.src}
                alt="Millz Johnson, founder, seated with a hand over his face, wearing an orange Mental Toughness bucket hat with the TM monogram, a tank with the monogram at the chest, and a TM tattoo on his shoulder."
                width={founder.width}
                height={founder.height}
                sizes="(min-width: 1024px) 30vw, 100vw"
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="eyebrow mt-3 text-bone">{about.founderPhoto.caption}</figcaption>
          </figure>

          <div className="mt-10 border-t border-rule pt-6">
            <p className="eyebrow text-ash">Part of</p>
            <p className="display-narrow mt-2 text-display-xs text-paper">{site.parent.legalName}</p>
            <p className="mt-3 text-body-sm text-bone">{site.parent.description}</p>
            <Button href={site.parent.url} external variant="secondary" size="sm" className="mt-5">
              Visit the parent company ↗
            </Button>
          </div>

          <div className="mt-10 border-t border-rule pt-6">
            <p className="eyebrow text-ash">Follow</p>
            <ul className="mt-3 space-y-2 text-body-sm">
              {site.social.map((s) => (
                <li key={s.label}>
                  <a href={s.url} rel="noopener" className="link-sweep text-bone hover:text-paper">
                    {s.label} <span className="text-ash">{s.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </Container>
  );
}
