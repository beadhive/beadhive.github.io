// Hero copy variants for the positioning experiment. Flip HERO, rebuild, reload —
// the h1, lede, the three pitch cards and the site-wide <title>/description all
// move together, so each framing can be judged whole rather than as a headline
// in isolation.
//
// All three now carry the company positioning (OSS framework + managed
// deployments) rather than the earlier field-guide framing. They differ in which
// wedge leads: the closed loop, the adoption curve, or the self-building factory.
//
// This is scaffolding for the experiment, not architecture. Once a variant wins,
// inline it into index.astro / Layout.astro and delete the losers.

export type HeroKey = 'loop' | 'adopt' | 'factory';

/** The variant the site renders. Change this one string to compare. */
export const HERO: HeroKey = 'loop';

export interface Hero {
  eyebrow: string;
  title: string;
  lede: string;
  siteTitle: string;
  siteDescription: string;
  /** The three pitch cards under the hero. `body` may contain inline HTML. */
  pitch: { term: string; body: string }[];
}

// Shared cards. The adoption card is the one claim on this page backed entirely
// by shipped behavior — hives default to zero repo footprint, furnishing is
// opt-in per harness, the review gate defaults to human, and a seat is defined
// by its inputs and blast radius rather than by who fills it.
const ADOPT_CARD = {
  term: 'Meets you where you are',
  body:
    'Point it at the repo and the workflow you already have. Keep humans in as many seats as you ' +
    'want — it works on day one, at whatever automation level you actually trust.',
};

const LOOP_CARD = {
  term: 'One loop, not two products',
  body:
    'The coding framework and the SRE agent are the same system. What production does feeds back ' +
    'into what gets built next — and into the guardrails the agents are handed.',
};

const OSS_CARD = {
  term: 'Open source, take it apart',
  body:
    'The framework is free and readable. Run the whole factory on a hobby project over a weekend; ' +
    'managed deployments exist for teams that want it run for them.',
};

export const heroes: Record<HeroKey, Hero> = {
  // ---- A. lead with the closed loop --------------------------------------
  loop: {
    eyebrow: 'Beadhive',
    title: 'The software factory that doesn’t stop at the merge',
    lede:
      'Beadhive runs your whole SDLC with agents in most of the seats and humans in the ones that ' +
      'still matter. It is graded on how the software behaves in production, not on whether the ' +
      'diff looked good — because what happens in prod is what tells the factory to build ' +
      'differently next time.',
    siteTitle: 'Beadhive — the software factory that doesn’t stop at the merge',
    siteDescription:
      'An agentic software factory for the whole SDLC. Adopt it against the repo and workflow you ' +
      'already have, keep humans in the seats you don’t yet want to hand over, and let production ' +
      'behavior drive what gets built next. Open source, with managed deployments for teams.',
    pitch: [LOOP_CARD, ADOPT_CARD, OSS_CARD],
  },

  // ---- B. lead with the adoption curve ------------------------------------
  adopt: {
    eyebrow: 'Beadhive',
    title: 'A software factory your team can actually adopt',
    lede:
      'Most agent factories assume you are already fully automated, with the test coverage and ' +
      'observability to prove it. Beadhive starts from the repo and the workflow you have today, ' +
      'with humans in as many seats as you want — then ratchets, handing over one seat at a time ' +
      'as the evidence earns it.',
    siteTitle: 'Beadhive — a software factory your team can actually adopt',
    siteDescription:
      'An agentic software factory that starts from the codebase and workflow you already have, ' +
      'keeps humans in the seats you don’t yet trust to agents, and ratchets toward automation as ' +
      'the evidence earns it. Open source, with managed deployments for teams.',
    pitch: [ADOPT_CARD, LOOP_CARD, OSS_CARD],
  },

  // ---- C. lead with the self-building factory ------------------------------
  factory: {
    eyebrow: 'Beadhive',
    title: 'An agentic factory that builds and runs its own agents',
    lede:
      'Beadhive is a software factory that is agentic at almost every station, and that a person ' +
      'can step into at any of the same functional inputs and outputs. What comes off the line is ' +
      'not only software — it is services and agents that deploy back into the factory and feed it ' +
      'the signal it uses to improve itself.',
    siteTitle: 'Beadhive — an agentic factory that builds and runs its own agents',
    siteDescription:
      'A software factory that is agentic at almost every station, that humans can step into seat ' +
      'for seat, and whose output — services and agents — runs inside the factory that made it. ' +
      'Open source, with managed deployments for teams.',
    pitch: [
      {
        term: 'The factory is the deployment',
        body:
          'A new agent is a definition and a skill, not infrastructure to provision. There is ' +
          'nowhere else to put it — it takes a seat in the factory that just built it.',
      },
      ADOPT_CARD,
      OSS_CARD,
    ],
  },
};

export const hero: Hero = heroes[HERO];
