import type { Metadata } from "next";
import { ShopPage } from "@/components/shop/ShopPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Shop",
  description: "Every piece in the first drop: heavyweight fleece, boxy tees, joggers and shorts, plus the rhinestone hoodie in stock. Prices in USD, sizes S–3XL.",
  path: "/shop",
});

export default function Shop() {
  return <ShopPage />;
}
