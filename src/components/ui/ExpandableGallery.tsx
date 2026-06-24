import { AnimatePresence, useReducedMotion } from 'framer-motion';
import * as m from 'framer-motion/m';
import '../../styles/expandable-gallery.css';
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import { MotionLazy } from './MotionLazy';

export type ExpandableGalleryImage = {
  src: string;
  alt: string;
};

const AUTOPLAY_DELAY_MS = 3500;

type ExpandableGalleryProps = {
  images: ExpandableGalleryImage[];
  leadImage?: ExpandableGalleryImage;
  /** `above` = hero sopra la track; `track` = prima cella nella track espandibile */
  leadPlacement?: 'above' | 'track';
  className?: string;
  closeLabel: string;
  prevLabel: string;
  nextLabel: string;
  counterLabel: (current: number, total: number) => string;
  autoplayLabel: string;
  /** Avvia lo scorrimento automatico quando la galleria entra nel viewport (una sola volta). */
  autoplayOnEnter?: boolean;
};

export function ExpandableGallery({
  images,
  leadImage,
  leadPlacement = 'above',
  className = '',
  closeLabel,
  prevLabel,
  nextLabel,
  counterLabel,
  autoplayLabel,
  autoplayOnEnter = false,
}: ExpandableGalleryProps) {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const autoplayOnEnterStartedRef = useRef(false);
  const autoplayRunRef = useRef(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isAutoplaying, setIsAutoplaying] = useState(false);
  const [autoplayIndex, setAutoplayIndex] = useState<number | null>(null);
  const allImages = leadImage ? [leadImage, ...images] : images;
  const leadInTrack = Boolean(leadImage && leadPlacement === 'track');
  const trackImages = leadInTrack ? allImages : images;
  const trackOffset = leadImage && !leadInTrack ? 1 : 0;

  const openImage = (index: number) => {
    setSelectedIndex(index);
  };

  const closeImage = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const goToNext = useCallback(
    (e?: MouseEvent) => {
      e?.stopPropagation();
      setSelectedIndex((current) =>
        current === null ? null : (current + 1) % allImages.length,
      );
    },
    [allImages.length],
  );

  const goToPrev = useCallback(
    (e?: MouseEvent) => {
      e?.stopPropagation();
      setSelectedIndex((current) =>
        current === null ? null : (current - 1 + allImages.length) % allImages.length,
      );
    },
    [allImages.length],
  );

  useEffect(() => {
    if (selectedIndex === null) return undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeImage();
      if (event.key === 'ArrowRight') goToNext();
      if (event.key === 'ArrowLeft') goToPrev();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedIndex, closeImage, goToNext, goToPrev]);

  const startAutoplay = useCallback(() => {
    setHoveredIndex(null);
    autoplayRunRef.current += 1;
    setIsAutoplaying(true);
    setAutoplayIndex(0);
  }, []);

  const stopAutoplay = useCallback(() => {
    autoplayRunRef.current += 1;
    setIsAutoplaying(false);
    setAutoplayIndex(null);
  }, []);

  const handleTrackItemEnter = useCallback(
    (index: number) => {
      stopAutoplay();
      setHoveredIndex(index);
    },
    [stopAutoplay],
  );

  const handleTrackItemLeave = useCallback(() => {
    setHoveredIndex(null);
  }, []);

  const canAutoplay = allImages.length > 1 && !reduceMotion;

  useEffect(() => {
    if (!autoplayOnEnter || !canAutoplay) return undefined;

    const root = rootRef.current;
    if (!root) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || autoplayOnEnterStartedRef.current) return;
        autoplayOnEnterStartedRef.current = true;
        startAutoplay();
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [autoplayOnEnter, canAutoplay, startAutoplay]);

  useEffect(() => {
    if (!isAutoplaying || autoplayIndex === null) return undefined;

    const runId = autoplayRunRef.current;
    const timeout = window.setTimeout(() => {
      if (runId !== autoplayRunRef.current) return;

      if (autoplayIndex >= allImages.length - 1) {
        setIsAutoplaying(false);
        setAutoplayIndex(null);
        return;
      }

      setAutoplayIndex(autoplayIndex + 1);
    }, AUTOPLAY_DELAY_MS);

    return () => window.clearTimeout(timeout);
  }, [isAutoplaying, autoplayIndex, allImages.length]);

  const getTrackHighlightIndex = (): number | null => {
    if (isAutoplaying && autoplayIndex !== null) {
      if (leadImage && !leadInTrack) {
        if (autoplayIndex === 0) return null;
        return autoplayIndex - 1;
      }
      return autoplayIndex;
    }
    return hoveredIndex;
  };

  const trackHighlightIndex = getTrackHighlightIndex();
  const isLeadActive =
    isAutoplaying && autoplayIndex === 0 && Boolean(leadImage && !leadInTrack);

  const getFlexValue = (index: number) => {
    const isLeadCell = leadInTrack && index === 0;
    if (reduceMotion || trackHighlightIndex === null) {
      return isLeadCell ? 2 : 1;
    }
    return trackHighlightIndex === index ? 4 : 0.28;
  };

  if (allImages.length === 0) {
    return null;
  }

  return (
    <MotionLazy>
    <div
      ref={rootRef}
      className={`expandable-gallery${
        leadImage && !leadInTrack ? ' expandable-gallery--with-lead' : ''
      }${leadInTrack ? ' expandable-gallery--lead-in-track' : ''} ${className}`.trim()}
    >
      {leadImage && !leadInTrack && (
        <button
          type="button"
          className={`expandable-gallery__lead${
            isLeadActive ? ' expandable-gallery__lead--active' : ''
          }`}
          onClick={() => openImage(0)}
          onMouseEnter={stopAutoplay}
          onFocus={stopAutoplay}
          aria-label={leadImage.alt}
        >
          <img
            src={leadImage.src}
            alt=""
            className="expandable-gallery__lead-img"
            loading="lazy"
            decoding="async"
          />
        </button>
      )}

      {trackImages.length > 0 && (
      <div className="expandable-gallery__track" onMouseEnter={stopAutoplay}>
        {trackImages.map((image, index) => (
          <m.button
            key={image.src}
            type="button"
            className={`expandable-gallery__item${
              leadInTrack && index === 0 ? ' expandable-gallery__item--lead' : ''
            }`}
            style={{ flex: 1 }}
            animate={{ flex: getFlexValue(index) }}
            transition={{ duration: reduceMotion ? 0 : 0.5, ease: 'easeInOut' }}
            onMouseEnter={() => handleTrackItemEnter(index)}
            onMouseLeave={handleTrackItemLeave}
            onFocus={() => handleTrackItemEnter(index)}
            onBlur={handleTrackItemLeave}
            onClick={() => openImage(index + trackOffset)}
            aria-label={image.alt}
          >
            <img src={image.src} alt="" className="expandable-gallery__img" loading="lazy" decoding="async" />
            <m.span
              className="expandable-gallery__shade"
              aria-hidden
              initial={false}
              animate={{ opacity: trackHighlightIndex === index ? 0 : 0.28 }}
              transition={{ duration: reduceMotion ? 0 : 0.3 }}
            />
          </m.button>
        ))}
      </div>
      )}

      {canAutoplay && (
        <div className="expandable-gallery__controls">
          <button
            type="button"
            className="expandable-gallery__autoplay"
            onClick={startAutoplay}
            disabled={isAutoplaying}
            aria-busy={isAutoplaying}
          >
            <Play size={16} strokeWidth={2.25} aria-hidden />
            {autoplayLabel}
          </button>
        </div>
      )}

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {selectedIndex !== null && (
              <m.div
                className="expandable-gallery__lightbox"
                role="dialog"
                aria-modal="true"
                aria-label={allImages[selectedIndex]?.alt}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeImage}
              >
                <button
                  type="button"
                  className="expandable-gallery__lightbox-btn expandable-gallery__lightbox-btn--close"
                  onClick={closeImage}
                  aria-label={closeLabel}
                >
                  <X size={28} strokeWidth={1.75} aria-hidden />
                </button>

                {allImages.length > 1 && (
                  <button
                    type="button"
                    className="expandable-gallery__lightbox-btn expandable-gallery__lightbox-btn--prev"
                    onClick={goToPrev}
                    aria-label={prevLabel}
                  >
                    <ChevronLeft size={36} strokeWidth={1.75} aria-hidden />
                  </button>
                )}

                <m.figure
                  className="expandable-gallery__lightbox-stage"
                  onClick={(e) => e.stopPropagation()}
                  key={selectedIndex}
                  initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.92 }}
                  transition={{ duration: reduceMotion ? 0 : 0.3 }}
                >
                  <img
                    src={allImages[selectedIndex].src}
                    alt={allImages[selectedIndex].alt}
                    className="expandable-gallery__lightbox-img"
                  />
                </m.figure>

                {allImages.length > 1 && (
                  <button
                    type="button"
                    className="expandable-gallery__lightbox-btn expandable-gallery__lightbox-btn--next"
                    onClick={goToNext}
                    aria-label={nextLabel}
                  >
                    <ChevronRight size={36} strokeWidth={1.75} aria-hidden />
                  </button>
                )}

                <p className="expandable-gallery__counter" aria-live="polite">
                  {counterLabel(selectedIndex + 1, allImages.length)}
                </p>
              </m.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
    </MotionLazy>
  );
}
