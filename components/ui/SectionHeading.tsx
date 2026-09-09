import type { ReactNode } from "react";
interface SectionHeadingProps { index?: string; eyebrow: string; title: ReactNode; description?: ReactNode; action?: ReactNode; as?: "h1" | "h2"; loadAt?: number; className?: string; }
export function SectionHeading({ eyebrow, title, description, action, as: Tag = "h2", className = "" }: SectionHeadingProps) {
  return <div className={'section-heading flex flex-col gap-5 md:flex-row md:items-end md:justify-between ' + className}>
    <div>
      {eyebrow ? <p className="eyebrow text-bone">{eyebrow}</p> : null}
      <Tag className={'display text-display-lg text-paper ' + (eyebrow ? 'mt-3' : '')}>{title}</Tag>
      {description ? <p className="mt-4 max-w-[52ch] text-body text-bone">{description}</p> : null}
    </div>
    {action ? <div className="shrink-0 pb-1">{action}</div> : null}
  </div>;
}
