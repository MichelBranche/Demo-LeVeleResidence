import type { Consent } from './consentTypes';

export type TrackingScriptType = 'analytics' | 'marketing';

const injected = new Set<string>();

type FbqFn = ((...args: unknown[]) => void) & { q?: unknown[][] };

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: FbqFn;
    _fbq?: FbqFn;
  }
}

function isClient(): boolean {
  return typeof window !== 'undefined';
}

function appendExternalScript(src: string, id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!isClient() || !src || document.getElementById(id)) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.id = id;
    script.async = true;
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });
}

function initGoogleAnalytics(measurementId: string): void {
  window.dataLayer = window.dataLayer || [];

  function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', measurementId, {
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    send_page_view: false,
  });

  gtag('event', 'page_view', {
    page_path: `${window.location.pathname}${window.location.search}`,
    page_location: window.location.href,
  });
}

function initMetaPixel(pixelId: string): void {
  if (!window.fbq) {
    const queue: unknown[][] = [];
    const stub = Object.assign(
      (...args: unknown[]) => {
        queue.push(args);
      },
      { q: queue },
    );
    window.fbq = stub as FbqFn;
  }

  window.fbq('init', pixelId);
  window.fbq('track', 'PageView');
}

function defaultScriptSrc(type: TrackingScriptType): string | null {
  const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
  const pixelId = import.meta.env.VITE_META_PIXEL_ID as string | undefined;

  if (type === 'analytics' && gaId) {
    return `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  }
  if (type === 'marketing' && pixelId) {
    return 'https://connect.facebook.net/en_US/fbevents.js';
  }
  return null;
}

/**
 * @internal Usare `applyTrackingIfConsented` da `lib/tracking.ts`.
 */
export function loadScriptIfConsented(
  type: TrackingScriptType,
  src: string,
  consent?: Consent | null,
): void {
  if (!isClient() || !consent || !src) return;

  if (type === 'analytics' && !consent.analytics) return;
  if (type === 'marketing' && !consent.marketing) return;

  const scriptKey = `${type}:${src}`;
  if (injected.has(scriptKey)) return;

  if (type === 'analytics') {
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
    if (!measurementId) return;
    injected.add(scriptKey);
    void appendExternalScript(src, 'lv-gtag-js').then(() => initGoogleAnalytics(measurementId));
    return;
  }

  if (type === 'marketing') {
    const pixelId = import.meta.env.VITE_META_PIXEL_ID as string | undefined;
    if (!pixelId) return;
    injected.add(scriptKey);
    void appendExternalScript(src, 'lv-meta-pixel').then(() => initMetaPixel(pixelId));
  }
}

/** @internal Usare `applyTrackingIfConsented` da `lib/tracking.ts`. */
export function applyConsentedScripts(consent: Consent): void {
  const analyticsSrc = defaultScriptSrc('analytics');
  const marketingSrc = defaultScriptSrc('marketing');

  if (analyticsSrc) loadScriptIfConsented('analytics', analyticsSrc, consent);
  if (marketingSrc) loadScriptIfConsented('marketing', marketingSrc, consent);
}

/** @internal Usare `revokeAllTracking` da `lib/tracking.ts`. */
export function revokeTrackingScripts(): void {
  injected.clear();

  document.getElementById('lv-gtag-js')?.remove();
  document.getElementById('lv-meta-pixel')?.remove();

  delete window.gtag;
  delete window.dataLayer;
  delete window.fbq;
  delete window._fbq;
}
