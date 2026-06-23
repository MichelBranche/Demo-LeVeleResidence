import { useReducedMotion } from 'framer-motion';
import * as m from 'framer-motion/m';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, type KeyboardEvent } from 'react';
import { MotionLazy } from './MotionLazy';

export type TiltedCarouselItem = {
  id: string;
  src: string;
  alt: string;
  title: string;
  /** Più immagini nella stessa slide (es. aeroporto + porto). */
  gallery?: { src: string; alt: string; caption?: string }[];
};

type TiltedCarouselProps = {
  items: TiltedCarouselItem[];
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
  prevLabel: string;
  nextLabel: string;
  className?: string;
};

const SLIDE_OFFSET_PX = 88;
const ROTATE_PER_STEP = 26;

export function TiltedCarousel({
  items,
  activeIndex,
  onActiveIndexChange,
  prevLabel,
  nextLabel,
  className = '',
}: TiltedCarouselProps) {
  const reduceMotion = useReducedMotion();
  const count = items.length;

  const toPrev = useCallback(() => {
    onActiveIndexChange(Math.max(0, activeIndex - 1));
  }, [activeIndex, onActiveIndexChange]);

  const toNext = useCallback(() => {
    onActiveIndexChange(Math.min(count - 1, activeIndex + 1));
  }, [activeIndex, count, onActiveIndexChange]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      toPrev();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      toNext();
    }
  };

  if (count === 0) return null;

  const spring = reduceMotion
    ? { duration: 0 }
    : { type: 'spring' as const, bounce: 0.14, duration: 0.75 };

  return (
    <MotionLazy>
    <div
      className={`tilted-carousel ${className}`.trim()}
      onKeyDown={onKeyDown}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label={items[activeIndex]?.title}
    >
      <div className="tilted-carousel__stage">
        {items.map((item, index) => {
          const offset = index - activeIndex;
          const isActive = offset === 0;
          const distance = Math.abs(offset);
          const rotateY = reduceMotion ? 0 : -offset * ROTATE_PER_STEP;
          const scale = reduceMotion ? 1 : isActive ? 1 : Math.max(0.84, 0.94 - distance * 0.05);

          return (
            <div
              className="tilted-carousel__slide-perspective"
              key={item.id}
              style={{ zIndex: 20 - distance }}
            >
              <m.div
                className="tilted-carousel__slide"
                animate={{
                  x: reduceMotion ? 0 : offset * SLIDE_OFFSET_PX,
                  rotateY,
                  scale,
                  opacity: distance > 2 ? 0 : 1,
                }}
                transition={spring}
              >
                <button
                  type="button"
                  className={`tilted-carousel__slide-btn${
                    item.gallery?.length === 2 ? ' tilted-carousel__slide-btn--duo' : ''
                  }`}
                  onClick={() => onActiveIndexChange(index)}
                  aria-label={item.title}
                  aria-current={isActive ? 'true' : undefined}
                  tabIndex={isActive ? 0 : -1}
                >
                  {item.gallery?.length === 2 ? (
                    <span className="tilted-carousel__slide-duo">
                      {item.gallery.map((img) => (
                        <span key={img.src} className="tilted-carousel__slide-duo-item">
                          <img
                            src={img.src}
                            alt={img.alt}
                            className="tilted-carousel__slide-img"
                            loading={distance <= 1 ? 'eager' : 'lazy'}
                            decoding="async"
                            draggable={false}
                          />
                          {img.caption ? (
                            <span className="tilted-carousel__slide-duo-caption">{img.caption}</span>
                          ) : null}
                        </span>
                      ))}
                    </span>
                  ) : (
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="tilted-carousel__slide-img"
                      loading={distance <= 1 ? 'eager' : 'lazy'}
                      decoding="async"
                      draggable={false}
                    />
                  )}
                </button>

                <m.p
                  className="tilted-carousel__slide-caption"
                  animate={{
                    filter: isActive ? 'blur(0px)' : 'blur(2px)',
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={{ duration: reduceMotion ? 0 : 0.35 }}
                  aria-hidden={!isActive}
                >
                  {item.title}
                </m.p>
              </m.div>
            </div>
          );
        })}
      </div>

      {count > 1 ? (
        <div className="tilted-carousel__controls">
          <button
            type="button"
            className="tilted-carousel__nav-btn"
            onClick={toPrev}
            disabled={activeIndex === 0}
            aria-label={prevLabel}
          >
            <ChevronLeft size={20} strokeWidth={2} aria-hidden />
          </button>

          <div className="tilted-carousel__dots" role="tablist" aria-label={items[activeIndex]?.title}>
            {items.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={item.title}
                className={`tilted-carousel__dot${index === activeIndex ? ' is-active' : ''}`}
                onClick={() => onActiveIndexChange(index)}
              />
            ))}
          </div>

          <button
            type="button"
            className="tilted-carousel__nav-btn"
            onClick={toNext}
            disabled={activeIndex === count - 1}
            aria-label={nextLabel}
          >
            <ChevronRight size={20} strokeWidth={2} aria-hidden />
          </button>
        </div>
      ) : null}
    </div>
    </MotionLazy>
  );
}
