import type { ReactNode } from "react";
import { Beam } from "./Beam";

interface SectionHeadingProps {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  /** Heading level. Sections on a page use h2. */
  as?: "h1" | "h2";
  /** Where the heading sits on the beam (0–1). */
  loadAt?: number;
  className?: string;
}

/**
 * Eyebrow + heading standing on a beam. The beam's deepest point sits under
 * the heading, so every section reads as a load being carried.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  action,
  as: Tag = "h2",
  loadAt = 0.14,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow text-bone">
            {index ? <span className="text-ember">{index}&nbsp;&nbsp;</span> : null}
            {eyebrow}
          </p>
          <Tag className="display mt-3 text-display-lg text-paper">{title}</Tag>
          {description ? <p className="mt-4 max-w-[52ch] text-body text-bone">{description}</p> : null}
        </div>
        {action ? <div className="shrink-0 pb-1">{action}</div> : null}
      </div>
      <Beam loadAt={loadAt} className="mt-5" />
    </div>
  );
}
