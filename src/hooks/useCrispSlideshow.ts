import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { prefersReducedMotion } from '../lib/motion';

export const CRISP_SLIDESHOW_DURATION = 1.35;
/** Tempo di lettura su ogni slide prima del cambio automatico */
export const CRISP_AUTOPLAY_HOLD_MS = 6200;
/** Pausa iniziale quando la sezione entra in viewport */
export const CRISP_AUTOPLAY_INITIAL_DELAY_MS = 3600;
/** Pausa autoplay dopo click manuale su thumbnail */
export const CRISP_AUTOPLAY_RESUME_AFTER_INTERACT_MS = 12000;
const SWIPE_THRESHOLD_PX = 48;
const SWIPE_VERTICAL_TOLERANCE_PX = 80;

type CrispSlideshowOptions = {
  autoplay?: boolean;
  enableSwipe?: boolean;
};

function queryLayers(root: HTMLElement) {
  return {
    slides: Array.from(root.querySelectorAll<HTMLElement>('[data-slideshow="slide"]')),
    inner: Array.from(root.querySelectorAll<HTMLElement>('[data-slideshow="parallax"]')),
    thumbs: Array.from(root.querySelectorAll<HTMLElement>('[data-slideshow="thumb"]')),
    titleLayers: Array.from(root.querySelectorAll<HTMLElement>('[data-slideshow="title"]')),
    titleContents: Array.from(root.querySelectorAll<HTMLElement>('[data-slideshow="title-content"]')),
    panelLayers: Array.from(root.querySelectorAll<HTMLElement>('[data-slideshow="panel"]')),
    panelContents: Array.from(root.querySelectorAll<HTMLElement>('[data-slideshow="panel-content"]')),
  };
}

function setCurrentLayer(layers: HTMLElement[], index: number) {
  layers.forEach((layer, i) => {
    layer.classList.toggle('is--current', i === index);
  });
}

function resetTextContent(el: HTMLElement) {
  gsap.set(el, { autoAlpha: 0, y: 0, clearProps: 'transform' });
}

function showTextContent(el: HTMLElement) {
  gsap.set(el, { autoAlpha: 1, y: 0 });
}

function animateTextContent(
  timeline: gsap.core.Timeline,
  outgoingLayer: HTMLElement | undefined,
  incomingLayer: HTMLElement | undefined,
  outgoingContent: HTMLElement | undefined,
  incomingContent: HTMLElement | undefined,
  direction: number,
  variant: 'title' | 'panel',
) {
  if (!outgoingLayer || !incomingLayer || !outgoingContent || !incomingContent) return;

  const enterY = variant === 'title' ? direction * 14 : 10;
  const exitY = variant === 'title' ? -direction * 10 : -8;
  const enterAt = variant === 'title' ? 0.1 : 0.14;
  const durationOut = CRISP_SLIDESHOW_DURATION * 0.42;
  const durationIn = CRISP_SLIDESHOW_DURATION * 0.58;

  timeline
    .add(() => {
      outgoingLayer.classList.remove('is--current');
      incomingLayer.classList.add('is--current');
    }, 0)
    .to(
      outgoingContent,
      {
        autoAlpha: 0,
        y: exitY,
        duration: durationOut,
        ease: 'power2.in',
      },
      0,
    )
    .fromTo(
      incomingContent,
      { autoAlpha: 0, y: enterY },
      {
        autoAlpha: 1,
        y: 0,
        duration: durationIn,
        ease: 'power2.out',
      },
      enterAt,
    )
    .add(() => {
      resetTextContent(outgoingContent);
    }, CRISP_SLIDESHOW_DURATION)
    .add(() => {
      showTextContent(incomingContent);
    }, CRISP_SLIDESHOW_DURATION);
}

export function useCrispSlideshow(
  wrapRef: RefObject<HTMLElement | null>,
  slideCount: number,
  onSlideChange?: (index: number) => void,
  options: CrispSlideshowOptions = {},
) {
  const animatingRef = useRef(false);
  const { autoplay = false, enableSwipe = true } = options;

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || slideCount === 0) return;

    const { slides, inner, thumbs, titleLayers, titleContents, panelLayers, panelContents } =
      queryLayers(el);
    const reduced = prefersReducedMotion();

    let current = 0;
    animatingRef.current = false;

    slides.forEach((slide, index) => slide.setAttribute('data-index', String(index)));
    thumbs.forEach((thumb, index) => thumb.setAttribute('data-index', String(index)));

    slides.forEach((slide) => slide.classList.remove('is--current'));
    thumbs.forEach((thumb) => thumb.classList.remove('is--current'));
    setCurrentLayer(titleLayers, 0);
    setCurrentLayer(panelLayers, 0);

    slides[0]?.classList.add('is--current');
    thumbs[0]?.classList.add('is--current');

    titleContents.forEach((content, index) => {
      if (index === 0) showTextContent(content);
      else resetTextContent(content);
    });
    panelContents.forEach((content, index) => {
      if (index === 0) showTextContent(content);
      else resetTextContent(content);
    });

    onSlideChange?.(0);

    const setCurrent = (index: number) => {
      current = index;
      onSlideChange?.(index);
    };

    const navigate = (direction: number, targetIndex: number | null = null) => {
      if (animatingRef.current) return;

      const previous = current;
      const next =
        targetIndex !== null
          ? targetIndex
          : direction === 1
            ? current < slideCount - 1
              ? current + 1
              : 0
            : current > 0
              ? current - 1
              : slideCount - 1;

      if (next === previous) return;

      const currentSlide = slides[previous];
      const currentInner = inner[previous];
      const upcomingSlide = slides[next];
      const upcomingInner = inner[next];
      const currentTitleLayer = titleLayers[previous];
      const upcomingTitleLayer = titleLayers[next];
      const currentTitleContent = titleContents[previous];
      const upcomingTitleContent = titleContents[next];
      const currentPanelLayer = panelLayers[previous];
      const upcomingPanelLayer = panelLayers[next];
      const currentPanelContent = panelContents[previous];
      const upcomingPanelContent = panelContents[next];

      if (!currentSlide || !upcomingSlide) return;

      if (reduced) {
        currentSlide.classList.remove('is--current');
        upcomingSlide.classList.add('is--current');
        thumbs[previous]?.classList.remove('is--current');
        thumbs[next]?.classList.add('is--current');
        setCurrentLayer(titleLayers, next);
        setCurrentLayer(panelLayers, next);
        titleContents.forEach((content, index) => {
          if (index === next) showTextContent(content);
          else resetTextContent(content);
        });
        panelContents.forEach((content, index) => {
          if (index === next) showTextContent(content);
          else resetTextContent(content);
        });
        gsap.set([currentSlide, upcomingSlide, currentInner, upcomingInner], {
          clearProps: 'all',
        });
        setCurrent(next);
        return;
      }

      animatingRef.current = true;
      gsap.set(upcomingTitleContent, { autoAlpha: 0, y: direction * 14 });
      gsap.set(upcomingPanelContent, { autoAlpha: 0, y: 14 });

      const timeline = gsap.timeline({
        defaults: { duration: CRISP_SLIDESHOW_DURATION, ease: 'power3.inOut' },
        onStart: () => {
          upcomingSlide.classList.add('is--current');
          thumbs[previous]?.classList.remove('is--current');
          thumbs[next]?.classList.add('is--current');
        },
        onComplete: () => {
          currentSlide.classList.remove('is--current');
          animatingRef.current = false;
        },
      });

      timeline
        .to(currentSlide, { xPercent: -direction * 100 }, 0)
        .to(currentInner, { xPercent: direction * 60 }, 0)
        .fromTo(upcomingSlide, { xPercent: direction * 100 }, { xPercent: 0 }, 0)
        .fromTo(upcomingInner, { xPercent: -direction * 60 }, { xPercent: 0 }, 0);

      animateTextContent(
        timeline,
        currentTitleLayer,
        upcomingTitleLayer,
        currentTitleContent,
        upcomingTitleContent,
        direction,
        'title',
      );
      animateTextContent(
        timeline,
        currentPanelLayer,
        upcomingPanelLayer,
        currentPanelContent,
        upcomingPanelContent,
        direction,
        'panel',
      );

      setCurrent(next);
    };

    let autoplayTimer: ReturnType<typeof setTimeout> | undefined;
    let interactResumeTimer: ReturnType<typeof setTimeout> | undefined;
    let inView = false;
    let pausedByHover = false;
    let pausedByInteract = false;

    const clearAutoplayTimer = () => {
      if (autoplayTimer !== undefined) {
        clearTimeout(autoplayTimer);
        autoplayTimer = undefined;
      }
    };

    const clearInteractResumeTimer = () => {
      if (interactResumeTimer !== undefined) {
        clearTimeout(interactResumeTimer);
        interactResumeTimer = undefined;
      }
    };

    const canAutoplay = () =>
      autoplay && !reduced && slideCount > 1 && inView && !pausedByHover && !pausedByInteract;

    const scheduleAutoplayStep = (delay = CRISP_AUTOPLAY_HOLD_MS) => {
      clearAutoplayTimer();
      if (!canAutoplay()) return;

      autoplayTimer = setTimeout(() => {
        if (!canAutoplay()) return;

        if (animatingRef.current) {
          autoplayTimer = setTimeout(() => scheduleAutoplayStep(0), 150);
          return;
        }

        navigate(1);
        autoplayTimer = setTimeout(() => scheduleAutoplayStep(), CRISP_SLIDESHOW_DURATION * 1000);
      }, delay);
    };

    const startAutoplay = () => {
      if (!canAutoplay()) return;
      scheduleAutoplayStep(CRISP_AUTOPLAY_INITIAL_DELAY_MS);
    };

    const stopAutoplay = () => {
      clearAutoplayTimer();
    };

    const pauseAutoplayAfterInteract = () => {
      pausedByInteract = true;
      clearAutoplayTimer();
      clearInteractResumeTimer();
      interactResumeTimer = setTimeout(() => {
        pausedByInteract = false;
        interactResumeTimer = undefined;
        if (inView && !pausedByHover) scheduleAutoplayStep(CRISP_AUTOPLAY_HOLD_MS);
      }, CRISP_AUTOPLAY_RESUME_AFTER_INTERACT_MS);
    };

    const onPointerEnter = () => {
      pausedByHover = true;
      clearAutoplayTimer();
    };

    const onPointerLeave = () => {
      pausedByHover = false;
      if (inView && !pausedByInteract) scheduleAutoplayStep(CRISP_AUTOPLAY_HOLD_MS);
    };

    const onFocusIn = () => {
      pausedByHover = true;
      clearAutoplayTimer();
    };

    const onFocusOut = (event: FocusEvent) => {
      if (el.contains(event.relatedTarget as Node | null)) return;
      pausedByHover = false;
      if (inView && !pausedByInteract) scheduleAutoplayStep(CRISP_AUTOPLAY_HOLD_MS);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry?.isIntersecting ?? false;
        if (inView) startAutoplay();
        else stopAutoplay();
      },
      { threshold: 0.38, rootMargin: '0px 0px -6% 0px' },
    );
    observer.observe(el);

    const onThumbClick = (event: Event) => {
      const target = event.currentTarget as HTMLElement;
      const targetIndex = Number.parseInt(target.getAttribute('data-index') ?? '', 10);
      if (Number.isNaN(targetIndex) || targetIndex === current || animatingRef.current) return;
      const direction = targetIndex > current ? 1 : -1;
      navigate(direction, targetIndex);
      if (autoplay) pauseAutoplayAfterInteract();
    };

    thumbs.forEach((thumb) => thumb.addEventListener('click', onThumbClick));
    el.addEventListener('pointerenter', onPointerEnter);
    el.addEventListener('pointerleave', onPointerLeave);
    el.addEventListener('focusin', onFocusIn);
    el.addEventListener('focusout', onFocusOut);

    const swipeTarget = el.querySelector<HTMLElement>('.residence-crisp__stage') ?? el;
    let swipeStartX = 0;
    let swipeStartY = 0;
    let swipeTracking = false;
    let swipePointerId: number | null = null;

    const onSwipePointerDown = (event: PointerEvent) => {
      if (!enableSwipe || slideCount < 2) return;
      if (event.pointerType === 'mouse' && event.button !== 0) return;

      swipeTracking = true;
      swipePointerId = event.pointerId;
      swipeStartX = event.clientX;
      swipeStartY = event.clientY;
    };

    const finishSwipe = (event: PointerEvent) => {
      if (!swipeTracking || swipePointerId !== event.pointerId) return;

      swipeTracking = false;
      swipePointerId = null;

      const deltaX = event.clientX - swipeStartX;
      const deltaY = event.clientY - swipeStartY;

      if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX) return;
      if (Math.abs(deltaY) > SWIPE_VERTICAL_TOLERANCE_PX && Math.abs(deltaY) > Math.abs(deltaX)) {
        return;
      }

      navigate(deltaX < 0 ? 1 : -1);
      if (autoplay) pauseAutoplayAfterInteract();
    };

    const onSwipePointerUp = (event: PointerEvent) => {
      finishSwipe(event);
    };

    const onSwipePointerCancel = (event: PointerEvent) => {
      if (swipePointerId !== event.pointerId) return;
      swipeTracking = false;
      swipePointerId = null;
    };

    if (enableSwipe && slideCount > 1) {
      swipeTarget.addEventListener('pointerdown', onSwipePointerDown, { passive: true });
      swipeTarget.addEventListener('pointerup', onSwipePointerUp, { passive: true });
      swipeTarget.addEventListener('pointercancel', onSwipePointerCancel, { passive: true });
    }

    return () => {
      observer.disconnect();
      stopAutoplay();
      clearInteractResumeTimer();
      thumbs.forEach((thumb) => thumb.removeEventListener('click', onThumbClick));
      el.removeEventListener('pointerenter', onPointerEnter);
      el.removeEventListener('pointerleave', onPointerLeave);
      el.removeEventListener('focusin', onFocusIn);
      el.removeEventListener('focusout', onFocusOut);
      if (enableSwipe && slideCount > 1) {
        swipeTarget.removeEventListener('pointerdown', onSwipePointerDown);
        swipeTarget.removeEventListener('pointerup', onSwipePointerUp);
        swipeTarget.removeEventListener('pointercancel', onSwipePointerCancel);
      }
      gsap.killTweensOf([...slides, ...inner, ...titleContents, ...panelContents]);
    };
  }, [wrapRef, slideCount, onSlideChange, autoplay, enableSwipe]);
}
