import { useCallback, useEffect, useState } from 'react';
import { SlopePromotionsWidget } from '../booking/SlopePromotionsWidget';
import { useSiteLocale } from '../../hooks/useSiteLocale';
import { isSlopeBookingEnabled } from '../../lib/slope';
import type { SiteContent } from '../../i18n';

type OfferItem = NonNullable<SiteContent['offers']['items']>[number];

function OffersFallbackGrid({ items }: { items: readonly OfferItem[] }) {
  return (
    <div className="offers-grid">
      {items.map((offer) => (
        <article key={offer.title} className="offer-card">
          <span className="offer-card__badge">{offer.badge}</span>
          <h3 className="offer-card__title display-serif">{offer.title}</h3>
          <p className="offer-card__period">{offer.period}</p>
          <p className="offer-card__desc">{offer.description}</p>
        </article>
      ))}
    </div>
  );
}

export function OffersSection() {
  const { content, locale } = useSiteLocale();
  const { offers } = content;
  const [useFallback, setUseFallback] = useState(false);
  const slopeEnabled = isSlopeBookingEnabled();

  useEffect(() => {
    setUseFallback(false);
  }, [locale]);

  const handleSlopeError = useCallback(() => {
    setUseFallback(true);
  }, []);

  return (
    <section id="offerte" className="section section--offers" aria-labelledby="offers-title">
      <div className="section--offers__inner">
        <p className="eyebrow">{offers.sectionEyebrow}</p>
        <h2 id="offers-title" className="section-title">
          {offers.sectionTitle}
        </h2>
        {slopeEnabled && !useFallback ? (
          <SlopePromotionsWidget locale={locale} onError={handleSlopeError} />
        ) : (
          <OffersFallbackGrid items={offers.items ?? []} />
        )}
      </div>
    </section>
  );
}
