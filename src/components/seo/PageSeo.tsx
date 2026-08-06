import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getLocaleCopy } from '../../i18n';
import {
  absoluteUrl,
  getSeoForPath,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_PATH,
  OG_IMAGE_WIDTH,
  SITE_DISPLAY_NAME,
} from '../../data/seo';
import { useSiteLocale } from '../../hooks/useSiteLocale';

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

function upsertLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]:not([hreflang])`);
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

/**
 * No hreflang: locales are client-side UI translations on the same URL,
 * not separate translated documents. Do not emit fake alternate language URLs.
 */

export function PageSeo() {
  const { pathname } = useLocation();
  const { locale } = useSiteLocale();

  useEffect(() => {
    const seo = getSeoForPath(pathname, locale);
    const copy = getLocaleCopy(locale);
    const url = absoluteUrl(seo.path);
    const ogImage = absoluteUrl(OG_IMAGE_PATH);
    const ogImageAlt = copy.seo.ogImageAlt;

    document.title = seo.title;
    upsertMeta('description', seo.description);
    upsertMeta('robots', seo.noindex ? 'noindex, follow' : 'index, follow');
    upsertLink('canonical', url);

    upsertMeta('og:site_name', SITE_DISPLAY_NAME, true);
    upsertMeta('og:title', seo.title, true);
    upsertMeta('og:description', seo.description, true);
    upsertMeta('og:type', 'website', true);
    upsertMeta('og:url', url, true);
    upsertMeta('og:locale', copy.ogLocale, true);
    upsertMeta('og:image', ogImage, true);
    upsertMeta('og:image:alt', ogImageAlt, true);
    upsertMeta('og:image:width', String(OG_IMAGE_WIDTH), true);
    upsertMeta('og:image:height', String(OG_IMAGE_HEIGHT), true);

    upsertMeta('twitter:card', 'summary_large_image');
    upsertMeta('twitter:title', seo.title);
    upsertMeta('twitter:description', seo.description);
    upsertMeta('twitter:image', ogImage);
    upsertMeta('twitter:image:alt', ogImageAlt);
  }, [pathname, locale]);

  return null;
}
