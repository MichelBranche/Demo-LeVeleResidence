import { createPortal } from 'react-dom';
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../availability-modal.css';

function Spinner() {
  return <span className="availability-modal__spinner" aria-hidden="true" />;
}

/**
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {'idle' | 'loading' | 'success' | 'error'} props.status
 * @param {import('../api/types').AvailabilitySearchResponse | null} props.data
 * @param {string | null} props.error
 * @param {string | null} props.validationError
 * @param {() => void} [props.onRetry]
 * @param {Date | null} props.checkIn
 * @param {Date | null} props.checkOut
 * @param {{ adults: number; children: number; infants: number }} props.guests
 */
export function AvailabilityResultModal({
  open,
  onClose,
  status,
  data,
  error,
  validationError,
  onRetry,
  checkIn,
  checkOut,
  guests,
}) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(() => new Set());

  useEffect(() => {
    setSelected(new Set());
  }, [data?.searchId]);

  const toggleUnit = useCallback((unitId) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(unitId)) next.delete(unitId);
      else next.add(unitId);
      return next;
    });
  }, []);

  const handleProceed = useCallback(() => {
    if (!data || !checkIn || !checkOut || selected.size === 0) return;
    const picked = data.units.filter((u) => u.available && selected.has(u.unitId));
    if (picked.length === 0) return;
    navigate('/prenota/conferma', {
      state: {
        checkIn: checkIn.toISOString(),
        checkOut: checkOut.toISOString(),
        guests: { ...guests },
        nights: data.nights,
        selectedUnits: picked.map((u) => ({
          unitId: u.unitId,
          name: u.name,
          category: u.category ?? 'giardino',
          image: u.image,
        })),
      },
    });
    onClose();
  }, [data, checkIn, checkOut, guests, navigate, onClose, selected]);

  if (!open) return null;

  const availableUnits = data?.units?.filter((u) => u.available) ?? [];
  const canProceed =
    status === 'success' &&
    data &&
    checkIn &&
    checkOut &&
    availableUnits.length > 0 &&
    selected.size > 0;

  const body =
    validationError ? (
      <p className="availability-modal__hint availability-modal__hint--warn">{validationError}</p>
    ) : status === 'loading' ? (
      <div className="availability-modal__loading">
        <Spinner />
        <p>Verifica disponibilità in corso…</p>
      </div>
    ) : status === 'error' ? (
      <div className="availability-modal__error">
        <p>{error || 'Si è verificato un errore.'}</p>
        {onRetry ? (
          <button type="button" className="availability-modal__btn secondary" onClick={onRetry}>
            Riprova
          </button>
        ) : null}
      </div>
    ) : status === 'success' && data ? (
      <div className="availability-modal__result">
        <p className="availability-modal__meta">
          <strong>{data.nights}</strong> {data.nights === 1 ? 'notte' : 'notti'}
          {data.globalAvailable ? (
            <span className="availability-modal__badge availability-modal__badge--ok">Disponibilità trovata</span>
          ) : (
            <span className="availability-modal__badge">Nessuna unità libera</span>
          )}
        </p>
        {data.message ? <p className="availability-modal__message">{data.message}</p> : null}

        {availableUnits.length > 0 ? (
          <>
            <p className="availability-modal__pick-hint">
              Seleziona uno o più monolocali, poi procedi alla conferma con dati e pagamento.
            </p>
            <ul className="availability-modal__pick-grid" role="list">
              {availableUnits.map((u) => {
                const on = selected.has(u.unitId);
                return (
                  <li key={u.unitId}>
                    <label
                      className={`availability-modal__pick-card${on ? ' is-selected' : ''}`}
                    >
                      <input
                        type="checkbox"
                        className="availability-modal__pick-check"
                        checked={on}
                        onChange={() => toggleUnit(u.unitId)}
                      />
                      {u.image ? (
                        <span className="availability-modal__pick-img-wrap">
                          <img src={u.image} alt="" className="availability-modal__pick-img" />
                        </span>
                      ) : null}
                      <span className="availability-modal__pick-body">
                        <span className="availability-modal__pick-name">{u.name}</span>
                        {u.kicker ? <span className="availability-modal__pick-kicker">{u.kicker}</span> : null}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          <p className="availability-modal__message">Nessun monolocale disponibile per questo periodo.</p>
        )}

        {data.source === 'mock' ? (
          <p className="availability-modal__demo">
            {data.syncedFromPlanning
              ? 'Le disponibilità seguono il planning admin (stesso salvataggio nel browser). Con API backend saranno sincronizzate centralmente con il gestionale.'
              : 'Modalità demo: risposta simulata. Con backend vedrai dati reali dal planning.'}
          </p>
        ) : data.source === 'api' && data.syncedFromPlanning ? (
          <p className="availability-modal__demo">
            Le disponibilità seguono il planning salvato in cloud (Vercel KV), condiviso tra tutti i dispositivi.
          </p>
        ) : null}
      </div>
    ) : (
      <p className="availability-modal__hint">Nessun risultato.</p>
    );

  return createPortal(
    <>
      <div className="availability-modal__scrim" aria-hidden="true" onClick={onClose} />
      <div
        className="availability-modal availability-modal--wide"
        role="dialog"
        aria-modal="true"
        aria-labelledby="availability-modal-title"
      >
        <div className="availability-modal__head">
          <h2 id="availability-modal-title" className="availability-modal__title">
            Disponibilità
          </h2>
          <button type="button" className="availability-modal__close" onClick={onClose} aria-label="Chiudi">
            ×
          </button>
        </div>
        <div className="availability-modal__body">{body}</div>
        <div className="availability-modal__foot">
          <Link to="/#contatti" className="availability-modal__link muted" onClick={onClose}>
            Contatti
          </Link>
          <div className="availability-modal__foot-actions">
            <button type="button" className="availability-modal__btn" onClick={onClose}>
              Chiudi
            </button>
            {status === 'success' && data && availableUnits.length > 0 ? (
              <button
                type="button"
                className="availability-modal__btn availability-modal__btn--primary"
                disabled={!canProceed}
                onClick={handleProceed}
              >
                Procedi
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
}
