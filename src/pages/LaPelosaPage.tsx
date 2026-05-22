import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PelosaLightbox } from '../components/PelosaLightbox';
import { pelosaPage } from '../data/site';
import { usePelosaAnimations } from '../hooks/usePelosaAnimations';
import { shouldUsePosterOnlyHero } from '../lib/network';

export function LaPelosaPage() {
  const pageRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const posterOnlyHero = shouldUsePosterOnlyHero();
  const heroVideoSrc = posterOnlyHero ? undefined : pelosaPage.hero.video;
  usePelosaAnimations(pageRef);

  const { hero, intro, gallery } = pelosaPage;

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
    <main className="pelosa-page" ref={pageRef}>
      <section className="pelosa-hero" aria-labelledby="pelosa-hero-title">
        <div className="pelosa-hero__media">
          <video
            ref={videoRef}
            className="pelosa-hero__video"
            {...(heroVideoSrc ? { src: heroVideoSrc } : {})}
            poster={hero.poster}
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
            ← Residence Le Vele
          </Link>
          <div className="pelosa-hero__content" data-pelosa-reveal>
            <p className="pelosa-hero__eyebrow">{hero.eyebrow}</p>
            <h1 id="pelosa-hero-title" className="pelosa-hero__title display-serif">
              {hero.title}
            </h1>
            <p className="pelosa-hero__tagline">{hero.tagline}</p>
            <p className="pelosa-hero__lede">{hero.lede}</p>
          </div>
          <a href="#pelosa-intro" className="pelosa-hero__scroll" aria-label="Scorri verso il contenuto">
            <span className="pelosa-hero__scroll-line" aria-hidden />
            <span>Scorri</span>
          </a>
        </div>
        <button
          type="button"
          className={`mute-toggle pelosa-hero__mute ${isMuted ? '' : 'is-on'}`}
          onClick={() => setIsMuted((m) => !m)}
          aria-label={isMuted ? 'Attiva audio' : 'Disattiva audio'}
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

      <section className="pelosa-gallery" aria-labelledby="pelosa-gallery-title">
        <div className="pelosa-gallery__inner">
          <h2 id="pelosa-gallery-title" className="pelosa-gallery__title display-serif" data-pelosa-reveal>
            {gallery.title}
          </h2>
          <div className="pelosa-gallery__grid">
            {gallery.items.map((item) => (
              <button
                key={item.src}
                type="button"
                className={`pelosa-gallery__item pelosa-gallery__item--${item.layout}`}
                onClick={() => setLightbox({ src: item.src, alt: item.alt })}
                aria-label={`Apri immagine: ${item.alt}`}
              >
                <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
                <span className="pelosa-gallery__zoom" aria-hidden>
                  +
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <PelosaLightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />
      )}
    </main>
  );
}
