const OFFERS = [
  {
    title: 'Pacchetto Coppia Relax',
    period: 'Primavera e inizio estate',
    icon: 'spark',
    badge: 'Signature',
    featured: true,
    description:
      '3 notti in monolocale vista mare o giardino, welcome drink all\'arrivo e late check-out su disponibilita.',
    perks: ['Welcome drink', 'Late check-out', 'Atmosfera romantica'],
  },
  {
    title: 'Offerta Famiglia',
    period: 'Giugno - Settembre',
    icon: 'family',
    badge: 'Family Choice',
    description:
      'Soggiorno in formula 4 ospiti con tariffa agevolata per permanenze settimanali e supporto dedicato per escursioni.',
    perks: ['Tariffa settimanale', '4 ospiti', 'Consigli escursioni'],
  },
  {
    title: 'Stay Longer',
    period: 'Da 7 notti',
    icon: 'calendar',
    badge: 'Best Value',
    description:
      'Sconto progressivo sulle notti aggiuntive per vivere Stintino con piu tempo e senza fretta.',
    perks: ['Sconto notti extra', 'Massima flessibilita', 'Ritmo slow'],
  },
];

function OfferIcon({ name, className }) {
  const common = {
    className,
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': true,
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  switch (name) {
    case 'spark':
      return (
        <svg {...common}>
          <path d="M12 3.5l1.9 4.5 4.6 1.8-4.6 1.8L12 16l-1.9-4.4-4.6-1.8 4.6-1.8L12 3.5z" />
          <path d="M18.8 3.2l.7 1.6 1.6.7-1.6.7-.7 1.6-.7-1.6-1.6-.7 1.6-.7.7-1.6z" />
        </svg>
      );
    case 'family':
      return (
        <svg {...common}>
          <circle cx="8" cy="8" r="2" />
          <circle cx="16" cy="7.5" r="1.8" />
          <circle cx="12" cy="13" r="2.2" />
          <path d="M4.5 18.5c.6-2.1 2.1-3.3 3.9-3.3s3.2 1.2 3.8 3.3" />
          <path d="M11.5 20c.6-2.3 2.2-3.7 4.2-3.7 2 0 3.5 1.4 4.1 3.7" />
        </svg>
      );
    case 'calendar':
      return (
        <svg {...common}>
          <rect x="4" y="5.5" width="16" height="14" rx="2.5" />
          <path d="M8 3.8v3.4M16 3.8v3.4M4 9.8h16" />
          <path d="M8.2 13h3.6M8.2 16h7.6" />
        </svg>
      );
    default:
      return null;
  }
}

export function PackagesOffersSection() {
  return (
    <section
      id="pacchetti-offerte"
      className="offers-section"
      data-bg="#F6F1EA"
      data-text="#3A312B"
      aria-labelledby="offers-title"
    >
      <span className="offers-orb offers-orb--left" aria-hidden="true" />
      <span className="offers-orb offers-orb--right" aria-hidden="true" />
      <div className="offers-top-marquee" aria-hidden="true">
        <span>Pacchetti esclusivi</span>
        <span>Offerte dirette</span>
        <span>Esperienze su misura</span>
        <span>Stintino</span>
      </div>
      <div className="container offers-inner">
        <header className="offers-header">
          <div className="offers-heading-row">
            <span className="offers-intro-rule" aria-hidden="true" />
            <p className="eyebrow offers-eyebrow">Pacchetti & Offerte</p>
          </div>
          <h2 id="offers-title" className="offers-title">
            Occasioni speciali per il tuo soggiorno
          </h2>
          <p className="offers-kicker">
            Promozioni stagionali pensate per coppie, famiglie e soggiorni piu lunghi.
          </p>
        </header>

        <ul className="offers-grid" role="list">
          {OFFERS.map((offer, index) => (
            <li
              key={offer.title}
              className={`offer-card${offer.featured ? ' offer-card--featured' : ''}`}
              data-offer-index={index}
            >
              <span className="offer-glow" aria-hidden="true" />
              <div className="offer-card-top">
                <span className="offer-icon-wrap" aria-hidden="true">
                  <OfferIcon name={offer.icon} className="offer-icon" />
                </span>
                <span className="offer-badge">{offer.badge}</span>
                <p className="offer-period">{offer.period}</p>
              </div>
              <h3 className="offer-title">{offer.title}</h3>
              <p className="offer-description">{offer.description}</p>
              <ul className="offer-perks" role="list">
                {offer.perks.map((perk) => (
                  <li key={perk} className="offer-perk">
                    {perk}
                  </li>
                ))}
              </ul>
              <a className="offer-cta" href="#contatti">
                Richiedi questa offerta <span aria-hidden="true">→</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
