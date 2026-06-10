import { useRef } from 'react';
import { useResidenceAnimations } from '../../hooks/useResidenceAnimations';
import { useSiteLocale } from '../../hooks/useSiteLocale';
import { ResidenceCrispShowcase } from '../ui/ResidenceCrispShowcase';

export function ResidenceSection() {
  const { content } = useSiteLocale();
  const { residenceIntro, residenceHighlights } = content;
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
              <span className="residence__title-brand">
                {residenceIntro.titleBrandBefore}{' '}
                <span className="residence__title-accent">{residenceIntro.titleBrandAccent}</span>
              </span>
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
            {[...residenceIntro.marquee, ...residenceIntro.marquee].map((label, i) => (
              <span key={`${label}-${i}`}>{label}</span>
            ))}
          </div>
        </div>

        <p className="residence__lead">{residenceIntro.lead}</p>

        <dl className="residence__metrics" aria-label={residenceIntro.metricsAria}>
          {residenceHighlights.map((item) => (
            <div key={item.label} className="residence__metric">
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>

        <ResidenceCrispShowcase />
      </div>
    </section>
  );
}
