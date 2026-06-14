import type { SiteLocale } from '../lib/siteLocales';

export type NavLinkItem = {
  label: string;
  to: string;
};

const navByLocale: Record<SiteLocale, NavLinkItem[]> = {
  it: [
    { label: 'Il Residence', to: '/#residence' },
    { label: 'I Monolocali', to: '/#suites' },
    { label: 'La Pelosa', to: '/la-pelosa' },
    { label: 'Info & condizioni', to: '/info-condizioni' },
    { label: 'Contatti', to: '/#contatti' },
  ],
  en: [
    { label: 'The Residence', to: '/#residence' },
    { label: 'Studio apartments', to: '/#suites' },
    { label: 'La Pelosa', to: '/la-pelosa' },
    { label: 'Info & conditions', to: '/info-condizioni' },
    { label: 'Contact', to: '/#contatti' },
  ],
  de: [
    { label: 'Die Residence', to: '/#residence' },
    { label: 'Studios', to: '/#suites' },
    { label: 'La Pelosa', to: '/la-pelosa' },
    { label: 'Info & Bedingungen', to: '/info-condizioni' },
    { label: 'Kontakt', to: '/#contatti' },
  ],
  fr: [
    { label: 'La Résidence', to: '/#residence' },
    { label: 'Les studios', to: '/#suites' },
    { label: 'La Pelosa', to: '/la-pelosa' },
    { label: 'Info & conditions', to: '/info-condizioni' },
    { label: 'Contact', to: '/#contatti' },
  ],
  es: [
    { label: 'La Residencia', to: '/#residence' },
    { label: 'Los estudios', to: '/#suites' },
    { label: 'La Pelosa', to: '/la-pelosa' },
    { label: 'Info y condiciones', to: '/info-condizioni' },
    { label: 'Contacto', to: '/#contatti' },
  ],
};

export function getNavLinks(locale: SiteLocale): NavLinkItem[] {
  return navByLocale[locale];
}

export const headerUiCopy: Record<
  SiteLocale,
  {
    menuOpen: string;
    menuClosed: string;
    closeMenuBackdrop: string;
    closeMenu: string;
    mobileMenuEyebrow: string;
    menuLabelOpen: string;
    menuLabelClosed: string;
    book: string;
    bookAria: string;
    langMenu: string;
    langChoose: string;
    skipToContent: string;
  }
> = {
  it: {
    menuOpen: 'Chiudi menu',
    menuClosed: 'Apri menu',
    closeMenuBackdrop: 'Chiudi menu',
    closeMenu: 'Chiudi',
    mobileMenuEyebrow: 'Navigazione',
    menuLabelOpen: 'Chiudi',
    menuLabelClosed: 'Menu',
    book: 'Prenota',
    bookAria: 'Prenota — richiedi disponibilità via email',
    langMenu: 'Lingua',
    langChoose: 'Scegli lingua',
    skipToContent: 'Vai al contenuto principale',
  },
  en: {
    menuOpen: 'Close menu',
    menuClosed: 'Open menu',
    closeMenuBackdrop: 'Close menu',
    closeMenu: 'Close',
    mobileMenuEyebrow: 'Explore',
    menuLabelOpen: 'Close',
    menuLabelClosed: 'Menu',
    book: 'Book',
    bookAria: 'Book — request availability by email',
    langMenu: 'Language',
    langChoose: 'Choose language',
    skipToContent: 'Skip to main content',
  },
  de: {
    menuOpen: 'Menü schließen',
    menuClosed: 'Menü öffnen',
    closeMenuBackdrop: 'Menü schließen',
    closeMenu: 'Schließen',
    mobileMenuEyebrow: 'Navigation',
    menuLabelOpen: 'Schließen',
    menuLabelClosed: 'Menü',
    book: 'Buchen',
    bookAria: 'Buchen — Verfügbarkeit per E-Mail anfragen',
    langMenu: 'Sprache',
    langChoose: 'Sprache wählen',
    skipToContent: 'Zum Hauptinhalt springen',
  },
  fr: {
    menuOpen: 'Fermer le menu',
    menuClosed: 'Ouvrir le menu',
    closeMenuBackdrop: 'Fermer le menu',
    closeMenu: 'Fermer',
    mobileMenuEyebrow: 'Navigation',
    menuLabelOpen: 'Fermer',
    menuLabelClosed: 'Menu',
    book: 'Réserver',
    bookAria: 'Réserver — demander la disponibilité par e-mail',
    langMenu: 'Langue',
    langChoose: 'Choisir la langue',
    skipToContent: 'Aller au contenu principal',
  },
  es: {
    menuOpen: 'Cerrar menú',
    menuClosed: 'Abrir menú',
    closeMenuBackdrop: 'Cerrar menú',
    closeMenu: 'Cerrar',
    mobileMenuEyebrow: 'Navegación',
    menuLabelOpen: 'Cerrar',
    menuLabelClosed: 'Menú',
    book: 'Reservar',
    bookAria: 'Reservar — consultar disponibilidad por correo',
    langMenu: 'Idioma',
    langChoose: 'Elegir idioma',
    skipToContent: 'Ir al contenido principal',
  },
};
