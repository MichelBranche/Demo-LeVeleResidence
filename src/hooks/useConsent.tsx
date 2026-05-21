import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { consentCopy } from '../data/consentCopy';
import { applyTrackingIfConsented, revokeAllTracking } from '../lib/tracking';
import {
  clearConsent,
  getConsent,
  setConsent as persistConsent,
} from '../lib/consentStorage';
import { verifyConsentHashAsync } from '../lib/consentHash';
import {
  createConsent,
  DEFAULT_ACCEPTED,
  DEFAULT_REJECTED,
  preferencesFromConsent,
  type Consent,
  type ConsentLocale,
  type ConsentPreferences,
  type ConsentPreferencesPartial,
} from '../lib/consentTypes';

type ConsentContextValue = {
  consent: Consent | null;
  hasConsent: boolean;
  isReady: boolean;
  bannerOpen: boolean;
  panelOpen: boolean;
  locale: ConsentLocale;
  copy: (typeof consentCopy)['it'];
  setLocale: (locale: ConsentLocale) => void;
  persistPreferences: (prefs: ConsentPreferences) => Promise<Consent>;
  applyTrackingScripts: (saved: Consent) => void;
  acceptAll: () => Promise<ConsentPreferences>;
  rejectAll: () => Promise<ConsentPreferences>;
  updatePreferences: (partial: ConsentPreferencesPartial) => Promise<ConsentPreferences>;
  resetConsent: () => void;
  openBanner: (options?: { panel?: boolean }) => void;
  closePanel: () => void;
  closeBanner: () => void;
  panelPreferences: ConsentPreferences;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsentState] = useState<Consent | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [locale, setLocale] = useState<ConsentLocale>('it');

  const applyTrackingScripts = useCallback((saved: Consent) => {
    applyTrackingIfConsented(saved);
  }, []);

  const persistPreferences = useCallback(async (prefs: ConsentPreferences): Promise<Consent> => {
    const next = await createConsent(prefs);
    persistConsent(next);
    setConsentState(next);
    revokeAllTracking();
    return next;
  }, []);

  useEffect(() => {
    let disposed = false;

    void (async () => {
      const stored = getConsent();

      if (!stored) {
        if (disposed) return;
        setConsentState(null);
        setBannerOpen(true);
        setIsReady(true);
        return;
      }

      const valid = await verifyConsentHashAsync(stored);
      if (disposed) return;

      if (!valid) {
        clearConsent();
        revokeAllTracking();
        setConsentState(null);
        setBannerOpen(true);
        setIsReady(true);
        return;
      }

      setConsentState(stored);
      setBannerOpen(false);
      applyTrackingIfConsented(stored);
      setIsReady(true);
    })();

    return () => {
      disposed = true;
    };
  }, []);

  const acceptAll = useCallback(async (): Promise<ConsentPreferences> => DEFAULT_ACCEPTED, []);

  const rejectAll = useCallback(async (): Promise<ConsentPreferences> => DEFAULT_REJECTED, []);

  const updatePreferences = useCallback(
    async (partial: ConsentPreferencesPartial): Promise<ConsentPreferences> => {
      const base = preferencesFromConsent(consent);
      return {
        analytics: partial.analytics ?? base.analytics,
        marketing: partial.marketing ?? base.marketing,
        preferences: partial.preferences ?? base.preferences,
      };
    },
    [consent],
  );

  const resetConsent = useCallback(() => {
    clearConsent();
    revokeAllTracking();
    setConsentState(null);
    setPanelOpen(false);
    setBannerOpen(true);
  }, []);

  const openBanner = useCallback((options?: { panel?: boolean }) => {
    setBannerOpen(true);
    setPanelOpen(Boolean(options?.panel));
  }, []);

  useEffect(() => {
    if (!bannerOpen && typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }, [bannerOpen]);

  const panelPreferences = useMemo(() => preferencesFromConsent(consent), [consent]);

  const value = useMemo<ConsentContextValue>(
    () => ({
      consent,
      hasConsent: consent !== null,
      isReady,
      bannerOpen,
      panelOpen,
      locale,
      copy: consentCopy[locale],
      setLocale,
      persistPreferences,
      applyTrackingScripts,
      acceptAll,
      rejectAll,
      updatePreferences,
      resetConsent,
      openBanner,
      closePanel: () => setPanelOpen(false),
      closeBanner: () => {
        setBannerOpen(false);
        setPanelOpen(false);
      },
      panelPreferences,
    }),
    [
      acceptAll,
      applyTrackingScripts,
      bannerOpen,
      consent,
      isReady,
      locale,
      openBanner,
      panelOpen,
      panelPreferences,
      persistPreferences,
      rejectAll,
      resetConsent,
      updatePreferences,
    ],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error('useConsent must be used within ConsentProvider (via CookieConsentRoot)');
  }
  return ctx;
}
