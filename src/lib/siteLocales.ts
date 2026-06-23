export const SITE_LOCALES = ['it', 'en', 'de', 'fr', 'es', 'ru', 'zh'] as const;

export type SiteLocale = (typeof SITE_LOCALES)[number];

export const LOCALE_LABELS: Record<SiteLocale, string> = {
  it: 'Italiano',
  en: 'English',
  de: 'Deutsch',
  fr: 'Français',
  es: 'Español',
  ru: 'Русский',
  zh: '中文',
};

export function isSiteLocale(value: string): value is SiteLocale {
  return (SITE_LOCALES as readonly string[]).includes(value);
}

export function toConsentLocale(locale: SiteLocale): SiteLocale {
  return locale;
}
