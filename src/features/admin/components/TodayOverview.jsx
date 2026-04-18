import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchStintinoCurrentWeather } from '../services/weatherStintino';
import { getArrivalsAndDepartures } from '../planning/dailyMovements';
import { loadPlanningCells } from '../planning/planningStorage';

function formatTimeIt(isoLike) {
  if (!isoLike || typeof isoLike !== 'string') return '';
  const d = new Date(isoLike);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
}

export function TodayOverview() {
  const [cells, setCells] = useState(() => loadPlanningCells());
  const [weather, setWeather] = useState(null);
  const [weatherError, setWeatherError] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);

  const refreshCells = useCallback(() => {
    setCells(loadPlanningCells());
  }, []);

  useEffect(() => {
    refreshCells();
    const onUpdate = () => refreshCells();
    window.addEventListener('levele-planning-updated', onUpdate);
    return () => window.removeEventListener('levele-planning-updated', onUpdate);
  }, [refreshCells]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setWeatherLoading(true);
      setWeatherError(null);
      try {
        const w = await fetchStintinoCurrentWeather();
        if (!cancelled) {
          setWeather(w);
          setWeatherError(null);
        }
      } catch (e) {
        if (!cancelled) {
          setWeather((prev) => {
            if (!prev) setWeatherError(e instanceof Error ? e.message : 'Errore di rete');
            return prev;
          });
        }
      } finally {
        if (!cancelled) setWeatherLoading(false);
      }
    }

    load();
    const id = window.setInterval(load, 10 * 60 * 1000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  const { arrivals, departures, today } = useMemo(() => getArrivalsAndDepartures(cells), [cells]);

  const dateRaw = today.toLocaleDateString('it-IT', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const dateLabel = dateRaw.charAt(0).toUpperCase() + dateRaw.slice(1);

  return (
    <section className="admin-today" aria-labelledby="admin-today-title">
      <div className="admin-today__head">
        <h2 id="admin-today-title" className="admin-today__title">
          Oggi
        </h2>
        <p className="admin-today__subtitle">
          Stintino — {dateLabel}. Arrivi e partenze ricavati dal planning (stati Occupato e Check-out).
        </p>
      </div>

      <div className="admin-today__grid">
        <article className="admin-today__card admin-today__card--weather" aria-live="polite">
          <h3 className="admin-today__card-title">Meteo attuale</h3>
          {weatherLoading && !weather ? (
            <p className="admin-today__muted">Caricamento…</p>
          ) : weatherError ? (
            <p className="admin-today__error" role="alert">
              {weatherError}. Riprova più tardi.
            </p>
          ) : weather ? (
            <>
              <div className="admin-today__weather-main">
                <span className="admin-today__temp">{weather.temperature}°</span>
                <span className="admin-today__cond">{weather.label}</span>
              </div>
              <dl className="admin-today__weather-meta">
                {weather.apparent != null ? (
                  <div className="admin-today__meta-row">
                    <dt>Percepita</dt>
                    <dd>{weather.apparent}°</dd>
                  </div>
                ) : null}
                {weather.humidity != null ? (
                  <div className="admin-today__meta-row">
                    <dt>Umidità</dt>
                    <dd>{weather.humidity}%</dd>
                  </div>
                ) : null}
                {weather.windKmh != null ? (
                  <div className="admin-today__meta-row">
                    <dt>Vento</dt>
                    <dd>{weather.windKmh} km/h</dd>
                  </div>
                ) : null}
              </dl>
              <p className="admin-today__muted admin-today__weather-time">
                Aggiornato alle {formatTimeIt(weather.time) || '—'} · Open-Meteo
              </p>
            </>
          ) : null}
        </article>

        <article className="admin-today__card">
          <h3 className="admin-today__card-title">Arrivi</h3>
          {arrivals.length === 0 ? (
            <p className="admin-today__empty">Nessun arrivo indicato nel planning per oggi.</p>
          ) : (
            <ul className="admin-today__list">
              {arrivals.map((u) => (
                <li key={u.id}>{u.name}</li>
              ))}
            </ul>
          )}
        </article>

        <article className="admin-today__card">
          <h3 className="admin-today__card-title">Partenze</h3>
          {departures.length === 0 ? (
            <p className="admin-today__empty">Nessuna partenza indicata nel planning per oggi.</p>
          ) : (
            <ul className="admin-today__list">
              {departures.map((u) => (
                <li key={u.id}>{u.name}</li>
              ))}
            </ul>
          )}
        </article>
      </div>
    </section>
  );
}
