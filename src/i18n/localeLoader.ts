import type { SiteLocale } from '../lib/siteLocales';
import { it } from './locales/it';
import type { LocaleCopy } from './types';

const cache: Partial<Record<SiteLocale, LocaleCopy>> = {
  it,
};

const loaders: Record<
  SiteLocale,
  () => Promise<{ default?: LocaleCopy } & Partial<Record<SiteLocale, LocaleCopy>>>
> = {
  it: async () => ({ it }),
  en: () => import('./locales/en'),
  de: () => import('./locales/de'),
  fr: () => import('./locales/fr'),
  es: () => import('./locales/es'),
  ru: () => import('./locales/ru'),
  zh: () => import('./locales/zh'),
};

function extractCopy(mod: Awaited<ReturnType<(typeof loaders)[SiteLocale]>>, locale: SiteLocale): LocaleCopy {
  const fromNamed = mod[locale];
  if (fromNamed) return fromNamed;
  if (mod.default) return mod.default;
  throw new Error(`Locale module missing export for ${locale}`);
}

export function isLocaleLoaded(locale: SiteLocale): boolean {
  return Boolean(cache[locale]);
}

export function getLocaleCopyCached(locale: SiteLocale): LocaleCopy {
  return cache[locale] ?? cache.it ?? it;
}

export async function ensureLocaleLoaded(locale: SiteLocale): Promise<LocaleCopy> {
  if (cache[locale]) return cache[locale]!;

  const mod = await loaders[locale]();
  const copy = extractCopy(mod, locale);
  cache[locale] = copy;
  return copy;
}

export function primeLocale(locale: SiteLocale): void {
  if (!cache[locale]) {
    cache[locale] = it;
  }
}
