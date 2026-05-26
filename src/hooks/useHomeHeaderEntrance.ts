import { useLayoutEffect, useRef, type RefObject } from 'react';
import gsap from 'gsap';
import { isHeroCopyDone, onHeroCopyDone } from '../lib/intro';
import { prefersReducedMotion } from '../lib/motion';

type Options = {
  active: boolean;
  /** Prima visita con preloader video — ingresso dall'alto. */
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

    gsap.set(header, { yPercent: -100, opacity: 0 });
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
        opacity: 1,
        duration: 0.88,
        ease: 'power3.out',
        clearProps: 'transform',
        onComplete: () => {
          gsap.set(headerRef.current, { clearProps: 'opacity,transform' });
        },
      });
    };

    if (isHeroCopyDone()) {
      playEntrance();
      return;
    }

    return onHeroCopyDone(playEntrance);
  }, [active, animateEntrance, headerRef]);
}
