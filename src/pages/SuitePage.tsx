import { useEffect, useRef } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getSuiteSlugFromPathname } from '../data/routes';
import { getSuiteBySlug, suites } from '../data/site';
import { useSuitePageAnimations } from '../hooks/useSuitePageAnimations';

function splitSuiteTitle(title: string) {
  const parts = title.trim().split(/\s+/);
  if (parts.length < 2) return { line1: title, line2: null as string | null };
  return {
    line1: parts.slice(0, -1).join(' '),
    line2: parts[parts.length - 1] ?? null,
  };
}

export function SuitePage() {
  const { slug: paramSlug = '' } = useParams();
  const { pathname } = useLocation();
  const slug = paramSlug || getSuiteSlugFromPathname(pathname) || '';
  const suite = getSuiteBySlug(slug);
  const pageRef = useRef<HTMLElement>(null);
  useSuitePageAnimations(pageRef);

  useEffect(() => {
    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [slug]);

  if (!suite) {
    return (
      <main className="page-inner placeholder-page">
        <h1 className="display-title">Suite non trovata</h1>
        <Link to="/#suites">← Torna alle suites</Link>
      </main>
    );
  }

  const otherSuite = suites.find((s) => s.slug !== suite.slug);
  const mailSubject = `Prenotazione ${suite.title}`;
  const marqueeLabel = `${suite.title} · Stintino · Sardegna · `;
  const { line1: titleLine1, line2: titleLine2 } = splitSuiteTitle(suite.title);

  return (
    <main
      key={slug}
      className={`suite-page suite-page--${suite.theme}`}
      ref={pageRef}
      aria-labelledby="suite-hero-title"
    >
      <section className="suite-hero">
        <div className="suite-hero__media">
          <img
            className="suite-hero__img"
            src={suite.image}
            alt={`${suite.title} — monolocale vacanze Stintino, Residence Le Vele`}
            fetchPriority="high"
            decoding="async"
          />
        </div>
        <div className="suite-hero__overlay" aria-hidden />
        <div className="suite-hero__inner">
          <Link to="/#suites" className="suite-hero__back">
            ← Le Suites
          </Link>
          <div className="suite-hero__content" data-suite-reveal-stagger>
            <h1 id="suite-hero-title" className="suite-hero__title display-serif">
              <span className="suite-hero__title-line">{titleLine1}</span>
              {titleLine2 && (
                <span className="suite-hero__title-line suite-hero__title-line--accent">
                  {titleLine2}
                </span>
              )}
            </h1>
            <p className="suite-hero__tagline">{suite.tagline}</p>
            <ul className="suite-hero__specs" aria-label="Informazioni suite">
              <li>
                <span className="suite-hero__spec-value">2–4</span>
                <span className="suite-hero__spec-label">ospiti</span>
              </li>
              <li>
                <span className="suite-hero__spec-value">Stintino</span>
                <span className="suite-hero__spec-label">Sardegna</span>
              </li>
              <li>
                <span className="suite-hero__spec-value">Monolocale</span>
                <span className="suite-hero__spec-label">vacanze</span>
              </li>
            </ul>
          </div>
          <a href="#suite-story" className="suite-hero__scroll" aria-label="Scorri verso il contenuto">
            <span className="suite-hero__scroll-line" aria-hidden />
            <span>Scorri</span>
          </a>
        </div>
      </section>

      <div className="suite-marquee" aria-hidden>
        <div className="suite-marquee__track">
          <span>{marqueeLabel}</span>
          <span>{marqueeLabel}</span>
          <span>{marqueeLabel}</span>
        </div>
      </div>

      <section id="suite-story" className="suite-story">
        <div className="suite-story__grid">
          <div className="suite-story__label-col" data-suite-reveal>
            <span className="suite-story__index">{suite.index}</span>
            <p className="suite-story__label">L&apos;esperienza</p>
          </div>
          <div className="suite-story__body" data-suite-reveal>
            <p className="suite-story__lead">{suite.description}</p>
            <p className="suite-story__note">
              Appartamento vacanze al Residence Le Vele — Stintino, a pochi minuti dalle spiagge più
              belle del Nord Sardegna.
            </p>
          </div>
        </div>
      </section>

      <section className="suite-gallery" aria-label={`Galleria ${suite.title}`}>
        <div className="suite-gallery__grid">
          {suite.gallery.map((item) => (
            <figure
              key={item.src}
              className={`suite-gallery__cell suite-gallery__cell--${item.layout}`}
            >
              <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
            </figure>
          ))}
        </div>
      </section>

      <section className="suite-amenities" aria-labelledby="suite-amenities-title">
        <div className="suite-amenities__head" data-suite-reveal-stagger>
          <p className="suite-amenities__eyebrow">Dotazioni</p>
          <h2 id="suite-amenities-title" className="suite-amenities__title display-serif">
            Tutto il necessario
          </h2>
        </div>
        <ul className="suite-amenities__list" role="list">
          {suite.features.map((feature, i) => (
            <li key={feature} className="suite-amenities__item">
              <span className="suite-amenities__num">{String(i + 1).padStart(2, '0')}</span>
              <span className="suite-amenities__name">{feature}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="suite-cta" aria-labelledby="suite-cta-title">
        <div className="suite-cta__wrap">
          <div className="suite-cta__panel" data-suite-reveal>
            <div className="suite-cta__panel-inner">
              <p className="suite-cta__eyebrow">Prenotazioni</p>
              <h2 id="suite-cta-title" className="suite-cta__title display-serif">
                Richiedi disponibilità
              </h2>
              <p className="suite-cta__text">
                Scrivici per date, numero di ospiti e preferenze — ti rispondiamo con un preventivo
                personalizzato.
              </p>
              <a
                className="suite-cta__btn"
                href={`mailto:info@rtalevele.com?subject=${encodeURIComponent(mailSubject)}`}
              >
                <span className="suite-cta__btn-label">Richiedi preventivo</span>
                <span className="suite-cta__btn-arrow" aria-hidden>
                  →
                </span>
              </a>
            </div>
          </div>

          <div className="suite-cta__nav">
            {otherSuite && (
              <Link
                to={`/camere/${otherSuite.slug}`}
                className="suite-cta__sibling"
                data-suite-reveal
              >
                <span className="suite-cta__sibling-text">
                  <span className="suite-cta__sibling-label">Altra suite</span>
                  <span className="suite-cta__sibling-title display-serif">{otherSuite.title}</span>
                </span>
                <span className="suite-cta__sibling-arrow" aria-hidden>
                  →
                </span>
              </Link>
            )}
            <Link to="/#suites" className="suite-cta__home">
              ← Tutte le suites
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
