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

/** NEW (v0.20.1 pass) — speed-matching in the title, the record + gates in the lede. */
const pace: Hero = {
  eyebrow: 'Beadhive',
  title: 'Engineering at the pace of the code',
  lede:
    'An open-source software factory. Agents run planning, review, integration and release at ' +
    'the speed the code gets written; every hand-off is a record, and you hold the gates.',
  siteTitle: 'Beadhive — engineering at the pace of the code',
  siteDescription,
};

/** NEW (v0.20.1 pass) — the whole line in the title, now that release ships. */
const line: Hero = {
  eyebrow: 'Beadhive',
  title: 'From idea to a proven release, on one line',
  lede:
    'An open-source software factory: agents plan, build, review, merge and release at the ' +
    'speed the code gets written. Nothing lands without evidence, and every gate defaults to you.',
  siteTitle: 'Beadhive — from idea to a proven release, on one line',
  siteDescription,
};

const HERO: 'outrun' | 'keepup' | 'noslop' | 'orgbehind' | 'pace' | 'line' = 'noslop';

export const heroes = { outrun, keepup, noslop, orgbehind, pace, line } as const;
export const hero: Hero = heroes[HERO];
