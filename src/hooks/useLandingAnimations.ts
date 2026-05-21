import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export function useLandingAnimations(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const splits: SplitType[] = [];

    const taglineEl = document.querySelector<HTMLElement>('.hero-tagline');
    const ledeEl = document.querySelector<HTMLElement>('.hero-lede');
    let taglineSplit: SplitType | null = null;
    let ledeSplit: SplitType | null = null;

    if (taglineEl) {
      taglineSplit = new SplitType(taglineEl, { types: 'words' });
      splits.push(taglineSplit);
      gsap.set(taglineSplit.words, { yPercent: 60, opacity: 0, skewY: 3 });
    }
    if (ledeEl) {
      ledeSplit = new SplitType(ledeEl, { types: 'words' });
      splits.push(ledeSplit);
      gsap.set(ledeSplit.words, { y: 14, opacity: 0, filter: 'blur(6px)' });
    }

    const playHeroCopy = () => {
      if (taglineSplit) {
        gsap.to(taglineSplit.words, {
          yPercent: 0,
          opacity: 1,
          skewY: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.06,
          delay: 0.2,
        });
      }
      if (ledeSplit) {
        gsap.to(ledeSplit.words, {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.1,
          ease: 'power2.out',
          stagger: { each: 0.022, from: 'start' },
          delay: 0.6,
        });
      }
    };

    window.addEventListener('intro:done', playHeroCopy, { once: true });

    return () => {
      window.removeEventListener('intro:done', playHeroCopy);
      splits.forEach((s) => s.revert());
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [enabled]);
}
