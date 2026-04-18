export function HeroSection({ videoRef, isMuted, onToggleMute }) {
  return (
    <section id="hero" className="hero">
      <div className="hero-bg-layer">
        <div className="hero-bg">
          <video
            ref={videoRef}
            className="hero-bg-video"
            src="/Hero-Video.mp4"
            loop
            muted={isMuted}
            playsInline
            preload="auto"
            aria-label="Video panoramico della Sardegna"
          />
        </div>
      </div>
      <div className="hero-content">
        <p className="split-target hero-kicker">Sardegna, Nord-Ovest</p>
        <h1 className="split-target">Oltre l&apos;Orizzonte</h1>
        <p className="hero-tagline">La tua prossima vacanza, comincia qui …</p>
        <p className="hero-lede">
          Una natura selvaggia ed inalterata, fondali limpidi, sabbia candida ed impalpabile, Stintino possiede uno dei
          mari più belli dell&apos;intera Sardegna.
        </p>
      </div>
      <a
        href="#residence"
        className="hero-scroll-cue"
        aria-label="Scorri per scoprire il Residence"
      >
        <span className="hero-scroll-mouse" aria-hidden="true">
          <span className="hero-scroll-wheel" />
        </span>
        <span className="hero-scroll-label">Scorri</span>
        <span className="hero-scroll-arrow" aria-hidden="true">
          <svg viewBox="0 0 14 8" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 1l6 6 6-6" />
          </svg>
        </span>
      </a>
      <button
        type="button"
        className={`mute-toggle ${isMuted ? '' : 'is-on'}`}
        onClick={onToggleMute}
        aria-label={isMuted ? 'Attiva audio' : 'Disattiva audio'}
        aria-pressed={!isMuted}
        title={isMuted ? 'Attiva audio' : 'Disattiva audio'}
      >
        {isMuted ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M11 5 6 9H3v6h3l5 4V5Z" />
            <line x1="22" y1="9" x2="16" y2="15" />
            <line x1="16" y1="9" x2="22" y2="15" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M11 5 6 9H3v6h3l5 4V5Z" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7" />
            <path d="M18.5 5.5a9 9 0 0 1 0 13" />
          </svg>
        )}
      </button>
    </section>
  );
}
