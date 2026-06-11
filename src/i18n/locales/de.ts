import type { LocaleCopy } from '../types';

export const de: LocaleCopy = {
  preloaderText: 'Residence Le Vele',
  addressCountry: 'Italien',
  hero: {
    kicker: 'Sardinien, Nordwesten',
    titleLines: ['Jenseits', 'des Horizonts'],
    tagline: 'Ihr nächster Urlaub beginnt hier …',
    lede:
      'Residence Le Vele in Stintino: Ferienwohnungen auf Sardinien für Aufenthalte in Meernähe. Wilde Natur, kristallklares Wasser und weißer Sand — eines der schönsten Meere der Insel.',
    scrollAria: 'Zur Residence scrollen',
    scrollLabel: 'Scrollen',
    videoAria: 'Panorama-Video von Sardinien — Residence Le Vele Stintino',
  },
  residenceIntro: {
    eyebrow: 'Die Residence',
    titleLine: 'Willkommen in der',
    titleBrandBefore: 'Residence',
    titleBrandAccent: 'Le Vele',
    location: 'Cala Lupo',
    locationLabel: 'Bucht · Stintino',
    kicker: 'Zwischen Cala Lupo und dem Meer Nord-Sardiniens, nur wenige Minuten von Stintino und La Pelosa entfernt.',
    lead:
      'Studios mit Veranda oder Terrasse inmitten mediterraner Macchia: Ferienwohnungen in Stintino, wenige Minuten von La Pelosa und dem Meer Nord-Sardiniens. Eine ruhige Residence für alle, die authentische Aufenthalte auf Sardinien suchen.',
    marquee: ['Cala Lupo', 'La Pelosa', 'Buchten', 'Nord-Sardinien', 'Stintino'],
    metricsAria: 'Auf einen Blick',
  },
  residenceHighlights: [
    { value: 'Cala Lupo', label: 'Bucht' },
    { value: '~2 km', label: 'Zentrum & Pelosa' },
    { value: 'Ikonsich', label: 'La Pelosa' },
  ],
  residenceCards: [
    {
      title: 'Bucht von Cala Lupo',
      description:
        'Die Residence liegt in der Bucht von Cala Lupo, in einer ruhigen Gegend etwa 2 km vom Zentrum Stintinos entfernt, zwischen mediterraner Macchia und dem Meer Nord-Sardiniens.',
      imageAlt: 'Bucht von Cala Lupo — Strand und türkisfarbenes Meer in der Nähe der Residence',
    },
    {
      title: 'La Pelosa',
      description:
        'Nur wenige Minuten von der Residence entfernt ist La Pelosa einer der berühmtesten Strände des Mittelmeers: feinster weißer Sand, transparentes türkisfarbenes Wasser und der historische aragonesische Turm, der aus dem Meer emporragt.',
      imageAlt: 'La Pelosa — Strand und Torre della Pelosa, Stintino',
      linkLabel: 'La Pelosa entdecken',
    },
    {
      title: 'Anreise',
      description:
        'Die Residence ist über die wichtigsten Zufahrtswege Nord-Sardiniens leicht erreichbar — mit dem Auto, dem Flugzeug oder der Fähre.',
      imageAlt: 'Anreise nach Stintino — Flughäfen und Häfen in Nord-Sardinien',
      routes: [
        { distance: '~50 km', label: 'Flughafen Alghero' },
        { distance: '~30 km', label: 'Hafen Porto Torres' },
        { distance: '~150 km', label: 'Hafen und Flughafen Olbia' },
        { distance: '~150 km', label: 'Hafen Golfo Aranci' },
      ],
      images: [
        { alt: 'Terminal Flughafen Alghero', caption: 'Flughafen Alghero' },
        { alt: 'Luftaufnahme des Hafens Olbia', caption: 'Hafen Olbia' },
      ],
    },
    {
      title: 'Vierbeiner willkommen',
      description:
        'Im Residence Le Vele ist Ihr Hund willkommen: ruhige Studios in der Macchia, Veranden und Terrassen im Grünen, und die Küste von Stintino — Strände und Wege — nur wenige Minuten mit dem Auto entfernt. Bitte respektieren Sie andere Gäste und die örtlichen Strandregeln.',
      imageAlt: 'Golden Retriever läuft fröhlich im flachen Meerwasser auf Sardinien',
    },
  ],
  residenceAccordion: {
    eyebrow: 'Im Detail',
    showcaseTitle: 'Lage & Umgebung',
    title: 'Service & Aktivitäten',
    subtitle: 'Alles, was Ihren Aufenthalt in der Residence Le Vele komfortabel, entspannt und nah am Meer macht.',
    discoverMore: 'Mehr erfahren',
    navHint: 'Foto wischen oder Vorschau wählen',
  },
  residenceServices: {
    groups: [
      {
        id: 'free',
        title: 'Kostenlose Leistungen',
        badge: 'Inklusive',
        items: [
          { icon: 'luggage', label: 'Gepäckaufbewahrung' },
          { icon: 'tv', label: 'LCD-Fernseher' },
          { icon: 'courtesy-kit', label: 'Willkommensset' },
          { icon: 'ac', label: 'Klimaanlage' },
          { icon: 'wifi', label: 'WLAN-Internetverbindung' },
        ],
      },
      {
        id: 'paid',
        title: 'Kostenpflichtige Leistungen',
        items: [
          { icon: 'extra-cleaning', label: 'Zusätzliche Zimmerreinigung' },
          { icon: 'laundry', label: 'Wäscheservice' },
          { icon: 'transport', label: 'Transferservice' },
        ],
      },
      {
        id: 'activities',
        title: 'Kostenpflichtige Aktivitäten',
        items: [
          { icon: 'tennis', label: 'Tennisplatz' },
          { icon: 'bike-rental', label: 'Fahrradverleih' },
          { icon: 'boat-rental', label: 'Boots- und Schlauchbootverleih' },
          { icon: 'diving', label: 'Tauchkurse' },
          { icon: 'asinara', label: 'Ausflüge zur Insel Asinara' },
          { icon: 'guided-tours', label: 'Geführte Touren' },
        ],
      },
    ],
  },
  suitesIntro: {
    eyebrow: 'Unterkünfte',
    title: 'Die Studios',
    count: '18',
    countLabel: 'Studios',
    kicker: 'Zwei Atmosphären — Meer und Garten — um Stintino mit der Privatsphäre einer Residence zu erleben.',
    marquee: ['Meerblick', 'Gartenblick', 'Studios', 'Stintino', 'La Pelosa'],
  },
  suites: {
    'vista-giardino': {
      title: 'Mit Gartenblick',
      kicker: 'Studio für 2 oder 4 Personen',
      tagline: 'Veranda, privater Garten und die Ruhe der mediterranen Macchia.',
      description:
        'Studio mit überdachter Veranda und privatem Garten: Doppelbett und Etagenbett für bis zu 4 Gäste. Renovierte Bäder — je nach Wohnung große Walk-in-Dusche oder kompakte Dusche mit Bidet.',
      features: [
        'Überdachte Veranda',
        'Privater Garten',
        'Etagenbett',
        'Renoviertes Bad',
        'Küchenzeile',
        'Kostenloses WLAN',
      ],
      galleryAlts: [
        'Überdachte Veranda, Patio und privater Garten — Studio mit Gartenblick Le Vele',
        'Terrasse mit Gartenmöbeln, Garten und Meerblick — Residence Le Vele, Stintino',
        'Innenraum Studio mit Gartenblick und Essbereich — Le Vele',
        'Etagenbett im Studio mit Gartenblick — bis zu 4 Gäste',
        'Studio-Innenraum mit Küchenzeile — Residence Le Vele',
        'Privater Garten und überdachte Veranda — Residence Le Vele, Stintino',
        'Überdachte Veranda und Außenbereich — Ferienwohnung Sardinien',
        'Renoviertes Bad mit Waschbecken und modernen Armaturen — Le Vele Studio',
        'Renoviertes Bad mit Walk-in-Dusche — Le Vele Studio',
      ],
      listLabel: 'Garten',
      discoverAria: 'Mit Gartenblick entdecken',
      exploreCta: 'Suite erkunden',
      galleryKicker: 'Das Monolokal · Gartenblick',
      galleryTitle: 'Full immersion',
    },
    'vista-mare': {
      title: 'Mit Meerblick',
      kicker: 'Studio für 2 oder 4 Personen',
      tagline: 'Private Terrasse und Licht über der Bucht von Stintino.',
      description:
        'Studio mit privater Terrasse über der Bucht: Doppelbett und Etagenbett für bis zu 4 Gäste, Licht Nord-Sardiniens und Sonnenuntergänge Richtung La Pelosa. Renovierte Bäder — große Dusche ohne Bidet oder kompakte Dusche mit Bidet, je nach Wohnung.',
      features: [
        'Private Terrasse',
        'Ausgestattete Küchenzeile',
        'Etagenbett',
        'Renoviertes Bad',
        'Klimaanlage',
        'Kostenloses WLAN',
      ],
      galleryAlts: [
        'Esstisch und Terrasse mit Meerblick — Le Vele Studio',
        'Küchenzeile und Zugang zur Terrasse mit Meerblick — Residence Le Vele',
        'Schlafzimmer mit Doppelbett und Meerblick von der Terrasse — Le Vele',
        'Studio mit Meerblick und Terrasse — Residence Le Vele',
        'Etagenbett mit Meerblick — Stintino Studio',
        'Panorama von der Suite mit Meerblick — Stintino, Sardinien',
        'Terrasse mit Meerblick — Studio Residence Le Vele, Stintino',
        'Innenraumdetail Studio mit Meerblick — Le Vele',
        'Renoviertes Bad mit Waschbecken und modernen Armaturen — Le Vele Studio',
        'Renoviertes Bad mit großer Walk-in-Dusche — Le Vele Studio',
      ],
      listLabel: 'Meer',
      discoverAria: 'Mit Meerblick entdecken',
      exploreCta: 'Suite erkunden',
      galleryKicker: 'Das Monolokal · Meerblick',
      galleryTitle: 'Full immersion',
    },
  },
  gallery: {
    title: 'Atmosphäre Le Vele',
    imageAlts: [
      'Garten der Residence Le Vele in Stintino mit mediterraner Macchia',
      'Studio mit Meerblick — Residence Le Vele, Stintino',
      'Grünfläche und Veranda — Ferienwohnungen Sardinien',
      'Terrasse mit Meerblick in der Residence Le Vele, Stintino',
      'Studio-Innenraum mit Meerblick und Balkon zum Meer — Le Vele, Stintino',
      'Gemeinschaftliche Außenterrasse mit Loungemöbeln und Meerblick — Residence Le Vele',
    ],
    closeLabel: 'Galerie schließen',
    prevLabel: 'Vorheriges Bild',
    nextLabel: 'Nächstes Bild',
    counterLabel: '{current} / {total}',
  },
  offers: {
    sectionEyebrow: 'Pakete',
    sectionTitle: 'Angebote & Aufenthalte',
    items: [
      {
        title: 'Paar-Relax-Paket',
        period: 'Frühling und Frühsommer',
        badge: 'Signature',
        description:
          '3 Nächte in einem Studio mit Meer- oder Gartenblick, Willkommensgetränk bei Ankunft und Late Check-out nach Verfügbarkeit.',
      },
      {
        title: 'Familienangebot',
        period: 'Juni – September',
        badge: 'Family Choice',
        description:
          'Aufenthalt für 4 Gäste mit ermäßigtem Tarif bei Wochenbuchungen und persönlicher Unterstützung bei Ausflügen.',
      },
      {
        title: 'Bester Preis garantiert',
        period: 'Direktbuchung',
        badge: 'Direktgarantie',
        description:
          'Buchen Sie über unsere Website oder per E-Mail und erhalten Sie den besten Tarif — ohne Zwischenhändlergebühren.',
      },
    ],
  },
  infoServices: {
    eyebrow: 'Informationen',
    title: 'Info & Bedingungen',
    kicker: 'Anreise / Abreise',
    checkInTitle: 'Check-in',
    checkInTime: 'von 15:30 bis 19:00 Uhr',
    checkOutTitle: 'Check-out',
    checkOutTime: 'bis 10:00 Uhr',
    noteLateCheckIn:
      'Bei Check-in nach 20:00 Uhr bitten wir um eine Mitteilung mindestens 48 Stunden im Voraus per Telefon oder E-Mail.',
    noteSupplement:
      'Die Direktion behält sich vor, einen Zuschlag von 30,00 € für verspätete Ankünfte ohne vorherige Mitteilung zu erheben.',
    noteDeposit:
      'Beim Check-in wird eine Kaution als Sicherheit hinterlegt und beim Check-out zurückerstattet, sofern keine Abzüge anfallen.',
    noteCleaningPenalty:
      'Wird die Unterkunft beim Check-out nicht gereinigt hinterlassen, behält sich die Direktion vor, eine Strafe für zusätzliche Reinigung zu erheben.',
    conditionsTitle: 'Bedingungen',
    conditions: [
      'Ein Kind unter 2 Jahren zahlt 5 EUR pro Person und Nacht für ein Kinderbett.',
      'Die maximale Anzahl an Kinderbetten pro Zimmer beträgt 1.',
      'Jedes Zustellbett, Kinderbett oder Hochstuhl ist von der Verfügbarkeit abhängig und muss auf Anfrage von der Direktion bestätigt werden.',
      'Zuschläge werden nicht automatisch in den Gesamtpreis einberechnet und sind während des Aufenthalts separat zu zahlen.',
      'Stornierungen sind bei Standardbuchungen bis 7 Tage vor Anreise kostenlos. Bei verspäteter Stornierung oder No-Show wird der volle Buchungsbetrag berechnet.',
      'Stornierungen sind bei nicht erstattungsfähigen Buchungen nicht kostenlos und führen zu einer Strafe in Höhe der gesamten Buchungs- und Aufenthaltskosten.',
      'Endreinigung sowie Bettwäsche und Handtücher bei Anreise sind im Preis enthalten. Der Wechsel erfolgt wöchentlich bei Aufenthalten über 8 Nächte.',
      'Tägliche Zimmerauffrischung, zusätzlicher Wäschewechsel und Reinigung der Kochnische sind optionale Zusatzkosten.',
      'Die Tarife beinhalten keine Mahlzeiten.',
      'Haustiere (Hunde/Katzen) sind willkommen.',
      'Interner Parkplatz für Gäste verfügbar.',
    ],
  },
  reviews: {
    eyebrow: 'Bewertungen',
    title: 'Was unsere Gäste sagen',
    subtitleBefore: 'Auszüge von',
    subtitleAfter: '.',
    marqueeAria: 'Gästebewertungen',
    prevAria: 'Vorherige Bewertung',
    nextAria: 'Nächste Bewertung',
    ratingAria: 'Bewertung {rating} von 5',
    openOn: 'Auf {platform} öffnen →',
    summary: {
      reviewCountLabel: 'Bewertungen',
      google: {
        rating: 4.9,
        reviewCount: 142,
        platformLabel: 'Google',
        summaryText: 'Ausgezeichnet bei Google: Lage, Sauberkeit und Gastfreundschaft werden gelobt.',
      },
      tripadvisor: {
        rating: 4.5,
        reviewCount: 96,
        platformLabel: 'Tripadvisor',
        summaryText: 'Starke Tripadvisor-Werte für Meer, Ruhe und Familienaufenthalte.',
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
          'Ruhige Lage in der Bucht von Cala Lupo, nur wenige Minuten vom Zentrum Stintinos und La Pelosa entfernt. Saubere, funktionale Studios und eine Terrasse mit herrlichem Blick. Sehr empfehlenswert für einen erholsamen Urlaub.',
      },
      {
        id: 'g-2',
        source: 'google',
        rating: 5,
        author: 'Marco Bianchi',
        dateLabel: '2024',
        text:
          'Gepflegte Anlage, ausgestattete Küchenzeile und freundliches Personal. Der Strand ist in wenigen Minuten zu Fuß erreichbar. Wir hatten eine wunderbare Zeit.',
      },
      {
        id: 'ta-1',
        source: 'tripadvisor',
        rating: 5,
        author: 'Alessandra M.',
        dateLabel: '2024',
        text:
          'Residence in natürlicher Umgebung mit bequemem Zugang zu den Buchten. Geräumige, gut gepflegte Apartments — ideal für Familien oder Paare.',
      },
      {
        id: 'ta-2',
        source: 'tripadvisor',
        rating: 4,
        author: 'Paolo Deiana',
        dateLabel: '2023',
        text:
          'Ausgezeichnete Basis für Besuche in Stintino und Nord-Sardinien. Meerblick von der Terrasse, bequemer Parkplatz und wesentliche Annehmlichkeiten für einen selbstständigen Aufenthalt.',
      },
      {
        id: 'g-3',
        source: 'google',
        rating: 5,
        author: 'Francesca L.',
        dateLabel: '2023',
        text:
          'Cala Lupo ist ein Stück Paradies: Ruhe, kristallklares Meer in unmittelbarer Nähe und ordentliche Studios. Wir kommen sicher wieder.',
      },
      {
        id: 'g-4',
        source: 'google',
        rating: 4,
        author: 'Giuseppe Conti',
        dateLabel: '2023',
        text:
          'Hilfsbereites Personal und unkomplizierter Check-in. Die Terrasse mit Blick macht jedes Frühstück besonders. WLAN für grundlegende Bedürfnisse in Ordnung.',
      },
      {
        id: 'ta-3',
        source: 'tripadvisor',
        rating: 5,
        author: 'Chiara Ferretti',
        dateLabel: '2024',
        text:
          'Familie mit Kindern: ausreichend Platz, voll ausgestattete Küche und minimaler Abstand zum Sand. La Pelosa in wenigen Minuten mit dem Auto.',
      },
      {
        id: 'ta-4',
        source: 'tripadvisor',
        rating: 4,
        author: 'Roberto Sanna',
        dateLabel: '2023',
        text:
          'Sehr angenehmer einwöchiger Aufenthalt. Abends ruhige Gegend — ideal für alle, die nach Tagen am Meer Erholung suchen.',
      },
      {
        id: 'g-5',
        source: 'google',
        rating: 5,
        author: 'Valentina P.',
        dateLabel: '2024',
        text:
          'Makellose Sauberkeit und frische Bettwäsche bei Ankunft. Die Residence ist gut gepflegt und von mediterraner Macchia umgeben.',
      },
      {
        id: 'ta-5',
        source: 'tripadvisor',
        rating: 5,
        author: 'Luca & Marta G.',
        dateLabel: '2024',
        text:
          'Paar im Urlaub: Meerblick-Terrasse bei Sonnenuntergang, Ruhe und Ginsterduft. Empfohlen für alle, die Nord-Sardinien lieben.',
      },
    ],
  },
  contactIntro: {
    eyebrow: 'Kontakt',
    title: 'Kontakt',
    kicker:
      'Buchungen und Anfragen für Ferienwohnungen in Stintino: Telefon, E-Mail und Wegbeschreibung zur Residence Le Vele.',
  },
  contactLabels: {
    phone: 'Telefon',
    mobile: 'Mobil',
    email: 'E-Mail',
    address: 'Adresse',
  },
  siteMap: {
    placeholderAlt: 'Bucht von Cala Lupo — Gegend der Residence Le Vele in Stintino',
    badgeLabel: 'Residence Le Vele — Stintino',
    iframeTitle: 'Interaktive Karte — Residence Le Vele Stintino',
    enableLabel: 'Karte aktivieren',
    enableHint:
      'Die interaktive Google-Karte verwendet Cookies von Drittanbietern. Aktivieren Sie Ihre Einstellungen, um sie anzuzeigen.',
    activateAria: 'Interaktive Karte aktivieren',
    mapSectionAria: 'Karte der Residence',
  },
  footer: {
    about:
      'Residence in Stintino für Urlaub auf Sardinien: Apartments in der Nähe von La Pelosa, mit Privatsphäre, Komfort und der Atmosphäre Nord-Sardiniens.',
    explore: 'Entdecken',
    contacts: 'Kontakt',
    designBy: 'Design by',
    starsAria: '3-Sterne-Klassifizierung',
    instagramAria: 'Residence Le Vele auf Instagram',
    footerNavAria: 'Footer-Navigation',
    legalNavAria: 'Datenschutz und Cookies',
  },
  pelosa: {
    hero: {
      eyebrow: 'Stintino, Sardinien',
      title: 'La Pelosa',
      tagline: 'Einer der berühmtesten Strände des Mittelmeers.',
      lede:
        'Weißer Sand, türkisfarbenes Wasser und der aragonesische Turm: ein Symbol Nord-Sardiniens, nur wenige Minuten von der Residence Le Vele entfernt.',
      videoLabel: 'Video vom Strand La Pelosa in Stintino',
    },
    intro: {
      eyebrow: 'Der Strand',
      title: 'Weltberühmt',
      lead:
        'La Pelosa liegt an der nordwestlichen Spitze Sardiniens: ikonischer Strand in Stintino, nur wenige Minuten von der Residence Le Vele entfernt.',
      body:
        'In der Ferne ist die Insel der Torre della Pelosa das ikonische Symbol Stintinos. Im Sommer ist der Zugang reguliert, um die Umwelt zu schützen: Wir empfehlen, im Voraus zu buchen und rechtzeitig anzureisen, besonders in der Hochsaison.',
      statValue: '~2 km',
      statLabel: 'Von der Residence Le Vele',
    },
    gallery: {
      eyebrow: 'Galerie',
      title: 'Farben Nord-Sardiniens',
      lead: 'Luftaufnahmen, Küste und türkisfarbenes Wasser: vier Blicke auf Stintinos ikonischsten Strand.',
      viewLabel: 'Vergrößern',
      imageAlts: [
        'Luftaufnahme des Strandes La Pelosa, türkisfarbenes Meer und Torre della Pelosa',
        'La Pelosa von oben: Küste, Sonnenschirme und Turm',
        'Lagune und weißer Sand bei La Pelosa mit kristallklarem Meer',
        'Türkisfarbenes Meer mit Torre della Pelosa am Horizont',
      ],
    },
    ui: {
      back: '← Residence Le Vele',
      scrollAria: 'Zum Inhalt scrollen',
      scrollLabel: 'Scrollen',
      muteOn: 'Ton einschalten',
      muteOff: 'Ton ausschalten',
      closeLightbox: 'Schließen',
      closeGallery: 'Galerie schließen',
      openImage: 'Bild öffnen: {alt}',
    },
  },
  suitePage: {
    notFound: 'Suite nicht gefunden',
    backToSuites: '← Zurück zu den Suites',
    backLink: '← Die Studios',
    specsAria: 'Suite-Informationen',
    guests: '2–4',
    guestsLabel: 'Gäste',
    locationValue: 'Stintino',
    locationLabel: 'Sardinien',
    typeValue: 'Studio',
    typeLabel: 'Ferien',
    scrollAria: 'Zum Inhalt scrollen',
    scrollLabel: 'Scrollen',
    experience: 'Das Erlebnis',
    storyNote:
      'Ferienwohnung in der Residence Le Vele — Stintino, wenige Minuten von den schönsten Stränden Nord-Sardiniens.',
    amenitiesEyebrow: 'Ausstattung',
    amenitiesTitle: 'Alles, was Sie brauchen',
    galleryAria: 'Galerie {title}',
    bookingEyebrow: 'Buchungen',
    bookingTitle: 'Verfügbarkeit anfragen',
    bookingText:
      'Schreiben Sie uns mit Datum, Gästezahl und Wünschen — wir antworten mit einem individuellen Angebot.',
    bookingCta: 'Angebot anfragen',
    mailSubjectPrefix: 'Buchung',
    otherSuite: 'Andere Suite',
    allSuites: '← Alle Suites',
    heroAltSuffix: '— Ferienstudio Stintino, Residence Le Vele',
  },
  header: {
    navAria: 'Hauptmenü',
    mainNavAria: 'Haupt',
  },
  seo: {
    default: {
      title: 'Residence Le Vele | Ferienwohnungen in Stintino, Sardinien',
      description:
        'Residence Le Vele in Stintino: Studios mit Meer- und Gartenblick, Aufenthalte in der Nähe von La Pelosa. Buchen Sie Ihre Ferienwohnung auf Sardinien.',
      keywords:
        'residence stintino, ferienwohnungen sardinien, urlaub am meer, la pelosa, cala lupo, studios stintino',
    },
    booking: {
      title: 'Residence Le Vele | Verfügbarkeit anfragen',
      description:
        'Verfügbarkeit für Ihren Aufenthalt in der Residence Le Vele in Stintino anfragen: Daten, Studio-Typ und Gästezahl. Persönliche Antwort per E-Mail.',
      keywords:
        'residence stintino buchen, verfügbarkeit anfragen, studios stintino, ferienwohnungen sardinien',
      breadcrumb: 'Verfügbarkeit anfragen',
    },
    pelosa: {
      title: 'La Pelosa Stintino | Residence Le Vele — Strand und Meer',
      description:
        'La Pelosa in Stintino: einer der schönsten Strände Sardiniens, wenige Minuten von der Residence Le Vele entfernt.',
      keywords: 'la pelosa stintino, strand stintino, residence le vele, meer sardinien',
    },
    privacy: {
      title: 'Datenschutzerklärung | Residence Le Vele Stintino',
      description: 'Datenschutzhinweis und Verarbeitung personenbezogener Daten in der Residence Le Vele in Stintino.',
    },
    cookie: {
      title: 'Cookie-Richtlinie | Residence Le Vele Stintino',
      description: 'Cookie-Richtlinie und Einwilligungsverwaltung der Website Residence Le Vele.',
    },
    suiteTitleSuffix: '| Residence Le Vele — Apartments Stintino',
    suiteDescriptionSuffix: 'Buchen Sie das Studio in Stintino, in der Nähe von La Pelosa.',
    suiteKeywords: 'studio stintino, ferienwohnungen sardinien, residence le vele',
    fallbackTitleSuffix: '| Stintino, Sardinien',
    ogImageAlt: 'Residence Le Vele — Studios in Stintino, nahe La Pelosa',
    breadcrumbHome: 'Startseite',
    schemaDescription:
      'Residence Le Vele in Stintino: Studios mit Meer- und Gartenblick, Aufenthalte in der Nähe von La Pelosa.',
    schemaAmenities: [
      'Kostenloses WLAN',
      'Klimaanlage',
      'Veranda oder Terrasse',
      'Privater Garten',
      'Küchenzeile',
      'Meerblick',
    ],
    schemaTouristTypes: ['Familien', 'Paare', 'Wanderer'],
    nearbyAttractions: [
      { name: 'La Pelosa', description: 'Ikonsicher Strand in Stintino, etwa 2 km von der Residence entfernt.' },
      { name: 'Bucht von Cala Lupo', description: 'Ruhige Bucht, in der die Residence Le Vele liegt.' },
      { name: 'Historisches Zentrum Stintinos', description: 'Fischerdorf in Nord-Sardinien, in der Nähe der Residence.' },
    ],
  },
  errorBoundary: {
    title: 'Ups… etwas ist schiefgelaufen',
    body: 'Unsere prähistorischen Helfer sind dran. Laden Sie die Seite neu oder kehren Sie zur Residence-Startseite zurück.',
    reload: 'Seite neu laden',
    home: 'Zur Residence',
    detailsLabel: 'Technische Details',
  },
  ogLocale: 'de_DE',
};
