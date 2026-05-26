import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getLocaleCopy } from '../../i18n';
import { absoluteUrl, getSeoForPath, OG_IMAGE_PATH, SITE_DISPLAY_NAME } from '../../data/seo';
import { useSiteLocale } from '../../hooks/useSiteLocale';
import { SITE_LOCALES, type SiteLocale } from '../../lib/siteLocales';

const HREFLANG_TAGS: Record<SiteLocale, string> = {
  it: 'it-IT',
  en: 'en-GB',
  de: 'de-DE',
  fr: 'fr-FR',
  es: 'es-ES',
};

function upsertMeta(name: string, content: string, property = false) {
  const attr = property ? 'property' : 'name';
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.content = content;
}

function upsertLink(rel: string, href: string, hreflang?: string) {
  const selector =
    hreflang !== undefined
      ? `link[rel="${rel}"][hreflang="${hreflang}"]`
      : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    if (hreflang) el.hreflang = hreflang;
    document.head.appendChild(el);
  }
  el.href = href;
}

function clearHreflangAlternates() {
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((node) => node.remove());
}

function syncHreflang(canonicalPath: string) {
  clearHreflangAlternates();

  for (const loc of SITE_LOCALES) {
    const link = document.createElement('link');
    link.rel = 'alternate';
    link.hreflang = HREFLANG_TAGS[loc];
    link.href = absoluteUrl(canonicalPath);
    document.head.appendChild(link);
  }

  const xDefault = document.createElement('link');
  xDefault.rel = 'alternate';
  xDefault.hreflang = 'x-default';
  xDefault.href = absoluteUrl(canonicalPath);
  document.head.appendChild(xDefault);
}

export function PageSeo() {
  const { pathname } = useLocation();
  const { locale } = useSiteLocale();

  useEffect(() => {
    const seo = getSeoForPath(pathname, locale);
    const url = absoluteUrl(seo.path);
    const ogLocale = getLocaleCopy(locale).ogLocale;
    const ogImage = absoluteUrl(OG_IMAGE_PATH);

    document.title = seo.title;
    upsertMeta('description', seo.description);
    if (seo.keywords) upsertMeta('keywords', seo.keywords);
    upsertMeta('robots', seo.noindex ? 'noindex, follow' : 'index, follow');
    upsertLink('canonical', url);

    upsertMeta('og:site_name', SITE_DISPLAY_NAME, true);
    upsertMeta('og:title', seo.title, true);
    upsertMeta('og:description', seo.description, true);
    upsertMeta('og:type', 'website', true);
    upsertMeta('og:url', url, true);
    upsertMeta('og:locale', ogLocale, true);
    upsertMeta('og:image', ogImage, true);
    upsertMeta('og:image:alt', `${SITE_DISPLAY_NAME} — Stintino, Sardegna`, true);

    upsertMeta('twitter:card', 'summary_large_image');
    upsertMeta('twitter:title', seo.title);
    upsertMeta('twitter:description', seo.description);
    upsertMeta('twitter:image', ogImage);

    syncHreflang(seo.path);

    return () => clearHreflangAlternates();
  }, [pathname, locale]);

  return null;
}
