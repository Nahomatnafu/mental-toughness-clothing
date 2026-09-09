/** Brand direction adapted from the client's existing Shopify storefront. */
export const home = {
  hero: {
    lede: "Everyday clothing with a purpose. Supporting mental health awareness, resilience, and a more active life.",
    primary: { label: "Shop the collection", href: "/shop" },
    secondary: { label: "Our story", href: "/about" },
  },
  featured: { eyebrow: "Hoodies", title: "Your everyday layer.", description: "Pullover comfort, bold graphics, and colors that feel like you." },
  story: {
    eyebrow: "Our purpose", title: "Strong in mind. Active in life.",
    paragraphs: [
      "Mental Toughness Clothing is dedicated to mental health awareness and resilience through active living. We believe caring for your mind belongs alongside caring for your body.",
      "From everyday tees to your favorite hoodie, our clothes carry a simple message: stay strong. Wear it to the gym, around town, or wherever your day takes you.",
    ],
    quote: { text: "Stay strong.", attribution: "Mental Toughness Clothing" },
    link: { label: "About the brand", href: "/about" },
  },
  waitlist: { eyebrow: "Stay connected", title: "Join our movement.", description: "New styles, brand news, and a little encouragement along the way." },
} as const;
