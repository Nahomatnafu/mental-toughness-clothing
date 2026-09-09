import type { ProductLine } from "@/content/products";
import { lineLabel } from "@/content/products";

export function Tag({ children, tone = "bone", className = "" }: { children: React.ReactNode; tone?: "bone" | "ember" | "paper"; className?: string }) {
  const color = tone === "ember" ? "text-ember border-ember/40" : tone === "paper" ? "text-paper border-paper/40" : "text-bone border-rule-strong";
  return <span className={`eyebrow inline-flex items-center gap-2 border px-2 py-1 ${color} ${className}`}>{children}</span>;
}

/** Labels which of the two product lines an item belongs to. Never merged. */
export function LineTag({ line, className = "" }: { line: ProductLine; className?: string }) {
  return (
    <Tag tone={line === "stock" ? "paper" : "bone"} className={className}>
      {line === "stock" ? <span aria-hidden="true" className="inline-block h-1.5 w-1.5 bg-paper" /> : null}
      {lineLabel[line]}
    </Tag>
  );
}

/** The single place the tertiary orange appears: the drop's live status. */
export function DropStatus({ className = "" }: { className?: string }) {
  return (
    <span className={`eyebrow inline-flex items-center gap-2.5 text-bone ${className}`}>
      <span aria-hidden="true" className="relative inline-flex h-2 w-2">
        <span className="absolute inset-0 bg-signal" />
      </span>
      Mental Toughness Clothing
    </span>
  );
}
