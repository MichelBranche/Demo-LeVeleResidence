import { useEffect, useRef, useState } from 'react';
import { initSlopePromotionsWidget } from '../../lib/loadSlopeWidget';
import {
  getSlopeBookingDomainHost,
  getSlopeOffersLoadingText,
  getSlopePropertyId,
  toSlopeBookingLocale,
} from '../../lib/slope';
import type { SiteLocale } from '../../lib/siteLocales';
import '../../styles/slope-promotions.css';

type SlopePromotionsWidgetProps = {
  locale: SiteLocale;
  onError?: () => void;
};

export function SlopePromotionsWidget({ locale, onError }: SlopePromotionsWidgetProps) {
  const [loading, setLoading] = useState(true);
  const onErrorRef = useRef(onError);
  const slopeLocale = toSlopeBookingLocale(locale);
  const propertyId = getSlopePropertyId();

  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    const mount = document.getElementById('slope-promotions');
    if (mount) mount.innerHTML = '';

    void initSlopePromotionsWidget(propertyId, slopeLocale)
      .then(() => {
        if (!cancelled) setLoading(false);
      })
      .catch(() => {
        if (!cancelled) {
          setLoading(false);
          onErrorRef.current?.();
        }
      });

    return () => {
      cancelled = true;
    };
  }, [propertyId, slopeLocale]);

  return (
    <div className="slope-promotions-mount">
      <div id="slope-bl" data-domain={getSlopeBookingDomainHost()} hidden aria-hidden />
      <div
        id="slope-promotions"
        className="slope-promotions-mount__widget"
        data-id={propertyId}
        data-open-new-tab
        aria-busy={loading}
        aria-live="polite"
      />
      {loading ? (
        <p className="slope-promotions-mount__loading">{getSlopeOffersLoadingText(locale)}</p>
      ) : null}
    </div>
  );
}
