import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import { ensureLocaleLoaded } from './i18n/localeLoader';
import { applyDocumentLocale, readSiteLocale } from './lib/siteLocaleStorage';
import 'lenis/dist/lenis.css';
import './styles/fonts.css';
import './styles/global.css';
import './styles/header.css';
import './styles/landing-intro.css';
import './styles/oh-layout.css';
import './styles/consent.css';
import './styles/mobile.css';
import './styles/chrome.css';
import './styles/route-transition.css';
import './styles/expandable-gallery.css';
import './styles/unique-testimonials.css';
import './styles/residence-crisp.css';
import './styles/error-fallback.css';

const bootstrapLocale = readSiteLocale();
applyDocumentLocale(bootstrapLocale);

void ensureLocaleLoaded(bootstrapLocale).then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>,
  );
});
