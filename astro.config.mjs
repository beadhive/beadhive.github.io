// @ts-check
import { defineConfig } from 'astro/config';

// Served at the apex of the custom domain (beadhive.ai — DNS in infra's
// tofu/porkbun_dns.tf, Pages custom domain in tofu/github_repos.tf), so no base
// path. `site` MUST be the public host: Layout.astro derives every
// <link rel="canonical">, og:url and the absolute og:image from it, so leaving
// this as beadhive.github.io points search engines and link unfurls at the old
// host and makes every page look like a duplicate of a different origin.
export default defineConfig({
  site: 'https://beadhive.ai',
});
