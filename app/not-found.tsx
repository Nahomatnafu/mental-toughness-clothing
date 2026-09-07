import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Beam } from "@/components/ui/Beam";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="pt-16 lg:pt-24">
      <p className="eyebrow text-bone">404</p>
      <h1 className="display mt-3 max-w-[14ch] text-display-xl text-paper">This page isn’t here.</h1>
      <Beam mode="hero" loadAt={0.08} sag={14} className="mt-8 max-w-[38rem]" />
      <p className="mt-7 max-w-[42ch] text-body-lg text-bone">The link may be old, or the piece may have been renamed. Everything that exists is in the shop.</p>
      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <Button href="/shop">Go to the shop</Button>
        <Link href="/" className="btn btn-secondary">
          Home
        </Link>
      </div>
    </Container>
  );
}
