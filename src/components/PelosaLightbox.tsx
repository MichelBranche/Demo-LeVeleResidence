import { useEffect } from 'react';

type PelosaLightboxProps = {
  src: string;
  alt: string;
  closeLabel: string;
  closeGalleryLabel: string;
  onClose: () => void;
};

export function PelosaLightbox({
  src,
  alt,
  closeLabel,
  closeGalleryLabel,
  onClose,
}: PelosaLightboxProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div className="pelosa-lightbox" role="dialog" aria-modal="true" aria-label={alt}>
      <button type="button" className="pelosa-lightbox__backdrop" onClick={onClose} aria-label={closeLabel} />
      <button type="button" className="pelosa-lightbox__close" onClick={onClose} aria-label={closeGalleryLabel}>
        ×
      </button>
      <figure className="pelosa-lightbox__stage">
        <img src={src} alt={alt} />
        <figcaption>{alt}</figcaption>
      </figure>
    </div>
  );
}
