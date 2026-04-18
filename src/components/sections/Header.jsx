export function Header() {
  return (
    <nav className="navbar" id="navbar">
      <div className="container nav-inner">
        <a href="#" className="brand">
          Le Vele.
        </a>
        <div className="nav-links">
          <a href="#about">Essenza</a>
          <a href="#suites">Le Suites</a>
        </div>
        <div className="magnetic-wrap">
          <a href="#prenota" className="magnetic-btn booking-btn">
            Prenota
          </a>
        </div>
      </div>
    </nav>
  );
}
