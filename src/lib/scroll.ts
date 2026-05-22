import type Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

export function setLenisInstance(instance: Lenis | null): void {
  lenisInstance = instance;
}

export function getLenisInstance(): Lenis | null {
  return lenisInstance;
}

export function scrollToTop(immediate = true): void {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate });
  }

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: immediate ? 'instant' : 'smooth',
  });
}

/** Porta in cima alla hero suite (pathname /camere/* o alias /mare, /giardino, …). */
export function scrollToSuiteHero(immediate = true): void {
  scrollToTop(immediate);

  const hero = document.querySelector<HTMLElement>('.suite-hero');
  if (!hero) return;

  if (lenisInstance) {
    lenisInstance.scrollTo(hero, { immediate, offset: 0 });
    return;
  }

  hero.scrollIntoView({ behavior: immediate ? 'instant' : 'smooth', block: 'start' });
}

/** Retry scroll — utile dopo lazy route, Lenis e layout immagini. */
export function scheduleScrollToSuiteHero(): () => void {
  scrollToSuiteHero(true);

  const rafIds: number[] = [];
  const run = () => scrollToSuiteHero(true);
  rafIds.push(requestAnimationFrame(run));
  rafIds.push(requestAnimationFrame(() => requestAnimationFrame(run)));

  const timers = [50, 150, 400, 900, 1600].map((ms) => window.setTimeout(run, ms));

  return () => {
    rafIds.forEach((id) => cancelAnimationFrame(id));
    timers.forEach((id) => window.clearTimeout(id));
  };
}

export function scrollToHash(hash: string, immediate = false): void {
  if (!hash.startsWith('#')) return;
  const target = document.querySelector<HTMLElement>(hash);
  if (!target) return;

  if (lenisInstance) {
    lenisInstance.scrollTo(target, { immediate });
    return;
  }

  target.scrollIntoView({ behavior: immediate ? 'instant' : 'smooth', block: 'start' });
}

/** Ascolta lo scroll (Lenis o nativo) — utile per accordion e logiche custom. */
export function subscribeScroll(listener: () => void): () => void {
  const lenis = lenisInstance;
  if (lenis) {
    lenis.on('scroll', listener);
    return () => lenis.off('scroll', listener);
  }

  window.addEventListener('scroll', listener, { passive: true });
  return () => window.removeEventListener('scroll', listener);
}
