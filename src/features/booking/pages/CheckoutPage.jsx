import { useMemo, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import {
  computeDiscountEuro,
  computeSubtotalEuro,
  findActiveCoupon,
} from '../lib/checkoutPricing';
import { loadBookingSettings } from '../storage/bookingSettingsStorage';
import { createBookingRequest } from '../api/bookingRequestClient';
import './checkout.css';

/**
 * @typedef {{ unitId: string; name: string; category: 'giardino' | 'mare'; image?: string }} SelectedUnit
 */

function parseIso(s) {
  if (!s) return null;
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const payload = location.state;

  const [settings] = useState(() => loadBookingSettings());

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [couponInput, setCouponInput] = useState('');
  const [appliedCouponCode, setAppliedCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [payment, setPayment] = useState('card');
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [bookingId, setBookingId] = useState('');

  const checkIn = payload?.checkIn ? parseIso(payload.checkIn) : null;
  const checkOut = payload?.checkOut ? parseIso(payload.checkOut) : null;
  /** @type {SelectedUnit[] | undefined} */
  const selectedUnits = payload?.selectedUnits;
  const guests = payload?.guests;
  const nights = typeof payload?.nights === 'number' ? payload.nights : 0;

  const valid =
    checkIn &&
    checkOut &&
    checkOut > checkIn &&
    Array.isArray(selectedUnits) &&
    selectedUnits.length > 0 &&
    guests &&
    nights > 0;

  const subtotal = useMemo(
    () => (valid ? computeSubtotalEuro(selectedUnits, nights, settings) : 0),
    [valid, selectedUnits, nights, settings],
  );

  const discountCoupon = appliedCouponCode ? findActiveCoupon(appliedCouponCode, settings) : null;

  const discountTotal = useMemo(
    () => computeDiscountEuro(subtotal, settings.globalDiscountPercent, discountCoupon),
    [subtotal, settings.globalDiscountPercent, discountCoupon],
  );

  const total = Math.max(0, Math.round((subtotal - discountTotal) * 100) / 100);

  const handleApplyCoupon = () => {
    const c = findActiveCoupon(couponInput, settings);
    if (c) {
      setAppliedCouponCode(couponInput.trim());
      setCouponError('');
    } else {
      setAppliedCouponCode('');
      setCouponError(couponInput.trim() ? 'Codice non valido.' : '');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim()) return;
    setSubmitError('');
    setSubmitLoading(true);
    try {
      const unitIds = selectedUnits.map((u) => u.unitId);
      const res = await createBookingRequest({
        checkIn: payload.checkIn,
        checkOut: payload.checkOut,
        unitIds,
        guests,
        customer: { firstName, lastName, email, phone },
        notes,
        payment,
        coupon: appliedCouponCode || '',
        totalEuro: total,
      });
      setBookingId(res.bookingId || '');
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err?.message || 'Errore durante l’invio della richiesta.');
    } finally {
      setSubmitLoading(false);
    }
  };

  if (!valid) {
    return <Navigate to="/" replace state={{ checkoutError: true }} />;
  }

  if (submitted) {
    return (
      <div className="checkout-page">
        <div className="checkout-inner">
          <header className="checkout-head">
            <Link to="/" className="checkout-back">
              ← Torna al sito
            </Link>
          </header>
          <div className="checkout-success">
            <h1 className="checkout-title">Richiesta inviata</h1>
            <p className="checkout-lead">
              Abbiamo registrato la tua richiesta{bookingId ? (
                <>
                  {' '}
                  con codice <strong>{bookingId}</strong>
                </>
              ) : null}
              . Totale indicativo: <strong>{total.toFixed(2)} €</strong>.
            </p>
            <button type="button" className="checkout-btn" onClick={() => navigate('/')}>
              Chiudi
            </button>
          </div>
        </div>
      </div>
    );
  }

  const dateLabel =
    checkIn && checkOut
      ? `${checkIn.toLocaleDateString('it-IT')} → ${checkOut.toLocaleDateString('it-IT')}`
      : '';

  return (
    <div className="checkout-page">
      <div className="checkout-inner">
        <header className="checkout-head">
          <Link to="/" className="checkout-back">
            ← Torna al sito
          </Link>
          <h1 className="checkout-title">Conferma prenotazione</h1>
          <p className="checkout-meta">
            {nights} {nights === 1 ? 'notte' : 'notti'} · {dateLabel}
          </p>
        </header>

        <div className="checkout-layout">
          <section className="checkout-panel">
            <h2 className="checkout-h2">I tuoi dati</h2>
            <form className="checkout-form" onSubmit={handleSubmit}>
              <div className="checkout-row">
                <label className="checkout-label">
                  Nome
                  <input
                    className="checkout-input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    autoComplete="given-name"
                  />
                </label>
                <label className="checkout-label">
                  Cognome
                  <input
                    className="checkout-input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    autoComplete="family-name"
                  />
                </label>
              </div>
              <label className="checkout-label">
                Email
                <input
                  className="checkout-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </label>
              <label className="checkout-label">
                Telefono
                <input
                  className="checkout-input"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  autoComplete="tel"
                />
              </label>
              <label className="checkout-label">
                Note (opzionale)
                <textarea
                  className="checkout-textarea"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </label>

              <h2 className="checkout-h2">Pagamento</h2>
              <fieldset className="checkout-pay">
                <legend className="visually-hidden">Metodo di pagamento</legend>
                <label className="checkout-radio">
                  <input
                    type="radio"
                    name="pay"
                    checked={payment === 'card'}
                    onChange={() => setPayment('card')}
                  />
                  Carta (simulazione)
                </label>
                <label className="checkout-radio">
                  <input
                    type="radio"
                    name="pay"
                    checked={payment === 'bank'}
                    onChange={() => setPayment('bank')}
                  />
                  Bonifico
                </label>
                <label className="checkout-radio">
                  <input
                    type="radio"
                    name="pay"
                    checked={payment === 'property'}
                    onChange={() => setPayment('property')}
                  />
                  In struttura
                </label>
              </fieldset>

              <button type="submit" className="checkout-btn checkout-btn--primary">
                {submitLoading ? 'Invio…' : 'Invia richiesta'}
              </button>
              {submitError ? (
                <p className="checkout-coupon-bad" role="alert" style={{ marginTop: 10 }}>
                  {submitError}
                </p>
              ) : null}
            </form>
          </section>

          <aside className="checkout-summary" aria-labelledby="checkout-sum-title">
            <h2 id="checkout-sum-title" className="checkout-h2">
              Riepilogo
            </h2>
            <ul className="checkout-units-mini">
              {selectedUnits.map((u) => (
                <li key={u.unitId} className="checkout-units-mini__row">
                  {u.image ? (
                    <img src={u.image} alt="" className="checkout-units-mini__img" />
                  ) : null}
                  <div>
                    <strong>{u.name}</strong>
                    <span className="checkout-units-mini__cat">
                      {u.category === 'mare' ? 'Vista mare' : 'Vista giardino'}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <p className="checkout-guests">
              Ospiti: {guests?.adults ?? 0} adulti
              {guests?.children ? `, ${guests.children} bambini` : ''}
              {guests?.infants ? `, ${guests.infants} neonati` : ''}
            </p>

            <div className="checkout-coupon">
              <label className="checkout-label">
                Buono sconto
                <div className="checkout-coupon-row">
                  <input
                    className="checkout-input"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Codice"
                  />
                  <button type="button" className="checkout-btn checkout-btn--ghost" onClick={handleApplyCoupon}>
                    Applica
                  </button>
                </div>
              </label>
              {appliedCouponCode && discountCoupon ? (
                <p className="checkout-coupon-ok">Buono applicato: {discountCoupon.label || appliedCouponCode}</p>
              ) : null}
              {couponError ? <p className="checkout-coupon-bad">{couponError}</p> : null}
            </div>

            <dl className="checkout-totals">
              <div className="checkout-totals__row">
                <dt>Subtotale</dt>
                <dd>{subtotal.toFixed(2)} €</dd>
              </div>
              {discountTotal > 0 ? (
                <div className="checkout-totals__row checkout-totals__row--muted">
                  <dt>Sconti (promo + buono)</dt>
                  <dd>−{discountTotal.toFixed(2)} €</dd>
                </div>
              ) : null}
              <div className="checkout-totals__row checkout-totals__row--total">
                <dt>Totale</dt>
                <dd>{total.toFixed(2)} €</dd>
              </div>
            </dl>
            <p className="checkout-legal">
              I totali usano le tariffe impostate in admin (demo). Tasse e commissioni possono essere aggiunte in
              produzione.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
