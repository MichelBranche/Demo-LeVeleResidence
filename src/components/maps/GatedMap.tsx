import { useCallback, useEffect, useState } from 'react';
import { useConsent } from '../../hooks/useConsent';
import { useSiteLocale } from '../../hooks/useSiteLocale';

export function GatedMap() {
  const { content } = useSiteLocale();
  const { siteMap, siteMapCoords } = content;
  const mapEmbedSrc = `https://www.google.com/maps?q=${siteMapCoords.embedQuery}&output=embed`;
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
        <div className="map-badge">{siteMap.badgeLabel}</div>
        <iframe
          title={siteMap.iframeTitle}
          src={mapEmbedSrc}
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
        src={siteMapCoords.placeholderImage}
        alt={siteMap.placeholderAlt}
        className="gated-map__placeholder-img"
        width={1200}
        height={675}
        loading="lazy"
        decoding="async"
      />
      <div className="gated-map__overlay" role="group" aria-label={siteMap.activateAria}>
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
