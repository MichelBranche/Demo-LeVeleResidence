import { useCallback, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCrispSlideshow } from '@/hooks/useCrispSlideshow';
import { useSiteLocale } from '@/hooks/useSiteLocale';
import { ResidenceServiceIcon } from '../ResidenceServiceIcon';

type ResidenceCard = ReturnType<typeof useSiteLocale>['content']['residenceCardsMerged'][number];

type ResidenceCrispShowcaseProps = {
  className?: string;
};

function PawIcon() {
  return (
    <svg
      className="residence-crisp__paw"
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

function getSlideVisual(card: ResidenceCard) {
  if (card.image) {
    return { src: card.image, alt: card.imageAlt ?? card.title };
  }

  if (card.images?.[0]) {
    return { src: card.images[0].src, alt: card.images[0].alt || card.title };
  }

  return { src: '', alt: card.title };
}

function SlideTitle({ card }: { card: ResidenceCard }) {
  return (
    <h4 className="residence-crisp__slide-title display-serif">
      {card.icon === 'pets' ? (
        <span className="residence-crisp__slide-title-row">
          {card.title}
          <PawIcon />
        </span>
      ) : (
        card.title
      )}
    </h4>
  );
}

function SlidePanel({
  card,
  discoverMore,
}: {
  card: ResidenceCard;
  discoverMore: string;
}) {
  return (
    <>
      <p className="residence-crisp__desc">{card.description}</p>

      {card.routes && card.routes.length > 0 ? (
        <ul className="residence-crisp__routes" role="list">
          {card.routes.map((route) => (
            <li key={route.label}>
              <span className="residence-crisp__route-distance">{route.distance}</span>
              <span>{route.label}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {card.link ? (
        <Link to={card.link} className="residence-crisp__link">
          {card.linkLabel ?? discoverMore} →
        </Link>
      ) : null}
    </>
  );
}

function SlideMedia({ card, eager }: { card: ResidenceCard; eager?: boolean }) {
  if (card.images && card.images.length > 1) {
    return (
      <div className="residence-crisp__slide-duo" data-slideshow="parallax">
        {card.images.map((img) => (
          <figure key={img.src} className="residence-crisp__slide-duo-item">
            <img
              src={img.src}
              alt={img.alt || card.title}
              loading={eager ? 'eager' : 'lazy'}
              decoding="async"
              draggable={false}
            />
            {img.caption ? <figcaption>{img.caption}</figcaption> : null}
          </figure>
        ))}
      </div>
    );
  }

  const visual = getSlideVisual(card);

  return (
    <img
      className="residence-crisp__slide-inner"
      data-slideshow="parallax"
      src={visual.src}
      alt={visual.alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      draggable={false}
    />
  );
}

function ThumbMedia({ card }: { card: ResidenceCard }) {
  if (card.images && card.images.length > 1) {
    return (
      <span className="residence-crisp__thumb-split" aria-hidden>
        {card.images.slice(0, 2).map((img) => (
          <img key={img.src} src={img.src} alt="" loading="lazy" decoding="async" draggable={false} />
        ))}
      </span>
    );
  }

  const visual = getSlideVisual(card);
  return <img src={visual.src} alt="" loading="lazy" decoding="async" draggable={false} />;
}

export function ResidenceCrispShowcase({ className = '' }: ResidenceCrispShowcaseProps) {
  const { content } = useSiteLocale();
  const { residenceCardsMerged, residenceAccordion, residenceServices } = content;
  const slides = useMemo(
    () => residenceCardsMerged.filter((card) => card.title && hasSlideVisual(card)),
    [residenceCardsMerged],
  );
  const wrapRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const onSlideChange = useCallback((index: number) => setActiveIndex(index), []);

  useCrispSlideshow(wrapRef, slides.length, onSlideChange, { autoplay: true });

  return (
    <div className={`residence-crisp ${className}`.trim()}>
      <header className="residence-crisp__header">
        <p className="residence-crisp__eyebrow">{residenceAccordion.eyebrow}</p>
        <h3 className="residence-crisp__title display-serif">{residenceAccordion.showcaseTitle}</h3>
      </header>

      {slides.length > 0 ? (
        <div ref={wrapRef} className="residence-crisp__showcase" data-slideshow="wrap">
          <div className="residence-crisp__stage">
            <div className="residence-crisp__slider" aria-hidden>
              <div className="residence-crisp__slider-list">
                {slides.map((card, index) => (
                  <div
                    key={card.title}
                    data-slideshow="slide"
                    className={`residence-crisp__slide${index === 0 ? ' is--current' : ''}`}
                  >
                    <SlideMedia card={card} eager={index === 0} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="residence-crisp__controls">
            <div className="residence-crisp__title-stack">
              {slides.map((card, index) => (
                <div
                  key={card.title}
                  data-slideshow="title"
                  className={`residence-crisp__title-layer${index === 0 ? ' is--current' : ''}`}
                  aria-hidden={index !== activeIndex}
                >
                  <div data-slideshow="title-content" className="residence-crisp__title-layer-inner">
                    <SlideTitle card={card} />
                  </div>
                </div>
              ))}
            </div>

            <div className="residence-crisp__nav">
              <p className="residence-crisp__nav-hint" id="residence-crisp-nav-hint">
                {residenceAccordion.navHint}
              </p>
              <div className="residence-crisp__nav-row">
                <ChevronLeft className="residence-crisp__nav-cue residence-crisp__nav-cue--left" aria-hidden />
                <div
                  className="residence-crisp__slider-nav"
                  role="tablist"
                  aria-label={residenceAccordion.showcaseTitle}
                  aria-describedby="residence-crisp-nav-hint"
                >
                  {slides.map((card, index) => (
                    <button
                      key={card.title}
                      type="button"
                      role="tab"
                      aria-selected={index === activeIndex}
                      aria-label={card.title}
                      data-slideshow="thumb"
                      className={`residence-crisp__thumb${index === activeIndex ? ' is--current' : ''}`}
                    >
                      <ThumbMedia card={card} />
                    </button>
                  ))}
                </div>
                <ChevronRight className="residence-crisp__nav-cue residence-crisp__nav-cue--right" aria-hidden />
              </div>
            </div>

            <div className="residence-crisp__panel-stack">
              {slides.map((card, index) => (
                <div
                  key={card.title}
                  data-slideshow="panel"
                  className={`residence-crisp__panel-layer${index === 0 ? ' is--current' : ''}`}
                  aria-hidden={index !== activeIndex}
                >
                  <div data-slideshow="panel-content" className="residence-crisp__panel-layer-inner">
                    <SlidePanel card={card} discoverMore={residenceAccordion.discoverMore} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <div className="residence-crisp__services-block">
        <header className="residence-crisp__services-header">
          <h3 className="section-title residence-crisp__services-title">{residenceAccordion.title}</h3>
          {residenceAccordion.subtitle ? (
            <p className="residence-crisp__subtitle">{residenceAccordion.subtitle}</p>
          ) : null}
        </header>

        <div className="residence-services">
          {residenceServices.groups.map((group) => (
            <section
              key={group.id}
              className={`residence-services__group residence-services__group--${group.id}`}
              aria-labelledby={`residence-services-${group.id}`}
            >
              <div className="residence-services__group-head">
                <h4 id={`residence-services-${group.id}`} className="residence-services__group-title">
                  {group.title}
                </h4>
                {group.badge ? (
                  <span className="residence-services__group-badge">{group.badge}</span>
                ) : null}
              </div>

              <ul className="residence-services__list" role="list">
                {group.items.map((item) => (
                  <li key={item.icon} className="residence-services__item">
                    <span className="residence-services__icon" aria-hidden>
                      <ResidenceServiceIcon id={item.icon} />
                    </span>
                    <span className="residence-services__label">{item.label}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
