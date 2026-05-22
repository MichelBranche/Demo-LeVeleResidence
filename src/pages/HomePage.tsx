import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { Preloader } from '../components/Preloader';
import { useConsent } from '../hooks/useConsent';
import { useNetworkTier } from '../hooks/useNetworkTier';
import { hero, preloaderText } from '../data/site';
import {
  shouldAutoplayHeroVideoImmediately,
  shouldDeferHeroVideoLoad,
  shouldRunVideoPreloader,
  shouldUsePosterOnlyHero,
} from '../lib/network';

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

type IntroPhase = 'pending-consent' | 'preloader' | 'complete';

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
      <InfoServicesSection />
      <ReviewsSection />
      <ContactSection />
    </Suspense>
  );
}

export function HomePage() {
  const { isReady, bannerOpen, hasConsent } = useConsent();
  const networkTier = useNetworkTier();
  const [introPhase, setIntroPhase] = useState<IntroPhase>(() =>
    readPreloaderDone() ? 'complete' : 'pending-consent',
  );
  const [heroVideoSrc, setHeroVideoSrc] = useState<string | undefined>(() =>
    shouldAutoplayHeroVideoImmediately() ? hero.video : undefined,
  );
  const videoSlotRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const introDoneEventSentRef = useRef(false);

  const lightPreloader = !shouldRunVideoPreloader();
  const posterOnlyHero = shouldUsePosterOnlyHero();
  const showPreloader = introPhase === 'preloader';
  const ready = introPhase === 'complete';

  useEffect(() => {
    if (!isReady) return;

    if (readPreloaderDone()) {
      setIntroPhase('complete');
      return;
    }

    if (!hasConsent) {
      setIntroPhase('pending-consent');
      return;
    }

    if (bannerOpen) {
      return;
    }

    if (networkTier === 'minimal') {
      try {
        sessionStorage.setItem(PRELOADER_DONE_KEY, '1');
      } catch {
        /* ignore */
      }
      setIntroPhase('complete');
      return;
    }

    setIntroPhase('preloader');
  }, [isReady, bannerOpen, hasConsent, networkTier]);

  useEffect(() => {
    if (introPhase !== 'preloader' || lightPreloader) return;
    const video = videoRef.current;
    if (!video) return;
    if (!video.currentSrc) {
      video.src = hero.video;
    }
    video.preload = 'metadata';
  }, [introPhase, lightPreloader]);

  const handlePreloaderComplete = useCallback(() => {
    document.body.classList.remove('oh-preloader-active');
    try {
      sessionStorage.setItem(PRELOADER_DONE_KEY, '1');
    } catch {
      /* ignore */
    }
    setIntroPhase('complete');
  }, []);

  useEffect(() => {
    if (!ready) return undefined;

    const revealItems = document.querySelectorAll('.oh-reveal > .hero');
    if (revealItems.length) {
      gsap.to(revealItems, {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.1,
        delay: 0.05,
        onComplete: () => {
          gsap.set(revealItems, { clearProps: 'opacity,transform' });
        },
      });
    }

    const video = videoRef.current;
    if (!video) return undefined;

    let cancelled = false;

    const dispatchIntroDone = () => {
      if (cancelled || introDoneEventSentRef.current) return;
      introDoneEventSentRef.current = true;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          window.dispatchEvent(new CustomEvent('intro:done'));
        });
      });
    };

    const run = async () => {
      if (cancelled) return;

      video.muted = true;
      if (heroVideoSrc) {
        try {
          await video.play();
        } catch {
          /* autoplay bloccato */
        }
      }

      dispatchIntroDone();
    };

    const id = requestAnimationFrame(() => {
      void run();
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(id);
    };
  }, [ready, heroVideoSrc]);

  useEffect(() => {
    if (!ready || heroVideoSrc || posterOnlyHero) return;
    if (!shouldDeferHeroVideoLoad()) return;

    const enable = () => setHeroVideoSrc(hero.video);
    if (typeof requestIdleCallback === 'function') {
      const id = requestIdleCallback(enable, { timeout: 5000 });
      return () => cancelIdleCallback(id);
    }
    const id = window.setTimeout(enable, 2500);
    return () => window.clearTimeout(id);
  }, [ready, heroVideoSrc, posterOnlyHero]);

  const shellClass = [
    'home-hero-shell',
    ready ? 'home-hero-shell--ready' : '',
    introPhase === 'pending-consent' ? 'home-hero-shell--awaiting-consent' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <main className="home-page">
        {ready && (
          <div className="home-page__sticky-header">
            <Header />
          </div>
        )}
        <div className={shellClass}>
          <div className="oh-video-bg" ref={videoSlotRef}>
            <video
              ref={videoRef}
              {...(heroVideoSrc ? { src: heroVideoSrc } : {})}
              poster={hero.poster}
              className="hero-bg-video"
              autoPlay={ready && !!heroVideoSrc}
              muted
              loop
              playsInline
              preload={
                heroVideoSrc
                  ? showPreloader && !lightPreloader
                    ? 'metadata'
                    : ready
                      ? 'metadata'
                      : 'none'
                  : 'none'
              }
              width={1920}
              height={1080}
              aria-label="Video panoramico della Sardegna — Residence Le Vele Stintino"
            />
          </div>

          <div className="oh-reveal">
            {ready && <HeroSection />}
          </div>

          {showPreloader && (
            <Preloader
              text={preloaderText}
              videoRef={videoRef}
              videoSlotRef={videoSlotRef}
              onComplete={handlePreloaderComplete}
              lightMode={lightPreloader}
              posterSrc={hero.poster}
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
