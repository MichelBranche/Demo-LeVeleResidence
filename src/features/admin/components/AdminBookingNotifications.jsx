import { useEffect, useMemo, useRef, useState } from 'react';
import { ackBookings, fetchUnseenBookings } from '../api/adminApiClient';

function fmtDate(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

/**
 * @param {{ className?: string }} props
 */
export function AdminBookingNotifications({ className = '' }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [polling, setPolling] = useState(true);
  const seenIdsRef = useRef(new Set());

  const count = items.length;

  const latestLabel = useMemo(() => {
    const x = items[0];
    if (!x) return '';
    const name = `${x.customer?.firstName || ''} ${x.customer?.lastName || ''}`.trim();
    const when = x.createdAt ? fmtDate(x.createdAt) : '';
    return [name, when].filter(Boolean).join(' · ');
  }, [items]);

  useEffect(() => {
    let alive = true;
    let t;

    async function tick() {
      try {
        const res = await fetchUnseenBookings(10);
        const bookings = Array.isArray(res.bookings) ? res.bookings : [];
        if (!alive) return;
        setItems(bookings);
        setError('');

        // Browser notification solo quando arrivano nuovi ID rispetto al giro precedente.
        const nextIds = bookings.map((b) => b.id).filter(Boolean);
        const newlyArrived = nextIds.filter((id) => !seenIdsRef.current.has(id));
        newlyArrived.forEach((id) => seenIdsRef.current.add(id));

        if (newlyArrived.length > 0 && typeof window !== 'undefined' && 'Notification' in window) {
          if (Notification.permission === 'default') {
            // non blocchiamo: chiediamo permesso al primo evento reale
            await Notification.requestPermission();
          }
          if (Notification.permission === 'granted') {
            new Notification('Nuova prenotazione', {
              body: newlyArrived.length === 1 ? `È arrivata 1 nuova richiesta (${newlyArrived[0]}).` : `Sono arrivate ${newlyArrived.length} nuove richieste.`,
            });
          }
        }
      } catch (e) {
        if (!alive) return;
        setError(e?.message || 'Errore nel controllo prenotazioni.');
      } finally {
        if (!alive) return;
        t = window.setTimeout(tick, 15000);
      }
    }

    if (polling) tick();
    return () => {
      alive = false;
      if (t) window.clearTimeout(t);
    };
  }, [polling]);

  const handleMarkSeen = async () => {
    const ids = items.map((b) => b.id).filter(Boolean);
    if (!ids.length) return;
    try {
      await ackBookings(ids);
      setItems([]);
      setError('');
    } catch (e) {
      setError(e?.message || 'Errore durante l’aggiornamento.');
    }
  };

  return (
    <div className={`admin-booking-notifications ${className}`.trim()}>
      <button
        type="button"
        onClick={() => setPolling((p) => !p)}
        className="admin-dashboard__link"
        style={{ opacity: polling ? 1 : 0.7 }}
        title={polling ? 'Notifiche attive' : 'Notifiche in pausa'}
      >
        Notifiche {polling ? 'ON' : 'OFF'}
      </button>
      {count > 0 ? (
        <button type="button" onClick={handleMarkSeen} className="admin-dashboard__logout" title={latestLabel}>
          Nuove richieste ({count}) · Segna viste
        </button>
      ) : null}
      {error ? (
        <span className="admin-booking-notifications__err" role="status">
          {error}
        </span>
      ) : null}
    </div>
  );
}

