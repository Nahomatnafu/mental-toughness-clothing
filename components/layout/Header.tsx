import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { CartButton } from "@/components/cart/CartButton";
import { nav } from "@/content/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-ink">
      <div className="mx-auto flex h-16 w-full max-w-[90rem] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
        <Wordmark />
        <nav aria-label="Primary" className="flex items-center gap-5 sm:gap-7">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="link-sweep eyebrow text-bone hover:text-paper">
              {item.label}
            </Link>
          ))}
          <CartButton />
        </nav>
      </div>
    </header>
  );
}
