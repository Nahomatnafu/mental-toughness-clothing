import localFont from "next/font/local";
// Consistent locally hosted type, without expanded headings or remote requests.
export const display = localFont({
  src: "./fonts/mona-sans-latin.woff2", weight: "500 800", style: "normal",
  display: "swap", variable: "--font-mona", adjustFontFallback: "Arial",
});
