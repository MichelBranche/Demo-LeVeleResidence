import type { LocaleCopy } from '../types';

export const it: LocaleCopy = {
  preloaderText: 'Residence Le Vele',
  addressCountry: 'Italia',
  hero: {
    kicker: 'Sardegna, Nord-Ovest',
    titleLines: ['Oltre', "l'Orizzonte"],
    tagline: 'La tua prossima vacanza, comincia qui …',
    lede:
      "Residence Le Vele a Stintino: appartamenti vacanze in Sardegna per soggiorni vicino al mare. Natura selvaggia, fondali limpidi e sabbia candida — uno dei mari più belli dell'isola.",
    scrollAria: 'Scorri verso il Residence',
    scrollLabel: 'Scorri',
    videoAria: 'Video panoramico della Sardegna — Residence Le Vele Stintino',
  },
  residenceIntro: {
    eyebrow: 'Il residence',
    titleLine: 'Benvenuto al',
    titleBrand: 'Residence Le Vele',
    location: 'Cala Lupo',
    locationLabel: 'Baia · Stintino',
    kicker: 'Tra Cala Lupo e il mare del Nord Sardegna, a pochi minuti da Stintino e dalla Pelosa.',
    lead:
      'Monolocali con veranda o terrazza nel verde della macchia mediterranea: appartamenti vacanze a Stintino, a pochi minuti da La Pelosa e dal mare del Nord Sardegna. Un residence tranquillo per chi cerca soggiorni autentici in Sardegna.',
    marquee: ['Cala Lupo', 'La Pelosa', 'Calette', 'Nord Sardegna', 'Stintino'],
    metricsAria: 'In sintesi',
  },
  residenceHighlights: [
    { value: 'Cala Lupo', label: 'Baia' },
    { value: '~2 km', label: 'Centro & Pelosa' },
    { value: 'Iconica', label: 'La Pelosa' },
  ],
  residenceCards: [
    {
      title: 'Baia di Cala Lupo',
      description:
        'Il Residence sorge nella baia di Cala Lupo, in una zona tranquilla a circa 2 km dal centro di Stintino, tra macchia mediterranea e mare del Nord Sardegna.',
      imageAlt: 'Baia di Cala Lupo — spiaggia e mare turchese vicino al Residence',
    },
    {
      title: 'La Pelosa',
      description:
        'A pochi minuti dal Residence, La Pelosa è una delle spiagge più celebri del Mediterraneo: sabbia bianca finissima, acqua turchese trasparente e la storica Torre aragonese che emerge dal mare.',
      imageAlt: 'La Pelosa — spiaggia e Torre della Pelosa, Stintino',
      linkLabel: 'Scopri La Pelosa',
    },
    {
      title: 'Collegamenti',
      description:
        'Il Residence è facilmente raggiungibile dalle principali vie d’accesso del Nord Sardegna — in auto, in aereo o con i traghetti.',
      imageAlt: '',
      routes: [
        { distance: '~50 km', label: 'Aeroporto di Alghero' },
        { distance: '~30 km', label: 'Porto di Porto Torres' },
        { distance: '~150 km', label: 'Porto e aeroporto di Olbia' },
        { distance: '~150 km', label: 'Porto di Golfo Aranci' },
      ],
      images: [
        { alt: 'Terminal aeroporto di Alghero', caption: 'Aeroporto di Alghero' },
        { alt: 'Vista aerea del porto di Olbia', caption: 'Porto di Olbia' },
      ],
    },
  ],
  residenceAccordion: {
    eyebrow: 'In dettaglio',
    title: 'Posizione & servizi',
    discoverMore: 'Scopri di più',
  },
  suitesIntro: {
    eyebrow: 'Alloggi',
    title: 'Le Suites',
    count: '18',
    countLabel: 'monolocali',
    kicker: 'Due atmosfere — mare e giardino — per vivere Stintino con la privacy di un residence.',
    marquee: ['Vista mare', 'Vista giardino', 'Monolocali', 'Stintino', 'La Pelosa'],
  },
  suites: {
    'vista-giardino': {
      title: 'Con Vista Giardino',
      kicker: 'Monolocale per 2 o 4 persone',
      tagline: 'Veranda, giardino privato e quiete della macchia.',
      description:
        'Monolocale con veranda coperta e accesso diretto al giardino privato: colazioni all’ombra, cene sotto il patio e il profumo della macchia mediterranea.',
      features: ['Veranda coperta', 'Giardino privato', 'Angolo cucina', 'Wi-Fi gratuito'],
      galleryAlts: [
        'Giardino privato del monolocale vista giardino — Residence Le Vele, Stintino',
        'Veranda coperta e area esterna — appartamento vacanze Sardegna',
        'Interno monolocale con angolo cucina — Residence Le Vele',
      ],
      listLabel: 'Giardino',
      discoverAria: 'Scopri Con Vista Giardino',
      exploreCta: 'Esplora la suite',
    },
    'vista-mare': {
      title: 'Con Vista Mare',
      kicker: 'Monolocale per 2 o 4 persone',
      tagline: 'Terrazza privata e luce sulla baia di Stintino.',
      description:
        'Monolocale con terrazza privata e affaccio sulla baia: luce del Nord Sardegna al mattino, tramonti dorati verso la Pelosa alla sera.',
      features: ['Terrazza privata', 'Vista mare', 'Aria condizionata', 'Wi-Fi gratuito'],
      galleryAlts: [
        'Terrazza con vista mare — monolocale Residence Le Vele, Stintino',
        'Panorama dalla suite vista mare — Stintino, Sardegna',
        'Dettaglio interno monolocale vista mare — Le Vele',
      ],
      listLabel: 'Mare',
      discoverAria: 'Scopri Con Vista Mare',
      exploreCta: 'Esplora la suite',
    },
  },
  gallery: {
    title: 'Atmosfera Le Vele',
    imageAlts: [
      'Giardino del Residence Le Vele a Stintino con macchia mediterranea',
      'Monolocale vista mare — Residence Le Vele, Stintino',
      'Area verde e veranda — appartamenti vacanze Sardegna',
      'Terrazza con vista mare al Residence Le Vele, Stintino',
    ],
  },
  offers: {
    sectionEyebrow: 'Pacchetti',
    sectionTitle: 'Offerte & soggiorni',
    items: [
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
    ],
  },
  infoServices: {
    eyebrow: 'Informazioni',
    title: 'Info & Servizi',
    kicker: 'Arrivi / Partenze',
    checkInTitle: 'Check-in',
    checkInTime: 'dalle 15.30 alle 19.00',
    checkOutTitle: 'Check-out',
    checkOutTime: 'entro le 10.00',
    noteLateCheckIn:
      'In caso di check-in dopo le ore 20.00, si prega di avvisare almeno 48 ore prima, telefonicamente o via e-mail.',
    noteSupplement:
      'La Direzione si riserva il diritto di applicare un supplemento di € 30,00 per arrivi in ritardo senza precedente comunicazione.',
  },
  reviews: {
    eyebrow: 'Recensioni',
    title: 'Cosa dicono gli ospiti',
    subtitleBefore: 'Estratti da',
    subtitleAfter: '.',
    marqueeAria: 'Recensioni degli ospiti',
    ratingAria: 'Valutazione {rating} su 5',
    openOn: 'Apri su {platform} →',
    summary: {
      reviewCountLabel: 'recensioni',
      google: {
        rating: 4.9,
        reviewCount: 142,
        platformLabel: 'Google',
        summaryText: 'Eccellente su Google: posizione, pulizia e accoglienza apprezzate dagli ospiti.',
      },
      tripadvisor: {
        rating: 4.5,
        reviewCount: 96,
        platformLabel: 'Tripadvisor',
        summaryText: 'Ottimi punteggi su Tripadvisor per mare, silenzio e soggiorno in famiglia.',
      },
    },
    items: [
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
          "Pulizia impeccabile e lenzuola fresche all'arrivo. Il residence è ben tenuto e immerso nella macchia mediterranea.",
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
    ],
  },
  contactIntro: {
    eyebrow: 'Contattaci',
    title: 'Contatti',
    kicker:
      'Prenotazioni e richieste per appartamenti vacanze a Stintino: telefono, email e indicazioni per raggiungere il Residence Le Vele.',
  },
  contactLabels: {
    phone: 'Telefono',
    mobile: 'Mobile',
    email: 'Email',
    address: 'Indirizzo',
  },
  siteMap: {
    placeholderAlt: 'Baia di Cala Lupo — zona del Residence Le Vele a Stintino',
    badgeLabel: 'Residence Le Vele — Stintino',
    iframeTitle: 'Mappa interattiva — Residence Le Vele Stintino',
    enableLabel: 'Abilita mappa',
    enableHint:
      'La mappa interattiva Google utilizza cookie di terze parti. Attiva le preferenze per visualizzarla.',
    activateAria: 'Attivazione mappa interattiva',
    mapSectionAria: 'Mappa del residence',
  },
  footer: {
    about:
      'Residence a Stintino per vacanze in Sardegna: appartamenti vicino a La Pelosa, tra privacy, comfort e l’atmosfera del Nord Sardegna.',
    explore: 'Esplora',
    contacts: 'Contatti',
    designBy: 'Design by',
  },
  pelosa: {
    hero: {
      eyebrow: 'Stintino, Sardegna',
      title: 'La Pelosa',
      tagline: 'Una delle spiagge più celebri del Mediterraneo.',
      lede:
        'Sabbia bianca, acqua turchese e la Torre aragonese: un simbolo del Nord Sardegna a pochi minuti dal Residence Le Vele.',
      videoLabel: 'Video della spiaggia La Pelosa a Stintino',
    },
    intro: {
      eyebrow: 'La spiaggia',
      title: 'Famoso in tutto il mondo',
      lead:
        'La Pelosa si affaccia sulla punta nord-occidentale della Sardegna: spiaggia iconica di Stintino, a pochi minuti dal Residence Le Vele.',
      body:
        "In lontananza, l'isolotto della Torre della Pelosa è il simbolo iconico di Stintino. D'estate l'accesso è regolamentato per preservare l'ambiente: consigliamo di prenotare in anticipo e di arrivare con calma, soprattutto in alta stagione.",
      statValue: '~2 km',
      statLabel: 'Dal Residence Le Vele',
    },
    gallery: {
      title: 'Colori del Nord Sardegna',
      imageAlts: [
        'Vista aerea della spiaggia La Pelosa, mare turchese e Torre della Pelosa',
        "La Pelosa dall'alto: costa, ombrelloni e torre",
        'Laguna e sabbia bianca a La Pelosa con mare cristallino',
        "Mare turchese con Torre della Pelosa all'orizzonte",
      ],
    },
    ui: {
      back: '← Residence Le Vele',
      scrollAria: 'Scorri verso il contenuto',
      scrollLabel: 'Scorri',
      muteOn: 'Attiva audio',
      muteOff: 'Disattiva audio',
      closeLightbox: 'Chiudi',
      closeGallery: 'Chiudi galleria',
      openImage: 'Apri immagine: {alt}',
    },
  },
  suitePage: {
    notFound: 'Suite non trovata',
    backToSuites: '← Torna alle suites',
    backLink: '← Le Suites',
    specsAria: 'Informazioni suite',
    guests: '2–4',
    guestsLabel: 'ospiti',
    locationValue: 'Stintino',
    locationLabel: 'Sardegna',
    typeValue: 'Monolocale',
    typeLabel: 'vacanze',
    scrollAria: 'Scorri verso il contenuto',
    scrollLabel: 'Scorri',
    experience: "L'esperienza",
    storyNote:
      'Appartamento vacanze al Residence Le Vele — Stintino, a pochi minuti dalle spiagge più belle del Nord Sardegna.',
    amenitiesEyebrow: 'Dotazioni',
    amenitiesTitle: 'Tutto il necessario',
    galleryAria: 'Galleria {title}',
    bookingEyebrow: 'Prenotazioni',
    bookingTitle: 'Richiedi disponibilità',
    bookingText:
      'Scrivici per date, numero di ospiti e preferenze — ti rispondiamo con un preventivo personalizzato.',
    bookingCta: 'Richiedi preventivo',
    mailSubjectPrefix: 'Prenotazione',
    otherSuite: 'Altra suite',
    allSuites: '← Tutte le suites',
    heroAltSuffix: '— monolocale vacanze Stintino, Residence Le Vele',
  },
  header: {
    navAria: 'Menu principale',
    mainNavAria: 'Principale',
  },
  seo: {
    default: {
      title: 'Residence Le Vele | Appartamenti vacanze a Stintino, Sardegna',
      description:
        'Residence Le Vele a Stintino: monolocali vista mare e giardino, soggiorni vicino a La Pelosa. Prenota il tuo appartamento vacanze in Sardegna.',
      keywords:
        'residence stintino, appartamenti vacanze sardegna, soggiorno vicino al mare, la pelosa, cala lupo, monolocali stintino',
    },
    pelosa: {
      title: 'La Pelosa Stintino | Residence Le Vele — Spiaggia e mare',
      description:
        'La Pelosa a Stintino: una delle spiagge più belle della Sardegna, a pochi minuti dal Residence Le Vele.',
      keywords: 'la pelosa stintino, spiaggia stintino, residence le vele, mare sardegna',
    },
    privacy: {
      title: 'Privacy Policy | Residence Le Vele Stintino',
      description: 'Informativa privacy e trattamento dati personali del Residence Le Vele a Stintino.',
    },
    cookie: {
      title: 'Cookie Policy | Residence Le Vele Stintino',
      description: 'Cookie policy e gestione del consenso del sito Residence Le Vele.',
    },
    suiteTitleSuffix: '| Residence Le Vele — Appartamenti Stintino',
    suiteDescriptionSuffix: 'Prenota il monolocale a Stintino, vicino a La Pelosa.',
    suiteKeywords: 'monolocale stintino, appartamenti vacanze sardegna, residence le vele',
    fallbackTitleSuffix: '| Stintino, Sardegna',
    schemaDescription:
      'Residence Le Vele a Stintino: monolocali vista mare e giardino, soggiorni vicino a La Pelosa.',
    schemaAmenities: [
      'Wi-Fi gratuito',
      'Aria condizionata',
      'Veranda o terrazza',
      'Giardino privato',
      'Angolo cucina',
      'Vista mare',
    ],
    schemaTouristTypes: ['Famiglie', 'Coppie', 'Escursionisti'],
    nearbyAttractions: [
      { name: 'La Pelosa', description: 'Spiaggia iconica di Stintino, a circa 2 km dal residence.' },
      { name: 'Baia di Cala Lupo', description: 'Baia tranquilla dove sorge il Residence Le Vele.' },
      { name: 'Centro storico di Stintino', description: 'Borgo marinaresco del Nord Sardegna, vicino al residence.' },
    ],
  },
  errorBoundary: {
    title: 'Ops… qualcosa è andato storto',
    body: 'I nostri soccorsi preistorici stanno già lavorando. Prova a ricaricare la pagina o torna alla home del Residence.',
    reload: 'Ricarica pagina',
    home: 'Torna al Residence',
    detailsLabel: 'Dettagli tecnici',
  },
  ogLocale: 'it_IT',
};
