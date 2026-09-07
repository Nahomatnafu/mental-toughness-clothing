import { ImageResponse } from "next/og";
import { OG, OG_CHARS, loadGoogleFont, publicImageDataUrl } from "@/lib/og";
import { getProduct, imageKindLabels, imageMeta, lineLabel, primaryImage, products } from "@/content/products";
import { site } from "@/content/site";
import { formatPrice } from "@/lib/money";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateImageMetadata({ params }: { params: { slug: string } }) {
  const p = getProduct(params.slug);
  return [{ id: "og", alt: p ? `${p.name} — ${site.name}` : site.name, size, contentType }];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  const name = product?.name ?? site.name;
  const price = product ? formatPrice(product.price) : "";
  const label = product ? lineLabel[product.line] : "";
  const img = product ? primaryImage(product) : undefined;
  const isPhoto = img?.kind === "photo";

  const [font, mark, photo] = await Promise.all([
    loadGoogleFont("Mona Sans", OG_CHARS, 700, 116),
    publicImageDataUrl("/images/brand/monogram-600.png"),
    img ? publicImageDataUrl(imageMeta(img).src) : Promise.resolve(null),
  ]);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: OG.ink, color: OG.paper, fontFamily: font ? "Mona Sans" : "sans-serif" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, padding: 72 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 22, letterSpacing: 2, textTransform: "uppercase", color: OG.bone }}>
            {mark ? <img src={mark} width={44} height={44} alt="" /> : null}
            <span>{site.name}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "flex", fontSize: 22, letterSpacing: 2, textTransform: "uppercase", color: OG.ember }}>{label}</div>
            <div style={{ display: "flex", fontSize: 72, lineHeight: 0.98, letterSpacing: -2, fontWeight: 700 }}>{name}</div>
            <div style={{ display: "flex", fontSize: 36, color: OG.bone }}>{price}</div>
          </div>
          <div style={{ display: "flex", height: 6, background: OG.brick, width: 220 }} />
        </div>
        <div style={{ width: 460, display: "flex", alignItems: "center", justifyContent: "center", background: isPhoto ? OG.ink2 : OG.ink, position: "relative" }}>
          {photo ? (
            <img src={photo} alt="" style={{ width: isPhoto ? 380 : 460, height: isPhoto ? 400 : 630, objectFit: isPhoto || img?.kind === "concept" ? "contain" : "cover" }} />
          ) : (
            <div style={{ display: "flex", flexDirection: "column", width: 460, height: 630, background: OG.ink2, color: OG.bone, fontSize: 20, letterSpacing: 2, textTransform: "uppercase", justifyContent: "flex-end", padding: 40 }}>
              Not photographed yet
            </div>
          )}
          <div style={{ position: "absolute", left: 24, bottom: 24, fontSize: 18, letterSpacing: 2, textTransform: "uppercase", color: OG.bone, background: OG.ink, padding: "8px 12px", display: "flex" }}>
            {img ? imageKindLabels[img.kind] : "Placeholder"}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: font ? [{ name: "Mona Sans", data: font, weight: 700, style: "normal" }] : undefined },
  );
}
