import { useEffect, useRef } from 'react';
import '../../styles/swaying-photo-gallery.css';

export type SwayingPhotoGalleryImage = {
  src: string;
  alt: string;
};

type SwayingPhotoGalleryProps = {
  photos: readonly SwayingPhotoGalleryImage[];
  ariaLabel: string;
  className?: string;
};

const ANIMATION_MS = 10_000;

export function SwayingPhotoGallery({ photos, ariaLabel, className }: SwayingPhotoGalleryProps) {
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return undefined;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return undefined;

    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const animEnd = () => {
      gallery.classList.remove('swaying-gallery--active');
      void gallery.offsetWidth;
    };

    const animStart = () => {
      if (!gallery.classList.contains('swaying-gallery--active')) {
        gallery.classList.add('swaying-gallery--active');
        timeoutId = window.setTimeout(animEnd, ANIMATION_MS);
      }
    };

    document.addEventListener('scroll', animStart, { passive: true });
    window.addEventListener('resize', animStart);
    animStart();

    return () => {
      document.removeEventListener('scroll', animStart);
      window.removeEventListener('resize', animStart);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      gallery.classList.remove('swaying-gallery--active');
    };
  }, [photos]);

  if (photos.length === 0) return null;

  const rootClassName = ['swaying-gallery', className].filter(Boolean).join(' ');

  return (
    <div
      ref={galleryRef}
      className={rootClassName}
      role="group"
      aria-label={ariaLabel}
    >
      {photos.map((photo) => (
        <figure key={photo.src} className="swaying-gallery__figure">
          <img
            src={photo.src}
            alt={photo.alt}
            className="swaying-gallery__img"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </figure>
      ))}
    </div>
  );
}
