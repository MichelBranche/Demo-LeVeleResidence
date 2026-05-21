import { useState, type ReactNode } from 'react';
import { useConsent } from '../hooks/useConsent';
import { site } from '../data/site';

type Lang = 'it' | 'en';

const content: Record<Lang, { title: string; updated: string; sections: { h: string; body: ReactNode }[] }> = {
  it: {
    title: 'Cookie Policy',
    updated: 'Ultimo aggiornamento: maggio 2026',
    sections: [
      {
        h: '1. Cosa sono i cookie',
        body: (
          <p>
            I cookie sono piccoli file di testo che il sito salva sul dispositivo dell’utente per garantire funzionalità,
            ricordare preferenze o — solo con consenso — analizzare l’utilizzo e attività di marketing.
          </p>
        ),
      },
      {
        h: '2. Cookie tecnici (necessari)',
        body: (
          <ul>
            <li>
              <strong>lv_consent</strong> (cookie tecnico, Path=/, SameSite=Lax) — preferenze, timestamp, versione
              policy e hash di integrità. Durata: 12 mesi.
            </li>
            <li>
              <strong>lv_consent</strong> (localStorage) — copia locale con gli stessi dati per ripristino rapido.
            </li>
            <li>Cookie di sessione e sicurezza del browser/hosting, indispensabili alla navigazione.</li>
          </ul>
        ),
      },
      {
        h: '3. Cookie analitici',
        body: (
          <p>
            Attivati solo se accetti la categoria <em>Analitici</em>. Possono includere Google Analytics (statistiche
            aggregate su visite e pagine). ID configurabile tramite variabile d’ambiente{' '}
            <code>VITE_GA_MEASUREMENT_ID</code>. Nessuno script analytics viene caricato prima del consenso.
          </p>
        ),
      },
      {
        h: '4. Cookie di marketing',
        body: (
          <p>
            Attivati solo con consenso alla categoria <em>Marketing</em>. Possono includere Meta Pixel per attività
            promozionali/remarketing. ID tramite <code>VITE_META_PIXEL_ID</code>. Caricamento lazy solo post-consenso.
          </p>
        ),
      },
      {
        h: '5. Cookie di preferenze',
        body: (
          <p>
            Memorizzano scelte di interfaccia o contenuti personalizzati quando autorizzi la categoria{' '}
            <em>Preferenze</em>. Attualmente utilizzati in modo limitato; eventuali servizi futuri rispetteranno la stessa
            logica di consenso.
          </p>
        ),
      },
      {
        h: '6. Gestione del consenso',
        body: (
          <p>
            Al primo accesso compare un banner a schermo intero con le opzioni Accetta tutto, Rifiuta tutto o
            Personalizza. Puoi modificare le scelte in qualsiasi momento dal link &quot;Gestisci cookie&quot; nel footer.
            La revoca impedisce nuovi caricamenti di script di tracciamento; per una rimozione completa dei cookie già
            impostati dai terzi puoi anche cancellare i cookie dal browser.
          </p>
        ),
      },
      {
        h: '7. Contatti',
        body: (
          <p>
            Per domande su cookie e privacy: <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        ),
      },
    ],
  },
  en: {
    title: 'Cookie Policy',
    updated: 'Last updated: May 2026',
    sections: [
      {
        h: '1. What are cookies',
        body: (
          <p>
            Cookies are small text files stored on your device to enable core functionality, remember preferences, or —
            only with consent — analyze usage and support marketing activities.
          </p>
        ),
      },
      {
        h: '2. Strictly necessary cookies',
        body: (
          <ul>
            <li>
              <strong>lv_consent</strong> (technical cookie, Path=/, SameSite=Lax) — preferences, timestamp, policy
              version, integrity hash. Duration: 12 months.
            </li>
            <li>
              <strong>lv_consent</strong> (localStorage) — local copy with the same data for fast restore.
            </li>
            <li>Session and security cookies from browser/hosting required for navigation.</li>
          </ul>
        ),
      },
      {
        h: '3. Analytics cookies',
        body: (
          <p>
            Enabled only if you accept <em>Analytics</em>. May include Google Analytics (aggregated visit statistics). No
            analytics scripts load before consent.
          </p>
        ),
      },
      {
        h: '4. Marketing cookies',
        body: (
          <p>
            Enabled only with <em>Marketing</em> consent. May include Meta Pixel. Scripts are lazy-loaded after consent
            only.
          </p>
        ),
      },
      {
        h: '5. Preference cookies',
        body: (
          <p>
            Store interface or content choices when you allow <em>Preferences</em>. Limited use today; any future service
            will follow the same consent model.
          </p>
        ),
      },
      {
        h: '6. Managing consent',
        body: (
          <p>
            On first visit a full-screen banner offers Accept all, Reject all, or Customize. You can change choices anytime
            via &quot;Manage cookies&quot; in the footer. Withdrawing consent blocks new tracking scripts; clear third-party
            cookies from your browser for complete removal.
          </p>
        ),
      },
      {
        h: '7. Contact',
        body: (
          <p>
            Questions: <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        ),
      },
    ],
  },
};

export function CookiePolicyPage() {
  const [lang, setLang] = useState<Lang>('it');
  const { openBanner } = useConsent();
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
      <section>
        <h2>{lang === 'it' ? 'Modifica preferenze' : 'Change preferences'}</h2>
        <p>
          <button type="button" className="consent-btn consent-btn--primary" onClick={() => openBanner({ panel: true })}>
            {lang === 'it' ? 'Apri pannello cookie' : 'Open cookie panel'}
          </button>
        </p>
      </section>
    </article>
  );
}
