// /llms.txt — a machine-readable map of this site for agents.
// Convention: https://llmstxt.org
//
// GENERATED, deliberately. A checked-in public/llms.txt would be correct exactly
// once: the first time someone adds a page, it silently goes stale, and nothing
// in the build would notice. Instead this globs the real page modules and reads
// the `meta` each one exports, so a new page appears here for free and a page
// WITHOUT meta is reported at build time rather than quietly omitted.
import type { APIRoute } from 'astro';

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

const REFERENCE = [
  ['Process, seats and the bead lifecycle', 'docs/AGF.md'],
  ['Every bh work verb', 'docs/WORK.md'],
  ['The two planning gates and the spike loop', 'docs/PLANNING-PLANE.md'],
  ['Control seats and Head Office', 'docs/CONTROL-PLANE.md'],
  ['Labels, the registry and validation', 'docs/LABELS.md'],
  ['The command surface', 'docs/CLI.md'],
  ['Configuration reference', 'docs/CONFIGURATION.md'],
] as const;

export const GET: APIRoute = () => {
  const lines: string[] = [
    '# Beadhive',
    '',
    // A one-line summary, not the homepage's meta description — that reappears
    // verbatim in the Field guide list below, and saying it twice wastes the
    // first thing a reader sees.
    '> An agentic software factory that closes the loop: from idea to production, and back.',
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
    '- [INSTALL.md](https://github.com/beadhive/beadhive/blob/main/INSTALL.md): fresh machine to a working `bh`',
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
