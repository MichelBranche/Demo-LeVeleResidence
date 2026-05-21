import { useEffect } from 'react';
import type { RefObject } from 'react';
import { subscribeScroll } from '../lib/scroll';

export function useScrollAccordion(
  rootRef: RefObject<HTMLElement | null>,
  itemSelector: string,
) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cards = Array.from(
      root.querySelectorAll<HTMLElement>(itemSelector),
    );

    cards.forEach((card) => {
      card.style.position = 'sticky';
    });

    const activeClass = 'scroll-accordion__item--active';

    const updateActiveCard = () => {
      let activeCard: HTMLElement | null = null;
      let minDistance = window.innerHeight;

      for (const card of cards) {
        const rect = card.getBoundingClientRect();
        const content = card.querySelector<HTMLElement>('.scroll-accordion__content');

        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          const distanceToTop = Math.abs(rect.top);
          content?.setAttribute('aria-expanded', 'true');

          if (distanceToTop < minDistance) {
            minDistance = distanceToTop;
            activeCard = card;
          }
        }

        if (rect.bottom >= window.innerHeight) {
          content?.setAttribute('aria-expanded', 'false');
        }
      }

      for (const card of cards) {
        card.classList.remove(activeClass);
      }
      activeCard?.classList.add(activeClass);
    };

    const unsubscribeScroll = subscribeScroll(updateActiveCard);
    window.addEventListener('resize', updateActiveCard);
    updateActiveCard();

    return () => {
      unsubscribeScroll();
      window.removeEventListener('resize', updateActiveCard);
    };
  }, [rootRef, itemSelector]);
}
