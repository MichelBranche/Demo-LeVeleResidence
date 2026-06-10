import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { playHeroRevealLines, revealHeroCopyStatic } from '../lib/homeIntroEntrance';
import { isIntroDone, onIntroDone } from '../lib/intro';

gsap.registerPlugin(ScrollTrigger);

type LandingAnimationOptions = {
  /** Motion ridotta (rete media / mobile) — niente blur, stagger più corto. */
  light?: boolean;
  /** Se false, l'intro è orchestrata dal preloader video. */
  orchestrated?: boolean;
};

export function useLandingAnimations(
  enabled: boolean,
  options: LandingAnimationOptions = {},
) {
  const { light = false, orchestrated = false } = options;

  useEffect(() => {
    if (!enabled) {
      revealHeroCopyStatic();
      return;
    }

    if (orchestrated) {
      return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      revealHeroCopyStatic();
      return;
    }

    const playHeroCopy = () => {
      playHeroRevealLines({ light });
    };

    if (isIntroDone()) {
      playHeroCopy();
      return;
    }

    const unsub = onIntroDone(playHeroCopy);

    return () => {
      unsub();
      gsap.killTweensOf('.hero-reveal-line__inner');
    };
  }, [enabled, light, orchestrated]);
}
