"use server";

import { ownerNotice, subscriberConfirmation, type CaptureSource } from "@/emails/waitlist";
import { addToAudience, sendEmail } from "@/lib/email";
import { cleanText, isEmail, isHoneypotTripped, type ActionState } from "@/lib/validation";
import { site } from "@/content/site";

const SOURCES: readonly CaptureSource[] = ["waitlist", "notify", "checkout"];

/**
 * Email capture for the waitlist, per-product notify-me, and checkout interest.
 * One action, three sources. Sends an internal notice and a confirmation.
 */
export async function subscribe(_prev: ActionState, formData: FormData): Promise<ActionState> {
  if (isHoneypotTripped(formData)) {
    // Bots get a success and nothing is sent.
    return { status: "success", message: "You're on the list." };
  }

  const rawEmail = cleanText(formData.get("email"), 254).toLowerCase();
  if (!isEmail(rawEmail)) {
    return { status: "error", message: "That email doesn't look complete. Check it and try again.", fields: { email: "Enter a full email address." } };
  }

  const sourceRaw = cleanText(formData.get("source"), 20) as CaptureSource;
  const source: CaptureSource = SOURCES.includes(sourceRaw) ? sourceRaw : "waitlist";
  const context = cleanText(formData.get("context"), 1200) || undefined;
  const productSlug = cleanText(formData.get("product"), 80) || undefined;

  const to = process.env.WAITLIST_TO_EMAIL ?? process.env.CONTACT_TO_EMAIL;
  const notice = ownerNotice({ email: rawEmail, source, context, productSlug });

  const results = await Promise.all([
    to
      ? sendEmail({ to, subject: notice.subject, text: notice.text, replyTo: rawEmail })
      : Promise.resolve({ ok: process.env.NODE_ENV !== "production" } as const),
    sendEmail({ to: rawEmail, ...subscriberConfirmation({ source, context }) }),
    addToAudience(rawEmail, { source }),
  ]);

  const ownerOk = results[0].ok;
  const confirmOk = results[1].ok;

  if (!ownerOk && !confirmOk) {
    return {
      status: "error",
      message: `We couldn't save your email just now. Try again in a minute, or text ${site.contact.phoneDisplay}.`,
    };
  }

  const message =
    source === "notify"
      ? "Done. You'll get one email when it's available."
      : source === "checkout"
        ? "Done. You'll hear the day checkout opens, with your picks in the note."
        : `You're on the list. ${site.drop.name} opens to you first.`;

  return { status: "success", message };
}
