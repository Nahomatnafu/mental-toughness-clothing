import type { Metadata } from "next";
import { site } from "@/content/site";

export function absoluteUrl(path = "/"): string {
  return new URL(path, site.url).toString();
}

interface PageMeta {
  title: string;
  description: string;
  path: string;
  /** Path to an OG image, absolute or site-relative. Defaults to the site image. */
  image?: string;
  noIndex?: boolean;
}

export function pageMetadata({ title, description, path, image, noIndex }: PageMeta): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      type: "website",
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: title }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}
