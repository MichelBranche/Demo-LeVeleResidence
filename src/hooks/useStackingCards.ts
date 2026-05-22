import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { RefObject } from 'react';
import { allowScrollScrub, isMobileViewport, prefersReducedMotion } from '../lib/motion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function useStackingCards(
  wrapperRef: RefObject<HTMLElement | null>,
  cardSelector: string,
  extraDeps: readonly unknown[] = [],
) {
  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const cards = gsap.utils.toArray<HTMLElement>(
        wrapper.querySelectorAll(cardSelector),
      );
      if (!cards.length) return;

      if (isMobileViewport() || prefersReducedMotion()) {
        cards.forEach((card) => {
          card.style.position = 'relative';
          card.style.top = 'auto';
          card.style.zIndex = '';
        });
        return;
      }

      cards.forEach((card) => {
        card.style.position = 'sticky';
      });

      const numCards = cards.length;

      cards.forEach((card, index0) => {
        const index = index0 + 1;
        const reverseIndex0 = numCards - index;

        gsap.to(card, {
          duration: 2,
          scale: 1 - -0.1 * reverseIndex0,
          rotate: 0,
          opacity: 1,
          filter: `blur(${reverseIndex0 * 0}px) grayscale(${reverseIndex0 * 30}%)`,
          scrollTrigger: {
            trigger: wrapper,
            start: `${(index0 / numCards) * 100}% top`,
            end: 'bottom center',
            scrub: allowScrollScrub(),
          },
        });
      });
    },
    { scope: wrapperRef, dependencies: [cardSelector, ...extraDeps] },
  );
}
