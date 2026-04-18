import { suites } from '../../data/siteContent';

export function SuitesSection() {
  return (
    <section id="horizontal-section" className="horizontal-section" data-bg="#E07A5F" data-text="#FAF8F5">
      <div className="horizontal-wrapper">
        <div className="suite-intro" id="suites">
          <h2>Le Suites</h2>
          <p>
            Non dei semplici monolocali, ma 18 rifugi pensati per connetterti con la natura. Continua a
            scorrere per esplorare le tipologie.
          </p>
          <div className="line" />
        </div>

        {suites.map((suite) => (
          <article key={suite.title} className="suite-card-wrap">
            <div className="suite-image-wrap">
              <img src={suite.image} alt={suite.title} />
            </div>
            <div className={`suite-copy ${suite.cardTone === 'light' ? 'light' : 'dark'}`}>
              <h3>{suite.title}</h3>
              <p>{suite.description}</p>
              <span>Scopri</span>
            </div>
          </article>
        ))}

        <div className="suite-cta" id="prenota">
          <h3>Pronto a partire?</h3>
          <a href="#prenota">Verifica Prezzi</a>
        </div>
      </div>
    </section>
  );
}
