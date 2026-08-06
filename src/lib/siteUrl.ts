/**
 * Canonical production origin for SEO (canonical, Open Graph, JSON-LD, sitemap).
 * Override in production with VITE_SITE_URL (Vite) — same value as SITE_URL in docs/deploy.
 */
export const DEFAULT_SITE_URL = 'https://www.residencelevelestintino.it';

export function resolveSiteUrl(envValue?: string | null): string {
  const raw = (envValue ?? '').trim();
  return (raw || DEFAULT_SITE_URL).replace(/\/$/, '');
}

export function toAbsoluteUrl(siteUrl: string, path: string): string {
  const base = siteUrl.replace(/\/$/, '');
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized === '/' ? '/' : normalized}`;
}

/** Indexable paths for sitemap.xml (exclude noindex legal pages). */
export const SITEMAP_PATHS = [
  '/',
  '/prenota',
  '/la-pelosa',
  '/camere/vista-mare',
  '/camere/vista-giardino',
  '/info-condizioni',
  '/contatti',
] as const;

/** Public routes prerendered at build for crawler-readable metadata. */
export const PRERENDER_PATHS = [
  '/',
  '/prenota',
  '/la-pelosa',
  '/camere/vista-mare',
  '/camere/vista-giardino',
  '/info-condizioni',
  '/contatti',
  '/privacy-policy',
  '/cookie-policy',
] as const;
