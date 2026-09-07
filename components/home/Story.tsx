import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { home } from "@/content/home";

export function Story() {
  return (
    <section aria-labelledby="story-title" className="py-16 lg:py-24">
      <Container>
        <SectionHeading index="03" eyebrow={home.story.eyebrow} title={<span id="story-title">{home.story.title}</span>} />
        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12">
          <div className="prose-mt measure text-body text-bone lg:col-span-7">
            {home.story.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <p>
              <Link href={home.story.link.href} className="link-sweep text-paper">
                {home.story.link.label} →
              </Link>
            </p>
          </div>
          <figure className="lg:col-span-4 lg:col-start-9">
            <blockquote className="display text-display-md text-paper">“{home.story.quote.text}”</blockquote>
            <figcaption className="eyebrow mt-5 text-bone">— {home.story.quote.attribution}</figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
