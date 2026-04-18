import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { getSuiteBySlug, suites } from '../landing/data/content';
import { RoomCarousel } from './RoomCarousel';
import { usePageTransition } from '../../components/PageTransition';
import './room-detail.css';

export function RoomDetailPage() {
  const { slug } = useParams();
  const suite = getSuiteBySlug(slug);
  const { transitionTo } = usePageTransition();
  const goHome = (event) => {
    event.preventDefault();
    transitionTo('/');
  };
  const [activeConfigId, setActiveConfigId] = useState(
    suite?.configurations?.[0]?.id ?? '2',
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveConfigId(suite?.configurations?.[0]?.id ?? '2');
  }, [slug, suite]);

  useEffect(() => {
    document.body.style.overflow = '';
    document.body.style.backgroundColor = '#faf8f5';
    document.body.style.color = '#3a312b';
  }, []);

  if (!suite) return <Navigate to="/" replace />;

  const otherSuites = suites.filter((s) => s.slug !== suite.slug);
  const activeConfig =
    suite.configurations?.find((c) => c.id === activeConfigId) ?? suite.configurations?.[0];

  return (
    <div className="room-page">
      <header className="room-header">
        <a href="/" onClick={goHome} className="room-back" aria-label="Torna alla home">
          <span aria-hidden="true">←</span>
          <span>Torna al Residence</span>
        </a>
        <img src="/logo_le_vele_stintino_white.svg" alt="Le Vele Stintino" className="room-logo" />
        <a className="room-cta-small" href="#contatti">
          Prenota
        </a>
      </header>

      <section className="room-hero" aria-labelledby="room-title">
        <div className="room-hero-media">
          <img src={suite.image} alt={suite.title} />
          <div className="room-hero-overlay" aria-hidden="true" />
        </div>
        <div className="room-hero-content">
          <p className="room-eyebrow">{suite.kicker}</p>
          <h1 id="room-title" className="room-title">
            {suite.title}
          </h1>
          <p className="room-intro">{suite.description}</p>
          <ul className="room-meta">
            <li>
              <span>Ospiti</span>
              <strong>{activeConfig?.guests} persone</strong>
            </li>
            <li>
              <span>Tipologia</span>
              <strong>{suite.meta.size}</strong>
            </li>
            <li>
              <span>Affaccio</span>
              <strong>{suite.meta.view}</strong>
            </li>
          </ul>
        </div>
      </section>

      <section className="room-carousel-section" aria-label="Galleria">
        <RoomCarousel images={suite.gallery} title={suite.title} />
      </section>

      <section className="room-body">
        <article className="room-description">
          <h2>Il monolocale</h2>
          <p>{suite.longDescription}</p>

          {suite.configurations?.length > 1 && (
            <div className="room-config" role="group" aria-labelledby="room-config-label">
              <p id="room-config-label" className="room-config-label">
                Scegli la configurazione
              </p>
              <div className="room-config-options" role="radiogroup">
                {suite.configurations.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    role="radio"
                    aria-checked={activeConfigId === c.id}
                    className={`room-config-option ${activeConfigId === c.id ? 'is-active' : ''}`}
                    onClick={() => setActiveConfigId(c.id)}
                  >
                    <span className="room-config-count">{c.guests}</span>
                    <span className="room-config-caption">{c.label}</span>
                  </button>
                ))}
              </div>
              {activeConfig && (
                <div className="room-config-details">
                  <p>
                    <strong>Disposizione letti:</strong> {activeConfig.beds}
                  </p>
                  <p className="room-config-note">{activeConfig.note}</p>
                </div>
              )}
            </div>
          )}

          <p className="room-hint">
            Tutti i bagni sono stati recentemente ristrutturati; alcuni monolocali non sono dotati di bidet.
            Chiedici i dettagli in fase di prenotazione.
          </p>
        </article>

        <aside className="room-features">
          <h3>Dotazioni</h3>
          <p className="room-features-config">
            {activeConfig?.shortLabel} — {activeConfig?.beds}
          </p>
          <ul>
            {suite.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <a className="room-cta" href="#contatti">
            Richiedi disponibilità
          </a>
        </aside>
      </section>

      {otherSuites.length > 0 && (
        <section className="room-other" aria-label="Altre camere">
          <h2>Altre tipologie</h2>
          <div className="room-other-grid">
            {otherSuites.map((s) => (
              <Link key={s.slug} to={`/camere/${s.slug}`} className="room-other-card">
                <img src={s.image} alt={s.title} />
                <div className="room-other-copy">
                  <span>{s.kicker}</span>
                  <h3>{s.title}</h3>
                  <p>Scopri di più →</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <footer className="room-footer">
        <p>© {new Date().getFullYear()} Residence Le Vele — Stintino, Sardegna</p>
        <a href="/" onClick={goHome}>Home</a>
      </footer>
    </div>
  );
}
