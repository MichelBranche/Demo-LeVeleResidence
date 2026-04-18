export function InfoServicesSection() {
  return (
    <section
      id="info-servizi"
      className="info-services-section"
      data-bg="#FAF8F5"
      data-text="#3A312B"
      aria-labelledby="info-servizi-title"
    >
      <div className="container info-services-inner">
        <header className="info-services-header">
          <div className="info-services-heading-row">
            <span className="info-services-intro-rule" aria-hidden="true" />
            <p className="eyebrow info-services-eyebrow">Informazioni</p>
          </div>
          <h2 id="info-servizi-title" className="info-services-title">
            Info &amp; Servizi
          </h2>
          <p className="info-services-kicker">Arrivi / Partenze</p>
        </header>

        <div className="info-services-times">
          <div className="info-services-time-block">
            <h3 className="info-services-time-label">Check-in</h3>
            <p className="info-services-time-value">dalle 15.30 alle 19.00</p>
          </div>
          <div className="info-services-time-block">
            <h3 className="info-services-time-label">Check-out</h3>
            <p className="info-services-time-value">entro le 10.00</p>
          </div>
        </div>

        <div className="info-services-notes">
          <p>
            In caso di <strong>check-in</strong> dopo le ore 20.00, si prega di avvisare almeno 48 ore prima, telefonicamente
            o via e-mail.
          </p>
          <p>
            La Direzione si riserva il diritto di applicare un supplemento di <strong>€ 30,00</strong> per arrivi in ritardo
            senza precedente comunicazione.
          </p>
        </div>
      </div>
    </section>
  );
}
