// The homepage hero and the site-wide title/description, in one place.
//
// This file previously carried three variants behind a HERO flag — scaffolding
// so framings could be compared rendered rather than argued in the abstract.
// That comparison is settled (bh-infra-3m4.1); the losers are deleted rather
// than left switched off.
//
// The headline and the OG card are deliberately long-form and short-form of ONE
// idea, not two claims: the card (rendered from infra/brand/tokens.json) reads
// "From idea to production, and back." and the lede opens with the same words.
// Changing the h1 to something unrelated would put the two surfaces back into
// disagreement, so change both or neither.

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
