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

      const heroImg = page.querySelector<HTMLElement>('.suite-hero__img');
      const lightMotion = isMobileViewport() || getNetworkTier() !== 'fast';

      if (heroImg && !lightMotion) {
        gsap.fromTo(
          heroImg,
          { scale: 1.14 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: page.querySelector('.suite-hero'),
              start: 'top top',
              end: 'bottom top',
              scrub: 1.1,
            },
          },
        );
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

      gsap.utils.toArray<HTMLElement>('.suite-amenities__item', page).forEach((item, index) => {
        gsap.from(item, {
          y: 24,
          opacity: 0,
          duration: 0.75,
          ease: 'power3.out',
          delay: (index % 4) * 0.05,
          clearProps: 'opacity,transform',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });
      });

      const galleryItems = gsap.utils.toArray<HTMLElement>('.suite-gallery__cell', page);
      galleryItems.forEach((cell, index) => {
        gsap.from(cell, {
          y: 40,
          opacity: 0,
          scale: 0.98,
          duration: 0.9,
          ease: 'power3.out',
          delay: index * 0.08,
          clearProps: 'opacity,transform',
          scrollTrigger: {
            trigger: cell,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        });
      });
    },
    { scope: pageRef, dependencies: [] },
  );
}
