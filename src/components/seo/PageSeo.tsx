import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getLocaleCopy } from '../../i18n';
import { absoluteUrl, getSeoForPath } from '../../data/seo';
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
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

export function PageSeo() {
  const { pathname, search } = useLocation();
  const { locale } = useSiteLocale();

  useEffect(() => {
    const seo = getSeoForPath(pathname, search, locale);
    const url = absoluteUrl(seo.path);
    const ogLocale = getLocaleCopy(locale).ogLocale;

    document.title = seo.title;
    upsertMeta('description', seo.description);
    if (seo.keywords) upsertMeta('keywords', seo.keywords);
    upsertMeta('robots', seo.noindex ? 'noindex, follow' : 'index, follow');
    upsertLink('canonical', url);

    upsertMeta('og:title', seo.title, true);
    upsertMeta('og:description', seo.description, true);
    upsertMeta('og:type', 'website', true);
    upsertMeta('og:url', url, true);
    upsertMeta('og:locale', ogLocale, true);

    upsertMeta('twitter:card', 'summary_large_image');
    upsertMeta('twitter:title', seo.title);
    upsertMeta('twitter:description', seo.description);
  }, [pathname, search, locale]);

  return null;
}
