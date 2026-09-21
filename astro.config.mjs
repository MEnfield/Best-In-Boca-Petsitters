// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

/**
 * Static output. Every page is prerendered HTML at build time — there is no
 * server, and the only JavaScript that ships is the contact form island.
 *
 * `site` must match the canonical hostname exactly; the sitemap, canonical
 * tags and JSON-LD all derive from it. The old Wix site is indexed under the
 * www subdomain, so www stays canonical.
 */
export default defineConfig({
  site: "https://www.bocapetsitting.com",
  output: "static",
  trailingSlash: "never",

  integrations: [
    react(),
    sitemap({
      // Only real, indexable pages. The form's success state is a client-side
      // view of /contact, not a separate URL.
      filter: (page) => !page.includes("/404"),
    }),
  ],

  image: {
    // Cap work on the oversized originals rescued from Wix.
    responsiveStyles: true,
  },

  build: {
    // One stylesheet rather than per-page <style> blocks — this site is small
    // enough that a single cached file beats repeated inlining.
    inlineStylesheets: "auto",
  },

  devToolbar: {
    enabled: false,
  },
});
