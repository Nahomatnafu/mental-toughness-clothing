interface PlaceholderProps {
  /** width / height */
  aspect: number;
  label: string;
  sub?: string;
  className?: string;
}

/**
 * A labelled, correctly-proportioned stand-in for a photograph that does not
 * exist yet. Deliberately plain: a brand that has not shot its products should
 * look unfinished rather than fraudulent. Dropping the real image in later
 * causes no layout shift because the box is already the right shape.
 */
export function Placeholder({ aspect, label, sub, className = "" }: PlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`${label}. ${sub ?? "Product photograph not available yet."}`}
      className={`frame hatch flex items-end p-4 ${className}`}
      style={{ aspectRatio: `${aspect}` }}
    >
      <div className="eyebrow text-ash">
        <span className="block text-bone">{label}</span>
        <span className="mt-1 block">{sub ?? "Not photographed yet"}</span>
      </div>
      <span aria-hidden="true" className="eyebrow absolute right-4 top-6 text-ash">
        Placeholder
      </span>
    </div>
  );
}
