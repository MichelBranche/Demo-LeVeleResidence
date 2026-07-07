import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ConsentProvider, useConsent } from '../../hooks/useConsent';
import { SiteLocaleProvider } from '../../hooks/useSiteLocale';
import { isIntroDone, onIntroDone } from '../../lib/intro';
import { CookieBanner } from './CookieBanner';

const COOKIE_BANNER_AFTER_INTRO_DELAY_MS = 600;

export function CookieBannerGate() {
  const { isReady } = useConsent();
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const [homeIntroUnlocked, setHomeIntroUnlocked] = useState(() => !isHome || isIntroDone());

  useEffect(() => {
    let timeoutId = 0;

    if (!isHome) {
      setHomeIntroUnlocked(true);
      return () => window.clearTimeout(timeoutId);
    }
    if (isIntroDone()) {
      timeoutId = window.setTimeout(() => setHomeIntroUnlocked(true), COOKIE_BANNER_AFTER_INTRO_DELAY_MS);
      return () => window.clearTimeout(timeoutId);
    }
    setHomeIntroUnlocked(false);
    const offIntroDone = onIntroDone(() => {
      timeoutId = window.setTimeout(() => setHomeIntroUnlocked(true), COOKIE_BANNER_AFTER_INTRO_DELAY_MS);
    });
    return () => {
      offIntroDone();
      window.clearTimeout(timeoutId);
    };
  }, [isHome]);

  if (!isReady || !homeIntroUnlocked) return null;

  return <CookieBanner />;
}

/**
 * Provider consenso + banner. Deve stare DENTRO BrowserRouter (Link nel banner).
 */
export function CookieConsentRoot({ children }: { children: ReactNode }) {
  return (
    <ConsentProvider>
      <SiteLocaleProvider>
        {children}
        <CookieBannerGate />
      </SiteLocaleProvider>
    </ConsentProvider>
  );
}
