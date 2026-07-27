import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { Preloader } from '../components/Preloader';
import { DirectBookingPopup } from '../components/DirectBookingPopup';
import { useConsent } from '../hooks/useConsent';
import { useHomeLangReveal } from '../hooks/useHomeLangReveal';
import { useNetworkTier } from '../hooks/useNetworkTier';
import { useSiteLocale } from '../hooks/useSiteLocale';
import { revealHeroCopyStatic } from '../lib/homeIntroEntrance';
import { isHeroCopyDone, onHeroCopyDone, resetIntroState } from '../lib/intro';
import {
  scheduleScrollTriggerRefresh,
  scheduleScrollTriggerRefreshAfterLayout,
} from '../lib/scrollTriggerRefresh';
import { useHeroVideoSource } from '../hooks/useHeroVideoSource';
import {
  shouldRunVideoPreloader,
  shouldRunIntroPreloader,
  shouldUsePosterOnlyHero,
  shouldDeferHeroVideoLoad,
} from '../lib/network';

gsap.registerPlugin(ScrollTrigger);

const HomeHeroAnimations = lazy(() => import('../components/HomeHeroAnimations'));
const ResidenceSection = lazy(() =>
  import('../components/sections/ResidenceSection').then((m) => ({ default: m.ResidenceSection })),
);
const SuitesSection = lazy(() =>
  import('../components/sections/SuitesSection').then((m) => ({ default: m.SuitesSection })),
);
const ResidenceServicesSection = lazy(() =>
  import('../components/sections/ResidenceServicesSection').then((m) => ({
    default: m.ResidenceServicesSection,
  })),
);
const ResidenceShowcaseSection = lazy(() =>
  import('../components/sections/ResidenceShowcaseSection').then((m) => ({
    default: m.ResidenceShowcaseSection,
  })),
);
const OffersSection = lazy(() =>
  import('../components/sections/OffersSection').then((m) => ({ default: m.OffersSection })),
);
const ReviewsSection = lazy(() =>
  import('../components/sections/ReviewsSection').then((m) => ({ default: m.ReviewsSection })),
);

const PRELOADER_DONE_KEY = 'lv-preloader-done';
const DIRECT_BOOKING_POPUP_KEY = 'lv-direct-booking-popup-shown';
const DIRECT_BOOKING_POPUP_DELAY_MS = 850;
const RESIDENCE_LEAD_SELECTOR = '#residence .residence__lead';

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
      <ResidenceServicesSection />
      <ResidenceShowcaseSection />
      <OffersSection />
      <ReviewsSection />
    </Suspense>
  );
}

export function HomePage() {
  const { content } = useSiteLocale();
  const { hero, heroMedia, preloaderText, directBookingPopup } = content;
  const { isReady } = useConsent();
  const networkTier = useNetworkTier();
  const [introPhase, setIntroPhase] = useState<IntroPhase>(() =>
    readPreloaderDone() ? 'complete' : 'pending-consent',
  );
  const [heroVideoSrc, setHeroVideoSrc] = useState<string | undefined>(() =>
    shouldUsePosterOnlyHero() || shouldDeferHeroVideoLoad() ? undefined : heroMedia.video,
  );
  const videoSlotRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const skippedPreloaderOnMount = useRef(readPreloaderDone());
  const preloaderOrchestratedRef = useRef(false);

  const lightPreloader = !shouldRunVideoPreloader();
  const posterOnlyHero = shouldUsePosterOnlyHero();
  const showPreloader = introPhase === 'preloader';
  const ready = introPhase === 'complete';
  useHeroVideoSource(videoRef, heroVideoSrc, ready && !posterOnlyHero);
  const heroMounted = isReady;
  /* Hero copy solo a intro completa, o in DOM durante preloader (nascosta via CSS fino all'handoff). */
  const showHeroCopy = ready || showPreloader;
  const [preloaderReady, setPreloaderReady] = useState(false);
  const [shellReady, setShellReady] = useState(
    () => readPreloaderDone() || !shouldRunVideoPreloader(),
  );
  const [directBookingPopupMounted, setDirectBookingPopupMounted] = useState(false);
  const [directBookingPopupOpen, setDirectBookingPopupOpen] = useState(false);

  useHomeLangReveal(ready);

  /* Mux/HLS solo dopo l'intro: se parte mentre il video è deferred, play() non riparte da solo. */
  useEffect(() => {
    if (posterOnlyHero || !ready) return undefined;
    if (heroVideoSrc) return undefined;

    let cancelled = false;
    const start = () => {
      if (cancelled) return;
      setHeroVideoSrc(heroMedia.video);
    };

    const win = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (typeof win.requestIdleCallback === 'function') {
      const idleId = win.requestIdleCallback(start, { timeout: 900 });
      return () => {
        cancelled = true;
        win.cancelIdleCallback?.(idleId);
      };
    }

    const timeoutId = window.setTimeout(start, 120);
    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [posterOnlyHero, ready, heroVideoSrc, heroMedia.video]);

  /* Se il src era già pronto, assicurati il play quando il video diventa visibile. */
  useEffect(() => {
    if (!ready || !heroVideoSrc || posterOnlyHero) return undefined;
    const video = videoRef.current;
    if (!video) return undefined;

    const kick = () => {
      void video.play()
        .then(() => {
          video.classList.add('is-playing');
        })
        .catch(() => {});
    };

    kick();
    video.addEventListener('canplay', kick, { once: true });
    return () => video.removeEventListener('canplay', kick);
  }, [ready, heroVideoSrc, posterOnlyHero]);

  useLayoutEffect(() => {
    const removePoster = () => document.getElementById('initial-hero-poster')?.remove();
    if (isHeroCopyDone()) {
      removePoster();
      return undefined;
    }
    return onHeroCopyDone(removePoster);
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

  useLayoutEffect(() => {
    if (!isReady) return;

    if (readPreloaderDone()) {
      setIntroPhase('complete');
      setShellReady(true);
      requestAnimationFrame(() => {
        if (!isHeroCopyDone()) revealHeroCopyStatic();
      });
      return;
    }

    if (!shouldRunIntroPreloader()) {
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

    setShellReady(false);
    setIntroPhase('preloader');
  }, [isReady, networkTier]);

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

      /* Light intro: basta lo slot — non attendere <video> (evita frame neri). */
      if (!slot || (!lightPreloader && !video)) {
        rafId = requestAnimationFrame(prime);
        return;
      }

      if (!lightPreloader && video) {
        video.preload = 'auto';
        if (!heroVideoSrc) {
          setHeroVideoSrc(heroMedia.video);
        }
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

    const id = requestAnimationFrame(() => {
      scheduleScrollTriggerRefreshAfterLayout();
    });

    return () => cancelAnimationFrame(id);
  }, [ready]);

  useEffect(() => {
    if (!ready) return;
    scheduleScrollTriggerRefresh(600);
  }, [ready]);

  useEffect(() => {
    if (!ready) return undefined;

    let alreadyShown = false;
    try {
      alreadyShown = sessionStorage.getItem(DIRECT_BOOKING_POPUP_KEY) === '1';
    } catch {
      alreadyShown = false;
    }

    if (alreadyShown) return undefined;

    let timeoutId = 0;
    let rafId = 0;
    let observer: IntersectionObserver | null = null;

    const openWithDelay = () => {
      if (timeoutId !== 0) return;
      timeoutId = window.setTimeout(() => {
        setDirectBookingPopupMounted(true);
        setDirectBookingPopupOpen(true);
      }, DIRECT_BOOKING_POPUP_DELAY_MS);
    };

    const startObserver = (leadEl: Element) => {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry?.isIntersecting) return;
          observer?.disconnect();
          observer = null;
          openWithDelay();
        },
        {
          root: null,
          threshold: 0.35,
        },
      );

      observer.observe(leadEl);
    };

    const waitForLead = () => {
      const leadEl = document.querySelector(RESIDENCE_LEAD_SELECTOR);
      if (!leadEl) {
        rafId = requestAnimationFrame(waitForLead);
        return;
      }
      startObserver(leadEl);
    };

    let removeFallbackScroll: (() => void) | null = null;

    const canUseIntersectionObserver = typeof IntersectionObserver !== 'undefined';

    if (canUseIntersectionObserver) {
      waitForLead();
    } else {
      const onScroll = () => {
        const leadEl = document.querySelector(RESIDENCE_LEAD_SELECTOR);
        if (!leadEl) return;
        const rect = leadEl.getBoundingClientRect();
        if (rect.top > window.innerHeight * 0.72) return;
        window.removeEventListener('scroll', onScroll);
        openWithDelay();
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      removeFallbackScroll = () => window.removeEventListener('scroll', onScroll);
    }

    return () => {
      window.clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
      observer?.disconnect();
      removeFallbackScroll?.();
    };
  }, [ready]);

  const handleDirectBookingPopupCloseRequest = useCallback(() => {
    if (!directBookingPopupOpen) return;
    setDirectBookingPopupOpen(false);
  }, [directBookingPopupOpen]);

  const handleDirectBookingPopupExitComplete = useCallback(() => {
    setDirectBookingPopupMounted(false);
    try {
      sessionStorage.setItem(DIRECT_BOOKING_POPUP_KEY, '1');
    } catch {
      /* ignore */
    }
  }, []);

  const shouldPlayHeroVideo = Boolean(heroVideoSrc && !posterOnlyHero && ready);

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
      {(introPhase === 'pending-consent' || (showPreloader && !preloaderReady)) && (
        <div className="home-intro-veil" aria-hidden />
      )}
      <main id="main-content" className="home-page">
        {heroMounted && (ready || showPreloader) && (
          <div className="home-page__sticky-header">
            <Header animateEntrance={headerAnimateEntrance} />
          </div>
        )}
        <div className={shellClass}>
          <div className="oh-video-bg" ref={videoSlotRef}>
            {ready && (
              <img
                className="hero-bg-poster"
                src={heroMedia.poster}
                alt=""
                width={1920}
                height={1080}
                decoding="async"
                aria-hidden
              />
            )}
            <video
              ref={videoRef}
              poster={ready ? heroMedia.poster : undefined}
              className={`hero-bg-video${ready ? '' : ' hero-bg-video--deferred'}`}
              crossOrigin="anonymous"
              autoPlay={shouldPlayHeroVideo}
              muted
              loop
              playsInline
              preload={ready && heroVideoSrc && !posterOnlyHero ? 'metadata' : 'none'}
              width={1920}
              height={1080}
              aria-label={hero.videoAria}
            />
          </div>

          <div className="oh-reveal">
            {showHeroCopy && <HeroSection />}
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
      {ready && directBookingPopupMounted && (
        <DirectBookingPopup
          open={directBookingPopupOpen}
          copy={directBookingPopup}
          onCloseRequest={handleDirectBookingPopupCloseRequest}
          onExitComplete={handleDirectBookingPopupExitComplete}
        />
      )}
    </>
  );
}
