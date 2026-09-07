interface BeamProps {
  /** Where the load sits, 0–1 across the width. The deflection is deepest here. */
  loadAt?: number;
  /** Maximum deflection in px. */
  sag?: number;
  /** Animate on scroll (default) or on page load (hero). */
  mode?: "scroll" | "hero" | "static";
  tone?: "rule" | "paper" | "ember";
  className?: string;
}

/**
 * The beam — this site's signature element. A horizontal rule that carries
 * the heading above it: it deflects under the load and holds, continuous
 * from edge to edge. See DECISIONS.md §5.
 *
 * Drawn as two quadratic curves meeting at the load point so the sag is
 * deepest under the heading, not at the geometric centre. Animation scales the
 * SVG from flat to fully deflected (transform only), so the static state is
 * the finished state and nothing is hidden while it waits.
 */
export function Beam({ loadAt = 0.14, sag = 12, mode = "scroll", tone = "rule", className = "" }: BeamProps) {
  const W = 1000;
  const H = sag;
  const L = Math.min(0.96, Math.max(0.04, loadAt)) * W;
  // Control points sit at the sag depth so both halves arrive at the load with a horizontal tangent.
  const d = `M 0 0.75 Q ${(L * 0.55).toFixed(1)} ${H} ${L.toFixed(1)} ${H} Q ${(L + (W - L) * 0.45).toFixed(1)} ${H} ${W} 0.75`;
  const color =
    tone === "paper" ? "var(--color-paper)" : tone === "ember" ? "var(--color-ember)" : "var(--color-rule-strong)";
  const animClass = mode === "scroll" ? "beam-animate" : mode === "hero" ? "beam-hero" : "";

  return (
    <div
      className={`beam ${animClass} ${className}`}
      style={{ "--beam-h": `${sag + 2}px`, "--beam-color": color } as React.CSSProperties}
      aria-hidden="true"
    >
      <svg viewBox={`0 0 ${W} ${sag + 2}`} preserveAspectRatio="none" fill="none">
        <path d={d} stroke="currentColor" strokeWidth={1.25} vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}
