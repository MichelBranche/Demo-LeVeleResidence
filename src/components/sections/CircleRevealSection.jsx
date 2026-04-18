export function CircleRevealSection() {
  return (
    <section id="circle-reveal" className="circle-reveal-section" data-bg="#FAF8F5" data-text="#3A312B">
      <h2 className="split-target circle-title">
        Respira.
        <br />
        <span>Sei Arrivato.</span>
      </h2>
      <div className="circle-mask">
        <img
          src="https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1920&auto=format&fit=crop"
          alt="Mare"
        />
        <div className="circle-overlay" />
      </div>
    </section>
  );
}
