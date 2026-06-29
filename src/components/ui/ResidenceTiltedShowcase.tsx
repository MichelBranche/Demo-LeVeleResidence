import { useReducedMotion } from 'framer-motion';
import * as m from 'framer-motion/m';
import '../../styles/residence-tilted-showcase.css';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSiteLocale } from '@/hooks/useSiteLocale';
import { TiltedCarousel, type TiltedCarouselItem } from './TiltedCarousel';
import { MotionLazy } from './MotionLazy';

type ResidenceCard = ReturnType<typeof useSiteLocale>['content']['residenceCardsMerged'][number];

function PawIcon() {
  return (
    <svg
      className="residence-tilted__paw"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="5.8" cy="9.2" r="2.35" />
      <circle cx="10.2" cy="6.8" r="2.55" />
      <circle cx="13.8" cy="6.8" r="2.55" />
      <circle cx="18.2" cy="9.2" r="2.35" />
      <path d="M12 12.2c-3.55 0-6.35 2.45-6.35 5.55 0 2.85 2.65 4.85 6.35 4.85s6.35-2 6.35-4.85c0-3.1-2.8-5.55-6.35-5.55z" />
    </svg>
  );
}

function hasSlideVisual(card: ResidenceCard) {
  if (card.image) return true;
  return Boolean(card.images?.some((img) => img.src));
}

function getSlideVisual(card: ResidenceCard, photoIndex = 0) {
  if (card.image) {
    return { src: card.image, alt: card.imageAlt ?? card.title };
  }

  if (card.images?.[photoIndex]) {
    const img = card.images[photoIndex];
    return { src: img.src, alt: img.alt || card.title };
  }

  if (card.images?.[0]) {
    return { src: card.images[0].src, alt: card.images[0].alt || card.title };
  }

  return { src: '', alt: card.title };
}

function cardToCarouselItem(card: ResidenceCard, photoIndex = 0): TiltedCarouselItem {
  if (card.images && card.images.length === 2) {
    const gallery = card.images.map((img) => ({
      src: img.src,
      alt: img.alt || card.title,
      caption: img.caption || undefined,
    }));
    return {
      id: card.title,
      src: gallery[0].src,
      alt: gallery[0].alt,
      title: card.title,
      gallery,
    };
  }

  const visual = getSlideVisual(card, photoIndex);
  return {
    id: card.title,
    src: visual.src,
    alt: visual.alt,
    title: card.title,
    gallery:
      card.images && card.images.length > 2
        ? card.images.map((img) => ({
            src: img.src,
            alt: img.alt || card.title,
            caption: img.caption || undefined,
          }))
        : undefined,
  };
}

function ActiveCardPanel({
  card,
  discoverMore,
  photoIndex,
  onPhotoIndexChange,
  photoPickLabel,
}: {
  card: ResidenceCard;
  discoverMore: string;
  photoIndex: number;
  onPhotoIndexChange: (index: number) => void;
  photoPickLabel: string;
}) {
  const multiPhotos = card.images && card.images.length > 2 ? card.images : null;

  return (
    <div className="residence-tilted__panel">
      <h4 className="residence-tilted__panel-title">
        {card.icon === 'pets' ? (
          <span className="residence-tilted__panel-title-row">
            {card.title}
            <PawIcon />
          </span>
        ) : (
          card.title
        )}
      </h4>

      <p className="residence-tilted__panel-desc">{card.description}</p>

      {multiPhotos ? (
        <div className="residence-tilted__photo-pick" role="tablist" aria-label={photoPickLabel}>
          {multiPhotos.map((img, index) => (
            <button
              key={img.src}
              type="button"
              role="tab"
              aria-selected={index === photoIndex}
              aria-label={img.caption || img.alt}
              className={`residence-tilted__photo-pick-btn${index === photoIndex ? ' is-active' : ''}`}
              onClick={() => onPhotoIndexChange(index)}
            >
              <img src={img.src} alt="" loading="lazy" decoding="async" draggable={false} />
              {img.caption ? <span className="residence-tilted__photo-pick-label">{img.caption}</span> : null}
            </button>
          ))}
        </div>
      ) : null}

      {card.routes && card.routes.length > 0 ? (
        <ul className="residence-tilted__routes" role="list">
          {card.routes.map((route) => (
            <li key={route.label}>
              <span className="residence-tilted__route-distance">{route.distance}</span>
              <span>{route.label}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {card.link ? (
        <Link to={card.link} className="residence-tilted__link">
          {card.linkLabel ?? discoverMore} →
        </Link>
      ) : null}
    </div>
  );
}

export function ResidenceTiltedShowcase() {
  const { content } = useSiteLocale();
  const { residenceCardsMerged, residenceAccordion, residenceWelcome } = content;
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);

  const slides = useMemo(
    () => residenceCardsMerged.filter((card) => card.title && hasSlideVisual(card)),
    [residenceCardsMerged],
  );

  const activeCard = slides[activeIndex];
  const activeHasMultiPhotos = Boolean(activeCard?.images && activeCard.images.length > 2);

  useEffect(() => {
    setPhotoIndex(0);
  }, [activeIndex]);

  const carouselItems = useMemo(
    () =>
      slides.map((card, index) =>
        cardToCarouselItem(card, index === activeIndex && activeHasMultiPhotos ? photoIndex : 0),
      ),
    [slides, activeIndex, activeHasMultiPhotos, photoIndex],
  );

  return (
    <MotionLazy>
    <div className="residence-tilted">
      <header className="residence-tilted__header">
        <p className="residence-tilted__eyebrow">{residenceAccordion.eyebrow}</p>
        <h3 id="residence-showcase-title" className="section-title residence-tilted__title">
          {residenceAccordion.showcaseTitle}
        </h3>
        <p className="residence-tilted__hint">{residenceAccordion.navHint}</p>
      </header>

      {slides.length > 0 ? (
        <div className="residence-tilted__body">
          <TiltedCarousel
            items={carouselItems}
            activeIndex={activeIndex}
            onActiveIndexChange={setActiveIndex}
            prevLabel={residenceWelcome.prevLabel}
            nextLabel={residenceWelcome.nextLabel}
          />

          {activeCard ? (
            <m.div
              key={`${activeCard.title}-${photoIndex}`}
              className="residence-tilted__content"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.4, ease: 'easeOut' }}
            >
              <ActiveCardPanel
                card={activeCard}
                discoverMore={residenceAccordion.discoverMore}
                photoIndex={photoIndex}
                onPhotoIndexChange={setPhotoIndex}
                photoPickLabel={residenceAccordion.showcaseTitle}
              />
            </m.div>
          ) : null}
        </div>
      ) : null}
    </div>
    </MotionLazy>
  );
}
