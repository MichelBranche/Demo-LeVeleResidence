import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { Preloader } from '../components/Preloader';
import { useConsent } from '../hooks/useConsent';
import { useHomeLangReveal } from '../hooks/useHomeLangReveal';
import { useNetworkTier } from '../hooks/useNetworkTier';
import { useSiteLocale } from '../hooks/useSiteLocale';
import { revealHeroCopyStatic } from '../lib/homeIntroEntrance';
import { isHeroCopyDone, resetIntroState } from '../lib/intro';
import {
  shouldAutoplayHeroVideoImmediately,
  shouldDeferHeroVideoLoad,
  shouldRunVideoPreloader,
  shouldUsePosterOnlyHero,
} from '../lib/network';

gsap.registerPlugin(ScrollTrigger);

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

function wantsReplayIntro(): boolean {
  if (typeof window === 'undefined') return false;
  return new URLSearchParams(window.location.search).has('replay-intro');
}

function readPreloaderDone(): boolean {
  if (typeof window === 'undefined') return false;
  if (wantsReplayIntro()) return false;
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
      <ReviewsSection />
      <InfoServicesSection />
      <ContactSection />
    </Suspense>
  );
}

export function HomePage() {
  const { content } = useSiteLocale();
  const { hero, heroMedia, preloaderText } = content;
  const { isReady, bannerOpen, hasConsent } = useConsent();
  const networkTier = useNetworkTier();
  const [introPhase, setIntroPhase] = useState<IntroPhase>(() =>
    readPreloaderDone() ? 'complete' : 'pending-consent',
  );
  const [heroVideoSrc, setHeroVideoSrc] = useState<string | undefined>(() =>
    shouldAutoplayHeroVideoImmediately() ? heroMedia.video : undefined,
  );
  const videoSlotRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const skippedPreloaderOnMount = useRef(readPreloaderDone());
  const preloaderOrchestratedRef = useRef(false);

  const lightPreloader = !shouldRunVideoPreloader();
  const posterOnlyHero = shouldUsePosterOnlyHero();
  const showPreloader = introPhase === 'preloader';
  const ready = introPhase === 'complete';
  const heroMounted = isReady;
  const [preloaderReady, setPreloaderReady] = useState(false);
  const [shellReady, setShellReady] = useState(
    () => readPreloaderDone() || !shouldRunVideoPreloader(),
  );

  useHomeLangReveal(ready);

  useLayoutEffect(() => {
    document.getElementById('initial-hero-poster')?.remove();
  }, []);

  useLayoutEffect(() => {
    if (!wantsReplayIntro()) return;
    try {
      sessionStorage.removeItem(PRELOADER_DONE_KEY);
    } catch {
      /* ignore */
    }
    resetIntroState();
  }, []);

  if (showPreloader) {
    preloaderOrchestratedRef.current = true;
  }

  const headerAnimateEntrance =
    !skippedPreloaderOnMount.current && !preloaderOrchestratedRef.current;

  useEffect(() => {
    if (!isReady) return;

    const frame = requestAnimationFrame(() => {
      if (readPreloaderDone()) {
        setIntroPhase('complete');
        setShellReady(true);
        requestAnimationFrame(() => {
          if (!isHeroCopyDone()) revealHeroCopyStatic();
        });
        return;
      }

      if (!hasConsent) {
        setIntroPhase('pending-consent');
        return;
      }

      if (bannerOpen) {
        return;
      }

      if (networkTier !== 'fast') {
        try {
          sessionStorage.setItem(PRELOADER_DONE_KEY, '1');
        } catch {
          /* ignore */
        }
        setIntroPhase('complete');
        setShellReady(true);
        requestAnimationFrame(() => {
          revealHeroCopyStatic();
        });
        return;
      }

      setIntroPhase('preloader');
    });

    return () => cancelAnimationFrame(frame);
  }, [isReady, bannerOpen, hasConsent, networkTier]);

  useLayoutEffect(() => {
    if (!showPreloader) {
      setPreloaderReady(false);
      return undefined;
    }

    let cancelled = false;
    let rafId = 0;

    const prime = () => {
      if (cancelled) return;

      const video = videoRef.current;
      const slot = videoSlotRef.current;
      if (!video || !slot) {
        rafId = requestAnimationFrame(prime);
        return;
      }

      if (!lightPreloader) {
        if (!video.currentSrc && !video.src) {
          video.src = heroMedia.video;
        }
        video.preload = 'auto';
        if (!heroVideoSrc) {
          setHeroVideoSrc(heroMedia.video);
        }
        void video.load();
      }

      setPreloaderReady(true);
    };

    prime();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
    };
  }, [showPreloader, lightPreloader, heroMedia.video, heroVideoSrc]);

  const handlePreloaderComplete = useCallback(() => {
    try {
      sessionStorage.setItem(PRELOADER_DONE_KEY, '1');
    } catch {
      /* ignore */
    }
    setIntroPhase('complete');
  }, []);

  useEffect(() => {
    if (!ready) return undefined;

    const refresh = () => ScrollTrigger.refresh();
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(refresh);
    });

    return () => cancelAnimationFrame(id);
  }, [ready]);

  useEffect(() => {
    if (!ready) return;
    const refresh = () => ScrollTrigger.refresh();
    const t = window.setTimeout(refresh, 600);
    return () => window.clearTimeout(t);
  }, [ready]);

  useEffect(() => {
    if (!ready || heroVideoSrc || posterOnlyHero) return;
    if (!shouldDeferHeroVideoLoad()) return;

    const enable = () => setHeroVideoSrc(heroMedia.video);
    if (typeof requestIdleCallback === 'function') {
      const id = requestIdleCallback(enable, { timeout: 5000 });
      return () => cancelIdleCallback(id);
    }
    const id = window.setTimeout(enable, 4500);
    return () => window.clearTimeout(id);
  }, [ready, heroVideoSrc, posterOnlyHero, heroMedia.video]);

  const shellClass = [
    'home-hero-shell',
    shellReady ? 'home-hero-shell--ready' : '',
    showPreloader ? 'home-hero-shell--intro' : '',
    introPhase === 'pending-consent' ? 'home-hero-shell--awaiting-consent' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <main id="main-content" className="home-page">
        {heroMounted && (
          <div className="home-page__sticky-header">
            <Header animateEntrance={headerAnimateEntrance} />
          </div>
        )}
        <div className={shellClass}>
          <div className="oh-video-bg" ref={videoSlotRef}>
            <video
              ref={videoRef}
              {...(heroVideoSrc ? { src: heroVideoSrc } : {})}
              poster={heroMedia.poster}
              className="hero-bg-video"
              autoPlay={ready && !!heroVideoSrc}
              muted
              loop
              playsInline
              preload={
                heroVideoSrc
                  ? showPreloader && !lightPreloader
                    ? 'auto'
                    : ready
                      ? 'metadata'
                      : 'none'
                  : 'none'
              }
              width={1920}
              height={1080}
              aria-label={hero.videoAria}
            />
          </div>

          <div className="oh-reveal">
            {heroMounted && <HeroSection />}
          </div>

          {showPreloader &&
            preloaderReady &&
            typeof document !== 'undefined' &&
            createPortal(
              <Preloader
                text={preloaderText}
                videoRef={videoRef}
                videoSlotRef={videoSlotRef}
                onComplete={handlePreloaderComplete}
                onShellReady={() => setShellReady(true)}
                animateHeader
                lightMode={lightPreloader}
                posterSrc={heroMedia.poster}
              />,
              document.body,
            )}
        </div>

        {heroMounted && (
          <Suspense fallback={null}>
            <HomeHeroAnimations orchestrated={showPreloader} />
          </Suspense>
        )}

        {ready && <BelowFoldSections />}
      </main>
      {ready && <Footer />}
    </>
  );
}
