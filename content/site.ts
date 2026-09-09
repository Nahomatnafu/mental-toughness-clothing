/**
 * Site-wide facts. Everything a page says about the business comes from here,
 * so a correction is one edit. Items marked PLACEHOLDER are unconfirmed — the
 * full list is in CLIENT-TODO.md.
 */
export const site = {
  name: "Mental Toughness Clothing",
  shortName: "Mental Toughness",
  /** The brand's own words, from the STAY STRONG badge on the joggers and shorts. */
  tagline: "Stay strong.",
  description:
    "Everyday clothing for mental health awareness, resilience, and active living. Shop Mental Toughness tees, hoodies, and more.",
  // PLACEHOLDER — the parent site already points the apparel division here, but
  // the client has not confirmed what is at this domain. See CLIENT-TODO.md §1.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mentaltoughnessclothing.shop",
  locale: "en_US",
  region: { state: "Minnesota", area: "southern Minnesota", country: "US" },

  parent: {
    // The client gave "Millz Global LLC" as the exact registered name and the
    // parent site currently uses it throughout. The brief's "MILLZ Global
    // Solutions LLC" is unresolved — see CLIENT-TODO.md §1 and DECISIONS.md §9.
    legalName: "Millz Global LLC",
    url: "https://millzglobalsolutions.org",
    description:
      "Mental Toughness Clothing is a brand of Millz Global LLC, a Minnesota company that also runs Millz Fitness Training.",
  },

  contact: {
    // Number the client asked to publish (CLIENT-ANSWERS.md). Confirm it should
    // also appear on the apparel site — CLIENT-TODO.md.
    phone: "+15074565565",
    phoneDisplay: "(507) 456-5565",
    hours: "2:30 – 5:30 pm Central",
    // No email is published: the client's inbox on the parent domain does not
    // exist yet. The contact form is the written channel.
    email: null as string | null,
  },

  social: [
    // Confirmed as the client's account (CLIENT-ANSWERS.md — "@toughclothin ... Yes, that's mine").
    { label: "TikTok", handle: "@toughclothin", url: "https://www.tiktok.com/@toughclothin" },
    // Given by the client as the brand's Snapchat.
    { label: "Snapchat", handle: "toughclothing", url: "https://www.snapchat.com/add/toughclothing" },
  ],

  /** Where the product is sold in person today. PLACEHOLDER — confirm the mall arrangement. */
  inPerson: ["River Hills Mall, Mankato", "County fairs across southern Minnesota"],

  drop: {
    name: "Mental Toughness news",
    /** "waitlist" until Phase 2 ships. Nothing on the site takes money while this is "waitlist". */
    status: "waitlist" as "waitlist" | "open",
    /** Deliberately no date: none has been set. The copy says so. */
    timing: "No date yet. The list hears first.",
  },

  /** Crisis resource, used on /about and in the footer. Real number, real link. */
  crisis: {
    name: "988 Suicide & Crisis Lifeline",
    number: "988",
    url: "https://988lifeline.org",
  },
} as const;

export const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

/** Options in the contact form's topic select. Shared by the form and its server action. */
export const contactTopics = ["An order", "Wholesale or stocking the brand", "Press", "Something else"] as const;
