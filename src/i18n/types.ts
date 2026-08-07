import type { SiteLocale } from '../lib/siteLocales';
import type { ResidenceServiceIconId } from '../lib/residenceServiceIcons';

export type { SiteLocale };

export type ReviewCopy = {
  id: string;
  source: 'google' | 'tripadvisor';
  rating: number;
  author: string;
  dateLabel: string;
  text: string;
};

export type LocaleCopy = {
  preloaderText: string;
  directBookingPopup: {
    ariaLabel: string;
    eyebrow: string;
    title: string;
    text: string;
    bookCta: string;
    closeCta: string;
  };
  addressCountry: string;
  hero: {
    kicker: string;
    titleLines: readonly [string, string];
    /** Discreet brand + place line under the regional kicker. */
    locationLine: string;
    /** Short stay promise under the location line. */
    microLine: string;
    tagline: string;
    lede: string;
    scrollAria: string;
    scrollLabel: string;
    videoAria: string;
  };
  residenceIntro: {
    eyebrow: string;
    titleLine: string;
    titleBrandBefore: string;
    titleBrandAccent: string;
    location: string;
    locationLabel: string;
    kicker: string;
    lead: string;
    marquee: readonly string[];
    metricsAria: string;
  };
  residenceHighlights: readonly { value: string; label: string }[];
  residenceCards: readonly {
    title: string;
    description: string;
    imageAlt: string;
    linkLabel?: string;
    routes?: readonly { distance: string; label: string }[];
    images?: readonly { alt: string; caption: string }[];
  }[];
  residenceAccordion: {
    eyebrow: string;
    showcaseTitle: string;
    title: string;
    subtitle?: string;
    discoverMore: string;
    navHint: string;
  };
  residenceServices: {
    groups: readonly {
      id: 'free' | 'paid' | 'activities';
      title: string;
      badge?: string;
      items: readonly { icon: ResidenceServiceIconId; label: string }[];
    }[];
  };
  suitesIntro: {
    eyebrow: string;
    title: string;
    count: string;
    countLabel: string;
    kicker: string;
    capacityNote: string;
    capacityGrid: {
      aria: string;
      sea: string;
      garden: string;
      seats2: string;
      seats3: string;
      seats4: string;
      seatsUnit: string;
      available: string;
    };
    marquee: readonly string[];
    cardToggleDayAria: string;
    cardToggleNightAria: string;
  };
  suites: Record<
    'vista-giardino' | 'vista-mare',
    {
      title: string;
      kicker: string;
      tagline: string;
      description: string;
      features: readonly string[];
      galleryAlts: readonly string[];
      listLabel: string;
      discoverAria: string;
      exploreCta: string;
      galleryKicker: string;
      galleryTitle: string;
    }
  >;
  residenceWelcome: {
    galleryAria: string;
    imageAlts: readonly string[];
    closeLabel: string;
    prevLabel: string;
    nextLabel: string;
    counterLabel: string;
    autoplayLabel: string;
  };
  offers: {
    sectionEyebrow: string;
    sectionTitle: string;
    /** Neutral, verifiable benefit under the section title (no invented discounts). */
    sectionBenefit: string;
    items: readonly { title: string; period: string; badge: string; description: string }[];
  };
  infoServices: {
    eyebrow: string;
    title: string;
    kicker: string;
    checkInTitle: string;
    checkInTime: string;
    checkOutTitle: string;
    checkOutTime: string;
    noteLateCheckIn: string;
    noteSupplement: string;
    noteDeposit: string;
    noteCleaningPenalty: string;
    conditionsTitle: string;
    conditions: readonly string[];
  };
  reviews: {
    eyebrow: string;
    title: string;
    subtitleBefore: string;
    subtitleAfter: string;
    marqueeAria: string;
    prevAria: string;
    nextAria: string;
    ratingAria: string;
    openOn: string;
    summary: {
      reviewCountLabel: string;
      google: {
        rating: number;
        reviewCount: number;
        summaryText: string;
        platformLabel: string;
      };
      tripadvisor: {
        rating: number;
        reviewCount: number;
        summaryText: string;
        platformLabel: string;
      };
    };
    items: readonly ReviewCopy[];
  };
  contactIntro: { eyebrow: string; title: string; kicker: string };
  contactLabels: {
    phone: string;
    mobile: string;
    email: string;
    address: string;
    directions: string;
    bookStay: string;
  };
  contactCustomOffer: { title: string; text: string };
  contactPhotoAlts: readonly string[];
  siteMap: {
    placeholderAlt: string;
    badgeLabel: string;
    iframeTitle: string;
    enableLabel: string;
    enableHint: string;
    activateAria: string;
    mapSectionAria: string;
  };
  footer: {
    about: string;
    explore: string;
    contacts: string;
    designBy: string;
    starsAria: string;
    instagramAria: string;
    footerNavAria: string;
    legalNavAria: string;
  };
  pelosa: {
    hero: {
      eyebrow: string;
      title: string;
      tagline: string;
      lede: string;
      videoLabel: string;
    };
    intro: {
      eyebrow: string;
      title: string;
      lead: string;
      body: string;
      statValue: string;
      statLabel: string;
    };
    gallery: {
      eyebrow: string;
      title: string;
      lead: string;
      viewLabel: string;
      imageAlts: readonly string[];
    };
    ui: {
      back: string;
      scrollAria: string;
      scrollLabel: string;
      muteOn: string;
      muteOff: string;
      closeLightbox: string;
      closeGallery: string;
      openImage: string;
    };
  };
  suitePage: {
    notFound: string;
    backToSuites: string;
    backLink: string;
    specsAria: string;
    guests: string;
    guestsLabel: string;
    locationValue: string;
    locationLabel: string;
    typeValue: string;
    typeLabel: string;
    scrollAria: string;
    scrollLabel: string;
    experience: string;
    storyNote: string;
    galleryAria: string;
    viewAllPhotos: string;
    bookingEyebrow: string;
    bookingTitle: string;
    bookingText: string;
    bookingCta: string;
    bookingBookCta: string;
    mailSubjectPrefix: string;
    otherSuite: string;
    allSuites: string;
    heroAltSuffix: string;
  };
  header: {
    navAria: string;
    mainNavAria: string;
  };
  seo: {
    default: { title: string; description: string; keywords: string };
    booking: { title: string; description: string; keywords: string; breadcrumb: string };
    info: { title: string; description: string; keywords: string; breadcrumb: string };
    contact: { title: string; description: string; keywords: string; breadcrumb: string };
    pelosa: { title: string; description: string; keywords: string };
    privacy: { title: string; description: string };
    cookie: { title: string; description: string };
    ogImageAlt: string;
    breadcrumbHome: string;
    suiteTitleSuffix: string;
    suiteDescriptionSuffix: string;
    suiteKeywords: string;
    fallbackTitleSuffix: string;
    schemaDescription: string;
    schemaAmenities: readonly string[];
    schemaTouristTypes: readonly string[];
    nearbyAttractions: readonly { name: string; description: string }[];
  };
  errorBoundary: {
    title: string;
    body: string;
    reload: string;
    home: string;
    detailsLabel: string;
  };
  ogLocale: string;
};
