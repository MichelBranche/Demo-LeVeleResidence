import { hero } from '../data/site';

type HeroSectionProps = {
  isMuted: boolean;
  onToggleMute: () => void;
};

export function HeroSection({ isMuted, onToggleMute }: HeroSectionProps) {
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

      <button
        type="button"
        className={`mute-toggle ${isMuted ? '' : 'is-on'}`}
        onClick={onToggleMute}
        aria-label={isMuted ? 'Attiva audio' : 'Disattiva audio'}
        aria-pressed={!isMuted}
      >
        {isMuted ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M11 5 6 9H3v6h3l5 4V5Z" />
            <line x1="22" y1="9" x2="16" y2="15" />
            <line x1="16" y1="9" x2="22" y2="15" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M11 5 6 9H3v6h3l5 4V5Z" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7" />
            <path d="M18.5 5.5a9 9 0 0 1 0 13" />
          </svg>
        )}
      </button>
    </section>
  );
}
