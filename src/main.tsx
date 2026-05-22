import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import 'lenis/dist/lenis.css';
import './styles/fonts.css';
import './styles/global.css';
import './styles/header.css';
import './styles/landing-intro.css';
import './styles/oh-layout.css';
import './styles/pelosa.css';
import './styles/suite-detail.css';
import './styles/consent.css';
import './styles/mobile.css';
import './styles/chrome.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
