// Builds the two self-hosted variable fonts in app/fonts/.
//
// Why not next/font/google? It self-hosts fine, but it ships the whole latin
// variable file: Mona Sans (wdth+wght) is 98KB and Literata (opsz+wght) 110KB,
// and both sit on the LCP path of every page. HarfBuzz partial instancing
// keeps only the design-space the site uses — Mona Sans wdth 100–125 /
// wght 500–800, Literata wght 400–700 with opsz pinned — and cuts the pair to
// ~80KB. See DECISIONS.md §8. Re-run when the type system changes.
import subsetFont from "subset-font";
import { mkdir, writeFile } from "node:fs/promises";

const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

// Basic Latin + the punctuation and accented characters the copy uses.
const GLYPHS =
  Array.from({ length: 0x7e - 0x20 + 1 }, (_, i) => String.fromCharCode(0x20 + i)).join("") +
  "‘’“”–—…·•€£©®™°½¼¾×÷ÀÁÂÄÇÉÈÊËÍÎÏÑÓÔÖÚÜàáâäçéèêëíîïñóôöúüßÿ ";

async function googleVariableLatin(family, axes) {
  const css = await (
    await fetch(`https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:${axes}&display=swap`, {
      headers: { "User-Agent": UA },
    })
  ).text();
  const blocks = css.split("@font-face").filter((b) => b.includes("src:"));
  const latin = blocks.find((b) => /unicode-range:\s*U\+0000-00FF/.test(b)) ?? blocks[blocks.length - 1];
  const url = latin?.match(/url\(([^)]+)\)/)?.[1];
  if (!url) throw new Error(`No latin @font-face for ${family}`);
  return Buffer.from(await (await fetch(url)).arrayBuffer());
}

await mkdir("app/fonts", { recursive: true });

const jobs = [
  {
    file: "mona-sans-latin.woff2",
    family: "Mona Sans",
    axes: "ital,wdth,wght@0,75..125,200..900",
    variationAxes: { wdth: { min: 100, max: 125 }, wght: { min: 500, max: 800 } },
  },
  {
    file: "literata-latin.woff2",
    family: "Literata",
    axes: "opsz,wght@7..72,200..900",
    variationAxes: { wght: { min: 400, max: 700 }, opsz: 16 },
  },
];

for (const job of jobs) {
  const src = await googleVariableLatin(job.family, job.axes);
  const out = await subsetFont(src, GLYPHS, { targetFormat: "woff2", variationAxes: job.variationAxes });
  await writeFile(`app/fonts/${job.file}`, out);
  console.log(`${job.file}: ${(src.length / 1024).toFixed(0)}KB → ${(out.length / 1024).toFixed(0)}KB`);
}
