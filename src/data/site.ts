/**
 * Configurazione statica e media — testi in src/i18n/locales/* via useSiteLocale().
 */
export {
  siteConfig as site,
  legalEntity,
  logo,
  heroMedia,
  siteMapCoords,
  suitesMedia,
  residenceWelcomeMedia,
  galleryMedia,
  pelosaMedia,
  residenceCardMedia,
  reviewLinks,
} from '../i18n/siteMedia';

import { getSiteContent as getContent } from '../i18n';

export function getSuiteBySlug(slug: string) {
  return getContent('it').suites.find((s) => s.slug === slug) ?? null;
}

/** @deprecated Usare useSiteLocale().content — mantenuto per import legacy */
import { getSiteContent } from '../i18n';

const legacy = getSiteContent('it');

export const contactIntro = legacy.contactIntro;
export const navLinks = legacy.navLinks;
export const preloaderText = legacy.preloaderText;
export const hero = {
  ...legacy.hero,
  video: legacy.heroMedia.video,
  poster: legacy.heroMedia.poster,
  title: legacy.hero.titleLines.join(' '),
};
export const siteMap = {
  ...legacy.siteMapCoords,
  ...legacy.siteMap,
  placeholderImage: legacy.siteMapCoords.placeholderImage,
};
export const residenceIntro = legacy.residenceIntro;
export const residenceHighlights = legacy.residenceHighlights;
export const residenceCards = legacy.residenceCardsMerged;
export const suitesIntro = legacy.suitesIntro;
export const suites = legacy.suites;
export const galleryImages = legacy.galleryImages;
export const offers = legacy.offers.items;
export const pelosaPage = {
  hero: {
    ...legacy.pelosa.hero,
    video: legacy.pelosaMedia.video,
    poster: legacy.pelosaMedia.poster,
  },
  intro: legacy.pelosa.intro,
  gallery: {
    title: legacy.pelosa.gallery.title,
    items: legacy.pelosaMedia.gallery.map((item, i) => ({
      ...item,
      alt: legacy.pelosa.gallery.imageAlts[i] ?? '',
    })),
  },
};
export const pelosa = {
  title: legacy.pelosa.hero.title,
  kicker: legacy.pelosa.hero.eyebrow,
  lede: legacy.pelosa.hero.lede,
  image: legacy.pelosaMedia.poster,
};
