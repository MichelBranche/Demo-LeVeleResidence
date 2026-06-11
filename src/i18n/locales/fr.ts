import type { LocaleCopy } from '../types';

export const fr: LocaleCopy = {
  preloaderText: 'Residence Le Vele',
  addressCountry: 'Italie',
  hero: {
    kicker: 'Sardaigne, Nord-Ouest',
    titleLines: ['Au-delà', "de l'horizon"],
    tagline: 'Vos prochaines vacances commencent ici …',
    lede:
      'Residence Le Vele à Stintino : appartements de vacances en Sardaigne pour des séjours près de la mer. Nature sauvage, fonds marins limpides et sable blanc — l\'une des plus belles mers de l\'île.',
    scrollAria: 'Défiler vers la Residence',
    scrollLabel: 'Défiler',
    videoAria: 'Vidéo panoramique de la Sardaigne — Residence Le Vele Stintino',
  },
  residenceIntro: {
    eyebrow: 'La residence',
    titleLine: 'Bienvenue à la',
    titleBrandBefore: 'Residence',
    titleBrandAccent: 'Le Vele',
    location: 'Cala Lupo',
    locationLabel: 'Baie · Stintino',
    kicker: 'Entre Cala Lupo et la mer du Nord de la Sardaigne, à quelques minutes de Stintino et de La Pelosa.',
    lead:
      'Studios avec véranda ou terrasse au cœur du maquis méditerranéen : appartements de vacances à Stintino, à quelques minutes de La Pelosa et de la mer du Nord de la Sardaigne. Une residence paisible pour ceux qui recherchent un séjour authentique en Sardaigne.',
    marquee: ['Cala Lupo', 'La Pelosa', 'Criques', 'Nord Sardaigne', 'Stintino'],
    metricsAria: 'En bref',
  },
  residenceHighlights: [
    { value: 'Cala Lupo', label: 'Baie' },
    { value: '~2 km', label: 'Centre & Pelosa' },
    { value: 'Iconique', label: 'La Pelosa' },
  ],
  residenceCards: [
    {
      title: 'Baie de Cala Lupo',
      description:
        'La Residence se situe dans la baie de Cala Lupo, dans un quartier calme à environ 2 km du centre de Stintino, entre maquis méditerranéen et mer du Nord de la Sardaigne.',
      imageAlt: 'Baie de Cala Lupo — plage et mer turquoise près de la Residence',
    },
    {
      title: 'La Pelosa',
      description:
        'À quelques minutes de la Residence, La Pelosa est l\'une des plages les plus célèbres de la Méditerranée : sable blanc fin, eau turquoise transparente et la tour aragonaise historique qui émerge de la mer.',
      imageAlt: 'La Pelosa — plage et Torre della Pelosa, Stintino',
      linkLabel: 'Découvrir La Pelosa',
    },
    {
      title: 'Accès',
      description:
        'La Residence est facilement accessible via les principales voies d\'accès du Nord de la Sardaigne — en voiture, en avion ou en ferry.',
      imageAlt: 'Accès à Stintino — aéroports et ports du nord de la Sardaigne',
      routes: [
        { distance: '~50 km', label: 'Aéroport d\'Alghero' },
        { distance: '~30 km', label: 'Port de Porto Torres' },
        { distance: '~150 km', label: 'Port et aéroport d\'Olbia' },
        { distance: '~150 km', label: 'Port de Golfo Aranci' },
      ],
      images: [
        { alt: 'Terminal de l\'aéroport d\'Alghero', caption: 'Aéroport d\'Alghero' },
        { alt: 'Vue aérienne du port d\'Olbia', caption: 'Port d\'Olbia' },
      ],
    },
    {
      title: 'Amis à quatre pattes',
      description:
        'Au Residence Le Vele, votre chien est le bienvenu : studios paisibles dans la maquis, vérandas et terrasses pour se détendre dehors, et la côte de Stintino — plages et sentiers — à quelques minutes en voiture. Merci de respecter les autres familles et la réglementation des plages.',
      imageAlt: 'Golden retriever courant joyeusement dans l\'eau peu profonde en Sardaigne',
    },
  ],
  residenceAccordion: {
    eyebrow: 'En détail',
    showcaseTitle: 'Emplacement & environs',
    title: 'Services & activités',
    subtitle: 'Tout ce qui rend votre séjour à la Residence Le Vele confortable, détendu et proche de la mer.',
    discoverMore: 'En savoir plus',
    navHint: 'Faites glisser la photo ou choisissez un aperçu',
  },
  residenceServices: {
    groups: [
      {
        id: 'free',
        title: 'Services gratuits',
        badge: 'Inclus',
        items: [
          { icon: 'luggage', label: 'Consigne à bagages' },
          { icon: 'tv', label: 'TV LCD' },
          { icon: 'courtesy-kit', label: 'Kit de courtoisie' },
          { icon: 'ac', label: 'Climatisation' },
          { icon: 'wifi', label: 'Connexion internet Wi-Fi' },
        ],
      },
      {
        id: 'paid',
        title: 'Services payants',
        items: [
          { icon: 'extra-cleaning', label: 'Ménage supplémentaire de la chambre' },
          { icon: 'laundry', label: 'Blanchisserie' },
          { icon: 'transport', label: 'Services de transport' },
        ],
      },
      {
        id: 'activities',
        title: 'Activités payantes',
        items: [
          { icon: 'tennis', label: 'Court de tennis' },
          { icon: 'bike-rental', label: 'Location de vélos' },
          { icon: 'boat-rental', label: 'Location de bateaux et gommons' },
          { icon: 'diving', label: 'Cours de plongée' },
          { icon: 'asinara', label: "Excursions sur l'île de l'Asinara" },
          { icon: 'guided-tours', label: 'Visites guidées' },
        ],
      },
    ],
  },
  suitesIntro: {
    eyebrow: 'Hébergements',
    title: 'Les studios',
    count: '18',
    countLabel: 'studios',
    kicker: 'Deux atmosphères — mer et jardin — pour vivre Stintino avec l\'intimité d\'une residence.',
    marquee: ['Vue mer', 'Vue jardin', 'Studios', 'Stintino', 'La Pelosa'],
  },
  suites: {
    'vista-giardino': {
      title: 'Vue Jardin',
      kicker: 'Studio pour 2 ou 4 personnes',
      tagline: 'Véranda, jardin privé et quiétude du maquis méditerranéen.',
      description:
        'Studio avec véranda couverte et jardin privé : lit double et lit superposé jusqu\'à 4 personnes. Salles de bain rénovées — douche walk-in plus grande ou douche compacte avec bidet selon le logement.',
      features: [
        'Véranda couverte',
        'Jardin privé',
        'Lit superposé',
        'Salle de bain rénovée',
        'Coin cuisine',
        'Wi-Fi gratuit',
      ],
      galleryAlts: [
        'Véranda couverte, patio et jardin privé — monolocale vue jardin Le Vele',
        'Terrasse avec mobilier, jardin et vue mer — Residence Le Vele, Stintino',
        'Intérieur du studio vue jardin avec coin repas et patio — Le Vele',
        'Lit superposé dans le studio vue jardin — jusqu\'à 4 personnes',
        'Intérieur du studio avec coin cuisine — Residence Le Vele',
        'Jardin privé et véranda couverte — Residence Le Vele, Stintino',
        'Véranda couverte et espace extérieur — appartement de vacances Sardaigne',
        'Salle de bain rénovée avec lavabo et finitions modernes — studio Le Vele',
        'Salle de bain rénovée avec douche walk-in — studio Le Vele',
      ],
      listLabel: 'Jardin',
      discoverAria: 'Découvrir Vue Jardin',
      exploreCta: 'Explorer la suite',
      galleryKicker: 'Le monolocale · vue jardin',
      galleryTitle: 'Immersion totale',
    },
    'vista-mare': {
      title: 'Vue Mer',
      kicker: 'Studio pour 2 ou 4 personnes',
      tagline: 'Terrasse privée et lumière sur la baie de Stintino.',
      description:
        'Studio avec terrasse privée sur la baie : lit double et lit superposé jusqu\'à 4 personnes, lumière du Nord de la Sardaigne et couchers vers La Pelosa. Salles de bain rénovées — grande douche sans bidet ou douche compacte avec bidet selon le logement.',
      features: [
        'Terrasse privée',
        'Plaque de cuisson équipée',
        'Lit superposé',
        'Salle de bain rénovée',
        'Climatisation',
        'Wi-Fi gratuit',
      ],
      galleryAlts: [
        'Table à manger et terrasse avec vue mer — studio Le Vele',
        'Coin cuisine et accès à la terrasse vue mer — Residence Le Vele',
        'Chambre avec lit double et vue mer depuis la terrasse — Le Vele',
        'Studio vue mer avec terrasse et lumière sur la baie — Residence Le Vele',
        'Lit superposé avec vue mer — studio Stintino',
        'Panorama depuis la suite vue mer — Stintino, Sardaigne',
        'Terrasse avec vue mer — studio Residence Le Vele, Stintino',
        'Détail intérieur du studio vue mer — Le Vele',
        'Salle de bain rénovée avec lavabo et finitions modernes — studio Le Vele',
        'Salle de bain rénovée avec grande douche walk-in — studio Le Vele',
      ],
      listLabel: 'Mer',
      discoverAria: 'Découvrir Vue Mer',
      exploreCta: 'Explorer la suite',
      galleryKicker: 'Le monolocale · vue mer',
      galleryTitle: 'Immersion totale',
    },
  },
  gallery: {
    title: 'Atmosphère Le Vele',
    imageAlts: [
      'Jardin de la Residence Le Vele à Stintino avec maquis méditerranéen',
      'Studio vue mer — Residence Le Vele, Stintino',
      'Espace vert et véranda — appartements de vacances Sardaigne',
      'Terrasse avec vue mer à la Residence Le Vele, Stintino',
      'Intérieur studio vue mer avec balcon sur la mer — Le Vele, Stintino',
      'Espace commun extérieur avec terrasse, mobilier et vue mer — Residence Le Vele',
    ],
    closeLabel: 'Fermer la galerie',
    prevLabel: 'Image précédente',
    nextLabel: 'Image suivante',
    counterLabel: '{current} / {total}',
  },
  offers: {
    sectionEyebrow: 'Forfaits',
    sectionTitle: 'Offres & séjours',
    items: [
      {
        title: 'Forfait Couple Détente',
        period: 'Printemps et début d\'été',
        badge: 'Signature',
        description:
          '3 nuits en studio vue mer ou jardin, cocktail de bienvenue à l\'arrivée et late check-out selon disponibilité.',
      },
      {
        title: 'Offre Famille',
        period: 'Juin – Septembre',
        badge: 'Family Choice',
        description:
          'Séjour pour 4 personnes avec tarif réduit pour les réservations hebdomadaires et accompagnement dédié pour les excursions.',
      },
      {
        title: 'Meilleur prix garanti',
        period: 'Réservation directe',
        badge: 'Garantie directe',
        description:
          'Réservez sur notre site ou par e-mail pour bénéficier du meilleur tarif, sans frais d’intermédiaires.',
      },
    ],
  },
  infoServices: {
    eyebrow: 'Informations',
    title: 'Info & conditions',
    kicker: 'Arrivées / Départs',
    checkInTitle: 'Check-in',
    checkInTime: 'de 15 h 30 à 19 h 00',
    checkOutTitle: 'Check-out',
    checkOutTime: 'avant 10 h 00',
    noteLateCheckIn:
      'En cas de check-in après 20 h 00, merci de nous prévenir au moins 48 heures à l\'avance par téléphone ou e-mail.',
    noteSupplement:
      'La direction se réserve le droit d\'appliquer un supplément de 30,00 € pour les arrivées tardives sans notification préalable.',
    noteDeposit:
      'Une caution sera demandée au check-in et restituée au check-out, sauf retenues éventuelles.',
    noteCleaningPenalty:
      'En cas de logement non nettoyé au check-out, la direction se réserve le droit d\'appliquer une pénalité pour ménage supplémentaire.',
    conditionsTitle: 'Conditions',
    conditions: [
      'Un enfant de moins de 2 ans paie 5 EUR par personne et par nuit pour un lit bébé.',
      'Le nombre maximum de lits bébé par chambre est de 1.',
      'Tout lit supplémentaire, lit bébé ou chaise haute est soumis à disponibilité et doit être confirmé par la direction sur demande.',
      'Les suppléments ne sont pas calculés automatiquement dans le montant total et doivent être réglés séparément pendant votre séjour.',
      'L\'annulation est gratuite pour les réservations standard jusqu\'à 7 jours avant la date d\'arrivée. En cas d\'annulation tardive ou de non-présentation, le montant total de la réservation sera facturé.',
      'L\'annulation n\'est pas gratuite pour les réservations non remboursables et entraîne une pénalité égale au coût total de la réservation et du séjour.',
      'Le ménage final et la fourniture de linge de lit et de serviettes à l\'arrivée sont inclus dans le prix. Le changement de linge est hebdomadaire pour les séjours de plus de 8 nuits.',
      'Le ménage quotidien, le changement de linge supplémentaire et le nettoyage du coin cuisine sont des coûts supplémentaires optionnels.',
      'Les tarifs n\'incluent aucun repas.',
      'Les animaux domestiques (chiens/chats) sont les bienvenus.',
      'Parking intérieur disponible pour les clients.',
    ],
  },
  reviews: {
    eyebrow: 'Avis',
    title: 'Ce que disent nos hôtes',
    subtitleBefore: 'Extraits de',
    subtitleAfter: '.',
    marqueeAria: 'Avis des hôtes',
    prevAria: 'Avis précédent',
    nextAria: 'Avis suivant',
    ratingAria: 'Note {rating} sur 5',
    openOn: 'Ouvrir sur {platform} →',
    summary: {
      reviewCountLabel: 'avis',
      google: {
        rating: 4.9,
        reviewCount: 142,
        platformLabel: 'Google',
        summaryText: 'Excellent sur Google : emplacement, propreté et accueil appréciés.',
      },
      tripadvisor: {
        rating: 4.5,
        reviewCount: 96,
        platformLabel: 'Tripadvisor',
        summaryText: 'Très bonnes notes Tripadvisor pour la mer, le calme et les séjours en famille.',
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
          'Emplacement paisible dans la baie de Cala Lupo, à quelques minutes du centre de Stintino et de La Pelosa. Studios propres et fonctionnels, terrasse avec une vue magnifique. Fortement recommandé pour des vacances relaxantes.',
      },
      {
        id: 'g-2',
        source: 'google',
        rating: 5,
        author: 'Marco Bianchi',
        dateLabel: '2024',
        text:
          'Établissement soigné, coin cuisine équipé et personnel accueillant. La plage est accessible à pied en quelques minutes. Nous avons passé un excellent séjour.',
      },
      {
        id: 'ta-1',
        source: 'tripadvisor',
        rating: 5,
        author: 'Alessandra M.',
        dateLabel: '2024',
        text:
          'Residence immergée dans un cadre naturel, avec un accès facile aux criques. Appartements spacieux et bien entretenus — idéal pour les familles ou les couples.',
      },
      {
        id: 'ta-2',
        source: 'tripadvisor',
        rating: 4,
        author: 'Paolo Deiana',
        dateLabel: '2023',
        text:
          'Excellente base pour visiter Stintino et le Nord de la Sardaigne. Vue mer depuis la terrasse, parking pratique et services essentiels pour un séjour autonome.',
      },
      {
        id: 'g-3',
        source: 'google',
        rating: 5,
        author: 'Francesca L.',
        dateLabel: '2023',
        text:
          'Cala Lupo est un coin de paradis : calme, mer cristalline à deux pas et studios bien tenus. Nous reviendrons certainement.',
      },
      {
        id: 'g-4',
        source: 'google',
        rating: 4,
        author: 'Giuseppe Conti',
        dateLabel: '2023',
        text:
          'Personnel disponible et check-in simple. La terrasse avec vue rend chaque petit-déjeuner spécial. Wi-Fi suffisant pour les besoins de base.',
      },
      {
        id: 'ta-3',
        source: 'tripadvisor',
        rating: 5,
        author: 'Chiara Ferretti',
        dateLabel: '2024',
        text:
          'Famille avec enfants : espace suffisant, cuisine complète et distance minimale du sable. La Pelosa en voiture en quelques minutes.',
      },
      {
        id: 'ta-4',
        source: 'tripadvisor',
        rating: 4,
        author: 'Roberto Sanna',
        dateLabel: '2023',
        text:
          'Séjour d\'une semaine très agréable. Quartier calme le soir — idéal pour ceux qui cherchent le repos après des journées à la mer.',
      },
      {
        id: 'g-5',
        source: 'google',
        rating: 5,
        author: 'Valentina P.',
        dateLabel: '2024',
        text:
          'Propreté impeccable et draps frais à l\'arrivée. La residence est bien entretenue et entourée de maquis méditerranéen.',
      },
      {
        id: 'ta-5',
        source: 'tripadvisor',
        rating: 5,
        author: 'Luca & Marta G.',
        dateLabel: '2024',
        text:
          'Couple en vacances : terrasse vue mer au coucher du soleil, calme et parfum de genêt. Recommandé pour ceux qui aiment le Nord de la Sardaigne.',
      },
    ],
  },
  contactIntro: {
    eyebrow: 'Contactez-nous',
    title: 'Contact',
    kicker:
      'Réservations et demandes pour appartements de vacances à Stintino : téléphone, e-mail et itinéraire pour rejoindre la Residence Le Vele.',
  },
  contactLabels: {
    phone: 'Téléphone',
    mobile: 'Mobile',
    email: 'E-mail',
    address: 'Adresse',
  },
  siteMap: {
    placeholderAlt: 'Baie de Cala Lupo — zone de la Residence Le Vele à Stintino',
    badgeLabel: 'Residence Le Vele — Stintino',
    iframeTitle: 'Carte interactive — Residence Le Vele Stintino',
    enableLabel: 'Activer la carte',
    enableHint:
      'La carte interactive Google utilise des cookies tiers. Activez vos préférences pour l\'afficher.',
    activateAria: 'Activer la carte interactive',
    mapSectionAria: 'Carte de la residence',
  },
  footer: {
    about:
      'Residence à Stintino pour des vacances en Sardaigne : appartements près de La Pelosa, entre intimité, confort et l\'atmosphère du Nord de la Sardaigne.',
    explore: 'Explorer',
    contacts: 'Contact',
    designBy: 'Design by',
    starsAria: 'Classement 3 étoiles',
    instagramAria: 'Residence Le Vele sur Instagram',
    footerNavAria: 'Navigation du pied de page',
    legalNavAria: 'Confidentialité et cookies',
  },
  pelosa: {
    hero: {
      eyebrow: 'Stintino, Sardaigne',
      title: 'La Pelosa',
      tagline: 'L\'une des plages les plus célèbres de la Méditerranée.',
      lede:
        'Sable blanc, eau turquoise et tour aragonaise : un symbole du Nord de la Sardaigne à quelques minutes de la Residence Le Vele.',
      videoLabel: 'Vidéo de la plage La Pelosa à Stintino',
    },
    intro: {
      eyebrow: 'La plage',
      title: 'Célèbre dans le monde entier',
      lead:
        'La Pelosa fait face à la pointe nord-ouest de la Sardaigne : plage emblématique de Stintino, à quelques minutes de la Residence Le Vele.',
      body:
        'Au loin, l\'îlot de la Torre della Pelosa est le symbole iconique de Stintino. En été, l\'accès est réglementé pour préserver l\'environnement : nous recommandons de réserver à l\'avance et d\'arriver tôt, surtout en haute saison.',
      statValue: '~2 km',
      statLabel: 'De la Residence Le Vele',
    },
    gallery: {
      eyebrow: 'Galerie',
      title: 'Couleurs du Nord de la Sardaigne',
      lead: 'Vues aériennes, côte et eau turquoise : quatre regards sur la plage la plus emblématique de Stintino.',
      viewLabel: 'Agrandir',
      imageAlts: [
        'Vue aérienne de la plage La Pelosa, mer turquoise et Torre della Pelosa',
        'La Pelosa vue du ciel : côte, parasols et tour',
        'Lagune et sable blanc à La Pelosa avec mer cristalline',
        'Mer turquoise avec Torre della Pelosa à l\'horizon',
      ],
    },
    ui: {
      back: '← Residence Le Vele',
      scrollAria: 'Défiler vers le contenu',
      scrollLabel: 'Défiler',
      muteOn: 'Activer le son',
      muteOff: 'Couper le son',
      closeLightbox: 'Fermer',
      closeGallery: 'Fermer la galerie',
      openImage: 'Ouvrir l\'image : {alt}',
    },
  },
  suitePage: {
    notFound: 'Suite introuvable',
    backToSuites: '← Retour aux suites',
    backLink: '← Les studios',
    specsAria: 'Informations sur la suite',
    guests: '2–4',
    guestsLabel: 'hôtes',
    locationValue: 'Stintino',
    locationLabel: 'Sardaigne',
    typeValue: 'Studio',
    typeLabel: 'vacances',
    scrollAria: 'Défiler vers le contenu',
    scrollLabel: 'Défiler',
    experience: 'L\'expérience',
    storyNote:
      'Appartement de vacances à la Residence Le Vele — Stintino, à quelques minutes des plus belles plages du Nord de la Sardaigne.',
    amenitiesEyebrow: 'Équipements',
    amenitiesTitle: 'Tout le nécessaire',
    galleryAria: 'Galerie {title}',
    bookingEyebrow: 'Réservations',
    bookingTitle: 'Demander la disponibilité',
    bookingText:
      'Écrivez-nous avec les dates, le nombre d\'hôtes et vos préférences — nous vous répondrons avec un devis personnalisé.',
    bookingCta: 'Demander un devis',
    mailSubjectPrefix: 'Réservation',
    otherSuite: 'Autre suite',
    allSuites: '← Toutes les suites',
    heroAltSuffix: '— studio de vacances Stintino, Residence Le Vele',
  },
  header: {
    navAria: 'Menu principal',
    mainNavAria: 'Principal',
  },
  seo: {
    default: {
      title: 'Residence Le Vele | Appartements de vacances à Stintino, Sardaigne',
      description:
        'Residence Le Vele à Stintino : studios vue mer et jardin, séjours près de La Pelosa. Réservez votre appartement de vacances en Sardaigne.',
      keywords:
        'residence stintino, appartements vacances sardaigne, séjour bord de mer, la pelosa, cala lupo, studios stintino',
    },
    booking: {
      title: 'Residence Le Vele | Demander la disponibilité',
      description:
        'Demandez la disponibilité pour votre séjour à la Residence Le Vele à Stintino : dates, type de studio et nombre de voyageurs. Réponse personnalisée par e-mail.',
      keywords:
        'réserver residence stintino, demande disponibilité, studios stintino, appartements vacances sardaigne',
      breadcrumb: 'Demander la disponibilité',
    },
    pelosa: {
      title: 'La Pelosa Stintino | Residence Le Vele — Plage et mer',
      description:
        'La Pelosa à Stintino : l\'une des plus belles plages de Sardaigne, à quelques minutes de la Residence Le Vele.',
      keywords: 'la pelosa stintino, plage stintino, residence le vele, mer sardaigne',
    },
    privacy: {
      title: 'Politique de confidentialité | Residence Le Vele Stintino',
      description: 'Notice de confidentialité et traitement des données personnelles de la Residence Le Vele à Stintino.',
    },
    cookie: {
      title: 'Politique de cookies | Residence Le Vele Stintino',
      description: 'Politique de cookies et gestion du consentement du site Residence Le Vele.',
    },
    suiteTitleSuffix: '| Residence Le Vele — Appartements Stintino',
    suiteDescriptionSuffix: 'Réservez le studio à Stintino, près de La Pelosa.',
    suiteKeywords: 'studio stintino, appartements vacances sardaigne, residence le vele',
    fallbackTitleSuffix: '| Stintino, Sardaigne',
    ogImageAlt: 'Residence Le Vele — studios à Stintino, près de La Pelosa',
    breadcrumbHome: 'Accueil',
    schemaDescription:
      'Residence Le Vele à Stintino : studios vue mer et jardin, séjours près de La Pelosa.',
    schemaAmenities: [
      'Wi-Fi gratuit',
      'Climatisation',
      'Véranda ou terrasse',
      'Jardin privé',
      'Coin cuisine',
      'Vue mer',
    ],
    schemaTouristTypes: ['Familles', 'Couples', 'Randonneurs'],
    nearbyAttractions: [
      { name: 'La Pelosa', description: 'Plage emblématique de Stintino, à environ 2 km de la residence.' },
      { name: 'Baie de Cala Lupo', description: 'Baie paisible où se situe la Residence Le Vele.' },
      { name: 'Centre historique de Stintino', description: 'Village de pêcheurs du Nord de la Sardaigne, près de la residence.' },
    ],
  },
  errorBoundary: {
    title: 'Oups… un problème est survenu',
    body: 'Nos alliés préhistoriques s’en occupent. Rechargez la page ou revenez à l’accueil du Residence.',
    reload: 'Recharger la page',
    home: 'Retour au Residence',
    detailsLabel: 'Détails techniques',
  },
  ogLocale: 'fr_FR',
};
