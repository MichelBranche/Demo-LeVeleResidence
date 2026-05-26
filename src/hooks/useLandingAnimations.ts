import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { markHeroCopyDone, onIntroDone } from '../lib/intro';

gsap.registerPlugin(ScrollTrigger);

function revealHeroCopyStatic(): void {
  const kicker = document.querySelector<HTMLElement>('.hero-kicker');
  const titleLines = document.querySelectorAll<HTMLElement>('.hero-title__line');
  const taglineEl = document.querySelector<HTMLElement>('.hero-tagline');
  const scrollCue = document.querySelector<HTMLElement>('.hero-scroll-cue');

  [kicker, ...titleLines, taglineEl, scrollCue].forEach((el) => {
    if (!el) return;
    gsap.set(el, { clearProps: 'opacity,transform,filter' });
    el.style.opacity = '1';
  });

  markHeroCopyDone();
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

    const kicker = document.querySelector<HTMLElement>('.hero-kicker');
    const titleLines = gsap.utils.toArray<HTMLElement>('.hero-title__line');
    const taglineEl = document.querySelector<HTMLElement>('.hero-tagline');
    const scrollCue = document.querySelector<HTMLElement>('.hero-scroll-cue');

    let taglineSplit: SplitType | null = null;

    if (taglineEl) {
      taglineSplit = new SplitType(taglineEl, { types: 'words' });
      splits.push(taglineSplit);
    }

    const fromY = light ? 22 : 32;
    const targets = [kicker, ...titleLines, scrollCue].filter(Boolean) as HTMLElement[];

    gsap.set(targets, {
      opacity: 0,
      y: fromY,
      filter: light ? 'none' : 'blur(6px)',
    });

    if (taglineSplit?.words?.length) {
      gsap.set(taglineSplit.words, {
        yPercent: light ? 35 : 50,
        opacity: 0,
        skewY: light ? 0 : 2,
      });
    }

    const playHeroCopy = () => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          if (scrollCue) {
            gsap.set(scrollCue, { clearProps: 'opacity,transform,filter' });
          }
          markHeroCopyDone();
        },
      });

      if (kicker) {
        tl.to(kicker, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: light ? 0.55 : 0.72,
        });
      }

      if (titleLines.length) {
        tl.to(
          titleLines,
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: light ? 0.68 : 0.88,
            stagger: light ? 0.1 : 0.14,
          },
          kicker ? '-=0.38' : 0,
        );
      }

      if (taglineSplit?.words?.length) {
        tl.to(
          taglineSplit.words,
          {
            yPercent: 0,
            opacity: 1,
            skewY: 0,
            duration: light ? 0.58 : 0.78,
            stagger: light ? 0.035 : 0.05,
          },
          '-=0.42',
        );
      }

      if (scrollCue) {
        tl.fromTo(
          scrollCue,
          { opacity: 0, y: 16, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: light ? 0.5 : 0.62,
            ease: 'back.out(1.35)',
          },
          '-=0.18',
        );
      }
    };

    const unsub = onIntroDone(playHeroCopy);

    return () => {
      unsub();
      splits.forEach((s) => s.revert());
      gsap.killTweensOf([...targets, ...(taglineSplit?.words ?? [])]);
      revealHeroCopyStatic();
    };
  }, [enabled, light]);
}
