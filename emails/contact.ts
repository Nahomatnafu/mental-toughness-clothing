import { site } from "@/content/site";

export interface ContactPayload {
  name: string;
  email: string;
  topic: string;
  message: string;
}

export function contactNotice(p: ContactPayload) {
  return {
    subject: `[${site.shortName}] ${p.topic} — ${p.name}`,
    text: `New message from the ${site.name} contact form

Name:   ${p.name}
Email:  ${p.email}
Topic:  ${p.topic}

${p.message}
`,
  };
}

export function contactAutoReply(p: ContactPayload) {
  const text = `Thanks, ${p.name}. Your message came through.

We reply within a couple of business days — usually faster. If it's urgent, the phone is ${site.contact.phoneDisplay}, ${site.contact.hours}.

What you sent:
${p.message}

${site.name}
${site.url}
`;
  return { subject: `Got your message — ${site.shortName}`, text };
}
