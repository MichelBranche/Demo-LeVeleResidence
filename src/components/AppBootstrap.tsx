import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { warmHeroVideoPipeline } from '../lib/heroVideo';
import { isMobileViewport } from '../lib/motion';

gsap.registerPlugin(ScrollTrigger);

/** Ripristina stato DOM dopo refresh/HMR (overflow, classi bloccanti). */
export function AppBootstrap() {
  useEffect(() => {
    if (window.location.pathname === '/') {
      warmHeroVideoPipeline();
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
  }, []);

  return null;
}
