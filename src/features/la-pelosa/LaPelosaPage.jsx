import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MenuOverlay } from '../landing/components/MenuOverlay';
import { Header } from '../landing/components/Header';
import { BookingBar } from '../landing/components/BookingBar';
import { FooterMap } from '../landing/components/FooterMap';
import { LaPelosaHero } from './components/LaPelosaHero';
import { PelosaLightbox } from './components/PelosaLightbox';
import { usePageTransition } from '../../components/PageTransition';
import { getLenisScrollToOptions, useLenisSmoothScroll } from '../../hooks/useLenisSmoothScroll';
import '../landing/landing.css';
import './la-pelosa.css';

gsap.registerPlugin(ScrollTrigger);

export function LaPelosaPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [bookingVisible, setBookingVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [lightboxItem, setLightboxItem] = useState(null);
  const videoRef = useRef(null);
  const hasManualScrollRef = useRef(false);
  const lenisRef = useLenisSmoothScroll();
  const { transitionTo } = usePageTransition();

  const openLightbox = (event, src, alt) => {
    const element = event.currentTarget.querySelector('img') ?? event.currentTarget;
    setLightboxItem({ src, alt, element });
  };

  const goHome = (target) => (event) => {
    event.preventDefault();
    transitionTo(target);
  };

  const handleMenuNavigate = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(el, getLenisScrollToOptions());
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = '';
    document.body.style.backgroundColor = '';
    document.body.style.color = '';
  }, []);

  /* Ancore #... (es. cue hero → #pelosa-intro) con lo stesso scroll morbido Lenis. */
  useEffect(() => {
    const lenis = lenisRef.current;
    const main = document.querySelector('.pelosa-page');
    if (!lenis || !main) return undefined;

    const onClick = (event) => {
      const link = event.target.closest('a[href^="#"]');
      if (!link || !main.contains(link)) return;
      const hash = link.getAttribute('href');
      if (!hash || hash.length < 2) return;
      const id = hash.slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, getLenisScrollToOptions());
    };

    main.addEventListener('click', onClick);
    return () => main.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    gsap.set('body', { backgroundColor: '#1a1512', color: '#FAF8F5' });
    const triggers = [];
    document.querySelectorAll('[data-bg]').forEach((section) => {
      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () =>
          gsap.to('body', {
            backgroundColor: section.dataset.bg,
            color: section.dataset.text,
            duration: 0.8,
          }),
        onEnterBack: () =>
          gsap.to('body', {
            backgroundColor: section.dataset.bg,
            color: section.dataset.text,
            duration: 0.8,
          }),
      });
      triggers.push(st);
    });
    ScrollTrigger.refresh();
    return () => {
      triggers.forEach((t) => t.kill());
      gsap.set('body', { backgroundColor: '#faf8f5', color: '#3a312b' });
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const id = requestAnimationFrame(() => {
      void (async () => {
        const video = videoRef.current;
        if (!video || cancelled) return;
        try {
          video.currentTime = 0;
        } catch {
          /* ignore */
        }
        video.muted = false;
        try {
          await video.play();
          if (!cancelled) setIsMuted(false);
        } catch {
          video.muted = true;
          if (!cancelled) setIsMuted(true);
          try {
            await video.play();
          } catch {
            /* autoplay bloccato */
          }
        }
      })();
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(id);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    const syncPlaybackWithHeroVisibility = async () => {
      if (!video) return;
      const hero = document.getElementById('pelosa-hero');
      if (!hero) return;

      const rect = hero.getBoundingClientRect();
      const visibleHeight = Math.min(window.innerHeight, rect.bottom) - Math.max(0, rect.top);
      const visibleRatio = Math.max(0, visibleHeight) / Math.max(rect.height, 1);
      const isHeroVisible = visibleRatio >= 0.55;

      if (!hasManualScrollRef.current) return;

      if (!isHeroVisible) {
        if (!video.paused) video.pause();
        return;
      }

      if (video.paused) {
        video.muted = isMuted;
        try {
          await video.play();
        } catch {
          video.muted = true;
          setIsMuted(true);
        }
      }
    };

    const onManualScrollIntent = () => {
      hasManualScrollRef.current = true;
      void syncPlaybackWithHeroVisibility();
    };

    const onKeyDown = (event) => {
      const scrollKeys = ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '];
      if (scrollKeys.includes(event.key)) onManualScrollIntent();
    };

    window.addEventListener('wheel', onManualScrollIntent, { passive: true });
    window.addEventListener('touchmove', onManualScrollIntent, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('scroll', syncPlaybackWithHeroVisibility, { passive: true });

    return () => {
      window.removeEventListener('wheel', onManualScrollIntent);
      window.removeEventListener('touchmove', onManualScrollIntent);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('scroll', syncPlaybackWithHeroVisibility);
    };
  }, [isMuted]);

  useEffect(() => {
    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.6;
      const footer = document.getElementById('site-footer');
      if (!footer) {
        setBookingVisible(pastHero);
        return;
      }
      const { top } = footer.getBoundingClientRect();
      const footerEntering = top < window.innerHeight - 56;
      setBookingVisible(pastHero && !footerEntering);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const handleToggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <>
      <Header onMenuOpen={() => setIsMenuOpen(true)} />
      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        activeMenuKey="pelosa"
        onNavigate={handleMenuNavigate}
      />
      <BookingBar visible={bookingVisible} />
      <main className="pelosa-page">
        <LaPelosaHero videoRef={videoRef} isMuted={isMuted} onToggleMute={handleToggleMute} />

        <section id="pelosa-intro" className="pelosa-section pelosa-intro-block" data-bg="#FAF8F5" data-text="#3A312B">
          <div className="container pelosa-section-inner">
            <div className="pelosa-intro-heading">
              <span className="pelosa-intro-rule" aria-hidden="true" />
              <p className="eyebrow">La spiaggia</p>
            </div>
            <h2 className="pelosa-section-title">Famoso in tutto il mondo</h2>
            <p className="pelosa-lead">
              La Pelosa si affaccia sulla punta nord-occidentale della Sardegna: un arco di sabbia fine bagnato da un mare
              che dal turchese sfuma nel blu intenso. In lontananza, l&apos;isolotto della Torre della Pelosa è il simbolo
              iconico di Stintino.
            </p>
            <p className="pelosa-body">
              D&apos;estate l&apos;accesso è regolamentato per preservare l&apos;ambiente: consigliamo di prenotare in anticipo e di
              arrivare con calma, soprattutto in alta stagione. Dal Residence Le Vele raggiungerete la spiaggia in pochi
              minuti in auto o con i servizi locali.
            </p>
          </div>
        </section>

        <section className="pelosa-section pelosa-gallery-block" data-bg="#FAF8F5" data-text="#3A312B">
          <div className="container">
            <h2 className="pelosa-gallery-title">Colori del Nord Sardegna</h2>
            <div className="pelosa-gallery-grid">
              {[
                {
                  src: '/la-pelosa/la-pelosa-drone.png',
                  alt: 'Vista aerea della spiaggia La Pelosa, mare turchese e Torre della Pelosa',
                  wide: true,
                },
                {
                  src: '/la-pelosa/la-pelosa-aerial-road.png',
                  alt: "La Pelosa dall'alto: strada costiera, ombrelloni e torre sulla costa",
                  wide: false,
                },
                {
                  src: '/la-pelosa/la-pelosa-lagoon.png',
                  alt: 'Laguna e sabbia bianca a La Pelosa con mare cristallino',
                  wide: false,
                },
                {
                  src: '/la-pelosa/la-pelosa-water-level.png',
                  alt: "Mare turchese in primo piano con Torre della Pelosa all'orizzonte",
                  wide: true,
                },
              ].map((img) => (
                <button
                  type="button"
                  key={img.src}
                  className={`pelosa-gallery-item pelosa-gallery-trigger${img.wide ? ' pelosa-gallery-item--wide' : ''}`}
                  onClick={(event) => openLightbox(event, img.src, img.alt)}
                  aria-label={`Apri immagine: ${img.alt}`}
                >
                  <img src={img.src} alt={img.alt} loading="lazy" decoding="async" />
                  <span className="pelosa-gallery-zoom" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="7" />
                      <line x1="21" y1="21" x2="16.5" y2="16.5" />
                      <line x1="11" y1="8" x2="11" y2="14" />
                      <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="pelosa-section pelosa-cta-block" data-bg="#3A312B" data-text="#FAF8F5">
          <div className="container pelosa-cta-inner">
            <span className="pelosa-cta-rule" aria-hidden="true" />
            <p className="eyebrow pelosa-cta-eyebrow">Prenota</p>
            <h2 className="pelosa-cta-title">Il tuo soggiorno al Le Vele</h2>
            <p className="pelosa-cta-text">
              Torna alla home per scoprire le suite, i servizi e le recensioni degli ospiti, oppure contattaci per
              disponibilità e informazioni.
            </p>
            <div className="pelosa-cta-actions">
              <a href="/" onClick={goHome('/')} className="pelosa-cta-btn pelosa-cta-btn--primary">
                Torna al Residence
              </a>
              <a href="/#contatti" onClick={goHome('/#contatti')} className="pelosa-cta-btn pelosa-cta-btn--ghost">
                Contatti
              </a>
            </div>
          </div>
        </section>
      </main>
      <FooterMap />
      <PelosaLightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
    </>
  );
}
