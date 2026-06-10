import { Link } from 'react-router-dom';
import { consentCopy } from '../data/consentCopy';
import { useConsent } from '../hooks/useConsent';
import { useSiteLocale } from '../hooks/useSiteLocale';
import { GatedMap } from './maps/GatedMap';

const PORTFOLIO_URL = 'https://www.michelbranche.it';

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.25" cy="6.75" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function Footer() {
  const { locale, content } = useSiteLocale();
  const { openBanner } = useConsent();
  const consentLabels = consentCopy[locale].footer;
  const { footer, navLinks, config: site, siteLegal, logo } = content;

  const formattedAddress = (
    <>
      {site.address.street}
      <br />
      {site.address.postalCode} {site.address.city}
      <br />
      ({site.address.region}) – {siteLegal.countryLabel}
    </>
  );

  return (
    <footer id="site-footer" className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__main">
          <div className="site-footer__col site-footer__col--brand">
            <Link to="/" className="site-footer__logo">
              <img src={logo.footer} alt={site.name} width={200} height={98} loading="lazy" />
            </Link>
            <p className="site-footer__about">{footer.about}</p>
          </div>

          <div className="site-footer__col">
            <h3 className="site-footer__heading">{footer.explore}</h3>
            <nav className="site-footer__nav" aria-label={footer.footerNavAria}>
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
            <h3 className="site-footer__heading">{footer.contacts}</h3>
            <ul className="site-footer__contact-list" role="list">
              <li>
                <span className="site-footer__contact-label">{content.contactLabels.phone}</span>
                <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>
              </li>
              <li>
                <span className="site-footer__contact-label">{content.contactLabels.mobile}</span>
                <a href={`tel:${site.mobile.replace(/\s/g, '')}`}>{site.mobile}</a>
              </li>
              <li>
                <span className="site-footer__contact-label">{content.contactLabels.email}</span>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <span className="site-footer__contact-label">{content.contactLabels.address}</span>
                <address>{formattedAddress}</address>
              </li>
            </ul>
          </div>
        </div>

        <section className="site-footer__map" aria-label={content.siteMap.mapSectionAria}>
          <GatedMap />
        </section>

        <div className="site-footer__bar">
          <div className="site-footer__bar-block site-footer__bar-block--legal">
            <p className="site-footer__legal-name">
              {site.name}{' '}
              <span className="site-footer__stars" aria-label={footer.starsAria}>
                ***
              </span>
            </p>
            <address className="site-footer__legal-address">{formattedAddress}</address>
            <p className="site-footer__copyright">
              © {site.name} – Stintino | P.Iva {siteLegal.vatId} | CIN {siteLegal.cin}
            </p>
          </div>

          <div className="site-footer__bar-block site-footer__bar-block--meta">
            <a
              href={siteLegal.instagramUrl}
              className="site-footer__social"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={footer.instagramAria}
            >
              <InstagramIcon />
            </a>
            <nav className="site-footer__consent" aria-label={footer.legalNavAria}>
              <button type="button" onClick={() => openBanner({ panel: true })}>
                {consentLabels.manage}
              </button>
              <Link to="/privacy-policy">{consentLabels.privacy}</Link>
              <Link to="/cookie-policy">{consentLabels.cookies}</Link>
            </nav>
            <p className="site-footer__credit">
              {footer.designBy}{' '}
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
