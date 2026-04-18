import { Link, useLocation } from 'react-router-dom';
import { useStintinoWeather } from '../hooks/useStintinoWeather';
import { usePageTransition } from '../../../components/PageTransition';

export function Header({ onMenuOpen }) {
  const { temperature, description, status } = useStintinoWeather();
  const location = useLocation();
  const { transitionTo } = usePageTransition();

  const label =
    status === 'loading' && temperature == null
      ? 'Stintino'
      : temperature != null
        ? `Stintino, ${temperature}°C`
        : 'Stintino';

  const handleBrandClick = (event) => {
    if (location.pathname === '/') return;
    event.preventDefault();
    transitionTo('/');
  };

  return (
    <nav className="navbar">
      <div className="container nav-row">
        <div className="vibe-chip" title={description || 'Meteo attuale'} aria-live="polite">
          <span className="pulse-dot" />
          <span>{label}</span>
        </div>
        <Link to="/" className="brand" onClick={handleBrandClick}>
          <img src="/logo_le_vele_stintino_white.svg" alt="Le Vele Stintino" className="brand-logo" />
        </Link>
        <div className="magnetic-wrap">
          <button type="button" className="magnetic-btn menu-btn" onClick={onMenuOpen}>
            <span>Menu</span>
            <div className="burger">
              <div />
              <div />
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
}
