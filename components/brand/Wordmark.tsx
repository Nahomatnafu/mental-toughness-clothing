import Link from "next/link";
import { Monogram } from "./Monogram";
import { site } from "@/content/site";

/** Header lockup: monogram plus the name. The name hides below `sm`; the mark carries identity alone. */
export function Wordmark() {
  return (
    <Link href="/" className="group flex items-center gap-3 text-paper" aria-label={`${site.name} — home`}>
      <Monogram className="h-7 w-auto shrink-0 transition-colors group-hover:text-ember" />
      <span className="display-narrow hidden text-[0.95rem] leading-none tracking-[-0.01em] sm:block">
        Mental Toughness
      </span>
    </Link>
  );
}
