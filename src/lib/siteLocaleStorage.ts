import { isSiteLocale, type SiteLocale } from './siteLocales';

export type { SiteLocale } from './siteLocales';

const STORAGE_KEY = 'lv-site-locale';

const FALLBACK_LOCALE: SiteLocale = 'en';

function normalizeLanguageTag(tag: string): string {
  return tag.trim().toLowerCase().replace(/_/g, '-');
}

function languageTagToSiteLocale(tag: string): SiteLocale | null {
  const normalized = normalizeLanguageTag(tag);
  if (!normalized) return null;

  const [primary] = normalized.split('-');
  if (primary && isSiteLocale(primary)) return primary;

  return null;
}

/** Lingua del dispositivo/browser mappata sulle lingue del sito, altrimenti inglese. */
export function detectBrowserSiteLocale(): SiteLocale {
  if (typeof navigator === 'undefined') return FALLBACK_LOCALE;

  const tags: string[] = [];
  if (Array.isArray(navigator.languages)) {
    tags.push(...navigator.languages);
  }
  if (navigator.language) {
    tags.push(navigator.language);
  }

  for (const tag of tags) {
    const locale = languageTagToSiteLocale(tag);
    if (locale) return locale;
  }

  return FALLBACK_LOCALE;
}

export function readSiteLocale(): SiteLocale {
  if (typeof window === 'undefined') return FALLBACK_LOCALE;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw && isSiteLocale(raw)) return raw;

    const detected = detectBrowserSiteLocale();
    writeSiteLocale(detected);
    return detected;
  } catch {
    return detectBrowserSiteLocale();
  }
}

export function writeSiteLocale(locale: SiteLocale): void {
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    /* ignore */
  }
}

const HTML_LANG: Record<SiteLocale, string> = {
  it: 'it',
  en: 'en',
  de: 'de',
  fr: 'fr',
  es: 'es',
  ru: 'ru',
  zh: 'zh-Hans',
};

export function applyDocumentLocale(locale: SiteLocale): void {
  if (typeof document === 'undefined') return;
  document.documentElement.lang = HTML_LANG[locale];
}
