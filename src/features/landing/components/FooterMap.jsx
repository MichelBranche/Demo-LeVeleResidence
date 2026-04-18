export function FooterMap() {
  return (
    <footer id="site-footer" className="footer-map" data-bg="#1A1512" data-text="#FAF8F5">
      <div className="container footer-grid">
        <div className="footer-main">
          <img src="/logo_le_vele_stintino_white.svg" alt="Le Vele Stintino" className="footer-logo" />

          <p className="footer-intro">
            Residence a Stintino pensato per chi cerca privacy, comfort e la vera atmosfera del Nord Sardegna.
          </p>

          <div className="footer-columns">
            <div>
              <p className="footer-label">Contatti</p>
              <a href="tel:+39079523495" className="footer-contact-link">
                +39 079 523495
              </a>
              <a href="mailto:info@rtalevele.com" className="footer-contact-link">
                info@rtalevele.com
              </a>
            </div>

            <div>
              <p className="footer-label">Dove siamo</p>
              <p className="footer-address">
                Via Le Vele 10-12
                <br />
                07040 Stintino (SS)
              </p>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Via+Le+Vele+10-12,+Stintino+SS"
                target="_blank"
                rel="noreferrer"
              >
                Indicazioni Stradali
              </a>
            </div>
          </div>
        </div>

        <div className="map-card">
          <div className="map-badge">Le Vele - Stintino</div>
          <iframe
            title="Google Maps - Le Vele Stintino"
            src="https://www.google.com/maps?q=Via+Le+Vele+10-12,+Stintino+SS&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="map-vignette" />
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Le Vele Residence</span>
        <span>Stintino, Sardegna</span>
        <a
          href="https://devmichelbranche.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-design-credit"
        >
          Design by Michel Branche
          <span className="footer-design-credit-tagline"> · created with passion</span>
        </a>
      </div>
    </footer>
  );
}
