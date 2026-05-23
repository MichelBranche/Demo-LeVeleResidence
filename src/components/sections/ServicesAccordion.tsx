import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAccordion } from '../../hooks/useScrollAccordion';
import { useSiteLocale } from '../../hooks/useSiteLocale';

type AccordionCard = ReturnType<typeof useSiteLocale>['content']['residenceCardsMerged'][number];

function PawIcon() {
  return (
    <svg
      className="scroll-accordion__paw"
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

function AccordionHeading({ service }: { service: AccordionCard }) {
  if (service.icon === 'pets') {
    return (
      <>
        <i aria-hidden>●</i>
        <span className="scroll-accordion__heading-label">
          {service.title}
          <PawIcon />
        </span>
      </>
    );
  }

  return (
    <>
      <i aria-hidden>●</i> {service.title}
    </>
  );
}

function AccordionMedia({ service }: { service: AccordionCard }) {
  if ('images' in service && service.images) {
    return (
      <div className="scroll-accordion__gallery">
        {service.images.map((img) => (
          <figure key={img.alt}>
            <img src={img.src} alt={img.alt} loading="lazy" decoding="async" />
            <figcaption>{img.caption}</figcaption>
          </figure>
        ))}
      </div>
    );
  }

  if ('image' in service && service.image) {
    return (
      <figure>
        <img
          src={service.image}
          alt={service.imageAlt ?? ''}
          loading="lazy"
          decoding="async"
        />
      </figure>
    );
  }

  return null;
}

type ServicesAccordionProps = {
  showIntro?: boolean;
  className?: string;
};

export function ServicesAccordion({ showIntro = true, className = '' }: ServicesAccordionProps) {
  const { content } = useSiteLocale();
  const { residenceCardsMerged, residenceAccordion } = content;
  const accordionRef = useRef<HTMLDivElement>(null);
  useScrollAccordion(accordionRef, '.scroll-accordion__item');

  return (
    <div className={`section--services-accordion ${className}`.trim()}>
      {showIntro && (
        <div className="section--services-accordion__intro">
          <p className="eyebrow">{residenceAccordion.eyebrow}</p>
          <h3 className="section-title display-serif">{residenceAccordion.title}</h3>
        </div>
      )}

      <div className="scroll-accordion" ref={accordionRef}>
        {residenceCardsMerged.map((service) => (
          <article key={service.title} className="scroll-accordion__item">
            <div className="scroll-accordion__card">
              <h4 className="scroll-accordion__heading">
                <button
                  type="button"
                  className="scroll-accordion__trigger"
                  aria-expanded="false"
                  tabIndex={-1}
                  aria-disabled="true"
                >
                  <AccordionHeading service={service} />
                </button>
              </h4>
              <div className="scroll-accordion__content">
                <div className="scroll-accordion__copy">
                  <p>{service.description}</p>
                  {'routes' in service && service.routes && (
                    <ul className="scroll-accordion__routes" role="list">
                      {service.routes.map((route) => (
                        <li key={route.label}>
                          <span className="scroll-accordion__route-distance">{route.distance}</span>
                          <span>{route.label}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {'link' in service && service.link && (
                    <Link to={service.link} className="scroll-accordion__link">
                      {service.linkLabel ?? residenceAccordion.discoverMore} →
                    </Link>
                  )}
                </div>
                <AccordionMedia service={service} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
