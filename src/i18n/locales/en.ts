import type { LocaleCopy } from '../types';

export const en: LocaleCopy = {
  preloaderText: 'Residence Le Vele',
  directBookingPopup: {
    ariaLabel: 'Best price guaranteed',
    eyebrow: 'Direct booking',
    title: 'Best available offer',
    text: 'When you book directly on our website, you always get the best available offer at the best price.',
    bookCta: 'Check availability',
    closeCta: 'Got it',
  },
  addressCountry: 'Italy',
  hero: {
    kicker: 'Sardinia, North-West',
    titleLines: ['Beyond', 'the Horizon'],
    locationLine: 'Residence Le Vele · Cala Lupo, Stintino',
    microLine: 'Studios with terrace or garden, 300 m from the sea.',
    tagline: 'Your next holiday starts here …',
    lede:
      'Residence Le Vele in Stintino: holiday apartments in Sardinia for stays close to the sea. Wild nature, crystal-clear waters and white sand — one of the most beautiful seas on the island.',
    scrollAria: 'Scroll to the Residence',
    scrollLabel: 'Scroll',
    videoAria: 'Panoramic video of Sardinia — Residence Le Vele Stintino',
  },
  residenceIntro: {
    eyebrow: 'The residence',
    titleLine: 'Welcome to',
    titleBrandBefore: 'Residence',
    titleBrandAccent: 'Le Vele',
    location: 'Cala Lupo',
    locationLabel: 'Bay · Stintino',
    kicker:
      '300 m from the sea: the paved road ends at our residence; the little beach is a short walk along a path suitable for strollers and bikes.',
    lead:
      'Studios with veranda or terrace amid Mediterranean scrubland. A small shopping centre 300 m away with excellent value for money; minutes from Stintino, La Pelosa and the North Sardinia sea. A peaceful residence away from through traffic, for an authentic stay in Sardinia.',
    marquee: ['Cala Lupo', 'La Pelosa', 'Coves', 'North Sardinia', 'Stintino'],
    metricsAria: 'At a glance',
  },
  residenceHighlights: [
    { value: '300 m', label: 'From the sea' },
    { value: '300 m', label: 'Shopping centre' },
    { value: '~2 km', label: 'Stintino & Pelosa' },
  ],
  residenceCards: [
    {
      title: 'La Pelosa',
      description:
        'Just minutes from the Residence, La Pelosa is one of the most celebrated beaches in the Mediterranean: fine white sand, transparent turquoise water and the historic Aragonese Tower rising from the sea.',
      imageAlt: 'La Pelosa — beach and Torre della Pelosa, Stintino',
      linkLabel: 'Discover La Pelosa',
    },
    {
      title: 'Cala Lupo Bay',
      description:
        'The Residence stands where the paved road ends, 300 m from the sea. Cala Lupo bay is a quiet area about 2 km from the centre of Stintino: the little beach is a short walk along a flat path suitable for strollers and bicycles.',
      imageAlt: 'Cala Lupo beach — sand, turquoise sea and relaxation near the Residence',
    },
    {
      title: 'From above',
      description:
        'Residence Le Vele from the sky: coastline, pool and studios amid Mediterranean scrubland, steps from the Cala Lupo sea.',
      imageAlt: 'Aerial view of Residence Le Vele on the Stintino coast — Sardinia',
      images: [
        { alt: 'Aerial view of the coast and pool — Residence Le Vele, Stintino', caption: 'Coast & pool' },
        { alt: 'Aerial view of Residence Le Vele with apartments and the sea — Stintino', caption: 'The Residence' },
        { alt: 'Aerial sunset over Residence Le Vele and the sea — Stintino, Sardinia', caption: 'Sunset' },
      ],
    },
    {
      title: 'Getting here',
      description:
        'The Residence is easily reached via the main access routes of North Sardinia — by car, plane or ferry.',
      imageAlt: 'Travel connections to Stintino — North Sardinia airports and ports',
      routes: [
        { distance: '~50 km', label: 'Alghero Airport' },
        { distance: '~30 km', label: 'Porto Torres Port' },
        { distance: '~150 km', label: 'Olbia Port and Airport' },
        { distance: '~150 km', label: 'Golfo Aranci Port' },
      ],
      images: [
        { alt: 'Alghero Airport terminal', caption: 'Alghero Airport' },
        { alt: 'Porto Torres harbour aerial view', caption: 'Porto Torres Port' },
      ],
    },
    {
      title: 'Four-legged friends',
      description:
        'At Residence Le Vele your dog is welcome: quiet studios in the Mediterranean scrub, verandas and terraces to relax outdoors, and the Stintino coast — beaches and trails — just minutes away by car. We only ask you to respect other guests and local beach regulations.',
      imageAlt: 'Golden retriever running happily in shallow sea water in Sardinia',
    },
  ],
  residenceAccordion: {
    eyebrow: 'In detail',
    showcaseTitle: 'Location & surroundings',
    title: 'Services & activities',
    subtitle: 'Everything that makes your stay at Residence Le Vele comfortable, relaxed and close to the sea.',
    discoverMore: 'Find out more',
    navHint: 'Swipe the photo or select a preview',
  },
  residenceServices: {
    groups: [
      {
        id: 'free',
        title: 'Complimentary services',
        badge: 'Included',
        items: [
          { icon: 'luggage', label: 'Luggage storage' },
          { icon: 'tv', label: 'LCD TV' },
          { icon: 'courtesy-kit', label: 'Courtesy kit' },
          { icon: 'ac', label: 'Air conditioning' },
          { icon: 'wifi', label: 'Wi-Fi internet connection' },
          { icon: 'parking', label: 'Free unattended parking' },
        ],
      },
      {
        id: 'paid',
        title: 'Paid services',
        items: [
          { icon: 'extra-cleaning', label: 'Extra room cleaning' },
          { icon: 'laundry', label: 'Laundry' },
          { icon: 'transport', label: 'Transport services' },
        ],
      },
      {
        id: 'activities',
        title: 'Paid activities',
        items: [
          { icon: 'tennis', label: 'Tennis court' },
          { icon: 'bike-rental', label: 'Bike rental' },
          { icon: 'boat-rental', label: 'Boat and dinghy rental' },
          { icon: 'diving', label: 'Diving courses' },
          { icon: 'asinara', label: 'Excursions to Asinara Island' },
          { icon: 'guided-tours', label: 'Guided tours' },
        ],
      },
    ],
  },
  suitesIntro: {
    eyebrow: 'Accommodation',
    title: 'Studio apartments',
    count: '18',
    countLabel: 'studio apartments',
    kicker:
      '18 studios in two types — sea view and garden view — each sleeping 2 to 4 guests. Same quality, two ways to experience Stintino.',
    capacityNote: '18 studios in total — same layout, two views (sea and garden).',
    capacityGrid: {
      aria: 'Studio overview by guest capacity and view',
      sea: 'Sea',
      garden: 'Garden',
      seats2: '2 guests',
      seats3: '3 guests',
      seats4: '4 guests',
      seatsUnit: 'guests',
      available: 'Available',
    },
    marquee: ['Sea view', 'Garden view', 'Studio apartments', 'Stintino', 'La Pelosa'],
    cardToggleDayAria: 'Show daytime photo',
    cardToggleNightAria: 'Show night photo',
  },
  suites: {
    'vista-giardino': {
      title: 'Garden View',
      kicker: 'Studio for 2, 3 or 4 guests',
      tagline: 'Veranda, private garden and the quiet of the Mediterranean scrubland.',
      description:
        'Studios for 2, 3 or 4 guests: an extra single bed for 3 guests, a bunk bed for 4 (in addition to the double). Covered veranda and private garden access. Renovated bathrooms — either a larger walk-in shower or a compact shower with bidet, depending on the unit.',
      features: [
        '2, 3 or 4 guests',
        'Single bed (3 guests)',
        'Bunk bed (4 guests)',
        'Covered veranda',
        'Private garden',
        'Renovated bathroom',
        'Kitchenette',
        'Free Wi-Fi',
      ],
      galleryAlts: [
        'Covered veranda, patio and private garden — garden-view studio Le Vele',
        'Terrace with outdoor seating, garden and sea view — Residence Le Vele, Stintino',
        'Dining set on the veranda with moka pot and garden view — garden-view studio Le Vele',
        'Breakfast on the veranda with moka, white flowers and garden — Residence Le Vele, Stintino',
        'Bedroom with double bed and private bathroom — garden-view studio Le Vele',
        'Bed detail with rolled towels and hibiscus, patio view — garden-view studio Le Vele',
        'Bunk bed in the garden-view studio — 4-guest layout',
        'Studio interior with kitchenette — Residence Le Vele',
        'Private garden and covered veranda — Residence Le Vele, Stintino',
        'Covered veranda and outdoor area — holiday apartment Sardinia',
        'Renovated bathroom with washbasin and modern finishes — Le Vele studio',
        'Renovated bathroom with walk-in shower — Le Vele studio',
      ],
      listLabel: 'Garden',
      discoverAria: 'Discover Garden View',
      exploreCta: 'Discover the studio',
      galleryKicker: 'The studio · garden view',
      galleryTitle: 'Full immersion',
    },
    'vista-mare': {
      title: 'Sea View',
      kicker: 'Studio for 2, 3 or 4 guests',
      tagline: 'Private terrace and light over Stintino bay.',
      description:
        'Studios for 2, 3 or 4 guests: an extra single bed for 3 guests, a bunk bed for 4 (in addition to the double). Private terrace over the bay, North Sardinia light and sunsets towards La Pelosa. Renovated bathrooms — larger shower without bidet or compact shower with bidet, depending on the unit.',
      features: [
        '2, 3 or 4 guests',
        'Single bed (3 guests)',
        'Bunk bed (4 guests)',
        'Private terrace',
        'Equipped kitchen hob',
        'Renovated bathroom',
        'Air conditioning',
        'Free Wi-Fi',
      ],
      galleryAlts: [
        'Dining table and terrace with sea view — Le Vele studio',
        'Kitchenette and terrace access with sea view — Residence Le Vele',
        'Furnished terrace overlooking the studio and the sea — Le Vele',
        'Sea-view studio with terrace and bay light — Residence Le Vele',
        'Covered terrace with table, moka pot and sea view — Le Vele studio',
        'Breakfast on the terrace with moka and oleander — sea view Stintino',
        'Double bedroom with hibiscus and wooden furniture — sea-view studio',
        'Welcome detail with rolled towels and red hibiscus — Le Vele',
        'Equipped kitchenette and dining area — sea-view studio',
        'Bunk bed with sea view — 4-guest layout',
        'Panorama from the sea-view suite — Stintino, Sardinia',
        'Terrace with sea view — studio Residence Le Vele, Stintino',
        'Interior detail of the sea-view studio — Le Vele',
        'Renovated bathroom with washbasin and modern finishes — Le Vele studio',
        'Renovated bathroom with large walk-in shower — Le Vele studio',
      ],
      listLabel: 'Sea',
      discoverAria: 'Discover Sea View',
      exploreCta: 'Discover the studio',
      galleryKicker: 'The studio · sea view',
      galleryTitle: 'Full immersion',
    },
  },
  residenceWelcome: {
    galleryAria: 'Photo gallery of Residence Le Vele',
    imageAlts: [
      'Aerial golden-hour view of Residence Le Vele with piazza and gardens — Stintino',
      'Private terrace with wooden pergola, table and sea view — Residence Le Vele',
      'Aerial view of Residence Le Vele by the sea — Stintino',
      'Studio terraces with wooden pergola and sea view — Le Vele',
      'Traditional lateen-sail boat off the Stintino coast',
      'Square with gazebos, umbrellas and sea view — Residence Le Vele',
      'Aerial view of the coast and beach — Residence Le Vele, Stintino',
    ],
    closeLabel: 'Close gallery',
    prevLabel: 'Previous image',
    nextLabel: 'Next image',
    counterLabel: '{current} / {total}',
    autoplayLabel: 'Browse photos',
  },
  offers: {
    sectionEyebrow: 'Packages',
    sectionTitle: 'Offers & stays',
    sectionBenefit: 'Live availability and rates, updated in real time.',
    items: [
      {
        title: 'Couple Relax Package',
        period: 'Spring and early summer',
        badge: 'Signature',
        description:
          '3 nights in a sea-view or garden-view studio, welcome drink on arrival and late check-out subject to availability.',
      },
      {
        title: 'Family Offer',
        period: 'June – September',
        badge: 'Family Choice',
        description:
          'Stay for 4 guests with a reduced rate for weekly bookings and dedicated support for excursions.',
      },
      {
        title: 'Direct booking',
        period: 'On the official website',
        badge: 'Direct',
        description:
          'Live availability and rates, updated in real time on the booking engine.',
      },
    ],
  },
  infoServices: {
    eyebrow: 'Information',
    title: 'Info & conditions',
    kicker: 'Arrivals / Departures',
    checkInTitle: 'Check-in',
    checkInTime: 'from 3:30 pm to 7:00 pm',
    checkOutTitle: 'Check-out',
    checkOutTime: 'by 10:00 am',
    noteLateCheckIn:
      'If checking in after 8:00 pm, please notify us at least 48 hours in advance by phone or email.',
    noteSupplement:
      'Management reserves the right to apply a supplement of €30.00 for late arrivals without prior notice.',
    noteDeposit:
      'A security deposit will be required at check-in and returned at check-out, unless charges apply.',
    noteCleaningPenalty:
      'If the accommodation is not left clean at check-out, management reserves the right to apply a cleaning penalty.',
    conditionsTitle: 'Conditions',
    conditions: [
      'A child under 2 years old pays EUR 5 per person per night for a cot/crib.',
      'The maximum number of cots per room is 1.',
      'Any extra bed, cot/crib or high chair is subject to availability and must be confirmed by management upon request.',
      'Supplements are not calculated automatically in the total price and must be paid separately during your stay.',
      'Cancellation is free for standard bookings up to 7 days before the arrival date. In case of late cancellation or no-show, the full booking cost will be charged.',
      'Cancellation is not free for non-refundable bookings and incurs a penalty equal to the full cost of the booking and stay.',
      'Final cleaning and bed linen and towels on arrival are included in the price. Linen is changed weekly for stays longer than 8 nights.',
      'Daily housekeeping, extra linen changes and kitchenette cleaning are optional supplementary costs.',
      'Rates do not include any meals.',
      'Pets (dogs/cats) are welcome.',
      'On-site parking available for guests.',
    ],
  },
  reviews: {
    eyebrow: 'Reviews',
    title: 'What our guests say',
    subtitleBefore: 'Excerpts from',
    subtitleAfter: '.',
    marqueeAria: 'Guest reviews',
    prevAria: 'Previous review',
    nextAria: 'Next review',
    ratingAria: 'Rating {rating} out of 5',
    openOn: 'Open on {platform} →',
    summary: {
      reviewCountLabel: 'reviews',
      google: {
        rating: 4.9,
        reviewCount: 142,
        platformLabel: 'Google',
        summaryText: 'Excellent on Google: guests praise the location, cleanliness and welcome.',
      },
      tripadvisor: {
        rating: 4.5,
        reviewCount: 96,
        platformLabel: 'Tripadvisor',
        summaryText: 'Strong Tripadvisor scores for the sea, quiet setting and family stays.',
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
          'Quiet location in Cala Lupo bay, just minutes from the centre of Stintino and La Pelosa. Clean, functional studios and a terrace with a stunning view. Highly recommended for a relaxing holiday.',
      },
      {
        id: 'g-2',
        source: 'google',
        rating: 5,
        author: 'Marco Bianchi',
        dateLabel: '2024',
        text:
          'Well-kept property, fully equipped kitchenette and friendly staff. The beach is within a few minutes’ walk. We had a wonderful stay.',
      },
      {
        id: 'ta-1',
        source: 'tripadvisor',
        rating: 5,
        author: 'Alessandra M.',
        dateLabel: '2024',
        text:
          'Residence set in a natural environment, with easy access to the coves. Spacious, well-maintained apartments — ideal for families or couples.',
      },
      {
        id: 'ta-2',
        source: 'tripadvisor',
        rating: 4,
        author: 'Paolo Deiana',
        dateLabel: '2023',
        text:
          'Excellent base for visiting Stintino and North Sardinia. Sea view from the terrace, convenient parking and essential amenities for a self-catering stay.',
      },
      {
        id: 'g-3',
        source: 'google',
        rating: 5,
        author: 'Francesca L.',
        dateLabel: '2023',
        text:
          'Cala Lupo is a corner of paradise: peace and quiet, crystal-clear sea just steps away and tidy studios. We will definitely return.',
      },
      {
        id: 'g-4',
        source: 'google',
        rating: 4,
        author: 'Giuseppe Conti',
        dateLabel: '2023',
        text:
          'Helpful staff and straightforward check-in. The terrace with a view makes every breakfast special. Wi-Fi fine for basic needs.',
      },
      {
        id: 'ta-3',
        source: 'tripadvisor',
        rating: 5,
        author: 'Chiara Ferretti',
        dateLabel: '2024',
        text:
          'Family with children: enough space, full kitchen and minimal distance to the sand. La Pelosa just a few minutes by car.',
      },
      {
        id: 'ta-4',
        source: 'tripadvisor',
        rating: 4,
        author: 'Roberto Sanna',
        dateLabel: '2023',
        text:
          'A very pleasant week-long stay. Quiet area in the evening — ideal for those seeking rest after days at the sea.',
      },
      {
        id: 'g-5',
        source: 'google',
        rating: 5,
        author: 'Valentina P.',
        dateLabel: '2024',
        text:
          'Impeccable cleanliness and fresh linen on arrival. The residence is well maintained and surrounded by Mediterranean scrubland.',
      },
      {
        id: 'ta-5',
        source: 'tripadvisor',
        rating: 5,
        author: 'Luca & Marta G.',
        dateLabel: '2024',
        text:
          'Couple on holiday: sea-view terrace at sunset, peace and quiet and the scent of broom. Recommended for those who love North Sardinia.',
      },
    ],
  },
  contactIntro: {
    eyebrow: 'Contact us',
    title: 'Contact',
    kicker:
      'Bookings and enquiries for holiday apartments in Stintino: phone, email and directions to reach Residence Le Vele.',
  },
  contactLabels: {
    phone: 'Phone',
    mobile: 'Mobile',
    email: 'Email',
    address: 'Address',
    directions: 'Get directions',
    bookStay: 'Book your stay',
  },
  contactCustomOffer: {
    title: 'Personalised quote',
    text: 'For specific requests you can ask for a tailored quote: email us with your dates, number of guests and preferred apartment type, or call us directly.',
  },
  contactPhotoAlts: [
    'Aerial view of the Stintino coast with pool and coves — Residence Le Vele',
    'Sunset over the Residence Le Vele headland — Stintino, Sardinia',
    'Aerial view of Residence Le Vele with apartments and the sea — Stintino, Sardinia',
  ],
  siteMap: {
    placeholderAlt: 'Cala Lupo Bay — area of Residence Le Vele in Stintino',
    badgeLabel: 'Residence Le Vele — Stintino',
    iframeTitle: 'Interactive map — Residence Le Vele Stintino',
    enableLabel: 'Enable map',
    enableHint:
      'The interactive Google map uses third-party cookies. Enable your preferences to view it.',
    activateAria: 'Activate interactive map',
    mapSectionAria: 'Residence map',
  },
  footer: {
    about:
      'Residence in Stintino for holidays in Sardinia: apartments near La Pelosa, with privacy, comfort and the atmosphere of North Sardinia.',
    explore: 'Explore',
    contacts: 'Contact',
    designBy: 'Design by',
    starsAria: '3-star rating',
    instagramAria: 'Residence Le Vele on Instagram',
    footerNavAria: 'Footer navigation',
    legalNavAria: 'Privacy and cookies',
  },
  pelosa: {
    hero: {
      eyebrow: 'Stintino, Sardinia',
      title: 'La Pelosa',
      tagline: 'One of the most celebrated beaches in the Mediterranean.',
      lede:
        'White sand, turquoise water and the Aragonese Tower: a symbol of North Sardinia just minutes from Residence Le Vele.',
      videoLabel: 'Video of La Pelosa beach in Stintino',
    },
    intro: {
      eyebrow: 'The beach',
      title: 'Famous worldwide',
      lead:
        'La Pelosa faces the north-western tip of Sardinia: an iconic beach in Stintino, just minutes from Residence Le Vele.',
      body:
        'In the distance, the islet of Torre della Pelosa is the iconic symbol of Stintino. In summer, access is regulated to protect the environment: we recommend booking in advance and arriving early, especially in high season.',
      statValue: '~2 km',
      statLabel: 'From Residence Le Vele',
    },
    gallery: {
      eyebrow: 'Gallery',
      title: 'Colours of North Sardinia',
      lead: "Aerial views, coastline and turquoise water: four perspectives on Stintino's most iconic beach.",
      viewLabel: 'Enlarge',
      imageAlts: [
        'Aerial view of La Pelosa beach, turquoise sea and Torre della Pelosa',
        'La Pelosa from above: coastline, sun umbrellas and tower',
        'Lagoon and white sand at La Pelosa with crystal-clear sea',
        'Turquoise sea with Torre della Pelosa on the horizon',
      ],
    },
    ui: {
      back: '← Residence Le Vele',
      scrollAria: 'Scroll to content',
      scrollLabel: 'Scroll',
      muteOn: 'Unmute',
      muteOff: 'Mute',
      closeLightbox: 'Close',
      closeGallery: 'Close gallery',
      openImage: 'Open image: {alt}',
    },
  },
  suitePage: {
    notFound: 'Suite not found',
    backToSuites: '← Back to suites',
    backLink: '← Studio apartments',
    specsAria: 'Suite information',
    guests: '2 / 3 / 4',
    guestsLabel: 'guests',
    locationValue: 'Stintino',
    locationLabel: 'Sardinia',
    typeValue: 'Studio',
    typeLabel: 'holiday',
    scrollAria: 'Scroll to content',
    scrollLabel: 'Scroll',
    experience: 'The experience',
    storyNote:
      'Holiday apartment at Residence Le Vele — Stintino, minutes from the most beautiful beaches of North Sardinia.',
    galleryAria: 'Gallery {title}',
    viewAllPhotos: 'See all photos',
    bookingEyebrow: 'Bookings',
    bookingTitle: 'Request availability',
    bookingText:
      'Write to us with dates, number of guests and preferences — we will reply with a personalised quote.',
    bookingCta: 'Request a quote',
    bookingBookCta: 'Book',
    mailSubjectPrefix: 'Booking',
    otherSuite: 'Other studio',
    allSuites: '← All studios',
    heroAltSuffix: '— holiday studio Stintino, Residence Le Vele',
  },
  header: {
    navAria: 'Main menu',
    mainNavAria: 'Main',
  },
  seo: {
    default: {
      title: 'Residence Le Vele | Holiday apartments in Stintino, Sardinia',
      description:
        'Residence Le Vele in Stintino: sea-view and garden-view studios, stays near La Pelosa. Book your holiday apartment in Sardinia.',
      keywords:
        'residence stintino, holiday apartments sardinia, seaside stay, la pelosa, cala lupo, studios stintino',
    },
    booking: {
      title: 'Residence Le Vele | Request availability',
      description:
        'Request availability for your stay at Residence Le Vele in Stintino: share dates, studio type and number of guests. Personalised reply by email.',
      keywords:
        'book residence stintino, availability request, studio apartments stintino, sardinia holiday apartments',
      breadcrumb: 'Request availability',
    },
    info: {
      title: 'Residence Le Vele | Stay info & conditions',
      description:
        'Check-in, check-out, booking conditions, deposit, pets and parking at Residence Le Vele in Stintino.',
      keywords:
        'residence stintino info, stay conditions, check-in check-out, sardinia apartment booking',
      breadcrumb: 'Info & conditions',
    },
    contact: {
      title: 'Residence Le Vele | Contact & directions',
      description:
        'Phone, email and directions to Residence Le Vele in Stintino: bookings and enquiries for holiday apartments in Sardinia.',
      keywords:
        'residence stintino contact, le vele directions, stintino booking phone, sardinia holiday apartments',
      breadcrumb: 'Contact',
    },
    pelosa: {
      title: 'La Pelosa Stintino | Residence Le Vele — Beach and sea',
      description:
        'La Pelosa in Stintino: one of the most beautiful beaches in Sardinia, minutes from Residence Le Vele.',
      keywords: 'la pelosa stintino, stintino beach, residence le vele, sardinia sea',
    },
    privacy: {
      title: 'Privacy Policy | Residence Le Vele Stintino',
      description: 'Privacy notice and personal data processing at Residence Le Vele in Stintino.',
    },
    cookie: {
      title: 'Cookie Policy | Residence Le Vele Stintino',
      description: 'Cookie policy and consent management for the Residence Le Vele website.',
    },
    suiteTitleSuffix: '| Residence Le Vele — Apartments Stintino',
    suiteDescriptionSuffix: 'Book the studio in Stintino, near La Pelosa.',
    suiteKeywords: 'studio stintino, holiday apartments sardinia, residence le vele',
    fallbackTitleSuffix: '| Stintino, Sardinia',
    ogImageAlt: 'Residence Le Vele — studio apartments in Stintino, near La Pelosa',
    breadcrumbHome: 'Home',
    schemaDescription:
      'Residence Le Vele in Stintino: sea-view and garden-view studios, stays near La Pelosa.',
    schemaAmenities: [
      'Free Wi-Fi',
      'Air conditioning',
      'Veranda or terrace',
      'Private garden',
      'Kitchenette',
      'Sea view',
    ],
    schemaTouristTypes: ['Families', 'Couples', 'Hikers'],
    nearbyAttractions: [
      { name: 'La Pelosa', description: 'Iconic beach in Stintino, about 2 km from the residence.' },
      {
        name: 'Cala Lupo Bay',
        description:
          'Little beach 300 m from the Residence, reachable on foot along a path suitable for strollers and bikes.',
      },
      {
        name: 'Shopping centre',
        description: 'Small shopping centre 300 m away with excellent value for money.',
      },
      { name: 'Historic centre of Stintino', description: 'Fishing village in North Sardinia, near the residence.' },
    ],
  },
  errorBoundary: {
    title: 'Oops… something went wrong',
    body: 'Our prehistoric helpers are on it. Try reloading the page or return to the Residence home.',
    reload: 'Reload page',
    home: 'Back to Residence',
    detailsLabel: 'Technical details',
  },
  ogLocale: 'en_GB',
};
