/**
 * Product catalogue — typed config, no CMS.
 *
 * READ ASSET-INVENTORY.md BEFORE EDITING.
 *
 * Two product lines exist and are NOT merged:
 *   - `line: "stock"`  — physical garments the client holds. One product: the
 *     rhinestone hoodie, the only item on this site with a real photograph.
 *   - `line: "print"`  — the print-on-demand drop. Every image is a 3D mockup
 *     render (`kind: "render"`) and is labelled as such in the UI. Colourways
 *     with neither a photograph nor a render carry a flat illustration drawn
 *     from the print spec (`kind: "illustration"`, scripts/illustrate-products.mjs),
 *     also labelled.
 *
 * Every entry is a PLACEHOLDER until the client confirms it (`confirmed: false`).
 * Prices reflect Printify base costs at roughly 40–50% gross margin, positioned
 * as mid-tier streetwear. 2XL/3XL carry a higher Printify base cost; the
 * `sizeUpcharge` field exists for that and is null until the blanks are chosen.
 */
import { images, type ImageKey } from "./image-manifest";
import type { CategorySlug } from "./categories";
import type { SizeGuideKey } from "./size-guide";

export type Size = "S" | "M" | "L" | "XL" | "2XL" | "3XL" | "One size";
export type ProductLine = "stock" | "print";
export type ImageKind = "photo" | "render" | "illustration";
export type ImageView = "front" | "back";

export interface ProductImage {
  key: ImageKey;
  alt: string;
  kind: ImageKind;
  view: ImageView;
}

export interface Colorway {
  slug: string;
  name: string;
  /** Swatch colour. For the brand red this is the sampled garment value. */
  hex: string;
  /** Empty array = no imagery. The UI renders a labelled placeholder. */
  images: readonly ProductImage[];
  /** Shown beside the swatch when the colourway itself is unconfirmed. */
  note?: string;
}

export interface Product {
  slug: string;
  name: string;
  category: CategorySlug;
  line: ProductLine;
  /** USD cents. */
  price: number;
  /** Per-size upcharge in cents. Null until Printify blanks are confirmed. */
  sizeUpcharge: Partial<Record<Size, number>> | null;
  sizes: readonly Size[];
  sizeGuide: SizeGuideKey;
  /** One line, used on cards and in the line sheet. */
  summary: string;
  /** Two or three sentences: fabric, fit, print. */
  description: string;
  details: { fabric: string; fit: string; print: string };
  care: readonly string[];
  colorways: readonly Colorway[];
  /** Order in the catalogue and in "next product" links. */
  order: number;
  /** PLACEHOLDER — confirm with client. Every entry is false today. */
  confirmed: false;
  /** Internal notes surfaced in CLIENT-TODO.md. Never rendered. */
  notes?: readonly string[];
}

export const apparelSizes: readonly Size[] = ["S", "M", "L", "XL", "2XL", "3XL"];

const FLEECE_CARE = [
  "Machine wash cold, inside out, with like colours.",
  "Tumble dry low or hang dry.",
  "Do not bleach. Do not iron the print.",
] as const;

const TEE_CARE = [
  "Machine wash cold, inside out.",
  "Tumble dry low. Expect a little shrink in the length on the first wash.",
  "Do not bleach. Do not iron the print.",
] as const;

// PLACEHOLDER — confirm with client. All ten entries.
export const products: readonly Product[] = [
  {
    slug: "rhinestone-hoodie",
    name: "Rhinestone Hoodie",
    category: "fleece",
    line: "stock",
    // PLACEHOLDER — the brief priced a print hoodie at $65. Rhinestone transfer
    // on a heavyweight blank costs materially more; $95 is an estimate to be
    // replaced by the client's actual figure.
    price: 9500,
    sizeUpcharge: null,
    sizes: apparelSizes,
    sizeGuide: "hoodie",
    order: 1,
    confirmed: false,
    summary: "Red heavyweight fleece, TM monogram in clear rhinestones. The one we hold in stock.",
    description:
      "The hoodie the brand started with, and the one we actually hold in stock. Heavyweight red fleece with the TM monogram set in clear rhinestones across the chest, a rhinestone US flag on the left sleeve and a rhinestone outline of Minnesota on the right, with stones scattered across the hood and pocket. Pullover, kangaroo pocket, ribbed cuffs and hem; cut relaxed through the body.",
    details: {
      fabric: "Heavyweight brushed-back fleece, red.",
      fit: "Relaxed, dropped shoulder. Runs generous; size down for a closer fit.",
      print: "Clear rhinestone transfer: chest monogram, left-sleeve flag, right-sleeve Minnesota, scattered stones on hood and pocket.",
    },
    care: [
      "Turn inside out. Hand wash cold, or gentle cycle inside a mesh bag.",
      "Hang dry. Never tumble dry — heat loosens the stone adhesive.",
      "Do not iron or steam the decoration. Do not dry clean.",
    ],
    colorways: [
      {
        slug: "red",
        name: "Red",
        hex: "#9C2736",
        images: [
          {
            key: "rhinestone-hoodie-red",
            kind: "photo",
            view: "front",
            alt: "Photograph of the red Mental Toughness rhinestone hoodie laid flat: a large TM monogram in clear rhinestones across the chest, a rhinestone US flag on the left sleeve, a rhinestone outline of the state of Minnesota on the right sleeve, and rhinestones scattered across the hood and kangaroo pocket.",
          },
        ],
      },
    ],
    notes: [
      "Price is an estimate. The client has not given a price for the rhinestone line.",
      "Only a front photograph exists. A back and a detail shot of the stones would help.",
      "Quantity on hand is unknown; the page says 'in stock' without a number.",
    ],
  },
  {
    slug: "heavyweight-hoodie",
    name: "Heavyweight Hoodie",
    category: "fleece",
    line: "print",
    price: 6500,
    sizeUpcharge: null,
    sizes: apparelSizes,
    sizeGuide: "hoodie",
    order: 2,
    confirmed: false,
    summary: "Pullover fleece. Small TM at the chest, flag on one sleeve, the wordmark down the other.",
    description:
      "Pullover fleece with a brushed interior and a boxy, slightly dropped shoulder. A small TM monogram sits at the left chest, the US flag on the left sleeve, and MENTAL TOUGHNESS runs down the right sleeve in a serif; the wordmark repeats across the upper back. Kangaroo pocket, flat drawcords, ribbed cuffs and hem.",
    details: {
      fabric: "Heavyweight fleece, brushed inside. Cotton-rich blend.", // PLACEHOLDER — depends on blank
      fit: "Relaxed with a dropped shoulder. True to size for the intended fit.",
      print: "Left-chest monogram, left-sleeve flag, right-sleeve wordmark, upper-back wordmark. Printed, not embroidered.",
    },
    care: FLEECE_CARE,
    colorways: [
      {
        slug: "black",
        name: "Black",
        hex: "#131316",
        images: [
          {
            key: "hoodie-black-front",
            kind: "render",
            view: "front",
            alt: "3D mockup of a black pullover hoodie on a red backdrop: white TM monogram at the left chest, US flag on the left sleeve, and MENTAL TOUGHNESS printed in white down the right sleeve.",
          },
          {
            key: "hoodie-black-back",
            kind: "render",
            view: "back",
            alt: "3D mockup of the back of a black pullover hoodie on a red backdrop: MENTAL TOUGHNESS in outlined white blackletter across the upper back, a US flag on the left sleeve, and the wordmark down the right sleeve.",
          },
        ],
      },
      {
        slug: "red",
        name: "Red",
        hex: "#9C2736",
        images: [
          {
            key: "hoodie-red-front",
            kind: "render",
            view: "front",
            alt: "3D mockup of a red pullover hoodie on a black backdrop: black TM monogram at the left chest, US flag on the left sleeve, and MENTAL TOUGHNESS printed in black down the right sleeve.",
          },
          {
            key: "hoodie-red-back",
            kind: "render",
            view: "back",
            alt: "3D mockup of the back of a red pullover hoodie on a black backdrop: MENTAL TOUGHNESS in outlined black blackletter across the upper back, with the wordmark down the right sleeve and a US flag on the left.",
          },
        ],
      },
      {
        slug: "white",
        name: "White",
        hex: "#EDEDEA",
        images: [
          {
            key: "hoodie-white-front",
            kind: "render",
            view: "front",
            alt: "3D mockup of a white pullover hoodie on a black backdrop: black TM monogram at the left chest, US flag on the left sleeve, and MENTAL TOUGHNESS printed in black down the right sleeve.",
          },
          {
            key: "hoodie-white-back",
            kind: "render",
            view: "back",
            alt: "3D mockup of the back of a white pullover hoodie on a black backdrop: MENTAL TOUGHNESS in outlined black blackletter across the upper back.",
          },
        ],
      },
    ],
    notes: [
      "The back render reads 'MENTAL TOUGHNES' — one S short. The white front-sleeve render appears to read 'TOUGHNESSS'. Fix the artwork before anything is printed.",
      "Renders show a different design from the rhinestone garment. Confirm this is the intended print line.",
    ],
  },
  {
    slug: "core-tee",
    name: "Core Tee",
    category: "tees",
    line: "print",
    price: 3200,
    sizeUpcharge: null,
    sizes: apparelSizes,
    sizeGuide: "tee",
    order: 3,
    confirmed: false,
    summary: "Boxy midweight tee with the monogram large across the chest.",
    description:
      "Midweight cotton jersey cut boxy, with a wider neck rib and a shorter body than a standard tee. The TM monogram sits oversized across the chest in red and white. Falls straight from the shoulder; size down if you want it closer.",
    details: {
      fabric: "Midweight cotton jersey.", // PLACEHOLDER — depends on blank
      fit: "Boxy, short in the body, wide neck rib.",
      print: "Oversized two-colour monogram, centre chest.",
    },
    care: TEE_CARE,
    colorways: [
      {
        slug: "royal",
        name: "Royal",
        hex: "#2B3FB5",
        images: [
          {
            key: "tee-royal-front",
            kind: "render",
            view: "front",
            alt: "3D mockup of a royal blue boxy short-sleeve tee on black: a large red TM monogram outlined in white across the centre chest.",
          },
          {
            key: "tee-royal-back",
            kind: "render",
            view: "back",
            alt: "3D mockup of the back of a royal blue boxy short-sleeve tee on black, plain with no print.",
          },
        ],
        note: "Off the red-and-black palette. Rendered, not confirmed.",
      },
      {
        slug: "black",
        name: "Black",
        hex: "#131316",
        images: [{ key: "illus-core-tee-black", kind: "illustration", view: "front", alt: "Illustration of a black boxy tee with the oversized TM monogram in red, outlined in white, across the centre chest." }],
        note: "Not rendered yet; shown as an illustration.",
      },
    ],
    notes: [
      "The only tee render is royal blue, which is off the client's red/black palette. Confirm the colourway or re-render in black.",
      "The render's neck label reads 'Süllohe' — a third-party blank template. Confirm the actual blank.",
    ],
  },
  {
    slug: "long-sleeve-tee",
    name: "Long Sleeve Tee",
    category: "tees",
    line: "print",
    price: 4000,
    sizeUpcharge: null,
    sizes: apparelSizes,
    sizeGuide: "tee",
    order: 4,
    confirmed: false,
    summary: "The Core Tee cut, with a long sleeve and ribbed cuff.",
    description:
      "The same boxy cut as the Core Tee, with a long sleeve finished in a ribbed cuff. The monogram moves smaller to the left chest so the right sleeve can carry the wordmark. Midweight cotton that holds its shape.",
    details: {
      fabric: "Midweight cotton jersey.", // PLACEHOLDER
      fit: "Boxy, short in the body.",
      print: "Left-chest monogram, right-sleeve wordmark.",
    },
    care: TEE_CARE,
    colorways: [
      { slug: "black", name: "Black", hex: "#131316", images: [{ key: "illus-long-sleeve-tee-black", kind: "illustration", view: "front", alt: "Illustration of a black long-sleeve tee: small cream TM monogram at the left chest, MENTAL TOUGHNESS down the right sleeve." }] },
      { slug: "red", name: "Red", hex: "#9C2736", images: [{ key: "illus-long-sleeve-tee-red", kind: "illustration", view: "front", alt: "Illustration of a red long-sleeve tee: small cream TM monogram at the left chest, MENTAL TOUGHNESS down the right sleeve." }] },
    ],
    notes: ["No photograph or render. Shown as labelled illustrations drawn from the print spec."],
  },
  {
    slug: "crewneck-sweatshirt",
    name: "Crewneck Sweatshirt",
    category: "fleece",
    line: "print",
    price: 5500,
    sizeUpcharge: null,
    sizes: apparelSizes,
    sizeGuide: "hoodie",
    order: 5,
    confirmed: false,
    summary: "The hoodie's fleece without the hood.",
    description:
      "Heavyweight fleece crewneck with a set-in sleeve and ribbed collar, cuffs and hem. Small TM monogram at the left chest, with MENTAL TOUGHNESS down the right sleeve as on the hoodie. The same fleece; no hood, no pocket.",
    details: {
      fabric: "Heavyweight fleece, brushed inside.", // PLACEHOLDER
      fit: "Relaxed, set-in sleeve.",
      print: "Left-chest monogram, right-sleeve wordmark.",
    },
    care: FLEECE_CARE,
    colorways: [
      { slug: "black", name: "Black", hex: "#131316", images: [{ key: "illus-crewneck-sweatshirt-black", kind: "illustration", view: "front", alt: "Illustration of a black heavyweight crewneck sweatshirt with ribbed collar, cuffs and hem: small cream TM monogram at the left chest, MENTAL TOUGHNESS down the right sleeve." }] },
      { slug: "red", name: "Red", hex: "#9C2736", images: [{ key: "illus-crewneck-sweatshirt-red", kind: "illustration", view: "front", alt: "Illustration of a red heavyweight crewneck sweatshirt with ribbed collar, cuffs and hem: small cream TM monogram at the left chest, MENTAL TOUGHNESS down the right sleeve." }] },
    ],
    notes: ["No photograph or render. Shown as labelled illustrations drawn from the print spec."],
  },
  {
    slug: "fleece-joggers",
    name: "Fleece Joggers",
    category: "bottoms",
    line: "print",
    price: 5800,
    sizeUpcharge: null,
    sizes: apparelSizes,
    sizeGuide: "joggers",
    order: 6,
    confirmed: false,
    summary: "Cuffed fleece jogger with the STAY STRONG badge on the thigh.",
    description:
      "Midweight fleece jogger with an elastic waist, flat drawcord, side pockets and a ribbed ankle cuff. The circular MENTAL TOUGHNESS · STAY STRONG badge sits on the right thigh. Tapered from the knee; true to size.",
    details: {
      fabric: "Midweight fleece, brushed inside.", // PLACEHOLDER
      fit: "Relaxed through the seat, tapered from the knee to a ribbed cuff.",
      print: "Circular badge, right thigh: monogram ringed by MENTAL TOUGHNESS · STAY STRONG.",
    },
    care: FLEECE_CARE,
    colorways: [
      {
        slug: "black",
        name: "Black",
        hex: "#131316",
        images: [
          {
            key: "joggers-black-front",
            kind: "render",
            view: "front",
            alt: "3D mockup of black cuffed fleece joggers on a red backdrop, with a circular white MENTAL TOUGHNESS · STAY STRONG badge on the right thigh.",
          },
          {
            key: "joggers-black-back",
            kind: "render",
            view: "back",
            alt: "3D mockup of the back of black cuffed fleece joggers on a red backdrop, plain with no print.",
          },
        ],
      },
    ],
    notes: [
      "The brief lists 'Sweatpants'. The render is a cuffed jogger, so the product is named for what is shown.",
    ],
  },
  {
    slug: "sweat-shorts",
    name: "Sweat Shorts",
    category: "bottoms",
    line: "print",
    // PLACEHOLDER — not in the brief's catalogue; added because a render exists
    // and the founder is described wearing the brand's shorts.
    price: 4500,
    sizeUpcharge: null,
    sizes: apparelSizes,
    sizeGuide: "shorts",
    order: 7,
    confirmed: false,
    summary: "Above-the-knee fleece short, badge low on the right leg.",
    description:
      "Fleece short with an above-the-knee inseam, elastic waist, drawcord and side pockets. The STAY STRONG badge sits low on the right leg. Cut relaxed through the thigh so it moves.",
    details: {
      fabric: "Midweight fleece.", // PLACEHOLDER
      fit: "Relaxed, above the knee.",
      print: "Circular badge, lower right leg.",
    },
    care: FLEECE_CARE,
    colorways: [
      {
        slug: "black",
        name: "Black",
        hex: "#131316",
        images: [
          {
            key: "shorts-black-front",
            kind: "render",
            view: "front",
            alt: "3D mockup of black fleece sweat shorts with white drawcords on a red backdrop, with a circular white MENTAL TOUGHNESS · STAY STRONG badge on the lower right leg.",
          },
          {
            key: "shorts-black-back",
            kind: "render",
            view: "back",
            alt: "3D mockup of the back of black fleece sweat shorts on a red backdrop, plain with no print.",
          },
        ],
      },
    ],
    notes: ["Not in the brief. Price is an estimate."],
  },
  {
    slug: "tank-top",
    name: "Tank Top",
    category: "tees",
    line: "print",
    price: 2800,
    sizeUpcharge: null,
    sizes: apparelSizes,
    sizeGuide: "tee",
    order: 8,
    confirmed: false,
    summary: "Lightweight cotton tank, monogram at the chest.",
    description:
      "Lightweight cotton tank with a relaxed drape and a low-cut armhole. The TM monogram is printed small at the centre chest. It is the one the founder wears in the photograph on the About page.",
    details: {
      fabric: "Lightweight cotton jersey.", // PLACEHOLDER
      fit: "Relaxed, low armhole.",
      print: "Small monogram, centre chest.",
    },
    care: TEE_CARE,
    colorways: [
      { slug: "black", name: "Black", hex: "#131316", images: [{ key: "illus-tank-top-black", kind: "illustration", view: "front", alt: "Illustration of a black cotton tank top with a small cream TM monogram at the centre chest." }] },
      { slug: "olive", name: "Olive", hex: "#5A5B45", images: [{ key: "illus-tank-top-olive", kind: "illustration", view: "front", alt: "Illustration of an olive cotton tank top with a small cream TM monogram at the centre chest." }], note: "Seen on the founder. Not confirmed for the drop." },
    ],
    notes: ["No product shot; visible on the founder in millz_01.png only. Shown as labelled illustrations."],
  },
  {
    slug: "bucket-hat",
    name: "Bucket Hat",
    category: "headwear",
    line: "print",
    // PLACEHOLDER — the brief lists a Dad Hat at $30. The only hat that exists in
    // any photograph is a bucket hat, so the catalogue follows the evidence.
    price: 3200,
    sizeUpcharge: null,
    sizes: ["One size"],
    sizeGuide: "one-size",
    order: 9,
    confirmed: false,
    summary: "Cotton twill bucket hat with the monogram on the front panel.",
    description:
      "Cotton twill bucket hat with a short, stitched brim and the TM monogram on the front panel. One size, with an internal sweatband. The orange one is the founder's own; colours for the drop are not set.",
    details: {
      fabric: "Cotton twill.", // PLACEHOLDER
      fit: "One size, internal sweatband.",
      print: "Monogram on the front panel.",
    },
    care: ["Spot clean with cold water and mild soap.", "Reshape and air dry. Do not machine wash."],
    colorways: [
      { slug: "black", name: "Black", hex: "#131316", images: [{ key: "illus-bucket-hat-black", kind: "illustration", view: "front", alt: "Illustration of a black cotton bucket hat with a short stitched brim and a cream TM monogram on the front panel." }] },
      { slug: "orange", name: "Orange", hex: "#FE732E", images: [{ key: "illus-bucket-hat-orange", kind: "illustration", view: "front", alt: "Illustration of an orange cotton bucket hat with a short stitched brim and a black TM monogram on the front panel." }], note: "The founder's. Not confirmed for the drop." },
    ],
    notes: ["Replaces the brief's 'Dad Hat'. No product shot; the hat is visible on the founder in millz_01.png. Shown as labelled illustrations."],
  },
  {
    slug: "beanie",
    name: "Beanie",
    category: "headwear",
    line: "print",
    price: 2800,
    sizeUpcharge: null,
    sizes: ["One size"],
    sizeGuide: "one-size",
    order: 10,
    confirmed: false,
    summary: "Ribbed knit beanie with a fold-over cuff.",
    description:
      "Ribbed knit beanie with a fold-over cuff and a woven TM label at the front. Stretch knit, one size. Warm enough for a Minnesota January.",
    details: {
      fabric: "Ribbed acrylic knit.", // PLACEHOLDER
      fit: "One size, fold-over cuff.",
      print: "Woven label, front of cuff.",
    },
    care: ["Hand wash cold. Lay flat to dry.", "Do not bleach, tumble dry, or iron."],
    colorways: [
      { slug: "black", name: "Black", hex: "#131316", images: [{ key: "illus-beanie-black", kind: "illustration", view: "front", alt: "Illustration of a black ribbed knit beanie with a fold-over cuff and a small cream woven TM label at the front." }] },
      { slug: "red", name: "Red", hex: "#9C2736", images: [{ key: "illus-beanie-red", kind: "illustration", view: "front", alt: "Illustration of a red ribbed knit beanie with a fold-over cuff and a small cream woven TM label at the front." }] },
    ],
    notes: ["No photograph or render. Shown as labelled illustrations drawn from the print spec."],
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export const sortedProducts: readonly Product[] = [...products].sort((a, b) => a.order - b.order);

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: CategorySlug): Product[] {
  return sortedProducts.filter((p) => p.category === category);
}

export function getProductsByLine(line: ProductLine): Product[] {
  return sortedProducts.filter((p) => p.line === line);
}

/** The first image of the first colourway that has one, or undefined. */
export function primaryImage(product: Product, colorwaySlug?: string): ProductImage | undefined {
  if (colorwaySlug) {
    const cw = product.colorways.find((c) => c.slug === colorwaySlug);
    if (cw?.images[0]) return cw.images[0];
  }
  for (const cw of product.colorways) {
    if (cw.images[0]) return cw.images[0];
  }
  return undefined;
}

/** True if at least one colourway has any imagery (photo, render or illustration). */
export function hasImagery(product: Product): boolean {
  return product.colorways.some((c) => c.images.length > 0);
}

/** True only if the product has a photograph of a physical garment. */
export function hasPhotograph(product: Product): boolean {
  return product.colorways.some((c) => c.images.some((i) => i.kind === "photo"));
}

export function imageMeta(image: ProductImage) {
  return images[image.key];
}

/** Aspect ratio for placeholders: matches the renders for that garment type. */
export function placeholderAspect(product: Product): number {
  switch (product.category) {
    case "bottoms":
      return 1493 / 1600;
    case "headwear":
      return 1;
    case "tees":
      return 1433 / 1600;
    default:
      return 1600 / 1281;
  }
}

/** Next product in catalogue order, wrapping. Used for the "keep going" link. */
export function nextProduct(slug: string): Product {
  const i = sortedProducts.findIndex((p) => p.slug === slug);
  const next = sortedProducts[(i + 1) % sortedProducts.length];
  // sortedProducts is non-empty by construction.
  return next as Product;
}

export const lineLabel: Record<ProductLine, string> = {
  stock: "In stock · rhinestone",
  print: "Drop 01 · print",
};
