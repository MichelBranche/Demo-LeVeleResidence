import { getSuiteBySlug, site, siteMap } from './site';

const SITE_URL = import.meta.env.VITE_SITE_URL ?? 'https://www.rtalevele.com';

export type PageSeoConfig = {
  path: string;
  title: string;
  description: string;
  keywords?: string;
  noindex?: boolean;
};

export const defaultSeo: PageSeoConfig = {
  path: '/',
  title: 'Residence Le Vele | Appartamenti vacanze a Stintino, Sardegna',
  description:
    'Residence Le Vele a Stintino: monolocali vista mare e giardino, soggiorni vicino a La Pelosa. Prenota il tuo appartamento vacanze in Sardegna.',
  keywords:
    'residence stintino, appartamenti vacanze sardegna, soggiorno vicino al mare, la pelosa, cala lupo, monolocali stintino',
};

export const pageSeo: Record<string, PageSeoConfig> = {
  '/': defaultSeo,
  '/la-pelosa': {
    path: '/la-pelosa',
    title: 'La Pelosa Stintino | Residence Le Vele — Spiaggia e mare',
    description:
      'La Pelosa a Stintino: una delle spiagge più belle della Sardegna, a pochi minuti dal Residence Le Vele. Scopri mare turchese, sabbia bianca e la Torre aragonese.',
    keywords: 'la pelosa stintino, spiaggia stintino, residence le vele, mare sardegna',
  },
  '/privacy-policy': {
    path: '/privacy-policy',
    title: 'Privacy Policy | Residence Le Vele Stintino',
    description: 'Informativa privacy e trattamento dati personali del Residence Le Vele a Stintino.',
    noindex: true,
  },
  '/cookie-policy': {
    path: '/cookie-policy',
    title: 'Cookie Policy | Residence Le Vele Stintino',
    description: 'Cookie policy e gestione del consenso del sito Residence Le Vele.',
    noindex: true,
  },
};

export function getSeoForPath(pathname: string, search = ''): PageSeoConfig {
  const path = pathname.toLowerCase();

  if (path.startsWith('/camere/')) {
    const slug = path.replace('/camere/', '');
    const suite = getSuiteBySlug(slug);
    if (suite) {
      return {
        path: `${path}${search}`,
        title: `${suite.title} | Residence Le Vele — Appartamenti Stintino`,
        description: `${suite.description} Prenota il monolocale a Stintino, vicino a La Pelosa.`,
        keywords: 'monolocale stintino, appartamenti vacanze sardegna, residence le vele',
      };
    }
  }

  return pageSeo[path] ?? {
    ...defaultSeo,
    path: `${path}${search}`,
    title: `${site.name} | Stintino, Sardegna`,
  };
}

export function absoluteUrl(path: string): string {
  const base = SITE_URL.replace(/\/$/, '');
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}

const nearbyAttractions = [
  {
    '@type': 'TouristAttraction',
    name: 'La Pelosa',
    description: 'Spiaggia iconica di Stintino, a circa 2 km dal residence.',
  },
  {
    '@type': 'TouristAttraction',
    name: 'Baia di Cala Lupo',
    description: 'Baia tranquilla dove sorge il Residence Le Vele.',
  },
  {
    '@type': 'TouristAttraction',
    name: 'Centro storico di Stintino',
    description: 'Borgo marinaresco del Nord Sardegna, vicino al residence.',
  },
] as const;

export function buildLodgingSchema() {
  const { address } = site;

  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    '@id': `${absoluteUrl('/')}#lodging`,
    name: site.name,
    description: defaultSeo.description,
    url: absoluteUrl('/'),
    email: site.email,
    telephone: [site.phone, site.mobile],
    image: absoluteUrl('/logo_le_vele_stintino_white.svg'),
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
      latitude: siteMap.latitude,
      longitude: siteMap.longitude,
    },
    hasMap: siteMap.hasMapUrl,
    areaServed: [
      { '@type': 'City', name: 'Stintino' },
      { '@type': 'AdministrativeArea', name: 'Sassari' },
      { '@type': 'Place', name: 'Nord Sardegna' },
    ],
    containedInPlace: {
      '@type': 'Place',
      name: 'Stintino, Sardegna, Italia',
    },
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Wi-Fi gratuito', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Aria condizionata', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Veranda o terrazza', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Giardino privato', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Angolo cucina', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Vista mare', value: true },
    ],
    touristType: ['Famiglie', 'Coppie', 'Escursionisti'],
    nearbyAttraction: nearbyAttractions,
    numberOfRooms: 18,
    checkinTime: '15:00',
    checkoutTime: '10:00',
  };
}

/** @deprecated Usare buildLodgingSchema() */
export const lodgingSchema = buildLodgingSchema();
