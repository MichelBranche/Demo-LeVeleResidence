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
    legalNav: string;
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
      legalNav: 'Privacy e cookie',
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
      legalNav: 'Privacy and cookies',
    },
  },
  de: {
    banner: {
      eyebrow: 'Datenschutz & Cookies',
      title: 'Ihr Erlebnis, Ihre Wahl',
      description:
        'Wir verwenden technisch notwendige Cookies und — nur mit Ihrer Einwilligung — Analyse- und Marketing-Tools. Sie können alle akzeptieren, nicht notwendige Cookies ablehnen oder Einstellungen anpassen.',
      acceptAll: 'Alle akzeptieren',
      rejectAll: 'Alle ablehnen',
      customize: 'Anpassen',
      privacyLink: 'Datenschutz',
      cookieLink: 'Cookie-Richtlinie',
    },
    panel: {
      title: 'Cookie-Einstellungen',
      description:
        'Wählen Sie die Kategorien. Notwendige Cookies bleiben für Sicherheit und Grundfunktionen aktiv.',
      necessary: {
        title: 'Notwendig',
        description: 'Erforderlich für Navigation, Sicherheit und Speicherung Ihrer Einwilligung.',
        alwaysOn: 'Immer aktiv',
      },
      analytics: {
        title: 'Analytisch',
        description: 'Helfen uns zu verstehen, wie die Website genutzt wird (z. B. Google Analytics), aggregiert.',
      },
      marketing: {
        title: 'Marketing',
        description: 'Werbung und Remarketing (z. B. Meta Pixel) nur mit Ihrer Einwilligung.',
      },
      preferences: {
        title: 'Präferenzen',
        description:
          'Aktivieren u. a. die interaktive Google-Karte. Ohne diese Einwilligung wird die Karte nicht geladen.',
      },
      save: 'Einstellungen speichern',
      back: 'Zurück',
    },
    footer: { manage: 'Cookies verwalten', privacy: 'Datenschutz', cookies: 'Cookies' },
    aria: {
      dialog: 'Cookie-Einwilligung',
      panel: 'Cookie-Einstellungen',
      localeSwitch: 'Sprache ändern',
      legalNav: 'Datenschutz und Cookies',
    },
  },
  fr: {
    banner: {
      eyebrow: 'Confidentialité & cookies',
      title: 'Votre expérience, vos choix',
      description:
        'Nous utilisons des cookies techniques nécessaires et, uniquement avec votre consentement, des outils d’analyse et marketing. Acceptez tout, refusez les cookies non essentiels ou personnalisez.',
      acceptAll: 'Tout accepter',
      rejectAll: 'Tout refuser',
      customize: 'Personnaliser',
      privacyLink: 'Politique de confidentialité',
      cookieLink: 'Politique cookies',
    },
    panel: {
      title: 'Préférences cookies',
      description:
        'Choisissez les catégories à activer. Les cookies nécessaires restent toujours actifs pour la sécurité et le fonctionnement de base.',
      necessary: {
        title: 'Nécessaires',
        description: 'Indispensables à la navigation, la sécurité et la mémorisation de vos choix.',
        alwaysOn: 'Toujours actifs',
      },
      analytics: {
        title: 'Analytiques',
        description: 'Nous aident à comprendre l’usage du site (ex. Google Analytics), de façon agrégée.',
      },
      marketing: {
        title: 'Marketing',
        description: 'Promotion et remarketing (ex. Meta Pixel) uniquement si vous l’autorisez.',
      },
      preferences: {
        title: 'Préférences',
        description:
          'Activent notamment la carte Google interactive. Sans ce consentement, la carte n’est pas chargée.',
      },
      save: 'Enregistrer',
      back: 'Retour',
    },
    footer: { manage: 'Gérer les cookies', privacy: 'Confidentialité', cookies: 'Cookies' },
    aria: {
      dialog: 'Consentement cookies',
      panel: 'Préférences cookies',
      localeSwitch: 'Changer de langue',
      legalNav: 'Confidentialité et cookies',
    },
  },
  es: {
    banner: {
      eyebrow: 'Privacidad y cookies',
      title: 'Tu experiencia, tus elecciones',
      description:
        'Usamos cookies técnicas necesarias y, solo con tu consentimiento, herramientas de análisis y marketing. Puedes aceptar todo, rechazar las no esenciales o personalizar.',
      acceptAll: 'Aceptar todo',
      rejectAll: 'Rechazar todo',
      customize: 'Personalizar',
      privacyLink: 'Política de privacidad',
      cookieLink: 'Política de cookies',
    },
    panel: {
      title: 'Preferencias de cookies',
      description:
        'Elige las categorías. Las cookies necesarias permanecen activas para seguridad y funciones básicas.',
      necessary: {
        title: 'Necesarias',
        description: 'Imprescindibles para navegar, la seguridad y guardar tu consentimiento.',
        alwaysOn: 'Siempre activas',
      },
      analytics: {
        title: 'Analíticas',
        description: 'Nos ayudan a entender el uso del sitio (p. ej. Google Analytics), de forma agregada.',
      },
      marketing: {
        title: 'Marketing',
        description: 'Promoción y remarketing (p. ej. Meta Pixel) solo si lo autorizas.',
      },
      preferences: {
        title: 'Preferencias',
        description:
          'Activan funciones como el mapa interactivo de Google. Sin este consentimiento el mapa no se carga.',
      },
      save: 'Guardar preferencias',
      back: 'Atrás',
    },
    footer: { manage: 'Gestionar cookies', privacy: 'Privacidad', cookies: 'Cookies' },
    aria: {
      dialog: 'Consentimiento de cookies',
      panel: 'Preferencias de cookies',
      localeSwitch: 'Cambiar idioma',
      legalNav: 'Privacidad y cookies',
    },
  },
  ru: {
    banner: {
      eyebrow: 'Конфиденциальность и cookie',
      title: 'Ваш опыт — ваш выбор',
      description:
        'Мы используем технические cookie, необходимые для работы сайта, и — только с вашего согласия — аналитику и маркетинг. Вы можете принять всё, отклонить необязательные cookie или настроить предпочтения.',
      acceptAll: 'Принять всё',
      rejectAll: 'Отклонить всё',
      customize: 'Настроить',
      privacyLink: 'Политика конфиденциальности',
      cookieLink: 'Политика cookie',
    },
    panel: {
      title: 'Настройки cookie',
      description:
        'Выберите категории. Необходимые cookie всегда активны для безопасности и базовых функций.',
      necessary: {
        title: 'Необходимые',
        description: 'Нужны для навигации, безопасности и сохранения вашего согласия.',
        alwaysOn: 'Всегда активны',
      },
      analytics: {
        title: 'Аналитика',
        description: 'Помогают понять использование сайта (напр. Google Analytics) в агрегированном виде.',
      },
      marketing: {
        title: 'Маркетинг',
        description: 'Реклама и ремаркетинг (напр. Meta Pixel) только с вашего разрешения.',
      },
      preferences: {
        title: 'Предпочтения',
        description:
          'Включают интерактивную карту Google и другие настройки интерфейса. Без согласия карта не загружается.',
      },
      save: 'Сохранить настройки',
      back: 'Назад',
    },
    footer: { manage: 'Управление cookie', privacy: 'Конфиденциальность', cookies: 'Cookie' },
    aria: {
      dialog: 'Согласие на cookie',
      panel: 'Настройки cookie',
      localeSwitch: 'Сменить язык',
      legalNav: 'Конфиденциальность и cookie',
    },
  },
  zh: {
    banner: {
      eyebrow: '隐私与 Cookie',
      title: '您的体验，您的选择',
      description:
        '我们使用网站运行所必需的技术性 Cookie；仅在您同意时才会启用分析与营销工具。您可以全部接受、拒绝非必要 Cookie 或自定义偏好。',
      acceptAll: '全部接受',
      rejectAll: '全部拒绝',
      customize: '自定义',
      privacyLink: '隐私政策',
      cookieLink: 'Cookie 政策',
    },
    panel: {
      title: 'Cookie 偏好设置',
      description: '选择要启用的类别。必要 Cookie 始终启用，以保障安全与基本功能。',
      necessary: {
        title: '必要',
        description: '用于浏览、安全及保存您的同意偏好。',
        alwaysOn: '始终启用',
      },
      analytics: {
        title: '分析',
        description: '帮助我们了解网站使用情况（如 Google Analytics），以汇总形式呈现。',
      },
      marketing: {
        title: '营销',
        description: '仅在您授权时用于推广与再营销（如 Meta Pixel）。',
      },
      preferences: {
        title: '偏好',
        description: '启用 Google 互动地图等界面功能。未经同意不会加载地图。',
      },
      save: '保存偏好',
      back: '返回',
    },
    footer: { manage: '管理 Cookie', privacy: '隐私', cookies: 'Cookie' },
    aria: {
      dialog: 'Cookie 同意',
      panel: 'Cookie 偏好',
      localeSwitch: '切换语言',
      legalNav: '隐私与 Cookie',
    },
  },
};
