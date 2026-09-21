# Cutover checklist

Run these in order. **Step 14 (cancelling Wix) is last for a reason** — until
DNS is verified, the Wix site is the rollback.

Anything marked **[Holly]** needs her, not you.

---

## Before you start — things that block launch

- [ ] **[Holly]** A real photograph of her. The site ships a deliberately ugly
      pink placeholder so it can't be mistaken for finished. See "Replacing the
      placeholder" below.
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

1. Go to <https://web3forms.com>, enter `SHJRising@gmail.com`, and get the
   access key emailed to you.
2. In the Web3Forms dashboard, add **your own email as a CC recipient** so you
   can see whether the site is actually producing leads for the first few
   months.
3. Keep the key — it goes in step 5. It's a public key by design; it only
   permits posting to the inbox it's bound to, so it's safe in client HTML.

## 3. Push to GitHub

```bash
cd C:/Users/Mitch/Documents/GitRepos/Best-In-Boca-Petsitters
git push -u origin main
```

## 4. Create the Cloudflare Pages project

Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** →
**Connect to Git** → pick `MEnfield/Best-In-Boca-Petsitters`.

Build settings:

| Setting | Value |
| --- | --- |
| Framework preset | Astro |
| Build command | `pnpm build` |
| Build output directory | `dist` |
| Node version | `22` (set env var `NODE_VERSION` = `22`) |

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

Cloudflare gives you `<project>.pages.dev`. Check on a real phone:

- [ ] Tapping the sticky bottom bar opens the dialer with **(561) 674-2378**
- [ ] The contact form submits and Holly **and you** both receive the email
- [ ] The success message appears without leaving the page
- [ ] Submitting an empty form shows the error summary
- [ ] The mobile menu opens, closes, and closes again on Escape

## 8. **[Holly] Review**

Send her the `.pages.dev` link and ask her to read it **on her own phone**.
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

## 9. DNS

Email routing requires Cloudflare to be authoritative, so the nameservers move.
**The domain stays registered at GoDaddy** — only the nameservers change.

1. Cloudflare → **Add a site** → `bocapetsitting.com` → Free plan.
2. Cloudflare scans the existing records. **Check the list before continuing** —
   if Holly has any email or other services on this domain, those records must
   carry over or they'll break.
3. Cloudflare gives you two nameservers. In **GoDaddy → Domain settings →
   Nameservers → Change → Enter my own**, replace both.
4. Wait for Cloudflare to report the site as Active (usually minutes, up to 24h).
5. Pages project → **Custom domains** → add `www.bocapetsitting.com` **and**
   `bocapetsitting.com`.
6. Set the apex to redirect to `www` — www is the version Google has indexed
   for years, so it stays canonical.

## 10. Email forwarding (free, and worth doing)

Cloudflare → **Email** → **Email Routing** → enable, then create:

`holly@bocapetsitting.com` → forwards to `SHJRising@gmail.com`

A business-domain address reads more established than a Gmail address on a
public page. Once it's working and verified, update `src/data/site.ts`:

```ts
email: {
  address: "holly@bocapetsitting.com",
  href: "mailto:holly@bocapetsitting.com",
},
```

and the fallback address in `src/components/ContactForm.tsx`.

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

Then cancel the Wix premium plan. That's **$200–350/year** back, which more
than covers the pet-sitter liability insurance discussed below.

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

### Replacing the placeholder photo

1. Save the photo as `src/assets/holly.jpg` (portrait, at least 1000px tall).
2. In `src/pages/index.astro` and `src/pages/about.astro`, replace the
   `<img src="/holly-placeholder.svg" …>` block with:

   ```astro
   import holly from "@/assets/holly.jpg";
   ...
   <Image src={holly} alt="Holly Rising, owner of Best In Boca Pet Sitters"
          widths={[420, 640]} sizes="(min-width: 64em) 30vw, 92vw"
          class="meet__img" />
   ```
3. Delete `public/holly-placeholder.svg`.

A real face is the single biggest trust signal on a page like this. Stock
photography would actively hurt — Boca is a small market and Holly's whole
asset is that she's the person who's been doing this since 2006.

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
