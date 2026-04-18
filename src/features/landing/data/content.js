/** Highlights compatte per la sezione Residence (chip statistiche). */
export const residenceHighlights = [
  { value: 'Cala Lupo', label: 'Baia' },
  { value: '~2 km', label: 'Centro & Pelosa' },
  { value: '100 m', label: 'Calette' },
];

/** Dettagli in card: icon è un id per le SVG in AccordionSection. */
export const accordionItems = [
  {
    title: 'Baia di Cala Lupo',
    description:
      'Il Residence sorge nella baia di Cala Lupo, in una zona tranquilla a circa 2 km dal centro di Stintino e dalla celebre spiaggia della Pelosa.',
    icon: 'bay',
  },
  {
    title: '100 mt dalle Calette',
    description:
      "A soli 100 metri dal Residence trovi calette di sabbia intervallate da zone rocciose, con splendidi scorci sulla baia e sull'acqua cristallina del Nord Sardegna.",
    icon: 'coves',
  },
  {
    title: 'Collegamenti',
    description:
      'A 50 km dall’aeroporto di Alghero, 30 km dal porto di Porto Torres e 150 km dal porto e aeroporto di Olbia e dal porto di Golfo Aranci.',
    icon: 'routes',
  },
];

const GARDEN = '/Foto%202024%20camere%20Le%20Vele/vista%20giardino';
const SEA = '/Foto%202024%20camere%20Le%20Vele/vista%20mare';

const BASE_FEATURES = [
  'Angolo cucina attrezzato',
  'Tavolo e sedie',
  'Bagno con doccia',
  'TV a schermo piatto',
  'Wi-Fi gratuito',
  'Aria condizionata',
];

const CONFIGURATIONS = {
  two: {
    id: '2',
    guests: 2,
    label: 'Per 2 persone',
    shortLabel: '2 ospiti',
    beds: 'Letto matrimoniale',
    note: 'Configurazione ideale per coppie, con letto matrimoniale in camera.',
  },
  four: {
    id: '4',
    guests: 4,
    label: 'Per 4 persone',
    shortLabel: '4 ospiti',
    beds: 'Letto matrimoniale + divano letto matrimoniale in zona giorno',
    note: 'Perfetto per famiglie o piccoli gruppi: due posti letto aggiuntivi grazie al divano letto matrimoniale in zona giorno.',
  },
};

export const suites = [
  {
    slug: 'vista-giardino',
    title: 'Con Vista Giardino',
    kicker: 'Monolocale per 2 o 4 persone',
    description:
      'Monolocale con veranda coperta e accesso diretto al giardino privato: colazioni all’ombra, cene sotto il patio e il profumo della macchia mediterranea.',
    longDescription:
      'Ambiente unico luminoso, con zona notte, angolo cottura completamente attrezzato, zona pranzo e bagno privato con doccia. La veranda coperta si apre direttamente sul giardino privato arredato, ideale per colazioni all’ombra e cene sotto il patio.',
    image: `${GARDEN}/vista%20giardino%201.jpg`,
    gallery: [
      `${GARDEN}/vista%20giardino%201.jpg`,
      `${GARDEN}/esterno%20giardino.jpg`,
      `${GARDEN}/5.JPG`,
      `${GARDEN}/6.JPG`,
      `${GARDEN}/16.JPG`,
      `${GARDEN}/26.JPG`,
      `${GARDEN}/34.JPG`,
      `${GARDEN}/39.JPG`,
      `${GARDEN}/42.JPG`,
    ],
    features: [...BASE_FEATURES, 'Veranda coperta', 'Giardino privato'],
    configurations: [CONFIGURATIONS.two, CONFIGURATIONS.four],
    meta: { size: 'Studio', view: 'Giardino privato' },
  },
  {
    slug: 'vista-mare',
    title: 'Con Vista Mare',
    kicker: 'Monolocale per 2 o 4 persone',
    description:
      'Monolocale con terrazza privata e affaccio sulla baia: luce del Nord Sardegna al mattino, tramonti dorati verso la Pelosa alla sera.',
    longDescription:
      'Ambiente unico con zona notte, angolo cottura attrezzato, zona pranzo e bagno con doccia. La terrazza privata arredata è affacciata sulla baia di Cala Lupo, con la luce del Nord Sardegna al mattino e i tramonti verso la Pelosa.',
    image: `${SEA}/le_vele_residence_stintino_appartamenti_27.jpg`,
    gallery: [
      `${SEA}/le_vele_residence_stintino_appartamenti_27.jpg`,
      `${SEA}/9.JPG`,
      `${SEA}/14.JPG`,
      `${SEA}/20.JPG`,
      `${SEA}/22.JPG`,
      `${SEA}/27.JPG`,
      `${SEA}/33.JPG`,
      `${SEA}/36.JPG`,
      `${SEA}/40.JPG`,
    ],
    features: [...BASE_FEATURES, 'Terrazza privata', 'Vista mare'],
    configurations: [CONFIGURATIONS.two, CONFIGURATIONS.four],
    meta: { size: 'Studio', view: 'Vista mare' },
  },
];

export function getSuiteBySlug(slug) {
  return suites.find((s) => s.slug === slug) ?? null;
}

export const suiteFeatures = [
  '18 monolocali',
  'Cucina attrezzata',
  'Aria condizionata',
  'TV schermo piatto',
  'Wi-Fi gratuito',
  'Veranda o terrazza',
];

/**
 * Scene extra tra una tipologia e l'altra, per dare ritmo allo scroll orizzontale.
 * Senza didascalie per evitare descrizioni errate delle foto: le immagini parlano da sole.
 * `orientation`: 'portrait' | 'landscape'
 */
export const suiteScenes = {
  garden: [
    { src: `${GARDEN}/esterno%20giardino.jpg`, alt: 'Esterno con giardino', orientation: 'landscape' },
    { src: `${GARDEN}/39.JPG`, alt: 'Ambienti vista giardino', orientation: 'portrait' },
  ],
  sea: [
    { src: `${SEA}/14.JPG`, alt: 'Vista mare dalla camera', orientation: 'landscape' },
    { src: `${SEA}/9.JPG`, alt: 'Ambienti vista mare', orientation: 'portrait' },
  ],
};
