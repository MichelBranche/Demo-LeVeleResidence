export function CircleRevealSection() {
  return (
    <section id="circle-reveal" className="circle-section" data-bg="#1A1512" data-text="#FAF8F5">
      <h2 className="split-target circle-title">
        Rallenta il ritmo.
        <br />
        <span>Sei in Sardegna.</span>
      </h2>
      <div className="circle-mask">
        <img
          src="/foto-preview/sardegna-cliff.jpg"
          alt="Scogliera e mare turchese della Sardegna"
        />
        <div className="circle-mask-scrim" aria-hidden="true" />
      </div>
    </section>
  );
}
