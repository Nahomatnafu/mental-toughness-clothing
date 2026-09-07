/** Small, dependency-free validators for the server actions. */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isEmail(value: unknown): value is string {
  return typeof value === "string" && value.length <= 254 && EMAIL_RE.test(value.trim());
}

export function cleanText(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim().slice(0, max);
}

export function cleanMultiline(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/\r\n/g, "\n").trim().slice(0, max);
}

/**
 * Honeypot: a visually hidden field named `company` that humans never fill.
 * Bots do. A filled honeypot returns a fake success so the bot moves on.
 */
export function isHoneypotTripped(formData: FormData): boolean {
  const v = formData.get("company");
  return typeof v === "string" && v.length > 0;
}

export type ActionState = {
  status: "idle" | "success" | "error";
  message: string;
  /** Field-level errors, keyed by input name. */
  fields?: Record<string, string>;
};

export const idleState: ActionState = { status: "idle", message: "" };
