import { useCallback, useEffect, useMemo, useState } from 'react';
import { RESIDENCE_UNITS } from '../data/residenceUnits';
import { mergeBookingIntoCells } from '../planning/mergeBookingIntoCells';
import { loadPlanningCells, notifyPlanningCellsChanged, savePlanningCells } from '../planning/planningStorage';
import { postExtranetSync } from '../api/adminApiClient';
import { loadExtranetUiSettings, saveExtranetUiSettings } from '../storage/extranetUiStorage';

const PORTAL_URL = (import.meta.env.VITE_BOOKING_EXTRANET_PORTAL_URL || '').trim();

function dispatchPlanningRefreshFromServer() {
  window.dispatchEvent(new CustomEvent('levele-planning-external-sync'));
}

function dispatchPlanningRefreshLocal() {
  window.dispatchEvent(new CustomEvent('levele-planning-external-sync', { detail: { mode: 'local' } }));
}

function dispatchBookingsRefresh() {
  window.dispatchEvent(new CustomEvent('levele-admin-bookings-refresh'));
}

/**
 * @param {unknown} data
 * @returns {unknown[]}
 */
function extractItems(data) {
  if (Array.isArray(data)) return data;
  if (data && typeof data === 'object') {
    const o = /** @type {Record<string, unknown>} */ (data);
    if (Array.isArray(o.items)) return o.items;
    if (Array.isArray(o.bookings)) return o.bookings;
    if (Array.isArray(o.reservations)) return o.reservations;
  }
  return [];
}

const UNIT_SET = new Set(RESIDENCE_UNITS.map((u) => u.id));

/**
 * @param {unknown} raw
 */
function normalizeLocalItem(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const o = /** @type {Record<string, unknown>} */ (raw);
  const checkIn = String(o.checkIn || o.arrival || o.dateFrom || '');
  const checkOut = String(o.checkOut || o.departure || o.dateTo || '');
  let unitIds = Array.isArray(o.unitIds) ? o.unitIds.map(String).filter(Boolean) : [];
  if (!unitIds.length && o.unitId) unitIds = [String(o.unitId)];
  unitIds = unitIds.filter((id) => UNIT_SET.has(id));
  if (!checkIn || !checkOut || !unitIds.length) return null;
  return { checkIn, checkOut, unitIds };
}

export function BookingExtranetPanel() {
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [syncing, setSyncing] = useState(false);
  const [jsonText, setJsonText] = useState('');
  const [ui, setUi] = useState(() => loadExtranetUiSettings());

  const intervalMs = useMemo(() => ui.intervalMinutes * 60 * 1000, [ui.intervalMinutes]);

  const runServerSync = useCallback(async () => {
    setSyncing(true);
    setError('');
    setStatus('');
    try {
      const body = await postExtranetSync();
      const synced = Number(body.synced) || 0;
      const skipped = Number(body.skipped) || 0;
      setStatus(
        typeof body.message === 'string'
          ? body.message
          : `Sincronizzazione: +${synced} nuove, ${skipped} già presenti.`,
      );
      if (synced > 0) {
        dispatchPlanningRefreshFromServer();
        dispatchBookingsRefresh();
      }
    } catch (e) {
      setError(e?.message || 'Sincronizzazione non riuscita.');
    } finally {
      setSyncing(false);
    }
  }, []);

  useEffect(() => {
    saveExtranetUiSettings(ui);
  }, [ui]);

  useEffect(() => {
    if (!ui.autoSync) return undefined;
    const id = window.setInterval(() => {
      runServerSync().catch(() => {});
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [ui.autoSync, intervalMs, runServerSync]);

  const importJsonLocal = useCallback(() => {
    setError('');
    setStatus('');
    let data;
    try {
      data = JSON.parse(jsonText || '{}');
    } catch {
      setError('JSON non valido.');
      return;
    }
    const items = extractItems(data);
    let merged = loadPlanningCells();
    let n = 0;
    for (const raw of items) {
      const norm = normalizeLocalItem(raw);
      if (!norm) continue;
      merged = mergeBookingIntoCells(merged, norm);
      n += 1;
    }
    if (!n) {
      setError('Nessuna prenotazione valida (controlla date e unitIds, es. unit-01).');
      return;
    }
    savePlanningCells(merged);
    notifyPlanningCellsChanged();
    dispatchPlanningRefreshLocal();
    setStatus(`Import locale: aggiornate ${n} prenotazioni nel planning del browser.`);
    setJsonText('');
  }, [jsonText]);

  return (
    <section className="admin-dashboard__card admin-extranet" aria-labelledby="admin-extranet-title">
      <h2 id="admin-extranet-title" className="admin-dashboard__h2">
        Extranet Booking
      </h2>
      <p className="admin-extranet__lead">
        Collega il portale esterno (es. Booking.com extranet o PMS): dal server scarica le prenotazioni e le unisce a
        elenco richieste e planning in cloud (come le richieste dal sito). In locale senza API puoi incollare un export
        JSON per aggiornare solo il planning nel browser.
      </p>

      {PORTAL_URL ? (
        <p className="admin-extranet__row">
          <a className="admin-extranet__link" href={PORTAL_URL} target="_blank" rel="noopener noreferrer">
            Apri extranet / portale prenotazioni
          </a>
        </p>
      ) : null}

      <div className="admin-extranet__actions">
        <button type="button" className="admin-extranet__btn admin-extranet__btn--primary" onClick={runServerSync} disabled={syncing}>
          {syncing ? 'Sincronizzazione…' : 'Sincronizza da extranet (server)'}
        </button>
      </div>

      <div className="admin-extranet__autosync">
        <label className="admin-extranet__check">
          <input
            type="checkbox"
            checked={ui.autoSync}
            onChange={(e) => setUi((s) => ({ ...s, autoSync: e.target.checked }))}
          />
          Sincronizza automaticamente mentre questa pagina è aperta
        </label>
        <label className="admin-extranet__interval">
          <span>Ogni</span>
          <select
            value={ui.intervalMinutes}
            onChange={(e) => setUi((s) => ({ ...s, intervalMinutes: Number(e.target.value) }))}
            disabled={!ui.autoSync}
          >
            <option value={1}>1 min</option>
            <option value={2}>2 min</option>
            <option value={5}>5 min</option>
            <option value={10}>10 min</option>
            <option value={15}>15 min</option>
          </select>
        </label>
      </div>

      {status ? (
        <p className="admin-extranet__ok" role="status">
          {status}
        </p>
      ) : null}
      {error ? (
        <p className="admin-extranet__err" role="alert">
          {error}
        </p>
      ) : null}

      <details className="admin-extranet__details">
        <summary>Import manuale (JSON) nel planning locale</summary>
        <p className="admin-extranet__hint">
          Utile in sviluppo senza KV. Formato: array o oggetto con <code>items</code> / <code>bookings</code>. Ogni
          elemento: <code>checkIn</code>, <code>checkOut</code> (YYYY-MM-DD), <code>unitIds</code> (es.{' '}
          <code>["unit-01"]</code>).
        </p>
        <textarea
          className="admin-extranet__textarea"
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          rows={6}
          placeholder={`{\n  "items": [\n    { "id": "OTA-1", "checkIn": "2026-07-10", "checkOut": "2026-07-15", "unitIds": ["unit-01"] }\n  ]\n}`}
          spellCheck={false}
        />
        <button type="button" className="admin-extranet__btn" onClick={importJsonLocal}>
          Importa nel planning (browser)
        </button>
      </details>

      <p className="admin-extranet__note admin-dashboard__note">
        Server: imposta <code>BOOKING_EXTRANET_PULL_URL</code> (GET o <code>BOOKING_EXTRANET_PULL_METHOD=POST</code>) e
        opzionalmente <code>BOOKING_EXTRANET_BEARER_TOKEN</code>. Risposta attesa: JSON con elenco in{' '}
        <code>items</code>, <code>bookings</code> o <code>reservations</code>. Opzionale sul client:{' '}
        <code>VITE_BOOKING_EXTRANET_PORTAL_URL</code> per il link al portale.
      </p>
    </section>
  );
}
