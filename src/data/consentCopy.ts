import type { ConsentLocale } from '../lib/consentTypes';

type ConsentCopy = {
  banner: {
    eyebrow: string;
    title: string;
    description: string;
    acceptAll: string;
    rejectAll: string;
    customize: string;
    privacyLink: string;
    cookieLink: string;
  };
  panel: {
    title: string;
    description: string;
    necessary: { title: string; description: string; alwaysOn: string };
    analytics: { title: string; description: string };
    marketing: { title: string; description: string };
    preferences: { title: string; description: string };
    save: string;
    back: string;
  };
  footer: {
    manage: string;
    privacy: string;
    cookies: string;
  };
  aria: {
    dialog: string;
    panel: string;
    localeSwitch: string;
  };
};

export const consentCopy: Record<ConsentLocale, ConsentCopy> = {
  it: {
    banner: {
      eyebrow: 'Privacy & cookie',
      title: 'La tua esperienza, le tue scelte',
      description:
        'Utilizziamo cookie tecnici necessari al funzionamento del sito e, solo con il tuo consenso, strumenti di analisi e marketing per migliorare i nostri servizi. Puoi accettare tutto, rifiutare i cookie non essenziali o personalizzare le preferenze.',
      acceptAll: 'Accetta tutto',
      rejectAll: 'Rifiuta tutto',
      customize: 'Personalizza',
      privacyLink: 'Privacy Policy',
      cookieLink: 'Cookie Policy',
    },
    panel: {
      title: 'Preferenze cookie',
      description:
        'Seleziona le categorie che desideri attivare. I cookie necessari restano sempre attivi per garantire sicurezza e funzionalità di base.',
      necessary: {
        title: 'Necessari',
        description: 'Cookie indispensabili per navigazione, sicurezza e memorizzazione delle preferenze di consenso.',
        alwaysOn: 'Sempre attivi',
      },
      analytics: {
        title: 'Analitici',
        description: 'Ci aiutano a comprendere come viene utilizzato il sito (es. Google Analytics), in forma aggregata.',
      },
      marketing: {
        title: 'Marketing',
        description: 'Permettono attività promozionali e remarketing (es. Meta Pixel), solo se li autorizzi.',
      },
      preferences: {
        title: 'Preferenze',
        description:
          'Abilitano funzioni come la mappa Google interattiva e altre scelte di interfaccia. Senza questo consenso la mappa non viene caricata.',
      },
      save: 'Salva preferenze',
      back: 'Indietro',
    },
    footer: {
      manage: 'Gestisci cookie',
      privacy: 'Privacy',
      cookies: 'Cookie',
    },
    aria: {
      dialog: 'Consenso cookie',
      panel: 'Pannello preferenze cookie',
      localeSwitch: 'Cambia lingua',
    },
  },
  en: {
    banner: {
      eyebrow: 'Privacy & cookies',
      title: 'Your experience, your choices',
      description:
        'We use essential cookies required for the website to work and, only with your consent, analytics and marketing tools to improve our services. You can accept all, reject non-essential cookies, or customize your preferences.',
      acceptAll: 'Accept all',
      rejectAll: 'Reject all',
      customize: 'Customize',
      privacyLink: 'Privacy Policy',
      cookieLink: 'Cookie Policy',
    },
    panel: {
      title: 'Cookie preferences',
      description:
        'Choose which categories to enable. Necessary cookies always remain active to ensure security and core functionality.',
      necessary: {
        title: 'Necessary',
        description: 'Required for navigation, security, and storing your consent choices.',
        alwaysOn: 'Always on',
      },
      analytics: {
        title: 'Analytics',
        description: 'Help us understand how the site is used (e.g. Google Analytics), in aggregated form.',
      },
      marketing: {
        title: 'Marketing',
        description: 'Enable promotional and remarketing activities (e.g. Meta Pixel) only if you allow them.',
      },
      preferences: {
        title: 'Preferences',
        description:
          'Enable features such as the interactive Google Map and other interface choices. Without this consent the map is not loaded.',
      },
      save: 'Save preferences',
      back: 'Back',
    },
    footer: {
      manage: 'Manage cookies',
      privacy: 'Privacy',
      cookies: 'Cookies',
    },
    aria: {
      dialog: 'Cookie consent',
      panel: 'Cookie preferences panel',
      localeSwitch: 'Change language',
    },
  },
};
