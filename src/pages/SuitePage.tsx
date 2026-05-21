import { Link, useParams } from 'react-router-dom';
import { getSuiteBySlug } from '../data/site';
import { Button } from '../components/Button';

export function SuitePage() {
  const { slug = '' } = useParams();
  const suite = getSuiteBySlug(slug);

  if (!suite) {
    return (
      <main className="page-inner placeholder-page">
        <h1 className="display-title">Suite non trovata</h1>
        <Link to="/#suites">← Torna alle suites</Link>
      </main>
    );
  }

  return (
    <main className="page-inner">
      <section className="section suite-detail">
        <p className="eyebrow">{suite.kicker}</p>
        <h1 className="display-title display-serif">{suite.title}</h1>
        <figure className="suite-detail__hero">
          <img
            src={suite.image}
            alt={`${suite.title} — monolocale vacanze Stintino, Residence Le Vele`}
            loading="lazy"
            decoding="async"
          />
        </figure>
        <p className="lead">{suite.description}</p>
        <ul className="suite-detail__features">
          {suite.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <Button href={`mailto:info@rtalevele.com?subject=Prenotazione ${encodeURIComponent(suite.title)}`}>
          Richiedi preventivo
        </Button>
        <p className="back-link">
          <Link to="/#suites">← Tutte le suites</Link>
        </p>
      </section>
    </main>
  );
}
