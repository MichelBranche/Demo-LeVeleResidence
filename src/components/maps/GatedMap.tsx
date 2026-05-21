import { useCallback, useEffect, useState } from 'react';
import { siteMap } from '../../data/site';
import { useConsent } from '../../hooks/useConsent';
const MAP_EMBED_SRC = `https://www.google.com/maps?q=${siteMap.embedQuery}&output=embed`;

export function GatedMap() {
  const { consent, hasConsent, isReady, openBanner, persistPreferences, updatePreferences } =
    useConsent();
  const [revealed, setRevealed] = useState(false);

  const mapAllowed = isReady && consent?.preferences === true;

  useEffect(() => {
    if (!mapAllowed) {
      setRevealed(false);
      return;
    }
    const id = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(id);
  }, [mapAllowed]);

  const handleEnableMap = useCallback(async () => {
    if (!hasConsent) {
      openBanner({ panel: true });
      return;
    }
    if (consent?.preferences) return;

    const prefs = await updatePreferences({ preferences: true });
    await persistPreferences(prefs);
  }, [consent?.preferences, hasConsent, openBanner, persistPreferences, updatePreferences]);

  if (mapAllowed) {
    return (
      <div className={`gated-map gated-map--live${revealed ? ' is-revealed' : ''}`}>
        <div className="map-badge">
          {siteMap.badgeLabel}
        </div>
        <iframe
          title={siteMap.iframeTitle}
          src={MAP_EMBED_SRC}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="gated-map__iframe"
        />
      </div>
    );
  }

  return (
    <div className="gated-map gated-map--placeholder">
      <div className="map-badge">{siteMap.badgeLabel}</div>
      <img
        src={siteMap.placeholderImage}
        alt={siteMap.placeholderAlt}
        className="gated-map__placeholder-img"
        width={1200}
        height={675}
        loading="lazy"
        decoding="async"
      />
      <div className="gated-map__overlay" role="group" aria-label="Attivazione mappa interattiva">
        <div className="gated-map__overlay-inner">
          <p className="gated-map__hint">{siteMap.enableHint}</p>
          <button type="button" className="gated-map__enable" onClick={() => void handleEnableMap()}>
            {siteMap.enableLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
