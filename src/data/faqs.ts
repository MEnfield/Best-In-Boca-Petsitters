/**
 * FAQ content.
 *
 * This is the highest-value page on the site and it does two jobs at once:
 * every entry answers a real long-tail search query *and* clears an objection
 * that otherwise stops someone from calling.
 *
 * Every answer here came from Holly directly. Do not invent an answer — if a
 * question comes up that she hasn’t answered, ask her rather than guessing.
 * A confident wrong answer about medication or emergencies is worse than no
 * page at all.
 *
 * Answers render as HTML so a phone number can be a tel: link.
 */

export interface Faq {
  question: string;
  /** Trusted, authored HTML — never user input. */
  answer: string;
  category: FaqCategory;
  /** Surfaced on the home page’s short FAQ teaser. */
  featured?: boolean;
}

export type FaqCategory =
  | "Getting started"
  | "The visits"
  | "Cats I care for"
  | "Booking & payment"
  | "Area & travel";

export const faqCategories: FaqCategory[] = [
  "Getting started",
  "The visits",
  "Cats I care for",
  "Booking & payment",
  "Area & travel",
];

export const faqs: Faq[] = [
  // ---------------------------------------------------------------- Getting started
  {
    category: "Getting started",
    featured: true,
    question: "How do we start? Is the meet &amp; greet really free?",
    answer: `<p>Yes — the first visit is free and there is no obligation. We call it a meet &amp; greet, and it happens in your home so I can meet your cat on their own turf and you can decide whether you’re comfortable with me.</p>
      <p>We’ll go over your cat’s routine, where everything lives, how you’d like to hear from me, and how I’ll get in. If it feels like a fit, we sign the service agreement and vet release then, and I’ll have what I need for every booking after that.</p>`,
  },
  {
    category: "Getting started",
    featured: true,
    question: "How do you get into my home?",
    answer: `<p>Whatever is safest and most comfortable for you. Most clients give me a key at the meet &amp; greet, but a keypad or door code works just as well, and plenty of people prefer it — nothing physical changes hands.</p>
      <p>However we do it, we agree on it together before your first booking. I’d rather spend an extra ten minutes getting this right than have you wondering about it from the airport.</p>`,
  },
  {
    category: "Getting started",
    question: "Is there a contract?",
    answer: `<p>Yes. Before I care for your cat I’ll have you sign a service agreement and a veterinary release. The release is what lets me get your cat to a vet quickly if it’s ever needed, without waiting to track you down first.</p>
      <p>Twenty years in, I’ve learned that the paperwork is what lets everyone relax. It takes five minutes at the meet &amp; greet.</p>`,
  },

  // ---------------------------------------------------------------- The visits
  {
    category: "The visits",
    featured: true,
    question: "Will I get photos and updates while I’m away?",
    answer: `<p>Yes, by text — and as often as you want them. Some clients want a photo after every single visit. Some want one note a day. Some would rather hear from me once a week unless something needs their attention.</p>
      <p>We’ll settle on what you want at the meet &amp; greet, and you can change it any time. There’s no wrong answer, and I’d much rather send too many pictures than too few.</p>`,
  },
  {
    category: "The visits",
    question: "What happens during a visit?",
    answer: `<p>Fresh water, food, a scooped litter box, and treats if you allow them — plus real time spent with your cat, which for a lot of them is the part that matters most.</p>
      <p>While I’m there I’ll also bring in your mail and packages, water your plants, and adjust lights, drapes, the TV or music so the house looks lived-in. Small household things are included; if you need something bigger, just ask and we’ll sort it out.</p>`,
  },
  {
    category: "The visits",
    featured: true,
    question: "What if there’s an emergency?",
    answer: `<p>My first call is always to you, so you can decide what you want to do. If your cat needs a vet and I can’t reach you, the signed veterinary release means I can get them there without losing time.</p>
      <p>Emergencies aren’t only medical, either. I keep an eye on the house while I’m in it — a leak, an AC unit gone out in August, anything that looks wrong. One client came home to find I’d stayed at her house until the AC repair was finished, because I wasn’t leaving her cat in that heat.</p>`,
  },
  {
    category: "The visits",
    question: "How many visits a day do most cats need?",
    answer: `<p>Most cats do well with one visit a day. Some do better with two — particularly if they’re anxious when they’re alone, or eat on a split schedule. There’s no minimum, so if you’re gone one night and want a single visit, that’s perfectly fine.</p>
      <p>We’ll work out what your cat actually needs when I meet them.</p>`,
  },

  // ---------------------------------------------------------------- Cats I care for
  {
    category: "Cats I care for",
    featured: true,
    question: "Do you give medication?",
    answer: `<p>No — I don’t administer medication of any kind, including pills and injections.</p>
      <p>If your cat needs medication while you’re away, you’ll want a sitter with veterinary training, and I’d rather tell you that now than have you find out at the meet &amp; greet. Ask me and I’ll happily point you toward someone who can help.</p>`,
  },
  {
    category: "Cats I care for",
    question: "Do you care for outdoor cats?",
    answer: `<p>I care for indoor cats only. It isn’t that I don’t love the outdoor ones — it’s that I can’t do the job properly if I can’t reliably find them, check on them, and know they’ve eaten.</p>`,
  },
  {
    category: "Cats I care for",
    question: "Do you board cats at your home?",
    answer: `<p>No, and I don’t intend to. Cats are territorial creatures and almost all of them do better in their own house with their own smells, their own windows, and their own routine. They love their own home best.</p>
      <p>Everything I do happens in your home, which is also why my visits double as a check on the house itself.</p>`,
  },
  {
    category: "Cats I care for",
    question: "Can you care for a seriously ill or very elderly cat?",
    answer: `<p>Not usually, and I want to be straightforward about why. Cats who are near the end of their lives, or who need hospice-level care, deserve someone with medical training who can respond to a bad night properly. That isn’t me, and pretending otherwise wouldn’t be fair to your cat.</p>
      <p>Please do call anyway. I know the people in this area and I’m glad to point you toward the right kind of help.</p>`,
  },

  // ---------------------------------------------------------------- Booking & payment
  {
    category: "Booking & payment",
    featured: true,
    question: "How much does it cost?",
    answer: `<p><strong>$25 per visit</strong> for one cat, and <strong>$5 for each additional cat</strong>. Bringing in the mail, watering plants, adjusting lights and small household tasks are included at no extra charge.</p>
      <p>There’s a <strong>$10 per visit</strong> holiday charge on major holidays, and a <strong>$10 per visit</strong> travel charge if you’re more than five miles from me in West Boca. If you’d like something beyond the usual, tell me what you need and I’ll quote it before we book.</p>`,
  },
  {
    category: "Booking & payment",
    question: "How do I pay?",
    answer: `<p>Cash, Zelle, or Venmo. I’m not set up for credit cards or checks.</p>
      <p>Payment is due when you book. By then we’ll have already met in person at your free meet &amp; greet — you won’t ever be sending money to someone you haven’t shaken hands with.</p>`,
  },
  {
    category: "Booking & payment",
    question: "What if I need to cancel?",
    answer: `<p>Cancelled visits aren’t refundable. When I take your dates I hold them and turn other clients away, so I can’t usually fill them again at short notice.</p>
      <p>That said — call me. Plans change, flights get cancelled, and I’d always rather hear from you and see what we can work out than have you not ring.</p>`,
  },
  {
    category: "Booking & payment",
    featured: true,
    question: "How far in advance should I book?",
    answer: `<p>The sooner the better, honestly. If you’ve booked with me before, about <strong>a week’s notice</strong> is usually plenty. If we haven’t met yet, aim for <strong>two weeks</strong> — that gives us time for the meet &amp; greet before your trip.</p>
      <p>Holidays fill up first, so if you’re travelling at Christmas or Thanksgiving, call early. And if something’s come up suddenly, ring me anyway — I’ll do whatever I can to fit you in.</p>`,
  },

  // ---------------------------------------------------------------- Area & travel
  {
    category: "Area & travel",
    featured: true,
    question: "What areas do you cover?",
    answer: `<p>West Boca Raton, Delray Beach, and Deerfield Beach, along with the communities in between.</p>
      <p>Within five miles of me in West Boca there’s no travel charge. Beyond that it’s <strong>$10 per visit</strong>, and I don’t travel more than ten miles out — past that I can’t guarantee I’d reach your cat quickly if something went wrong, and that’s the whole point of hiring me.</p>`,
  },
  {
    category: "Area & travel",
    question: "Can you look after my house while I’m north for the summer?",
    answer: `<p>Yes, and a good part of what I do is exactly that. Boca empties out for months at a time and I’ve looked after cats and houses through absences of three months and longer.</p>
      <p>On a long absence the house matters as much as the cat: mail collected so it isn’t piling up visibly, plants watered, lights and blinds changed so the place looks occupied, and someone physically walking through several times a week who’d notice a leak or a failed AC before it became a catastrophe.</p>`,
  },
];

export const featuredFaqs = faqs.filter((f) => f.featured);

export const faqsByCategory = faqCategories.map((category) => ({
  category,
  items: faqs.filter((f) => f.category === category),
}));
