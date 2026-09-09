// Check actual catalogue references, dimensions and colour selection without a browser.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import ts from "typescript";
import sharp from "sharp";

async function loadConfig(path, imports = {}) {
  const source = await readFile(path, "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  });
  const module = { exports: {} };
  new Function("require", "module", "exports", outputText)(name => {
    assert.ok(name in imports, `Unexpected runtime import: ${name}`);
    return imports[name];
  }, module, module.exports);
  return module.exports;
}

const catalogImages = await loadConfig("content/catalog-images.ts");
const catalogProducts = await loadConfig("content/catalog-products.ts");
const manifest = await loadConfig("content/image-manifest.ts", { "./catalog-images": catalogImages });
const { products, primaryImage, imageKindLabels } = await loadConfig("content/products.ts", {
  "./image-manifest": manifest,
  "./catalog-products": catalogProducts,
});
const { unitPriceFor } = await loadConfig("lib/cart.ts");
const source = JSON.parse((await readFile("assets/catalog-source.json", "utf8")).replace(/^\uFEFF/, ""));
for (const product of products.filter(p=>p.source)) {
  const original = source.products.find(p=>p.handle === product.slug);
  assert.ok(original);
  for (const color of product.colorways) {
    for (const variant of color.variants) {
      const originalVariant = original.variants.find(v=>String(v.id) === variant.sourceId);
      assert.equal(variant.price, Math.round(Number(originalVariant.price)*100));
      assert.equal(variant.available, originalVariant.available);
      assert.equal(unitPriceFor(product, variant.size, color.slug), variant.price);
      assert.equal(color.images[0].key, `catalog-${product.slug}-${originalVariant.featured_image.position}`, "Use the source variant's image, never a guessed color");
    }
  }
}
let colorways = 0;
let concepts = 0;
for (const product of products) {
  assert.equal(primaryImage(product, "missing-colour"), undefined, "Never substitute another colour");
  const emptyVariant = { ...product, colorways: [...product.colorways, { slug: "unshot", images: [] }] };
  assert.equal(primaryImage(emptyVariant, "unshot"), undefined, "An unshot colour must stay empty");
  for (const colorway of product.colorways) {
    colorways++;
    assert.ok(colorway.images.length, `${product.slug}/${colorway.slug} lacks imagery`);
    assert.ok(colorway.images.some(image => image.view === "front"), `${product.slug}/${colorway.slug} lacks a front`);
    if (!product.source) assert.ok(colorway.images.some(image => image.view === "back"), `${product.slug}/${colorway.slug} lacks a back`);
    assert.equal(primaryImage(product, colorway.slug)?.key, colorway.images[0].key);
    for (const image of colorway.images) {
      const meta = manifest.images[image.key];
      assert.ok(meta, `Missing manifest entry: ${image.key}`);
      const actual = await sharp(`public${meta.src}`).metadata();
      assert.equal(actual.width, meta.width);
      assert.equal(actual.height, meta.height);
      assert.ok(image.alt.length > 20, `Missing descriptive alt: ${image.key}`);
      if (image.key.startsWith("concept-")) {
        concepts++;
        assert.equal(image.kind, "concept");
        assert.equal(imageKindLabels[image.kind], "AI concept preview");
        assert.match(image.alt, /AI concept preview/);
      }
    }
  }
}
console.log(`Verified ${products.length} products, ${colorways} colourways and ${concepts} concept previews.`);
