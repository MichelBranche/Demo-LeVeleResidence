import { useEffect, useMemo, useState } from 'react';

const SESSION_KEY = 'levele_site_unlocked_v1';

export function SiteAccessGate({ children }) {
  const requiredPassword = useMemo(() => (import.meta.env.VITE_SITE_PASSWORD || '').trim(), []);
  const [inputPassword, setInputPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(() => {
    if (!requiredPassword) return true;
    return sessionStorage.getItem(SESSION_KEY) === '1';
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (!requiredPassword || !isUnlocked) return;
    sessionStorage.setItem(SESSION_KEY, '1');
  }, [requiredPassword, isUnlocked]);

  if (isUnlocked) return children;

  const onSubmit = (event) => {
    event.preventDefault();
    if (inputPassword === requiredPassword) {
      setError('');
      setIsUnlocked(true);
      return;
    }
    setError('Password non valida.');
  };

  return (
    <main className="site-lock" aria-labelledby="site-lock-title">
      <section className="site-lock-card">
        <p className="site-lock-kicker">Accesso riservato</p>
        <h1 id="site-lock-title" className="site-lock-title">
          Area privata
        </h1>
        <p className="site-lock-copy">Inserisci la password per visualizzare i contenuti del sito.</p>
        <form className="site-lock-form" onSubmit={onSubmit}>
          <label className="site-lock-label" htmlFor="site-password">
            Password
          </label>
          <input
            id="site-password"
            type="password"
            className="site-lock-input"
            value={inputPassword}
            onChange={(event) => setInputPassword(event.target.value)}
            autoComplete="current-password"
            required
          />
          {error ? (
            <p className="site-lock-error" role="status" aria-live="polite">
              {error}
            </p>
          ) : null}
          <button type="submit" className="site-lock-submit">
            Entra
          </button>
        </form>
      </section>
    </main>
  );
}
