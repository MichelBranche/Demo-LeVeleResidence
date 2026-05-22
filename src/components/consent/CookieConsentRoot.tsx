import type { ReactNode } from 'react';
import { ConsentProvider, useConsent } from '../../hooks/useConsent';
import { SiteLocaleProvider } from '../../hooks/useSiteLocale';
import { CookieBanner } from './CookieBanner';

export function CookieBannerGate() {
  const { isReady, bannerOpen, hasConsent } = useConsent();

  if (!isReady) return null;
  if (!bannerOpen) return null;

  return <CookieBanner key={hasConsent ? 'manage' : 'first'} />;
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
