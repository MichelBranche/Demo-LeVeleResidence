import { asset } from '../lib/assets';
import { getHeroVideoUrl } from '../lib/heroVideo';

const GARDEN = asset('/Foto%202024%20camere%20Le%20Vele/vista%20giardino');
const SEA = asset('/Foto%202024%20camere%20Le%20Vele/vista%20mare');
const BATH = asset('/Foto%202024%20camere%20Le%20Vele/bagni');
const CALA_LUPO = asset('/images/cala-lupo.webp');
const CALA_LUPO_RESIDENCE = asset('/images/cala-lupo-residence.webp');
const HERO_VIDEO_POSTER = asset('/images/hero-video-poster.webp');
const LA_PELOSA = asset('/images/la-pelosa-spiaggia.webp');
const ALGHERO_AIRPORT = asset('/images/alghero-aeroporto.webp');
const PORTO_TORRES = asset('/images/porto-torres.webp');
const RESIDENCE_WELCOME = asset('/images/residence-welcome');
const DRONE_PANORAMA = asset('/images/dintorni/drone-panorama.webp');
const DRONE_RESIDENCE = asset('/images/dintorni/drone-residence.webp');
const DRONE_TRAMONTO = asset('/images/dintorni/drone-tramonto.webp');
const PETS = asset('/images/amici-4-zampe.webp');
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
  /** Fotogramma del video al punto di partenza (offset), per handoff senza salto. */
  poster: HERO_VIDEO_POSTER,
} as const;

export const residenceCardMedia = [
  {
    icon: 'pelosa' as const,
    image: LA_PELOSA,
    link: '/la-pelosa',
  },
  {
    icon: 'bay' as const,
    image: CALA_LUPO_RESIDENCE,
  },
  {
    icon: 'drone' as const,
    images: [
      { src: DRONE_PANORAMA },
      { src: DRONE_RESIDENCE },
      { src: DRONE_TRAMONTO },
    ],
  },
  {
    icon: 'routes' as const,
    images: [
      { src: ALGHERO_AIRPORT },
      { src: PORTO_TORRES },
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
    cardImagePosition: 'center 42%',
    cardImageNight: `${SEA}/vista-mare-notte.webp`,
    cardImageNightPosition: 'center 42%',
    image: `${SEA}/vista-mare-hero.webp`,
    gallery: [
      { src: `${SEA}/le_vele_residence_stintino_appartamenti_26.webp`, layout: 'wide' as const },
      { src: `${SEA}/le_vele_residence_stintino_appartamenti_27.webp`, layout: 'tall' as const },
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
    cardImage: `${GARDEN}/giardino-privato-lead.webp`,
    cardImagePosition: 'center 38%',
    cardImageNight: `${GARDEN}/vista-giardino-notte.webp`,
    cardImageNightPosition: 'center 38%',
    image: `${GARDEN}/giardino-hero.webp`,
    gallery: [
      { src: `${GARDEN}/giardino-privato-lead.webp`, layout: 'wide' as const },
      { src: `${GARDEN}/terrazza-giardino-vista-mare.webp`, layout: 'wide' as const },
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

/** Welcome gallery in #residence — horizontal scroll showcase (drone + terraces + sea). */
export const residenceWelcomeMedia = [
  { src: `${RESIDENCE_WELCOME}/drone-residence-tramonto.webp` },
  { src: `${RESIDENCE_WELCOME}/terrazza-tavolo-mare.webp` },
  { src: `${RESIDENCE_WELCOME}/drone-residence-mare.webp` },
  { src: `${RESIDENCE_WELCOME}/terrazze-pergolato.webp` },
  { src: `${RESIDENCE_WELCOME}/barca-vela-mare.webp` },
  { src: `${RESIDENCE_WELCOME}/piazzetta-gazebi.webp` },
  { src: `${RESIDENCE_WELCOME}/drone-costa-piscina.webp` },
] as const;

/** @deprecated Use residenceWelcomeMedia */
export const galleryMedia = residenceWelcomeMedia;

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
