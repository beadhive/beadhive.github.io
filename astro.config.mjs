// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Served at the apex of the custom domain (beadhive.ai — DNS in infra's
// tofu/porkbun_dns.tf, Pages custom domain in tofu/github_repos.tf), so no base
// path. `site` MUST be the public host: Layout.astro derives every
// <link rel="canonical">, og:url and the absolute og:image from it, so leaving
// this as beadhive.github.io points search engines and link unfurls at the old
// host and makes every page look like a duplicate of a different origin.
export default defineConfig({
  site: 'https://beadhive.ai',
  integrations: [
    // Emits sitemap-index.xml + sitemap-0.xml from `site` above. `filter` drops
    // /llms.txt: it is a machine-readable index for agents, not a page for
    // search engines to rank, and listing it invites it being treated as one.
    sitemap({ filter: (page) => !page.includes('/llms.txt') }),
  ],
});
