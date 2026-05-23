import type Lenis from 'lenis';

let lenisInstance: Lenis | null = null;
const scrollListeners = new Set<() => void>();

function notifyScrollListeners(): void {
  scrollListeners.forEach((listener) => listener());
}

export function setLenisInstance(instance: Lenis | null): void {
  if (lenisInstance) {
    lenisInstance.off('scroll', notifyScrollListeners);
  }

  lenisInstance = instance;

  if (lenisInstance) {
    lenisInstance.on('scroll', notifyScrollListeners);
  }
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

/** Retry hash scroll — annullabile su navigazione rapida. */
export function scheduleHashScroll(hash: string): () => void {
  const scroll = () => scrollToHash(hash);
  const rafId = requestAnimationFrame(scroll);
  const timers = [120, 400, 900, 1600, 2400].map((ms) => window.setTimeout(scroll, ms));

  return () => {
    cancelAnimationFrame(rafId);
    timers.forEach((id) => window.clearTimeout(id));
  };
}

/** Ascolta lo scroll (Lenis o nativo) — si riaggancia quando Lenis viene registrato. */
export function subscribeScroll(listener: () => void): () => void {
  scrollListeners.add(listener);

  if (!lenisInstance) {
    window.addEventListener('scroll', listener, { passive: true });
  }

  return () => {
    scrollListeners.delete(listener);
    window.removeEventListener('scroll', listener);
  };
}
