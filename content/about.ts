/**
 * About page copy.
 *
 * The founder's personal connection to the name is NOT written here. It is the
 * paragraph that makes this brand real, and only he can write it. It renders
 * as a visible, labelled placeholder until he does. See CLIENT-TODO.md §2.
 */
export const about = {
  title: "Wear the reminder.",
  lede: "Mental Toughness Clothing is a small apparel brand from southern Minnesota. It makes heavyweight fleece and tees with one idea on them: keep going.",
  sections: [
    {
      heading: "Where it comes from",
      paragraphs: [
        "The name was a phrase before it was a product. Millz Johnson — a basketball player from Chicago who ended up in Minnesota training kids and older adults — kept it close for his own reasons, and eventually put it on a hoodie so he'd see it in the mirror.",
        "The TM monogram is a T nested over an M inside a shield. It's on every piece, in print or in rhinestones. The rhinestone version came first and is the only one we hold in stock; the printed line is made in small runs when a drop opens.",
      ],
    },
    {
      heading: "Mind and body, one job",
      paragraphs: [
        "The brand shares a company with Millz Fitness Training, where Millz has coached for more than five years, starting with basketball camps. He doesn't see two businesses. He sees one purpose — building and promoting mental toughness, in his words — reached from two sides.",
        "The clothes are the side you can carry out of the gym. A heavyweight hoodie doesn't make anyone stronger. It reminds you that you decided to be.",
      ],
    },
    {
      heading: "What it isn't",
      paragraphs: [
        "It isn't a hustle brand. There's no grinding here, no beast mode, nobody telling you that pain is weakness leaving the body. Most of the people who wear this are recovering from that kind of talk. Showing up on an ordinary hard day is the whole point, and it doesn't need an audience.",
        "It isn't treatment either, and it won't pretend to be. A hoodie can be a reminder. It can't be a plan.",
      ],
    },
  ],
  founderPlaceholder: {
    label: "Millz's paragraph — not written yet",
    body: "This is where the founder says, in his own words, what the name means to him and where it came from. It's the passage that makes this brand real, and only he can write it — so it stays blank rather than written for him.",
  },
  crisis: {
    lead: "If you're in a hard place right now,",
    body: "the 988 Suicide & Crisis Lifeline is free, confidential and open every hour of every day. Call or text 988, or chat at 988lifeline.org.",
  },
  founderPhoto: {
    caption: "Millz Johnson, founder — in the brand's bucket hat and tank.",
  },
  inPerson: {
    heading: "Where to find it in person",
    body: "The rhinestone line sells in person at River Hills Mall in Mankato and at county fairs around southern Minnesota. The online drop is what this site is for.",
  },
} as const;
