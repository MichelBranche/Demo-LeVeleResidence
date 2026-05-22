import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { onIntroDone } from '../lib/intro';

gsap.registerPlugin(ScrollTrigger);

function revealHeroCopyStatic(): void {
  const taglineEl = document.querySelector<HTMLElement>('.hero-tagline');
  const ledeEl = document.querySelector<HTMLElement>('.hero-lede');
  for (const el of [taglineEl, ledeEl]) {
    if (!el) continue;
    gsap.set(el, { clearProps: 'opacity,transform,filter' });
    el.style.opacity = '1';
  }
}

type LandingAnimationOptions = {
  /** Motion ridotta (rete media / mobile) — niente blur, stagger più corto. */
  light?: boolean;
};

export function useLandingAnimations(
  enabled: boolean,
  options: LandingAnimationOptions = {},
) {
  const { light = false } = options;

  useEffect(() => {
    if (!enabled) {
      revealHeroCopyStatic();
      return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      revealHeroCopyStatic();
      return;
    }

    const splits: SplitType[] = [];

    const taglineEl = document.querySelector<HTMLElement>('.hero-tagline');
    const ledeEl = document.querySelector<HTMLElement>('.hero-lede');
    let taglineSplit: SplitType | null = null;
    let ledeSplit: SplitType | null = null;

    if (taglineEl) {
      taglineSplit = new SplitType(taglineEl, { types: 'words' });
      splits.push(taglineSplit);
      gsap.set(taglineSplit.words, {
        yPercent: light ? 40 : 60,
        opacity: 0,
        skewY: light ? 0 : 3,
      });
    }
    if (ledeEl) {
      ledeSplit = new SplitType(ledeEl, { types: 'words' });
      splits.push(ledeSplit);
      gsap.set(ledeSplit.words, {
        y: light ? 8 : 14,
        opacity: 0,
        filter: light ? 'none' : 'blur(6px)',
      });
    }

    const playHeroCopy = () => {
      if (taglineSplit) {
        gsap.to(taglineSplit.words, {
          yPercent: 0,
          opacity: 1,
          skewY: 0,
          duration: light ? 0.65 : 0.9,
          ease: 'power3.out',
          stagger: light ? 0.04 : 0.06,
          delay: 0.15,
        });
      }
      if (ledeSplit) {
        gsap.to(ledeSplit.words, {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: light ? 0.75 : 1.1,
          ease: 'power2.out',
          stagger: { each: light ? 0.015 : 0.022, from: 'start' },
          delay: light ? 0.35 : 0.6,
        });
      }
    };

    const unsub = onIntroDone(playHeroCopy);

    return () => {
      unsub();
      splits.forEach((s) => s.revert());
      revealHeroCopyStatic();
    };
  }, [enabled, light]);
}
