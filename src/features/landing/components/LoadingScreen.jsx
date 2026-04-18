export function LoadingScreen({ progress, canEnter, onEnter }) {
  return (
    <div className={`loading-screen ${canEnter ? 'ready' : ''}`}>
      <div className="loading-content">
        <p className="loading-kicker">Sardegna Experience</p>
        <img
          src="/logo_le_vele_stintino_white.svg"
          alt="Le Vele Residence Stintino"
          className="loading-logo"
        />
        <p className="loading-copy">Luce, vento e mare. Stiamo preparando la tua esperienza.</p>
        <div className="loading-progress">
          <span style={{ width: `${progress}%` }} />
        </div>
        <p className="loading-percent">{Math.round(progress)}%</p>
        {canEnter && (
          <button type="button" className="loading-enter" onClick={onEnter}>
            Prosegui
          </button>
        )}
      </div>
    </div>
  );
}
