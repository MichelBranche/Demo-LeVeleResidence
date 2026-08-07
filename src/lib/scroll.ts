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

/** Porta in cima alla pagina suite (pathname /camere/* o alias /mare, /giardino, …). */
export function scrollToSuiteHero(immediate = true): void {
  scrollToTop(immediate);

  const top = document.querySelector<HTMLElement>('.suite-page__inner, .suite-mosaic, .suite-page');
  if (!top) return;

  if (lenisInstance) {
    lenisInstance.scrollTo(top, { immediate, offset: 0 });
    return;
  }

  top.scrollIntoView({ behavior: immediate ? 'instant' : 'smooth', block: 'start' });
}

const USER_SCROLL_ABORT_PX = 64;

function readScrollY(): number {
  return lenisInstance?.scroll ?? window.scrollY;
}

/** Retry scroll — utile dopo lazy route, Lenis e layout immagini. Si ferma se l'utente scrolla. */
export function scheduleScrollToSuiteHero(): () => void {
  let cancelled = false;
  let userScrolled = false;

  const abortForUser = () => {
    userScrolled = true;
  };

  const onUserScroll = () => {
    if (readScrollY() > USER_SCROLL_ABORT_PX) {
      abortForUser();
    }
  };

  const run = () => {
    if (cancelled || userScrolled) return;
    scrollToSuiteHero(true);
  };

  run();
  const rafIds = [
    requestAnimationFrame(run),
    requestAnimationFrame(() => requestAnimationFrame(run)),
  ];
  const timers = [80, 200].map((ms) => window.setTimeout(run, ms));
  const unsubscribe = subscribeScroll(onUserScroll);
  const intentOpts: AddEventListenerOptions = { passive: true };
  window.addEventListener('scroll', onUserScroll, intentOpts);
  window.addEventListener('wheel', abortForUser, intentOpts);
  window.addEventListener('touchstart', abortForUser, intentOpts);
  const onKeyIntent = (event: KeyboardEvent) => {
    if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key)) {
      abortForUser();
    }
  };
  window.addEventListener('keydown', onKeyIntent);

  return () => {
    cancelled = true;
    rafIds.forEach((id) => cancelAnimationFrame(id));
    timers.forEach((id) => window.clearTimeout(id));
    unsubscribe();
    window.removeEventListener('scroll', onUserScroll, intentOpts);
    window.removeEventListener('wheel', abortForUser, intentOpts);
    window.removeEventListener('touchstart', abortForUser, intentOpts);
    window.removeEventListener('keydown', onKeyIntent);
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
