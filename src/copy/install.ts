// The manual-install route — ONCE, for BOTH of this site's audiences.
//
// WHY THIS FILE EXISTS. /start shows the managed-path commands inside a
// closed-by-default "Manual install" disclosure, because a reader is better
// served by pasting one link at an agent than by a nix installer one-liner
// (bh-infra-9ne, decision 1). /llms.txt has to show the same commands for the
// opposite reason: it is the machine-readable index, agent-guided install is
// the primary path this epic is selling, and an agent that reads the index
// should not have to fetch and parse a page to find out what "install" means.
//
// Two audiences, two renderings, one route. Without this module that is two
// literal copies of the same commands in one repo — which is the exact disease
// bh-infra-9ne was filed to cure (INSTALL.md moved to the managed path at
// v0.8.0 and the README and this site each kept their own stale copy for three
// releases). So the commands are DATA here, and both surfaces render them:
//
//   * src/pages/start.astro   -> installTerminalHtml(), the `.term` block
//   * src/pages/llms.txt.ts   -> installPlainText(), the fenced block
//
// STILL NOT THE SOURCE OF TRUTH. This is the site's single copy of something
// owned elsewhere: beadhive/beadhive INSTALL.md — its `install:` frontmatter
// owns `methods[0].command` (the two managed-path lines) and its "Managed path
// (recommended)" prose owns the nix installer above them and the `bh --version`
// check below. Changing what this site tells people to run means changing
// INSTALL.md; this file only follows it. See the comment over start.astro's
// block for what guards the README deep link, which cannot be guarded here.
//
// WHAT DOES NOT BELONG HERE (bh-infra-9ne, decision 3): the PyPI fallback,
// Docker, the platform limits and the measured install cost live ONLY in the
// README, reached by `installMoreHref`. The site restates none of it — and
// "the site" includes /llms.txt.

export interface InstallCommand {
  /** The command exactly as it is run — no `$` prompt, no leading whitespace. */
  run: string;
  /** Same-line `#` gloss, without the `# `. */
  gloss?: string;
}

export interface InstallStep {
  /** Introduces the step. Rendered as `# <n>. <note>`, numbered from position. */
  note: string;
  commands: InstallCommand[];
}

// ORDER IS LOAD-BEARING (bh-infra-9ne, decision 2): the nix prerequisite leads
// because it is the one step that needs sudo. It is the most expensive thing in
// the block and the main reason a reader bounces to another route; ordering it
// last would make the block look cheaper than the work actually is.
export const installSteps: InstallStep[] = [
  {
    note: 'nix, once — needs sudo; it installs a system daemon',
    commands: [
      {
        run:
          "curl --proto '=https' --tlsv1.2 -sSf -L " +
          'https://install.determinate.systems/nix | sh -s -- install',
      },
    ],
  },
  {
    note: 'the toolchain, then bh itself',
    commands: [
      { run: 'nix profile add github:beadhive/beadhive/latest#default' },
      { run: "uv tool install --force 'beadhive[otel]'" },
      { run: 'bh --version', gloss: 'must print the released version' },
    ],
  },
];

/** Everything this route does not cover, on the side that owns it. */
export const installMoreHref = 'https://github.com/beadhive/beadhive/blob/main/README.md#install';
export const installMoreLabel = 'Other routes, platform limits and what each costs';

/** Padding between a command and its same-line gloss. */
const GLOSS_PAD = '    ';

// Only the characters that would break the markup. Apostrophes and `#` are left
// ALONE on purpose: `uv tool install --force 'beadhive[otel]'` should appear in
// the served HTML byte-for-byte as it is typed, so an agent reading the raw
// response finds the command it is looking for rather than `&#39;beadhive...`.
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * The route as terminal markup for a `.term` block: `$` prompts and comments in
 * spans, coloured by the global `.term .p` / `.term .c` rules in global.css.
 * Returns the inner HTML of the `<code>` element (no trailing newline — `<pre>`
 * would render it as a blank last line).
 */
export function installTerminalHtml(): string {
  return installSteps
    .map((step, i) => {
      const head = `<span class="c">${esc(`# ${i + 1}. ${step.note}`)}</span>`;
      const body = step.commands.map((c) => {
        const gloss = c.gloss ? `${GLOSS_PAD}<span class="c">${esc(`# ${c.gloss}`)}</span>` : '';
        return `<span class="p">$</span> ${esc(c.run)}${gloss}`;
      });
      return [head, ...body].join('\n');
    })
    .join('\n\n');
}

/**
 * The same route as plain text for /llms.txt. No `$` prompts: a prompt is chrome
 * for a human reading a screenshot of a terminal, and a paste hazard for anything
 * that copies these lines to run them.
 */
export function installPlainText(): string {
  return installSteps
    .map((step, i) => {
      const head = `# ${i + 1}. ${step.note}`;
      const body = step.commands.map((c) => (c.gloss ? `${c.run}${GLOSS_PAD}# ${c.gloss}` : c.run));
      return [head, ...body].join('\n');
    })
    .join('\n\n');
}
