import Link from "next/link";
import { Monogram } from "@/components/brand/Monogram";
import { categories } from "@/content/categories";
import { nav, site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-rule bg-coal text-bone sm:mt-32">
      <div className="mx-auto w-full max-w-[90rem] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Monogram className="h-10 w-auto text-paper" />
            <p className="mt-6 max-w-[34ch] text-body-sm">
              Clothing for mental health awareness, resilience, and active living. Based in {site.region.area}.
            </p>
            <p className="mt-6 eyebrow text-ash">
              In a hard place right now?{" "}
              <a href={site.crisis.url} className="text-bone underline hover:text-paper" rel="noopener">
                Call or text {site.crisis.number}
              </a>
              . Free, confidential, any hour.
            </p>
          </div>

          <nav aria-label="Shop" className="md:col-span-2">
            <h2 className="eyebrow text-ash">Shop</h2>
            <ul className="mt-4 space-y-2.5 text-body-sm">
              <li>
                <Link href="/shop" className="link-sweep hover:text-paper">
                  Everything
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/shop/${c.slug}`} className="link-sweep hover:text-paper">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company" className="md:col-span-2">
            <h2 className="eyebrow text-ash">Company</h2>
            <ul className="mt-4 space-y-2.5 text-body-sm">
              {nav
                .filter((n) => n.href !== "/shop")
                .map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="link-sweep hover:text-paper">
                      {n.label}
                    </Link>
                  </li>
                ))}
              <li>
                <Link href="/privacy" className="link-sweep hover:text-paper">
                  Privacy
                </Link>
              </li>
              <li>
                <a href={site.parent.url} className="link-sweep hover:text-paper" rel="noopener">
                  {site.parent.legalName} ↗
                </a>
              </li>
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className="eyebrow text-ash">Reach us</h2>
            <ul className="mt-4 space-y-2.5 text-body-sm">
              {site.social.map((s) => (
                <li key={s.label}>
                  <a href={s.url} className="link-sweep hover:text-paper" rel="noopener">
                    {s.label} <span className="text-ash">{s.handle}</span>
                  </a>
                </li>
              ))}
              <li>
                <a href={`tel:${site.contact.phone}`} className="link-sweep tabular hover:text-paper">
                  {site.contact.phoneDisplay}
                </a>
                <span className="block text-ash">{site.contact.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-rule pt-6 eyebrow text-ash sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. A{" "}
            <a href={site.parent.url} className="underline hover:text-paper" rel="noopener">
              {site.parent.legalName}
            </a>{" "}
            company, {site.region.state}.
          </p>
          <p>Prices in USD. Checkout is not enabled in this preview.</p>
        </div>
      </div>
    </footer>
  );
}
