/** Home page copy. Voice: plain, quiet, second person where natural. No hustle vocabulary. */
export const home = {
  hero: {
    headline: "Made for the days you keep going anyway.",
    lede: "Heavyweight fleece and tees from a small brand in southern Minnesota. Mental health and physical health, treated as the same work.",
    primary: { label: "Explore the collection", href: "/shop" },
    secondary: { label: "Join the first drop", href: "#waitlist" },
    caption: {
      lead: "Rhinestone Hoodie, red. In stock.",
      rest: "The one product photograph on this site. Everything else is a mockup, and says so.",
    },
  },
  featured: {
    eyebrow: "Drop 01 · the lead piece",
    title: "The Heavyweight Hoodie, three ways.",
    description:
      "Black, red and white. Small monogram at the chest, flag on one sleeve, the wordmark down the other. Shown as mockups: the finished garment is photographed before it ships.",
  },
  collection: {
    eyebrow: "The collection",
    title: "Everything in the first drop.",
    description:
      "Explore the first drop, from the photographed rhinestone hoodie to printed designs and new concept previews. Every image is labelled so you can see what is real and what is still taking shape.",
    lineSheetTitle: "Explore the upcoming pieces",
  },
  story: {
    eyebrow: "Why it exists",
    title: "A reminder you can wear.",
    paragraphs: [
      "Mental Toughness started as something the founder said to himself: stay strong mentally during tough times. It was a reminder before it was a brand, and the clothes are still that — something you put on in the morning that says it back to you.",
      "It sits alongside a training business under one small Minnesota company, because to Millz they are the same job. One builds the body. One reminds the mind. Neither works without showing up.",
      "This isn't a hustle brand. Nobody here is going to tell you pain is weakness leaving the body. It's for the days you keep going anyway — quietly, without an audience.",
    ],
    quote: {
      text: "It means stay strong mentally during tough times.",
      attribution: "Millz Johnson, founder",
    },
    link: { label: "Read the whole story", href: "/about" },
  },
  waitlist: {
    eyebrow: "Drop 01",
    title: "Opens to the list first.",
    description:
      "No date yet. When the first run is printed and checked, the people on this list get a day before anyone else. One email when it happens, nothing in between.",
  },
} as const;
