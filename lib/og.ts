/**
 * Helpers for the Open Graph image routes (Satori via next/og).
 *
 * Satori cannot read WOFF2, so the display face is fetched from Google Fonts
 * as TTF/WOFF by presenting an old user agent, subset to the text we need. If the
 * network is unavailable at build time the route falls back to Satori's
 * bundled sans — the image still renders.
 */
import { readFile } from "node:fs/promises";
import path from "node:path";

const TTF_UA = "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:20.0) Gecko/20100101 Firefox/20.0";

export async function loadGoogleFont(family: string, text: string, weight = 700, wdth?: number): Promise<ArrayBuffer | null> {
  const axis = wdth ? `wdth,wght@${wdth},${weight}` : `wght@${weight}`;
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:${axis}&text=${encodeURIComponent(text)}`;
  try {
    const css = await (await fetch(url, { headers: { "User-Agent": TTF_UA } })).text();
    // Google returns one @font-face per width instance; take the widest offered.
    const blocks = css.split("@font-face").filter((b) => b.includes("src:"));
    const preferred = blocks.find((b) => /font-stretch:\s*expanded/.test(b)) ?? blocks[blocks.length - 1];
    const match = preferred?.match(/src:\s*url\(([^)]+)\)\s*format\('(?:truetype|opentype|woff)'\)/);
    if (!match?.[1]) {
      console.warn(`[og] no usable font source in Google CSS for ${family}`);
      return null;
    }
    const res = await fetch(match[1]);
    if (!res.ok) {
      console.warn(`[og] font download failed: ${res.status}`);
      return null;
    }
    return await res.arrayBuffer();
  } catch (err) {
    console.warn("[og] font fetch threw; falling back to the bundled sans", err);
    return null;
  }
}

/** Reads a file from /public and returns a data URL Satori can embed. */
export async function publicImageDataUrl(publicPath: string): Promise<string | null> {
  try {
    const file = path.join(process.cwd(), "public", publicPath.replace(/^\//, ""));
    const buf = await readFile(file);
    const ext = path.extname(file).toLowerCase();
    const mime = ext === ".png" ? "image/png" : ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" : null;
    if (!mime) return null;
    return `data:${mime};base64,${buf.toString("base64")}`;
  } catch {
    return null;
  }
}

/** Every glyph the OG images can need. Passing this as the subset keeps the download small
 *  without letting individual characters fall back to a different face. */
export const OG_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .,:;·-–—'’&$()/!?";

export const OG = {
  ink: "#0e0d12",
  ink2: "#15141a",
  paper: "#ede7dc",
  bone: "#a8a29b",
  brick: "#9c2736",
  ember: "#d85a45",
} as const;
