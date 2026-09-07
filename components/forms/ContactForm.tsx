"use client";

import { useActionState, useId } from "react";
import { sendContact } from "@/app/actions/contact";
import { contactTopics } from "@/content/site";
import { idleState } from "@/lib/validation";

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContact, idleState);
  const id = useId();
  const f = state.fields ?? {};

  if (state.status === "success") {
    return (
      <div role="status" aria-live="polite" className="border border-rule-strong p-6">
        <p className="eyebrow text-ember">Sent</p>
        <p className="mt-3 text-body text-paper">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="space-y-6">
      <div className="honeypot" aria-hidden="true">
        <label htmlFor={`${id}-company`}>Company</label>
        <input id={`${id}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="label">
            Name
          </label>
          <input id={`${id}-name`} name="name" type="text" autoComplete="name" required className="field" aria-invalid={f.name ? true : undefined} aria-describedby={f.name ? `${id}-name-err` : undefined} />
          {f.name ? <p id={`${id}-name-err`} className="mt-2 text-body-sm text-ember">{f.name}</p> : null}
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="label">
            Email
          </label>
          <input id={`${id}-email`} name="email" type="email" inputMode="email" autoComplete="email" required className="field" aria-invalid={f.email ? true : undefined} aria-describedby={f.email ? `${id}-email-err` : undefined} />
          {f.email ? <p id={`${id}-email-err`} className="mt-2 text-body-sm text-ember">{f.email}</p> : null}
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-topic`} className="label">
          What’s it about
        </label>
        <select id={`${id}-topic`} name="topic" required defaultValue="" className="field" aria-invalid={f.topic ? true : undefined} aria-describedby={f.topic ? `${id}-topic-err` : undefined}>
          <option value="" disabled>
            Pick one
          </option>
          {contactTopics.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        {f.topic ? <p id={`${id}-topic-err`} className="mt-2 text-body-sm text-ember">{f.topic}</p> : null}
      </div>

      <div>
        <label htmlFor={`${id}-message`} className="label">
          Message
        </label>
        <textarea id={`${id}-message`} name="message" required minLength={10} className="field" aria-invalid={f.message ? true : undefined} aria-describedby={f.message ? `${id}-message-err` : undefined} />
        {f.message ? <p id={`${id}-message-err`} className="mt-2 text-body-sm text-ember">{f.message}</p> : null}
      </div>

      {state.status === "error" && !state.fields ? (
        <p role="alert" className="text-body-sm text-ember">
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={pending} className="btn btn-primary">
          {pending ? "Sending…" : "Send message"}
        </button>
        <p className="eyebrow text-ash">We reply within a couple of business days.</p>
      </div>
    </form>
  );
}
