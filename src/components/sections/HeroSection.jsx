export function HeroSection() {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-bg-wrap">
        <img
          src="https://images.unsplash.com/photo-1542282811-943ef1a6477b?q=80&w=1920&auto=format&fit=crop"
          className="hero-bg"
          alt="Sardegna"
        />
        <div className="hero-overlay" />
      </div>
      <div className="hero-content">
        <p className="split-target hero-location">Stintino, Nord Sardegna</p>
        <h1 className="split-target hero-title">Oltre l'Orizzonte</h1>
      </div>
      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-line">
          <div className="scroll-progress" />
        </div>
      </div>
    </section>
  );
}
