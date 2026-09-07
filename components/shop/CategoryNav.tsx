import Link from "next/link";
import { categories, type CategorySlug } from "@/content/categories";
import { getProductsByCategory, sortedProducts } from "@/content/products";

export function CategoryNav({ active }: { active?: CategorySlug }) {
  const items = [
    { href: "/shop", label: "Everything", count: sortedProducts.length, slug: undefined as CategorySlug | undefined },
    ...categories.map((c) => ({ href: `/shop/${c.slug}`, label: c.name, count: getProductsByCategory(c.slug).length, slug: c.slug as CategorySlug | undefined })),
  ];
  return (
    <nav aria-label="Filter by category" className="flex flex-wrap gap-x-6 gap-y-3">
      {items.map((item) => {
        const current = item.slug === active;
        return (
          <Link key={item.href} href={item.href} aria-current={current ? "page" : undefined} className={`link-sweep eyebrow ${current ? "text-paper" : "text-bone hover:text-paper"}`}>
            {item.label} <span className="tabular text-ash">{item.count}</span>
          </Link>
        );
      })}
    </nav>
  );
}
