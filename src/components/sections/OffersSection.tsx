import { useSiteLocale } from '../../hooks/useSiteLocale';

export function OffersSection() {
  const { content } = useSiteLocale();
  const { offers } = content;

  return (
    <section id="offerte" className="section section--offers" aria-labelledby="offers-title">
      <div className="section--offers__inner">
        <p className="eyebrow">{offers.sectionEyebrow}</p>
        <h2 id="offers-title" className="section-title display-serif">
          {offers.sectionTitle}
        </h2>
        <div className="offers-grid">
          {(offers.items ?? []).map((offer) => (
            <article key={offer.title} className="offer-card">
              <span className="offer-card__badge">{offer.badge}</span>
              <h3 className="offer-card__title">{offer.title}</h3>
              <p className="offer-card__period">{offer.period}</p>
              <p className="offer-card__desc">{offer.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
