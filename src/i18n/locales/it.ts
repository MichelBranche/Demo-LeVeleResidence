import type { LocaleCopy } from '../types';

export const it: LocaleCopy = {
  preloaderText: 'Residence Le Vele',
  directBookingPopup: {
    ariaLabel: 'Miglior prezzo garantito',
    eyebrow: 'Prenotazione diretta',
    title: 'Miglior offerta disponibile',
    text: 'Prenotando direttamente sul nostro sito trovi sempre la miglior offerta disponibile, al miglior prezzo.',
    bookCta: 'Vedi disponibilità',
    closeCta: 'Ho capito',
  },
  addressCountry: 'Italia',
  hero: {
    kicker: 'Sardegna, Nord-Ovest',
    titleLines: ['Oltre', "l'Orizzonte"],
    locationLine: 'Residence Le Vele · Cala Lupo, Stintino',
    microLine: 'Monolocali con terrazza o giardino, a 300 m dal mare.',
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
    titleBrandBefore: 'Residence',
    titleBrandAccent: 'Le Vele',
    location: 'Cala Lupo',
    locationLabel: 'Baia · Stintino',
    kicker:
      'A 300 m dal mare: la strada carreggiabile finisce con noi; la spiaggetta si raggiunge a piedi lungo una stradina adatta a passeggini e bici.',
    lead:
      'Monolocali con veranda o terrazza nel verde della macchia mediterranea. A 300 m un piccolo centro commerciale con ottimo rapporto qualità-prezzo; a pochi minuti Stintino, La Pelosa e il mare del Nord Sardegna. Un residence tranquillo, lontano dal traffico, per soggiorni autentici in Sardegna.',
    marquee: ['Cala Lupo', 'La Pelosa', 'Calette', 'Nord Sardegna', 'Stintino'],
    metricsAria: 'In sintesi',
  },
  residenceHighlights: [
    { value: '300 m', label: 'Dal mare' },
    { value: '300 m', label: 'Centro commerciale' },
    { value: '~2 km', label: 'Stintino & Pelosa' },
  ],
  residenceCards: [
    {
      title: 'La Pelosa',
      description:
        'A pochi minuti dal Residence, La Pelosa è una delle spiagge più celebri del Mediterraneo: sabbia bianca finissima, acqua turchese trasparente e la storica Torre aragonese che emerge dal mare.',
      imageAlt: 'La Pelosa — spiaggia e Torre della Pelosa, Stintino',
      linkLabel: 'Scopri La Pelosa',
    },
    {
      title: 'Baia di Cala Lupo',
      description:
        'Il Residence sorge dove la strada carreggiabile termina, a 300 m dal mare. La baia di Cala Lupo è una zona tranquilla a circa 2 km dal centro di Stintino: la spiaggetta si raggiunge a piedi per una stradina pianeggiante, percorribile con passeggini e biciclette.',
      imageAlt: 'Spiaggia di Cala Lupo — sabbia, mare turchese e relax vicino al Residence',
    },
    {
      title: 'Vista dall\'alto',
      description:
        'Il Residence Le Vele visto dal cielo: costa, piscina e monolocali immersi nella macchia mediterranea, a pochi passi dal mare di Cala Lupo.',
      imageAlt: 'Vista aerea del Residence Le Vele sulla costa di Stintino — Sardegna',
      images: [
        { alt: 'Vista aerea della costa e della piscina — Residence Le Vele, Stintino', caption: 'Costa e piscina' },
        { alt: 'Vista aerea del Residence Le Vele con appartamenti e mare — Stintino', caption: 'Il Residence' },
        { alt: 'Tramonto aereo sul Residence Le Vele e il mare — Stintino, Sardegna', caption: 'Tramonto' },
      ],
    },
    {
      title: 'Collegamenti',
      description:
        'Il Residence è facilmente raggiungibile dalle principali vie d’accesso del Nord Sardegna — in auto, in aereo o con i traghetti.',
      imageAlt: 'Collegamenti verso Stintino — aeroporti e porti del Nord Sardegna',
      routes: [
        { distance: '~50 km', label: 'Aeroporto di Alghero' },
        { distance: '~30 km', label: 'Porto di Porto Torres' },
        { distance: '~150 km', label: 'Porto e aeroporto di Olbia' },
        { distance: '~150 km', label: 'Porto di Golfo Aranci' },
      ],
      images: [
        { alt: 'Terminal aeroporto di Alghero', caption: 'Aeroporto di Alghero' },
        { alt: 'Porto di Porto Torres visto dall’alto', caption: 'Porto di Porto Torres' },
      ],
    },
    {
      title: 'Amici a 4 zampe',
      description:
        'Al Residence Le Vele il vostro cane è il benvenuto: monolocali tranquilli immersi nella macchia, verande e terrazze per il relax all’aperto, e la costa di Stintino — con spiagge e sentieri — a pochi minuti in auto. Vi chiediamo solo di rispettare le altre famiglie e le regole vigenti nelle aree balneari.',
      imageAlt: 'Cane golden retriever che corre felice nell’acqua bassa del mare in Sardegna',
    },
  ],
  residenceAccordion: {
    eyebrow: 'In dettaglio',
    showcaseTitle: 'Posizione & dintorni',
    title: 'Servizi & attività',
    subtitle: 'Tutto ciò che rende il soggiorno al Residence Le Vele comodo, rilassato e vicino al mare.',
    discoverMore: 'Scopri di più',
    navHint: 'Scorri la foto o seleziona un’anteprima',
  },
  residenceServices: {
    groups: [
      {
        id: 'free',
        title: 'Servizi gratuiti',
        badge: 'Inclusi',
        items: [
          { icon: 'luggage', label: 'Deposito bagagli' },
          { icon: 'tv', label: 'TV LCD' },
          { icon: 'courtesy-kit', label: 'Kit di cortesia' },
          { icon: 'ac', label: 'Aria condizionata' },
          { icon: 'wifi', label: 'Connessione internet Wi-Fi' },
          // TODO(owner): confirm "non custodito" is accurate for guest parking.
          { icon: 'parking', label: 'Parcheggio gratuito non custodito' },
        ],
      },
      {
        id: 'paid',
        title: 'Servizi a pagamento',
        items: [
          { icon: 'extra-cleaning', label: 'Pulizie extra della camera' },
          { icon: 'laundry', label: 'Lavanderia' },
          { icon: 'transport', label: 'Servizi di trasporto' },
        ],
      },
      {
        id: 'activities',
        title: 'Attività a pagamento',
        items: [
          { icon: 'tennis', label: 'Campo da tennis' },
          { icon: 'bike-rental', label: 'Noleggio bici' },
          { icon: 'boat-rental', label: 'Noleggio barche/gommoni' },
          { icon: 'diving', label: 'Corsi di sub' },
          { icon: 'asinara', label: 'Escursioni all’Isola dell’Asinara' },
          { icon: 'guided-tours', label: 'Visite guidate' },
        ],
      },
    ],
  },
  suitesIntro: {
    eyebrow: 'Alloggi',
    title: 'I Monolocali',
    count: '18',
    countLabel: 'Monolocali',
    kicker:
      '18 monolocali in due tipologie — vista mare e vista giardino — da 2 a 4 posti ciascuno. Stessa qualità, due modi di vivere Stintino.',
    capacityNote: '18 monolocali totali — stessa tipologia, due viste (mare e giardino).',
    capacityGrid: {
      aria: 'Panoramica monolocali per posti letto e vista',
      sea: 'Mare',
      garden: 'Giardino',
      seats2: '2 posti',
      seats3: '3 posti',
      seats4: '4 posti',
      seatsUnit: 'posti',
      available: 'Disponibile',
    },
    marquee: ['Vista mare', 'Vista giardino', 'Monolocali', 'Stintino', 'La Pelosa'],
    cardToggleDayAria: 'Mostra foto di giorno',
    cardToggleNightAria: 'Mostra foto notturna',
  },
  suites: {
    'vista-giardino': {
      title: 'Con Vista Giardino',
      kicker: 'Monolocale da 2, 3 o 4 posti',
      tagline: 'Veranda, giardino privato e quiete della macchia mediterranea.',
      description:
        'Monolocali da 2, 3 o 4 posti: con 3 ospiti è previsto un letto singolo aggiuntivo, con 4 ospiti un letto a castello (oltre al matrimoniale). Veranda coperta e accesso al giardino privato. Bagni ristrutturati — in base all’alloggio, doccia walk-in più ampia oppure doccia compatta con bidet.',
      features: [
        '2, 3 o 4 posti',
        'Letto singolo (3 ospiti)',
        'Letto a castello (4 ospiti)',
        'Veranda coperta',
        'Giardino privato',
        'Bagno ristrutturato',
        'Angolo cucina',
        'Wi-Fi gratuito',
      ],
      galleryAlts: [
        'Veranda coperta, patio e giardino privato — monolocale vista giardino Le Vele',
        'Terrazza con arredi, giardino e vista mare — Residence Le Vele, Stintino',
        'Set da pranzo in veranda con moka e vista sul giardino — monolocale vista giardino Le Vele',
        'Colazione in veranda con moka, fiori bianchi e giardino — Residence Le Vele, Stintino',
        'Camera con letto matrimoniale e bagno privato — monolocale vista giardino Le Vele',
        'Dettaglio letto con asciugamani e ibisco, vista sul patio — monolocale vista giardino Le Vele',
        'Letto a castello nel monolocale vista giardino — configurazione 4 posti',
        'Interno monolocale con angolo cucina — Residence Le Vele',
        'Giardino privato e veranda coperta — Residence Le Vele, Stintino',
        'Veranda coperta e area esterna — appartamento vacanze Sardegna',
        'Bagno ristrutturato con lavabo e finiture moderne — monolocale Le Vele',
        'Bagno ristrutturato con doccia walk-in — monolocale Le Vele',
      ],
      listLabel: 'Giardino',
      discoverAria: 'Scopri Con Vista Giardino',
      exploreCta: 'Scopri il monolocale',
      galleryKicker: 'Il monolocale · vista giardino',
      galleryTitle: 'Full immersion',
    },
    'vista-mare': {
      title: 'Con Vista Mare',
      kicker: 'Monolocale da 2, 3 o 4 posti',
      tagline: 'Terrazza privata e luce sulla baia di Stintino.',
      description:
        'Monolocali da 2, 3 o 4 posti: con 3 ospiti è previsto un letto singolo aggiuntivo, con 4 ospiti un letto a castello (oltre al matrimoniale). Terrazza privata sulla baia, luce del Nord Sardegna e tramonti verso La Pelosa. Bagni ristrutturati — doccia ampia senza bidet oppure doccia compatta con bidet, a seconda dell’alloggio.',
      features: [
        '2, 3 o 4 posti',
        'Letto singolo (3 ospiti)',
        'Letto a castello (4 ospiti)',
        'Terrazza privata',
        'Piano cucina attrezzato',
        'Bagno ristrutturato',
        'Aria condizionata',
        'Wi-Fi gratuito',
      ],
      galleryAlts: [
        'Tavolo da pranzo e terrazza con vista sul mare — monolocale Le Vele',
        'Angolo cucina e accesso alla terrazza vista mare — Residence Le Vele',
        'Terrazza arredata con vista sul monolocale e sul mare — Le Vele',
        'Monolocale vista mare con terrazza e luce sulla baia — Residence Le Vele',
        'Terrazza coperta con tavolo, moka e vista mare — monolocale Le Vele',
        'Colazione in terrazza con moka e oleandro — vista mare Stintino',
        'Camera matrimoniale con ibisco e arredi in legno — monolocale vista mare',
        'Dettaglio accoglienza con asciugamani e ibisco rosso — Le Vele',
        'Angolo cucina attrezzato e zona pranzo — monolocale vista mare',
        'Letto a castello con vista sul mare — configurazione 4 posti',
        'Panorama dalla suite vista mare — Stintino, Sardegna',
        'Terrazza con vista mare — monolocale Residence Le Vele, Stintino',
        'Dettaglio interno monolocale vista mare — Le Vele',
        'Bagno ristrutturato con lavabo e finiture moderne — monolocale Le Vele',
        'Bagno ristrutturato con doccia walk-in ampia — monolocale Le Vele',
      ],
      listLabel: 'Mare',
      discoverAria: 'Scopri Con Vista Mare',
      exploreCta: 'Scopri il monolocale',
      galleryKicker: 'Il monolocale · vista mare',
      galleryTitle: 'Full immersion',
    },
  },
  residenceWelcome: {
    galleryAria: 'Galleria fotografica del Residence Le Vele',
    imageAlts: [
      'Vista aerea al tramonto del Residence Le Vele con piazza e giardini — Stintino',
      'Terrazza privata con pergolato, tavolo e vista mare — Residence Le Vele',
      'Vista aerea del Residence Le Vele sul mare — Stintino',
      'Terrazze dei monolocali con pergolato in legno e vista mare — Le Vele',
      'Barca a vela latina davanti alla costa di Stintino',
      'Piazzetta con gazebi, ombrelloni e vista mare — Residence Le Vele',
      'Vista aerea della costa e della spiaggia — Residence Le Vele, Stintino',
    ],
    closeLabel: 'Chiudi galleria',
    prevLabel: 'Immagine precedente',
    nextLabel: 'Immagine successiva',
    counterLabel: '{current} / {total}',
    autoplayLabel: 'Scorri le foto',
  },
  offers: {
    sectionEyebrow: 'Pacchetti',
    sectionTitle: 'Offerte & soggiorni',
    sectionBenefit: 'Disponibilità e tariffe aggiornate in tempo reale.',
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
        title: 'Prenotazione diretta',
        period: 'Sul sito ufficiale',
        badge: 'Diretta',
        description:
          'Disponibilità e tariffe aggiornate in tempo reale sul motore di prenotazione.',
      },
    ],
  },
  infoServices: {
    eyebrow: 'Informazioni',
    title: 'Info & condizioni',
    kicker: 'Arrivi / Partenze',
    checkInTitle: 'Check-in',
    checkInTime: 'dalle 15.30 alle 19.00',
    checkOutTitle: 'Check-out',
    checkOutTime: 'entro le 10.00',
    noteLateCheckIn:
      'In caso di check-in dopo le ore 20.00, si prega di avvisare almeno 48 ore prima, telefonicamente o via e-mail.',
    noteSupplement:
      'La Direzione si riserva il diritto di applicare un supplemento di € 30,00 per arrivi in ritardo senza precedente comunicazione.',
    noteDeposit:
      'Al check-in verrà richiesta una cauzione a titolo di garanzia, restituita al check-out salvo eventuali addebiti.',
    noteCleaningPenalty:
      "In caso di mancata pulizia dell'alloggio al check-out, la Direzione si riserva il diritto di applicare una penale per le pulizie extra.",
    conditionsTitle: 'Condizioni',
    conditions: [
      'Un bambino di età inferiore a 2 anni paga EUR 5 per persona a notte in culla/lettino.',
      'Il numero massimo di culle in camera è di 1.',
      'Qualsiasi tipo di letto aggiuntivo, culla/lettino o seggiolone è soggetto a disponibilità e deve essere confermata dal management, previa richiesta.',
      'I supplementi non vengono calcolati automaticamente nell’importo totale del prezzo e dovranno essere pagati separatamente durante il vostro soggiorno.',
      'La cancellazione è gratuita per prenotazioni standard sino a 7 giorni prima della data di arrivo. In caso di cancellazione tardiva o non presentazione, verrà addebitato il costo totale della prenotazione.',
      'La cancellazione non è gratuita per le prenotazioni non rimborsabili e comporta una penale pari al costo totale della prenotazione e del soggiorno.',
      'Sono incluse nel prezzo le pulizie finali e la dotazione di biancheria e asciugamani all’arrivo. Il cambio è settimanale per i soggiorni superiori alle 8 notti.',
      'Il riassetto quotidiano, il cambio biancheria extra e la pulizia dell’angolo cottura sono da considerare costi supplementari opzionali.',
      'Le tariffe non includono alcun pasto.',
      'Gli animali domestici (cani/gatti) sono benvenuti.',
      'Parcheggio interno disponibile per gli ospiti.',
    ],
  },
  reviews: {
    eyebrow: 'Recensioni',
    title: 'Cosa dicono gli ospiti',
    subtitleBefore: 'Estratti da',
    subtitleAfter: '.',
    marqueeAria: 'Recensioni degli ospiti',
    prevAria: 'Recensione precedente',
    nextAria: 'Recensione successiva',
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
      'Per prenotazioni e informazioni siamo a Stintino: telefono, email e indicazioni per raggiungerci.',
  },
  contactLabels: {
    phone: 'Telefono',
    mobile: 'Mobile',
    email: 'Email',
    address: 'Indirizzo',
    directions: 'Come arrivare',
    bookStay: 'Prenota',
  },
  contactCustomOffer: {
    title: 'Offerta su misura',
    text: 'Per richieste specifiche puoi chiedere un preventivo personalizzato: scrivici via email indicando date, numero di ospiti e tipologia preferita, oppure contattaci al recapito telefonico.',
  },
  contactPhotoAlts: [
    'Vista aerea della costa di Stintino con piscina e baie — Residence Le Vele',
    'Tramonto sul promontorio del Residence Le Vele — Stintino, Sardegna',
    'Vista aerea del Residence Le Vele con appartamenti e mare — Stintino, Sardegna',
  ],
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
    starsAria: 'Classificazione 3 stelle',
    instagramAria: 'Residence Le Vele su Instagram',
    footerNavAria: 'Navigazione footer',
    legalNavAria: 'Privacy e cookie',
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
      eyebrow: 'Galleria',
      title: 'Colori del Nord Sardegna',
      lead: 'Aeree, costa e acqua turchese: quattro vedute sulla spiaggia più iconica di Stintino.',
      viewLabel: 'Ingrandisci',
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
    backLink: '← I Monolocali',
    specsAria: 'Informazioni suite',
    guests: '2 / 3 / 4',
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
    otherSuite: 'Altro monolocale',
    allSuites: '← Tutti i monolocali',
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
    booking: {
      title: 'Residence Le Vele | Richiedi disponibilità',
      description:
        'Richiedi disponibilità per il tuo soggiorno al Residence Le Vele a Stintino: indica date, tipologia di monolocale e numero di ospiti. Risposta personalizzata via email.',
      keywords:
        'prenotazione residence stintino, richiesta disponibilità, monolocali stintino, appartamenti vacanze sardegna',
      breadcrumb: 'Richiedi disponibilità',
    },
    info: {
      title: 'Residence Le Vele | Info & condizioni di soggiorno',
      description:
        'Check-in, check-out, condizioni di prenotazione, cauzione, animali e parcheggio al Residence Le Vele a Stintino.',
      keywords:
        'info residence stintino, condizioni soggiorno, check-in check-out, prenotazione appartamenti sardegna',
      breadcrumb: 'Info & condizioni',
    },
    contact: {
      title: 'Residence Le Vele | Contatti e come raggiungerci',
      description:
        'Telefono, email e indicazioni stradali per il Residence Le Vele a Stintino: prenotazioni e richieste per appartamenti vacanze in Sardegna.',
      keywords:
        'contatti residence stintino, come arrivare le vele, telefono prenotazioni stintino, appartamenti vacanze sardegna',
      breadcrumb: 'Contatti',
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
    ogImageAlt: 'Residence Le Vele — monolocali a Stintino, vicino a La Pelosa',
    breadcrumbHome: 'Home',
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
      {
        name: 'Baia di Cala Lupo',
        description:
          'Spiaggetta a 300 m dal Residence, raggiungibile a piedi lungo una stradina adatta a passeggini e bici.',
      },
      {
        name: 'Centro commerciale',
        description: 'Piccolo centro commerciale a 300 m con ottimo rapporto qualità-prezzo.',
      },
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
