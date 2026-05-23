import { useEffect } from 'react';
import type { RefObject } from 'react';
import { isMobileViewport } from '../lib/motion';
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

    const mobile = isMobileViewport();

    cards.forEach((card) => {
      card.style.position = mobile ? 'static' : 'sticky';
    });

    if (mobile) {
      cards.forEach((card) => {
        card.querySelector<HTMLElement>('.scroll-accordion__trigger')?.setAttribute('aria-expanded', 'true');
      });
      return;
    }

    const activeClass = 'scroll-accordion__item--active';

    const updateActiveCard = () => {
      let activeCard: HTMLElement | null = null;
      let minDistance = window.innerHeight;

      for (const card of cards) {
        const rect = card.getBoundingClientRect();
        const trigger = card.querySelector<HTMLElement>('.scroll-accordion__trigger');

        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          const distanceToTop = Math.abs(rect.top);
          trigger?.setAttribute('aria-expanded', 'true');

          if (distanceToTop < minDistance) {
            minDistance = distanceToTop;
            activeCard = card;
          }
        }

        if (rect.bottom >= window.innerHeight) {
          trigger?.setAttribute('aria-expanded', 'false');
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
