import { site } from "@/content/site";

export type CaptureSource = "waitlist" | "notify" | "checkout";

interface OwnerNoticeArgs {
  email: string;
  source: CaptureSource;
  /** Product name for notify-me; cart summary for checkout. */
  context?: string;
  productSlug?: string;
}

const sourceLabel: Record<CaptureSource, string> = {
  waitlist: "Homepage waitlist",
  notify: "Product notify-me",
  checkout: "Checkout interest",
};

/** Internal notification to the brand. Plain text: it is read on a phone. */
export function ownerNotice({ email, source, context, productSlug }: OwnerNoticeArgs) {
  const lines = [
    `New ${sourceLabel[source].toLowerCase()} signup`,
    ``,
    `Email:   ${email}`,
    `Source:  ${sourceLabel[source]}`,
    productSlug ? `Product: ${productSlug}` : null,
    context ? `\n${context}` : null,
    ``,
    `— ${site.name} site`,
  ].filter((l) => l !== null);
  return {
    subject: `[${site.shortName}] ${sourceLabel[source]}: ${email}`,
    text: lines.join("\n"),
  };
}

/** Confirmation to the subscriber. Short, no marketing register. */
export function subscriberConfirmation({ source, context }: { source: CaptureSource; context?: string }) {
  const what =
    source === "notify" && context
      ? `We'll email you when the ${context} is available.`
      : source === "checkout"
        ? `We'll email you when checkout opens. Here's what you had picked out:\n\n${context ?? ""}`
        : `We'll email you when ${site.drop.name} opens. The list hears first.`;

  const text = `You're on the list.

${what}

Nothing else will come from this address in the meantime. If you didn't ask for this, ignore it and you won't hear from us again.

${site.name}
${site.url}
`;

  const html = `<!doctype html><html><body style="margin:0;background:#0e0d12;color:#ede7dc;font-family:Georgia,serif;font-size:17px;line-height:1.55">
<div style="max-width:560px;margin:0 auto;padding:40px 24px">
  <p style="font-family:Menlo,monospace;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#a8a29b;margin:0 0 24px">${site.name}</p>
  <h1 style="font-family:Helvetica,Arial,sans-serif;font-size:28px;line-height:1.05;margin:0 0 20px;color:#ede7dc">You're on the list.</h1>
  <p style="margin:0 0 16px;white-space:pre-line">${escapeHtml(what)}</p>
  <p style="margin:0 0 16px;color:#a8a29b">Nothing else will come from this address in the meantime. If you didn't ask for this, ignore it and you won't hear from us again.</p>
  <hr style="border:0;border-top:1px solid #2a2830;margin:32px 0">
  <p style="font-family:Menlo,monospace;font-size:12px;color:#857f78;margin:0"><a href="${site.url}" style="color:#a8a29b">${site.url}</a> · A ${site.parent.legalName} company, ${site.region.state}.</p>
</div></body></html>`;

  return { subject: `You're on the list — ${site.shortName}`, text, html };
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
