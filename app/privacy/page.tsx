import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Beam } from "@/components/ui/Beam";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy",
  description: "What Mental Toughness Clothing collects through this site, why, and how to have it removed.",
  path: "/privacy",
});

// PLACEHOLDER — plain-language description of the real data flow. Have a lawyer
// review before launch; see CLIENT-TODO.md §6.
export default function PrivacyPage() {
  return (
    <Container className="pt-10 lg:pt-16">
      <p className="eyebrow text-bone">Privacy</p>
      <h1 className="display mt-3 max-w-[16ch] text-display-lg text-paper">What we collect, and why.</h1>
      <Beam loadAt={0.08} className="mt-6 max-w-[38rem]" />

      <div className="prose-mt measure mt-10 text-body text-bone">
        <p>This site is run by {site.name}, a brand of {site.parent.legalName}, {site.region.state}. It collects as little as it can.</p>
        <p>
          <strong className="text-paper">Email update forms</strong> collect your email address, which form you used, and — if you were in the cart — a note of what you had picked. When email delivery is connected, this information is used for the product updates or brand news you requested, plus a signup confirmation.
        </p>
        <p>
          <strong className="text-paper">The contact form</strong> collects your name, email, a topic and your message, so we can reply.
        </p>
        <p>
          Messages are delivered through Resend, an email service, and land in an inbox we control. Nothing is sold, shared for advertising, or used to build a profile. This site sets no advertising or analytics cookies. The cart lives in your browser tab only and is gone when you close it.
        </p>
        <p>
          To be removed from the list or have a message deleted, reply to any email we have sent you, use the unsubscribe link, or write through the <a href="/contact">contact page</a>. We act on it within a few days.
        </p>
        <p>When checkout opens, payment details will be handled by a payment processor, never by this site directly. This page will be updated before that happens.</p>
      </div>
    </Container>
  );
}
