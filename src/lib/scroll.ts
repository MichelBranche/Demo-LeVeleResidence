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
    return;
  }

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: immediate ? 'instant' : 'smooth',
  });
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
