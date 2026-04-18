const GARDEN = '/Foto%202024%20camere%20Le%20Vele/vista%20giardino';
const SEA = '/Foto%202024%20camere%20Le%20Vele/vista%20mare';

/** Link per il menu (SPA): route dedicate o ancore sulla home. */
export function getMenuItemHref(item) {
  if (item.path) return item.path;
  if (item.sectionId) return `/#${item.sectionId}`;
  return '/';
}

/** Ordine = ordine di scroll nella landing (dall’alto al basso). */
export const MENU_NAV_ITEMS = [
  {
    id: 'hero',
    label: 'Inizio.',
    sectionId: 'hero',
    previewSrc: `${SEA}/le_vele_residence_stintino_appartamenti_27.jpg`,
    previewCaption: 'Benvenuto al Residence',
  },
  {
    id: 'circle-reveal',
    label: 'Sardegna.',
    sectionId: 'circle-reveal',
    previewSrc: '/foto-preview/sardegna-cliff.jpg',
    previewCaption: 'Rallenta il ritmo',
  },
  {
    id: 'residence',
    label: 'Il Residence.',
    sectionId: 'residence',
    previewSrc: `${GARDEN}/esterno%20giardino.jpg`,
    previewCaption: 'La struttura e il giardino',
  },
  {
    id: 'suites',
    label: 'Le Suites.',
    sectionId: 'horizontal-section',
    previewSrc: `${SEA}/le_vele_residence_stintino_appartamenti_27.jpg`,
    previewCaption: 'Vista mare e giardino',
  },
  {
    id: 'informazioni',
    label: 'Info & Servizi.',
    sectionId: 'info-servizi',
    previewSrc: `${GARDEN}/esterno%20giardino.jpg`,
    previewCaption: 'Arrivi e partenze',
  },
  {
    id: 'pelosa',
    label: 'La Pelosa.',
    path: '/la-pelosa',
    previewSrc: '/la-pelosa/la-pelosa-drone.png',
    previewCaption: 'Spiaggia e torre della Pelosa',
  },
  {
    id: 'contatti',
    label: 'Contatti.',
    sectionId: 'contatti',
    previewSrc: `${GARDEN}/vista%20giardino%201.jpg`,
    previewCaption: 'Telefono e indirizzo',
  },
  {
    id: 'site-footer',
    label: 'Mappa.',
    sectionId: 'site-footer',
    previewSrc: `${GARDEN}/esterno%20giardino.jpg`,
    previewCaption: 'Dove siamo a Stintino',
  },
];

export function sectionIdToMenuKey(sectionId) {
  const map = {
    hero: 'hero',
    'circle-reveal': 'circle-reveal',
    residence: 'residence',
    'horizontal-section': 'suites',
    'info-servizi': 'informazioni',
    recensioni: null,
    contatti: 'contatti',
    'site-footer': 'site-footer',
  };
  return map[sectionId] ?? null;
}
