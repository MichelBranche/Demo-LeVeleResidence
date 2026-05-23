import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { onIntroDone } from '../lib/intro';

gsap.registerPlugin(ScrollTrigger);

function revealHeroCopyStatic(): void {
  const taglineEl = document.querySelector<HTMLElement>('.hero-tagline');
  if (!taglineEl) return;
  gsap.set(taglineEl, { clearProps: 'opacity,transform,filter' });
  taglineEl.style.opacity = '1';
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
    let taglineSplit: SplitType | null = null;

    if (taglineEl) {
      taglineSplit = new SplitType(taglineEl, { types: 'words' });
      splits.push(taglineSplit);
      gsap.set(taglineSplit.words, {
        yPercent: light ? 40 : 60,
        opacity: 0,
        skewY: light ? 0 : 3,
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
    };

    const unsub = onIntroDone(playHeroCopy);

    return () => {
      unsub();
      splits.forEach((s) => s.revert());
      revealHeroCopyStatic();
    };
  }, [enabled, light]);
}
