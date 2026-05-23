import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { ensureLocaleLoaded, getSiteContent, isLocaleLoaded, type SiteContent } from '../i18n';
import {
  applyDocumentLocale,
  readSiteLocale,
  writeSiteLocale,
  type SiteLocale,
} from '../lib/siteLocaleStorage';
import { toConsentLocale } from '../lib/siteLocales';
import { useConsent } from './useConsent';

type SiteLocaleContextValue = {
  locale: SiteLocale;
  setLocale: (locale: SiteLocale) => void;
  content: SiteContent;
  localeReady: boolean;
};

const SiteLocaleContext = createContext<SiteLocaleContextValue | null>(null);

export function SiteLocaleProvider({ children }: { children: ReactNode }) {
  const initialLocale = readSiteLocale();
  const [locale, setLocaleState] = useState<SiteLocale>(initialLocale);
  const [loadedLocale, setLoadedLocale] = useState<SiteLocale | null>(() =>
    isLocaleLoaded(initialLocale) ? initialLocale : null,
  );
  const consent = useConsent();
  const localeReady = loadedLocale === locale;

  const setLocale = useCallback(
    (next: SiteLocale) => {
      setLocaleState(next);
      writeSiteLocale(next);
      applyDocumentLocale(next);
      consent.setLocale(toConsentLocale(next));
    },
    [consent],
  );

  useEffect(() => {
    if (loadedLocale === locale) return;

    let cancelled = false;
    void ensureLocaleLoaded(locale).then(() => {
      if (!cancelled) setLoadedLocale(locale);
    });

    return () => {
      cancelled = true;
    };
  }, [locale, loadedLocale]);

  useEffect(() => {
    if (!localeReady) return;
    applyDocumentLocale(locale);
    consent.setLocale(toConsentLocale(locale));
  }, [locale, localeReady, consent]);

  const content = useMemo(
    () => getSiteContent(loadedLocale ?? locale),
    [locale, loadedLocale],
  );

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      content,
      localeReady,
    }),
    [locale, setLocale, content, localeReady],
  );

  if (!localeReady) {
    return <div className="route-fallback" aria-busy="true" aria-live="polite" />;
  }

  return (
    <SiteLocaleContext.Provider value={value}>{children}</SiteLocaleContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSiteLocale(): SiteLocaleContextValue {
  const ctx = useContext(SiteLocaleContext);
  if (!ctx) {
    throw new Error('useSiteLocale must be used within SiteLocaleProvider');
  }
  return ctx;
}
