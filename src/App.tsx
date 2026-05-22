import { lazy, Suspense, useEffect, useLayoutEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AppBootstrap } from './components/AppBootstrap';
import { CustomCursor } from './components/CustomCursor';
import { CookieConsentRoot } from './components/consent/CookieConsentRoot';
import { LenisScroll } from './components/LenisScroll';
import { PageSeo } from './components/seo/PageSeo';
import { StructuredData } from './components/seo/StructuredData';
import { TrackingRouteSync } from './components/seo/TrackingRouteSync';
import { SubPageLayout } from './components/SubPageLayout';
import { getLaPelosaPaths, getPagePaths, getSuiteRouteEntries, isSuiteDetailPath } from './data/routes';
import { scheduleScrollToSuiteHero, scrollToHash, scrollToTop } from './lib/scroll';
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
  const isSuite = isSuiteDetailPath(location.pathname);

  useLayoutEffect(() => {
    if (location.hash) return;

    if (isSuite) {
      scrollToTop(true);
      return;
    }

    scrollToTop(true);
  }, [location.pathname, location.hash, isSuite]);

  useEffect(() => {
    if (location.hash) {
      const scroll = () => {
        scrollToHash(location.hash);
        ScrollTrigger.refresh();
      };
      requestAnimationFrame(scroll);
      const delays = [350, 900, 1600];
      const timers = delays.map((ms) => window.setTimeout(scroll, ms));
      return () => timers.forEach((id) => window.clearTimeout(id));
    }

    if (isSuite) {
      return scheduleScrollToSuiteHero();
    }

    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [location.pathname, location.hash, isSuite]);

  return null;
}

function RouteFallback() {
  return <div className="route-fallback" aria-hidden />;
}

export default function App() {
  const laPelosaPaths = getLaPelosaPaths();
  const privacyPaths = getPagePaths('privacy-policy');
  const cookiePaths = getPagePaths('cookie-policy');
  const suiteRoutes = getSuiteRouteEntries();

  return (
    <BrowserRouter>
      <CookieConsentRoot>
        <PageSeo />
        <StructuredData />
        <TrackingRouteSync />
        <AppBootstrap />
        <LenisScroll />
        <CustomCursor />
        <ScrollOnNavigate />
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route element={<SubPageLayout />}>
              {laPelosaPaths.map((path) => (
                <Route key={path} path={path} element={<LaPelosaPage />} />
              ))}
              {suiteRoutes.map(({ path }) => (
                <Route key={path} path={path} element={<SuitePage />} />
              ))}
              {privacyPaths.map((path) => (
                <Route key={path} path={path} element={<PrivacyPolicyPage />} />
              ))}
              {cookiePaths.map((path) => (
                <Route key={path} path={path} element={<CookiePolicyPage />} />
              ))}
            </Route>
          </Routes>
        </Suspense>
      </CookieConsentRoot>
    </BrowserRouter>
  );
}
