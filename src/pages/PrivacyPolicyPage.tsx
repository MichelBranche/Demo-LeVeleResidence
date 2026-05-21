import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { legalEntity, site } from '../data/site';

type Lang = 'it' | 'en';

const content: Record<Lang, { title: string; updated: string; sections: { h: string; body: ReactNode }[] }> = {
  it: {
    title: 'Privacy Policy',
    updated: 'Ultimo aggiornamento: maggio 2026',
    sections: [
      {
        h: '1. Titolare del trattamento',
        body: (
          <>
            <p>
              Il titolare del trattamento dei dati personali è <strong>{legalEntity.name}</strong>, con sede in{' '}
              {legalEntity.address.street}, {legalEntity.address.city}, {legalEntity.address.country}.
            </p>
            <p>
              Per richieste relative alla privacy: <a href={`mailto:${site.email}`}>{site.email}</a> ·{' '}
              <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>
            </p>
          </>
        ),
      },
      {
        h: '2. Dati raccolti',
        body: (
          <ul>
            <li>Dati di contatto inviati tramite form o email (nome, email, telefono, messaggio).</li>
            <li>Richieste di prenotazione o disponibilità.</li>
            <li>Dati tecnici di navigazione (IP, browser, pagine visitate) solo con consenso agli analytics.</li>
            <li>
              Preferenze di consenso cookie (categorie, timestamp, versione policy e hash di integrità).
            </li>
          </ul>
        ),
      },
      {
        h: '3. Finalità e base giuridica',
        body: (
          <ul>
            <li>
              <strong>Gestione richieste e prenotazioni</strong> — esecuzione di misure precontrattuali e contratto (art.
              6.1.b GDPR).
            </li>
            <li>
              <strong>Comunicazioni informative</strong> — legittimo interesse o consenso, a seconda del caso (art. 6.1.f / 6.1.a).
            </li>
            <li>
              <strong>Analytics e marketing</strong> — solo previo consenso esplicito (art. 6.1.a).
            </li>
            <li>
              <strong>Sicurezza e funzionamento del sito</strong> — legittimo interesse (art. 6.1.f).
            </li>
          </ul>
        ),
      },
      {
        h: '4. Conservazione',
        body: (
          <p>
            I dati delle richieste di contatto sono conservati per il tempo necessario a evadere la richiesta e, ove
            applicabile, per gli obblighi di legge contabili e fiscali. I log analytics, se attivati, seguono i periodi
            definiti dai rispettivi fornitori. Il consenso cookie è conservato fino a 12 mesi o fino a revoca.
          </p>
        ),
      },
      {
        h: '5. Destinatari e trasferimenti',
        body: (
          <p>
            I dati possono essere trattati da fornitori tecnici (hosting, email, analytics) nominati responsabili del
            trattamento. Eventuali trasferimenti extra-UE avvengono solo con garanzie adeguate (clausole contrattuali tipo,
            decisioni di adeguatezza).
          </p>
        ),
      },
      {
        h: '6. Diritti dell’interessato',
        body: (
          <ul>
            <li>Accesso, rettifica, cancellazione, limitazione, opposizione, portabilità.</li>
            <li>Revoca del consenso in qualsiasi momento, senza pregiudicare la liceità del trattamento precedente.</li>
            <li>Reclamo all’Autorità Garante per la protezione dei dati personali (www.garanteprivacy.it).</li>
          </ul>
        ),
      },
      {
        h: '7. Cookie e tracciamento',
        body: (
          <p>
            Per informazioni dettagliate su cookie e strumenti di tracciamento consulta la{' '}
            <Link to="/cookie-policy">Cookie Policy</Link>. Nessun cookie non essenziale viene attivato prima del tuo
            consenso.
          </p>
        ),
      },
    ],
  },
  en: {
    title: 'Privacy Policy',
    updated: 'Last updated: May 2026',
    sections: [
      {
        h: '1. Data controller',
        body: (
          <>
            <p>
              The data controller is <strong>{legalEntity.name}</strong>, {legalEntity.address.street},{' '}
              {legalEntity.address.city}, {legalEntity.address.country}.
            </p>
            <p>
              Privacy requests: <a href={`mailto:${site.email}`}>{site.email}</a> ·{' '}
              <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>
            </p>
          </>
        ),
      },
      {
        h: '2. Data we collect',
        body: (
          <ul>
            <li>Contact details submitted via forms or email (name, email, phone, message).</li>
            <li>Booking or availability enquiries.</li>
            <li>Technical browsing data (IP, browser, pages visited) only with analytics consent.</li>
            <li>Cookie consent preferences (categories chosen and timestamp).</li>
          </ul>
        ),
      },
      {
        h: '3. Purposes and legal basis',
        body: (
          <ul>
            <li>
              <strong>Enquiries and bookings</strong> — pre-contractual measures and contract (Art. 6(1)(b) GDPR).
            </li>
            <li>
              <strong>Informational communications</strong> — legitimate interest or consent (Art. 6(1)(f) / (a)).
            </li>
            <li>
              <strong>Analytics and marketing</strong> — only with explicit consent (Art. 6(1)(a)).
            </li>
            <li>
              <strong>Website security and operation</strong> — legitimate interest (Art. 6(1)(f)).
            </li>
          </ul>
        ),
      },
      {
        h: '4. Retention',
        body: (
          <p>
            Contact enquiry data is kept as long as needed to handle the request and, where applicable, for legal
            accounting obligations. Analytics logs, if enabled, follow provider retention periods. Cookie consent is stored
            for up to 12 months or until withdrawn.
          </p>
        ),
      },
      {
        h: '5. Recipients and transfers',
        body: (
          <p>
            Data may be processed by technical providers (hosting, email, analytics) acting as processors. Any transfers
            outside the EU occur only with appropriate safeguards (standard contractual clauses, adequacy decisions).
          </p>
        ),
      },
      {
        h: '6. Your rights',
        body: (
          <ul>
            <li>Access, rectification, erasure, restriction, objection, portability.</li>
            <li>Withdraw consent at any time without affecting prior lawful processing.</li>
            <li>Lodge a complaint with your supervisory authority.</li>
          </ul>
        ),
      },
      {
        h: '7. Cookies and tracking',
        body: (
          <p>
            See our <Link to="/cookie-policy">Cookie Policy</Link> for details. No non-essential cookies are activated
            before your consent.
          </p>
        ),
      },
    ],
  },
};

export function PrivacyPolicyPage() {
  const [lang, setLang] = useState<Lang>('it');
  const doc = content[lang];

  return (
    <article className="legal-page">
      <div className="legal-page__locale">
        <button
          type="button"
          className={`legal-page__lang ${lang === 'it' ? 'is-active' : ''}`}
          onClick={() => setLang('it')}
          aria-pressed={lang === 'it'}
        >
          IT
        </button>
        <button
          type="button"
          className={`legal-page__lang ${lang === 'en' ? 'is-active' : ''}`}
          onClick={() => setLang('en')}
          aria-pressed={lang === 'en'}
        >
          EN
        </button>
      </div>
      <p className="legal-page__eyebrow">{site.name}</p>
      <h1 className="legal-page__title display-serif">{doc.title}</h1>
      <p className="legal-page__updated">{doc.updated}</p>
      {doc.sections.map((section) => (
        <section key={section.h}>
          <h2>{section.h}</h2>
          {section.body}
        </section>
      ))}
    </article>
  );
}
