import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { getSiteContent, type SiteContent } from '../i18n';
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
};

const SiteLocaleContext = createContext<SiteLocaleContextValue | null>(null);

export function SiteLocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<SiteLocale>(() => readSiteLocale());
  const consent = useConsent();

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
    applyDocumentLocale(locale);
    consent.setLocale(toConsentLocale(locale));
  }, []);

  const content = useMemo(() => getSiteContent(locale), [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      content,
    }),
    [locale, setLocale, content],
  );

  return (
    <SiteLocaleContext.Provider value={value}>{children}</SiteLocaleContext.Provider>
  );
}

export function useSiteLocale(): SiteLocaleContextValue {
  const ctx = useContext(SiteLocaleContext);
  if (!ctx) {
    throw new Error('useSiteLocale must be used within SiteLocaleProvider');
  }
  return ctx;
}
