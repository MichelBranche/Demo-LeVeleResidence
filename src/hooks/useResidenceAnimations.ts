import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { RefObject } from 'react';
import { isMobileViewport } from '../lib/motion';
import { scheduleScrollTriggerRefresh } from '../lib/scrollTriggerRefresh';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function useResidenceAnimations(sectionRef: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      const intro = section.querySelector<HTMLElement>('.residence__intro');
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

      const lead = section.querySelector<HTMLElement>('.residence__lead');
      if (lead) {
        gsap.from(lead, {
          y: 32,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: lead,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }

      const metrics = section.querySelector<HTMLElement>('.residence__metrics');
      if (metrics) {
        gsap.from(metrics.children, {
          y: 24,
          opacity: 0,
          duration: 0.75,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: metrics,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        });
      }

      const track = section.querySelector<HTMLElement>('.residence__marquee-track');
      if (track) {
        gsap.to(track, {
          xPercent: -50,
          ease: 'none',
          duration: 32,
          repeat: -1,
        });
      }

      // Horizontal scroll-driven gallery (desktop only; mobile keeps native swipe).
      const gallery = section.querySelector<HTMLElement>('.residence-scroll');
      const galleryTrack = section.querySelector<HTMLElement>('.residence-scroll__track');
      const progressBar = section.querySelector<HTMLElement>('.residence-scroll__progress-bar');

      if (gallery && galleryTrack && !isMobileViewport()) {
        gallery.classList.add('is-pinned');

        const getDistance = () => Math.max(0, galleryTrack.scrollWidth - window.innerWidth);

        const horizontalTween = gsap.to(galleryTrack, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: gallery,
            start: 'top top',
            end: () => '+=' + getDistance(),
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (progressBar) gsap.set(progressBar, { scaleX: self.progress });
            },
          },
        });

        const slides = gsap.utils.toArray<HTMLElement>(
          '.residence-scroll__slide',
          galleryTrack,
        );
        slides.forEach((slide) => {
          const img = slide.querySelector('img');
          if (!img) return;
          gsap.fromTo(
            img,
            { scale: 1.18, xPercent: -4 },
            {
              scale: 1,
              xPercent: 4,
              ease: 'none',
              scrollTrigger: {
                containerAnimation: horizontalTween,
                trigger: slide,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            },
          );
        });
      }

      scheduleScrollTriggerRefresh();
    },
    { scope: sectionRef, dependencies: [] },
  );
}
