import gsap from 'gsap';
import { useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useRouteTransition } from '../context/RouteTransitionContext';
import { siteConfig } from '../i18n/siteMedia';
import { prefersReducedMotion } from '../lib/motion';

function getOverlayParts(root: HTMLDivElement) {
  return {
    panels: Array.from(root.querySelectorAll<HTMLElement>('.route-transition__panel')),
    chars: Array.from(root.querySelectorAll<HTMLElement>('.route-transition__char')),
    line: root.querySelector<HTMLElement>('.route-transition__line'),
    content: root.querySelector<HTMLElement>('.route-transition__content'),
  };
}

export function RouteTransitionOverlay() {
  const { stage, notifyCoverComplete, notifyRevealComplete } = useRouteTransition();
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (stage !== 'covering') return;

    const root = rootRef.current;
    if (!root) return;
    const { panels, chars, line, content } = getOverlayParts(root);
    if (panels.length === 0 || !line || !content) return;

    gsap.killTweensOf([root, ...panels, ...chars, line, content]);

    if (prefersReducedMotion()) {
      gsap.set(root, { autoAlpha: 1, pointerEvents: 'auto' });
      gsap.set(panels, { yPercent: 0 });
      gsap.set(chars, { yPercent: 0 });
      gsap.set(line, { scaleX: 1, opacity: 1 });
      gsap.set(content, { opacity: 1 });
      notifyCoverComplete();
      return;
    }

    document.documentElement.classList.remove('route-transition-snapshot');

    gsap.set(root, { autoAlpha: 1, pointerEvents: 'auto' });
    gsap.set(panels, { yPercent: 102 });
    gsap.set(chars, { yPercent: 112 });
    gsap.set(line, { scaleX: 0, opacity: 1 });
    gsap.set(content, { opacity: 1 });

    const tl = gsap.timeline({ onComplete: notifyCoverComplete });

    tl.to(panels, {
      yPercent: 0,
      duration: 0.58,
      ease: 'power4.inOut',
      stagger: 0.065,
    })
      .to(
        chars,
        {
          yPercent: 0,
          duration: 0.46,
          ease: 'expo.out',
          stagger: 0.017,
        },
        '-=0.22',
      )
      .to(line, { scaleX: 1, duration: 0.4, ease: 'power3.out' }, '<0.1');

    return () => {
      tl.kill();
    };
  }, [stage, notifyCoverComplete]);

  useLayoutEffect(() => {
    if (stage !== 'revealing') return;

    const root = rootRef.current;
    if (!root) return;
    const { panels, chars, line, content } = getOverlayParts(root);
    if (panels.length === 0 || !line || !content) return;

    gsap.killTweensOf([root, ...panels, ...chars, line, content]);

    if (prefersReducedMotion()) {
      gsap.set(root, { autoAlpha: 0, pointerEvents: 'none' });
      notifyRevealComplete();
      return;
    }

    const tl = gsap.timeline({ onComplete: notifyRevealComplete });

    tl.to(
      chars,
      {
        yPercent: -112,
        duration: 0.3,
        ease: 'power2.in',
        stagger: 0.011,
      },
      0,
    )
      .to(line, { scaleX: 0, opacity: 0, duration: 0.22, ease: 'power2.in' }, 0)
      .to(
        panels,
        {
          yPercent: -102,
          duration: 0.62,
          ease: 'power4.inOut',
          stagger: { each: 0.065, from: 'end' },
        },
        0.12,
      )
      .set(root, { autoAlpha: 0, pointerEvents: 'none' });

    return () => {
      tl.kill();
    };
  }, [stage, notifyRevealComplete]);

  const visible = stage !== 'idle';

  const overlay = (
    <div
      ref={rootRef}
      className="route-transition"
      role="status"
      aria-live="polite"
      aria-busy={visible}
      aria-hidden={!visible}
      aria-label={siteConfig.name}
    >
      <div className="route-transition__panel route-transition__panel--sand" aria-hidden />
      <div className="route-transition__panel route-transition__panel--surface" aria-hidden />
      <div className="route-transition__panel route-transition__panel--ink" aria-hidden />
      <div className="route-transition__content">
        <p className="route-transition__brand display-serif">
          {siteConfig.name.split(' ').map((word, wi) => (
            <span className="route-transition__word" key={`${word}-${wi}`}>
              {word.split('').map((ch, ci) => (
                <span className="route-transition__char-mask" key={ci}>
                  <span className="route-transition__char">{ch}</span>
                </span>
              ))}
            </span>
          ))}
        </p>
        <span className="route-transition__line" aria-hidden />
      </div>
    </div>
  );

  if (typeof document === 'undefined') return overlay;

  return createPortal(overlay, document.body);
}
