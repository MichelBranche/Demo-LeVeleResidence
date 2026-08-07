import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { RefObject } from 'react';
import { isMobileViewport } from '../lib/motion';
import { getNetworkTier } from '../lib/network';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function useSuitePageAnimations(pageRef: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const page = pageRef.current;
      if (!page) return;

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      const mosaic = page.querySelector<HTMLElement>('.suite-mosaic');
      const lightMotion = isMobileViewport() || getNetworkTier() !== 'fast';

      if (mosaic && !lightMotion) {
        const cells = mosaic.querySelectorAll<HTMLElement>(
          '.suite-mosaic__lead img, .suite-mosaic__wide img, .suite-mosaic__tile img',
        );
        gsap.from(cells, {
          opacity: 0,
          y: 28,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.08,
          clearProps: 'opacity,transform',
        });
      }

      gsap.utils.toArray<HTMLElement>('[data-suite-reveal]', page).forEach((block) => {
        gsap.from(block, {
          y: 28,
          opacity: 0,
          duration: 0.85,
          ease: 'power3.out',
          clearProps: 'opacity,transform',
          scrollTrigger: {
            trigger: block,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-suite-reveal-stagger]', page).forEach((block) => {
        const targets = block.children.length ? block.children : [block];
        gsap.from(targets, {
          y: 24,
          opacity: 0,
          duration: 0.75,
          ease: 'power3.out',
          stagger: 0.1,
          clearProps: 'opacity,transform',
          scrollTrigger: {
            trigger: block,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        });
      });

      gsap.utils.toArray<HTMLElement>('.suite-features__item', page).forEach((item, index) => {
        gsap.from(item, {
          y: 16,
          opacity: 0,
          duration: 0.65,
          ease: 'power3.out',
          delay: (index % 6) * 0.04,
          clearProps: 'opacity,transform',
          scrollTrigger: {
            trigger: item,
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
        });
      });
    },
    { scope: pageRef, dependencies: [] },
  );
}
