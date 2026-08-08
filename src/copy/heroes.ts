// The homepage hero and the site-wide title/description, in one place.
//
// Variant scaffolding is BACK for bh-infra-2sk: the slop-disarm / anti-brakes
// spine (infra/docs/design/gtm-dual-icp.md) replaces "closes the loop", and the
// two candidate compressions are compared rendered rather than argued in the
// abstract — same method that settled bh-infra-3m4.1. When this comparison is
// settled, delete the loser and the HERO flag rather than leaving them
// switched off.
//
// `title` below is the SAME SENTENCE as the OG card, which renders from
// infra/brand/tokens.json — not a paraphrase of it. Editing one without the
// other puts the page and every shared preview into disagreement, and the card
// is a rendered PNG, so it needs `node brand/render.mjs` rather than a
// redeploy. The card is synced to the `noslop` variant; if a DIFFERENT variant
// wins this comparison, re-sync tokens.json + public/og-default.png before
// publish (bh-infra-2sk acceptance). Banners deliberately differ: they carry
// the imperative `bannerTagline` ("Ship software, not slop.") per the surface
// split in infra/docs/design/hero-copy-brainstorm.md.
//
// Register rule (gtm-dual-icp.md): the front page is ICP-1 legible — indict
// the situation ("code outruns the process"), never the reader. No cowboy, no
// "enterprise".
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

// Both variants share one description: the spine claim, stated for search and
// link previews without either headline's phrasing.
const siteDescription =
  'An open-source agentic software factory that runs the whole engineering lifecycle — ' +
  'planning, review, release, operations, and the loop where production teaches the next ' +
  'plan — at the speed agents write code. Humans hold the gates. Zero footprint in your ' +
  'repo until you ask for it.';

/** Recommended: diagnosis as the h1, the answer opens the lede. */
const outrun: Hero = {
  eyebrow: 'Beadhive',
  title: 'Slop is what happens when code outruns the process',
  lede:
    'Beadhive doesn’t slow your code down — it speeds everything else up to match. An ' +
    'open-source software factory where agents run planning, review, release and operations ' +
    'at the speed the code gets written, and you hold the gates.',
  siteTitle: 'Beadhive — slop is what happens when code outruns the process',
  siteDescription,
};

/** Challenger: three beats, the claim lands in the lede's first clause. */
const keepup: Hero = {
  eyebrow: 'Beadhive',
  title: 'Code got fast. Engineering didn’t.',
  lede:
    'Beadhive is the org that keeps up — an open-source software factory where agents run ' +
    'planning, review, release and operations at the speed the code gets written, and you ' +
    'hold the gates.',
  siteTitle: 'Beadhive — code got fast, engineering didn’t',
  siteDescription,
};

/** Factory-subject frame: slop contrast in the title, anti-brakes in the lede. */
const noslop: Hero = {
  eyebrow: 'Beadhive',
  title: 'A factory that ships software, not slop',
  lede:
    'It doesn’t slow your code down — it speeds everything else up to match. Agents run ' +
    'planning, review, release and operations at the speed the code gets written, and you ' +
    'hold the gates.',
  siteTitle: 'Beadhive — a factory that ships software, not slop',
  siteDescription,
};

/** Factory-subject frame: the ICP-1 org-behind-you story in the title. */
const orgbehind: Hero = {
  eyebrow: 'Beadhive',
  title: 'A factory that puts a whole engineering org behind one builder',
  lede:
    'Planning, review, release and operations — run by agents at the speed you write code, ' +
    'with the discipline of a mature engineering org built in. You hold the gates.',
  siteTitle: 'Beadhive — a factory that puts a whole engineering org behind one builder',
  siteDescription,
};

const HERO: 'outrun' | 'keepup' | 'noslop' | 'orgbehind' = 'noslop';

export const hero: Hero = { outrun, keepup, noslop, orgbehind }[HERO];
