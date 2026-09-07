import { IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";

/**
 * Display: Mona Sans, variable, with the width axis. Set expanded (110–116)
 * at tablet and up; normal width on phones. Differs from the parent's Archivo
 * on purpose — sibling brands, not clones. See DECISIONS.md §3.
 *
 * Self-hosted subset built by scripts/build-fonts.mjs: wdth 100–125,
 * wght 500–800, basic Latin. 52KB instead of Google's 98KB. DECISIONS.md §8.
 */
export const display = localFont({
  src: "./fonts/mona-sans-latin.woff2",
  weight: "500 800",
  style: "normal",
  display: "swap",
  variable: "--font-mona",
  adjustFontFallback: "Arial",
  declarations: [{ prop: "font-stretch", value: "100% 125%" }],
});

/**
 * Body: Literata, shared with the parent site. The weight axis is what lets
 * it survive reversal on dark (430 on ink). Subset to wght 400–700 with the
 * optical-size axis pinned at body size: 29KB instead of 110KB.
 */
export const body = localFont({
  src: "./fonts/literata-latin.woff2",
  weight: "400 700",
  style: "normal",
  display: "swap",
  variable: "--font-literata",
  adjustFontFallback: "Times New Roman",
});

/** Utility: IBM Plex Mono 500 only. Prices, sizes, eyebrows, care labels. Not preloaded — it can arrive a beat late. */
export const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "500",
  display: "swap",
  preload: false,
  variable: "--font-plex-mono",
});
