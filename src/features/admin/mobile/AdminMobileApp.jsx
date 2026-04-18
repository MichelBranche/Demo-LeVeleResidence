import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookingSettingsPanel } from '../components/BookingSettingsPanel';
import { TodayOverview } from '../components/TodayOverview';
import { UnitsPlanningBoard } from '../components/UnitsPlanningBoard';
import './admin-mobile.css';

const TABS = /** @type {const} */ ([
  { id: 'planning', label: 'Planning' },
  { id: 'today', label: 'Oggi' },
  { id: 'pricing', label: 'Tariffe' },
  { id: 'more', label: 'Altro' },
]);

/**
 * I pannelli restano montati (display:none) così stato planning / form tariffe non si perdono cambiando tab.
 *
 * @param {{ openAccess: boolean; onLogout: () => void }} props
 */
export function AdminMobileApp({ openAccess, onLogout }) {
  const [tab, setTab] = useState('planning');

  const onTabKey = useCallback((e, id) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setTab(id);
    }
  }, []);

  return (
    <div className="admin-mobile">
      <header className="admin-mobile__header">
        <div className="admin-mobile__brand">
          <span className="admin-mobile__name">Le Vele</span>
          <span className="admin-mobile__badge">Gestionale</span>
        </div>
        <div className="admin-mobile__header-actions">
          <Link to="/" className="admin-mobile__header-link">
            Sito
          </Link>
          <button type="button" className="admin-mobile__header-exit" onClick={onLogout}>
            {openAccess ? 'Chiudi' : 'Esci'}
          </button>
        </div>
      </header>

      <main className="admin-mobile__main" id="admin-mobile-main">
        {openAccess ? (
          <p className="admin-mobile__banner" role="status">
            Dev: senza password. Imposta <code>VITE_ADMIN_PASSWORD</code> in <code>.env.local</code>.
          </p>
        ) : null}

        <div
          className={`admin-mobile__panel admin-mobile__panel--planning${tab !== 'planning' ? ' admin-mobile__panel--hidden' : ''}`}
          role="tabpanel"
          id="admin-mobile-panel-planning"
          aria-hidden={tab !== 'planning'}
        >
          <h1 className="admin-mobile__h1">Planning</h1>
          <p className="admin-mobile__lead">
            Tocca una cella per lo stato. Scorri in orizzontale per i giorni. Conferma in basso.
          </p>
          <UnitsPlanningBoard layout="mobile" embedCommitVisible={tab === 'planning'} />
        </div>

        <div
          className={`admin-mobile__panel${tab !== 'today' ? ' admin-mobile__panel--hidden' : ''}`}
          role="tabpanel"
          id="admin-mobile-panel-today"
          aria-hidden={tab !== 'today'}
        >
          <h1 className="admin-mobile__h1">Oggi</h1>
          <TodayOverview />
        </div>

        <div
          className={`admin-mobile__panel${tab !== 'pricing' ? ' admin-mobile__panel--hidden' : ''}`}
          role="tabpanel"
          id="admin-mobile-panel-pricing"
          aria-hidden={tab !== 'pricing'}
        >
          <h1 className="admin-mobile__h1">Tariffe e buoni</h1>
          <p className="admin-mobile__lead">Prezzi checkout e codici sconto sul sito pubblico.</p>
          <BookingSettingsPanel />
        </div>

        <div
          className={`admin-mobile__panel admin-mobile__panel--more${tab !== 'more' ? ' admin-mobile__panel--hidden' : ''}`}
          role="tabpanel"
          id="admin-mobile-panel-more"
          aria-hidden={tab !== 'more'}
        >
          <h1 className="admin-mobile__h1">Informazioni</h1>
          <section className="admin-dashboard__card" aria-labelledby="m-next">
            <h2 id="m-next" className="admin-dashboard__h2">
              Prossimi passi
            </h2>
            <ul className="admin-dashboard__list">
              <li>La ricerca sul sito usa le celle confermate del planning (stesso browser).</li>
              <li>
                Backend: <code>POST /v1/availability/search</code> e auth server-side.
              </li>
            </ul>
          </section>
          <section className="admin-dashboard__card admin-dashboard__card--muted">
            <p className="admin-dashboard__note">
              La password client è solo per la demo. In produzione usa permessi lato server.
            </p>
          </section>
        </div>
      </main>

      <nav className="admin-mobile__nav" aria-label="Sezioni gestionale">
        <div className="admin-mobile__nav-inner" role="tablist">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              aria-controls={`admin-mobile-panel-${t.id}`}
              id={`admin-mobile-tab-${t.id}`}
              className={`admin-mobile__tab${tab === t.id ? ' is-active' : ''}`}
              onClick={() => setTab(t.id)}
              onKeyDown={(e) => onTabKey(e, t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
