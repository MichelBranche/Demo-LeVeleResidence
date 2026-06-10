import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect } from 'react';

type PelosaLightboxImage = {
  src: string;
  alt: string;
};

type PelosaLightboxProps = {
  images: PelosaLightboxImage[];
  index: number;
  closeLabel: string;
  closeGalleryLabel: string;
  prevLabel: string;
  nextLabel: string;
  counterLabel: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export function PelosaLightbox({
  images,
  index,
  closeLabel,
  closeGalleryLabel,
  prevLabel,
  nextLabel,
  counterLabel,
  onClose,
  onPrev,
  onNext,
}: PelosaLightboxProps) {
  const image = images[index];
  const hasMultiple = images.length > 1;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasMultiple) onPrev();
      if (e.key === 'ArrowRight' && hasMultiple) onNext();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose, onPrev, onNext, hasMultiple]);

  if (!image) return null;

  return (
    <div className="pelosa-lightbox" role="dialog" aria-modal="true" aria-label={image.alt}>
      <button type="button" className="pelosa-lightbox__backdrop" onClick={onClose} aria-label={closeLabel} />
      <button type="button" className="pelosa-lightbox__close" onClick={onClose} aria-label={closeGalleryLabel}>
        ×
      </button>

      {hasMultiple && (
        <>
          <button type="button" className="pelosa-lightbox__nav pelosa-lightbox__nav--prev" onClick={onPrev} aria-label={prevLabel}>
            <ChevronLeft size={22} strokeWidth={1.75} aria-hidden />
          </button>
          <button type="button" className="pelosa-lightbox__nav pelosa-lightbox__nav--next" onClick={onNext} aria-label={nextLabel}>
            <ChevronRight size={22} strokeWidth={1.75} aria-hidden />
          </button>
          <p className="pelosa-lightbox__counter" aria-live="polite">
            {counterLabel}
          </p>
        </>
      )}

      <figure className="pelosa-lightbox__stage" key={image.src}>
        <img src={image.src} alt={image.alt} />
        <figcaption>{image.alt}</figcaption>
      </figure>
    </div>
  );
}
