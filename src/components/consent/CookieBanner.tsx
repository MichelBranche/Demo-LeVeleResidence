import gsap from 'gsap';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { useConsent } from '../../hooks/useConsent';
import type { ConsentPreferences } from '../../lib/consentTypes';
import { ConsentPanel } from './ConsentPanel';

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function CookieBanner() {
  const {
    copy,
    panelOpen,
    closePanel,
    acceptAll,
    rejectAll,
    persistPreferences,
    applyTrackingScripts,
    closeBanner,
    openBanner,
  } = useConsent();

  const blurRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const enterTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const exitTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const [render, setRender] = useState(true);

  const lockScroll = useCallback((lock: boolean) => {
    if (lock) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, []);

  const showButtons = useCallback(() => {
    if (!buttonsRef.current) return;
    gsap.set(buttonsRef.current.children, { opacity: 1, y: 0, clearProps: 'opacity,transform' });
  }, []);

  const playEnter = useCallback(() => {
    if (!blurRef.current || !overlayRef.current || !panelRef.current) return;

    enterTimelineRef.current?.kill();
    exitTimelineRef.current?.kill();
    showButtons();

    const reduced = prefersReducedMotion();

    if (reduced) {
      gsap.set([blurRef.current, overlayRef.current, panelRef.current], {
        opacity: 1,
        y: 0,
        scale: 1,
        clearProps: 'transform',
      });
      return;
    }

    gsap.set(blurRef.current, { opacity: 0 });
    gsap.set(overlayRef.current, { opacity: 0 });
    gsap.set(panelRef.current, { opacity: 0, y: 40, scale: 0.96 });

    const tl = gsap.timeline({
      onComplete: showButtons,
    });

    tl.fromTo(blurRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35 })
      .fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35 }, 0)
      .fromTo(
        panelRef.current,
        { opacity: 0, y: 40, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.2',
      );

    if (!panelOpen && buttonsRef.current?.children.length) {
      tl.from(
        buttonsRef.current.children,
        {
          opacity: 0,
          y: 10,
          stagger: 0.06,
          duration: 0.35,
          clearProps: 'opacity,transform',
        },
        '-=0.1',
      );
    }

    enterTimelineRef.current = tl;
  }, [panelOpen, showButtons]);

  useLayoutEffect(() => {
    lockScroll(true);
    playEnter();

    const safety = window.setTimeout(showButtons, 900);

    return () => {
      window.clearTimeout(safety);
      enterTimelineRef.current?.kill();
      showButtons();
      lockScroll(false);
    };
  }, [lockScroll, playEnter, showButtons]);

  useEffect(() => {
    if (panelOpen) playEnter();
  }, [panelOpen, playEnter]);

  const playExit = useCallback(
    (onComplete: () => void) => {
      if (!blurRef.current || !overlayRef.current || !panelRef.current) {
        onComplete();
        return;
      }

      enterTimelineRef.current?.kill();

      if (prefersReducedMotion()) {
        onComplete();
        return;
      }

      exitTimelineRef.current = gsap.timeline({
        defaults: { ease: 'power2.in' },
        onComplete,
      });

      if (buttonsRef.current && !panelOpen) {
        exitTimelineRef.current.to(buttonsRef.current.children, {
          opacity: 0,
          y: 8,
          stagger: 0.04,
          duration: 0.2,
        });
      }

      exitTimelineRef.current
        .to(panelRef.current, { opacity: 0, y: 24, scale: 0.97, duration: 0.35 }, 0)
        .to(overlayRef.current, { opacity: 0, duration: 0.28 }, 0.1)
        .to(blurRef.current, { opacity: 0, duration: 0.28 }, 0.1);
    },
    [panelOpen],
  );

  const finalize = useCallback(
    (resolvePrefs: () => Promise<ConsentPreferences>) => {
      playExit(() => {
        void (async () => {
          const prefs = await resolvePrefs();
          const saved = await persistPreferences(prefs);
          lockScroll(false);
          closeBanner();
          setRender(false);
          applyTrackingScripts(saved);
        })();
      });
    },
    [applyTrackingScripts, closeBanner, lockScroll, persistPreferences, playExit],
  );

  const handleAcceptAll = () => finalize(acceptAll);
  const handleRejectAll = () => finalize(rejectAll);
  const handleSave = (prefs: ConsentPreferences) => finalize(async () => prefs);

  if (!render) return null;

  return createPortal(
    <div
      className="cookie-consent cookie-consent--visible"
      role="dialog"
      aria-modal="true"
      aria-label={copy.aria.dialog}
    >
      <div ref={blurRef} className="cookie-consent__blur" aria-hidden />
      <div ref={overlayRef} className="cookie-consent__overlay" aria-hidden />

      <div ref={panelRef} className="cookie-consent__panel">
        <div className="cookie-consent__panel-inner">
          {!panelOpen ? (
            <>
              <p className="cookie-consent__eyebrow">{copy.banner.eyebrow}</p>
              <h2 className="cookie-consent__title display-serif">{copy.banner.title}</h2>
              <p className="cookie-consent__text">{copy.banner.description}</p>

              <div ref={buttonsRef} className="cookie-consent__actions">
                <button
                  type="button"
                  className="consent-btn consent-btn--primary"
                  onClick={handleAcceptAll}
                >
                  {copy.banner.acceptAll}
                </button>
                <button
                  type="button"
                  className="consent-btn consent-btn--ghost"
                  onClick={handleRejectAll}
                >
                  {copy.banner.rejectAll}
                </button>
                <button
                  type="button"
                  className="consent-btn consent-btn--outline"
                  onClick={() => openBanner({ panel: true })}
                >
                  {copy.banner.customize}
                </button>
              </div>

              <nav className="cookie-consent__legal" aria-label="Legal">
                <Link to="/privacy-policy">{copy.banner.privacyLink}</Link>
                <span aria-hidden>·</span>
                <Link to="/cookie-policy">{copy.banner.cookieLink}</Link>
              </nav>
            </>
          ) : (
            <ConsentPanel
              onBack={closePanel}
              onSave={(prefs) => {
                closePanel();
                handleSave(prefs);
              }}
            />
          )}

        </div>
      </div>
    </div>,
    document.body,
  );
}
