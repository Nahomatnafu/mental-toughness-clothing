/**
 * Garment measurements in inches, laid flat.
 *
 * PLACEHOLDER — every row depends on which Printify blank the client chooses.
 * These are typical figures for the garment types shown in the renders so the
 * table renders at the right shape. Replace with the chosen blank's spec sheet
 * before launch. See CLIENT-TODO.md.
 */
export type SizeGuideKey = "hoodie" | "tee" | "joggers" | "shorts" | "one-size";

export interface SizeRow {
  size: string;
  measurements: Record<string, string>;
}

export interface SizeGuide {
  key: SizeGuideKey;
  title: string;
  columns: readonly string[];
  rows: readonly SizeRow[];
  howToMeasure: readonly string[];
  fitNote: string;
}

const apparelSizes = ["S", "M", "L", "XL", "2XL", "3XL"] as const;

export const sizeGuides: Record<SizeGuideKey, SizeGuide> = {
  hoodie: {
    key: "hoodie",
    title: "Hoodie and crewneck",
    columns: ["Chest", "Length", "Sleeve"],
    rows: [
      { size: "S", measurements: { Chest: "20", Length: "27", Sleeve: "33.5" } },
      { size: "M", measurements: { Chest: "22", Length: "28", Sleeve: "34.5" } },
      { size: "L", measurements: { Chest: "24", Length: "29", Sleeve: "35.5" } },
      { size: "XL", measurements: { Chest: "26", Length: "30", Sleeve: "36.5" } },
      { size: "2XL", measurements: { Chest: "28", Length: "31", Sleeve: "37.5" } },
      { size: "3XL", measurements: { Chest: "30", Length: "32", Sleeve: "38.5" } },
    ],
    howToMeasure: [
      "Chest: across the front, one inch below the armhole, seam to seam. Double it for the full circumference.",
      "Length: from the highest point of the shoulder, next to the collar, straight down to the hem.",
      "Sleeve: from the centre back of the neck, along the shoulder, to the end of the cuff.",
    ],
    fitNote: "Cut relaxed with a dropped shoulder. If you are between sizes and want it closer to the body, size down.",
  },
  tee: {
    key: "tee",
    title: "Tees, long sleeves and tanks",
    columns: ["Chest", "Length"],
    rows: [
      { size: "S", measurements: { Chest: "20", Length: "27" } },
      { size: "M", measurements: { Chest: "22", Length: "28" } },
      { size: "L", measurements: { Chest: "24", Length: "29" } },
      { size: "XL", measurements: { Chest: "26", Length: "30" } },
      { size: "2XL", measurements: { Chest: "28", Length: "31" } },
      { size: "3XL", measurements: { Chest: "30", Length: "32" } },
    ],
    howToMeasure: [
      "Chest: across the front, one inch below the armhole, seam to seam.",
      "Length: from the highest point of the shoulder straight down to the hem.",
    ],
    fitNote: "Boxy and slightly short in the body. True to size for the intended fit; size down for a standard tee fit.",
  },
  joggers: {
    key: "joggers",
    title: "Joggers",
    columns: ["Waist (relaxed)", "Inseam", "Leg opening"],
    rows: [
      { size: "S", measurements: { "Waist (relaxed)": "14", Inseam: "30", "Leg opening": "5" } },
      { size: "M", measurements: { "Waist (relaxed)": "15", Inseam: "30.5", "Leg opening": "5.25" } },
      { size: "L", measurements: { "Waist (relaxed)": "16", Inseam: "31", "Leg opening": "5.5" } },
      { size: "XL", measurements: { "Waist (relaxed)": "17.5", Inseam: "31.5", "Leg opening": "5.75" } },
      { size: "2XL", measurements: { "Waist (relaxed)": "19", Inseam: "32", "Leg opening": "6" } },
      { size: "3XL", measurements: { "Waist (relaxed)": "20.5", Inseam: "32", "Leg opening": "6.25" } },
    ],
    howToMeasure: [
      "Waist: across the top of the waistband, relaxed, side to side. The elastic stretches several inches beyond this.",
      "Inseam: from the crotch seam down the inside of the leg to the bottom of the cuff.",
    ],
    fitNote: "Tapered from the knee to a ribbed cuff. True to size.",
  },
  shorts: {
    key: "shorts",
    title: "Sweat shorts",
    columns: ["Waist (relaxed)", "Inseam"],
    rows: [
      { size: "S", measurements: { "Waist (relaxed)": "14", Inseam: "8" } },
      { size: "M", measurements: { "Waist (relaxed)": "15", Inseam: "8" } },
      { size: "L", measurements: { "Waist (relaxed)": "16", Inseam: "8.5" } },
      { size: "XL", measurements: { "Waist (relaxed)": "17.5", Inseam: "8.5" } },
      { size: "2XL", measurements: { "Waist (relaxed)": "19", Inseam: "9" } },
      { size: "3XL", measurements: { "Waist (relaxed)": "20.5", Inseam: "9" } },
    ],
    howToMeasure: [
      "Waist: across the top of the waistband, relaxed, side to side.",
      "Inseam: from the crotch seam to the hem.",
    ],
    fitNote: "Relaxed through the thigh, above the knee. True to size.",
  },
  "one-size": {
    key: "one-size",
    title: "One size",
    columns: ["Fits head circumference"],
    rows: [{ size: "One size", measurements: { "Fits head circumference": "21.5 – 23.5" } }],
    howToMeasure: ["Wrap a tape around your head just above the ears and eyebrows, where the hat sits."],
    fitNote: "The bucket hat has an internal sweatband; the beanie is a stretch rib knit.",
  },
};

export { apparelSizes };
