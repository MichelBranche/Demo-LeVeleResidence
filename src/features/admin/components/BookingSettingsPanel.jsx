import { useCallback, useState } from 'react';
import { loadBookingSettings, saveBookingSettings } from '../../booking/storage/bookingSettingsStorage';

function newCoupon() {
  return {
    id: `c-${Date.now()}`,
    code: '',
    type: /** @type {'percent' | 'fixed'} */ ('percent'),
    value: 10,
    label: '',
    active: true,
  };
}

export function BookingSettingsPanel() {
  const [settings, setSettings] = useState(() => loadBookingSettings());
  const [saved, setSaved] = useState(false);

  const persist = useCallback((next) => {
    setSettings(next);
    saveBookingSettings(next);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  }, []);

  const updateField = (field, value) => {
    setSettings((s) => ({ ...s, [field]: value }));
    setSaved(false);
  };

  const updateCoupon = (id, patch) => {
    setSettings((s) => ({
      ...s,
      coupons: s.coupons.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    }));
    setSaved(false);
  };

  const addCoupon = () => {
    setSettings((s) => ({ ...s, coupons: [...s.coupons, newCoupon()] }));
    setSaved(false);
  };

  const removeCoupon = (id) => {
    setSettings((s) => ({ ...s, coupons: s.coupons.filter((c) => c.id !== id) }));
    setSaved(false);
  };

  const handleSave = () => {
    persist({ ...settings });
  };

  return (
    <section className="admin-dashboard__card" aria-labelledby="admin-booking-settings-title">
      <h2 id="admin-booking-settings-title" className="admin-dashboard__h2">
        Tariffe e buoni (checkout)
      </h2>
      <p className="admin-booking-settings__lead">
        Prezzi per notte usati nella pagina di conferma prenotazione. I buoni sono confrontati senza distinzione tra
        maiuscole e minuscole.
      </p>

      <div className="admin-booking-settings__grid">
        <label className="admin-booking-settings__field">
          <span>€ / notte · vista giardino</span>
          <input
            type="number"
            min={0}
            step={1}
            value={settings.nightlyRateGiardino}
            onChange={(e) => updateField('nightlyRateGiardino', Number(e.target.value) || 0)}
          />
        </label>
        <label className="admin-booking-settings__field">
          <span>€ / notte · vista mare</span>
          <input
            type="number"
            min={0}
            step={1}
            value={settings.nightlyRateMare}
            onChange={(e) => updateField('nightlyRateMare', Number(e.target.value) || 0)}
          />
        </label>
        <label className="admin-booking-settings__field">
          <span>Sconto promozione globale (%)</span>
          <input
            type="number"
            min={0}
            max={90}
            step={1}
            value={settings.globalDiscountPercent}
            onChange={(e) => updateField('globalDiscountPercent', Number(e.target.value) || 0)}
          />
        </label>
      </div>

      <h3 className="admin-booking-settings__h3">Buoni sconto</h3>
      <ul className="admin-booking-settings__coupons">
        {settings.coupons.length === 0 ? (
          <li className="admin-booking-settings__empty">Nessun buono. Aggiungi un codice per le promozioni.</li>
        ) : null}
        {settings.coupons.map((c) => (
          <li key={c.id} className="admin-booking-settings__coupon-row">
            <label>
              Codice
              <input
                type="text"
                value={c.code}
                onChange={(e) => updateCoupon(c.id, { code: e.target.value })}
                placeholder="ES. ESTATE10"
              />
            </label>
            <label>
              Tipo
              <select
                value={c.type}
                onChange={(e) => updateCoupon(c.id, { type: e.target.value === 'fixed' ? 'fixed' : 'percent' })}
              >
                <option value="percent">Percentuale</option>
                <option value="fixed">Importo fisso (€)</option>
              </select>
            </label>
            <label>
              Valore
              <input
                type="number"
                min={0}
                step={c.type === 'percent' ? 1 : 5}
                value={c.value}
                onChange={(e) => updateCoupon(c.id, { value: Number(e.target.value) || 0 })}
              />
            </label>
            <label>
              Etichetta (opz.)
              <input
                type="text"
                value={c.label ?? ''}
                onChange={(e) => updateCoupon(c.id, { label: e.target.value })}
              />
            </label>
            <label className="admin-booking-settings__check">
              <input
                type="checkbox"
                checked={c.active}
                onChange={(e) => updateCoupon(c.id, { active: e.target.checked })}
              />
              Attivo
            </label>
            <button type="button" className="admin-booking-settings__remove" onClick={() => removeCoupon(c.id)}>
              Rimuovi
            </button>
          </li>
        ))}
      </ul>

      <div className="admin-booking-settings__actions">
        <button type="button" className="admin-booking-settings__add" onClick={addCoupon}>
          + Aggiungi buono
        </button>
        <button type="button" className="admin-booking-settings__save" onClick={handleSave}>
          Salva impostazioni
        </button>
      </div>
      {saved ? (
        <p className="admin-booking-settings__ok" role="status">
          Impostazioni salvate nel browser.
        </p>
      ) : null}
    </section>
  );
}
