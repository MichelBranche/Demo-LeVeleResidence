import type { ReactNode } from 'react';
import { siteConfig } from '../i18n/siteMedia';
import { useConsent } from '../hooks/useConsent';
import { useSiteLocale } from '../hooks/useSiteLocale';
import type { SiteLocale } from '../lib/siteLocales';

type LegalDoc = { title: string; updated: string; sections: { h: string; body: ReactNode }[] };

const cookiePrefsCopy: Record<SiteLocale, { title: string; button: string }> = {
  it: { title: 'Modifica preferenze', button: 'Apri pannello cookie' },
  en: { title: 'Change preferences', button: 'Open cookie panel' },
  de: { title: 'Einstellungen ändern', button: 'Cookie-Einstellungen öffnen' },
  fr: { title: 'Modifier les préférences', button: 'Ouvrir le panneau cookies' },
  es: { title: 'Cambiar preferencias', button: 'Abrir panel de cookies' },
  ru: { title: 'Изменить настройки', button: 'Открыть панель cookie' },
  zh: { title: '更改偏好设置', button: '打开 Cookie 面板' },
};

const cookieByLang: Record<SiteLocale, LegalDoc> = {
  it: {
    title: 'Cookie Policy',
    updated: 'Ultimo aggiornamento: giugno 2026',
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
            <li>
              <strong>lv-site-locale</strong> (localStorage) — lingua dell’interfaccia scelta dall’utente. Durata:
              fino a cancellazione manuale.
            </li>
            <li>Cookie di sessione e sicurezza del browser/hosting (Vercel), indispensabili alla navigazione.</li>
          </ul>
        ),
      },
      {
        h: '3. Cookie analitici',
        body: (
          <p>
            Attivati solo se accetti la categoria <em>Analitici</em>. Possono includere Google Analytics (statistiche
            aggregate su visite e pagine, ID <code>VITE_GA_MEASUREMENT_ID</code>) e strumenti Vercel Analytics / Speed
            Insights (metriche di utilizzo e performance). Nessuno script analytics viene caricato prima del consenso.
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
            <em>Preferenze</em>. Include l’embed di Google Maps nel footer (cookie di terze parti di Google). Senza
            consenso viene mostrata solo un’anteprima statica.
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
            Per domande su cookie e privacy: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </p>
        ),
      },
    ],
  },
  en: {
    title: 'Cookie Policy',
    updated: 'Last updated: June 2026',
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
            <li>
              <strong>lv-site-locale</strong> (localStorage) — interface language chosen by the user until cleared.
            </li>
            <li>Session and security cookies from browser/hosting (Vercel) required for navigation.</li>
          </ul>
        ),
      },
      {
        h: '3. Analytics cookies',
        body: (
          <p>
            Enabled only if you accept <em>Analytics</em>. May include Google Analytics and Vercel Analytics / Speed
            Insights (usage and performance metrics). No analytics scripts load before consent.
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
            Store interface or content choices when you allow <em>Preferences</em>. Includes the Google Maps embed in
            the footer (third-party Google cookies). Without consent, only a static map preview is shown.
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
            Questions: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </p>
        ),
      },
    ],
  },
  de: {
    title: 'Cookie-Richtlinie',
    updated: 'Letzte Aktualisierung: Mai 2026',
    sections: [
      {
        h: '1. Was sind Cookies?',
        body: (
          <p>
            Cookies sind kleine Textdateien auf Ihrem Gerät für Funktionalität, Präferenzen und — nur mit Einwilligung —
            Analyse oder Marketing.
          </p>
        ),
      },
      {
        h: '2. Technisch notwendige Cookies',
        body: (
          <ul>
            <li>
              <strong>lv_consent</strong> — Einwilligung, Zeitstempel, Policy-Version (Cookie + localStorage, 12 Monate).
            </li>
            <li>Sitzungs- und Sicherheitscookies des Hostings.</li>
          </ul>
        ),
      },
      {
        h: '3. Analytische Cookies',
        body: <p>Nur bei Einwilligung zur Kategorie Analytisch (z. B. Google Analytics).</p>,
      },
      {
        h: '4. Marketing-Cookies',
        body: <p>Nur bei Einwilligung zur Kategorie Marketing (z. B. Meta Pixel).</p>,
      },
      {
        h: '5. Präferenz-Cookies',
        body: <p>Ermöglichen u. a. die interaktive Google-Karte — nur mit Einwilligung Präferenzen.</p>,
      },
      {
        h: '6. Verwaltung',
        body: <p>Sie können die Einwilligung jederzeit im Banner oder unten auf dieser Seite ändern.</p>,
      },
      {
        h: '7. Kontakt',
        body: (
          <p>
            Fragen: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </p>
        ),
      },
    ],
  },
  fr: {
    title: 'Politique cookies',
    updated: 'Dernière mise à jour : mai 2026',
    sections: [
      {
        h: '1. Qu’est-ce qu’un cookie ?',
        body: (
          <p>
            Petits fichiers texte sur votre appareil pour le fonctionnement, les préférences et — avec consentement —
            l’analyse ou le marketing.
          </p>
        ),
      },
      {
        h: '2. Cookies nécessaires',
        body: (
          <ul>
            <li>
              <strong>lv_consent</strong> — consentement, horodatage, version de la policy (cookie + localStorage, 12 mois).
            </li>
            <li>Cookies de session et de sécurité de l’hébergement.</li>
          </ul>
        ),
      },
      { h: '3. Cookies analytiques', body: <p>Uniquement si vous acceptez la catégorie Analytiques.</p> },
      { h: '4. Cookies marketing', body: <p>Uniquement si vous acceptez la catégorie Marketing.</p> },
      {
        h: '5. Cookies de préférences',
        body: <p>Permettent notamment la carte Google interactive — avec consentement Préférences.</p>,
      },
      { h: '6. Gestion', body: <p>Vous pouvez modifier votre choix via le bandeau ou ci-dessous.</p> },
      {
        h: '7. Contact',
        body: (
          <p>
            Questions : <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </p>
        ),
      },
    ],
  },
  es: {
    title: 'Política de cookies',
    updated: 'Última actualización: mayo 2026',
    sections: [
      {
        h: '1. ¿Qué son las cookies?',
        body: (
          <p>
            Pequeños archivos de texto en su dispositivo para funcionalidad, preferencias y — con consentimiento — análisis o
            marketing.
          </p>
        ),
      },
      {
        h: '2. Cookies necesarias',
        body: (
          <ul>
            <li>
              <strong>lv_consent</strong> — consentimiento, marca temporal, versión de la policy (cookie + localStorage, 12 meses).
            </li>
            <li>Cookies de sesión y seguridad del alojamiento.</li>
          </ul>
        ),
      },
      { h: '3. Cookies analíticas', body: <p>Solo si acepta la categoría Analíticas.</p> },
      { h: '4. Cookies de marketing', body: <p>Solo si acepta la categoría Marketing.</p> },
      {
        h: '5. Cookies de preferencias',
        body: <p>Permiten, entre otras, el mapa interactivo de Google — con consentimiento Preferencias.</p>,
      },
      { h: '6. Gestión', body: <p>Puede cambiar su elección en el banner o más abajo.</p> },
      {
        h: '7. Contacto',
        body: (
          <p>
            Consultas: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </p>
        ),
      },
    ],
  },
  ru: {
    title: 'Политика cookie',
    updated: 'Последнее обновление: июнь 2026',
    sections: [
      {
        h: '1. Что такое cookie',
        body: (
          <p>
            Cookie — небольшие текстовые файлы на вашем устройстве для основных функций, запоминания
            предпочтений и — только с согласия — анализа использования и маркетинга.
          </p>
        ),
      },
      {
        h: '2. Строго необходимые cookie',
        body: (
          <ul>
            <li>
              <strong>lv_consent</strong> (технический cookie, Path=/, SameSite=Lax) — предпочтения, время,
              версия политики, хеш. Срок: 12 месяцев.
            </li>
            <li>
              <strong>lv_consent</strong> (localStorage) — локальная копия для быстрого восстановления.
            </li>
            <li>
              <strong>lv-site-locale</strong> (localStorage) — выбранный язык интерфейса до очистки.
            </li>
            <li>Cookie сессии и безопасности браузера/хостинга (Vercel), необходимые для навигации.</li>
          </ul>
        ),
      },
      {
        h: '3. Аналитические cookie',
        body: (
          <p>
            Включаются только при принятии категории <em>Аналитика</em>. Могут включать Google Analytics и
            Vercel Analytics / Speed Insights. Скрипты не загружаются до согласия.
          </p>
        ),
      },
      {
        h: '4. Маркетинговые cookie',
        body: (
          <p>
            Только с согласием на <em>Маркетинг</em>. Могут включать Meta Pixel. Скрипты подгружаются лениво
            после согласия.
          </p>
        ),
      },
      {
        h: '5. Cookie предпочтений',
        body: (
          <p>
            Сохраняют выбор интерфейса при разрешении <em>Предпочтения</em>. Включают встраивание Google Maps в
            подвале. Без согласия показывается статическая карта.
          </p>
        ),
      },
      {
        h: '6. Управление согласием',
        body: (
          <p>
            При первом визите баннер предлагает «Принять всё», «Отклонить всё» или «Настроить». Изменить выбор
            можно через «Управление cookie» в подвале.
          </p>
        ),
      },
      {
        h: '7. Контакты',
        body: (
          <p>
            Вопросы: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </p>
        ),
      },
    ],
  },
  zh: {
    title: 'Cookie 政策',
    updated: '最后更新：2026年6月',
    sections: [
      {
        h: '1. 什么是 Cookie',
        body: (
          <p>
            Cookie 是保存在您设备上的小型文本文件，用于核心功能、记住偏好，以及——仅在您同意时——分析使用情况和支持营销活动。
          </p>
        ),
      },
      {
        h: '2. 严格必要的 Cookie',
        body: (
          <ul>
            <li>
              <strong>lv_consent</strong>（技术 Cookie，Path=/，SameSite=Lax）— 偏好、时间戳、政策版本、完整性哈希。期限：12个月。
            </li>
            <li>
              <strong>lv_consent</strong>（localStorage）— 相同数据的本地副本，便于快速恢复。
            </li>
            <li>
              <strong>lv-site-locale</strong>（localStorage）— 用户选择的界面语言，直至手动清除。
            </li>
            <li>浏览器/托管（Vercel）的会话与安全 Cookie，浏览所必需。</li>
          </ul>
        ),
      },
      {
        h: '3. 分析 Cookie',
        body: (
          <p>
            仅在您接受<em>分析</em>类别时启用。可能包括 Google Analytics 与 Vercel Analytics / Speed
            Insights。同意前不会加载分析脚本。
          </p>
        ),
      },
      {
        h: '4. 营销 Cookie',
        body: (
          <p>
            仅在<em>营销</em>同意下启用。可能包括 Meta Pixel。脚本仅在同意后延迟加载。
          </p>
        ),
      },
      {
        h: '5. 偏好 Cookie',
        body: (
          <p>
            在您允许<em>偏好</em>时保存界面或内容选择。包括页脚 Google 地图嵌入。未经同意仅显示静态地图预览。
          </p>
        ),
      },
      {
        h: '6. 管理同意',
        body: (
          <p>
            首次访问时全屏横幅提供全部接受、全部拒绝或自定义。可随时通过页脚「管理 Cookie」更改选择。
          </p>
        ),
      },
      {
        h: '7. 联系方式',
        body: (
          <p>
            咨询：<a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </p>
        ),
      },
    ],
  },
};

export function CookiePolicyPage() {
  const { locale, content } = useSiteLocale();
  const site = content.config;
  const { openBanner } = useConsent();
  const doc = cookieByLang[locale];
  const prefs = cookiePrefsCopy[locale];

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
      <section>
        <h2>{prefs.title}</h2>
        <p>
          <button type="button" className="consent-btn consent-btn--primary" onClick={() => openBanner({ panel: true })}>
            {prefs.button}
          </button>
        </p>
      </section>
    </article>
  );
}
