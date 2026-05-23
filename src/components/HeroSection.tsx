import { useSiteLocale } from '../hooks/useSiteLocale';

export function HeroSection() {
  const { content } = useSiteLocale();
  const { hero } = content;

  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <p className="hero-kicker">{hero.kicker}</p>
        <h1 className="hero-title">
          <span className="hero-title__line">{hero.titleLines[0]}</span>
          <span className="hero-title__line hero-title__line--together">{hero.titleLines[1]}</span>
        </h1>
        <p className="hero-tagline">{hero.tagline}</p>
        <a href="#residence" className="hero-scroll-cue" aria-label={hero.scrollAria}>
          <span className="hero-scroll-mouse" aria-hidden>
            <span className="hero-scroll-wheel" />
          </span>
          <span className="hero-scroll-label">{hero.scrollLabel}</span>
        </a>
      </div>
    </section>
  );
}
