import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSiteLocale } from '../../hooks/useSiteLocale';
import { useSuitesAnimations } from '../../hooks/useSuitesAnimations';

export function SuitesSection() {
  const { content } = useSiteLocale();
  const { suitesIntro, suites } = content;
  const sectionRef = useRef<HTMLElement>(null);
  useSuitesAnimations(sectionRef);

  return (
    <section id="suites" className="suites" ref={sectionRef} aria-labelledby="suites-title">
      <div className="suites__inner">
        <header className="suites__intro">
          <div className="suites__intro-main">
            <p className="suites__eyebrow">{suitesIntro.eyebrow}</p>
            <h2 id="suites-title" className="suites__title display-serif">
              {suitesIntro.title}
            </h2>
          </div>
          <div className="suites__intro-aside">
            <p className="suites__stat">
              <span className="suites__stat-value">{suitesIntro.count}</span>
              <span className="suites__stat-label">{suitesIntro.countLabel}</span>
            </p>
            <p className="suites__kicker">{suitesIntro.kicker}</p>
          </div>
        </header>

        <div className="suites__marquee" aria-hidden>
          <div className="suites__marquee-track">
            {[...suitesIntro.marquee, ...suitesIntro.marquee].map((label, i) => (
              <span key={`${label}-${i}`}>{label}</span>
            ))}
          </div>
        </div>

        <div className="suites__list">
          {suites.map((suite, index) => (
            <article
              key={suite.slug}
              className={`suites__item${index % 2 === 1 ? ' suites__item--reverse' : ''}`}
            >
              <span className="suites__index" aria-hidden>
                {String(index + 1).padStart(2, '0')}
              </span>

              <Link
                to={`/camere/${suite.slug}`}
                className="suites__media"
                aria-label={suite.discoverAria}
              >
                <div className="suites__media-inner">
                  <img src={suite.image} alt={suite.title} loading="lazy" decoding="async" />
                </div>
                <span className="suites__media-tag">{suite.kicker}</span>
              </Link>

              <div className="suites__content">
                <p className="suites__label">{suite.listLabel}</p>
                <h3 className="suites__name display-serif">{suite.title}</h3>
                <p className="suites__desc">{suite.description}</p>
                <ul className="suites__features" role="list">
                  {suite.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <Link to={`/camere/${suite.slug}`} className="suites__cta">
                  <span className="suites__cta-text">{suite.exploreCta}</span>
                  <span className="suites__cta-arrow" aria-hidden>
                    →
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
