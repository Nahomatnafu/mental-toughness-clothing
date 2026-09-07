"use server";

import { contactAutoReply, contactNotice } from "@/emails/contact";
import { sendEmail } from "@/lib/email";
import { cleanMultiline, cleanText, isEmail, isHoneypotTripped, type ActionState } from "@/lib/validation";
import { contactTopics, site } from "@/content/site";


export async function sendContact(_prev: ActionState, formData: FormData): Promise<ActionState> {
  if (isHoneypotTripped(formData)) {
    return { status: "success", message: "Thanks. Your message came through." };
  }

  const name = cleanText(formData.get("name"), 120);
  const email = cleanText(formData.get("email"), 254).toLowerCase();
  const topicRaw = cleanText(formData.get("topic"), 60);
  const message = cleanMultiline(formData.get("message"), 4000);

  const fields: Record<string, string> = {};
  if (name.length < 2) fields.name = "Tell us who you are.";
  if (!isEmail(email)) fields.email = "Enter a full email address so we can reply.";
  const topic = (contactTopics as readonly string[]).includes(topicRaw) ? topicRaw : "";
  if (!topic) fields.topic = "Pick the closest option.";
  if (message.length < 10) fields.message = "A sentence or two is enough, but we need more than this.";

  if (Object.keys(fields).length > 0) {
    return { status: "error", message: "A few fields need attention.", fields };
  }

  const payload = { name, email, topic, message };
  const to = process.env.CONTACT_TO_EMAIL;
  const notice = contactNotice(payload);

  const [ownerResult] = await Promise.all([
    to
      ? sendEmail({ to, subject: notice.subject, text: notice.text, replyTo: email })
      : Promise.resolve({ ok: process.env.NODE_ENV !== "production", reason: "no-recipient" } as const),
    sendEmail({ to: email, ...contactAutoReply(payload) }),
  ]);

  if (!ownerResult.ok) {
    return {
      status: "error",
      message: `Your message didn't send. Try again in a minute, or call ${site.contact.phoneDisplay}, ${site.contact.hours}.`,
    };
  }

  return { status: "success", message: `Thanks, ${name}. Your message came through. We reply within a couple of business days.` };
}
