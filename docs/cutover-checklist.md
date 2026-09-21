# Cutover checklist

Run these in order. **Step 14 (cancelling Wix) is last for a reason** — until
DNS is verified, the Wix site is the rollback.

Anything marked **[Holly]** needs her, not you.

---

## Before you start — things that block launch

- [ ] **Two cat photos still trapped on Wix.** Sixteen of eighteen were
      rescued. These two return `Forbidden` to any external request and need to
      be downloaded from the Wix media manager while you're still logged in:
      - `15cc0e_0b745bed92d04831aa132a63e92d5f60~mv2.jpg` (portrait, unnamed)
      - `15cc0e_7f687c8fec744ad48021731b2409d014~mv2.jpg` (**Gigi**)

      Drop them in `src/assets/cats/` and add entries to `src/data/cats.ts`.
      **Do this before step 14** or they're gone permanently.
- [ ] **[Holly] Decide on the three held-back reviews.** See
      `src/data/reviews.ts` — each has a `holdReason`. The important one is
      Jennifer Berns, whose review says Holly gives her cat medication, which
      contradicts the FAQ. Confirm which is true, then either publish the
      review and soften the FAQ, or leave it held. **Don't edit the quote.**

---

## 1. Rescue the last Wix assets

Everything else is already in `src/assets/cats/`. Confirm the two files above
are downloaded before anything touches the Wix account.

## 2. Create a Web3Forms access key

1. Go to <https://web3forms.com>, enter `SHJRising@aol.com`, and get the
   access key emailed to you.
2. **If it asks for a website URL, use `https://www.bocapetsitting.com`** — the
   production domain, not the deployed `.workers.dev` one. The field is informational: the
   access key is bound to the *email address*, not the domain ("an alias to
   your email", per their docs), and **domain restriction is a Pro feature**.
   So the key will keep working from the `.workers.dev` preview URL at step 7,
   which is what you'll be testing against before DNS cutover.
3. In the Web3Forms dashboard, add **your own email as a CC recipient** so you
   can see whether the site is actually producing leads for the first few
   months.
4. Keep the key — it goes in step 5. It's a public key by design; it only
   permits delivery to the inbox it's bound to, never anywhere else, so it's
   safe in client HTML. The tradeoff of no domain enforcement is that the key
   could be reused from another site — the worst case is spam into Holly's
   inbox, which the form's honeypot field handles.

## 3. Push to GitHub

```bash
cd C:/Users/Mitch/Documents/GitRepos/Best-In-Boca-Petsitters
git push -u origin main
```

## 4. Create the Cloudflare project

> **What actually happened (2026-09-21):** Cloudflare now routes new Git
> projects into **Workers Builds**, not Pages. So this deployed as a *Worker*
> serving static assets, and the live URL is
> **<https://best-in-boca-petsitters.mitchenfield.workers.dev>** — which is why
> no "Visit site" button appears anywhere in the Pages section. The site works
> correctly there; see "Known issues with the Workers deploy" below.

Cloudflare dashboard → **Compute (Workers & Pages)** → **Create** →
**Connect to Git** → pick `MEnfield/Best-In-Boca-Petsitters`.

Build settings:

| Setting | Value |
| --- | --- |
| Framework preset | Astro |
| Build command | `pnpm build` |
| Build output directory | `dist` |
| Node version | `22` (set env var `NODE_VERSION` = `22`) |

### The Workers deploy is configured by `wrangler.jsonc`

The first build had two defects, both caused by the repo not telling Cloudflare
what it wanted. `wrangler.jsonc` now does, and both are fixed:

1. **The build no longer mutates `astro.config.mjs`.** With no wrangler config,
   `wrangler deploy` ran `astro add cloudflare`, installed the SSR adapter and
   rebuilt the whole site a second time as a server Worker — with a KV session
   binding and a warning that sharp cannot run at runtime. Declaring an
   `assets` block with **no `main`** deploys assets only: no Worker script, no
   SSR, no second build. Verified by `wrangler deploy --dry-run`: "No bindings
   found", and the upload is 0.36 KiB of config rather than a Worker bundle.
2. **Trailing-slash redirects are gone.** `html_handling: "drop-trailing-slash"`
   makes the server agree with Astro's `trailingSlash: "never"`, so `/faq`
   serves directly instead of 307-ing to `/faq/`. Every canonical tag and
   sitemap entry now resolves in one hop.

It also sets `not_found_handling: "404-page"`, so a stale inbound link gets the
real 404 page — with the nav and the phone number on it — rather than a bare
response.

**After the custom domain is live (step 9), set `workers_dev` to `false`** in
`wrangler.jsonc`. The `*.workers.dev` hostname otherwise serves a complete
duplicate of the site. The canonical tags are absolute and point at the real
domain so Google will consolidate, but not publishing the duplicate is tidier.

**What to check in the next build log:** no `astro add cloudflare` line, no
`mode: "server"`, no `[@astrojs/cloudflare]` messages, and one `pnpm build`
rather than two.

## 5. Set environment variables

Settings → **Environment variables**. Add to **both** Production and Preview:

| Name | Value |
| --- | --- |
| `PUBLIC_WEB3FORMS_KEY` | the key from step 2 |
| `PUBLIC_CF_ANALYTICS_TOKEN` | from step 6 — add after you have it |
| `NODE_VERSION` | `22` |

> If `PUBLIC_WEB3FORMS_KEY` is missing, the build prints a warning and **the
> contact form silently fails to deliver**. Don't skip this.

## 6. Turn on Cloudflare Web Analytics

Cloudflare dashboard → **Analytics & Logs** → **Web Analytics** → add
`www.bocapetsitting.com`. Copy the token into `PUBLIC_CF_ANALYTICS_TOKEN` and
redeploy.

No cookies, so no consent banner is needed.

**What you'll be able to measure.** Phone calls normally leave no trace at all,
so the site pushes a synthetic pageview when someone taps a phone link. In the
Web Analytics page list, look for:

- `/event/tel` — someone tapped a phone number
- `/event/form-submit` — someone pressed the form's submit button
- `/contact` — reached the booking page

Those three are the conversion funnel. Without them, in six months nobody can
answer "did the website work?".

## 7. Test the preview URL

Open the deployed URL (`<project>.<account>.workers.dev`) on a real phone:

- [ ] Tapping the sticky bottom bar opens the dialer with **(561) 674-2378**
- [ ] The contact form submits and Holly **and you** both receive the email
- [ ] The success message appears without leaving the page
- [ ] Submitting an empty form shows the error summary
- [ ] The mobile menu opens, closes, and closes again on Escape

## 8. **[Holly] Review**

Send her the `.workers.dev` link and ask her to read it **on her own phone**.
Specifically ask her to check:

- [ ] Every price is right ($25, +$5 per cat, +$10 holidays, +$10 over 5 miles)
- [ ] The service area and the 10-mile limit are right
- [ ] Hours — Google currently says 9am–8pm daily. Still true?
- [ ] The "what I don't do" wording (no medication, no boarding, no outdoor
      cats, no seriously ill cats) is how she'd put it
- [ ] The cancellation and payment wording is accurate
- [ ] She's happy with every cat photo being public

**Do not proceed past this point until she's said yes.** Her phone number and
twenty-year reputation are on this.

## 9. DNS — read this before touching anything

**Correction to an earlier assumption: the domain is not at GoDaddy.** Looked up
2026-09-21 via RDAP and live DNS:

| | |
| --- | --- |
| Registrar | **DNC Holdings, Inc.** — the registrar Wix resells through |
| Nameservers | `NS1.WIX.COM`, `NS2.WIX.COM` |
| Registered | 2006-08-06 (last changed 2021-08-30) |
| Expires | 2030-08-06 |

So the domain was bought **through Wix** and Wix is authoritative for DNS. This
has two consequences that matter.

### 9a. There is live mail routing on this domain

```
MX     bocapetsitting.com          10 a-69-5-72-123.bocapetsitting.com
A      a-69-5-72-123...            69.5.72.123
CNAME  mail.bocapetsitting.com  -> a-69-5-72-123.bocapetsitting.com
```

That is a working mail-forwarding setup. **If you move nameservers and don't
recreate this, every email sent to anything@bocapetsitting.com stops arriving,
silently.**

- [ ] **[Holly] Ask her whether she uses any @bocapetsitting.com address.** She
      gave us an AOL address for the site, so it may be vestigial — but "may be"
      isn't good enough to break someone's email on.
- [ ] If she does use it, recreate the MX and CNAME above in Cloudflare exactly,
      **or** set up Cloudflare Email Routing to forward that address to her AOL
      inbox instead (step 10), which is cleaner.
- [ ] There are **no TXT or SPF records**, so nothing else to carry across.

For reference, the records being replaced:

```
A      bocapetsitting.com       185.230.63.171 / .107 / .186   (Wix)
CNAME  www.bocapetsitting.com   cdn1.wixdns.net                (Wix CDN)
```

### 9b. The domain and the Wix site plan are separate subscriptions

**Do not assume cancelling Wix hosting is safe for the domain.** On Wix these
are billed separately, and a domain bought through them can be bundled with a
Premium plan voucher.

- [ ] In **Wix → Billing & Payments → Subscriptions**, list what she actually
      pays for. Expect two lines: a Premium site plan and a domain. Screenshot
      it before changing anything.
- [ ] Confirm the domain has **auto-renew on**. It's paid to 2030 at the
      registry, but the Wix-side renewal is what keeps it hers.

### 9c. Point DNS at Cloudflare

Two routes. **Take option A** — it's reversible and doesn't touch registration.

**Option A — change nameservers, leave the domain registered at Wix (recommended)**

1. Cloudflare → **Add a site** → `bocapetsitting.com` → Free plan.
2. Cloudflare scans existing records. **Check that the MX from 9a came across.**
   Add it by hand if not.
3. Cloudflare gives you two nameservers. In **Wix → Domains → your domain →
   Advanced → Nameservers**, switch to "Use external nameservers" and enter
   Cloudflare's.
4. Wait for Cloudflare to report the site **Active** (usually minutes, up to 24h).
5. In the Worker project → **Settings → Domains & Routes** → add
   `www.bocapetsitting.com` **and** `bocapetsitting.com`.
6. Redirect the apex to `www` — www is what Google has indexed for years, so it
   stays canonical.

**Option B — transfer the domain to Cloudflare Registrar (later, optional)**

Cheaper (~$10/yr at cost, no markup) and consolidates everything in one place.
But it needs an unlock plus auth code from Wix, takes up to 7 days, and there's
a 60-day lock after any registrant change. **Don't do this during launch.** It's
a good tidy-up once the site has been live and stable for a month.

## 10. Email forwarding (free, and it may also solve 9a)

Cloudflare → **Email** → **Email Routing** → enable, then create:

`holly@bocapetsitting.com` → forwards to `SHJRising@aol.com`

A business-domain address reads more established than a generic webmail one on
a public page. If Holly *was* using an @bocapetsitting.com address via the old
MX, recreate that same address here — Email Routing replaces the old forwarding
entirely, and does it for free.

> Enabling Email Routing **replaces the MX records** on the domain. That is
> fine, and is the intended outcome — but it is also why 9a has to be answered
> first. Find out what the old MX was doing before you overwrite it.

Once it's working and verified, update `src/data/site.ts`:

```ts
email: {
  address: "holly@bocapetsitting.com",
  href: "mailto:holly@bocapetsitting.com",
},
```

That is the only place to change it — every other use reads from there.

## 11. Verify the redirects

The old site's only other indexed URL is `/testimonials`, and it's linked from
her home page. After DNS propagates:

```bash
curl -sI https://www.bocapetsitting.com/testimonials | head -3
# expect: HTTP/2 301  +  location: /reviews
```

Also check: `/`, `/about`, `/cat-sitting`, `/reviews`, `/faq`, `/contact`,
`/snowbird-cat-care`, and a made-up URL (should give the 404 page).

## 12. Google Search Console

1. <https://search.google.com/search-console> → add property
   `https://www.bocapetsitting.com`.
2. Verify by DNS TXT record (easy now that Cloudflare holds DNS).
3. Submit the sitemap: `https://www.bocapetsitting.com/sitemap-index.xml`
4. Use **URL Inspection → Request indexing** on the home page and the FAQ page
   to nudge the first crawl.

## 13. Google Business Profile — the highest-value step here

This isn't code, and it will produce more calls than anything in this repo.

- [ ] **Confirm the business name is exactly `Best In Boca Pet Sitters`.**
      The site, schema and every directory key off that string.
- [ ] **Update the website link** to `https://www.bocapetsitting.com`.
- [ ] **Switch to a service-area business** so her home address stops being
      public — this was her request. Google → Edit profile → Location → remove
      the street address and add service areas (Boca Raton, Delray Beach,
      Deerfield Beach). Ranking is unaffected: proximity is still computed from
      the hidden address.
- [ ] **Check the hours** match the site (9am–8pm daily).
- [ ] **Upload the cat photos there too.** Photos on the Profile affect Maps
      ranking; photos on the website don't.
- [ ] **Clean up the copies.** The address also appears on
      [Yahoo Local](https://local.yahoo.com/info-45939478-best-in-boca-petsitters-boca-raton/),
      [Birdeye](https://reviews.birdeye.com/best-in-boca-pet-sitters-149248902083978)
      and [Yelp](https://www.yelp.com/biz/best-in-boca-petsitters-boca-raton).
      They scrape from Google, so most will drop it on the next re-scrape, but
      Yelp needs claiming directly. Total erasure isn't realistic; partial is.
- [ ] **[Holly] Start asking happy clients for Google reviews.** Going from 31
      to 50 will do more for her Maps position — which is where her traffic
      actually comes from — than anything on this website.

## 14. Only now, cancel Wix

Confirm first:

- [ ] `https://www.bocapetsitting.com` serves the new site
- [ ] `/testimonials` redirects
- [ ] Both missing cat photos are downloaded
- [ ] Search Console shows the sitemap as read

Then cancel **only the Wix Premium site plan** — not the domain subscription.
They are separate line items (see 9b), and the domain is the one asset here
that cannot be rebuilt: it carries twenty years of history and every inbound
link and directory listing points at it.

That's **$200–350/year** back, which more than covers the pet-sitter liability
insurance discussed below.

---

## After launch

### Pet-sitter insurance — the best $200 in this project

**[Holly]** Liability insurance runs roughly **$150–250/year** from specialists
like Pet Sitters Associates or Business Insurers of the Carolinas. Every
marketplace she competes with — Rover, Meowtel, Care.com — leads with "insured".
Right now she can't tick that box, and it's the first one a careful Boca client
looks for.

The Wix saving pays for it with change left over.

When she has it, add the badge — the trust bar is already built to take a sixth
item. In `src/components/TrustBar.astro`:

```ts
{ value: "Insured", label: "Liability cover in place" },
```

**Until she actually has it, the site must never imply it.** Nothing currently
does.

### The photo of Holly

Shipped: `src/assets/holly.jpg`, used on `/` and `/about`.

The source is a 9:16 phone portrait, which runs absurdly tall in a layout
column, so it is cropped to **4:5** with `object-position: 50% 22%` — biased
upward because her face and the cat sit in the top two-thirds and the bottom
third is mostly shirt. If you ever swap the photo for one framed differently,
that `object-position` is the number to re-check, in `src/pages/index.astro`
and `src/pages/about.astro`.

### Adding the other 14 reviews

The site shows the 17 that were on the old site, minus 3 held back. Google has
31. Copy the rest into `src/data/reviews.ts` following the existing shape —
verbatim, including typos.

### Things deliberately left undone

- **No blog.** For a solo sitter it becomes three posts and then silence, which
  looks worse than nothing. Grow the FAQ instead.
- **No online booking calendar or live chat.** Her bottleneck is her own
  availability, not lead capture speed.
- **No same-day callback promise.** She couldn't commit to it, so the site
  doesn't claim it.
