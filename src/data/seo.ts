import { getLocaleCopy, getSiteContent } from '../i18n';
import { siteConfig, siteMapCoords } from '../i18n/siteMedia';
import type { SiteLocale } from '../lib/siteLocales';
import { normalizePathname } from './routes';
const SITE_URL = import.meta.env.VITE_SITE_URL ?? 'https://www.rtalevele.com';

/** Immagine anteprima social (Open Graph / WhatsApp / iMessage). */
export const OG_IMAGE_PATH = '/images/og-share.png';
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

export const SITE_DISPLAY_NAME = siteConfig.name;

export type PageSeoConfig = {
  path: string;
  title: string;
  description: string;
  keywords?: string;
  noindex?: boolean;
};

export function getSeoForPath(pathname: string, locale: SiteLocale = 'it'): PageSeoConfig {
  const copy = getLocaleCopy(locale);
  const { seo } = copy;
  const canonicalPath = normalizePathname(pathname);
  const path = canonicalPath.toLowerCase();

  if (path.startsWith('/camere/')) {
    const slug = path.replace('/camere/', '');
    const localized = getSiteContent(locale).suites.find((s) => s.slug === slug);
    if (localized) {
      return {
        path: canonicalPath,
        title: `${localized.title} ${seo.suiteTitleSuffix}`,
        description: `${localized.description} ${seo.suiteDescriptionSuffix}`,
        keywords: seo.suiteKeywords,
      };
    }
  }

  const pages: Record<string, PageSeoConfig> = {
    '/': { path: '/', ...seo.default },
    '/prenota': { path: '/prenota', ...seo.booking },
    '/la-pelosa': { path: '/la-pelosa', ...seo.pelosa },
    '/privacy-policy': { path: '/privacy-policy', ...seo.privacy, noindex: true },
    '/cookie-policy': { path: '/cookie-policy', ...seo.cookie, noindex: true },
  };

  const known = pages[path];
  if (known) {
    return { ...known, path: canonicalPath };
  }

  return {
    path: canonicalPath,
    title: `${siteConfig.name} ${seo.fallbackTitleSuffix}`,
    description: seo.default.description,
    keywords: seo.default.keywords,
  };
}

export function absoluteUrl(path: string): string {
  const base = SITE_URL.replace(/\/$/, '');
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}

export function buildLodgingSchema(locale: SiteLocale = 'it') {
  const copy = getLocaleCopy(locale);
  const { address } = siteConfig;

  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    '@id': `${absoluteUrl('/')}#lodging`,
    name: siteConfig.name,
    description: copy.seo.schemaDescription,
    url: absoluteUrl('/'),
    email: siteConfig.email,
    telephone: [siteConfig.phone, siteConfig.mobile],
    image: absoluteUrl(OG_IMAGE_PATH),
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      addressLocality: address.city,
      postalCode: address.postalCode,
      addressRegion: address.region,
      addressCountry: address.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteMapCoords.latitude,
      longitude: siteMapCoords.longitude,
    },
    hasMap: siteMapCoords.hasMapUrl,
    areaServed: [
      { '@type': 'City', name: 'Stintino' },
      { '@type': 'AdministrativeArea', name: 'Sassari' },
      { '@type': 'Place', name: 'North Sardinia' },
    ],
    containedInPlace: {
      '@type': 'Place',
      name: `Stintino, Sardinia, ${copy.addressCountry}`,
    },
    amenityFeature: copy.seo.schemaAmenities.map((name) => ({
      '@type': 'LocationFeatureSpecification',
      name,
      value: true,
    })),
    touristType: [...copy.seo.schemaTouristTypes],
    nearbyAttraction: copy.seo.nearbyAttractions.map((a) => ({
      '@type': 'TouristAttraction',
      name: a.name,
      description: a.description,
    })),
    numberOfRooms: 18,
    checkinTime: '15:00',
    checkoutTime: '10:00',
  };
}

export function buildWebSiteSchema(locale: SiteLocale = 'it') {
  const copy = getLocaleCopy(locale);

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${absoluteUrl('/')}#website`,
    name: siteConfig.name,
    description: copy.seo.schemaDescription,
    url: absoluteUrl('/'),
    inLanguage: locale,
    publisher: {
      '@type': 'LodgingBusiness',
      '@id': `${absoluteUrl('/')}#lodging`,
    },
  };
}

function breadcrumbLabelForPath(path: string, locale: SiteLocale): string | null {
  const copy = getLocaleCopy(locale);
  const { seo } = copy;

  if (path === '/') return null;
  if (path === '/prenota') return seo.booking.breadcrumb;
  if (path === '/la-pelosa') return copy.pelosa.hero.title;

  if (path.startsWith('/camere/')) {
    const slug = path.replace('/camere/', '');
    const suite = getSiteContent(locale).suites.find((s) => s.slug === slug);
    return suite?.title ?? null;
  }

  return null;
}

export function buildBreadcrumbSchema(pathname: string, locale: SiteLocale = 'it') {
  const path = normalizePathname(pathname).toLowerCase();
  const pageLabel = breadcrumbLabelForPath(path, locale);
  if (!pageLabel) return null;

  const copy = getLocaleCopy(locale);

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: copy.seo.breadcrumbHome,
        item: absoluteUrl('/'),
      },
      ...(path.startsWith('/camere/')
        ? [
            {
              '@type': 'ListItem',
              position: 2,
              name: copy.suitesIntro.title,
              item: `${absoluteUrl('/')}#suites`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: pageLabel,
              item: absoluteUrl(path),
            },
          ]
        : [
            {
              '@type': 'ListItem',
              position: 2,
              name: pageLabel,
              item: absoluteUrl(path),
            },
          ]),
    ],
  };
}

export function buildPageSchemas(pathname: string, locale: SiteLocale = 'it') {
  const schemas: Record<string, unknown>[] = [
    buildLodgingSchema(locale),
    buildWebSiteSchema(locale),
  ];

  const breadcrumb = buildBreadcrumbSchema(pathname, locale);
  if (breadcrumb) schemas.push(breadcrumb);

  return schemas;
}

export const lodgingSchema = buildLodgingSchema('it');
