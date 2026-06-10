import { useLayoutEffect, useRef, type RefObject } from 'react';
import gsap from 'gsap';
import { isHeroCopyDone, onHeroCopyDone } from '../lib/intro';
import { prefersReducedMotion } from '../lib/motion';

type Options = {
  active: boolean;
  animateEntrance: boolean;
};

export function useHomeHeaderEntrance(
  headerRef: RefObject<HTMLElement | null>,
  { active, animateEntrance }: Options,
) {
  const playedRef = useRef(false);

  useLayoutEffect(() => {
    if (!active || !animateEntrance || prefersReducedMotion()) return;
    const header = headerRef.current;
    if (!header) return;

    gsap.set(header, { yPercent: -100, autoAlpha: 1 });
  }, [active, animateEntrance, headerRef]);

  useLayoutEffect(() => {
    if (!active || !animateEntrance || prefersReducedMotion()) return;
    const header = headerRef.current;
    if (!header || playedRef.current) return;

    const playEntrance = () => {
      if (playedRef.current || !headerRef.current) return;
      playedRef.current = true;

      gsap.to(headerRef.current, {
        yPercent: 0,
        duration: 0.78,
        ease: 'expo.out',
        clearProps: 'transform',
      });
    };

    if (isHeroCopyDone()) {
      playEntrance();
      return;
    }

    return onHeroCopyDone(playEntrance);
  }, [active, animateEntrance, headerRef]);
}
