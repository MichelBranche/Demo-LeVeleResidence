import { useEffect } from 'react';
import { shouldUseMobileNav } from '../lib/motion';
import { subscribeScroll } from '../lib/scroll';

function getHeroHalfThreshold(): number {
  const shell = document.querySelector<HTMLElement>('.home-hero-shell');
  if (!shell) return Number.POSITIVE_INFINITY;
  return Math.max(1, shell.offsetHeight * 0.5);
}

function updateHomeLangVisibility(): void {
  if (!shouldUseMobileNav()) {
    document.body.classList.add('home-lang-visible');
    return;
  }

  document.body.classList.toggle('home-lang-visible', window.scrollY >= getHeroHalfThreshold());
}

/** Home mobile: mostra il selettore lingua in header dopo ~50% scroll della hero. */
export function useHomeLangReveal(active = true): void {
  useEffect(() => {
    if (!active) return;

    document.body.classList.add('is-home-page');

    const onChange = () => updateHomeLangVisibility();

    onChange();
    const unsubScroll = subscribeScroll(onChange);
    const mqs = ['(max-width: 767px)', '(max-width: 1023px)', '(pointer: coarse)'].map((q) =>
      window.matchMedia(q),
    );
    mqs.forEach((mq) => mq.addEventListener('change', onChange));
    window.addEventListener('resize', onChange);

    return () => {
      unsubScroll();
      mqs.forEach((mq) => mq.removeEventListener('change', onChange));
      window.removeEventListener('resize', onChange);
      document.body.classList.remove('is-home-page', 'home-lang-visible');
    };
  }, [active]);
}
