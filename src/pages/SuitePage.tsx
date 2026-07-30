import '../styles/suite-detail.css';
import { useEffect, useRef } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { scheduleScrollTriggerRefresh } from '../lib/scrollTriggerRefresh';
import { useRouteTransition } from '../context/RouteTransitionContext';
import { getSuiteSlugFromPathname } from '../data/routes';
import { useSiteLocale } from '../hooks/useSiteLocale';
import { useSuitePageAnimations } from '../hooks/useSuitePageAnimations';
import { SuiteFeatureIcon } from '../components/SuiteFeatureIcon';
import { ExpandableGallery } from '../components/ui/ExpandableGallery';
import { getSuiteFeatureIcon } from '../lib/suiteFeatureIcons';

function splitSuiteTitle(title: string) {
  const parts = title.trim().split(/\s+/);
  if (parts.length < 2) return { line1: title, line2: null as string | null };
  return {
    line1: parts.slice(0, -1).join(' '),
    line2: parts[parts.length - 1] ?? null,
  };
}

export function SuitePage() {
  const { content } = useSiteLocale();
  const { suitePage, suites, residenceWelcome } = content;
  const { stage } = useRouteTransition();
  const { slug: paramSlug = '' } = useParams();
  const { pathname } = useLocation();
  const slug = paramSlug || getSuiteSlugFromPathname(pathname) || '';
  const suite = suites.find((s) => s.slug === slug);
  const pageRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLElement>(null);
  useSuitePageAnimations(pageRef);

  useEffect(() => {
    if (stage !== 'idle') return;

    scheduleScrollTriggerRefresh();
    scheduleScrollTriggerRefresh(400);
  }, [slug, stage]);

  useEffect(() => {
    const gallery = galleryRef.current;
    const page = pageRef.current;
    if (!gallery || !page) return undefined;

    const setImmersed = (active: boolean) => {
      page.classList.toggle('suite-page--gallery-immersed', active);
      gallery.classList.toggle('suite-gallery--immersed', active);
    };

    setImmersed(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        setImmersed(entry.isIntersecting && entry.intersectionRatio >= 0.12);
      },
      { threshold: [0, 0.08, 0.12, 0.2, 0.35, 0.5] },
    );

    observer.observe(gallery);
    return () => {
      observer.disconnect();
      setImmersed(false);
    };
  }, [slug, stage]);

  if (!suite) {
    return (
      <div className="page-inner placeholder-page">
        <h1 className="display-title">{suitePage.notFound}</h1>
        <Link to="/#suites">{suitePage.backToSuites}</Link>
      </div>
    );
  }

  const otherSuite = suites.find((s) => s.slug !== suite.slug);
  const marqueeLabel = `${suite.title} · Stintino · Sardegna · `;
  const { line1: titleLine1, line2: titleLine2 } = splitSuiteTitle(suite.title);

  return (
    <div
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
            alt={`${suite.title}${suitePage.heroAltSuffix}`}
            width={1024}
            height={682}
            fetchPriority="high"
            decoding="async"
          />
        </div>
        <div className="suite-hero__overlay" aria-hidden />
        <div className="suite-hero__inner">
          <Link to="/#suites" className="suite-hero__back">
            {suitePage.backLink}
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
            <ul className="suite-hero__specs" aria-label={suitePage.specsAria}>
              <li>
                <span className="suite-hero__spec-value">{suitePage.guests}</span>
                <span className="suite-hero__spec-label">{suitePage.guestsLabel}</span>
              </li>
              <li>
                <span className="suite-hero__spec-value">{suitePage.locationValue}</span>
                <span className="suite-hero__spec-label">{suitePage.locationLabel}</span>
              </li>
              <li>
                <span className="suite-hero__spec-value">{suitePage.typeValue}</span>
                <span className="suite-hero__spec-label">{suitePage.typeLabel}</span>
              </li>
            </ul>
          </div>
          <a href="#suite-story" className="suite-hero__scroll" aria-label={suitePage.scrollAria}>
            <span className="suite-hero__scroll-line" aria-hidden />
            <span>{suitePage.scrollLabel}</span>
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

      <section
        id="suite-story"
        className="suite-story"
        aria-labelledby="suite-story-label"
      >
        <div className="suite-story__inner">
          <header className="suite-story__meta" data-suite-reveal>
            <span className="suite-story__index" aria-hidden>
              {suite.index}
            </span>
            <p id="suite-story-label" className="suite-story__label">
              {suitePage.experience}
            </p>
          </header>
          <div className="suite-story__content" data-suite-reveal>
            <p className="suite-story__lead">{suite.description}</p>
            <p className="suite-story__note">{suitePage.storyNote}</p>
          </div>
        </div>
      </section>

      <section
        ref={galleryRef}
        className="section section--gallery suite-gallery"
        aria-labelledby="suite-gallery-title"
      >
        <div className="suite-gallery__immersion" aria-hidden />
        <div className="section--gallery__inner" data-suite-reveal>
          <header className="suite-gallery__head">
            <p className="suite-gallery__eyebrow">{suite.galleryKicker}</p>
            <h2 id="suite-gallery-title" className="section-title display-serif suite-gallery__title">
              {suite.galleryTitle}
            </h2>
          </header>
          <ExpandableGallery
            className="expandable-gallery--suite"
            leadPlacement="above"
            leadImage={{
              src: suite.gallery[0].src,
              alt: suite.gallery[0].alt,
            }}
            images={suite.gallery.slice(1).map(({ src, alt }) => ({ src, alt }))}
            closeLabel={residenceWelcome.closeLabel}
            prevLabel={residenceWelcome.prevLabel}
            nextLabel={residenceWelcome.nextLabel}
            counterLabel={(current, total) =>
              residenceWelcome.counterLabel
                .replace('{current}', String(current))
                .replace('{total}', String(total))
            }
            autoplayLabel={residenceWelcome.autoplayLabel}
            autoplayOnEnter={false}
          />
        </div>
      </section>

      <section className="suite-amenities" aria-labelledby="suite-amenities-title">
        <div className="suite-amenities__head" data-suite-reveal-stagger>
          <p className="suite-amenities__eyebrow">{suitePage.amenitiesEyebrow}</p>
          <h2 id="suite-amenities-title" className="suite-amenities__title display-serif">
            {suitePage.amenitiesTitle}
          </h2>
        </div>
        <ul className="suite-amenities__list" role="list">
          {suite.features.map((feature, i) => (
            <li key={feature} className="suite-amenities__item">
              <div className="suite-amenities__icon-wrap" aria-hidden>
                <SuiteFeatureIcon
                  id={getSuiteFeatureIcon(suite.slug, i)}
                  className="suite-amenities__icon"
                />
              </div>
              <div className="suite-amenities__body">
                <span className="suite-amenities__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="suite-amenities__name">{feature}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="suite-cta" aria-labelledby="suite-cta-title">
        <div className="suite-cta__wrap">
          <div className="suite-cta__panel" data-suite-reveal>
            <div className="suite-cta__panel-inner">
              <p className="suite-cta__eyebrow">{suitePage.bookingEyebrow}</p>
              <h2 id="suite-cta-title" className="suite-cta__title">
                {suitePage.bookingTitle}
              </h2>
              <p className="suite-cta__text">{suitePage.bookingText}</p>
              <Link className="suite-cta__btn" to="/contatti">
                <span className="suite-cta__btn-label">{suitePage.bookingCta}</span>
                <span className="suite-cta__btn-arrow" aria-hidden>
                  →
                </span>
              </Link>
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
                  <span className="suite-cta__sibling-label">{suitePage.otherSuite}</span>
                  <span className="suite-cta__sibling-title display-serif">{otherSuite.title}</span>
                </span>
                <span className="suite-cta__sibling-arrow" aria-hidden>
                  →
                </span>
              </Link>
            )}
            <Link to="/#suites" className="suite-cta__home">
              {suitePage.allSuites}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
