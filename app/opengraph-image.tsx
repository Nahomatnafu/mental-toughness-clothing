import { ImageResponse } from "next/og";
import { OG, OG_CHARS, loadGoogleFont, publicImageDataUrl } from "@/lib/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default async function Image() {
  const headline = "Made for the days you keep going anyway.";
  const [font, mark] = await Promise.all([
    loadGoogleFont("Mona Sans", OG_CHARS, 700, 116),
    publicImageDataUrl("/images/brand/monogram-600.png"),
  ]);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: OG.ink, color: OG.paper, padding: 72, fontFamily: font ? "Mona Sans" : "sans-serif" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 22, letterSpacing: 2, textTransform: "uppercase", color: OG.bone }}>
            {mark ? <img src={mark} width={44} height={44} alt="" /> : null}
            <span>{site.name}</span>
            <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 10, height: 10, background: "#fe732e" }} />
              Drop 01 · waitlist open
            </span>
          </div>
          <div style={{ display: "flex", fontSize: 84, lineHeight: 0.98, letterSpacing: -2.5, fontWeight: 700, maxWidth: 980 }}>{headline}</div>
          <div style={{ display: "flex", height: 6, background: OG.brick, width: 220 }} />
        </div>
      </div>
    ),
    { ...size, fonts: font ? [{ name: "Mona Sans", data: font, weight: 700, style: "normal" }] : undefined },
  );
}
