import { hero } from '../data/site';

export function HeroSection() {
  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <p className="hero-kicker">{hero.kicker}</p>
        <h1 className="hero-title">
          <span className="hero-title__line">{hero.titleLines[0]}</span>
          <span className="hero-title__line hero-title__line--together">{hero.titleLines[1]}</span>
        </h1>
        <p className="hero-tagline">{hero.tagline}</p>
        <p className="hero-lede">{hero.lede}</p>
      </div>

      <a href="#residence" className="hero-scroll-cue" aria-label="Scorri verso il Residence">
        <span className="hero-scroll-mouse" aria-hidden>
          <span className="hero-scroll-wheel" />
        </span>
        <span className="hero-scroll-label">Scorri</span>
      </a>
    </section>
  );
}
