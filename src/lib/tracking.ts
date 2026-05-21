/**
 * Unico punto di ingresso per script di tracciamento (GA4 / Meta).
 * Non importare loadScripts altrove: usare sempre questo modulo.
 */
import type { Consent } from './consentTypes';
import {
  applyConsentedScripts as applyScripts,
  revokeTrackingScripts as revokeScripts,
} from './loadScripts';

export type { TrackingScriptType } from './loadScripts';

function isClient(): boolean {
  return typeof window !== 'undefined';
}

/** Applica GA4/Meta solo se il consenso lo permette. Fail-safe senza env. */
export function applyTrackingIfConsented(consent: Consent | null | undefined): void {
  if (!isClient() || !consent) return;
  if (!consent.analytics && !consent.marketing) return;
  applyScripts(consent);
}

export function revokeAllTracking(): void {
  if (!isClient()) return;
  revokeScripts();
}

/** Pageview SPA — solo con consenso analytics e gtag già caricato. */
export function trackPageView(path: string, consent: Consent | null | undefined): void {
  if (!isClient() || !consent?.analytics) return;
  if (typeof window.gtag !== 'function') return;

  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
  if (!measurementId) return;

  window.gtag('config', measurementId, {
    page_path: path,
    anonymize_ip: true,
  });
}
