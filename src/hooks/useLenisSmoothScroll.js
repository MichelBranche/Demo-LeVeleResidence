import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

/** Stessi parametri della landing (`useLandingAnimations`). */
const LENIS_OPTIONS = {
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
};

/**
 * Scroll morbido Lenis + aggiornamento ScrollTrigger (come sulla home).
 * Restituisce un ref all'istanza Lenis per `scrollTo` su ancore / menu.
 */
export function useLenisSmoothScroll() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis(LENIS_OPTIONS);
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tickerFn = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerFn);

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(tickerFn);
      lenis.destroy();
      lenisRef.current = null;
      ScrollTrigger.refresh();
    };
  }, []);

  return lenisRef;
}

export function getLenisScrollToOptions() {
  return {
    duration: LENIS_OPTIONS.duration,
    easing: LENIS_OPTIONS.easing,
  };
}
