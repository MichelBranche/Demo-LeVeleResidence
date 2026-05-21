import { offers } from '../../data/site';

export function OffersSection() {
  return (
    <section id="offerte" className="section section--offers">
      <p className="eyebrow">Pacchetti</p>
      <h2 className="section-title display-serif">Offerte &amp; soggiorni</h2>
      <div className="offers-grid">
        {offers.map((offer) => (
          <article key={offer.title} className="offer-card">
            <span className="offer-card__badge">{offer.badge}</span>
            <h3>{offer.title}</h3>
            <p className="offer-card__period">{offer.period}</p>
            <p className="body-text">{offer.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
