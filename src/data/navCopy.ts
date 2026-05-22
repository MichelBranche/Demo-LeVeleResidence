import type { SiteLocale } from '../lib/siteLocales';

export type NavLinkItem = {
  label: string;
  to: string;
};

const navByLocale: Record<SiteLocale, NavLinkItem[]> = {
  it: [
    { label: 'Il Residence', to: '/#residence' },
    { label: 'Le Suites', to: '/#suites' },
    { label: 'La Pelosa', to: '/la-pelosa' },
    { label: 'Info & Servizi', to: '/#info-servizi' },
    { label: 'Contatti', to: '/#contatti' },
  ],
  en: [
    { label: 'The Residence', to: '/#residence' },
    { label: 'Suites', to: '/#suites' },
    { label: 'La Pelosa', to: '/la-pelosa' },
    { label: 'Info & Services', to: '/#info-servizi' },
    { label: 'Contact', to: '/#contatti' },
  ],
  de: [
    { label: 'Die Residence', to: '/#residence' },
    { label: 'Suites', to: '/#suites' },
    { label: 'La Pelosa', to: '/la-pelosa' },
    { label: 'Info & Service', to: '/#info-servizi' },
    { label: 'Kontakt', to: '/#contatti' },
  ],
  fr: [
    { label: 'La Résidence', to: '/#residence' },
    { label: 'Les Suites', to: '/#suites' },
    { label: 'La Pelosa', to: '/la-pelosa' },
    { label: 'Infos & Services', to: '/#info-servizi' },
    { label: 'Contact', to: '/#contatti' },
  ],
  es: [
    { label: 'La Residencia', to: '/#residence' },
    { label: 'Las Suites', to: '/#suites' },
    { label: 'La Pelosa', to: '/la-pelosa' },
    { label: 'Info y Servicios', to: '/#info-servizi' },
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
    menuLabelOpen: string;
    menuLabelClosed: string;
    book: string;
    bookAria: string;
    langMenu: string;
    langChoose: string;
  }
> = {
  it: {
    menuOpen: 'Chiudi menu',
    menuClosed: 'Apri menu',
    closeMenuBackdrop: 'Chiudi menu',
    menuLabelOpen: 'Chiudi',
    menuLabelClosed: 'Menu',
    book: 'Prenota',
    bookAria: 'Prenota — richiedi disponibilità via email',
    langMenu: 'Lingua',
    langChoose: 'Scegli lingua',
  },
  en: {
    menuOpen: 'Close menu',
    menuClosed: 'Open menu',
    closeMenuBackdrop: 'Close menu',
    menuLabelOpen: 'Close',
    menuLabelClosed: 'Menu',
    book: 'Book',
    bookAria: 'Book — request availability by email',
    langMenu: 'Language',
    langChoose: 'Choose language',
  },
  de: {
    menuOpen: 'Menü schließen',
    menuClosed: 'Menü öffnen',
    closeMenuBackdrop: 'Menü schließen',
    menuLabelOpen: 'Schließen',
    menuLabelClosed: 'Menü',
    book: 'Buchen',
    bookAria: 'Buchen — Verfügbarkeit per E-Mail anfragen',
    langMenu: 'Sprache',
    langChoose: 'Sprache wählen',
  },
  fr: {
    menuOpen: 'Fermer le menu',
    menuClosed: 'Ouvrir le menu',
    closeMenuBackdrop: 'Fermer le menu',
    menuLabelOpen: 'Fermer',
    menuLabelClosed: 'Menu',
    book: 'Réserver',
    bookAria: 'Réserver — demander la disponibilité par e-mail',
    langMenu: 'Langue',
    langChoose: 'Choisir la langue',
  },
  es: {
    menuOpen: 'Cerrar menú',
    menuClosed: 'Abrir menú',
    closeMenuBackdrop: 'Cerrar menú',
    menuLabelOpen: 'Cerrar',
    menuLabelClosed: 'Menú',
    book: 'Reservar',
    bookAria: 'Reservar — consultar disponibilidad por correo',
    langMenu: 'Idioma',
    langChoose: 'Elegir idioma',
  },
};
