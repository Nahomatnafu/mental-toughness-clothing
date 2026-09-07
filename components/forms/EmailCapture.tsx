"use client";

import { useActionState, useId } from "react";
import { subscribe } from "@/app/actions/subscribe";
import { idleState } from "@/lib/validation";
import type { CaptureSource } from "@/emails/waitlist";

interface EmailCaptureProps {
  source: CaptureSource;
  /** Product name (notify) or cart summary (checkout). Travels in the email. */
  context?: string;
  productSlug?: string;
  label?: string;
  /** inline: field and button on one row. stacked: button below. */
  variant?: "inline" | "stacked";
  /** Button style. Paper on a brick surface, brick elsewhere. */
  tone?: "brick" | "paper";
}

export function EmailCapture({ source, context, productSlug, label = "Join the waitlist", variant = "inline", tone = "brick" }: EmailCaptureProps) {
  const [state, action, pending] = useActionState(subscribe, idleState);
  const id = useId();
  const success = state.status === "success";

  if (success) {
    return (
      <p role="status" aria-live="polite" className="border border-rule-strong px-4 py-4 text-body text-paper">
        <span className="eyebrow mr-3 text-ember">Done</span>
        {state.message}
      </p>
    );
  }

  return (
    <form action={action} noValidate className={variant === "inline" ? "flex flex-col gap-3 sm:flex-row sm:items-start" : "flex flex-col gap-3"}>
      <input type="hidden" name="source" value={source} />
      {context ? <input type="hidden" name="context" value={context} /> : null}
      {productSlug ? <input type="hidden" name="product" value={productSlug} /> : null}
      <div className="honeypot" aria-hidden="true">
        <label htmlFor={`${id}-company`}>Company</label>
        <input id={`${id}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex-1">
        <label htmlFor={`${id}-email`} className="sr-only">
          Email address
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          className="field"
          aria-invalid={state.status === "error" ? true : undefined}
          aria-describedby={state.status === "error" ? `${id}-msg` : undefined}
        />
        {state.status === "error" ? (
          <p id={`${id}-msg`} role="alert" className="mt-2 text-body-sm text-ember">
            {state.message}
          </p>
        ) : null}
      </div>
      <button type="submit" disabled={pending} className={`btn ${tone === "paper" ? "btn-paper" : "btn-primary"} shrink-0`}>
        {pending ? "Saving…" : label}
      </button>
    </form>
  );
}
