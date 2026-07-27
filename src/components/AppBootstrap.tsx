import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { warmHeroVideoPipeline } from '../lib/heroVideo';
import { isMobileViewport } from '../lib/motion';

gsap.registerPlugin(ScrollTrigger);

/** Ripristina stato DOM dopo refresh/HMR (overflow, classi bloccanti). */
export function AppBootstrap() {
  useEffect(() => {
    let idleId = 0;
    let timeoutId = 0;

    if (window.location.pathname === '/') {
      const warm = () => warmHeroVideoPipeline();
      const win = window as Window & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
        cancelIdleCallback?: (id: number) => void;
      };
      if (typeof win.requestIdleCallback === 'function') {
        idleId = win.requestIdleCallback(warm, { timeout: 2000 });
      } else {
        timeoutId = window.setTimeout(warm, 600);
      }
    }

    ScrollTrigger.config({
      ignoreMobileResize: true,
      limitCallbacks: true,
    });

    if (isMobileViewport()) {
      ScrollTrigger.normalizeScroll(false);
    }

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    document.body.style.overflow = '';
    document.body.style.pointerEvents = '';
    document.body.classList.remove(
      'oh-preloader-active',
      'oh-preloader-hero-phase',
      'oh-preloader-header-phase',
    );

    return () => {
      const win = window as Window & { cancelIdleCallback?: (id: number) => void };
      if (idleId) win.cancelIdleCallback?.(idleId);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  return null;
}
