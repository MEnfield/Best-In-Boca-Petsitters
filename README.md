# Best In Boca Pet Sitters

Marketing site for [bocapetsitting.com](https://www.bocapetsitting.com) — Holly
Rising's in-home cat sitting business in West Boca Raton, Delray Beach and
Deerfield Beach.

Astro 5 + React 19 (one island), deployed static to Cloudflare Pages.

## Run it

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # -> dist/
pnpm preview    # serve dist/
pnpm check      # astro check (types + a11y hints)
```

Node 22, pnpm 10.

## Environment

Copy `.env.example` to `.env` for local work. Both values are public by design
(they're readable in the shipped HTML) — neither is a secret.

| Variable | Purpose |
| --- | --- |
| `PUBLIC_WEB3FORMS_KEY` | Contact form delivery. **Without it the form silently fails.** |
| `PUBLIC_CF_ANALYTICS_TOKEN` | Cloudflare Web Analytics. Omitted locally, so nothing loads in dev. |

## Editing content

Content is typed data, not markup. Edit these rather than the templates:

| File | What |
| --- | --- |
| `src/data/site.ts` | Phone, email, hours, prices, service areas. **The single source of truth** — the site and the Google Business Profile must not drift apart. |
| `src/data/faqs.ts` | The FAQ. Every answer came from Holly — **never invent one**. |
| `src/data/reviews.ts` | Client reviews, verbatim. `published: false` holds one back; see its `holdReason`. |
| `src/data/cats.ts` | Gallery photos, names and alt text. |

## Before changing the design

Two things that aren't obvious and will bite:

1. **`global.css` uses `@layer`; Astro's scoped `<style>` blocks don't.**
   Unlayered beats layered regardless of specificity, so a page rule like
   `.some-nav a { color: … }` silently overrides `.btn--primary`. Scope page
   anchor rules narrowly (`.some-nav ul a`).
2. **Astro's `<Image>` emits `width`/`height` attributes.** Those are
   presentational hints, so without an explicit `height` in CSS any
   `aspect-ratio` is ignored. The reset sets `img { height: auto }` — leave it.

Accessibility is a hard constraint, not a preference: this audience skews 60+.
Body text stays at 17px minimum, contrast at WCAG AA, tap targets at 44px. All
seven pages currently score 100 for Accessibility, Best Practices and SEO.

## Docs

- [`docs/plan-website.md`](docs/plan-website.md) — the decisions and why
- [`docs/cutover-checklist.md`](docs/cutover-checklist.md) — launch steps, in order
