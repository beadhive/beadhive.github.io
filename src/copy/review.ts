// REVIEW SWITCHBOARD — local review material, not for publish.
//
// While the v0.20.1 content + palette pass is being compared, every contested
// choice renders BOTH ways and the ReviewBar (bottom-right) flips between them
// at runtime via data-attributes on <html>. Flipping is persisted in
// localStorage so it survives navigation.
//
// Decided 2026-09-29: nav grouped, dark Mission Control, light cool grey, all
// factory components on except the readout strip (off). "The problem" still
// open; the hero was settled 2026-10-08 (bh-infra-twpm) and its flag removed. Version numbers never appear on the site: they live in the repo.
//
// To publish: set REVIEW_MODE = false, then delete the losing variants and the
// data-attribute CSS that carried them (grep for the flag name). Do not ship
// the switchboard switched off — that is how retired copy survives sweeps.
export const REVIEW_MODE = false;

export interface ReviewFlag {
  /** data-attribute on <html>, e.g. `hero` → data-hero */
  key: string;
  label: string;
  options: { value: string; label: string }[];
  /** what a first-time visitor sees */
  default: string;
  note?: string;
}

export const FLAGS: ReviewFlag[] = [
  {
    key: 'why', label: 'Home “the problem”',
    options: [
      { value: 'v1', label: 'v1 · slop is a process problem (current)' },
      { value: 'v2', label: 'v2 · the factory floor (new)' },
    ],
    default: 'v1',
  },
  {
    key: 'nav', label: 'Navigation',
    options: [
      { value: 'grouped', label: 'grouped · start | field guide (new default)' },
      { value: 'flat', label: 'flat · nine links' },
    ],
    default: 'grouped',
  },
  {
    key: 'dark', label: 'Dark palette',
    options: [
      { value: 'mc', label: 'Mission Control (new default)' },
      { value: 'honey', label: 'black & honey (retired)' },
    ],
    default: 'mc',
    note: 'Use the sun/moon toggle in the nav to switch light ↔ dark.',
  },
  {
    key: 'light', label: 'Light palette',
    options: [
      { value: 'cream', label: 'cream (brand, retired default)' },
      { value: 'cool', label: 'cool grey (new default)' },
    ],
    default: 'cool',
  },
  {
    key: 'fx-gates', label: 'Gate pulse (diagrams)',
    options: [{ value: 'on', label: 'on' }, { value: 'off', label: 'off' }],
    default: 'on',
  },
  {
    key: 'fx-lanes', label: 'Conveyor march (home)',
    options: [{ value: 'on', label: 'on' }, { value: 'off', label: 'off' }],
    default: 'on',
  },
  {
    key: 'nav-rail', label: 'Station rail (side TOC)',
    options: [{ value: 'on', label: 'on' }, { value: 'off', label: 'off' }],
    default: 'on',
  },
  {
    key: 'readout', label: 'Factory readout strip',
    options: [{ value: 'off', label: 'off' }, { value: 'on', label: 'on' }],
    default: 'off',
  },
];
