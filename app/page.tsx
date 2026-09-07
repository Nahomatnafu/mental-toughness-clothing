import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { FeaturedHoodie } from "@/components/home/FeaturedHoodie";
import { Collection } from "@/components/home/Collection";
import { Story } from "@/components/home/Story";
import { WaitlistBand } from "@/components/home/WaitlistBand";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  alternates: { canonical: site.url },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedHoodie />
      <Collection />
      <Story />
      <WaitlistBand />
    </>
  );
}
