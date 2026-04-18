import { useCallback, useEffect, useState } from 'react';
import { ackBookings, fetchBookingsList } from '../api/adminApiClient';
import { RESIDENCE_UNITS } from '../data/residenceUnits';

function fmtShort(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString('it-IT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function fmtDateOnly(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('it-IT');
}

/** @param {string[]} unitIds */
function unitLabels(unitIds) {
  if (!Array.isArray(unitIds) || !unitIds.length) return '—';
  const map = new Map(RESIDENCE_UNITS.map((u) => [u.id, u.name]));
  return unitIds.map((id) => map.get(id) || id).join(', ');
}

export function AdminBookingsPanel() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedId, setExpandedId] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const list = await fetchBookingsList(50);
      setItems(list);
    } catch (e) {
      setError(e?.message || 'Impossibile caricare le prenotazioni.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const onAck = async (id) => {
    if (!id) return;
    try {
      await ackBookings([id]);
      setItems((prev) => prev.map((b) => (b.id === id ? { ...b, seen: true } : b)));
    } catch (e) {
      setError(e?.message || 'Aggiornamento non riuscito.');
    }
  };

  return (
    <section className="admin-dashboard__card admin-bookings" aria-labelledby="admin-bookings-title">
      <div className="admin-bookings__head">
        <div>
          <h2 id="admin-bookings-title" className="admin-dashboard__h2">
            Prenotazioni / richieste
          </h2>
          <p className="admin-bookings__lead">
            Elenco delle richieste inviate dal sito (storage Vercel KV). «Segna vista» toglie la prenotazione dalle notifiche
            in alto.
          </p>
        </div>
        <button type="button" className="admin-bookings__refresh" onClick={load} disabled={loading}>
          {loading ? 'Caricamento…' : 'Aggiorna'}
        </button>
      </div>

      {error ? (
        <p className="admin-bookings__err" role="alert">
          {error}
        </p>
      ) : null}

      {loading && !items.length ? (
        <p className="admin-bookings__muted">Caricamento elenco…</p>
      ) : !items.length ? (
        <p className="admin-bookings__muted">Nessuna richiesta registrata.</p>
      ) : (
        <ul className="admin-bookings__list">
          {items.map((b) => {
            const open = expandedId === b.id;
            const name = `${b.customer?.firstName || ''} ${b.customer?.lastName || ''}`.trim() || '—';
            return (
              <li key={b.id} className={`admin-bookings__item${open ? ' is-open' : ''}`}>
                <div className="admin-bookings__row">
                  <div className="admin-bookings__main">
                    <span className="admin-bookings__id">{b.id}</span>
                    {b.seen === false ? (
                      <span className="admin-bookings__badge" title="Non ancora segnata come vista">
                        Nuova
                      </span>
                    ) : null}
                    <span className="admin-bookings__name">{name}</span>
                    <span className="admin-bookings__dates">
                      {fmtDateOnly(b.checkIn)} → {fmtDateOnly(b.checkOut)}
                    </span>
                  </div>
                  <div className="admin-bookings__actions">
                    <button type="button" className="admin-bookings__btn" onClick={() => setExpandedId(open ? '' : b.id)}>
                      {open ? 'Chiudi' : 'Dettaglio'}
                    </button>
                    {b.seen === false ? (
                      <button type="button" className="admin-bookings__btn admin-bookings__btn--primary" onClick={() => onAck(b.id)}>
                        Segna vista
                      </button>
                    ) : null}
                  </div>
                </div>
                {open ? (
                  <div className="admin-bookings__detail">
                    <p>
                      <strong>Registrata:</strong> {fmtShort(b.createdAt)}
                    </p>
                    <p>
                      <strong>Email:</strong> {b.customer?.email || '—'} · <strong>Tel:</strong> {b.customer?.phone || '—'}
                    </p>
                    <p>
                      <strong>Unità:</strong> {unitLabels(b.unitIds)}
                    </p>
                    {b.guests ? (
                      <p>
                        <strong>Ospiti:</strong> {b.guests.adults ?? 0} adulti
                        {b.guests.children ? `, ${b.guests.children} bambini` : ''}
                        {b.guests.infants ? `, ${b.guests.infants} neonati` : ''}
                      </p>
                    ) : null}
                    {typeof b.totalEuro === 'number' ? (
                      <p>
                        <strong>Totale indicativo:</strong> {b.totalEuro.toFixed(2)} €
                      </p>
                    ) : null}
                    {b.payment ? (
                      <p>
                        <strong>Pagamento:</strong> {b.payment}
                      </p>
                    ) : null}
                    {b.coupon ? (
                      <p>
                        <strong>Buono:</strong> {b.coupon}
                      </p>
                    ) : null}
                    {b.notes ? (
                      <p>
                        <strong>Note:</strong> {b.notes}
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
