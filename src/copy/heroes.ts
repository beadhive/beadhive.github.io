// The homepage hero and the site-wide title/description, in one place.
//
// Settled 2026-10-08 (bh-infra-twpm, epic bh-infra-3z09): the `noslop` frame
// won the bh-infra-2sk comparison, so the five losing variants and the HERO
// flag are gone — as the previous header said they should be once a winner
// was picked, rather than left switched off. The lede now carries the product
// noun: Beadhive is a bead-machine, a software factory that runs on beads.
// That definition is stated here, on the home page, once; every other surface
// links to it (docs/design/website-registers.md, topic ownership map). The
// register rule still applies: never "driven by" or "powered by" beads, and
// indict the situation, never the reader.
//
// `title` below is the SAME SENTENCE as the OG card, which renders from
// infra/brand/tokens.json — not a paraphrase of it. Editing one without the
// other puts the page and every shared preview into disagreement, and the card
// is a rendered PNG, so it needs `node brand/render.mjs` rather than a
// redeploy. A new h1 is therefore its own bead, and re-renders the card.
// Banners deliberately differ: they carry the imperative `bannerTagline`
// ("Ship software, not slop.") per the surface split in
// infra/docs/design/hero-copy-brainstorm.md.
//
// ---------------------------------------------------------------------------
// HOUSE PATTERN: COLLAPSE THE SECONDARY AUDIENCE, DON'T DELETE IT.
//
// Settled 2026-08-07 (bh-infra-9ne). When a surface carries content that is
// REAL but is not what most readers came for, put it behind a closed-by-default
// disclosure rather than cutting it or leading with it. Two surfaces now do
// this, for the same reason:
//
//   * beadhive's README collapses "Develop" — true, and most readers are not
//     there to build the tool.
//   * /start collapses "Manual install" — true, and most readers are better
//     served by pasting one link at an agent than by a nix installer one-liner.
//
// What it says is "this is real, it is just not what most readers came for",
// and the reader who IS there for it is one click away rather than a search
// away. It is NOT a way to hide a weak answer: if the collapsed content is the
// honest answer for a real audience, collapse it; if it is embarrassing, fix it.
//
// Two rules that come with the pattern, learned the same day:
//   1. The disclosure's LEAD is the most expensive step, not the shortest. The
//      nix prerequisite goes first inside "Manual install" precisely because it
//      is the one that needs sudo — ordering it last would make the block look
//      cheaper than the work actually is.
//   2. Collapsing is not a licence to duplicate. What is inside a disclosure is
//      still a copy of something, and still names its source — see the comment
//      over start.astro's command block, which is the site's only one.
//
// The chrome is `.disclose` in src/styles/global.css, site-wide on purpose, so
// the next surface follows this instead of reinventing a disclosure.
// ---------------------------------------------------------------------------

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

/** The one hero: slop contrast in the title, the product noun in the lede. */
export const hero: Hero = {
  eyebrow: 'Beadhive',
  title: 'A factory that ships software, not slop',
  lede:
    'Beadhive is a bead-machine: a software factory that runs on beads. Agents run ' +
    'planning, review, release and operations at the speed the code gets written, and you ' +
    'hold the gates.',
  siteTitle: 'Beadhive — a factory that ships software, not slop',
  // The spine claim for search and link previews, without the headline's phrasing.
  siteDescription:
    'Beadhive is an open-source bead-machine: a software factory that runs on beads. Agents ' +
    'run the whole engineering lifecycle — planning, review, release and operations — at the ' +
    'speed the code gets written. Humans hold the gates. Zero footprint in your repo until ' +
    'you ask for it.',
};
