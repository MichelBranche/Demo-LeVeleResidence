import gsap from 'gsap';
import { useLayoutEffect, useRef } from 'react';
import { useRouteTransition } from '../context/RouteTransitionContext';
import { siteConfig } from '../i18n/siteMedia';
import { prefersReducedMotion } from '../lib/motion';

export function RouteTransitionOverlay() {
  const { stage, notifyCoverComplete, notifyRevealComplete } = useRouteTransition();
  const rootRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLParagraphElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (stage !== 'covering') return;

    const root = rootRef.current;
    const veil = veilRef.current;
    const content = contentRef.current;
    const brand = brandRef.current;
    const loader = loaderRef.current;
    if (!root || !veil || !content || !brand || !loader) return;

    gsap.killTweensOf([root, veil, content, brand, loader]);

    if (prefersReducedMotion()) {
      gsap.set(root, { autoAlpha: 1, pointerEvents: 'auto' });
      notifyCoverComplete();
      return;
    }

    document.documentElement.classList.remove('route-transition-snapshot');

    gsap.set(root, { autoAlpha: 1, pointerEvents: 'auto' });
    gsap.set(veil, { clipPath: 'circle(0% at 50% 50%)' });
    gsap.set(content, { opacity: 0, y: 18 });
    gsap.set(brand, { opacity: 0, y: 10 });
    gsap.set(loader, { opacity: 0, scale: 0.88 });

    const tl = gsap.timeline({ onComplete: notifyCoverComplete });

    tl.to(veil, {
      clipPath: 'circle(150% at 50% 50%)',
      duration: 0.82,
      ease: 'power3.inOut',
    })
      .to(content, { opacity: 1, y: 0, duration: 0.42, ease: 'power2.out' }, 0.22)
      .to(brand, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.3)
      .to(loader, { opacity: 1, scale: 1, duration: 0.48, ease: 'power2.out' }, 0.38);

    return () => {
      tl.kill();
    };
  }, [stage, notifyCoverComplete]);

  useLayoutEffect(() => {
    if (stage !== 'revealing') return;

    const root = rootRef.current;
    const veil = veilRef.current;
    const content = contentRef.current;
    const brand = brandRef.current;
    const loader = loaderRef.current;
    if (!root || !veil || !content) return;

    gsap.killTweensOf([root, veil, content, brand, loader]);

    if (prefersReducedMotion()) {
      gsap.set(root, { autoAlpha: 0, pointerEvents: 'none' });
      notifyRevealComplete();
      return;
    }

    const tl = gsap.timeline({ onComplete: notifyRevealComplete });

    tl.to([brand, loader], { opacity: 0, duration: 0.22, ease: 'power2.in' }, 0)
      .to(content, { opacity: 0, y: -10, duration: 0.28, ease: 'power2.in' }, 0.04)
      .to(
        veil,
        {
          clipPath: 'circle(0% at 50% 50%)',
          duration: 0.72,
          ease: 'power3.inOut',
        },
        0.1,
      )
      .to(root, { autoAlpha: 0, duration: 0.2, ease: 'power2.in' }, 0.62)
      .set(root, { pointerEvents: 'none' });

    return () => {
      tl.kill();
    };
  }, [stage, notifyRevealComplete]);

  const visible = stage !== 'idle';

  return (
    <div
      ref={rootRef}
      className="route-transition"
      role="status"
      aria-live="polite"
      aria-busy={visible}
      aria-hidden={!visible}
      aria-label={siteConfig.name}
    >
      <div ref={veilRef} className="route-transition__veil" aria-hidden />
      <div ref={contentRef} className="route-transition__content">
        <p ref={brandRef} className="route-transition__brand display-serif">
          {siteConfig.name}
        </p>
        <div ref={loaderRef} className="route-transition__loader" aria-hidden>
          <span className="route-transition__ring route-transition__ring--outer" />
          <span className="route-transition__ring route-transition__ring--mid" />
          <span className="route-transition__ring route-transition__ring--core" />
        </div>
      </div>
    </div>
  );
}
