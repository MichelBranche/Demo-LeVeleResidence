import { verifyConsentHashSync } from './consentHash';
import { CONSENT_POLICY_VERSION } from './consentPolicy';
import {
  CONSENT_COOKIE_NAME,
  CONSENT_STORAGE_KEY,
  type Consent,
} from './consentTypes';

const LEGACY_STORAGE_KEY = 'le-vele-consent';
const COOKIE_MAX_AGE_DAYS = 365;
const COOKIE_PATH = '/';

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

function isValidConsent(value: unknown): value is Consent {
  if (!value || typeof value !== 'object') return false;
  const c = value as Consent;
  return (
    c.necessary === true &&
    typeof c.analytics === 'boolean' &&
    typeof c.marketing === 'boolean' &&
    typeof c.preferences === 'boolean' &&
    typeof c.timestamp === 'number' &&
    Number.isFinite(c.timestamp) &&
    typeof c.version === 'string' &&
    c.version.length > 0 &&
    typeof c.hash === 'string' &&
    c.hash.length > 0
  );
}

function normalizeStored(value: unknown): Consent | null {
  if (!value || typeof value !== 'object') return null;
  const raw = value as Record<string, unknown>;

  const consent: Consent = {
    necessary: true,
    analytics: Boolean(raw.analytics),
    marketing: Boolean(raw.marketing),
    preferences: Boolean(raw.preferences),
    timestamp: typeof raw.timestamp === 'number' ? raw.timestamp : Date.now(),
    version: typeof raw.version === 'string' ? raw.version : CONSENT_POLICY_VERSION,
    hash: typeof raw.hash === 'string' ? raw.hash : '',
  };

  if (!isValidConsent(consent)) return null;

  if (consent.hash.startsWith('djb2-')) {
    if (!verifyConsentHashSync(consent)) return null;
  } else if (!/^[a-f0-9]{64}$/i.test(consent.hash)) {
    return null;
  }

  if (consent.version !== CONSENT_POLICY_VERSION) {
    return null;
  }

  return consent;
}

function encodeCookieValue(consent: Consent): string {
  return encodeURIComponent(
    JSON.stringify({
      a: consent.analytics ? 1 : 0,
      m: consent.marketing ? 1 : 0,
      p: consent.preferences ? 1 : 0,
      t: consent.timestamp,
      v: consent.version,
      h: consent.hash,
    }),
  );
}

function decodeCookieValue(raw: string): Consent | null {
  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as {
      a?: number;
      m?: number;
      p?: number;
      t?: number;
      v?: string;
      h?: string;
    };
    if (typeof parsed.t !== 'number' || !parsed.h || !parsed.v) return null;
    return normalizeStored({
      necessary: true,
      analytics: parsed.a === 1,
      marketing: parsed.m === 1,
      preferences: parsed.p === 1,
      timestamp: parsed.t,
      version: parsed.v,
      hash: parsed.h,
    });
  } catch {
    return null;
  }
}

function buildCookieString(value: string, maxAge: number): string {
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  return `${CONSENT_COOKIE_NAME}=${value}; Path=${COOKIE_PATH}; Max-Age=${maxAge}; SameSite=Lax${secure}`;
}

function readCookie(): Consent | null {
  if (!isBrowser()) return null;
  const match = document.cookie
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${CONSENT_COOKIE_NAME}=`));
  if (!match) return null;
  const value = match.slice(CONSENT_COOKIE_NAME.length + 1);
  return decodeCookieValue(value);
}

function writeCookie(consent: Consent): void {
  if (!isBrowser()) return;
  const maxAge = COOKIE_MAX_AGE_DAYS * 24 * 60 * 60;
  document.cookie = buildCookieString(encodeCookieValue(consent), maxAge);
}

function clearCookie(): void {
  if (!isBrowser()) return;
  document.cookie = buildCookieString('', 0);
}

function readLocalStorage(key: string): Consent | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return normalizeStored(JSON.parse(raw) as unknown);
  } catch {
    return null;
  }
}

export function getConsent(): Consent | null {
  if (!isBrowser()) return null;

  const primary = readLocalStorage(CONSENT_STORAGE_KEY);
  if (primary) return primary;

  const legacy = readLocalStorage(LEGACY_STORAGE_KEY);
  if (legacy) {
    return null;
  }

  return readCookie();
}

export function setConsent(consent: Consent): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
  } catch {
    /* quota / private mode */
  }
  writeCookie(consent);
}

export function clearConsent(): void {
  if (!isBrowser()) return;
  try {
    localStorage.removeItem(CONSENT_STORAGE_KEY);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
  } catch {
    /* ignore */
  }
  clearCookie();
}

export function hasStoredConsent(): boolean {
  return getConsent() !== null;
}
