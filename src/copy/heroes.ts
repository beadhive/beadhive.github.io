// The homepage hero and the site-wide title/description, in one place.
//
// This file previously carried three variants behind a HERO flag — scaffolding
// so framings could be compared rendered rather than argued in the abstract.
// That comparison is settled (bh-infra-3m4.1); the losers are deleted rather
// than left switched off.
//
// `title` below is the SAME SENTENCE as the OG card, which renders from
// infra/brand/tokens.json — not a paraphrase of it. Editing one without the
// other puts the page and every shared preview into disagreement, and the card
// is a rendered PNG, so it needs `node brand/render.mjs` rather than a redeploy.
//
// The lede opens with "From idea to production — and back", the short form of
// the same idea. That phrase is a supporting line, never the tagline: it reads
// as a fragment anywhere it appears without the sentence it belongs to.

export interface Hero {
  /** Small caps line above the headline. */
  eyebrow: string;
  /** The <h1>. */
  title: string;
  /** The paragraph under the <h1>. Plain text — no markup. */
  lede: string;
  /** Site-wide <title> and meta description. Layout.astro defaults to these. */
  siteTitle: string;
  siteDescription: string;
}

export const hero: Hero = {
  eyebrow: 'Beadhive',
  title: 'An agentic software factory that closes the loop',
  lede:
    'From idea to production — and back. Agents hold most of the seats, humans hold the ones ' +
    'that matter, and what production teaches becomes the next plan.',
  siteTitle: 'Beadhive — an agentic software factory that closes the loop',
  siteDescription:
    'An agentic software factory for the whole SDLC. Adopt it against the repo and workflow you ' +
    'already have, keep humans in the seats you don’t yet want to hand over, and let production ' +
    'behaviour drive what gets built next. Open source, with managed deployments for teams.',
};
