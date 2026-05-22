import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { logo, navLinks, site } from '../data/site';
import { subscribeScroll } from '../lib/scroll';

/** Evita che tutti i link `/#sezione` risultino attivi sulla home (default di NavLink). */
function isNavLinkActive(
  to: string,
  { pathname, hash }: { pathname: string; hash: string },
): boolean {
  const hashIndex = to.indexOf('#');
  if (hashIndex !== -1) {
    const targetHash = to.slice(hashIndex);
    return pathname === '/' && hash === targetHash;
  }

  const path = to.split('#')[0] || to;
  if (path === '/') return pathname === '/';
  return pathname === path || pathname.startsWith(`${path}/`);
}

export function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('site-nav-open', menuOpen);
    return () => document.body.classList.remove('site-nav-open');
  }, [menuOpen]);

  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener('resize', close);
    return () => window.removeEventListener('resize', close);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 56);
    update();
    return subscribeScroll(update);
  }, []);

  const headerClass = [
    'site-header',
    scrolled ? 'site-header--scrolled' : '',
    menuOpen ? 'site-header--menu-open' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={headerClass}>
      {menuOpen && (
        <button
          type="button"
          className="site-header__backdrop"
          aria-label="Chiudi menu"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div className="site-header__bar">
        <nav className="site-header__nav" aria-label="Principale">
          <button
            type="button"
            className="site-header__menu"
            aria-expanded={menuOpen}
            aria-controls="site-primary-nav"
            aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="site-header__menu-icon" aria-hidden>
              <span />
              <span />
            </span>
            <span className="site-header__menu-label">{menuOpen ? 'Chiudi' : 'Menu'}</span>
          </button>

          <ul
            id="site-primary-nav"
            className={`site-header__links ${menuOpen ? 'is-open' : ''}`}
          >
            {navLinks.map((link, index) => {
              const active = isNavLinkActive(link.to, location);
              return (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className={() => (active ? 'is-active' : undefined)}
                  >
                    <span className="site-header__link-index">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="site-header__link-text">{link.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <Link to="/" className="site-header__logo" onClick={() => setMenuOpen(false)}>
          <img
            src={logo.header}
            alt={`${site.name} — ${site.tagline}`}
            width={180}
            height={80}
            decoding="async"
            fetchPriority="low"
          />
        </Link>

        <div className="site-header__aside">
          <a
            className="site-header__cta"
            href={`mailto:${site.email}`}
            rel="noreferrer"
            aria-label="Prenota — richiedi disponibilità via email"
          >
            <span className="site-header__cta-icon" aria-hidden>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4.5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M3 9.5h18" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8 3v3.5M16 3v3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path
                  d="M9.25 14.25 11 16l3.75-3.75"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="site-header__cta-text">Prenota</span>
            <span className="site-header__cta-arrow" aria-hidden>
              →
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
