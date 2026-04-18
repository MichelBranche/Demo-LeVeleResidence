export function ContactSection() {
  return (
    <section
      id="contatti"
      className="contact-section"
      data-bg="#FAF8F5"
      data-text="#3A312B"
      aria-labelledby="contatti-title"
    >
      <div className="container contact-inner">
        <header className="contact-header">
          <div className="contact-heading-row">
            <span className="contact-intro-rule" aria-hidden="true" />
            <p className="eyebrow contact-eyebrow">Contattaci</p>
          </div>
          <h2 id="contatti-title" className="contact-title">
            Contatti
          </h2>
        </header>

        <div className="contact-grid">
          <article className="contact-card">
            <h3 className="contact-card-kicker">Residence Le Vele ***</h3>
            <address className="contact-address">
              Le Vele 10 -12
              <br />
              07040 Stintino
              <br />
              (SS) – ITALY
            </address>
            <dl className="contact-links">
              <div className="contact-link-row">
                <dt>Phone</dt>
                <dd>
                  <a href="tel:+39079523495">+39 079 523495</a>
                </dd>
              </div>
              <div className="contact-link-row">
                <dt>Mobile</dt>
                <dd>
                  <a href="tel:+393894425660">+39 389 4425660</a>
                </dd>
              </div>
              <div className="contact-link-row">
                <dt>Email</dt>
                <dd>
                  <a href="mailto:info@rtalevele.com">info@rtalevele.com</a>
                </dd>
              </div>
            </dl>
          </article>

          <article className="contact-card contact-card--legal">
            <h3 className="contact-card-kicker">Residence Le Vele ***</h3>
            <p className="contact-legal-name">Canessa Cantieri s.p.a.</p>
            <address className="contact-address">
              Piazza della Vittoria 6/6
              <br />
              16121 Genova
              <br />
              Italia
            </address>
          </article>
        </div>
      </div>
    </section>
  );
}
