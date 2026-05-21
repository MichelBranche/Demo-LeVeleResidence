import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useConsent } from '../../hooks/useConsent';
import { trackPageView } from '../../lib/tracking';

/** SPA pageview GA4 solo dopo consenso analytics. */
export function TrackingRouteSync() {
  const { pathname, search } = useLocation();
  const { consent, isReady } = useConsent();

  useEffect(() => {
    if (!isReady || !consent?.analytics) return;
    trackPageView(`${pathname}${search}`, consent);
  }, [pathname, search, consent, isReady]);

  return null;
}
