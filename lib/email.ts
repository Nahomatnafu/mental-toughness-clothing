/**
 * Thin wrapper over Resend.
 *
 * Behaviour without RESEND_API_KEY:
 *   - development: log the message and report success, so the UI can be built
 *     and tested end-to-end without an account.
 *   - production: report failure. A live site that silently drops emails is
 *     worse than one that shows an honest error.
 */
import { Resend } from "resend";

interface SendArgs {
  to: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
}

export type SendResult = { ok: true } | { ok: false; reason: string };

const isDev = process.env.NODE_ENV !== "production";

function fromAddress(): string {
  return process.env.CONTACT_FROM_EMAIL ?? "Mental Toughness <onboarding@resend.dev>";
}

export async function sendEmail(args: SendArgs): Promise<SendResult> {
  const key = process.env.RESEND_API_KEY;

  if (!key) {
    if (isDev) {
      console.info("[email:dev] RESEND_API_KEY not set — logging instead of sending\n", {
        to: args.to,
        subject: args.subject,
        text: args.text,
      });
      return { ok: true };
    }
    console.error("[email] RESEND_API_KEY is not set in production");
    return { ok: false, reason: "email-not-configured" };
  }

  try {
    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      from: fromAddress(),
      to: args.to,
      subject: args.subject,
      text: args.text,
      html: args.html,
      replyTo: args.replyTo,
    });
    if (error) {
      console.error("[email] Resend error", error);
      return { ok: false, reason: error.message };
    }
    return { ok: true };
  } catch (err) {
    console.error("[email] send failed", err);
    return { ok: false, reason: "send-failed" };
  }
}

/**
 * Adds a contact to the Resend Audience named by RESEND_AUDIENCE_ID.
 * Optional: skipped silently when the audience is not configured.
 */
export async function addToAudience(email: string, tags: Record<string, string>): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!key || !audienceId) return;
  try {
    const resend = new Resend(key);
    await resend.contacts.create({
      audienceId,
      email,
      unsubscribed: false,
      // Resend contacts carry first/last name only; tags travel in the notification email.
      firstName: tags.source ?? undefined,
    });
  } catch (err) {
    // Never fail the user's submission because the optional audience write failed.
    console.warn("[email] audience add failed", err);
  }
}
