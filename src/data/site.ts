/**
 * Single source of truth for every business fact on the site.
 *
 * Local SEO runs on NAP consistency (Name / Address / Phone matching exactly
 * across the website, the Google Business Profile, and every directory).
 * Nothing here should be retyped inline in a page — import it, so the site and
 * the Business Profile can never drift apart.
 *
 * `name` is spelled to match the Google Business Profile character for
 * character, including the capital "In". Do not "fix" it here without changing
 * it there first.
 */

export const site = {
  name: "Best In Boca Pet Sitters",
  owner: "Holly Rising",
  foundedYear: 2006,
  url: "https://www.bocapetsitting.com",

  tagline: "Quality cat care you can trust.",
  shortDescription:
    "In-home cat sitting in West Boca Raton, Delray Beach and Deerfield Beach. One sitter, every visit, since 2006.",

  phone: {
    /** Display form, used everywhere a human reads it. */
    display: "(561) 674-2378",
    /** E.164, used for tel: links. */
    href: "tel:+15616742378",
    /** Her vanity spelling, worth keeping — it is memorable and she uses it. */
    vanity: "(561) 674-BEST",
  },

  email: {
    address: "SHJRising@aol.com",
    href: "mailto:SHJRising@aol.com",
  },

  /**
   * Holly does not want her street address public. Google Business Profile
   * should be set to "service-area business" so the address is hidden there
   * too. City + region + postal code only — never the street.
   */
  location: {
    locality: "Boca Raton",
    region: "FL",
    postalCode: "33434",
    country: "US",
    /** Approximate, zip-level. Used for the map link and schema. */
    latitude: 26.3683,
    longitude: -80.1889,
  },

  serviceAreas: [
    "West Boca Raton",
    "Delray Beach",
    "Deerfield Beach",
  ],

  /** Communities named so neighbourhood searches have something to match. */
  neighborhoods: [
    "Woodfield Country Club",
    "Boca West",
    "Broken Sound",
    "Mizner Park",
    "Royal Palm",
    "Boca Pointe",
    "Stonebridge",
    "Sandalfoot Cove",
  ],

  hours: {
    display: "9:00 AM – 8:00 PM, seven days a week",
    /** schema.org openingHours shorthand */
    opens: "09:00",
    closes: "20:00",
  },

  reviews: {
    rating: 4.9,
    count: 31,
    googleUrl:
      "https://www.google.com/search?q=Best+In+Boca+Pet+Sitters+Boca+Raton",
  },

  pricing: {
    baseVisit: 25,
    additionalCat: 5,
    holidaySurcharge: 10,
    mileageSurcharge: 10,
    /** Free travel radius, in miles, measured from West Boca (33434). */
    freeRadiusMiles: 5,
    /** Hard limit — she will not travel past this. */
    maxRadiusMiles: 10,
    paymentMethods: ["Cash", "Zelle", "Venmo"],
  },
} as const;

/**
 * Web3Forms access key. Public by design — it only permits posting to the
 * inbox it is bound to, so it is safe in client-side HTML.
 * Set PUBLIC_WEB3FORMS_KEY in Cloudflare Pages -> Settings -> Environment
 * variables. See docs/cutover-checklist.md.
 */
export const WEB3FORMS_KEY =
  import.meta.env.PUBLIC_WEB3FORMS_KEY ?? "REPLACE_WITH_WEB3FORMS_ACCESS_KEY";

export type Site = typeof site;
