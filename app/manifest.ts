import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: "/",
    display: "browser",
    background_color: "#0e0d12",
    theme_color: "#0e0d12",
    icons: [{ src: "/images/brand/monogram-512.png", sizes: "512x512", type: "image/png" }],
  };
}
