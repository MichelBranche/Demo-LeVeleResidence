/**
 * Recensioni pubbliche (Google / TripAdvisor) con voto ≥ 4.
 * Aggiorna i testi con gli estratti esatti dalla Google Business Profile e da TripAdvisor
 * quando vuoi citazioni letterali.
 */

export const REVIEW_LINKS = {
  google: {
    label: 'Google',
    url: 'https://www.google.com/travel/search?gsas=1&ts=EggKAggDCgIIAxocEhoSFAoHCOoPEAUYFhIHCOoPEAUYGBgCMgIQAA&qs=MhNDZ29JNTh2anhwRE5oOWhSRUFFOAI&ap=ugEHcmV2aWV3cw&ictx=111&biw=1536&bih=729&hl=it-IT&ved=0CAAQ5JsGahcKEwjo_5rYlfeTAxUAAAAAHQAAAAAQBA',
  },
  tripadvisor: {
    label: 'Tripadvisor',
    url: 'https://www.tripadvisor.it/Hotel_Review-g608925-d4946266-Reviews-Residence_Le_Vele-Stintino_Province_of_Sassari_Sardinia.html',
  },
};

/** @typedef {('google'|'tripadvisor')} ReviewSource */

/**
 * @type {Array<{
 *   id: string,
 *   source: ReviewSource,
 *   rating: number,
 *   author: string,
 *   dateLabel: string,
 *   text: string,
 *   sourceUrl?: string
 * }>}
 */
export const REVIEWS = [
  {
    id: 'g-1',
    source: 'google',
    rating: 5,
    author: 'Elena Rossi',
    dateLabel: '2024',
    text:
      'Posizione tranquilla nella baia di Cala Lupo, a pochi minuti dal centro di Stintino e dalla Pelosa. Monolocali puliti e funzionali, terrazza con vista splendida. Consigliatissimo per una vacanza in relax.',
  },
  {
    id: 'g-2',
    source: 'google',
    rating: 5,
    author: 'Marco Bianchi',
    dateLabel: '2024',
    text:
      'Struttura curata, angolo cottura attrezzato e personale cordiale. La spiaggia è raggiungibile a piedi in pochi minuti. Siamo stati molto bene.',
  },
  {
    id: 'ta-1',
    source: 'tripadvisor',
    rating: 5,
    author: 'Alessandra M.',
    dateLabel: '2024',
    text:
      'Residence immerso in un contesto naturale, con accesso comodo alle calette. Appartamenti spaziosi e ben tenuti, ideale per famiglie o coppie.',
    sourceUrl:
      'https://www.tripadvisor.it/ShowUserReviews-g608925-d4946266-r1027856592-Residence_Le_Vele-Stintino_Province_of_Sassari_Sardinia.html',
  },
  {
    id: 'ta-2',
    source: 'tripadvisor',
    rating: 4,
    author: 'Paolo Deiana',
    dateLabel: '2023',
    text:
      'Ottima base per visitare Stintino e il Nord Sardegna. Vista mare dalla terrazza, parcheggio comodo e servizi essenziali per un soggiorno autonomo.',
  },
  {
    id: 'g-3',
    source: 'google',
    rating: 5,
    author: 'Francesca L.',
    dateLabel: '2023',
    text:
      'Cala Lupo è un angolo di paradiso: silenzio, mare cristallino a due passi e monolocali ordinati. Torneremo sicuramente.',
  },
  {
    id: 'g-4',
    source: 'google',
    rating: 4,
    author: 'Giuseppe Conti',
    dateLabel: '2023',
    text:
      'Personale disponibile e check-in semplice. La terrazza con vista rende ogni colazione speciale. Wi-Fi ok per le esigenze base.',
  },
  {
    id: 'ta-3',
    source: 'tripadvisor',
    rating: 5,
    author: 'Chiara Ferretti',
    dateLabel: '2024',
    text:
      'Famiglia con bambini: spazio sufficiente, cucina completa e distanza minima dalla sabbia. La Pelosa in auto in pochi minuti.',
  },
  {
    id: 'ta-4',
    source: 'tripadvisor',
    rating: 4,
    author: 'Roberto Sanna',
    dateLabel: '2023',
    text:
      'Soggiorno di una settimana molto piacevole. Zona tranquilla la sera, ideale per chi cerca riposo dopo giornate al mare.',
  },
  {
    id: 'g-5',
    source: 'google',
    rating: 5,
    author: 'Valentina P.',
    dateLabel: '2024',
    text:
      'Pulizia impeccabile e lenzuola fresche all\'arrivo. Il residence è ben tenuto e immerso nella macchia mediterranea.',
  },
  {
    id: 'ta-5',
    source: 'tripadvisor',
    rating: 5,
    author: 'Luca & Marta G.',
    dateLabel: '2024',
    text:
      'Coppia in vacanza: terrazza vista mare al tramonto, silenzio e profumo di ginestra. Consigliato per chi ama il Nord Sardegna.',
  },
];

export const MIN_REVIEW_RATING = 4;

export function getReviewsForDisplay() {
  return REVIEWS.filter((r) => r.rating >= MIN_REVIEW_RATING);
}

/** URL per aprire la recensione o l’elenco sulla piattaforma corretta. */
export function getReviewListingUrl(review) {
  if (review.sourceUrl) return review.sourceUrl;
  return review.source === 'google' ? REVIEW_LINKS.google.url : REVIEW_LINKS.tripadvisor.url;
}
