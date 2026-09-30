import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, type RefObject } from 'react';
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

      // Gallery: native horizontal scroll on all viewports (arrows + drag/swipe).
      scheduleScrollTriggerRefresh();
    },
    { scope: sectionRef, dependencies: [] },
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    return bindResidenceGallery(section);
  }, [sectionRef]);
}

/** Horizontal scroll + snap + arrows + pointer drag. */
function bindResidenceGallery(section: HTMLElement) {
  const viewport = section.querySelector<HTMLElement>('.residence-scroll__viewport');
  const track = section.querySelector<HTMLElement>('.residence-scroll__track');
  const progressBar = section.querySelector<HTMLElement>('.residence-scroll__progress-bar');
  const prevBtn = section.querySelector<HTMLButtonElement>('[data-residence-gallery-prev]');
  const nextBtn = section.querySelector<HTMLButtonElement>('[data-residence-gallery-next]');
  if (!viewport || !track) return;

  const slides = () =>
    Array.from(track.querySelectorAll<HTMLElement>('.residence-scroll__slide'));

  const slideStart = (slide: HTMLElement) => {
    const slideRect = slide.getBoundingClientRect();
    const viewRect = viewport.getBoundingClientRect();
    return slideRect.left - viewRect.left + viewport.scrollLeft;
  };

  const nearestIndex = () => {
    const items = slides();
    const viewCenter = viewport.scrollLeft + viewport.clientWidth / 2;
    let bestIndex = 0;
    let bestDist = Number.POSITIVE_INFINITY;
    items.forEach((slide, index) => {
      const center = slideStart(slide) + slide.offsetWidth / 2;
      const dist = Math.abs(center - viewCenter);
      if (dist < bestDist) {
        bestDist = dist;
        bestIndex = index;
      }
    });
    return { bestIndex, bestDist, best: items[bestIndex] };
  };

  const scrollToIndex = (index: number, behavior: ScrollBehavior = 'smooth') => {
    const items = slides();
    const slide = items[Math.max(0, Math.min(index, items.length - 1))];
    if (!slide) return;
    const left = slideStart(slide) - (viewport.clientWidth - slide.offsetWidth) / 2;
    viewport.scrollTo({ left: Math.max(0, left), behavior });
  };

  const syncNav = () => {
    const { best, bestIndex } = nearestIndex();
    for (const slide of slides()) {
      slide.classList.toggle('is-active', slide === best);
    }
    const max = viewport.scrollWidth - viewport.clientWidth;
    const progress = max > 0 ? viewport.scrollLeft / max : 0;
    if (progressBar) gsap.set(progressBar, { scaleX: progress });

    const atStart = bestIndex <= 0;
    const atEnd = bestIndex >= slides().length - 1;
    if (prevBtn) prevBtn.disabled = atStart;
    if (nextBtn) nextBtn.disabled = atEnd;
  };

  let settling = false;
  const settle = () => {
    if (settling) return;
    const { best, bestDist, bestIndex } = nearestIndex();
    if (!best || bestDist < 8) {
      syncNav();
      return;
    }
    settling = true;
    scrollToIndex(bestIndex, 'auto');
    window.setTimeout(() => {
      settling = false;
      syncNav();
    }, 140);
  };

  const onScroll = () => {
    if (!settling) syncNav();
  };
  const onScrollEnd = () => settle();
  const onTouchEnd = () => {
    window.setTimeout(settle, 140);
  };

  const onPrev = () => scrollToIndex(nearestIndex().bestIndex - 1);
  const onNext = () => scrollToIndex(nearestIndex().bestIndex + 1);

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      onPrev();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      onNext();
    }
  };

  // Mouse / pen drag (touch already scrolls natively).
  let dragPointerId: number | null = null;
  let dragStartX = 0;
  let dragStartScroll = 0;
  let dragMoved = false;

  const onPointerDown = (event: PointerEvent) => {
    if (event.pointerType === 'touch') return;
    if (event.button !== 0) return;
    dragPointerId = event.pointerId;
    dragStartX = event.clientX;
    dragStartScroll = viewport.scrollLeft;
    dragMoved = false;
    viewport.setPointerCapture(event.pointerId);
    viewport.classList.add('is-dragging');
  };

  const onPointerMove = (event: PointerEvent) => {
    if (dragPointerId !== event.pointerId) return;
    const dx = event.clientX - dragStartX;
    if (Math.abs(dx) > 3) dragMoved = true;
    viewport.scrollLeft = dragStartScroll - dx;
  };

  const endDrag = (event: PointerEvent) => {
    if (dragPointerId !== event.pointerId) return;
    dragPointerId = null;
    viewport.classList.remove('is-dragging');
    try {
      viewport.releasePointerCapture(event.pointerId);
    } catch {
      /* already released */
    }
    if (dragMoved) settle();
  };

  const onClickCapture = (event: MouseEvent) => {
    if (!dragMoved) return;
    event.preventDefault();
    event.stopPropagation();
    dragMoved = false;
  };

  viewport.addEventListener('scroll', onScroll, { passive: true });
  viewport.addEventListener('scrollend', onScrollEnd);
  viewport.addEventListener('touchend', onTouchEnd, { passive: true });
  viewport.addEventListener('keydown', onKeyDown);
  viewport.addEventListener('pointerdown', onPointerDown);
  viewport.addEventListener('pointermove', onPointerMove);
  viewport.addEventListener('pointerup', endDrag);
  viewport.addEventListener('pointercancel', endDrag);
  viewport.addEventListener('click', onClickCapture, true);
  prevBtn?.addEventListener('click', onPrev);
  nextBtn?.addEventListener('click', onNext);
  syncNav();

  return () => {
    viewport.removeEventListener('scroll', onScroll);
    viewport.removeEventListener('scrollend', onScrollEnd);
    viewport.removeEventListener('touchend', onTouchEnd);
    viewport.removeEventListener('keydown', onKeyDown);
    viewport.removeEventListener('pointerdown', onPointerDown);
    viewport.removeEventListener('pointermove', onPointerMove);
    viewport.removeEventListener('pointerup', endDrag);
    viewport.removeEventListener('pointercancel', endDrag);
    viewport.removeEventListener('click', onClickCapture, true);
    prevBtn?.removeEventListener('click', onPrev);
    nextBtn?.removeEventListener('click', onNext);
  };
}
