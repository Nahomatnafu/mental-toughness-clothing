// Builds web-ready derivatives from /assets into /public/images and writes a
// typed manifest (content/image-manifest.ts) with real pixel dimensions so
// next/image never guesses an aspect ratio.
//
// Rules (see ASSET-INVENTORY.md):
//  - Tier 2 renders: resized to 1600px max edge, JPEG q82. Labelled "render".
//  - Tier 1 photo: the rhinestone hoodie cut-out is keyed from its black
//    backdrop to real alpha so it can sit on any surface.
//  - Tier 3 lifestyle images with unreleased likenesses are NOT copied to
//    /public unless --include-unreleased is passed. Anything in /public is a
//    public URL whether or not a page renders it.
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import { illustrate } from "./illustrate-products.mjs";

const includeUnreleased = process.argv.includes("--include-unreleased");
const OUT = "public/images";
await mkdir(`${OUT}/products`, { recursive: true });
await mkdir(`${OUT}/brand`, { recursive: true });
await mkdir(`${OUT}/lifestyle`, { recursive: true });

const manifest = {};

async function jpeg(src, dest, key, { max = 1600, quality = 82 } = {}) {
  const out = `${OUT}/${dest}`;
  const info = await sharp(src)
    .rotate()
    .resize({ width: max, height: max, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality, progressive: true, mozjpeg: true })
    .toFile(out);
  manifest[key] = { src: `/images/${dest}`, width: info.width, height: info.height };
  console.log(`${dest}  ${info.width}×${info.height}  ${(info.size / 1024).toFixed(0)}KB`);
}

// --- Tier 2: mockup renders --------------------------------------------------
const renders = [
  ["red-hoodie-front", "hoodie-red-front"],
  ["red-hoodie-back", "hoodie-red-back"],
  ["black-hoodie-front", "hoodie-black-front"],
  ["black-hoodie-back", "hoodie-black-back"],
  ["white-hoodie-front", "hoodie-white-front"],
  ["white-hoodie-back", "hoodie-white-back"],
  ["blue-shirt-front", "tee-royal-front"],
  ["blue-shirt-back", "tee-royal-back"],
  ["black-pants-front", "joggers-black-front"],
  ["black-pants-back", "joggers-black-back"],
  ["black-shorts-front", "shorts-black-front"],
  ["black-shorts-back", "shorts-black-back"],
];
for (const [src, name] of renders) {
  await jpeg(`assets/${src}.jpg`, `products/${name}.jpg`, name);
}

// --- Tier 1: the real garment -------------------------------------------------
// mt-hoodie-red.webp is the photograph with its backdrop already keyed to alpha
// (485×512 — this is the ceiling of the only real product photo we hold).
// Written out as PNG so it can also be embedded in the Open Graph image route,
// which cannot decode WebP.
{
  const out = `${OUT}/products/rhinestone-hoodie-red.png`;
  const meta = await sharp("assets/derived/mt-hoodie-red.webp").trim({ threshold: 4 }).png({ compressionLevel: 9 }).toFile(out);
  manifest["rhinestone-hoodie-red"] = { src: "/images/products/rhinestone-hoodie-red.png", width: meta.width, height: meta.height };
  console.log(`rhinestone-hoodie-red.png  ${meta.width}×${meta.height}  ${(meta.size / 1024).toFixed(0)}KB (alpha)`);
}

// --- Brand marks --------------------------------------------------------------
// Icons rendered from the traced SVG (scripts/trace-logo.mjs). The SVG itself is
// used in the UI; these PNGs are for platforms that cannot take SVG.
{
  const svg = (await import("node:fs")).readFileSync(`${OUT}/brand/monogram.svg`, "utf8");
  const light = Buffer.from(svg.replace("currentColor", "#EDE7DC"));
  const dark = Buffer.from(svg.replace("currentColor", "#0E0D12"));
  const icon = (buf, size, bg, padRatio) =>
    sharp(buf, { density: 600 })
      .resize(Math.round(size * (1 - padRatio)), Math.round(size * (1 - padRatio)), { fit: "contain", background: bg })
      .extend({ top: Math.round((size * padRatio) / 2), bottom: Math.round((size * padRatio) / 2), left: Math.round((size * padRatio) / 2), right: Math.round((size * padRatio) / 2), background: bg })
      .flatten({ background: bg })
      .png();
  await icon(light, 180, "#0E0D12", 0.28).toFile("app/apple-icon.png");
  await icon(light, 512, "#0E0D12", 0.28).toFile(`${OUT}/brand/monogram-512.png`);
  await icon(dark, 512, "#EDE7DC", 0.28).toFile(`${OUT}/brand/monogram-512-light.png`);
  // Transparent, light mark for the OG image route
  await sharp(light, { density: 600 }).resize(600, 600, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(`${OUT}/brand/monogram-600.png`);
  console.log("brand icons written (apple-icon.png, monogram-512.png, monogram-600.png)");
}

// --- Founder ------------------------------------------------------------------
// The founder's own likeness, in his own merch. Consent for his own images is
// on record (CLIENT-ANSWERS.md); confirm this specific frame — CLIENT-TODO.md.
await jpeg("assets/millz_01.png", "brand/founder-millz.jpg", "founder-millz", { max: 1200 });

// --- Tier 3: lifestyle, likeness-restricted -----------------------------------
if (includeUnreleased) {
  await jpeg("assets/hero-01.jpg", "lifestyle/hero-01.jpg", "hero-01");
  await jpeg("assets/hero-02.jpg", "lifestyle/hero-02.jpg", "hero-02");
  await jpeg("assets/customer_01.jpg", "lifestyle/customer-01.jpg", "customer-01");
} else {
  console.log("skipped hero-01/hero-02/customer_01: no model release on file (pass --include-unreleased once signed)");
}

// --- Illustrations for colourways with no photograph or render ---------------
await illustrate(manifest);

// --- Manifest -----------------------------------------------------------------
const ts = `// GENERATED by scripts/prepare-images.mjs — do not edit by hand.
// Real pixel dimensions of every derivative in /public/images.
export const images = ${JSON.stringify(manifest, null, 2)} as const;

export type ImageKey = keyof typeof images;
`;
await writeFile("content/image-manifest.ts", ts);
console.log(`\nwrote content/image-manifest.ts with ${Object.keys(manifest).length} entries`);
