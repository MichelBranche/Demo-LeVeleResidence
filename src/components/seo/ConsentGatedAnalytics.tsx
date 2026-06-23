import { Analytics } from '@vercel/analytics/react';
import { useConsent } from '../../hooks/useConsent';

/**
 * Vercel Analytics — solo con consenso analitici (ePrivacy).
 * Speed Insights è in {@link VercelSpeedInsights} (metriche prestazioni, produzione).
 */
export function ConsentGatedAnalytics() {
  const { consent, isReady } = useConsent();

  if (!isReady || !consent?.analytics) {
    return null;
  }

  return <Analytics />;
}
