import { lazy, Suspense, useEffect, useLayoutEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AppBootstrap } from './components/AppBootstrap';
import { CustomCursor } from './components/CustomCursor';
import { CookieConsentRoot } from './components/consent/CookieConsentRoot';
import { LenisScroll } from './components/LenisScroll';
import { ConsentGatedAnalytics } from './components/seo/ConsentGatedAnalytics';
import { VercelSpeedInsights } from './components/seo/VercelSpeedInsights';
import { PageSeo } from './components/seo/PageSeo';
import { StructuredData } from './components/seo/StructuredData';
import { TrackingRouteSync } from './components/seo/TrackingRouteSync';
import { LanguageToggle } from './components/LanguageToggle';
import { RouteTransitionOverlay } from './components/RouteTransitionOverlay';
import { SkipToMain } from './components/SkipToMain';
import { SubPageLayout } from './components/SubPageLayout';
import { RouteTransitionProvider, useRouteTransition } from './context/RouteTransitionContext';
import { getLaPelosaPaths, getPagePaths, getSuiteRouteEntries, isSuiteDetailPath, normalizePathname } from './data/routes';
import { scheduleScrollToSuiteHero, scrollToHash, scrollToTop } from './lib/scroll';
import { scheduleScrollTriggerRefresh } from './lib/scrollTriggerRefresh';
const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const BookingPage = lazy(() =>
  import('./pages/BookingPage').then((m) => ({ default: m.BookingPage })),
);

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
const InfoPage = lazy(() => import('./pages/InfoPage').then((m) => ({ default: m.InfoPage })));
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })),
);

function ScrollOnNavigate() {
  const location = useLocation();
  const navigate = useNavigate();
  const { stage } = useRouteTransition();
  const isSuite = isSuiteDetailPath(location.pathname);

  useEffect(() => {
    if (stage !== 'idle') return;

    if (location.pathname === '/' && location.hash === '#info-servizi') {
      navigate('/info-condizioni', { replace: true });
      return;
    }

    if (location.pathname === '/' && location.hash === '#contatti') {
      navigate('/contatti', { replace: true });
      return;
    }

    const canonical = normalizePathname(location.pathname);
    if (location.pathname !== canonical) {
      navigate(`${canonical}${location.search}${location.hash}`, { replace: true });
    }
  }, [location.pathname, location.hash, location.search, navigate, stage]);

  useLayoutEffect(() => {
    if (stage !== 'idle') return;
    if (location.hash) return;
    // Suite: scheduleScrollToSuiteHero gestisce il reset (evita doppio scrollToTop).
    if (isSuite) return;

    scrollToTop(true);
  }, [location.pathname, location.hash, isSuite, stage]);

  useEffect(() => {
    if (stage !== 'idle') return;

    if (location.hash) {
      const scroll = () => {
        scrollToHash(location.hash);
        scheduleScrollTriggerRefresh();
      };
      requestAnimationFrame(scroll);
      const delays = [350, 900, 1600];
      const timers = delays.map((ms) => window.setTimeout(scroll, ms));
      return () => timers.forEach((id) => window.clearTimeout(id));
    }

    if (isSuite) {
      return scheduleScrollToSuiteHero();
    }

    scheduleScrollTriggerRefresh();
  }, [location.pathname, location.hash, isSuite, stage]);

  return null;
}

function RouteFallback() {
  return <div className="route-fallback" aria-hidden />;
}

function MobileLangFab() {
  const { pathname } = useLocation();
  const isHome = pathname === '/' || pathname === '';

  if (isHome) return null;

  return <LanguageToggle variant="fab" />;
}

export default function App() {
  const laPelosaPaths = getLaPelosaPaths();
  const bookingPaths = getPagePaths('booking');
  const privacyPaths = getPagePaths('privacy-policy');
  const cookiePaths = getPagePaths('cookie-policy');
  const infoPaths = getPagePaths('info');
  const contactPaths = getPagePaths('contact');
  const suiteRoutes = getSuiteRouteEntries();

  return (
    <BrowserRouter>
      <RouteTransitionProvider>
      <CookieConsentRoot>
        <PageSeo />
        <StructuredData />
        <TrackingRouteSync />
        <AppBootstrap />
        <SkipToMain />
        <LenisScroll />
        <CustomCursor />
        <MobileLangFab />
        <ScrollOnNavigate />
        <RouteTransitionOverlay />
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route element={<SubPageLayout />}>
              {bookingPaths.map((path) => (
                <Route key={path} path={path} element={<BookingPage />} />
              ))}
              {laPelosaPaths.map((path) => (
                <Route key={path} path={path} element={<LaPelosaPage />} />
              ))}
              {suiteRoutes.map(({ path }) => (
                <Route key={path} path={path} element={<SuitePage />} />
              ))}
              {infoPaths.map((path) => (
                <Route key={path} path={path} element={<InfoPage />} />
              ))}
              {contactPaths.map((path) => (
                <Route key={path} path={path} element={<ContactPage />} />
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
        <ConsentGatedAnalytics />
        <VercelSpeedInsights />
      </CookieConsentRoot>
      </RouteTransitionProvider>
    </BrowserRouter>
  );
}
