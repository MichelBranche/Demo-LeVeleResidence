import { asset } from '../lib/assets';

const GARDEN = asset('/Foto%202024%20camere%20Le%20Vele/vista%20giardino');
const SEA = asset('/Foto%202024%20camere%20Le%20Vele/vista%20mare');
const CALA_LUPO = asset('/images/cala-lupo.png');
const LA_PELOSA = asset('/images/la-pelosa-spiaggia.png');
const ALGHERO_AIRPORT = asset('/images/alghero-aeroporto.png');
const OLBIA_PORT = asset('/images/olbia-porto.png');

export const site = {
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
    country: 'Italia',
    countryCode: 'IT',
  },
} as const;

/** Coordinate e asset mappa (iframe solo con consent.preferences). */
export const siteMap = {
  latitude: 40.96913,
  longitude: 8.21387,
  embedQuery: 'Via+Le+Vele+10-12,+07040+Stintino+SS',
  hasMapUrl:
    'https://www.google.com/maps/search/?api=1&query=Residence+Le+Vele+Via+Le+Vele+10-12+Stintino',
  placeholderImage: CALA_LUPO,
  placeholderAlt: 'Baia di Cala Lupo — zona del Residence Le Vele a Stintino',
  badgeLabel: 'Residence Le Vele — Stintino',
  iframeTitle: 'Mappa interattiva — Residence Le Vele Stintino',
  enableLabel: 'Abilita mappa',
  enableHint:
    'La mappa interattiva Google utilizza cookie di terze parti. Attiva le preferenze per visualizzarla.',
} as const;

export const legalEntity = {
  name: 'Canessa Cantieri s.p.a.',
  address: {
    street: 'Piazza della Vittoria 6/6',
    city: '16121 Genova',
    country: 'Italia',
  },
} as const;

export const contactIntro = {
  eyebrow: 'Contattaci',
  title: 'Contatti',
  kicker:
    'Prenotazioni e richieste per appartamenti vacanze a Stintino: telefono, email e indicazioni per raggiungere il Residence Le Vele.',
} as const;

export const navLinks = [
  { label: 'Il Residence', to: '/#residence' },
  { label: 'Le Suites', to: '/#suites' },
  { label: 'La Pelosa', to: '/la-pelosa' },
  { label: 'Info & Servizi', to: '/#info-servizi' },
  { label: 'Contatti', to: '/#contatti' },
] as const;

/** Testo animato nel preloader (stile oliviaharperhomes.com) */
export const preloaderText = 'Residence Le Vele';

export const hero = {
  kicker: 'Sardegna, Nord-Ovest',
  title: "Oltre l'Orizzonte",
  titleLines: ['Oltre', "l'Orizzonte"] as const,
  tagline: 'La tua prossima vacanza, comincia qui …',
  lede:
    'Residence Le Vele a Stintino: appartamenti vacanze in Sardegna per soggiorni vicino al mare. Natura selvaggia, fondali limpidi e sabbia candida — uno dei mari più belli dell\'isola.',
  video: asset('/Hero-Video.mp4'),
  poster: CALA_LUPO,
} as const;

export const logo = {
  header: asset('/logo_le_vele_stintino_white.svg'),
  footer: asset('/logo_le_vele_stintino_white.svg'),
} as const;

export const residenceIntro = {
  eyebrow: 'Il residence',
  titleLine: 'Benvenuto al',
  titleBrand: 'Residence Le Vele',
  location: 'Cala Lupo',
  locationLabel: 'Baia · Stintino',
  kicker:
    'Tra Cala Lupo e il mare del Nord Sardegna, a pochi minuti da Stintino e dalla Pelosa.',
  lead:
    'Monolocali con veranda o terrazza nel verde della macchia mediterranea: appartamenti vacanze a Stintino, a pochi minuti da La Pelosa e dal mare del Nord Sardegna. Un residence tranquillo per chi cerca soggiorni autentici in Sardegna.',
} as const;

export const residenceHighlights = [
  { value: 'Cala Lupo', label: 'Baia' },
  { value: '~2 km', label: 'Centro & Pelosa' },
  { value: 'Iconica', label: 'La Pelosa' },
] as const;

export const residenceCards = [
  {
    title: 'Baia di Cala Lupo',
    description:
      'Il Residence sorge nella baia di Cala Lupo, in una zona tranquilla a circa 2 km dal centro di Stintino, tra macchia mediterranea e mare del Nord Sardegna.',
    icon: 'bay' as const,
    image: CALA_LUPO,
    imageAlt: 'Baia di Cala Lupo — spiaggia e mare turchese vicino al Residence',
  },
  {
    title: 'La Pelosa',
    description:
      'A pochi minuti dal Residence, La Pelosa è una delle spiagge più celebri del Mediterraneo: sabbia bianca finissima, acqua turchese trasparente e la storica Torre aragonese che emerge dal mare. Un’icona di Stintino, perfetta per una giornata al sole tra nuotate e passeggiate sulla riva.',
    icon: 'pelosa' as const,
    image: LA_PELOSA,
    imageAlt: 'La Pelosa — spiaggia e Torre della Pelosa, Stintino',
    link: '/la-pelosa',
    linkLabel: 'Scopri La Pelosa',
  },
  {
    title: 'Collegamenti',
    description:
      'Il Residence è facilmente raggiungibile dalle principali vie d’accesso del Nord Sardegna — in auto, in aereo o con i traghetti.',
    icon: 'routes' as const,
    routes: [
      { distance: '~50 km', label: 'Aeroporto di Alghero' },
      { distance: '~30 km', label: 'Porto di Porto Torres' },
      { distance: '~150 km', label: 'Porto e aeroporto di Olbia' },
      { distance: '~150 km', label: 'Porto di Golfo Aranci' },
    ],
    images: [
      {
        src: ALGHERO_AIRPORT,
        alt: 'Terminal aeroporto di Alghero',
        caption: 'Aeroporto di Alghero',
      },
      {
        src: OLBIA_PORT,
        alt: 'Vista aerea del porto di Olbia',
        caption: 'Porto di Olbia',
      },
    ],
  },
] as const;

export const suitesIntro = {
  eyebrow: 'Alloggi',
  title: 'Le Suites',
  count: '18',
  countLabel: 'monolocali',
  kicker: 'Due atmosfere — mare e giardino — per vivere Stintino con la privacy di un residence.',
} as const;

export const suites = [
  {
    slug: 'vista-giardino',
    index: '01',
    theme: 'giardino' as const,
    title: 'Con Vista Giardino',
    kicker: 'Monolocale per 2 o 4 persone',
    tagline: 'Veranda, giardino privato e quiete della macchia.',
    description:
      'Monolocale con veranda coperta e accesso diretto al giardino privato: colazioni all’ombra, cene sotto il patio e il profumo della macchia mediterranea.',
    image: `${GARDEN}/vista%20giardino%201.jpg`,
    features: ['Veranda coperta', 'Giardino privato', 'Angolo cucina', 'Wi-Fi gratuito'],
    gallery: [
      {
        src: `${GARDEN}/esterno%20giardino.jpg`,
        alt: 'Giardino privato del monolocale vista giardino — Residence Le Vele, Stintino',
        layout: 'wide' as const,
      },
      {
        src: `${GARDEN}/39.JPG`,
        alt: 'Veranda coperta e area esterna — appartamento vacanze Sardegna',
        layout: 'tall' as const,
      },
      {
        src: `${GARDEN}/24.JPG`,
        alt: 'Interno monolocale con angolo cucina — Residence Le Vele',
        layout: 'tall' as const,
      },
    ],
  },
  {
    slug: 'vista-mare',
    index: '02',
    theme: 'mare' as const,
    title: 'Con Vista Mare',
    kicker: 'Monolocale per 2 o 4 persone',
    tagline: 'Terrazza privata e luce sulla baia di Stintino.',
    description:
      'Monolocale con terrazza privata e affaccio sulla baia: luce del Nord Sardegna al mattino, tramonti dorati verso la Pelosa alla sera.',
    image: `${SEA}/le_vele_residence_stintino_appartamenti_27.jpg`,
    features: ['Terrazza privata', 'Vista mare', 'Aria condizionata', 'Wi-Fi gratuito'],
    gallery: [
      {
        src: `${SEA}/14.JPG`,
        alt: 'Terrazza con vista mare — monolocale Residence Le Vele, Stintino',
        layout: 'wide' as const,
      },
      {
        src: `${SEA}/29.JPG`,
        alt: 'Panorama dalla suite vista mare — Stintino, Sardegna',
        layout: 'tall' as const,
      },
      {
        src: `${SEA}/40.JPG`,
        alt: 'Dettaglio interno monolocale vista mare — Le Vele',
        layout: 'tall' as const,
      },
    ],
  },
] as const;

export const galleryImages = [
  {
    src: `${GARDEN}/esterno%20giardino.jpg`,
    alt: 'Giardino del Residence Le Vele a Stintino con macchia mediterranea',
  },
  {
    src: `${SEA}/14.JPG`,
    alt: 'Monolocale vista mare — Residence Le Vele, Stintino',
  },
  {
    src: `${GARDEN}/39.JPG`,
    alt: 'Area verde e veranda — appartamenti vacanze Sardegna',
  },
  {
    src: `${SEA}/le_vele_residence_stintino_appartamenti_27.jpg`,
    alt: 'Terrazza con vista mare al Residence Le Vele, Stintino',
  },
] as const;

export const offers = [
  {
    title: 'Pacchetto Coppia Relax',
    period: 'Primavera e inizio estate',
    badge: 'Signature',
    description:
      "3 notti in monolocale vista mare o giardino, welcome drink all'arrivo e late check-out su disponibilità.",
  },
  {
    title: 'Offerta Famiglia',
    period: 'Giugno – Settembre',
    badge: 'Family Choice',
    description:
      'Soggiorno in formula 4 ospiti con tariffa agevolata per permanenze settimanali e supporto dedicato per escursioni.',
  },
  {
    title: 'Stay Longer',
    period: 'Da 7 notti',
    badge: 'Best Value',
    description:
      'Sconto progressivo sulle notti aggiuntive per vivere Stintino con più tempo e senza fretta.',
  },
] as const;

const PELOSA_DIR = asset('/la-pelosa');

export const pelosaPage = {
  hero: {
    eyebrow: 'Stintino, Sardegna',
    title: 'La Pelosa',
    tagline: 'Una delle spiagge più celebri del Mediterraneo.',
    lede:
      'Sabbia bianca, acqua turchese e la Torre aragonese: un simbolo del Nord Sardegna a pochi minuti dal Residence Le Vele.',
    video: asset('/videos/La-Pelosa-Hero.mp4'),
    poster: LA_PELOSA,
    videoLabel: 'Video della spiaggia La Pelosa a Stintino',
  },
  intro: {
    eyebrow: 'La spiaggia',
    title: 'Famoso in tutto il mondo',
    lead:
      'La Pelosa si affaccia sulla punta nord-occidentale della Sardegna: spiaggia iconica di Stintino, a pochi minuti dal Residence Le Vele. Sabbia fine e mare dal turchese al blu intenso.',
    body:
      "In lontananza, l'isolotto della Torre della Pelosa è il simbolo iconico di Stintino. D'estate l'accesso è regolamentato per preservare l'ambiente: consigliamo di prenotare in anticipo e di arrivare con calma, soprattutto in alta stagione.",
    statValue: '~2 km',
    statLabel: 'Dal Residence Le Vele',
  },
  gallery: {
    title: 'Colori del Nord Sardegna',
    items: [
      {
        src: `${PELOSA_DIR}/la-pelosa-drone.png`,
        alt: 'Vista aerea della spiaggia La Pelosa, mare turchese e Torre della Pelosa',
        layout: 'wide' as const,
      },
      {
        src: `${PELOSA_DIR}/la-pelosa-aerial-road.png`,
        alt: "La Pelosa dall'alto: costa, ombrelloni e torre",
        layout: 'tall' as const,
      },
      {
        src: `${PELOSA_DIR}/la-pelosa-lagoon.png`,
        alt: 'Laguna e sabbia bianca a La Pelosa con mare cristallino',
        layout: 'tall' as const,
      },
      {
        src: `${PELOSA_DIR}/la-pelosa-water-level.png`,
        alt: "Mare turchese con Torre della Pelosa all'orizzonte",
        layout: 'wide' as const,
      },
    ],
  },
  cta: {
    eyebrow: 'Prenota',
    title: 'Il tuo soggiorno al Le Vele',
    text: 'Torna alla home per scoprire le suite, i servizi e le recensioni degli ospiti, oppure contattaci per disponibilità.',
    primaryLabel: 'Torna al Residence',
    primaryTo: '/',
    secondaryLabel: 'Contatti',
    secondaryTo: '/#contatti',
  },
} as const;

/** @deprecated Usare pelosaPage — mantenuto per compatibilità */
export const pelosa = {
  title: pelosaPage.hero.title,
  kicker: pelosaPage.hero.eyebrow,
  lede: pelosaPage.hero.lede,
  image: pelosaPage.hero.poster,
} as const;

export function getSuiteBySlug(slug: string) {
  return suites.find((s) => s.slug === slug) ?? null;
}
