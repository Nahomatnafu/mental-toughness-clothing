import type { Metadata } from "next";
import { ShopPage } from "@/components/shop/ShopPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Shop",
  description: "Explore Mental Toughness tees, hoodies, and everyday apparel. Choose your favorite colors and styles.",
  path: "/shop",
});

export default function Shop() {
  return <ShopPage />;
}
