import { asset } from '../lib/assets';

const GARDEN = asset('/Foto%202024%20camere%20Le%20Vele/vista%20giardino');
const SEA = asset('/Foto%202024%20camere%20Le%20Vele/vista%20mare');
const CALA_LUPO = asset('/images/cala-lupo.png');
const LA_PELOSA = asset('/images/la-pelosa-spiaggia.png');
const ALGHERO_AIRPORT = asset('/images/alghero-aeroporto.png');
const OLBIA_PORT = asset('/images/olbia-porto.png');
const PETS = asset('/images/amici-4-zampe.png');
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
  footer: asset('/logo_le_vele_stintino_white.svg'),
} as const;

export const heroMedia = {
  video: asset('/Hero-Video.mp4'),
  poster: CALA_LUPO,
} as const;

export const residenceCardMedia = [
  {
    icon: 'bay' as const,
    image: CALA_LUPO,
  },
  {
    icon: 'pelosa' as const,
    image: LA_PELOSA,
    link: '/la-pelosa',
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
    slug: 'vista-giardino' as const,
    index: '01',
    theme: 'giardino' as const,
    image: `${GARDEN}/vista%20giardino%201.jpg`,
    gallery: [
      { src: `${GARDEN}/esterno%20giardino.jpg`, layout: 'wide' as const },
      { src: `${GARDEN}/39.JPG`, layout: 'tall' as const },
      { src: `${GARDEN}/24.JPG`, layout: 'tall' as const },
    ],
  },
  {
    slug: 'vista-mare' as const,
    index: '02',
    theme: 'mare' as const,
    image: `${SEA}/le_vele_residence_stintino_appartamenti_27.jpg`,
    gallery: [
      { src: `${SEA}/14.JPG`, layout: 'wide' as const },
      { src: `${SEA}/29.JPG`, layout: 'tall' as const },
      { src: `${SEA}/40.JPG`, layout: 'tall' as const },
    ],
  },
] as const;

export const galleryMedia = [
  { src: `${GARDEN}/esterno%20giardino.jpg` },
  { src: `${SEA}/14.JPG` },
  { src: `${GARDEN}/39.JPG` },
  { src: `${SEA}/le_vele_residence_stintino_appartamenti_27.jpg` },
] as const;

export const pelosaMedia = {
  video: asset('/videos/La-Pelosa-Hero.mp4'),
  poster: LA_PELOSA,
  gallery: [
    { src: `${PELOSA_DIR}/la-pelosa-drone.png`, layout: 'wide' as const },
    { src: `${PELOSA_DIR}/la-pelosa-aerial-road.png`, layout: 'tall' as const },
    { src: `${PELOSA_DIR}/la-pelosa-lagoon.png`, layout: 'tall' as const },
    { src: `${PELOSA_DIR}/la-pelosa-water-level.png`, layout: 'wide' as const },
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
