import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ShopPage } from "@/components/shop/ShopPage";
import { categories, getCategory, type CategorySlug } from "@/content/categories";
import { pageMetadata } from "@/lib/seo";

type Params = { category: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};
  return pageMetadata({ title: `${cat.name} — Shop`, description: cat.blurb, path: `/shop/${cat.slug}` });
}

export default async function ShopCategory({ params }: { params: Promise<Params> }) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();
  return <ShopPage category={cat.slug as CategorySlug} />;
}
