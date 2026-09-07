// Run against a local production server or the deployed preview.
// This checks HTTP/rendering; interactive browser scenarios are in FRONTEND-QA.md.
import assert from "node:assert/strict";

const base = process.env.TEST_BASE_URL ?? "http://localhost:3000";
const slugs = ["rhinestone-hoodie", "heavyweight-hoodie", "core-tee", "long-sleeve-tee", "crewneck-sweatshirt", "fleece-joggers", "sweat-shorts", "tank-top", "bucket-hat", "beanie"];
const routes = ["/", "/shop", "/shop/fleece", "/shop/tees", "/shop/bottoms", "/shop/headwear", "/about", "/contact", "/privacy", ...slugs.map(s => `/product/${s}`)];
const imagePaths = new Set();
for (const route of routes) {
  const response = await fetch(new URL(route, base));
  assert.equal(response.status, 200, `${route} should render`);
  const html = await response.text();
  assert.match(html, /<h1\b/, `${route} should have a page heading`);
  assert.doesNotMatch(html, /Application error: a (client|server)-side exception/);
  const image = html.match(/property="og:image" content="([^"]+)"/)?.[1];
  if (image) imagePaths.add(new URL(image.replaceAll("&amp;", "&"), base).pathname);
}
for (const path of imagePaths) {
  const response = await fetch(new URL(path, base));
  assert.equal(response.status, 200, `Share image ${path} should render`);
  assert.match(response.headers.get("content-type") ?? "", /^image\//);
}
const missing = await fetch(new URL("/product/not-a-real-product", base));
assert.equal(missing.status, 404, "Unknown products should return 404");
console.log(`Passed ${routes.length} page routes, ${imagePaths.size} share images and the missing-product check at ${base}.`);
