import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isMobileViewport } from '../lib/motion';

gsap.registerPlugin(ScrollTrigger);

/** Ripristina stato DOM dopo refresh/HMR (overflow, classi bloccanti). */
export function AppBootstrap() {
  useEffect(() => {
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

    const stuck = document.querySelector('.cookie-consent:not(.cookie-consent--visible)');
    if (stuck) {
      stuck.classList.add('cookie-consent--visible');
    }
  }, []);

  return null;
}
