export function LocationSection() {
  return (
    <section className="location-section" data-bg="#FAF8F5" data-text="#3A312B" id="about">
      <div className="container">
        <p className="eyebrow">Posizione</p>
        <h2 className="split-target">La Pelosa a pochi passi.</h2>
        <div className="location-grid">
          <div className="parallax-up">
            <img
              src="https://images.unsplash.com/photo-1499955085172-a104c9463ece?q=80&w=800&auto=format&fit=crop"
              alt="Dettaglio struttura"
            />
          </div>
          <div className="parallax-down">
            <img
              src="https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=800&auto=format&fit=crop"
              alt="Vista esterna"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
