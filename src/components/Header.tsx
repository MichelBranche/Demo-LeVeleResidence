import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { logo, navLinks, site } from '../data/site';
import { Button } from './Button';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('site-nav-open', menuOpen);
    return () => document.body.classList.remove('site-nav-open');
  }, [menuOpen]);

  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener('resize', close);
    return () => window.removeEventListener('resize', close);
  }, []);

  return (
    <header className="site-header">
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
            className="site-header__toggle"
            aria-expanded={menuOpen}
            aria-controls="site-primary-nav"
            aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="site-header__toggle-icon" />
          </button>
          <ul
            id="site-primary-nav"
            className={`site-header__links ${menuOpen ? 'is-open' : ''}`}
          >
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) => (isActive ? 'is-active' : undefined)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
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

        <div className="site-header__actions">
          <Button href={`mailto:${site.email}`}>Prenota</Button>
        </div>
      </div>
    </header>
  );
}
