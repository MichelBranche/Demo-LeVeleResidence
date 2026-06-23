import { isSiteLocale, type SiteLocale } from './siteLocales';

export type { SiteLocale } from './siteLocales';

const STORAGE_KEY = 'lv-site-locale';

export function readSiteLocale(): SiteLocale {
  if (typeof window === 'undefined') return 'it';
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw && isSiteLocale(raw) ? raw : 'it';
  } catch {
    return 'it';
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
