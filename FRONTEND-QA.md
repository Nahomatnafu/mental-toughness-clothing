# Storefront verification — September 7, 2026

## Automated checks

- `npm run build`: production build and TypeScript validation; all 28 build routes generated.
- `npm run lint`: no errors. Three existing `next/no-img-element` warnings are in Satori share-image routes, which use native image elements.
- `npm run test:images`: all 10 products and 18 colorways have both front and back views. Checks file existence, real dimensions, alt text, concept labels and prevention of wrong-color fallback. Includes 23 AI concept assets.
- `npm run test:routes`: checks 19 rendered pages, referenced share images and the unknown-product 404. Start the production server first. Set `TEST_BASE_URL` to check a deployment.

## Browser end-to-end scenarios

Executed in the connected Chromium browser using actual page controls:

1. Shop card: select the red Long Sleeve Tee, turn it over, open it. The product page preserves the selected color.
2. All 18 colorways: switch to back, confirm the image URL and accessible view name change, switch to front. Passed for every color of all 10 products.
3. Detail viewer: open the enlarged image, verify the concept disclosure and Front/Back controls, close with Escape. Focus returns to the image button.
4. Mobile purchase journey: choose size M, add the red Long Sleeve Tee, verify the variant and $40 subtotal, increase quantity to two and verify $80, open the checkout-interest dialog, return, remove the item and verify an empty cart.
5. View playback: start and pause through the explicit control. There is no automatic playback on page arrival.
6. Responsive production pages: home and shop at 320, 390, 768 and 1440 CSS-pixel viewport widths. No horizontal document overflow; all 10 shop products present at every width. Visual review of mobile home, shop, product and detail viewer, plus desktop product layout.

The touch swipe handler is implemented with Pointer Events; desktop arrow/button controls and the same view-state transitions were exercised. Physical iOS/Android touch testing remains a useful release check.

## Vercel verification

- Public URL: https://mental-toughness-clothing.vercel.app
- The live deployment passed all 19 page routes, 11 share images and the missing-product 404 check without authentication.
- Live browser check: the red Long Sleeve Tee retains its color, switches to its back image and adds size M to the cart with a $40 subtotal.
- Vercel tracks `codex/storefront-improvements`; the repository's `main` branch is unchanged. `NEXT_PUBLIC_SITE_URL` is set to the public Vercel URL for production share previews.

## Backend scope

This is a frontend preview. Checkout remains a notification dialog. No payment,
fulfillment or real email delivery was tested or enabled. Existing product prices,
stock claims and production designs still require the owner's confirmation.
AI concept previews are not physical-stock photographs or manufacturing artwork.
