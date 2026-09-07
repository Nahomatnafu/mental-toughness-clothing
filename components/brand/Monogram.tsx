import { MONOGRAM_PATH, MONOGRAM_VIEWBOX } from "./monogram-path";

interface MonogramProps {
  className?: string;
  /** When given, the mark is announced; otherwise it is decorative. */
  title?: string;
}

/**
 * The TM monogram — a hexagonal shield with a T nested over an M.
 * Inline SVG traced from the client's logo so it takes `currentColor` and has
 * no raster ceiling. Height is controlled by className.
 */
export function Monogram({ className, title }: MonogramProps) {
  return (
    <svg
      viewBox={MONOGRAM_VIEWBOX}
      className={className}
      fill="currentColor"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <path d={MONOGRAM_PATH} />
    </svg>
  );
}
