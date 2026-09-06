# Client to-do — outstanding before launch

Updated 18 Aug 2026, after the client answered all 60 questions
(`CLIENT-ANSWERS.md`). Most of the site is now real content. What follows is
what is still blocking, or still unresolved.

**Resolved and now live:** founder name, story and photograph · confirmed
pricing · real phone number · business hours · venue · service-area towns ·
social links · formation date · equipment list · payment methods · pack expiry ·
the true nature of the free consultation · Mental Toughness origin story ·
mental health talks added as a third program in development.

---

## 🔴 Blocking

### 1. The legal name does not match the brand or the domain

This is the most important item on the list and it needs one decision.

- The client gave the **exact registered name** as **"Millz Global LLC"**.
- He answered **"No"** to trading under any DBA or assumed name.
- He owns and wants to use **millzglobalsolutions.org**.

Those three cannot all be true at once. Publicly trading as "MILLZ Global
Solutions" while registered as "Millz Global LLC" with no assumed name filed is
exactly the kind of inconsistency a loan officer notices — and the brief for this
site was built around consistent legal naming.

**The site currently uses "Millz Global LLC" throughout**, and the wordmark reads
MILLZ / GLOBAL. The domain still contains "solutions", which is fine on its own —
domains routinely differ from entity names.

**Decide one of:**
- (a) Keep "Millz Global LLC" everywhere. Nothing more to do. *(current state)*
- (b) File an assumed name for "MILLZ Global Solutions" with the MN Secretary of
  State, then we can use it publicly and put the filing number in the footer.
- (c) Confirm the registered name actually *is* "Millz Global Solutions LLC" and
  the short answer was shorthand — in which case I revert in one edit.

### 2. There is no Minnesota business file number

The client answered "NA" for the file number but "Yes" to the LLC being in good
standing. A registered Minnesota LLC always has a file number, so one of those is
wrong.

The footer currently publishes the legal name, formation date and state, but
**not** a file number, because there is nothing to publish. Adding it is the
single most verifiable credibility signal available — a lender can look it up in
thirty seconds.

*Needed:* the file number from the filing paperwork, or confirmation of what the
registration status actually is.

### 3. The contact email does not exist

`info@millzglobalsolutions.org` is published on every page and is where the
contact form delivers. The client says it **"doesn't exist yet"**.

As it stands, **every enquiry through the site goes nowhere.** Either:
- create the mailbox on the domain, or
- set `CONTACT_TO_EMAIL` in Vercel to a working address (a personal Gmail is
  fine to start), and change the published address in `content/site.ts`.

This must be done before the site is announced to anyone.

### 4. Apparel store URL

The online store is "in progress", so the Mental Toughness block still shows a
visible placeholder instead of a link. Send the URL when it is live.

---

## 🟠 Legal exposure — one photo pulled

### Model releases: the client has none

He confirmed **"No"** to having written permission for the two identifiable
people in the apparel photographs.

**`hero-01.jpg` has been removed from the site.** It was the only photograph in
the Mental Toughness block, and it is now a labelled placeholder instead.
Publishing someone's likeness commercially without a release is a
right-of-publicity risk in Minnesota, and this site is going in front of a
lender — it was not worth carrying.

Restoring it is a one-line change in `content/divisions.ts` once releases are
signed. The same applies to `hero-02.jpg`, which was never used.

The founder's own boxing photograph is used in the About section, with his
explicit permission.

### The training reel shows a minor

The Instagram reel now embedded in the Fitness Training block shows Millz doing
pad work with a **young athlete**. Worth being deliberate about, for the same
reason `hero-01.jpg` was pulled.

Two things make this materially lower risk, which is why it is embedded rather
than held back:

- **Nothing is re-hosted.** The video stays on his own Instagram account, under
  his control. The site frames it and links to it. If he takes it down, it
  disappears from the site too.
- **It is already public**, posted by him, on an account he owns.

Even so: a parent signing a *training waiver* is not the same as consenting to
their child appearing in marketing. If that consent was not explicitly given,
either get it or swap the reel for one without minors in it. Changing it is one
line in `content/divisions.ts`.

### Not published, but worth raising

The client trains under-18s, carries **no liability insurance**, and holds **no
certifications**. None of that is on the site — the credentials block stays empty
and renders nothing.

That is his commercial decision, not a website problem. But training minors
without insurance is a material risk, and a lender may well ask about it.

---

## 🟡 Still needed

### Training photography — still the biggest visual gap

The client says he already has photographs of sessions, but has not sent them.
The Fitness Training block remains a labelled placeholder sized to 4:3.

### A straight portrait

The About section currently uses his boxing photograph, which he confirmed and
approved. It works as background, but a plain portrait would serve the section
better — a lender is looking for a person, not an athlete.

### Product photography, resized

Eight garment mockups are unused. They are 2–6 MB each and must be resized before
they go anywhere near the site. Worth adding a small product strip to the apparel
block once the store URL exists.

### Testimonials

"Not yet." The component stays hidden until there is a real, attributable quote.

---

## 🔵 Agreed, not yet built

The client said yes to these:

- **Online booking.** He wants a calendar people can book into directly. Needs a
  decision on which service (Calendly, Acuity, Square) and an account.
- **Google Business Profile.** Free, and the highest-leverage thing for being
  found by someone searching "personal trainer Waseca". Needs to be claimed and
  verified by him.
- **Privacy policy and terms.** Not requested by the client, but the contact form
  collects name, email and phone with no policy anywhere on the site. I can draft
  both from the real data flow.

He said **no** to a blog or news section, and **no** to publishing client
numbers.

---

## ⚪ Fonts — no licence needed, and nothing outstanding

Athelas was tried and dropped: it read visibly thin reversed on the dark
surfaces, and shipped as a single weight with no way to compensate. The body face
is now **Literata**, which is OFL — **no licence to buy.** See DECISIONS.md §3.1.

**Vanguard** (the intended display pairing) is commercial and was never supplied,
so headings remain Archivo Expanded. Send the webfont files and a licence and I
will wire it — but the current pairing works, so this is optional, not blocking.

---

## ⚫ Technical, unchanged

- **Logo as SVG.** The monogram is keyed from a 359×500 JPEG and cannot exceed
  about 138px on screen before it softens.
- **Resend.** `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL` must
  be set in Vercel, and the sending domain verified, or the form cannot deliver.
- **Re-measure Lighthouse** against the deployed URL.
