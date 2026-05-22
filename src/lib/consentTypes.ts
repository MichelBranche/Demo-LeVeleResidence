import { CONSENT_POLICY_VERSION } from './consentPolicy';
import { fingerprintConsent } from './consentHash';

export const CONSENT_STORAGE_KEY = 'lv_consent';
export const CONSENT_COOKIE_NAME = 'lv_consent';

import type { SiteLocale } from './siteLocales';

export type ConsentLocale = SiteLocale;

export type Consent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  timestamp: number;
  /** Versione privacy/cookie policy al momento del consenso */
  version: string;
  /** SHA-256 (hex) del payload canonico — prova di integrità */
  hash: string;
};

export type ConsentCategory = 'analytics' | 'marketing' | 'preferences';

export type ConsentPreferences = Pick<Consent, 'analytics' | 'marketing' | 'preferences'>;

export type ConsentPreferencesPartial = Partial<ConsentPreferences>;

export async function createConsent(prefs: ConsentPreferences): Promise<Consent> {
  const version = CONSENT_POLICY_VERSION;
  const hash = await fingerprintConsent(prefs);

  return {
    necessary: true,
    analytics: prefs.analytics,
    marketing: prefs.marketing,
    preferences: prefs.preferences,
    timestamp: Date.now(),
    version,
    hash,
  };
}

export const DEFAULT_REJECTED: ConsentPreferences = {
  analytics: false,
  marketing: false,
  preferences: false,
};

export const DEFAULT_ACCEPTED: ConsentPreferences = {
  analytics: true,
  marketing: true,
  preferences: true,
};

export function preferencesFromConsent(consent: Consent | null): ConsentPreferences {
  return {
    analytics: consent?.analytics ?? false,
    marketing: consent?.marketing ?? false,
    preferences: consent?.preferences ?? false,
  };
}
