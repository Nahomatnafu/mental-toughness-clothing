import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { Beam } from "@/components/ui/Beam";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: `Reach Mental Toughness Clothing about an order, stocking the brand, or anything else. Phone ${site.contact.phoneDisplay}, ${site.contact.hours}.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Container className="pt-10 lg:pt-16">
      <p className="eyebrow text-bone">Contact</p>
      <h1 className="display mt-3 max-w-[14ch] text-display-xl text-paper">Talk to a person.</h1>
      <Beam mode="hero" loadAt={0.08} sag={14} className="mt-8 max-w-[38rem]" />

      <div className="mt-12 grid gap-14 lg:mt-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <ContactForm />
        </div>

        <aside className="text-body-sm lg:col-span-4 lg:col-start-9">
          <div>
            <p className="eyebrow text-ash">Phone</p>
            <a href={`tel:${site.contact.phone}`} className="display-narrow tabular mt-2 block text-display-sm text-paper hover:text-ember">
              {site.contact.phoneDisplay}
            </a>
            <p className="mt-1 text-bone">{site.contact.hours}. Leave a message outside those hours.</p>
          </div>

          <div className="mt-8 border-t border-rule pt-6">
            <p className="eyebrow text-ash">Online</p>
            <ul className="mt-3 space-y-2">
              {site.social.map((s) => (
                <li key={s.label}>
                  <a href={s.url} rel="noopener" className="link-sweep text-bone hover:text-paper">
                    {s.label} <span className="text-ash">{s.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 border-t border-rule pt-6">
            <p className="eyebrow text-ash">In person</p>
            <ul className="mt-3 space-y-1.5 text-bone">
              {site.inPerson.map((place) => (
                <li key={place}>{place}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8 border-t border-rule pt-6">
            <p className="eyebrow text-ash">The company</p>
            <p className="mt-3 text-bone">
              {site.name} is a brand of{" "}
              <a href={site.parent.url} rel="noopener" className="text-paper underline decoration-ember underline-offset-4 hover:decoration-paper">
                {site.parent.legalName}
              </a>
              , {site.region.state}. Training enquiries go to the parent site.
            </p>
          </div>
        </aside>
      </div>
    </Container>
  );
}
