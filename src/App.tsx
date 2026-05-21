import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AppBootstrap } from './components/AppBootstrap';
import { CookieConsentRoot } from './components/consent/CookieConsentRoot';
import { LenisScroll } from './components/LenisScroll';
import { PageSeo } from './components/seo/PageSeo';
import { StructuredData } from './components/seo/StructuredData';
import { TrackingRouteSync } from './components/seo/TrackingRouteSync';
import { SubPageLayout } from './components/SubPageLayout';
import { scrollToHash, scrollToTop } from './lib/scroll';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HomePage } from './pages/HomePage';

const LaPelosaPage = lazy(() =>
  import('./pages/LaPelosaPage').then((m) => ({ default: m.LaPelosaPage })),
);
const SuitePage = lazy(() => import('./pages/SuitePage').then((m) => ({ default: m.SuitePage })));
const PrivacyPolicyPage = lazy(() =>
  import('./pages/PrivacyPolicyPage').then((m) => ({ default: m.PrivacyPolicyPage })),
);
const CookiePolicyPage = lazy(() =>
  import('./pages/CookiePolicyPage').then((m) => ({ default: m.CookiePolicyPage })),
);

function ScrollOnNavigate() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      requestAnimationFrame(() => {
        scrollToHash(location.hash);
        ScrollTrigger.refresh();
      });
      return;
    }

    scrollToTop(true);
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [location.pathname, location.hash]);

  return null;
}

function RouteFallback() {
  return <div className="route-fallback" aria-hidden />;
}

export default function App() {
  return (
    <BrowserRouter>
      <CookieConsentRoot>
        <PageSeo />
        <StructuredData />
        <TrackingRouteSync />
        <AppBootstrap />
        <LenisScroll />
        <ScrollOnNavigate />
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route element={<SubPageLayout />}>
              <Route path="/la-pelosa" element={<LaPelosaPage />} />
              <Route path="/camere/:slug" element={<SuitePage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/cookie-policy" element={<CookiePolicyPage />} />
            </Route>
          </Routes>
        </Suspense>
      </CookieConsentRoot>
    </BrowserRouter>
  );
}
