# BUILD PROMPT — MILLZ Global Solutions (Parent Site)

> Paste everything below the line into Claude Code as a single message.
> Assumes `frontend-design` skill is active and assets are in `/assets`.

---

## Project

Build a complete, production-ready marketing website for **MILLZ Global Solutions LLC**, a Minnesota parent company operating two active divisions: a personal training business and a mental-health-focused apparel brand.

**Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS, deployed to Vercel. Static where possible. No CMS — content lives in typed config files under `/content` so it can be edited without touching components.

**Build the whole thing in one pass.** Plan first, then write all files. Do not ask me questions mid-build; make a decision, note it in `DECISIONS.md`, and keep going.

## Who this is actually for

Two audiences, in this priority order:

1. **A credit union loan officer** who Googles the business name before a meeting. This person is checking whether MILLZ is a real operating company. They want: consistent legal naming, real contact information, a clear picture of what the business does, and evidence a human runs it. They are not impressed by animation. They are suspicious of vagueness.
2. **A prospective training client in southern Minnesota** looking for a trainer.

Design for the first, convert the second.

## Critical constraint: do not overstate the business

This site supports a real loan application. Everything on it must be defensible.

- Do **not** invent certifications, client counts, years in business, awards, partnerships, or press mentions.
- Do **not** write testimonials. Build the testimonial component, feed it from `/content/testimonials.ts`, and leave that array empty so the section does not render.
- Planned ventures (youth mentorship, boxing/self-defense) are described as **in development**, not as operating divisions. Never as "divisions."
- Anything I have not confirmed appears as `PLACEHOLDER:` in the content files, never as a confident claim in the UI.

If you find yourself writing a superlative you cannot source, delete it.

## Aesthetic direction

The failure mode here is a generic fitness site: black background, neon accent, all-caps condensed type, a stock photo of a barbell, and the word "TRANSFORM." Do not build that.

The brief:

- **Register:** institutional, not hype. This is a holding company. It should feel closer to a well-designed trade or construction company than to a supplement ad. Confident, plain, physical. Serious without being corporate-cold.
- **Palette:** anchored on a deep near-black and a warm off-white, with **one red** as the sole accent, used sparingly and structurally rather than decoratively. That red is the shared thread with the apparel site — pick a specific hex and record it, because the sibling build will reuse it inverted. Avoid pure #FF0000. Aim for something with depth — oxblood, brick, or a red with brown in it.
- **Typography:** the display face should carry weight and structure. Do not use Inter, Roboto, Arial, Space Grotesk, Poppins, Montserrat, Bebas Neue, or Oswald. Bebas and Oswald are specifically banned because they are the fitness-industry default. Pair a characterful display face with a highly readable body face. Set a real type scale.
- **Motion:** minimal and purposeful. One orchestrated page-load reveal at most. A loan officer on a hotel wifi connection should see content immediately. Respect `prefers-reduced-motion`.
- **Signature element:** the one thing this page is remembered by should express the parent/division structure — the idea of one organization containing distinct businesses. Solve that structurally, not with an org chart graphic.

Take one real aesthetic risk and justify it in `DECISIONS.md`.

## Assets

Read everything in `/assets` before designing. It contains logos and photography.

- Derive the palette from the actual logo files, not from my description of them.
- Use real photography wherever it exists. If a slot has no real photo, leave a clearly-labeled placeholder block sized correctly — **do not substitute stock or AI-generated imagery of people.** A lender-facing site with fake people on it is worse than one with fewer photos.
- Generate `next/image` usage with correct sizing, `priority` on the hero only, and real alt text.

## Page structure

Single page with anchored sections, plus two real sub-pages.

**`/` — Home**

1. **Hero.** Company name, the line "Building Strength. Developing People.", one sentence explaining what the company actually does, and a primary action. No carousel.
2. **What We Do.** Two or three short paragraphs on the parent company: why these businesses sit together, what connects them. This is the credibility section — write it like a person explaining their company, not like marketing copy.
3. **Divisions.** Two blocks: MILLZ Fitness Training and Mental Toughness Clothing. Each gets a short description, a visual, and a link. The apparel block links out to the sibling site (`PLACEHOLDER: apparel site URL`).
4. **In Development.** Youth mentorship and boxing/self-defense, framed honestly as programs being built, with a way to express interest. Visually quieter than the Divisions section — subordinate, not equal.
5. **About the Founder.** Currently a placeholder. Build the component to accept a portrait, a name, and 2–4 paragraphs. Add a visible `TODO` comment. This is the highest-value section on the site and it is intentionally unfinished.
6. **Testimonials.** Component built, data array empty, section does not render when empty.
7. **Contact.** Form plus real contact details.
8. **Footer.** Legal name, service area, year, links.

**`/training` — MILLZ Fitness Training**

Full division page: services, who it's for, how it works, pricing, credentials block (empty by default), FAQ, booking CTA.

**`/contact`** — standalone contact page for direct linking.

## Content

Write all copy yourself, in `/content/*.ts` files. Voice: plain, direct, second person where it makes sense. Short sentences. No "unlock," "elevate," "journey," "transform," "empower," or "solutions-driven." No exclamation points.

Use these **placeholder values**, each marked with a `// PLACEHOLDER — client to confirm` comment:

**Training pricing** (based on Minnesota market rates for an independent trainer):
- Single session — $60
- 4-session pack — $220
- 8-session pack — $400
- Small group (2–4 people) — $30 per person
- Online coaching — $175/month
- Youth athletic development — $50/session
- Free 30-minute consultation

**Contact placeholders:**
- Email — `info@millzglobalsolutions.org`
- Phone — `PLACEHOLDER: (507) 555-0100`
- Service area — Mankato and southern Minnesota, plus virtual coaching
- Hours — `PLACEHOLDER: Mon–Sat, 6am–7pm`
- Address — omit entirely; do not publish a home address

**Never placeholder these — leave them empty:** certifications, years of experience, client counts, testimonials.

## Contact form

- Fields: name, email, phone, interest (Personal Training / Apparel / Youth Programs / Other), message.
- Client and server validation. Honeypot field for spam.
- Next.js server action posting to Resend. Read the API key from env; write `.env.example`. If the key is missing, log to console and return success in dev.
- Success and error states written as real messages, not "Something went wrong."
- Auto-reply email template in `/emails`.

## Technical requirements

- Lighthouse: 95+ performance, 100 accessibility. Verify before you finish.
- Full metadata: title, description, Open Graph, Twitter card, favicon, `sitemap.ts`, `robots.ts`.
- JSON-LD `LocalBusiness` schema with the placeholder contact data.
- Semantic HTML. Keyboard-navigable. Visible focus states. WCAG AA contrast — check the red against both backgrounds and adjust the red if it fails rather than adding an outline.
- Mobile-first. Test 375px, 768px, 1440px.
- No `localStorage`. No client-side JS for anything that can be static.

## Deliverables

1. The complete working site.
2. `DECISIONS.md` — design direction, the exact hex values (flagged as the shared token for the sibling site), typefaces chosen and why, the aesthetic risk taken, and every assumption made.
3. `CLIENT-TODO.md` — every placeholder, grouped by what I need to collect from the client.
4. `README.md` — how to run, how to edit content, how to deploy.

## Process

Plan the design system first — palette, type, layout, signature element — and check it against the calibration note in the frontend-design skill. If any part of the plan is what you would produce for any fitness or holding-company site, revise it and say what you changed. Only then write code.

When the build is done, review your own output against this brief and fix what falls short before telling me you are finished.
