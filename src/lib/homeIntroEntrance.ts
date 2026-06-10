import gsap from 'gsap';
import { markHeroCopyDone, markIntroDone } from './intro';
import { prefersReducedMotion } from './motion';

function getHeroRevealLines(): HTMLElement[] {
  return gsap.utils.toArray<HTMLElement>(
    '.hero-reveal-line__inner:not(.hero-scroll-cue__inner)',
  );
}

export function prepareHeroRevealLines(): HTMLElement[] {
  const lines = getHeroRevealLines();
  if (lines.length > 0) {
    gsap.set(lines, { yPercent: 100, opacity: 1 });
  }
  return lines;
}

export function prepareHeaderReveal(): void {
  if (prefersReducedMotion()) return;

  const header = document.querySelector<HTMLElement>('.home-page__sticky-header .site-header');
  if (header) {
    gsap.set(header, { yPercent: -100, autoAlpha: 0, visibility: 'hidden' });
  }
}

export function revealHeroCopyStatic(): void {
  const lines = getHeroRevealLines();
  lines.forEach((el) => {
    gsap.set(el, { clearProps: 'opacity,transform' });
  });
  markIntroDone();
  markHeroCopyDone();
}

const HERO_REVEAL = {
  duration: 0.78,
  durationLight: 0.62,
  stagger: 0.045,
  staggerLight: 0.038,
  headerDuration: 0.78,
  headerDurationLight: 0.68,
} as const;

type HeroRevealOptions = {
  light?: boolean;
  onComplete?: () => void;
};

export function playHeroRevealLines(options: HeroRevealOptions = {}): gsap.core.Tween | null {
  if (prefersReducedMotion()) {
    revealHeroCopyStatic();
    options.onComplete?.();
    return null;
  }

  const lines = prepareHeroRevealLines();
  if (lines.length === 0) {
    markIntroDone();
    markHeroCopyDone();
    options.onComplete?.();
    return null;
  }

  markIntroDone();
  gsap.set(lines, { yPercent: 100, opacity: 1 });

  const { light = false } = options;
  const duration = light ? HERO_REVEAL.durationLight : HERO_REVEAL.duration;
  const stagger = light ? HERO_REVEAL.staggerLight : HERO_REVEAL.stagger;

  return gsap.fromTo(
    lines,
    { yPercent: 100 },
    {
      yPercent: 0,
      duration,
      ease: light ? 'power3.out' : 'expo.out',
      stagger,
      onComplete: () => {
      lines.forEach((el) => {
        gsap.set(el, { clearProps: 'opacity,transform' });
      });
      markHeroCopyDone();
      options.onComplete?.();
    },
    },
  );
}

export function playHeaderReveal(options: { light?: boolean; onComplete?: () => void } = {}) {
  if (prefersReducedMotion()) {
    options.onComplete?.();
    return null;
  }

  const header = document.querySelector<HTMLElement>('.home-page__sticky-header .site-header');
  if (!header) {
    options.onComplete?.();
    return null;
  }

  const { light = false, onComplete } = options;
  gsap.set(header, { yPercent: -100, autoAlpha: 1, visibility: 'visible' });
  return gsap.fromTo(
    header,
    { yPercent: -100 },
    {
      yPercent: 0,
      duration: light ? HERO_REVEAL.headerDurationLight : HERO_REVEAL.headerDuration,
      ease: 'expo.out',
      clearProps: 'transform,visibility',
      onComplete,
    },
  );
}

/** Hero copy + navbar in parallelo (pattern Willem, orchestrato dal preloader). */
export function playHeroIntroChrome(options: {
  light?: boolean;
  animateHeader?: boolean;
  onComplete?: () => void;
} = {}) {
  const { light = false, animateHeader = true, onComplete } = options;

  if (prefersReducedMotion()) {
    revealHeroCopyStatic();
    onComplete?.();
    return;
  }

  const lines = prepareHeroRevealLines();
  const header = animateHeader
    ? document.querySelector<HTMLElement>('.home-page__sticky-header .site-header')
    : null;

  let total = 0;
  if (lines.length > 0) total += 1;
  if (header) total += 1;

  if (total === 0) {
    markIntroDone();
    markHeroCopyDone();
    onComplete?.();
    return;
  }

  let done = 0;
  const tick = () => {
    done += 1;
    if (done >= total) {
      onComplete?.();
    }
  };

  if (lines.length > 0) {
    playHeroRevealLines({ light, onComplete: tick });
  } else {
    markIntroDone();
    markHeroCopyDone();
    tick();
  }

  if (header) {
    playHeaderReveal({ light, onComplete: tick });
  }
}
