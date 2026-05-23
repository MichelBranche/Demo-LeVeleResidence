import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { DataControllerBlock } from '../components/legal/DataControllerBlock';
import { useSiteLocale } from '../hooks/useSiteLocale';
import type { SiteLocale } from '../lib/siteLocales';

type LegalDoc = { title: string; updated: string; sections: { h: string; body: ReactNode }[] };

const privacyByLang: Record<SiteLocale, LegalDoc> = {
  it: {
    title: 'Privacy Policy',
    updated: 'Ultimo aggiornamento: maggio 2026',
    sections: [
      {
        h: '1. Titolare del trattamento',
        body: <DataControllerBlock locale="it" />,
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
        body: <DataControllerBlock locale="en" />,
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
  de: {
    title: 'Datenschutzerklärung',
    updated: 'Letzte Aktualisierung: Mai 2026',
    sections: [
      {
        h: '1. Verantwortlicher',
        body: <DataControllerBlock locale="de" />,
      },
      {
        h: '2. Erhobene Daten',
        body: (
          <ul>
            <li>Kontaktdaten per Formular oder E-Mail (Name, E-Mail, Telefon, Nachricht).</li>
            <li>Buchungs- oder Verfügbarkeitsanfragen.</li>
            <li>Technische Nutzungsdaten (IP, Browser, Seiten) nur mit Analytics-Einwilligung.</li>
            <li>Cookie-Einwilligung (Kategorien, Zeitstempel, Policy-Version, Integritäts-Hash).</li>
          </ul>
        ),
      },
      {
        h: '3. Zwecke und Rechtsgrundlagen',
        body: (
          <ul>
            <li>
              <strong>Anfragen und Buchungen</strong> — vorvertragliche Maßnahmen und Vertrag (Art. 6 Abs. 1 lit. b DSGVO).
            </li>
            <li>
              <strong>Informationelle Kommunikation</strong> — berechtigtes Interesse oder Einwilligung (Art. 6 Abs. 1 lit. f / a).
            </li>
            <li>
              <strong>Analytics und Marketing</strong> — nur mit ausdrücklicher Einwilligung (Art. 6 Abs. 1 lit. a).
            </li>
            <li>
              <strong>Sicherheit und Betrieb der Website</strong> — berechtigtes Interesse (Art. 6 Abs. 1 lit. f).
            </li>
          </ul>
        ),
      },
      {
        h: '4. Speicherdauer',
        body: (
          <p>
            Kontaktdaten werden so lange gespeichert, wie für die Bearbeitung und gesetzliche Pflichten nötig. Analytics-Logs
            folgen den Anbieterfristen. Die Cookie-Einwilligung wird bis zu 12 Monate oder bis zum Widerruf gespeichert.
          </p>
        ),
      },
      {
        h: '5. Empfänger und Übermittlungen',
        body: (
          <p>
            Daten können von technischen Dienstleistern (Hosting, E-Mail, Analytics) als Auftragsverarbeiter verarbeitet werden.
            Übermittlungen außerhalb der EU nur mit geeigneten Garantien.
          </p>
        ),
      },
      {
        h: '6. Ihre Rechte',
        body: (
          <ul>
            <li>Auskunft, Berichtigung, Löschung, Einschränkung, Widerspruch, Datenübertragbarkeit.</li>
            <li>Widerruf der Einwilligung jederzeit ohne Beeinträchtigung der bisherigen Verarbeitung.</li>
            <li>Beschwerde bei der Aufsichtsbehörde.</li>
          </ul>
        ),
      },
      {
        h: '7. Cookies und Tracking',
        body: (
          <p>
            Details in unserer <Link to="/cookie-policy">Cookie-Richtlinie</Link>. Nicht notwendige Cookies werden erst nach
            Ihrer Einwilligung aktiviert.
          </p>
        ),
      },
    ],
  },
  fr: {
    title: 'Politique de confidentialité',
    updated: 'Dernière mise à jour : mai 2026',
    sections: [
      {
        h: '1. Responsable du traitement',
        body: <DataControllerBlock locale="fr" />,
      },
      {
        h: '2. Données collectées',
        body: (
          <ul>
            <li>Coordonnées via formulaire ou e-mail (nom, e-mail, téléphone, message).</li>
            <li>Demandes de réservation ou de disponibilité.</li>
            <li>Données techniques de navigation (IP, navigateur, pages) uniquement avec consentement analytics.</li>
            <li>Préférences cookies (catégories, horodatage, version de la policy, hash d’intégrité).</li>
          </ul>
        ),
      },
      {
        h: '3. Finalités et bases légales',
        body: (
          <ul>
            <li>
              <strong>Demandes et réservations</strong> — mesures précontractuelles et contrat (art. 6.1.b RGPD).
            </li>
            <li>
              <strong>Communications informatives</strong> — intérêt légitime ou consentement (art. 6.1.f / a).
            </li>
            <li>
              <strong>Analytics et marketing</strong> — uniquement avec consentement explicite (art. 6.1.a).
            </li>
            <li>
              <strong>Sécurité et fonctionnement du site</strong> — intérêt légitime (art. 6.1.f).
            </li>
          </ul>
        ),
      },
      {
        h: '4. Conservation',
        body: (
          <p>
            Les données de contact sont conservées le temps nécessaire au traitement et aux obligations légales. Les logs
            analytics suivent les durées des fournisseurs. Le consentement cookies est stocké jusqu’à 12 mois ou jusqu’au retrait.
          </p>
        ),
      },
      {
        h: '5. Destinataires et transferts',
        body: (
          <p>
            Les données peuvent être traitées par des prestataires techniques (hébergement, e-mail, analytics) en tant que
            sous-traitants. Tout transfert hors UE avec garanties appropriées.
          </p>
        ),
      },
      {
        h: '6. Vos droits',
        body: (
          <ul>
            <li>Accès, rectification, effacement, limitation, opposition, portabilité.</li>
            <li>Retrait du consentement à tout moment sans affecter le traitement antérieur licite.</li>
            <li>Réclamation auprès de l’autorité de contrôle.</li>
          </ul>
        ),
      },
      {
        h: '7. Cookies et suivi',
        body: (
          <p>
            Voir notre <Link to="/cookie-policy">Politique cookies</Link>. Aucun cookie non essentiel avant votre consentement.
          </p>
        ),
      },
    ],
  },
  es: {
    title: 'Política de privacidad',
    updated: 'Última actualización: mayo 2026',
    sections: [
      {
        h: '1. Responsable del tratamiento',
        body: <DataControllerBlock locale="es" />,
      },
      {
        h: '2. Datos recopilados',
        body: (
          <ul>
            <li>Datos de contacto por formulario o correo (nombre, email, teléfono, mensaje).</li>
            <li>Solicitudes de reserva o disponibilidad.</li>
            <li>Datos técnicos de navegación (IP, navegador, páginas) solo con consentimiento analítico.</li>
            <li>Preferencias de cookies (categorías, marca temporal, versión de la policy, hash de integridad).</li>
          </ul>
        ),
      },
      {
        h: '3. Finalidades y base jurídica',
        body: (
          <ul>
            <li>
              <strong>Consultas y reservas</strong> — medidas precontractuales y contrato (art. 6.1.b RGPD).
            </li>
            <li>
              <strong>Comunicaciones informativas</strong> — interés legítimo o consentimiento (art. 6.1.f / a).
            </li>
            <li>
              <strong>Analítica y marketing</strong> — solo con consentimiento explícito (art. 6.1.a).
            </li>
            <li>
              <strong>Seguridad y funcionamiento del sitio</strong> — interés legítimo (art. 6.1.f).
            </li>
          </ul>
        ),
      },
      {
        h: '4. Conservación',
        body: (
          <p>
            Los datos de contacto se conservan el tiempo necesario para gestionar la solicitud y obligaciones legales. Los logs
            analíticos siguen los plazos del proveedor. El consentimiento de cookies se guarda hasta 12 meses o hasta su retirada.
          </p>
        ),
      },
      {
        h: '5. Destinatarios y transferencias',
        body: (
          <p>
            Los datos pueden ser tratados por proveedores técnicos (hosting, correo, analítica) como encargados. Transferencias
            fuera de la UE solo con garantías adecuadas.
          </p>
        ),
      },
      {
        h: '6. Sus derechos',
        body: (
          <ul>
            <li>Acceso, rectificación, supresión, limitación, oposición, portabilidad.</li>
            <li>Retirar el consentimiento en cualquier momento sin afectar el tratamiento previo lícito.</li>
            <li>Reclamación ante la autoridad de control.</li>
          </ul>
        ),
      },
      {
        h: '7. Cookies y seguimiento',
        body: (
          <p>
            Consulte nuestra <Link to="/cookie-policy">Política de cookies</Link>. No se activan cookies no esenciales sin su consentimiento.
          </p>
        ),
      },
    ],
  },
};

export function PrivacyPolicyPage() {
  const { locale, content } = useSiteLocale();
  const site = content.config;
  const doc = privacyByLang[locale];

  return (
    <article className="legal-page">
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
