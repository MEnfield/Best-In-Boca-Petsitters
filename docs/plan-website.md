# Best In Boca Pet Sitters — website plan

The decisions behind this build, and why. Written so that in two years someone
can tell which choices were deliberate and which were accidents.

---

## The business

**Holly Rising**, trading as **Best In Boca Pet Sitters**, founded 2006.
In-home cat sitting in West Boca Raton, Delray Beach and Deerfield Beach.

| | |
| --- | --- |
| Phone | (561) 674-2378 — also (561) 674-BEST |
| Email | SHJRising@gmail.com |
| Hours | 9:00 AM – 8:00 PM, seven days |
| Reviews | 4.9★ from 31 on Google |
| Price | $25/visit (1 cat) · +$5 per extra cat · +$10 major holidays · +$10 beyond 5 miles |
| Limits | Indoor cats only · no boarding · **no medication** · no seriously ill or elderly cats · 10-mile hard radius |
| Payment | Cash, Zelle, Venmo. Due at booking, non-refundable. |
| Paperwork | Signed service agreement + veterinary release before first visit |

Everything above lives in `src/data/site.ts`. Change it there, never inline.

> **The old site listed the wrong phone number** in its main call to action —
> 674-**2379** in the hero, 674-**2378** everywhere else. One digit, in the most
> prominent CTA on the page. Only 2378 appears anywhere in this repo.

---

## Strategy: the website is not the traffic engine

This is the decision everything else follows from, and it's worth restating
because it's counter-intuitive.

Holly's stated goal was "SEO, that's how she'll get clients". A hand-built
static site for a one-person business will **not** outrank Meowtel, Rover and
Care.com for "cat sitter boca raton" — Rover alone lists 1,247 cat sitters in
Boca Raton and has a full-time SEO team. Waiting for organic rankings would
produce roughly zero calls and the conclusion that the site was a waste.

What she *can* win, and is already halfway to winning, is the **Google Maps
3-pack**: ranked on proximity, category relevance and reviews rather than
backlinks, and largely unavailable to marketplaces because they aren't local
businesses with a Boca address. She sits at 4.9/31.

So this site has three jobs:

1. **Convert** the people Maps already sends — they arrive pre-sold and need a
   face, a price and a phone number within about eight seconds.
2. **Corroborate** the Google Business Profile. Name, phone, hours, areas and
   categories all agree with the Profile, plus `LocalBusiness` JSON-LD. That
   agreement is itself a ranking signal for the Maps listing.
3. **Catch long tail** the marketplaces ignore — "snowbird cat sitting Boca
   Raton", "cat sitter Woodfield Country Club", "someone to check my house
   while I'm north for the summer". Low volume, near-zero competition, very
   high intent.

**The Google Business Profile work in `cutover-checklist.md` step 13 will
generate more calls than any code in this repo.** It is part of this project.

---

## Stack

| Choice | Why |
| --- | --- |
| **Astro 5** | Static HTML by default, zero JS unless a component opts in. React authoring model without the runtime cost for a brochure site. |
| **React 19** | Exactly one island: the contact form. |
| **Cloudflare Pages** | Free, unlimited bandwidth, and it brings free Email Routing for `holly@bocapetsitting.com`. |
| **Web3Forms** | Form delivery without a backend to maintain. |
| **Self-hosted fonts** | `@fontsource-variable` — no third-party request, no FOUT. |

**Cost: ~$22/year**, which is the domain she already pays for. Everything else
is $0. This replaces a **Wix premium plan at $200–350/year**, so the rebuild
pays for itself and then some.

### Why not a plain Vite + React SPA

It ships an empty `<div id="root">` and fills it with JavaScript. Google can
render that, but it's a real handicap for the long-tail crawling this whole
strategy depends on, and it's slower on a phone in a parking lot — which is
where a large share of these visitors are. For a site with no logged-in state,
an SPA is all cost and no benefit.

### Version note

Built on **Astro 5.18**, deliberately, not Astro 7. Astro 7 was released after
the model's knowledge cutoff and writing against a framework version that
can't be verified risks shipping subtly broken code. Astro 5 is supported and
this is seven static pages — upgrading later is a contained job. Worth doing
eventually; not worth gambling the launch on.

### JS payload

| Page | JavaScript |
| --- | --- |
| Every page except `/contact` | **~780 bytes inline** (nav toggle + conversion tracking) |
| `/contact` | + ~222 KB (React + the form island) |

---

## Pages

| Route | Job |
| --- | --- |
| `/` | Convert Maps traffic. Face, promise, price, phone, proof. |
| `/about` | The trust page. Usually the second page opened, and where the decision is actually made. |
| `/cat-sitting` | Price transparency. Catches "cat sitting prices boca raton". |
| `/snowbird-cat-care` | The long-tail bet. Boca empties May–October; marketplaces are structurally bad at three-month absences. |
| `/reviews` | 31 reviews' worth of proof. |
| `/faq` | Highest-value page. Every entry is both a long-tail query and an objection. |
| `/contact` | The conversion target. |

**No blog.** For a solo operator it becomes three posts and then silence, which
reads worse than nothing. The FAQ grows instead.

**One "Areas I Serve" section, not templated city pages.** Twenty near-identical
neighbourhood pages are doorway pages, against Google's guidelines, and thin
content drags down the pages that are good.

---

## Conversion decisions

- **The ask is a free meet & greet, not a booking.** "Call me" asks a stranger
  to commit to hiring a sitter; a twenty-minute conversation in their own home
  is a far easier yes, and twenty years of reviews say Holly wins people in
  person. She agreed to keep it free rather than charge $25.
- **"How it works" is three steps, and it exists to fix one specific problem.**
  Payment is due at booking and isn't refundable, which sounds alarming until
  you know the free in-person meeting comes first. Showing the order dissolves
  that without a word of reassurance-speak.
- **Photo updates are promoted to a headline feature.** Her reviews mention it
  constantly — *"she sends us photos and updates about our babies"* — and her
  old site never said it once. It was her best-kept secret.
- **Every surcharge is on the page.** Her competitors hide fees until checkout.
  Being the sitter who tells you the real number before you call is a
  differentiator, and a surprise at invoice time is the one thing that costs
  her a five-star review.
- **The "no" list is framed as specialisation, and carries a referral.** Cats
  she can't take get pointed somewhere useful; some of those people come back
  later with a healthy cat.
- **No response-time promise.** She couldn't commit to same-day, so the site
  doesn't claim it. Instead the form's success state says what happens next and
  hands over the phone number as a second chance.
- **First person throughout.** She is one person and every review is about her
  personally. A solo sitter writing "we" throws away her biggest advantage.

---

## Design

The brief was "cutesy, cat-friendly, pretty girly colours". The constraint
pulling the other way is that this service asks a stranger for a house key and
an alarm code. The failure mode of "cutesy" is **amateur**, and a hobbyist
doesn't get the key to a house in Woodfield.

**Resolution: warmth comes from colour, photography and language; credibility
comes from typography, spacing and restraint.**

- **Palette** — blush / cream / plum with sage. Tokens in
  `src/styles/global.css`, all with measured contrast ratios in comments.
- **Type** — Fraunces (display; its `SOFT` and `WONK` axes are what make it
  warm rather than editorial-cold) over Nunito Sans (body).
- **The cute is the real cats.** Fifteen actual client cats, by name. Far
  cuter than illustration and they double as proof. No cartoon paw prints as
  bullets, no bouncing, no neon pink.
- **Accessibility overrides aesthetics.** Boca skews older; a large share of
  visitors are 60+. Body text starts at **17px**, line-height 1.65, every pair
  clears WCAG AA, tap targets ≥44px. The classic failure here is pale pink text
  on cream — photographs beautifully, unreadable to the person actually holding
  the phone.

**Verified: all seven pages score 100 for Accessibility, Best Practices and SEO
in Lighthouse (mobile).**

### A cascade trap worth knowing about

`global.css` uses `@layer`. Astro's page-scoped `<style>` blocks are
**unlayered**, and unlayered styles always beat layered ones regardless of
specificity. A page rule like `.some-nav a { color: … }` will therefore
override `.btn--primary`'s white text — which happened on the FAQ page and
produced plum-on-plum at 2.17:1.

**Scope page-level anchor rules narrowly** (`.some-nav ul a`, not
`.some-nav a`).

---

## Data model

All content is typed data, not markup. Edit these, not the templates.

| File | Contents |
| --- | --- |
| `src/data/site.ts` | Every business fact. The NAP source of truth. |
| `src/data/reviews.ts` | Client reviews, verbatim. `published: false` holds one back with a `holdReason`. |
| `src/data/faqs.ts` | FAQ, grouped by category. Every answer came from Holly. |
| `src/data/cats.ts` | The gallery, with names and alt text. |

**On `faqs.ts`: never invent an answer.** A confident wrong answer about
medication or emergencies is worse than no page. If a question comes up that
Holly hasn't answered, ask her.

**On `reviews.ts`: don't edit quotes to suit the marketing.** Three are held
back rather than trimmed — see the `holdReason` on each, particularly Jennifer
Berns, whose review contradicts the medication FAQ.

---

## Measurement

The primary CTA is a phone call, which normally leaves no trace in analytics at
all. Cloudflare Web Analytics runs in SPA mode; tapping a phone link pushes a
synthetic `/event/tel` pageview and immediately restores the real URL. The
visitor sees nothing and the dialer opens normally.

Watch `/event/tel`, `/event/form-submit` and `/contact`. Without them nobody
can answer "did the website work?" in six months.

`/event/` is disallowed in `robots.txt` — those URLs are never served.

---

## Open items

Tracked in `cutover-checklist.md`:

1. **Insurance** (~$150–250/yr) — not currently held, so the site never implies
   it. The trust bar is built to take the badge when she has it. The Wix saving
   pays for it.
2. **Two cat photos** still on Wix, hard-blocked externally.
3. **Three held-back reviews** awaiting her decision.
4. **GBP → service-area business**, so her home address stops being public.
5. **The other 14 Google reviews.**
