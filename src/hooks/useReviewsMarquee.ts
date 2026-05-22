import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { RefObject } from 'react';
import { isMobileViewport } from '../lib/motion';
import { getNetworkTier } from '../lib/network';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function useReviewsMarquee(sectionRef: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced || getNetworkTier() === 'minimal') return;

      const track = section.querySelector<HTMLElement>('.reviews__marquee-track');
      const strip = track?.querySelector<HTMLElement>('.reviews__marquee-strip');
      const mask = section.querySelector<HTMLElement>('.reviews__marquee-mask');
      if (!track || !strip || !mask) return;

      let tween: gsap.core.Tween | null = null;

      const getCenterOffset = () => {
        const maskWidth = mask.clientWidth;
        const firstCard = strip.querySelector<HTMLElement>('.review-card');
        const cardWidth = firstCard?.offsetWidth ?? 0;
        if (maskWidth < 8 || cardWidth < 8) return 0;
        return Math.max(0, (maskWidth - cardWidth) * 0.5);
      };

      const startMarquee = () => {
        tween?.kill();
        const width = strip.offsetWidth;
        if (width < 8) return;
        const startX = getCenterOffset();
        const speed = isMobileViewport() ? 36 : 48;
        const duration = Math.max(28, width / speed);
        tween = gsap.fromTo(
          track,
          { x: startX },
          { x: startX - width, duration, ease: 'none', repeat: -1 },
        );
      };

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          startMarquee();
          ScrollTrigger.refresh();
        });
      });

      const onResize = () => {
        const progress = tween?.progress() ?? 0;
        tween?.kill();
        const width = strip.offsetWidth;
        if (width < 8) return;
        const startX = getCenterOffset();
        const speed = isMobileViewport() ? 36 : 48;
        const duration = Math.max(28, width / speed);
        tween = gsap.fromTo(
          track,
          { x: startX },
          { x: startX - width, duration, ease: 'none', repeat: -1 },
        );
        tween.progress(progress);
      };
      window.addEventListener('resize', onResize);

      return () => {
        window.removeEventListener('resize', onResize);
        tween?.kill();
        gsap.set(track, { clearProps: 'transform' });
      };
    },
    { scope: sectionRef, dependencies: [] },
  );
}
