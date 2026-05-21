export function InfoServicesSection() {
  return (
    <section id="info-servizi" className="section section--info">
      <p className="eyebrow">Informazioni</p>
      <h2 className="section-title">Info &amp; Servizi</h2>
      <p className="section-kicker">Arrivi / Partenze</p>

      <div className="info-times">
        <div>
          <h3>Check-in</h3>
          <p>dalle 15.30 alle 19.00</p>
        </div>
        <div>
          <h3>Check-out</h3>
          <p>entro le 10.00</p>
        </div>
      </div>

      <div className="info-notes body-text">
        <p>
          In caso di <strong>check-in</strong> dopo le ore 20.00, si prega di avvisare almeno 48 ore prima, telefonicamente
          o via e-mail.
        </p>
        <p>
          La Direzione si riserva il diritto di applicare un supplemento di <strong>€ 30,00</strong> per arrivi in ritardo
          senza precedente comunicazione.
        </p>
      </div>
    </section>
  );
}
