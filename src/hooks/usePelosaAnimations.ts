import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { RefObject } from 'react';
import { isMobileViewport } from '../lib/motion';
import { getNetworkTier } from '../lib/network';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function usePelosaAnimations(pageRef: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const page = pageRef.current;
      if (!page) return;

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      const heroMedia = page.querySelector<HTMLElement>('.pelosa-hero__video');
      const lightMotion = isMobileViewport() || getNetworkTier() !== 'fast';
      if (heroMedia && !lightMotion) {
        gsap.fromTo(
          heroMedia,
          { scale: 1.12 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: page.querySelector('.pelosa-hero'),
              start: 'top top',
              end: 'bottom top',
              scrub: 1.2,
            },
          },
        );
      }

      const revealBlocks = gsap.utils.toArray<HTMLElement>('[data-pelosa-reveal]', page);
      revealBlocks.forEach((block) => {
        gsap.from(block.children.length ? block.children : block, {
          y: 48,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: block,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        });
      });

      const galleryItems = gsap.utils.toArray<HTMLElement>('[data-pelosa-gallery-item]', page);
      galleryItems.forEach((item, index) => {
        gsap.from(item, {
          y: 56,
          opacity: 0,
          scale: 0.97,
          duration: 0.9,
          ease: 'power3.out',
          delay: index * 0.08,
          scrollTrigger: {
            trigger: '.pelosa-gallery__mosaic',
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        });
      });
    },
    { scope: pageRef, dependencies: [] },
  );
}
