import { useCallback, useEffect, useMemo, useState } from 'react';
import { RESIDENCE_UNITS, UNIT_CATEGORY_LABEL } from '../data/residenceUnits';
import { fetchPlanningCells, savePlanningCellsRemote } from '../api/adminApiClient';
import {
  STATUS_CYCLE,
  STATUS_LABEL,
  cellKey,
  loadPlanningCells,
  notifyPlanningCellsChanged,
  savePlanningCells,
} from '../planning/planningStorage';
import '../planning-board.css';

const WEEKDAYS_SHORT = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

function startOfDay(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function addMonths(d, delta) {
  return new Date(d.getFullYear(), d.getMonth() + delta, 1);
}

/** Giorni del mese [Date, ...] */
function daysInMonth(year, month) {
  const last = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: last }, (_, i) => startOfDay(new Date(year, month, i + 1)));
}

function isPastDay(day, today) {
  return day < today;
}

function nextStatus(current) {
  const idx = STATUS_CYCLE.indexOf(current);
  if (idx === -1) return STATUS_CYCLE[0];
  return STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length];
}

function cellsEqual(a, b) {
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  for (const k of keys) {
    if ((a[k] ?? 'free') !== (b[k] ?? 'free')) return false;
  }
  return true;
}

/**
 * @param {{ layout?: 'desktop' | 'mobile'; embedCommitVisible?: boolean }} props
 * `embedCommitVisible` (solo mobile): se false, niente azioni salvataggio (altro tab attivo).
 */
export function UnitsPlanningBoard({ layout = 'desktop', embedCommitVisible = true }) {
  const [viewMonth, setViewMonth] = useState(() => {
    const t = new Date();
    return new Date(t.getFullYear(), t.getMonth(), 1);
  });
  const [savedCells, setSavedCells] = useState(() => loadPlanningCells());
  const [cells, setCells] = useState(() => loadPlanningCells());
  const [remoteInfo, setRemoteInfo] = useState({ enabled: false, error: '' });

  const isDirty = useMemo(() => !cellsEqual(cells, savedCells), [cells, savedCells]);

  useEffect(() => {
    if (!isDirty) return undefined;
    const onBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [isDirty]);

  const commitChanges = useCallback(() => {
    savePlanningCells(cells);
    setSavedCells({ ...cells });
    notifyPlanningCellsChanged();
  }, [cells]);

  // Caricamento planning remoto (se disponibile). Fallback: localStorage demo.
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const remoteCells = await fetchPlanningCells();
        if (!alive) return;
        if (remoteCells && typeof remoteCells === 'object') {
          savePlanningCells(remoteCells);
          setSavedCells(remoteCells);
          setCells(remoteCells);
          setRemoteInfo({ enabled: true, error: '' });
        }
      } catch (e) {
        if (!alive) return;
        setRemoteInfo({ enabled: false, error: e?.message || '' });
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const commitChangesRemote = useCallback(async () => {
    commitChanges();
    if (!remoteInfo.enabled) return;
    try {
      await savePlanningCellsRemote(cells);
      setRemoteInfo({ enabled: true, error: '' });
    } catch (e) {
      setRemoteInfo((prev) => ({ ...prev, error: e?.message || 'Errore salvataggio backend.' }));
    }
  }, [cells, commitChanges, remoteInfo.enabled]);

  const discardChanges = useCallback(() => {
    setCells({ ...savedCells });
  }, [savedCells]);

  const today = useMemo(() => startOfDay(new Date()), []);

  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const days = useMemo(() => daysInMonth(year, month), [year, month]);
  const monthLabel = viewMonth.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' });

  const onCellClick = useCallback(
    (unitId, day) => {
      if (isPastDay(day, today)) return;
      setCells((prev) => {
        const k = cellKey(unitId, day);
        const cur = prev[k] ?? 'free';
        const next = nextStatus(cur);
        const n = { ...prev };
        if (next === 'free') delete n[k];
        else n[k] = next;
        return n;
      });
    },
    [today],
  );

  const clearMonthDemo = useCallback(() => {
    if (!window.confirm('Azzerare tutte le celle del mese visualizzato?')) return;
    setCells((prev) => {
      const next = { ...prev };
      RESIDENCE_UNITS.forEach((u) => {
        days.forEach((day) => {
          delete next[cellKey(u.id, day)];
        });
      });
      return next;
    });
  }, [days]);

  /** Tutte le notti del mese (non passate) → occupato: nessuna disponibilità per quell’unità. */
  const blockUnitMonth = useCallback(
    (unitId) => {
      setCells((prev) => {
        const next = { ...prev };
        days.forEach((day) => {
          if (isPastDay(day, today)) return;
          next[cellKey(unitId, day)] = 'occupied';
        });
        return next;
      });
    },
    [days, today],
  );

  const isMobileLayout = layout === 'mobile';
  const showMobileToolbarSave = isMobileLayout && isDirty && embedCommitVisible;
  /** Su mobile le modifiche si salvano dalla toolbar; su desktop resta la barra sotto. */
  const showCommitBarBlock = !isMobileLayout || !isDirty;

  const dirtyCommitInner = (
    <>
      <p className="planning-board__commit-msg" role="status">
        Hai modifiche non confermate: la disponibilità sul sito si aggiorna solo dopo la conferma.
        {remoteInfo.enabled ? ' (sincronizzato su backend)' : ''}
      </p>
      <div className="planning-board__commit-actions">
        <button type="button" className="planning-board__btn planning-board__btn--ghost" onClick={discardChanges}>
          Annulla
        </button>
        <button type="button" className="planning-board__btn planning-board__btn--primary" onClick={commitChangesRemote}>
          Conferma modifiche
        </button>
      </div>
      {remoteInfo.error ? (
        <p className="planning-board__hint" role="status">
          Backend: {remoteInfo.error}
        </p>
      ) : null}
    </>
  );

  return (
    <div className={`planning-board${isMobileLayout ? ' planning-board--mobile' : ''}`}>
      <div className="planning-board__toolbar">
        <div className="planning-board__month-nav">
          <button
            type="button"
            className="planning-board__nav-btn"
            onClick={() => setViewMonth((m) => addMonths(m, -1))}
            aria-label="Mese precedente"
          >
            ‹
          </button>
          <h2 className="planning-board__month-title">{monthLabel}</h2>
          <button
            type="button"
            className="planning-board__nav-btn"
            onClick={() => setViewMonth((m) => addMonths(m, 1))}
            aria-label="Mese successivo"
          >
            ›
          </button>
          <button
            type="button"
            className="planning-board__today-btn"
            onClick={() => {
              const t = new Date();
              setViewMonth(new Date(t.getFullYear(), t.getMonth(), 1));
            }}
          >
            Oggi
          </button>
        </div>
        <div className="planning-board__legend" aria-hidden="true">
          {STATUS_CYCLE.map((s) => (
            <span key={s} className={`planning-legend__item planning-legend__item--${s}`}>
              {STATUS_LABEL[s]}
            </span>
          ))}
        </div>
        <div className="planning-board__toolbar-end">
          <button type="button" className="planning-board__clear" onClick={clearMonthDemo}>
            Azzera mese
          </button>
          {showMobileToolbarSave ? (
            <>
              <button
                type="button"
                className="planning-board__toolbar-ghost"
                onClick={discardChanges}
                aria-label="Annulla modifiche al planning"
              >
                Annulla
              </button>
              <button
                type="button"
                className="planning-board__toolbar-save"
                onClick={commitChangesRemote}
                aria-label="Salva modifiche planning e aggiorna disponibilità"
              >
                Salva
              </button>
            </>
          ) : null}
        </div>
      </div>

      {showCommitBarBlock ? (
        <div
          className={`planning-board__commit-bar${isDirty ? ' planning-board__commit-bar--dirty' : ''}`}
          role="region"
          aria-label="Salvataggio modifiche planning"
        >
          {isDirty ? (
            dirtyCommitInner
          ) : (
            <p className="planning-board__commit-synced" role="status">
              Modifiche inviate: planning e disponibilità in ricerca sono allineati.
            </p>
          )}
        </div>
      ) : null}

      <p className="planning-board__hint">
        {isMobileLayout
          ? 'Tocca una cella per cambiare stato; «Chiudi» sulla riga imposta tutto il mese su occupato. Con «Salva» nella barra in alto applichi al sito.'
          : 'Clic su una cella per ciclare gli stati. «Chiudi» sulla riga unità imposta tutte le notti del mese (non passate) su occupato. «Conferma modifiche» applica al sito (stesso browser).'}
      </p>

      <p className="planning-board__scroll-hint" aria-hidden="true">
        Scorri orizzontalmente per vedere tutti i giorni del mese.
      </p>

      <div className="planning-board__scroll">
        <table className="planning-grid" role="grid" aria-label={`Planning ${monthLabel}`}>
          <thead>
            <tr>
              <th scope="col" className="planning-grid__corner">
                Unità
              </th>
              {days.map((day) => {
                const isToday = day.getTime() === today.getTime();
                const dowMon = (day.getDay() + 6) % 7;
                const w = WEEKDAYS_SHORT[dowMon];
                return (
                  <th
                    key={day.getTime()}
                    scope="col"
                    className={`planning-grid__dayhead${isToday ? ' is-today' : ''}`}
                  >
                    <span className="planning-grid__wd">{w}</span>
                    <span className="planning-grid__dn">{day.getDate()}</span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {RESIDENCE_UNITS.map((unit) => (
              <tr key={unit.id}>
                <th scope="row" className="planning-grid__unit">
                  <span className="planning-grid__unit-name">{unit.name}</span>
                  <span className={`planning-grid__unit-cat planning-grid__unit-cat--${unit.category}`}>
                    {UNIT_CATEGORY_LABEL[unit.category]}
                  </span>
                  <button
                    type="button"
                    className="planning-grid__unit-block"
                    onClick={() => blockUnitMonth(unit.id)}
                    title="Tutte le notti del mese (non passate) → occupato. Usa Salva in alto per applicare."
                    aria-label={`Chiudi tutte le disponibilità per ${unit.name} nel mese visualizzato`}
                  >
                    Chiudi
                  </button>
                </th>
                {days.map((day) => {
                  const key = cellKey(unit.id, day);
                  const status = cells[key] ?? 'free';
                  const past = isPastDay(day, today);
                  return (
                    <td key={key} className="planning-grid__cell-wrap">
                      <button
                        type="button"
                        className={`planning-cell planning-cell--${status}${past ? ' is-past' : ''}`}
                        disabled={past}
                        title={`${unit.name} · ${day.toLocaleDateString('it-IT')} · ${STATUS_LABEL[status]}`}
                        onClick={() => onCellClick(unit.id, day)}
                      >
                        <span className="visually-hidden">
                          {unit.name}, {day.toLocaleDateString('it-IT')}, {STATUS_LABEL[status]}
                        </span>
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
