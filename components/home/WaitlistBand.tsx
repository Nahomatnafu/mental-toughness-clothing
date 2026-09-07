import { Container } from "@/components/layout/Container";
import { EmailCapture } from "@/components/forms/EmailCapture";
import { Beam } from "@/components/ui/Beam";
import { home } from "@/content/home";

/**
 * The one large red fill on the page. Paper text on brick (6.19:1). The
 * accent tokens flip so the beam's bearings and the button resolve to paper.
 */
export function WaitlistBand() {
  return (
    <section
      id="waitlist"
      aria-labelledby="waitlist-title"
      className="scroll-mt-16 bg-brick text-paper"
      style={{ "--accent": "var(--color-paper)", "--accent-fill": "var(--color-paper)" } as React.CSSProperties}
    >
      <Container className="py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow text-paper/90">{home.waitlist.eyebrow}</p>
            <h2 id="waitlist-title" className="display mt-3 text-display-lg text-paper">
              {home.waitlist.title}
            </h2>
            <p className="mt-5 max-w-[46ch] text-body text-paper/90">{home.waitlist.description}</p>
          </div>
          <div className="lg:col-span-5">
            <EmailCapture source="waitlist" label="Join the waitlist" tone="paper" />
            <p className="eyebrow mt-4 text-paper/90">One email at the drop. Unsubscribe in one click.</p>
          </div>
        </div>
        <Beam loadAt={0.1} tone="paper" className="mt-14 opacity-70" />
      </Container>
    </section>
  );
}
