import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { Preloader } from '../components/Preloader';
import { hero, preloaderText } from '../data/site';

const HomeHeroAnimations = lazy(() => import('../components/HomeHeroAnimations'));
const ResidenceSection = lazy(() =>
  import('../components/sections/ResidenceSection').then((m) => ({ default: m.ResidenceSection })),
);
const SuitesSection = lazy(() =>
  import('../components/sections/SuitesSection').then((m) => ({ default: m.SuitesSection })),
);
const GallerySection = lazy(() =>
  import('../components/sections/GallerySection').then((m) => ({ default: m.GallerySection })),
);
const OffersSection = lazy(() =>
  import('../components/sections/OffersSection').then((m) => ({ default: m.OffersSection })),
);
const ServicesSection = lazy(() =>
  import('../components/sections/ServicesSection').then((m) => ({ default: m.ServicesSection })),
);
const InfoServicesSection = lazy(() =>
  import('../components/sections/InfoServicesSection').then((m) => ({
    default: m.InfoServicesSection,
  })),
);
const ReviewsSection = lazy(() =>
  import('../components/sections/ReviewsSection').then((m) => ({ default: m.ReviewsSection })),
);
const ContactSection = lazy(() =>
  import('../components/sections/ContactSection').then((m) => ({ default: m.ContactSection })),
);

const PRELOADER_DONE_KEY = 'lv-preloader-done';

function readPreloaderDone(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return sessionStorage.getItem(PRELOADER_DONE_KEY) === '1';
  } catch {
    return false;
  }
}

function BelowFoldSections() {
  return (
    <Suspense fallback={null}>
      <ResidenceSection />
      <SuitesSection />
      <GallerySection />
      <OffersSection />
      <ServicesSection />
      <InfoServicesSection />
      <ReviewsSection />
      <ContactSection />
    </Suspense>
  );
}

export function HomePage() {
  const preloaderDone = readPreloaderDone();
  const [showPreloader, setShowPreloader] = useState(!preloaderDone);
  const [ready, setReady] = useState(preloaderDone);
  const [isMuted, setIsMuted] = useState(true);
  const videoSlotRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const introDoneEventSentRef = useRef(false);

  const handlePreloaderComplete = useCallback(() => {
    try {
      sessionStorage.setItem(PRELOADER_DONE_KEY, '1');
    } catch {
      /* ignore */
    }
    setShowPreloader(false);
    requestAnimationFrame(() => {
      setReady(true);
    });
  }, []);

  useEffect(() => {
    if (!ready) return undefined;

    const revealItems = document.querySelectorAll('.oh-reveal > .site-header, .oh-reveal > .hero');
    if (revealItems.length) {
      gsap.to(revealItems, {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.1,
        delay: 0.05,
      });
    }

    const video = videoRef.current;
    if (!video) return undefined;

    let cancelled = false;

    const run = async () => {
      if (cancelled) return;

      video.muted = true;
      try {
        await video.play();
      } catch {
        /* autoplay bloccato */
      }

      if (cancelled || introDoneEventSentRef.current) return;
      introDoneEventSentRef.current = true;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          window.dispatchEvent(new CustomEvent('intro:done'));
        });
      });
    };

    const id = requestAnimationFrame(() => {
      void run();
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(id);
    };
  }, [ready]);

  useEffect(() => {
    if (!ready) return;
    const video = videoRef.current;
    if (!video) return;
    video.muted = isMuted;
  }, [isMuted, ready]);

  const handleToggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <>
      <main>
        <div className={`home-hero-shell${ready ? ' home-hero-shell--ready' : ''}`}>
          <div className="oh-video-bg" ref={videoSlotRef}>
            <video
              ref={videoRef}
              src={hero.video}
              poster={hero.poster}
              className="hero-bg-video"
              autoPlay
              muted={isMuted}
              loop
              playsInline
              preload={preloaderDone ? 'auto' : 'metadata'}
              width={1920}
              height={1080}
              aria-label="Video panoramico della Sardegna — Residence Le Vele Stintino"
            />
          </div>

          <div className="oh-reveal">
            {ready && <Header />}
            {ready && <HeroSection isMuted={isMuted} onToggleMute={handleToggleMute} />}
          </div>

          {showPreloader && (
            <Preloader
              text={preloaderText}
              videoRef={videoRef}
              videoSlotRef={videoSlotRef}
              onComplete={handlePreloaderComplete}
            />
          )}
        </div>

        {ready && (
          <>
            <Suspense fallback={null}>
              <HomeHeroAnimations />
            </Suspense>
            <BelowFoldSections />
          </>
        )}
      </main>
      {ready && <Footer />}
    </>
  );
}
