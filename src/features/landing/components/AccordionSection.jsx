import { accordionItems, residenceHighlights } from '../data/content';

/** Icone outline allineate al resto del sito (stroke morbido, tono carbone). */
function ResidenceIcon({ name, className }) {
  const common = {
    className,
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': true,
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  switch (name) {
    case 'bay':
      return (
        <svg {...common}>
          <path d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );
    case 'coves':
      return (
        <svg {...common}>
          <path d="M2 12c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2" />
          <path d="M2 16c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2" opacity="0.45" />
        </svg>
      );
    case 'routes':
      return (
        <svg {...common}>
          <path d="M4 17h5l2-8h6l2 8h3" />
          <circle cx="6.5" cy="17" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="17.5" cy="17" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      );
    default:
      return null;
  }
}

export function AccordionSection() {
  return (
    <section
      id="residence"
      className="residence-section"
      data-bg="#FAF8F5"
      data-text="#3A312B"
      aria-labelledby="residence-title"
    >
      <div className="container residence-inner">
        <header className="residence-header">
          <div className="residence-heading-row">
            <span className="residence-intro-rule" aria-hidden="true" />
            <p className="eyebrow residence-eyebrow">Il residence</p>
          </div>
          <h2 id="residence-title" className="residence-title">
            <span className="residence-title-line">Benvenuto al</span>{' '}
            <span className="residence-title-brand">Residence Le Vele</span>
          </h2>
          <p className="residence-kicker">
            Tra Cala Lupo e il mare del Nord Sardegna, a pochi minuti da Stintino e dalla Pelosa.
          </p>
        </header>

        <div className="residence-stats" role="list" aria-label="In sintesi">
          {residenceHighlights.map((h) => (
            <div key={h.label} className="residence-stat" role="listitem">
              <span className="residence-stat-value">{h.value}</span>
              <span className="residence-stat-label">{h.label}</span>
            </div>
          ))}
        </div>

        <div className="residence-split">
          <div className="residence-story">
            <p className="residence-lead">
              Il Residence Le Vele a Stintino è un complesso che sorge nella baia di Cala Lupo, in una zona tranquilla a
              circa 2 km dal centro e dalla spiaggia della Pelosa.
            </p>
            <p className="residence-body">
              Le calette di sabbia, intervallate da zone rocciose con splendidi scorci sulla baia, distano solo 100 metri
              dal Residence.
            </p>
          </div>

          <ul className="residence-cards" role="list">
            {accordionItems.map((item) => (
              <li key={item.title} className="residence-card">
                <div className="residence-card-icon" aria-hidden="true">
                  <ResidenceIcon name={item.icon} className="residence-card-icon-svg" />
                </div>
                <div className="residence-card-body">
                  <h3 className="residence-card-title">{item.title}</h3>
                  <p className="residence-card-text">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
