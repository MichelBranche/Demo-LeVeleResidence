import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { logo, navLinks, site } from '../data/site';
import { Button } from './Button';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header__bar">
        <nav className="site-header__nav" aria-label="Principale">
          <button
            type="button"
            className="site-header__toggle"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="site-header__toggle-icon" />
          </button>
          <ul className={`site-header__links ${menuOpen ? 'is-open' : ''}`}>
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

        <Link to="/" className="site-header__logo">
          <img src={logo.header} alt={`${site.name} — ${site.tagline}`} width={180} height={80} />
        </Link>

        <div className="site-header__actions">
          <Button href={`mailto:${site.email}`}>Prenota</Button>
        </div>
      </div>
    </header>
  );
}
