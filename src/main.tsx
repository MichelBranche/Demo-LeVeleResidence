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
import './styles/consent.css';
import './styles/mobile.css';
import './styles/chrome.css';
import './styles/route-transition.css';
import './styles/error-fallback.css';
import './styles/hover-interactions.css';

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
