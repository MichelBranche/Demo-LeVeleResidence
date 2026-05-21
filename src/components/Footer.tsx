import { Link } from 'react-router-dom';
import { consentCopy } from '../data/consentCopy';
import { legalEntity, logo, navLinks, site } from '../data/site';
import { useConsent } from '../hooks/useConsent';
import { GatedMap } from './maps/GatedMap';

const PORTFOLIO_URL = 'https://www.michelbranche.it';

export function Footer() {
  const { locale, openBanner } = useConsent();
  const consentLabels = consentCopy[locale].footer;
  const year = new Date().getFullYear();

  return (
    <footer id="site-footer" className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__main">
          <div className="site-footer__col site-footer__col--brand">
            <Link to="/" className="site-footer__logo">
              <img src={logo.footer} alt={site.name} width={200} height={98} loading="lazy" />
            </Link>
            <p className="site-footer__about">
              Residence a Stintino per vacanze in Sardegna: appartamenti vicino a La Pelosa, tra privacy,
              comfort e l&apos;atmosfera del Nord Sardegna.
            </p>
          </div>

          <div className="site-footer__col">
            <h3 className="site-footer__heading">Esplora</h3>
            <nav className="site-footer__nav" aria-label="Navigazione footer">
              <ul className="site-footer__nav-list" role="list">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="site-footer__col">
            <h3 className="site-footer__heading">Contatti</h3>
            <ul className="site-footer__contact-list" role="list">
              <li>
                <span className="site-footer__contact-label">Telefono</span>
                <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>
              </li>
              <li>
                <span className="site-footer__contact-label">Mobile</span>
                <a href={`tel:${site.mobile.replace(/\s/g, '')}`}>{site.mobile}</a>
              </li>
              <li>
                <span className="site-footer__contact-label">Email</span>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <span className="site-footer__contact-label">Indirizzo</span>
                <address>
                  {site.address.street}
                  <br />
                  {site.address.postalCode} {site.address.city}
                </address>
              </li>
            </ul>
          </div>
        </div>

        <section className="site-footer__map" aria-label="Mappa del residence">
          <GatedMap />
        </section>

        <div className="site-footer__bar">
          <div className="site-footer__bar-block site-footer__bar-block--legal">
            <p className="site-footer__legal-name">{legalEntity.name}</p>
            <address className="site-footer__legal-address">
              {legalEntity.address.street}, {legalEntity.address.city}
            </address>
            <p className="site-footer__copyright">
              © {year} {site.name} · {site.tagline}
            </p>
          </div>

          <div className="site-footer__bar-block site-footer__bar-block--meta">
            <nav className="site-footer__consent" aria-label="Privacy e cookie">
              <button type="button" onClick={() => openBanner({ panel: true })}>
                {consentLabels.manage}
              </button>
              <Link to="/privacy-policy">{consentLabels.privacy}</Link>
              <Link to="/cookie-policy">{consentLabels.cookies}</Link>
            </nav>
            <p className="site-footer__credit">
              Design by{' '}
              <a
                href={PORTFOLIO_URL}
                className="site-footer__credit-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Michel Branche
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
