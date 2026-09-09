# Client draft — September 9, 2026

Branch: `codex/client-first-draft`

## What changed

- Removed numbered sections, “The original / 001”, “Drop 01”, “the lead piece”, artificial launch promises, and the visible founder-copy placeholder.
- Unified typography around locally hosted Mona Sans at normal width; simplified headings and aligned product grids for mobile and desktop.
- Imported all 15 listings from https://mentaltoughnessclothing.shop/ with 48 optimized product images. These appear first in the shop alongside the 10 previous draft products.
- Preserved source color/image mappings, size combinations, variant prices, and published tee measurement charts. Unavailable size/color combinations cannot be added to the cart.
- Adapted the existing store's mission around mental health awareness, resilience, and active living. Replaced speculative founder history with brand-level copy.
- Kept color selectors, zoom, and front/back controls. The imported New Era tee and two zip hoodies include their existing back images. Listings with only a front image do not display an invented back or an empty control. Earlier AI concepts remain labeled.

## Catalog provenance

`assets/catalog-source.json` is a public Shopify catalog snapshot taken September 9, 2026. `scripts/import-catalog.mjs` creates `content/catalog-products.ts`, `content/catalog-images.ts`, and optimized local images from that snapshot. It does not connect to Shopify admin, change the old store, or synchronize inventory. Product names are shortened for display; source URLs and variant IDs are retained.

## Shopify direction

Preserve the current Next.js storefront and connect the existing Shopify store through the Storefront API. The client will manage products, stock, prices, and orders in Shopify; payments will use Shopify checkout. Theme-editor layout controls would require a separate Shopify theme conversion and are not part of this draft.

Checkout, email delivery, and live inventory synchronization remain outside this frontend draft. Existing draft-only products still need confirmation before they become purchasable.

## Verification

- TypeScript and lint checks; image/config validation for all 25 products and 57 colorways, including every imported variant's price and source image mapping.
- Browser: gray OG Zip Hoodie back view, zoom/Escape, size 4XL at $68.58, cart quantity two at $137.16, checkout preview, removal.
- Browser: imported Classic Tee size chart; switching from White/S to Mustard disables S and requires a valid size again.
- Browser: home, shop, and imported product pages at 320, 390, and 1440 CSS pixels; no document overflow and all 25 shop products present.
- Production route checks cover all 34 pages, 26 share images, and an unknown-product 404.
