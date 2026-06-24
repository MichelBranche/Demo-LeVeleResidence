import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { useConsent } from '../../hooks/useConsent';
import type { ConsentPreferences } from '../../lib/consentTypes';
import { getLenisInstance } from '../../lib/scroll';
import { ConsentPanel } from './ConsentPanel';

function CookieGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="9" cy="9" r="7.25" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="6.5" cy="7" r="0.9" fill="currentColor" />
      <circle cx="10.5" cy="6.25" r="0.75" fill="currentColor" />
      <circle cx="11.25" cy="10" r="0.85" fill="currentColor" />
      <circle cx="7.25" cy="11" r="0.7" fill="currentColor" />
    </svg>
  );
}

export function CookieBanner() {
  const {
    copy,
    panelOpen,
    bannerOpen,
    hasConsent,
    closePanel,
    acceptAll,
    rejectAll,
    persistPreferences,
    applyTrackingScripts,
    closeBanner,
    openBanner,
  } = useConsent();

  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const expanded = bannerOpen;
  const [panelScrollReady, setPanelScrollReady] = useState(false);

  const toggleExpanded = useCallback(() => {
    if (expanded) {
      closeBanner();
      return;
    }
    openBanner(hasConsent ? { panel: false } : undefined);
  }, [closeBanner, expanded, hasConsent, openBanner]);

  useEffect(() => {
    if (!expanded || !panelRef.current) return;
    panelRef.current.focus();
  }, [expanded, panelOpen]);

  useEffect(() => {
    if (!expanded) {
      setPanelScrollReady(false);
      return;
    }

    const shell = shellRef.current;
    if (!shell) return;

    const enableScroll = (event: TransitionEvent) => {
      if (event.target !== shell || event.propertyName !== 'grid-template-rows') return;
      setPanelScrollReady(true);
    };
    const fallback = window.setTimeout(() => setPanelScrollReady(true), 580);

    shell.addEventListener('transitionend', enableScroll);

    return () => {
      window.clearTimeout(fallback);
      shell.removeEventListener('transitionend', enableScroll);
    };
  }, [expanded]);

  useEffect(() => {
    if (!expanded) return;

    const lenis = getLenisInstance();
    lenis?.stop();

    return () => {
      lenis?.start();
    };
  }, [expanded]);

  useEffect(() => {
    if (!expanded) return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (rootRef.current?.contains(target)) return;
      closeBanner();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeBanner();
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [closeBanner, expanded]);

  const savePreferences = useCallback(
    async (resolvePrefs: () => Promise<ConsentPreferences>) => {
      const prefs = await resolvePrefs();
      const saved = await persistPreferences(prefs);
      closeBanner();
      applyTrackingScripts(saved);
    },
    [applyTrackingScripts, closeBanner, persistPreferences],
  );

  const handleAcceptAll = () => void savePreferences(acceptAll);
  const handleRejectAll = () => void savePreferences(rejectAll);
  const handleSave = (prefs: ConsentPreferences) => {
    closePanel();
    void savePreferences(async () => prefs);
  };

  const handlePreferencesBack = () => {
    if (hasConsent) {
      closeBanner();
      return;
    }
    closePanel();
  };

  const showPreferences = panelOpen;
  const showManage = hasConsent && !panelOpen;
  const showInitial = !hasConsent && !panelOpen;
  const allowPanelScroll = showPreferences && panelScrollReady;

  return createPortal(
    <div
      ref={rootRef}
      className={[
        'cookie-consent',
        'cookie-consent--dock',
        expanded ? 'cookie-consent--expanded' : 'cookie-consent--minimized',
        hasConsent ? 'cookie-consent--saved' : 'cookie-consent--pending',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div
        ref={shellRef}
        className={`cookie-consent__panel-shell${expanded ? ' is-open' : ''}`}
      >
        <div
          id="cookie-consent-panel"
          ref={panelRef}
          className="cookie-consent__panel"
          role="dialog"
          aria-modal="false"
          aria-hidden={!expanded}
          aria-label={
            showPreferences ? copy.aria.panel : showManage ? copy.aria.manage : copy.aria.dialog
          }
          tabIndex={-1}
        >
          <div className="cookie-consent__panel-toolbar">
            <p className="cookie-consent__panel-kicker">{copy.banner.eyebrow}</p>
            <button
              type="button"
              className="cookie-consent__minimize"
              onClick={closeBanner}
              aria-label={copy.aria.minimize}
            >
              <span aria-hidden>−</span>
            </button>
          </div>

          <div
            className={[
              'cookie-consent__panel-scroll',
              allowPanelScroll ? 'cookie-consent__panel-scroll--scrollable' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            data-lenis-prevent
          >
            <div className="cookie-consent__panel-inner">
            {showPreferences ? (
              <ConsentPanel onBack={handlePreferencesBack} onSave={handleSave} />
            ) : showManage ? (
              <>
                <h2 className="cookie-consent__title display-serif">{copy.panel.title}</h2>
                <p className="cookie-consent__text cookie-consent__text--compact">
                  {copy.manage.description}
                </p>

                <div className="cookie-consent__actions cookie-consent__actions--single">
                  <button
                    type="button"
                    className="consent-btn consent-btn--primary"
                    onClick={() => openBanner({ panel: true })}
                  >
                    {copy.banner.customize}
                  </button>
                </div>

                <nav className="cookie-consent__legal" aria-label={copy.aria.legalNav}>
                  <Link to="/privacy-policy">{copy.banner.privacyLink}</Link>
                  <span aria-hidden>·</span>
                  <Link to="/cookie-policy">{copy.banner.cookieLink}</Link>
                </nav>
              </>
            ) : showInitial ? (
              <>
                <h2 className="cookie-consent__title display-serif">{copy.banner.title}</h2>
                <p className="cookie-consent__text">{copy.banner.description}</p>

                <div className="cookie-consent__actions">
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

                <nav className="cookie-consent__legal" aria-label={copy.aria.legalNav}>
                  <Link to="/privacy-policy">{copy.banner.privacyLink}</Link>
                  <span aria-hidden>·</span>
                  <Link to="/cookie-policy">{copy.banner.cookieLink}</Link>
                </nav>
              </>
            ) : null}
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="cookie-consent__chip"
        onClick={toggleExpanded}
        aria-expanded={expanded}
        aria-controls="cookie-consent-panel"
        aria-label={expanded ? copy.aria.minimize : copy.aria.expand}
      >
        <CookieGlyph />
        <span>{copy.footer.cookies}</span>
        {!hasConsent && <span className="cookie-consent__chip-dot" aria-hidden />}
      </button>
    </div>,
    document.body,
  );
}
