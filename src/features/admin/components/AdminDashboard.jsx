import { Link } from 'react-router-dom';
import { BookingSettingsPanel } from './BookingSettingsPanel';
import { TodayOverview } from './TodayOverview';
import { UnitsPlanningBoard } from './UnitsPlanningBoard';

export function AdminDashboard({ openAccess, onLogout }) {
  return (
    <div className="admin-dashboard">
      <header className="admin-dashboard__topbar">
        <div className="admin-dashboard__topbar-brand">
          <span className="admin-dashboard__product">Le Vele Residence</span>
          <span className="admin-dashboard__product-sub">Admin</span>
        </div>
        <div className="admin-dashboard__topbar-actions">
          <Link to="/" className="admin-dashboard__link">
            Torna al sito
          </Link>
          <button type="button" className="admin-dashboard__logout" onClick={onLogout}>
            {openAccess ? 'Chiudi' : 'Esci'}
          </button>
        </div>
      </header>

      <main className="admin-dashboard__main">
        {openAccess ? (
          <p className="admin-dashboard__open-banner" role="status">
            Modalità sviluppo: accesso senza password. Per proteggere l’area imposta{' '}
            <code>VITE_ADMIN_PASSWORD</code> in <code>.env.local</code>.
          </p>
        ) : null}

        <header className="admin-dashboard__header">
          <h1 className="admin-dashboard__title">Planning unità</h1>
          <p className="admin-dashboard__lead">
            Calendario delle 18 monolocali: clic su una cella per aggiornare lo stato. I dati restano nel browser fino al
            backend.
          </p>
        </header>

        <TodayOverview />

        <section className="admin-dashboard__planning" aria-labelledby="admin-planning-title">
          <h2 id="admin-planning-title" className="visually-hidden">
            Griglia mensile
          </h2>
          <UnitsPlanningBoard />
        </section>

        <BookingSettingsPanel />

        <section className="admin-dashboard__card" aria-labelledby="admin-next-title">
          <h2 id="admin-next-title" className="admin-dashboard__h2">
            Prossimi passi
          </h2>
          <ul className="admin-dashboard__list">
            <li>
              La barra «Verifica disponibilità» sul sito (senza <code>VITE_API_BASE_URL</code>) usa già le stesse celle del
              planning salvate qui: tipologia libera se almeno un monolocale della categoria ha tutte le notti in stato
              Libero.
            </li>
            <li>
              In produzione: <code>POST /v1/availability/search</code> sul backend che legge il planning definitivo e
              sostituisce il mock.
            </li>
            <li>Autenticazione lato server (JWT / session) al posto della sola password in variabile d’ambiente.</li>
          </ul>
        </section>

        <section className="admin-dashboard__card admin-dashboard__card--muted">
          <p className="admin-dashboard__note">
            La password attuale è solo un ostacolo leggero sul client: in produzione usa sempre un backend che verifichi i
            permessi.
          </p>
        </section>
      </main>
    </div>
  );
}
