import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { RefObject } from 'react';
import { allowScrollScrub, isMobileViewport, prefersReducedMotion } from '../lib/motion';
import { scheduleScrollTriggerRefresh } from '../lib/scrollTriggerRefresh';

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
        const index = item.querySelector<HTMLElement>('.suites__card-kicker .suites__index');

        if (mediaInner) {
          const stack = mediaInner.querySelector<HTMLElement>('.suites__media-stack');
          if (stack) {
            gsap.fromTo(
              stack,
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
          }

          if (stack && allowScrollScrub()) {
            gsap.fromTo(
              stack,
              { scale: 1.08 },
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
          } else if (stack && isMobileViewport()) {
            gsap.set(stack, { scale: 1 });
          }
        }

        if (content) {
          gsap.fromTo(
            content.children,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.75,
              ease: 'power3.out',
              stagger: 0.07,
              scrollTrigger: {
                trigger: item,
                start: 'top 72%',
                toggleActions: 'play none none none',
              },
            },
          );
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

      scheduleScrollTriggerRefresh();
    },
    { scope: sectionRef, dependencies: [] },
  );
}
