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

    document.body.style.overflow = '';
    document.body.style.pointerEvents = '';
    document.body.classList.remove('oh-preloader-active');

    const stuck = document.querySelector('.cookie-consent:not(.cookie-consent--visible)');
    if (stuck) {
      stuck.classList.add('cookie-consent--visible');
    }
  }, []);

  return null;
}
