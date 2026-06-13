import { asset } from '../lib/assets';
import { getHeroVideoUrl } from '../lib/heroVideo';

const GARDEN = asset('/Foto%202024%20camere%20Le%20Vele/vista%20giardino');
const SEA = asset('/Foto%202024%20camere%20Le%20Vele/vista%20mare');
const BATH = asset('/Foto%202024%20camere%20Le%20Vele/bagni');
const CALA_LUPO = asset('/images/cala-lupo.webp');
const ZONA_COMUNE = asset('/images/zona-comune.webp');
const LA_PELOSA = asset('/images/la-pelosa-spiaggia.webp');
const ALGHERO_AIRPORT = asset('/images/alghero-aeroporto.webp');
const OLBIA_PORT = asset('/images/olbia-porto.webp');
const PETS = asset('/images/amici-4-zampe.webp');
const ATMOSFERA = asset('/images/atmosfera');
const CONTATTI = asset('/images/contatti');
const PELOSA_DIR = asset('/la-pelosa');

export const siteConfig = {
  name: 'Residence Le Vele',
  tagline: 'Stintino, Sardegna',
  email: 'info@rtalevele.com',
  phone: '+39 079 523495',
  mobile: '+39 389 4425660',
  address: {
    street: 'Le Vele 10-12',
    city: 'Stintino',
    postalCode: '07040',
    region: 'SS',
    countryCode: 'IT',
  },
} as const;

export const legalEntity = {
  name: 'Residence Le Vele',
  vatId: '00277840104',
  cin: 'IT090089A1000F2423',
  address: {
    street: 'Le Vele 10-12',
    postalCode: '07040',
    city: 'Stintino',
    region: 'SS',
  },
} as const;

export const siteLegal = {
  vatId: legalEntity.vatId,
  cin: legalEntity.cin,
  countryLabel: 'ITALY',
  instagramUrl: 'https://www.instagram.com/residencelevele_stintino/',
} as const;

export const siteMapCoords = {
  latitude: 40.96913,
  longitude: 8.21387,
  embedQuery: 'Via+Le+Vele+10-12,+07040+Stintino+SS',
  hasMapUrl:
    'https://www.google.com/maps/search/?api=1&query=Residence+Le+Vele+Via+Le+Vele+10-12+Stintino',
  placeholderImage: CALA_LUPO,
} as const;

export const logo = {
  header: asset('/logo_le_vele_stintino_white.svg'),
  headerOnLight: asset('/logo_le_vele_stintino_ink.svg'),
  footer: asset('/logo_le_vele_stintino_white.svg'),
} as const;

export const heroMedia = {
  video: getHeroVideoUrl(),
  poster: CALA_LUPO,
} as const;

export const residenceCardMedia = [
  {
    icon: 'pelosa' as const,
    image: LA_PELOSA,
    link: '/la-pelosa',
  },
  {
    icon: 'bay' as const,
    image: CALA_LUPO,
  },
  {
    icon: 'routes' as const,
    images: [
      { src: ALGHERO_AIRPORT },
      { src: OLBIA_PORT },
    ],
  },
  {
    icon: 'pets' as const,
    image: PETS,
  },
] as const;

export const suitesMedia = [
  {
    slug: 'vista-mare' as const,
    index: '01',
    theme: 'mare' as const,
    cardImage: `${SEA}/le_vele_residence_stintino_appartamenti_26.webp`,
    cardImagePosition: 'center 38%',
    image: `${SEA}/vista-mare-hero.webp`,
    gallery: [
      { src: `${SEA}/le_vele_residence_stintino_appartamenti_26.webp`, layout: 'wide' as const },
      { src: `${SEA}/le_vele_residence_stintino_appartamenti_27.webp`, layout: 'tall' as const },
      { src: `${SEA}/le_vele_residence_stintino_appartamenti_08.webp`, layout: 'tall' as const },
      { src: `${SEA}/dettaglio-vista-mare-interno.webp`, layout: 'wide' as const },
      { src: `${SEA}/monolocale-mare-1.webp`, layout: 'wide' as const },
      { src: `${SEA}/vista-mare-terrazza.webp`, layout: 'wide' as const },
      { src: `${SEA}/dettaglio-vista-mare-moka.webp`, layout: 'wide' as const },
      { src: `${SEA}/letto-vista-mare.webp`, layout: 'tall' as const },
      { src: `${SEA}/dettagli-vista-mare.webp`, layout: 'tall' as const },
      { src: `${SEA}/angolo-cucina-vista-mare.webp`, layout: 'wide' as const },
      { src: `${SEA}/letto-castello-mare.webp`, layout: 'tall' as const },
      { src: `${SEA}/29.webp`, layout: 'tall' as const },
      { src: `${SEA}/14.webp`, layout: 'wide' as const },
      { src: `${SEA}/40.webp`, layout: 'tall' as const },
      { src: `${BATH}/bagno-lavabo.webp`, layout: 'tall' as const },
      { src: `${BATH}/bagno-doccia-ampia-2.webp`, layout: 'wide' as const },
    ],
  },
  {
    slug: 'vista-giardino' as const,
    index: '02',
    theme: 'giardino' as const,
    cardImage: `${GARDEN}/vista_giardino_1.webp`,
    cardImagePosition: 'center 48%',
    image: `${GARDEN}/giardino-hero.webp`,
    gallery: [
      { src: `${GARDEN}/giardino-privato-lead.webp`, layout: 'wide' as const },
      { src: `${GARDEN}/terrazza-giardino-vista-mare.webp`, layout: 'wide' as const },
      { src: `${GARDEN}/monolocale-giardino.webp`, layout: 'wide' as const },
      { src: `${GARDEN}/veranda-giardino-tavolo.webp`, layout: 'wide' as const },
      { src: `${GARDEN}/colazione-giardino-moka.webp`, layout: 'wide' as const },
      { src: `${GARDEN}/camera-giardino-bagno.webp`, layout: 'wide' as const },
      { src: `${GARDEN}/dettaglio-letto-giardino.webp`, layout: 'tall' as const },
      { src: `${GARDEN}/letto-castello-giardino.webp`, layout: 'tall' as const },
      { src: `${GARDEN}/39.webp`, layout: 'tall' as const },
      { src: `${GARDEN}/esterno%20giardino.webp`, layout: 'wide' as const },
      { src: `${GARDEN}/24.webp`, layout: 'tall' as const },
      { src: `${BATH}/bagno-lavabo.webp`, layout: 'tall' as const },
      { src: `${BATH}/bagno-doccia-ampia-1.webp`, layout: 'wide' as const },
    ],
  },
] as const;

export const galleryMedia = [
  { src: `${ATMOSFERA}/drone-residence.webp` },
  { src: `${ATMOSFERA}/dettaglio-vista-mare.webp` },
  { src: `${GARDEN}/esterno%20giardino.webp` },
  { src: `${ATMOSFERA}/vista-mare.webp` },
  { src: `${SEA}/14.webp` },
  { src: `${ATMOSFERA}/dettaglio-giardino.webp` },
  { src: `${SEA}/le_vele_residence_stintino_appartamenti_27.webp` },
  { src: `${GARDEN}/39.webp` },
  { src: `${ATMOSFERA}/dettaglio-vista-giardino.webp` },
  { src: `${SEA}/le_vele_residence_stintino_appartamenti_08.webp` },
  { src: ZONA_COMUNE },
] as const;

export const contactMedia = [
  { src: `${CONTATTI}/contatti-drone-costa.webp` },
  { src: `${CONTATTI}/contatti-drone-tramonto.webp` },
  { src: `${CONTATTI}/contatti-drone-residence.webp` },
] as const;

export const pelosaMedia = {
  video: asset('/videos/La-Pelosa-Hero.mp4'),
  poster: LA_PELOSA,
  gallery: [
    { src: `${PELOSA_DIR}/la-pelosa-drone.webp`, layout: 'wide' as const },
    { src: `${PELOSA_DIR}/la-pelosa-aerial-road.webp`, layout: 'tall' as const },
    { src: `${PELOSA_DIR}/la-pelosa-lagoon.webp`, layout: 'tall' as const },
    { src: `${PELOSA_DIR}/la-pelosa-water-level.webp`, layout: 'wide' as const },
  ],
} as const;

export const reviewLinks = {
  google: {
    url: 'https://www.google.com/travel/search?gsas=1&ts=EggKAggDCgIIAxocEhoSFAoHCOoPEAUYFhIHCOoPEAUYGBgCMgIQAA&qs=MhNDZ29JNTh2anhwRE5oOWhSRUFFOAI&ap=ugEHcmV2aWV3cw&ictx=111&biw=1536&bih=729&hl=it-IT&ved=0CAAQ5JsGahcKEwjo_5rYlfeTAxUAAAAAHQAAAAAQBA',
  },
  tripadvisor: {
    url: 'https://www.tripadvisor.it/Hotel_Review-g608925-d4946266-Reviews-Residence_Le_Vele-Stintino_Province_of_Sassari_Sardinia.html',
  },
} as const;

export const reviewSourceUrls: Record<string, string | undefined> = {
  'ta-1':
    'https://www.tripadvisor.it/ShowUserReviews-g608925-d4946266-r1027856592-Residence_Le_Vele-Stintino_Province_of_Sassari_Sardinia.html',
};
