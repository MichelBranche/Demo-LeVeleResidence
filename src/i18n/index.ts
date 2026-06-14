import type { SiteLocale } from '../lib/siteLocales';
import { getNavLinks, headerUiCopy } from '../data/navCopy';
import { getLocaleCopyCached } from './localeLoader';
import {
  contactMedia,
  galleryMedia,
  heroMedia,
  legalEntity,
  logo,
  pelosaMedia,
  residenceCardMedia,
  reviewLinks,
  reviewSourceUrls,
  siteConfig,
  siteLegal,
  siteMapCoords,
  suitesMedia,
} from './siteMedia';
import type { LocaleCopy, ReviewCopy } from './types';

export type { LocaleCopy, ReviewCopy, SiteLocale };
export { ensureLocaleLoaded, getLocaleCopyCached, isLocaleLoaded } from './localeLoader';

export function getLocaleCopy(locale: SiteLocale): LocaleCopy {
  return getLocaleCopyCached(locale);
}

export type MergedSuite = {
  slug: (typeof suitesMedia)[number]['slug'];
  index: string;
  theme: (typeof suitesMedia)[number]['theme'];
  cardImage: string;
  cardImagePosition: string;
  cardImageNight: string;
  cardImageNightPosition: string;
  image: string;
  title: string;
  kicker: string;
  tagline: string;
  description: string;
  features: string[];
  listLabel: string;
  discoverAria: string;
  exploreCta: string;
  galleryKicker: string;
  galleryTitle: string;
  gallery: { src: string; alt: string; layout: 'wide' | 'tall' }[];
};

export type SiteContent = Omit<LocaleCopy, 'suites'> & {
  navLinks: ReturnType<typeof getNavLinks>;
  headerUi: (typeof headerUiCopy)[SiteLocale];
  config: typeof siteConfig;
  siteLegal: typeof siteLegal;
  legalEntity: typeof legalEntity;
  logo: typeof logo;
  heroMedia: typeof heroMedia;
  siteMapCoords: typeof siteMapCoords;
  reviewLinks: typeof reviewLinks;
  suites: MergedSuite[];
  galleryImages: { src: string; alt: string }[];
  contactPhotos: { src: string; alt: string }[];
  pelosaMedia: typeof pelosaMedia;
  residenceCardsMerged: Array<{
    icon: (typeof residenceCardMedia)[number]['icon'];
    title: string;
    description: string;
    image?: string;
    imageAlt?: string;
    link?: string;
    linkLabel?: string;
    routes?: { distance: string; label: string }[];
    images?: { src: string; alt: string; caption: string }[];
  }>;
};

export function getSiteContent(locale: SiteLocale): SiteContent {
  const copy = getLocaleCopy(locale);

  const suites: MergedSuite[] = suitesMedia.flatMap((media) => {
    const text = copy.suites[media.slug];
    if (!text) return [];
    return [{
      slug: media.slug,
      index: media.index,
      theme: media.theme,
      cardImage: media.cardImage,
      cardImagePosition: media.cardImagePosition,
      cardImageNight: media.cardImageNight,
      cardImageNightPosition: media.cardImageNightPosition,
      image: media.image,
      title: text.title,
      kicker: text.kicker,
      tagline: text.tagline,
      description: text.description,
      features: [...text.features],
      listLabel: text.listLabel,
      discoverAria: text.discoverAria,
      exploreCta: text.exploreCta,
      galleryKicker: text.galleryKicker,
      galleryTitle: text.galleryTitle,
      gallery: (media.gallery ?? []).map((item, i) => ({
        src: item.src,
        layout: item.layout,
        alt: text.galleryAlts[i] ?? '',
      })),
    }];
  });

  const galleryImages = galleryMedia.map((item, i) => ({
    src: item.src,
    alt: copy.gallery.imageAlts[i] ?? '',
  }));

  const contactPhotos = contactMedia.map((item, i) => ({
    src: item.src,
    alt: copy.contactPhotoAlts[i] ?? '',
  }));

  const residenceCardsMerged = residenceCardMedia.map((media, i) => {
    const text = copy.residenceCards[i];
    if (!text) {
      return { icon: media.icon, title: '', description: '' };
    }
    const base = {
      icon: media.icon,
      title: text.title,
      description: text.description,
      imageAlt: text.imageAlt,
      linkLabel: text.linkLabel,
      routes: text.routes ? [...text.routes] : undefined,
    };
    if ('image' in media) {
      return { ...base, image: media.image, link: 'link' in media ? media.link : undefined };
    }
    if ('images' in media && text.images) {
      return {
        ...base,
        images: media.images.map((img, j) => ({
          src: img.src,
          alt: text.images![j]?.alt ?? '',
          caption: text.images![j]?.caption ?? '',
        })),
      };
    }
    return base;
  });

  return {
    ...copy,
    navLinks: getNavLinks(locale),
    headerUi: headerUiCopy[locale],
    config: siteConfig,
    siteLegal,
    legalEntity,
    logo,
    heroMedia,
    siteMapCoords,
    reviewLinks,
    suites,
    galleryImages,
    contactPhotos,
    pelosaMedia,
    residenceCardsMerged,
  };
}

export function getSuiteBySlug(locale: SiteLocale, slug: string) {
  return getSiteContent(locale).suites.find((s) => s.slug === slug) ?? null;
}

export function getReviewsForDisplay(locale: SiteLocale) {
  return getLocaleCopy(locale).reviews.items.filter((r) => r.rating >= 4);
}

export function getReviewListingUrl(review: ReviewCopy) {
  if (reviewSourceUrls[review.id]) return reviewSourceUrls[review.id];
  return review.source === 'google' ? reviewLinks.google.url : reviewLinks.tripadvisor.url;
}

export function formatCopy(template: string, vars: Record<string, string>) {
  return Object.entries(vars).reduce(
    (acc, [key, value]) => acc.replaceAll(`{${key}}`, value),
    template,
  );
}
