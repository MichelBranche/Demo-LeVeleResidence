import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNativeScrollOnMobile } from '../lib/motion';
import { setLenisInstance } from '../lib/scroll';

gsap.registerPlugin(ScrollTrigger);

const PRELOADER_DONE_KEY = 'lv-preloader-done';

function scheduleInit(run: () => void): () => void {
  if (typeof window.requestIdleCallback === 'function') {
    const id = window.requestIdleCallback(run, { timeout: 2200 });
    return () => window.cancelIdleCallback(id);
  }
  const id = window.setTimeout(run, 400);
  return () => window.clearTimeout(id);
}

export function useLenisScroll() {
  useEffect(() => {
    let lenis: Lenis | null = null;
    let disposed = false;
    let cancelSchedule: (() => void) | undefined;

    const initLenis = () => {
      if (disposed || useNativeScrollOnMobile()) return;

      const root = document.documentElement;
      root.classList.add('lenis', 'lenis-smooth');

      lenis = new Lenis({
        duration: 1.2,
        smoothWheel: true,
        autoToggle: true,
        anchors: true,
        stopInertiaOnNavigate: true,
        autoRaf: true,
      });

      setLenisInstance(lenis);
      lenis.on('scroll', ScrollTrigger.update);
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    const startDeferred = () => {
      cancelSchedule = scheduleInit(initLenis);
    };

    const path = window.location.pathname;
    const onHome = path === '/' || path === '';
    let preloaderSkipped = false;
    try {
      preloaderSkipped = sessionStorage.getItem(PRELOADER_DONE_KEY) === '1';
    } catch {
      /* ignore */
    }

    if (!onHome || preloaderSkipped) {
      startDeferred();
    } else {
      const onIntroDone = () => startDeferred();
      window.addEventListener('intro:done', onIntroDone, { once: true });
      const fallback = window.setTimeout(startDeferred, 20000);

      return () => {
        disposed = true;
        window.removeEventListener('intro:done', onIntroDone);
        window.clearTimeout(fallback);
        cancelSchedule?.();
        setLenisInstance(null);
        lenis?.destroy();
        document.documentElement.classList.remove('lenis', 'lenis-smooth', 'lenis-stopped');
        document.body.style.overflow = '';
        ScrollTrigger.refresh();
      };
    }

    return () => {
      disposed = true;
      cancelSchedule?.();
      setLenisInstance(null);
      lenis?.destroy();
      document.documentElement.classList.remove('lenis', 'lenis-smooth', 'lenis-stopped');
      document.body.style.overflow = '';
      ScrollTrigger.refresh();
    };
  }, []);
}
