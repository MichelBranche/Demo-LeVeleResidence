import { useRef } from 'react';
import { residenceHighlights, residenceIntro } from '../../data/site';
import { useResidenceAnimations } from '../../hooks/useResidenceAnimations';
import { ServicesAccordion } from './ServicesAccordion';

const marqueeItems = ['Cala Lupo', 'La Pelosa', 'Calette', 'Nord Sardegna', 'Stintino'] as const;

export function ResidenceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useResidenceAnimations(sectionRef);

  return (
    <section id="residence" className="residence" ref={sectionRef} aria-labelledby="residence-title">
      <div className="residence__inner">
        <header className="residence__intro">
          <div className="residence__intro-main">
            <p className="residence__eyebrow">{residenceIntro.eyebrow}</p>
            <h2 id="residence-title" className="residence__title display-serif">
              <span className="residence__title-line">{residenceIntro.titleLine}</span>
              <span className="residence__title-brand">{residenceIntro.titleBrand}</span>
            </h2>
          </div>
          <div className="residence__intro-aside">
            <p className="residence__stat">
              <span className="residence__stat-value">{residenceIntro.location}</span>
              <span className="residence__stat-label">{residenceIntro.locationLabel}</span>
            </p>
            <p className="residence__kicker">{residenceIntro.kicker}</p>
          </div>
        </header>

        <div className="residence__marquee" aria-hidden>
          <div className="residence__marquee-track">
            {[...marqueeItems, ...marqueeItems].map((label, i) => (
              <span key={`${label}-${i}`}>{label}</span>
            ))}
          </div>
        </div>

        <p className="residence__lead">{residenceIntro.lead}</p>

        <dl className="residence__metrics" aria-label="In sintesi">
          {residenceHighlights.map((item) => (
            <div key={item.label} className="residence__metric">
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>

        <ServicesAccordion className="residence__accordion" />
      </div>
    </section>
  );
}
