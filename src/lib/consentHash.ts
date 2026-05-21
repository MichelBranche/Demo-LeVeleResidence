import { CONSENT_POLICY_VERSION } from './consentPolicy';
import type { ConsentPreferences } from './consentTypes';

/** Payload canonico per fingerprint (ordine fisso). */
export function buildConsentCanonical(
  prefs: ConsentPreferences,
  version: string = CONSENT_POLICY_VERSION,
): string {
  return JSON.stringify({
    v: version,
    a: prefs.analytics ? 1 : 0,
    m: prefs.marketing ? 1 : 0,
    p: prefs.preferences ? 1 : 0,
  });
}

function fallbackFingerprint(canonical: string): string {
  let hash = 5381;
  for (let i = 0; i < canonical.length; i += 1) {
    hash = (hash * 33) ^ canonical.charCodeAt(i);
  }
  return `djb2-${(hash >>> 0).toString(16).padStart(8, '0')}`;
}

/** SHA-256 hex (browser) con fallback sync per ambienti senza subtle crypto. */
export async function fingerprintConsent(prefs: ConsentPreferences): Promise<string> {
  const canonical = buildConsentCanonical(prefs);

  if (typeof crypto !== 'undefined' && crypto.subtle) {
    try {
      const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(canonical));
      return Array.from(new Uint8Array(buffer))
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join('');
    } catch {
      /* fall through */
    }
  }

  return fallbackFingerprint(canonical);
}

export function verifyConsentHashSync(
  consent: {
    analytics: boolean;
    marketing: boolean;
    preferences: boolean;
    version: string;
    hash: string;
  },
): boolean {
  if (consent.hash.startsWith('djb2-')) {
    const canonical = buildConsentCanonical(
      {
        analytics: consent.analytics,
        marketing: consent.marketing,
        preferences: consent.preferences,
      },
      consent.version,
    );
    return consent.hash === fallbackFingerprint(canonical);
  }

  return false;
}

export async function verifyConsentHashAsync(consent: {
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  version: string;
  hash: string;
}): Promise<boolean> {
  if (consent.hash.startsWith('djb2-')) {
    return verifyConsentHashSync(consent);
  }

  const expected = await fingerprintConsent({
    analytics: consent.analytics,
    marketing: consent.marketing,
    preferences: consent.preferences,
  });

  return consent.hash === expected;
}
