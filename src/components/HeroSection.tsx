import type { ReactNode } from 'react';
import { useSiteLocale } from '../hooks/useSiteLocale';

function HeroRevealLine({ children }: { children: ReactNode }) {
  return (
    <span className="hero-reveal-line">
      <span className="hero-reveal-line__inner">{children}</span>
    </span>
  );
}

export function HeroSection() {
  const { content } = useSiteLocale();
  const { hero } = content;

  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="hero-title__line">
            <HeroRevealLine>{hero.titleLines[0]}</HeroRevealLine>
          </span>
          <span className="hero-title__line hero-title__line--together">
            <HeroRevealLine>{hero.titleLines[1]}</HeroRevealLine>
          </span>
        </h1>
        <p className="hero-kicker">
          <HeroRevealLine>{hero.kicker}</HeroRevealLine>
        </p>
        <p className="hero-tagline">
          <HeroRevealLine>{hero.tagline}</HeroRevealLine>
        </p>
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
