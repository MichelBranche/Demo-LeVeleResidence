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
import { getSuiteFeatureIcon, SUITE_FEATURE_PREVIEW_INDICES } from '../lib/suiteFeatureIcons';

const MOSAIC_COUNT = 4;

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
  const mosaicImages = suite.gallery.slice(0, MOSAIC_COUNT);
  while (mosaicImages.length < MOSAIC_COUNT) {
    mosaicImages.push({
      src: suite.image,
      alt: `${suite.title}${suitePage.heroAltSuffix}`,
      layout: 'wide' as const,
    });
  }
  const previewFeatures = SUITE_FEATURE_PREVIEW_INDICES.flatMap((iconIndex) => {
    const label = suite.features[iconIndex];
    return label ? [{ label, iconIndex }] : [];
  });
  const locationLine = `${suitePage.locationValue}, ${suitePage.locationLabel}`;

  return (
    <div
      key={slug}
      className={`suite-page suite-page--${suite.theme}`}
      ref={pageRef}
      aria-labelledby="suite-title"
    >
      <div className="suite-page__inner">
        <Link to="/#suites" className="suite-back">
          {suitePage.backLink}
        </Link>

        <section
          className="suite-mosaic"
          aria-label={suitePage.galleryAria.replace('{title}', suite.title)}
          data-suite-reveal
        >
          <a href="#suite-gallery" className="suite-mosaic__lead">
            <img
              src={mosaicImages[0].src}
              alt={mosaicImages[0].alt}
              width={900}
              height={1200}
              fetchPriority="high"
              decoding="async"
            />
          </a>
          <div className="suite-mosaic__side">
            <a href="#suite-gallery" className="suite-mosaic__wide">
              <img
                src={mosaicImages[1].src}
                alt={mosaicImages[1].alt}
                width={1200}
                height={800}
                loading="lazy"
                decoding="async"
              />
            </a>
            <div className="suite-mosaic__pair">
              <a href="#suite-gallery" className="suite-mosaic__tile">
                <img
                  src={mosaicImages[2].src}
                  alt={mosaicImages[2].alt}
                  width={800}
                  height={600}
                  loading="lazy"
                  decoding="async"
                />
              </a>
              <a href="#suite-gallery" className="suite-mosaic__tile suite-mosaic__tile--more">
                <img
                  src={mosaicImages[3].src}
                  alt={mosaicImages[3].alt}
                  width={800}
                  height={600}
                  loading="lazy"
                  decoding="async"
                />
                {suite.gallery.length > MOSAIC_COUNT ? (
                  <span className="suite-mosaic__more">{suitePage.viewAllPhotos}</span>
                ) : null}
              </a>
            </div>
          </div>
        </section>

        <header className="suite-header" data-suite-reveal-stagger>
          <p className="suite-header__eyebrow">
            <span>{suite.listLabel}</span>
            <span aria-hidden>·</span>
            <span>{locationLine}</span>
          </p>
          <h1 id="suite-title" className="suite-header__title display-serif">
            {suite.title}
          </h1>
          <p className="suite-header__tagline">{suite.tagline}</p>
          <ul className="suite-header__specs" aria-label={suitePage.specsAria}>
            <li>
              <span className="suite-header__spec-value">{suitePage.guests}</span>
              <span className="suite-header__spec-label">{suitePage.guestsLabel}</span>
            </li>
            <li>
              <span className="suite-header__spec-value">{suitePage.typeValue}</span>
              <span className="suite-header__spec-label">{suitePage.typeLabel}</span>
            </li>
            <li>
              <span className="suite-header__spec-value">{suitePage.locationValue}</span>
              <span className="suite-header__spec-label">{suitePage.locationLabel}</span>
            </li>
          </ul>
        </header>

        <section className="suite-features" aria-label={suite.kicker} data-suite-reveal>
          <ul className="suite-features__list" role="list">
            {previewFeatures.map(({ label, iconIndex }) => (
              <li key={label} className="suite-features__item">
                <span className="suite-features__icon" aria-hidden>
                  <SuiteFeatureIcon
                    id={getSuiteFeatureIcon(suite.slug, iconIndex)}
                    className="suite-features__icon-svg"
                  />
                </span>
                <span className="suite-features__label">{label}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="suite-overview" aria-labelledby="suite-overview-title">
          <div className="suite-overview__copy" data-suite-reveal>
            <p id="suite-overview-title" className="suite-overview__eyebrow">
              {suitePage.experience}
            </p>
            <p className="suite-overview__lead">{suite.description}</p>
            <p className="suite-overview__note">{suitePage.storyNote}</p>
          </div>
          <aside className="suite-overview__aside" data-suite-reveal>
            <p className="suite-overview__booking-eyebrow">{suitePage.bookingEyebrow}</p>
            <h2 className="suite-overview__booking-title">{suitePage.bookingTitle}</h2>
            <p className="suite-overview__booking-text">{suitePage.bookingText}</p>
            <div className="suite-overview__actions">
              <Link className="suite-cta__btn" to="/prenota">
                <span className="suite-cta__btn-label">{suitePage.bookingBookCta}</span>
                <span className="suite-cta__btn-arrow" aria-hidden>
                  →
                </span>
              </Link>
              <Link className="suite-cta__btn suite-cta__btn--ghost" to="/contatti">
                <span className="suite-cta__btn-label">{suitePage.bookingCta}</span>
              </Link>
            </div>
          </aside>
        </section>
      </div>

      <section
        ref={galleryRef}
        id="suite-gallery"
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

      <section className="suite-cta" aria-labelledby="suite-cta-nav-title">
        <div className="suite-cta__wrap">
          <h2 id="suite-cta-nav-title" className="sr-only">
            {suitePage.otherSuite}
          </h2>
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
