import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';

/*
 * Lightbox con animazione "FLIP" (First/Last/Invert/Play) manuale:
 * l'immagine viene posizionata al centro con le sue dimensioni finali,
 * poi pre-trasformata sulle coordinate dell'origine (thumbnail in griglia)
 * e animata a scala 1 / offset 0. Alla chiusura, il processo si inverte.
 */
export function PelosaLightbox({ item, onClose }) {
  const imgRef = useRef(null);
  const backdropRef = useRef(null);
  const frameRef = useRef(null);
  const closingRef = useRef(false);

  const startClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    const img = imgRef.current;
    const backdrop = backdropRef.current;
    if (!img || !backdrop) {
      onClose();
      return;
    }

    /* Stop eventuali tween ancora in corso dall'apertura per evitare conflitti. */
    gsap.killTweensOf([img, backdrop]);

    const target = img.getBoundingClientRect();
    const origin = item?.element?.getBoundingClientRect?.();

    if (!origin || target.width === 0 || target.height === 0) {
      gsap.to(backdrop, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: onClose,
      });
      return;
    }

    const scaleX = origin.width / target.width;
    const scaleY = origin.height / target.height;

    gsap.to(img, {
      x: origin.left - target.left,
      y: origin.top - target.top,
      scaleX,
      scaleY,
      borderRadius: 12,
      duration: 0.55,
      ease: 'power3.inOut',
    });
    gsap.to(backdrop, {
      opacity: 0,
      duration: 0.45,
      ease: 'power2.in',
      onComplete: onClose,
    });
  }, [item, onClose]);

  useLayoutEffect(() => {
    if (!item) return undefined;
    const img = imgRef.current;
    const backdrop = backdropRef.current;
    const frame = frameRef.current;
    if (!img || !backdrop || !frame || !item.element) return undefined;

    /* Nuova apertura: ripristina il flag di chiusura (il useRef sopravvive ai
       mount/unmount del DOM perché il componente esterno resta montato). */
    closingRef.current = false;

    /* Rimuovi eventuali inline styles lasciati da un tween precedente. */
    gsap.killTweensOf([img, backdrop]);
    gsap.set(img, { clearProps: 'transform,borderRadius' });
    gsap.set(backdrop, { clearProps: 'opacity' });

    let cancelled = false;

    const animateIn = () => {
      if (cancelled) return;
      const target = img.getBoundingClientRect();
      const origin = item.element.getBoundingClientRect();
      if (target.width === 0 || target.height === 0) return;

      const scaleX = origin.width / target.width;
      const scaleY = origin.height / target.height;

      gsap.set(img, {
        x: origin.left - target.left,
        y: origin.top - target.top,
        scaleX,
        scaleY,
        transformOrigin: '0 0',
        borderRadius: 12,
      });
      gsap.to(img, {
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        borderRadius: 6,
        duration: 0.7,
        ease: 'expo.out',
      });
      gsap.fromTo(
        backdrop,
        { opacity: 0 },
        { opacity: 1, duration: 0.45, ease: 'power2.out' },
      );
      gsap.fromTo(
        frame.querySelectorAll('.pelosa-lightbox-chrome'),
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.18 },
      );
    };

    if (img.complete && img.naturalWidth > 0) animateIn();
    else img.addEventListener('load', animateIn, { once: true });

    return () => {
      cancelled = true;
      img.removeEventListener('load', animateIn);
    };
  }, [item]);

  useEffect(() => {
    if (!item) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') startClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      /* Ripristina sempre lo scroll, anche se la chiusura è stata interrotta. */
      document.body.style.overflow = prevOverflow;
    };
  }, [item, startClose]);

  if (!item) return null;

  return createPortal(
    <div
      className="pelosa-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
      ref={frameRef}
    >
      <div
        ref={backdropRef}
        className="pelosa-lightbox-backdrop"
        onClick={startClose}
        aria-hidden="true"
      />
      <button
        type="button"
        className="pelosa-lightbox-close pelosa-lightbox-chrome"
        onClick={startClose}
        aria-label="Chiudi immagine"
      >
        <span aria-hidden="true">×</span>
      </button>
      <div className="pelosa-lightbox-stage" onClick={startClose}>
        <img
          ref={imgRef}
          src={item.src}
          alt={item.alt}
          className="pelosa-lightbox-img"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      {item.alt && (
        <p className="pelosa-lightbox-caption pelosa-lightbox-chrome">{item.alt}</p>
      )}
    </div>,
    document.body,
  );
}
