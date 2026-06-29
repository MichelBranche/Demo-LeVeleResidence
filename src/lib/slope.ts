import type { SiteLocale } from './siteLocales';

/** Lingue supportate dal booking engine Slope (widget WordPress). */
export const SLOPE_BOOKING_LOCALES = ['it', 'en', 'de', 'fr'] as const;

export type SlopeBookingLocale = (typeof SLOPE_BOOKING_LOCALES)[number];

const DEFAULT_PROPERTY_ID = '2e5ba507-0d51-4d20-95e2-899fdb2d8aae';

export function getSlopePropertyId(): string {
  const fromEnv = import.meta.env.VITE_SLOPE_PROPERTY_ID?.trim();
  return fromEnv || DEFAULT_PROPERTY_ID;
}

export function isSlopeBookingEnabled(): boolean {
  return import.meta.env.VITE_SLOPE_BOOKING_ENABLED !== 'false';
}

export function getSlopeBookingBaseUrl(): string {
  const fromEnv = import.meta.env.VITE_SLOPE_BOOKING_BASE_URL?.trim();
  return (fromEnv || 'https://booking.slope.it').replace(/\/$/, '');
}

export function toSlopeBookingLocale(locale: SiteLocale): SlopeBookingLocale {
  if ((SLOPE_BOOKING_LOCALES as readonly string[]).includes(locale)) {
    return locale as SlopeBookingLocale;
  }
  return 'en';
}

export function buildSlopeSearchAction(propertyId: string, locale: SlopeBookingLocale): string {
  return `${getSlopeBookingBaseUrl()}/widgets/wordpress/search/${propertyId}/${locale}`;
}

export function getSlopeBookingDomainHost(): string {
  return getSlopeBookingBaseUrl().replace(/^https?:\/\//, '');
}

export function buildSlopePromotionsUrl(
  propertyId: string,
  locale: SlopeBookingLocale,
): string {
  return `${getSlopeBookingBaseUrl()}/widgets/promotions/${propertyId}/${locale}`;
}

const SLOPE_OFFERS_LOADING: Record<SiteLocale, string> = {
  it: 'Caricamento offerte dal gestionale…',
  en: 'Loading offers from the booking system…',
  de: 'Angebote werden geladen…',
  fr: 'Chargement des offres…',
  es: 'Cargando ofertas…',
  ru: 'Загрузка предложений…',
  zh: '正在加载优惠…',
};

export function getSlopeOffersLoadingText(locale: SiteLocale): string {
  return SLOPE_OFFERS_LOADING[locale] ?? SLOPE_OFFERS_LOADING.en;
}

const SLOPE_DATE_REQUIRED: Record<SiteLocale, string> = {
  it: 'Seleziona le date di check-in e check-out prima di prenotare.',
  en: 'Select check-in and check-out dates before booking.',
  de: 'Bitte wählen Sie An- und Abreisedatum, bevor Sie buchen.',
  fr: 'Sélectionnez les dates d’arrivée et de départ avant de réserver.',
  es: 'Selecciona las fechas de entrada y salida antes de reservar.',
  ru: 'Выберите даты заезда и выезда перед бронированием.',
  zh: '预订前请选择入住和退房日期。',
};

export function getSlopeDateRequiredMessage(locale: SiteLocale): string {
  return SLOPE_DATE_REQUIRED[locale] ?? SLOPE_DATE_REQUIRED.en;
}

export type SlopeWidgetLabels = {
  checkIn: string;
  checkOut: string;
  lodgings: string;
  guests: string;
  adults: string;
  children: string;
  childrenAge: string;
  lodging: string;
  cancel: string;
  save: string;
  submit: string;
};

const SLOPE_WIDGET_LABELS: Record<SiteLocale, SlopeWidgetLabels> = {
  it: {
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    lodgings: 'Alloggi',
    guests: 'Ospiti',
    adults: 'Adulti',
    children: 'Bambini',
    childrenAge: ' (0 - 13 anni)',
    lodging: 'Alloggio',
    cancel: 'Annulla',
    save: 'Salva',
    submit: 'Prenota',
  },
  en: {
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    lodgings: 'Lodgings',
    guests: 'Guests',
    adults: 'Adults',
    children: 'Children',
    childrenAge: ' (0 - 13 years)',
    lodging: 'Lodging',
    cancel: 'Cancel',
    save: 'Save',
    submit: 'Book now',
  },
  de: {
    checkIn: 'Anreise',
    checkOut: 'Abreise',
    lodgings: 'Unterkünfte',
    guests: 'Gäste',
    adults: 'Erwachsene',
    children: 'Kinder',
    childrenAge: ' (0 - 13 Jahre)',
    lodging: 'Unterkunft',
    cancel: 'Abbrechen',
    save: 'Speichern',
    submit: 'Jetzt buchen',
  },
  fr: {
    checkIn: 'Arrivée',
    checkOut: 'Départ',
    lodgings: 'Logements',
    guests: 'Voyageurs',
    adults: 'Adultes',
    children: 'Enfants',
    childrenAge: ' (0 - 13 ans)',
    lodging: 'Logement',
    cancel: 'Annuler',
    save: 'Enregistrer',
    submit: 'Réserver',
  },
  es: {
    checkIn: 'Entrada',
    checkOut: 'Salida',
    lodgings: 'Alojamientos',
    guests: 'Huéspedes',
    adults: 'Adultos',
    children: 'Niños',
    childrenAge: ' (0 - 13 años)',
    lodging: 'Alojamiento',
    cancel: 'Cancelar',
    save: 'Guardar',
    submit: 'Reservar',
  },
  ru: {
    checkIn: 'Заезд',
    checkOut: 'Выезд',
    lodgings: 'Номера',
    guests: 'Гости',
    adults: 'Взрослые',
    children: 'Дети',
    childrenAge: ' (0 - 13 лет)',
    lodging: 'Номер',
    cancel: 'Отмена',
    save: 'Сохранить',
    submit: 'Забронировать',
  },
  zh: {
    checkIn: '入住',
    checkOut: '退房',
    lodgings: '客房',
    guests: '人数',
    adults: '成人',
    children: '儿童',
    childrenAge: '（0 - 13 岁）',
    lodging: '客房',
    cancel: '取消',
    save: '保存',
    submit: '立即预订',
  },
};

export function getSlopeWidgetLabels(locale: SiteLocale): SlopeWidgetLabels {
  return SLOPE_WIDGET_LABELS[locale] ?? SLOPE_WIDGET_LABELS.en;
}

export type SlopeBookingPageCopy = {
  title: string;
  intro: string;
  note: string;
  contactLink: string;
};

const SLOPE_BOOKING_PAGE_COPY: Record<SiteLocale, SlopeBookingPageCopy> = {
  it: {
    title: 'Prenota il tuo soggiorno',
    intro:
      'Indica date e ospiti per consultare disponibilità e tariffe aggiornate, poi completa la prenotazione online. Le tariffe dipendono dalla durata del soggiorno; il sistema propone la configurazione adatta (2, 3 o 4 posti, mare o giardino).',
    note: 'Per richieste speciali o esigenze particolari, consulta la pagina',
    contactLink: 'Contatti',
  },
  en: {
    title: 'Book your stay',
    intro:
      'Enter your dates and number of guests to check availability and current rates, then complete your booking online. Rates depend on stay length; the system assigns the right setup (2, 3 or 4 guests, sea or garden view).',
    note: 'For special requests or tailored stays, visit our',
    contactLink: 'Contact page',
  },
  de: {
    title: 'Aufenthalt buchen',
    intro:
      'Wählen Sie Reisedaten und Gästezahl, prüfen Sie Verfügbarkeit und aktuelle Preise und schließen Sie die Buchung online ab. Die Tarife hängen von der Aufenthaltsdauer ab; das System schlägt die passende Belegung vor (2, 3 oder 4 Personen, Meer- oder Gartenblick).',
    note: 'Für Sonderwünsche oder individuelle Aufenthalte besuchen Sie unsere',
    contactLink: 'Kontaktseite',
  },
  fr: {
    title: 'Réservez votre séjour',
    intro:
      'Indiquez vos dates et le nombre de voyageurs pour consulter les disponibilités et tarifs, puis finalisez votre réservation en ligne. Les tarifs dépendent de la durée du séjour ; le système propose la configuration adaptée (2, 3 ou 4 personnes, vue mer ou jardin).',
    note: 'Pour toute demande particulière ou séjour sur mesure, consultez notre',
    contactLink: 'page Contact',
  },
  es: {
    title: 'Reserva tu estancia',
    intro:
      'Indica fechas y número de huéspedes para consultar disponibilidad y tarifas actualizadas, y completa la reserva en línea. Las tarifas dependen de la duración de la estancia; el sistema propone la configuración adecuada (2, 3 o 4 plazas, vista mar o jardín).',
    note: 'Para peticiones especiales o estancias a medida, visita nuestra',
    contactLink: 'página de contacto',
  },
  ru: {
    title: 'Забронируйте проживание',
    intro:
      'Укажите даты и число гостей, чтобы проверить наличие и актуальные цены, затем завершите бронирование онлайн. Тарифы зависят от длительности проживания; система подберёт подходящую конфигурацию (2, 3 или 4 места, вид на море или сад).',
    note: 'Для особых запросов или индивидуальных условий —',
    contactLink: 'страница «Контакты»',
  },
  zh: {
    title: '预订您的住宿',
    intro:
      '填写入住日期和人数，查看实时房态与价格，然后在线完成预订。价格因入住天数而异；系统将匹配合适房型（2、3 或 4 人，海景或园景）。',
    note: '如有特殊需求或定制住宿，请访问',
    contactLink: '联系页面',
  },
};

export function getSlopeBookingPageCopy(locale: SiteLocale): SlopeBookingPageCopy {
  return SLOPE_BOOKING_PAGE_COPY[locale] ?? SLOPE_BOOKING_PAGE_COPY.en;
}
