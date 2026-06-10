import '../styles/pelosa.css';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PelosaGallery } from '../components/PelosaGallery';
import { formatCopy } from '../i18n';
import { usePelosaAnimations } from '../hooks/usePelosaAnimations';
import { useSiteLocale } from '../hooks/useSiteLocale';
import { shouldUsePosterOnlyHero } from '../lib/network';

export function LaPelosaPage() {
  const { content } = useSiteLocale();
  const { pelosa, pelosaMedia, gallery: galleryUi } = content;
  const { hero, intro, gallery, ui } = pelosa;
  const pageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const posterOnlyHero = shouldUsePosterOnlyHero();
  const heroVideoSrc = posterOnlyHero ? undefined : pelosaMedia.video;
  usePelosaAnimations(pageRef);

  const galleryItems = pelosaMedia.gallery.map((item, i) => ({
    ...item,
    alt: gallery.imageAlts[i] ?? '',
  }));

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !heroVideoSrc) return;
    video.muted = isMuted;
    void video.play().catch(() => {});
  }, [isMuted, heroVideoSrc]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !heroVideoSrc) return;
    video.muted = true;
    void video.play().catch(() => {});
  }, [heroVideoSrc]);

  return (
    <div className="pelosa-page" ref={pageRef}>
      <section className="pelosa-hero" aria-labelledby="pelosa-hero-title">
        <div className="pelosa-hero__media">
          <video
            ref={videoRef}
            className="pelosa-hero__video"
            {...(heroVideoSrc ? { src: heroVideoSrc } : {})}
            poster={pelosaMedia.poster}
            loop
            muted
            playsInline
            autoPlay={!!heroVideoSrc}
            preload={heroVideoSrc ? 'metadata' : 'none'}
            aria-label={hero.videoLabel}
          />
        </div>
        <div className="pelosa-hero__overlay" aria-hidden />
        <div className="pelosa-hero__inner">
          <Link to="/" className="pelosa-hero__back">
            {ui.back}
          </Link>
          <div className="pelosa-hero__content" data-pelosa-reveal>
            <p className="pelosa-hero__eyebrow">{hero.eyebrow}</p>
            <h1 id="pelosa-hero-title" className="pelosa-hero__title display-serif">
              {hero.title}
            </h1>
            <p className="pelosa-hero__tagline">{hero.tagline}</p>
            <p className="pelosa-hero__lede">{hero.lede}</p>
          </div>
          <a href="#pelosa-intro" className="pelosa-hero__scroll" aria-label={ui.scrollAria}>
            <span className="pelosa-hero__scroll-line" aria-hidden />
            <span>{ui.scrollLabel}</span>
          </a>
        </div>
        <button
          type="button"
          className={`mute-toggle pelosa-hero__mute ${isMuted ? '' : 'is-on'}`}
          onClick={() => setIsMuted((m) => !m)}
          aria-label={isMuted ? ui.muteOn : ui.muteOff}
          aria-pressed={!isMuted}
        >
          {isMuted ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M11 5 6 9H3v6h3l5 4V5Z" />
              <line x1="22" y1="9" x2="16" y2="15" />
              <line x1="16" y1="9" x2="22" y2="15" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M11 5 6 9H3v6h3l5 4V5Z" />
              <path d="M15.5 8.5a5 5 0 0 1 0 7" />
              <path d="M18.5 5.5a9 9 0 0 1 0 13" />
            </svg>
          )}
        </button>
      </section>

      <section id="pelosa-intro" className="pelosa-intro">
        <div className="pelosa-intro__inner">
          <header className="pelosa-intro__header" data-pelosa-reveal>
            <p className="pelosa-intro__eyebrow">{intro.eyebrow}</p>
            <h2 className="pelosa-intro__title display-serif">{intro.title}</h2>
          </header>
          <div className="pelosa-intro__grid">
            <div className="pelosa-intro__copy" data-pelosa-reveal>
              <p className="pelosa-intro__lead">{intro.lead}</p>
              <p className="pelosa-intro__body">{intro.body}</p>
            </div>
            <aside className="pelosa-intro__aside" data-pelosa-reveal>
              <p className="pelosa-intro__stat">
                <span className="pelosa-intro__stat-value">{intro.statValue}</span>
                <span className="pelosa-intro__stat-label">{intro.statLabel}</span>
              </p>
            </aside>
          </div>
        </div>
      </section>

      <PelosaGallery
        eyebrow={gallery.eyebrow}
        title={gallery.title}
        lead={gallery.lead}
        viewLabel={gallery.viewLabel}
        items={galleryItems}
        openImageLabel={(alt) => formatCopy(ui.openImage, { alt })}
        lightbox={{
          closeLabel: ui.closeLightbox,
          closeGalleryLabel: ui.closeGallery,
          prevLabel: galleryUi.prevLabel,
          nextLabel: galleryUi.nextLabel,
          counterLabel: (current, total) =>
            galleryUi.counterLabel
              .replace('{current}', String(current))
              .replace('{total}', String(total)),
        }}
      />
    </div>
  );
}
