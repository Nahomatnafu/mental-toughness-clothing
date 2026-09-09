export type CategorySlug = "fleece" | "tees" | "bottoms" | "headwear";

export interface Category {
  slug: CategorySlug;
  name: string;
  /** One line under the shop heading when the filter is active. */
  blurb: string;
}

export const categories: readonly Category[] = [
  { slug: "fleece", name: "Hoodies & Fleece", blurb: "Pullover hoodies, full-zip layers, and crewnecks." },
  { slug: "tees", name: "Tees", blurb: "Classic logos, bold graphics, and fits for every day." },
  { slug: "bottoms", name: "Bottoms", blurb: "Joggers and sweat shorts carrying the STAY STRONG badge." },
  { slug: "headwear", name: "Headwear", blurb: "Bucket hat and beanie. One size." },
] as const;

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
