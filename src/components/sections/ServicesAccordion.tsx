import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { residenceCards } from '../../data/site';
import { useScrollAccordion } from '../../hooks/useScrollAccordion';

function AccordionMedia({ service }: { service: (typeof residenceCards)[number] }) {
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
          alt={'imageAlt' in service ? service.imageAlt : ''}
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
  const accordionRef = useRef<HTMLDivElement>(null);
  useScrollAccordion(accordionRef, '.scroll-accordion__item');

  return (
    <div className={`section--services-accordion ${className}`.trim()}>
      {showIntro && (
        <div className="section--services-accordion__intro">
          <p className="eyebrow">In dettaglio</p>
          <h3 className="section-title display-serif">Posizione &amp; servizi</h3>
        </div>
      )}

      <div className="scroll-accordion" ref={accordionRef}>
        {residenceCards.map((service) => (
          <article key={service.title} className="scroll-accordion__item">
            <div className="scroll-accordion__card">
              <h4 className="scroll-accordion__heading">
                <i aria-hidden>●</i> {service.title}
              </h4>
              <div className="scroll-accordion__content" aria-expanded="false">
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
                      {'linkLabel' in service && service.linkLabel ? service.linkLabel : 'Scopri di più'} →
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
