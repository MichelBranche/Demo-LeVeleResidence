import { useEffect, useRef, useState } from 'react';
import { MenuOverlay } from './components/MenuOverlay';
import { Header } from './components/Header';
import { BookingBar } from './components/BookingBar';
import { HeroSection } from './components/HeroSection';
import { LoadingScreen } from './components/LoadingScreen';
import { CircleRevealSection } from './components/CircleRevealSection';
import { AccordionSection } from './components/AccordionSection';
import { SuitesSection } from './components/SuitesSection';
import { InfoServicesSection } from './components/InfoServicesSection';
import { ReviewsSection } from './components/ReviewsSection';
import { ContactSection } from './components/ContactSection';
import { FooterMap } from './components/FooterMap';
import { useLandingAnimations } from './hooks/useLandingAnimations';
import { sectionIdToMenuKey } from './data/menuNav';
import './landing.css';

/* Flag a livello di modulo: persiste tra i mount/unmount della LandingPage nello stesso
   caricamento di pagina. Permette di mostrare il loading screen solo al primo ingresso e
   saltarlo quando l'utente torna in home da una pagina camera. Un refresh del browser
   lo azzera ed il loading screen torna a comparire. */
let hasSeenIntro = false;

export function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenuKey, setActiveMenuKey] = useState(null);
  const [bookingVisible, setBookingVisible] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(hasSeenIntro ? 100 : 0);
  const [isIntroDone, setIsIntroDone] = useState(hasSeenIntro);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const hasManualScrollRef = useRef(false);
  const autoScrollLockRef = useRef(false);
  const autoScrollDoneRef = useRef(false);
  const autoScrollTimerRef = useRef(null);
  const introDoneEventSentRef = useRef(false);

  useLandingAnimations({ setBookingVisible });

  useEffect(() => {
    if (!isIntroDone) return undefined;

    const sectionIds = [
      'hero',
      'circle-reveal',
      'residence',
      'horizontal-section',
      'info-servizi',
      'recensioni',
      'contatti',
      'site-footer',
    ];
    let rafId = 0;

    const updateActiveFromScroll = () => {
      const mid = window.innerHeight * 0.38;
      let bestId = 'hero';
      let bestScore = Number.NEGATIVE_INFINITY;

      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.bottom <= 0 || r.top >= window.innerHeight) return;
        const sectionCenter = (r.top + r.bottom) / 2;
        const score = -Math.abs(sectionCenter - mid);
        if (score > bestScore) {
          bestScore = score;
          bestId = id;
        }
      });

      setActiveMenuKey(sectionIdToMenuKey(bestId));
    };

    const onScrollOrResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateActiveFromScroll);
    };

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });
    updateActiveFromScroll();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [isIntroDone]);

  useEffect(() => {
    if (!isIntroDone) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMenuOpen, isIntroDone]);

  const handleMenuNavigate = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (hasSeenIntro) return undefined;
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        const next = prev + Math.random() * 16;
        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, 180);

    return () => clearInterval(interval);
  }, []);

  /* Quando l'intro è finita (Prosegui o ritorno in home): un solo punto che fa partire il video
     dopo il commit del DOM — evita play() sul poster / ref non pronto. */
  useEffect(() => {
    if (!isIntroDone) return undefined;

    let cancelled = false;

    const run = async () => {
      const video = videoRef.current;
      if (!video || cancelled) return;

      hasManualScrollRef.current = false;
      autoScrollDoneRef.current = false;
      autoScrollLockRef.current = false;

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
  }, [isIntroDone]);

  useEffect(() => {
    document.body.style.overflow = isIntroDone ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isIntroDone]);

  useEffect(() => {
    if (!isIntroDone) return undefined;

    const clearAutoScrollTimer = () => {
      if (autoScrollTimerRef.current) {
        clearTimeout(autoScrollTimerRef.current);
        autoScrollTimerRef.current = null;
      }
    };

    const pauseVideo = () => {
      const video = videoRef.current;
      if (!video || video.paused) return;
      video.pause();
    };

    const syncPlaybackWithHeroVisibility = async () => {
      const video = videoRef.current;
      const hero = document.getElementById('hero');
      if (!video || !hero) return;

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
      if (autoScrollLockRef.current) return;
      hasManualScrollRef.current = true;
      clearAutoScrollTimer();
      pauseVideo();
      void syncPlaybackWithHeroVisibility();
    };

    const onKeyDown = (event) => {
      const scrollKeys = ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '];
      if (scrollKeys.includes(event.key)) onManualScrollIntent();
    };

    const triggerAutoScroll = () => {
      if (hasManualScrollRef.current || autoScrollDoneRef.current) return;
      const nextSection = document.getElementById('circle-reveal');
      if (!nextSection) return;
      autoScrollDoneRef.current = true;
      autoScrollLockRef.current = true;
      nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.setTimeout(() => {
        autoScrollLockRef.current = false;
      }, 1200);
    };

    const video = videoRef.current;
    const scheduleAutoScrollFromDuration = () => {
      if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;
      clearAutoScrollTimer();
      const delayMs = Math.max(video.duration * 1000 - 900, 2500);
      autoScrollTimerRef.current = setTimeout(() => {
        triggerAutoScroll();
      }, delayMs);
    };

    if (video) {
      video.addEventListener('loadedmetadata', scheduleAutoScrollFromDuration);
      video.addEventListener('play', scheduleAutoScrollFromDuration);
      scheduleAutoScrollFromDuration();
    }

    window.addEventListener('wheel', onManualScrollIntent, { passive: true });
    window.addEventListener('touchmove', onManualScrollIntent, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('scroll', syncPlaybackWithHeroVisibility, { passive: true });

    return () => {
      clearAutoScrollTimer();
      if (video) {
        video.removeEventListener('loadedmetadata', scheduleAutoScrollFromDuration);
        video.removeEventListener('play', scheduleAutoScrollFromDuration);
      }
      window.removeEventListener('wheel', onManualScrollIntent);
      window.removeEventListener('touchmove', onManualScrollIntent);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('scroll', syncPlaybackWithHeroVisibility);
    };
  }, [isIntroDone, isMuted]);

  const handleEnterExperience = () => {
    hasSeenIntro = true;
    introDoneEventSentRef.current = false;
    setIsIntroDone(true);
    setIsMuted(false);
    hasManualScrollRef.current = false;
    autoScrollDoneRef.current = false;
    autoScrollLockRef.current = false;
  };

  const handleToggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <>
      {!isIntroDone && (
        <LoadingScreen
          progress={loadingProgress}
          canEnter={loadingProgress >= 100}
          onEnter={handleEnterExperience}
        />
      )}
      <Header onMenuOpen={() => setIsMenuOpen(true)} />
      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        activeMenuKey={activeMenuKey}
        onNavigate={handleMenuNavigate}
      />
      <BookingBar visible={bookingVisible} />
      <main>
        <HeroSection videoRef={videoRef} isMuted={isMuted} onToggleMute={handleToggleMute} />
        <CircleRevealSection />
        <AccordionSection />
        <SuitesSection />
        <InfoServicesSection />
        <ReviewsSection />
        <ContactSection />
      </main>
      <FooterMap />
    </>
  );
}
