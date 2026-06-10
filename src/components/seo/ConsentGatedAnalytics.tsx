import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { useConsent } from '../../hooks/useConsent';

/**
 * Vercel Analytics / Speed Insights — caricati solo con consenso analitici (ePrivacy).
 */
export function ConsentGatedAnalytics() {
  const { consent, isReady } = useConsent();

  if (!isReady || !consent?.analytics) {
    return null;
  }

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
