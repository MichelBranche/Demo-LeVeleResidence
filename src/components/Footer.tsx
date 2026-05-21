import { Link } from 'react-router-dom';
import { consentCopy } from '../data/consentCopy';
import { legalEntity, logo, navLinks, site } from '../data/site';
import { useConsent } from '../hooks/useConsent';
import { GatedMap } from './maps/GatedMap';

export function Footer() {
  const { locale, openBanner } = useConsent();
  const consentLabels = consentCopy[locale].footer;
  return (
    <footer id="site-footer" className="site-footer">
      <div className="site-footer__top">
        <div className="site-footer__brand">
          <Link to="/">
            <img src={logo.footer} alt={site.name} width={200} height={98} loading="lazy" />
          </Link>
          <p>
            Residence a Stintino per vacanze in Sardegna: appartamenti vicino a La Pelosa, tra privacy, comfort e
            l&apos;atmosfera autentica del Nord Sardegna.
          </p>
        </div>
        <nav className="site-footer__nav" aria-label="Footer">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="site-footer__map">
        <GatedMap />
      </div>

      <div className="site-footer__bottom">
        <div className="site-footer__legal">
          <h3 className="site-footer__legal-title">Sede legale</h3>
          <p className="site-footer__legal-name">{legalEntity.name}</p>
          <address>
            {legalEntity.address.street}
            <br />
            {legalEntity.address.city}
            <br />
            {legalEntity.address.country}
          </address>
        </div>
        <p className="site-footer__meta">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>{site.tagline}</span>
        </p>
        <nav className="site-footer__consent" aria-label="Privacy e cookie">
          <button type="button" onClick={() => openBanner({ panel: true })}>
            {consentLabels.manage}
          </button>
          <Link to="/privacy-policy">{consentLabels.privacy}</Link>
          <Link to="/cookie-policy">{consentLabels.cookies}</Link>
        </nav>
      </div>
    </footer>
  );
}
