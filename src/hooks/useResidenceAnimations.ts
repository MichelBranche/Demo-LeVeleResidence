import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, type RefObject } from 'react';
import { isMobileViewport } from '../lib/motion';
import { scheduleScrollTriggerRefresh } from '../lib/scrollTriggerRefresh';

gsap.registerPlugin(ScrollTrigger, useGSAP);

function setupSlideDepth(
  slide: HTMLElement,
  horizontalTween: gsap.core.Tween,
  mobile: boolean,
) {
  const img = slide.querySelector('img');
  const scrub = mobile ? 0.65 : true;

  // Slide: più piccola/lontana ai lati, piena al centro (profondità coverflow).
  gsap.fromTo(
    slide,
    {
      scale: mobile ? 0.86 : 0.82,
      y: mobile ? 18 : 28,
      opacity: mobile ? 0.62 : 0.52,
    },
    {
      scale: 1,
      y: 0,
      opacity: 1,
      ease: 'none',
      scrollTrigger: {
        containerAnimation: horizontalTween,
        trigger: slide,
        start: 'left 92%',
        end: 'center center',
        scrub,
      },
    },
  );

  gsap.fromTo(
    slide,
    {
      scale: 1,
      y: 0,
      opacity: 1,
    },
    {
      scale: mobile ? 0.86 : 0.82,
      y: mobile ? 18 : 28,
      opacity: mobile ? 0.62 : 0.52,
      ease: 'none',
      immediateRender: false,
      scrollTrigger: {
        containerAnimation: horizontalTween,
        trigger: slide,
        start: 'center center',
        end: 'right 8%',
        scrub,
      },
    },
  );

  if (!img) return;

  // Esterni del complesso: niente zoom/drift, altrimenti i bordi vengono tagliati.
  if (
    slide.classList.contains('residence-scroll__slide--full') ||
    slide.classList.contains('residence-scroll__slide--wide') ||
    slide.classList.contains('residence-scroll__slide--aerial')
  ) {
    return;
  }

  // Immagine: ken-burns + drift laterale più marcato mentre la card attraversa il viewport.
  gsap.fromTo(
    img,
    {
      scale: mobile ? 1.32 : 1.42,
      xPercent: mobile ? -7 : -11,
    },
    {
      scale: mobile ? 1.06 : 1.08,
      xPercent: mobile ? 7 : 11,
      ease: 'none',
      scrollTrigger: {
        containerAnimation: horizontalTween,
        trigger: slide,
        start: 'left right',
        end: 'right left',
        scrub,
      },
    },
  );
}

export function useResidenceAnimations(sectionRef: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      const mobile = isMobileViewport();

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

      // Gallery orizzontale pinnata (desktop + mobile) con profondità accentuata.
      const gallery = section.querySelector<HTMLElement>('.residence-scroll');
      const galleryTrack = section.querySelector<HTMLElement>('.residence-scroll__track');
      const progressBar = section.querySelector<HTMLElement>('.residence-scroll__progress-bar');

      // Mobile: swipe orizzontale nativo (vedi useEffect). Il pin verticale
      // lasciava la galleria a metà tra due foto.
      if (gallery && galleryTrack && !mobile) {
        gallery.classList.add('is-pinned');

        const getDistance = () => Math.max(0, galleryTrack.scrollWidth - window.innerWidth);

        const horizontalTween = gsap.to(galleryTrack, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: gallery,
            start: 'top top',
            end: () => '+=' + Math.max(getDistance() * (mobile ? 1.05 : 1), window.innerHeight * 0.75),
            pin: true,
            scrub: mobile ? 0.85 : 1,
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
        slides.forEach((slide) => setupSlideDepth(slide, horizontalTween, mobile));
      }

      scheduleScrollTriggerRefresh();
    },
    { scope: sectionRef, dependencies: [] },
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !isMobileViewport()) return;
    return bindMobileResidenceGallery(section);
  }, [sectionRef]);
}

/** Horizontal swipe + mandatory snap. Safari has no scrollsnapchange, so settle in JS. */
function bindMobileResidenceGallery(section: HTMLElement) {
  const viewport = section.querySelector<HTMLElement>('.residence-scroll__viewport');
  const track = section.querySelector<HTMLElement>('.residence-scroll__track');
  const progressBar = section.querySelector<HTMLElement>('.residence-scroll__progress-bar');
  if (!viewport || !track) return;

  const slides = () =>
    Array.from(track.querySelectorAll<HTMLElement>('.residence-scroll__slide'));

  const slideStart = (slide: HTMLElement) => {
    const slideRect = slide.getBoundingClientRect();
    const viewRect = viewport.getBoundingClientRect();
    return slideRect.left - viewRect.left + viewport.scrollLeft;
  };

  const nearest = () => {
    const items = slides();
    const viewCenter = viewport.scrollLeft + viewport.clientWidth / 2;
    let best = items[0];
    let bestDist = Number.POSITIVE_INFINITY;
    for (const slide of items) {
      const center = slideStart(slide) + slide.offsetWidth / 2;
      const dist = Math.abs(center - viewCenter);
      if (dist < bestDist) {
        bestDist = dist;
        best = slide;
      }
    }
    return { best, bestDist };
  };

  const markActive = () => {
    const { best } = nearest();
    for (const slide of slides()) {
      const active = slide === best;
      slide.classList.toggle('is-active', active);
    }
    const max = viewport.scrollWidth - viewport.clientWidth;
    const progress = max > 0 ? viewport.scrollLeft / max : 0;
    if (progressBar) gsap.set(progressBar, { scaleX: progress });
  };

  let settling = false;
  const settle = () => {
    if (settling) return;
    const { best, bestDist } = nearest();
    if (!best || bestDist < 8) {
      markActive();
      return;
    }
    const left = slideStart(best) - (viewport.clientWidth - best.offsetWidth) / 2;
    settling = true;
    viewport.scrollTo({ left: Math.max(0, left), behavior: 'auto' });
    window.setTimeout(() => {
      settling = false;
      markActive();
    }, 140);
  };

  const onScroll = () => {
    if (!settling) markActive();
  };
  const onScrollEnd = () => settle();
  const onTouchEnd = () => {
    window.setTimeout(settle, 140);
  };

  viewport.addEventListener('scroll', onScroll, { passive: true });
  viewport.addEventListener('scrollend', onScrollEnd);
  viewport.addEventListener('touchend', onTouchEnd, { passive: true });
  markActive();

  return () => {
    viewport.removeEventListener('scroll', onScroll);
    viewport.removeEventListener('scrollend', onScrollEnd);
    viewport.removeEventListener('touchend', onTouchEnd);
  };
}
