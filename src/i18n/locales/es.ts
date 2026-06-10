import type { LocaleCopy } from '../types';

export const es: LocaleCopy = {
  preloaderText: 'Residence Le Vele',
  addressCountry: 'Italia',
  hero: {
    kicker: 'Cerdeña, Noroeste',
    titleLines: ['Más allá', 'del horizonte'],
    tagline: 'Sus próximas vacaciones empiezan aquí …',
    lede:
      'Residence Le Vele en Stintino: apartamentos de vacaciones en Cerdeña para estancias cerca del mar. Naturaleza salvaje, fondos marinos cristalinos y arena blanca — uno de los mares más bellos de la isla.',
    scrollAria: 'Desplazarse hacia la Residence',
    scrollLabel: 'Desplazar',
    videoAria: 'Vídeo panorámico de Cerdeña — Residence Le Vele Stintino',
  },
  residenceIntro: {
    eyebrow: 'La residence',
    titleLine: 'Bienvenido a',
    titleBrandBefore: 'Residence',
    titleBrandAccent: 'Le Vele',
    location: 'Cala Lupo',
    locationLabel: 'Bahía · Stintino',
    kicker: 'Entre Cala Lupo y el mar del norte de Cerdeña, a pocos minutos de Stintino y La Pelosa.',
    lead:
      'Estudios con veranda o terraza en plena macchia mediterránea: apartamentos de vacaciones en Stintino, a pocos minutos de La Pelosa y del mar del norte de Cerdeña. Una residence tranquila para quienes buscan estancias auténticas en Cerdeña.',
    marquee: ['Cala Lupo', 'La Pelosa', 'Calas', 'Norte Cerdeña', 'Stintino'],
    metricsAria: 'En resumen',
  },
  residenceHighlights: [
    { value: 'Cala Lupo', label: 'Bahía' },
    { value: '~2 km', label: 'Centro y Pelosa' },
    { value: 'Icónica', label: 'La Pelosa' },
  ],
  residenceCards: [
    {
      title: 'Bahía de Cala Lupo',
      description:
        'La Residence se encuentra en la bahía de Cala Lupo, en una zona tranquila a unos 2 km del centro de Stintino, entre macchia mediterránea y el mar del norte de Cerdeña.',
      imageAlt: 'Bahía de Cala Lupo — playa y mar turquesa cerca de la Residence',
    },
    {
      title: 'La Pelosa',
      description:
        'A pocos minutos de la Residence, La Pelosa es una de las playas más célebres del Mediterráneo: arena blanca finísima, agua turquesa transparente y la histórica Torre aragonesa que emerge del mar.',
      imageAlt: 'La Pelosa — playa y Torre della Pelosa, Stintino',
      linkLabel: 'Descubrir La Pelosa',
    },
    {
      title: 'Cómo llegar',
      description:
        'La Residence es fácilmente accesible por las principales vías de acceso del norte de Cerdeña — en coche, avión o ferry.',
      imageAlt: 'Conexiones con Stintino — aeropuertos y puertos del norte de Cerdeña',
      routes: [
        { distance: '~50 km', label: 'Aeropuerto de Alghero' },
        { distance: '~30 km', label: 'Puerto de Porto Torres' },
        { distance: '~150 km', label: 'Puerto y aeropuerto de Olbia' },
        { distance: '~150 km', label: 'Puerto de Golfo Aranci' },
      ],
      images: [
        { alt: 'Terminal del aeropuerto de Alghero', caption: 'Aeropuerto de Alghero' },
        { alt: 'Vista aérea del puerto de Olbia', caption: 'Puerto de Olbia' },
      ],
    },
    {
      title: 'Amigos de cuatro patas',
      description:
        'En Residence Le Vele tu perro es bienvenido: monolocales tranquilos entre la macchia, porches y terrazas al aire libre, y la costa de Stintino — playas y senderos — a pocos minutos en coche. Solo pedimos respetar a las demás familias y la normativa de las playas.',
      imageAlt: 'Golden retriever corriendo feliz en el agua poco profunda del mar en Cerdeña',
    },
  ],
  residenceAccordion: {
    eyebrow: 'En detalle',
    showcaseTitle: 'Ubicación y alrededores',
    title: 'Servicios y actividades',
    subtitle: 'Todo lo que hace tu estancia en Residence Le Vele cómoda, relajada y cerca del mar.',
    discoverMore: 'Descubrir más',
    navHint: 'Desliza la foto o selecciona una vista previa',
  },
  residenceServices: {
    groups: [
      {
        id: 'free',
        title: 'Servicios gratuitos',
        badge: 'Incluidos',
        items: [
          { icon: 'luggage', label: 'Depósito de equipaje' },
          { icon: 'tv', label: 'TV LCD' },
          { icon: 'courtesy-kit', label: 'Kit de cortesía' },
          { icon: 'ac', label: 'Aire acondicionado' },
          { icon: 'wifi', label: 'Conexión a internet Wi-Fi' },
        ],
      },
      {
        id: 'paid',
        title: 'Servicios de pago',
        items: [
          { icon: 'extra-cleaning', label: 'Limpieza extra de la habitación' },
          { icon: 'laundry', label: 'Lavandería' },
          { icon: 'transport', label: 'Servicios de transporte' },
        ],
      },
      {
        id: 'activities',
        title: 'Actividades de pago',
        items: [
          { icon: 'tennis', label: 'Pista de tenis' },
          { icon: 'bike-rental', label: 'Alquiler de bicicletas' },
          { icon: 'boat-rental', label: 'Alquiler de barcos y neumáticas' },
          { icon: 'diving', label: 'Cursos de submarinismo' },
          { icon: 'asinara', label: 'Excursiones a la isla de Asinara' },
          { icon: 'guided-tours', label: 'Visitas guiadas' },
        ],
      },
    ],
  },
  suitesIntro: {
    eyebrow: 'Alojamientos',
    title: 'Los estudios',
    count: '18',
    countLabel: 'estudios',
    kicker: 'Dos ambientes — mar y jardín — para vivir Stintino con la privacidad de una residence.',
    marquee: ['Vista mar', 'Vista jardín', 'Estudios', 'Stintino', 'La Pelosa'],
  },
  suites: {
    'vista-giardino': {
      title: 'Con Vista Jardín',
      kicker: 'Estudio para 2 o 4 personas',
      tagline: 'Veranda, jardín privado y la calma de la macchia.',
      description:
        'Estudio con veranda cubierta y jardín privado: cama doble y litera para hasta 4 personas. Baños reformados — ducha walk-in amplia o ducha compacta con bidé según el alojamiento.',
      features: [
        'Veranda cubierta',
        'Jardín privado',
        'Litera',
        'Baño reformado',
        'Rincón cocina',
        'Wi-Fi gratuito',
      ],
      galleryAlts: [
        'Interior del estudio con vista jardín y zona de comedor — Le Vele',
        'Litera en el estudio con vista jardín — hasta 4 personas',
        'Interior del estudio con rincón cocina — Residence Le Vele',
        'Jardín privado y veranda cubierta — Residence Le Vele, Stintino',
        'Veranda cubierta y zona exterior — apartamento de vacaciones Cerdeña',
        'Baño reformado con lavabo y acabados modernos — estudio Le Vele',
        'Baño reformado con ducha walk-in — estudio Le Vele',
      ],
      listLabel: 'Jardín',
      discoverAria: 'Descubrir Con Vista Jardín',
      exploreCta: 'Explorar la suite',
    },
    'vista-mare': {
      title: 'Con Vista Mar',
      kicker: 'Estudio para 2 o 4 personas',
      tagline: 'Terraza privada y luz sobre la bahía de Stintino.',
      description:
        'Estudio con terraza privada sobre la bahía: cama doble y litera para hasta 4 personas, luz del norte de Cerdeña y atardeceres hacia La Pelosa. Baños reformados — ducha amplia sin bidé o ducha compacta con bidé según el alojamiento.',
      features: [
        'Terraza privada',
        'Vista mar',
        'Litera',
        'Baño reformado',
        'Aire acondicionado',
        'Wi-Fi gratuito',
      ],
      galleryAlts: [
        'Estudio con vista mar y terraza sobre la bahía — Residence Le Vele',
        'Litera con vistas al mar — estudio Stintino',
        'Panorama desde la suite con vista mar — Stintino, Cerdeña',
        'Terraza con vista mar — estudio Residence Le Vele, Stintino',
        'Detalle interior del estudio con vista mar — Le Vele',
        'Baño reformado con lavabo y acabados modernos — estudio Le Vele',
        'Baño reformado con ducha walk-in amplia — estudio Le Vele',
      ],
      listLabel: 'Mar',
      discoverAria: 'Descubrir Con Vista Mar',
      exploreCta: 'Explorar la suite',
    },
  },
  gallery: {
    title: 'Atmósfera Le Vele',
    imageAlts: [
      'Jardín de la Residence Le Vele en Stintino con macchia mediterránea',
      'Estudio con vista mar — Residence Le Vele, Stintino',
      'Zona verde y veranda — apartamentos de vacaciones Cerdeña',
      'Terraza con vista mar en la Residence Le Vele, Stintino',
      'Interior de estudio con vista mar y balcón al mar — Le Vele, Stintino',
      'Zona común exterior con terraza, mobiliario y vista al mar — Residence Le Vele',
    ],
    closeLabel: 'Cerrar galería',
    prevLabel: 'Imagen anterior',
    nextLabel: 'Imagen siguiente',
    counterLabel: '{current} / {total}',
  },
  offers: {
    sectionEyebrow: 'Paquetes',
    sectionTitle: 'Ofertas y estancias',
    items: [
      {
        title: 'Paquete Pareja Relax',
        period: 'Primavera y principios de verano',
        badge: 'Signature',
        description:
          '3 noches en estudio con vista mar o jardín, cóctel de bienvenida a la llegada y late check-out según disponibilidad.',
      },
      {
        title: 'Oferta Familiar',
        period: 'Junio – Septiembre',
        badge: 'Family Choice',
        description:
          'Estancia para 4 huéspedes con tarifa reducida para reservas semanales y asistencia dedicada para excursiones.',
      },
      {
        title: 'Stay Longer',
        period: 'Desde 7 noches',
        badge: 'Best Value',
        description:
          'Descuento progresivo en noches adicionales para disfrutar de Stintino con más tiempo y sin prisas.',
      },
    ],
  },
  infoServices: {
    eyebrow: 'Información',
    title: 'Info y condiciones',
    kicker: 'Llegadas / Salidas',
    checkInTitle: 'Check-in',
    checkInTime: 'de 15:30 a 19:00',
    checkOutTitle: 'Check-out',
    checkOutTime: 'antes de las 10:00',
    noteLateCheckIn:
      'En caso de check-in después de las 20:00, rogamos avisar con al menos 48 horas de antelación por teléfono o correo electrónico.',
    noteSupplement:
      'La dirección se reserva el derecho de aplicar un suplemento de 30,00 € por llegadas tardías sin comunicación previa.',
    noteDeposit:
      'En el check-in se solicitará una fianza en concepto de garantía, devuelta en el check-out salvo cargos aplicables.',
    noteCleaningPenalty:
      'Si el alojamiento no se deja limpio en el check-out, la dirección se reserva el derecho de aplicar una penalización por limpieza extra.',
    conditionsTitle: 'Condiciones',
    conditions: [
      'Un niño menor de 2 años paga 5 EUR por persona y noche por cuna.',
      'El número máximo de cunas por habitación es 1.',
      'Cualquier cama adicional, cuna o trona está sujeta a disponibilidad y debe ser confirmada por la dirección previa solicitud.',
      'Los suplementos no se calculan automáticamente en el importe total y deberán abonarse por separado durante la estancia.',
      'La cancelación es gratuita para reservas estándar hasta 7 días antes de la fecha de llegada. En caso de cancelación tardía o no presentación, se cargará el importe total de la reserva.',
      'La cancelación no es gratuita para reservas no reembolsables y conlleva una penalización igual al coste total de la reserva y la estancia.',
      'La limpieza final y el suministro de ropa de cama y toallas a la llegada están incluidos en el precio. El cambio de ropa de cama es semanal para estancias superiores a 8 noches.',
      'El repaso diario, el cambio extra de ropa de cama y la limpieza de la cocina son costes suplementarios opcionales.',
      'Las tarifas no incluyen ninguna comida.',
      'Se admiten mascotas (perros/gatos).',
      'Aparcamiento interior disponible para los huéspedes.',
    ],
  },
  reviews: {
    eyebrow: 'Reseñas',
    title: 'Lo que dicen nuestros huéspedes',
    subtitleBefore: 'Extractos de',
    subtitleAfter: '.',
    marqueeAria: 'Reseñas de huéspedes',
    prevAria: 'Reseña anterior',
    nextAria: 'Reseña siguiente',
    ratingAria: 'Valoración {rating} de 5',
    openOn: 'Abrir en {platform} →',
    summary: {
      reviewCountLabel: 'reseñas',
      google: {
        rating: 4.9,
        reviewCount: 142,
        platformLabel: 'Google',
        summaryText: 'Excelente en Google: los huéspedes destacan ubicación, limpieza y trato.',
      },
      tripadvisor: {
        rating: 4.5,
        reviewCount: 96,
        platformLabel: 'Tripadvisor',
        summaryText: 'Muy buenas puntuaciones en Tripadvisor por el mar, la tranquilidad y familias.',
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
          'Ubicación tranquila en la bahía de Cala Lupo, a pocos minutos del centro de Stintino y de La Pelosa. Estudios limpios y funcionales, terraza con una vista espléndida. Muy recomendable para unas vacaciones relajadas.',
      },
      {
        id: 'g-2',
        source: 'google',
        rating: 5,
        author: 'Marco Bianchi',
        dateLabel: '2024',
        text:
          'Establecimiento cuidado, rincón cocina equipado y personal amable. La playa se alcanza a pie en pocos minutos. Lo pasamos muy bien.',
      },
      {
        id: 'ta-1',
        source: 'tripadvisor',
        rating: 5,
        author: 'Alessandra M.',
        dateLabel: '2024',
        text:
          'Residence inmersa en un entorno natural, con acceso cómodo a las calas. Apartamentos amplios y bien mantenidos — ideal para familias o parejas.',
      },
      {
        id: 'ta-2',
        source: 'tripadvisor',
        rating: 4,
        author: 'Paolo Deiana',
        dateLabel: '2023',
        text:
          'Excelente base para visitar Stintino y el norte de Cerdeña. Vista mar desde la terraza, aparcamiento cómodo y servicios esenciales para una estancia autónoma.',
      },
      {
        id: 'g-3',
        source: 'google',
        rating: 5,
        author: 'Francesca L.',
        dateLabel: '2023',
        text:
          'Cala Lupo es un rincón de paraíso: silencio, mar cristalino a dos pasos y estudios ordenados. Volveremos sin duda.',
      },
      {
        id: 'g-4',
        source: 'google',
        rating: 4,
        author: 'Giuseppe Conti',
        dateLabel: '2023',
        text:
          'Personal disponible y check-in sencillo. La terraza con vistas hace especial cada desayuno. Wi-Fi correcto para necesidades básicas.',
      },
      {
        id: 'ta-3',
        source: 'tripadvisor',
        rating: 5,
        author: 'Chiara Ferretti',
        dateLabel: '2024',
        text:
          'Familia con niños: espacio suficiente, cocina completa y mínima distancia a la arena. La Pelosa en coche en pocos minutos.',
      },
      {
        id: 'ta-4',
        source: 'tripadvisor',
        rating: 4,
        author: 'Roberto Sanna',
        dateLabel: '2023',
        text:
          'Estancia de una semana muy agradable. Zona tranquila por la noche — ideal para quien busca descanso tras días en el mar.',
      },
      {
        id: 'g-5',
        source: 'google',
        rating: 5,
        author: 'Valentina P.',
        dateLabel: '2024',
        text:
          'Limpieza impecable y sábanas frescas a la llegada. La residence está bien cuidada e inmersa en la macchia mediterránea.',
      },
      {
        id: 'ta-5',
        source: 'tripadvisor',
        rating: 5,
        author: 'Luca & Marta G.',
        dateLabel: '2024',
        text:
          'Pareja de vacaciones: terraza con vista mar al atardecer, silencio y aroma de retama. Recomendado para quienes aman el norte de Cerdeña.',
      },
    ],
  },
  contactIntro: {
    eyebrow: 'Contáctenos',
    title: 'Contacto',
    kicker:
      'Reservas y consultas para apartamentos de vacaciones en Stintino: teléfono, correo electrónico e indicaciones para llegar a la Residence Le Vele.',
  },
  contactLabels: {
    phone: 'Teléfono',
    mobile: 'Móvil',
    email: 'Correo electrónico',
    address: 'Dirección',
  },
  siteMap: {
    placeholderAlt: 'Bahía de Cala Lupo — zona de la Residence Le Vele en Stintino',
    badgeLabel: 'Residence Le Vele — Stintino',
    iframeTitle: 'Mapa interactivo — Residence Le Vele Stintino',
    enableLabel: 'Activar mapa',
    enableHint:
      'El mapa interactivo de Google utiliza cookies de terceros. Active sus preferencias para visualizarlo.',
    activateAria: 'Activar mapa interactivo',
    mapSectionAria: 'Mapa de la residence',
  },
  footer: {
    about:
      'Residence en Stintino para vacaciones en Cerdeña: apartamentos cerca de La Pelosa, con privacidad, confort y la atmósfera del norte de Cerdeña.',
    explore: 'Explorar',
    contacts: 'Contacto',
    designBy: 'Design by',
    starsAria: 'Clasificación de 3 estrellas',
    instagramAria: 'Residence Le Vele en Instagram',
    footerNavAria: 'Navegación del pie de página',
    legalNavAria: 'Privacidad y cookies',
  },
  pelosa: {
    hero: {
      eyebrow: 'Stintino, Cerdeña',
      title: 'La Pelosa',
      tagline: 'Una de las playas más célebres del Mediterráneo.',
      lede:
        'Arena blanca, agua turquesa y la Torre aragonesa: un símbolo del norte de Cerdeña a pocos minutos de la Residence Le Vele.',
      videoLabel: 'Vídeo de la playa La Pelosa en Stintino',
    },
    intro: {
      eyebrow: 'La playa',
      title: 'Famosa en todo el mundo',
      lead:
        'La Pelosa se abre hacia la punta noroeste de Cerdeña: playa icónica de Stintino, a pocos minutos de la Residence Le Vele.',
      body:
        'A lo lejos, el islote de la Torre della Pelosa es el símbolo icónico de Stintino. En verano, el acceso está regulado para preservar el entorno: recomendamos reservar con antelación y llegar con calma, especialmente en temporada alta.',
      statValue: '~2 km',
      statLabel: 'De la Residence Le Vele',
    },
    gallery: {
      eyebrow: 'Galería',
      title: 'Colores del norte de Cerdeña',
      lead: 'Vistas aéreas, costa y agua turquesa: cuatro perspectivas de la playa más icónica de Stintino.',
      viewLabel: 'Ampliar',
      imageAlts: [
        'Vista aérea de la playa La Pelosa, mar turquesa y Torre della Pelosa',
        'La Pelosa desde arriba: costa, sombrillas y torre',
        'Laguna y arena blanca en La Pelosa con mar cristalino',
        'Mar turquesa con Torre della Pelosa en el horizonte',
      ],
    },
    ui: {
      back: '← Residence Le Vele',
      scrollAria: 'Desplazarse hacia el contenido',
      scrollLabel: 'Desplazar',
      muteOn: 'Activar audio',
      muteOff: 'Silenciar',
      closeLightbox: 'Cerrar',
      closeGallery: 'Cerrar galería',
      openImage: 'Abrir imagen: {alt}',
    },
  },
  suitePage: {
    notFound: 'Suite no encontrada',
    backToSuites: '← Volver a las suites',
    backLink: '← Los estudios',
    specsAria: 'Información de la suite',
    guests: '2–4',
    guestsLabel: 'huéspedes',
    locationValue: 'Stintino',
    locationLabel: 'Cerdeña',
    typeValue: 'Estudio',
    typeLabel: 'vacaciones',
    scrollAria: 'Desplazarse hacia el contenido',
    scrollLabel: 'Desplazar',
    experience: 'La experiencia',
    storyNote:
      'Apartamento de vacaciones en la Residence Le Vele — Stintino, a pocos minutos de las playas más bellas del norte de Cerdeña.',
    amenitiesEyebrow: 'Equipamiento',
    amenitiesTitle: 'Todo lo necesario',
    galleryAria: 'Galería {title}',
    bookingEyebrow: 'Reservas',
    bookingTitle: 'Solicitar disponibilidad',
    bookingText:
      'Escríbanos con fechas, número de huéspedes y preferencias — le responderemos con un presupuesto personalizado.',
    bookingCta: 'Solicitar presupuesto',
    mailSubjectPrefix: 'Reserva',
    otherSuite: 'Otra suite',
    allSuites: '← Todas las suites',
    heroAltSuffix: '— estudio de vacaciones Stintino, Residence Le Vele',
  },
  header: {
    navAria: 'Menú principal',
    mainNavAria: 'Principal',
  },
  seo: {
    default: {
      title: 'Residence Le Vele | Apartamentos de vacaciones en Stintino, Cerdeña',
      description:
        'Residence Le Vele en Stintino: estudios con vista mar y jardín, estancias cerca de La Pelosa. Reserve su apartamento de vacaciones en Cerdeña.',
      keywords:
        'residence stintino, apartamentos vacaciones cerdeña, estancia junto al mar, la pelosa, cala lupo, estudios stintino',
    },
    booking: {
      title: 'Residence Le Vele | Solicitar disponibilidad',
      description:
        'Solicite disponibilidad para su estancia en Residence Le Vele en Stintino: fechas, tipo de estudio y número de huéspedes. Respuesta personalizada por correo.',
      keywords:
        'reservar residence stintino, solicitud disponibilidad, estudios stintino, apartamentos vacaciones cerdeña',
      breadcrumb: 'Solicitar disponibilidad',
    },
    pelosa: {
      title: 'La Pelosa Stintino | Residence Le Vele — Playa y mar',
      description:
        'La Pelosa en Stintino: una de las playas más bellas de Cerdeña, a pocos minutos de la Residence Le Vele.',
      keywords: 'la pelosa stintino, playa stintino, residence le vele, mar cerdeña',
    },
    privacy: {
      title: 'Política de privacidad | Residence Le Vele Stintino',
      description: 'Aviso de privacidad y tratamiento de datos personales de la Residence Le Vele en Stintino.',
    },
    cookie: {
      title: 'Política de cookies | Residence Le Vele Stintino',
      description: 'Política de cookies y gestión del consentimiento del sitio Residence Le Vele.',
    },
    suiteTitleSuffix: '| Residence Le Vele — Apartamentos Stintino',
    suiteDescriptionSuffix: 'Reserve el estudio en Stintino, cerca de La Pelosa.',
    suiteKeywords: 'estudio stintino, apartamentos vacaciones cerdeña, residence le vele',
    fallbackTitleSuffix: '| Stintino, Cerdeña',
    ogImageAlt: 'Residence Le Vele — estudios en Stintino, cerca de La Pelosa',
    breadcrumbHome: 'Inicio',
    schemaDescription:
      'Residence Le Vele en Stintino: estudios con vista mar y jardín, estancias cerca de La Pelosa.',
    schemaAmenities: [
      'Wi-Fi gratuito',
      'Aire acondicionado',
      'Veranda o terraza',
      'Jardín privado',
      'Rincón cocina',
      'Vista mar',
    ],
    schemaTouristTypes: ['Familias', 'Parejas', 'Excursionistas'],
    nearbyAttractions: [
      { name: 'La Pelosa', description: 'Playa icónica de Stintino, a unos 2 km de la residence.' },
      { name: 'Bahía de Cala Lupo', description: 'Bahía tranquila donde se encuentra la Residence Le Vele.' },
      { name: 'Centro histórico de Stintino', description: 'Pueblo marinero del norte de Cerdeña, cerca de la residence.' },
    ],
  },
  errorBoundary: {
    title: 'Ups… algo salió mal',
    body: 'Nuestros ayudantes prehistóricos ya están en ello. Recargue la página o vuelva al inicio del Residence.',
    reload: 'Recargar página',
    home: 'Volver al Residence',
    detailsLabel: 'Detalles técnicos',
  },
  ogLocale: 'es_ES',
};
