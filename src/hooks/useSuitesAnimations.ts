import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { RefObject } from 'react';
import { allowScrollScrub, isMobileViewport, prefersReducedMotion } from '../lib/motion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function useSuitesAnimations(sectionRef: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      if (prefersReducedMotion()) return;

      const intro = section.querySelector<HTMLElement>('.suites__intro');
      if (intro) {
        gsap.from(intro.children, {
          y: 48,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: intro,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        });
      }

      const items = gsap.utils.toArray<HTMLElement>('.suites__item', section);
      items.forEach((item) => {
        const mediaInner = item.querySelector<HTMLElement>('.suites__media-inner');
        const content = item.querySelector<HTMLElement>('.suites__content');
        const index = item.querySelector<HTMLElement>('.suites__index');

        if (mediaInner) {
          gsap.fromTo(
            mediaInner,
            { clipPath: 'inset(100% 0% 0% 0%)' },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 1.2,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 78%',
                toggleActions: 'play none none none',
              },
            },
          );

          const img = mediaInner.querySelector('img');
          if (img && allowScrollScrub()) {
            gsap.fromTo(
              img,
              { scale: 1.18 },
              {
                scale: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: item,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 1.2,
                },
              },
            );
          } else if (img && isMobileViewport()) {
            gsap.set(img, { scale: 1 });
          }
        }

        if (content) {
          gsap.from(content.children, {
            y: 36,
            opacity: 0,
            duration: 0.85,
            ease: 'power3.out',
            stagger: 0.08,
            scrollTrigger: {
              trigger: item,
              start: 'top 72%',
              toggleActions: 'play none none none',
            },
          });
        }

        if (index) {
          gsap.from(index, {
            x: -24,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          });
        }
      });

      const track = section.querySelector<HTMLElement>('.suites__marquee-track');
      if (track) {
        gsap.to(track, {
          xPercent: -50,
          ease: 'none',
          duration: 28,
          repeat: -1,
        });
      }

      requestAnimationFrame(() => ScrollTrigger.refresh());
    },
    { scope: sectionRef, dependencies: [] },
  );
}
