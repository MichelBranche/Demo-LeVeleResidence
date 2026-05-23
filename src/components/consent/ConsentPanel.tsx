import { useState } from 'react';
import { useConsent } from '../../hooks/useConsent';
import type { ConsentPreferences } from '../../lib/consentTypes';

type ConsentPanelProps = {
  onBack: () => void;
  onSave: (prefs: ConsentPreferences) => void;
};

type ConsentPanelFormProps = ConsentPanelProps & {
  initial: ConsentPreferences;
};

function prefsKey(prefs: ConsentPreferences) {
  return `${prefs.analytics}-${prefs.marketing}-${prefs.preferences}`;
}

function ConsentPanelForm({ initial, onBack, onSave }: ConsentPanelFormProps) {
  const { copy } = useConsent();
  const [prefs, setPrefs] = useState<ConsentPreferences>(initial);

  const toggle = (key: keyof ConsentPreferences) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="consent-panel" role="region" aria-label={copy.aria.panel}>
      <header className="consent-panel__head">
        <h2 className="consent-panel__title display-serif">{copy.panel.title}</h2>
        <p className="consent-panel__desc">{copy.panel.description}</p>
      </header>

      <ul className="consent-panel__list">
        <li className="consent-panel__item consent-panel__item--locked">
          <div className="consent-panel__item-text">
            <h3>{copy.panel.necessary.title}</h3>
            <p>{copy.panel.necessary.description}</p>
          </div>
          <span className="consent-panel__badge">{copy.panel.necessary.alwaysOn}</span>
        </li>

        {(['analytics', 'marketing', 'preferences'] as const).map((key) => (
          <li key={key} className="consent-panel__item">
            <div className="consent-panel__item-text">
              <h3>{copy.panel[key].title}</h3>
              <p>{copy.panel[key].description}</p>
            </div>
            <label className="consent-toggle">
              <input type="checkbox" checked={prefs[key]} onChange={() => toggle(key)} />
              <span className="consent-toggle__track" aria-hidden />
            </label>
          </li>
        ))}
      </ul>

      <div className="consent-panel__actions">
        <button type="button" className="consent-btn consent-btn--ghost" onClick={onBack}>
          {copy.panel.back}
        </button>
        <button
          type="button"
          className="consent-btn consent-btn--primary"
          onClick={() => onSave(prefs)}
        >
          {copy.panel.save}
        </button>
      </div>
    </div>
  );
}

export function ConsentPanel({ onBack, onSave }: ConsentPanelProps) {
  const { panelPreferences } = useConsent();

  return (
    <ConsentPanelForm
      key={prefsKey(panelPreferences)}
      initial={panelPreferences}
      onBack={onBack}
      onSave={onSave}
    />
  );
}
