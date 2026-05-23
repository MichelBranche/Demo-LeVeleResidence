import { legalEntity, siteConfig } from '../../i18n/siteMedia';
import type { SiteLocale } from '../../lib/siteLocales';

const countryByLocale: Record<SiteLocale, string> = {
  it: 'Italia',
  en: 'Italy',
  de: 'Italien',
  fr: 'Italie',
  es: 'Italia',
};

const copyByLocale: Record<
  SiteLocale,
  { lead: string; contact: string; vatLabel: string; cinLabel: string }
> = {
  it: {
    lead: 'Il titolare del trattamento dei dati personali è',
    contact: 'Per richieste relative alla privacy:',
    vatLabel: 'P. Iva',
    cinLabel: 'CIN',
  },
  en: {
    lead: 'The data controller is',
    contact: 'Privacy requests:',
    vatLabel: 'VAT No.',
    cinLabel: 'CIN',
  },
  de: {
    lead: 'Verantwortlich für die Datenverarbeitung ist',
    contact: 'Datenschutzanfragen:',
    vatLabel: 'USt-IdNr.',
    cinLabel: 'CIN',
  },
  fr: {
    lead: 'Le responsable du traitement est',
    contact: 'Demandes confidentialité :',
    vatLabel: 'P. IVA',
    cinLabel: 'CIN',
  },
  es: {
    lead: 'El responsable del tratamiento es',
    contact: 'Consultas de privacidad:',
    vatLabel: 'P. IVA',
    cinLabel: 'CIN',
  },
};

type DataControllerBlockProps = {
  locale: SiteLocale;
};

export function DataControllerBlock({ locale }: DataControllerBlockProps) {
  const copy = copyByLocale[locale];
  const country = countryByLocale[locale];
  const { name, vatId, cin, address } = legalEntity;

  return (
    <>
      <p>
        {copy.lead} <strong>{name}</strong>, {address.street}, {address.postalCode} {address.city} (
        {address.region}), {country}.
        <br />
        {copy.vatLabel} {vatId} · {copy.cinLabel} {cin}
      </p>
      <p>
        {copy.contact}{' '}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> ·{' '}
        <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}>{siteConfig.phone}</a>
      </p>
    </>
  );
}
