// /llms.txt — a machine-readable map of this site for agents.
// Convention: https://llmstxt.org
//
// GENERATED, deliberately. A checked-in public/llms.txt would be correct exactly
// once: the first time someone adds a page, it silently goes stale, and nothing
// in the build would notice. Instead this globs the real page modules and reads
// the `meta` each one exports, so a new page appears here for free and a page
// WITHOUT meta is reported at build time rather than quietly omitted.
//
// WHAT THAT DESIGN DOES *NOT* DO, established empirically for bh-infra-9ne.6:
// it indexes PAGES, from `meta`. It never walks a page body. So no section of a
// page reaches this file on its own — not a collapsed one, not an open one. The
// collapsed "Manual install" disclosure on /start is a red herring in that
// sense: `<details>` ships its contents in the static HTML whether or not it is
// open (verified in dist/start/index.html), so an agent that FETCHES the page
// finds the commands; an agent that reads only this index found nothing to
// install with, and that was already true before anything was collapsed.
//
// The fix is here rather than on the page. The two audiences want opposite
// defaults — a reader gets a paste-a-link CTA with the commands one click away,
// an agent gets the commands spelled out — so `## Install` below renders the
// route from src/copy/install.ts instead of the page un-collapsing itself. Same
// module the page renders: one edit moves both surfaces.
//
// A page's `meta.description` is therefore the ONLY channel by which its
// sections are represented here. That is why /start's description names both
// halves of the page (getting set up, and how far it reaches) — see the comment
// over its `meta` export before shortening it.
import type { APIRoute } from 'astro';
import { installPlainText, installMoreHref } from '../copy/install';

interface PageMeta {
  order: number;
  label: string;
  title: string;
  description: string;
}

// Eager so this resolves at build time — the endpoint is prerendered.
const modules = import.meta.glob<{ meta?: PageMeta }>('./**/*.astro', { eager: true });

const SITE = 'https://beadhive.ai';

/** './roles.astro' -> '/roles/', './index.astro' -> '/' */
const routeOf = (file: string) => {
  const slug = file
    .replace(/^\.\//, '')
    .replace(/\.astro$/, '')
    .replace(/(^|\/)index$/, '');
  return slug ? `/${slug}/` : '/';
};

// Routes that are real pages but not CONTENT — no `meta`, and no warning about
// it. Keep this list tiny; the default for a new page is to be listed.
const NOT_CONTENT = new Set(['/404/']);

const pages = Object.entries(modules)
  .map(([file, mod]) => ({ file, meta: mod.meta }))
  .filter((p) => !NOT_CONTENT.has(routeOf(p.file)))
  .filter((p): p is { file: string; meta: PageMeta } => {
    if (!p.meta) {
      // Loud, not silent: a page missing `meta` is a bug in the page, and the
      // whole point of generating this file is that it cannot drift unnoticed.
      console.warn(`[llms.txt] ${p.file} exports no \`meta\` — omitted from llms.txt`);
      return false;
    }
    return true;
  })
  .sort((a, b) => a.meta.order - b.meta.order);

// Docs an agent should be able to reach without rendering a page. ADOPTION.md
// is here because /start's "How far it goes" links it four times and paraphrases
// it deliberately — the rungs are stated there as OUTCOMES, and the mechanism
// behind the last one is doctrine this site does not carry. Link, don't restate:
// a copy of the ladder in this file would be the same drift the site just spent
// an epic removing, and would smuggle in vocabulary the register forbids.
const REFERENCE = [
  ['Process, seats and the bead lifecycle', 'docs/AGF.md'],
  ['Every bh work verb', 'docs/WORK.md'],
  ['The two planning gates and the spike loop', 'docs/PLANNING-PLANE.md'],
  ['Control seats and Head Office', 'docs/CONTROL-PLANE.md'],
  ['Labels, the registry and validation', 'docs/LABELS.md'],
  ['The command surface', 'docs/CLI.md'],
  ['Configuration reference', 'docs/CONFIGURATION.md'],
  ['How far it goes: the four rungs people settle on, and what each costs', 'docs/ADOPTION.md'],
] as const;

export const GET: APIRoute = () => {
  const lines: string[] = [
    '# Beadhive',
    '',
    // A one-line summary, not the homepage's meta description — that reappears
    // verbatim in the Field guide list below, and saying it twice wastes the
    // first thing a reader sees.
    '> An open-source agentic software factory that ships software, not slop — it runs the',
    '> engineering process at the speed agents write code.',
    '',
    'Beadhive runs a software factory across the whole lifecycle: agents hold most of the',
    'seats, humans hold the ones that matter, and what production teaches is meant to come',
    'back round into the next plan. Work is tracked as beads — a git-embedded issue graph',
    'with real dependency edges — so "what should be worked on next" is computed rather',
    'than guessed. `bh` is the CLI; there is no server to run.',
    '',
    '## Field guide',
    '',
    ...pages.map((p) => `- [${p.meta.label}](${SITE}${routeOf(p.file)}): ${p.meta.description}`),
    '',
    '## Reference documentation',
    '',
    ...REFERENCE.map(
      ([label, path]) => `- [${label}](https://github.com/beadhive/beadhive/blob/main/${path})`,
    ),
    '',
    '## Install',
    '',
    'The recommended route is to read INSTALL.md and walk the human through it, asking',
    'before each command and saying what it does — that is the path beadhive.ai leads with.',
    'The commands are rendered here so that reading this index is enough to know what an',
    'install actually runs. They are the managed path and the only route this site carries; on',
    "/start they sit inside a collapsed \"Manual install\" disclosure, which is a reading",
    'default and not a redaction — the page ships them either way.',
    '',
    '```sh',
    installPlainText(),
    '```',
    '',
    '- [INSTALL.md](https://github.com/beadhive/beadhive/blob/main/INSTALL.md): fresh machine to a working `bh` — the source of truth for the commands above',
    `- [README.md#install](${installMoreHref}): every other route, the platform limits, and what each one costs`,
    '- [docs/ONBOARDING.md](https://github.com/beadhive/beadhive/blob/main/docs/ONBOARDING.md): end-to-end, to a configured workspace with registered hives',
    '',
    '## Optional',
    '',
    '- [Source](https://github.com/beadhive/beadhive): the framework, open source',
    '- [Design records](https://github.com/beadhive/beadhive/tree/main/docs/design): ADRs, including rejected alternatives',
    '',
  ];
  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
