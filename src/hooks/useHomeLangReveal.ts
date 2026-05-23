import { useEffect } from 'react';
import { subscribeScroll } from '../lib/scroll';

const MOBILE_LANG_MQ = '(max-width: 1023px)';

function getHeroHalfThreshold(): number {
  const shell = document.querySelector<HTMLElement>('.home-hero-shell');
  if (!shell) return Number.POSITIVE_INFINITY;
  return Math.max(1, shell.offsetHeight * 0.5);
}

function updateHomeLangVisibility(mq: MediaQueryList): void {
  if (!mq.matches) {
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

    const mq = window.matchMedia(MOBILE_LANG_MQ);
    const onChange = () => updateHomeLangVisibility(mq);

    onChange();
    const unsubScroll = subscribeScroll(onChange);
    mq.addEventListener('change', onChange);
    window.addEventListener('resize', onChange);

    return () => {
      unsubScroll();
      mq.removeEventListener('change', onChange);
      window.removeEventListener('resize', onChange);
      document.body.classList.remove('is-home-page', 'home-lang-visible');
    };
  }, [active]);
}
