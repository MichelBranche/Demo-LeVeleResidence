import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import type { LocaleCopy } from '../i18n/types';

type DirectBookingPopupProps = {
  open: boolean;
  copy: LocaleCopy['directBookingPopup'];
  onCloseRequest: () => void;
  onExitComplete: () => void;
};

export function DirectBookingPopup({
  open,
  copy,
  onCloseRequest,
  onExitComplete,
}: DirectBookingPopupProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const exitStartedRef = useRef(false);
  const [mounted, setMounted] = useState(true);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const backdrop = backdropRef.current;
    const card = cardRef.current;
    if (!root || !backdrop || !card) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (open) {
      exitStartedRef.current = false;
      gsap.killTweensOf([backdrop, card]);
      gsap.set(root, { pointerEvents: 'auto' });

      if (reducedMotion) {
        gsap.set(backdrop, { autoAlpha: 1 });
        gsap.set(card, { autoAlpha: 1, y: 0, scale: 1 });
        return undefined;
      }

      gsap.set(backdrop, { autoAlpha: 0 });
      gsap.set(card, { autoAlpha: 0, y: 28, scale: 0.94 });

      const timeline = gsap.timeline();
      timeline.to(backdrop, { autoAlpha: 1, duration: 0.35, ease: 'power2.out' }, 0);
      timeline.to(
        card,
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.48, ease: 'power3.out' },
        0.06,
      );

      return () => {
        timeline.kill();
      };
    }

    if (exitStartedRef.current) return undefined;
    exitStartedRef.current = true;

    const finishExit = () => {
      setMounted(false);
      onExitComplete();
    };

    if (reducedMotion) {
      finishExit();
      return undefined;
    }

    gsap.killTweensOf([backdrop, card]);
    gsap.set(root, { pointerEvents: 'none' });

    const timeline = gsap.timeline({ onComplete: finishExit });
    timeline.to(card, { autoAlpha: 0, y: 16, scale: 0.96, duration: 0.28, ease: 'power2.in' }, 0);
    timeline.to(backdrop, { autoAlpha: 0, duration: 0.24, ease: 'power2.in' }, 0.08);

    return () => {
      timeline.kill();
    };
  }, [open, onExitComplete]);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      onCloseRequest();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onCloseRequest]);

  if (!mounted) return null;

  return createPortal(
    <div
      ref={rootRef}
      className="home-offer-popup"
      role="dialog"
      aria-modal="true"
      aria-label={copy.ariaLabel}
    >
      <div
        ref={backdropRef}
        className="home-offer-popup__backdrop"
        onClick={onCloseRequest}
        aria-hidden
      />
      <div ref={cardRef} className="home-offer-popup__card">
        <p className="home-offer-popup__eyebrow">{copy.eyebrow}</p>
        <h2 className="home-offer-popup__title display-serif">{copy.title}</h2>
        <p className="home-offer-popup__text">{copy.text}</p>
        <div className="home-offer-popup__actions">
          <Link to="/prenota" className="home-offer-popup__book" onClick={onCloseRequest}>
            {copy.bookCta}
          </Link>
          <button type="button" className="home-offer-popup__close" onClick={onCloseRequest}>
            {copy.closeCta}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
